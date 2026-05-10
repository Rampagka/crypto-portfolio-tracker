export const useChainTheme = () => {
    const store = usePortfolioStore()

    const applyTheme = (chain: string) => {
        document.documentElement.setAttribute('data-theme', chain)
    }

    watch(() => store.currentChain, applyTheme, { immediate: true })
}
