<script setup lang="ts">
import type { Tab } from '~/common/models/interfaces/tab.interface'
import { WalletDashboard } from '@/modules/wallet-dashboard'

const tabList: Tab[] = [
    {
        value: 'ton',
        label: 'TON',
    },
    {
        value: 'eth',
        label: 'ETH',
    },
]

const currentTab = ref<string>('ton')

const selectTab = (value: string) => {
    currentTab.value = value
}
</script>

<template>
    <main class="flex flex-col gap-5">
        <app-tabs :tabs="tabList" :current="currentTab" @select-tab="selectTab" />
        <wallet-dashboard />
    </main>
</template>

<style scoped></style>
