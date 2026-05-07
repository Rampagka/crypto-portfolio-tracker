<script setup lang="ts">
import type { Tab } from '~/common/models/interfaces/tab.interface'
import { NETWORKS } from '~/common/models/types/networks.type'
import { WalletDashboard } from '~/modules/wallet-dashboard'
import { WalletList } from '~/modules/wallet-list'

import PortfolioAddWallet from '~/modules/portfolio/components/portfolio-add-wallet.vue'

const tabList = ref<Tab[]>([])
const currentTab = ref<string>('ton')

const selectTab = (value: string) => {
    currentTab.value = value
    navigateTo(`/portfolio/${value}`)
}

// const TEST_WALLET = 'UQCQIqW_ZDC089aB7Qc_tLTFyCecAvoL7yMc_E-AZs6F4Mvy'

// const { data } = await fetchPortfolio(TEST_WALLET, 'ton', store.walletName)
//
// watch(
//     data,
//     (value) => {
//         if (value) store.addPortfolio(value)
//     },
//     { immediate: true },
// )

onMounted(() => {
    for (const [key, value] of Object.entries(NETWORKS)) {
        tabList.value.push({ label: value, value: key })
    }
})
</script>

<template>
    <app-tabs :tabs="tabList" :current="currentTab" @select-tab="selectTab" />
    <wallet-dashboard />
    <portfolio-add-wallet />
    <wallet-list />
    <sync-status />
</template>

<style scoped></style>
