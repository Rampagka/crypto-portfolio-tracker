import { fromNano } from '@/common/utils/ton-amounts'

import type { PortfolioData, TokenItem } from '@/modules/portfolio'
import type { TonAccount, TonAccountInfo, TonRates } from '~/common/models/interfaces/ton.interface'
import type { Chain } from '~/common/models/types/networks.type'

import TonAddress from '#server/utils/ton/ton-address'

export function mapPortfolio(
    wallet: TonAccount,
    walletInfo: TonAccountInfo,
    rates: TonRates,
    name: string,
    chain: Chain,
): PortfolioData {
    const asset: PortfolioData = {
        id: crypto.randomUUID(),
        name,
        chain,
        address: {
            raw: wallet.address,
            friendly: TonAddress.toFriendly(wallet.address) as string,
        },
        totalBalanceUsd: 0,
        totalDiff24h: 0,
        nativeToken: {
            symbol: 'TON',
            amount: wallet.balance / 1e9,
            priceUsd: rates.rates.TON.prices.USD,
            change24h: parseFloat(rates.rates.TON.diff_24h.USD) || 0,
        },
        topTokens: [],
    }

    const weightedAssets: { valueUsd: number; change24h: number }[] = []

    const tonValueUsd = (wallet.balance / 1e9) * rates.rates.TON.prices.USD
    const tonChange24h = parseFloat(rates.rates.TON.diff_24h.USD) || 0

    asset.totalBalanceUsd += tonValueUsd
    weightedAssets.push({ valueUsd: tonValueUsd, change24h: tonChange24h })

    walletInfo.balances.forEach((balance) => {
        if (balance.jetton.verification === 'whitelist') {
            const priceUsd = balance.price?.prices?.['USD'] ?? 0
            const diff = balance.price?.diff_24h?.['USD']
            const change24h = diff && typeof diff === 'string' ? parseFloat(diff) || 0 : 0
            const friendlyAmount = fromNano(balance.balance, balance.jetton.decimals)
            const totalUsd = friendlyAmount * priceUsd
            const { address, name, symbol, decimals, image } = balance.jetton

            asset.totalBalanceUsd += totalUsd
            weightedAssets.push({ valueUsd: totalUsd, change24h })

            asset.topTokens.push({
                address,
                name,
                symbol,
                decimals,
                image,
                amount: friendlyAmount,
                priceUsd,
                totalUsd,
                change24h,
            } as TokenItem)
        }
    })

    if (asset.totalBalanceUsd > 0) {
        asset.totalDiff24h = weightedAssets.reduce((acc, { valueUsd, change24h }) => {
            return acc + (valueUsd / asset.totalBalanceUsd) * change24h
        }, 0)
    }

    asset.topTokens = asset.topTokens.sort((a, b) => b.totalUsd - a.totalUsd).slice(0, 3)

    return asset
}
