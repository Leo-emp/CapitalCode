// ============================================================
// LONG VIDEO — "You're Already Paying for AI, Even If You Never Use It" —
// objects for this story: the subscription box (a big app case with
// four app tiles: W, X, P, O), the price tag that hangs from it, the
// AI assistant (a glowing round spark that can fly, sit in the box and
// talk in answer bubbles), the regulator's building with scales, the
// map of Australia, the renewal email with its two buttons and the
// hidden third door, and the data center with chips and power.
// One file per scene. No camera moves (owner r56).
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

// # the four app colours (our own flat tones, no logos)
export const APP = { w: '#3A7BD5', x: '#2FA86B', p: '#E0703A', o: '#2E9BD8' }

// ------------------------------------------------------------ one app tile: a rounded square with a big letter
export const Tile: React.FC<{ x: number; y: number; letter: string; color: string; s?: number; o?: number; lit?: number }> = ({ x, y, letter, color, s = 1, o = 1, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.08 * lit)})`} opacity={o}>
    {lit > 0 && <rect x={-66} y={-66} width={132} height={132} rx={34} fill={P.gold} opacity={0.35 * lit} />}
    <rect x={-52} y={-52} width={104} height={104} rx={26} fill={color} />
    <rect x={-52} y={-52} width={104} height={44} rx={22} fill="#FFFFFF" opacity={0.14} />
    <text x={0} y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"' }}>{letter}</text>
  </g>
)

// ------------------------------------------------------------ the subscription box: a big app case with a title band and four tiles
// # tiles 0–1 shows the tiles one by one (w, x, p, o); lit lights one tile (index) — spark 0–1 puts the AI spark in its corner seat
export const SubBox: React.FC<{ x: number; y: number; s?: number; o?: number; title?: string; tiles?: number; lit?: number[]; seat?: number; color?: string; letters?: string; tileColors?: string[] }> = ({ x, y, s = 1, o = 1, title = 'MICROSOFT 365', tiles = 1, lit = [0, 0, 0, 0], seat = 0, color = P.navy3, letters = 'WXPO', tileColors = [APP.w, APP.x, APP.p, APP.o] }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={250} rx={300} ry={26} fill={P.shadow} opacity={0.16} />
    <rect x={-270} y={-230} width={540} height={470} rx={40} fill="#000" opacity={0.1} transform="translate(10 14)" />
    <rect x={-270} y={-230} width={540} height={470} rx={40} fill="#FFFFFF" stroke="#D8CDB8" strokeWidth={4} />
    <rect x={-270} y={-230} width={540} height={96} rx={40} fill={color} />
    <rect x={-270} y={-170} width={540} height={36} fill={color} />
    <text x={0} y={-162} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>{title}</text>
    {/* # the four apps */}
    {([[-95, -10], [95, -10], [-95, 140], [95, 140]] as [number, number][]).map(([tx, ty], k) => { const l = letters[k], c = tileColors[k]
      const t = clamp01(tiles * 4 - k)
      return t > 0 ? <Tile key={k} x={tx} y={ty} letter={l} color={c} s={0.6 + 0.4 * t} o={t} lit={lit[k] ?? 0} /> : null
    })}
    {/* # the seat the AI lands in: a soft round dent at the top-right of the band */}
    {seat > 0 && <circle cx={230} cy={-200} r={70} fill={P.gold} opacity={0.25 * seat} />}
  </g>
)

// ------------------------------------------------------------ the price tag hanging on a string; value text, accent colour, a sticker
export const Tag: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; r?: number; color?: string; sticker?: string; stickerO?: number; sub?: string }> = ({ x, y, text, s = 1, o = 1, r = -6, color = P.gold, sticker, stickerO = 0, sub = 'A YEAR' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M0 -110 L0 -60" stroke="#8E7A58" strokeWidth={4} />
    <rect x={-150} y={-62} width={300} height={150} rx={18} fill={color} />
    <circle cx={0} cy={-36} r={10} fill="#FFFFFF" />
    <text x={0} y={46} textAnchor="middle" fill={P.navy0} style={{ font: '400 78px "Bebas Neue"' }}>{text}</text>
    <text x={0} y={80} textAnchor="middle" fill={P.navy0} opacity={0.75} style={{ font: '400 28px "Bebas Neue"', letterSpacing: 3 }}>{sub}</text>
    {sticker && stickerO > 0 && <g opacity={stickerO} transform={`translate(150 -60) rotate(14) scale(${0.6 + 0.4 * stickerO})`}>
      <circle r={66} fill={P.coral} /><circle r={56} fill="none" stroke="#FFFFFF" strokeWidth={3} opacity={0.6} />
      <text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{sticker}</text></g>}
  </g>
)

// ------------------------------------------------------------ the AI assistant: a glowing round spark with a four-point star and two soft eyes
// # glow 0–1 pulses; talk 0–1 squashes it a little as if speaking; spin turns the star
export const Spark: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; glow?: number; eyes?: boolean }> = ({ x, y, s = 1, o = 1, f = 0, glow = 0.6, eyes = true }) => {
  const pulse = 1 + 0.04 * Math.sin(f / 7)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <defs><radialGradient id="ab-spark" cx="35%" cy="30%" r="80%"><stop offset="0" stopColor="#9FF0E6" /><stop offset="0.55" stopColor="#5B8DEF" /><stop offset="1" stopColor="#8A5BD6" /></radialGradient></defs>
      <circle r={86 * pulse} fill="#8A5BD6" opacity={0.18 * glow} />
      <circle r={66 * pulse} fill="#5B8DEF" opacity={0.22 * glow} />
      <circle r={52} fill="url(#ab-spark)" />
      <path d="M0 -34 Q6 -6 34 0 Q6 6 0 34 Q-6 6 -34 0 Q-6 -6 0 -34 Z" fill="#FFFFFF" opacity={0.95} transform={`rotate(${(f * 0.6) % 360})`} />
      {eyes && <g><ellipse cx={-17} cy={22} rx={5} ry={7} fill={P.navy0} opacity={0.75} /><ellipse cx={17} cy={22} rx={5} ry={7} fill={P.navy0} opacity={0.75} /></g>}
    </g>
  )
}

// ------------------------------------------------------------ an answer bubble the spark talks in (lines = drawn text lines, never words)
export const Bubble: React.FC<{ x: number; y: number; s?: number; o?: number; lines?: number; w?: number }> = ({ x, y, s = 1, o = 1, lines = 3, w = 300 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2} y={-70} width={w} height={140} rx={30} fill="#FFFFFF" stroke="#D8CDB8" strokeWidth={4} />
    <path d={`M${-w / 2 + 40} 66 L${-w / 2 + 20} 110 L${-w / 2 + 80} 66 Z`} fill="#FFFFFF" stroke="#D8CDB8" strokeWidth={4} />
    <rect x={-w / 2 + 30} y={60} width={70} height={10} fill="#FFFFFF" />
    {Array.from({ length: lines }, (_, k) => <rect key={k} x={-w / 2 + 34} y={-40 + k * 30} width={(w - 68) * clamp01(lines - k) * (k === lines - 1 ? 0.6 : 1)} height={14} rx={7} fill="#B9C6DA" />)}
  </g>
)

// ------------------------------------------------------------ a coin (an answer's cost, a payment)
export const Coin: React.FC<{ x: number; y: number; r?: number; o?: number; t?: string; color?: string }> = ({ x, y, r = 34, o = 1, t = '$', color = P.gold }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle cy={r * 0.16} r={r} fill={P.goldD} /><circle r={r} fill={color} /><circle r={r * 0.72} fill="none" stroke={P.goldD} strokeWidth={Math.max(2, r * 0.1)} />
    {t && <text y={r * 0.36} textAnchor="middle" fill={P.goldD} style={{ font: `400 ${Math.round(r * 1.05)}px "Bebas Neue"` }}>{t}</text>}
  </g>
)

// ------------------------------------------------------------ the regulator: a columned court building with a pair of scales on top
export const Regulator: React.FC<{ x: number; y: number; s?: number; o?: number; tilt?: number; sign?: string }> = ({ x, y, s = 1, o = 1, tilt = 0, sign = 'ACCC' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={250} ry={18} fill={P.shadow} opacity={0.16} />
    <rect x={-230} y={-36} width={460} height={36} rx={4} fill="#D9DFE8" />
    {[-170, -85, 0, 85, 170].map((cx) => <rect key={cx} x={cx - 20} y={-250} width={40} height={214} rx={6} fill="#F2F5FA" stroke="#C9D3E1" strokeWidth={3} />)}
    <rect x={-240} y={-290} width={480} height={40} rx={4} fill="#E9EEF5" />
    <path d="M-250 -290 L0 -380 L250 -290 Z" fill="#E9EEF5" stroke="#C9D3E1" strokeWidth={4} />
    <text x={0} y={-302} textAnchor="middle" fill={P.navy2} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 6 }}>{sign}</text>
    {/* # the scales above the roof */}
    <g transform="translate(0 -440)">
      <rect x={-5} y={-10} width={10} height={70} fill={P.goldD} />
      <g transform={`rotate(${tilt * 12})`}>
        <rect x={-110} y={-14} width={220} height={8} rx={4} fill={P.goldD} />
        <path d="M-100 -10 L-130 40 L-70 40 Z M100 -10 L70 40 L130 40 Z" fill="none" stroke={P.goldD} strokeWidth={3} />
        <ellipse cx={-100} cy={42} rx={36} ry={8} fill={P.gold} /><ellipse cx={100} cy={42} rx={36} ry={8} fill={P.gold} />
      </g>
    </g>
  </g>
)

// ------------------------------------------------------------ Australia: a simple flat map shape (Tasmania below), soft sand colour
export const AUS_PATH = 'M-250 -40 Q-245 -110 -170 -140 Q-120 -150 -90 -190 Q-50 -215 -20 -175 Q10 -215 40 -230 Q70 -190 90 -150 Q120 -180 140 -230 Q170 -170 200 -120 Q250 -80 270 -10 Q280 60 230 120 Q190 170 120 180 Q70 150 30 150 Q-10 120 -60 140 Q-130 160 -190 130 Q-260 90 -250 -40 Z'
export const Australia: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: string }> = ({ x, y, s = 1, o = 1, fill = '#E7C78F' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={AUS_PATH} fill="#000" opacity={0.08} transform="translate(8 10)" />
    <path d={AUS_PATH} fill={fill} stroke="#C9A060" strokeWidth={5} />
    <path d="M150 215 Q175 205 190 225 Q180 250 158 245 Z" fill={fill} stroke="#C9A060" strokeWidth={4} />
  </g>
)

// ------------------------------------------------------------ the renewal email: an envelope card with two big buttons; the third (hidden) door behind
// # pressCancel 0–1 pushes the CANCEL button; door 0–1 slides the hidden CLASSIC door out from behind the card
export const Email: React.FC<{ x: number; y: number; s?: number; o?: number; pay?: number; cancel?: number; pressCancel?: number; door?: number; doorHint?: number }> = ({ x, y, s = 1, o = 1, pay = 1, cancel = 1, pressCancel = 0, door = 0, doorHint = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {/* # the hidden third door: behind the card, slides out to the right */}
    {(door > 0 || doorHint > 0) && <g transform={`translate(${lerp(120, 470, door)} 10)`} opacity={Math.max(door, 0.35 * doorHint)}>
      <rect x={-120} y={-200} width={240} height={400} rx={18} fill={P.mint} stroke="#2E9E6E" strokeWidth={5} />
      <rect x={-96} y={-176} width={192} height={352} rx={12} fill="#7FE8B8" />
      <circle cx={70} cy={10} r={12} fill="#2E9E6E" />
      <text x={0} y={-60} textAnchor="middle" fill={P.navy0} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>CLASSIC</text>
      <text x={0} y={0} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>OLD PRICE</text>
      <text x={0} y={46} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>NO AI</text>
    </g>}
    <rect x={-300} y={-220} width={600} height={440} rx={26} fill="#000" opacity={0.1} transform="translate(10 12)" />
    <rect x={-300} y={-220} width={600} height={440} rx={26} fill="#FFFFFF" stroke="#D8CDB8" strokeWidth={4} />
    {/* # envelope flap at the top */}
    <path d="M-300 -194 L0 -60 L300 -194" fill="none" stroke="#D8CDB8" strokeWidth={5} />
    <path d="M-274 -220 L274 -220 L0 -92 Z" fill="#F4EEE2" />
    {/* # the two buttons */}
    <g opacity={pay}><rect x={-250} y={20} width={230} height={110} rx={22} fill={P.gold} /><text x={-135} y={66} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>PAY MORE</text><text x={-135} y={110} textAnchor="middle" fill={P.navy0} style={{ font: '400 34px "Bebas Neue"' }}>+ AI</text></g>
    <g opacity={cancel} transform={`translate(${135} ${75 + 8 * pressCancel}) scale(${1 - 0.06 * pressCancel})`}><rect x={-115} y={-55} width={230} height={110} rx={22} fill={P.coral} /><rect x={-115} y={-55} width={230} height={110} rx={22} fill="#000" opacity={0.15 * pressCancel} /><text x={0} y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 48px "Bebas Neue"' }}>CANCEL</text></g>
  </g>
)

// ------------------------------------------------------------ a soft cross for "not …" (owner r68)
export const XMark: React.FC<{ x: number; y: number; o: number; size?: number }> = ({ x, y, o, size = 56 }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * o})`}>
    <path d={`M${-size} ${-size} L${size} ${size} M${size} ${-size} L${-size} ${size}`} stroke="#FFFFFF" strokeWidth={size * 0.36} strokeLinecap="round" opacity={0.9} />
    <path d={`M${-size} ${-size} L${size} ${size} M${size} ${-size} L${-size} ${size}`} stroke={P.coral} strokeWidth={size * 0.24} strokeLinecap="round" />
  </g>
)

// ------------------------------------------------------------ a spotlight on the thing being named: snaps on, fades over ~1 s (never a zoom)
export const Spot: React.FC<{ f: number; at: number; x: number; y: number; rx?: number; ry?: number; dark?: boolean }> = ({ f, at, x, y, rx = 220, ry = 160, dark = false }) => {
  const t = f - at
  if (t < 0 || t > 32) return null
  const o = t < 3 ? t / 3 : 1 - (t - 3) / 29
  // # dark scenes: a radial glow that fades to nothing at its edge, so it never draws a hard disc over neighbours
  if (dark) return <g><defs><radialGradient id={`spotg-${at}`}><stop offset="0%" stopColor="#BFD3FF" stopOpacity={0.22 * o} /><stop offset="100%" stopColor="#BFD3FF" stopOpacity={0} /></radialGradient></defs><ellipse cx={x} cy={y} rx={Math.min(rx, 260)} ry={Math.min(ry, 230)} fill={`url(#spotg-${at})`} /></g>
  return <ellipse cx={x} cy={y} rx={Math.min(rx, 260)} ry={Math.min(ry, 230)} fill={P.gold} opacity={0.2 * o} />
}
