// @ts-check
/* eslint-disable no-restricted-imports */
import withNuxt from './.nuxt/eslint.config.mjs'
import importsConfig from './app/core/configs/imports.ts'
import moduleStructure from './app/core/configs/module-structure.ts'

/* eslint-enable no-restricted-imports */

export default withNuxt(
    // Your custom configs here
    {
        name: 'app/files-to-lint',
        files: ['**/*.{vue,ts,mts,tsx}'],
    },

    importsConfig,
    moduleStructure,
)
