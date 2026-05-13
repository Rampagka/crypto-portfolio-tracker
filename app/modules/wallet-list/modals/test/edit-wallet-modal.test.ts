import EditWalletModal from '~/modules/wallet-list/modals/edit-wallet-modal.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it, vi } from 'vitest'

const walletShort = {
    id: 'wallet-1',
    name: 'OldName',
    address: { raw: '0:abc', friendly: 'EQabc' },
}

const stubs = {
    'button-ui': {
        template: '<button :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
        props: ['disabled'],
        emits: ['click'],
    },
    'wallet-name-input': {
        template:
            '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
        props: ['modelValue', 'defaultValue'],
        emits: ['update:modelValue'],
    },
}

const mount = () =>
    mountSuspended(EditWalletModal, {
        props: { walletShort },
        global: {
            plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false })],
            stubs,
        },
    })

describe('edit-wallet-modal', () => {
    it('button is disabled when name is unchanged', async () => {
        const wrapper = await mount()
        expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('button is disabled when name is empty', async () => {
        const wrapper = await mount()
        await wrapper.find('input').setValue('')
        expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('button is enabled when name is different and non-empty', async () => {
        const wrapper = await mount()
        await wrapper.find('input').setValue('NewName')
        expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    })

    it('calls renameWallet with id and new name on save', async () => {
        const wrapper = await mount()
        const store = usePortfolioStore()
        vi.spyOn(store, 'renameWallet')
        await wrapper.find('input').setValue('NewName')
        await wrapper.find('button').trigger('click')
        expect(store.renameWallet).toHaveBeenCalledWith(walletShort.id, 'NewName')
    })

    it('emits close after saving', async () => {
        const wrapper = await mount()
        await wrapper.find('input').setValue('NewName')
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('close')).toBeTruthy()
    })
})
