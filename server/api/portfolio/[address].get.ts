import type { Chain } from '~/common/models/types/networks.type'

import { mapPortfolio } from '#server/utils/portfolio-mapper'
import TonAddress from '#server/utils/ton/ton-address'
import TonClient from '#server/utils/ton/ton-client'

export default defineEventHandler(
    async (event) => {
        console.log('call [address].get.ts')
        const address = getRouterParam(event, 'address')
        if (!address) {
            throw createError({ statusCode: 400, message: 'Address not found' })
        }

        const query = getQuery(event)
        const walletName = (query.name as string) || 'My Wallet'

        try {
            if (query.chain === 'ton') {
                TonAddress.validate(address)
                if (TonAddress.isTestnet(address)) {
                    throw createError({
                        statusCode: 400,
                        statusMessage: 'Testnet wallets are not supported',
                    })
                }
                const client = new TonClient()
                return await getTonPortfolio(address, client, walletName, query.chain as Chain)
            } else if (query.chain === 'eth') {
                // return await getEthPortfolio(address, client)
            }
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'statusCode' in err) throw err
            console.error(err)
        }

        return null
    },
    // {
    //     maxAge: import.meta.dev ? 0 : 30,
    //     getKey: (event) => {
    //         const address = getRouterParam(event, 'address')
    //         const { chain } = getQuery(event)
    //         return `portfolio-${address}-${chain}`
    //     },
    // },
)

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

async function getTonPortfolio(address: string, client: TonClient, name: string, chain: Chain) {
    const wallet = await client.getWallet(address)
    await delay(1050)
    const walletInfo = await client.getWalletInfo(address)
    await delay(1050)
    const rates = await client.getTonRates()
    // const [wallet, walletInfo, rates] = await Promise.all([
    //     client.getWallet(address),
    //     client.getWalletInfo(address),
    //     client.getTonRates(),
    // ])

    // console.log('walletInfo.balances:', JSON.stringify(walletInfo.balances, null, 2))

    return mapPortfolio(wallet, walletInfo, rates, name, chain)
}

// async function getEthPortfolio(address: string, client) {}
