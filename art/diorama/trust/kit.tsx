// ============================================================
// LONG VIDEO — "How Billionaires Use Trusts to Skip the Estate Tax" —
// the objects of this story: the trust box (a locked chest with a
// rulebook), cash columns that split and shrink on the spoken numbers,
// the tax office, the estate ring, a mansion, a courthouse, South Dakota.
// Shared cast/headline/helpers come from ../aimoney/common.
// House rules (owner r22/r26/r36/r55/r62): every picture lands ON its word;
// one picture group at a time; labels stick to the part they name.
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'
import { Label } from '../charts'

export const BOX = { wood: '#7A4E2C', woodL: '#8E5E36', woodD: '#5A3A22', band: '#2E4A78', gold: '#E9C25A', goldD: '#B88A2E' }
export const CASH = { light: '#8FD3A5', mid: '#5FBF7F', dark: '#2E8B57', band: '#F2E6CC' }
export const TAXRED = '#D9483A'

// ------------------------------------------------------------ the trust: a sturdy chest with gold corners, a padlock and a plaque
// # open 0–1 lifts the lid; lock 0–1 swings the padlock shut; glow 0–1 a soft gold halo; children are drawn inside (behind the front)
export const TrustBox: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; lock?: number; label?: string; glow?: number; children?: React.ReactNode; tint?: string }> = ({ x, y, s = 1, o = 1, open = 0, lock = 0, label = 'TRUST', glow = 0, children, tint = BOX.band }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse cx={0} cy={-120} rx={300} ry={220} fill={BOX.gold} opacity={0.16 * glow} />}
    <ellipse cx={0} cy={8} rx={230} ry={22} fill={P.shadow} opacity={0.2} />
    {/* # the inside (dark) and whatever is in it */}
    <rect x={-190} y={-230} width={380} height={40} rx={6} fill="#2A1A0E" opacity={open > 0.02 ? 1 : 0} />
    {children}
    {/* # body */}
    <rect x={-200} y={-200} width={400} height={200} rx={16} fill={BOX.wood} />
    <rect x={-200} y={-200} width={400} height={200} rx={16} fill="none" stroke={BOX.woodD} strokeWidth={6} />
    {[-140, 140].map((bx) => <rect key={bx} x={bx - 18} y={-200} width={36} height={200} fill={tint} />)}
    {[[-200, -200], [164, -200], [-200, -36], [164, -36]].map(([cx, cy], k) => <rect key={k} x={cx} y={cy} width={36} height={36} rx={8} fill={BOX.gold} />)}
    {/* # the plaque */}
    <rect x={-104} y={-150} width={208} height={64} rx={10} fill="#F7F1E1" stroke={BOX.goldD} strokeWidth={4} />
    <text x={0} y={-104} textAnchor="middle" fill="#16294A" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>{label}</text>
    {/* # the padlock */}
    <g transform="translate(0 -40)">
      <path d={`M-26 0 L-26 ${-30 - 22 * (1 - lock)} A26 26 0 0 1 26 ${-30 - 22 * (1 - lock)} L26 ${lerp(-20, 0, lock)}`} fill="none" stroke="#9AA7B8" strokeWidth={10} strokeLinecap="round" />
      <rect x={-40} y={-6} width={80} height={62} rx={12} fill={BOX.gold} stroke={BOX.goldD} strokeWidth={4} />
      <circle cx={0} cy={20} r={8} fill={BOX.woodD} /><rect x={-3} y={20} width={6} height={18} fill={BOX.woodD} />
    </g>
    {/* # the lid (hinged at the back left) */}
    <g transform={`rotate(${-38 * clamp01(open)} -200 -200)`}>
      <path d="M-206 -196 L-206 -246 Q0 -300 206 -246 L206 -196 Z" fill={BOX.woodL} stroke={BOX.woodD} strokeWidth={6} />
      {[-140, 140].map((bx) => <path key={bx} d={`M${bx - 18} -196 L${bx - 18} ${-262 + Math.abs(bx) * 0.05} L${bx + 18} ${-264 + Math.abs(bx) * 0.05} L${bx + 18} -196 Z`} fill={tint} />)}
    </g>
  </g>
)

// ------------------------------------------------------------ the rulebook: a navy book; open 0–1 fans the pages
export const Rulebook: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; open?: number; title?: string }> = ({ x, y, s = 1, o = 1, r = 0, open = 0, title = 'RULES' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-96} y={-120} width={192} height={240} rx={12} fill="#000" opacity={0.15} transform="translate(8 10)" />
    {open > 0.05 && <g>
      <rect x={-188} y={-118} width={186} height={236} rx={8} fill="#FFFDF6" stroke="#D8CBB0" strokeWidth={3} />
      {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-168} y={-84 + k * 30} width={k % 3 === 2 ? 90 : 140} height={10} rx={5} fill="#D8CBB0" opacity={open} />)}
    </g>}
    <g transform={`translate(${-open * 2} 0)`}>
      <rect x={-96} y={-120} width={192} height={240} rx={12} fill="#2E4A78" />
      <rect x={-96} y={-120} width={26} height={240} rx={10} fill="#1E3A63" />
      <rect x={-50} y={-70} width={120} height={44} rx={6} fill={BOX.gold} />
      <text x={10} y={-37} textAnchor="middle" fill="#16294A" style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>{title}</text>
      {[0, 1, 2].map((k) => <rect key={k} x={-40} y={10 + k * 26} width={100} height={8} rx={4} fill="#5C7BB0" />)}
    </g>
  </g>
)

// ------------------------------------------------------------ a column of cash bricks, h px tall, standing on y (bottom);
// # cut: the top `cut` share drawn as a red "tax" slab that can lift away (lift px); label on the right side
export const CashColumn: React.FC<{ x: number; y: number; h: number; w?: number; o?: number; cut?: number; lift?: number; cutO?: number; color?: 'green' | 'gold' }> = ({ x, y, h, w = 180, o = 1, cut = 0, lift = 0, cutO = 1, color = 'green' }) => {
  const H = Math.max(0, h), kept = H * (1 - cut), brick = 34
  const fill = color === 'gold' ? ['#F2D27A', P.gold, P.goldD] : [CASH.light, CASH.mid, CASH.dark]
  const rows = (top: number, height: number, key: string, red = false) => Array.from({ length: Math.ceil(height / brick) }, (_, k) => {
    const yb = top + height - (k + 1) * brick, y0 = Math.max(yb, top), hh = top + height - k * brick - y0
    return <g key={key + k}><rect x={-w / 2} y={y0} width={w} height={Math.max(0, hh - 3)} rx={5} fill={red ? '#F28C7E' : fill[1]} stroke={red ? TAXRED : fill[2]} strokeWidth={3} />
      {yb >= top && <rect x={-14} y={yb} width={28} height={brick - 3} fill={red ? '#FBE3DE' : CASH.band} opacity={0.9} />}</g>
  })
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={w * 0.7} ry={14} fill={P.shadow} opacity={0.18 * Math.min(1, H / 40)} />
      {rows(-kept, kept, 'k')}
      {cut > 0 && <g opacity={cutO} transform={`translate(0 ${-lift})`}>{rows(-H, H - kept, 'c', true)}</g>}
    </g>
  )
}

// ------------------------------------------------------------ the estate ring: a dashed circle on the floor around what someone owns
export const EstateRing: React.FC<{ x: number; y: number; rx?: number; ry?: number; o?: number; t?: number; label?: string; color?: string }> = ({ x, y, rx = 420, ry = 110, o = 1, t = 1, label = 'ESTATE', color = '#B4821C' }) => {
  const len = 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2)
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <ellipse rx={rx} ry={ry} fill={color} opacity={0.08 * t} />
      <ellipse rx={rx} ry={ry} fill="none" stroke={color} strokeWidth={7} strokeDasharray="26 16" strokeDashoffset={len * (1 - t)} />
      {label && <g opacity={t}><rect x={-90} y={ry - 26} width={180} height={52} rx={26} fill={color} /><text x={0} y={ry + 14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>{label}</text></g>}
    </g>
  )
}

// ------------------------------------------------------------ a grand house with columns (the billionaire's)
export const Mansion: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0.6 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={330} ry={22} fill={P.shadow} opacity={0.18} />
    <rect x={-300} y={-230} width={600} height={230} rx={8} fill="#F4EBDD" stroke="#CDB58C" strokeWidth={4} />
    <path d="M-330 -230 L0 -360 L330 -230 Z" fill="#3A5F93" /><path d="M-120 -230 L0 -300 L120 -230 Z" fill="#E9DCC6" stroke="#CDB58C" strokeWidth={4} />
    {[-90, -30, 30, 90].map((cx) => <rect key={cx} x={cx - 12} y={-230} width={24} height={230} fill="#FFFFFF" stroke="#D9C9AA" strokeWidth={3} />)}
    {[-250, -180, 160, 230].map((wx) => <g key={wx}><rect x={wx - 22} y={-190} width={44} height={60} rx={4} fill={lit > 0.5 ? '#FFE7A0' : '#BFE4FF'} /><rect x={wx - 22} y={-100} width={44} height={60} rx={4} fill={lit > 0.5 ? '#FFE7A0' : '#BFE4FF'} /></g>)}
    <rect x={-34} y={-110} width={68} height={110} rx={30} fill="#6E5236" /><circle cx={18} cy={-54} r={5} fill={P.gold} />
  </g>
)

// ------------------------------------------------------------ a casino front with marquee bulbs that chase
export const Casino: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={320} ry={22} fill={P.shadow} opacity={0.2} />
    <rect x={-280} y={-420} width={560} height={420} rx={10} fill="#2B2350" />
    {Array.from({ length: 5 }, (_, r) => Array.from({ length: 6 }, (_, c) => <rect key={r * 6 + c} x={-240 + c * 82} y={-250 + r * 46} width={52} height={28} rx={4} fill={(r + c + Math.floor(f / 20)) % 4 === 0 ? '#FFE7A0' : '#4A3E86'} />))}
    <rect x={-300} y={-470} width={600} height={110} rx={16} fill="#C9354A" />
    {Array.from({ length: 22 }, (_, k) => <circle key={k} cx={-280 + k * 26.6} cy={-462} r={7} fill={(k + Math.floor(f / 4)) % 3 === 0 ? '#FFF4C2' : '#E9C25A'} />)}
    {Array.from({ length: 22 }, (_, k) => <circle key={'b' + k} cx={-280 + k * 26.6} cy={-368} r={7} fill={(k + Math.floor(f / 4)) % 3 === 1 ? '#FFF4C2' : '#E9C25A'} />)}
    <text x={0} y={-394} textAnchor="middle" fill="#FFF4C2" style={{ font: '400 74px "Bebas Neue"', letterSpacing: 10 }}>CASINO</text>
    <rect x={-80} y={-110} width={160} height={110} rx={10} fill="#E9C25A" opacity={0.85} /><rect x={-4} y={-110} width={8} height={110} fill="#B88A2E" />
  </g>
)

// ------------------------------------------------------------ a small palm island in a calm sea (a "secret island")
export const Island: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number }> = ({ x, y, s = 1, o = 1, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={10} rx={260} ry={46} fill="#7CC4E6" />
    <ellipse cx={0} cy={0} rx={170} ry={40} fill="#F2D9A0" />
    <path d={`M10 -10 Q ${20 + 3 * Math.sin(f / 20)} -120 ${-10 + 4 * Math.sin(f / 20)} -220`} fill="none" stroke="#8E5E36" strokeWidth={16} strokeLinecap="round" />
    {[-60, -10, 40, 90, 140].map((a, k) => <path key={k} d={`M${-10 + 4 * Math.sin(f / 20)} -220 q ${Math.cos((a * Math.PI) / 180) * 70} ${-40 + k * 14} ${Math.cos((a * Math.PI) / 180) * 130} ${10 + k * 12}`} fill="none" stroke="#3DA672" strokeWidth={22} strokeLinecap="round" />)}
  </g>
)

// ------------------------------------------------------------ a courthouse with steps and a scale sign on the pediment
export const Court: React.FC<{ x: number; y: number; s?: number; o?: number; label?: string }> = ({ x, y, s = 1, o = 1, label = 'TAX COURT' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={280} ry={20} fill={P.shadow} opacity={0.18} />
    {[0, 1, 2].map((k) => <rect key={k} x={-260 + k * 14} y={-24 - k * 18} width={520 - k * 28} height={20} rx={4} fill="#D6CDBE" />)}
    {[-180, -90, 0, 90, 180].map((cx) => <rect key={cx} x={cx - 24} y={-300} width={48} height={240} rx={6} fill="#F4EEE4" stroke="#D2C6B2" strokeWidth={3} />)}
    <rect x={-250} y={-336} width={500} height={38} rx={6} fill="#D6CDBE" />
    <path d="M-270 -336 L0 -450 L270 -336 Z" fill="#EAE1D2" stroke="#C8BBA5" strokeWidth={4} />
    <text x={0} y={-350} textAnchor="middle" fill="#3A4A66" style={{ font: '400 34px "Bebas Neue"', letterSpacing: 5 }}>{label}</text>
    <g transform="translate(0 -392)"><path d="M0 -26 L0 22 M-40 -14 L40 -14" stroke="#B4821C" strokeWidth={5} strokeLinecap="round" /><path d="M-56 4 Q-40 20 -24 4 Z M24 4 Q40 20 56 4 Z" fill="#B4821C" /></g>
  </g>
)

// ------------------------------------------------------------ South Dakota's outline (straight top/west, river-wavy east, notch south-east)
export const SD_PATH = 'M-300 -150 L270 -150 Q262 -120 276 -96 Q290 -70 282 -40 L286 120 Q300 140 290 160 Q240 150 200 170 Q160 150 110 158 L-300 158 Z'
export const SouthDakota: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: string; label?: number }> = ({ x, y, s = 1, o = 1, fill = '#9FD3B6', label = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={SD_PATH} fill="#000" opacity={0.12} transform="translate(10 12)" />
    <path d={SD_PATH} fill={fill} stroke="#3E8E68" strokeWidth={6} strokeLinejoin="round" />
    <g opacity={label}><text x={-10} y={20} textAnchor="middle" fill="#1E5E44" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>SOUTH DAKOTA</text></g>
  </g>
)

// ------------------------------------------------------------ a big gold coin seen face-on that can flip (t 0–1 = one half turn)
export const FlipCoin: React.FC<{ x: number; y: number; r?: number; t: number; o?: number; a: string; b: string }> = ({ x, y, r = 110, t, o = 1, a, b }) => {
  const k = Math.cos(Math.PI * clamp01(t)), face = k >= 0 ? a : b
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <ellipse cx={0} cy={r + 40} rx={r * 0.9} ry={16} fill={P.shadow} opacity={0.15} />
      <g transform={`scale(1 ${Math.max(0.06, Math.abs(k))})`}>
        <circle r={r} fill={P.goldD} transform="translate(0 8)" /><circle r={r} fill={P.gold} /><circle r={r * 0.8} fill="none" stroke={P.goldD} strokeWidth={6} />
        <text y={r * 0.2} textAnchor="middle" fill="#7A5A16" style={{ font: `400 ${r * 0.55}px "Bebas Neue"`, letterSpacing: 2 }}>{face}</text>
      </g>
    </g>
  )
}

// ------------------------------------------------------------ a framed portrait on an easel with a dark ribbon (someone has died), tasteful
export const Portrait: React.FC<{ x: number; y: number; s?: number; o?: number; children?: React.ReactNode; ribbon?: number }> = ({ x, y, s = 1, o = 1, children, ribbon = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-80 0 L-30 -260 M80 0 L30 -260 M0 -40 L0 0" stroke="#8E5E36" strokeWidth={12} strokeLinecap="round" />
    <rect x={-130} y={-430} width={260} height={320} rx={10} fill="#B88A2E" /><rect x={-110} y={-410} width={220} height={280} rx={6} fill="#EDE3CF" />
    <g transform="translate(0 -130)">{children}</g>
    {ribbon > 0 && <path d="M70 -430 L130 -430 L130 -370 Z" fill="#1B2233" opacity={ribbon} />}
  </g>
)

// ------------------------------------------------------------ a field of 10,000 small dots (pattern), with a few lit gold
export const DotField: React.FC<{ id: string; x: number; y: number; w: number; h: number; o?: number; lit?: [number, number][]; litT?: number }> = ({ id, x, y, w, h, o = 1, lit = [], litT = 0 }) => {
  const step = w / 100
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <defs><pattern id={`${id}-dots`} width={step} height={h / 100} patternUnits="userSpaceOnUse"><circle cx={step / 2} cy={h / 200} r={step * 0.28} fill="#9AA9C0" /></pattern></defs>
      <rect width={w} height={h} rx={10} fill={P.card} />
      <rect width={w} height={h} fill={`url(#${id}-dots)`} />
      {lit.map(([c, r], k) => <g key={k} opacity={clamp01(litT * lit.length - k)}><circle cx={(c + 0.5) * step} cy={(r + 0.5) * (h / 100)} r={step * 3} fill={P.gold} opacity={0.4} /><circle cx={(c + 0.5) * step} cy={(r + 0.5) * (h / 100)} r={step * 1.3} fill={TAXRED} /></g>)}
    </g>
  )
}

// ------------------------------------------------------------ a label pill stuck to a thing (white pill, coloured text)
export const Pill: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; color?: string; bg?: string; w?: number }> = ({ x, y, text, o = 1, size = 48, color = '#16294A', bg = '#FFFFFF', w }) => {
  const W = w ?? Math.max(120, text.length * size * 0.5 + 44)
  return o > 0.001 ? <g opacity={o} transform={`translate(${x} ${y})`}>
    <rect x={-W / 2 + 4} y={-size * 0.62 + 6} width={W} height={size * 1.24} rx={size * 0.62} fill="#000" opacity={0.12} />
    <rect x={-W / 2} y={-size * 0.62} width={W} height={size * 1.24} rx={size * 0.62} fill={bg} stroke="#E2D3B4" strokeWidth={3} />
    <Label x={0} y={size * 0.36} text={text} size={size} font="Bebas Neue" color={color} />
  </g> : null
}

// ------------------------------------------------------------ a red tax bill envelope with an amount
export const RedBill: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; amount: string; top?: string }> = ({ x, y, s = 1, r = 0, o = 1, amount, top = 'TAX BILL' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-110} width={340} height={220} rx={14} fill="#000" opacity={0.14} transform="translate(8 10)" />
    <rect x={-170} y={-110} width={340} height={220} rx={14} fill="#FFFFFF" stroke="#E2C9BF" strokeWidth={4} />
    <rect x={-170} y={-110} width={340} height={60} rx={14} fill={TAXRED} /><rect x={-170} y={-70} width={340} height={20} fill={TAXRED} />
    <text x={0} y={-66} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>{top}</text>
    <text x={0} y={60} textAnchor="middle" fill={TAXRED} style={{ font: '400 92px "Bebas Neue"', letterSpacing: 1 }}>{amount}</text>
  </g>
)
