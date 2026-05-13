import RemoveWalletModal from '~/modules/wallet-list/modals/remove-wallet-modal.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'

const walletShort = {
    id: 'wallet-1',
    name: 'My Wallet',
    address: { raw: '0:abc', friendly: 'EQabc' },
}

const mount = () =>
    mountSuspended(RemoveWalletModal, {
        props: { walletShort },
        global: {
            plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false })],
            stubs: {
                'button-ui': {
                    template: '<button @click="$emit(\'click\')"><slot /></button>',
                    emits: ['click'],
                },
            },
        },
    })

describe('remove-wallet-modal', () => {
    it('calls removeWalletById with the correct id on click', async () => {
        const wrapper = await mount()
        const store = usePortfolioStore()
        vi.spyOn(store, 'removeWalletById')
        await wrapper.find('button').trigger('click')
        expect(store.removeWalletById).toHaveBeenCalledWith(walletShort.id)
    })

    it('emits close after removing', async () => {
        const wrapper = await mount()
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('close')).toBeTruthy()
    })
})
