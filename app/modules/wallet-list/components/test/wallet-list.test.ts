import type { PortfolioData } from '~/modules/portfolio'
import WalletList from '~/modules/wallet-list/components/wallet-list.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'

const makeWallet = (raw: string): PortfolioData => ({
    id: `id-${raw}`,
    name: 'W',
    chain: 'ton',
    address: { raw, friendly: 'EQ...' },
    totalBalanceUsd: 0,
    totalDiff24h: 0,
    nativeToken: { symbol: 'TON', amount: 0, priceUsd: 0, change24h: 0 },
    topTokens: [],
})

const stubs = {
    'wallet-item': { template: '<div class="wallet-item" />' },
    'wallet-item-skeleton': { template: '<div class="wallet-item-skeleton" />' },
}

const mount = (
    wallets: PortfolioData[] = [],
    flags: { isSyncing?: boolean; isAdding?: boolean } = {},
) =>
    mountSuspended(WalletList, {
        global: {
            stubs,
            plugins: [
                createTestingPinia({
                    stubActions: false,
                    createSpy: vi.fn,
                    initialState: {
                        portfolio: {
                            portfolio: wallets,
                            currentChain: 'ton',
                            isSyncing: flags.isSyncing ?? false,
                            isAdding: flags.isAdding ?? false,
                        },
                    },
                }),
            ],
        },
    })

describe('wallet-list', () => {
    it('shows empty state when no wallets', async () => {
        const wrapper = await mount()
        expect(wrapper.text()).toContain('No wallets tracked yet')
        expect(wrapper.find('.wallet-item').exists()).toBe(false)
    })

    it('renders a wallet-item for each wallet', async () => {
        const wrapper = await mount([makeWallet('0:1'), makeWallet('0:2')])
        expect(wrapper.findAll('.wallet-item')).toHaveLength(2)
    })

    it('shows "00" count when no wallets', async () => {
        const wrapper = await mount()
        expect(wrapper.text()).toContain('[ 00 ]')
    })

    it('shows padded count with wallets', async () => {
        const wrapper = await mount([makeWallet('0:1')])
        expect(wrapper.text()).toContain('[ 01 ]')
    })

    it('shows skeleton when isAdding', async () => {
        const wrapper = await mount([], { isAdding: true })
        expect(wrapper.find('.wallet-item-skeleton').exists()).toBe(true)
        expect(wrapper.text()).not.toContain('No wallets tracked yet')
    })

    it('shows syncing text when isSyncing', async () => {
        const wrapper = await mount([makeWallet('0:1')], { isSyncing: true })
        expect(wrapper.text()).toContain('Syncing wallets')
    })

    it('shows syncing text when isAdding', async () => {
        const wrapper = await mount([], { isAdding: true })
        expect(wrapper.text()).toContain('Syncing wallets')
    })
})
