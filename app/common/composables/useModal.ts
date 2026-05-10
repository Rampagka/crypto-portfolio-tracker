import type { Modal } from '~/common/models/interfaces/modal.interface'

export const currentModal = ref<Modal | null>(null)

export const openModal = <T = unknown>(opts: Omit<Modal<T>, 'resolve'>): Promise<T> => {
    return new Promise<T>((resolve) => {
        currentModal.value = {
            ...opts,
            resolve: resolve as (value: unknown) => void,
        }
    })
}

export const closeModal = <T = unknown>(result?: T): void => {
    const current = currentModal.value

    if (current?.resolve) {
        current.resolve((result ?? null) as unknown)
        currentModal.value = null
    }
}

export const useCurrentModal = () => {
    if (import.meta.client) {
        watch(currentModal, (val) => {
            document.documentElement.style.overflow = val ? 'hidden' : 'auto'
        })
    }

    return currentModal
}