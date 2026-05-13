import { closeModal, openModal } from '~/common/composables/useModal'
import ModalWrapper from '~/common/wrappers/modal-wrapper.vue'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

const FakeModal = defineComponent({ template: '<div class="fake-modal" />' })

describe('modal-wrapper', () => {
    afterEach(() => closeModal())

    it('modal was not rendered unless the openModal was called', async () => {
        await mountSuspended(ModalWrapper)
        expect(document.body.querySelector('.fake-modal')).toBeNull()
    })

    it('title was rendered', async () => {
        await mountSuspended(ModalWrapper)
        void openModal({ component: FakeModal, modalOptions: { title: 'Test Title' } })
        await nextTick()
        expect(document.body.querySelector('h4')?.textContent?.trim()).toBe('Test Title')
    })

    it('backdrop click calling closeModal', async () => {
        await mountSuspended(ModalWrapper)
        const promise = openModal({ component: FakeModal, modalOptions: {} })
        await nextTick()
        document.body.querySelector<HTMLElement>('.fixed.inset-0')?.click()
        await expect(promise).resolves.toBeNull()
    })

    it('when clicking on the background with disableBackdropClose option, modal does not close', async () => {
        await mountSuspended(ModalWrapper)
        const promise = openModal({
            component: FakeModal,
            modalOptions: { disableBackdropClose: true },
        })
        await nextTick()
        document.body.querySelector<HTMLElement>('.fixed.inset-0')?.click()
        const result = await Promise.race([
            promise.then(() => 'resolved'),
            new Promise<string>((r) => setTimeout(() => r('pending'), 50)),
        ])
        expect(result).toBe('pending')
    })
})
