// # Tests for the prop library
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { findProps, getProp, PROPS } from '../../art/props/registry'

test('at least 60 props with unique ids, a title and tags', () => {
  expect(PROPS.length).toBeGreaterThanOrEqual(60)
  expect(new Set(PROPS.map((p) => p.id)).size).toBe(PROPS.length)
  for (const p of PROPS) {
    expect(p.title.length).toBeGreaterThan(0)
    expect(p.tags.length).toBeGreaterThan(0)
  }
})

test('every prop renders, with and without an entry animation', () => {
  for (const p of PROPS) {
    const { Component } = p
    expect(() => renderToStaticMarkup(<svg><Component size={200} /></svg>)).not.toThrow()
    expect(() => renderToStaticMarkup(<svg><Component size={120} frame={10} enter={5} /></svg>)).not.toThrow()
  }
})

test('lookup by id and by tag', () => {
  expect(getProp('coin').id).toBe('coin')
  expect(() => getProp('no-such-prop')).toThrow(/no-such-prop/)
  for (const tag of ['money', 'business', 'tech', 'crypto', 'drama']) expect(findProps(tag).length).toBeGreaterThan(0)
})

test('two copies of a prop do not share gradient ids', () => {
  const C = getProp('gold-bar').Component
  const html = renderToStaticMarkup(<svg><C size={100} /><C size={100} /></svg>)
  const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1])
  expect(new Set(ids).size).toBe(ids.length)
})
