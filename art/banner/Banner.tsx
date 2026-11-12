// ============================================================
// CHANNEL BANNER — YouTube channel art, 2560 × 1440.
// Owner 2026-11-10: the drawn cartoon version "looks like a cartoon
// channel" → premium finance look: deep navy, the champagne-metal
// emblem, serif wordmark, one fine gold market line. No characters.
// YouTube crops it per device:
//   TV       → the whole 2560 × 1440
//   desktop  → a full-width strip, y 508–932 (2560 × 423)
//   phone    → only the centre, x 507–2053, y 508–932 (1546 × 423) = the SAFE box
// ============================================================
import React from 'react'
import { AbsoluteFill } from 'remotion'
import { COLORS, fontFaces } from '../tokens'
import { Emblem } from '../logo/Emblem'

export const BANNER = { w: 2560, h: 1440 }
export const SAFE = { x: 507, y: 508, w: 1546, h: 423 } // # visible on every device

const NAVY0 = '#04070D', NAVY1 = '#0B1626', NAVY2 = '#12233B'
const GOLD = '#D9B877', GOLD_L = '#F3E2B8'

// # a deterministic wandering-but-rising line (decoration only, not real data)
const seeded = (i: number) => { const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return x - Math.floor(x) }
const MARKET: [number, number][] = Array.from({ length: 65 }, (_, i) => {
  const x = -40 + i * 42
  const trend = 905 - (i / 64) * 360 // # climbs from lower-left to upper-right
  const wave = Math.sin(i / 4.2) * 38 + Math.sin(i / 1.7) * 14
  return [x, trend + wave + (seeded(i) - 0.5) * 40]
})
const path = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')

// # faint candlesticks under the line, only outside the phone box so the centre stays calm
const Candles: React.FC = () => <g>{MARKET.map(([x, y], i) => {
  if ((x > 440 && x < 2120) || i % 2) return null
  const up = seeded(i + 99) > 0.38, body = 18 + seeded(i + 7) * 46, wick = body + 24 + seeded(i + 3) * 30
  const col = up ? GOLD : '#5B6C84'
  return <g key={i} opacity={0.45}>
    <rect x={x - 1.5} y={y - wick / 2 + 60} width={3} height={wick} fill={col} />
    <rect x={x - 9} y={y - body / 2 + 60} width={18} height={body} rx={2} fill={col} />
  </g>
})}</g>

export const Banner: React.FC<{ guides?: boolean }> = ({ guides = false }) => {
  const { w, h } = BANNER
  const tx = 880, tw = 1020, tc = tx + tw / 2 // # wordmark left, width, centre
  return (
    <AbsoluteFill style={{ background: NAVY0 }}>
      <style>{fontFaces()}</style>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <radialGradient id="bn-bg" cx="0.5" cy="0.5" r="0.75">
            <stop offset="0" stopColor={NAVY2} /><stop offset="0.55" stopColor={NAVY1} /><stop offset="1" stopColor={NAVY0} />
          </radialGradient>
          <linearGradient id="bn-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={GOLD} stopOpacity={0.1} /><stop offset="0.25" stopColor={GOLD} stopOpacity={0.6} />
            <stop offset="0.8" stopColor={GOLD_L} stopOpacity={0.9} /><stop offset="1" stopColor={GOLD_L} stopOpacity={1} />
          </linearGradient>
          <linearGradient id="bn-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={GOLD} stopOpacity={0.1} /><stop offset="1" stopColor={GOLD} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="bn-word" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={COLORS.champagneLight} /><stop offset="0.55" stopColor={COLORS.champagne} /><stop offset="1" stopColor={COLORS.champagneDark} />
          </linearGradient>
          <linearGradient id="bn-rule" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={GOLD} stopOpacity={0} /><stop offset="0.5" stopColor={GOLD} stopOpacity={0.9} /><stop offset="1" stopColor={GOLD} stopOpacity={0} />
          </linearGradient>
          {/* # dark pool behind the name so the line never fights the text */}
          <radialGradient id="bn-pool" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={NAVY0} stopOpacity={0.6} /><stop offset="0.6" stopColor={NAVY0} stopOpacity={0.3} /><stop offset="1" stopColor={NAVY0} stopOpacity={0} />
          </radialGradient>
          <filter id="bn-glow" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="10" /></filter>
          <filter id="bn-grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={5} /><feColorMatrix values="0 0 0 0 0.6  0 0 0 0 0.6  0 0 0 0 0.6  0 0 0 0.045 0" /></filter>
          <pattern id="bn-grid" width={80} height={80} patternUnits="userSpaceOnUse"><path d="M80 0 L0 0 0 80" fill="none" stroke="#6F86A8" strokeWidth={1} /></pattern>
          <radialGradient id="bn-gridfade" cx="0.5" cy="0.5" r="0.6"><stop offset="0" stopColor="#fff" stopOpacity={0.15} /><stop offset="1" stopColor="#fff" stopOpacity={0.9} /></radialGradient>
          <radialGradient id="bn-linefade" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#fff" stopOpacity={0.08} /><stop offset="0.75" stopColor="#fff" stopOpacity={0.35} /><stop offset="1" stopColor="#fff" stopOpacity={1} /></radialGradient>
          <mask id="bn-linemask"><rect width={w} height={h} fill="#fff" /><ellipse cx={1280} cy={745} rx={760} ry={210} fill="#000" /><ellipse cx={1280} cy={745} rx={900} ry={260} fill="url(#bn-linefade)" /></mask>
          <mask id="bn-gridmask"><rect width={w} height={h} fill="url(#bn-gridfade)" /></mask>
        </defs>

        {/* ---------- background: navy vignette + a fine grid fading in toward the edges ---------- */}
        <rect width={w} height={h} fill="url(#bn-bg)" />
        <rect width={w} height={h} fill="url(#bn-grid)" opacity={0.13} mask="url(#bn-gridmask)" />

        {/* ---------- the market: candles at the ends, one gold line across, soft area under it ---------- */}
                <path d={`${path(MARKET)} L${w + 40} ${h} L-40 ${h} Z`} fill="url(#bn-area)" />
        <g mask="url(#bn-linemask)">
        <Candles />
        <path d={path(MARKET)} fill="none" stroke={GOLD} strokeWidth={10} opacity={0.3} filter="url(#bn-glow)" />
        <path d={path(MARKET)} fill="none" stroke="url(#bn-line)" strokeWidth={3.5} strokeLinejoin="round" />
        {(() => { const [x, y] = MARKET[59]; return <g><circle cx={x} cy={y} r={24} fill={GOLD_L} opacity={0.14} /><circle cx={x} cy={y} r={8} fill={GOLD_L} /></g> })()}
        </g>

        {/* ---------- centre: emblem + serif wordmark + tagline (all inside the phone box) ---------- */}
        <ellipse cx={1280} cy={730} rx={860} ry={240} fill="url(#bn-pool)" />
        <g transform="translate(650 596)"><Emblem size={190} /></g>
        <text x={tx} y={742} fill="url(#bn-word)" style={{ font: '400 160px Georgia, "Times New Roman", serif', letterSpacing: 2 }} textLength={tw} lengthAdjust="spacingAndGlyphs">CapitalCode</text>
        <rect x={tx} y={782} width={tw} height={2} fill="url(#bn-rule)" />
        <text x={tc} y={842} textAnchor="middle" fill={COLORS.champagne} style={{ font: '500 38px Inter', letterSpacing: 16 }}>MONEY  ·  MARKETS  ·  BUSINESS</text>
        <text x={tc} y={894} textAnchor="middle" fill={GOLD} opacity={0.9} style={{ font: 'italic 400 36px Georgia, serif', letterSpacing: 2 }}>explained simply</text>

        <rect width={w} height={h} filter="url(#bn-grain)" />

        {guides && <g fill="none" strokeWidth={4} strokeDasharray="18 12">
          <rect x={0} y={SAFE.y} width={w} height={SAFE.h} stroke="#1E6FA8" />
          <rect x={SAFE.x} y={SAFE.y} width={SAFE.w} height={SAFE.h} stroke="#F0454B" />
        </g>}
      </svg>
    </AbsoluteFill>
  )
}
