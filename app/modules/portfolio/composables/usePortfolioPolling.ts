import { fetchPortfolio } from '@/modules/portfolio/services/portfolio.service'

const POLL_INTERVAL_MS = 65_000
const PAUSE_AFTER_HIDDEN_MS = 60_000

export const usePortfolioPolling = () => {
    const store = usePortfolioStore()

    const refreshAllWallets = async () => {
        const wallets = store.currentChainWallets
        if (!wallets.length) return

        store.isSyncing = true
        try {
            const results = await Promise.allSettled(
                wallets.map(async (wallet) => {
                    const data = await fetchPortfolio(
                        wallet.address.friendly,
                        store.currentChain,
                        wallet.name,
                    )
                    if (data) store.updateWallet(data)
                }),
            )
            const failed = results.filter((r) => r.status === 'rejected')
            if (failed.length) console.error('[polling] some wallets failed:', failed)
            store.lastSyncedAt = new Date()
        } finally {
            store.isSyncing = false
        }
    }

    const { start, stop } = usePolling(refreshAllWallets, POLL_INTERVAL_MS)

    let pauseTimer: ReturnType<typeof setTimeout> | null = null
    let pausedByVisibility = false

    const onVisibilityChange = () => {
        if (document.hidden) {
            pauseTimer = setTimeout(() => {
                if (store.currentChainWallets.length > 0) {
                    stop()
                    pausedByVisibility = true
                }
            }, PAUSE_AFTER_HIDDEN_MS)
        } else {
            if (pauseTimer) {
                clearTimeout(pauseTimer)
                pauseTimer = null
            }
            if (pausedByVisibility && store.currentChainWallets.length > 0) {
                pausedByVisibility = false
                refreshAllWallets()
                start()
            }
        }
    }

    watch(
        [() => store.currentChainWallets.length, () => store.currentChain],
        ([count, chain], [, prevChain]) => {
            stop()
            if (count > 0) {
                if (chain !== prevChain) refreshAllWallets()
                start()
            }
        },
    )

    onMounted(async () => {
        document.addEventListener('visibilitychange', onVisibilityChange)
        if (store.currentChainWallets.length > 0) {
            await refreshAllWallets()
            start()
        }
    })

    onUnmounted(() => {
        document.removeEventListener('visibilitychange', onVisibilityChange)
        if (pauseTimer) clearTimeout(pauseTimer)
    })
}
