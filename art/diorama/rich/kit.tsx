// # Fresh drawings for "10 Fastest Ways to Get Rich (Legally)" (owner rules r82/r83: this video's own world).
// # The world: a RETRO TRAVEL POSTER journey. Big gradient skies, a sun with slow rays, three layered mountain
// # ridges with soft light-to-shadow gradients, a fine halftone grain, bold flat shapes with long soft shadows.
// # Each level of the video is a new leg of the trip, a new time of day and a faster vehicle:
// #   level 1 KEEP MORE  — dawn, desert trail, Leo on foot with a backpack
// #   level 2 EARN MORE  — bright noon, a city road, Leo on a bicycle
// #   level 3 OWN MORE   — golden afternoon valley, a steam-free poster train
// #   level 4 BET BIG    — night launch field, rockets
// # Every prop is drawn around its own origin (bottom centre for things that stand, centre for flat things).
import React from 'react'

export const TXT = (size: number): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 2 })

export const CREAM = '#FFF4E0', SAND = '#F3D9A4', ORANGE = '#E2703A', RUST = '#B8522A', GOLD = '#F2B544', GOLD2 = '#C98A1E'
export const TEAL = '#1F6F78', DEEP = '#173F4F', PLUM = '#5B3A57', ROSE = '#E88F7A', MINT = '#4FB38A', RED = '#D94B3D'
export const INK = '#1D2633', SKYB = '#7EC4CF', SHADE = 'rgba(30,20,30,0.22)'

export type Tone = 'dawn' | 'noon' | 'golden' | 'night' | 'sunset'
const SKIES: Record<Tone, [string, string, string]> = {
  dawn: ['#F6C7A0', '#FBE3C0', '#FFF4E0'],
  noon: ['#6FB9C9', '#A9D9DD', '#F3EBD2'],
  golden: ['#E9935F', '#F5C07A', '#FBE6B8'],
  night: ['#141B33', '#2C2F5A', '#5B3A57'],
  sunset: ['#C2577A', '#EE8A5E', '#F9C77E'],
}
const RIDGES: Record<Tone, [string, string, string]> = {
  dawn: ['#D99A7E', '#B6745F', '#8A5249'],
  noon: ['#5E9E8E', '#3F7F73', '#2C5E57'],
  golden: ['#C77B4F', '#9D5A3D', '#6E3D2E'],
  night: ['#3A3566', '#2A2850', '#1B1B38'],
  sunset: ['#9C4A66', '#76374F', '#4F2539'],
}
export const ridge = (t: Tone) => RIDGES[t]

const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

// ================================================================== WORLD
// # the poster sky: gradient, sun with slowly turning rays (or a moon and stars at night), drifting long clouds,
// # three mountain ridges with vertical light gradients, and halftone grain over everything
export const PosterWorld: React.FC<{ f: number; id: string; tone?: Tone; sunX?: number; sunY?: number; ground?: string }> = ({ f, id, tone = 'dawn', sunX = 1500, sunY = 420, ground }) => {
  const [s0, s1, s2] = SKIES[tone], [r0, r1, r2] = RIDGES[tone], night = tone === 'night'
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={s0} /><stop offset="60%" stopColor={s1} /><stop offset="100%" stopColor={s2} /></linearGradient>
        {[r0, r1, r2].map((c, k) => <linearGradient key={k} id={`${id}-r${k}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c} /><stop offset="100%" stopColor={RIDGES[tone][Math.min(2, k + 1)]} /></linearGradient>)}
        <pattern id={`${id}-grain`} width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="0.9" fill="#000" opacity="0.07" /><circle cx="4.5" cy="4.5" r="0.7" fill="#FFF" opacity="0.08" /></pattern>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={night ? '#FFF6D8' : '#FFF3C4'} /><stop offset="70%" stopColor={night ? '#F1E3B0' : '#FFD27A'} /><stop offset="100%" stopColor={night ? '#E9D9A0' : '#F7B65A'} /></radialGradient>
      </defs>
      <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-sky)`} />
      {night && Array.from({ length: 70 }, (_, i) => <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 99) * 560} r={1 + rnd(i + 7) * 2.2} fill="#FFF7DD" opacity={0.35 + 0.5 * Math.abs(Math.sin(f / 30 + i))} />)}
      {/* sun (or moon) with long poster rays */}
      <g transform={`translate(${sunX} ${sunY})`}>
        {!night && <g transform={`rotate(${f * 0.05})`} opacity={0.18}>{Array.from({ length: 16 }, (_, k) => <path key={k} d="M0 0 L-60 -900 L60 -900 Z" fill="#FFFFFF" transform={`rotate(${k * 22.5})`} />)}</g>}
        <circle r={night ? 90 : 150} fill={`url(#${id}-sun)`} />
        {night && <circle cx={34} cy={-20} r={80} fill={s0} opacity={0.9} />}
      </g>
      {/* long poster clouds */}
      {[0, 1, 2].map((k) => { const x = ((200 + k * 700 + f * (0.3 + 0.12 * k)) % 2400) - 300, y = 230 + k * 90; return <g key={k} opacity={night ? 0.18 : 0.75}>
        <rect x={x} y={y} width={300 + 80 * k} height={26} rx={13} fill="#FFFFFF" /><rect x={x + 60} y={y - 22} width={160} height={26} rx={13} fill="#FFFFFF" />
      </g> })}
      {/* three ridges */}
      <path d="M-40 720 L180 560 L330 640 L560 470 L760 610 L940 520 L1180 650 L1400 500 L1620 620 L1800 540 L1980 600 L1980 1120 L-40 1120 Z" fill={`url(#${id}-r0)`} />
      <path d="M560 470 L600 500 L585 520 L640 540 L700 570 L760 610 L700 600 L640 560 Z M1400 500 L1450 540 L1430 560 L1500 580 L1620 620 L1520 600 Z" fill="#FFFFFF" opacity={night ? 0.06 : 0.22} />
      <path d="M-40 800 Q240 700 520 760 T1080 740 T1600 720 T1980 760 L1980 1120 L-40 1120 Z" fill={`url(#${id}-r1)`} />
      <path d="M-40 880 Q380 820 760 860 T1500 840 T1980 860 L1980 1120 L-40 1120 Z" fill={ground ?? `url(#${id}-r2)`} />
      <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-grain)`} />
    </g>
  )
}

// # a calm poster vignette and frame edge
export const Vig: React.FC<{ id: string; k?: number }> = ({ id, k = 0.3 }) => (
  <g pointerEvents="none">
    <defs><radialGradient id={`${id}-vig`} cx="0.5" cy="0.5" r="0.75"><stop offset="62%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#1A1020" stopOpacity={k} /></radialGradient></defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-vig)`} />
  </g>
)

// # a soft long shadow on the ground under a standing thing
export const Ground: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 1 }) => <ellipse cx={x + w * 0.08} cy={y + 4} rx={w / 2} ry={w * 0.06} fill={SHADE} opacity={o} />

// ================================================================== LABELS
// # a poster ticket label: rounded band, bold Bebas text (never covers art: callers give it its own space)
export const Ticket: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; col?: string; tc?: string }> = ({ x, y, t, o = 1, size = 44, col = CREAM, tc = INK }) => {
  const w = Math.max(120, t.length * size * 0.46 + 56)
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2 + 6} y={-size - 14} width={w} height={size + 30} rx={(size + 30) / 2} fill={SHADE} />
    <rect x={-w / 2} y={-size - 20} width={w} height={size + 30} rx={(size + 30) / 2} fill={col} />
    <text y={-2} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}

// # a big round number badge (WAY 1 … WAY 10)
export const WayBadge: React.FC<{ x: number; y: number; n: number; o?: number; s?: number; col?: string }> = ({ x, y, n, o = 1, s = 1, col = ORANGE }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={78} fill={SHADE} transform="translate(6 8)" />
    <circle r={78} fill={col} /><circle r={66} fill="none" stroke={CREAM} strokeWidth={4} strokeDasharray="6 8" />
    <text y={-20} textAnchor="middle" fill={CREAM} style={TXT(30)}>WAY</text>
    <text y={44} textAnchor="middle" fill={CREAM} style={TXT(74)}>{n}</text>
  </g>
)

// # a red cross drawn over something said with "not"/"no" (r68)
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-80 -80 L80 80 M80 -80 L-80 80" stroke={CREAM} strokeWidth={32} strokeLinecap="round" />
    <path d="M-80 -80 L80 80 M80 -80 L-80 80" stroke={RED} strokeWidth={20} strokeLinecap="round" />
  </g>
)

// ================================================================== MONEY
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; r?: number }> = ({ x, y, s = 1, o = 1, t = '$', r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <circle r={30} fill={GOLD2} transform="translate(3 4)" />
    <circle r={30} fill={GOLD} /><circle r={23} fill="none" stroke="#FFE3A0" strokeWidth={3} />
    <path d="M-18 -14 A24 24 0 0 1 10 -22" stroke="#FFF6D6" strokeWidth={5} fill="none" strokeLinecap="round" />
    <text y={11} textAnchor="middle" fill={GOLD2} style={TXT(32)}>{t}</text>
  </g>
)
// # a tower of coins standing on y (n coins tall, each 14 px)
export const Tower: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; col?: string; edge?: string }> = ({ x, y, n, s = 1, o = 1, col = GOLD, edge = GOLD2 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={8} cy={4} rx={44} ry={9} fill={SHADE} />
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => <g key={i} transform={`translate(0 ${-i * 14})`}>
      <ellipse cx={0} cy={0} rx={38} ry={10} fill={edge} /><rect x={-38} y={-10} width={76} height={10} fill={edge} /><ellipse cx={0} cy={-10} rx={38} ry={10} fill={col} />
    </g>)}
  </g>
)

// # a credit card (flat, centre origin)
export const Card: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; t?: string }> = ({ x, y, s = 1, r = 0, o = 1, t }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-92} width={300} height={184} rx={20} fill={SHADE} transform="translate(8 10)" />
    <rect x={-150} y={-92} width={300} height={184} rx={20} fill={PLUM} />
    <rect x={-150} y={-60} width={300} height={36} fill="#3A2238" />
    <rect x={-120} y={-6} width={56} height={40} rx={6} fill={GOLD} />
    <path d="M60 30 a26 26 0 1 0 0.1 0 Z" fill={ORANGE} opacity={0.9} /><circle cx={96} cy={56} r={26} fill={GOLD} opacity={0.85} />
    {t && <text x={-120} y={80} fill={CREAM} style={TXT(30)}>{t}</text>}
  </g>
)

// ================================================================== LEO'S THINGS
// # a hiking backpack (bottom centre). `leak` 0..1 shows a torn corner; `patch` 0..1 sews a patch over it
export const Pack: React.FC<{ x: number; y: number; s?: number; o?: number; leak?: number; patch?: number }> = ({ x, y, s = 1, o = 1, leak = 0, patch = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Ground x={0} y={0} w={240} />
    <path d="M-100 0 L-110 -200 Q-110 -270 -40 -280 L40 -280 Q110 -270 110 -200 L100 0 Z" fill={TEAL} />
    <path d="M-100 0 L-110 -200 Q-110 -270 -40 -280 L-10 -280 L-30 0 Z" fill="#FFFFFF" opacity={0.08} />
    <path d="M-80 -270 Q0 -330 80 -270" stroke={DEEP} strokeWidth={16} fill="none" />
    <rect x={-70} y={-150} width={140} height={110} rx={18} fill={DEEP} /><rect x={-70} y={-150} width={140} height={26} rx={10} fill={ORANGE} />
    <rect x={-10} y={-138} width={20} height={10} rx={3} fill={GOLD} />
    <path d="M-110 -120 L-130 -110 L-126 -40 L-104 -50 Z" fill={DEEP} />
    {leak > 0 && <g opacity={leak}><path d="M58 -24 L80 -40 L96 -10 L76 4 Z" fill="#0F2C38" /><path d="M58 -24 L66 -30 L70 -14 Z" fill={CREAM} opacity={0.5} /></g>}
    {patch > 0 && <g opacity={patch} transform={`translate(78 -18) scale(${0.6 + 0.4 * patch})`}>
      <rect x={-34} y={-30} width={68} height={60} rx={8} fill={ORANGE} />
      <rect x={-28} y={-24} width={56} height={48} rx={6} fill="none" stroke={CREAM} strokeWidth={4} strokeDasharray="7 6" />
    </g>}
  </g>
)

// # a bicycle (bottom centre at the wheels' ground line); `spin` turns the spokes
export const Bike: React.FC<{ x: number; y: number; s?: number; o?: number; spin?: number; col?: string }> = ({ x, y, s = 1, o = 1, spin = 0, col = ORANGE }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Ground x={0} y={0} w={360} />
    {[-120, 120].map((cx) => <g key={cx} transform={`translate(${cx} -80)`}>
      <circle r={80} fill="none" stroke={INK} strokeWidth={12} /><circle r={70} fill="none" stroke="#5A6270" strokeWidth={3} />
      <g transform={`rotate(${spin})`}>{[0, 45, 90, 135].map((a) => <line key={a} x1={-68} y1={0} x2={68} y2={0} stroke="#9AA2AE" strokeWidth={3} transform={`rotate(${a})`} />)}</g>
      <circle r={9} fill={INK} />
    </g>)}
    <path d="M-120 -80 L-20 -80 L60 -200 L-50 -200 Z M-20 -80 L-62 -220 M60 -200 L120 -80 M60 -200 L70 -250" stroke={col} strokeWidth={14} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <rect x={-92} y={-236} width={64} height={18} rx={9} fill={INK} />
    <path d="M50 -252 L100 -262" stroke={INK} strokeWidth={12} strokeLinecap="round" />
  </g>
)

// # the poster train: engine + n cars (bottom left at the rails); `lit` windows
export const Train: React.FC<{ x: number; y: number; s?: number; o?: number; cars?: number; label?: string }> = ({ x, y, s = 1, o = 1, cars = 2, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-40} y={-8} width={260 + cars * 250} height={10} fill={INK} />
    {/* engine */}
    <g>
      <path d="M0 -40 L0 -200 L130 -200 L130 -150 L240 -150 Q262 -150 262 -120 L262 -40 Z" fill={RED} />
      <rect x={10} y={-190} width={110} height={70} rx={10} fill="#FFE6B8" /><rect x={-6} y={-214} width={146} height={22} rx={8} fill={DEEP} />
      <rect x={170} y={-196} width={34} height={50} fill={DEEP} /><rect x={150} y={-130} width={100} height={18} fill={GOLD} />
      {label && <text x={70} y={-140} textAnchor="middle" fill={CREAM} style={TXT(32)}>{label}</text>}
      {[50, 130, 210].map((cx) => <g key={cx}><circle cx={cx} cy={-30} r={30} fill={INK} /><circle cx={cx} cy={-30} r={12} fill={GOLD} /></g>)}
    </g>
    {Array.from({ length: cars }, (_, k) => <g key={k} transform={`translate(${280 + k * 250} 0)`}>
      <rect x={0} y={-170} width={230} height={130} rx={14} fill={k % 2 ? TEAL : ORANGE} />
      <rect x={0} y={-170} width={230} height={22} rx={10} fill={DEEP} />
      {[20, 90, 160].map((wx) => <rect key={wx} x={wx} y={-136} width={50} height={46} rx={8} fill="#FFE6B8" />)}
      {[50, 180].map((cx) => <circle key={cx} cx={cx} cy={-30} r={24} fill={INK} />)}
      <rect x={-20} y={-70} width={20} height={10} fill={INK} />
    </g>)}
  </g>
)

// # a poster rocket (bottom centre at its nozzle); `flame` 0..1
export const Rocket: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; flame?: number; col?: string; f?: number }> = ({ x, y, s = 1, o = 1, r = 0, flame = 0, col = RED, f = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {flame > 0 && <g opacity={flame}><path d={`M-26 0 Q0 ${110 + 20 * Math.sin(f)} 26 0 Z`} fill={ORANGE} /><path d={`M-14 0 Q0 ${70 + 14 * Math.sin(f * 1.3)} 14 0 Z`} fill={GOLD} /></g>}
    <path d="M-40 -40 L-80 0 L-40 0 Z M40 -40 L80 0 L40 0 Z" fill={DEEP} />
    <path d="M-40 0 L-40 -200 Q0 -300 40 -200 L40 0 Z" fill={CREAM} />
    <path d="M-40 -200 Q0 -300 40 -200 Z" fill={col} /><rect x={-40} y={-30} width={80} height={30} fill={col} />
    <circle cy={-140} r={20} fill={SKYB} stroke={DEEP} strokeWidth={6} />
    <path d="M10 -260 Q30 -220 30 -160 L30 -40" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.35} />
  </g>
)

// # a poster building with a sign (bottom centre); used for the office and the shops
export const Building: React.FC<{ x: number; y: number; w?: number; h?: number; s?: number; o?: number; col?: string; sign?: string; lit?: number; shut?: number }> = ({ x, y, w = 360, h = 420, s = 1, o = 1, col = SAND, sign, lit = 1, shut = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Ground x={0} y={0} w={w * 1.1} />
    <rect x={-w / 2} y={-h} width={w} height={h} fill={col} />
    <rect x={-w / 2} y={-h} width={w * 0.22} height={h} fill="#FFFFFF" opacity={0.14} />
    <rect x={-w / 2 - 14} y={-h - 26} width={w + 28} height={30} fill={DEEP} />
    {Array.from({ length: Math.floor((h - 160) / 90) }, (_, r) => Array.from({ length: Math.floor(w / 90) }, (_, c) => <rect key={`${r}-${c}`} x={-w / 2 + 30 + c * 90} y={-h + 40 + r * 90} width={50} height={56} rx={6} fill={shut > 0.5 ? '#6E6A70' : `rgba(255,${200 + 30 * lit},120,${0.55 + 0.45 * lit})`} />))}
    <rect x={-44} y={-120} width={88} height={120} rx={6} fill={shut > 0.5 ? '#4A4750' : DEEP} />
    {sign && <g transform={`translate(0 ${-h - 70})`}><rect x={-w / 2 + 20} y={-34} width={w - 40} height={56} rx={10} fill={shut > 0.5 ? '#6E6A70' : ORANGE} /><text y={10} textAnchor="middle" fill={CREAM} style={TXT(36)}>{sign}</text></g>}
    {shut > 0 && <g opacity={shut}><rect x={-w / 2 + 10} y={-140} width={w - 20} height={30} fill={INK} opacity={0.6} /><g transform="translate(0 -60) rotate(-6)"><rect x={-70} y={-24} width={140} height={44} rx={6} fill={CREAM} /><text y={10} textAnchor="middle" fill={RED} style={TXT(32)}>CLOSED</text></g></g>}
  </g>
)

// # a small house (bottom centre)
export const Home: React.FC<{ x: number; y: number; s?: number; o?: number; col?: string; roof?: string }> = ({ x, y, s = 1, o = 1, col = CREAM, roof = RUST }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Ground x={0} y={0} w={320} />
    <rect x={-130} y={-200} width={260} height={200} fill={col} /><rect x={-130} y={-200} width={60} height={200} fill="#FFFFFF" opacity={0.18} />
    <path d="M-160 -200 L0 -330 L160 -200 Z" fill={roof} /><path d="M-160 -200 L0 -330 L0 -200 Z" fill="#FFFFFF" opacity={0.12} />
    <rect x={-30} y={-110} width={60} height={110} rx={6} fill={DEEP} />
    {[-80, 80].map((wx) => <rect key={wx} x={wx - 30} y={-170} width={60} height={56} rx={6} fill="#FFE6B8" stroke={DEEP} strokeWidth={5} />)}
  </g>
)

// # tiny natural motion on the thing being talked about: a poster glint (fills short quiet moments)
export const Life: React.FC<{ f: number; at: number; x: number; y: number; kind?: 'glint' | 'spark' }> = ({ f, at, x, y, kind = 'glint' }) => {
  const t = (f - at) / 18
  if (t < 0 || t > 1) return null
  const k = Math.sin(Math.PI * t)
  if (kind === 'spark') return <g transform={`translate(${x} ${y})`} opacity={k}>{[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={0} y1={-20 - 30 * t} x2={0} y2={-34 - 40 * t} stroke={GOLD} strokeWidth={5} strokeLinecap="round" transform={`rotate(${i * 60})`} />)}</g>
  return (
    <g transform={`translate(${x} ${y}) rotate(${30 * t}) scale(${k})`} opacity={0.95}>
      <path d="M0 -30 L6 -6 L30 0 L6 6 L0 30 L-6 6 L-30 0 L-6 -6 Z" fill="#FFFFFF" />
    </g>
  )
}
