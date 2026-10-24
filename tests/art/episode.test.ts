// # Scene slams: nothing in the scene may read through the words (Critic, rounds 1–2: shop sign, brain "?")
import { expect, test } from 'vitest'
import { slamLayers } from '../../art/episode/Episode'

test('before a slam the scene is untouched', () => {
  expect(slamLayers(100, 130)).toEqual({ dim: 0, band: 0, props: true })
  expect(slamLayers(100, undefined)).toEqual({ dim: 0, band: 0, props: true })
})

test('during a slam: dark scene, near-solid band behind the words, props hidden', () => {
  const l = slamLayers(140, 130)
  expect(l.dim).toBeGreaterThanOrEqual(0.86)
  expect(l.band).toBeGreaterThanOrEqual(0.95)
  expect(l.props).toBe(false)
})

// # Persistent small logo (Alux keeps theirs on every frame); hidden on the brand card itself
test('the corner logo shows on every shot except the brand card', async () => {
  const { cornerLogo } = await import('../../art/episode/Episode')
  expect(cornerLogo('scene')).toBe(true)
  expect(cornerLogo('slide')).toBe(true)
  expect(cornerLogo('chapter')).toBe(true)
  expect(cornerLogo('brand')).toBe(false)
})
