// # Tests for art/rig/looks.ts — the cast
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { Character } from '../../art/rig/Character'
import { HERO, LOOKS } from '../../art/rig/looks'
import { POSES } from '../../art/rig/pose'
import { COLORS } from '../../art/tokens'

test('hero keeps the owner-approved look', () => {
  expect(HERO.jacket[1]).toBe(COLORS.blue)
  expect(HERO.glasses).toBe(true)
  expect(HERO.hair).toBe('short')
})

test('cast has hero + at least 4 supporting looks, all different', () => {
  for (const id of ['hero', 'buyer', 'investor', 'owner', 'worker']) expect(LOOKS[id]).toBeDefined()
  const keys = Object.values(LOOKS).map((l) => JSON.stringify(l))
  expect(new Set(keys).size).toBe(keys.length)
})

test('accessories and hair styles are drawn', () => {
  const html = (id: string) => renderToStaticMarkup(<svg><Character pose={POSES.idle} look={LOOKS[id]} /></svg>)
  expect(html('owner')).toContain('data-accessory="apron"')
  expect(html('worker')).toContain('data-accessory="hardhat"')
  for (const id of Object.keys(LOOKS)) expect(html(id)).toContain(`data-hair="${LOOKS[id].hair}"`)
})
