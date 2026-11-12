// # Shared drawings for "How the Economy Actually Works" (basic economics).
// Every prop is drawn around its own origin (usually the bottom centre) so a scene can place,
// scale and animate it with one transform. Colours follow the house palette (P) + a few food colours.
import React from 'react'
import { P } from '../kit'

export const TXT = (size: number, w = 400): React.CSSProperties => ({ font: `${w} ${size}px "Bebas Neue"`, letterSpacing: 1 })
export const RED = '#E5634F', RED_D = '#B7402F', GREEN = '#3DBE84', GREEN_D = '#23935F', LEMON = '#F6D54A', LEMON_D = '#D9A92A'
export const SKY = '#7CC4E6', WOOD = '#B9814E', WOOD_D = '#8E5B3A', CREAM = '#FFF6E2'

// ---------------------------------------------------------------- an egg (with a soft highlight)
export const Egg: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M0 -46 C26 -46 38 -10 38 8 C38 30 21 44 0 44 C-21 44 -38 30 -38 8 C-38 -10 -26 -46 0 -46 Z" fill="#FFF3DC" stroke="#D9C2A0" strokeWidth={3} />
    <ellipse cx={-12} cy={-14} rx={8} ry={14} fill="#FFFFFF" opacity={0.8} />
  </g>
)

// ---------------------------------------------------------------- a carton of a dozen eggs, `n` eggs still in it (0–12)
export const Carton: React.FC<{ x: number; y: number; s?: number; o?: number; n?: number }> = ({ x, y, s = 1, o = 1, n = 12 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: 12 }, (_, k) => k < n ? <Egg key={k} x={-165 + (k % 6) * 66} y={-70 - Math.floor(k / 6) * 34} s={0.62} /> : null)}
    <path d="M-210 -60 L210 -60 L186 0 L-186 0 Z" fill="#C9B18A" stroke="#9C8460" strokeWidth={5} />
    {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M${-195 + k * 66} -60 q33 30 66 0`} fill="none" stroke="#9C8460" strokeWidth={4} />)}
  </g>
)

// ---------------------------------------------------------------- a hen (side view), `peck` 0–1 bobs the head, `ghost` fades her to a grey outline
export const Hen: React.FC<{ x: number; y: number; s?: number; o?: number; peck?: number; flip?: boolean; ghost?: number }> = ({ x, y, s = 1, o = 1, peck = 0, flip, ghost = 0 }) => {
  const body = ghost > 0.5 ? '#D8D2C6' : '#FFFFFF'
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o * (1 - 0.6 * ghost)}>
      <path d="M-14 0 L-14 -30 M14 0 L14 -30" stroke="#E0A23A" strokeWidth={7} strokeLinecap="round" />
      <path d="M-70 -70 C-70 -120 -10 -130 30 -110 C60 -96 66 -60 50 -40 C30 -24 -40 -22 -60 -40 C-66 -48 -70 -58 -70 -70 Z" fill={body} stroke="#CBB89A" strokeWidth={4} />
      <path d="M-70 -78 L-100 -104 L-92 -66 Z" fill={body} stroke="#CBB89A" strokeWidth={4} />
      <path d="M-30 -84 C-10 -96 14 -90 18 -70" fill="none" stroke="#CBB89A" strokeWidth={4} />
      <g transform={`translate(0 ${14 * peck}) rotate(${18 * peck} 40 -110)`}>
        <circle cx={44} cy={-124} r={24} fill={body} stroke="#CBB89A" strokeWidth={4} />
        <path d="M36 -146 q6 -16 12 0 q6 -16 12 0 q2 8 -6 10 z" fill={ghost > 0.5 ? '#B9B3A8' : RED} />
        <path d="M66 -126 L84 -120 L66 -112 Z" fill="#E0A23A" />
        <circle cx={52} cy={-128} r={4} fill={P.ink} />
        <path d="M60 -112 q4 12 -4 16" fill={ghost > 0.5 ? '#B9B3A8' : RED} />
      </g>
    </g>
  )
}

// ---------------------------------------------------------------- a red barn / hen house
export const Barn: React.FC<{ x: number; y: number; s?: number; o?: number; dim?: number }> = ({ x, y, s = 1, o = 1, dim = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-220 0 L-220 -230 L0 -370 L220 -230 L220 0 Z" fill="#C94A3E" stroke="#9C3328" strokeWidth={6} />
    <path d="M-250 -220 L0 -390 L250 -220" fill="none" stroke="#F3EAD8" strokeWidth={22} strokeLinejoin="round" />
    <rect x={-80} y={-190} width={160} height={190} fill="#8E3328" stroke="#F3EAD8" strokeWidth={10} />
    <path d="M-80 -190 L80 0 M80 -190 L-80 0" stroke="#F3EAD8" strokeWidth={8} />
    <circle cx={0} cy={-280} r={34} fill="#F3EAD8" /><circle cx={0} cy={-280} r={22} fill="#6E2A22" />
    {dim > 0 && <path d="M-220 0 L-220 -230 L0 -370 L220 -230 L220 0 Z" fill={P.navy1} opacity={0.45 * dim} />}
  </g>
)

// ---------------------------------------------------------------- a germ (bird flu virus), spiky round blob
export const Germ: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number }> = ({ x, y, s = 1, o = 1, f = 0 }) => (
  <g transform={`translate(${x} ${y + 6 * Math.sin(f / 9)}) rotate(${f * 1.5}) scale(${s})`} opacity={o}>
    {Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2; return <g key={k}><line x1={0} y1={0} x2={Math.cos(a) * 46} y2={Math.sin(a) * 46} stroke="#7A9F3A" strokeWidth={6} /><circle cx={Math.cos(a) * 48} cy={Math.sin(a) * 48} r={8} fill="#9BC34E" /></g> })}
    <circle r={32} fill="#9BC34E" stroke="#7A9F3A" strokeWidth={5} />
    <circle cx={-10} cy={-8} r={6} fill="#7A9F3A" /><circle cx={10} cy={8} r={5} fill="#7A9F3A" />
  </g>
)

// ---------------------------------------------------------------- a price tag hung from a string; `col` = tag colour
export const Tag: React.FC<{ x: number; y: number; t: string; s?: number; o?: number; r?: number; col?: string; ink?: string; w?: number }> = ({ x, y, t, s = 1, o = 1, r = -6, col = '#F4C95D', ink = P.ink, w }) => {
  const W = w ?? Math.max(170, t.length * 34 + 70)
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <path d={`M${-W / 2 + 34} -50 L${W / 2} -50 L${W / 2} 50 L${-W / 2 + 34} 50 L${-W / 2} 0 Z`} fill={col} stroke="rgba(0,0,0,0.18)" strokeWidth={4} strokeLinejoin="round" />
      <circle cx={-W / 2 + 32} cy={0} r={9} fill={CREAM} stroke="rgba(0,0,0,0.25)" strokeWidth={3} />
      <text x={17} y={22} textAnchor="middle" fill={ink} style={TXT(66)}>{t}</text>
    </g>
  )
}

// ---------------------------------------------------------------- a lemonade stand; `price` on the board, `stock` 0–1 shows the jug level
export const LemonStand: React.FC<{ x: number; y: number; s?: number; o?: number; price?: string; stock?: number; tint?: string }> = ({ x, y, s = 1, o = 1, price = '$1', stock = 1, tint = '#F28C6B' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-330} width={14} height={330} fill={WOOD_D} /><rect x={136} y={-330} width={14} height={330} fill={WOOD_D} />
    {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M${-170 + k * 56.6} -330 L${-170 + (k + 1) * 56.6} -330 L${-170 + (k + 1) * 56.6} -300 Q${-170 + (k + 0.5) * 56.6} -270 ${-170 + k * 56.6} -300 Z`} fill={k % 2 ? CREAM : tint} />)}
    <rect x={-170} y={-150} width={340} height={150} rx={8} fill={WOOD} stroke={WOOD_D} strokeWidth={5} />
    <rect x={-170} y={-162} width={340} height={22} rx={6} fill={WOOD_D} />
    <rect x={-70} y={-120} width={140} height={86} rx={10} fill={CREAM} stroke={WOOD_D} strokeWidth={4} />
    <text x={0} y={-54} textAnchor="middle" fill={P.ink} style={TXT(70)}>{price}</text>
    {/* the jug on the counter */}
    <g transform="translate(110 -162)">
      <path d="M-34 0 L-40 -92 L40 -92 L34 0 Z" fill="#E8F4FA" stroke="#9CC4D6" strokeWidth={4} opacity={0.9} />
      <path d={`M-34 0 L${-34 - 6 * stock} ${-80 * stock} L${34 + 6 * stock} ${-80 * stock} L34 0 Z`} fill={LEMON} opacity={0.9} />
      <path d="M40 -76 q26 6 20 34 q-4 14 -22 12" fill="none" stroke="#9CC4D6" strokeWidth={6} />
    </g>
  </g>
)

// ---------------------------------------------------------------- a cup of lemonade
export const Cup: React.FC<{ x: number; y: number; s?: number; o?: number; full?: number }> = ({ x, y, s = 1, o = 1, full = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-26 0 L-32 -76 L32 -76 L26 0 Z" fill="#FFFFFF" stroke="#C8D6DE" strokeWidth={4} />
    <path d={`M-27 -6 L${-27 - 4 * full} ${-6 - 60 * full} L${27 + 4 * full} ${-6 - 60 * full} L27 -6 Z`} fill={LEMON} />
    <circle cx={18} cy={-76} r={16} fill={LEMON} stroke={LEMON_D} strokeWidth={4} /><circle cx={18} cy={-76} r={7} fill="#FFF3A8" />
  </g>
)

// ---------------------------------------------------------------- a block of 10 cups (one stacked row), used to count cups by tens
export const CupRow: React.FC<{ x: number; y: number; s?: number; o?: number; glow?: number }> = ({ x, y, s = 1, o = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-176} y={-84} width={352} height={92} rx={18} fill={P.gold} opacity={0.35 * glow} />}
    {Array.from({ length: 5 }, (_, k) => <Cup key={k} x={-140 + k * 70} y={0} s={0.9} />)}
  </g>
)

// ---------------------------------------------------------------- a palm tree with `n` coconuts (0–10)
export const Palm: React.FC<{ x: number; y: number; s?: number; o?: number; n?: number; f?: number }> = ({ x, y, s = 1, o = 1, n = 10, f = 0 }) => {
  const sway = 3 * Math.sin(f / 40)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d={`M-18 0 Q-30 -200 ${10 + sway} -420 L${38 + sway} -420 Q10 -200 18 0 Z`} fill="#A0703F" />
      {[0, 1, 2, 3, 4, 5].map((k) => <path key={k} d={`M0 -110 q-8 -4 -16 0`} transform={`translate(${k * 3} ${-k * 60})`} stroke="#7D5530" strokeWidth={4} fill="none" />)}
      <g transform={`translate(${24 + sway} -420) rotate(${sway})`}>
        {[-150, -110, -60, -20, 25, 70].map((a, k) => <path key={k} transform={`rotate(${a})`} d="M0 0 Q90 -60 190 10 Q100 -20 0 10 Z" fill={k % 2 ? '#3FA36B' : '#2E8A57'} />)}
        {Array.from({ length: 10 }, (_, k) => k < n ? <circle key={k} cx={-46 + (k % 5) * 23} cy={20 + Math.floor(k / 5) * 26} r={15} fill="#7A4E2A" stroke="#5B3820" strokeWidth={3} /> : null)}
      </g>
    </g>
  )
}

// ---------------------------------------------------------------- a stack of dollar bills, `n` bundles high
export const Cash: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; label?: string }> = ({ x, y, n, s = 1, o = 1, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: n }, (_, k) => <g key={k} transform={`translate(${(k % 2) * 6 - 3} ${-k * 26})`}>
      <rect x={-90} y={-26} width={180} height={26} rx={5} fill="#7FC495" stroke="#4E9A6A" strokeWidth={3} />
      <rect x={-22} y={-26} width={44} height={26} fill="#E9D9A6" opacity={0.9} />
    </g>)}
    {label && <text x={0} y={-n * 26 - 22} textAnchor="middle" fill={P.ink} style={TXT(58)}>{label}</text>}
  </g>
)

// ---------------------------------------------------------------- a money printing press; `run` 0–1 spins the rollers, bills come out the front
export const Press: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; run?: number }> = ({ x, y, s = 1, o = 1, f = 0, run = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-220} width={340} height={200} rx={18} fill="#5C6F8E" stroke="#3E4E69" strokeWidth={6} />
    <rect x={-190} y={-30} width={380} height={30} rx={8} fill="#3E4E69" />
    {[-70, 70].map((cx) => <g key={cx} transform={`translate(${cx} -130) rotate(${f * 8 * run})`}><circle r={56} fill="#8BA0BF" stroke="#3E4E69" strokeWidth={6} /><rect x={-6} y={-50} width={12} height={100} fill="#3E4E69" /></g>)}
    <rect x={-120} y={-250} width={240} height={34} rx={8} fill="#3E4E69" />
    {run > 0 && [0, 1, 2].map((k) => { const t = ((f * 0.04 * run + k / 3) % 1); return <rect key={k} x={170 + 220 * t} y={-40 - 60 * t + 120 * t * t} width={90} height={44} rx={5} fill="#7FC495" stroke="#4E9A6A" strokeWidth={3} opacity={run * (1 - t)} transform={`rotate(${30 * t} ${215 + 220 * t} ${-18})`} /> })}
  </g>
)

// ---------------------------------------------------------------- a petrol pump with a price screen
export const Pump: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = '' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-300} width={160} height={300} rx={16} fill={RED} stroke={RED_D} strokeWidth={6} />
    <rect x={-58} y={-270} width={116} height={70} rx={8} fill="#1D2A44" />
    <text x={0} y={-218} textAnchor="middle" fill="#7DF0B0" style={TXT(48)}>{t}</text>
    <rect x={-50} y={-180} width={100} height={60} rx={6} fill="#FFFFFF" opacity={0.85} />
    <path d="M80 -220 q60 0 60 80 l0 80" fill="none" stroke="#2B2B2B" strokeWidth={10} />
    <rect x={124} y={-80} width={34} height={60} rx={6} fill="#2B2B2B" />
  </g>
)

// ---------------------------------------------------------------- a gauge with a needle; v 0–1 sweeps left→right; zones green→red
export const Gauge: React.FC<{ x: number; y: number; s?: number; o?: number; v: number; t?: string }> = ({ x, y, s = 1, o = 1, v, t }) => {
  const a = Math.PI * (1 - Math.max(0, Math.min(1, v)))
  const arc = (a0: number, a1: number, col: string) => <path d={`M${200 * Math.cos(a0)} ${-200 * Math.sin(a0)} A200 200 0 0 1 ${200 * Math.cos(a1)} ${-200 * Math.sin(a1)}`} fill="none" stroke={col} strokeWidth={46} />
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d="M-250 0 A250 250 0 0 1 250 0 Z" fill={CREAM} stroke="#D6C7A6" strokeWidth={6} />
      {arc(Math.PI, Math.PI * 0.66, GREEN)}{arc(Math.PI * 0.66, Math.PI * 0.33, LEMON)}{arc(Math.PI * 0.33, 0, RED)}
      <line x1={0} y1={0} x2={170 * Math.cos(a)} y2={-170 * Math.sin(a)} stroke={P.ink} strokeWidth={12} strokeLinecap="round" />
      <circle r={22} fill={P.ink} />
      {t && <text x={0} y={-60} textAnchor="middle" fill="#16294A" style={TXT(70)}>{t}</text>}
    </g>
  )
}

// ---------------------------------------------------------------- a small cinema front with a marquee
export const Cinema: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-330} width={340} height={330} rx={10} fill="#6A4C93" />
    <rect x={-200} y={-250} width={400} height={80} rx={10} fill="#2F2A4A" />
    {Array.from({ length: 12 }, (_, k) => <circle key={k} cx={-180 + k * 32.7} cy={-258} r={7} fill={lit > 0.5 ? '#FFE48A' : '#8C8476'} />)}
    <text x={0} y={-192} textAnchor="middle" fill={lit > 0.5 ? '#FFE48A' : '#B9B3A8'} style={TXT(58)}>MOVIES</text>
    <rect x={-60} y={-140} width={120} height={140} rx={8} fill="#2F2A4A" />
    <rect x={-150} y={-140} width={60} height={90} rx={6} fill="#F4C95D" opacity={0.6 + 0.4 * lit} /><rect x={90} y={-140} width={60} height={90} rx={6} fill="#7CC4E6" opacity={0.6 + 0.4 * lit} />
  </g>
)

// ---------------------------------------------------------------- a field of crops: kind 0 = wheat (gold), 1 = corn (green+yellow)
export const Field: React.FC<{ x: number; y: number; s?: number; o?: number; kind: number; grow?: number }> = ({ x, y, s = 1, o = 1, kind, grow = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-300 0 L300 0 L240 -70 L-240 -70 Z" fill="#8E6A44" />
    {Array.from({ length: 9 }, (_, k) => {
      const cx = -240 + k * 60, h = (kind ? 170 : 130) * grow
      return kind
        ? <g key={k}><line x1={cx} y1={-30} x2={cx} y2={-30 - h} stroke="#3FA36B" strokeWidth={8} /><ellipse cx={cx + 12} cy={-30 - h * 0.6} rx={10} ry={26} fill={LEMON} /><path d={`M${cx} ${-30 - h * 0.4} q-30 -10 -40 -40`} stroke="#3FA36B" strokeWidth={6} fill="none" /></g>
        : <g key={k}><line x1={cx} y1={-30} x2={cx} y2={-30 - h} stroke="#D9A92A" strokeWidth={6} /><ellipse cx={cx} cy={-30 - h} rx={11} ry={30} fill="#E9C25A" /></g>
    })}
  </g>
)

// ---------------------------------------------------------------- a cafe shop front; `lit` 0–1 dims it
export const Cafe: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-200} y={-300} width={400} height={300} rx={10} fill="#E8D5B5" />
    {Array.from({ length: 7 }, (_, k) => <path key={k} d={`M${-220 + k * 62.8} -300 l62.8 0 l0 36 q-31.4 30 -62.8 0 z`} fill={k % 2 ? CREAM : '#3FA36B'} />)}
    <text x={0} y={-310} textAnchor="middle" fill={P.ink} style={TXT(60)}>CAFÉ</text>
    <rect x={-170} y={-220} width={200} height={140} rx={8} fill={lit > 0.5 ? '#FFE9B0' : '#9FA6B5'} opacity={0.5 + 0.5 * lit} />
    <rect x={60} y={-200} width={100} height={200} rx={8} fill="#6E5236" />
    <path d="M-120 -140 q20 -20 40 0 l0 30 q-20 14 -40 0 z" fill="#FFFFFF" /><path d="M-80 -134 q16 4 0 20" fill="none" stroke="#FFFFFF" strokeWidth={5} />
    {lit < 1 && <rect x={-200} y={-300} width={400} height={300} rx={10} fill={P.navy1} opacity={0.35 * (1 - lit)} />}
  </g>
)

// ---------------------------------------------------------------- a classical central-bank building with a name on the pediment
export const CentralBank: React.FC<{ x: number; y: number; s?: number; o?: number; name?: string; glow?: number }> = ({ x, y, s = 1, o = 1, name = 'FEDERAL RESERVE', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse cx={0} cy={-200} rx={330} ry={260} fill={P.gold} opacity={0.22 * glow} />}
    <rect x={-280} y={-30} width={560} height={30} fill="#D9CDB3" /><rect x={-260} y={-56} width={520} height={30} fill="#E6DCC4" />
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-235 + k * 88} y={-300} width={44} height={244} fill="#F3EAD8" stroke="#D9CDB3" strokeWidth={3} />)}
    <rect x={-270} y={-330} width={540} height={34} fill="#E6DCC4" />
    <path d="M-290 -330 L0 -450 L290 -330 Z" fill="#F3EAD8" stroke="#D9CDB3" strokeWidth={4} />
    <text x={0} y={-350} textAnchor="middle" fill={P.ink} style={TXT(40)}>{name}</text>
  </g>
)

// ---------------------------------------------------------------- a big round dial (rate knob) with a pointer; v 0–1 = 0%…6%
export const RateDial: React.FC<{ x: number; y: number; s?: number; o?: number; v: number; t?: string }> = ({ x, y, s = 1, o = 1, v, t }) => {
  const a = -130 + 260 * Math.max(0, Math.min(1, v))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <circle r={150} fill="#2F3E66" stroke="#1D2A44" strokeWidth={8} />
      {Array.from({ length: 7 }, (_, k) => { const b = ((-130 + k * (260 / 6)) * Math.PI) / 180; return <g key={k}><line x1={Math.sin(b) * 118} y1={-Math.cos(b) * 118} x2={Math.sin(b) * 138} y2={-Math.cos(b) * 138} stroke="#E9C25A" strokeWidth={6} /><text x={Math.sin(b) * 96} y={-Math.cos(b) * 96 + 12} textAnchor="middle" fill="#FFFFFF" style={TXT(32)}>{k}%</text></g> })}
      <g transform={`rotate(${a})`}><path d="M-12 0 L0 -112 L12 0 Z" fill={RED} /></g>
      <circle r={26} fill="#E9C25A" />
      {t && <text x={0} y={220} textAnchor="middle" fill="#FFFFFF" style={TXT(64)}>{t}</text>}
    </g>
  )
}

// ---------------------------------------------------------------- a rope for the tug of war, from (x1) to (x2) at height y, with a knot in the middle
export const Rope: React.FC<{ x1: number; x2: number; y: number; o?: number; knot?: number }> = ({ x1, x2, y, o = 1, knot }) => (
  <g opacity={o}>
    <path d={`M${x1} ${y} Q${(x1 + x2) / 2} ${y + 18} ${x2} ${y}`} fill="none" stroke="#C99366" strokeWidth={14} strokeLinecap="round" />
    <path d={`M${x1} ${y} Q${(x1 + x2) / 2} ${y + 18} ${x2} ${y}`} fill="none" stroke="#8E5B3A" strokeWidth={4} strokeDasharray="10 14" />
    {knot !== undefined && <circle cx={knot} cy={y + 9} r={16} fill={RED} />}
  </g>
)

// ---------------------------------------------------------------- an arrow (up/down/right) for a change in a number
export const Arrow: React.FC<{ x: number; y: number; s?: number; o?: number; dir: 'up' | 'down' | 'right'; col?: string }> = ({ x, y, s = 1, o = 1, dir, col = RED }) => (
  <g transform={`translate(${x} ${y}) rotate(${dir === 'up' ? 0 : dir === 'down' ? 180 : 90}) scale(${s})`} opacity={o}>
    <path d="M-26 50 L-26 -10 L-56 -10 L0 -70 L56 -10 L26 -10 L26 50 Z" fill={col} />
  </g>
)

// ---------------------------------------------------------------- a red cross (for "not …"), comfortable size
export const NoCross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-60 -60 L60 60 M60 -60 L-60 60" stroke={RED} strokeWidth={26} strokeLinecap="round" />
  </g>
)

// ---------------------------------------------------------------- a ballot box
export const Ballot: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-170} width={220} height={170} rx={12} fill="#7FA8D8" stroke="#4F78AA" strokeWidth={6} />
    <rect x={-60} y={-176} width={120} height={14} rx={7} fill="#2F3E66" />
    <rect x={-40} y={-240} width={80} height={90} rx={6} fill="#FFFFFF" stroke="#C9D3E0" strokeWidth={3} transform="rotate(-8 0 -200)" />
    <path d="M-16 -200 l12 14 l26 -30" fill="none" stroke={GREEN} strokeWidth={8} transform="rotate(-8 0 -200)" />
    <text x={0} y={-60} textAnchor="middle" fill="#FFFFFF" style={TXT(54)}>VOTE</text>
  </g>
)

// ---------------------------------------------------------------- a simple bread loaf and a pair of shoes (for the trade example)
export const Bread: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-70 0 L-70 -50 Q-70 -90 0 -90 Q70 -90 70 -50 L70 0 Z" fill="#D9984A" stroke="#A86A2A" strokeWidth={5} />
    {[-30, 0, 30].map((dx) => <path key={dx} d={`M${dx - 12} -76 l24 -8`} stroke="#F3D09A" strokeWidth={6} strokeLinecap="round" />)}
  </g>
)
export const Shoes: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[-40, 40].map((dx) => <g key={dx} transform={`translate(${dx} 0)`}><path d="M-34 0 L-34 -60 L-6 -60 Q4 -26 40 -20 Q54 -16 54 0 Z" fill="#4F78AA" stroke="#2F4E7A" strokeWidth={4} /><rect x={-36} y={-6} width={92} height={8} rx={4} fill="#FFFFFF" /></g>)}
  </g>
)

// ---------------------------------------------------------------- a road and a school (for the government trade-off)
export const Road: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-60 0 L60 0 L22 -260 L-22 -260 Z" fill="#5B6577" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-4 + k * 0.5} y={-40 - k * 60} width={8 - k} height={30 - k * 4} fill="#F3EAD8" />)}
    <text x={0} y={50} textAnchor="middle" fill={P.ink} style={TXT(48)}>ROADS</text>
  </g>
)
export const School: React.FC<{ x: number; y: number; s?: number; o?: number; dim?: number }> = ({ x, y, s = 1, o = 1, dim = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o * (1 - 0.55 * dim)}>
    <rect x={-150} y={-200} width={300} height={200} fill="#E9A65A" /><path d="M-170 -200 L0 -290 L170 -200 Z" fill="#C94A3E" />
    <rect x={-30} y={-90} width={60} height={90} fill="#6E5236" />
    {[-110, -70, 50, 90].map((wx) => <rect key={wx} x={wx} y={-160} width={30} height={40} fill="#BFE4FF" />)}
    <rect x={-4} y={-340} width={8} height={60} fill="#5B3820" /><path d="M4 -340 l40 12 l-40 12 z" fill={RED} />
    <text x={0} y={50} textAnchor="middle" fill={P.ink} style={TXT(48)}>SCHOOLS</text>
  </g>
)

// ---------------------------------------------------------------- a balance scale with two pans; tilt -1…1 (positive = right side heavier)
export const Balance: React.FC<{ x: number; y: number; s?: number; o?: number; tilt: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, s = 1, o = 1, tilt, left, right }) => {
  const a = 14 * tilt, r = (a * Math.PI) / 180, L = 300
  const lx = -L * Math.cos(r), ly = -L * Math.sin(r), rx = L * Math.cos(r), ry = L * Math.sin(r)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d="M-90 0 L90 0 L30 -40 L-30 -40 Z" fill="#8E7A5A" /><rect x={-12} y={-420} width={24} height={384} fill="#A89270" />
      <g transform="translate(0 -420)">
        <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#8E7A5A" strokeWidth={16} strokeLinecap="round" />
        <circle r={20} fill="#E9C25A" />
        {([[lx, ly, left], [rx, ry, right]] as [number, number, React.ReactNode][]).map(([px, py, kid], k) => <g key={k} transform={`translate(${px} ${py})`}>
          <path d="M0 0 L-80 150 M0 0 L80 150" stroke="#A89270" strokeWidth={4} />
          <path d="M-110 150 L110 150 Q90 190 0 190 Q-90 190 -110 150 Z" fill="#C9B18A" stroke="#8E7A5A" strokeWidth={4} />
          <g transform="translate(0 150)">{kid}</g>
        </g>)}
      </g>
    </g>
  )
}

// ---------------------------------------------------------------- a supermarket back wall: shelving units full of colourful goods (pure backdrop)
const GOODS = ['#E5634F', '#F4C95D', '#7FA8D8', '#3DBE84', '#F28C6B', '#B48AD8', '#FFFFFF', '#E9A65A']
export const StoreWall: React.FC<{ x: number; y: number; w: number; o?: number; rows?: number }> = ({ x, y, w, o = 0.55, rows = 3 }) => (
  <g opacity={o}>
    <rect x={x} y={y - rows * 130 - 20} width={w} height={rows * 130 + 20} rx={10} fill="#E6D6B8" />
    {Array.from({ length: rows }, (_, r) => <g key={r}>
      <rect x={x} y={y - r * 130 - 14} width={w} height={14} fill="#C9B18A" />
      {Array.from({ length: Math.floor(w / 46) }, (_, k) => { const h = 50 + ((k * 7 + r * 3) % 5) * 12; return <rect key={k} x={x + 10 + k * 46} y={y - r * 130 - 14 - h} width={36} height={h} rx={5} fill={GOODS[(k + r * 3) % GOODS.length]} /> })}
    </g>)}
  </g>
)

// ---------------------------------------------------------------- one green banknote with its value
export const Note: React.FC<{ x: number; y: number; t: string; s?: number; o?: number; r?: number }> = ({ x, y, t, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-56} width={220} height={112} rx={10} fill="#8FD0A2" stroke="#4E9A6A" strokeWidth={5} />
    <rect x={-96} y={-42} width={192} height={84} rx={6} fill="none" stroke="#4E9A6A" strokeWidth={3} />
    <circle r={30} fill="#CDEBD5" stroke="#4E9A6A" strokeWidth={3} />
    <text y={16} textAnchor="middle" fill="#2E6B45" style={TXT(44)}>{t}</text>
  </g>
)

// ---------------------------------------------------------------- a wall clock (hours in a day)
export const WallClock: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number }> = ({ x, y, s = 1, o = 1, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={110} fill="#FFFFFF" stroke="#2F3E66" strokeWidth={14} />
    {Array.from({ length: 12 }, (_, k) => <line key={k} x1={0} y1={-84} x2={0} y2={-96} stroke="#2F3E66" strokeWidth={6} transform={`rotate(${k * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-56} stroke="#2F3E66" strokeWidth={10} strokeLinecap="round" transform={`rotate(${f * 0.5})`} />
    <line x1={0} y1={0} x2={0} y2={-80} stroke={RED} strokeWidth={6} strokeLinecap="round" transform={`rotate(${f * 6})`} />
    <circle r={10} fill="#2F3E66" />
  </g>
)

// ---------------------------------------------------------------- a night sky band with a moon (for "one free evening")
export const Evening: React.FC<{ o?: number }> = ({ o = 1 }) => (
  <g opacity={o}>
    <rect x={0} y={0} width={1920} height={930} fill="#2B3A63" opacity={0.85} />
    <circle cx={1660} cy={220} r={70} fill="#FFF3C4" /><circle cx={1690} cy={200} r={62} fill="#2B3A63" opacity={0.9} />
    {Array.from({ length: 26 }, (_, k) => <circle key={k} cx={(k * 173) % 1900 + 10} cy={60 + ((k * 97) % 380)} r={k % 3 ? 3 : 5} fill="#FFFFFF" opacity={0.7} />)}
  </g>
)

// ---------------------------------------------------------------- a soft outdoor backdrop: sky glow, two rows of hills, a far little town, drifting clouds
export const Backdrop: React.FC<{ f: number; o?: number; town?: boolean }> = ({ f, o = 1, town = true }) => (
  <g opacity={o}>
    <circle cx={1580} cy={260} r={90} fill="#FFE29A" opacity={0.75} />
    {[[260, 200, 1], [900, 140, 0.8], [1350, 230, 0.9]].map(([cx, cy, sc], k) => { const dx = ((f * 0.25 * (k + 1)) % 400) - 200; return <g key={k} transform={`translate(${cx + dx} ${cy}) scale(${sc})`} opacity={0.8}><ellipse cx={0} cy={0} rx={90} ry={34} fill="#FFFFFF" /><ellipse cx={50} cy={-18} rx={60} ry={34} fill="#FFFFFF" /><ellipse cx={-50} cy={-10} rx={50} ry={28} fill="#FFFFFF" /></g> })}
    <path d="M0 760 Q300 640 640 720 Q980 800 1300 690 Q1620 600 1920 700 L1920 930 L0 930 Z" fill="#E2D8B8" opacity={0.75} />
    {town && <g opacity={0.55}>{Array.from({ length: 14 }, (_, k) => { const x = 120 + k * 130, h = 60 + ((k * 37) % 70); return <g key={k}><rect x={x} y={760 - h} width={70} height={h} fill="#CFC2A0" /><path d={`M${x - 8} ${760 - h} L${x + 35} ${730 - h} L${x + 78} ${760 - h} Z`} fill="#C2B28C" /></g> })}</g>}
    <path d="M0 820 Q420 740 900 800 Q1400 860 1920 780 L1920 930 L0 930 Z" fill="#D6CBA6" opacity={0.8} />
  </g>
)

// ---------------------------------------------------------------- a tray of 10 cups (2 rows of 5) — one tray = 10 cups; `empty` 0–1 drains them
export const Tray: React.FC<{ x: number; y: number; s?: number; o?: number; empty?: number; glow?: number }> = ({ x, y, s = 1, o = 1, empty = 0, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-100} y={-104} width={200} height={118} rx={18} fill={P.gold} opacity={0.4 * glow} />}
    {Array.from({ length: 10 }, (_, k) => <g key={k} transform={`translate(${-68 + (k % 5) * 34} ${-6 - Math.floor(k / 5) * 40}) scale(0.42)`}><Cup x={0} y={0} full={1 - empty} /></g>)}
    <rect x={-92} y={-6} width={184} height={16} rx={6} fill={WOOD} stroke={WOOD_D} strokeWidth={3} />
  </g>
)

// ---------------------------------------------------------------- a simple person icon used for counting (1 icon = 10 people)
export const Dude: React.FC<{ x: number; y: number; s?: number; o?: number; col?: string }> = ({ x, y, s = 1, o = 1, col = '#4F78AA' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-62} r={16} fill={col} /><path d="M-22 0 L-22 -26 Q-22 -42 0 -42 Q22 -42 22 -26 L22 0 Z" fill={col} />
  </g>
)

// ---------------------------------------------------------------- a big price board on a post
export const Board: React.FC<{ x: number; y: number; t: string; s?: number; o?: number; col?: string }> = ({ x, y, t, s = 1, o = 1, col = CREAM }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-10} y={-40} width={20} height={240} fill={WOOD_D} />
    <rect x={-140} y={-150} width={280} height={150} rx={18} fill={col} stroke={WOOD_D} strokeWidth={8} />
    <text x={0} y={-38} textAnchor="middle" fill={P.ink} style={TXT(120)}>{t}</text>
  </g>
)

// ---------------------------------------------------------------- an oil barrel
export const Barrel: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-170} width={120} height={170} rx={16} fill="#2F3E66" />
    {[-130, -50].map((yy) => <rect key={yy} x={-64} y={yy} width={128} height={12} rx={6} fill="#5C6F8E" />)}
    <ellipse cx={0} cy={-170} rx={60} ry={14} fill="#5C6F8E" />
    <path d="M0 -112 q-16 22 0 34 q16 -12 0 -34 z" fill="#E9C25A" />
  </g>
)

// ---------------------------------------------------------------- a container ship; `slow` 0–1 adds a tired wobble and fewer boxes
export const BoxShip: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; boxes?: number }> = ({ x, y, s = 1, o = 1, f = 0, boxes = 8 }) => (
  <g transform={`translate(${x} ${y + 4 * Math.sin(f / 16)}) scale(${s})`} opacity={o}>
    <path d="M-240 -40 L240 -40 L200 30 L-210 30 Z" fill="#2F3E66" /><rect x={-240} y={-52} width={480} height={14} fill="#C94A3E" />
    {Array.from({ length: boxes }, (_, k) => <rect key={k} x={-200 + (k % 4) * 80} y={-112 - Math.floor(k / 4) * 56} width={72} height={52} rx={4} fill={['#E9A65A', '#3FA36B', '#7FA8D8', '#E5634F'][k % 4]} />)}
    <rect x={150} y={-150} width={60} height={110} rx={6} fill="#F3EAD8" /><rect x={160} y={-140} width={40} height={20} fill="#7FA8D8" />
  </g>
)

// ---------------------------------------------------------------- an island in the sea (sand + water ring)
export const Isle: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number }> = ({ x, y, s = 1, o = 1, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={20} rx={520} ry={70} fill={SKY} />
    {[0, 1, 2].map((k) => <path key={k} d={`M${-470 + k * 330 + 20 * Math.sin(f / 20 + k)} 40 q30 -12 60 0`} stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.7} />)}
    <ellipse cx={0} cy={0} rx={380} ry={52} fill="#F2D9A0" />
  </g>
)
