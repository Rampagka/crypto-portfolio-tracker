<script setup lang="ts">
import RemoveWalletModal from '~/modules/wallet-list/modals/remove-wallet-modal.vue'
import EditWalletModal from '~/modules/wallet-list/modals/edit-wallet-modal.vue'
import type { PortfolioData } from '~/modules/portfolio'

const props = defineProps<{
    walletShort: Pick<PortfolioData, 'name' | 'address' | 'id'>
}>()

const openEditModal = async () => {
    await openModal({
        component: EditWalletModal,
        modalOptions: {
            title: getNameByOption('edit'),
        },
        props: {
            walletShort: props.walletShort,
        },
    })
}

const openRemoveModal = async () => {
    await openModal({
        component: RemoveWalletModal,
        modalOptions: {
            title: getNameByOption('remove'),
        },
        props: {
            walletShort: props.walletShort,
        },
    })
}

const options = {
    edit: openEditModal,
    remove: openRemoveModal,
}

const getNameByOption = (key: keyof typeof options) => {
    if (key === 'edit') {
        return 'Edit wallet name'
    } else {
        return 'Remove wallet'
    }
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <button-ui
            v-for="(option, key) in options"
            :key="key"
            :variant="key === 'remove' ? 'danger' : 'primary'"
            class="w-full p-4"
            @click="option"
        >
            {{ getNameByOption(key) }}
        </button-ui>
    </div>
</template>

<style scoped></style>
