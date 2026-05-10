import { errorMap } from '~/modules/portfolio/helpers/inputs-error-map'
import { fetchPortfolio } from '~/modules/portfolio/services/portfolio.service'

export const useAddWallet = () => {
    const store = usePortfolioStore()
    const address = ref<string>('')
    const isError = ref<false | string>(false)

    const addWalletToPortfolio = async (name: string) => {
        store.isAdding = true
        try {
            const data = await fetchPortfolio(address.value, store.currentChain, name)
            if (data) {
                store.addWalletToPortfolio({ ...data, name })
                address.value = ''
            }
        } catch (err) {
            console.error(err)
            isError.value = errorMap['error']
        } finally {
            store.isAdding = false
        }
    }

    watch(address, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            isError.value = false
        }
    })

    return {
        address,
        isError,

        addWalletToPortfolio,
    }
}
