import AddWalletModal from '~/modules/portfolio/modals/add-wallet-modal.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

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

const mount = () => mountSuspended(AddWalletModal, { global: { stubs } })

describe('add-wallet-modal', () => {
    it('emits result with default name on click', async () => {
        const wrapper = await mount()
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('result')?.[0]).toEqual(['MyWallet'])
    })

    it('emits result with typed name', async () => {
        const wrapper = await mount()
        await wrapper.find('input').setValue('CoolWallet')
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('result')?.[0]).toEqual(['CoolWallet'])
    })

    it('disables button when name is empty', async () => {
        const wrapper = await mount()
        await wrapper.find('input').setValue('')
        expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('does not emit result when name is empty', async () => {
        const wrapper = await mount()
        await wrapper.find('input').setValue('')
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('result')).toBeFalsy()
    })
})
