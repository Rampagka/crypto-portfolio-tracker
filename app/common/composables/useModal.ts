import type { Modal } from '~/common/models/interfaces/modal.interface'

import { markRaw } from 'vue'

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
    }
}

export const useCurrentModal = () => {
    const modal = useModalState()
    if (import.meta.client) {
        watch(modal, (val) => {
            document.documentElement.style.overflow = val ? 'hidden' : 'auto'
        })
    }
    return modal
}
