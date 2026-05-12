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
    <div class="flex min-w-[320px] flex-col gap-5">
        <div class="flex flex-col gap-5 md:mb-5 md:flex-row">
            <!--            <app-tabs-->
            <!--                :tabs="tabList"-->
            <!--                :current="currentTab"-->
            <!--                @select-tab="selectTab"-->
            <!--                class="flex-1"-->
            <!--            />-->
            <wallet-dashboard class="flex-1" />
            <portfolio-add-wallet class="flex-1" />
        </div>
        <!--        <portfolio-add-wallet />-->
        <!-- todo: Вернуть как появятся две сети ton/eth -->
    </div>
    <div class="flex w-full flex-col gap-5">
        <wallet-list />
        <sync-status />
    </div>
</template>

<style scoped></style>
