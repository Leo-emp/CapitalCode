// ============================================================
// LONG VIDEO — "What a Bank Really Does With Your Money" — objects:
// a classic bank building (columns, steps, a door that opens), a round vault
// door (swings open; shelves inside with cash bricks), a phone banking app
// showing a balance, a coat-check counter + ticket, the bank's computer
// ledger (lines that type in and delete), a bond certificate with a value
// tag, a deposit-insurance shield, a dollar bill, a cash brick, a calendar
// page. No real logos. No camera moves (owner r56).
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

export const GREEN = '#2FAE6B'
export const BANKBLUE = '#2E5C9A'
const TXT = (size: number, weight = 400, fam = 'Bebas Neue') => ({ font: `${weight} ${size}px "${fam}"` })

// ------------------------------------------------------------ a classic bank building; open 0–1 swings the doors; name on the pediment
export const BankFront: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; name?: string; col?: string; shut?: number; glow?: number }> = ({ x, y, s = 1, o = 1, open = 0, name = 'BANK', col = '#EFE6D2', shut = 0, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={330} ry={22} fill="#000" opacity={0.14} />
    {/* steps */}
    <rect x={-320} y={-30} width={640} height={30} rx={4} fill="#CFC3AA" /><rect x={-290} y={-56} width={580} height={28} rx={4} fill="#DCD1BA" />
    {/* body */}
    <rect x={-260} y={-380} width={520} height={326} fill={col} />
    {/* columns */}
    {[-220, -130, 130, 220].map((cx) => <g key={cx}><rect x={cx - 22} y={-360} width={44} height={300} fill="#FFFFFF" /><rect x={cx - 30} y={-372} width={60} height={16} rx={3} fill="#E2D8C2" /><rect x={cx - 30} y={-70} width={60} height={14} rx={3} fill="#E2D8C2" />
      {[-12, 0, 12].map((d) => <line key={d} x1={cx + d} y1={-352} x2={cx + d} y2={-74} stroke="#E6DDCA" strokeWidth={3} />)}</g>)}
    {/* door: two leaves swing open to show warm light */}
    <rect x={-70} y={-250} width={140} height={194} rx={8} fill={`rgba(255,214,120,${0.35 + 0.65 * clamp01(open)})`} />
    {glow > 0 && <ellipse cx={0} cy={-150} rx={120} ry={110} fill="#FFD680" opacity={0.25 * glow} />}
    <rect x={-70} y={-250} width={70 * (1 - 0.82 * clamp01(open))} height={194} fill="#6E4F33" stroke="#4E3722" strokeWidth={3} />
    <rect x={70 - 70 * (1 - 0.82 * clamp01(open))} y={-250} width={70 * (1 - 0.82 * clamp01(open))} height={194} fill="#6E4F33" stroke="#4E3722" strokeWidth={3} />
    {/* pediment + name */}
    <path d="M-300 -380 L0 -520 L300 -380 Z" fill="#E2D8C2" /><path d="M-250 -392 L0 -500 L250 -392 Z" fill={col} />
    <rect x={-200} y={-452} width={400} height={56} rx={6} fill={BANKBLUE} />
    <text y={-411} textAnchor="middle" fill="#FFFFFF" style={{ ...TXT(name.length > 14 ? 34 : 46), letterSpacing: 3 }}>{name}</text>
    {/* CLOSED board across the door */}
    {shut > 0 && <g opacity={shut} transform={`rotate(-8) translate(0 ${-150 - 30 * (1 - shut)})`}><rect x={-120} y={-34} width={240} height={68} rx={8} fill="#C94A3E" /><text y={20} textAnchor="middle" fill="#FFFFFF" style={TXT(52)}>CLOSED</text></g>}
  </g>
)

// ------------------------------------------------------------ a round vault door; open 0–1 swings it aside; fill 0–1 = how full the shelves are
export const Vault: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; fill?: number; f?: number }> = ({ x, y, s = 1, o = 1, open = 0, fill = 0.7, f = 0 }) => {
  const op = clamp01(open), bricks = Math.round(9 * clamp01(fill))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-270} y={-270} width={540} height={540} rx={30} fill="#5D6878" /><rect x={-250} y={-250} width={500} height={500} rx={22} fill="#3C4656" />
      {/* the inside: three shelves of cash bricks */}
      <circle r={200} fill="#2A3240" />
      {[0, 1, 2].map((r) => <g key={r}><rect x={-150} y={-100 + r * 90} width={300} height={10} rx={4} fill="#8B97A8" />
        {[0, 1, 2].map((cIdx) => { const k = r * 3 + cIdx; return k < bricks ? <CashBrick key={cIdx} x={-90 + cIdx * 90} y={-118 + r * 90} s={0.7} /> : null })}</g>)}
      {/* the door, swinging to the left */}
      <g transform={`translate(${lerp(0, -330, op)} 0) scale(${lerp(1, 0.35, op)} 1)`}>
        <circle r={210} fill="#A9B4C2" stroke="#7E8A9B" strokeWidth={14} /><circle r={150} fill="#BFC9D5" />
        <g transform={`rotate(${f * 0.6 + op * 180})`}>{[0, 60, 120].map((a) => <rect key={a} x={-8} y={-120} width={16} height={240} rx={8} fill="#7E8A9B" transform={`rotate(${a})`} />)}<circle r={36} fill="#7E8A9B" /></g>
        {Array.from({ length: 12 }, (_, k) => <circle key={k} cx={190 * Math.cos((k * Math.PI) / 6)} cy={190 * Math.sin((k * Math.PI) / 6)} r={8} fill="#7E8A9B" />)}
      </g>
    </g>
  )
}

// ------------------------------------------------------------ a calm town street behind the action: soft skyline, trees, lamp posts, clouds
export const Street: React.FC<{ f: number; ground: number; o?: number; trees?: number[]; lamps?: number[] }> = ({ f, ground, o = 1, trees = [140, 1800], lamps = [520, 1160] }) => (
  <g opacity={o}>
    {[[260, 140, 34], [820, 110, 26], [1500, 160, 30]].map(([cx, cy, k], i) => <g key={i} transform={`translate(${cx + Math.sin(f / 120 + i) * 16} ${cy + 120})`} opacity={0.85}>
      <ellipse rx={k * 3.6} ry={k} fill="#FFFFFF" /><ellipse cx={-k * 1.4} cy={-k * 0.5} rx={k * 1.8} ry={k * 1.2} fill="#FFFFFF" /><ellipse cx={k * 1.2} cy={-k * 0.7} rx={k * 2} ry={k * 1.4} fill="#FFFFFF" /></g>)}
    {/* distant skyline */}
    {[[0, 300, 180], [170, 240, 140], [300, 380, 160], [470, 260, 120], [1250, 340, 150], [1410, 260, 130], [1560, 400, 170], [1740, 300, 200]].map(([x, h, w], i) =>
      <g key={i}><rect x={x} y={ground - h} width={w} height={h} fill="#E3D3B5" />{Array.from({ length: Math.floor(h / 70) }, (_, r) => <rect key={r} x={x + 24} y={ground - h + 30 + r * 70} width={w - 48} height={22} rx={4} fill="#EFE3CC" />)}</g>)}
    {trees.map((tx, i) => <g key={i} transform={`translate(${tx} ${ground})`}><rect x={-12} y={-150} width={24} height={150} fill="#8E6B48" /><circle cx={0} cy={-200} r={80} fill="#7FB77E" /><circle cx={-50} cy={-160} r={56} fill="#6FAA70" /><circle cx={50} cy={-165} r={60} fill="#8CC48A" /></g>)}
    {lamps.map((lx, i) => <g key={i} transform={`translate(${lx} ${ground})`}><rect x={-6} y={-260} width={12} height={260} fill="#4A5568" /><rect x={-26} y={-290} width={52} height={36} rx={10} fill="#4A5568" /><rect x={-18} y={-282} width={36} height={22} rx={6} fill="#FFE6A8" /></g>)}
  </g>
)

// ------------------------------------------------------------ a wrapped brick of cash
export const CashBrick: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-56} y={-34} width={112} height={34} rx={5} fill="#7FC495" stroke="#4E9A68" strokeWidth={3} />
    <rect x={-12} y={-34} width={24} height={34} fill="#F2E6CC" /><circle cx={-34} cy={-17} r={8} fill="#4E9A68" opacity={0.5} />
  </g>
)

// ------------------------------------------------------------ a dollar bill; digital 0–1 turns it into glowing screen pixels
export const DollarBill: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; digital?: number; t?: string }> = ({ x, y, s = 1, o = 1, r = 0, digital = 0, t = '$1' }) => {
  const d = clamp01(digital)
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <g opacity={1 - d}><rect x={-90} y={-44} width={180} height={88} rx={8} fill="#8FCB9F" stroke="#4E9A68" strokeWidth={4} />
        <ellipse cx={0} cy={0} rx={30} ry={30} fill="#CDE9D3" stroke="#4E9A68" strokeWidth={3} /><text y={12} textAnchor="middle" fill="#2F6E45" style={TXT(36)}>$</text>
        <text x={-70} y={-16} fill="#2F6E45" style={TXT(24)}>{t}</text><text x={70} y={34} textAnchor="end" fill="#2F6E45" style={TXT(24)}>{t}</text></g>
      <g opacity={d}><rect x={-90} y={-44} width={180} height={88} rx={10} fill="#16294A" stroke={P.sky} strokeWidth={3} />
        {Array.from({ length: 18 }, (_, k) => <rect key={k} x={-78 + (k % 6) * 26} y={-34 + Math.floor(k / 6) * 24} width={20} height={16} rx={3} fill={P.sky} opacity={0.25 + ((k * 7) % 5) * 0.12} />)}
        <text y={14} textAnchor="middle" fill="#FFFFFF" style={TXT(40)}>$</text></g>
    </g>
  )
}

// ------------------------------------------------------------ a phone banking app; amount is the big balance line
export const BankPhone: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; amount: string; sub?: string; pulse?: number }> = ({ x, y, s = 1, o = 1, r = 0, amount, sub = 'CHECKING', pulse = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-220} width={240} height={440} rx={34} fill="#0D1424" /><rect x={-106} y={-198} width={212} height={396} rx={22} fill="#F7FAFF" />
    <rect x={-106} y={-198} width={212} height={84} rx={22} fill={BANKBLUE} /><rect x={-106} y={-140} width={212} height={26} fill={BANKBLUE} />
    <text y={-146} textAnchor="middle" fill="#FFFFFF" style={TXT(32)}>MY BANK</text>
    <text y={-70} textAnchor="middle" fill="#5C6F8E" style={TXT(28)}>{sub}</text>
    <text y={-4} textAnchor="middle" fill="#16294A" style={TXT(66 + 6 * pulse)}>{amount}</text>
    {[0, 1, 2].map((k) => <g key={k}><rect x={-84} y={40 + k * 46} width={168} height={34} rx={8} fill="#E8EEF6" /><circle cx={-62} cy={57 + k * 46} r={9} fill={k === 0 ? GREEN : '#B9C6D8'} /></g>)}
  </g>
)

// ------------------------------------------------------------ a coat-check ticket with a number (or any short word)
export const Ticket: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string; glow?: number }> = ({ x, y, s = 1, o = 1, r = 0, t = 'No. 17', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse rx={140} ry={90} fill={P.gold} opacity={0.25 * glow} />}
    <path d="M-100 -56 L100 -56 L100 -18 A18 18 0 0 0 100 18 L100 56 L-100 56 L-100 18 A18 18 0 0 0 -100 -18 Z" fill="#F4C95D" stroke="#B88A2E" strokeWidth={4} />
    <line x1={-60} y1={-44} x2={-60} y2={44} stroke="#B88A2E" strokeWidth={3} strokeDasharray="6 6" />
    <text x={20} y={16} textAnchor="middle" fill="#5A3E1E" style={TXT(t.length > 8 ? 34 : 46)}>{t}</text>
  </g>
)

// ------------------------------------------------------------ a coat on a hanger (its owner's colour)
export const Coat: React.FC<{ x: number; y: number; s?: number; o?: number; col?: string }> = ({ x, y, s = 1, o = 1, col = '#C94A3E' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 -150 q0 -16 12 -16" fill="none" stroke="#5C6F8E" strokeWidth={5} /><path d="M-70 -110 L0 -146 L70 -110" fill="none" stroke="#5C6F8E" strokeWidth={6} />
    <path d="M-66 -110 L-90 40 L-30 40 L-24 -30 L24 -30 L30 40 L90 40 L66 -110 L20 -126 L0 -60 L-20 -126 Z" fill={col} />
    <line x1={0} y1={-60} x2={0} y2={36} stroke="#00000033" strokeWidth={4} />{[-30, 0, 30].map((d) => <circle key={d} cx={8} cy={d} r={5} fill="#F2E6CC" />)}
  </g>
)

// ------------------------------------------------------------ the bank's computer; rows = [text, colour, progress 0–1 (typing), gone 0–1 (deleting)]
export type Row = [text: string, color: string, typed: number, gone?: number]
export const Ledger: React.FC<{ x: number; y: number; s?: number; o?: number; rows: Row[]; title?: string; f?: number }> = ({ x, y, s = 1, o = 1, rows, title = 'BANK LEDGER', f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-40} y={170} width={80} height={60} fill="#5D6878" /><rect x={-150} y={226} width={300} height={22} rx={8} fill="#5D6878" />
    <rect x={-380} y={-200} width={760} height={380} rx={24} fill="#1B2436" /><rect x={-356} y={-176} width={712} height={332} rx={12} fill="#0F1A2E" />
    <text x={-326} y={-126} fill={P.sky} style={{ ...TXT(36), letterSpacing: 3 }}>{title}</text>
    <line x1={-326} y1={-108} x2={326} y2={-108} stroke="#2B3A55" strokeWidth={3} />
    {rows.map(([t, col, typed, gone = 0], k) => {
      const n = Math.round(t.length * clamp01(typed)), show = t.slice(0, n), cursor = typed > 0 && typed < 1 && Math.floor(f / 8) % 2 === 0
      return <g key={k} opacity={1 - clamp01(gone)} transform={`translate(${-326 + 30 * clamp01(gone)} ${-56 + k * 70})`}>
        <text x={0} y={0} fill={col} style={TXT(48)}>{show}{cursor ? '▌' : ''}</text>
        {gone > 0 && <line x1={0} y1={-16} x2={20 * t.length * clamp01(gone * 2)} y2={-16} stroke="#F06B5B" strokeWidth={5} />}
      </g>
    })}
  </g>
)

// ------------------------------------------------------------ a bond certificate; value 0–1 shrinks its price tag (rates rose)
export const BondCert: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string; tag?: string; tagO?: number; tagDrop?: number }> = ({ x, y, s = 1, o = 1, r = 0, t = 'BOND', tag, tagO = 0, tagDrop = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-90} width={260} height={180} rx={10} fill="#FBF3DF" stroke="#B88A2E" strokeWidth={5} />
    <rect x={-116} y={-76} width={232} height={152} rx={6} fill="none" stroke="#D9BE7F" strokeWidth={3} strokeDasharray="8 6" />
    <text y={-28} textAnchor="middle" fill="#7A5A1E" style={{ ...TXT(44), letterSpacing: 4 }}>{t}</text>
    {[0, 1].map((k) => <rect key={k} x={-80} y={0 + k * 20} width={160} height={8} rx={4} fill="#E3D3AE" />)}
    <circle cx={86} cy={50} r={24} fill="#C94A3E" /><path d="M76 70 L70 96 L86 86 L102 96 L96 70 Z" fill="#C94A3E" />
    {tag && tagO > 0 && <g opacity={tagO} transform={`translate(-104 ${70 + 30 * tagDrop}) rotate(${-10 + 22 * tagDrop})`}>
      <path d="M0 0 L40 -26 L130 -26 L130 26 L40 26 Z" fill={tagDrop > 0.5 ? '#F06B5B' : '#3DDC97'} /><circle cx={30} cy={0} r={7} fill="#FBF3DF" />
      <text x={86} y={14} textAnchor="middle" fill="#FFFFFF" style={TXT(36)}>{tag}</text></g>}
  </g>
)

// ------------------------------------------------------------ the deposit-insurance shield; text on its face
export const Shield: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; sub?: string; glow?: number }> = ({ x, y, s = 1, o = 1, t = '$250,000', sub = 'INSURED', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse rx={200} ry={220} fill={P.sky} opacity={0.18 * glow} />}
    <path d="M0 -170 L140 -120 Q140 60 0 170 Q-140 60 -140 -120 Z" fill={BANKBLUE} stroke="#FFFFFF" strokeWidth={8} />
    <path d="M0 -140 L112 -100 Q112 50 0 140 Q-112 50 -112 -100 Z" fill="#3E73B8" />
    <text y={-4} textAnchor="middle" fill="#FFFFFF" style={TXT(t.length > 8 ? 52 : 62)}>{t}</text>
    <text y={50} textAnchor="middle" fill="#CFE3FF" style={{ ...TXT(sub.length > 12 ? 24 : 34), letterSpacing: sub.length > 12 ? 1 : 3 }}>{sub}</text>
  </g>
)

// ------------------------------------------------------------ a tear-off calendar page (month + year, optional day)
export const CalPage: React.FC<{ x: number; y: number; s?: number; o?: number; m: string; d?: string; col?: string }> = ({ x, y, s = 1, o = 1, m, d, col = '#C94A3E' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-90} y={-100} width={180} height={200} rx={14} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={3} />
    <rect x={-90} y={-100} width={180} height={60} rx={14} fill={col} /><rect x={-90} y={-60} width={180} height={20} fill={col} />
    <text y={-56} textAnchor="middle" fill="#FFFFFF" style={TXT(m.length > 9 ? 30 : 38)}>{m}</text>
    {d && <text y={60} textAnchor="middle" fill="#16294A" style={TXT(d.length > 3 ? 64 : 92)}>{d}</text>}
  </g>
)

// ------------------------------------------------------------ a soft gold spotlight that snaps on its word and fades
export const Spot: React.FC<{ f: number; at: number; x: number; y: number; rx?: number; ry?: number }> = ({ f, at, x, y, rx = 200, ry = 160 }) => {
  const t = f - at
  if (t < 0 || t > 30) return null
  const o = t < 3 ? t / 3 : 1 - (t - 3) / 27
  return <ellipse cx={x} cy={y} rx={Math.min(rx, 230)} ry={Math.min(ry, 210)} fill={P.gold} opacity={0.18 * o} />
}

// ------------------------------------------------------------ a clean round cross (r68) of a comfortable size over a thing
export const NoMark: React.FC<{ x: number; y: number; o: number; r?: number }> = ({ x, y, o, r = 70 }) => o > 0 ? (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * o})`}>
    <circle r={r} fill="none" stroke="#D9483A" strokeWidth={r * 0.16} /><line x1={-r * 0.7} y1={r * 0.7} x2={r * 0.7} y2={-r * 0.7} stroke="#D9483A" strokeWidth={r * 0.16} strokeLinecap="round" />
  </g>
) : null

// ------------------------------------------------------------ a numbered step badge with a caption under it
export const StepBadge: React.FC<{ x: number; y: number; n: number; t: string; o?: number; col?: string; lit?: number; children?: React.ReactNode }> = ({ x, y, n, t, o = 1, col = BANKBLUE, lit = 0, children }) => (
  <g transform={`translate(${x} ${y}) scale(${1 + 0.08 * lit})`} opacity={o}>
    {children && <g transform="translate(0 -150)">{children}</g>}
    {lit > 0 && <circle r={84} fill={P.gold} opacity={0.3 * lit} />}
    <circle r={58} fill={col} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={TXT(66)}>{n}</text>
    <text y={118} textAnchor="middle" fill="var(--cc-ink, #16294A)" style={TXT(46)}>{t}</text>
  </g>
)
