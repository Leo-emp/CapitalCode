// # Tests for the scene library
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { findScenes, getScene, SCENES } from '../../art/scenes/registry'

test('at least 30 scenes with unique ids, titles and tags', () => {
  expect(SCENES.length).toBeGreaterThanOrEqual(30)
  expect(new Set(SCENES.map((s) => s.id)).size).toBe(SCENES.length)
  for (const s of SCENES) {
    expect(s.title.length).toBeGreaterThan(0)
    expect(s.tags.length).toBeGreaterThan(0)
  }
})

test('every scene has a stand anchor, a prop anchor, and anchors inside the frame', () => {
  for (const s of SCENES) {
    expect(s.anchors.stand, s.id).toBeDefined()
    expect(Object.keys(s.anchors).some((k) => k.startsWith('prop')), s.id).toBe(true)
    for (const [k, a] of Object.entries(s.anchors)) {
      expect(a.x, `${s.id}.${k}`).toBeGreaterThanOrEqual(0)
      expect(a.x, `${s.id}.${k}`).toBeLessThanOrEqual(1920)
      expect(a.y, `${s.id}.${k}`).toBeGreaterThanOrEqual(0)
      expect(a.y, `${s.id}.${k}`).toBeLessThanOrEqual(1080)
      expect(a.scale).toBeGreaterThan(0)
    }
  }
})

test('every scene renders at the start and end of its drift, lights off and on', () => {
  for (const s of SCENES) {
    const C = s.Component
    for (const props of [{ t: 0, lightsOn: 0 }, { t: 1, lightsOn: 1, frame: 45 }])
      expect(() => renderToStaticMarkup(<C {...props} />), s.id).not.toThrow()
  }
})

test('lookup by id and tag; the approved shop street exists', () => {
  expect(getScene('shop-street').id).toBe('shop-street')
  expect(() => getScene('nowhere')).toThrow(/nowhere/)
  for (const tag of ['money', 'work', 'tech', 'world', 'thumbnail']) expect(findScenes(tag).length, tag).toBeGreaterThan(0)
})

test('two copies of a scene do not share ids', () => {
  const C = getScene('office').Component
  const html = renderToStaticMarkup(<div><C /><C /></div>)
  const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1])
  expect(new Set(ids).size).toBe(ids.length)
})
