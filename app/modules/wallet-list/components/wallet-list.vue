<script setup lang="ts">
import WalletItem from '~/modules/wallet-list/components/wallet-item.vue'
import type { Wallet } from '~/modules/wallet-list/models/interfaces/wallet.interface'

const list: Wallet[] = [
    {
        id: 1,
        name: 'Main wallet',
        address: 'UQads123ASs-123Bff-13321_w1SAs!',
        total: 4500,
        toncoinCount: 0,
        topTokens: [
            {
                id: '123',
                name: 'USDT',
                address: 'EQasd113133123213sdasadsadwe123213412',
                total: 500,
            },
            {
                id: '222',
                name: 'NOT',
                address: 'EQasd113133123213sdasadsadwe123213412',
                total: 1200,
            },
            {
                id: '324',
                name: 'STON',
                address: 'EQasd113133123213sdasadsadwe123213412',
                total: 300,
            },
        ],
    },
    {
        id: 2,
        name: 'DeFi',
        address: 'UQads123ASs-123Bff-13321_w1SAs1223',
        total: 1700,
        toncoinCount: 100,
        topTokens: [
            {
                id: '123',
                name: 'USDT',
                address: 'EQasd113133123213sdasadsadwe123213412',
                total: 1000,
            },
            {
                id: '222',
                name: 'NOT',
                address: 'EQasd113133123213sdasadsadwe123213412',
                total: 950,
            },
            {
                id: '324',
                name: 'DUST',
                address: 'EQasd113133123213sdasadsadwe123213412',
                total: 100,
            },
        ],
    },
]
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between text-[12px]">
            <h4 class="text-mute font-mono tracking-widest uppercase">Tracked wallets</h4>
            <p class="text-accent">[ 02 ]</p>
        </div>
        <wallet-item v-for="item in list" :key="item.id" :item="item" />
    </div>
</template>

<style scoped></style>
