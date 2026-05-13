import { getFormattedAmount } from '~/common/utils/format-amounts'

import { describe, expect, it } from 'vitest'

describe('format-amounts tests', () => {
    it('currency usd amounts', () => {
        expect(getFormattedAmount(1, 'USD')).toBe('$1.00')
        expect(getFormattedAmount(100, 'USD')).toBe('$100.00')
        expect(getFormattedAmount(1000, 'USD')).toBe('$1,000.00')
        expect(getFormattedAmount(100000, 'USD')).toBe('$100,000.00')
        expect(getFormattedAmount(1000000, 'USD')).toBe('$1,000,000.00')
        expect(getFormattedAmount(-1, 'USD')).toBe('-$1.00')
        expect(getFormattedAmount(-100, 'USD')).toBe('-$100.00')
        expect(getFormattedAmount(-1000, 'USD')).toBe('-$1,000.00')
        expect(getFormattedAmount(-100000, 'USD')).toBe('-$100,000.00')
        expect(getFormattedAmount(-1000000, 'USD')).toBe('-$1,000,000.00')
        expect(getFormattedAmount(0, 'USD')).toBe('$0.00')
    })
    it('currency percent amounts ', () => {
        expect(getFormattedAmount(1, '%')).toBe('1%')
        expect(getFormattedAmount(100, '%')).toBe('100%')
        expect(getFormattedAmount(1000.11111, '%')).toBe('1,000.111%')
        expect(getFormattedAmount(1.53252, '%')).toBe('1.532%')
        expect(getFormattedAmount(15.4599, '%')).toBe('15.459%')
        expect(getFormattedAmount(-1, '%')).toBe('-1%')
        expect(getFormattedAmount(-100, '%')).toBe('-100%')
        expect(getFormattedAmount(-1000.11111, '%')).toBe('-1,000.111%')
        expect(getFormattedAmount(-1.53252, '%')).toBe('-1.532%')
        expect(getFormattedAmount(-15.4599, '%')).toBe('-15.459%')
        expect(getFormattedAmount(0, '%')).toBe('0%')
    })
    it('without currency amounts', () => {
        expect(getFormattedAmount(0)).toBe('0.00')
        expect(getFormattedAmount(1000)).toBe('1,000.00')
        expect(getFormattedAmount(1000000)).toBe('1,000,000.00')
    })
})
