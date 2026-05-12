import type { MoralisWalletResponse } from '~/common/models/interfaces/eth.interface'

export default class EthClient {
    private readonly base = 'https://deep-index.moralis.io/api/v2.2'
    private readonly key: string

    constructor() {
        this.key = useRuntimeConfig().moralisKey
    }

    private readonly WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

    async getWalletPortfolio(address: string): Promise<MoralisWalletResponse> {
        const headers = { 'X-API-Key': this.key }
        const [nativeRes, tokensRes, ethPriceRes] = await Promise.all([
            fetch(`${this.base}/wallets/${address}/net-worth?chains=eth&exclude_spam=true`, {
                headers,
            }),
            fetch(
                `${this.base}/wallets/${address}/tokens?chain=eth&exclude_spam=true&exclude_unverified_contracts=true&limit=25`,
                { headers },
            ),
            fetch(`${this.base}/erc20/${this.WETH}/price?chain=eth&include=percent_change`, {
                headers,
            }),
        ])

        const [nativeData, tokensData, ethPriceData] = await Promise.all([
            nativeRes.json(),
            tokensRes.json(),
            ethPriceRes.json(),
        ])

        const chain = nativeData.chains?.[0]
        return {
            nativeBalance: {
                balance: chain?.native_balance ?? '0',
                usd_price: ethPriceData?.usdPrice ?? 0,
                usd_24hr_change: parseFloat(ethPriceData?.['24hrPercentChange'] ?? '0'),
            },
            tokens: tokensData.result ?? [],
        }
    }
}
