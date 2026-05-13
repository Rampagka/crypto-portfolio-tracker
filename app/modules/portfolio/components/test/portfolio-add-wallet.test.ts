import AddressInput from '~/common/components/address-input.vue'
import { openModal } from '~/common/composables/useModal'
import PortfolioAddWallet from '~/modules/portfolio/components/portfolio-add-wallet.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { createTestingPinia } from '@pinia/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('~/common/composables/useModal', () => ({ openModal: vi.fn() }))

const mockAddress = ref('')
const mockIsError = ref<false | string>(false)

vi.mock('~/modules/portfolio/composables/useAddWallet', () => ({
    useAddWallet: () => ({
        address: mockAddress,
        isError: mockIsError,
        addWalletToPortfolio: vi.fn(),
    }),
}))

const mount = (storeOverrides = {}) =>
    mountSuspended(PortfolioAddWallet, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                        portfolio: {
                            currentChain: 'ton',
                            portfolio: [],
                            ...storeOverrides,
                        },
                    },
                    createSpy: vi.fn,
                }),
            ],
        },
    })

const triggerAdd = (wrapper: Awaited<ReturnType<typeof mount>>) =>
    wrapper.findComponent(AddressInput).vm.$emit('add')

describe('PortfolioAddWallet', () => {
    beforeEach(() => {
        mockAddress.value = ''
        mockIsError.value = false
        vi.mocked(openModal).mockReset()
    })
    it('does nothing when address is empty', async () => {
        const wrapper = await mount()
        await triggerAdd(wrapper)
        // await wrapper.vm.addWallet()
        expect(openModal).not.toHaveBeenCalled()
    })
    it('sets invalid-eth error for bad ETH address', async () => {
        const wrapper = await mount({ currentChain: 'eth' })
        mockAddress.value = 'fake ETH address'
        await triggerAdd(wrapper)

        expect(mockIsError.value).toBe('Invalid ETH address')
        expect(openModal).not.toHaveBeenCalled()
    })
    it('sets invalid-ton error fro bad TON address', async () => {
        const wrapper = await mount()
        mockAddress.value = 'fake TON address'
        await triggerAdd(wrapper)

        expect(mockIsError.value).toBe('Invalid TON address')
        expect(openModal).not.toHaveBeenCalled()
    })
    it('sets already-added error for duplicate address', async () => {
        const wallet = {
            address: { friendly: 'EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2', raw: '0:abc' },
        }
        const wrapper = await mount({ portfolio: [wallet] })
        mockAddress.value = 'EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2'
        await triggerAdd(wrapper)

        expect(mockIsError.value).toBe('This wallet has already been added.')
    })
    it('opens AddWalletModal for valid new address', async () => {
        const wrapper = await mount({ currentChain: 'ton' })
        mockAddress.value = 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'
        await triggerAdd(wrapper)

        expect(openModal).toHaveBeenCalledWith(
            expect.objectContaining({ modalOptions: { title: 'Add wallet name' } }),
        )
    })
})
