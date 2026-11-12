// ============================================================
// LONG VIDEO — "Your Snacks Are Shrinking. Here's What It Really Costs You."
// Fresh drawing kit for this video only (owner 2026-11-03: everything fresh, made
// for the topic): a warm supermarket world — wooden shelves, shelf labels with a
// unit price, a triangle chocolate bar whose gaps widen, an ice-cream tub, cereal
// boxes, paper-towel and toilet-paper packs, coffee, a trolley, a breakfast table,
// a magnifying glass, a weighing scale. Only the shared engine comes from outside.
// House rules: everything appears ON its spoken word; nothing covers anything;
// one picture group at a time; labels sit on the thing they name.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { clamp01, lerp, on, P, pop } from '../kit'

// ------------------------------------------------------------ palette (fresh grocery colours)
export const S = {
  cream: '#FBF3E4', wood: '#C98F55', woodD: '#9A6534', woodL: '#E2B27C', ink: '#23314F', ink2: '#5D6B86',
  red: '#E0573F', redD: '#B23F2B', mint: '#3FB98A', mintD: '#2B8A66', sky: '#4FA3D9', skyD: '#2E78AE', sun: '#F4B740', sunD: '#C98C1C',
  choc: '#7A4A2B', chocD: '#5A321C', chocL: '#9C6640', paper: '#FFFFFF', paperD: '#E7DFD0', tag: '#FFF4C7', tagD: '#E2C979',
  floor: '#E8D7B8', floorD: '#D5BF96', wall: '#F6E8D0', tile: '#EFDDBF', glow: '#FFE7A3', night: '#1F2B47',
  coral: '#F07A63', berry: '#C2477A', grape: '#7D5BB8', leaf: '#6FAF4F',
}

// ------------------------------------------------------------ the supermarket backdrop: back wall, tiles, a hanging aisle sign
export const Store: React.FC<{ f: number; aisle?: string; y?: number; o?: number }> = ({ f, aisle, y = 880, o = 1 }) => (
  <g opacity={o}>
    <rect x={-40} y={200} width={2000} height={y - 200} fill={S.wall} />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={k * 170 - 20} y={200} width={6} height={y - 200} fill={S.tile} />)}
    <rect x={-40} y={y} width={2000} height={1080 - y + 40} fill={S.floor} />
    {Array.from({ length: 10 }, (_, k) => <path key={k} d={`M${k * 220 - 100} ${y} L${k * 220 - 260} 1080`} stroke={S.floorD} strokeWidth={3} />)}
    <rect x={-40} y={y} width={2000} height={8} fill={S.floorD} />
    {/* # ceiling lights */}
    {[300, 960, 1620].map((lx, k) => <g key={k}><rect x={lx - 120} y={196} width={240} height={14} rx={7} fill="#FFFDF5" /><rect x={lx - 120} y={210} width={240} height={30} fill={S.glow} opacity={0.25 + 0.05 * Math.sin(f / 30 + k)} /></g>)}
    {aisle && <g transform={`translate(960 ${232 + Math.sin(f / 40) * 3})`}><path d="M-60 -32 L-60 -8 M60 -32 L60 -8" stroke={S.ink2} strokeWidth={3} /><rect x={-150} y={-8} width={300} height={50} rx={10} fill={S.mint} /><Label x={0} y={28} text={aisle} size={32} font="Bebas Neue" color="#FFFFFF" /></g>}
  </g>
)
// # a long wooden shelf (planks at given heights), drawn behind products
export const Shelf: React.FC<{ x: number; y: number; w: number; rows?: number; gap?: number; o?: number }> = ({ x, y, w, rows = 2, gap = 220, o = 1 }) => (
  <g opacity={o}>
    <rect x={x - 14} y={y - rows * gap - 20} width={14} height={rows * gap + 20} fill={S.woodD} /><rect x={x + w} y={y - rows * gap - 20} width={14} height={rows * gap + 20} fill={S.woodD} />
    {Array.from({ length: rows }, (_, k) => <g key={k}><rect x={x - 14} y={y - k * gap} width={w + 28} height={22} rx={4} fill={S.wood} /><rect x={x - 14} y={y - k * gap + 22} width={w + 28} height={8} fill={S.woodD} /></g>)}
  </g>
)
// # a shelf label: big price, small "per ounce" unit price; `hi` highlights the unit price
export const ShelfLabel: React.FC<{ x: number; y: number; s?: number; o?: number; price: string; unit?: string; hi?: number }> = ({ x, y, s = 1, o = 1, price, unit, hi = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-100} y={-44} width={200} height={88} rx={8} fill={S.tag} stroke={S.tagD} strokeWidth={4} />
    <Label x={-28} y={14} text={price} size={46} font="Bebas Neue" color={S.ink} />
    {unit && <g><rect x={34} y={-34} width={58} height={68} rx={6} fill={hi > 0 ? S.red : '#FFFDF2'} opacity={0.15 + 0.85 * hi} stroke={S.tagD} strokeWidth={2} />
      <Label x={63} y={-6} text={unit} size={20} font="Bebas Neue" color={hi > 0.5 ? '#FFFFFF' : S.ink2} /><Label x={63} y={18} text="/OZ" size={16} font="Bebas Neue" color={hi > 0.5 ? '#FFFFFF' : S.ink2} /></g>}
  </g>
)
// # a price sticker (round)
export const Sticker: React.FC<{ x: number; y: number; s?: number; o?: number; text: string; color?: string }> = ({ x, y, s = 1, o = 1, text, color = S.red }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(-8)`} opacity={o}><circle r={52} fill={color} /><circle r={44} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeDasharray="6 5" /><Label x={0} y={14} text={text} size={text.length > 5 ? 30 : 40} font="Bebas Neue" color="#FFFFFF" /></g>
)

// ------------------------------------------------------------ products (all drawn here)
// # a triangle chocolate bar: n peaks; gap 0..1 widens the gaps between peaks (the 2016 change); label shows grams
export const ChocBar: React.FC<{ x: number; y: number; s?: number; o?: number; n?: number; gap?: number; grams?: string; open?: number }> = ({ x, y, s = 1, o = 1, n = 9, gap = 0, grams = '400 G', open = 0 }) => {
  const w = 760, pw = w / n, peak = pw * lerp(0.95, 0.62, clamp01(gap))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      {/* # the box (the wrapper), slides down to show the chocolate when open */}
      <g opacity={1 - open * 0.0}>
        {Array.from({ length: n }, (_, k) => { const cx = -w / 2 + pw * (k + 0.5)
          return <g key={k}><path d={`M${cx - peak / 2} 0 L${cx} -120 L${cx + peak / 2} 0 Z`} fill={S.choc} /><path d={`M${cx} -120 L${cx + peak / 2} 0 L${cx + peak * 0.12} 0 Z`} fill={S.chocD} /><path d={`M${cx - peak / 2} 0 L${cx} -120 L${cx - peak * 0.18} 0 Z`} fill={S.chocL} opacity={0.6} /></g> })}
        <rect x={-w / 2} y={0} width={w} height={18} rx={4} fill={S.chocD} />
      </g>
      {/* # the wrapper below, with the weight */}
      <g transform={`translate(0 ${lerp(0, 40, open)})`}><path d={`M${-w / 2 - 20} 30 L${w / 2 + 20} 30 L${w / 2} 130 L${-w / 2} 130 Z`} fill={S.sun} /><rect x={-w / 2} y={40} width={w} height={14} fill={S.red} />
        <Label x={0} y={112} text={grams} size={48} font="Bebas Neue" color={S.ink} /></g>
    </g>
  )
}
// # an ice-cream tub; size 0..1 maps 64 oz (1) to 60 oz (~0.94) — the tub gets slightly shorter
export const Tub: React.FC<{ x: number; y: number; s?: number; o?: number; oz: string; h?: number }> = ({ x, y, s = 1, o = 1, oz, h = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M-130 0 L-150 ${-260 * h} L150 ${-260 * h} L130 0 Z`} fill="#FFFFFF" stroke={S.paperD} strokeWidth={5} />
    <rect x={-160} y={-260 * h - 34} width={320} height={40} rx={12} fill={S.berry} />
    <path d={`M-140 ${-170 * h} C-60 ${-200 * h} 60 ${-140 * h} 140 ${-170 * h} L136 ${-120 * h} C60 ${-90 * h} -60 ${-150 * h} -136 ${-120 * h} Z`} fill="#F7C6D5" />
    <Label x={0} y={-60} text={oz} size={56} font="Bebas Neue" color={S.berry} />
  </g>
)
// # a cereal box; size is the height factor (16 oz box ≈ 0.9 of the 18 oz box); text = net weight
export const Cereal: React.FC<{ x: number; y: number; s?: number; o?: number; oz?: string; h?: number; color?: string; w?: number }> = ({ x, y, s = 1, o = 1, oz = '18 OZ', h = 1, color = S.sun, w = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-90 * w} y={-300 * h} width={180 * w} height={300 * h} rx={8} fill={color} stroke={S.sunD} strokeWidth={4} />
    <rect x={-90 * w + 10} y={-300 * h + 12} width={180 * w - 20} height={60} rx={6} fill={S.red} /><Label x={0} y={-300 * h + 56} text="CRUNCH" size={38} font="Bebas Neue" color="#FFFFFF" />
    <circle cx={0} cy={-150 * h} r={52 * Math.min(1, w)} fill="#FFFFFF" opacity={0.9} />{[[-20, -8], [14, -18], [6, 16], [-14, 18]].map(([dx, dy], k) => <circle key={k} cx={dx} cy={-150 * h + dy} r={12} fill={S.sunD} />)}
    <rect x={-70 * w} y={-48} width={140 * w} height={34} rx={6} fill="#FFFFFF" /><Label x={0} y={-22} text={oz} size={30} font="Bebas Neue" color={S.ink} />
  </g>
)
// # a paper-towel pack (n rolls) or toilet-paper pack
export const Rolls: React.FC<{ x: number; y: number; s?: number; o?: number; n?: number; label?: string; tp?: boolean }> = ({ x, y, s = 1, o = 1, n = 4, label, tp }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-n * 40 - 14} y={tp ? -200 : -300} width={n * 80 + 28} height={tp ? 200 : 300} rx={18} fill={tp ? '#DCEFFA' : '#E8F6EE'} opacity={0.85} stroke={tp ? S.skyD : S.mintD} strokeWidth={4} />
    {Array.from({ length: n }, (_, k) => <g key={k}><rect x={-n * 40 + k * 80 + 6} y={tp ? -186 : -286} width={68} height={tp ? 172 : 272} rx={30} fill="#FFFFFF" /><ellipse cx={-n * 40 + k * 80 + 40} cy={tp ? -186 : -286} rx={34} ry={12} fill={S.paperD} /><ellipse cx={-n * 40 + k * 80 + 40} cy={tp ? -186 : -286} rx={10} ry={4} fill="#B8AE9C" /></g>)}
    {label && <g><rect x={-80} y={tp ? -120 : -170} width={160} height={46} rx={8} fill={tp ? S.sky : S.mint} /><Label x={0} y={tp ? -86 : -136} text={label} size={32} font="Bebas Neue" color="#FFFFFF" /></g>}
  </g>
)
// # a coffee bag
export const Coffee: React.FC<{ x: number; y: number; s?: number; o?: number; label?: string }> = ({ x, y, s = 1, o = 1, label = 'COFFEE' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-100 0 L-110 -240 L-70 -280 L70 -280 L110 -240 L100 0 Z" fill={S.chocD} /><rect x={-80} y={-290} width={160} height={24} rx={6} fill={S.sunD} />
    <rect x={-70} y={-180} width={140} height={90} rx={10} fill={S.cream} /><Label x={0} y={-122} text={label} size={36} font="Bebas Neue" color={S.chocD} />
    <ellipse cx={0} cy={-210} rx={22} ry={14} fill={S.chocL} /><path d="M-12 -210 C-4 -220 4 -200 12 -210" stroke={S.chocD} strokeWidth={4} fill="none" />
  </g>
)
// # a snack bag (crisps)
export const Snack: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = S.red }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-90 0 C-110 -80 -110 -180 -86 -250 L86 -250 C110 -180 110 -80 90 0 Z" fill={color} /><path d="M-86 -250 L-80 -268 L80 -268 L86 -250 Z" fill="#FFFFFF" opacity={0.6} />
    <ellipse cx={0} cy={-130} rx={50} ry={34} fill={S.sun} /><Label x={0} y={-118} text="CHIPS" size={30} font="Bebas Neue" color={S.redD} />
  </g>
)
// # a glass jar; dip 0..1 raises a hidden dent in the bottom (one of the "tells")
export const Jar: React.FC<{ x: number; y: number; s?: number; o?: number; dip?: number; cut?: number }> = ({ x, y, s = 1, o = 1, dip = 0, cut = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-100} y={-280} width={200} height={280} rx={30} fill="#E9F2F7" stroke="#A9C4D6" strokeWidth={5} />
    <path d={`M-92 -10 L-92 -230 L92 -230 L92 -10 C40 ${-10 - 90 * dip} -40 ${-10 - 90 * dip} -92 -10 Z`} fill={S.leaf} />
    <rect x={-110} y={-320} width={220} height={46} rx={10} fill={S.red} />
    {cut > 0 && <g opacity={cut}><path d={`M-100 0 C-40 ${-110 * dip} 40 ${-110 * dip} 100 0`} stroke={S.red} strokeWidth={6} strokeDasharray="12 8" fill="none" /></g>}
  </g>
)
// # a trolley; `load` 0..1 fills it with a few items
export const Trolley: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; load?: number }> = ({ x, y, s = 1, o = 1, f, load = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-150 -230 L150 -230 L120 -80 L-130 -80 Z" fill="none" stroke={S.ink2} strokeWidth={8} strokeLinejoin="round" />
    {[-90, -30, 30, 90].map((gx) => <path key={gx} d={`M${gx} -228 L${gx * 0.85} -82`} stroke={S.ink2} strokeWidth={4} />)}
    <path d="M-150 -230 L-200 -280" stroke={S.ink2} strokeWidth={8} strokeLinecap="round" /><path d="M-130 -80 L-120 -30 L120 -30" stroke={S.ink2} strokeWidth={8} fill="none" />
    {[-100, 100].map((wx) => <circle key={wx} cx={wx} cy={-14} r={16} fill={S.ink} />)}
    <g opacity={clamp01(load * 3)}><rect x={-120} y={-300} width={70} height={140} rx={6} fill={S.sun} /></g>
    <g opacity={clamp01(load * 3 - 1)}><path d="M-30 -160 L-40 -290 L30 -290 L40 -160 Z" fill={S.chocD} /></g>
    <g opacity={clamp01(load * 3 - 2)}><rect x={50} y={-270} width={80} height={110} rx={18} fill="#E8F6EE" stroke={S.mintD} strokeWidth={3} /></g>
  </g>
)
// # a magnifying glass (fresh design)
export const Magnifier: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = -30 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-14} y={70} width={28} height={130} rx={12} fill={S.woodD} /><circle r={84} fill="#EAF6FF" opacity={0.55} stroke={S.ink} strokeWidth={14} />
    <path d="M-40 -40 C-20 -60 10 -62 30 -50" stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>
)
// # a kitchen scale showing a reading
export const Scale: React.FC<{ x: number; y: number; s?: number; o?: number; read: string }> = ({ x, y, s = 1, o = 1, read }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-90} width={300} height={90} rx={20} fill="#E9EEF3" stroke="#AEB9C6" strokeWidth={5} /><rect x={-170} y={-110} width={340} height={22} rx={10} fill="#C9D3DE" />
    <rect x={-70} y={-70} width={140} height={50} rx={8} fill={S.night} /><Label x={0} y={-32} text={read} size={36} font="Bebas Neue" color={S.glow} />
  </g>
)
// # a coin (fresh: copper-gold with a cent sign)
export const Cent: React.FC<{ x: number; y: number; r?: number; o?: number; t?: string }> = ({ x, y, r = 30, o = 1, t = '¢' }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}><circle cy={r * 0.15} r={r} fill={S.sunD} /><circle r={r} fill={S.sun} /><circle r={r * 0.72} fill="none" stroke={S.sunD} strokeWidth={r * 0.1} /><Label x={0} y={r * 0.36} text={t} size={r * 1.0} font="Bebas Neue" color={S.sunD} /></g>
)
// # a dollar bill
export const Dollar: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; v?: string }> = ({ x, y, s = 1, o = 1, r = 0, v = '$1' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}><rect x={-100} y={-50} width={200} height={100} rx={10} fill="#CFE8C9" stroke={S.mintD} strokeWidth={4} />{v.length <= 4 && <circle r={30} fill="none" stroke={S.mintD} strokeWidth={3} />}<Label x={0} y={12} text={v} size={v.length > 4 ? 38 : 34} font="Bebas Neue" color={S.mintD} /></g>
)
// # a government report (a booklet with a seal) — used for BLS and GAO
export const Report: React.FC<{ x: number; y: number; s?: number; o?: number; title: string; color?: string }> = ({ x, y, s = 1, o = 1, title, color = S.skyD }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(-4)`} opacity={o}>
    <rect x={-120} y={-160} width={240} height={320} rx={10} fill="#FFFFFF" stroke={S.paperD} strokeWidth={5} /><rect x={-120} y={-160} width={240} height={90} rx={10} fill={color} />
    <Label x={0} y={-104} text={title} size={52} font="Bebas Neue" color="#FFFFFF" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-90} y={-40 + k * 34} width={180 - (k % 2) * 50} height={12} rx={6} fill={S.paperD} />)}
    <circle cx={70} cy={110} r={30} fill={S.sun} /><circle cx={70} cy={110} r={20} fill="none" stroke="#FFFFFF" strokeWidth={3} />
  </g>
)
// # a breakfast table with a bowl
export const Table: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-260} y={-190} width={520} height={30} rx={8} fill={S.wood} /><rect x={-240} y={-160} width={20} height={160} fill={S.woodD} /><rect x={220} y={-160} width={20} height={160} fill={S.woodD} />
    <path d="M-60 -190 C-60 -240 60 -240 60 -190 Z" fill="#FFFFFF" stroke={S.paperD} strokeWidth={4} />
  </g>
)
// # a soft bump on a cue word (the named thing pulses)
export const bump = (f: number, at: number, amt = 0.07) => 1 + amt * on(f, at, 6) * (1 - on(f, at + 14, 8))
// # the named thing pulses on each of several cue words (used to show a line while it is being said)
export const pulse = (f: number, ats: number[], amt = 0.05) => ats.reduce((m, a) => m * bump(f, a, amt), 1)
export { pop }
