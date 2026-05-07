import type {
    PortfolioData,
    UserWallets,
} from '@/modules/portfolio/models/interfaces/portfolio.interface'

import type { Chain } from '~/common/models/types/networks.type'

import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore(
    'portfolio',
    () => {
        const route = useRoute()

        const initialWalletName = 'MyWallet'

        const walletName = ref(initialWalletName)
        const portfolio = ref<UserWallets>([])

        const currentChain = ref<Chain>('ton')

        const addPortfolio = (value: PortfolioData) => {
            const find = portfolio.value.find((it) => it.address.raw === value.address.raw)
            if (!find) {
                portfolio.value.push(value)
            }
        }
        const clearPortfolio = () => {
            portfolio.value = []
        }

        const getTonWallets = computed(() => {
            return portfolio.value.filter((it) => it.chain === 'ton')
        })

        const getEthWallets = computed(() => {
            return portfolio.value.filter((it) => it.chain === 'eth')
        })

        watchEffect(() => {
            const chain = route.params.id

            if (chain) {
                currentChain.value = chain as Chain
            }
        })

        return {
            walletName,
            portfolio,
            currentChain,

            addPortfolio,
            clearPortfolio,

            getTonWallets,
            getEthWallets,
        }
    },
    /* {
        persist: true,
    },*/
)
