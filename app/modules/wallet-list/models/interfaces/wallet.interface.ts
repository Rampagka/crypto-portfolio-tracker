export interface Wallet {
    id: number
    name: string
    address: string
    total: number
    toncoinCount: number
    topTokens: Token[]
}

interface Token {
    id: string
    name: string
    address: string
    total: number
}
