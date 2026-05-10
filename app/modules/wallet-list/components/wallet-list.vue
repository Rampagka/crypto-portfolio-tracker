<script setup lang="ts">
import WalletItem from '@/modules/wallet-list/components/wallet-item.vue'
import WalletItemSkeleton from '@/modules/wallet-list/components/wallet-item-skeleton.vue'

const store = usePortfolioStore()

const wallets = computed(() =>
    store.currentChain === 'ton' ? store.getTonWallets : store.getEthWallets,
)

const count = computed(() => wallets.value.length.toString().padStart(2, '0'))
</script>

<template>
    <div class="flex flex-col gap-5">
        <Transition name="fade">
            <div v-if="store.isSyncing" class="flex items-center gap-2 font-mono text-[10px] tracking-widest text-accent uppercase">
                <span class="syncing-spinner" />
                SYNCING WALLETS…
            </div>
        </Transition>

        <div class="flex items-center justify-between text-[12px]">
            <h4 class="text-mute font-mono tracking-widest uppercase">Tracked wallets</h4>
            <p class="text-accent">[ {{ count }} ]</p>
        </div>

        <wallet-item v-for="item in wallets" :key="item.address.raw" :item="item" />
        <wallet-item-skeleton v-if="store.isSyncing" />
    </div>
</template>

<style scoped>
.syncing-spinner {
    width: 10px;
    height: 10px;
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
</style>
