import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    app: {
        head: {
            meta: [
                {
                    name: 'viewport',
                    content:
                        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
                },
                { name: 'theme-color', content: '#0a0a0f' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            ],
        },
    },

    routeRules: {
        '/': { prerender: true, redirect: { to: '/portfolio/ton', statusCode: 301 } },
    },

    css: ['~/common/styles/global.css'],

    vite: {
        plugins: [tailwindcss()],
    },

    components: [
        { path: '~/common/ui', prefix: '' },
        { path: '~/modules/*/components', prefix: '' },
        { path: '~/common/components', prefix: '' },
    ],
    imports: {
        dirs: ['common/composables', 'modules/*/components', 'modules/*/store'],
    },

    modules: [
        '@pinia/nuxt',
        '@nuxt/image',
        '@nuxt/eslint',
        '@nuxt/icon',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/test-utils/module',
    ],

    icon: {
        clientBundle: {
            scan: true,
        },
    },

    image: {
        quality: 80,
        format: ['webp'],
    },
    runtimeConfig: {
        baseTonapi: '',
        apiKey: '',
        moralisKey: '',
        public: {
            appName: 'Crypto portfolio tracker',
            siteUrl: '',
        },
    },
})
