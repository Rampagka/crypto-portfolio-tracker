import { defineVitestProject } from '@nuxt/test-utils/config'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        projects: [
            {
                resolve: {
                    alias: {
                        '~': resolve(__dirname, 'app'),
                        '@': resolve(__dirname, 'app'),
                        '@@': resolve(__dirname),
                    },
                },
                test: {
                    name: 'unit',
                    include: [
                        './app/common/{utils,helpers}/test/*.{test,spec}.ts',
                        './app/modules/**/{helpers}/test/*.{test,spec}.ts',
                        './server/utils/**/test/*.{test,spec}.ts',
                    ],
                    environment: 'node',
                },
            },
            {
                test: {
                    name: 'e2e',
                    include: ['test/e2e/*.{test,spec}.ts'],
                    environment: 'node',
                },
            },
            await defineVitestProject({
                resolve: {
                    alias: {
                        '~': resolve(__dirname, 'app'),
                        '@': resolve(__dirname, 'app'),
                    },
                },
                test: {
                    name: 'nuxt',
                    include: [
                        './app/common/{components,composables,wrappers}/test/*.{test,spec}.ts',
                        './app/modules/**/{components,composables,store,modals}/test/*.{test,spec}.ts',
                    ],
                    environment: 'nuxt',
                    setupFiles: ['./test/setup/nuxt-warn-filter.ts'],
                },
            }),
        ],
    },
})
