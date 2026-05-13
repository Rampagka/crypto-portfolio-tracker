import AddressInput from '~/common/components/address-input.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

describe('AddressInput', () => {
    it('renders input and button', async () => {
        const wrapper = await mountSuspended(AddressInput, {
            props: { modelValue: '' },
        })
        expect(wrapper.find('[data-test="address-input"]').exists()).toBe(true)
        expect(wrapper.find('[data-test="add-btn"]').exists()).toBe(true)
        expect(wrapper.findAll('input')).toHaveLength(1)
        expect(wrapper.findAll('button')).toHaveLength(1)
    })

    it('input reflects modelValue prop', async () => {
        const wrapper = await mountSuspended(AddressInput, {
            props: { modelValue: 'Address' },
        })
        expect(wrapper.find('input').element.value).toBe('Address')
    })

    it('button is disabled when modelValue is empty', async () => {
        const wrapper = await mountSuspended(AddressInput, {
            props: { modelValue: '' },
        })
        const btn = wrapper.find('[data-test="add-btn"]').element as HTMLButtonElement
        expect(btn.disabled).toBe(true)
    })

    it('button is enabled when modelValue is not empty', async () => {
        const wrapper = await mountSuspended(AddressInput, {
            props: { modelValue: 'someAddress' },
        })
        const btn = wrapper.find('[data-test="add-btn"]').element as HTMLButtonElement
        expect(btn.disabled).toBe(false)
    })

    it('emits update:modelValue on input change', async () => {
        const wrapper = await mountSuspended(AddressInput, {
            props: { modelValue: '' },
        })
        await wrapper.find('input').setValue('OxOxOx')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['OxOxOx'])
    })

    it('emits add on button click', async () => {
        const wrapper = await mountSuspended(AddressInput, {
            props: { modelValue: 'someAddress' },
        })
        await wrapper.find('[data-test="add-btn"]').trigger('click')
        expect(wrapper.emitted('add')).toBeTruthy()
    })
})
