// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import importsConfig from './app/core/configs/imports.ts'
import moduleStructure from './app/core/configs/module-structure.ts'

export default withNuxt(
    // Your custom configs here
    {
        name: 'app/files-to-lint',
        files: ['**/*.{vue,ts,mts,tsx}'],
    },

    importsConfig,
    moduleStructure,
)
