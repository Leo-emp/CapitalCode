// # Kinetic text (owner 2026-10-24: "text animation occasionally where relevant")
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { countText, KineticText } from '../../art/motion/kinetic'

const html = (style: 'pop' | 'type' | 'stamp' | 'count', f: number, words = 'Only ten names') =>
  renderToStaticMarkup(<svg><KineticText words={words} style={style} frame={f} at={30} x={960} y={300} /></svg>)
const visible = (h: string) => h.replace(/<[^>]+>/g, '')

test('nothing is drawn before its cue word', () => {
  for (const s of ['pop', 'type', 'stamp', 'count'] as const) expect(visible(html(s, 29))).toBe('')
})

test('type writes on one letter per frame', () => {
  expect(visible(html('type', 34))).toBe('Only')
  expect(visible(html('type', 200))).toBe('Only ten names')
})

test('count rolls the number up from zero, keeping its format', () => {
  expect(countText('£1,250 saved', 0)).toBe('£0 saved')
  expect(countText('£1,250 saved', 1)).toBe('£1,250 saved')
  expect(countText('37.9% of the index', 1)).toBe('37.9% of the index')
  expect(visible(html('count', 30, '£1,250 saved'))).toBe('£0 saved')
  expect(visible(html('count', 50, '£1,250 saved'))).toBe('£1,250 saved')
})

test('pop brings words in one by one; stamp lands big then settles', () => {
  const op = (h: string) => [...h.matchAll(/opacity="([\d.]+)"/g)].map((m) => +m[1])
  const early = op(html('pop', 32))
  expect(early[0]).toBeGreaterThan(early[2])
  expect(html('stamp', 31)).not.toBe(html('stamp', 60))
})

test('kinetic text is big enough for a phone (≥ 44 px)', () => {
  const sizes = [...renderToStaticMarkup(<svg><KineticText words="x" style="pop" frame={90} at={30} x={0} y={0} size={20} /></svg>).matchAll(/(\d+)px/g)].map((m) => +m[1])
  expect(Math.min(...sizes)).toBeGreaterThanOrEqual(44)
})
