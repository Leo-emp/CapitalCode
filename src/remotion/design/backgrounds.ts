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

export type BgStyle = 'gradient' | 'solid'
