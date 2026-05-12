<script setup lang="ts">
import { PortfolioContent } from '@/modules/portfolio'
import { WalletItemSkeleton } from '~/modules/wallet-list/'

const route = useRoute()
const chain = computed(() => {
    const id = route.params.id
    return (Array.isArray(id) ? id[0] : id)?.toUpperCase() ?? 'TON'
})

useHead({
    title: computed(() => `${chain.value} Portfolio`),
    meta: [
        {
            name: 'description',
            content: computed(
                () =>
                    `Track your ${chain.value} wallet balances, token holdings and 24h portfolio changes — no sign-up required. Astra is a free, open crypto portfolio tracker.`,
            ),
        },
    ],
})
</script>

<template>
    <main class="flex flex-col gap-5">
        <ClientOnly>
            <portfolio-content />
            <template #fallback>
                <div class="flex flex-col gap-5 md:mb-5 md:flex-row">
                    <div class="sk md:hidden" style="height: 40px; border-radius: 12px" />
                    <div class="sk md:flex-1" style="height: 125px; border-radius: 12px" />
                    <div class="hidden md:flex md:flex-1 md:flex-col md:justify-between">
                        <div class="sk" style="height: 40px; border-radius: 12px" />
                        <div class="sk" style="height: 46px; border-radius: 12px" />
                    </div>
                    <div class="sk md:hidden" style="height: 46px; border-radius: 12px" />
                </div>
                <div class="sk" style="height: 18px; border-radius: 6px; width: 30%" />
                <div class="flex grid-cols-3 flex-col gap-5 md:grid">
                    <wallet-item-skeleton v-for="i in 3" :key="i" />
                </div>
            </template>
        </ClientOnly>
    </main>
</template>

<style scoped></style>
