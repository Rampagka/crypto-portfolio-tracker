import type { PortfolioData } from '@/modules/portfolio/models/interfaces/portfolio.interface'

import { fetchPortfolio } from '@/modules/portfolio/services/portfolio.service'

import { usePortfolioPolling } from '~/modules/portfolio/composables/usePortfolioPolling'

import { createTestingPinia } from '@pinia/testing'
import { flushPromises } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'

vi.mock('@/modules/portfolio/services/portfolio.service', () => ({
    fetchPortfolio: vi.fn(),
}))

const mockStart = vi.fn()
const mockStop = vi.fn()

vi.mock('~/common/composables/usePolling', () => ({
    usePolling: () => ({ start: mockStart, stop: mockStop }),
}))

const testWallet = {
    address: { friendly: 'EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2', raw: '0:abc' },
    name: 'W1',
    chain: 'ton',
} as PortfolioData

function withSetup(fn: () => void, initialState: Record<string, unknown> = {}) {
    const app = createApp({
        setup() {
            fn()
            return () => {}
        },
    })
    const pinia = createTestingPinia({ createSpy: vi.fn, stubActions: false, initialState })
    app.use(pinia)
    app.mount(document.createElement('div'))
    return { pinia, unmount: () => app.unmount() }
}

describe('usePorfolioPolling', () => {
    beforeEach(() => {
        vi.mocked(fetchPortfolio).mockReset()
        mockStart.mockReset()
        mockStop.mockReset()
    })

    it('polling not started when no wallets', () => {
        withSetup(() => usePortfolioPolling())
        expect(mockStart).not.toHaveBeenCalled()
        expect(fetchPortfolio).not.toHaveBeenCalled()
    })

    it('calls refreshAllWallets and starts polling on mount if wallets exist', async () => {
        vi.mocked(fetchPortfolio).mockResolvedValue(null)
        withSetup(() => usePortfolioPolling(), {
            portfolio: { portfolio: [testWallet], currentChain: 'ton' },
        })
        await flushPromises()
        expect(fetchPortfolio).toHaveBeenCalled()
        expect(mockStart).toHaveBeenCalled()
    })

    it('stops polling when wallet list becomes empty', async () => {
        vi.mocked(fetchPortfolio).mockResolvedValue(null)
        const { pinia } = withSetup(() => usePortfolioPolling(), {
            portfolio: { portfolio: [testWallet], currentChain: 'ton' },
        })
        await flushPromises()
        const store = usePortfolioStore(pinia)
        store.clearPortfolio()
        await nextTick()
        expect(mockStop).toHaveBeenCalled()
    })

    it('pauses polling after 60s when browser tab is hidden', async () => {
        vi.useFakeTimers()
        vi.mocked(fetchPortfolio).mockResolvedValue(null)
        const { pinia } = withSetup(() => usePortfolioPolling(), {
            portfolio: { portfolio: [testWallet], currentChain: 'ton' },
        })
        await flushPromises()
        usePortfolioStore(pinia)

        Object.defineProperty(document, 'hidden', { value: true, configurable: true })
        document.dispatchEvent(new Event('visibilitychange'))

        await vi.advanceTimersByTimeAsync(60_000)
        expect(mockStop).toHaveBeenCalled()

        Object.defineProperty(document, 'hidden', { value: false, configurable: true })
        vi.useRealTimers()
    })
})
