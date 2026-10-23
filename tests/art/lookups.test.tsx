// # Engine-facing lookups: unknown ids fail with a clear message; scenes accept actors per layer
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { getLook } from '../../art/rig/looks'
import { getPose } from '../../art/rig/pose'
import { getScene } from '../../art/scenes/registry'

test('getPose / getLook return entries or name the bad id', () => {
  expect(getPose('think').r.hand).toBe('chin')
  expect(() => getPose('thnk')).toThrow(/thnk/)
  expect(getLook('worker').accessory).toBe('hardhat')
  expect(() => getLook('wroker')).toThrow(/wroker/)
})

test('scene draws actors between its layers: back actors behind the mid scenery, front actors above it', () => {
  const C = getScene('shop-street').Component
  const html = renderToStaticMarkup(<C actors={{ back: <g data-a="back" />, mid: <g data-a="mid" />, front: <g data-a="front" /> }} />)
  const pos = (k: string) => html.indexOf(`data-a="${k}"`)
  const counter = html.indexOf('CORNER')            // # part of the mid scenery
  expect(pos('back')).toBeGreaterThan(-1)
  expect(pos('back')).toBeLessThan(counter)
  expect(pos('mid')).toBeGreaterThan(counter)
  expect(pos('front')).toBeGreaterThan(pos('mid'))
  expect(pos('front')).toBeLessThan(html.indexOf('vig'))  // # vignette stays on top of everyone
})
