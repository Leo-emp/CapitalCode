// ============================================================
// LONG VIDEO — "Costco Barely Profits From What You Buy" — objects for
// this story (cart, membership card, warehouse, hot dog, pallet rack).
// The shared cast, headline, camera and money helpers come from
// ../aimoney/common. One file per scene in this folder.
// ============================================================
import React from 'react'
import { P } from '../kit'
import { Label } from '../charts'

// # a shopping cart (facing right); fill 0–1 piles boxes into the basket
export const Cart: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number; tint?: string[] }> = ({ x, y, s = 1, o = 1, fill = 0, tint }) => {
  const cols = tint ?? ['#E05A4C', '#3A6EA8', '#E9C25A', '#3DDC97', '#7C6CF0', '#F2A65A', '#5BCBFF', '#C94A3E']
  const n = Math.round(Math.max(0, Math.min(1, fill)) * 8)
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={20} cy={8} rx={210} ry={16} fill="#000" opacity={0.15} />
    {Array.from({ length: n }, (_, k) => <rect key={k} x={-140 + (k % 4) * 66} y={-250 - Math.floor(k / 4) * 70} width={60} height={70} rx={8} fill={cols[k % cols.length]} />)}
    <path d="M-200 -260 L-170 -260 L-150 -110 L160 -110 L190 -250 L-160 -250" fill="none" stroke="#8A97AA" strokeWidth={12} strokeLinejoin="round" />
    {[-120, -60, 0, 60, 120].map((gx) => <path key={gx} d={`M${gx} -250 L${gx + 5} -110`} stroke="#A9B4C4" strokeWidth={5} />)}
    <path d="M-158 -180 L176 -180" stroke="#A9B4C4" strokeWidth={5} />
    <path d="M-150 -110 L-140 -40 L170 -40" fill="none" stroke="#8A97AA" strokeWidth={10} />
    <path d="M-200 -260 L-240 -300" stroke="#C94A3E" strokeWidth={14} strokeLinecap="round" />
    {[-120, 140].map((cx) => <g key={cx}><circle cx={cx} cy={-16} r={22} fill="#1B2233" /><circle cx={cx} cy={-16} r={9} fill="#8A97AA" /></g>)}
  </g>
}
// # the membership card; label on top band, name line, a gold chip
export const MemberCard: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; title?: string; exec?: boolean; glow?: number }> = ({ x, y, s = 1, r = 0, o = 1, title = 'MEMBER', exec = false, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-190} y={-125} width={380} height={250} rx={34} fill={P.gold} opacity={0.35 * glow} />}
    <rect x={-170} y={-105} width={340} height={210} rx={22} fill="#000" opacity={0.2} transform="translate(8 10)" />
    <rect x={-170} y={-105} width={340} height={210} rx={22} fill={exec ? '#1B2233' : '#F7FAFF'} stroke={exec ? P.gold : '#CDB58C'} strokeWidth={4} />
    <rect x={-170} y={-105} width={340} height={64} rx={22} fill={exec ? P.gold : '#E05A4C'} /><rect x={-170} y={-60} width={340} height={20} fill={exec ? P.gold : '#E05A4C'} />
    <text x={0} y={-56} textAnchor="middle" fill={exec ? '#1B2233' : '#FFFFFF'} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>
    <rect x={-140} y={-10} width={56} height={44} rx={8} fill={P.gold} /><rect x={-60} y={0} width={180} height={16} rx={8} fill={exec ? '#4A5B7A' : '#C9D3E1'} /><rect x={-60} y={36} width={120} height={16} rx={8} fill={exec ? '#4A5B7A' : '#C9D3E1'} />
  </g>
)
// # a warehouse building with a red band and a label
export const Warehouse: React.FC<{ x: number; y: number; s?: number; o?: number; label?: string }> = ({ x, y, s = 1, o = 1, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={340} ry={22} fill="#000" opacity={0.16} />
    <path d="M-320 0 L-320 -230 L0 -290 L320 -230 L320 0 Z" fill="#D9DEE6" />
    <rect x={-320} y={-200} width={640} height={50} fill="#E05A4C" /><rect x={-320} y={-150} width={640} height={14} fill="#3A6EA8" />
    <rect x={-60} y={-110} width={120} height={110} rx={6} fill="#5C6F8E" /><rect x={-260} y={-110} width={150} height={70} rx={6} fill="#AFC2D6" /><rect x={110} y={-110} width={150} height={70} rx={6} fill="#AFC2D6" />
    {label && <text x={0} y={-162} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 4 }}>{label}</text>}
  </g>
)
// # hot dog + drink combo with a price tag
export const HotDog: React.FC<{ x: number; y: number; s?: number; o?: number; price?: string }> = ({ x, y, s = 1, o = 1, price }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-170 -10 Q-170 -70 -110 -70 L80 -70 Q140 -70 140 -10 Q140 30 80 30 L-110 30 Q-170 30 -170 -10 Z" fill="#E9B872" />
    <rect x={-160} y={-48} width={290} height={46} rx={23} fill="#C9553E" />
    <path d="M-140 -26 Q-110 -44 -80 -26 T-20 -26 T40 -26 T100 -26" stroke="#F2D24A" strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M180 -120 L260 -120 L248 40 L192 40 Z" fill="#E05A4C" /><rect x={176} y={-136} width={88} height={20} rx={8} fill="#F7FAFF" /><rect x={214} y={-190} width={10} height={60} fill="#F7FAFF" />
    {price && <g transform="translate(-20 110)"><rect x={-110} y={-44} width={220} height={88} rx={18} fill={P.gold} /><Label x={0} y={26} text={price} size={70} font="Bebas Neue" color={P.navy0} /></g>}
  </g>
)
// # a tall steel rack with pallets of boxes
export const Rack: React.FC<{ x: number; y: number; s?: number; o?: number; seed?: number }> = ({ x, y, s = 1, o = 1, seed = 0 }) => {
  const cols = ['#C98F5A', '#E9C25A', '#E05A4C', '#3A6EA8', '#3DDC97', '#A86F42']
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[-150, 150].map((px) => <rect key={px} x={px - 10} y={-560} width={20} height={560} fill="#3A6EA8" />)}
    {[0, 1, 2].map((r) => <g key={r}><rect x={-160} y={-190 * r - 20} width={320} height={16} fill="#F2A65A" />
      {[0, 1].map((c) => <rect key={c} x={-140 + c * 145} y={-190 * r - 150} width={130} height={130} rx={6} fill={cols[(r * 2 + c + seed) % cols.length]} />)}</g>)}
  </g>
}

// # 100 coins in a 10×10 grid — the $100 cart as money. Coins 0–88 fly to `a` on `ta`, 89–97 to `b` on `tb`;
// # the last two stay (and glow from `tk`). Each coin flies on its own little delay so the move reads as a stream.
export const CoinGrid: React.FC<{ f: number; x: number; y: number; s?: number; o?: number; ta?: number; tb?: number; tk?: number; a?: [number, number]; b?: [number, number]; gone?: boolean }> = ({ f, x, y, s = 1, o = 1, ta = 1e9, tb = 1e9, tk = 1e9, a = [0, 0], b = [0, 0], gone = true }) => {
  const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))
  return <g opacity={o}>
    {Array.from({ length: 100 }, (_, k) => {
      const gx = x + ((k % 10) - 4.5) * 44 * s, gy = y + (Math.floor(k / 10) - 4.5) * 44 * s
      const grp = k < 89 ? 0 : k < 98 ? 1 : 2
      const t0 = grp === 0 ? ta + (k % 30) * 0.6 : grp === 1 ? tb + (k - 89) * 1.2 : 1e9
      const t = ease((f - t0) / 18), tx = grp === 0 ? a[0] : b[0], ty = grp === 0 ? a[1] : b[1]
      const cx = gx + (tx - gx) * t, cy = gy + (ty - gy) * t - Math.sin(t * Math.PI) * 90
      const fade = gone && t >= 1 ? 0 : 1, glow = grp === 2 && f >= tk ? 1 : 0
      return <g key={k} opacity={fade}>
        {glow > 0 && <circle cx={cx} cy={cy} r={30 * s} fill={P.gold} opacity={0.35 + 0.15 * Math.sin(f / 5)} />}
        <circle cx={cx} cy={cy + 3 * s} r={18 * s} fill={P.goldD} /><circle cx={cx} cy={cy} r={18 * s} fill={P.gold} /><circle cx={cx} cy={cy} r={12 * s} fill="none" stroke={P.goldD} strokeWidth={3 * s} />
      </g>
    })}
  </g>
}
// # a green banknote with a value
export const Note: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; value?: string }> = ({ x, y, s = 1, r = 0, o = 1, value = '$100' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-80} width={340} height={160} rx={14} fill="#7FC98A" stroke="#3E8A4E" strokeWidth={6} /><rect x={-150} y={-62} width={300} height={124} rx={10} fill="none" stroke="#3E8A4E" strokeWidth={3} />
    <circle r={44} fill="#A8DDB0" stroke="#3E8A4E" strokeWidth={4} /><text x={0} y={18} textAnchor="middle" fill="#1F5A2E" style={{ font: '400 52px "Bebas Neue"' }}>$</text>
    <text x={-110} y={-24} textAnchor="middle" fill="#1F5A2E" style={{ font: '400 40px "Bebas Neue"' }}>{value}</text><text x={110} y={48} textAnchor="middle" fill="#1F5A2E" style={{ font: '400 40px "Bebas Neue"' }}>{value}</text>
  </g>
)
// # a glass jar with coins; fill 0–1
export const CoinJar: React.FC<{ x: number; y: number; s?: number; o?: number; fill: number; label?: string }> = ({ x, y, s = 1, o = 1, fill, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-100} y={-220} width={200} height={230} rx={30} fill="#DDEBF7" opacity={0.4} stroke="#A9C4DE" strokeWidth={6} />
    {Array.from({ length: Math.round(Math.max(0, Math.min(1, fill)) * 14) }, (_, k) => <g key={k} transform={`translate(${-54 + (k % 4) * 36} ${-12 - Math.floor(k / 4) * 30})`}><ellipse cx={0} cy={4} rx={20} ry={8} fill={P.goldD} /><ellipse cx={0} cy={0} rx={20} ry={8} fill={P.gold} /></g>)}
    <rect x={-110} y={-250} width={220} height={36} rx={12} fill={P.navy3} />
    {label && <text x={0} y={60} textAnchor="middle" fill={P.ink} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>}
  </g>
)
