export interface Modal<T = unknown> {
    component: Component
    props?: Record<string, unknown>
    modalOptions: ModalOptions
    resolve?: (value: T) => void
}

export interface ModalOptions {
    className?: string
    fullScreen?: boolean
    bare?: boolean
    disableBackdropClose?: boolean
    transparent?: boolean
    title?: string
    headerBorder?: boolean
    // headerIcon?: 'back' | 'close'
    animation?: ModalAnimation
}

export type ModalAnimation = 'slide-bottom' | 'fade' | 'none'
