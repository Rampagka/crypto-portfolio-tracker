<script setup lang="ts">
import CardWrapper from '~/common/wrappers/card-wrapper.vue'
import { getFormattedAmount } from '~/common/utils/format-amounts'

const store = usePortfolioStore()

const wallets = computed(() => store.currentChainWallets)

const showSkeleton = computed(() => store.isSyncing)

const totalBalanceUsd = computed(() =>
    wallets.value.reduce((acc, cur) => acc + cur.totalBalanceUsd, 0),
)

const totalUsd = computed(() => getFormattedAmount(totalBalanceUsd.value, 'USD'))

const diff24hUsd = computed(() =>
    wallets.value.reduce((acc, cur) => acc + (cur.totalBalanceUsd * cur.totalDiff24h) / 100, 0),
)

const diff24hPercent = computed(() =>
    totalBalanceUsd.value > 0 ? (diff24hUsd.value / totalBalanceUsd.value) * 100 : 0,
)

const isPositive = computed(() => diff24hUsd.value >= 0)
</script>

<template>
    <card-wrapper :with-styled-angles="true" :with-neon-animation="true">
        <div class="flex flex-col gap-2 p-4 font-mono">
            <p class="flex items-center gap-2 text-xl text-[12px] tracking-widest uppercase">
                <span class="text-mute">Total balance</span>
                <span class="text-mute">·</span>
                <span class="text-accent">All wallets</span>
            </p>

            <template v-if="showSkeleton">
                <div class="flex items-end justify-between">
                    <div class="flex flex-col gap-1.5">
                        <div class="sk" style="width: 160px; height: 40px" />
                        <div class="sk" style="width: 120px; height: 20px" />
                    </div>
                    <!--                    <div class="sk rounded-[4px]" style="width: 72px; height: 48px" />-->
                </div>
            </template>

            <template v-else>
                <div class="flex items-end justify-between">
                    <div class="flex flex-col gap-1.5">
                        <h2 class="text-[32px] leading-10 font-bold tracking-tighter">
                            {{ totalUsd }}
                        </h2>
                        <p class="flex items-center gap-2 text-sm">
                            <span :class="isPositive ? 'text-gain' : 'text-loss'">
                                {{ isPositive ? '▲' : '▼' }}
                                {{ isPositive ? '+' : ''
                                }}{{ getFormattedAmount(diff24hUsd, 'USD') }} ({{
                                    isPositive ? '+' : ''
                                }}{{ getFormattedAmount(diff24hPercent, '%') }})
                            </span>
                            <span class="text-mute">24h</span>
                        </p>
                    </div>
                    <!--                    <div>CHART</div>-->
                </div>
            </template>
        </div>
    </card-wrapper>
</template>

<style scoped></style>
