import { beforeAll } from 'vitest'

beforeAll(() => {
    const original = console.warn.bind(console)
    console.warn = (...args: unknown[]) => {
        const msg = typeof args[0] === 'string' ? args[0] : ''
        if (msg.includes('App already provides property with key')) return
        original(...args)
    }
})
