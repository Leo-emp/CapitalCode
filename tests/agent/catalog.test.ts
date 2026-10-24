// # The catalog lists every id the director may use, straight from the registries
import { expect, test } from 'vitest'
import { catalog, catalogMarkdown } from '../../agent/catalog'

test('catalog lists scenes with anchors and tags, props, poses, expressions, cast, slides, thumb options', () => {
  const c = catalog(['whoosh'])
  expect(c.scenes.length).toBeGreaterThan(50)
  expect(c.scenes[0]).toEqual(expect.objectContaining({ id: expect.any(String), anchors: expect.any(Array), tags: expect.any(Array) }))
  expect(c.props.length).toBeGreaterThan(50)
  expect(c.poses).toContain('think')
  expect(c.expressions.length).toBeGreaterThan(5)
  expect(c.cast.length).toBeGreaterThan(1)
  expect(c.slides.map((s) => s.kind)).toEqual(expect.arrayContaining(['number', 'bars', 'line', 'compare', 'quote']))
  expect(c.sfx).toEqual(['whoosh'])
  expect(c.thumbnail.layouts).toContain('split')
})

test('catalog markdown names every scene id once', () => {
  const c = catalog([])
  const md = catalogMarkdown(c)
  for (const s of c.scenes) expect(md).toContain(`\`${s.id}\``)
})
