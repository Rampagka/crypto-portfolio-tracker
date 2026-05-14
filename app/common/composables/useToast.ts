const _useToastState = () => useState<string | null>('toast', () => null)

export const showToast = (message: string) => {
    const toast = _useToastState()
    toast.value = message
    setTimeout(() => {
        toast.value = null
    }, 2500)
}

export const useToast = () => _useToastState()
