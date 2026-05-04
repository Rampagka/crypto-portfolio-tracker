import type { Linter } from "eslint";
import {
    createFolderStructure,
    projectStructurePlugin,
} from "eslint-plugin-project-structure";

const folderStructureConfig = createFolderStructure({
    structure: [
        {
            // Корень модуля (main, auth, profile и т.д.)
            name: "*", // любой модуль (обычно kebab-case или camelCase — можно уточнить '{kebab-case}')
            ruleId: "moduleRoot",

            children: [
                { name: "index.ts", ruleId: "barrelFile" },

                {
                    name: "components",
                    ruleId: "defaultFolder",
                    children: [
                        { name: "*.vue", ruleId: "vueFile" },
                        { name: "index.ts", ruleId: "barrelFile" },
                    ],
                },

                {
                    name: "composables",
                    ruleId: "defaultFolder",
                    children: [
                        {
                            name: "use{PascalCase}.ts",
                            ruleId: "composableFile",
                        },
                        { name: "index.ts", ruleId: "barrelFile" },
                    ],
                },

                {
                    name: "modals",
                    ruleId: "defaultFolder",
                    children: [
                        {
                            name: "*",
                            ruleId: "defaultFolder",
                            children: [
                                { name: "{kebab-case}.vue", ruleId: "vueFile" },
                                { name: "index.ts", ruleId: "barrelFile" },
                            ],
                        },
                        { name: "{kebab-case}.vue", ruleId: "vueFile" },
                        { name: "index.ts", ruleId: "barrelFile" },
                    ],
                },

                {
                    name: "models",
                    ruleId: "defaultFolder",
                    children: [
                        { name: "*.ts", ruleId: "tsFile" }, // прямые файлы
                        { name: "index.ts", ruleId: "barrelFile" },

                        // Подпапки — тоже используют то же правило
                        {
                            name: "interfaces",
                            ruleId: "subFolder",
                            children: [{ name: "*.ts", ruleId: "tsFile" }],
                        },
                        {
                            name: "enums",
                            ruleId: "subFolder",
                            children: [{ name: "*.ts", ruleId: "tsFile" }],
                        },
                        {
                            name: "types",
                            ruleId: "subFolder",
                            children: [{ name: "*.ts", ruleId: "tsFile" }],
                        },
                        // или даже { name: '*', ruleId: 'subFolder', children: [{ name: '*.ts', ruleId: 'tsFile' }] } — любые подпапки
                    ],
                },

                {
                    name: "services",
                    ruleId: "defaultFolder",
                    children: [{ name: "*.ts", ruleId: "tsFile" }],
                },

                {
                    name: "helpers",
                    ruleId: "defaultFolder",
                    children: [{ name: "*.ts", ruleId: "tsFile" }],
                },

                {
                    name: "consts",
                    ruleId: "defaultFolder",
                    children: [{ name: "*.ts", ruleId: "tsFile" }],
                },

                {
                    name: "store",
                    ruleId: "defaultFolder",
                    children: [
                        { name: "*.store.ts", ruleId: "piniaStoreFile" },
                    ],
                },

                // и т.д.
            ],
        },
    ],

    // В rules:
    rules: {
        moduleRoot: {
            name: "{kebab-case}",
        },

        defaultFolder: {
            name: "{kebab-case}",
        },
        subFolder: {
            name: "{kebab-case}",
        },

        // Одно общее правило для всех простых .ts файлов (models/*.ts, interfaces/*.ts, enums/*.ts и т.д.)
        tsFile: {
            name: "*.ts", // ← или '{camelCase|kebab-case}.ts' если хочешь строже
        },

        // Если нужно чуть разные — можно сделать 2–3 общих
        barrelFile: {
            name: "index.ts",
        },

        vueFile: {
            name: "{kebab-case}.vue",
        },

        composableFile: {
            name: "use{PascalCase}.ts",
        },

        piniaStoreFile: {
            name: "*.store.ts", // или '{camelCase}.store.ts'
        },
    },
});

export default {
    files: ["app/modules/**"], // ← применяем только к модулям
    ignores: ["**/projectStructure.cache.json"],
    // languageOptions: {
    //     parser: projectStructureParser,
    // },
    plugins: {
        "project-structure": projectStructurePlugin,
    },
    rules: {
        "project-structure/folder-structure": [
            "error",
            {
                ...folderStructureConfig,
                structureRoot: "./app/modules", // ← ключевой момент — откуда считать структуру
            },
        ],
    },
} satisfies Linter.Config;
