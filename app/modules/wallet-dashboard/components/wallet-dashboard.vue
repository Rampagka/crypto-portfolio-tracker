<script setup lang="ts">
import CardWrapper from '~/common/wrappers/card-wrapper.vue'
import { getFormattedAmount } from '~/common/utils/format-amounts'

const store = usePortfolioStore()

const wallets = computed(() =>
    store.currentChain === 'ton' ? store.getTonWallets : store.getEthWallets,
)

const showSkeleton = computed(() => store.isSyncing && wallets.value.length === 0)

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
                    <div class="flex flex-col gap-2">
                        <div class="sk" style="width: 160px; height: 32px" />
                        <div class="sk" style="width: 120px; height: 14px" />
                    </div>
                    <div class="sk rounded-[4px]" style="width: 72px; height: 48px" />
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
                                {{ isPositive ? '+' : '' }}{{ getFormattedAmount(diff24hUsd, 'USD') }}
                                ({{ isPositive ? '+' : '' }}{{ getFormattedAmount(diff24hPercent, '%') }})
                            </span>
                            <span class="text-mute">24h</span>
                        </p>
                    </div>
                    <div>CHART</div>
                </div>
            </template>
        </div>
    </card-wrapper>
</template>

<style scoped>
.sk {
    border-radius: 3px;
    position: relative;
    overflow: hidden;
    animation: skel-pulse 1.6s ease-in-out infinite;
}

.sk::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(0, 229, 255, 0) 20%,
        rgba(0, 229, 255, 0.33) 50%,
        rgba(0, 229, 255, 0) 80%,
        transparent 100%
    );
    animation: skel-sweep 1.6s linear infinite;
}
</style>
