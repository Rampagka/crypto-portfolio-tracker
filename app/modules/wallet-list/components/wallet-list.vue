<script setup lang="ts">
import WalletItem from '@/modules/wallet-list/components/wallet-item.vue'

const store = usePortfolioStore()

const wallets = computed(() =>
    store.currentChain === 'ton' ? store.getTonWallets : store.getEthWallets,
)

const count = computed(() => wallets.value.length.toString().padStart(2, '0'))
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between text-[12px]">
            <h4 class="text-mute font-mono tracking-widest uppercase">Tracked wallets</h4>
            <p class="text-accent">[ {{ count }} ]</p>
        </div>
        <wallet-item v-for="item in wallets" :key="item.address.raw" :item="item" />
    </div>
</template>

<style scoped></style>
