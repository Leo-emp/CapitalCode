// ============================================================
// LONG VIDEO — "The 1% Fee That Costs More Than You Save" — objects for
// this story: the saver's glass jar of coins (the account), the monthly
// coin that drops in, the fee scoop that takes a slice off the top, the
// dotted ghost pile of growth a taken coin never makes, the fund house,
// the SEC building, a prospectus with its fee table, a year flag.
// The cast, headline and money helpers come from ../aimoney/common.
// One file per scene in this folder. No camera moves (owner r56).
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

// ------------------------------------------------------------ the saver's jar (the account)
// # fill 0–1 is the coin level; label sits on the jar's band; glow lights the coins (growth); size scales width and height
export const SaverJar: React.FC<{ x: number; y: number; w?: number; h?: number; fill: number; label?: string; glow?: number; o?: number; cut?: number }> = ({ x, y, w = 260, h = 340, fill, label, glow = 0, o = 1, cut = 0 }) => {
  const f = clamp01(fill), lv = (h - 40) * f
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <ellipse cx={0} cy={8} rx={w * 0.62} ry={16} fill="#000" opacity={0.12} />
      {/* # glass */}
      <rect x={-w / 2} y={-h} width={w} height={h} rx={34} fill="#DDEBF7" opacity={0.4} stroke="#A9C4DE" strokeWidth={6} />
      {/* # coins: a gold body with rows of coin rims */}
      {lv > 0 && <g>
        <rect x={-w / 2 + 14} y={-14 - lv} width={w - 28} height={lv} rx={24} fill={P.gold} />
        {Array.from({ length: Math.max(0, Math.floor(lv / 34)) }, (_, k) => <ellipse key={k} cx={-w / 2 + 40 + (k % 3) * ((w - 80) / 2)} cy={-30 - k * 34} rx={(w - 60) / 6} ry={9} fill={P.goldD} opacity={0.55} />)}
        <ellipse cx={0} cy={-14 - lv} rx={w / 2 - 14} ry={14} fill="#F6D47A" />
        {glow > 0 && <ellipse cx={0} cy={-14 - lv} rx={w / 2 + 20} ry={60} fill={P.gold} opacity={0.3 * glow} />}
        {/* # the slice the scoop takes: a coral band on the top */}
        {cut > 0 && <rect x={-w / 2 + 14} y={-14 - lv} width={w - 28} height={Math.max(8, lv * 0.06) * cut} rx={8} fill={P.coral} opacity={0.85} />}
      </g>}
      {/* # glass shine and lid */}
      <path d={`M${-w / 2 + 24} ${-h + 40} L${-w / 2 + 24} -40`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.5} />
      <rect x={-w / 2 - 10} y={-h - 30} width={w + 20} height={36} rx={12} fill={P.navy3} />
      {label && <g><rect x={-w / 2 + 20} y={-h * 0.55 - 30} width={w - 40} height={60} rx={14} fill={P.card} stroke={P.edge} strokeWidth={3} />
        <text x={0} y={-h * 0.55 + 14} textAnchor="middle" fill={P.ink} style={{ font: `400 ${Math.min(48, (w - 50) / Math.max(4, label.length) * 1.9)}px "Bebas Neue"`, letterSpacing: 2 }}>{label}</text></g>}
    </g>
  )
}

// ------------------------------------------------------------ the fee scoop (a long-handled silver scoop)
// # tilt 0–1 tips it (pouring), full 0–1 shows coins in it, s scales it (a bigger slice = a bigger scoop load)
export const Scoop: React.FC<{ x: number; y: number; s?: number; r?: number; full?: number; o?: number; load?: number }> = ({ x, y, s = 1, r = 0, full = 0, o = 1, load = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={30} y={-10} width={200} height={20} rx={10} fill="#8A97AA" />
    <rect x={190} y={-14} width={60} height={28} rx={12} fill={P.coral} />
    <path d="M-80 -40 Q-90 50 0 50 Q60 50 50 -40 Z" fill="#C9D3E1" stroke="#8A97AA" strokeWidth={6} />
    {full > 0 && Array.from({ length: Math.max(1, Math.round(5 * load)) }, (_, k) => <ellipse key={k} cx={-50 + (k % 3) * 40} cy={-34 - Math.floor(k / 3) * 14 + 8 * (1 - full)} rx={24} ry={9} fill={k % 2 ? P.gold : '#F6D47A'} stroke={P.goldD} strokeWidth={3} opacity={full} />)}
  </g>
)

// ------------------------------------------------------------ the ghost pile: dotted coins that would have grown
// # n coins tall, drawn as dashed outlines (what the taken money would have become)
export const GhostPile: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; w?: number }> = ({ x, y, n, s = 1, o = 1, w = 120 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <ellipse key={k} cx={0} cy={-k * 22} rx={w / 2} ry={12} fill="none" stroke={P.goldD} strokeWidth={4} strokeDasharray="10 8" />)}
  </g>
)

// ------------------------------------------------------------ a plain coin stack (solid)
export const Stack: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; w?: number; color?: string }> = ({ x, y, n, s = 1, o = 1, w = 120, color = P.gold }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={w * 0.6} ry={10} fill="#000" opacity={0.12} />
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k}><ellipse cx={0} cy={-k * 22} rx={w / 2} ry={12} fill={color === P.coral ? P.coralD : P.goldD} /><ellipse cx={0} cy={-k * 22 - 6} rx={w / 2} ry={12} fill={color} /></g>)}
  </g>
)

// ------------------------------------------------------------ the fund house (a calm building with a FUND sign)
export const FundHouse: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string; color?: string }> = ({ x, y, s = 1, o = 1, sign = 'FUND', color = P.skyD }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={260} ry={18} fill="#000" opacity={0.12} />
    <rect x={-230} y={-300} width={460} height={300} rx={12} fill="#E9EEF5" />
    <path d="M-260 -300 L0 -400 L260 -300 Z" fill={color} />
    <rect x={-150} y={-286} width={300} height={56} rx={10} fill={color} />
    <text x={0} y={-244} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 8 }}>{sign}</text>
    {[-150, -50, 50, 150].map((cx) => <rect key={cx} x={cx - 22} y={-210} width={44} height={180} rx={8} fill="#C9D3E1" />)}
    <rect x={-240} y={-30} width={480} height={30} rx={6} fill="#C9D3E1" />
  </g>
)

// ------------------------------------------------------------ a government building (the SEC)
export const GovBuilding: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={300} ry={18} fill="#000" opacity={0.12} />
    <rect x={-280} y={-40} width={560} height={40} fill="#D9DFE8" />
    <rect x={-260} y={-70} width={520} height={30} fill="#E9EEF5" />
    {Array.from({ length: 7 }, (_, k) => <rect key={k} x={-235 + k * 76} y={-300} width={34} height={230} fill="#F2F5FA" stroke="#C9D3E1" strokeWidth={3} />)}
    <rect x={-270} y={-330} width={540} height={34} fill="#E9EEF5" />
    <path d="M-290 -330 L0 -440 L290 -330 Z" fill="#D9DFE8" stroke="#C9D3E1" strokeWidth={4} />
    <circle cx={0} cy={-370} r={26} fill={P.navy3} />
  </g>
)

// ------------------------------------------------------------ a prospectus booklet with a fee table that can open
// # open 0–1 opens the cover onto the table; mark 0–1 circles the fee row
export const Prospectus: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; mark?: number }> = ({ x, y, s = 1, o = 1, open = 0, mark = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-200} y={-260} width={400} height={520} rx={14} fill="#000" opacity={0.12} transform="translate(10 12)" />
    <rect x={-200} y={-260} width={400} height={520} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={4} />
    <rect x={-170} y={-120} width={340} height={260} rx={8} fill="#F2EADB" opacity={clamp01(open)} />
    {open > 0.3 && [0, 1, 2, 3].map((k) => <g key={k} opacity={clamp01((open - 0.3) / 0.5)}>
      <rect x={-150} y={-96 + k * 60} width={180} height={14} rx={7} fill="#C8B994" />
      <rect x={70} y={-96 + k * 60} width={70} height={14} rx={7} fill={k === 1 ? P.coral : '#C8B994'} />
    </g>)}
    {mark > 0 && <ellipse cx={0} cy={-30} rx={190 * mark} ry={44 * mark} fill="none" stroke={P.coral} strokeWidth={8} />}
    {/* # the cover swings left */}
    <g transform={`translate(-200 0) scale(${lerp(1, -0.15, clamp01(open))} 1) translate(200 0)`}>
      <rect x={-200} y={-260} width={400} height={520} rx={14} fill={P.navy3} />
      <rect x={-140} y={-180} width={280} height={30} rx={10} fill={P.gold} />
      <rect x={-140} y={-130} width={200} height={16} rx={8} fill="#5A7EB3" />
    </g>
  </g>
)

// ------------------------------------------------------------ a year flag on a stick (year number shown only when spoken)
export const YearFlag: React.FC<{ x: number; y: number; text: string; o?: number; s?: number }> = ({ x, y, text, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-4} y={-150} width={8} height={150} fill="#8A97AA" />
    <path d="M4 -150 L150 -150 L130 -118 L150 -86 L4 -86 Z" fill={P.navy3} />
    <text x={72} y={-104} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{text}</text>
  </g>
)

// ------------------------------------------------------------ a soft spotlight on the thing being talked about
// # glows up on its cue word and fades over ~1 s (a real, quiet change that points the eye; never a zoom)
export const Spot: React.FC<{ f: number; at: number; x: number; y: number; rx?: number; ry?: number; color?: string }> = ({ f, at, x, y, rx = 220, ry = 160, color = P.gold }) => {
  const t = f - at
  if (t < 0 || t > 40) return null
  const o = t < 8 ? t / 8 : 1 - (t - 8) / 32
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={color} opacity={0.22 * o} />
}
