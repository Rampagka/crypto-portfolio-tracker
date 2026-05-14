import type { Modal } from '~/common/models/interfaces/modal.interface'

import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock-upgrade'
import { markRaw, nextTick } from 'vue'

const useModalState = () => useState<Modal | null>('current-modal', () => null)

export const openModal = <T = unknown>(opts: Omit<Modal<T>, 'resolve'>): Promise<T> => {
    const modal = useModalState()
    return new Promise<T>((resolve) => {
        modal.value = {
            ...opts,
            component: markRaw(opts.component),
            resolve: resolve as (value: unknown) => void,
        }
    })
}

export const closeModal = <T = unknown>(result?: T): void => {
    const modal = useModalState()
    const current = modal.value
    if (current?.resolve) {
        current.resolve((result ?? null) as unknown)
        modal.value = null
        if (import.meta.client) {
            window.scrollTo({ top: 0 })
        }
    }
}

export const useCurrentModal = () => {
    const modal = useModalState()
    if (import.meta.client) {
        watch(modal, async (val) => {
            if (val) {
                await nextTick()
                const target = document.querySelector<HTMLElement>('.modal-scroll-target')
                if (target) disableBodyScroll(target, { reserveScrollBarGap: true })
            } else {
                clearAllBodyScrollLocks()
            }
        })
    }
    return modal
}
