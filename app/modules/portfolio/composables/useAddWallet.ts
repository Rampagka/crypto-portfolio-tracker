import { fetchPortfolio } from '~/modules/portfolio/services/portfolio.service'

export const useAddWallet = () => {
    const store = usePortfolioStore()
    const initialName = 'MyWallet'
    const address = ref<string>('')
    const walletName = ref<string>(initialName)
    const isError = ref(false)

    const addWalletToPortfolio = async () => {
        try {
            const data = await fetchPortfolio(address.value, 'ton', walletName.value)
            if (data) {
                store.addPortfolio(data)
                address.value = ''
                walletName.value = initialName
            }
        } catch (err) {
            console.error(err)
            isError.value = true
        }
    }

    watch(address, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            isError.value = false
        }
    })

    return {
        address,
        walletName,
        isError,

        addWalletToPortfolio,
    }
}
