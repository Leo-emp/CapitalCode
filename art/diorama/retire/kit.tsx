// ============================================================
// LONG VIDEO — "How Retirement Accounts Actually Work: 401(k), IRA and Roth" — this video's own art (r82/r83).
// Art direction: JORDAN'S GREENHOUSE. A retirement account is a glass greenhouse box (brass frame, misted panes);
// the investments inside are potted money plants whose leaves are coins; tax is a grey TAX envelope that coins fly into.
// Palette: forest green, terracotta pots, warm brass, slate-blue office, soft sky; depth from a far backdrop (office
// window, garden hedge, street), mid objects with drop shadows, and a near floor/bench. Settings change by chapter:
// Jordan's office desk, the greenhouse, the payroll line, a brokerage kiosk on a street, twin greenhouses, timed gates.
// Only the engine (timing, Person rig, Headline) is shared with other videos.
// ============================================================
import React from 'react'
import { clamp01, lerp, rnd } from '../kit'

export const R = {
  ink: '#1F2A2E', ink2: '#51626A', paper: '#FFFCF4', cream: '#F4EEDF', forest: '#2F6B4F', forestD: '#1E4A36', leaf: '#5DAA6F', leafL: '#A7D9A0',
  pot: '#C7663F', potD: '#984A2C', brass: '#C9A24A', brassD: '#8F7230', glass: '#DDF1F2', slate: '#5B7790', slateD: '#3E566C', sky: '#BFE2F2',
  gold: '#F2C14E', goldD: '#C8932A', grey: '#9AA3A8', greyD: '#6E777C', red: '#D24B3E', green: '#3C9B5C', wood: '#9C6B46', woodD: '#6B4630', sand: '#E9DCC0',
}
export const BB = (size: number) => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 1 })

export const Label: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; fill?: string; ink?: string }> = ({ x, y, text, o = 1, size = 42, fill = R.paper, ink = R.ink }) => {
  const w = Math.max(110, text.length * size * 0.47 + 40)
  return o > 0.001 ? <g transform={`translate(${x} ${y})`} opacity={o}><rect x={-w / 2} y={-size * 0.75 + 4} width={w} height={size * 1.25} rx={size * 0.35} fill="#000" opacity={0.12} /><rect x={-w / 2} y={-size * 0.75} width={w} height={size * 1.25} rx={size * 0.35} fill={fill} stroke={R.ink} strokeOpacity={0.15} strokeWidth={2} /><text y={size * 0.3} textAnchor="middle" fill={ink} style={BB(size)}>{text}</text></g> : null
}
export const No: React.FC<{ x: number; y: number; r?: number; o: number }> = ({ x, y, r = 100, o }) => o > 0.01 ? (
  <g transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * o})`} opacity={o}><circle r={r} fill="none" stroke={R.red} strokeWidth={r * 0.14} /><line x1={-r * 0.7} y1={-r * 0.7} x2={r * 0.7} y2={r * 0.7} stroke={R.red} strokeWidth={r * 0.14} strokeLinecap="round" /></g>
) : null
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={5} r={34} fill={R.goldD} /><circle r={34} fill={R.gold} /><circle r={25} fill="none" stroke={R.goldD} strokeWidth={4} opacity={0.7} />
    <text y={12} textAnchor="middle" fill={R.goldD} style={BB(text.length > 2 ? 26 : 38)}>{text}</text>
  </g>
)

// ------------------------------------------------------------ backdrops
// # Jordan's office: slate wall, a big window on the city, a desk in front
export const Office: React.FC<{ id: string; f: number; floor?: number; desk?: boolean }> = ({ id, f, floor = 920, desk = true }) => (
  <g>
    <defs><linearGradient id={`${id}-w`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DCE6EE" /><stop offset="1" stopColor="#C4D3DF" /></linearGradient>
      <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9ED0EA" /><stop offset="1" stopColor="#E6F4FA" /></linearGradient></defs>
    <rect x={-200} y={-200} width={2400} height={1500} fill={`url(#${id}-w)`} />
    <g transform="translate(1520 240) scale(0.55)"><rect x={-20} y={-20} width={700} height={500} rx={16} fill={R.slateD} /><rect width={660} height={460} rx={8} fill={`url(#${id}-s)`} />
      {Array.from({ length: 9 }, (_, k) => { const h = 120 + rnd(k + 5) * 220; return <rect key={k} x={10 + k * 72} y={460 - h} width={60} height={h} fill={k % 2 ? '#8FA8BE' : '#7D97AE'} opacity={0.8} /> })}
      <ellipse cx={(f * 0.3) % 760 - 50} cy={90} rx={70} ry={20} fill="#FFFFFF" opacity={0.85} />
      <rect x={322} width={16} height={460} fill={R.slateD} /></g>
    <rect x={-200} y={floor} width={2400} height={400} fill="#8C9AA6" /><rect x={-200} y={floor} width={2400} height={14} fill="#73828F" />
    {desk && <g><rect x={560} y={floor - 230} width={760} height={34} rx={8} fill={R.wood} /><rect x={600} y={floor - 196} width={26} height={196} fill={R.woodD} /><rect x={1254} y={floor - 196} width={26} height={196} fill={R.woodD} /></g>}
  </g>
)
// # the greenhouse interior: glass panes with brass mullions, light, a long wooden bench
export const GreenRoom: React.FC<{ id: string; f: number; mood?: 'day' | 'gold' | 'dusk'; floor?: number }> = ({ id, f, mood = 'day', floor = 920 }) => {
  const S = { day: ['#CFEDE4', '#F3FBF6'], gold: ['#F6D9A6', '#FFF4DD'], dusk: ['#5A5A86', '#F2A784'] }[mood]
  return (
    <g>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={S[0]} /><stop offset="1" stopColor={S[1]} /></linearGradient></defs>
      <rect x={-200} y={-200} width={2400} height={1500} fill={`url(#${id}-g)`} />
      <g opacity={0.5}>{Array.from({ length: 11 }, (_, k) => <rect key={k} x={-40 + k * 200} y={0} width={10} height={floor} fill={R.brassD} />)}
        {[200, 450, 700].map((y) => <rect key={y} x={-200} y={y} width={2400} height={8} fill={R.brassD} />)}</g>
      <g opacity={0.35}>{Array.from({ length: 14 }, (_, k) => <ellipse key={k} cx={-60 + k * 160} cy={floor - 40} rx={110} ry={90 + (k % 3) * 30} fill={k % 2 ? R.leaf : R.forest} />)}</g>
      <path d="M1500 -200 L1900 -200 L1300 1100 L900 1100 Z" fill="#FFFFFF" opacity={mood === 'dusk' ? 0.04 : 0.12} />
      <rect x={-200} y={floor} width={2400} height={400} fill="#B79C78" /><rect x={-200} y={floor} width={2400} height={16} fill={R.woodD} opacity={0.5} />
      {Array.from({ length: 16 }, (_, k) => <rect key={k} x={-200 + k * 150} y={floor + 40} width={130} height={10} rx={5} fill="#A68A66" />)}
      <g opacity={0.25 + 0.05 * Math.sin(f / 30)}><circle cx={1700} cy={140} r={120} fill="#FFF7D6" /></g>
    </g>
  )
}
// # a street with a brokerage kiosk row (step three)
export const Street: React.FC<{ id: string; f: number; floor?: number }> = ({ id, f, floor = 920 }) => (
  <g>
    <defs><linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F7D2A8" /><stop offset="1" stopColor="#FDF0DD" /></linearGradient></defs>
    <rect x={-200} y={-200} width={2400} height={1500} fill={`url(#${id}-s)`} />
    <circle cx={1580} cy={220 + 4 * Math.sin(f / 70)} r={90} fill="#FFF1C4" opacity={0.85} />
    <g opacity={0.5}>{Array.from({ length: 12 }, (_, k) => { const h = 260 + rnd(k + 9) * 260; return <rect key={k} x={-80 + k * 180} y={floor - h} width={160} height={h} fill={k % 2 ? '#D8B9A0' : '#CDA98D'} /> })}</g>
    <rect x={-200} y={floor} width={2400} height={400} fill="#B9AA95" /><rect x={-200} y={floor} width={2400} height={26} fill="#D6CAB5" />
  </g>
)

// ------------------------------------------------------------ the greenhouse box: a glass box with a brass frame; children are the plants inside
export const Box: React.FC<{ x: number; y: number; s?: number; o?: number; w?: number; h?: number; tag?: string; tagColor?: string; glow?: number; door?: 'in' | 'out' | 'none'; doorTax?: number; children?: React.ReactNode }> = ({ x, y, s = 1, o = 1, w = 420, h = 340, tag, tagColor = R.paper, glow = 0, door = 'none', doorTax = 0, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cy={10} rx={w * 0.62} ry={20} fill="#000" opacity={0.14} />
    {glow > 0 && <ellipse cy={-h / 2} rx={w * 0.8} ry={h * 0.75} fill={R.gold} opacity={0.22 * glow} />}
    <rect x={-w / 2 - 14} y={-20} width={w + 28} height={30} rx={8} fill={R.woodD} />
    <path d={`M${-w / 2} -20 L${-w / 2} ${-h} L0 ${-h - 90} L${w / 2} ${-h} L${w / 2} -20 Z`} fill={R.glass} opacity={0.55} />
    <g>{children}</g>
    <path d={`M${-w / 2} -20 L${-w / 2} ${-h} L0 ${-h - 90} L${w / 2} ${-h} L${w / 2} -20`} fill="none" stroke={R.brass} strokeWidth={10} strokeLinejoin="round" />
    <line x1={0} y1={-h - 90} x2={0} y2={-20} stroke={R.brass} strokeWidth={6} opacity={0.7} /><line x1={-w / 2} y1={-h * 0.5} x2={w / 2} y2={-h * 0.5} stroke={R.brass} strokeWidth={5} opacity={0.5} />
    <path d={`M${-w / 2 + 20} ${-h + 20} L${-w / 2 + 60} ${-h + 20} L${-w / 2 + 20} ${-h + 110} Z`} fill="#FFFFFF" opacity={0.5} />
    {door !== 'none' && <g transform={`translate(${door === 'in' ? -w / 2 : w / 2} -20)`}>
      <rect x={-34} y={-150} width={68} height={150} rx={8} fill={R.brassD} /><rect x={-24} y={-140} width={48} height={130} rx={6} fill={R.glass} />
      {doorTax > 0 && <g opacity={doorTax} transform="translate(0 -190)"><rect x={-60} y={-30} width={120} height={56} rx={10} fill={R.grey} /><text y={14} textAnchor="middle" fill={R.paper} style={BB(36)}>TAX</text></g>}
    </g>}
    {tag && <g transform={`translate(0 ${-h - 130})`}><rect x={-tag.length * 13 - 30} y={-34} width={tag.length * 26 + 60} height={62} rx={14} fill={R.ink} /><text y={14} textAnchor="middle" fill={tagColor} style={BB(46)}>{tag}</text></g>}
  </g>
)
// # a potted money plant; grow 0–1 sets its height and number of coin leaves
export const Plant: React.FC<{ x: number; y: number; s?: number; o?: number; grow?: number; f?: number; leaves?: string }> = ({ x, y, s = 1, o = 1, grow = 1, f = 0, leaves = R.gold }) => {
  const g = clamp01(grow), h = 40 + 180 * g, n = Math.round(2 + 8 * g)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d={`M0 -50 Q${6 * Math.sin(f / 30)} ${-50 - h / 2} 0 ${-50 - h}`} fill="none" stroke={R.forest} strokeWidth={8} strokeLinecap="round" />
      {Array.from({ length: n }, (_, k) => { const t = (k + 1) / (n + 1), side = k % 2 ? 1 : -1, yy = -50 - h * t
        return <g key={k}><path d={`M0 ${yy} Q${side * 30} ${yy - 20} ${side * 46} ${yy - 6}`} fill="none" stroke={R.forest} strokeWidth={5} /><circle cx={side * 52} cy={yy - 6} r={16} fill={leaves} stroke={R.goldD} strokeWidth={3} /></g> })}
      <path d="M-50 -60 L50 -60 L40 0 L-40 0 Z" fill={R.pot} /><rect x={-56} y={-70} width={112} height={18} rx={6} fill={R.potD} />
    </g>
  )
}
// # the grey TAX envelope that money flies into
export const TaxBox: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = 'TAX' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-90} y={-60} width={180} height={120} rx={12} fill={R.grey} /><path d="M-90 -60 L0 10 L90 -60" fill="none" stroke={R.greyD} strokeWidth={6} />
    <text y={44} textAnchor="middle" fill={R.paper} style={BB(40)}>{text}</text>
  </g>
)
// # the enrollment form: a % box and the account letters
export const Form: React.FC<{ x: number; y: number; s?: number; o?: number; pct?: string; checks?: number[]; r?: number }> = ({ x, y, s = 1, o = 1, pct = '_%', checks = [], r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-230} width={340} height={460} rx={14} fill={R.paper} stroke={R.ink} strokeOpacity={0.2} strokeWidth={3} />
    <rect x={-170} y={-230} width={340} height={60} rx={12} fill={R.slate} /><text y={-188} textAnchor="middle" fill={R.paper} style={BB(38)}>ENROLLMENT</text>
    <text x={-140} y={-110} fill={R.ink} style={BB(34)}>SAVE OF PAY:</text>
    <rect x={40} y={-150} width={100} height={56} rx={8} fill="#FFFFFF" stroke={R.ink} strokeWidth={3} /><text x={90} y={-108} textAnchor="middle" fill={R.forest} style={BB(44)}>{pct}</text>
    {['401(K)', 'IRA', 'ROTH', 'TRADITIONAL'].map((t, k) => <g key={t} transform={`translate(-140 ${-40 + k * 62})`}>
      <rect width={40} height={40} rx={6} fill="#FFFFFF" stroke={R.ink} strokeWidth={3} />
      {checks.includes(k) && <path d="M6 20 L16 32 L36 6" fill="none" stroke={R.green} strokeWidth={7} strokeLinecap="round" />}
      <text x={60} y={32} fill={R.ink} style={BB(36)}>{t}</text></g>)}
  </g>
)
// # a paycheck slip with an amount
export const Check: React.FC<{ x: number; y: number; s?: number; o?: number; amount?: string; r?: number }> = ({ x, y, s = 1, o = 1, amount = '$', r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-160} y={-70} width={320} height={140} rx={10} fill="#E9F4E6" stroke={R.forest} strokeWidth={4} />
    <text x={-130} y={-28} fill={R.forest} style={BB(30)}>PAYCHECK</text><text x={130} y={40} textAnchor="end" fill={R.ink} style={BB(52)}>{amount}</text>
    <line x1={-130} y1={40} x2={-20} y2={40} stroke={R.ink2} strokeWidth={3} />
  </g>
)
// # a padlock with a small timer text (vesting, age rules)
export const Lock: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string; open?: number }> = ({ x, y, s = 1, o = 1, text, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M-44 -40 L-44 ${-90 - 30 * open} Q-44 ${-140 - 30 * open} 0 ${-140 - 30 * open} Q44 ${-140 - 30 * open} 44 ${-90 - 30 * open} L44 -40`} fill="none" stroke={R.greyD} strokeWidth={16} />
    <rect x={-70} y={-50} width={140} height={120} rx={18} fill={R.brass} /><circle cy={0} r={14} fill={R.brassD} />
    {text && <text y={52} textAnchor="middle" fill={R.ink} style={BB(32)}>{text}</text>}
  </g>
)
// # an alarm clock with a number on its face
export const Clock: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string; f?: number; ring?: number }> = ({ x, y, s = 1, o = 1, text = '', f = 0, ring = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${ring * 6 * Math.sin(f)}) scale(${s})`} opacity={o}>
    <circle cx={-70} cy={-110} r={30} fill={R.red} /><circle cx={70} cy={-110} r={30} fill={R.red} />
    <circle r={120} fill={R.red} /><circle r={100} fill={R.paper} />
    <text y={30} textAnchor="middle" fill={R.ink} style={BB(96)}>{text}</text>
    <line x1={-60} y1={110} x2={-90} y2={150} stroke={R.ink} strokeWidth={12} /><line x1={60} y1={110} x2={90} y2={150} stroke={R.ink} strokeWidth={12} />
  </g>
)
// # a little moving van
export const Van: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number }> = ({ x, y, s = 1, o = 1, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cy={6} rx={220} ry={12} fill="#000" opacity={0.12} />
    <rect x={-210} y={-230} width={290} height={190} rx={12} fill={R.paper} stroke={R.slate} strokeWidth={5} /><text x={-65} y={-120} textAnchor="middle" fill={R.slate} style={BB(40)}>MOVING</text>
    <path d="M80 -170 L160 -170 L210 -100 L210 -40 L80 -40 Z" fill={R.slate} /><path d="M96 -156 L150 -156 L188 -106 L96 -106 Z" fill={R.sky} />
    {[-130, 140].map((cx) => <g key={cx} transform={`translate(${cx} -34) rotate(${f * 5})`}><circle r={32} fill={R.ink} /><circle r={12} fill="#C9CED6" /><rect x={-3} y={-12} width={6} height={24} fill={R.ink2} /></g>)}
  </g>
)
export { clamp01, lerp, rnd }
