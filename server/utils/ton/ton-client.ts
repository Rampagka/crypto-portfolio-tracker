import type { TonAccount, TonAccountInfo, TonRates } from '~/common/models/interfaces/ton.interface'

export default class TonClient {
    private readonly baseUrl: string
    private readonly apiKey: string

    constructor() {
        const config = useRuntimeConfig()
        this.baseUrl = config.baseTonapi
        this.apiKey = config.apiKey
    }

    private async request<T>(path: string, params?: Record<string, string>): Promise<T> {
        const endpoint = new URL(`${this.baseUrl}${path}`)
        if (params) {
            Object.entries(params).forEach(([k, v]) => endpoint.searchParams.append(k, v))
        }

        const res = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            },
        })
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`)
        }
        return res.json()
    }

    async getWallet(address: string): Promise<TonAccount> {
        return this.request<TonAccount>(`/accounts/${address}`)
    }

    async getWalletInfo(address: string): Promise<TonAccountInfo> {
        return this.request<TonAccountInfo>(`/accounts/${address}/jettons`, {
            supported_extensions: 'custom_payload',
            currencies: 'usd',
        })
    }

    async getTonRates(): Promise<TonRates> {
        return this.request<TonRates>(`/rates`, { tokens: 'ton', currencies: 'usd' })
    }
}
