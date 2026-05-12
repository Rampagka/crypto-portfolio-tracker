import { fromNano } from '@/common/utils/ton-amounts'

import type { PortfolioData, TokenItem } from '@/modules/portfolio'
import type { MoralisWalletResponse } from '~/common/models/interfaces/eth.interface'
import type { TonAccount, TonAccountInfo, TonRates } from '~/common/models/interfaces/ton.interface'
import type { Chain } from '~/common/models/types/networks.type'

import EthAddress from '#server/utils/eth/eth-address'
import TonAddress from '#server/utils/ton/ton-address'

const parsePercent = (str?: string): number => parseFloat((str ?? '0').replace('−', '-')) || 0

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
            priceUsd: rates.rates.TON?.prices?.USD ?? 0,
            change24h: parsePercent(rates.rates.TON?.diff_24h?.USD),
        },
        topTokens: [],
    }

    const weightedAssets: { valueUsd: number; change24h: number }[] = []

    const tonValueUsd = (wallet.balance / 1e9) * (rates.rates.TON?.prices?.USD ?? 0)
    const tonChange24h = parsePercent(rates.rates.TON?.diff_24h?.USD)

    asset.totalBalanceUsd += tonValueUsd
    weightedAssets.push({ valueUsd: tonValueUsd, change24h: tonChange24h })

    walletInfo.balances.forEach((balance) => {
        if (balance.jetton.verification === 'whitelist') {
            const priceUsd = balance.price?.prices?.['USD'] ?? 0
            const change24h = parsePercent(balance.price?.diff_24h?.['USD'])
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

export function mapEthPortfolio(
    rawAddress: string,
    data: MoralisWalletResponse,
    name: string,
): PortfolioData {
    const ethAmount = Number(data.nativeBalance.balance) / 1e18
    const ethValueUsd = ethAmount * data.nativeBalance.usd_price

    const asset: PortfolioData = {
        id: crypto.randomUUID(),
        name,
        chain: 'eth',
        address: {
            raw: EthAddress.toRaw(rawAddress),
            friendly: EthAddress.toChecksum(rawAddress),
        },
        totalBalanceUsd: ethValueUsd,
        totalDiff24h: 0,
        nativeToken: {
            symbol: 'ETH',
            amount: ethAmount,
            priceUsd: data.nativeBalance.usd_price,
            change24h: data.nativeBalance.usd_24hr_change,
        },
        topTokens: [],
    }

    const weighted = [{ valueUsd: ethValueUsd, change24h: data.nativeBalance.usd_24hr_change }]

    for (const token of data.tokens) {
        if (!token.usd_price || !token.usd_value) continue
        if ((token.security_score ?? 0) < 50) continue
        // пропускаем ETH-деривативы — они уже учтены в nativeToken
        if (
            ['eth', 'weth', 'steth', 'wsteth', 'cbeth', 'reth'].includes(token.symbol.toLowerCase())
        )
            continue

        const amount = Number(token.balance) / 10 ** (token.decimals || 18)

        asset.totalBalanceUsd += token.usd_value
        weighted.push({
            valueUsd: token.usd_value,
            change24h: token.usd_price_24hr_percent_change ?? 0,
        })

        asset.topTokens.push({
            address: token.token_address,
            name: token.name,
            symbol: token.symbol,
            decimals: token.decimals,
            image: token.thumbnail,
            amount,
            priceUsd: token.usd_price,
            totalUsd: token.usd_value,
            change24h: token.usd_price_24hr_percent_change ?? 0,
        } as TokenItem)
    }

    if (asset.totalBalanceUsd > 0) {
        asset.totalDiff24h = weighted.reduce(
            (acc, { valueUsd, change24h }) => acc + (valueUsd / asset.totalBalanceUsd) * change24h,
            0,
        )
    }

    asset.topTokens = asset.topTokens.sort((a, b) => b.totalUsd - a.totalUsd).slice(0, 3)
    return asset
}
