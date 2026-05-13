import AppTabs from '~/common/components/app-tabs.vue'
import { NETWORKS } from '~/common/models/types/networks.type'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

const tabList = Object.entries(NETWORKS).map(([key, value]) => ({ label: value, value: key }))

describe('AppTabs', () => {
    it('renders correctly', async () => {
        const wrapper = await mountSuspended(AppTabs, {
            props: {
                tabs: tabList,
                current: 'ton',
            },
        })
        expect(wrapper.findAll('button')).toHaveLength(tabList.length)
        expect(wrapper.find('[data-test="tab-ton"]').text()).toBe('TON')
        expect(wrapper.find('[data-test="tab-eth"]').text()).toBe('ETH')
    })

    it('active tab has accent class, inactive has mute class', async () => {
        const wrapper = await mountSuspended(AppTabs, {
            props: {
                tabs: tabList,
                current: 'ton',
            },
        })
        const ton = wrapper.find('[data-test="tab-ton"]')
        const eth = wrapper.find('[data-test="tab-eth"]')
        expect(ton.classes()).toContain('text-accent')
        expect(eth.classes()).toContain('text-mute')
    })

    it('switches active tab correctly', async () => {
        const wrapper = await mountSuspended(AppTabs, {
            props: { tabs: tabList, current: 'eth' },
        })
        expect(wrapper.find('[data-test="tab-eth"]').classes()).toContain('text-accent')
        expect(wrapper.find('[data-test="tab-ton"]').classes()).toContain('text-mute')
    })

    it('emit work after click event', async () => {
        const wrapper = await mountSuspended(AppTabs, {
            props: {
                tabs: tabList,
                current: 'ton',
            },
        })
        const eth = wrapper.find('[data-test="tab-eth"]')
        await eth.trigger('click')
        expect(wrapper.emitted('selectTab')?.[0]).toEqual(['eth'])
    })
})
