// ============================================================
// LONG VIDEO — "Gyms Make Money From People Who Never Go" — objects for
// this story: the gym building, the floor plan of spots, treadmills,
// bikes, dumbbells, the member key tag, the monthly payment arrow from a
// bank card, a cinema row, the money pot and the bills of running a gym.
// The cast, headline and money helpers come from ../aimoney/common.
// One file per scene in this folder. No camera moves (owner r56): every
// change is the drawing itself transforming on its word.
// ============================================================
import React from 'react'
import { clamp01, lerp, P, rnd } from '../kit'

// # the gym's own colours: a warm orange brand stripe, rubber floor, steel machines
export const G = { brand: '#F08A3C', brandD: '#C96A22', floor: '#D8C9AE', floorD: '#BFAE8E', steel: '#8C99AD', steelD: '#5C6A80', rubber: '#2F3A4C', belt: '#3A4558', screen: '#5BCBFF', mat: '#4C6A8E' }

// ------------------------------------------------------------ the gym from outside
// # a single-storey gym: glass front, orange stripe, sign; lit 0–1 lights the windows; doors 0–1 opens them
export const GymFront: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number; doors?: number; sign?: string }> = ({ x, y, s = 1, o = 1, lit = 1, doors = 0, sign = 'GYM' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={10} rx={470} ry={26} fill="#000" opacity={0.14} />
    <rect x={-440} y={-330} width={880} height={330} rx={16} fill="#E9EEF5" />
    <rect x={-440} y={-330} width={880} height={64} rx={16} fill={G.brand} />
    <rect x={-440} y={-280} width={880} height={14} fill={G.brandD} />
    <text x={0} y={-282} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 10 }}>{sign}</text>
    {/* # glass windows with machines seen inside */}
    {[-330, -170, 170, 330].map((wx, k) => (
      <g key={k}>
        <rect x={wx - 70} y={-230} width={140} height={150} rx={8} fill={P.navy2} />
        <rect x={wx - 70} y={-230} width={140} height={150} rx={8} fill={P.gold} opacity={0.18 + 0.5 * lit} />
        <rect x={wx - 44} y={-130} width={88} height={14} rx={4} fill={G.rubber} opacity={0.8} />
        <rect x={wx + 20} y={-178} width={8} height={52} fill={G.steelD} opacity={0.8} />
        <path d={`M${wx - 70} -230 L${wx - 20} -230 L${wx - 70} -170 Z`} fill="#FFFFFF" opacity={0.25} />
      </g>
    ))}
    {/* # the double doors slide apart */}
    <rect x={-80} y={-200} width={160} height={200} rx={6} fill={P.navy1} />
    <rect x={-80} y={-200} width={160} height={200} rx={6} fill={P.gold} opacity={0.25 + 0.4 * lit} />
    <rect x={-80 - 70 * doors} y={-200} width={80} height={200} fill="#BFD6EA" opacity={0.85} stroke={G.steelD} strokeWidth={4} />
    <rect x={0 + 70 * doors} y={-200} width={80} height={200} fill="#BFD6EA" opacity={0.85} stroke={G.steelD} strokeWidth={4} />
  </g>
)

// ------------------------------------------------------------ machines
// # a treadmill seen from the front-left: base, belt, rails, console; run 0–1 makes the belt marks move, used 0–1 lights the screen
export const Treadmill: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; run?: number; used?: number }> = ({ x, y, s = 1, o = 1, f = 0, run = 0, used = 0 }) => {
  const off = ((f * 4 * run) % 40)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={12} rx={150} ry={18} fill="#000" opacity={0.16} />
      <path d="M-140 0 L130 0 L150 -34 L-120 -34 Z" fill={G.rubber} />
      <path d="M-128 -10 L120 -10 L136 -30 L-112 -30 Z" fill={G.belt} />
      {Array.from({ length: 7 }, (_, k) => <rect key={k} x={-110 + ((k * 40 + off) % 240)} y={-28} width={6} height={16} fill="#5C6A80" opacity={0.7} />)}
      <rect x={100} y={-200} width={14} height={170} rx={6} fill={G.steel} />
      <rect x={-20} y={-150} width={130} height={12} rx={6} fill={G.steel} />
      <rect x={60} y={-250} width={110} height={70} rx={12} fill={G.steelD} />
      <rect x={72} y={-240} width={86} height={46} rx={8} fill={G.screen} opacity={0.25 + 0.75 * used} />
    </g>
  )
}
// # an exercise bike
export const Bike: React.FC<{ x: number; y: number; s?: number; o?: number; used?: number }> = ({ x, y, s = 1, o = 1, used = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={100} ry={14} fill="#000" opacity={0.16} />
    <rect x={-90} y={-14} width={180} height={16} rx={8} fill={G.rubber} />
    <circle cx={50} cy={-70} r={46} fill="none" stroke={G.steelD} strokeWidth={12} />
    <path d="M-50 -10 L-20 -130 L50 -70" fill="none" stroke={G.steel} strokeWidth={14} strokeLinecap="round" />
    <rect x={-60} y={-146} width={70} height={20} rx={10} fill={G.rubber} />
    <path d="M50 -70 L70 -170" stroke={G.steel} strokeWidth={12} strokeLinecap="round" />
    <rect x={44} y={-196} width={70} height={30} rx={8} fill={G.steelD} />
    <rect x={52} y={-190} width={54} height={18} rx={5} fill={G.screen} opacity={0.25 + 0.75 * used} />
  </g>
)
// # a dumbbell
export const Dumbbell: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-8} width={120} height={16} rx={6} fill={G.steel} />
    <rect x={-90} y={-34} width={34} height={68} rx={10} fill={G.rubber} /><rect x={56} y={-34} width={34} height={68} rx={10} fill={G.rubber} />
    <rect x={-104} y={-24} width={16} height={48} rx={6} fill={G.rubber} /><rect x={88} y={-24} width={16} height={48} rx={6} fill={G.rubber} />
  </g>
)
// # a weight rack with dumbbells
export const Rack: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={170} ry={16} fill="#000" opacity={0.14} />
    <rect x={-160} y={-130} width={14} height={130} fill={G.steelD} /><rect x={146} y={-130} width={14} height={130} fill={G.steelD} />
    <rect x={-160} y={-120} width={320} height={12} rx={5} fill={G.steel} /><rect x={-160} y={-56} width={320} height={12} rx={5} fill={G.steel} />
    {[-110, -10, 90].map((dx) => <g key={dx}><Dumbbell x={dx + 10} y={-138} s={0.36} /><Dumbbell x={dx + 10} y={-74} s={0.42} /></g>)}
  </g>
)

// ------------------------------------------------------------ the floor plan: 300 spots
// # the gym floor seen from above: a rounded slab with a grid of n spot circles; taken 0–1 fills spots in order,
// # crowd (≥ 1) draws that many extra member dots squeezed around each spot (the "24 per spot" picture)
export const FloorPlan: React.FC<{ x: number; y: number; w: number; h: number; cols: number; rows: number; o?: number; taken?: number; crowd?: number; f?: number; tilt?: number }> = ({ x, y, w, h, cols, rows, o = 1, taken = 0, crowd = 0, f = 0, tilt = 0 }) => {
  const n = cols * rows, dx = w / cols, dy = h / rows, r = Math.min(dx, dy) * 0.3
  const k1 = Math.round(clamp01(taken) * n)
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <rect x={-w / 2 - 30} y={-h / 2 - 30 + 16} width={w + 60} height={h + 60} rx={30} fill="#000" opacity={0.12} />
      <rect x={-w / 2 - 30} y={-h / 2 - 30} width={w + 60} height={h + 60} rx={30} fill={G.floor} stroke={G.floorD} strokeWidth={6} />
      {Array.from({ length: n }, (_, i) => {
        const cx = -w / 2 + dx * ((i % cols) + 0.5), cy = -h / 2 + dy * (Math.floor(i / cols) + 0.5)
        return <circle key={i} cx={cx} cy={cy} r={r} fill={i < k1 ? G.brand : 'none'} stroke={i < k1 ? G.brandD : G.floorD} strokeWidth={2.5} />
      })}
      {crowd > 0 && Array.from({ length: Math.min(900, Math.round(crowd)) }, (_, i) => {
        const a = rnd(i * 3.1) * Math.PI * 2, d = 0.6 + rnd(i * 5.7) * 0.9, j = Math.floor(rnd(i * 1.3) * n)
        const cx = -w / 2 + dx * ((j % cols) + 0.5) + Math.cos(a) * dx * 0.45 * d, cy = -h / 2 + dy * (Math.floor(j / cols) + 0.5) + Math.sin(a) * dy * 0.45 * d + Math.sin(f / 6 + i) * tilt
        return <circle key={`m${i}`} cx={cx} cy={cy} r={r * 0.55} fill={['#5BCBFF', '#F06B5B', '#3DDC97', '#E9C25A', '#B98CE0'][i % 5]} opacity={0.9} />
      })}
    </g>
  )
}

// ------------------------------------------------------------ the member key tag + the monthly payment
// # the plastic key tag a member gets on joining
export const KeyTag: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string; color?: string }> = ({ x, y, s = 1, r = 0, o = 1, text = 'MEMBER', color = G.brand }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-62} width={300} height={124} rx={60} fill="#000" opacity={0.18} transform="translate(6 8)" />
    <rect x={-150} y={-62} width={300} height={124} rx={60} fill={color} />
    <circle cx={-104} cy={0} r={18} fill="none" stroke="#FFFFFF" strokeWidth={8} />
    <text x={20} y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 4 }}>{text}</text>
    <rect x={-60} y={34} width={160} height={10} rx={5} fill="#FFFFFF" opacity={0.5} />
  </g>
)
// # a bank card that pays: drawn flat, slightly tilted
export const BankCard: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-160} y={-100} width={320} height={200} rx={22} fill="#000" opacity={0.18} transform="translate(8 10)" />
    <rect x={-160} y={-100} width={320} height={200} rx={22} fill={P.navy3} />
    <rect x={-160} y={-56} width={320} height={34} fill={P.navy0} opacity={0.6} />
    <rect x={-128} y={4} width={56} height={42} rx={8} fill={P.gold} />
    <text x={120} y={74} textAnchor="end" fill={P.champL} style={{ font: '500 26px "JetBrains Mono"' }}>•••• 4821</text>
  </g>
)

// ------------------------------------------------------------ the cinema comparison
// # a row of cinema seats; filled 0–n shows that many seated viewers (one per seat, never more)
export const SeatRow: React.FC<{ x: number; y: number; n: number; filled: number; s?: number; o?: number }> = ({ x, y, n, filled, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: n }, (_, k) => {
      const sx = (k - (n - 1) / 2) * 110
      return (
        <g key={k}>
          <rect x={sx - 46} y={-110} width={92} height={110} rx={18} fill="#B4423A" />
          <rect x={sx - 52} y={-30} width={104} height={34} rx={12} fill="#8E2F29" />
          {k < Math.round(filled) && <g><circle cx={sx} cy={-128} r={26} fill={['#E8B48A', '#B07A55', '#F1C9A5', '#8A5A3C'][k % 4]} /><rect x={sx - 30} y={-104} width={60} height={70} rx={20} fill={['#5BCBFF', '#3DDC97', '#E9C25A', '#F06B5B'][k % 4]} /></g>}
        </g>
      )
    })}
  </g>
)
// # a cinema ticket
export const Ticket: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string }> = ({ x, y, s = 1, r = 0, o = 1, text = 'SEAT' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M-110 -50 L110 -50 L110 -14 A14 14 0 0 0 110 14 L110 50 L-110 50 L-110 14 A14 14 0 0 0 -110 -14 Z" fill="#F3D27A" stroke="#B88A2E" strokeWidth={4} />
    <line x1={50} y1={-46} x2={50} y2={46} stroke="#B88A2E" strokeWidth={3} strokeDasharray="6 6" />
    <text x={-30} y={14} textAnchor="middle" fill="#7A5A16" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>
  </g>
)

// ------------------------------------------------------------ the running costs of a gym
// # one bill card with a drawn icon: rent (building), machines (treadmill), staff (badge), power (bolt)
export const BillCard: React.FC<{ x: number; y: number; kind: 'rent' | 'machines' | 'staff' | 'power'; s?: number; o?: number; label?: string }> = ({ x, y, kind, s = 1, o = 1, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-130} width={220} height={260} rx={20} fill="#000" opacity={0.12} transform="translate(6 8)" />
    <rect x={-110} y={-130} width={220} height={260} rx={20} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <rect x={-110} y={-130} width={220} height={40} rx={20} fill={P.navy3} />
    {kind === 'rent' && <g><path d="M-60 40 L-60 -40 L0 -80 L60 -40 L60 40 Z" fill={G.steel} /><rect x={-16} y={0} width={32} height={40} fill={P.navy2} /><rect x={-44} y={-36} width={24} height={24} fill={P.gold} opacity={0.7} /><rect x={20} y={-36} width={24} height={24} fill={P.gold} opacity={0.7} /></g>}
    {kind === 'machines' && <Treadmill x={-14} y={44} s={0.42} used={1} />}
    {kind === 'staff' && <g><circle cx={0} cy={-42} r={28} fill="#E8B48A" /><path d="M-48 40 Q-48 -10 0 -10 Q48 -10 48 40 Z" fill={G.brand} /><rect x={-16} y={4} width={32} height={20} rx={4} fill="#FFFFFF" /></g>}
    {kind === 'power' && <path d="M14 -80 L-36 6 L-4 6 L-18 70 L40 -20 L6 -20 Z" fill={P.gold} stroke={P.goldD} strokeWidth={4} />}
    {label && <text x={0} y={108} textAnchor="middle" fill="#16294A" style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>}
  </g>
)

// ------------------------------------------------------------ the gym's money pot
// # a big glass pot with coins up to fill 0–1
export const Pot: React.FC<{ x: number; y: number; s?: number; o?: number; fill: number; label?: string }> = ({ x, y, s = 1, o = 1, fill, label }) => {
  const h = 260 * clamp01(fill)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={10} rx={170} ry={20} fill="#000" opacity={0.14} />
      <path d="M-150 -300 L150 -300 L130 0 L-130 0 Z" fill="#DDEBF7" opacity={0.45} stroke="#A9C4DE" strokeWidth={6} />
      <path d={`M${-130 - 20 * (h / 300)} ${-h} L${130 + 20 * (h / 300)} ${-h} L130 0 L-130 0 Z`} fill={P.gold} />
      {Array.from({ length: Math.round(h / 34) }, (_, r) => Array.from({ length: 5 }, (_, k) => <ellipse key={`${r}-${k}`} cx={-96 + k * 48 + (r % 2) * 20} cy={-16 - r * 34} rx={22} ry={8} fill={P.goldD} opacity={0.55} />))}
      <rect x={-170} y={-334} width={340} height={40} rx={14} fill={P.navy3} />
      {label && <text x={0} y={-304} textAnchor="middle" fill={P.white} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>{label}</text>}
    </g>
  )
}

// ------------------------------------------------------------ the day dial: hours packed at full
// # a half-ring from dawn to night that fills in hour by hour (t 0–1 of `hours` out of 24)
export const DayDial: React.FC<{ x: number; y: number; r: number; hours: number; t: number; o?: number }> = ({ x, y, r, hours, t, o = 1 }) => {
  const seg = 24, lit = Math.round(hours * clamp01(t))
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      {Array.from({ length: seg }, (_, k) => {
        const a0 = Math.PI + (k / seg) * Math.PI, a1 = Math.PI + ((k + 0.86) / seg) * Math.PI
        const p = (a: number, rr: number) => `${Math.cos(a) * rr} ${Math.sin(a) * rr}`
        const on = k >= 5 && k < 5 + lit
        return <path key={k} d={`M${p(a0, r)} A${r} ${r} 0 0 1 ${p(a1, r)} L${p(a1, r * 0.72)} A${r * 0.72} ${r * 0.72} 0 0 0 ${p(a0, r * 0.72)} Z`} fill={on ? G.brand : G.floor} stroke={on ? G.brandD : G.floorD} strokeWidth={2} />
      })}
      <circle cx={-r - 40} cy={10} r={26} fill={P.gold} /><circle cx={r + 40} cy={10} r={24} fill="#C9D3E6" /><circle cx={r + 50} cy={2} r={20} fill={'var(--cc-bg0, #F8EFDF)'} />
    </g>
  )
}

// # a speech-free "zzz" for a member asleep on the sofa at home
export const Zzz: React.FC<{ x: number; y: number; f: number; o?: number }> = ({ x, y, f, o = 1 }) => (
  <g opacity={o}>{[0, 1, 2].map((k) => { const t = ((f / 40 + k / 3) % 1); return <text key={k} x={x + t * 50} y={y - t * 90} fill={P.ink2} opacity={(1 - t) * 0.9} style={{ font: `400 ${30 + k * 8}px "Bebas Neue"` }}>Z</text> })}</g>
)
// # a sofa (the member at home)
export const Sofa: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = '#7A8FB8' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={10} rx={230} ry={20} fill="#000" opacity={0.14} />
    <rect x={-210} y={-170} width={420} height={110} rx={36} fill={color} />
    <rect x={-230} y={-90} width={460} height={90} rx={30} fill={color} />
    <rect x={-250} y={-130} width={60} height={130} rx={26} fill={color} opacity={0.85} /><rect x={190} y={-130} width={60} height={130} rx={26} fill={color} opacity={0.85} />
    <rect x={-180} y={-90} width={360} height={30} rx={14} fill="#FFFFFF" opacity={0.18} />
  </g>
)
// ------------------------------------------------------------ the one object that splits (owner r42)
// # a money bar of width w that splits into n equal parts (gap grows with t); one label rides the first part
export const SplitBar: React.FC<{ x: number; y: number; w: number; h?: number; n: number; t: number; o?: number; color?: string; each?: string; total?: string }> = ({ x, y, w, h = 110, n, t, o = 1, color = '#7FC98A', each, total }) => {
  const k = Math.max(1, Math.round(n)), gap = 18 * clamp01(t), pw = (w - gap * (k - 1)) / k
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <rect x={-w / 2} y={-h / 2 + 10} width={w} height={h} rx={16} fill="#000" opacity={0.12} />
      {Array.from({ length: k }, (_, i) => <g key={i}><rect x={-w / 2 + i * (pw + gap)} y={-h / 2} width={pw} height={h} rx={k > 1 ? 12 : 16} fill={color} stroke="#3E8A4E" strokeWidth={4} />
        {k <= 15 && <text x={-w / 2 + i * (pw + gap) + pw / 2} y={14} textAnchor="middle" fill="#1F5A2E" opacity={0.55} style={{ font: `400 ${Math.min(44, pw * 0.6)}px "Bebas Neue"` }}>$</text>}</g>)}
      {total && <text x={0} y={-h / 2 - 24} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 2 }}>{total}</text>}
      {each && <text x={Math.max(-w / 2 + pw / 2, -w / 2 + each.length * 14)} y={h / 2 + 64} textAnchor="middle" fill={P.goldInk} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>{each}</text>}
    </g>
  )
}
// # a 10-visit punch card; punched 0–10 holes punched
export const PunchCard: React.FC<{ x: number; y: number; s?: number; o?: number; punched?: number; r?: number }> = ({ x, y, s = 1, o = 1, punched = 0, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-210} y={-120} width={420} height={240} rx={22} fill="#000" opacity={0.14} transform="translate(6 8)" />
    <rect x={-210} y={-120} width={420} height={240} rx={22} fill={P.paper} stroke={P.edge} strokeWidth={4} />
    <rect x={-210} y={-120} width={420} height={60} rx={22} fill={G.brand} />
    <text x={0} y={-76} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 4 }}>10 VISITS</text>
    {Array.from({ length: 10 }, (_, k) => <circle key={k} cx={-160 + (k % 5) * 80} cy={-4 + Math.floor(k / 5) * 70} r={24} fill={k < punched ? 'var(--cc-bg1, #E6D5B8)' : 'none'} stroke={G.brandD} strokeWidth={4} />)}
  </g>
)
// # a thought cloud above a head (cx, cy = cloud centre); children drawn inside
export const Thought: React.FC<{ x: number; y: number; w?: number; h?: number; o?: number; children?: React.ReactNode }> = ({ x, y, w = 360, h = 220, o = 1, children }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={w / 2} ry={h / 2} fill={P.paper} stroke={P.edge} strokeWidth={4} />
    <circle cx={-w * 0.3} cy={h * 0.62} r={22} fill={P.paper} stroke={P.edge} strokeWidth={3} /><circle cx={-w * 0.38} cy={h * 0.86} r={12} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    {children}
  </g>
)
// # a row of visit ticks (one per visit) under a month strip; n ticks shown, of `of` days
export const VisitStrip: React.FC<{ x: number; y: number; n: number; of?: number; o?: number; w?: number }> = ({ x, y, n, of = 30, o = 1, w = 900 }) => {
  const d = w / of
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <rect x={-w / 2 - 14} y={-34} width={w + 28} height={68} rx={18} fill={P.card} stroke={P.edge} strokeWidth={3} />
      {Array.from({ length: of }, (_, k) => {
        const on = Math.round(n) > 0 && k % Math.max(1, Math.floor(of / Math.max(1, Math.round(n)))) === 0 && Math.floor(k / Math.max(1, Math.floor(of / Math.max(1, Math.round(n))))) < Math.round(n)
        return <circle key={k} cx={-w / 2 + d * (k + 0.5)} cy={0} r={Math.min(12, d * 0.36)} fill={on ? G.brand : 'none'} stroke={on ? G.brandD : P.ink2} strokeWidth={2} opacity={on ? 1 : 0.4} />
      })}
    </g>
  )
}
// # a see-saw: tilt -1..1 (positive = right side down)
export const SeeSaw: React.FC<{ x: number; y: number; w?: number; tilt: number; o?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, w = 700, tilt, o = 1, left, right }) => {
  const a = tilt * 14
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <path d="M-60 120 L60 120 L0 0 Z" fill={P.navy3} />
      <g transform={`rotate(${a})`}>
        <rect x={-w / 2} y={-16} width={w} height={24} rx={10} fill={G.steelD} />
        <g transform={`translate(${-w / 2 + 110} -16)`}>{left}</g>
        <g transform={`translate(${w / 2 - 110} -16)`}>{right}</g>
      </g>
    </g>
  )
}
// # a small gym icon (for a map of many clubs)
export const MiniGym: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-40} y={-50} width={80} height={50} rx={6} fill="#E9EEF5" />
    <rect x={-40} y={-50} width={80} height={12} rx={4} fill={G.brand} />
    <rect x={-28} y={-32} width={20} height={18} fill={P.gold} opacity={0.2 + 0.6 * lit} /><rect x={8} y={-32} width={20} height={18} fill={P.gold} opacity={0.2 + 0.6 * lit} />
  </g>
)
// # a folded towel
export const Towel: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-40} width={160} height={40} rx={10} fill="#FFFFFF" stroke="#CFD8E3" strokeWidth={4} />
    <rect x={-80} y={-70} width={160} height={34} rx={10} fill="#EAF2FA" stroke="#CFD8E3" strokeWidth={4} />
    <rect x={-80} y={-56} width={160} height={6} fill={G.brand} opacity={0.6} />
  </g>
)
// # members queuing: x of the k-th person in a line that starts at x
export const queueX = (x: number, k: number, gap = 70) => lerp(x, x - gap * k, 1)
