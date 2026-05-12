import type { Chain } from '@/common/models/types/networks.type'

import type {
    PortfolioData,
    UserWallets,
} from '@/modules/portfolio/models/interfaces/portfolio.interface'

import { MAX_SIZE } from '~/modules/portfolio/consts/portfolio-size'

import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore(
    'portfolio',
    () => {
        const route = useRoute()

        const portfolio = ref<UserWallets>([])
        const isSyncing = ref(false)
        const isAdding = ref(false)
        const lastSyncedAt = ref<Date | null>(null)

        const currentChain = ref<Chain>('ton')

        const addWalletToPortfolio = (value: PortfolioData) => {
            const find = portfolio.value.find((it) => it.address.raw === value.address.raw)
            if (!find && portfolio.value.length < MAX_SIZE) {
                portfolio.value.push(value)
            }
        }

        const updateWallet = (value: PortfolioData) => {
            const idx = portfolio.value.findIndex((it) => it.address.raw === value.address.raw)
            if (idx >= 0) {
                const existing = portfolio.value[idx]!
                portfolio.value[idx] = { ...value, id: existing.id, name: existing.name }
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

        // const getEthWallets = computed<UserWallets>(() => {
        //     return portfolio.value.filter((it) => it.chain === 'eth')
        // })

        const currentChainWallets = computed<UserWallets>(() => {
            // return currentChain.value === 'ton' ? getTonWallets.value : getEthWallets.value
            return getTonWallets.value
        })

        watchEffect(() => {
            const raw = route.params.id
            const chain = Array.isArray(raw) ? raw[0] : raw
            if (chain) {
                currentChain.value = chain as Chain
            }
        })

        return {
            portfolio,
            isSyncing,
            isAdding,
            lastSyncedAt,
            currentChain,

            addWalletToPortfolio,
            updateWallet,
            clearPortfolio,
            removeWalletById,
            renameWallet,

            getTonWallets,
            // getEthWallets,
            currentChainWallets,
        }
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.localStorage(),
            pick: ['portfolio', 'lastSyncedAt'],
            serializer: {
                serialize: (value) => JSON.stringify(value),
                deserialize: (value) => {
                    const data = JSON.parse(value)
                    if (data.lastSyncedAt) data.lastSyncedAt = new Date(data.lastSyncedAt)
                    return data
                },
            },
        },
    },
)
