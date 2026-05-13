import TonAddress from '@@/server/utils/ton/ton-address'

import { beforeAll, describe, expect, it, vi } from 'vitest'

beforeAll(() => {
    vi.stubGlobal('createError', (opts: { statusCode: number; statusMessage: string }) => {
        const err = new Error(opts.statusMessage) as Error & { statusCode: number }
        err.statusCode = opts.statusCode
        return err
    })
})

const RAW = '0:88eddd9243d8a58bc5b8d6fa6c22e68cc9598131072c07111c334d5413968bfa'

describe('TonAddress', () => {
    describe('validate', () => {
        it('returns true for a valid raw address', () => {
            expect(TonAddress.validate(RAW)).toBe(true)
        })

        it('throws for an invalid address', () => {
            expect(() => TonAddress.validate('invalid')).toThrow('Invalid address')
        })
    })

    describe('toFriendly', () => {
        it('converts raw address to non-bounceable user-friendly format', () => {
            const result = TonAddress.toFriendly(RAW)
            expect(result).toMatch(/^(EQ|UQ)/)
        })

        it('returns friendly address unchanged', () => {
            const friendly = TonAddress.toFriendly(RAW)
            expect(TonAddress.toFriendly(friendly)).toBe(friendly)
        })
    })

    describe('isTestnet', () => {
        it('returns false for a raw address (not friendly)', () => {
            expect(TonAddress.isTestnet(RAW)).toBe(false)
        })

        it('returns false for a mainnet friendly address', () => {
            const friendly = TonAddress.toFriendly(RAW)
            expect(TonAddress.isTestnet(friendly)).toBe(false)
        })
    })
})
