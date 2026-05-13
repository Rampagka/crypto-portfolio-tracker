import { isValidEthAddress, isValidTonAddress } from '~/modules/portfolio/helpers/validate-address'

import { describe, expect, it } from 'vitest'

describe('Validate ton address', () => {
    it('valid friendly address', () => {
        expect(isValidTonAddress('EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2')).toBe(true)
        expect(isValidTonAddress('UQASE0sBXHdi9rFoMQJBuGAxQ9sQPaMRQwt5lfi6RtchMlzu')).toBe(true)
    })
    it('valid raw address', () => {
        expect(
            isValidTonAddress('0:88eddd9243d8a58bc5b8d6fa6c22e68cc9598131072c07111c334d5413968bfa'),
        ).toBe(true)
        expect(
            isValidTonAddress('0:b4c1b2ede12aa76f4a44353944258bcc8f99e9c7c474711a152c78b43218e296'),
        ).toBe(true)
    })
    it('not valid addresses', () => {
        expect(isValidTonAddress('sadsadsad23213das'))
        expect(isValidTonAddress('481215'))
    })
})

describe('Validate eth address', () => {
    it('valid addresses', () => {
        expect(isValidEthAddress('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae')).toBe(true)
        expect(isValidEthAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')).toBe(true)
    })
    it('not valid addresses', () => {
        expect(isValidEthAddress('0xde0b295e40f4cb697bae'))
        expect(isValidEthAddress('0x71C7656EC...7401B5f6d8976F'))
        expect(isValidEthAddress('481215'))
    })
})
