// # Character consistency: one Actor (HD cast) everywhere, same on-screen height in every scene
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { Actor, actorHeight, CAST } from '../../art/rig/Actor'
import { getScene, SCENES } from '../../art/scenes/registry'

const ART = join(import.meta.dirname, '..', '..', 'art')
const files = (d: string): string[] => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? files(join(d, n)) : [join(d, n)]))

test('the cast is exactly the five approved HD characters', () => {
  expect([...CAST].sort()).toEqual(['buyer', 'hero', 'investor', 'owner', 'worker'])
})

test('Actor draws the HD character for a cast name and refuses unknown names', () => {
  const html = renderToStaticMarkup(<svg><Actor who="hero" pose="point" x={400} y={1000} /></svg>)
  expect(html).toContain('data-actor="hero"')
  expect(() => renderToStaticMarkup(<svg><Actor who="villain" pose="idle" x={0} y={0} /></svg>)).toThrow(/villain/)
  expect(() => renderToStaticMarkup(<svg><Actor who="hero" pose="dance" x={0} y={0} /></svg>)).toThrow(/dance/)
})

test('every scene gives a standing actor the same on-screen height (± 2%) at scale 1', () => {
  const h = actorHeight('idle', 1)
  for (const s of SCENES) expect(actorHeight('idle', s.anchors.stand.scale) / s.anchors.stand.scale, s.id).toBeCloseTo(h, 0)
  expect(h).toBeGreaterThan(500)
  expect(h).toBeLessThan(620)
})

test('no art module uses the retired v1 character drawing', () => {
  const allowed = new Set(['rig/Character.tsx', 'rig/faces.tsx'])
  for (const f of files(ART)) {
    const rel = relative(ART, f).replace(/\\/g, '/')
    if (allowed.has(rel) || !/\.tsx?$/.test(rel)) continue
    expect(readFileSync(f, 'utf8'), rel).not.toMatch(/from '\.{1,2}\/(rig\/)?Character'|from '\.\.\/rig\/Character'/)
  }
})



test('scenes contain no baked-in cast people (owner etc. come only from Actor)', () => {
  const html = renderToStaticMarkup(React.createElement(getScene('shop-street').Component, { frame: 10 }))
  expect(html).not.toContain('#2E7D5B')   // # the old baked-in owner's green shirt
  expect(html).not.toContain('data-actor')
})
