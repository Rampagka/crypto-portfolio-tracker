<script setup lang="ts">
const props = defineProps<{
    addWalletToPortfolio: (name: string) => Promise<void>
}>()

const emit = defineEmits<{ close: [] }>()
const initialName = 'MyWallet'
const walletName = ref(initialName)

const handleAdd = async () => {
    emit('close')
    await props.addWalletToPortfolio(walletName.value)
}

const nameIsEmpty = computed(() => walletName.value.length === 0)
</script>

<template>
    <div class="flex flex-col gap-4">
        <wallet-name-input v-model="walletName" :default-value="initialName" />
        <button-ui :disabled="nameIsEmpty" @click="handleAdd">Add wallet</button-ui>
    </div>
</template>

<style scoped></style>
