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

// ------------------------------------------------------------ expansion 2026-10-24: niche coverage + variety
test('60+ scenes after the expansion', () => {
  expect(SCENES.length).toBeGreaterThanOrEqual(60)
})

test('every niche area has its own scenes (topic split: investing, personal finance, AI & tech, business, crypto, economy)', () => {
  for (const [tag, min] of [['investing', 8], ['personal-finance', 7], ['ai', 5], ['tech', 6], ['business', 8], ['crypto', 3], ['economy', 3]] as const)
    expect(findScenes(tag).length, tag).toBeGreaterThanOrEqual(min)
})

test('every scene renders in every time/weather, colour mood and camera framing', () => {
  for (const s of SCENES) {
    const C = s.Component
    for (const time of ['night', 'dusk', 'rain', 'fog'] as const)
      for (const tone of ['blue', 'gold', 'red', 'green'] as const)
        expect(() => renderToStaticMarkup(<C time={time} tone={tone} framing="medium" frame={12} />), `${s.id} ${time} ${tone}`).not.toThrow()
    for (const framing of ['wide', 'medium', 'close'] as const)
      expect(() => renderToStaticMarkup(<C framing={framing} />), `${s.id} ${framing}`).not.toThrow()
  }
}, 180_000)

test('close framing zooms the camera toward the focal point; wide does not', () => {
  const C = getScene('trading-desk').Component
  const cam = (html: string) => /data-camera="([^"]+)"/.exec(html)?.[1]
  expect(cam(renderToStaticMarkup(<C framing="wide" />))).toBe('1')
  expect(Number(cam(renderToStaticMarkup(<C framing="close" />)))).toBeGreaterThan(1.3)
})

test('variants change the picture: rain adds streaks, a tone adds its colour wash', () => {
  const C = getScene('wall-street').Component
  expect(renderToStaticMarkup(<C time="rain" />)).toContain('data-weather="rain"')
  expect(renderToStaticMarkup(<C tone="red" />)).toContain('data-tone="red"')
})
