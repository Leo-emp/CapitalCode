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
