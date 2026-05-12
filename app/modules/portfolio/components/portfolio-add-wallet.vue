<script setup lang="ts">
import { useAddWallet } from '~/modules/portfolio/composables/useAddWallet'
import { openModal } from '~/common/composables/useModal'
import AddWalletModal from '~/modules/portfolio/modals/add-wallet-modal.vue'
import { errorMap } from '~/modules/portfolio/helpers/inputs-error-map'
import { isValidEthAddress, isValidTonAddress } from '~/modules/portfolio/helpers/validate-address'

const { isError, address, addWalletToPortfolio } = useAddWallet()
const store = usePortfolioStore()

const addWallet = async () => {
    if (address.value.length === 0) {
        return
    }
    if (store.currentChain === 'eth' && !isValidEthAddress(address.value)) {
        isError.value = errorMap['invalid-eth']
        return
    }
    if (store.currentChain === 'ton' && !isValidTonAddress(address.value)) {
        isError.value = errorMap['invalid-ton']
        return
    }
    if (
        store.portfolio.some(
            (item) => item.address.friendly === address.value || item.address.raw === address.value,
        )
    ) {
        isError.value = errorMap['already-added']
        return
    }
    await openModal({
        component: AddWalletModal,
        modalOptions: {
            title: 'Add wallet name',
        },
        props: {
            addWalletToPortfolio,
        },
    })
}
</script>

<template>
    <address-input v-model="address" :error="isError || undefined" @add="addWallet" />
</template>
