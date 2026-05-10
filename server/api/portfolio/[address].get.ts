import type { Chain } from '~/common/models/types/networks.type'

import { mapPortfolio } from '#server/utils/portfolio-mapper'
import TonAddress from '#server/utils/ton/ton-address'
import TonClient from '#server/utils/ton/ton-client'

export default defineCachedEventHandler(
    async (event) => {
        const address = getRouterParam(event, 'address')
        if (!address) {
            throw createError({ statusCode: 400, message: 'Address is required' })
        }

        const query = getQuery(event)
        const chain = query.chain as Chain
        const walletName = (query.name as string) || 'My Wallet'

        if (chain === 'ton') {
            TonAddress.validate(address)
            if (TonAddress.isTestnet(address)) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Testnet wallets are not supported',
                })
            }
            const client = new TonClient()
            return await getTonPortfolio(address, client, walletName, chain)
        }

        throw createError({ statusCode: 400, message: `Unsupported chain: ${chain}` })
    },
    {
        maxAge: 40,
        shouldBypassCache: () => import.meta.dev,
        getKey: (event) => {
            const address = getRouterParam(event, 'address')
            const { chain } = getQuery(event)
            return `portfolio-${address}-${chain}`
        },
    },
)

async function getTonPortfolio(address: string, client: TonClient, name: string, chain: Chain) {
    const [wallet, walletInfo, rates] = await Promise.all([
        client.getWallet(address),
        client.getWalletInfo(address),
        client.getTonRates(),
    ])
    return mapPortfolio(wallet, walletInfo, rates, name, chain)
}
