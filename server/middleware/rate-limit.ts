const requests = new Map<string, { count: number; resetAt: number }>()

const LIMIT = 15
const WINDOW_MS = 60_000

export default defineEventHandler((event) => {
    if (!event.path.startsWith('/api/portfolio/')) return

    const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
    const now = Date.now()

    const entry = requests.get(ip)
    if (!entry || now > entry.resetAt) {
        requests.set(ip, { count: 1, resetAt: now + WINDOW_MS })
        return
    }

    entry.count++
    if (entry.count > LIMIT) {
        throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
    }
})
