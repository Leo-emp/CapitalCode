// ============================================================
// LONG VIDEO — "How Inflation Actually Works" — this video's own art (owner rules r82/r83: drawn fresh, own direction).
// Art direction: GRANDMA'S KITCHEN & MANGO ISLAND. A sunlit kitchen (plum-ink outlines, coral tiles, mint cupboards,
// sunflower light through the window) frames the money story; the causes play out on a made-up mango island
// (turquoise sea, sand, palms, a wooden market stall); the Fed is a stately thermostat room (lilac walls, brass dial).
// Depth: back wall / sky with gradient + soft light shafts, mid objects with drop shadows, a foreground counter or sand bank.
// Only the engine (timing, Person rig, Headline) is shared with other videos.
// ============================================================
import React from 'react'
import { clamp01, lerp, rnd } from '../kit'

export const K = {
  ink: '#2E2140', ink2: '#5C4A6E', paper: '#FFF8EC', cream: '#FBEBD3', wall: '#F6DCC0', wallD: '#E9C6A4',
  coral: '#F27B5B', coralD: '#C95A40', mint: '#8ED8BE', mintD: '#4FA98A', sun: '#F7C548', sunD: '#D9A22C',
  plum: '#6B4E8C', plumD: '#4A3466', lilac: '#D7CCF2', lilacD: '#B3A4DE', sea: '#3FA7C9', seaD: '#277F9E', sand: '#F3D9A4', sandD: '#DDBB7C',
  leaf: '#4FA36B', leafD: '#327A4E', wood: '#A4704A', woodD: '#74492D', mango: '#F6A63A', mangoD: '#E07A26', red: '#D9483B', green: '#3E9B5F',
  bill: '#B9D8A8', billD: '#6E9B5E', brass: '#D8A84E', brassD: '#A47A2E', ice: '#CDEBFA', fire: '#FF8A3D',
}
export const BB = (size: number) => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 1 })

// ------------------------------------------------------------ a pill label (attached to the thing it names)
export const Label: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; fill?: string; ink?: string }> = ({ x, y, text, o = 1, size = 44, fill = K.paper, ink = K.ink }) => {
  const w = Math.max(110, text.length * size * 0.47 + 40)
  return o > 0.001 ? <g transform={`translate(${x} ${y})`} opacity={o}><rect x={-w / 2} y={-size * 0.75 + 4} width={w} height={size * 1.25} rx={size * 0.4} fill="#000" opacity={0.12} /><rect x={-w / 2} y={-size * 0.75} width={w} height={size * 1.25} rx={size * 0.4} fill={fill} stroke={K.ink} strokeOpacity={0.15} strokeWidth={2} /><text y={size * 0.3} textAnchor="middle" fill={ink} style={BB(size)}>{text}</text></g> : null
}
export const No: React.FC<{ x: number; y: number; r?: number; o: number }> = ({ x, y, r = 110, o }) => o > 0.01 ? (
  <g transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * o})`} opacity={o}><circle r={r} fill="none" stroke={K.red} strokeWidth={r * 0.14} /><line x1={-r * 0.7} y1={-r * 0.7} x2={r * 0.7} y2={r * 0.7} stroke={K.red} strokeWidth={r * 0.14} strokeLinecap="round" /></g>
) : null

// ------------------------------------------------------------ the kitchen: back wall, window with sky, tiles, a counter in front
export const Kitchen: React.FC<{ id: string; f: number; mood?: 'day' | 'gold' | 'dusk'; counter?: number }> = ({ id, f, mood = 'day', counter = 900 }) => {
  const S = { day: ['#BFE6F5', '#EAF7FB'], gold: ['#F9C98A', '#FDEBC8'], dusk: ['#5B4A82', '#F09A7C'] }[mood]
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-w`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={K.wall} /><stop offset="1" stopColor={K.wallD} /></linearGradient>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={S[0]} /><stop offset="1" stopColor={S[1]} /></linearGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={K.wood} /><stop offset="1" stopColor={K.woodD} /></linearGradient>
      </defs>
      <rect x={-200} y={-200} width={2400} height={1500} fill={`url(#${id}-w)`} />
      {/* tiles behind the counter */}
      {Array.from({ length: 26 * 4 }, (_, k) => <rect key={k} x={-40 + (k % 26) * 80} y={counter - 300 + Math.floor(k / 26) * 70} width={76} height={66} rx={6} fill={(k + Math.floor(k / 26)) % 2 ? '#F7C2AE' : '#FAD3C2'} />)}
      {/* the window with the sky and a gentle light shaft */}
      <g transform="translate(1380 90)">
        <rect x={-20} y={-20} width={500} height={400} rx={22} fill={K.cream} />
        <rect width={460} height={360} rx={12} fill={`url(#${id}-s)`} />
        {mood !== 'dusk' && <circle cx={340} cy={110 + 4 * Math.sin(f / 70)} r={58} fill="#FFF3C4" opacity={0.85} />}
        {mood === 'dusk' && <circle cx={330} cy={240} r={70} fill="#FFB27A" opacity={0.85} />}
        <ellipse cx={(120 + f * 0.25) % 560 - 50} cy={90} rx={70} ry={20} fill="#FFFFFF" opacity={0.8} />
        <rect x={224} width={12} height={360} fill={K.cream} /><rect y={174} width={460} height={12} fill={K.cream} />
        <path d="M-20 -20 L480 -20 L470 30 L-10 30 Z" fill={K.coral} />
      </g>
      <path d="M1380 450 L1840 450 L1600 1100 L980 1100 Z" fill="#FFF6D6" opacity={mood === 'dusk' ? 0.05 : 0.16} />
      {/* upper cupboards on the left */}
      {[0, 1, 2].map((k) => <g key={k} transform={`translate(${80 + k * 260} 70)`}><rect width={240} height={260} rx={14} fill={K.mint} /><rect x={16} y={16} width={208} height={228} rx={10} fill="none" stroke={K.mintD} strokeWidth={5} /><circle cx={k % 2 ? 30 : 210} cy={200} r={9} fill={K.brass} /></g>)}
      {/* the counter (near layer) */}
      <rect x={-200} y={counter} width={2400} height={40} fill={K.cream} />
      <rect x={-200} y={counter + 40} width={2400} height={400} fill={`url(#${id}-c)`} />
      {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-40 + k * 240} y={counter + 70} width={210} height={130} rx={10} fill="none" stroke={K.woodD} strokeWidth={5} opacity={0.7} />)}
    </g>
  )
}

// ------------------------------------------------------------ a 100-dollar bill (value text, glow 0–1)
export const Bill: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string; glow?: number }> = ({ x, y, s = 1, r = 0, o = 1, text = '100', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse rx={190} ry={110} fill={K.sun} opacity={0.3 * glow} />}
    <rect x={-150} y={-70} width={300} height={140} rx={10} fill={K.billD} transform="translate(5 6)" opacity={0.35} />
    <rect x={-150} y={-70} width={300} height={140} rx={10} fill={K.bill} stroke={K.billD} strokeWidth={5} />
    <rect x={-132} y={-54} width={264} height={108} rx={8} fill="none" stroke={K.billD} strokeWidth={3} />
    <ellipse rx={40} ry={46} fill="#D8EBCB" stroke={K.billD} strokeWidth={3} /><circle cy={-8} r={14} fill={K.billD} opacity={0.6} /><path d="M-22 30 Q0 4 22 30" fill={K.billD} opacity={0.6} />
    <text x={-104} y={-18} textAnchor="middle" fill={K.billD} style={BB(36)}>{text}</text><text x={104} y={42} textAnchor="middle" fill={K.billD} style={BB(36)}>{text}</text>
  </g>
)
// ------------------------------------------------------------ a kitchen drawer front that slides open (open 0–1); children sit inside it
export const Drawer: React.FC<{ x: number; y: number; open: number; children?: React.ReactNode }> = ({ x, y, open, children }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-260} y={-20} width={520} height={160} rx={12} fill={K.woodD} />
    <g transform={`translate(0 ${70 * clamp01(open)})`}>
      <rect x={-240} y={-90 * clamp01(open)} width={480} height={90 * clamp01(open) + 10} fill="#5E3A22" />
      {open > 0.3 && <g opacity={clamp01((open - 0.3) / 0.4)}>{children}</g>}
      <rect x={-260} y={0} width={520} height={120} rx={12} fill={K.wood} stroke={K.woodD} strokeWidth={5} />
      <rect x={-60} y={44} width={120} height={22} rx={11} fill={K.brass} />
    </g>
  </g>
)
// ------------------------------------------------------------ a paper grocery bag; fill 0–1 = how much it holds
export const Bag: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number }> = ({ x, y, s = 1, o = 1, fill = 1 }) => {
  const items = [
    { k: 'bread', x: -60, h: 150 }, { k: 'milk', x: 40, h: 170 }, { k: 'apple', x: -10, h: 110 }, { k: 'leaf', x: 80, h: 130 }, { k: 'egg', x: -90, h: 100 }, { k: 'jar', x: 10, h: 90 },
  ]
  const n = Math.round(clamp01(fill) * items.length)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cy={6} rx={160} ry={16} fill="#000" opacity={0.12} />
      {items.slice(0, n).map((it, k) => <g key={k} transform={`translate(${it.x} ${-200 - it.h * 0.5 + 60})`}>
        {it.k === 'bread' && <ellipse rx={46} ry={70} fill="#E7A55C" stroke="#B9783A" strokeWidth={4} />}
        {it.k === 'milk' && <g><rect x={-34} y={-80} width={68} height={130} rx={8} fill="#FFFFFF" stroke={K.ink2} strokeWidth={3} /><path d="M-34 -80 L0 -110 L34 -80 Z" fill={K.sea} /></g>}
        {it.k === 'apple' && <g><circle r={38} fill={K.red} /><rect x={-3} y={-50} width={6} height={18} fill={K.woodD} /></g>}
        {it.k === 'leaf' && <path d="M0 50 Q-50 -10 0 -70 Q50 -10 0 50 Z" fill={K.leaf} />}
        {it.k === 'egg' && <ellipse rx={26} ry={34} fill="#FFF3DD" stroke="#D8C39E" strokeWidth={3} />}
        {it.k === 'jar' && <g><rect x={-30} y={-40} width={60} height={80} rx={10} fill={K.coral} /><rect x={-34} y={-52} width={68} height={16} rx={4} fill={K.brass} /></g>}
      </g>)}
      <path d="M-140 -220 L140 -220 L120 0 L-120 0 Z" fill="#D9B07A" />
      <path d="M-140 -220 L140 -220 L136 -190 L-136 -190 Z" fill="#C79A60" />
      <path d="M-60 -120 Q0 -90 60 -120" fill="none" stroke="#B9874E" strokeWidth={4} />
    </g>
  )
}
// ------------------------------------------------------------ a price tag on a string; text, color
export const Tag: React.FC<{ x: number; y: number; s?: number; o?: number; text: string; color?: string; r?: number; string?: number }> = ({ x, y, s = 1, o = 1, text, color = K.sun, r = 0, string = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {string > 0 && <path d={`M-60 0 Q-70 ${string * 0.5} -50 ${string}`} fill="none" stroke={K.ink2} strokeWidth={3} />}
    <path d="M-70 -34 L60 -34 Q76 -34 76 -18 L76 18 Q76 34 60 34 L-70 34 L-96 0 Z" fill={color} stroke={K.ink} strokeOpacity={0.25} strokeWidth={3} />
    <circle cx={-68} r={8} fill={K.paper} />
    <text x={4} y={14} textAnchor="middle" fill={K.ink} style={BB(text.length > 6 ? 34 : 44)}>{text}</text>
  </g>
)
// ------------------------------------------------------------ a shopping cart full of goods; lift raises the whole cart
export const Cart: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cy={8} rx={200} ry={16} fill="#000" opacity={0.12} />
    {[[-110, -250, 50, K.coral], [-40, -270, 60, K.sun], [40, -255, 52, K.mint], [110, -245, 46, K.sea], [-75, -300, 40, K.leaf], [70, -300, 44, '#E7A55C']].map(([cx, cy, r, c], k) => <circle key={k} cx={cx as number} cy={(cy as number) + 2 * Math.sin(f / 20 + k)} r={r as number} fill={c as string} />)}
    <path d="M-180 -240 L180 -240 L150 -90 L-150 -90 Z" fill="#C9D2DE" opacity={0.85} stroke="#7F8C9E" strokeWidth={6} />
    {Array.from({ length: 6 }, (_, k) => <line key={k} x1={-150 + k * 60} y1={-236} x2={-130 + k * 52} y2={-94} stroke="#7F8C9E" strokeWidth={4} />)}
    <path d="M180 -240 L230 -300 L270 -300" fill="none" stroke="#7F8C9E" strokeWidth={8} strokeLinecap="round" />
    <line x1={-140} y1={-90} x2={-120} y2={-40} stroke="#7F8C9E" strokeWidth={6} /><line x1={140} y1={-90} x2={120} y2={-40} stroke="#7F8C9E" strokeWidth={6} />
    <line x1={-150} y1={-40} x2={150} y2={-40} stroke="#7F8C9E" strokeWidth={6} />
    {[-120, 120].map((cx) => <g key={cx}><circle cx={cx} cy={-18} r={20} fill={K.ink} /><circle cx={cx} cy={-18} r={8} fill="#9AA5B4" /></g>)}
  </g>
)
// ------------------------------------------------------------ supermarket aisle backdrop
export const Aisle: React.FC<{ id: string; f: number; floor?: number }> = ({ id, f, floor = 920 }) => (
  <g>
    <defs><linearGradient id={`${id}-a`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E6F4EF" /><stop offset="1" stopColor="#C8E6DA" /></linearGradient></defs>
    <rect x={-200} y={-200} width={2400} height={1500} fill={`url(#${id}-a)`} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={160 + k * 480} y={40} width={200} height={26} rx={13} fill="#FFFFFF" opacity={0.85} />)}
    {[0, 1, 2, 3].map((row) => <g key={row}>
      <rect x={-100} y={300 + row * 150} width={2200} height={18} fill={K.wood} />
      {Array.from({ length: 30 }, (_, k) => { const c = [K.coral, K.sun, K.mint, K.sea, K.lilacD, '#E7A55C'][(k + row * 2) % 6]; const h = 60 + rnd(k + row * 31) * 50
        return <rect key={k} x={-80 + k * 76} y={300 + row * 150 - h} width={56} height={h} rx={8} fill={c} opacity={0.55} /> })}
    </g>)}
    <rect x={-200} y={floor} width={2400} height={400} fill="#D9CDBA" />
    {Array.from({ length: 14 }, (_, k) => <rect key={k} x={-200 + k * 180} y={floor} width={176} height={400} fill={k % 2 ? '#E2D7C5' : '#D4C7B2'} />)}
    <rect x={-200} y={floor - 4} width={2400} height={10} fill="#B9AA92" />
    <g opacity={0.15 + 0.03 * Math.sin(f / 30)}><rect x={-200} y={-200} width={2400} height={1500} fill="#FFFFFF" /></g>
  </g>
)
// ------------------------------------------------------------ the island: sky, turquoise sea, sand bank, palms
export const Island: React.FC<{ id: string; f: number; mood?: 'day' | 'gold' | 'storm'; sand?: number }> = ({ id, f, mood = 'day', sand = 900 }) => {
  const S = { day: ['#7FD0EC', '#E3F6FB'], gold: ['#F6B27A', '#FDE3C0'], storm: ['#7C8AA6', '#C9D1DE'] }[mood]
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={S[0]} /><stop offset="1" stopColor={S[1]} /></linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={K.sea} /><stop offset="1" stopColor="#7FD6E6" /></linearGradient>
        <linearGradient id={`${id}-sand`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={K.sand} /><stop offset="1" stopColor={K.sandD} /></linearGradient>
      </defs>
      <rect x={-200} y={-200} width={2400} height={1500} fill={`url(#${id}-s)`} />
      {mood !== 'storm' && <circle cx={1580} cy={200 + 5 * Math.sin(f / 80)} r={100} fill={mood === 'gold' ? '#FFB06E' : '#FFF4C6'} opacity={0.9} />}
      {[0, 1, 2].map((k) => { const x = ((200 + k * 700 + f * (0.25 + 0.1 * k)) % 2300) - 200
        return <g key={k} transform={`translate(${x} ${140 + k * 50})`} opacity={0.85}><ellipse rx={110} ry={26} fill="#FFFFFF" /><ellipse cx={-36} cy={-18} rx={54} ry={30} fill="#FFFFFF" /><ellipse cx={36} cy={-20} rx={50} ry={34} fill="#FFFFFF" /></g> })}
      <rect x={-200} y={560} width={2400} height={500} fill={`url(#${id}-sea)`} />
      {Array.from({ length: 12 }, (_, k) => <path key={k} d={`M${(k * 190 + f * 0.8) % 2200 - 200} ${600 + (k % 4) * 60} q30 -12 60 0`} fill="none" stroke="#FFFFFF" strokeWidth={4} opacity={0.6} />)}
      <path d={`M-200 ${sand} Q400 ${sand - 60} 960 ${sand - 40} Q1500 ${sand - 20} 2200 ${sand - 70} L2200 1300 L-200 1300 Z`} fill={`url(#${id}-sand)`} />
      {[[120, sand - 30, 1], [1820, sand - 60, 0.9]].map(([px, py, ps], k) => <Palm key={k} x={px} y={py} s={ps} f={f + k * 40} />)}
    </g>
  )
}
export const Palm: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-14 0 Q-30 -200 10 -400 L34 -398 Q2 -200 14 0 Z" fill={K.wood} />
    {[-150, -100, -40, 20, 80, 140].map((a, k) => <path key={k} transform={`translate(22 -400) rotate(${a + 4 * Math.sin(f / 40 + k)})`} d="M0 0 Q90 -40 190 10 Q90 -10 0 0 Z" fill={k % 2 ? K.leaf : K.leafD} />)}
    {[0, 1, 2].map((k) => <circle key={k} cx={12 + k * 18} cy={-386} r={14} fill="#8B5A2B" />)}
  </g>
)
// ------------------------------------------------------------ a mango; and a pile of n mangoes (n = 0–1 how full)
export const Mango: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse rx={40} ry={32} fill={K.mangoD} transform="translate(3 4)" opacity={0.5} />
    <ellipse rx={40} ry={32} fill={K.mango} /><ellipse cx={-12} cy={-10} rx={14} ry={8} fill="#FFD27A" opacity={0.8} />
    <path d="M28 -26 Q44 -44 60 -38 Q44 -24 28 -26 Z" fill={K.leaf} />
  </g>
)
export const Pile: React.FC<{ x: number; y: number; s?: number; full?: number; o?: number }> = ({ x, y, s = 1, full = 1, o = 1 }) => {
  const spots: [number, number][] = []
  for (let row = 0; row < 4; row++) for (let k = 0; k < 7 - row; k++) spots.push([-150 + row * 25 + k * 50, -30 - row * 42])
  const n = Math.round(clamp01(full) * spots.length)
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>{spots.slice(0, n).map(([mx, my], k) => <Mango key={k} x={mx} y={my} s={0.7} r={(k * 37) % 30 - 15} />)}</g>
}
// ------------------------------------------------------------ the island market stall (wooden, striped canopy) with a price board
export const Stall: React.FC<{ x: number; y: number; s?: number; o?: number; price?: string; priceColor?: string; children?: React.ReactNode }> = ({ x, y, s = 1, o = 1, price, priceColor = K.paper, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cy={10} rx={330} ry={22} fill="#000" opacity={0.14} />
    <rect x={-290} y={-420} width={22} height={420} fill={K.woodD} /><rect x={268} y={-420} width={22} height={420} fill={K.woodD} />
    {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${-320 + k * 80} -470 L${-240 + k * 80} -470 L${-240 + k * 80} -400 Q${-280 + k * 80} -376 ${-320 + k * 80} -400 Z`} fill={k % 2 ? K.paper : K.coral} />)}
    <rect x={-310} y={-490} width={620} height={30} rx={10} fill={K.coralD} />
    <rect x={-300} y={-150} width={600} height={150} rx={10} fill={K.wood} /><rect x={-300} y={-160} width={600} height={24} rx={8} fill={K.woodD} />
    {children}
    {price && <g transform="translate(0 -330)"><rect x={-110} y={-48} width={220} height={96} rx={14} fill={K.ink} /><text y={22} textAnchor="middle" fill={priceColor} style={BB(68)}>{price}</text></g>}
  </g>
)
// ------------------------------------------------------------ a coin; a little boat with a fuel barrel
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={5} r={36} fill={K.sunD} /><circle r={36} fill={K.sun} /><circle r={26} fill="none" stroke={K.sunD} strokeWidth={4} opacity={0.7} />
    <text y={13} textAnchor="middle" fill={K.sunD} style={BB(text.length > 2 ? 28 : 40)}>{text}</text>
  </g>
)
export const Boat: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; fuel?: string; fuelColor?: string }> = ({ x, y, s = 1, o = 1, f, fuel, fuelColor = K.paper }) => (
  <g transform={`translate(${x} ${y + 6 * Math.sin(f / 14)}) rotate(${2 * Math.sin(f / 18)}) scale(${s})`} opacity={o}>
    <path d="M-220 -40 L220 -40 L170 40 L-170 40 Z" fill={K.coral} /><rect x={-220} y={-52} width={440} height={16} rx={6} fill={K.paper} />
    {[-140, -80, -20].map((mx, k) => <Mango key={k} x={mx} y={-70} s={0.6} r={k * 20} />)}
    <g transform="translate(110 -100)"><rect x={-44} y={-60} width={88} height={110} rx={14} fill={K.red} /><rect x={-44} y={-30} width={88} height={10} fill="#A73A30" /><rect x={-44} y={10} width={88} height={10} fill="#A73A30" />
      <text y={-2} textAnchor="middle" fill={K.paper} style={BB(30)}>FUEL</text></g>
    {fuel && <g transform="translate(110 -205)"><rect x={-64} y={-30} width={128} height={56} rx={12} fill={K.ink} /><text y={14} textAnchor="middle" fill={fuelColor} style={BB(40)}>{fuel}</text></g>}
  </g>
)
// ------------------------------------------------------------ the Fed room: lilac wall, columns, wood floor
export const FedRoom: React.FC<{ id: string; f: number; tint?: 'calm' | 'hot' | 'cold'; floor?: number }> = ({ id, f, tint = 'calm', floor = 930 }) => {
  const T = { calm: [K.lilac, '#EDE6FB'], hot: ['#F7B49A', '#FCE2D3'], cold: ['#BFDDF3', '#E8F4FC'] }[tint]
  return (
    <g>
      <defs><linearGradient id={`${id}-w`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={T[0]} /><stop offset="1" stopColor={T[1]} /></linearGradient></defs>
      <rect x={-200} y={-200} width={2400} height={1500} fill={`url(#${id}-w)`} />
      {[120, 520, 1400, 1800].map((cx) => <g key={cx}><rect x={cx - 50} y={60} width={100} height={floor - 60} fill="#FFFFFF" opacity={0.55} />{Array.from({ length: 4 }, (_, k) => <rect key={k} x={cx - 40 + k * 22} y={80} width={10} height={floor - 100} fill={K.lilacD} opacity={0.35} />)}<rect x={cx - 70} y={40} width={140} height={30} rx={6} fill="#FFFFFF" opacity={0.7} /></g>)}
      <rect x={-200} y={floor} width={2400} height={400} fill={K.woodD} />
      {Array.from({ length: 16 }, (_, k) => <rect key={k} x={-200 + k * 160} y={floor} width={156} height={400} fill={k % 2 ? '#8A5A39' : '#7C5032'} />)}
      <rect x={-200} y={floor - 6} width={2400} height={12} fill={K.plumD} opacity={0.6} />
      <g opacity={0.12 + 0.02 * Math.sin(f / 40)}><rect x={-200} y={-200} width={2400} height={1500} fill="#FFFFFF" /></g>
    </g>
  )
}
// ------------------------------------------------------------ the big brass thermostat dial: value (% inflation) sets the needle
// scale −2 … 16 across 240 degrees; the 2 % mark is drawn as the goal notch
export const Thermostat: React.FC<{ x: number; y: number; s?: number; o?: number; value: number; text?: string; goal?: number }> = ({ x, y, s = 1, o = 1, value, text, goal = 0 }) => {
  const ang = (v: number) => -210 + ((Math.max(-2, Math.min(16, v)) + 2) / 18) * 240
  const a = (ang(value) * Math.PI) / 180, g = (ang(2) * Math.PI) / 180
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <circle r={250} fill={K.brassD} transform="translate(8 10)" opacity={0.35} />
      <circle r={250} fill={K.brass} /><circle r={220} fill={K.paper} />
      {Array.from({ length: 19 }, (_, k) => { const t = ((-210 + (k / 18) * 240) * Math.PI) / 180, c = k < 2 ? K.sea : k > 6 ? K.coral : K.green
        return <line key={k} x1={180 * Math.cos(t)} y1={180 * Math.sin(t)} x2={205 * Math.cos(t)} y2={205 * Math.sin(t)} stroke={c} strokeWidth={k % 2 ? 4 : 8} /> })}
      <path d={`M${150 * Math.cos((-210 * Math.PI) / 180)} ${150 * Math.sin((-210 * Math.PI) / 180)} A150 150 0 0 1 ${150 * Math.cos(g)} ${150 * Math.sin(g)}`} fill="none" stroke={K.sea} strokeWidth={18} opacity={0.5} />
      <path d={`M${150 * Math.cos(g)} ${150 * Math.sin(g)} A150 150 0 0 1 ${150 * Math.cos((30 * Math.PI) / 180)} ${150 * Math.sin((30 * Math.PI) / 180)}`} fill="none" stroke={K.coral} strokeWidth={18} opacity={0.5} />
      {goal > 0 && <g opacity={goal}><circle cx={150 * Math.cos(g)} cy={150 * Math.sin(g)} r={30} fill={K.green} /><text x={150 * Math.cos(g)} y={150 * Math.sin(g) + 12} textAnchor="middle" fill={K.paper} style={BB(34)}>2%</text></g>}
      <line x1={0} y1={0} x2={165 * Math.cos(a)} y2={165 * Math.sin(a)} stroke={K.ink} strokeWidth={14} strokeLinecap="round" />
      <circle r={30} fill={K.ink} /><circle r={12} fill={K.brass} />
      {text && <text y={120} textAnchor="middle" fill={K.ink} style={BB(76)}>{text}</text>}
    </g>
  )
}
// ------------------------------------------------------------ a rate lever on a panel: value 0–6 %
export const Lever: React.FC<{ x: number; y: number; s?: number; o?: number; value: number; text?: string }> = ({ x, y, s = 1, o = 1, value, text }) => {
  const t = clamp01(value / 6), ang = lerp(60, -60, t)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-170} y={-60} width={340} height={120} rx={24} fill={K.plumD} /><rect x={-150} y={-40} width={300} height={80} rx={16} fill={K.plum} />
      <g transform={`rotate(${ang})`}><rect x={-12} y={-300} width={24} height={300} rx={12} fill="#C9CED6" /><circle cy={-300} r={46} fill={K.coral} /><circle cy={-306} r={16} fill="#FFFFFF" opacity={0.5} /></g>
      <circle r={36} fill={K.ink} />
      {text && <text y={140} textAnchor="middle" fill={K.ink} style={BB(64)}>{text}</text>}
    </g>
  )
}
// ------------------------------------------------------------ small things: a house, a car, a card (borrowing), a TV, a savings jar, an egg carton
export const House: React.FC<{ x: number; y: number; s?: number; o?: number; c?: string }> = ({ x, y, s = 1, o = 1, c = K.coral }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cy={6} rx={140} ry={12} fill="#000" opacity={0.12} />
    <rect x={-110} y={-160} width={220} height={160} fill={K.cream} /><path d="M-140 -150 L0 -270 L140 -150 Z" fill={c} />
    <rect x={-30} y={-90} width={60} height={90} rx={6} fill={K.wood} /><rect x={-90} y={-130} width={44} height={40} rx={4} fill={K.ice} /><rect x={46} y={-130} width={44} height={40} rx={4} fill={K.ice} />
  </g>
)
export const Car: React.FC<{ x: number; y: number; s?: number; o?: number; c?: string; f?: number }> = ({ x, y, s = 1, o = 1, c = K.sea, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cy={6} rx={170} ry={12} fill="#000" opacity={0.12} />
    <path d="M-160 -40 L-150 -90 L-80 -100 L-40 -150 L70 -150 L120 -100 L160 -90 L165 -40 Z" fill={c} />
    <path d="M-30 -140 L60 -140 L95 -102 L-60 -102 Z" fill={K.ice} />
    {[-95, 100].map((cx) => <g key={cx} transform={`translate(${cx} -32) rotate(${f * 4})`}><circle r={34} fill={K.ink} /><circle r={14} fill="#C9CED6" /><rect x={-3} y={-14} width={6} height={28} fill={K.ink2} /></g>)}
  </g>
)
export const Card: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-75} width={240} height={150} rx={16} fill={K.plum} /><rect x={-120} y={-40} width={240} height={30} fill={K.plumD} />
    <rect x={-90} y={10} width={50} height={36} rx={6} fill={K.brass} /><circle cx={70} cy={40} r={20} fill={K.coral} opacity={0.9} /><circle cx={92} cy={40} r={20} fill={K.sun} opacity={0.9} />
  </g>
)
export const TV: React.FC<{ x: number; y: number; s?: number; o?: number; price?: string; f: number }> = ({ x, y, s = 1, o = 1, price, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-230} width={340} height={210} rx={14} fill={K.ink} /><rect x={-152} y={-212} width={304} height={174} rx={8} fill={`hsl(${(f * 2) % 360} 45% 70%)`} />
    <rect x={-16} y={-20} width={32} height={30} fill={K.ink2} /><rect x={-90} y={8} width={180} height={14} rx={7} fill={K.ink2} />
    {price && <Tag x={220} y={-120} s={0.9} text={price} color={K.mint} />}
  </g>
)
export const Jar: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number; text?: string }> = ({ x, y, s = 1, o = 1, fill = 0.6, text }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cy={6} rx={120} ry={12} fill="#000" opacity={0.12} />
    <rect x={-100} y={-260} width={200} height={260} rx={40} fill="#E8F6F8" opacity={0.75} stroke="#9CC6CF" strokeWidth={6} />
    {Array.from({ length: Math.round(clamp01(fill) * 9) }, (_, k) => <ellipse key={k} cx={(k % 2) * 16 - 8} cy={-24 - k * 24} rx={70} ry={14} fill={k % 2 ? K.sun : K.sunD} />)}
    <rect x={-80} y={-290} width={160} height={40} rx={10} fill={K.brass} />
    {text && <g transform="translate(0 -120)"><rect x={-90} y={-34} width={180} height={64} rx={14} fill={K.paper} /><text y={16} textAnchor="middle" fill={K.ink} style={BB(46)}>{text}</text></g>}
  </g>
)
export const Eggs: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-50} width={260} height={60} rx={14} fill="#C9B79A" />
    {Array.from({ length: 6 }, (_, k) => <ellipse key={k} cx={-100 + k * 40} cy={-56} rx={18} ry={24} fill="#FFF3DD" stroke="#D8C39E" strokeWidth={3} />)}
  </g>
)
export { clamp01, lerp, rnd }
