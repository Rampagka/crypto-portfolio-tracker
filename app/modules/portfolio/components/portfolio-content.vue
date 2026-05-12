<script setup lang="ts">
import { NETWORKS } from '@/common/models/types/networks.type'
import { WalletDashboard } from '@/modules/wallet-dashboard'
import { WalletList } from '@/modules/wallet-list'

import PortfolioAddWallet from '@/modules/portfolio/components/portfolio-add-wallet.vue'

const route = useRoute()

const tabList = Object.entries(NETWORKS).map(([key, value]) => ({ label: value, value: key }))
const currentTab = computed(() => {
    const id = route.params.id
    return (Array.isArray(id) ? id[0] : id) || 'ton'
})

const selectTab = (value: string) => {
    navigateTo(`/portfolio/${value}`)
}

onMounted(() => {
    const id = route.params.id
    const chain = (Array.isArray(id) ? id[0] : id)?.toLowerCase()
    if (chain && !Object.keys(NETWORKS).includes(chain)) {
        navigateTo('/portfolio/ton', { replace: true })
    }
})
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-5 md:mb-5 md:flex-row">
            <app-tabs
                :tabs="tabList"
                :current="currentTab"
                class="flex-1 md:hidden"
                @select-tab="selectTab"
            />
            <wallet-dashboard class="flex-1" />
            <div class="flex-1 md:flex md:flex-col md:justify-between">
                <app-tabs
                    :tabs="tabList"
                    :current="currentTab"
                    class="hidden md:flex"
                    @select-tab="selectTab"
                />
                <portfolio-add-wallet />
            </div>
        </div>
    </div>
    <div class="flex w-full flex-col gap-5">
        <wallet-list />
        <sync-status />
    </div>
</template>

<style scoped></style>
