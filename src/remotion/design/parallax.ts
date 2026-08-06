// # 3-layer parallax depth system for scene backgrounds
// # background (0.3x) → midground (0.6x) → foreground (1.0x)
// # Creates depth illusion via horizontal drift — purely CSS transforms

import type { CSSProperties } from 'react'

// # Layer names matching cinematic depth terminology
export type ParallaxLayer = 'background' | 'midground' | 'foreground'

// # Speed multiplier per layer — lower = slower = appears farther away
const LAYER_SPEED: Record<ParallaxLayer, number> = {
  background: 0.3,   // # Slow drift — sky, distant buildings
  midground: 0.6,    // # Medium drift — charts, data overlays
  foreground: 1.0,   // # Full speed — text, interactive elements
}

// # Total horizontal pixel drift across the full scene duration
const TOTAL_DRIFT = 20

// # Calculate parallax CSS transform for a layer at a given frame
// # frame: current animation frame
// # durationFrames: total scene length in frames
export function parallaxStyle(
  layer: ParallaxLayer,
  frame: number,
  durationFrames: number
): CSSProperties {
  // # Progress 0→1 across the scene duration
  const progress = durationFrames > 0 ? frame / durationFrames : 0

  // # Center the movement: start at -half, end at +half
  // # Multiplied by layer speed for depth effect
  const offset = (progress - 0.5) * TOTAL_DRIFT * LAYER_SPEED[layer]

  return {
    transform: `translateX(${offset}px)`,
  }
}
