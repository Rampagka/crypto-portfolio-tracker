<script setup lang="ts">
import WalletItem from '@/modules/wallet-list/components/wallet-item.vue'
import WalletItemSkeleton from '@/modules/wallet-list/components/wallet-item-skeleton.vue'

const store = usePortfolioStore()

const wallets = computed(() => store.currentChainWallets)

const count = computed(() => wallets.value.length.toString().padStart(2, '0'))
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between text-[12px]">
            <h4 class="text-mute font-mono tracking-widest uppercase">Tracked wallets</h4>
            <Transition name="fade" mode="out-in">
                <p
                    v-if="store.isSyncing || store.isAdding"
                    key="syncing"
                    class="text-accent flex items-center gap-1.5"
                >
                    <span class="syncing-spinner" />
                    <span class="font-mono text-[10px] tracking-widest uppercase">
                        Syncing wallets
                    </span>
                </p>
                <p v-else key="count" class="text-accent">[ {{ count }} ]</p>
            </Transition>
        </div>

        <div
            v-if="wallets.length || store.isAdding"
            class="flex flex-col gap-5 md:grid md:grid-cols-3"
        >
            <wallet-item
                v-for="item in wallets"
                :key="item.address.raw"
                :item="item"
                data-test="wallet-item"
            />
            <wallet-item-skeleton v-if="store.isAdding" />
        </div>
        <div v-else class="empty-state">
            <p class="text-mute font-mono text-[11px] tracking-widest uppercase">
                No wallets tracked yet
            </p>
        </div>
    </div>
</template>

<style scoped>
.syncing-spinner {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1.5px solid var(--color-accent);
    border-top-color: transparent;
    box-shadow: 0 0 6px var(--color-accent);
    animation: spin 0.9s linear infinite;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.empty-state {
    height: 72px;
    border: 1px dashed color-mix(in srgb, var(--color-accent), transparent 70%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
