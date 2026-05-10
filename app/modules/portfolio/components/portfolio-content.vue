<script setup lang="ts">
import { NETWORKS } from '~/common/models/types/networks.type'
import { WalletDashboard } from '~/modules/wallet-dashboard'
import { WalletList } from '~/modules/wallet-list'

import PortfolioAddWallet from '~/modules/portfolio/components/portfolio-add-wallet.vue'

const route = useRoute()

const tabList = Object.entries(NETWORKS).map(([key, value]) => ({ label: value, value: key }))
const currentTab = computed(() => (route.params.id as string) || 'ton')

const selectTab = (value: string) => {
    navigateTo(`/portfolio/${value}`)
}
</script>

<template>
    <app-tabs :tabs="tabList" :current="currentTab" @select-tab="selectTab" />
    <wallet-dashboard />
    <portfolio-add-wallet />
    <wallet-list />
    <sync-status />
</template>

<style scoped></style>
