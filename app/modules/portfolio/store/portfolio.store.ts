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

        const portfolio = ref<UserWallets>([])
        const isSyncing = ref(false)

        const currentChain = ref<Chain>('ton')

        const addWalletToPortfolio = (value: PortfolioData) => {
            const find = portfolio.value.find((it) => it.address.raw === value.address.raw)
            if (!find) {
                portfolio.value.push(value)
            }
        }

        const removeWalletById = (id: string) => {
            const find = portfolio.value.findIndex((it) => it.id === id)
            if (find >= 0) {
                portfolio.value.splice(find, 1)
            }
        }

        const renameWallet = (id: string, name: string) => {
            const find = portfolio.value.find((it) => it.id === id)
            if (find) {
                find.name = name
            }
        }

        const clearPortfolio = () => {
            portfolio.value = []
        }

        const getTonWallets = computed<UserWallets>(() => {
            return portfolio.value.filter((it) => it.chain === 'ton')
        })

        const getEthWallets = computed<UserWallets>(() => {
            return portfolio.value.filter((it) => it.chain === 'eth')
        })

        watchEffect(() => {
            const chain = route.params.id

            if (chain) {
                currentChain.value = chain as Chain
            }
        })

        return {
            portfolio,
            isSyncing,
            currentChain,

            addWalletToPortfolio,
            clearPortfolio,
            removeWalletById,
            renameWallet,

            getTonWallets,
            getEthWallets,
        }
    },
    {
        persist: true,
    },
)
