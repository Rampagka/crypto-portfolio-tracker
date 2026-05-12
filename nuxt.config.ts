import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

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
        public: {
            appName: 'Crypto portfolio tracker',
            siteUrl: '',
        },
    },
})
