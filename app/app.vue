<script lang="ts" setup>
// import '@/common/styles/global.css'
// import WalletDashboard from "~/modules/wallet-dashboard/components/wallet-dashboard.vue" // не работает правило из imports.ts

import ModalWrapper from '@/common/wrappers/modal-wrapper.vue'

useHead({
    titleTemplate: (title) =>
        title ? `${title} | Crypto Portfolio Tracker` : 'Crypto Portfolio Tracker',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
        { rel: 'icon', href: '/favicon.ico' },
    ],
    htmlAttrs: { lang: 'ru' },
})
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <modal-wrapper />
</template>

<style></style>
