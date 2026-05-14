<script setup lang="ts">
const emit = defineEmits<{ result: [name: string] }>()

const initialName = 'MyWallet'
const walletName = ref(initialName)
const nameIsEmpty = computed(() => walletName.value.length === 0)
</script>

<template>
    <div class="flex flex-col gap-4">
        <wallet-name-input v-model="walletName" :default-value="initialName" />
        <button-ui :disabled="nameIsEmpty" @click="emit('result', walletName)">
            Add wallet
        </button-ui>
    </div>
</template>

<style scoped></style>
