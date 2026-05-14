<script setup lang="ts">
import type { PortfolioData } from '~/modules/portfolio'
const store = usePortfolioStore()
const emit = defineEmits<{ close: [] }>()
const props = defineProps<{
    walletShort: Pick<PortfolioData, 'name' | 'address' | 'id'>
}>()

const removeWallet = () => {
    store.removeWalletById(props.walletShort.id)
    showToast('Wallet removed')
    emit('close')
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <h4 class="text-[16px]">
            Are you sure you want to delete "{{ props.walletShort.name }}" wallet?
        </h4>
        <button-ui variant="danger" @click="removeWallet">Remove this wallet</button-ui>
    </div>
</template>

<style scoped></style>
