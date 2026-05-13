import { openModal } from '~/common/composables/useModal'
import type { PortfolioData } from '~/modules/portfolio'
import WalletItem from '~/modules/wallet-list/components/wallet-item.vue'
import OptionsWalletModal from '~/modules/wallet-list/modals/options-wallet-modal.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { createTestingPinia } from '@pinia/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('~/common/composables/useModal', () => ({ openModal: vi.fn() }))

const item: PortfolioData = {
    id: 'id-1',
    name: 'My Wallet',
    chain: 'ton',
    address: { raw: '0:abc', friendly: 'EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2' },
    totalBalanceUsd: 500,
    totalDiff24h: 2,
    nativeToken: { symbol: 'TON', amount: 10, priceUsd: 3, change24h: 2 },
    topTokens: [],
}

const stubs = {
    'card-wrapper': { template: '<div><slot /></div>' },
    Icon: { template: '<span />' },
}

const mount = (isSyncing = false) =>
    mountSuspended(WalletItem, {
        props: { item },
        global: {
            stubs,
            plugins: [
                createTestingPinia({
                    createSpy: vi.fn,
                    stubActions: false,
                    initialState: { portfolio: { isSyncing } },
                }),
            ],
        },
    })

describe('wallet-item', () => {
    beforeEach(() => vi.mocked(openModal).mockReset())

    it('renders the wallet name', async () => {
        const wrapper = await mount()
        expect(wrapper.text()).toContain('My Wallet')
    })

    it('opens OptionsWalletModal with correct props when menu button is clicked', async () => {
        const wrapper = await mount()
        const buttons = wrapper.findAll('button')
        const menuBtn = buttons[buttons.length - 1]
        await menuBtn?.trigger('click')
        expect(openModal).toHaveBeenCalledWith(
            expect.objectContaining({
                component: OptionsWalletModal,
                props: expect.objectContaining({
                    walletShort: expect.objectContaining({ id: item.id, name: item.name }),
                }),
            }),
        )
    })

    it('copies address and sets copySuccessState on click', async () => {
        vi.useFakeTimers()
        const clipboardMock = vi.fn().mockResolvedValue(undefined)
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText: clipboardMock },
            configurable: true,
        })

        const wrapper = await mount()
        const copyBtn = wrapper.findAll('button')[0]
        await copyBtn?.trigger('click')
        await nextTick()

        expect(clipboardMock).toHaveBeenCalledWith(item.address.friendly)

        vi.useRealTimers()
    })

    it('shows skeleton elements when isSyncing', async () => {
        const wrapper = await mount(true)
        expect(wrapper.find('.sk').exists()).toBe(true)
    })

    it('shows balance and tokens when not syncing', async () => {
        const wrapper = await mount(false)
        expect(wrapper.text()).toContain('$500.00')
    })
})
