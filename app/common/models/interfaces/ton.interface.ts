export interface TonAccount {
    address: string
    balance: number
    status: number
    icon: string
    last_activity: number
}

export type JettonVerification = 'whitelist' | 'graylist' | 'blacklist' | 'none'

export interface TonAccountInfo {
    balances: TonAccountJetton[]
}

export interface TonAccountJetton {
    balance: string
    price?: {
        prices?: { [key: string]: number }
        diff_24h?: { [key: string]: string }
    }
    jetton: {
        address: string
        name: string
        symbol: string
        decimals: number
        image: string
        verification: JettonVerification
        score: number
    }
}

export interface TonRates {
    rates: {
        TON: {
            prices: { USD: number }
            diff_24h: { USD: string }
        }
    }
}
