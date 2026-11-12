// ============================================================
// "How Private Equity Actually Works" — shared drawings for the
// seven scene files in this folder. House style: big solid objects,
// soft shadows, labels stuck to the part they name, ≥ 44 px text.
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

const TXT = (px: number): React.CSSProperties => ({ font: `400 ${px}px "Bebas Neue"`, letterSpacing: 1 })
export const DEBT = '#5C7FB0', DEBT_D = '#3F5F8E', EQ = '#E9C25A', EQ_D = '#B88A2E', FIRM = '#2F3E66'

// ------------------------------------------------------------ a tall hotel tower with lit windows and a roof sign
export const Hotel: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number; name?: string; dim?: number }> = ({ x, y, s = 1, o = 1, lit = 1, name = 'HILTON', dim = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={280} ry={24} fill="#000" opacity={0.16} />
    <rect x={-170} y={-640} width={340} height={640} rx={10} fill="#E9DFCB" />
    <rect x={60} y={-640} width={110} height={640} rx={10} fill="#000" opacity={0.07} />
    {Array.from({ length: 11 }, (_, r) => [0, 1, 2, 3].map((c) => {
      const on = (r * 3 + c * 7) % 5 !== 0
      return <rect key={`${r}-${c}`} x={-140 + c * 74} y={-600 + r * 50} width={48} height={30} rx={4} fill={on ? '#FFD680' : '#9DB2CC'} opacity={on ? 0.35 + 0.65 * lit * (1 - dim) : 0.8} />
    }))}
    {/* entrance canopy */}
    <rect x={-120} y={-70} width={240} height={70} fill="#7A5A3A" /><rect x={-150} y={-96} width={300} height={30} rx={8} fill="#C94A3E" />
    <rect x={-60} y={-62} width={120} height={62} fill="#FFD680" opacity={0.75} />
    {/* roof sign */}
    <rect x={-150} y={-716} width={300} height={70} rx={10} fill="#1E3A63" />
    <text y={-664} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>{name}</text>
  </g>
)

// ------------------------------------------------------------ a toy store: striped awning, big windows with toys, roof sign
export const ToyStore: React.FC<{ x: number; y: number; s?: number; o?: number; dark?: number; f?: number }> = ({ x, y, s = 1, o = 1, dark = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={420} ry={26} fill="#000" opacity={0.16} />
    <rect x={-380} y={-400} width={760} height={400} rx={10} fill="#F4EBDD" />
    {/* sign */}
    <rect x={-300} y={-480} width={600} height={96} rx={18} fill="#2E5C9A" />
    <text y={-414} textAnchor="middle" fill="#FFFFFF" style={TXT(66)}>TOYS R US</text>
    {/* awning stripes */}
    {Array.from({ length: 10 }, (_, k) => <path key={k} d={`M${-380 + k * 76} -380 h76 l-6 60 q-32 22 -64 0 Z`} fill={k % 2 ? '#FFFFFF' : '#E85A4F'} />)}
    {/* windows with toys */}
    {[-230, 230].map((wx) => <g key={wx}>
      <rect x={wx - 120} y={-280} width={240} height={180} rx={10} fill={dark > 0.5 ? '#4A5A72' : '#BFE3FF'} />
      <g opacity={1 - dark}>
        {/* teddy */}
        <circle cx={wx - 60} cy={-150} r={34} fill="#B8834F" /><circle cx={wx - 60} cy={-196} r={26} fill="#B8834F" /><circle cx={wx - 80} cy={-216} r={10} fill="#B8834F" /><circle cx={wx - 40} cy={-216} r={10} fill="#B8834F" />
        {/* blocks */}
        <rect x={wx + 10} y={-160} width={44} height={44} rx={6} fill="#E85A4F" /><rect x={wx + 56} y={-160} width={44} height={44} rx={6} fill="#3DDC97" /><rect x={wx + 33} y={-206} width={44} height={44} rx={6} fill="#5BCBFF" />
      </g>
    </g>)}
    {/* door */}
    <rect x={-70} y={-250} width={140} height={250} rx={8} fill={dark > 0.5 ? '#3A465A' : '#FFD680'} />
    <rect x={-4} y={-250} width={8} height={250} fill="#7A5A3A" />
    {dark > 0 && <rect x={-380} y={-480} width={760} height={480} fill="#0E1B33" opacity={0.45 * clamp01(dark)} />}
  </g>
)

// ------------------------------------------------------------ the made-up pizza shop (Sunny Pizza): awning, oven glow, a pizza sign
export const PizzaShop: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; glow?: number; name?: string }> = ({ x, y, s = 1, o = 1, f = 0, glow = 0.6, name = 'SUNNY PIZZA' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={300} ry={22} fill="#000" opacity={0.15} />
    <rect x={-260} y={-330} width={520} height={330} rx={10} fill="#F6E3C4" />
    <rect x={-260} y={-330} width={520} height={30} fill="#E0C49A" />
    {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${-260 + k * 65} -300 h65 l-5 50 q-27 18 -55 0 Z`} fill={k % 2 ? '#FFF6E6' : '#E8873A'} />)}
    {/* window with the oven */}
    <rect x={-220} y={-220} width={250} height={160} rx={10} fill="#3A2A22" />
    <path d="M-190 -80 Q-95 -200 0 -80 Z" fill="#7A3B22" />
    <ellipse cx={-95} cy={-100} rx={70} ry={22} fill="#FF9A3C" opacity={0.5 + 0.4 * glow * (0.8 + 0.2 * Math.sin(f / 6))} />
    {/* door */}
    <rect x={70} y={-230} width={130} height={230} rx={8} fill="#8A5A36" /><rect x={90} y={-210} width={90} height={90} rx={6} fill="#FFD680" opacity={0.8} />
    {/* round pizza sign on the roof */}
    <g transform="translate(0 -400)">
      <rect x={-210} y={-44} width={420} height={88} rx={44} fill="#C94A3E" />
      <text y={20} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>{name}</text>
    </g>
    <g transform="translate(-200 -400)"><circle r={50} fill="#F4C26B" /><circle r={42} fill="#E8873A" />{[[-14, -12], [16, -6], [-4, 18], [20, 18]].map(([a, b], k) => <circle key={k} cx={a} cy={b} r={8} fill="#B93A2E" />)}</g>
  </g>
)

// ------------------------------------------------------------ a small pizza shop (for "opens new shops")
export const MiniShop: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: boolean }> = ({ x, y, s = 1, o = 1, sign = true }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={120} ry={10} fill="#000" opacity={0.13} />
    <rect x={-100} y={-150} width={200} height={150} rx={6} fill="#F6E3C4" />
    {Array.from({ length: 4 }, (_, k) => <path key={k} d={`M${-100 + k * 50} -150 h50 l-4 34 q-21 14 -42 0 Z`} fill={k % 2 ? '#FFF6E6' : '#E8873A'} />)}
    <rect x={-80} y={-90} width={90} height={70} rx={6} fill="#3A2A22" /><ellipse cx={-35} cy={-34} rx={30} ry={8} fill="#FF9A3C" opacity={0.7} />
    <rect x={30} y={-100} width={50} height={100} rx={5} fill="#8A5A36" />
    {sign && <circle cx={0} cy={-180} r={26} fill="#E8873A" stroke="#F4C26B" strokeWidth={6} />}
  </g>
)

// ------------------------------------------------------------ the fund: a big round-cornered vault box with a slot and a fill level
export const FundVault: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number; label?: string; open?: number }> = ({ x, y, s = 1, o = 1, fill = 0, label = 'THE FUND', open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={10} rx={250} ry={24} fill="#000" opacity={0.16} />
    <rect x={-220} y={-360} width={440} height={360} rx={30} fill="#2B4A78" />
    <rect x={-190} y={-330} width={380} height={300} rx={20} fill="#1E3A63" />
    {/* gold inside rises with fill */}
    <clipPath id="pe-fund-clip"><rect x={-190} y={-330} width={380} height={300} rx={20} /></clipPath>
    <g clipPath="url(#pe-fund-clip)">
      <rect x={-190} y={-30 - 300 * clamp01(fill)} width={380} height={300} fill={EQ} />
      {Array.from({ length: 6 }, (_, k) => <ellipse key={k} cx={-150 + k * 60} cy={-30 - 300 * clamp01(fill)} rx={34} ry={10} fill={EQ_D} opacity={fill > 0.02 ? 0.6 : 0} />)}
    </g>
    {/* slot + lid */}
    <g transform={`translate(0 ${-360 - 26 * open})`}><rect x={-240} y={-30} width={480} height={34} rx={12} fill="#E9C25A" /><rect x={-90} y={-20} width={180} height={12} rx={6} fill="#0E1B33" /></g>
    <rect x={-150} y={-210} width={300} height={70} rx={14} fill="#0E1B33" opacity={0.55} />
    <text y={-157} textAnchor="middle" fill="#FFFFFF" style={TXT(58)}>{label}</text>
  </g>
)

// ------------------------------------------------------------ the private equity firm's office: a dark glass building with a nameplate
export const FirmHQ: React.FC<{ x: number; y: number; s?: number; o?: number; name?: string; lit?: number }> = ({ x, y, s = 1, o = 1, name = 'PE FIRM', lit = 0.5 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={210} ry={18} fill="#000" opacity={0.15} />
    <rect x={-170} y={-470} width={340} height={470} rx={10} fill={FIRM} />
    <rect x={50} y={-470} width={120} height={470} rx={10} fill="#000" opacity={0.15} />
    {Array.from({ length: 8 }, (_, r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-140 + c * 96} y={-440 + r * 46} width={74} height={28} rx={4} fill={(r + c) % 3 === 0 ? '#FFD680' : '#7E9AC4'} opacity={(r + c) % 3 === 0 ? lit : 0.55} />))}
    <rect x={-60} y={-90} width={120} height={90} rx={6} fill="#FFD680" opacity={0.7} />
    <rect x={-150} y={-540} width={300} height={62} rx={12} fill="#E9C25A" />
    <text y={-492} textAnchor="middle" fill="#16294A" style={TXT(50)}>{name}</text>
  </g>
)

// ------------------------------------------------------------ a lender's bank (small classical front, blue name band)
export const Lender: React.FC<{ x: number; y: number; s?: number; o?: number; name?: string; glow?: number }> = ({ x, y, s = 1, o = 1, name = 'LENDERS', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={230} ry={16} fill="#000" opacity={0.14} />
    <rect x={-220} y={-24} width={440} height={24} rx={4} fill="#CFC3AA" />
    <rect x={-180} y={-280} width={360} height={256} fill="#EFE6D2" />
    {[-140, -70, 70, 140].map((cx) => <rect key={cx} x={cx - 16} y={-266} width={32} height={232} fill="#FFFFFF" />)}
    <rect x={-46} y={-180} width={92} height={156} rx={6} fill="#FFD680" opacity={0.6 + 0.4 * glow} />
    <path d="M-210 -280 L0 -390 L210 -280 Z" fill="#E2D8C2" />
    <rect x={-150} y={-344} width={300} height={50} rx={6} fill="#2E5C9A" />
    <text y={-306} textAnchor="middle" fill="#FFFFFF" style={TXT(42)}>{name}</text>
  </g>
)

// ------------------------------------------------------------ a stacked money column: segments bottom-up, each its own colour and label
// # value → height via `unit` px per unit; `split` slides segment k sideways by dx[k] (so one bar becomes its parts)
export type Seg = { v: number; col: string; colD: string; label?: string; lo?: number; dx?: number; dy?: number; o?: number }
export const MoneyColumn: React.FC<{ x: number; y: number; w?: number; unit: number; segs: Seg[]; grow?: number; labelSide?: 'left' | 'right' | 'in'; size?: number }> = ({ x, y, w = 220, unit, segs, grow = 1, labelSide = 'in', size = 46 }) => {
  let base = 0
  return (
    <g>
      {segs.map((sg, k) => {
        const h = sg.v * unit * clamp01(grow), top = y - base - h
        base += sg.v * unit
        const dx = sg.dx ?? 0, dy = sg.dy ?? 0
        const lx = labelSide === 'left' ? x + dx - w / 2 - 24 : labelSide === 'right' ? x + dx + w / 2 + 24 : x + dx
        const anchor = labelSide === 'left' ? 'end' : labelSide === 'right' ? 'start' : 'middle'
        return (
          <g key={k} opacity={sg.o ?? 1} transform={`translate(${dx} ${dy})`}>
            {h > 1 && <>
              <rect x={x - w / 2} y={top} width={w} height={h} rx={14} fill={sg.col} />
              <rect x={x + w * 0.18} y={top} width={w * 0.32} height={h} rx={0} fill={sg.colD} opacity={0.35} />
              <rect x={x - w / 2 + 10} y={top + 8} width={w - 20} height={Math.min(10, h / 4)} rx={5} fill="#FFFFFF" opacity={0.3} />
              {Array.from({ length: Math.floor(h / 46) }, (_, j) => <line key={j} x1={x - w / 2 + 8} x2={x + w / 2 - 8} y1={top + h - (j + 1) * 46} y2={top + h - (j + 1) * 46} stroke={sg.colD} strokeOpacity={0.4} strokeWidth={3} />)}
            </>}
            {sg.label && (sg.lo ?? 1) > 0 && h > 30 && <text x={lx - dx} y={top + h / 2 + size * 0.36} textAnchor={anchor} opacity={sg.lo ?? 1}
              fill={labelSide === 'in' ? '#16294A' : 'var(--cc-ink, #16294A)'} style={TXT(size)}>{sg.label}</text>}
          </g>
        )
      })}
    </g>
  )
}

// ------------------------------------------------------------ a heavy chain from a to b (the debt that sits on a company)
export const Chain: React.FC<{ a: [number, number]; b: [number, number]; t?: number; o?: number; col?: string }> = ({ a, b, t = 1, o = 1, col = '#8A97AA' }) => {
  const n = Math.max(2, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 34)), shown = Math.round(n * clamp01(t))
  const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI
  return (
    <g opacity={o}>{Array.from({ length: shown }, (_, k) => {
      const u = (k + 0.5) / n, x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u) + Math.sin(u * Math.PI) * 26
      return <ellipse key={k} cx={x} cy={y} rx={k % 2 ? 22 : 20} ry={k % 2 ? 6 : 12} fill="none" stroke={col} strokeWidth={7} transform={`rotate(${ang} ${x} ${y})`} />
    })}</g>
  )
}

// ------------------------------------------------------------ a padlock (the loan locked onto a company)
export const Lock: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-30 -10 v-30 a30 30 0 0 1 60 0 v30" fill="none" stroke="#8A97AA" strokeWidth={12} />
    <rect x={-46} y={-14} width={92} height={74} rx={12} fill="#5C6F8E" /><circle cx={0} cy={18} r={10} fill="#16294A" /><rect x={-4} y={20} width={8} height={22} fill="#16294A" />
  </g>
)

// ------------------------------------------------------------ a paper price tag on a string
export const PriceTag: React.FC<{ x: number; y: number; t: string; s?: number; o?: number; r?: number; col?: string; ink?: string; w?: number }> = ({ x, y, t, s = 1, o = 1, r = -6, col = '#F4C95D', ink = '#16294A', w }) => {
  const W = w ?? Math.max(200, t.length * 30 + 80)
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <path d={`M0 0 L40 -44 H${W} V44 H40 Z`} fill={col} stroke="#00000022" strokeWidth={2} /><circle cx={34} cy={0} r={9} fill="#16294A" opacity={0.5} />
      <text x={(40 + W) / 2 + 6} y={20} textAnchor="middle" fill={ink} style={TXT(56)}>{t}</text>
    </g>
  )
}

// ------------------------------------------------------------ a sealed fee envelope with a $ stamp
export const Envelope: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string }> = ({ x, y, s = 1, o = 1, r = 0, t = 'FEE' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-52} width={160} height={104} rx={10} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={3} />
    <path d="M-80 -50 L0 10 L80 -50" fill="none" stroke="#CDB58C" strokeWidth={4} />
    <circle cx={0} cy={18} r={22} fill="#E9C25A" /><text y={30} textAnchor="middle" fill="#16294A" style={TXT(34)}>$</text>
    <text y={-62} textAnchor="middle" fill="var(--cc-ink, #16294A)" style={TXT(36)}>{t}</text>
  </g>
)

// ------------------------------------------------------------ investor "types" as small icons on a pedestal: pension (school), insurer (umbrella),
// # university (columns), family (house), country fund (globe)
export type Inv = 'pension' | 'fire' | 'insure' | 'uni' | 'family' | 'country'
export const InvIcon: React.FC<{ kind: Inv; x: number; y: number; s?: number; o?: number }> = ({ kind, x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {kind === 'pension' && <g>{/* school with a bell */}<rect x={-70} y={-90} width={140} height={90} fill="#E85A4F" /><path d="M-84 -90 L0 -150 L84 -90 Z" fill="#B93A2E" /><rect x={-20} y={-50} width={40} height={50} fill="#FFD680" /><circle cx={0} cy={-112} r={14} fill="#E9C25A" />{[-50, 34].map((wx) => <rect key={wx} x={wx} y={-74} width={16} height={18} fill="#FFFFFF" />)}</g>}
    {kind === 'fire' && <g>{/* fire helmet */}<path d="M-70 -20 Q-70 -110 0 -110 Q70 -110 70 -20 Z" fill="#E85A4F" /><rect x={-90} y={-26} width={180} height={22} rx={10} fill="#B93A2E" /><path d="M-16 -100 L0 -70 L16 -100 Z" fill="#E9C25A" /></g>}
    {kind === 'insure' && <g>{/* umbrella */}<path d="M-90 -60 Q0 -170 90 -60 Q60 -78 30 -60 Q0 -78 -30 -60 Q-60 -78 -90 -60 Z" fill="#5BCBFF" /><rect x={-4} y={-64} width={8} height={70} fill="#5C6F8E" /><path d="M-4 6 q0 18 -18 18" fill="none" stroke="#5C6F8E" strokeWidth={8} /></g>}
    {kind === 'uni' && <g>{/* columns + dome */}<rect x={-80} y={-20} width={160} height={20} fill="#CFC3AA" />{[-60, -20, 20, 60].map((cx) => <rect key={cx} x={cx - 9} y={-100} width={18} height={80} fill="#FFFFFF" />)}<path d="M-90 -100 L0 -150 L90 -100 Z" fill="#E2D8C2" /><rect x={-30} y={-178} width={60} height={14} fill="#2E5C9A" /></g>}
    {kind === 'family' && <g>{/* big house */}<rect x={-80} y={-90} width={160} height={90} fill="#F4C95D" /><path d="M-96 -90 L0 -160 L96 -90 Z" fill="#B88A2E" /><rect x={-18} y={-54} width={36} height={54} fill="#8A5A36" />{[-60, 34].map((wx) => <rect key={wx} x={wx} y={-72} width={26} height={24} fill="#BFE3FF" />)}</g>}
    {kind === 'country' && <g>{/* globe on a stand */}<circle cx={0} cy={-90} r={66} fill="#5BCBFF" /><path d="M-40 -130 q30 10 20 40 q-20 20 -10 50 M10 -150 q30 30 50 20 M20 -60 q20 -10 40 10" fill="none" stroke="#3DDC97" strokeWidth={16} strokeLinecap="round" /><rect x={-6} y={-24} width={12} height={24} fill="#5C6F8E" /><rect x={-40} y={-6} width={80} height={10} rx={5} fill="#5C6F8E" /></g>}
  </g>
)

// ------------------------------------------------------------ a stock-ticker board (switches off when the company goes private)
export const Ticker: React.FC<{ x: number; y: number; s?: number; o?: number; off?: number; f?: number }> = ({ x, y, s = 1, o = 1, off = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-260} y={-70} width={520} height={140} rx={16} fill="#0E1B33" />
    <rect x={-240} y={-50} width={480} height={100} rx={8} fill="#13284A" />
    <g opacity={1 - off}>{['ABC ▲1.2', 'XYZ ▼0.4', 'HLT ▲2.1', 'TOY ▼0.9'].map((t, k) => <text key={k} x={-220 + ((k * 170 - f * 3) % 680 + 680) % 680 - 120} y={16} fill={t.includes('▲') ? '#3DDC97' : '#F06B5B'} style={TXT(40)}>{t}</text>)}</g>
    {off > 0 && <text y={18} textAnchor="middle" fill="#8A97AA" opacity={off} style={TXT(48)}>NOT TRADED</text>}
  </g>
)

// ------------------------------------------------------------ a share certificate (paper with a seal)
export const Share: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-70} y={-48} width={140} height={96} rx={8} fill="#FFFDF5" stroke="#CDB58C" strokeWidth={3} />
    <rect x={-56} y={-34} width={112} height={68} rx={4} fill="none" stroke="#7FC8D8" strokeWidth={3} />
    <text y={-6} textAnchor="middle" fill="#2E5C9A" style={TXT(30)}>SHARE</text>
    <circle cx={36} cy={22} r={12} fill="#E9C25A" />
  </g>
)

// ------------------------------------------------------------ a magnifying glass (the firm searching; or debt "magnifying" a pile)
export const Glass: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; children?: React.ReactNode }> = ({ x, y, s = 1, o = 1, r = -35, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <g transform={`rotate(${r})`}><rect x={-14} y={110} width={28} height={150} rx={12} fill="#7A5A3A" /></g>
    <circle r={120} fill="#E6F6FF" opacity={0.35} />
    {children}
    <circle r={120} fill="none" stroke="#2B4A78" strokeWidth={18} />
    <path d="M-70 -60 A90 90 0 0 1 -20 -100" fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.7} />
  </g>
)

// ------------------------------------------------------------ an hourglass-free year strip: n small calendar pages, k shown
export const YearStrip: React.FC<{ x: number; y: number; n: number; shown: number; label?: (i: number) => string; o?: number; gap?: number }> = ({ x, y, n, shown, label = (i) => String(i + 1), o = 1, gap = 96 }) => (
  <g opacity={o}>{Array.from({ length: n }, (_, k) => {
    const t = clamp01(shown - k)
    return t > 0 ? <g key={k} transform={`translate(${x + (k - (n - 1) / 2) * gap} ${y - 10 * (1 - t)})`} opacity={t}>
      <rect x={-38} y={-40} width={76} height={80} rx={10} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={2} /><rect x={-38} y={-40} width={76} height={22} rx={10} fill="#C94A3E" />
      <text y={30} textAnchor="middle" fill="#16294A" style={TXT(40)}>{label(k)}</text></g> : null
  })}</g>
)

export { TXT }
