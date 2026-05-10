import { fetchPortfolio } from '~/modules/portfolio/services/portfolio.service'

const POLL_INTERVAL_MS = 45_000

export const usePortfolioPolling = () => {
    const store = usePortfolioStore()

    const currentWallets = computed(() =>
        store.currentChain === 'ton' ? store.getTonWallets : store.getEthWallets,
    )

    const refreshAllWallets = async () => {
        const wallets = currentWallets.value
        if (!wallets.length) return

        store.isSyncing = true
        try {
            await Promise.all(
                wallets.map(async (wallet) => {
                    const data = await fetchPortfolio(
                        wallet.address.friendly,
                        store.currentChain,
                        wallet.name,
                    )
                    if (data) store.updateWallet(data)
                }),
            )
            store.lastSyncedAt = new Date()
        } catch (err) {
            console.error('[polling] refresh failed', err)
        } finally {
            store.isSyncing = false
        }
    }

    const { start, stop } = usePolling(refreshAllWallets, POLL_INTERVAL_MS)

    watch([() => currentWallets.value.length, () => store.currentChain], ([count]) => {
        stop()
        if (count > 0) start()
    })

    onMounted(async () => {
        if (currentWallets.value.length > 0) {
            await refreshAllWallets()
            start()
        }
    })

    onUnmounted(stop)
}
