<script lang="ts" setup>
// import '@/common/styles/global.css'
// import WalletDashboard from "~/modules/wallet-dashboard/components/wallet-dashboard.vue" // не работает правило из imports.ts

import ModalWrapper from '@/common/wrappers/modal-wrapper.vue'
import { usePortfolioPolling } from '@/modules/portfolio'

usePortfolioPolling()
if (import.meta.client) useChainTheme()

useHead({
    titleTemplate: (title) =>
        title ? `${title} | Crypto Portfolio Tracker` : 'Crypto Portfolio Tracker',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
            name: 'description',
            content:
                'Astra — free crypto portfolio tracker for TON and ETH. Monitor wallet balances, token holdings and 24h changes without any sign-up.',
        },
    ],
    link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
        { rel: 'icon', href: '/faviconx4.ico' },
    ],
    htmlAttrs: { lang: 'en' },
})
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <modal-wrapper />
</template>

<style></style>
