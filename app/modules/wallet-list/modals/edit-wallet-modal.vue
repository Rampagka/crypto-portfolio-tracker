<script setup lang="ts">
import type { PortfolioData } from '~/modules/portfolio'
const store = usePortfolioStore()

const emit = defineEmits<{ close: [] }>()

const props = defineProps<{
    walletShort: Pick<PortfolioData, 'address' | 'name' | 'id'>
}>()

const initialName = props.walletShort.name

const walletName = ref<string>(initialName)

const changeName = () => {
    store.renameWallet(props.walletShort.id, walletName.value)
    showToast('Wallet renamed')
    emit('close')
}

const canEdit = computed(() => {
    return walletName.value.length === 0 || walletName.value === initialName
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <wallet-name-input v-model="walletName" :default-value="initialName" />
        <button-ui :disabled="canEdit" @click="changeName">Save name</button-ui>
    </div>
</template>

<style scoped></style>
