import { mapEthPortfolio, mapPortfolio } from '@@/server/utils/portfolio-mapper'

import type { MoralisWalletResponse } from '~/common/models/interfaces/eth.interface'
import type { TonAccount, TonAccountInfo, TonRates } from '~/common/models/interfaces/ton.interface'

import { describe, expect, it, vi } from 'vitest'

vi.mock('#server/utils/ton/ton-address', () => ({
    default: { toFriendly: (raw: string) => `EQ${raw}` },
}))
vi.mock('#server/utils/eth/eth-address', () => ({
    default: {
        toRaw: (a: string) => a.toLowerCase(),
        toChecksum: (a: string) => a,
    },
}))

const makeRates = (usdPrice: number, diff = '0'): TonRates => ({
    rates: { TON: { prices: { USD: usdPrice }, diff_24h: { USD: diff } } },
})

const makeWallet = (balance: number): TonAccount => ({
    address: '0:abc',
    balance,
    status: 1,
    icon: '',
    last_activity: 0,
})

const makeWalletInfo = (balances: TonAccountInfo['balances'] = []): TonAccountInfo => ({ balances })

describe('mapPortfolio', () => {
    it('calculates totalBalanceUsd from TON balance and price', () => {
        const wallet = makeWallet(5 * 1e9) // 5 TON
        const result = mapPortfolio(wallet, makeWalletInfo(), makeRates(2), 'W', 'ton')
        expect(result.totalBalanceUsd).toBeCloseTo(10)
    })

    it('sets nativeToken symbol and amount correctly', () => {
        const wallet = makeWallet(3 * 1e9) // 3 TON
        const result = mapPortfolio(wallet, makeWalletInfo(), makeRates(5), 'W', 'ton')
        expect(result.nativeToken.symbol).toBe('TON')
        expect(result.nativeToken.amount).toBeCloseTo(3)
        expect(result.nativeToken.priceUsd).toBe(5)
    })

    it('includes whitelist jettons in topTokens and totalBalanceUsd', () => {
        const balances: TonAccountInfo['balances'] = [
            {
                balance: '1000000000', // 1 token (9 decimals)
                jetton: {
                    address: '0:token1',
                    name: 'Token1',
                    symbol: 'TK1',
                    decimals: 9,
                    image: '',
                    verification: 'whitelist',
                    score: 100,
                },
                price: { prices: { USD: 10 }, diff_24h: { USD: '5' } },
            },
        ]
        const result = mapPortfolio(
            makeWallet(0),
            makeWalletInfo(balances),
            makeRates(0),
            'W',
            'ton',
        )
        expect(result.topTokens).toHaveLength(1)
        expect(result.topTokens[0]?.symbol).toBe('TK1')
        expect(result.totalBalanceUsd).toBeCloseTo(10)
    })

    it('excludes non-whitelist jettons', () => {
        const balances: TonAccountInfo['balances'] = [
            {
                balance: '1000000000',
                jetton: {
                    address: '0:token1',
                    name: 'Token1',
                    symbol: 'TK1',
                    decimals: 9,
                    image: '',
                    verification: 'blacklist',
                    score: 0,
                },
                price: { prices: { USD: 10 }, diff_24h: { USD: '0' } },
            },
        ]
        const result = mapPortfolio(
            makeWallet(0),
            makeWalletInfo(balances),
            makeRates(0),
            'W',
            'ton',
        )
        expect(result.topTokens).toHaveLength(0)
    })

    it('limits topTokens to 3 sorted by totalUsd desc', () => {
        const balances: TonAccountInfo['balances'] = [10, 50, 30, 5].map((usd, i) => ({
            balance: '1000000000',
            jetton: {
                address: `0:t${i}`,
                name: `T${i}`,
                symbol: `T${i}`,
                decimals: 9,
                image: '',
                verification: 'whitelist' as const,
                score: 100,
            },
            price: { prices: { USD: usd }, diff_24h: { USD: '0' } },
        }))
        const result = mapPortfolio(
            makeWallet(0),
            makeWalletInfo(balances),
            makeRates(0),
            'W',
            'ton',
        )
        expect(result.topTokens).toHaveLength(3)
        expect(result.topTokens[0]?.symbol).toBe('T1') // 50 USD
        expect(result.topTokens[1]?.symbol).toBe('T2') // 30 USD
        expect(result.topTokens[2]?.symbol).toBe('T0') // 10 USD
    })

    it('calculates weighted totalDiff24h', () => {
        const wallet = makeWallet(1e9) // 1 TON @ $2 = $2
        const rates = makeRates(2, '10') // TON +10%
        const result = mapPortfolio(wallet, makeWalletInfo(), rates, 'W', 'ton')
        expect(result.totalDiff24h).toBeCloseTo(10)
    })
})

describe('mapEthPortfolio', () => {
    const baseData = (): MoralisWalletResponse => ({
        nativeBalance: { balance: '2000000000000000000', usd_price: 3000, usd_24hr_change: 5 }, // 2 ETH
        tokens: [],
    })

    it('calculates totalBalanceUsd from ETH balance and price', () => {
        const result = mapEthPortfolio('0xabc', baseData(), 'W')
        expect(result.totalBalanceUsd).toBeCloseTo(6000)
    })

    it('sets nativeToken correctly', () => {
        const result = mapEthPortfolio('0xabc', baseData(), 'W')
        expect(result.nativeToken.symbol).toBe('ETH')
        expect(result.nativeToken.amount).toBeCloseTo(2)
        expect(result.nativeToken.priceUsd).toBe(3000)
    })

    it('excludes tokens with security_score below 50', () => {
        const data = baseData()
        data.tokens = [
            {
                token_address: '0x1',
                symbol: 'LOW',
                name: 'Low',
                decimals: 18,
                balance: '1000000000000000000',
                verified_contract: true,
                security_score: 30,
                usd_price: 10,
                usd_value: 10,
                usd_price_24hr_percent_change: 0,
            },
        ]
        const result = mapEthPortfolio('0xabc', data, 'W')
        expect(result.topTokens).toHaveLength(0)
    })

    it('excludes ETH derivative tokens', () => {
        const data = baseData()
        data.tokens = [
            {
                token_address: '0x2',
                symbol: 'WETH',
                name: 'Wrapped ETH',
                decimals: 18,
                balance: '1000000000000000000',
                verified_contract: true,
                security_score: 90,
                usd_price: 3000,
                usd_value: 3000,
                usd_price_24hr_percent_change: 0,
            },
        ]
        const result = mapEthPortfolio('0xabc', data, 'W')
        expect(result.topTokens).toHaveLength(0)
    })

    it('includes tokens with security_score >= 50 and non-ETH symbol', () => {
        const data = baseData()
        data.tokens = [
            {
                token_address: '0x3',
                symbol: 'USDC',
                name: 'USD Coin',
                decimals: 6,
                balance: '1000000',
                verified_contract: true,
                security_score: 90,
                usd_price: 1,
                usd_value: 1,
                usd_price_24hr_percent_change: 0,
            },
        ]
        const result = mapEthPortfolio('0xabc', data, 'W')
        expect(result.topTokens).toHaveLength(1)
        expect(result.topTokens[0]?.symbol).toBe('USDC')
    })

    it('limits topTokens to 3 sorted by totalUsd desc', () => {
        const data = baseData()
        data.nativeBalance = { balance: '0', usd_price: 0, usd_24hr_change: 0 }
        data.tokens = [100, 500, 300, 50].map((usdValue, i) => ({
            token_address: `0x${i}`,
            symbol: `TK${i}`,
            name: `Token${i}`,
            decimals: 18,
            balance: '1000000000000000000',
            verified_contract: true,
            security_score: 90,
            usd_price: usdValue,
            usd_value: usdValue,
            usd_price_24hr_percent_change: 0,
        }))
        const result = mapEthPortfolio('0xabc', data, 'W')
        expect(result.topTokens).toHaveLength(3)
        expect(result.topTokens[0]?.symbol).toBe('TK1') // 500
        expect(result.topTokens[1]?.symbol).toBe('TK2') // 300
        expect(result.topTokens[2]?.symbol).toBe('TK0') // 100
    })
})
