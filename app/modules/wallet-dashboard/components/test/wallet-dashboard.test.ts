import type { PortfolioData } from '~/modules/portfolio'
import WalletDashboard from '~/modules/wallet-dashboard/components/wallet-dashboard.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'

const makeWallet = (totalBalanceUsd: number, totalDiff24h: number): PortfolioData => ({
    id: crypto.randomUUID(),
    name: 'W',
    chain: 'ton',
    address: { raw: `0:${Math.random()}`, friendly: 'EQ...' },
    totalBalanceUsd,
    totalDiff24h,
    nativeToken: { symbol: 'TON', amount: 1, priceUsd: 1, change24h: 0 },
    topTokens: [],
})

const stubs = {
    'card-wrapper': { template: '<div><slot /></div>' },
}

const mount = (wallets: PortfolioData[] = [], isSyncing = false) =>
    mountSuspended(WalletDashboard, {
        global: {
            stubs,
            plugins: [
                createTestingPinia({
                    createSpy: vi.fn,
                    stubActions: false,
                    initialState: {
                        portfolio: { portfolio: wallets, currentChain: 'ton', isSyncing },
                    },
                }),
            ],
        },
    })

describe('wallet-dashboard', () => {
    it('shows $0.00 when no wallets', async () => {
        const wrapper = await mount()
        expect(wrapper.text()).toContain('$0.00')
    })

    it('shows correct total balance across all wallets', async () => {
        const wrapper = await mount([makeWallet(1000, 0), makeWallet(500, 0)])
        expect(wrapper.text()).toContain('$1,500.00')
    })

    it('shows ▲ for positive 24h diff', async () => {
        const wrapper = await mount([makeWallet(1000, 10)])
        expect(wrapper.text()).toContain('▲')
    })

    it('shows ▼ for negative 24h diff', async () => {
        const wrapper = await mount([makeWallet(1000, -5)])
        expect(wrapper.text()).toContain('▼')
    })

    it('shows zero percent diff when no wallets', async () => {
        const wrapper = await mount()
        expect(wrapper.text()).toContain('+0%')
    })

    it('shows skeleton and hides balance when isSyncing', async () => {
        const wrapper = await mount([makeWallet(1000, 0)], true)
        expect(wrapper.find('.sk').exists()).toBe(true)
        expect(wrapper.text()).not.toContain('$1,000.00')
    })
})
