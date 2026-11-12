// ============================================================
// LONG VIDEO — "How to Turn Saving Into Investing, Step by Step" — this video's own art.
// Art direction (owner r82/r83, 2026-11-10): a TERRACED HILLSIDE GARDEN at dawn. Money is WATER:
// savings sit in glass tanks and pools, interest drips in, debt is a leaking bucket, the employer's
// match is a second tap, the index fund is an orchard of hundreds of little trees, autopilot is a
// drip pipe that keeps watering through every season, and the five steps are the terraces of a hill.
// Palette: peach-to-mint dawn sky, sage hills with haze (far / mid / near layers), terracotta, teal
// water, warm wood, coin gold. Everything drawn fresh for this video; only the engine is shared.
// ============================================================
import React from 'react'
import { clamp01, lerp, rnd } from '../kit'

// ------------------------------------------------------------ palette (this video only)
export const C = {
  ink: '#1E2A44', ink2: '#4B5A78', paper: '#FFFBF3',
  skyTop: '#F9D9B8', skyMid: '#FBE9D3', skyLow: '#D8EEE6',
  hillFar: '#B9D3C2', hillMid: '#8DB596', hillNear: '#5E8F6E', hillDeep: '#3E6B57',
  soil: '#B9875E', soilD: '#8E6242', stone: '#D8CDBB', stoneD: '#B3A58E',
  terra: '#D9774B', terraD: '#B45A33', water: '#5BBBD0', waterD: '#2E8FA8', waterL: '#BDE7EF',
  wood: '#A8744F', woodD: '#7A5236', gold: '#F2C14E', goldD: '#C8932A', goldL: '#FFE29A',
  red: '#D9483A', redD: '#A8322A', green: '#3FA66B', greenD: '#2B7A4E', leaf: '#6DBA72', leafD: '#3F8A4E',
  storm: '#5B6478', stormD: '#3D4456', glass: '#E8F5F8',
}
export const TXT = (size: number, w = 400) => ({ font: `${w} ${size}px "Bebas Neue"`, letterSpacing: 1 })
export const INTER = (size: number, w = 700) => ({ font: `${w} ${size}px Inter` })

// ------------------------------------------------------------ the sky + three hill layers (depth)
// # mood: 'dawn' (peach), 'noon' (clear), 'storm' (grey), 'dusk' (warm rose); haze softens the far layer
export const Sky: React.FC<{ id: string; f: number; mood?: 'dawn' | 'noon' | 'storm' | 'dusk'; hills?: boolean; sun?: number }> = ({ id, f, mood = 'dawn', hills = true, sun = 1 }) => {
  const S = {
    dawn: ['#F6C9A4', '#FBE6CF', '#DDEFE7'], noon: ['#A9D8EE', '#D7EEF5', '#EAF6EE'],
    storm: ['#6E7891', '#9AA3B5', '#C3C9D2'], dusk: ['#E7A08E', '#F6CDB0', '#F4E2C8'],
  }[mood]
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={S[0]} /><stop offset="0.55" stopColor={S[1]} /><stop offset="1" stopColor={S[2]} /></linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFF6DA" /><stop offset="0.45" stopColor="#FFE3A8" stopOpacity={0.9} /><stop offset="1" stopColor="#FFE3A8" stopOpacity={0} /></radialGradient>
        <linearGradient id={`${id}-far`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={mood === 'storm' ? '#8E9AA6' : C.hillFar} /><stop offset="1" stopColor={mood === 'storm' ? '#A9B3BC' : '#CFE2D3'} /></linearGradient>
        <linearGradient id={`${id}-mid`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={mood === 'storm' ? '#6F8478' : C.hillMid} /><stop offset="1" stopColor={mood === 'storm' ? '#5F7468' : '#7AA684'} /></linearGradient>
      </defs>
      <rect x={-200} y={-200} width={2400} height={1500} fill={`url(#${id}-sky)`} />
      {mood !== 'storm' && sun > 0 && <circle cx={1460} cy={300 - 10 * Math.sin(f / 90)} r={230} fill={`url(#${id}-sun)`} opacity={sun} />}
      {/* # soft drifting clouds */}
      {[0, 1, 2].map((k) => { const x = ((260 + k * 700 + f * (0.25 + k * 0.08)) % 2300) - 200, y = 170 + k * 70
        return <g key={k} opacity={mood === 'storm' ? 0.9 : 0.75} transform={`translate(${x} ${y}) scale(${1 - k * 0.15})`}>
          <ellipse cx={0} cy={0} rx={130} ry={34} fill={mood === 'storm' ? '#8A93A6' : '#FFFFFF'} /><ellipse cx={-50} cy={-22} rx={70} ry={40} fill={mood === 'storm' ? '#8A93A6' : '#FFFFFF'} /><ellipse cx={45} cy={-28} rx={60} ry={44} fill={mood === 'storm' ? '#8A93A6' : '#FFFFFF'} />
        </g> })}
      {hills && <g>
        <path d="M-100 720 C 200 600 420 640 640 680 S 1100 560 1380 620 S 1800 600 2020 650 L 2020 1200 L -100 1200 Z" fill={`url(#${id}-far)`} opacity={0.85} />
        <path d="M-100 820 C 260 720 520 760 820 790 S 1380 700 1700 760 S 1960 770 2020 780 L 2020 1200 L -100 1200 Z" fill={`url(#${id}-mid)`} />
      </g>}
    </g>
  )
}

// ------------------------------------------------------------ the near ground with grass tufts and a few flowers
export const Ground: React.FC<{ y: number; color?: string; flowers?: boolean; seed?: number }> = ({ y, color = C.hillNear, flowers = true, seed = 1 }) => (
  <g>
    <path d={`M-100 ${y} C 400 ${y - 18} 900 ${y + 14} 1400 ${y - 10} S 1900 ${y + 6} 2020 ${y} L 2020 1200 L -100 1200 Z`} fill={color} />
    <path d={`M-100 ${y + 60} C 500 ${y + 44} 1100 ${y + 74} 2020 ${y + 56} L 2020 1200 L -100 1200 Z`} fill={C.hillDeep} opacity={0.35} />
    {Array.from({ length: 22 }, (_, i) => { const x = rnd(i * 3 + seed) * 1920, yy = y + 8 + rnd(i * 7 + seed) * 90
      return <g key={i} transform={`translate(${x} ${yy})`}><path d="M-10 0 Q-6 -22 -2 0 Q2 -28 6 0 Q10 -18 14 0 Z" fill={C.hillDeep} opacity={0.55} />
        {flowers && i % 4 === 0 && <circle cx={4} cy={-24} r={6} fill={i % 8 ? '#F6D36B' : '#F2A2A0'} />}</g> })}
  </g>
)

// ------------------------------------------------------------ a glass tank of money-water: fill 0–1, a coin plate, a label plate on its base
export const Tank: React.FC<{ x: number; y: number; w?: number; h?: number; fill: number; label?: string; sub?: string; o?: number; color?: string; wave?: number; f: number; tint?: string }> = ({ x, y, w = 260, h = 300, fill, label, sub, o = 1, color = C.water, f, tint }) => {
  const lv = h - 20 - (h - 40) * clamp01(fill), wob = 6 * Math.sin(f / 9)
  const id = `tk${Math.round(x)}${Math.round(y)}`
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <defs><clipPath id={id}><rect x={-w / 2 + 10} y={-h + 10} width={w - 20} height={h - 20} rx={22} /></clipPath>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} /><stop offset="1" stopColor={C.waterD} /></linearGradient></defs>
      <ellipse cx={0} cy={8} rx={w * 0.62} ry={18} fill="#000" opacity={0.14} />
      <rect x={-w / 2} y={-h} width={w} height={h} rx={30} fill={tint ?? C.glass} opacity={0.6} stroke="#FFFFFF" strokeWidth={6} />
      <g clipPath={`url(#${id})`}>
        <path d={`M${-w / 2} ${-h + lv} Q ${-w / 4} ${-h + lv - wob} 0 ${-h + lv} T ${w / 2} ${-h + lv} L ${w / 2} 0 L ${-w / 2} 0 Z`} fill={`url(#${id}g)`} />
        {Array.from({ length: 5 }, (_, k) => <circle key={k} cx={-w / 3 + k * w / 6} cy={-h + lv + 30 + ((f * 1.2 + k * 37) % Math.max(20, h - lv - 40))} r={5} fill="#FFFFFF" opacity={0.35} />)}
      </g>
      <rect x={-w / 2 + 18} y={-h + 18} width={16} height={h - 60} rx={8} fill="#FFFFFF" opacity={0.45} />
      <rect x={-w / 2 - 14} y={-14} width={w + 28} height={30} rx={10} fill={C.woodD} />
      {label && <g transform={`translate(0 ${-h / 2 - 10})`}><rect x={-w / 2 + 26} y={-44} width={w - 52} height={74} rx={16} fill={C.paper} opacity={0.94} />
        <text y={14} textAnchor="middle" fill={C.ink} style={TXT(label.length > 9 ? 50 : 62)}>{label}</text></g>}
      {sub && <text y={64} textAnchor="middle" fill={C.ink} style={TXT(44)}>{sub}</text>}
    </g>
  )
}

// ------------------------------------------------------------ a falling drop / coin of water-money
export const Drop: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = C.water }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M0 -26 C 14 -6 18 4 18 10 A 18 18 0 0 1 -18 10 C -18 4 -14 -6 0 -26 Z" fill={color} /><circle cx={-6} cy={6} r={5} fill="#FFFFFF" opacity={0.6} /></g>
)
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; text?: string }> = ({ x, y, s = 1, o = 1, r = 0, text = '$' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={40} ry={40} fill={C.goldD} /><circle r={40} fill={C.gold} /><circle r={30} fill="none" stroke={C.goldD} strokeWidth={4} opacity={0.6} />
    <text y={14} textAnchor="middle" fill={C.goldD} style={TXT(42)}>{text}</text>
  </g>
)

// ------------------------------------------------------------ a tap (faucet) on a pipe; open 0–1 sets the stream; colour of the handle
export const Tap: React.FC<{ x: number; y: number; s?: number; o?: number; open: number; f: number; handle?: string; len?: number; flip?: boolean }> = ({ x, y, s = 1, o = 1, open, f, handle = C.terra, len = 220, flip = false }) => {
  const k = clamp01(open)
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
      <rect x={-200} y={-18} width={200} height={36} rx={10} fill="#9AA6B2" /><rect x={-200} y={-18} width={200} height={10} rx={5} fill="#C4CDD6" />
      <path d="M0 -18 L40 -18 Q70 -18 70 12 L70 40 L44 40 L44 18 Q44 14 38 14 L0 14 Z" fill="#9AA6B2" />
      <rect x={14} y={-52} width={14} height={34} fill="#7C8794" /><rect x={-16} y={-66} width={74} height={18} rx={9} fill={handle} transform={`rotate(${-35 * k} 21 -57)`} />
      {k > 0.02 && <g><rect x={57 - 10 * k} y={40} width={20 * k} height={len} fill={C.water} opacity={0.85} />
        {[0, 1, 2].map((j) => <ellipse key={j} cx={57} cy={40 + ((f * 9 + j * len / 3) % len)} rx={10 * k} ry={16 * k} fill="#FFFFFF" opacity={0.35} />)}</g>}
    </g>
  )
}

// ------------------------------------------------------------ the leaking bucket (credit-card debt): leak 0–1, plugged 0–1
export const Bucket: React.FC<{ x: number; y: number; s?: number; o?: number; fill: number; leak: number; plug?: number; f: number; tag?: string }> = ({ x, y, s = 1, o = 1, fill, leak, plug = 0, f, tag }) => {
  const lv = 230 - 200 * clamp01(fill), k = clamp01(leak) * (1 - clamp01(plug))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={190} ry={18} fill="#000" opacity={0.14} />
      <defs><clipPath id={`bk${Math.round(x)}`}><path d="M-150 -250 L150 -250 L120 0 L-120 0 Z" /></clipPath></defs>
      <path d="M-150 -250 L150 -250 L120 0 L-120 0 Z" fill="#C9D3DC" />
      <g clipPath={`url(#bk${Math.round(x)})`}><rect x={-160} y={-250 + lv} width={320} height={260} fill={C.water} /><rect x={-160} y={-250 + lv} width={320} height={10} fill={C.waterL} opacity={0.8} /></g>
      <path d="M-150 -250 L150 -250 L120 0 L-120 0 Z" fill="none" stroke="#8D99A6" strokeWidth={8} strokeLinejoin="round" />
      {[-170, -90].map((yy) => <rect key={yy} x={-150 + (yy + 250) * 0.12} y={yy} width={300 - (yy + 250) * 0.24} height={12} fill="#8D99A6" />)}
      <path d="M-150 -250 Q 0 -420 150 -250" fill="none" stroke="#6E7A88" strokeWidth={8} />
      {/* # the hole near the bottom and its stream */}
      <circle cx={60} cy={-40} r={16} fill={C.ink} opacity={0.75 * (1 - clamp01(plug))} />
      {plug > 0 && <g opacity={clamp01(plug * 2)}><circle cx={60} cy={-40} r={22} fill={C.wood} /><circle cx={56} cy={-44} r={8} fill="#C89A6E" /></g>}
      {k > 0.02 && <g><path d={`M72 -40 Q ${110 + 40 * k} -30 ${130 + 60 * k} 6`} fill="none" stroke={C.water} strokeWidth={14 * k} strokeLinecap="round" />
        {[0, 1, 2].map((j) => <Drop key={j} x={150 + 60 * k + j * 14} y={((f * 6 + j * 30) % 90) + 10} s={0.5 * k} o={k} />)}</g>}
      {tag && <g transform="translate(-10 -150)"><rect x={-92} y={-40} width={184} height={70} rx={14} fill={C.red} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={TXT(54)}>{tag}</text></g>}
    </g>
  )
}

// ------------------------------------------------------------ a little tree (a company in the orchard); grow 0–1, wilt 0–1
export const Tree: React.FC<{ x: number; y: number; s?: number; grow?: number; wilt?: number; o?: number; hue?: number; fruit?: number }> = ({ x, y, s = 1, grow = 1, wilt = 0, o = 1, hue = 0, fruit = 0 }) => {
  const g = clamp01(grow), w = clamp01(wilt)
  const leaf = [C.leaf, '#7CC47A', '#58A866', '#8CCB7E'][hue % 4]
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (0.35 + 0.65 * g)}) rotate(${12 * w})`} opacity={o * (g > 0 ? 1 : 0)}>
      <ellipse cx={0} cy={4} rx={60} ry={10} fill="#000" opacity={0.12} />
      <rect x={-9} y={-90} width={18} height={92} rx={8} fill={C.woodD} />
      <circle cx={0} cy={-130} r={62} fill={w > 0.5 ? '#B8A36A' : leaf} /><circle cx={-34} cy={-104} r={40} fill={w > 0.5 ? '#A8935A' : C.leafD} opacity={0.9} /><circle cx={30} cy={-150} r={34} fill="#FFFFFF" opacity={0.18} />
      {fruit > 0 && [[-24, -128], [22, -110], [10, -160]].map(([fx, fy], k) => <circle key={k} cx={fx} cy={fy} r={10 * clamp01(fruit * 3 - k)} fill={C.gold} />)}
    </g>
  )
}

// ------------------------------------------------------------ a paycheck envelope
export const Paycheck: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; amt: string; sub?: string }> = ({ x, y, s = 1, o = 1, r = 0, amt, sub = 'PAYCHECK' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-96} width={340} height={192} rx={16} fill={C.paper} stroke="#D9C29A" strokeWidth={5} />
    <path d="M-170 -96 L0 6 L170 -96" fill="none" stroke="#E8D7B4" strokeWidth={5} />
    <text y={-30} textAnchor="middle" fill={C.ink2} style={TXT(sub.length > 12 ? 36 : 44)}>{sub}</text>
    <text y={62} textAnchor="middle" fill={C.greenD} style={TXT(80)}>{amt}</text>
  </g>
)

// ------------------------------------------------------------ a price tag on a string (inflation)
export const PriceTag: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; text: string; color?: string }> = ({ x, y, s = 1, o = 1, r = 0, text, color = C.terra }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M-70 -40 L50 -40 L90 0 L50 40 L-70 40 Z" fill={color} /><circle cx={58} cy={0} r={9} fill={C.paper} />
    <text x={-12} y={16} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>{text}</text>
  </g>
)

// ------------------------------------------------------------ a stone terrace step with a soil top; lit 0–1 glows its edge
export const Terrace: React.FC<{ x: number; y: number; w: number; h?: number; o?: number; lit?: number; n?: string }> = ({ x, y, w, h = 90, o = 1, lit = 0, n }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={0} y={0} width={w} height={h} fill={C.stone} /><rect x={0} y={0} width={w} height={20} fill={C.leaf} />
    {Array.from({ length: Math.floor(w / 70) }, (_, k) => <rect key={k} x={k * 70 + (k % 2) * 18 + 6} y={34} width={52} height={22} rx={5} fill={C.stoneD} opacity={0.7} />)}
    <rect x={0} y={h - 10} width={w} height={10} fill={C.stoneD} />
    {lit > 0 && <rect x={-6} y={-8} width={w + 12} height={14} rx={7} fill={C.goldL} opacity={lit} />}
    {n && <g transform={`translate(${w - 60} ${h / 2 + 8})`}><circle r={30} fill={C.ink} /><text y={13} textAnchor="middle" fill="#FFFFFF" style={TXT(42)}>{n}</text></g>}
  </g>
)

// ------------------------------------------------------------ a little car (breakdown) with smoke
export const Car: React.FC<{ x: number; y: number; s?: number; o?: number; smoke?: number; f: number }> = ({ x, y, s = 1, o = 1, smoke = 0, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={16} fill="#000" opacity={0.15} />
    <path d="M-180 -40 L-150 -100 Q-140 -120 -110 -120 L80 -120 Q110 -120 130 -95 L170 -55 L180 -40 L180 -10 L-180 -10 Z" fill={C.terra} />
    <path d="M-120 -108 L-20 -108 L-20 -62 L-140 -62 Z M0 -108 L80 -108 Q100 -108 116 -88 L140 -62 L0 -62 Z" fill={C.waterL} />
    {[-110, 110].map((wx) => <g key={wx} transform={`translate(${wx} -6)`}><circle r={36} fill={C.ink} /><circle r={16} fill="#9AA6B2" /></g>)}
    {smoke > 0 && [0, 1, 2].map((k) => { const t = (f / 30 + k / 3) % 1; return <circle key={k} cx={150 + 30 * t + 10 * k} cy={-130 - 140 * t} r={(26 + 30 * t) * smoke} fill="#8E97A6" opacity={0.6 * (1 - t) * smoke} /> })}
  </g>
)

// ------------------------------------------------------------ a storm cloud with rain + a lightning flash
export const Storm: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; rain?: number; bolt?: number }> = ({ x, y, s = 1, o = 1, f, rain = 1, bolt = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {rain > 0 && Array.from({ length: 14 }, (_, k) => { const t = ((f * 0.05 + rnd(k)) % 1); return <line key={k} x1={-160 + k * 24} y1={40 + 260 * t} x2={-170 + k * 24} y2={70 + 260 * t} stroke={C.waterD} strokeWidth={5} opacity={0.6 * rain} strokeLinecap="round" /> })}
    <ellipse cx={0} cy={0} rx={220} ry={64} fill={C.stormD} /><ellipse cx={-80} cy={-40} rx={110} ry={70} fill={C.storm} /><ellipse cx={70} cy={-50} rx={100} ry={80} fill={C.storm} />
    {bolt > 0 && <path d="M10 40 L-30 130 L10 130 L-20 230 L60 110 L20 110 L50 40 Z" fill={C.goldL} opacity={bolt} />}
  </g>
)

// ------------------------------------------------------------ a small person dot (survey crowd): lit = coloured, else grey
export const Dot: React.FC<{ x: number; y: number; s?: number; lit: number; o?: number }> = ({ x, y, s = 1, lit, o = 1 }) => {
  const col = lit > 0.5 ? C.greenD : '#A4AAB6'
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><circle cy={-30} r={12} fill={col} /><path d="M-16 0 Q-16 -18 0 -18 Q16 -18 16 0 Z" fill={col} /></g>
}

// ------------------------------------------------------------ a cross (the "not this" mark, owner r68): comfortable size, soft red
export const NoMark: React.FC<{ x: number; y: number; r?: number; o: number }> = ({ x, y, r = 120, o }) => o > 0.01 ? (
  <g transform={`translate(${x} ${y}) scale(${0.8 + 0.2 * o})`} opacity={o}>
    <circle r={r} fill="none" stroke={C.red} strokeWidth={r * 0.14} /><line x1={-r * 0.7} y1={-r * 0.7} x2={r * 0.7} y2={r * 0.7} stroke={C.red} strokeWidth={r * 0.14} strokeLinecap="round" />
  </g>
) : null

// ------------------------------------------------------------ a calendar flip card (year)
export const YearCard: React.FC<{ x: number; y: number; s?: number; o?: number; year: string; top?: string; col?: string }> = ({ x, y, s = 1, o = 1, year, top = 'YEAR', col = C.terra }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-90} width={220} height={190} rx={18} fill={C.paper} stroke="#E3D3B6" strokeWidth={4} />
    <rect x={-110} y={-90} width={220} height={56} rx={18} fill={col} /><rect x={-110} y={-52} width={220} height={18} fill={col} />
    <text y={-46} textAnchor="middle" fill="#FFFFFF" style={TXT(40)}>{top}</text>
    <text y={66} textAnchor="middle" fill={C.ink} style={TXT(90)}>{year}</text>
  </g>
)

// ------------------------------------------------------------ helpers
export const num = (v: number) => Math.round(v).toLocaleString('en-US')
export const wave = (f: number, k = 0, a = 1) => a * Math.sin(f / 14 + k)
export { lerp }
