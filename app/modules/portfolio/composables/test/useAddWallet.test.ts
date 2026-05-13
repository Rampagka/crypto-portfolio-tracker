import type { PortfolioData } from '@/modules/portfolio/models/interfaces/portfolio.interface'

import { errorMap } from '@/modules/portfolio/helpers/inputs-error-map'

import { fetchPortfolio } from '@/modules/portfolio/services/portfolio.service'

import { useAddWallet } from '~/modules/portfolio/composables/useAddWallet'

import { createTestingPinia } from '@pinia/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { type Ref, createApp, nextTick } from 'vue'

vi.mock('@/modules/portfolio/services/portfolio.service', () => ({
    fetchPortfolio: vi.fn(),
}))

function withSetup<T>(composable: () => T): T {
    let result!: T
    const app = createApp({
        setup() {
            result = composable()
            return () => {}
        },
    })
    app.use(createTestingPinia({ createSpy: vi.fn }))
    app.mount(document.createElement('div'))
    return result
}

describe('useAddWallet', () => {
    let address: Ref<string>
    let isError: Ref<false | string>
    let addWalletToPortfolio: (name: string) => Promise<void>

    beforeEach(() => {
        vi.mocked(fetchPortfolio).mockReset()
        ;({ address, isError, addWalletToPortfolio } = withSetup(() => useAddWallet()))
    })

    it('sets error and watch clears it when address changes', async () => {
        vi.mocked(fetchPortfolio).mockRejectedValue(new Error('fail'))
        address.value = 'bad-address'
        await addWalletToPortfolio('MyWallet')

        expect(isError.value).toBe(errorMap['error'])

        address.value = ''
        await nextTick()
        expect(isError.value).toBe(false)
    })

    it('clears address on successful add', async () => {
        vi.mocked(fetchPortfolio).mockResolvedValue({
            address: { friendly: 'EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2', raw: '0:abc' },
        } as PortfolioData)
        address.value = 'EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2'
        await addWalletToPortfolio('MyWallet')

        expect(address.value).toBe('')
        expect(isError.value).toBe(false)
    })
})
