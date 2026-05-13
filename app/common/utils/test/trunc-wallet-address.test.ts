import { truncWalletAddress } from '~/common/utils/trunc-wallet-address'

import { describe, expect, it } from 'vitest'

describe('trunc ton wallet address', () => {
    it('without custom divider', () => {
        expect(truncWalletAddress('ton', 'UQCAbcxvxf3-66')).toBe('UQCA...3-66')
        expect(truncWalletAddress('ton', 'EQBVdsadasdS123_uI1')).toBe('EQBV..._uI1')
    })
    it('with custom divider', () => {
        expect(truncWalletAddress('ton', 'UQCAbcxvxf3-66', '|')).toBe('UQCA|3-66')
        expect(truncWalletAddress('ton', 'EQBVdsadasdS123_uI1', '|')).toBe('EQBV|_uI1')
        expect(truncWalletAddress('ton', 'UQCAbcxvxjVjs', '..')).toBe('UQCA..jVjs')
        expect(truncWalletAddress('ton', 'EQBVdsadasdS123Pls', '..')).toBe('EQBV..3Pls')
    })
})

describe('trunc eth wallet address', () => {
    it('without custom divider', () => {
        expect(truncWalletAddress('eth', '0x742d35Cc663c454e4438f44e')).toBe('0x742d...f44e')
        expect(truncWalletAddress('eth', '0xd8dA6BF2696415D37aA96045')).toBe('0xd8dA...6045')
    })
    it('with custom divider', () => {
        expect(truncWalletAddress('eth', '0x742d35Cc663c454e4438f44e', '|')).toBe('0x742d|f44e')
        expect(truncWalletAddress('eth', '0xd8dA6BF2696415D37aA96045', '|')).toBe('0xd8dA|6045')
        expect(truncWalletAddress('eth', '0x742d35Cc663c454e4438f44e', '..')).toBe('0x742d..f44e')
        expect(truncWalletAddress('eth', '0xd8dA6BF2696415D37aA96045', '..')).toBe('0xd8dA..6045')
    })
})

describe('empty wallet address', () => {
    it('empty ton', () => {
        expect(truncWalletAddress('ton', '')).toBe('...')
    })
    it('empty eth', () => {
        expect(truncWalletAddress('eth', '')).toBe('...')
    })
})
