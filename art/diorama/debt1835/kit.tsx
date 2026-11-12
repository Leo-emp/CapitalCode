// ============================================================
// LONG VIDEO — "America Once Paid Off All Its Debt. Here's What Happened Next."
// Fresh drawing kit for this video only (owner 2026-11-03: everything fresh,
// buildings and scenes made for the topic). An 1830s world in warm parchment
// colours — Treasury with columns, harbour customs house, frontier land office,
// brick banks with gold vaults — plus a few modern objects for today's debt.
// Only the shared engine (timing helpers, cast rig, labels) comes from outside.
// House rules: everything appears ON its spoken word; nothing covers anything;
// one picture group at a time; labels sit on the thing they name.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { clamp01, lerp, on, P, pop } from '../kit'

// ------------------------------------------------------------ palette for this video (1830s print colours)
export const C = {
  parch: '#F6E9CC', parchD: '#E3CFA4', sepia: '#6B4A2B', sepiaL: '#9A7550', brick: '#B5533C', brickD: '#8C3B29',
  forest: '#2F6B4F', forestL: '#4E9470', ink: '#1F2A44', stone: '#E8E1D3', stoneD: '#C9BFAE', roof: '#5B6B82',
  gold: '#E2B341', goldD: '#A97C1F', silver: '#C9D2DC', silverD: '#8C98A6', sea: '#6FA9C9', seaD: '#3E7FA6',
  wood: '#A9733F', woodD: '#7A4E26', field: '#C9B66A', fieldD: '#A99543', night: '#1C2B4A', glow: '#FFE7A3',
  // # warning and all-good accents, readable on the night stage
  coral: '#F07A63', mint: '#6FD9A8',
}

// ------------------------------------------------------------ ground: a sandy street (cream scenes) or a dark pavement (night scenes)
export const Street: React.FC<{ y: number; dark?: boolean; o?: number }> = ({ y, dark, o = 1 }) => (
  <g opacity={o}>
    <rect x={-40} y={y} width={2000} height={1080 - y + 40} fill={dark ? '#14213B' : '#E4D2AE'} />
    <rect x={-40} y={y} width={2000} height={8} fill={dark ? '#2C3F63' : '#CDB487'} />
    {Array.from({ length: 14 }, (_, k) => <rect key={k} x={k * 150 - 20} y={y + 40 + (k % 2) * 30} width={70} height={6} rx={3} fill={dark ? '#22345A' : '#D6C092'} />)}
  </g>
)

// ------------------------------------------------------------ money objects
// # a gold (or silver) coin with a star — the 1830s "hard money"
export const Coin: React.FC<{ x: number; y: number; r?: number; o?: number; silver?: boolean; s?: number }> = ({ x, y, r = 30, o = 1, silver, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={r * 0.16} r={r} fill={silver ? C.silverD : C.goldD} /><circle r={r} fill={silver ? C.silver : C.gold} />
    <circle r={r * 0.74} fill="none" stroke={silver ? C.silverD : C.goldD} strokeWidth={r * 0.1} />
    <path d={star(r * 0.42)} fill={silver ? C.silverD : C.goldD} />
  </g>
)
const star = (R: number) => Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? R * 0.45 : R; return `${k ? 'L' : 'M'}${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}` }).join(' ') + 'Z'
// # a short stack of coins standing on a surface (n coins, bottom at y)
export const CoinStack: React.FC<{ x: number; y: number; n: number; w?: number; silver?: boolean; o?: number }> = ({ x, y, n, w = 70, silver, o = 1 }) => (
  <g opacity={o}>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => (
    <g key={k}><ellipse cx={x} cy={y - k * 12} rx={w / 2} ry={w * 0.16} fill={silver ? C.silverD : C.goldD} /><ellipse cx={x} cy={y - k * 12 - 5} rx={w / 2} ry={w * 0.16} fill={silver ? C.silver : C.gold} /></g>))}</g>
)
// # a canvas money sack with a $ on it
export const Sack: React.FC<{ x: number; y: number; s?: number; o?: number; label?: string }> = ({ x, y, s = 1, o = 1, label = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={70} ry={14} fill={P.shadow} opacity={0.15} />
    <path d="M-60 0 C-80 -60 -50 -110 -22 -122 L22 -122 C50 -110 80 -60 60 0 Z" fill="#D9C08A" stroke={C.sepia} strokeWidth={5} />
    <path d="M-26 -122 L-34 -146 L34 -146 L26 -122 Z" fill="#C7AB72" stroke={C.sepia} strokeWidth={5} /><rect x={-30} y={-128} width={60} height={10} rx={4} fill={C.brick} />
    <Label x={0} y={-36} text={label} size={label.length > 2 ? 34 : 60} font="Bebas Neue" color={C.sepia} />
  </g>
)
// # a bond certificate: parchment, border, seal, the amount; `paid` stamps it PAID
export const Bond: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; amount?: string; paid?: number; tint?: string }> = ({ x, y, s = 1, r = 0, o = 1, amount = '$100', paid = 0, tint = C.parch }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-78} width={240} height={156} rx={8} fill={tint} stroke={C.sepiaL} strokeWidth={4} />
    <rect x={-106} y={-64} width={212} height={128} rx={4} fill="none" stroke={C.sepiaL} strokeWidth={2} strokeDasharray="6 5" />
    <Label x={0} y={-24} text="BOND" size={30} font="Bebas Neue" color={C.sepia} o={1 - paid} />
    <Label x={paid > 0 ? 0 : -12} y={lerp(34, -10, paid)} text={amount} size={46} font="Bebas Neue" color={C.ink} />
    <g opacity={1 - paid}><circle cx={74} cy={34} r={22} fill={C.brick} /><circle cx={74} cy={34} r={14} fill="none" stroke="#F3C7B9" strokeWidth={3} /></g>
    {paid > 0 && <g opacity={paid} transform={`translate(0 42) rotate(-6) scale(${(1.4 - 0.4 * paid) * 0.62})`}><rect x={-78} y={-30} width={156} height={60} rx={8} fill="none" stroke={C.forest} strokeWidth={7} /><Label x={0} y={16} text="PAID" size={46} font="Bebas Neue" color={C.forest} /></g>}
  </g>
)
// # a neat pile of bonds (n sheets), bottom at y — the debt drawn as paper
export const BondPile: React.FC<{ x: number; y: number; n: number; s?: number; o?: number }> = ({ x, y, n, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => (
      <g key={k} transform={`translate(${((k * 37) % 9) - 4} ${-k * 14})`}><rect x={-120} y={-14} width={240} height={14} rx={3} fill={k % 2 ? C.parch : C.parchD} stroke={C.sepiaL} strokeWidth={2} /></g>))}
  </g>
)
// # a paper banknote with its promise line
export const Note: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; v?: string }> = ({ x, y, s = 1, r = 0, o = 1, v = '$10' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-56} width={220} height={112} rx={8} fill="#DCE8D2" stroke={C.forest} strokeWidth={4} />
    <circle cx={-62} cy={0} r={30} fill="none" stroke={C.forest} strokeWidth={3} /><Label x={-62} y={12} text={v} size={30} font="Bebas Neue" color={C.forest} />
    <rect x={-18} y={-26} width={104} height={8} rx={4} fill={C.forestL} /><rect x={-18} y={-6} width={84} height={8} rx={4} fill={C.forestL} /><rect x={-18} y={14} width={96} height={8} rx={4} fill={C.forestL} />
  </g>
)

// ------------------------------------------------------------ 1830s buildings (all drawn for this video)
// # the Treasury: Greek-revival front, columns, pediment; `door` 0–1 lights the doorway
export const Treasury: React.FC<{ x: number; y: number; s?: number; o?: number; door?: number; label?: string; dark?: boolean }> = ({ x, y, s = 1, o = 1, door = 0, label = 'TREASURY', dark }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-300} y={-40} width={600} height={40} fill={dark ? '#3A4D72' : '#B7A785'} />
    <rect x={-270} y={-330} width={540} height={290} fill={dark ? '#2E4066' : '#D9CBB0'} stroke={dark ? 'none' : '#A8977A'} strokeWidth={4} />
    {Array.from({ length: 6 }, (_, k) => <g key={k}><rect x={-238 + k * 92} y={-320} width={30} height={280} fill={dark ? '#425886' : '#FBF7EF'} stroke={dark ? 'none' : '#B5A486'} strokeWidth={3} /><rect x={-244 + k * 92} y={-330} width={42} height={14} fill={dark ? '#4B6292' : '#B7A785'} /></g>)}
    <path d="M-300 -330 L0 -440 L300 -330 Z" fill={dark ? '#3A4D72' : '#B7A785'} /><path d="M-250 -342 L0 -425 L250 -342 Z" fill={dark ? '#2E4066' : '#E6DAC4'} />
    <Label x={0} y={-356} text={label} size={34} font="Bebas Neue" color={dark ? C.glow : C.sepia} />
    <rect x={-46} y={-170} width={92} height={130} rx={6} fill={dark ? '#18243F' : '#7C6A55'} /><rect x={-46} y={-170} width={92} height={130} rx={6} fill={C.glow} opacity={door * 0.85} />
    <path d="M0 -440 L0 -520" stroke={C.sepia} strokeWidth={5} /><path d="M0 -520 L64 -504 L0 -488 Z" fill={C.brick} />
  </g>
)
// # the Capitol dome (Congress)
export const Capitol: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-280} y={-150} width={560} height={150} fill="#D9CBB0" stroke="#A8977A" strokeWidth={4} /><rect x={-300} y={-160} width={600} height={16} fill="#B7A785" />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-250 + k * 60} y={-140} width={22} height={130} fill="#FBF7EF" stroke="#B5A486" strokeWidth={3} />)}
    <rect x={-110} y={-240} width={220} height={84} fill="#D9CBB0" stroke="#A8977A" strokeWidth={4} />{Array.from({ length: 6 }, (_, k) => <rect key={k} x={-96 + k * 36} y={-232} width={14} height={70} fill="#FBF7EF" stroke="#B5A486" strokeWidth={2} />)}
    <path d="M-120 -240 C-120 -380 120 -380 120 -240 Z" fill="#E6DAC4" stroke="#A8977A" strokeWidth={6} />
    <rect x={-12} y={-372} width={24} height={36} fill="#A8977A" /><path d="M0 -372 L0 -420" stroke={C.sepia} strokeWidth={4} /><path d="M0 -420 L40 -410 L0 -400 Z" fill={C.brick} />
  </g>
)
// # a harbour customs house (where tariffs were paid), with a counter window
export const CustomsHouse: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-190} y={-260} width={380} height={260} fill={C.brick} /><path d="M-210 -260 L0 -330 L210 -260 Z" fill={C.brickD} />
    <rect x={-170} y={-236} width={340} height={44} fill={C.stone} /><Label x={0} y={-204} text="CUSTOMS HOUSE" size={34} font="Bebas Neue" color={C.sepia} />
    <rect x={-120} y={-160} width={240} height={110} rx={8} fill="#F4E7C6" stroke={C.brickD} strokeWidth={6} />
    <rect x={-150} y={-52} width={300} height={22} fill={C.woodD} />
  </g>
)
// # a sailing merchant ship; `cargo` 0–1 shows cloth bales on deck
export const Ship: React.FC<{ x: number; y: number; s?: number; o?: number; cargo?: number; f: number }> = ({ x, y, s = 1, o = 1, cargo = 1, f }) => (
  <g transform={`translate(${x} ${y + Math.sin(f / 18) * 4}) rotate(${Math.sin(f / 26) * 1.2}) scale(${s})`} opacity={o}>
    <path d="M-230 -40 L230 -40 L180 40 L-190 40 Z" fill={C.woodD} /><rect x={-230} y={-52} width={460} height={14} fill={C.wood} />
    <rect x={-8} y={-330} width={14} height={290} fill={C.woodD} /><rect x={-128} y={-250} width={10} height={210} fill={C.woodD} />
    <path d="M10 -320 C110 -280 110 -130 10 -90 Z" fill="#FBF6EA" stroke={C.stoneD} strokeWidth={3} /><path d="M-114 -240 C-40 -210 -40 -110 -114 -84 Z" fill="#FBF6EA" stroke={C.stoneD} strokeWidth={3} />
    <path d="M6 -330 L60 -318 L6 -306 Z" fill={C.brick} />
    {[-170, -60, 60, 150].map((bx, k) => <g key={k} opacity={clamp01(cargo * 4 - k)}><rect x={bx - 34} y={-112} width={68} height={60} rx={6} fill={[C.brick, '#4A6FA5', C.forest, '#C79A3A'][k]} /><path d={`M${bx - 34} -94 L${bx + 34} -94 M${bx - 34} -72 L${bx + 34} -72`} stroke="#00000033" strokeWidth={4} /></g>)}
  </g>
)
// # water strip for the harbour
export const Water: React.FC<{ y: number; f: number; o?: number }> = ({ y, f, o = 1 }) => (
  <g opacity={o}><rect x={-40} y={y} width={2000} height={1120 - y} fill={C.sea} />
    {Array.from({ length: 16 }, (_, k) => <path key={k} d={`M${k * 130 - 60 + Math.sin(f / 20 + k) * 10} ${y + 30 + (k % 3) * 36} q30 -12 60 0`} stroke="#FFFFFF66" strokeWidth={5} fill="none" />)}</g>
)
// # a frontier land office (wooden false-front building)
export const LandOffice: React.FC<{ x: number; y: number; s?: number; o?: number; busy?: number }> = ({ x, y, s = 1, o = 1, busy = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-300} width={340} height={300} fill={C.wood} /><rect x={-170} y={-300} width={340} height={300} fill="url(#db-planks)" opacity={0.5} />
    <rect x={-190} y={-360} width={380} height={80} fill={C.woodD} /><Label x={0} y={-306} text="LAND OFFICE" size={44} font="Bebas Neue" color={C.parch} />
    <rect x={-50} y={-150} width={100} height={150} fill="#4B2F18" /><rect x={-50} y={-150} width={100} height={150} fill={C.glow} opacity={busy * 0.6} />
    <rect x={-140} y={-220} width={70} height={60} fill="#F4E7C6" stroke={C.woodD} strokeWidth={5} /><rect x={70} y={-220} width={70} height={60} fill="#F4E7C6" stroke={C.woodD} strokeWidth={5} />
  </g>
)
// # a field of land plots on the prairie; `sold` 0–1 fills plots with crops, `price` raises little up-arrows
export const Plots: React.FC<{ x: number; y: number; s?: number; o?: number; sold?: number; n?: number }> = ({ x, y, s = 1, o = 1, sold = 0, n = 8 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: n }, (_, k) => { const cx = (k % 4) * 150 - 225, cy = Math.floor(k / 4) * 90 - 45, t = clamp01(sold * n - k)
      return <g key={k} transform={`translate(${cx} ${cy}) skewX(-20)`}><rect x={-66} y={-36} width={132} height={72} fill={lerp(0, 1, t) > 0.5 ? C.field : '#D9CFA4'} stroke={C.fieldD} strokeWidth={4} />
        {t > 0 && <g opacity={t}>{[-40, 0, 40].map((sx) => <path key={sx} d={`M${sx} 24 L${sx} -18`} stroke={C.forest} strokeWidth={6} />)}</g>}</g> })}
  </g>
)
// # an 1830s brick bank with a cutaway vault; `fill` 0–1 = how full the vault is with coins; `shut` 0–1 closes the doors with a sign
export const Bank: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number; shut?: number; name?: string; cut?: boolean }> = ({ x, y, s = 1, o = 1, fill = 0.7, shut = 0, name = 'BANK', cut = true }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-160} y={-300} width={320} height={300} fill={C.brick} /><rect x={-176} y={-316} width={352} height={22} fill={C.brickD} />
    <rect x={-150} y={-286} width={300} height={42} fill={C.stone} /><Label x={0} y={-254} text={name} size={name.length > 10 ? 28 : 36} font="Bebas Neue" color={C.sepia} />
    {cut && <g><rect x={-130} y={-226} width={130} height={150} rx={10} fill="#3A2A1C" stroke={C.stoneD} strokeWidth={6} />
      {Array.from({ length: Math.round(clamp01(fill) * 9) }, (_, k) => <ellipse key={k} cx={-65} cy={-92 - k * 14} rx={46} ry={9} fill={k % 2 ? C.gold : C.goldD} />)}</g>}
    <rect x={30} y={-200} width={100} height={200} fill="#4B2F18" />
    <g opacity={shut}><rect x={30} y={-200} width={100} height={200} fill={C.brickD} /><path d="M80 -200 L80 0" stroke="#5A2618" strokeWidth={5} />
      <g transform="translate(80 -120) rotate(-8)"><rect x={-70} y={-24} width={140} height={48} rx={6} fill={C.parch} stroke={C.sepia} strokeWidth={4} /><Label x={0} y={12} text="CLOSED" size={34} font="Bebas Neue" color={C.brick} /></g></g>
  </g>
)
// # a covered wagon carrying a coin chest (coins travelling west)
export const Wagon: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; load?: number }> = ({ x, y, s = 1, o = 1, f, load = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-120} width={300} height={70} rx={8} fill={C.wood} />
    <path d="M-140 -120 C-140 -230 140 -230 140 -120 Z" fill="#FBF6EA" stroke={C.stoneD} strokeWidth={5} />
    {[-90, 0, 90].map((ax) => <path key={ax} d={`M${ax} -120 C${ax} -190 ${ax} -200 ${ax} -205`} stroke={C.stoneD} strokeWidth={4} fill="none" />)}
    <g opacity={load}><rect x={-60} y={-176} width={120} height={60} rx={8} fill={C.woodD} /><rect x={-60} y={-176} width={120} height={18} rx={6} fill={C.gold} /><Coin x={0} y={-132} r={18} /></g>
    {[-100, 100].map((wx) => <g key={wx} transform={`translate(${wx} -40) rotate(${f * 4})`}><circle r={42} fill="none" stroke={C.woodD} strokeWidth={9} />{[0, 60, 120].map((a) => <path key={a} d="M-40 0 L40 0" transform={`rotate(${a})`} stroke={C.woodD} strokeWidth={5} />)}</g>)}
  </g>
)
// # a VETO stamp (hand-held block) and its print
export const Stamp: React.FC<{ x: number; y: number; s?: number; o?: number; down?: number }> = ({ x, y, s = 1, o = 1, down = 0 }) => (
  <g transform={`translate(${x} ${y - (1 - down) * 90}) scale(${s})`} opacity={o}>
    <rect x={-24} y={-150} width={48} height={90} rx={14} fill={C.woodD} /><rect x={-70} y={-70} width={140} height={60} rx={10} fill={C.wood} /><rect x={-74} y={-14} width={148} height={16} rx={4} fill={C.brickD} />
  </g>
)
export const VetoPrint: React.FC<{ x: number; y: number; o: number; r?: number }> = ({ x, y, o, r = -10 }) => (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${1.25 - 0.25 * o})`}>
    <rect x={-104} y={-38} width={208} height={76} rx={8} fill="none" stroke={C.brick} strokeWidth={8} /><Label x={0} y={20} text="VETO" size={60} font="Bebas Neue" color={C.brick} />
  </g>
)
// # a scroll of paper (a law, an order) with a red seal
export const Scroll: React.FC<{ x: number; y: number; s?: number; o?: number; title?: string; open?: number }> = ({ x, y, s = 1, o = 1, title = 'LAW', open = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-170 * open} width={260} height={170 * open + 20} rx={6} fill={C.parch} stroke={C.sepiaL} strokeWidth={4} />
    <rect x={-146} y={-180 * open - 14} width={292} height={28} rx={14} fill={C.parchD} stroke={C.sepiaL} strokeWidth={4} /><rect x={-146} y={6} width={292} height={28} rx={14} fill={C.parchD} stroke={C.sepiaL} strokeWidth={4} />
    <g opacity={clamp01(open * 2 - 1)}><Label x={0} y={-120 * open} text={title} size={title.length > 14 ? 28 : title.length > 10 ? 34 : 40} font="Bebas Neue" color={C.sepia} />
      {[0, 1, 2].map((k) => <rect key={k} x={-96} y={-96 * open + k * 26} width={192 - k * 30} height={10} rx={5} fill={C.sepiaL} opacity={0.6} />)}
      <circle cx={80} cy={-24} r={22} fill={C.brick} /></g>
  </g>
)
// # a wall calendar page showing a year (drawn fresh: paper with rings and a red header)
export const YearPage: React.FC<{ x: number; y: number; s?: number; o?: number; year: string; top?: string }> = ({ x, y, s = 1, o = 1, year, top = 'YEAR' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-90} y={-90} width={180} height={180} rx={14} fill="#FFFDF7" stroke={C.stoneD} strokeWidth={5} /><rect x={-90} y={-90} width={180} height={48} rx={12} fill={C.brick} />
    <Label x={0} y={-56} text={top} size={28} font="Bebas Neue" color="#FFF5EA" /><Label x={0} y={44} text={year} size={70} font="Bebas Neue" color={C.ink} />
    {[-50, 50].map((rx) => <rect key={rx} x={rx - 6} y={-104} width={12} height={30} rx={6} fill={C.sepia} />)}
  </g>
)
// # a counting board: a big number that ticks from a to b between frames t0..t1 (for the falling debt)
export const Counter: React.FC<{ x: number; y: number; f: number; t0: number; t1: number; a: number; b: number; prefix?: string; size?: number; color?: string; o?: number; fmt?: (v: number) => string }> = ({ x, y, f, t0, t1, a, b, prefix = '$', size = 96, color = C.ink, o = 1, fmt }) => {
  const t = clamp01((f - t0) / Math.max(1, t1 - t0)), v = lerp(a, b, 1 - Math.pow(1 - t, 2))
  return <Label x={x} y={y} text={`${prefix}${fmt ? fmt(v) : Math.round(v).toLocaleString('en-US')}`} size={size} font="Bebas Neue" color={color} o={o} />
}

// ------------------------------------------------------------ modern objects (today's debt)
// # a modern government office block at night with lit windows
export const OfficeNight: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-200} y={-420} width={400} height={420} fill="#24365A" />
    {Array.from({ length: 30 }, (_, k) => <rect key={k} x={-170 + (k % 6) * 58} y={-390 + Math.floor(k / 6) * 76} width={34} height={44} rx={4} fill={C.glow} opacity={0.35 + 0.5 * ((Math.sin(k * 7.3 + f / 50) + 1) / 2)} />)}
    <rect x={-220} y={-440} width={440} height={26} fill="#31466F" />
  </g>
)
// # a stopwatch: the hand sweeps one full turn per second-of-story (t 0–1)
export const Stopwatch: React.FC<{ x: number; y: number; s?: number; o?: number; t: number }> = ({ x, y, s = 1, o = 1, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-22} y={-156} width={44} height={30} rx={8} fill={C.silverD} /><circle r={130} fill={C.silver} /><circle r={112} fill="#FFFDF7" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-3} y={-104} width={6} height={18} rx={3} fill={C.ink} transform={`rotate(${k * 30})`} />)}
    <path d="M0 0 L0 -92" stroke={C.brick} strokeWidth={8} strokeLinecap="round" transform={`rotate(${t * 360})`} /><circle r={12} fill={C.ink} />
  </g>
)
// # a coin column with its value written on its base — used for comparisons (height in px)
export const Column: React.FC<{ x: number; y: number; h: number; w?: number; color?: string; o?: number }> = ({ x, y, h, w = 120, color = C.gold, o = 1 }) => (
  <g opacity={o}><rect x={x - w / 2} y={y - h} width={w} height={h} rx={10} fill={color} />
    {Array.from({ length: Math.floor(h / 26) }, (_, k) => <rect key={k} x={x - w / 2} y={y - 26 * (k + 1)} width={w} height={4} fill="#00000022" />)}</g>
)
// # a shield (national defense), drawn simply
export const Shield: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 -120 L100 -84 C100 10 60 70 0 110 C-60 70 -100 10 -100 -84 Z" fill="#4A6FA5" stroke="#2E4A78" strokeWidth={8} />
    <path d={star(46)} fill="#F4EFE5" />
  </g>
)

// ------------------------------------------------------------ helpers
// # a soft bump on a cue word (the named thing pulses), returns a scale factor
export const bump = (f: number, at: number, amt = 0.07) => 1 + amt * on(f, at, 6) * (1 - on(f, at + 14, 8))
export { pop }
// # shared SVG defs for this video (plank texture for wooden buildings)
export const Defs: React.FC = () => (
  <defs><pattern id="db-planks" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="none" /><path d="M0 20 L40 20" stroke={C.woodD} strokeWidth="3" /></pattern></defs>
)

// ------------------------------------------------------------ backdrops: a quiet distant setting behind each scene (never in front)
// # owner bar: rich scenes, never an empty stage — but the backdrop stays low-contrast and below the headline zone
// # kinds: town (1830s hills, trees, church spire), harbour (far shore, lighthouse, gulls), prairie (hills, fence, windmill),
// # night (dark skyline + stars), modern (pale city skyline). Drawn before the street, so everything else sits in front.
export const Backdrop: React.FC<{ kind: 'town' | 'harbour' | 'prairie' | 'night' | 'modern'; f: number; y?: number }> = ({ kind, f, y = 880 }) => {
  const cloud = (cx: number, cy: number, s: number, k: number) => <g key={k} transform={`translate(${((cx + f * 0.25) % 2200) - 140} ${cy}) scale(${s})`} opacity={0.75}><ellipse cx={0} cy={0} rx={70} ry={26} fill="#FFFDF7" /><ellipse cx={-40} cy={8} rx={46} ry={20} fill="#FFFDF7" /><ellipse cx={46} cy={8} rx={50} ry={20} fill="#FFFDF7" /></g>
  if (kind === 'night') return (
    <g>
      {Array.from({ length: 22 }, (_, k) => <circle key={k} cx={(k * 97) % 1920} cy={260 + ((k * 53) % 220)} r={2 + (k % 3)} fill={C.glow} opacity={0.25 + 0.25 * Math.sin(f / 15 + k)} />)}
      <path d={`M-40 ${y} L-40 ${y - 120} L80 ${y - 120} L80 ${y - 190} L170 ${y - 190} L170 ${y - 140} L300 ${y - 140} L300 ${y - 230} L360 ${y - 250} L420 ${y - 230} L420 ${y - 150} L560 ${y - 150} L560 ${y - 110} L1380 ${y - 110} L1380 ${y - 170} L1500 ${y - 170} L1500 ${y - 260} L1560 ${y - 260} L1560 ${y - 160} L1700 ${y - 160} L1700 ${y - 210} L1820 ${y - 210} L1820 ${y - 130} L1960 ${y - 130} L1960 ${y} Z`} fill="#1B2A48" opacity={0.85} />
      {Array.from({ length: 14 }, (_, k) => <rect key={k} x={[100, 130, 320, 380, 460, 1410, 1440, 1520, 1530, 1600, 1640, 1730, 1760, 1860][k]} y={y - [170, 150, 200, 180, 130, 150, 130, 230, 200, 140, 120, 190, 170, 110][k]} width={14} height={18} fill={C.glow} opacity={0.35} />)}
    </g>)
  if (kind === 'modern') return (
    <g>
      {[cloud(300, 300, 1, 0), cloud(1100, 250, 0.8, 1), cloud(1700, 330, 0.9, 2)]}
      {Array.from({ length: 16 }, (_, k) => { const w = 70 + (k * 37) % 60, h = 120 + (k * 71) % 200, x = k * 128 - 40
        return <g key={k}><rect x={x} y={y - h} width={w} height={h} fill="#E4D7BE" />{Array.from({ length: Math.floor(h / 40) }, (_, r) => <rect key={r} x={x + 12} y={y - h + 14 + r * 40} width={w - 24} height={8} fill="#EFE5D2" />)}</g> })}
    </g>)
  if (kind === 'harbour') return (
    <g>
      {[cloud(200, 280, 1, 0), cloud(900, 230, 0.8, 1), cloud(1600, 300, 1.1, 2)]}
      <path d={`M-40 ${y - 70} C300 ${y - 140} 600 ${y - 110} 900 ${y - 90} L900 ${y - 60} L-40 ${y - 60} Z`} fill="#D9CDB0" />
      <g transform={`translate(160 ${y - 100})`}><rect x={-14} y={-150} width={28} height={150} fill="#F4EFE5" stroke="#C9BFAE" strokeWidth={3} /><rect x={-14} y={-110} width={28} height={16} fill={C.brick} /><rect x={-20} y={-172} width={40} height={24} rx={6} fill={C.glow} /></g>
      {[0, 1, 2].map((k) => <path key={k} d={`M${520 + k * 90 + Math.sin(f / 20 + k) * 20} ${330 + k * 26} q16 -14 32 0 q16 -14 32 0`} stroke="#8C98A6" strokeWidth={4} fill="none" />)}
    </g>)
  if (kind === 'prairie') return (
    <g>
      {[cloud(250, 270, 1, 0), cloud(1000, 310, 0.9, 1), cloud(1650, 250, 1, 2)]}
      <path d={`M-40 ${y} L-40 ${y - 120} C300 ${y - 220} 600 ${y - 160} 900 ${y - 130} C1200 ${y - 100} 1500 ${y - 210} 1960 ${y - 140} L1960 ${y} Z`} fill="#E3D2A6" />
      <g transform={`translate(1760 ${y - 150})`}><rect x={-6} y={-150} width={12} height={150} fill="#B9A27A" />{[0, 1, 2, 3].map((k) => <rect key={k} x={-4} y={-210} width={8} height={60} fill="#B9A27A" transform={`rotate(${k * 90 + f * 2} 0 -150)`} />)}</g>
      {Array.from({ length: 12 }, (_, k) => <g key={k}><rect x={k * 170} y={y - 46} width={8} height={46} fill="#C9AE80" /><rect x={k * 170} y={y - 38} width={170} height={5} fill="#C9AE80" /></g>)}
    </g>)
  // # town (default): far hills, a few trees and a church spire, drifting clouds
  return (
    <g>
      {[cloud(250, 290, 1, 0), cloud(1050, 240, 0.85, 1), cloud(1700, 310, 1.05, 2)]}
      <path d={`M-40 ${y} L-40 ${y - 110} C250 ${y - 200} 520 ${y - 150} 820 ${y - 130} C1150 ${y - 110} 1450 ${y - 190} 1960 ${y - 120} L1960 ${y} Z`} fill="#E9DCC0" />
      <g transform={`translate(1120 ${y - 120})`}><rect x={-26} y={-110} width={52} height={110} fill="#E0D0B0" /><path d="M-32 -110 L0 -190 L32 -110 Z" fill="#D6C29C" /></g>
      {[[140, 1], [330, 0.8], [1520, 1.1], [1840, 0.9]].map(([tx, ts], k) => <g key={k} transform={`translate(${tx} ${y - 8}) scale(${ts})`}><rect x={-7} y={-70} width={14} height={70} fill="#C9B48E" /><circle cx={0} cy={-96} r={44} fill="#D8CDA6" /></g>)}
    </g>)
}
