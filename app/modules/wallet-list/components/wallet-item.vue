<script setup lang="ts">
import CardWrapper from '~/common/wrappers/card-wrapper.vue'
import type { PortfolioData } from '@/modules/portfolio'
import { getFormattedAmount } from '~/common/utils/format-amounts'
import { truncWalletAddress } from '~/common/utils/trunc-wallet-address'
import OptionsWalletModal from '~/modules/wallet-list/modals/options-wallet-modal.vue'

defineProps<{
    item: PortfolioData
}>()

const store = usePortfolioStore()

const openOptionsModal = async (wallet: Pick<PortfolioData, 'name' | 'address' | 'id'>) => {
    await openModal({
        component: OptionsWalletModal,
        modalOptions: {},
        props: { walletShort: wallet },
    })
}
</script>

<template>
    <card-wrapper :with-neon-animation="true">
        <div class="flex min-h-[40px] flex-col gap-3 p-4 font-mono">
            <!-- name + address + menu — всегда видны -->
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="font-ui mb-1 text-sm">{{ item.name }}</h3>
                    <p class="text-mute text-[11px]">
                        {{ truncWalletAddress('ton', item.address.friendly) }}
                    </p>
                </div>
                <div class="flex items-center gap-2">
                    <button
                        class="menu-btn border-border flex h-7.5 w-7.5 items-center justify-center rounded-[6px] border"
                        @click="
                            openOptionsModal({
                                name: item.name,
                                address: item.address,
                                id: item.id,
                            })
                        "
                    >
                        <Icon name="iconamoon:menu-kebab-vertical" class="text-mute" />
                    </button>
                </div>
            </div>

            <!-- баланс + diff -->
            <div class="flex items-end justify-between">
                <template v-if="store.isSyncing">
                    <div class="flex flex-col gap-1.5">
                        <div class="sk" style="width: 130px; height: 30px" />
                        <div class="sk" style="width: 80px; height: 14px" />
                    </div>
                    <div class="sk" style="width: 56px; height: 18px" />
                </template>
                <template v-else>
                    <div>
                        <h2 class="mb-0.5 text-[20px]">
                            {{ getFormattedAmount(item.totalBalanceUsd, 'USD') }}
                        </h2>
                        <p class="text-mute text-[12px]">
                            {{
                                getFormattedAmount(item?.nativeToken?.amount, 'TON') +
                                ` | ${getFormattedAmount(item?.nativeToken?.priceUsd * item?.nativeToken?.amount, 'USD')}`
                            }}
                        </p>
                    </div>
                    <div>Chart</div>
                </template>
            </div>

            <div class="divide h-[1px] w-full" />

            <!-- top tokens -->
            <div class="flex flex-col gap-1">
                <h4 class="text-mute text-[10px] uppercase">Top tokens</h4>
                <template v-if="store.isSyncing">
                    <div
                        v-for="i in 3"
                        :key="i"
                        class="flex items-center justify-between"
                        style="height: 18px"
                    >
                        <div class="flex items-center gap-2">
                            <div class="sk rounded-full" style="width: 4px; height: 4px" />
                            <div class="sk" style="width: 50px; height: 14px" />
                        </div>
                        <div class="sk" style="width: 72px; height: 14px" />
                    </div>
                </template>
                <ul v-else class="flex w-full flex-col gap-1">
                    <li
                        v-for="token in item.topTokens"
                        :key="`${token.name}_${token.symbol}`"
                        class="flex items-center justify-between text-[12px]"
                    >
                        <p class="flex items-center gap-2">
                            <span class="bg-accent block h-1 w-1 shrink-0 rounded-full" />
                            {{ token.symbol }}
                        </p>
                        <p class="text-mute">
                            <span>{{ getFormattedAmount(token.amount) }}</span>
                            |
                            <span>{{ getFormattedAmount(token.totalUsd, 'USD') }}</span>
                        </p>
                    </li>
                </ul>
            </div>
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
        transparent 20%,
        color-mix(in srgb, var(--color-accent), transparent 67%) 50%,
        transparent 80%,
        transparent 100%
    );
    animation: skel-sweep 1.6s linear infinite;
}

.divide {
    background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent), transparent 67%), transparent);
}

.menu-btn,
.menu-btn span {
    transition: 0.18s;
}

.menu-btn:active,
.menu-btn:active span {
    border-color: var(--color-mute);
    color: white;
}
</style>
