// ============================================================
// LONG VIDEO — "Your Crypto Dollar Earns Interest. Just Not for You." —
// objects for this story: the stablecoin (a sky-blue digital coin worth
// $1), the issuer's reserve vault (real dollars and Treasury bills go in),
// a Treasury bill (a short loan to the government), the coin company's
// glass office, a burger shop (the McDonald's comparison, no logo), little
// interest coins that sprout from money at work, and a soft cross for
// "not …" moments (owner r68). One file per scene in this folder.
// No camera moves (owner r56).
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

// ------------------------------------------------------------ the stablecoin: a sky-blue coin with a $1 face and a circuit ring
// # spin 0–1 squashes it sideways (a coin turning), glow lights it up
export const SCoin: React.FC<{ x: number; y: number; s?: number; o?: number; spin?: number; glow?: number; text?: string; color?: string }> = ({ x, y, s = 1, o = 1, spin = 0, glow = 0, text = '$1', color = P.sky }) => {
  const sx = Math.max(0.08, Math.abs(Math.cos(spin * Math.PI)))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      {glow > 0 && <circle r={70} fill={color} opacity={0.25 * glow} />}
      <g transform={`scale(${sx} 1)`}>
        <ellipse cx={0} cy={7} rx={48} ry={48} fill={P.skyD} />
        <circle r={48} fill={color} />
        <circle r={36} fill="none" stroke="#FFFFFF" strokeWidth={4} opacity={0.75} />
        {/* # circuit ticks around the rim: it is a digital coin */}
        {Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * Math.PI * 2; return <line key={k} x1={Math.cos(a) * 38} y1={Math.sin(a) * 38} x2={Math.cos(a) * 46} y2={Math.sin(a) * 46} stroke="#FFFFFF" strokeWidth={4} opacity={0.6} /> })}
        {sx > 0.4 && <text y={15} textAnchor="middle" fill="#FFFFFF" style={{ font: `400 ${text.length > 2 ? 34 : 44}px "Bebas Neue"` }}>{text}</text>}
      </g>
    </g>
  )
}

// ------------------------------------------------------------ a green dollar bill
export const Dollar: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string }> = ({ x, y, s = 1, r = 0, o = 1, text = '$1' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-56} width={220} height={112} rx={10} fill="#000" opacity={0.14} transform="translate(5 7)" />
    <rect x={-110} y={-56} width={220} height={112} rx={10} fill="#7FC98F" />
    <rect x={-96} y={-42} width={192} height={84} rx={8} fill="none" stroke="#3E8E5A" strokeWidth={4} />
    <ellipse cx={0} cy={0} rx={30} ry={34} fill="#3E8E5A" opacity={0.3} />
    <text x={0} y={14} textAnchor="middle" fill="#245C3A" style={{ font: '400 44px "Bebas Neue"' }}>{text}</text>
  </g>
)

// ------------------------------------------------------------ the reserve vault: where the real dollars behind the coins sit
// # door 0–1 swings it open; fill 0–1 is how full of money it is (bills stacked inside); bills 0–1 of it shown as T-bills
export const Vault: React.FC<{ x: number; y: number; s?: number; o?: number; door?: number; fill?: number; tbills?: number; label?: string }> = ({ x, y, s = 1, o = 1, door = 0, fill = 0, tbills = 0, label }) => {
  const d = clamp01(door), lv = clamp01(fill)
  const rows = Math.round(lv * 6)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={8} rx={250} ry={18} fill={P.shadow} opacity={0.18} />
      <rect x={-220} y={-420} width={440} height={420} rx={30} fill="#5E6E88" />
      <rect x={-196} y={-396} width={392} height={372} rx={22} fill="#2C3850" />
      {/* # the money inside: rows of bills, the top ones turning into Treasury-bill papers */}
      {Array.from({ length: rows }, (_, k) => <g key={k}>
        {[-1, 0, 1].map((c) => {
          const isT = k / 6 < tbills
          return isT
            ? <g key={c} transform={`translate(${c * 118} ${-60 - k * 54})`}><rect x={-52} y={-22} width={104} height={44} rx={6} fill="#F4EBD6" stroke="#B9A57A" strokeWidth={3} /><circle cx={-30} cy={0} r={10} fill={P.gold} /><rect x={-12} y={-6} width={50} height={8} rx={4} fill="#B9A57A" /></g>
            : <g key={c} transform={`translate(${c * 118} ${-60 - k * 54})`}><rect x={-52} y={-22} width={104} height={44} rx={6} fill="#7FC98F" stroke="#3E8E5A" strokeWidth={3} /><text x={0} y={10} textAnchor="middle" fill="#245C3A" style={{ font: '400 26px "Bebas Neue"' }}>$</text></g>
        })}
      </g>)}
      {/* # the round door, hinged on the left; it swings away as it opens */}
      <g transform={`translate(-196 0) scale(${lerp(1, -0.12, d)} 1) translate(196 0)`}>
        <rect x={-196} y={-396} width={392} height={372} rx={22} fill="#8494AE" />
        <circle cx={0} cy={-210} r={110} fill="#6D7D98" stroke="#A9B6CA" strokeWidth={10} />
        {d < 0.6 && [0, 1, 2, 3, 4, 5].map((k) => { const a = k * Math.PI / 3; return <line key={k} x1={0} y1={-210} x2={Math.cos(a) * 80} y2={-210 + Math.sin(a) * 80} stroke="#C9D3E1" strokeWidth={12} strokeLinecap="round" /> })}
        {d < 0.6 && <circle cx={0} cy={-210} r={26} fill="#C9D3E1" />}
      </g>
      {label && <g><rect x={-150} y={-488} width={300} height={62} rx={14} fill={P.navy3} /><text x={0} y={-444} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>{label}</text></g>}
    </g>
  )
}

// ------------------------------------------------------------ a Treasury bill: a cream certificate with a seal
export const TBill: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string }> = ({ x, y, s = 1, r = 0, o = 1, text = 'US TREASURY' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-90} width={300} height={180} rx={12} fill="#000" opacity={0.14} transform="translate(6 8)" />
    <rect x={-150} y={-90} width={300} height={180} rx={12} fill="#F4EBD6" stroke="#B9A57A" strokeWidth={4} />
    <rect x={-134} y={-74} width={268} height={148} rx={8} fill="none" stroke="#B9A57A" strokeWidth={2} strokeDasharray="6 5" />
    <text x={0} y={-30} textAnchor="middle" fill="#5A4426" style={{ font: '400 34px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>
    <circle cx={-80} cy={30} r={28} fill={P.gold} /><circle cx={-80} cy={30} r={18} fill="none" stroke={P.goldD} strokeWidth={3} />
    <rect x={-30} y={18} width={140} height={10} rx={5} fill="#C8B994" /><rect x={-30} y={38} width={100} height={10} rx={5} fill="#C8B994" />
  </g>
)

// ------------------------------------------------------------ the coin company's office: a glass block with a big coin sign
export const CoinHQ: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string; lit?: number }> = ({ x, y, s = 1, o = 1, sign = 'TETHER', lit = 0.6 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={210} ry={16} fill={P.shadow} opacity={0.18} />
    <rect x={-180} y={-420} width={360} height={420} rx={14} fill="#BFD9EE" />
    <rect x={60} y={-420} width={120} height={420} rx={14} fill="#000" opacity={0.07} />
    {Array.from({ length: 6 }, (_, r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={-150 + c * 76} y={-330 + r * 50} width={56} height={32} rx={5} fill={(r * 2 + c) % 5 ? '#EAF5FF' : P.gold} opacity={(r * 2 + c) % 5 ? 0.9 : lit} />))}
    <rect x={-40} y={-80} width={80} height={80} rx={6} fill="#5A6680" />
    {/* # the coin sign on the roof */}
    <rect x={-6} y={-470} width={12} height={50} fill="#8A97AA" />
    <SCoin x={0} y={-520} s={1.05} text="$1" />
    <rect x={-130} y={-404} width={260} height={56} rx={12} fill={P.navy3} />
    <text x={0} y={-363} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 5 }}>{sign}</text>
  </g>
)

// ------------------------------------------------------------ a burger shop (no brand logo): red awning, a big burger on the roof
export const BurgerShop: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string }> = ({ x, y, s = 1, o = 1, sign = 'BURGERS' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={230} ry={16} fill={P.shadow} opacity={0.18} />
    <rect x={-200} y={-300} width={400} height={300} rx={14} fill="#F4E3C3" />
    <rect x={-200} y={-300} width={400} height={50} rx={12} fill="#D9483A" />
    {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${-200 + k * 50} -250 l25 34 l25 -34 Z`} fill={k % 2 ? '#F4E3C3' : '#D9483A'} />)}
    <rect x={-170} y={-190} width={200} height={130} rx={10} fill="#9FDCFF" opacity={0.65} />
    <rect x={60} y={-190} width={100} height={190} rx={10} fill="#8E5B3A" />
    <text x={0} y={-262} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 6 }}>{sign}</text>
    <Burger x={0} y={-350} s={1.1} />
  </g>
)
export const Burger: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-80 -6 Q-80 -70 0 -70 Q80 -70 80 -6 Z" fill="#E7A248" />
    {[-40, -10, 22, 48].map((cx, k) => <ellipse key={k} cx={cx} cy={-46 + (k % 2) * 8} rx={6} ry={3} fill="#FFF3D6" />)}
    <rect x={-86} y={-8} width={172} height={14} rx={7} fill="#5FBF5F" />
    <rect x={-82} y={6} width={164} height={22} rx={10} fill="#7A3E22" />
    <rect x={-84} y={28} width={168} height={8} rx={4} fill="#F2C94C" />
    <path d="M-80 36 L80 36 Q80 64 0 64 Q-80 64 -80 36 Z" fill="#E7A248" />
  </g>
)

// ------------------------------------------------------------ interest coins: small gold coins that sprout from money at work
// # n coins, t 0–1 how far they have risen (they fade at the top)
export const Sprouts: React.FC<{ x: number; y: number; n: number; t: number; spread?: number; o?: number }> = ({ x, y, n, t, spread = 140, o = 1 }) => (
  <g opacity={o}>{Array.from({ length: n }, (_, k) => {
    const ph = (t + k / n) % 1, cx = x + (k % 2 ? 1 : -1) * ((k * 37) % spread) * 0.6
    return <g key={k} opacity={Math.min(1, ph * 6) * (1 - Math.max(0, ph - 0.75) * 4)} transform={`translate(${cx} ${y - ph * 160})`}>
      <circle r={16} fill={P.gold} /><circle r={11} fill="none" stroke={P.goldD} strokeWidth={3} />
    </g>
  })}</g>
)

// ------------------------------------------------------------ a soft cross for "not …" (comfortable size, owner r68)
export const Cross: React.FC<{ x: number; y: number; o: number; size?: number }> = ({ x, y, o, size = 70 }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * o})`}>
    <path d={`M${-size} ${-size} L${size} ${size} M${size} ${-size} L${-size} ${size}`} stroke="#FFFFFF" strokeWidth={size * 0.36} strokeLinecap="round" opacity={0.9} />
    <path d={`M${-size} ${-size} L${size} ${size} M${size} ${-size} L${-size} ${size}`} stroke={P.coral} strokeWidth={size * 0.24} strokeLinecap="round" />
  </g>
)

// ------------------------------------------------------------ a dashed money path between stations (the dollar's route)
export const Route: React.FC<{ pts: [number, number][]; p: number; o?: number }> = ({ pts, p, o = 1 }) => {
  // # draws the polyline up to fraction p of its length
  const seg = pts.slice(1).map((b, k) => { const a = pts[k]; return { a, b, l: Math.hypot(b[0] - a[0], b[1] - a[1]) } })
  const total = seg.reduce((s, q) => s + q.l, 0)
  let left = clamp01(p) * total, d = `M${pts[0][0]} ${pts[0][1]}`
  for (const q of seg) { if (left <= 0) break; const t = Math.min(1, left / q.l); d += ` L${lerp(q.a[0], q.b[0], t)} ${lerp(q.a[1], q.b[1], t)}`; left -= q.l }
  return <path d={d} fill="none" stroke={P.ink2} strokeWidth={8} strokeDasharray="16 14" strokeLinecap="round" opacity={o} />
}
