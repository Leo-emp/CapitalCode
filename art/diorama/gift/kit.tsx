// ============================================================
// LONG VIDEO — "Why Companies Love Selling You Gift Cards" — objects for
// this story: the gift card itself (with its balance), the coffee shop
// (counter, till, menu, espresso machine), cups (made, or a dashed
// "not made yet" outline), the shop's book of what it owes and what it
// sold, a chest of drawers, a clothes rail, shop fronts with shutters,
// a government building and small survey figures. The cast, headline
// and coin helpers come from ../aimoney/common. One file per scene.
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'
import { Label } from '../charts'

// ------------------------------------------------------------ the gift card
// # a plastic card at a slight tilt: a colour band, a chip, GIFT CARD and its balance. crack 0–1 dims it and draws a crack
export const GiftCard: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; amount?: string; color?: string; crack?: number; title?: string }> = ({ x, y, s = 1, r = 0, o = 1, amount, color = '#2FA36B', crack = 0, title = 'GIFT CARD' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-104} width={340} height={208} rx={22} fill="#000" opacity={0.18} transform="translate(10 12)" />
    <rect x={-170} y={-104} width={340} height={208} rx={22} fill={color} />
    <rect x={-170} y={-104} width={340} height={70} rx={22} fill="#FFFFFF" opacity={0.16} />
    <circle cx={120} cy={-50} r={56} fill="#FFFFFF" opacity={0.12} />
    <rect x={-140} y={-62} width={60} height={46} rx={8} fill={P.gold} /><rect x={-140} y={-42} width={60} height={4} fill={P.goldD} />
    <text x={-140} y={46} fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>
    {amount && <text x={146} y={72} textAnchor="end" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"' }}>{amount}</text>}
    {/* # a ribbon bow in the corner */}
    <path d="M110 -104 L110 104" stroke={P.coral} strokeWidth={14} opacity={0.85} />
    {crack > 0 && <g opacity={crack}><rect x={-170} y={-104} width={340} height={208} rx={22} fill="#1B2233" opacity={0.45} />
      <path d="M-40 -104 L-10 -40 L-50 10 L0 60 L-20 104" fill="none" stroke="#FFFFFF" strokeWidth={6} strokeLinejoin="round" /></g>}
  </g>
)

// ------------------------------------------------------------ a banknote with its amount (green, two-tone, a portrait circle)
export const Note: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string }> = ({ x, y, s = 1, r = 0, o = 1, text = '50' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-62} width={240} height={124} rx={12} fill="#000" opacity={0.16} transform="translate(6 8)" />
    <rect x={-120} y={-62} width={240} height={124} rx={12} fill="#5FBF7F" />
    <rect x={-106} y={-48} width={212} height={96} rx={8} fill="none" stroke="#2E8B57" strokeWidth={4} />
    <circle cx={0} cy={0} r={30} fill="#2E8B57" opacity={0.35} />
    <text x={-92} y={-16} fill="#1F5A3E" style={{ font: '800 30px Inter' }}>{text}</text>
    <text x={92} y={40} textAnchor="end" fill="#1F5A3E" style={{ font: '800 30px Inter' }}>{text}</text>
    <rect x={-120} y={-62} width={240} height={18} rx={12} fill="#FFFFFF" opacity={0.14} />
  </g>
)

// ------------------------------------------------------------ cups
// # a takeaway coffee cup; ghost = only a dashed outline (a drink that has not been made yet)
export const Cup: React.FC<{ x: number; y: number; s?: number; o?: number; ghost?: boolean; steam?: number; f?: number }> = ({ x, y, s = 1, o = 1, ghost, steam = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {ghost ? <g fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="12 10" strokeLinejoin="round">
      <path d="M-56 -150 L56 -150 L44 0 L-44 0 Z" /><rect x={-64} y={-172} width={128} height={24} rx={10} />
    </g> : <g>
      <ellipse cx={0} cy={4} rx={56} ry={12} fill="#000" opacity={0.18} />
      <path d="M-56 -150 L56 -150 L44 0 L-44 0 Z" fill="#F7FAFF" />
      <path d="M-52 -104 L52 -104 L47 -46 L-47 -46 Z" fill="#C98F5A" />
      <path d="M12 -150 L56 -150 L44 0 L22 0 Z" fill="#000" opacity={0.07} />
      <rect x={-64} y={-172} width={128} height={26} rx={10} fill="#5A3A22" />
      {steam > 0 && [-20, 10].map((dx, k) => <path key={k} d={`M${dx} -186 q 14 -24 0 -48 q -14 -24 0 -48`} fill="none" stroke={P.ink2} strokeWidth={5} strokeLinecap="round" opacity={steam * (0.4 + 0.3 * Math.sin(f / 8 + k))} />)}
    </g>}
  </g>
)

// ------------------------------------------------------------ the coffee shop
// # back wall: a menu board and an espresso machine; the counter is drawn by the scene (Counter from common)
export const ShopBack: React.FC<{ o?: number; f: number; steam?: number }> = ({ o = 1, f, steam = 0 }) => (
  <g opacity={o}>
    <rect x={180} y={230} width={520} height={250} rx={18} fill="#2A2F38" />
    {[0, 1, 2, 3].map((k) => <g key={k}><rect x={220} y={278 + k * 46} width={250 - (k % 2) * 60} height={16} rx={8} fill="#F2E6CC" opacity={0.75} /><rect x={600} y={278 + k * 46} width={60} height={16} rx={8} fill={P.gold} opacity={0.85} /></g>)}
    <text x={440} y={262} textAnchor="middle" fill={P.gold} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 6 }}>MENU</text>
    {/* # espresso machine */}
    <rect x={1300} y={420} width={300} height={200} rx={22} fill="#8A97AA" /><rect x={1320} y={440} width={260} height={60} rx={12} fill="#C9D3E1" />
    <rect x={1350} y={520} width={40} height={50} rx={8} fill="#1B2233" /><rect x={1510} y={520} width={40} height={50} rx={8} fill="#1B2233" />
    {steam > 0 && [1370, 1530].map((sx, k) => <path key={k} d={`M${sx} 410 q 16 -26 0 -52 q -16 -26 0 -52`} fill="none" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" opacity={steam * (0.35 + 0.25 * Math.sin(f / 7 + k))} />)}
  </g>
)
// # the till: a register whose cash drawer slides out (open 0–1) showing bills
export const Till: React.FC<{ x: number; y: number; s?: number; open?: number; o?: number; bills?: number }> = ({ x, y, s = 1, open = 0, o = 1, bills = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-8 + open * 70} width={300} height={70} rx={10} fill="#3B2616" />
    {Array.from({ length: Math.round(clamp01(bills) * 4) }, (_, k) => <rect key={k} x={-130 + k * 66} y={2 + open * 70} width={56} height={40} rx={6} fill="#5FBF7F" stroke="#2E8B57" strokeWidth={3} />)}
    <rect x={-160} y={-150} width={320} height={150} rx={16} fill="#2A3448" />
    <rect x={-130} y={-200} width={170} height={70} rx={10} fill="#1B2233" /><rect x={-118} y={-190} width={146} height={50} rx={6} fill={P.mint} opacity={0.85} />
    {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={-130 + c * 66} y={-118 + r * 34} width={50} height={22} rx={6} fill="#5A6680" />))}
  </g>
)
// # the shop's book: two lines, what it OWES and what counts as SALES (the scene passes the numbers as text)
export const Ledger: React.FC<{ x: number; y: number; s?: number; o?: number; owes: string; sales: string; hiOwes?: number; hiSales?: number }> = ({ x, y, s = 1, o = 1, owes, sales, hiOwes = 0, hiSales = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-250} y={-170} width={500} height={340} rx={20} fill="#000" opacity={0.15} transform="translate(10 12)" />
    <rect x={-250} y={-170} width={500} height={340} rx={20} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <rect x={-6} y={-170} width={12} height={340} fill="#C8B994" opacity={0.6} />
    <rect x={-230} y={-120} width={210} height={180} rx={14} fill={P.coral} opacity={0.12 + 0.25 * hiOwes} />
    <rect x={20} y={-120} width={210} height={180} rx={14} fill={P.mint} opacity={0.12 + 0.25 * hiSales} />
    <text x={-125} y={-70} textAnchor="middle" fill={P.navy2} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>WE OWE</text>
    <text x={125} y={-70} textAnchor="middle" fill={P.navy2} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>SALES</text>
    <text x={-125} y={30} textAnchor="middle" fill="#B23A2F" style={{ font: '400 96px "Bebas Neue"' }}>{owes}</text>
    <text x={125} y={30} textAnchor="middle" fill="#1E7A4E" style={{ font: '400 96px "Bebas Neue"' }}>{sales}</text>
  </g>
)

// ------------------------------------------------------------ a chest of drawers; the top drawer slides open (open 0–1)
export const Drawers: React.FC<{ x: number; y: number; s?: number; open?: number; o?: number; children?: React.ReactNode; dust?: number }> = ({ x, y, s = 1, open = 0, o = 1, children, dust = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={300} ry={24} fill={P.shadow} opacity={0.2} />
    <rect x={-260} y={-420} width={520} height={420} rx={18} fill="#A86F42" />
    <rect x={-260} y={-420} width={520} height={30} rx={14} fill="#C98F5A" />
    {[1, 2].map((k) => <g key={k}><rect x={-230} y={-370 + k * 120} width={460} height={100} rx={10} fill="#B97C4C" /><rect x={-40} y={-326 + k * 120} width={80} height={14} rx={7} fill="#5A3A22" /></g>)}
    {/* # the top drawer comes out toward us (drawn lower and bigger) */}
    <g transform={`translate(0 ${open * 90}) scale(${1 + open * 0.08})`}>
      <rect x={-236} y={-374} width={472} height={110} rx={10} fill="#7A4E2C" />
      <g transform="translate(0 -350)">{open > 0.3 && children}</g>
      <rect x={-230} y={-330} width={460} height={100} rx={10} fill="#B97C4C" />
      <rect x={-40} y={-286} width={80} height={14} rx={7} fill="#5A3A22" />
    </g>
    {dust > 0 && Array.from({ length: 8 }, (_, k) => <circle key={k} cx={-200 + k * 55} cy={-430 - (k % 3) * 8} r={6} fill="#FFFFFF" opacity={0.35 * dust} />)}
  </g>
)

// ------------------------------------------------------------ the clothes shop: a rail and one jacket with a price tag
export const Jacket: React.FC<{ x: number; y: number; s?: number; o?: number; price?: string; color?: string }> = ({ x, y, s = 1, o = 1, price, color = '#C94A3E' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 -40 q -14 -20 0 -34 q 14 -10 20 8" fill="none" stroke="#8A97AA" strokeWidth={6} />
    <path d="M-110 0 L-40 -30 L0 0 L40 -30 L110 0 L150 210 L100 220 L90 120 L90 300 L-90 300 L-90 120 L-100 220 L-150 210 Z" fill={color} />
    <path d="M-40 -30 L0 60 L40 -30" fill="none" stroke="#000" strokeOpacity={0.2} strokeWidth={6} />
    <line x1={0} y1={60} x2={0} y2={300} stroke="#000" strokeOpacity={0.2} strokeWidth={6} />
    {[110, 170, 230].map((by) => <circle key={by} cx={12} cy={by} r={7} fill={P.gold} />)}
    {price && <g transform="translate(120 60) rotate(10)"><line x1={-30} y1={-20} x2={0} y2={0} stroke={P.ink2} strokeWidth={3} /><rect x={0} y={-30} width={130} height={70} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={3} />
      <text x={65} y={20} textAnchor="middle" fill={P.navy2} style={{ font: '400 50px "Bebas Neue"' }}>{price}</text></g>}
  </g>
)
export const Rail: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 1 }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={y} width={w} height={14} rx={7} fill="#8A97AA" />
    <rect x={x - w / 2} y={y} width={14} height={560} rx={7} fill="#8A97AA" /><rect x={x + w / 2 - 14} y={y} width={14} height={560} rx={7} fill="#8A97AA" />
    <ellipse cx={x} cy={y + 566} rx={w * 0.55} ry={18} fill={P.shadow} opacity={0.18} />
  </g>
)
// # a shopping bag (spending a little more)
export const Bag: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = P.coral }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-40 -150 q 0 -50 40 -50 q 40 0 40 50" fill="none" stroke="#5A3A22" strokeWidth={10} />
    <path d="M-90 -150 L90 -150 L80 0 L-80 0 Z" fill={color} /><path d="M30 -150 L90 -150 L80 0 L22 0 Z" fill="#000" opacity={0.1} />
  </g>
)
// # a wallet with a few bills peeking out
export const Wallet: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number }> = ({ x, y, s = 1, o = 1, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-70 - open * 30} width={150} height={60} rx={6} fill="#5FBF7F" stroke="#2E8B57" strokeWidth={3} />
    <rect x={-110} y={-60} width={220} height={130} rx={18} fill="#5A3A22" />
    <rect x={-110} y={-60} width={220} height={40} rx={18} fill="#7A4E2C" /><circle cx={80} cy={10} r={12} fill={P.gold} />
  </g>
)

// ------------------------------------------------------------ shop fronts (cinema, restaurant, shop, online) with a roller shutter (0–1)
export const Storefront: React.FC<{ x: number; y: number; s?: number; o?: number; sign: string; color: string; shutter?: number; card?: number }> = ({ x, y, s = 1, o = 1, sign, color, shutter = 0, card = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={18} fill={P.shadow} opacity={0.2} />
    <rect x={-170} y={-380} width={340} height={380} rx={14} fill="#E8EEF5" />
    <rect x={-190} y={-430} width={380} height={80} rx={16} fill={color} />
    <text x={0} y={-376} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 4 }}>{sign}</text>
    <path d="M-190 -350 L190 -350 L170 -300 L-170 -300 Z" fill={color} opacity={0.6} />
    <rect x={-140} y={-280} width={170} height={200} rx={10} fill="#9FDCFF" opacity={0.6} /><rect x={50} y={-280} width={90} height={280} rx={10} fill="#5A6680" />
    {card > 0 && <g opacity={card}><GiftCard x={-55} y={-180} s={0.36} r={-6} color={color} /></g>}
    {shutter > 0 && <g><rect x={-170} y={-350} width={340} height={350 * clamp01(shutter)} fill="#8A97AA" />
      {Array.from({ length: Math.floor(clamp01(shutter) * 12) }, (_, k) => <rect key={k} x={-170} y={-350 + k * 29} width={340} height={4} fill="#5A6680" />)}
      {shutter >= 1 && <g transform="translate(0 -120) rotate(-6)"><rect x={-110} y={-40} width={220} height={80} rx={10} fill={P.paper} /><text x={0} y={20} textAnchor="middle" fill="#B23A2F" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>CLOSED</text></g>}</g>}
  </g>
)
// # a government building with columns (unclaimed property)
export const GovBuilding: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={260} ry={20} fill={P.shadow} opacity={0.2} />
    <rect x={-240} y={-40} width={480} height={40} rx={6} fill="#C9D3E1" />
    {[-180, -90, 0, 90, 180].map((cx) => <rect key={cx} x={cx - 22} y={-280} width={44} height={240} rx={8} fill="#E8EEF5" />)}
    <rect x={-240} y={-320} width={480} height={40} rx={6} fill="#C9D3E1" />
    <path d="M-260 -320 L0 -440 L260 -320 Z" fill="#E8EEF5" /><circle cx={0} cy={-366} r={22} fill={P.gold} />
  </g>
)
// # a gift box: lid lifts (open 0–1)
export const Present: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; color?: string; n?: string }> = ({ x, y, s = 1, o = 1, open = 0, color = P.coral, n }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={150} ry={16} fill={P.shadow} opacity={0.2} />
    <rect x={-120} y={-200} width={240} height={200} rx={14} fill={color} /><rect x={-20} y={-200} width={40} height={200} fill={P.gold} />
    <g transform={`translate(${open * 90} ${-open * 120}) rotate(${open * 24})`}>
      <rect x={-136} y={-240} width={272} height={50} rx={12} fill={color} /><rect x={-20} y={-240} width={40} height={50} fill={P.gold} />
      <path d="M0 -240 q -60 -60 -70 -10 q 20 20 70 10 q 60 -60 70 -10 q -20 20 -70 10" fill={P.gold} />
    </g>
    {n && <text x={0} y={-80} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 90px "Bebas Neue"' }}>{n}</text>}
  </g>
)
// # a small survey figure on a round base; hi 0–1 lights it up (gold); card = holds a small card
export const Figure: React.FC<{ x: number; y: number; s?: number; hi?: number; o?: number; card?: number; color?: string }> = ({ x, y, s = 1, hi = 0, o = 1, card = 0, color }) => {
  const c = color ?? (hi > 0.5 ? P.gold : P.navy4)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={56} ry={14} fill={P.shadow} opacity={0.2} />
      <path d="M-46 0 Q-46 -92 0 -96 Q46 -92 46 0 Z" fill={c} />
      <circle cx={0} cy={-128} r={34} fill={c} />
      {card > 0 && <g opacity={card}><rect x={20} y={-70} width={64} height={42} rx={7} fill="#2FA36B" transform="rotate(-12 52 -49)" /></g>}
    </g>
  )
}
// # a water tank fed from a pipe on the left and drained on the right; level 0–1
export const Tank: React.FC<{ x: number; y: number; level: number; f: number; inflow?: number; outflow?: number; o?: number; label?: string }> = ({ x, y, level, f, inflow = 0, outflow = 0, o = 1, label }) => (
  <g opacity={o}>
    <rect x={x - 220} y={y - 360} width={440} height={360} rx={30} fill="#DDEBF7" opacity={0.3} stroke="#A9C4DE" strokeWidth={6} />
    <rect x={x - 210} y={y - 10 - 340 * clamp01(level)} width={420} height={340 * clamp01(level)} rx={24} fill={P.gold} opacity={0.9} />
    {Array.from({ length: Math.floor(clamp01(level) * 9) }, (_, k) => <rect key={k} x={x - 180 + (k % 3) * 130} y={y - 60 - Math.floor(k / 3) * 90 + Math.sin(f / 10 + k) * 3} width={100} height={60} rx={10} fill="#2FA36B" opacity={0.85} />)}
    <rect x={x - 520} y={y - 330} width={300} height={40} rx={12} fill="#8A97AA" /><rect x={x + 220} y={y - 50} width={300} height={40} rx={12} fill="#8A97AA" />
    {inflow > 0 && Array.from({ length: 4 }, (_, k) => { const t = ((f / 24) + k / 4) % 1; return <rect key={k} x={lerp(x - 500, x - 240, t)} y={y - 324} width={46} height={28} rx={5} fill="#5FBF7F" opacity={inflow} /> })}
    {outflow > 0 && Array.from({ length: 4 }, (_, k) => { const t = ((f / 24) + k / 4) % 1; return <g key={k} opacity={outflow}><rect x={lerp(x + 230, x + 500, t)} y={y - 44} width={40} height={28} rx={5} fill="#5FBF7F" /></g> })}
    {label && <Label x={x} y={y + 70} text={label} size={56} font="Bebas Neue" color={P.ink} />}
  </g>
)
