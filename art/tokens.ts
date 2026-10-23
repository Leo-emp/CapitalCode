// ============================================================
// DESIGN TOKENS — the CapitalCode look in one place
// Champagne sampled from the owner's logo (2026-10-23).
// ============================================================

import { staticFile } from 'remotion'

export const FPS = 30
export const W = 1920
export const H = 1080

export const COLORS = {
  // # Base: near-black night
  bg: '#05070C',
  bgPanel: '#0A111C',
  line: '#1E6FA8',          // # thin blue line-art (rooms, windows)
  lineDim: '#12385A',
  // # Brand metal (logo)
  champagne: '#C2B9B1',
  champagneLight: '#F0EAE1',
  champagneDark: '#A69C93',
  // # Character blues
  blue: '#2AA8F2',
  blueLight: '#5BCBFF',
  blueDeep: '#0D5A96',
  // # Meaning colours: only for gains / losses
  green: '#3DDC97',
  red: '#F0454B',
  // # Text
  text: '#E8EEF5',
  dim: '#7C8A9A',
  warm: '#FFD58A',          // # lamp / interior light
} as const

export const FONTS = {
  head: 'Inter',            // # slide headings, labels
  impact: 'Bebas Neue',     // # key-word slams, thumbnails
  data: 'JetBrains Mono',   // # counters
  serif: 'Georgia, "Times New Roman", serif', // # wordmark
} as const

// # @font-face block every composition injects once
export const fontFaces = (): string => `
@font-face{font-family:'Inter';src:url('${staticFile('fonts/Inter-Variable.ttf')}');font-weight:100 900;}
@font-face{font-family:'Bebas Neue';src:url('${staticFile('fonts/BebasNeue-Regular.ttf')}');}
@font-face{font-family:'JetBrains Mono';src:url('${staticFile('fonts/JetBrainsMono-Bold.ttf')}');font-weight:700;}
`

// # Motion: springs with a little overshoot, fast transitions
export const MOTION = {
  pop: { damping: 11, stiffness: 200 },
  settle: { damping: 15, stiffness: 130 },
  soft: { damping: 200 },
  transitionFrames: 8,
} as const

export const TOKENS = { FPS, W, H, COLORS, FONTS, MOTION }
