import type { Chain, NetworkName } from '~/common/models/types/networks.type'

export interface PortfolioData {
    id: string
    name: string
    chain: Chain
    address: { raw: string; friendly: string }
    totalBalanceUsd: number
    totalDiff24h: number
    nativeToken: {
        symbol: NetworkName
        amount: number
        priceUsd: number
        change24h: number
    }
    topTokens: TokenItem[]
}

export interface TokenItem {
    address: string
    name: string
    symbol: string
    amount: number
    image: string
    decimals: number
    totalUsd: number
    change24h: number
    priceUsd: number
}

export type UserWallets = PortfolioData[]
