// # Tests for art/thumbnails/fitText.ts
import { expect, test } from 'vitest'
import { approxMeasure, fitText } from '../../art/thumbnails/fitText'

// # Fake fixed-width font: every character is half the font size wide
const mono = (text: string, size: number) => text.length * size * 0.5

test('three short words fit at the maximum size', () => {
  const r = fitText('WHO GETS PAID', { w: 1000, h: 400 }, { min: 40, max: 120, lineHeight: 1 }, mono)
  expect(r.size).toBe(120)
  expect(r.overflow).toBe(false)
  expect(r.lines.join(' ')).toBe('WHO GETS PAID')
})

test('a long word shrinks until it fits the width', () => {
  const r = fitText('ENTREPRENEURSHIPISNOTMAGIC', { w: 600, h: 400 }, { min: 20, max: 120, lineHeight: 1 }, mono)
  expect(r.overflow).toBe(false)
  expect(mono(r.lines[0], r.size)).toBeLessThanOrEqual(600)
  expect(r.size).toBeLessThan(120)
})

test('text that cannot fit reports overflow at the minimum size', () => {
  const r = fitText('THIS IS FAR TOO MUCH TEXT FOR A TINY BOX', { w: 100, h: 50 }, { min: 30, max: 60, lineHeight: 1 }, mono)
  expect(r.overflow).toBe(true)
  expect(r.size).toBe(30)
})

test('wrapping respects the box height', () => {
  const r = fitText('ONE TWO THREE FOUR', { w: 300, h: 250 }, { min: 20, max: 200, lineHeight: 1.1 }, mono)
  expect(r.lines.length * r.size * 1.1).toBeLessThanOrEqual(250)
  for (const l of r.lines) expect(mono(l, r.size)).toBeLessThanOrEqual(300)
})

test('approxMeasure: narrow letters are narrower than wide ones', () => {
  expect(approxMeasure('III', 100)).toBeLessThan(approxMeasure('WWW', 100))
})
