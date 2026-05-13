import type { PortfolioData } from '~/modules/portfolio/models/interfaces/portfolio.interface'

import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'

const makeWallet = (raw: string, chain: 'ton' | 'eth' = 'ton'): PortfolioData => ({
    id: `id-${raw}`,
    name: 'Test',
    chain,
    address: { raw, friendly: `EQ${raw}` },
    totalBalanceUsd: 100,
    totalDiff24h: 0,
    nativeToken: { symbol: 'TON', amount: 1, priceUsd: 3, change24h: 0 },
    topTokens: [],
})

function withStore() {
    let store: ReturnType<typeof usePortfolioStore>
    const app = createApp({
        setup() {
            store = usePortfolioStore()
            return () => {}
        },
    })
    app.use(createTestingPinia({ stubActions: false, createSpy: vi.fn }))
    app.mount(document.createElement('div'))
    return store!
}

describe('portfolio.store', () => {
    describe('addWalletToPortfolio', () => {
        it('adds a wallet to the portfolio', () => {
            const store = withStore()
            store.addWalletToPortfolio(makeWallet('0:1'))
            expect(store.portfolio).toHaveLength(1)
        })

        it('does not add a wallet with a duplicate raw address', () => {
            const store = withStore()
            store.addWalletToPortfolio(makeWallet('0:1'))
            store.addWalletToPortfolio(makeWallet('0:1'))
            expect(store.portfolio).toHaveLength(1)
        })

        it('does not exceed MAX_SIZE of 5 wallets', () => {
            const store = withStore()
            for (let i = 0; i < 6; i++) store.addWalletToPortfolio(makeWallet(`0:${i}`))
            expect(store.portfolio).toHaveLength(5)
        })
    })

    describe('updateWallet', () => {
        it('updates balance of an existing wallet', () => {
            const store = withStore()
            store.addWalletToPortfolio(makeWallet('0:1'))
            store.updateWallet({ ...makeWallet('0:1'), totalBalanceUsd: 999 })
            expect(store.portfolio[0]?.totalBalanceUsd).toBe(999)
        })

        it('preserves id and name after update', () => {
            const store = withStore()
            const wallet = makeWallet('0:1')
            store.addWalletToPortfolio(wallet)
            store.updateWallet({ ...makeWallet('0:1'), name: 'ShouldBeIgnored' })
            expect(store.portfolio[0]?.id).toBe(wallet.id)
            expect(store.portfolio[0]?.name).toBe(wallet.name)
        })

        it('does nothing if wallet is not in portfolio', () => {
            const store = withStore()
            store.addWalletToPortfolio(makeWallet('0:1'))
            store.updateWallet(makeWallet('0:999'))
            expect(store.portfolio).toHaveLength(1)
        })
    })

    describe('removeWalletById', () => {
        it('removes wallet by id', () => {
            const store = withStore()
            const wallet = makeWallet('0:1')
            store.addWalletToPortfolio(wallet)
            store.removeWalletById(wallet.id)
            expect(store.portfolio).toHaveLength(0)
        })

        it('does nothing for an unknown id', () => {
            const store = withStore()
            store.addWalletToPortfolio(makeWallet('0:1'))
            store.removeWalletById('nonexistent')
            expect(store.portfolio).toHaveLength(1)
        })
    })

    describe('renameWallet', () => {
        it('renames wallet by id', () => {
            const store = withStore()
            const wallet = makeWallet('0:1')
            store.addWalletToPortfolio(wallet)
            store.renameWallet(wallet.id, 'NewName')
            expect(store.portfolio[0]?.name).toBe('NewName')
        })
    })

    describe('clearPortfolio', () => {
        it('removes all wallets', () => {
            const store = withStore()
            store.addWalletToPortfolio(makeWallet('0:1'))
            store.addWalletToPortfolio(makeWallet('0:2'))
            store.clearPortfolio()
            expect(store.portfolio).toHaveLength(0)
        })
    })

    describe('currentChainWallets', () => {
        it('returns only TON wallets when currentChain is ton', () => {
            const store = withStore()
            store.addWalletToPortfolio(makeWallet('0:1', 'ton'))
            store.addWalletToPortfolio(makeWallet('0:2', 'eth'))
            store.currentChain = 'ton'
            expect(store.currentChainWallets).toHaveLength(1)
            expect(store.currentChainWallets[0]?.chain).toBe('ton')
        })

        it('returns only ETH wallets when currentChain is eth', () => {
            const store = withStore()
            store.addWalletToPortfolio(makeWallet('0:1', 'ton'))
            store.addWalletToPortfolio(makeWallet('0:2', 'eth'))
            store.currentChain = 'eth'
            expect(store.currentChainWallets).toHaveLength(1)
            expect(store.currentChainWallets[0]?.chain).toBe('eth')
        })

        it('returns empty array when portfolio is empty', () => {
            const store = withStore()
            expect(store.currentChainWallets).toHaveLength(0)
        })
    })
})
