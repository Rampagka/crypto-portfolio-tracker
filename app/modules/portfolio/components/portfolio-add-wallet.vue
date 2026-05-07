<script setup lang="ts">
import { useAddWallet } from '~/modules/portfolio/composables/useAddWallet'

const { isError, address, addWalletToPortfolio } = useAddWallet()
</script>

<template>
    <address-input
        v-model="address"
        :error="isError ? 'Invalid TON address' : undefined"
        @add="addWalletToPortfolio"
    />
</template>
