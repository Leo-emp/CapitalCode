// # Characters act inside scenes (owner review 2026-10-24): props in hands or on the floor,
// # two-person moments — instead of a presenter pointing at floating icons
import { expect, test } from 'vitest'
import { heldPoint, propBox } from '../../art/rig/Actor'
import { getPose, POSE_IDS } from '../../art/rig/pose'
import { SCENES } from '../../art/scenes/registry'

const anchor = { x: 600, y: 900, scale: 1, layer: 'mid' as const }

test('a held prop sits at the hand: right of the body and above the waist for "hold"', () => {
  const h = heldPoint('hold', anchor)
  expect(h.x).toBeGreaterThan(anchor.x + 40)
  expect(h.y).toBeLessThan(anchor.y - 200)
  expect(h.y).toBeGreaterThan(anchor.y - 560)
  // # mirrored actor holds on the other side
  expect(heldPoint('hold', anchor, true).x).toBeLessThan(anchor.x - 40)
  // # it follows the pose: raising the arms moves the hand up
  expect(heldPoint('celebrate', anchor).y).toBeLessThan(heldPoint('hold', anchor).y)
})

test('props are placed in the hand, on the floor, or at their anchor', () => {
  const hand = propBox('hand', 170, anchor, { pose: getPose('hold') })
  expect(hand.size).toBeLessThan(170)                       // # held things are hand-sized
  const floor = propBox('floor', 170, anchor)
  expect(floor.y + floor.size).toBeCloseTo(anchor.y, 0)     // # bottom edge on the ground line
  const air = propBox(undefined, 170, anchor)
  expect(air.y + air.size / 2).toBeCloseTo(anchor.y, 0)     // # old behaviour: centred on the anchor
})

test('every scene has a second standing spot for two-person moments', () => {
  for (const s of SCENES) {
    expect(s.anchors.stand2, s.id).toBeTruthy()
    expect(Math.abs(s.anchors.stand2.x - s.anchors.stand.x), s.id).toBeGreaterThan(250)
    expect(s.anchors.stand2.x, s.id).toBeGreaterThan(150)
    expect(s.anchors.stand2.x, s.id).toBeLessThan(1770)
  }
})

test('handshake and talk poses exist', () => {
  expect(POSE_IDS).toEqual(expect.arrayContaining(['handshake', 'talk']))
})

test('a floor prop on an occupied spot steps aside, away from the centre of the frame', () => {
  const left = { x: 600, y: 900, scale: 1, layer: 'mid' as const }
  const right = { x: 1400, y: 900, scale: 1, layer: 'mid' as const }
  const a = propBox('floor', 170, left, { occupied: true })
  expect(a.x).toBeLessThan(left.x - 170)                     // # beside the feet, on the outer side
  const b = propBox('floor', 170, right, { occupied: true })
  expect(b.x).toBeGreaterThan(right.x + 40)
  expect(propBox('floor', 170, left).x).toBeCloseTo(left.x - 85, 0)   // # free spot: centred as before
})

// # Stills review: a calculator ended up over the hero's face when he switched to "think" (hand at chin)
test('a held prop shows only while the hand is holding (not at the chin, pointing or in a pocket)', async () => {
  const { holdsInHand } = await import('../../art/rig/Actor')
  expect(holdsInHand(getPose('hold'))).toBe(true)
  expect(holdsInHand(getPose('present'))).toBe(true)
  expect(holdsInHand(getPose('think'))).toBe(false)
  expect(holdsInHand(getPose('point'))).toBe(false)
  expect(holdsInHand(getPose('pockets'))).toBe(false)
})

test('a floor prop never leaves the frame when it steps aside', () => {
  const edge = { x: 230, y: 900, scale: 1, layer: 'mid' as const }
  const b = propBox('floor', 170, edge, { occupied: true })
  expect(b.x).toBeGreaterThanOrEqual(40)
  expect(b.x + b.size).toBeLessThanOrEqual(1880)
})

// # Owner rule r14: props never float — "floor" at a mid-air prop spot lands on the scene's ground line
test('a floor prop at a mid-air spot stands on the given ground line', () => {
  const air = { x: 1400, y: 380, scale: 1, layer: 'mid' as const }
  const b = propBox('floor', 170, air, { ground: 900 })
  expect(b.y + b.size).toBeCloseTo(900, 0)
  expect(b.x + b.size / 2).toBeCloseTo(1400, 0)
})

// # Critic v3: the hero was cut off at the knees on Wall Street — the pavement is drawn in front of the
// # mid layer, so in pavement scenes the standing spots must be on the front layer
test('in scenes with a foreground pavement, people stand on the front layer', async () => {
  const { readFileSync } = await import('node:fs')
  const src = ['art/scenes/street.tsx', 'art/scenes/work.tsx', 'art/scenes/world.tsx', 'art/scenes/niche.tsx'].map((f) => readFileSync(f, 'utf8')).join('\n')
  const blocks = src.split(/makeScene\('/).slice(1)
  const withPavement = blocks.filter((b) => /front:[^\n]*Pavement/.test(b)).map((b) => b.slice(0, b.indexOf("'")))
  expect(withPavement.length).toBeGreaterThan(0)
  for (const id of withPavement) {
    const s = SCENES.find((x) => x.id === id)!
    expect(s.anchors.stand.layer, id).toBe('front')
    expect(s.anchors.stand2.layer, id).toBe('front')
  }
})

// ------------------------------------------------------------ living film: feelings that change, things handed over
test('face blends between two expressions (never a snap)', async () => {
  const React = (await import('react')).default
  const { renderToStaticMarkup } = await import('react-dom/server')
  const { FaceHD } = await import('../../art/rig/hd/CharacterHD')
  const at = (mix: number) => renderToStaticMarkup(React.createElement('svg', null, React.createElement(FaceHD, { expression: 'worried', to: 'smiling', mix })))
  expect(at(0.5)).not.toBe(at(0))
  expect(at(0.5)).not.toBe(at(1))
  expect(at(0)).toBe(renderToStaticMarkup(React.createElement('svg', null, React.createElement(FaceHD, { expression: 'worried' }))))
})

test('expressionAt eases from the previous feeling over 8 frames', async () => {
  const { expressionAt } = await import('../../art/motion/acting')
  const keys = [{ at: 0, pose: 'idle', expression: 'worried' }, { at: 100, pose: 'idle', expression: 'smiling' }]
  expect(expressionAt(50, keys)).toEqual({ expression: 'worried' })
  expect(expressionAt(104, keys)).toEqual({ expression: 'smiling', from: 'worried', mix: 0.5 })
  expect(expressionAt(108, keys)).toEqual({ expression: 'smiling' })
})

test('heldBy: giver until the cue, receiver 12 frames later, travelling in between', async () => {
  const { heldBy } = await import('../../art/motion/acting')
  const prop = { on: 'hand' as const, actor: 0, give: { at: 100, to: 1 } }
  expect(heldBy(99, prop)).toEqual({ actor: 0, travel: 0 })
  expect(heldBy(112, prop)).toEqual({ actor: 1, travel: 1 })
  let last = 0
  for (let f = 100; f <= 112; f++) { const t = heldBy(f, prop).travel; expect(t).toBeGreaterThanOrEqual(last); last = t }
  expect(heldBy(500, { on: 'hand' as const, actor: 1 })).toEqual({ actor: 1, travel: 0 })
})
