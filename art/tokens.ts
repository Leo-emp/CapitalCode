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
// # (same static WOFF2 files as art/fonts.ts, which makes renders wait for them)
export const fontFaces = (): string => [
  ...[400, 500, 600, 700, 800].map((w) => `@font-face{font-family:'Inter';src:url('${staticFile(`fonts/Inter-${w}.woff2`)}') format('woff2');font-weight:${w};}`),
  `@font-face{font-family:'Bebas Neue';src:url('${staticFile('fonts/BebasNeue-Regular.woff2')}') format('woff2');}`,
  `@font-face{font-family:'JetBrains Mono';src:url('${staticFile('fonts/JetBrainsMono-Bold.woff2')}') format('woff2');font-weight:700;}`,
  `@font-face{font-family:'JetBrains Mono';src:url('${staticFile('fonts/JetBrainsMono-Regular.woff2')}') format('woff2');font-weight:400;}`,
].join('\n')

// # Motion: springs with a little overshoot, fast transitions
export const MOTION = {
  pop: { damping: 11, stiffness: 200 },
  settle: { damping: 15, stiffness: 130 },
  soft: { damping: 200 },
  transitionFrames: 8,
} as const

export const TOKENS = { FPS, W, H, COLORS, FONTS, MOTION }

// # Slide / chapter / brand panel: navy like the Alux reference (≈ 12–16% brightness), lighter at the
// # centre so the eye goes to the content (was #0A111C → #060A11, ≈ 6% — owner review 2026-10-24)
export const PANEL_STOPS = ['#1C3150', '#13243C', '#0C1829'] as const
export const PANEL_BG = `radial-gradient(ellipse 85% 75% at 50% 42%, ${PANEL_STOPS[0]} 0%, ${PANEL_STOPS[1]} 55%, ${PANEL_STOPS[2]} 100%)`

// ------------------------------------------------------------
// COLOUR WORLDS — living film (owner 2026-10-24): "Night flat" is the main world (lit deep navy,
// never near-black, bright solid objects); deep teal is the second world for ~30% of shots.
// ------------------------------------------------------------
export type WorldId = 'night' | 'teal'
export type World = {
  sky: [string, string]   // # top → horizon gradient
  wall: string; floor: string // # interiors / ground
  body: string; bodyShade: string // # buildings, furniture: lit side + shadow side
  solid: string; solidShade: string // # bright hero objects (champagne cream)
  glow: string            // # windows, lamps
  line: string            // # the few outlines we keep
  shadow: string          // # soft ground shadow under things
}
export const WORLDS: Record<WorldId, World> = {
  night: { sky: ['#14284A', '#1E3A63'], wall: '#1B3358', floor: '#2B4A78', body: '#2E5384', bodyShade: '#223F67',
    solid: '#E8D9B5', solidShade: '#C9B48A', glow: '#FFD58A', line: '#4A78B0', shadow: '#0E1D33' },
  teal: { sky: ['#0D4352', '#16687A'], wall: '#11505F', floor: '#0B4352', body: '#1C6B7C', bodyShade: '#145463',
    solid: '#F2E6CC', solidShade: '#D8C49C', glow: '#FFE3A3', line: '#3C9AAD', shadow: '#07303B' },
}

// # Perceived brightness of a #RRGGBB colour, 0–100 (Rec. 709 weights)
export const luma = (hex: string): number => {
  const n = parseInt(hex.slice(1), 16)
  return ((0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255) * 100
}
