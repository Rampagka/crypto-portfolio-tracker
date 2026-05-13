import AddWalletModal from '~/modules/portfolio/modals/add-wallet-modal.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

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

const mount = (addWalletToPortfolio = vi.fn().mockResolvedValue(undefined)) =>
    mountSuspended(AddWalletModal, {
        props: { addWalletToPortfolio },
        global: { stubs },
    })

describe('add-wallet-modal', () => {
    it('calls addWalletToPortfolio with the current wallet name', async () => {
        const addFn = vi.fn().mockResolvedValue(undefined)
        const wrapper = await mount(addFn)
        await wrapper.find('button').trigger('click')
        expect(addFn).toHaveBeenCalledWith('MyWallet')
    })

    it('emits close after adding', async () => {
        const wrapper = await mount()
        await wrapper.find('button').trigger('click')
        await nextTick()
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('disables button when name is empty', async () => {
        const wrapper = await mount()
        await wrapper.find('input').setValue('')
        expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('uses the typed name when calling addWalletToPortfolio', async () => {
        const addFn = vi.fn().mockResolvedValue(undefined)
        const wrapper = await mount(addFn)
        await wrapper.find('input').setValue('CoolWallet')
        await wrapper.find('button').trigger('click')
        expect(addFn).toHaveBeenCalledWith('CoolWallet')
    })
})
