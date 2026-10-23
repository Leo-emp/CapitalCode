// # Tests for art/uid.ts — every rendered instance gets its own SVG ids
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { useUid } from '../../art/uid'

const Thing: React.FC = () => {
  const id = useUid('grain')
  return <filter id={id} />
}

test('two instances get different, SVG-safe ids', () => {
  const html = renderToStaticMarkup(<svg><Thing /><Thing /></svg>)
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1])
  expect(ids).toHaveLength(2)
  expect(ids[0]).not.toBe(ids[1])
  for (const id of ids) {
    expect(id.startsWith('grain')).toBe(true)
    expect(id).toMatch(/^[A-Za-z][\w-]*$/)
  }
})
