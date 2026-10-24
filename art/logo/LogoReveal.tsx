// ============================================================
// LOGO REVEAL (3 s): arms fade in, bars rise one by one, the
// slash swipes across, then the wordmark and tagline appear.
// LogoStill renders the finished lock-up for comparison.
// ============================================================

import React from 'react'
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion'
import { COLORS, fontFaces } from '../tokens'
import { Emblem } from './Emblem'
import { Wordmark } from './Wordmark'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

export const Lockup: React.FC<{ f: number }> = ({ f }) => {
  const arms = interpolate(f, [0, 12], [0, 1], clamp)
  const bars = interpolate(f, [8, 34], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })
  const slash = interpolate(f, [30, 40], [0, 1], { ...clamp, easing: Easing.out(Easing.quad) })
  const word = interpolate(f, [38, 56], [0, 1], clamp)
  const tag = interpolate(f, [52, 70], [0, 1], clamp)
  return (
    <AbsoluteFill style={{ background: COLORS.bg, alignItems: 'center', justifyContent: 'center' }}>
      <style>{fontFaces()}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
        <svg width={260} height={255} overflow="visible"><Emblem size={260} progress={{ arms, slash, bars }} /></svg>
        <div style={{ transform: `translateX(${(1 - word) * -24}px)` }}>
          <Wordmark height={150} tagline opacity={word} taglineOpacity={tag} />
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const LogoReveal: React.FC = () => <Lockup f={useCurrentFrame()} />
export const LogoStill: React.FC = () => <Lockup f={999} />
