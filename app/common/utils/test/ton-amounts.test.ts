import { fromNano, toNano } from '~/common/utils/ton-amounts'

import { describe, expect, it } from 'vitest'

describe('toNano', () => {
    it('integer string amount', () => {
        expect(toNano('1', 9)).toBe(1_000_000_000)
        expect(toNano('1', 3)).toBe(1_000)
        expect(toNano('15', 6)).toBe(15_000_000)
        expect(toNano('-1000', 3)).toBe(-1_000_000)
        expect(toNano('0', 6)).toBe(0)
    })
    it('not integer string amount', () => {
        expect(toNano('1.11', 9)).toBe(1_110_000_000)
        expect(toNano('1.35256', 3)).toBe(1_352.56)
        expect(toNano('15.299', 6)).toBe(15_299_000)
        expect(toNano('-1000.12', 3)).toBe(-1_000_120)
        expect(toNano('0.12', 6)).toBe(120_000)
    })
    it('integer number amount', () => {
        expect(toNano(1, 9)).toBe(1_000_000_000)
        expect(toNano(1, 3)).toBe(1_000)
        expect(toNano(15, 6)).toBe(15_000_000)
        expect(toNano(-1000, 3)).toBe(-1_000_000)
        expect(toNano(0, 6)).toBe(0)
    })
    it('not integer number amount', () => {
        expect(toNano(1.11, 9)).toBe(1_110_000_000)
        expect(toNano(1.35256, 3)).toBe(1_352.56)
        expect(toNano(15.299, 6)).toBe(15_299_000)
        expect(toNano(-1000.12, 3)).toBe(-1_000_120)
        expect(toNano(0.12, 6)).toBe(120_000)
    })
})

describe('fromNano', () => {
    it('integer string amount', () => {
        expect(fromNano('1000000000', 9)).toBe(1)
        expect(fromNano('1000000', 3)).toBe(1_000)
        expect(fromNano('15000000', 6)).toBe(15)
        expect(fromNano('-12', 3)).toBe(-0.012)
        expect(fromNano('0', 6)).toBe(0)
    })
    it('not integer string amount', () => {
        expect(fromNano('1111000000', 9)).toBe(1.111)
        expect(fromNano('135256', 3)).toBe(135.256)
        expect(fromNano('152990012', 6)).toBe(152.990012)
        expect(fromNano('-1000.12', 3)).toBe(-1.00012)
        expect(fromNano('0.12', 2)).toBe(0.0012)
    })
    it('integer number amount', () => {
        expect(fromNano(1000000000, 9)).toBe(1)
        expect(fromNano(1000000, 3)).toBe(1_000)
        expect(fromNano(15000000, 6)).toBe(15)
        expect(fromNano(-12, 3)).toBe(-0.012)
        expect(fromNano(0, 6)).toBe(0)
    })
    it('not integer number amount', () => {
        expect(fromNano(1111000000, 9)).toBe(1.111)
        expect(fromNano(135256, 3)).toBe(135.256)
        expect(fromNano(152990012, 6)).toBe(152.990012)
        expect(fromNano(-1000.12, 3)).toBe(-1.00012)
        expect(fromNano(0.12, 2)).toBe(0.0012)
    })
})
