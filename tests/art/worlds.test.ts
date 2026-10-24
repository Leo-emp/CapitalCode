// # Tests for the colour worlds (living film spec §4): lit night, never near-black; teal second world
import { expect, test } from 'vitest'
import { luma, WORLDS } from '../../art/tokens'

test('night sky is deep navy: lit, not near-black', () => {
  expect(luma(WORLDS.night.sky[0])).toBeGreaterThanOrEqual(9)
  expect(luma(WORLDS.night.sky[0])).toBeLessThanOrEqual(16)
  expect(luma(WORLDS.night.sky[0])).toBeGreaterThan(luma('#05070C') * 2.5)
})

test('teal sky sits a little brighter than night', () => {
  expect(luma(WORLDS.teal.sky[0])).toBeGreaterThanOrEqual(14)
  expect(luma(WORLDS.teal.sky[0])).toBeLessThanOrEqual(24)
})

test('solid objects are bright in both worlds', () => {
  for (const w of Object.values(WORLDS)) expect(luma(w.solid)).toBeGreaterThanOrEqual(55)
})

test('both worlds define the same keys', () => {
  expect(Object.keys(WORLDS.teal).sort()).toEqual(Object.keys(WORLDS.night).sort())
})
