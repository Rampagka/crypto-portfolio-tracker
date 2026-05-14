<script setup lang="ts">
import AddWalletModal from '~/modules/portfolio/modals/add-wallet-modal.vue'
import { openModal } from '~/common/composables/useModal'
import { useAddWallet } from '~/modules/portfolio/composables/useAddWallet'
import { errorMap } from '~/modules/portfolio/helpers/inputs-error-map'
import { isValidEthAddress, isValidTonAddress } from '~/modules/portfolio/helpers/validate-address'

const { isError, address, addWalletToPortfolio } = useAddWallet()
const store = usePortfolioStore()

const addWallet = async () => {
    if (address.value.length === 0) return

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

    const name = await openModal<string>({
        component: AddWalletModal,
        modalOptions: { title: 'Add wallet name' },
    })

    if (!name) return

    await addWalletToPortfolio(name)
    if (!isError.value) showToast('Wallet added')
}
</script>

<template>
    <address-input v-model="address" :error="isError || undefined" @add="addWallet" />
</template>
