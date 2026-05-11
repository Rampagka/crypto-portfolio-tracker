<script setup lang="ts">
import { NETWORKS } from '@/common/models/types/networks.type'
import { WalletDashboard } from '@/modules/wallet-dashboard'
import { WalletList } from '@/modules/wallet-list'

import PortfolioAddWallet from '@/modules/portfolio/components/portfolio-add-wallet.vue'

const route = useRoute()

// const tabList = Object.entries(NETWORKS).map(([key, value]) => ({ label: value, value: key }))
// const currentTab = computed(() => {
//     const id = route.params.id
//     return (Array.isArray(id) ? id[0] : id) || 'ton'
// })
//
// const selectTab = (value: string) => {
//     navigateTo(`/portfolio/${value}`)
// }

onMounted(() => {
    const id = route.params.id
    const chain = (Array.isArray(id) ? id[0] : id)?.toLowerCase()
    if (chain && !Object.keys(NETWORKS).includes(chain)) {
        navigateTo('/portfolio/ton', { replace: true })
    }
})
</script>

<template>
    <!--    <app-tabs :tabs="tabList" :current="currentTab" @select-tab="selectTab" />-->
    <wallet-dashboard />
    <portfolio-add-wallet />
    <wallet-list />
    <sync-status />
</template>

<style scoped></style>
