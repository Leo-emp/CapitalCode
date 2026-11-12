// ============================================================
// LONG VIDEO — "Financial Literacy: Everything You Need to Know" —
// this video's own world (owner rules r82/r83: fresh art per video).
// Art direction: "THE TEN CARDS" — a lamp-lit evening study. Walnut
// desk, bottle-green walls, brass lamp, warm paper index cards. Each
// lesson opens on its index card and the card's picture grows into a
// full place of its own (classroom, office, waterfall of buckets, bank,
// garage, card-shop, market, orchard, factory, boardroom).
// Depth: back wall gradient + lamp glow pool + desk with grain + soft
// contact shadows; paper has a faint rule pattern; light grain on top.
// Only engine helpers are shared (timing, Person rig, Headline).
// House rules: every picture lands ON its word; one picture group at a
// time; labels stick to the part they name; nothing covers anything.
// ============================================================
import React from 'react'
import { clamp01, lerp, on, pop } from '../kit'

// ------------------------------------------------------------ palette
export const C = {
  ink: '#1F2A3A', inkSoft: '#4E5B6E',
  paper: '#FBF4E4', paperD: '#E9DcC0', rule: '#9CC3E0', margin: '#E0705A',
  wall: '#2F5A4C', wallD: '#1E3E35', wallL: '#3E7262',
  walnut: '#7A4A2C', walnutD: '#55301B', walnutL: '#A06A44',
  brass: '#D9A845', brassD: '#A97A22', brassL: '#F4D488',
  chalk: '#2C3B36', chalkL: '#F2F2EA',
  tomato: '#E2553F', tomatoD: '#A8382A', teal: '#2FA39A', tealD: '#1D736C', sky: '#8FC6E6', skyD: '#4C88B6',
  cash: '#5DBE84', cashD: '#2E8C55', cashL: '#C4EDD2', red: '#E0503F', redD: '#A8342A', gold: '#F2C14E', goldD: '#B8862A',
  plum: '#6E4C7E', cream: '#FFF6E6',
}
export const FONT = { big: '"Bebas Neue"', body: 'Inter', hand: '"Bebas Neue"' }

// ------------------------------------------------------------ timing helpers (scene windows with clean fades)
export const fadeIn = (f: number, a: number, d = 10) => (f < a - 2 ? 0 : Math.min(1, (f - (a - 2)) / d))
export const scene = (f: number, a: number, b: number, d = 10) => (f >= b + d + 2 ? 0 : fadeIn(f, a, d) * (1 - clamp01((f - b) / d)))

// ------------------------------------------------------------ shared gradients (fixed ids; identical copies are harmless)
export const Defs: React.FC = () => (
  <defs>
    <linearGradient id="fl-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1C3A32" /><stop offset="0.6" stopColor="#2F5A4C" /><stop offset="1" stopColor="#3B6B5B" /></linearGradient>
    <radialGradient id="fl-lamp" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFE9B0" stopOpacity="0.75" /><stop offset="0.45" stopColor="#FFD27A" stopOpacity="0.28" /><stop offset="1" stopColor="#FFD27A" stopOpacity="0" /></radialGradient>
    <linearGradient id="fl-desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A06A44" /><stop offset="0.25" stopColor="#7A4A2C" /><stop offset="1" stopColor="#4E2B18" /></linearGradient>
    <linearGradient id="fl-paper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFBF0" /><stop offset="1" stopColor="#F1E5CB" /></linearGradient>
    <linearGradient id="fl-brass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#A97A22" /><stop offset="0.5" stopColor="#F4D488" /><stop offset="1" stopColor="#B8862A" /></linearGradient>
    <linearGradient id="fl-chalk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3A4D46" /><stop offset="1" stopColor="#25332E" /></linearGradient>
    <linearGradient id="fl-class" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F3E3C6" /><stop offset="1" stopColor="#E7CFA6" /></linearGradient>
    <linearGradient id="fl-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B98A5E" /><stop offset="1" stopColor="#8A5E3C" /></linearGradient>
    <linearGradient id="fl-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1B2342" /><stop offset="0.7" stopColor="#34406E" /><stop offset="1" stopColor="#58598A" /></linearGradient>
    <linearGradient id="fl-cashg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#4FB277" /><stop offset="0.5" stopColor="#7AD49A" /><stop offset="1" stopColor="#3E9E66" /></linearGradient>
    <linearGradient id="fl-goldg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#D9A23A" /><stop offset="0.5" stopColor="#FFD873" /><stop offset="1" stopColor="#C88F2C" /></linearGradient>
    <linearGradient id="fl-coinedge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#9C6F1E" /><stop offset="0.5" stopColor="#E9B949" /><stop offset="1" stopColor="#9C6F1E" /></linearGradient>
    <radialGradient id="fl-vig" cx="0.5" cy="0.48" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#0B1612" stopOpacity="0.34" /></radialGradient>
    <pattern id="fl-grain" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="#000" opacity="0.06" /><circle cx="4" cy="4" r="0.6" fill="#fff" opacity="0.06" /></pattern>
    <pattern id="fl-wood" width="240" height="26" patternUnits="userSpaceOnUse"><path d="M0 8 C60 4 120 12 240 7 M0 19 C80 23 150 15 240 20" stroke="#000" strokeOpacity="0.09" strokeWidth="2" fill="none" /></pattern>
    <pattern id="fl-stripe" width="44" height="1080" patternUnits="userSpaceOnUse"><rect width="22" height="1080" fill="#fff" opacity="0.025" /></pattern>
    <pattern id="fl-boards" width="200" height="60" patternUnits="userSpaceOnUse"><rect width="200" height="60" fill="none" stroke="#000" strokeOpacity="0.1" strokeWidth="2" /></pattern>
  </defs>
)
export const Grain: React.FC = () => <><rect width={1920} height={1080} fill="url(#fl-grain)" pointerEvents="none" /><rect width={1920} height={1080} fill="url(#fl-vig)" pointerEvents="none" /></>

// ------------------------------------------------------------ THE STUDY: green wall, shelf, window with a night sky, brass lamp, walnut desk
export const DESK = 760   // # desk top line
export const Study: React.FC<{ f: number; lamp?: number; o?: number }> = ({ f, lamp = 1, o = 1 }) => (
  <g opacity={o}>
    <rect width={1920} height={1080} fill="url(#fl-wall)" />
    <rect width={1920} height={1080} fill="url(#fl-stripe)" />
    {/* # window on the left: night city, a moon */}
    <g transform="translate(120 120)">
      <rect x={-16} y={-16} width={392} height={432} rx={10} fill={C.walnutD} />
      <rect width={360} height={400} rx={4} fill="url(#fl-night)" />
      <circle cx={270} cy={90} r={38} fill="#F6EFD2" /><circle cx={284} cy={80} r={34} fill="#34406E" opacity={0.0} />
      {[[10, 150, 60], [80, 110, 50], [140, 180, 70], [220, 130, 50], [280, 170, 70]].map(([x, h, w], k) => <g key={k}><rect x={x} y={400 - h} width={w} height={h} fill="#232B4E" />
        {Array.from({ length: 6 }, (_, j) => <rect key={j} x={x + 8 + (j % 2) * (w / 2 - 4)} y={400 - h + 16 + Math.floor(j / 2) * 34} width={10} height={14} fill="#FFD9A0" opacity={((k * 3 + j + Math.floor(f / 60)) % 4) ? 0.75 : 0.15} />)}</g>)}
      <path d="M180 0 L180 400 M0 200 L360 200" stroke={C.walnutD} strokeWidth={12} />
    </g>
    {/* # bookshelf on the right */}
    <g transform="translate(1440 110)">
      <rect x={0} y={0} width={400} height={480} fill={C.walnutD} />
      {[0, 1, 2].map((r) => <g key={r}><rect x={14} y={150 * r + 146} width={372} height={14} fill={C.walnut} />
        {Array.from({ length: 9 }, (_, k) => { const w = 28 + ((k * 7 + r * 3) % 4) * 6, h = 96 + ((k * 5 + r) % 3) * 16, x = 24 + k * 40
          return <rect key={k} x={x} y={150 * r + 146 - h} width={w} height={h} rx={3} fill={[C.tomato, C.teal, C.brass, C.plum, C.sky, C.paperD][(k + r * 2) % 6]} opacity={0.9} /> })}</g>)}
    </g>
    {/* # lamp glow pool */}
    <ellipse cx={960} cy={DESK + 40} rx={900 * lamp} ry={420 * lamp} fill="url(#fl-lamp)" />
    {/* # desk */}
    <rect x={0} y={DESK} width={1920} height={1080 - DESK} fill="url(#fl-desk)" />
    <rect x={0} y={DESK} width={1920} height={1080 - DESK} fill="url(#fl-wood)" />
    <rect x={0} y={DESK} width={1920} height={10} fill="#fff" opacity={0.14} />
  </g>
)
// # the brass banker's lamp (stands on the desk at x)
export const Lamp: React.FC<{ x: number; y?: number; s?: number }> = ({ x, y = DESK, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={110} ry={16} fill="#000" opacity={0.25} />
    <rect x={-80} y={-26} width={160} height={26} rx={10} fill="url(#fl-brass)" />
    <rect x={-8} y={-230} width={16} height={210} fill="url(#fl-brass)" />
    <path d="M-150 -230 Q0 -320 150 -230 L120 -210 L-120 -210 Z" fill={C.teal} /><path d="M-150 -230 Q0 -320 150 -230 L140 -226 Q0 -300 -140 -226 Z" fill="#fff" opacity={0.25} />
    <ellipse cx={0} cy={-210} rx={120} ry={10} fill="#FFE9B0" opacity={0.9} />
  </g>
)

// ------------------------------------------------------------ INDEX CARD: ruled paper, red margin line, number in the corner, a picture slot
export const Card: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; n?: number | string; title?: string; glow?: number; children?: React.ReactNode }> = ({ x, y, s = 1, r = 0, o = 1, n, title, glow = 0, children }) => (
  o <= 0.01 ? null :
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-176} y={-116} width={352} height={232} rx={20} fill={C.brassL} opacity={0.55 * glow} />}
    <rect x={-160} y={-100} width={320} height={200} rx={8} fill="#000" opacity={0.22} transform="translate(6 8)" />
    <rect x={-160} y={-100} width={320} height={200} rx={8} fill="url(#fl-paper)" />
    {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={-150} x2={150} y1={-40 + k * 30} y2={-40 + k * 30} stroke={C.rule} strokeWidth={2} opacity={0.6} />)}
    <line x1={-160} x2={160} y1={-62} y2={-62} stroke={C.margin} strokeWidth={3} />
    {n !== undefined && <text x={-144} y={-72} fill={C.margin} style={{ font: `400 40px ${FONT.big}` }}>{n}</text>}
    {title && <text x={n !== undefined ? -110 : 0} y={-72} textAnchor={n !== undefined ? 'start' : 'middle'} fill={C.ink} style={{ font: `400 34px ${FONT.big}`, letterSpacing: 1 }}>{title}</text>}
    <g transform="translate(0 20)">{children}</g>
  </g>
)

// ------------------------------------------------------------ text helpers
// # a tag stuck to a thing (pill with a little pointer)
export const Tag: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; color?: string; ink?: string; point?: 'down' | 'up' | 'none'; w?: number }> = ({ x, y, text, o = 1, size = 40, color = C.paper, ink = C.ink, point = 'down', w }) => {
  if (o <= 0.01) return null
  const W = w ?? Math.max(120, text.length * size * 0.5 + 44), H = size + 22
  return (
    <g opacity={o} transform={`translate(${x} ${y})`}>
      <rect x={-W / 2 + 3} y={-H / 2 + 5} width={W} height={H} rx={H / 2} fill="#000" opacity={0.18} />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={color} />
      {point === 'down' && <path d={`M-12 ${H / 2 - 1} L0 ${H / 2 + 14} L12 ${H / 2 - 1} Z`} fill={color} />}
      {point === 'up' && <path d={`M-12 ${-H / 2 + 1} L0 ${-H / 2 - 14} L12 ${-H / 2 + 1} Z`} fill={color} />}
      <text x={0} y={size * 0.36} textAnchor="middle" fill={ink} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>
    </g>
  )
}
// # a clean cross for "not X": two rounded strokes that draw on (p 0–1)
export const Cross: React.FC<{ x: number; y: number; r?: number; p: number; color?: string }> = ({ x, y, r = 90, p, color = C.red }) => {
  if (p <= 0.01) return null
  const a = clamp01(p * 2), b = clamp01(p * 2 - 1)
  return (
    <g transform={`translate(${x} ${y})`} strokeLinecap="round" fill="none">
      <circle r={r} stroke="#FFFFFF" strokeWidth={14} opacity={0.55 * p} />
      <circle r={r} stroke={color} strokeWidth={9} opacity={p} />
      <line x1={-r * 0.6} y1={-r * 0.6} x2={lerp(-r * 0.6, r * 0.6, a)} y2={lerp(-r * 0.6, r * 0.6, a)} stroke={color} strokeWidth={14} />
      {b > 0 && <line x1={r * 0.6} y1={-r * 0.6} x2={lerp(r * 0.6, -r * 0.6, b)} y2={lerp(-r * 0.6, r * 0.6, b)} stroke={color} strokeWidth={14} />}
    </g>
  )
}
export const Check: React.FC<{ x: number; y: number; r?: number; p: number; color?: string }> = ({ x, y, r = 40, p, color = C.cashD }) => p <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`} opacity={p}><circle r={r} fill={color} /><path d={`M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.35} L${r * 0.5} ${-r * 0.35}`} stroke="#fff" strokeWidth={r * 0.22} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
)
// # a small x mark (wrong answer on a test)
export const XMark: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 16, p }) => p <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`} opacity={p} stroke={C.red} strokeWidth={r * 0.4} strokeLinecap="round"><line x1={-r} y1={-r} x2={r} y2={r} /><line x1={r} y1={-r} x2={-r} y2={r} /></g>
)

// ------------------------------------------------------------ money objects
export const Bill: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; red?: boolean }> = ({ x, y, s = 1, r = 0, o = 1, red }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-58} y={-26} width={116} height={52} rx={6} fill={red ? C.red : 'url(#fl-cashg)'} stroke={red ? C.redD : C.cashD} strokeWidth={3} />
    <rect x={-58} y={-26} width={116} height={10} rx={5} fill="#fff" opacity={0.25} />
    <circle cx={0} cy={0} r={15} fill={C.cream} opacity={0.9} /><text y={8} textAnchor="middle" fill={red ? C.redD : C.cashD} style={{ font: `400 24px ${FONT.big}` }}>$</text>
    <circle cx={-38} cy={0} r={8} fill="none" stroke={red ? C.redD : C.cashD} strokeWidth={3} /><circle cx={38} cy={0} r={8} fill="none" stroke={red ? C.redD : C.cashD} strokeWidth={3} />
  </g>
)
// # a stack of bills; n can be fractional (the top bill fades in)
export const Stack: React.FC<{ x: number; y: number; n: number; s?: number; o?: number }> = ({ x, y, n, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={80} ry={14} fill="#000" opacity={0.18} />
    {Array.from({ length: Math.max(0, Math.ceil(n)) }, (_, k) => <g key={k} opacity={Math.min(1, n - k)}><Bill x={k % 2 ? 4 : -4} y={-28 - k * 22} /></g>)}
  </g>
)
// # a gold coin seen at an angle: `turn` 0–1 spins it (the face squashes), `face` = 'H' | 'T'
export const Coin: React.FC<{ x: number; y: number; r?: number; turn?: number; o?: number; label?: string }> = ({ x, y, r = 80, turn = 0, o = 1, label = '$' }) => {
  const sq = Math.abs(Math.cos(turn * Math.PI * 2)), back = Math.cos(turn * Math.PI * 2) < 0
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <ellipse cx={0} cy={r * 0.12} rx={r} ry={Math.max(4, r * sq)} fill="url(#fl-coinedge)" />
      <ellipse cx={0} cy={0} rx={r} ry={Math.max(3, r * sq)} fill={back ? C.goldD : 'url(#fl-goldg)'} />
      <ellipse cx={0} cy={0} rx={r * 0.78} ry={Math.max(2, r * 0.78 * sq)} fill="none" stroke={C.goldD} strokeWidth={5} />
      {sq > 0.35 && <text y={r * 0.3 * sq} textAnchor="middle" fill={C.goldD} transform={`scale(1 ${sq})`} style={{ font: `400 ${r * 0.95}px ${FONT.big}` }}>{label}</text>}
    </g>
  )
}
// # a paycheck envelope (window envelope) that can open: `open` 0–1 slides the cheque up
export const Paycheck: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; open?: number; amount?: string; who?: string }> = ({ x, y, s = 1, r = 0, o = 1, open = 0, amount = '$ ?', who = 'PAY TO: YOU' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-90} width={300} height={180} rx={10} fill="#000" opacity={0.2} transform="translate(6 8)" />
    {/* # the cheque rises out of the envelope */}
    <g transform={`translate(0 ${-150 * open})`}>
      <rect x={-136} y={-80} width={272} height={150} rx={8} fill="#E6F3EA" stroke={C.cashD} strokeWidth={3} />
      <rect x={-136} y={-80} width={272} height={26} rx={8} fill={C.cash} opacity={0.6} />
      <text x={-118} y={-12} fill={C.inkSoft} style={{ font: `400 26px ${FONT.big}`, letterSpacing: 1 }}>{who}</text>
      <rect x={30} y={10} width={94} height={44} rx={6} fill="#fff" stroke={C.cashD} strokeWidth={2} />
      <text x={77} y={44} textAnchor="middle" fill={C.cashD} style={{ font: `400 34px ${FONT.big}` }}>{amount}</text>
      <path d="M-118 46 C-90 30 -70 60 -40 40" stroke={C.ink} strokeWidth={3} fill="none" />
    </g>
    <rect x={-150} y={-30} width={300} height={120} rx={10} fill="#F4E3C4" stroke="#C9A877" strokeWidth={3} />
    <path d="M-150 -30 L0 40 L150 -30" fill="none" stroke="#C9A877" strokeWidth={4} />
    <rect x={-100} y={44} width={140} height={30} rx={4} fill="#fff" opacity={0.7} stroke="#C9A877" strokeWidth={2} />
  </g>
)
// # a receipt printing out of a small till: `p` 0–1 = how far it has printed
export const Till: React.FC<{ x: number; y: number; s?: number; p: number; lines?: [string, string?][]; total?: string; o?: number }> = ({ x, y, s = 1, p, lines = [], total, o = 1 }) => {
  const L = 420 * clamp01(p)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      {/* # paper comes out of the top slot and curls upward */}
      <g>
        <rect x={-110} y={-140 - L} width={220} height={L + 10} fill="#FFFDF7" />
        <path d={`M-110 ${-140 - L} l20 -10 l20 10 l20 -10 l20 10 l20 -10 l20 10 l20 -10 l20 10 l20 -10 l20 10 l20 -10 L110 ${-140 - L}`} fill="#FFFDF7" />
        <rect x={-110} y={-140 - L} width={220} height={L + 10} fill="#000" opacity={0.03} />
        {lines.map(([a], k) => { const yy = -140 - L + 56 + k * 52; return yy < -190 ? <text key={k} x={0} y={yy} textAnchor="middle" fill={C.inkSoft} style={{ font: `400 38px ${FONT.big}`, letterSpacing: 2 }}>{a}</text> : null })}
        {total && L > 300 && <g><line x1={-92} x2={92} y1={-170} y2={-170} stroke={C.inkSoft} strokeWidth={2} strokeDasharray="6 6" /><text x={0} y={-180 + 0} textAnchor="middle" dy={-12} fill={C.red} style={{ font: `400 64px ${FONT.big}` }} opacity={clamp01((L - 300) / 60)}>{total}</text></g>}
      </g>
      {/* # the till body */}
      <ellipse cx={0} cy={6} rx={200} ry={20} fill="#000" opacity={0.22} />
      <path d="M-180 0 L-160 -140 L160 -140 L180 0 Z" fill={C.tealD} />
      <path d="M-160 -140 L160 -140 L150 -118 L-150 -118 Z" fill="#fff" opacity={0.18} />
      <rect x={-120} y={-148} width={240} height={14} rx={6} fill={C.ink} />
      {[0, 1, 2].map((r) => [0, 1, 2, 3].map((k) => <rect key={`${r}${k}`} x={-110 + k * 56} y={-104 + r * 32} width={44} height={22} rx={5} fill={C.paper} opacity={0.85} />))}
    </g>
  )
}
// # an answer sheet with 28 bubbles (7 x 4); marks[i] = 1 right / -1 wrong / 0 blank; score shown when `score` given
export const TestSheet: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; marks: number[]; score?: string; scoreP?: number }> = ({ x, y, s = 1, r = 0, o = 1, marks, score, scoreP = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-250} y={-320} width={500} height={640} rx={10} fill="#000" opacity={0.2} transform="translate(8 10)" />
    <rect x={-250} y={-320} width={500} height={640} rx={10} fill="url(#fl-paper)" />
    <rect x={-250} y={-320} width={500} height={70} rx={10} fill={C.skyD} opacity={0.85} />
    <text x={-224} y={-272} fill="#fff" style={{ font: `400 40px ${FONT.big}`, letterSpacing: 2 }}>MONEY TEST</text>
    <text x={224} y={-272} textAnchor="end" fill="#fff" style={{ font: `400 32px ${FONT.big}`, letterSpacing: 1 }}>28 QUESTIONS</text>
    {marks.map((m, i) => { const col = Math.floor(i / 7), row = i % 7, cx = -170 + col * 112, cy = -196 + row * 58
      return <g key={i}>
        <circle cx={cx} cy={cy} r={20} fill="none" stroke={C.inkSoft} strokeWidth={3} opacity={0.7} />
        {m !== 0 && <circle cx={cx} cy={cy} r={13} fill={C.ink} opacity={0.85} />}
        {m === 1 && <Check x={cx + 38} y={cy} r={15} p={1} />}
        {m < 0 && <XMark x={cx + 38} y={cy} r={11} p={1} />}
      </g> })}
    {score && scoreP > 0.01 && <g transform={`translate(140 248) rotate(-8) scale(${0.7 + 0.3 * scoreP})`} opacity={scoreP}>
      <ellipse rx={110} ry={62} fill="#FFFBF0" stroke={C.red} strokeWidth={9} />
      <text y={28} textAnchor="middle" fill={C.red} style={{ font: `400 88px ${FONT.big}` }}>{score}</text>
    </g>}
  </g>
)
// # a graduation cap (for "a finance degree")
export const GradCap: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-90 10 Q0 50 90 10 L90 60 Q0 100 -90 60 Z" fill={C.ink} />
    <path d="M-180 -10 L0 -80 L180 -10 L0 60 Z" fill="#26344A" /><path d="M-180 -10 L0 -80 L180 -10 L160 -14 L0 -72 L-160 -14 Z" fill="#fff" opacity={0.15} />
    <path d="M0 -10 L120 20 L120 90" stroke={C.brass} strokeWidth={6} fill="none" /><rect x={110} y={88} width={20} height={40} rx={6} fill={C.brass} />
  </g>
)
// # a house (rent), a credit card (debt), a rocking chair (the age you stop working)
export const House: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={130} ry={14} fill="#000" opacity={0.2} />
    <rect x={-100} y={-150} width={200} height={150} fill={C.paper} /><rect x={-100} y={-150} width={40} height={150} fill="#000" opacity={0.06} />
    <path d="M-125 -140 L0 -240 L125 -140 Z" fill={C.tomato} /><path d="M-125 -140 L0 -240 L10 -232 L-110 -140 Z" fill="#fff" opacity={0.2} />
    <rect x={-30} y={-84} width={60} height={84} rx={4} fill={C.walnut} /><rect x={40} y={-120} width={44} height={40} fill={C.sky} /><rect x={-84} y={-120} width={44} height={40} fill={C.sky} />
  </g>
)
export const CreditCard: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; color?: string }> = ({ x, y, s = 1, r = 0, o = 1, color = C.plum }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-80} width={260} height={160} rx={16} fill="#000" opacity={0.2} transform="translate(6 8)" />
    <rect x={-130} y={-80} width={260} height={160} rx={16} fill={color} /><path d="M-130 -20 Q0 -70 130 -40 L130 -80 L-130 -80 Z" fill="#fff" opacity={0.15} />
    <rect x={-100} y={-36} width={50} height={38} rx={6} fill="url(#fl-brass)" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-100 + k * 52} y={26} width={40} height={12} rx={4} fill="#fff" opacity={0.75} />)}
  </g>
)
export const RockingChair: React.FC<{ x: number; y: number; s?: number; o?: number; rock?: number }> = ({ x, y, s = 1, o = 1, rock = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rock}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={110} ry={12} fill="#000" opacity={0.18} />
    <path d="M-110 0 Q0 30 110 0" stroke={C.walnutD} strokeWidth={12} fill="none" />
    <rect x={-70} y={-110} width={14} height={112} fill={C.walnut} /><rect x={54} y={-70} width={14} height={72} fill={C.walnut} />
    <rect x={-74} y={-80} width={150} height={16} rx={6} fill={C.walnutL} />
    <path d="M-72 -110 L-90 -250 L-30 -250 L-56 -110 Z" fill={C.walnutL} />
    {[0, 1, 2].map((k) => <rect key={k} x={-84 + k * 16} y={-236} width={8} height={120} fill={C.walnutD} opacity={0.5} />)}
    <rect x={-80} y={-104} width={60} height={24} rx={10} fill={C.tomato} />
  </g>
)
// # a small moon + stars (for "while you sleep")
export const Moon: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={70} fill="#F6EFD2" opacity={0.25} /><circle r={50} fill="#F6EFD2" /><circle cx={20} cy={-12} r={44} fill="#1C3A32" />
  </g>
)
// # a money plant in a pot: `g` 0–1 grows it (leaves are bills, coins as fruit)
export const MoneyPlant: React.FC<{ x: number; y: number; s?: number; g: number; o?: number }> = ({ x, y, s = 1, g, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={90} ry={14} fill="#000" opacity={0.22} />
    <path d="M-70 -90 L70 -90 L54 0 L-54 0 Z" fill={C.tomato} /><rect x={-80} y={-108} width={160} height={24} rx={8} fill={C.tomatoD} />
    <path d={`M0 -100 C -10 ${-100 - 120 * g} 10 ${-100 - 200 * g} 0 ${-100 - 300 * g}`} stroke={C.cashD} strokeWidth={10} fill="none" />
    {[0, 1, 2, 3, 4].map((k) => { const t = (k + 1) / 5, show = clamp01(g * 5 - k), yy = -100 - 300 * g * t, side = k % 2 ? 1 : -1
      return show > 0.01 ? <g key={k} transform={`translate(${side * 10} ${yy}) rotate(${side * 30}) scale(${show})`}><ellipse cx={side * 50} cy={0} rx={56} ry={24} fill={C.cash} /><path d={`M0 0 L${side * 100} 0`} stroke={C.cashD} strokeWidth={3} /></g> : null })}
    {g > 0.9 && [0, 1].map((k) => <Coin key={k} x={k ? 60 : -60} y={-100 - 300 * g * (k ? 0.55 : 0.75)} r={26} o={clamp01((g - 0.9) * 10)} />)}
  </g>
)
// # a percent sign medallion (the "same idea" every lesson shares)
export const PctBadge: React.FC<{ x: number; y: number; r?: number; o?: number; color?: string }> = ({ x, y, r = 40, o = 1, color = C.brass }) => (
  o <= 0.01 ? null : <g transform={`translate(${x} ${y})`} opacity={o}><circle r={r} fill={color} /><circle r={r * 0.82} fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} /><text y={r * 0.36} textAnchor="middle" fill="#fff" style={{ font: `400 ${r * 1.1}px ${FONT.big}` }}>%</text></g>
)
export const popIn = (f: number, a: number, d = 12) => (f < a ? 0 : pop(f, a, d))
export const show = (f: number, a: number, d = 8) => on(f, a, d)
