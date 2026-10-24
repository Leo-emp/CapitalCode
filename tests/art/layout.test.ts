// # Tests for art/infographics/layout.ts — number formatting + chart maths
import { describe, expect, test } from 'vitest'
import { barRows, formatMoney, formatPct, labelRows, niceTicks, pctFormat, scaleLinear, slamEntry, slamSize } from '../../art/infographics/layout'

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
  // # small amounts with cents keep them ($37.90 of every $100 must not read "$38")
  test('full money keeps cents under $1,000', () => {
    expect(formatMoney(37.9)).toBe('$37.90')
    expect(formatMoney(7.52)).toBe('$7.52')
    expect(formatMoney(100)).toBe('$100')
    expect(formatMoney(1250.4)).toBe('$1,250')
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

// # Charts and slams must always fit the 1920×1080 frame (10 bars overflowed in the first long video)
describe('fit to frame', () => {
  test('up to 6 bars keep the roomy default rows', () => {
    expect(barRows(2)).toEqual({ height: 54, gap: 46, font: 30, value: 38 })
    expect(barRows(6).height).toBe(54)
  })
  test('10 bars shrink so every row fits above the source line', () => {
    const r = barRows(10)
    expect(10 * r.height + 9 * r.gap).toBeLessThanOrEqual(600)
    expect(r.font).toBeGreaterThanOrEqual(30) // # phone-readable (owner rule r10)
    expect(r.value).toBeGreaterThanOrEqual(30)
  })
  test('a short slam keeps its size; a long one shrinks to fit 1,700 px', () => {
    expect(slamSize(['BUYERS', "DON'T."], 200)).toBe(200)
    const s = slamSize(['GREAT COMPANY', '≠ GREAT PRICE'], 200)
    expect(s).toBeLessThan(200)
    expect(s).toBeGreaterThanOrEqual(110)
  })
})

// # A slam word must never grow over its neighbour (CHOSEN/ON PURPOSE tore in the first long video)
test('slam entry overshoot stays under the 40 px word gap', () => {
  for (let g = 0; g <= 1.0001; g += 0.05) {
    const e = slamEntry(g)
    expect(e.scale).toBeLessThanOrEqual(1.06)
    expect(e.opacity).toBeGreaterThanOrEqual(0)
  }
  expect(slamEntry(1)).toEqual({ scale: 1, y: 0, opacity: 1 })
})

// # Stacked-bar labels: a narrow segment's label drops to a second row instead of colliding ($7.52$30.38)
test('labels closer than 16% of the bar alternate rows', () => {
  expect(labelRows([7.52, 30.38, 62.1])).toEqual([0, 1, 0])
  expect(labelRows([40, 30, 30])).toEqual([0, 0, 0])
  expect(labelRows([5, 5, 5, 85])).toEqual([0, 1, 0, 1])
})

// # One rounding per chart: 7.5% next to "2%" read as inconsistent (Critic round 2)
test('pctFormat uses the same decimals for every value of a chart', () => {
  const f = pctFormat([7.52, 6.59, 2.02, 1.47])
  expect([7.52, 2.02, 1.47].map(f)).toEqual(['7.5%', '2.0%', '1.5%'])
  const g = pctFormat([40, 27])
  expect([40, 27].map(g)).toEqual(['40%', '27%'])
})
