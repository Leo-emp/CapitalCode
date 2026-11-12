// ============================================================
// LONG VIDEO — "How Bonds Actually Work"
// Art direction: "THE ENGRAVED LOAN" — an old-money world of bond
// certificates: warm parchment paper with fine guilloche line-work,
// bottle-green engraving ink, brass, a touch of oxblood for losses.
// Settings change chapter by chapter: Nina's study, the Treasury hall
// with stone columns, a city skyline of borrowers, a market square
// with the big seesaw, a navy storm night for 2022 and the bank run,
// a calm harbour of portfolios, three doors at the end.
// Depth: gradients on walls and stone, soft contact shadows, paper
// grain + vignette on top. Owner rules: cream is the main world (r57),
// one picture group at a time (r55/r62/r79), nothing overlaps, no zooms
// (r56), show X then cross it (r68), labels stuck to their part.
// Only engine helpers are shared (timing, Person rig, Headline).
// ============================================================
import React from 'react'
import { clamp01, lerp } from '../kit'

// ------------------------------------------------------------ palette
export const B = {
  ink: '#1F3A33', inkSoft: '#4F6B62', inkL: '#8FA89E',
  parch: '#F8EFDA', parchD: '#E9DABA', parchL: '#FFF8E8', parchDD: '#D2BE95',
  green: '#2F6B55', greenD: '#1E4A3B', greenL: '#BFDCCB', mint: '#7CC3A0',
  brass: '#C9A04A', brassD: '#8F6E26', brassL: '#F1D891',
  ox: '#A8443A', oxD: '#7A2C25', oxL: '#F0C3B8',
  stone: '#E3D8C4', stoneD: '#BFAF92', stoneL: '#F4EDE0',
  navy: '#1C2A44', navyD: '#121C30', navyL: '#33476B', storm: '#4A5F86',
  sky: '#BFDDEB', skyD: '#86B5CC', coral: '#E58B6B', blue: '#5E8FC2', blueD: '#3B6797',
  white: '#FFFFFF', gold: '#E9C25A', goldD: '#A9822A',
}
export const FONT = { big: '"Bebas Neue"', body: 'Inter', serif: 'Georgia' }

// # cue helper: K = { name: 's9:offer' } → t.name = frame
export const cues = <T extends Record<string, string>>(c: (k: string) => number, K: T) => Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as { [P in keyof T]: number }
// # scenes dip instead of crossfading: the old one is gone by b, the next starts at b (never two at once)
export const fadeIn = (f: number, a: number, d = 8) => (a <= 0 ? 1 : clamp01((f - a) / d))
export const scene = (f: number, a: number, b: number, d = 8) => (f >= b ? 0 : fadeIn(f, a, d) * (1 - clamp01((f - (b - d)) / d)))
export const during = (f: number, a: number, b: number, d = 8) => clamp01((f - (a - 2)) / d) * (1 - clamp01((f - b) / d))
export const FLOOR = 900

// ------------------------------------------------------------ gradients + grain
export const BDefs: React.FC = () => (
  <>
  <rect width={1920} height={1080} fill={B.parch} />
  <defs>
    <linearGradient id="bd-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={B.parchL} /><stop offset="1" stopColor={B.parch} /></linearGradient>
    <linearGradient id="bd-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FBF2DE" /><stop offset="1" stopColor="#EBDCBB" /></linearGradient>
    <linearGradient id="bd-stone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={B.stoneD} /><stop offset="0.35" stopColor={B.stoneL} /><stop offset="1" stopColor={B.stone} /></linearGradient>
    <linearGradient id="bd-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B99B73" /><stop offset="1" stopColor="#8F7350" /></linearGradient>
    <linearGradient id="bd-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A8D2E6" /><stop offset="1" stopColor="#FBEBCB" /></linearGradient>
    <linearGradient id="bd-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={B.navyD} /><stop offset="1" stopColor={B.navyL} /></linearGradient>
    <linearGradient id="bd-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8DBFD3" /><stop offset="1" stopColor="#4F8BA8" /></linearGradient>
    <linearGradient id="bd-cert" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFF9EA" /><stop offset="1" stopColor="#EEDDB6" /></linearGradient>
    <linearGradient id="bd-brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={B.brassL} /><stop offset="1" stopColor={B.brassD} /></linearGradient>
    <linearGradient id="bd-greenbar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={B.mint} /><stop offset="1" stopColor={B.green} /></linearGradient>
    <linearGradient id="bd-oxbar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={B.coral} /><stop offset="1" stopColor={B.ox} /></linearGradient>
    <linearGradient id="bd-bluebar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8DB4DD" /><stop offset="1" stopColor={B.blueD} /></linearGradient>
    <radialGradient id="bd-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFF1C2" stopOpacity="0.9" /><stop offset="1" stopColor="#FFF1C2" stopOpacity="0" /></radialGradient>
    <radialGradient id="bd-vig" cx="0.5" cy="0.45" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#2A2410" stopOpacity="0.24" /></radialGradient>
    <filter id="bd-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" /><feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.22  0 0 0 0 0.15  0 0 0 0.07 0" /></filter>
  </defs>
  </>
)
export const BGrain: React.FC = () => <><rect width={1920} height={1080} filter="url(#bd-grain)" pointerEvents="none" /><rect width={1920} height={1080} fill="url(#bd-vig)" pointerEvents="none" /></>

// ------------------------------------------------------------ backdrops
// # engraved parchment with a faint guilloche wave pattern (the "certificate" world)
export const Parchment: React.FC<{ tint?: string }> = ({ tint }) => (
  <g>
    <rect width={1920} height={1080} fill="url(#bd-paper)" />
    {Array.from({ length: 14 }, (_, k) => <path key={k} d={`M0 ${120 + k * 70} ${Array.from({ length: 13 }, (_, j) => `Q${j * 160 + 80} ${120 + k * 70 + (j % 2 ? -18 : 18)} ${(j + 1) * 160} ${120 + k * 70}`).join(' ')}`} stroke={B.parchD} strokeWidth={2} fill="none" />)}
    <rect x={28} y={28} width={1864} height={1024} rx={18} fill="none" stroke={B.parchDD} strokeWidth={4} />
    <rect x={44} y={44} width={1832} height={992} rx={12} fill="none" stroke={B.parchD} strokeWidth={2} />
    {tint && <rect width={1920} height={1080} fill={tint} opacity={0.12} />}
  </g>
)

// # Nina's study: warm wall, a window, a bookshelf, wooden floor
export const Study: React.FC = () => (
  <g>
    <rect width={1920} height={FLOOR} fill="url(#bd-wall)" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={k * 170} y={0} width={4} height={FLOOR} fill={B.parchD} opacity={0.7} />)}
    <rect y={FLOOR - 24} width={1920} height={24} fill={B.parchDD} />
    <rect y={FLOOR} width={1920} height={180} fill="url(#bd-floor)" />
    {Array.from({ length: 12 }, (_, k) => <line key={k} x1={k * 170 + 50} x2={k * 170 - 30} y1={FLOOR} y2={1080} stroke="#7E6444" strokeWidth={3} opacity={0.45} />)}
    <g transform="translate(1500 250)">
      <rect x={-14} y={-14} width={328} height={358} rx={8} fill={B.parchDD} /><rect x={0} y={0} width={300} height={330} fill="url(#bd-sky)" />
      <path d="M0 260 Q80 200 150 240 Q220 200 300 250 L300 330 L0 330 Z" fill={B.greenL} />
      <rect x={145} y={0} width={10} height={330} fill={B.parchDD} /><rect x={0} y={160} width={300} height={10} fill={B.parchDD} />
    </g>
  </g>
)

// # a stone hall with columns (the Treasury); pediment on top
export const Hall: React.FC<{ title?: string }> = ({ title }) => (
  <g>
    <rect width={1920} height={1080} fill="url(#bd-wall)" />
    <path d="M160 260 L960 90 L1760 260 Z" fill={B.stone} stroke={B.stoneD} strokeWidth={6} />
    <path d="M300 236 L960 116 L1620 236 Z" fill={B.stoneL} />
    {title && <text x={960} y={222} textAnchor="middle" fill={B.inkSoft} style={{ font: `400 46px ${FONT.big}`, letterSpacing: 14 }}>{title}</text>}
    <rect x={140} y={260} width={1640} height={40} fill={B.stoneD} />
    {[220, 480, 1440, 1700].map((x) => <g key={x}><rect x={x - 46} y={300} width={92} height={FLOOR - 330} fill="url(#bd-stone)" />
      {[-24, 0, 24].map((d) => <line key={d} x1={x + d} x2={x + d} y1={310} y2={FLOOR - 40} stroke={B.stoneD} strokeWidth={3} opacity={0.6} />)}
      <rect x={x - 62} y={FLOOR - 40} width={124} height={40} fill={B.stoneD} /><rect x={x - 62} y={300} width={124} height={26} fill={B.stoneD} /></g>)}
    <rect y={FLOOR} width={1920} height={180} fill={B.stoneD} />
    {Array.from({ length: 10 }, (_, k) => <rect key={k} x={k * 200} y={FLOOR} width={196} height={180} fill={k % 2 ? B.stone : B.stoneL} opacity={0.55} />)}
  </g>
)

// # a city skyline seen from a park: sky, hills, a ground strip
export const Skyline: React.FC<{ night?: boolean }> = ({ night }) => (
  <g>
    <rect width={1920} height={1080} fill={`url(#${night ? 'bd-night' : 'bd-sky'})`} />
    {night && Array.from({ length: 40 }, (_, k) => <circle key={k} cx={(k * 197) % 1920} cy={40 + ((k * 89) % 320)} r={k % 5 ? 2 : 3} fill="#fff" opacity={0.5} />)}
    <path d="M0 760 Q300 680 640 740 Q980 690 1300 735 Q1620 680 1920 740 L1920 1080 L0 1080 Z" fill={night ? '#26375A' : B.greenL} />
    <rect y={FLOOR} width={1920} height={180} fill={night ? '#1A2640' : '#A9C9A0'} />
    <rect y={FLOOR} width={1920} height={10} fill={night ? '#10182A' : '#7FA779'} />
  </g>
)

// # a market square: cobbles, two awnings far back, sky
export const Square: React.FC = () => (
  <g>
    <rect width={1920} height={FLOOR} fill="url(#bd-sky)" />
    {[[0, 420, B.oxL], [360, 360, B.greenL], [1500, 400, B.brassL], [1800, 340, B.oxL]].map(([x, h, col], k) => (
      <g key={k}><rect x={x as number} y={FLOOR - (h as number)} width={300} height={h as number} fill={col as string} stroke={B.parchD} strokeWidth={4} />
        {Array.from({ length: 4 }, (_, j) => <rect key={j} x={(x as number) + 40 + (j % 2) * 130} y={FLOOR - (h as number) + 50 + Math.floor(j / 2) * 120} width={90} height={80} rx={6} fill="#fff" opacity={0.65} />)}</g>))}
    <rect y={FLOOR} width={1920} height={180} fill="#C9B596" />
    {Array.from({ length: 48 }, (_, k) => <ellipse key={k} cx={(k % 16) * 124 + (Math.floor(k / 16) % 2) * 62 + 30} cy={FLOOR + 40 + Math.floor(k / 16) * 52} rx={52} ry={16} fill="#B7A281" opacity={0.7} />)}
  </g>
)

// # a harbour at calm water (portfolio chapter): sky, sea, a pier
export const Harbour: React.FC = () => (
  <g>
    <rect width={1920} height={700} fill="url(#bd-sky)" />
    <rect y={700} width={1920} height={380} fill="url(#bd-sea)" />
    {Array.from({ length: 9 }, (_, k) => <path key={k} d={`M${k * 230 - 40} ${760 + (k % 3) * 70} q40 -14 80 0 q40 14 80 0`} stroke="#fff" strokeWidth={4} fill="none" opacity={0.5} />)}
    <rect y={FLOOR} width={1920} height={24} fill="#8F7350" /><rect y={FLOOR + 24} width={1920} height={14} fill="#6F5638" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={k * 170 + 40} y={FLOOR + 38} width={22} height={142} fill="#6F5638" />)}
  </g>
)

// ------------------------------------------------------------ the bond certificate (the hero object)
// # an engraved certificate: title, a seal, a big amount, a row of coupons along the bottom.
// #   coupons = how many coupons are still attached (0..n), n = total coupons drawn
export const Certificate: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; amount?: string; title?: string; rate?: string; coupons?: number; n?: number; color?: string; seal?: boolean; years?: string }> = ({ x, y, s = 1, r = 0, o = 1, amount = '$1,000', title = 'TREASURY NOTE', rate = '4%', coupons = 0, n = 10, color = B.green, seal = true, years }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-300} y={-190} width={600} height={380} rx={14} fill="#000" opacity={0.16} transform="translate(10 12)" />
    <rect x={-300} y={-190} width={600} height={380} rx={14} fill="url(#bd-cert)" stroke={color} strokeWidth={6} />
    <rect x={-280} y={-170} width={560} height={340} rx={10} fill="none" stroke={color} strokeWidth={2} />
    {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M-260 ${-150 + k * 8} ${Array.from({ length: 8 }, (_, j) => `Q${-260 + j * 65 + 32} ${-150 + k * 8 + (j % 2 ? -6 : 6)} ${-260 + (j + 1) * 65} ${-150 + k * 8}`).join(' ')}`} stroke={color} strokeWidth={1.4} fill="none" opacity={0.35} />)}
    <text x={0} y={-82} textAnchor="middle" fill={color} style={{ font: `400 52px ${FONT.big}`, letterSpacing: 8 }}>{title}</text>
    <text x={seal ? -40 : 0} y={30} textAnchor="middle" fill={B.ink} style={{ font: `400 120px ${FONT.big}` }}>{amount}</text>
    {seal && <g transform="translate(190 0)"><circle r={62} fill={B.brass} stroke={B.brassD} strokeWidth={5} />{Array.from({ length: 16 }, (_, k) => <line key={k} x1={0} y1={-48} x2={0} y2={-60} stroke={B.brassD} strokeWidth={4} transform={`rotate(${k * 22.5})`} />)}<text y={14} textAnchor="middle" fill={B.brassD} style={{ font: `400 42px ${FONT.big}` }}>{rate}</text></g>}
    {years && <text x={-40} y={90} textAnchor="middle" fill={B.inkSoft} style={{ font: `400 38px ${FONT.big}`, letterSpacing: 4 }}>{years}</text>}
    {/* coupon strip below the certificate */}
    {n > 0 && Array.from({ length: n }, (_, k) => {
      const w = 560 / n, on = k >= n - Math.round(coupons)
      return on ? <g key={k}><rect x={-280 + k * w + 3} y={200} width={w - 6} height={62} rx={6} fill="url(#bd-cert)" stroke={color} strokeWidth={3} strokeDasharray="6 4" /><text x={-280 + k * w + w / 2} y={244} textAnchor="middle" fill={color} style={{ font: `400 ${Math.min(30, w * 0.5)}px ${FONT.big}` }}>$20</text></g> : null
    })}
  </g>
)

// # one loose coupon (flies to its owner)
export const Coupon: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string; color?: string }> = ({ x, y, s = 1, r = 0, o = 1, text = '$20', color = B.green }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-56} y={-34} width={112} height={68} rx={8} fill="url(#bd-cert)" stroke={color} strokeWidth={4} strokeDasharray="7 4" />
    <text y={14} textAnchor="middle" fill={color} style={{ font: `400 40px ${FONT.big}` }}>{text}</text>
  </g>
)

// ------------------------------------------------------------ money
export const Coin: React.FC<{ x: number; y: number; r?: number; o?: number; label?: string }> = ({ x, y, r = 40, o = 1, label = '$' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r} fill={B.gold} stroke={B.goldD} strokeWidth={r * 0.12} /><circle r={r * 0.72} fill="none" stroke={B.goldD} strokeWidth={r * 0.05} opacity={0.6} />
    <text y={r * 0.3} textAnchor="middle" fill={B.goldD} style={{ font: `400 ${r * (label.length > 2 ? 0.6 : 0.9)}px ${FONT.big}` }}>{label}</text>
  </g>
)
// # a stack of coins, h coins tall
export const CoinStack: React.FC<{ x: number; y: number; h: number; r?: number; o?: number }> = ({ x, y, h, r = 46, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o}>{Array.from({ length: Math.max(0, Math.round(h)) }, (_, k) => <g key={k}><ellipse cx={x} cy={y - k * 16} rx={r} ry={r * 0.32} fill={B.goldD} /><ellipse cx={x} cy={y - k * 16 - 6} rx={r} ry={r * 0.32} fill={B.gold} /></g>)}</g>
)
// # a banknote bundle
export const Cash: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string }> = ({ x, y, s = 1, r = 0, o = 1, text = '$1,000' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {[2, 1, 0].map((k) => <rect key={k} x={-120 + k * 6} y={-60 - k * 8} width={240} height={120} rx={10} fill={k ? '#4E9A6E' : '#6DBB8A'} stroke="#2F7650" strokeWidth={4} />)}
    <rect x={-40} y={-60} width={34} height={120} fill={B.brassL} opacity={0.9} />
    <text x={40} y={18} textAnchor="middle" fill="#fff" style={{ font: `400 50px ${FONT.big}` }}>{text}</text>
  </g>
)

// ------------------------------------------------------------ buildings (borrowers)
export const Capitol: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = B.stoneL }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={300} ry={20} fill="#000" opacity={0.14} />
    <rect x={-280} y={-150} width={560} height={150} fill={color} stroke={B.stoneD} strokeWidth={5} />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-250 + k * 68} y={-140} width={26} height={130} fill={B.stone} stroke={B.stoneD} strokeWidth={2} />)}
    <rect x={-130} y={-210} width={260} height={60} fill={color} stroke={B.stoneD} strokeWidth={5} />
    <path d="M-120 -210 Q-120 -360 0 -370 Q120 -360 120 -210 Z" fill={color} stroke={B.stoneD} strokeWidth={5} />
    {[-70, -25, 25, 70].map((d) => <line key={d} x1={d} x2={d * 0.7} y1={-212} y2={-340} stroke={B.stoneD} strokeWidth={3} />)}
    <rect x={-10} y={-410} width={20} height={44} fill={B.stoneD} /><circle cx={0} cy={-418} r={14} fill={B.brass} />
  </g>
)
export const CityHall: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={260} ry={18} fill="#000" opacity={0.14} />
    <rect x={-230} y={-220} width={460} height={220} fill={B.oxL} stroke={B.ox} strokeWidth={5} />
    <path d="M-250 -220 L0 -330 L250 -220 Z" fill={B.ox} />
    <rect x={-40} y={-420} width={80} height={120} fill={B.oxL} stroke={B.ox} strokeWidth={5} /><circle cx={0} cy={-370} r={26} fill="#fff" stroke={B.ox} strokeWidth={4} />
    <path d="M-50 -420 L0 -470 L50 -420 Z" fill={B.ox} />
    {[-160, -60, 60, 160].map((d) => <rect key={d} x={d - 30} y={-180} width={60} height={80} rx={30} fill="#fff" opacity={0.8} />)}
    <rect x={-40} y={-90} width={80} height={90} rx={8} fill={B.ox} />
  </g>
)
export const Factory: React.FC<{ x: number; y: number; s?: number; o?: number; smoke?: number; shaky?: number }> = ({ x, y, s = 1, o = 1, smoke = 0, shaky = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${shaky * 4})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={270} ry={18} fill="#000" opacity={0.14} />
    <path d="M-250 0 L-250 -170 L-150 -230 L-150 -170 L-50 -230 L-50 -170 L50 -230 L50 -170 L250 -170 L250 0 Z" fill="#9FB3C8" stroke={B.blueD} strokeWidth={5} />
    <rect x={140} y={-360} width={60} height={190} fill="#7F96AE" stroke={B.blueD} strokeWidth={5} />
    {[-200, -100, 0].map((d) => <rect key={d} x={d} y={-120} width={60} height={60} rx={6} fill={B.brassL} />)}
    <rect x={110} y={-110} width={90} height={110} rx={6} fill={B.blueD} />
    {smoke > 0.01 && [0, 1, 2].map((k) => { const p = (smoke + k / 3) % 1; return <circle key={k} cx={170 + p * 60} cy={-380 - p * 160} r={24 + p * 30} fill="#E4E9EE" opacity={0.8 * (1 - p)} /> })}
  </g>
)
// # a bank with columns; crack 0–1, closed 0–1 (boards across the door)
export const Bank: React.FC<{ x: number; y: number; s?: number; o?: number; crack?: number; closed?: number; night?: boolean; sign?: string }> = ({ x, y, s = 1, o = 1, crack = 0, closed = 0, night, sign = 'BANK' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={320} ry={20} fill="#000" opacity={0.2} />
    <rect x={-300} y={-60} width={600} height={60} fill={night ? '#8D9AB5' : B.stoneD} />
    <rect x={-270} y={-330} width={540} height={270} fill={night ? '#B9C3D6' : B.stoneL} />
    {[-210, -105, 0, 105, 210].map((d) => <rect key={d} x={d - 24} y={-320} width={48} height={260} fill={night ? '#A3AEC4' : B.stone} />)}
    <path d="M-310 -330 L0 -460 L310 -330 Z" fill={night ? '#A3AEC4' : B.stone} stroke={night ? '#7C89A6' : B.stoneD} strokeWidth={5} />
    <rect x={-Math.max(150, sign.length * 12 + 30)} y={-392} width={Math.max(300, sign.length * 24 + 60)} height={44} rx={6} fill={night ? B.navyL : B.green} /><text x={0} y={-358} textAnchor="middle" fill="#fff" style={{ font: `400 36px ${FONT.big}`, letterSpacing: sign.length > 12 ? 2 : 6 }}>{sign}</text>
    <rect x={-60} y={-200} width={120} height={140} rx={10} fill={night ? B.navy : B.greenD} />
    {crack > 0.01 && <path d={`M40 -460 L10 ${-460 + 120 * crack} L60 ${-460 + 220 * crack} L20 ${-460 + 330 * crack} L50 ${-460 + 400 * crack}`} stroke={B.navyD} strokeWidth={8} fill="none" strokeLinejoin="round" />}
    {closed > 0.01 && <g opacity={closed}><rect x={-90} y={-170} width={180} height={28} rx={4} fill="#B08A57" transform="rotate(-14 0 -156)" /><rect x={-90} y={-110} width={180} height={28} rx={4} fill="#B08A57" transform="rotate(12 0 -96)" />
      <g transform={`translate(0 -250) scale(${lerp(1.3, 1, closed)})`}><rect x={-120} y={-34} width={240} height={68} rx={8} fill={B.ox} /><text y={18} textAnchor="middle" fill="#fff" style={{ font: `400 50px ${FONT.big}`, letterSpacing: 6 }}>CLOSED</text></g></g>}
  </g>
)

// ------------------------------------------------------------ labels, marks
export const Tag: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; bg?: string; ink?: string }> = ({ x, y, text, o = 1, size = 40, bg = B.ink, ink = '#fff' }) => {
  if (o <= 0.01) return null
  const w = text.length * size * 0.5 + size * 1.1
  return <g opacity={o}><rect x={x - w / 2} y={y - size * 0.82} width={w} height={size * 1.28} rx={size * 0.3} fill={bg} /><text x={x} y={y + size * 0.22} textAnchor="middle" fill={ink} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text></g>
}
export const Big: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; o?: number; anchor?: 'start' | 'middle' | 'end' }> = ({ x, y, text, size = 90, color = B.ink, o = 1, anchor = 'middle' }) => o <= 0.01 ? null : (
  <text x={x} y={y} textAnchor={anchor} fill={color} opacity={o} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>
)
export const Cross: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 110, p }) => {
  if (p <= 0.01) return null
  const a = clamp01(p * 2), b = clamp01(p * 2 - 1)
  return <g strokeLinecap="round" stroke={B.ox} strokeWidth={r * 0.16} opacity={0.95}>
    <line x1={x - r} y1={y - r} x2={x - r + 2 * r * a} y2={y - r + 2 * r * a} />
    {b > 0 && <line x1={x + r} y1={y - r} x2={x + r - 2 * r * b} y2={y - r + 2 * r * b} />}
  </g>
}
export const Tick: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 50, p }) => p <= 0.01 ? null : (
  <g opacity={clamp01(p * 1.5)}><circle cx={x} cy={y} r={r} fill={B.green} /><path d={`M${x - r * 0.45} ${y} L${x - r * 0.1} ${y + r * 0.35} L${x + r * 0.5} ${y - r * 0.35}`} stroke="#fff" strokeWidth={r * 0.18} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
)
// # a hanging price tag on a string (attached at x,y)
export const PriceTag: React.FC<{ x: number; y: number; text: string; o?: number; color?: string; s?: number }> = ({ x, y, text, o = 1, color = B.brass, s = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={0} y1={0} x2={0} y2={50} stroke={B.ink} strokeWidth={4} />
    <path d={`M${-Math.max(110, text.length * 17 + 20)} 50 L${Math.max(110, text.length * 17 + 20)} 50 L${Math.max(110, text.length * 17 + 20)} 150 L${-Math.max(110, text.length * 17 + 20)} 150 Z`} fill={color} stroke={B.ink} strokeWidth={4} />
    <circle cx={0} cy={66} r={7} fill={B.ink} />
    <text y={130} textAnchor="middle" fill={B.ink} style={{ font: `400 64px ${FONT.big}` }}>{text}</text>
  </g>
)
// # an arrow along a line (p 0–1 draws it)
export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; p?: number; color?: string; w?: number }> = ({ x1, y1, x2, y2, p = 1, color = B.ink, w = 12 }) => {
  if (p <= 0.01) return null
  const x = lerp(x1, x2, p), y = lerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1)
  return <g><line x1={x1} y1={y1} x2={x - Math.cos(a) * w * 1.6} y2={y - Math.sin(a) * w * 1.6} stroke={color} strokeWidth={w} strokeLinecap="round" />
    <path d={`M${x} ${y} L${x - Math.cos(a - 0.5) * w * 3.4} ${y - Math.sin(a - 0.5) * w * 3.4} L${x - Math.cos(a + 0.5) * w * 3.4} ${y - Math.sin(a + 0.5) * w * 3.4} Z`} fill={color} /></g>
}

// ------------------------------------------------------------ the seesaw (rates vs price)
// # tilt in degrees: + = left end UP (rates up on the left, price down on the right)
export const Seesaw: React.FC<{ x: number; y: number; w?: number; tilt: number; o?: number; left?: React.ReactNode; right?: React.ReactNode; color?: string }> = ({ x, y, w = 1100, tilt, o = 1, left, right, color = B.green }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={w * 0.25} ry={16} fill="#000" opacity={0.16} />
    <path d="M-90 0 L0 -170 L90 0 Z" fill={B.brass} stroke={B.brassD} strokeWidth={6} />
    <circle cx={0} cy={-170} r={18} fill={B.brassD} />
    <g transform={`translate(0 -170) rotate(${tilt})`}>
      <rect x={-w / 2} y={-22} width={w} height={36} rx={14} fill={color} stroke={B.greenD} strokeWidth={5} />
      <g transform={`translate(${-w / 2 + 110} -22) rotate(${-tilt})`}>{left}</g>
      <g transform={`translate(${w / 2 - 110} -22) rotate(${-tilt})`}>{right}</g>
    </g>
  </g>
)

// # a big round dial (rate meter) 0..max, value v
export const Dial: React.FC<{ x: number; y: number; v: number; max?: number; r?: number; o?: number; label?: string; text?: string; ink?: string }> = ({ x, y, v, max = 5, r = 200, o = 1, label = 'RATE', text, ink = B.ink }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d={`M${-r} 0 A${r} ${r} 0 0 1 ${r} 0 Z`} fill={B.parchL} stroke={B.ink} strokeWidth={8} />
    {Array.from({ length: max + 1 }, (_, k) => { const a = Math.PI * (1 - k / max); return <g key={k}><line x1={Math.cos(a) * r * 0.82} y1={-Math.sin(a) * r * 0.82} x2={Math.cos(a) * r * 0.95} y2={-Math.sin(a) * r * 0.95} stroke={B.ink} strokeWidth={6} />
      <text x={Math.cos(a) * r * 0.66} y={-Math.sin(a) * r * 0.66 + 14} textAnchor="middle" fill={B.inkSoft} style={{ font: `400 38px ${FONT.big}` }}>{k}%</text></g> })}
    <path d={`M${-r * 0.95} 0 A${r * 0.95} ${r * 0.95} 0 0 1 ${Math.cos(Math.PI * (1 - Math.min(v, max) / max)) * r * 0.95} ${-Math.sin(Math.PI * (1 - Math.min(v, max) / max)) * r * 0.95}`} stroke={B.ox} strokeWidth={14} fill="none" opacity={0.5} />
    <g transform={`rotate(${180 * Math.min(v, max) / max - 90})`}><path d={`M-12 0 L0 ${-r * 0.8} L12 0 Z`} fill={B.ox} /></g>
    <circle r={22} fill={B.ink} />
    <text y={70} textAnchor="middle" fill={ink} style={{ font: `400 44px ${FONT.big}`, letterSpacing: 4 }}>{text ?? label}</text>
  </g>
)

// # a shopping basket (everyday prices)
export const Basket: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={170} ry={14} fill="#000" opacity={0.15} />
    <path d="M-120 -170 Q0 -290 120 -170" stroke={B.brassD} strokeWidth={14} fill="none" />
    <circle cx={-60} cy={-180} r={46} fill={B.coral} /><rect x={-10} y={-250} width={70} height={110} rx={10} fill={B.blue} /><circle cx={80} cy={-170} r={40} fill={B.mint} />
    <path d="M-160 -150 L160 -150 L120 0 L-120 0 Z" fill="#C79A5C" stroke={B.brassD} strokeWidth={6} />
    {[-80, 0, 80].map((d) => <line key={d} x1={d} x2={d * 0.8} y1={-150} y2={0} stroke={B.brassD} strokeWidth={4} />)}
  </g>
)

// # a brass flourish under the headline that marks a spoken key word (gap filler, drawn fresh for this video)
export const Flourish: React.FC<{ f: number; at: number[]; y?: number; w?: number }> = ({ f, at, y = 214, w = 460 }) => {
  const a = at.filter((t) => f >= t && f < t + 26).pop()
  if (a === undefined) return null
  const p = clamp01((f - a) / 10), o = 1 - clamp01((f - a - 14) / 12), x0 = 960 - w / 2
  return <g opacity={o}><path d={`M${x0} ${y} Q${x0 + w * 0.25 * p} ${y - 12} ${x0 + w * 0.5 * p} ${y} T${x0 + w * p} ${y}`} stroke={B.brass} strokeWidth={6} fill="none" strokeLinecap="round" /><circle cx={x0 + w * p} cy={y} r={8} fill={B.brassD} /></g>
}
