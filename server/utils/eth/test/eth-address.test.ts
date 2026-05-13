import EthAddress from '@@/server/utils/eth/eth-address'

import { beforeAll, describe, expect, it, vi } from 'vitest'

beforeAll(() => {
    vi.stubGlobal('createError', (opts: { statusCode: number; statusMessage: string }) => {
        const err = new Error(opts.statusMessage) as Error & { statusCode: number }
        err.statusCode = opts.statusCode
        return err
    })
})

const VALID = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
const VALID_LOWER = VALID.toLowerCase()

describe('EthAddress', () => {
    describe('validate', () => {
        it('returns true for a valid address', () => {
            expect(EthAddress.validate(VALID)).toBe(true)
        })

        it('throws for an invalid address', () => {
            expect(() => EthAddress.validate('not-an-address')).toThrow('Invalid ETH address')
        })

        it('throws for an empty string', () => {
            expect(() => EthAddress.validate('')).toThrow('Invalid ETH address')
        })
    })

    describe('toChecksum', () => {
        it('returns EIP-55 checksummed address from lowercase', () => {
            expect(EthAddress.toChecksum(VALID_LOWER)).toBe(VALID)
        })

        it('returns the same checksummed address if already correct', () => {
            expect(EthAddress.toChecksum(VALID)).toBe(VALID)
        })
    })

    describe('toRaw', () => {
        it('lowercases the address', () => {
            expect(EthAddress.toRaw(VALID)).toBe(VALID_LOWER)
        })

        it('is idempotent on already lowercase address', () => {
            expect(EthAddress.toRaw(VALID_LOWER)).toBe(VALID_LOWER)
        })
    })
})
