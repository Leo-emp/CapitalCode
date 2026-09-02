// # Premium bokeh particle system — soft circular light blobs + dust motes
// # Replaces simple dot particles with the look seen on ColdFusion/HMW
// # Two layers: large soft bokeh circles + tiny sharp dust motes
// # All gold-palette to stay on brand

import React from 'react'
import { useCurrentFrame, interpolate } from 'remotion'
import { colors } from '../design/colors'

export interface BokehParticlesProps {
  // # Number of large bokeh circles (5-8 is subtle, 12+ is busy)
  bokehCount?: number
  // # Number of tiny dust motes (15-25 for ambient depth)
  dustCount?: number
  maxOpacity?: number
}

// # Deterministic pseudo-random — Math.random() breaks Remotion
function sr(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

export const BokehParticles: React.FC<BokehParticlesProps> = ({
  bokehCount = 7,
  dustCount = 20,
  maxOpacity = 0.15,
}) => {
  const frame = useCurrentFrame()

  // # Large bokeh circles — soft, blurred, slow-moving
  const bokehs = Array.from({ length: bokehCount }, (_, i) => {
    const x = sr(i * 7 + 1) * 100
    const yBase = sr(i * 13 + 3) * 100
    const size = 40 + sr(i * 19 + 5) * 80
    const speed = 0.08 + sr(i * 23 + 7) * 0.12
    const opacity = maxOpacity * (0.3 + sr(i * 29 + 11) * 0.7)

    // # Slow upward drift with slight horizontal sway
    const y = yBase - (frame * speed) % (yBase + 30)
    const sway = Math.sin(frame * 0.02 + i * 2.1) * 3

    // # Pulse size gently
    const pulse = 1 + Math.sin(frame * 0.03 + i * 1.7) * 0.15
    const currentSize = size * pulse

    // # Fade near edges
    const fadeOpacity = interpolate(y, [-10, 15, 85, 110], [0, opacity, opacity, 0], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    })

    return { x: x + sway, y, size: currentSize, opacity: fadeOpacity, key: `b${i}` }
  })

  // # Tiny dust motes — sharp, fast twinkle, scattered
  const motes = Array.from({ length: dustCount }, (_, i) => {
    const x = sr(i * 11 + 100) * 100
    const yBase = sr(i * 17 + 200) * 120 + 10
    const size = 1.5 + sr(i * 31 + 300) * 2.5
    const speed = 0.15 + sr(i * 37 + 400) * 0.25
    const twinkleSpeed = 0.05 + sr(i * 41 + 500) * 0.08

    const y = yBase - (frame * speed) % (yBase + 20)
    const twinkle = Math.sin(frame * twinkleSpeed + i * 3.7)
    const opacity = twinkle > 0.2 ? maxOpacity * 0.5 * twinkle : 0

    return { x, y, size, opacity, key: `d${i}` }
  })

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 90, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* # Large bokeh circles — soft blur gives the out-of-focus look */}
      {bokehs.map((b) => (
        <div key={b.key} style={{
          position: 'absolute',
          left: `${b.x}%`,
          top: `${b.y}%`,
          width: b.size,
          height: b.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.accent.goldLight}40 0%, ${colors.accent.gold}20 40%, transparent 70%)`,
          opacity: b.opacity,
          filter: 'blur(4px)',
        }} />
      ))}
      {/* # Tiny dust motes — sharp and fast-twinkling */}
      {motes.map((m) => (
        <div key={m.key} style={{
          position: 'absolute',
          left: `${m.x}%`,
          top: `${m.y}%`,
          width: m.size,
          height: m.size,
          borderRadius: '50%',
          backgroundColor: colors.accent.goldLight,
          opacity: m.opacity,
        }} />
      ))}
    </div>
  )
}
