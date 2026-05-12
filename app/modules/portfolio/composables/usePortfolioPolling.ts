import { fetchPortfolio } from '@/modules/portfolio/services/portfolio.service'

const POLL_INTERVAL_MS = 65_000

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

    watch([() => store.currentChainWallets.length, () => store.currentChain], ([count]) => {
        stop()
        if (count > 0) start()
    })

    onMounted(async () => {
        if (store.currentChainWallets.length > 0) {
            await refreshAllWallets()
            start()
        }
    })
}
