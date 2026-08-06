// # Background styles for Remotion scene components
// # All backgrounds use design tokens — never raw hex values

import type { CSSProperties } from 'react'
import { colors } from './colors'

// # Dark navy gradient — default for all scenes
export function gradientBg(): CSSProperties {
  return {
    background: `linear-gradient(135deg, ${colors.bg.primary} 0%, ${colors.bg.secondary} 50%, ${colors.bg.tertiary} 100%)`,
    width: '100%',
    height: '100%',
    position: 'absolute',
  }
}

// # Solid dark background
export function solidBg(): CSSProperties {
  return {
    background: colors.bg.primary,
    width: '100%',
    height: '100%',
    position: 'absolute',
  }
}

// # Animated gradient background — slow hue shift across scene duration
// # progress: 0→1, shifts angle from 135° to 180° and tints mid-color bluer
export function animatedGradientBg(progress: number): CSSProperties {
  // # Rotate gradient angle gradually
  const angle = 135 + progress * 45
  // # Shift middle color toward blue as scene progresses
  const midR = 13 - Math.round(progress * 3)
  const midG = 27 + Math.round(progress * 5)
  const midB = 42 + Math.round(progress * 8)
  return {
    background: `linear-gradient(${angle}deg, ${colors.bg.primary} 0%, rgb(${midR},${midG},${midB}) 50%, ${colors.bg.tertiary} 100%)`,
    width: '100%',
    height: '100%',
    position: 'absolute' as const,
  }
}

export type BgStyle = 'gradient' | 'solid' | 'animated'
