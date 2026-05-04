import { Linter } from 'eslint'
import importPlugin from 'eslint-plugin-import-x'
import fs from 'fs'

const MODULES = fs.readdirSync('app/modules') as string[]

// Общий паттерн — запрет всех относительных импортов (./ и ../)
const noRelativeImports = {
    regex: '^\\.{1,2}/',
    message: 'Относительные импорты запрещены — используй алиас @/.',
}

// Для каждого модуля генерируем правила:
// 1. Запрет относительных импортов
// 2. Запрет само-импорта через public API (@/modules/my-module)
// 3. Запрет deep paths в ЧУЖИЕ модули — negative lookahead исключает свой
const moduleOverrides: Linter.Config[] = MODULES.map((mod) => ({
    files: [`app/modules/${mod}/**`],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    noRelativeImports,
                    {
                        regex: `^@/modules/${mod}(/index\\.[tj]sx?)?$`,
                        message:
                            'Внутри своего модуля используй полный путь (@/modules/.../file), а не public API.',
                    },
                    {
                        regex: `^@/modules/(?!${mod}/)[^/]+/.+`,
                        message:
                            'Импорт из другого модуля — только через public API (@/modules/название).',
                    },
                ],
            },
        ],
    },
}))

export default [
    {
        plugins: {
            import: importPlugin,
        },
        // Базовые правила — для файлов не покрытых overrides (common/, core/ и т.д.)
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [noRelativeImports],
                },
            ],
        },
    },

    // Правила для каждого модуля
    ...moduleOverrides,

    // Правило для pages / App / main — только public API
    {
        files: ['app/app.vue', 'app/pages/**'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        noRelativeImports,
                        {
                            regex: '^@/modules/([^/]+)/.+',
                            message:
                                'В pages / App.vue / main.ts разрешён импорт из модулей ТОЛЬКО через public API (@/modules/название). ' +
                                'Глубокие пути запрещены — добавь нужный экспорт в index.ts модуля.',
                        },
                    ],
                },
            ],
        },
    },
] satisfies Linter.Config[]
