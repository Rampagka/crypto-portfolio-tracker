<script setup lang="ts">
import CardWrapper from '~/common/wrappers/card-wrapper.vue'
import type { PortfolioData } from '@/modules/portfolio'
import { getFormattedAmount } from '~/common/utils/format-amounts'
import { truncWalletAddress } from '~/common/utils/trunc-wallet-address'
import OptionsWalletModal from '~/modules/wallet-list/modals/options-wallet-modal.vue'

const props = defineProps<{
    item: PortfolioData
}>()

const copySuccessState = ref(false)

const store = usePortfolioStore()

const openOptionsModal = async (wallet: Pick<PortfolioData, 'name' | 'address' | 'id'>) => {
    await openModal({
        component: OptionsWalletModal,
        modalOptions: {
            title: 'Wallet actions',
        },
        props: { walletShort: wallet },
    })
}

const copyAddress = async () => {
    if (!import.meta.client) return
    try {
        const address = props.item.address.friendly
        await navigator.clipboard.writeText(address)
        copySuccessState.value = true
    } catch (err) {
        console.error(err)
        throw err
    } finally {
        setTimeout(() => (copySuccessState.value = false), 1000)
    }
}
</script>

<template>
    <card-wrapper :with-neon-animation="true" class="w-full">
        <div class="flex min-h-[40px] w-full flex-col gap-3 p-4 font-mono">
            <div class="flex items-start justify-between">
                <div class="max-w-[80dvw]">
                    <h3 class="font-ui mb-1 text-sm">{{ item.name }}</h3>
                    <button
                        class="flex items-center gap-1 text-[11px] ease-in active:text-white"
                        :class="copySuccessState ? 'text-gain' : 'text-mute'"
                        @click="copyAddress"
                    >
                        {{ truncWalletAddress('ton', item.address.friendly) }}
                        <Icon v-if="copySuccessState" name="iconamoon:check-fill" size="1.3em" />
                        <Icon v-else name="iconamoon:copy" size="1.3em" />
                    </button>
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
            <div class="flex max-w-[80dvw] items-end justify-between">
                <template v-if="store.isSyncing">
                    <div class="flex flex-col gap-1.5">
                        <div class="sk" style="width: 130px; height: 30px" />
                        <div class="sk" style="width: 80px; height: 14px" />
                    </div>
                    <!--                    <div class="sk" style="width: 56px; height: 18px" />-->
                </template>
                <template v-else>
                    <div>
                        <h2 class="mb-0.5 text-[20px]">
                            <!--                            $372,213.,3213123.321312.321.00.321321.213-->
                            {{ getFormattedAmount(item.totalBalanceUsd, 'USD') }}
                        </h2>
                        <p class="text-mute text-[12px]">
                            {{
                                getFormattedAmount(
                                    item?.nativeToken?.amount,
                                    store.currentChain.toUpperCase(),
                                ) +
                                ` | ${getFormattedAmount((item?.nativeToken?.priceUsd ?? 0) * (item?.nativeToken?.amount ?? 0), 'USD')}`
                            }}
                        </p>
                    </div>
                    <!--                    <div>Chart</div>-->
                </template>
            </div>

            <div class="sk-divide h-[1px] w-full" />

            <!-- top tokens -->
            <div class="flex flex-col gap-1">
                <h4 class="text-mute text-[10px] uppercase">Top tokens</h4>
                <template v-if="store.isSyncing">
                    <div
                        v-for="i in item?.topTokens?.length ?? 3"
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
