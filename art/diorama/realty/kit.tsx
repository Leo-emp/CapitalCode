// # Fresh drawings for "How the Real Estate Market Actually Works" (owner rules r82/r83: this video's own world).
// # The world: a layered PAPER-CUT neighbourhood in daylight — sage hills, terracotta roofs, cream walls, mustard and
// # slate accents, every shape cut from paper with a soft offset shadow under it. Chapters move through Maple Street,
// # one house close up, a bank hall, a dusk street of locked doors, a hill road of rate signposts, a park tug of war,
// # an apartment block, and the street at sunset.
// # Every prop is drawn around its own origin (bottom centre for things that stand, centre for flat things).
import React from 'react'

export const TXT = (size: number, w = 400): React.CSSProperties => ({ font: `${w} ${size}px "Bebas Neue"`, letterSpacing: 1 })

export const SKY0 = '#BFE3E8', SKY1 = '#F7E9D0', SAGE = '#9CC5A1', SAGE2 = '#6FA67F', SAGE3 = '#4E8463'
export const ROOF = '#D9694F', ROOF2 = '#B4513B', WALL = '#F6EBD9', WALL2 = '#E9D6B8', MUSTARD = '#E8B24A', SLATE = '#2E3F5C'
export const TEAL = '#3E8E8C', CORAL = '#E5634F', MINT = '#4FB98A', INK = '#1E2A40', PAPER = '#FFFBF2', SHADOW = 'rgba(40,30,20,0.16)'
export const ROOFS = ['#D9694F', '#3E8E8C', '#E8B24A', '#7A6BB0', '#5C8FC2', '#C75B7A']
export const WALLS = ['#F6EBD9', '#FCE3CF', '#E6F0E2', '#F3E7F2', '#E3EEF6', '#FFF1C9']

const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

// # a paper layer: draws the shape twice, once as a soft shadow offset down-right, then the shape
export const Paper: React.FC<{ d: string; fill: string; dx?: number; dy?: number; o?: number }> = ({ d, fill, dx = 7, dy = 9, o = 1 }) => (
  <g opacity={o}><path d={d} fill={SHADOW} transform={`translate(${dx} ${dy})`} /><path d={d} fill={fill} /></g>
)

// ================================================================== WORLDS
// # daytime paper sky with a sun, drifting paper clouds and three layers of hills
export const DayWorld: React.FC<{ f: number; id: string; tone?: 'day' | 'dusk' | 'sunset' | 'morning' }> = ({ f, id, tone = 'day' }) => {
  const [a, b] = tone === 'dusk' ? ['#46507E', '#E9A07C'] : tone === 'sunset' ? ['#F2A07B', '#FBE3B6'] : tone === 'morning' ? ['#CDE7EF', '#FFF0D6'] : [SKY0, SKY1]
  const hills = tone === 'dusk' ? ['#5E6B8F', '#46557A', '#33415F'] : [SAGE, SAGE2, SAGE3]
  return (
    <g>
      <defs><linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={a} /><stop offset="100%" stopColor={b} /></linearGradient></defs>
      <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-sky)`} />
      <g transform={`translate(${tone === 'sunset' ? 960 : 1640} ${tone === 'sunset' ? 640 : 220})`}>
        <circle r={tone === 'sunset' ? 170 : 90} fill={tone === 'dusk' ? '#F7D9A8' : '#FFE08A'} opacity={0.35} />
        <circle r={tone === 'sunset' ? 120 : 62} fill={tone === 'dusk' ? '#FBE7C2' : '#FFD66B'} />
      </g>
      {[0, 1, 2].map((k) => { const x = ((260 + k * 640 + f * (0.25 + 0.1 * k)) % 2200) - 140, y = 200 + k * 70; return <Paper key={k} d={`M${x} ${y} q30 -50 80 -30 q30 -40 80 -10 q50 -10 60 30 q30 10 10 40 l-220 0 q-30 -10 -10 -30 z`} fill="#FFFFFF" dx={5} dy={6} o={tone === 'dusk' ? 0.5 : 0.95} /> })}
      <Paper d="M-40 760 Q300 640 640 720 T1300 700 T1980 690 L1980 1120 L-40 1120 Z" fill={hills[0]} />
      <Paper d="M-40 820 Q420 740 820 800 T1980 780 L1980 1120 L-40 1120 Z" fill={hills[1]} />
      {Array.from({ length: 9 }, (_, i) => <Tree key={i} x={60 + i * 230 + rnd(i) * 60} y={800 - rnd(i + 3) * 30} s={0.45 + rnd(i + 5) * 0.2} c={hills[2]} />)}
    </g>
  )
}

// # the street: pavement, kerb, road with dashed centre line (bottom band of the frame)
export const Street: React.FC<{ y?: number; dusk?: boolean }> = ({ y = 880, dusk }) => (
  <g>
    <rect x={-40} y={y} width={2000} height={40} fill={dusk ? '#9A93A8' : '#E4D9C6'} />
    <rect x={-40} y={y + 40} width={2000} height={10} fill={dusk ? '#7E7790' : '#C9BBA3'} />
    <rect x={-40} y={y + 50} width={2000} height={200} fill={dusk ? '#4B4A5E' : '#6D6A72'} />
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={i * 180 - 20} y={y + 120} width={90} height={10} rx={5} fill="#F2E7C9" opacity={0.8} />)}
  </g>
)

// ================================================================== PROPS
export const Tree: React.FC<{ x: number; y: number; s?: number; c?: string; o?: number }> = ({ x, y, s = 1, c = SAGE3, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-10} y={-120} width={20} height={120} fill="#8B6A4E" />
    <Paper d="M0 -300 Q90 -260 80 -170 Q110 -110 40 -100 L-40 -100 Q-110 -110 -80 -170 Q-90 -260 0 -300 Z" fill={c} dx={5} dy={6} />
  </g>
)

// # a paper house: wall, roof, chimney, door, windows (lit at dusk), porch step; `lock` shows a padlock on the door
export const House: React.FC<{ x: number; y: number; s?: number; o?: number; roof?: string; wall?: string; lit?: number; lock?: number; lockT?: string; v?: number; door?: string }> = ({ x, y, s = 1, o = 1, roof = ROOF, wall = WALL, lit = 0, lock = 0, lockT, v = 0, door = SLATE }) => {
  const w = v === 1 ? 300 : 260, h = v === 1 ? 210 : 230
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <Paper d={`M${-w / 2} 0 L${-w / 2} ${-h} L${w / 2} ${-h} L${w / 2} 0 Z`} fill={wall} />
      <Paper d={`M${w / 2 - 70} ${-h - 70} L${w / 2 - 70} ${-h - 130} L${w / 2 - 36} ${-h - 130} L${w / 2 - 36} ${-h - 40} Z`} fill={ROOF2} dx={4} dy={5} />
      <Paper d={v === 1 ? `M${-w / 2 - 30} ${-h} L0 ${-h - 120} L${w / 2 + 30} ${-h} Z` : `M${-w / 2 - 24} ${-h} L0 ${-h - 150} L${w / 2 + 24} ${-h} Z`} fill={roof} />
      {/* windows */}
      {[-1, 1].map((k) => <g key={k}>
        <rect x={k * (w / 4) - 34} y={-h + 50} width={68} height={70} rx={6} fill={lit > 0 ? `rgba(255,212,120,${0.4 + 0.6 * lit})` : '#BFDDEA'} stroke="#FFFFFF" strokeWidth={6} />
        <line x1={k * (w / 4)} y1={-h + 50} x2={k * (w / 4)} y2={-h + 120} stroke="#FFFFFF" strokeWidth={4} />
      </g>)}
      {/* door + step */}
      <rect x={-30} y={-110} width={60} height={110} rx={8} fill={door} />
      <circle cx={18} cy={-55} r={5} fill={MUSTARD} />
      <rect x={-50} y={-6} width={100} height={10} fill="#C9BBA3" />
      {lock > 0 && <g opacity={lock} transform={`translate(0 -60) scale(${0.6 + 0.4 * lock})`}>
        <path d="M-22 -10 L-22 -36 Q0 -62 22 -36 L22 -10" fill="none" stroke="#8A6A2E" strokeWidth={9} />
        <rect x={-34} y={-12} width={68} height={58} rx={10} fill={MUSTARD} stroke="#8A6A2E" strokeWidth={4} />
        {lockT && <text y={32} textAnchor="middle" fill={INK} style={TXT(30)}>{lockT}</text>}
      </g>}
    </g>
  )
}

// # a lawn sign on a post: FOR SALE + price, or SOLD
export const LawnSign: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; top?: string; col?: string; r?: number }> = ({ x, y, s = 1, o = 1, t, top = 'FOR SALE', col = CORAL, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-6} y={-160} width={12} height={160} fill="#8B6A4E" />
    <rect x={-90} y={-150} width={180} height={12} fill="#8B6A4E" />
    <Paper d="M-84 -138 L84 -138 L84 -40 L-84 -40 Z" fill={PAPER} dx={4} dy={5} />
    <rect x={-84} y={-138} width={168} height={34} fill={col} />
    <text y={-112} textAnchor="middle" fill="#FFFFFF" style={TXT(28)}>{top}</text>
    {t && <text y={-56} textAnchor="middle" fill={INK} style={TXT(t.length > 8 ? 40 : 48)}>{t}</text>}
  </g>
)

// # a paper tag label (stands in for a floating caption; sits beside the thing it names)
export const Tag: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; col?: string; tc?: string }> = ({ x, y, t, o = 1, size = 42, col = PAPER, tc = INK }) => {
  const w = Math.max(110, t.length * size * 0.5 + 44)
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <Paper d={`M${-w / 2} ${-size - 22} L${w / 2} ${-size - 22} L${w / 2} 10 L${-w / 2} 10 Z`} fill={col} dx={4} dy={5} />
    <text y={-10} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}

// # a paper coin, and a stack of n coins
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={4} cy={6} rx={30} ry={30} fill={SHADOW} />
    <circle r={30} fill={MUSTARD} stroke="#B8862E" strokeWidth={4} />
    <text y={11} textAnchor="middle" fill="#8A6A2E" style={TXT(32)}>{t}</text>
  </g>
)
export const CoinStack: React.FC<{ x: number; y: number; n: number; s?: number; o?: number }> = ({ x, y, n, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: Math.max(0, Math.floor(n)) }, (_, i) => <g key={i}><ellipse cx={0} cy={-i * 14} rx={46} ry={14} fill="#B8862E" /><ellipse cx={0} cy={-i * 14 - 5} rx={46} ry={14} fill={MUSTARD} /></g>)}
  </g>
)

// # a bank building front (columns, steps, sign)
export const Bank: React.FC<{ x: number; y: number; s?: number; o?: number; name?: string }> = ({ x, y, s = 1, o = 1, name = 'BANK' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Paper d="M-260 0 L-260 -40 L260 -40 L260 0 Z" fill="#D8CFC0" />
    <Paper d="M-230 -40 L-230 -300 L230 -300 L230 -40 Z" fill="#EFE7DA" />
    {[-170, -85, 0, 85, 170].map((cx) => <rect key={cx} x={cx - 20} y={-290} width={40} height={250} fill="#E2D8C6" />)}
    <Paper d="M-270 -300 L0 -420 L270 -300 Z" fill="#CFC4B0" />
    <rect x={-120} y={-360} width={240} height={46} rx={8} fill={SLATE} />
    <text y={-327} textAnchor="middle" fill="#FFFFFF" style={TXT(36)}>{name}</text>
    <rect x={-44} y={-160} width={88} height={120} rx={8} fill={SLATE} />
  </g>
)

// # a clipboard (the appraiser's)
export const Clipboard: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-50} y={-66} width={100} height={132} rx={8} fill="#B98457" />
    <rect x={-40} y={-50} width={80} height={106} fill={PAPER} />
    <rect x={-20} y={-74} width={40} height={18} rx={4} fill={SLATE} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-30} y={-34 + k * 22} width={k === 3 ? 34 : 60} height={7} rx={3} fill="#CBBFA8" />)}
  </g>
)

// # a padlock sign with a rate on it
export const Padlock: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; col?: string }> = ({ x, y, s = 1, o = 1, t, col = MUSTARD }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-40 -20 L-40 -70 Q0 -120 40 -70 L40 -20" fill="none" stroke="#8A6A2E" strokeWidth={16} />
    <Paper d="M-62 -24 L62 -24 L62 76 L-62 76 Z" fill={col} dx={5} dy={6} />
    {t && <text y={44} textAnchor="middle" fill={INK} style={TXT(54)}>{t}</text>}
  </g>
)

// # a timeline signpost on the hill road
export const Signpost: React.FC<{ x: number; y: number; t: string; sub?: string; o?: number; col?: string; s?: number }> = ({ x, y, t, sub, o = 1, col = PAPER, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-8} y={-260} width={16} height={260} fill="#8B6A4E" />
    <Paper d="M-120 -260 L110 -260 L140 -215 L110 -170 L-120 -170 Z" fill={col} dx={5} dy={6} />
    <text x={-5} y={-202} textAnchor="middle" fill={INK} style={TXT(50)}>{t}</text>
    {sub && <g><Paper d="M-90 -150 L90 -150 L90 -100 L-90 -100 Z" fill={MUSTARD} dx={4} dy={5} /><text y={-113} textAnchor="middle" fill={INK} style={TXT(40)}>{sub}</text></g>}
  </g>
)

// # an apartment block: 4 floors x 5 windows; `empty` windows glow with a FOR RENT card
export const Apartment: React.FC<{ x: number; y: number; s?: number; o?: number; empty?: number[]; lit?: number }> = ({ x, y, s = 1, o = 1, empty = [], lit = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Paper d="M-260 0 L-260 -560 L260 -560 L260 0 Z" fill="#E8C9A6" />
    <rect x={-270} y={-580} width={540} height={30} fill={ROOF2} />
    {Array.from({ length: 20 }, (_, i) => { const c = i % 5, r = Math.floor(i / 5), e = empty.includes(i); return <g key={i}>
      <rect x={-220 + c * 90} y={-520 + r * 120} width={60} height={80} rx={6} fill={e ? '#FFFFFF' : `rgba(120,170,200,${0.6 + 0.3 * lit})`} stroke="#FFFFFF" strokeWidth={5} />
      {e && <g><rect x={-216 + c * 90} y={-480 + r * 120} width={52} height={24} fill={CORAL} /><text x={-190 + c * 90} y={-462 + r * 120} textAnchor="middle" fill="#FFFFFF" style={TXT(18)}>FOR RENT</text></g>}
    </g> })}
    <rect x={-40} y={-90} width={80} height={90} rx={6} fill={SLATE} />
  </g>
)

// # a red cross drawn over a picture (r68)
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-90 -90 L90 90 M90 -90 L-90 90" stroke="#FFFFFF" strokeWidth={34} strokeLinecap="round" />
    <path d="M-90 -90 L90 90 M90 -90 L-90 90" stroke={CORAL} strokeWidth={22} strokeLinecap="round" />
  </g>
)

// # soft edge darkening (drawn last)
export const Vig: React.FC<{ id: string; k?: number }> = ({ id, k = 0.22 }) => (
  <g pointerEvents="none">
    <defs><radialGradient id={`${id}-vig`} cx="0.5" cy="0.5" r="0.75"><stop offset="65%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#2A1E12" stopOpacity={k} /></radialGradient></defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-vig)`} />
  </g>
)

// # tiny natural motion on the thing being talked about: a paper glint (fills short quiet moments)
export const Life: React.FC<{ f: number; at: number; x: number; y: number; kind?: 'glint' | 'flutter' }> = ({ f, at, x, y, kind = 'glint' }) => {
  const t = (f - at) / 18
  if (t < 0 || t > 1) return null
  if (kind === 'flutter') return (
    <g transform={`translate(${x + 40 * t} ${y - 50 * t}) rotate(${200 * t})`} opacity={1 - t}>
      <path d="M0 -14 Q14 0 0 14 Q-14 0 0 -14 Z" fill={SAGE2} />
    </g>
  )
  const k = Math.sin(Math.PI * t)
  return (
    <g transform={`translate(${x} ${y}) rotate(${30 * t}) scale(${k})`} opacity={0.95}>
      <path d="M0 -30 L6 -6 L30 0 L6 6 L0 30 L-6 6 L-30 0 L-6 -6 Z" fill="#FFFFFF" />
    </g>
  )
}
