// # Tests for art/infographics/layout.ts — number formatting + chart maths
import { describe, expect, test } from 'vitest'
import { formatMoney, formatPct, niceTicks, scaleLinear } from '../../art/infographics/layout'

describe('formatMoney', () => {
  test('compact money like the reference slides', () => {
    expect(formatMoney(350000, { compact: true })).toBe('$350k')
    expect(formatMoney(1050000, { compact: true })).toBe('$1.05m')
    expect(formatMoney(8e9, { compact: true })).toBe('$8B')
    expect(formatMoney(4.2e12, { compact: true })).toBe('$4.2T')
    expect(formatMoney(950, { compact: true })).toBe('$950')
  })
  test('full money with separators and negatives', () => {
    expect(formatMoney(8000000000)).toBe('$8,000,000,000')
    expect(formatMoney(-40000, { compact: true })).toBe('-$40k')
  })
})

test('formatPct keeps sign when asked', () => {
  expect(formatPct(-77)).toBe('-77%')
  expect(formatPct(12.5, { sign: true })).toBe('+12.5%')
})

describe('niceTicks', () => {
  test('round steps covering the range', () => {
    expect(niceTicks(0, 69, 5)).toEqual([0, 20, 40, 60, 80])
    expect(niceTicks(0, 1, 5)).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
  })
  test('flat data still gives a range', () => {
    expect(niceTicks(5, 5, 4).length).toBeGreaterThan(1)
  })
})

test('scaleLinear maps endpoints exactly and inverts', () => {
  const s = scaleLinear([0, 80], [860, 300])
  expect(s(0)).toBe(860)
  expect(s(80)).toBe(300)
  expect(s(40)).toBe(580)
})
