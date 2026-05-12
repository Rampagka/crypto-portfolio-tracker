export interface MoralisTokenBalance {
    token_address: string
    symbol: string
    name: string
    decimals: number
    balance: string // decimal string, не hex
    verified_contract: boolean
    security_score: number | null
    usd_price: number | null
    usd_price_24hr_percent_change: number | null
    usd_value: number | null
    thumbnail?: string
}

export interface MoralisWalletResponse {
    nativeBalance: { balance: string; usd_price: number; usd_24hr_change: number }
    tokens: MoralisTokenBalance[]
}
