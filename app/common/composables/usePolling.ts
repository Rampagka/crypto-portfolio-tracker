export function usePolling(fn: () => Promise<void>, intervalMs = 30_000) {
    const timerId = ref<ReturnType<typeof setInterval> | null>(null)
    const isPolling = computed(() => timerId.value !== null)

    const start = () => {
        if (timerId.value) clearInterval(timerId.value)
        timerId.value = setInterval(fn, intervalMs)
    }

    const stop = () => {
        if (timerId.value) {
            clearInterval(timerId.value)
            timerId.value = null
        }
    }

    onUnmounted(stop)

    return { start, stop, isPolling }
}
