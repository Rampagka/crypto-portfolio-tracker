import { openModal } from '~/common/composables/useModal'
import EditWalletModal from '~/modules/wallet-list/modals/edit-wallet-modal.vue'
import OptionsWalletModal from '~/modules/wallet-list/modals/options-wallet-modal.vue'
import RemoveWalletModal from '~/modules/wallet-list/modals/remove-wallet-modal.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('~/common/composables/useModal', () => ({ openModal: vi.fn() }))

const walletShort = {
    id: 'wallet-1',
    name: 'My Wallet',
    address: { raw: '0:abc', friendly: 'EQabc' },
}

const mount = () =>
    mountSuspended(OptionsWalletModal, {
        props: { walletShort },
        global: {
            stubs: {
                'button-ui': {
                    template: '<button @click="$emit(\'click\')"><slot /></button>',
                    emits: ['click'],
                },
            },
        },
    })

describe('options-wallet-modal', () => {
    beforeEach(() => vi.mocked(openModal).mockReset())

    it('opens EditWalletModal when edit button is clicked', async () => {
        const wrapper = await mount()
        const [editBtn] = wrapper.findAll('button')
        await editBtn?.trigger('click')
        expect(openModal).toHaveBeenCalledWith(
            expect.objectContaining({ component: expect.anything() }),
        )
        const call = vi.mocked(openModal).mock.calls[0]?.[0]
        expect(call?.component).toBe(EditWalletModal)
    })

    it('opens RemoveWalletModal when remove button is clicked', async () => {
        const wrapper = await mount()
        const buttons = wrapper.findAll('button')
        await buttons[1]?.trigger('click')
        const call = vi.mocked(openModal).mock.calls[0]?.[0]
        expect(call?.component).toBe(RemoveWalletModal)
    })

    it('passes walletShort as prop to the opened modal', async () => {
        const wrapper = await mount()
        await wrapper.findAll('button')[0]?.trigger('click')
        const call = vi.mocked(openModal).mock.calls[0]?.[0]
        expect(call?.props).toEqual({ walletShort })
    })
})
