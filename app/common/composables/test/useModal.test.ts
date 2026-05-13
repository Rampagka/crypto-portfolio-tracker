import { closeModal, openModal, useCurrentModal } from '~/common/composables/useModal'

import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

const FakeModal = defineComponent({ template: '<div />' })

describe('useModal', () => {
    it('openModal sets state and returns a promise', async () => {
        const modal = useCurrentModal()
        expect(modal.value).toBeNull()

        const promise = openModal({ component: FakeModal, modalOptions: {} })

        expect(modal.value?.component).toStrictEqual(FakeModal)

        closeModal('result')
        await expect(promise).resolves.toBe('result')
        expect(modal.value).toBeNull()
    })

    it('closeModal resolves with null when called without argument', async () => {
        const promise = openModal({ component: FakeModal, modalOptions: {} })
        closeModal()
        await expect(promise).resolves.toBeNull()
    })

    it('closeModal does nothing when no modal is open', () => {
        expect(() => closeModal()).not.toThrow()
    })
})
