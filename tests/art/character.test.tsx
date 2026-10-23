// # Tests for art/rig/Character.tsx
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { Character } from '../../art/rig/Character'
import { POSE_IDS, POSES } from '../../art/rig/pose'

test('two characters in one frame have distinct gradient ids', () => {
  const html = renderToStaticMarkup(<svg><Character pose={POSES.idle} /><Character pose={POSES.point} /></svg>)
  const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1])
  expect(ids.length).toBeGreaterThan(4)
  expect(new Set(ids).size).toBe(ids.length)
})

test('every pose renders', () => {
  for (const id of POSE_IDS) expect(() => renderToStaticMarkup(<svg><Character pose={POSES[id]} /></svg>)).not.toThrow()
})
