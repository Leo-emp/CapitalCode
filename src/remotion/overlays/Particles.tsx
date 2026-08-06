// # CSS-only floating particle system — gold dots drifting upward
// # No canvas, no external deps — deterministic positioned divs
// # Uses seeded pseudo-random (not Math.random) for Remotion compatibility

import React from 'react'
import { useCurrentFrame, interpolate } from 'remotion'
import { colors } from '../design/colors'

export interface ParticlesProps {
  count?: number         // # Number of particles, default 20
  color?: string         // # Particle color, default gold accent
  speed?: number         // # Pixels per frame upward drift, default 0.5
  maxOpacity?: number    // # Peak opacity, default 0.3 (subtle, not distracting)
}

// # Deterministic pseudo-random using seed — Math.random() breaks Remotion rendering
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

export const Particles: React.FC<ParticlesProps> = ({
  count = 20,
  color = colors.accent.gold,
  speed = 0.5,
  maxOpacity = 0.3,
}) => {
  const frame = useCurrentFrame()

  // # Generate particle positions from index (deterministic)
  const particles = Array.from({ length: count }, (_, i) => {
    // # Spread across horizontal space using seeded random
    const xPct = seededRandom(i * 7 + 1) * 100
    // # Stagger vertical start — some start above viewport
    const yStart = seededRandom(i * 13 + 3) * 120 + 100
    // # Slight size variation: 2–6px dots
    const size = 2 + seededRandom(i * 19 + 5) * 4
    // # Per-particle speed variation for organic feel
    const particleSpeed = speed * (0.7 + seededRandom(i * 23 + 7) * 0.6)
    // # Per-particle opacity variation
    const opacity = maxOpacity * (0.4 + seededRandom(i * 29 + 11) * 0.6)

    // # Current Y position — drifts upward, wraps when past top
    const yOffset = frame * particleSpeed
    const y = yStart - (yOffset % (yStart + 50))

    // # Fade out near top and bottom edges for smooth appearance
    const fadeOpacity = interpolate(y, [-20, 30, yStart - 30, yStart], [0, opacity, opacity, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })

    return { x: xPct, y, size, opacity: fadeOpacity, key: i }
  })

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map((p) => (
        <div key={p.key} style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          borderRadius: '50%',
          backgroundColor: color,
          opacity: p.opacity,
        }} />
      ))}
    </div>
  )
}
