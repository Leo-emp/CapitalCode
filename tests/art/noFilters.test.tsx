// # Guard: per-frame SVG noise filters made the CORNER SHOP sign tear (demo 13–15 s)
// # and were the most expensive part of every frame. Grain is now one static
// # texture overlay, so no scene or prop may use feTurbulence again.
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { PROPS } from '../../art/props/registry'
import { SCENES } from '../../art/scenes/registry'

test('no scene uses an SVG noise filter', () => {
  for (const s of SCENES) {
    const C = s.Component
    expect(renderToStaticMarkup(<C frame={10} t={0.5} />), s.id).not.toMatch(/feTurbulence|filter="url/)
  }
})

test('no prop uses an SVG noise filter', () => {
  for (const p of PROPS) {
    const C = p.Component
    expect(renderToStaticMarkup(<svg><C size={100} frame={10} /></svg>), p.id).not.toMatch(/feTurbulence|filter="url/)
  }
})
