import WalletNameInput from '~/common/components/wallet-name-input.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

describe('WalletNameInput', () => {
    it('renders correctly', async () => {
        const wrapper = await mountSuspended(WalletNameInput, {
            props: {
                modelValue: 'MyWallet',
            },
        })
        expect(wrapper.find('[data-test="wallet-name"]').exists()).toBe(true)
        expect(wrapper.find('input').element.value).toBe('MyWallet')
    })
    it('emit work', async () => {
        const wrapper = await mountSuspended(WalletNameInput, {
            props: {
                modelValue: '',
            },
        })
        const input = wrapper.find('input')
        await input.setValue('Test wallet')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
    it('onFocus event', async () => {
        const wrapper = await mountSuspended(WalletNameInput, {
            props: {
                modelValue: 'Some wallet',
                defaultValue: 'Some wallet',
            },
        })
        const input = wrapper.find('[data-test="wallet-name"]')

        await input.trigger('focus')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    })

    it('onBlur event', async () => {
        const wrapper = await mountSuspended(WalletNameInput, {
            props: {
                modelValue: '',
                defaultValue: 'Some wallet',
            },
        })
        const input = wrapper.find('[data-test="wallet-name"]')

        await input.trigger('blur')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Some wallet'])
    })
    it('error rendered', async () => {
        const wrapper = await mountSuspended(WalletNameInput, {
            props: {
                error: 'Unknown error',
            },
        })
        expect(wrapper.find('.input-error').text()).toContain('Unknown error')
    })
})
