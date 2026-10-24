// # More variety to illustrate with (owner 2026-10-25: "add more variety for scenes and objects ... to match the
// # video style i like as much as we can"): 40 new objects and 12 new places, all solid flat art
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { PROPS } from '../../art/props/registry'
import { SCENES } from '../../art/scenes/registry'

const NEW_PROPS = [
  // # everyday life
  'coffee-cup', 'shopping-bag', 'grocery-basket', 'pizza', 'bills-stack', 'family', 'baby-stroller', 'graduation-cap', 'medical-kit', 'gas-pump',
  // # economy and markets
  'oil-barrel', 'cargo-ship', 'airplane', 'wheat', 'skyscraper', 'hospital', 'school', 'stock-certificate', 'interest-percent', 'inflation-balloon',
  // # metaphors
  'hourglass', 'snowball', 'ladder', 'dominoes', 'rocket', 'magnet', 'leaky-bucket', 'seedling', 'money-tree', 'umbrella',
  'key', 'padlock', 'bomb', 'parachute', 'anchor', 'scale-balance', 'thermometer', 'treasure-chest', 'crown', 'dice',
]
const NEW_PLACES = ['hospital-ward', 'farm', 'suburb-street', 'car-dealership', 'casino', 'gas-station', 'crosswalk', 'mountain-summit', 'stormy-sea', 'desert-oasis', 'space', 'factory-town']

const look = (html: string) => {
  const shapes = [...html.matchAll(/<(rect|circle|ellipse|path|polygon|line)\b[^>]*>/g)].map((m) => m[0])
  const outline = shapes.filter((s) => s.startsWith('<line') || /fill="none"/.test(s)).length
  return { solid: shapes.length - outline, ratio: outline / Math.max(1, shapes.length), colours: new Set([...html.matchAll(/fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1])).size }
}

test('40 new objects exist, render, are solid and tagged', () => {
  for (const id of NEW_PROPS) {
    const p = PROPS.find((x) => x.id === id)
    expect(p, id).toBeDefined()
    expect(p!.tags.length, id).toBeGreaterThanOrEqual(2)
    const C = p!.Component
    const l = look(renderToStaticMarkup(<svg><C size={200} frame={20} /></svg>))
    expect(l.solid, `${id} shapes`).toBeGreaterThanOrEqual(4)
    expect(l.colours, `${id} colours`).toBeGreaterThanOrEqual(3)
    expect(l.ratio, `${id} outline share`).toBeLessThanOrEqual(0.25)
  }
})

test('12 new places exist, are solid, and have a stand and a prop spot', () => {
  for (const id of NEW_PLACES) {
    const s = SCENES.find((x) => x.id === id)
    expect(s, id).toBeDefined()
    expect(s!.anchors.stand, id).toBeDefined()
    expect(Object.keys(s!.anchors).some((k) => k.startsWith('prop')), id).toBe(true)
    const C = s!.Component
    const l = look(renderToStaticMarkup(<C frame={20} />))
    expect(l.solid, `${id} shapes`).toBeGreaterThanOrEqual(40)
    expect(l.ratio, `${id} outline share`).toBeLessThanOrEqual(0.1)
  }
})

test('the library is big enough to illustrate almost anything: ≥ 100 objects, ≥ 80 places', () => {
  expect(PROPS.length).toBeGreaterThanOrEqual(100)
  expect(SCENES.length).toBeGreaterThanOrEqual(80)
})
