import { usePolling } from '~/common/composables/usePolling'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'

function withSetup<T>(composable: () => T): { result: T; unmount: () => void } {
    let result!: T
    const app = createApp({
        setup() {
            result = composable()
            return () => {}
        },
    })
    app.mount(document.createElement('div'))
    return { result, unmount: () => app.unmount() }
}

describe('usePolling', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })
    it('start correctly work', async () => {
        const fetchFn = vi.fn().mockResolvedValue('')
        const {
            result: { start, isPolling },
        } = withSetup(() => usePolling(fetchFn, 1_000))
        start()
        expect(isPolling.value).toBe(true)

        await vi.advanceTimersByTimeAsync(1050)
        expect(fetchFn).toHaveBeenCalledTimes(1)

        await vi.advanceTimersByTimeAsync(2100)
        expect(fetchFn).toHaveBeenCalledTimes(3)
    })
    it('stop correctly work', async () => {
        const fetchFn = vi.fn().mockResolvedValue('')
        const {
            result: { start, stop, isPolling },
        } = withSetup(() => usePolling(fetchFn, 1_000))

        start()
        expect(isPolling.value).toBe(true)

        stop()
        expect(isPolling.value).toBe(false)
        await vi.advanceTimersByTimeAsync(1050)
        expect(fetchFn).not.toHaveBeenCalled()
    })
    it('restart interval timer', async () => {
        const fetchFn = vi.fn().mockResolvedValue('')
        const {
            result: { start },
        } = withSetup(() => usePolling(fetchFn, 1_000))

        start()
        start()
        await vi.advanceTimersByTimeAsync(2100)

        expect(fetchFn).toHaveBeenCalledTimes(2)
    })
    it('stops polling on unmount', async () => {
        const fetchFn = vi.fn().mockResolvedValue('')
        const {
            result: { start },
            unmount,
        } = withSetup(() => usePolling(fetchFn, 1_000))
        start()
        unmount()
        await vi.advanceTimersByTimeAsync(2100)
        expect(fetchFn).not.toHaveBeenCalled()
    })
})
