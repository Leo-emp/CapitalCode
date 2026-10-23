// # Tests for art/rig/faces.tsx
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { EXPRESSIONS, Face } from '../../art/rig/faces'
import { HERO } from '../../art/rig/looks'
import { Character } from '../../art/rig/Character'
import { POSES } from '../../art/rig/pose'

test('all 7 expressions exist', () => {
  expect([...EXPRESSIONS].sort()).toEqual(['angry', 'neutral', 'shocked', 'smiling', 'smug', 'thinking', 'worried'])
})

test('every expression draws something different from neutral', () => {
  const neutral = renderToStaticMarkup(<svg><Face expression="neutral" look={HERO} /></svg>)
  for (const e of EXPRESSIONS.filter((x) => x !== 'neutral'))
    expect(renderToStaticMarkup(<svg><Face expression={e} look={HERO} /></svg>)).not.toBe(neutral)
})

test('characters show their pose expression by default', () => {
  const html = renderToStaticMarkup(<svg><Character pose={{ ...POSES.idle, expression: 'shocked' }} /></svg>)
  expect(html).toContain('data-expression="shocked"')
})
