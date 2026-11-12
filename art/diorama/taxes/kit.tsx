// # Fresh drawings for "How Tax Brackets Actually Work" (owner rules r82/r83: this video's own world).
// # The world: a night-time WATERWORKS. Pay is glowing water; each tax bracket is a glass tank on a rising
// # brick terrace (the "stairs"); each tank skims its own rate off into a copper coin chute.
// # Other chapters get their own settings: a dusk kitchen, a daytime office, a shop street, a sunrise.
// # Every prop is drawn around its own origin (bottom centre for things that stand, centre for flat things).
import React from 'react'

export const TXT = (size: number, w = 400): React.CSSProperties => ({ font: `${w} ${size}px "Bebas Neue"`, letterSpacing: 1 })
export const SANS = (size: number, w = 700): React.CSSProperties => ({ font: `${w} ${size}px "Inter"` })

// # palette (own to this video)
export const NIGHT0 = '#0F1636', NIGHT1 = '#232C66', NIGHT2 = '#3A3F86'
export const BRASS = '#D5A84E', BRASS2 = '#9C7330', COPPER = '#C27A45', COPPER2 = '#8A4E27'
export const WATER = '#4FD0F0', WATER2 = '#1C8FC9', GLASS = '#CFEFFF'
export const BRICK = '#7A4A3C', BRICK2 = '#5C362C', STONE = '#8E8AA8'
export const WARM = '#FFC86B', CORAL = '#F0745A', MINT = '#5BD69B', CREAM = '#FFF4DE', INK = '#141B3C', PAPER = '#FFFBF0'
export const RATE_COL = ['#7FE3C4', '#5FCFF2', '#58A8F5', '#7C8CF2', '#A27BE8', '#D671C9', '#F0745A']
export const RATES = ['10%', '12%', '22%', '24%', '32%', '35%', '37%']
export const CAPS = ['$0–12,400', '$12,400–50,400', '$50,400–105,700', '$105,700–201,775', '$201,775–256,225', '$256,225–640,600', '$640,600+']

const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

// ================================================================== WORLDS (full-frame backgrounds)

// # night sky over the waterworks: deep gradient, twinkling stars, a moon with halo, a far city skyline with lit windows,
// # a nearer row of hills, and the brick terrace the tanks stand on (drawn by the piece)
export const NightWorld: React.FC<{ f: number; id: string; moon?: boolean }> = ({ f, id, moon = true }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={NIGHT0} /><stop offset="70%" stopColor={NIGHT1} /><stop offset="100%" stopColor={NIGHT2} /></linearGradient>
      <radialGradient id={`${id}-moon`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFF3C8" stopOpacity={0.55} /><stop offset="100%" stopColor="#FFF3C8" stopOpacity={0} /></radialGradient>
      <linearGradient id={`${id}-hill`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#262B5E" /><stop offset="100%" stopColor="#171C42" /></linearGradient>
    </defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-sky)`} />
    {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 50) * 560} r={0.8 + rnd(i + 9) * 2.2} fill="#FFFFFF" opacity={0.25 + 0.5 * Math.abs(Math.sin(f / (18 + rnd(i) * 30) + i))} />)}
    {moon && <g transform="translate(1660 190)"><circle r={170} fill={`url(#${id}-moon)`} /><circle r={62} fill="#FFF1C6" /><circle cx={-18} cy={-10} r={12} fill="#EADBA8" /><circle cx={16} cy={18} r={8} fill="#EADBA8" /></g>}
    {/* far city */}
    <g opacity={0.9}>
      {Array.from({ length: 26 }, (_, i) => { const w = 50 + rnd(i + 3) * 60, h = 90 + rnd(i + 7) * 210, x = i * 76 - 20; return <g key={i}>
        <rect x={x} y={760 - h} width={w} height={h + 40} fill="#1B2150" />
        {Array.from({ length: Math.floor(h / 34) }, (_, r) => [0, 1].map((cI) => rnd(i * 31 + r * 7 + cI) > 0.55 && <rect key={`${r}-${cI}`} x={x + 10 + cI * (w / 2 - 4)} y={760 - h + 14 + r * 34} width={10} height={14} fill={WARM} opacity={0.35 + 0.35 * rnd(i + r + cI)} />))}
      </g> })}
    </g>
    <path d="M-40 800 Q300 720 620 780 T1260 770 T1980 760 L1980 1120 L-40 1120 Z" fill={`url(#${id}-hill)`} />
  </g>
)

// # the brick terrace the tanks stand on: seven steps rising left to right (the "stairs" of the brackets)
export const STEP_X = (k: number) => 230 + k * 243
export const STEP_Y = (k: number) => 930 - k * 34
export const Terrace: React.FC<{ n?: number; o?: number }> = ({ n = 7, o = 1 }) => (
  <g opacity={o}>
    {Array.from({ length: n }, (_, k) => { const x = STEP_X(k) - 121, y = STEP_Y(k); return <g key={k}>
      <rect x={x} y={y} width={243} height={1100 - y} fill={k % 2 ? BRICK : '#83503F'} />
      <rect x={x} y={y} width={243} height={14} fill="#A66B55" />
      {Array.from({ length: 8 }, (_, r) => <line key={r} x1={x} x2={x + 243} y1={y + 40 + r * 28} y2={y + 40 + r * 28} stroke={BRICK2} strokeWidth={2} opacity={0.6} />)}
    </g> })}
  </g>
)

// # dusk kitchen: warm wall, a big window onto a violet dusk city, a hanging lamp, a counter and an open shelf
export const KitchenWorld: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F6DDBA" /><stop offset="100%" stopColor="#E9C59A" /></linearGradient>
      <linearGradient id={`${id}-dusk`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5B4B9A" /><stop offset="60%" stopColor="#E7869A" /><stop offset="100%" stopColor="#FFC58A" /></linearGradient>
      <radialGradient id={`${id}-lamp`} cx="0.5" cy="0" r="0.9"><stop offset="0%" stopColor="#FFE7AE" stopOpacity={0.6} /><stop offset="100%" stopColor="#FFE7AE" stopOpacity={0} /></radialGradient>
    </defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-wall)`} />
    {/* window */}
    <rect x={1180} y={230} width={560} height={420} rx={14} fill={`url(#${id}-dusk)`} />
    {Array.from({ length: 9 }, (_, i) => { const h = 80 + rnd(i + 2) * 150; return <rect key={i} x={1190 + i * 62} y={650 - h} width={54} height={h} fill="#43386E" opacity={0.85} /> })}
    {Array.from({ length: 16 }, (_, i) => <rect key={i} x={1200 + (i % 8) * 66} y={560 - Math.floor(i / 8) * 50} width={10} height={12} fill={WARM} opacity={0.6 * Math.abs(Math.sin(f / 40 + i))} />)}
    <rect x={1180} y={230} width={560} height={420} rx={14} fill="none" stroke="#FFFFFF" strokeWidth={18} />
    <line x1={1460} y1={230} x2={1460} y2={650} stroke="#FFFFFF" strokeWidth={12} />
    <rect x={1160} y={650} width={600} height={24} rx={6} fill="#D9B48A" />
    {/* lamp */}
    <line x1={140} y1={-10} x2={140} y2={200} stroke="#6B4B35" strokeWidth={4} />
    <path d="M80 200 L200 200 L170 160 L110 160 Z" fill="#3F6A5C" />
    <ellipse cx={560} cy={420} rx={520} ry={330} fill={`url(#${id}-lamp)`} />
    {/* shelf + counter */}
    <rect x={180} y={430} width={560} height={22} rx={6} fill="#9A6A45" />
    <rect x={-40} y={800} width={2000} height={60} fill="#B98457" />
    <rect x={-40} y={860} width={2000} height={300} fill="#8E5E3C" />
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={30 + i * 250} y={890} width={200} height={170} rx={10} fill="#A06C47" stroke="#7E5234" strokeWidth={4} />)}
  </g>
)

// # daytime office: soft blue wall, a wide window with sky and towers, a potted plant, a desk with a monitor
export const OfficeWorld: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#DDEBF2" /><stop offset="100%" stopColor="#C6DCE8" /></linearGradient>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7EC3F0" /><stop offset="100%" stopColor="#CFEAFB" /></linearGradient>
    </defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-wall)`} />
    <rect x={240} y={220} width={1440} height={470} rx={10} fill={`url(#${id}-sky)`} />
    {Array.from({ length: 12 }, (_, i) => { const h = 120 + rnd(i + 11) * 260; return <g key={i}><rect x={260 + i * 120} y={690 - h} width={96} height={h} fill="#9FB8CC" /><rect x={268 + i * 120} y={700 - h} width={80} height={6} fill="#B9CEDD" /></g> })}
    {[0, 1].map((k) => <ellipse key={k} cx={(400 + k * 700 + f * 0.6) % 1600 + 240} cy={300 + k * 40} rx={90} ry={26} fill="#FFFFFF" opacity={0.85} />)}
    <rect x={240} y={220} width={1440} height={470} rx={10} fill="none" stroke="#F4F8FB" strokeWidth={20} />
    {[720, 1200].map((x) => <line key={x} x1={x} y1={220} x2={x} y2={690} stroke="#F4F8FB" strokeWidth={12} />)}
    <rect x={-40} y={880} width={2000} height={300} fill="#9AA9B8" />
    <rect x={-40} y={870} width={2000} height={16} fill="#B7C3CE" />
  </g>
)

// # shop street at golden hour: sky, three shop fronts with striped awnings and windows, a pavement
export const StreetWorld: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <g>
    <defs><linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFB98A" /><stop offset="100%" stopColor="#FFE6C2" /></linearGradient></defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-sky)`} />
    <circle cx={1700} cy={260} r={90} fill="#FFE08A" opacity={0.9} />
    {[[90, '#E07A5F', '#F2CC8F'], [690, '#3D7EA6', '#BFE3F2'], [1290, '#5E9C76', '#D7EFC8']].map(([x, c1, c2], k) => <g key={k} transform={`translate(${x} 0)`}>
      <rect x={0} y={300} width={540} height={600} fill={k === 1 ? '#F1E3CB' : '#F6E8D2'} stroke="#D9C2A0" strokeWidth={4} />
      <rect x={30} y={250} width={480} height={70} rx={8} fill={c1 as string} />
      <path d={Array.from({ length: 8 }, (_, i) => `M${i * 60} 400 L${i * 60 + 30} 400 L${i * 60 + 30} 440 Q${i * 60 + 15} 470 ${i * 60} 440 Z`).join(' ')} fill={c1 as string} />
      <path d={Array.from({ length: 8 }, (_, i) => `M${i * 60 + 30} 400 L${i * 60 + 60} 400 L${i * 60 + 60} 440 Q${i * 60 + 45} 470 ${i * 60 + 30} 440 Z`).join(' ')} fill="#FFFFFF" />
      <rect x={0} y={380} width={540} height={22} fill={c1 as string} />
      <rect x={50} y={500} width={300} height={300} rx={8} fill={c2 as string} stroke="#FFFFFF" strokeWidth={10} />
      <rect x={390} y={540} width={110} height={360} rx={6} fill="#8E6A4A" />
    </g>)}
    <rect x={-40} y={900} width={2000} height={240} fill="#B8A894" />
    <rect x={-40} y={900} width={2000} height={14} fill="#D3C6B4" />
  </g>
)

// # sunrise over the waterworks hills: warm gradient, rising sun with rays, soft clouds
export const SunriseWorld: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6E7FD1" /><stop offset="45%" stopColor="#F3A6A0" /><stop offset="100%" stopColor="#FFE2A8" /></linearGradient>
      <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFF2B8" /><stop offset="100%" stopColor="#FFF2B8" stopOpacity={0} /></radialGradient>
    </defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-sky)`} />
    <circle cx={960} cy={780} r={420} fill={`url(#${id}-sun)`} opacity={0.8} />
    <circle cx={960} cy={780} r={130} fill="#FFE9A0" />
    {[0, 1, 2].map((k) => <ellipse key={k} cx={(300 + k * 620 + f * 0.4) % 2100 - 90} cy={260 + k * 70} rx={140} ry={34} fill="#FFFFFF" opacity={0.7} />)}
    <path d="M-40 820 Q400 740 800 800 T1980 780 L1980 1120 L-40 1120 Z" fill="#7C5C8E" />
    <path d="M-40 880 Q500 830 1000 870 T1980 860 L1980 1120 L-40 1120 Z" fill="#5E4775" />
  </g>
)

// # soft edge darkening over any world (drawn last)
export const Vig: React.FC<{ id: string; k?: number }> = ({ id, k = 0.35 }) => (
  <g pointerEvents="none">
    <defs><radialGradient id={`${id}-vig`} cx="0.5" cy="0.5" r="0.75"><stop offset="65%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#0A0F26" stopOpacity={k} /></radialGradient></defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill={`url(#${id}-vig)`} />
  </g>
)

// ================================================================== WATERWORKS PROPS

// # a glass tank: back glass, water (level 0–1) with a rolling surface and a light band, rivets, brass rings, front
// # reflections, a brass rate plaque under it and a hanging capacity tag. `lit` brightens the rim when it is talked about.
export const Tank: React.FC<{ x: number; y: number; w?: number; h?: number; level: number; rate: string; cap?: string; col?: string; f: number; o?: number; lit?: number; capO?: number; ghost?: boolean; capBelow?: boolean; capLit?: number }> = ({ x, y, w = 180, h = 300, level, rate, cap, col = WATER, f, o = 1, lit = 0, capO = 1, ghost, capBelow, capLit = 0 }) => {
  const lv = Math.max(0, Math.min(1, level)), top = -h + 18 + (h - 36) * (1 - lv)
  const wave = Array.from({ length: 13 }, (_, i) => `L${-w / 2 + 10 + i * ((w - 20) / 12)} ${top + 5 * Math.sin(f / 7 + i * 0.9)}`).join(' ')
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      {/* legs */}
      <rect x={-w / 2 + 12} y={-10} width={14} height={10} fill={BRASS2} /><rect x={w / 2 - 26} y={-10} width={14} height={10} fill={BRASS2} />
      {/* back glass */}
      <rect x={-w / 2} y={-h} width={w} height={h - 10} rx={16} fill={GLASS} opacity={ghost ? 0.06 : 0.16} />
      {/* water */}
      {lv > 0.002 && <g>
        <path d={`M${-w / 2 + 10} ${top} ${wave} L${w / 2 - 10} ${-28} Q${w / 2 - 10} -18 ${w / 2 - 20} -18 L${-w / 2 + 20} -18 Q${-w / 2 + 10} -18 ${-w / 2 + 10} -28 Z`} fill={col} opacity={ghost ? 0.35 : 0.85} />
        <path d={`M${-w / 2 + 10} ${top} ${wave}`} fill="none" stroke="#FFFFFF" strokeWidth={4} opacity={0.65} />
        <rect x={-w / 2 + 24} y={top + 16} width={14} height={Math.max(0, -18 - top - 30)} rx={7} fill="#FFFFFF" opacity={0.25} />
      </g>}
      {/* level ticks */}
      {Array.from({ length: 5 }, (_, i) => <line key={i} x1={w / 2 - 34} x2={w / 2 - 18} y1={-h + 40 + i * ((h - 70) / 4)} y2={-h + 40 + i * ((h - 70) / 4)} stroke="#FFFFFF" strokeWidth={3} opacity={0.5} />)}
      {/* glass outline + reflections */}
      <rect x={-w / 2} y={-h} width={w} height={h - 10} rx={16} fill="none" stroke={GLASS} strokeWidth={5} opacity={0.75} />
      <path d={`M${-w / 2 + 16} ${-h + 30} L${-w / 2 + 16} ${-h + 120}`} stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" opacity={0.45} />
      {/* brass rings with rivets */}
      {[-h - 8, -26].map((ry, k) => <g key={k}>
        <rect x={-w / 2 - 10} y={ry} width={w + 20} height={22} rx={8} fill={BRASS} stroke={BRASS2} strokeWidth={3} />
        {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={-w / 2 + 6 + i * ((w - 12) / 5)} cy={ry + 11} r={3.5} fill={BRASS2} />)}
      </g>)}
      {lit > 0 && <rect x={-w / 2 - 14} y={-h - 12} width={w + 28} height={h + 2} rx={20} fill="none" stroke={WARM} strokeWidth={6} opacity={0.8 * lit} />}
      {/* rate plaque */}
      <rect x={-62} y={8} width={124} height={58} rx={10} fill={BRASS} stroke={BRASS2} strokeWidth={3} />
      <text y={52} textAnchor="middle" fill={INK} style={TXT(48)}>{rate}</text>
      {/* capacity tag on a string */}
      {cap && capO > 0 && capBelow && <g opacity={capO}>
        <rect x={-106} y={84} width={212} height={50} rx={10} fill={capLit > 0.5 ? WARM : PAPER} stroke={BRASS2} strokeWidth={3} />
        <text y={120} textAnchor="middle" fill={INK} style={TXT(cap.length > 13 ? 27 : 34)}>{cap}</text></g>}
      {cap && capO > 0 && !capBelow && <g opacity={capO}><line x1={0} y1={-h - 8} x2={0} y2={-h - 40} stroke={BRASS2} strokeWidth={3} />
        <rect x={-100} y={-h - 86} width={200} height={48} rx={10} fill={PAPER} stroke={BRASS2} strokeWidth={3} />
        <text y={-h - 51} textAnchor="middle" fill={INK} style={TXT(cap.length > 13 ? 26 : 32)}>{cap}</text></g>}
    </g>
  )
}

// # copper pipe along a path, with a darker joint ring at every corner point
export const Pipe: React.FC<{ pts: [number, number][]; o?: number; w?: number }> = ({ pts, o = 1, w = 30 }) => {
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  return <g opacity={o}>
    <path d={d} fill="none" stroke={COPPER2} strokeWidth={w + 8} strokeLinejoin="round" strokeLinecap="round" />
    <path d={d} fill="none" stroke={COPPER} strokeWidth={w} strokeLinejoin="round" strokeLinecap="round" />
    <path d={d} fill="none" stroke="#E7A877" strokeWidth={w / 4} strokeLinejoin="round" strokeLinecap="round" opacity={0.7} transform="translate(-4 -5)" />
    {pts.slice(1, -1).map(([x, y], i) => <circle key={i} cx={x} cy={y} r={w / 2 + 8} fill={COPPER2} />)}
  </g>
}

// # a falling stream of glowing water from (x, y0) to (x, y1), with drops sliding down and a splash ring at the bottom
export const Stream: React.FC<{ x: number; y0: number; y1: number; f: number; o?: number; w?: number; col?: string }> = ({ x, y0, y1, f, o = 1, w = 26, col = WATER }) => o <= 0.001 ? null : (
  <g opacity={o}>
    <rect x={x - w / 2} y={y0} width={w} height={Math.max(0, y1 - y0)} rx={w / 2} fill={col} opacity={0.85} />
    <rect x={x - w / 6} y={y0} width={w / 3} height={Math.max(0, y1 - y0)} rx={w / 6} fill="#FFFFFF" opacity={0.4} />
    {Array.from({ length: 4 }, (_, i) => { const t = ((f / 14 + i / 4) % 1); return <circle key={i} cx={x} cy={y0 + (y1 - y0) * t} r={w / 3} fill="#FFFFFF" opacity={0.5 * (1 - t)} /> })}
    <ellipse cx={x} cy={y1} rx={w * (1.2 + 0.4 * Math.sin(f / 3))} ry={w * 0.35} fill="none" stroke="#FFFFFF" strokeWidth={4} opacity={0.6} />
  </g>
)

// # the big brass inlet tap at the top-left: income water comes out of it; `open` 0–1 turns the wheel
export const Tap: React.FC<{ x: number; y: number; open: number; o?: number; label?: string }> = ({ x, y, open, o = 1, label }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-130} y={-34} width={150} height={68} rx={14} fill={COPPER} stroke={COPPER2} strokeWidth={5} />
    <path d="M20 -34 L70 -34 Q100 -34 100 -4 L100 40 L60 40 L60 4 Q60 0 56 0 L20 0 Z" fill={COPPER} stroke={COPPER2} strokeWidth={5} />
    <g transform={`translate(-50 -64) rotate(${open * 200})`}>
      <circle r={44} fill="none" stroke={CORAL} strokeWidth={10} />
      {[0, 60, 120].map((a) => <rect key={a} x={-44} y={-5} width={88} height={10} fill={CORAL} transform={`rotate(${a})`} />)}
      <circle r={12} fill={BRASS} />
    </g>
    <rect x={-56} y={-40} width={12} height={10} fill={COPPER2} />
    {label && <g><rect x={-170} y={52} width={200} height={50} rx={10} fill={PAPER} stroke={BRASS2} strokeWidth={3} /><text x={-70} y={88} textAnchor="middle" fill={INK} style={TXT(34)}>{label}</text></g>}
  </g>
)

// # a small copper chute under a tank that drips tax coins down into the collecting chest; `n` coins so far
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={26} ry={9} fill={BRASS2} />
    <circle r={26} fill="#F2C75C" stroke={BRASS2} strokeWidth={4} />
    <circle r={18} fill="none" stroke="#FFE39A" strokeWidth={3} />
    <text y={10} textAnchor="middle" fill={BRASS2} style={TXT(28)}>{t}</text>
  </g>
)

// # the tax chest: a copper-banded wooden chest; coins pile up inside it; a brass label plate shows the running total
export const Chest: React.FC<{ x: number; y: number; s?: number; o?: number; n?: number; total?: string; open?: number }> = ({ x, y, s = 1, o = 1, n = 0, total, open = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={190} ry={18} fill="#000" opacity={0.25} />
    <rect x={-170} y={-150} width={340} height={150} rx={16} fill="#8A5A3A" stroke="#5E3A22" strokeWidth={6} />
    {[-110, 110].map((bx) => <rect key={bx} x={bx - 14} y={-150} width={28} height={150} fill={COPPER} />)}
    {Array.from({ length: Math.min(18, Math.floor(n)) }, (_, i) => <Coin key={i} x={-120 + (i % 6) * 48} y={-160 - Math.floor(i / 6) * 22} s={0.8} />)}
    <g transform={`translate(-170 -150) rotate(${-24 * open})`}><path d="M0 0 L0 -26 Q170 -70 340 -26 L340 0 Z" fill="#9B6A45" stroke="#5E3A22" strokeWidth={6} />{[60, 280].map((bx) => <rect key={bx} x={bx - 14} y={-44} width={28} height={44} fill={COPPER} />)}</g>
    {total && <g><rect x={-120} y={-100} width={240} height={64} rx={10} fill={BRASS} stroke={BRASS2} strokeWidth={4} /><text y={-54} textAnchor="middle" fill={INK} style={TXT(50)}>{total}</text></g>}
  </g>
)

// # a glass jar with a cork, holding water up to `level`, and a paper label — Maya's tax-free slice
export const Jar: React.FC<{ x: number; y: number; s?: number; level: number; f: number; o?: number; label?: string }> = ({ x, y, s = 1, level, f, o = 1, label }) => {
  const top = -250 + 200 * (1 - Math.max(0, Math.min(1, level)))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={4} rx={110} ry={12} fill="#000" opacity={0.18} />
      <path d="M-90 -230 Q-100 -40 -80 -6 Q0 8 80 -6 Q100 -40 90 -230 Z" fill={GLASS} opacity={0.25} />
      {level > 0.002 && <path d={`M-86 ${top} Q0 ${top + 8 * Math.sin(f / 8)} 86 ${top} L82 -10 Q0 4 -82 -10 Z`} fill={WATER} opacity={0.85} />}
      <path d="M-90 -230 Q-100 -40 -80 -6 Q0 8 80 -6 Q100 -40 90 -230" fill="none" stroke={GLASS} strokeWidth={6} />
      <rect x={-70} y={-280} width={140} height={44} rx={10} fill="#B9864F" stroke="#86592F" strokeWidth={4} />
      <path d="M-60 -200 L-60 -100" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" opacity={0.4} />
      {label && <g><rect x={-80} y={-150} width={160} height={70} rx={8} fill={PAPER} stroke="#D9C2A0" strokeWidth={3} /><text y={-104} textAnchor="middle" fill={INK} style={TXT(label.length > 8 ? 30 : 40)}>{label}</text></g>}
    </g>
  )
}

// # a pay envelope / paycheck slip with an amount
export const Paycheck: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; amount: string; title?: string }> = ({ x, y, s = 1, r = 0, o = 1, amount, title = 'PAY' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-80} width={300} height={160} rx={12} fill="#EAF6EE" stroke="#7DBB95" strokeWidth={4} />
    <rect x={-150} y={-80} width={300} height={44} rx={12} fill="#5BB27E" />
    <text x={-130} y={-48} fill="#FFFFFF" style={TXT(32)}>{title}</text>
    <circle cx={110} cy={-58} r={14} fill="#FFFFFF" opacity={0.8} />
    <text y={40} textAnchor="middle" fill={INK} style={TXT(64)}>{amount}</text>
  </g>
)

// # a hanging price tag (shop street)
export const PriceTag: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; t: string; col?: string }> = ({ x, y, s = 1, r = 0, o = 1, t, col = CORAL }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <line x1={0} y1={-90} x2={0} y2={-40} stroke="#6B4B35" strokeWidth={3} />
    <path d="M-60 -40 L60 -40 L60 40 L0 70 L-60 40 Z" fill={col} stroke="#FFFFFF" strokeWidth={5} />
    <circle cy={-26} r={7} fill="#FFFFFF" />
    <text y={22} textAnchor="middle" fill="#FFFFFF" style={TXT(42)}>{t}</text>
  </g>
)

// # a wooden ladder leaning up (for the workers who raise the tank lines)
export const Ladder: React.FC<{ x: number; y: number; h?: number; o?: number }> = ({ x, y, h = 360, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-50} y={-h} width={14} height={h} rx={5} fill="#B8834F" /><rect x={36} y={-h} width={14} height={h} rx={5} fill="#B8834F" />
    {Array.from({ length: Math.floor(h / 50) }, (_, i) => <rect key={i} x={-40} y={-30 - i * 50} width={80} height={10} rx={4} fill="#9B6A3C" />)}
  </g>
)

// # a red dashed "line" across a tank — where a bracket starts; `y` in scene pixels
export const BracketLine: React.FC<{ x1: number; x2: number; y: number; o?: number; t?: string; col?: string }> = ({ x1, x2, y, o = 1, t, col = CORAL }) => (
  <g opacity={o}>
    <line x1={x1} y1={y} x2={x2} y2={y} stroke={col} strokeWidth={8} strokeDasharray="22 12" strokeLinecap="round" />
    {t && <g><rect x={x2 + 14} y={y - 30} width={t.length * 22 + 30} height={56} rx={10} fill={col} /><text x={x2 + 29} y={y + 12} fill="#FFFFFF" style={TXT(42)}>{t}</text></g>}
  </g>
)

// # a big wooden balance scale — two pans on a beam; tilt -1..1
export const Scale: React.FC<{ x: number; y: number; tilt?: number; o?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, tilt = 0, o = 1, left, right }) => {
  const a = tilt * 10, dy = Math.sin((a * Math.PI) / 180) * 300
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <path d="M-90 0 L90 0 L40 -40 L-40 -40 Z" fill={BRASS2} />
      <rect x={-14} y={-420} width={28} height={390} fill={BRASS} stroke={BRASS2} strokeWidth={3} />
      <g transform={`rotate(${a} 0 -420)`}><rect x={-320} y={-432} width={640} height={24} rx={10} fill={BRASS} stroke={BRASS2} strokeWidth={3} /></g>
      <circle cy={-420} r={22} fill={BRASS2} />
      {[[-300, -dy, left], [300, dy, right]].map(([px, py, node], k) => <g key={k} transform={`translate(${px} ${-420 + (py as number)})`}>
        <line x1={0} y1={0} x2={-110} y2={150} stroke={BRASS2} strokeWidth={4} /><line x1={0} y1={0} x2={110} y2={150} stroke={BRASS2} strokeWidth={4} />
        <path d="M-140 150 Q0 200 140 150 Z" fill={BRASS} stroke={BRASS2} strokeWidth={4} />
        <g transform="translate(0 150)">{node as React.ReactNode}</g>
      </g>)}
    </g>
  )
}

// # a red cross over something (r68: act it out, then cross it) — a hand-drawn double stroke
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-90 -90 L90 90 M90 -90 L-90 90" stroke="#FFFFFF" strokeWidth={34} strokeLinecap="round" />
    <path d="M-90 -90 L90 90 M90 -90 L-90 90" stroke={CORAL} strokeWidth={22} strokeLinecap="round" />
  </g>
)

// # a tag sign on a post (labels that stand in the scene instead of floating)
export const Sign: React.FC<{ x: number; y: number; t: string; o?: number; col?: string; size?: number; tc?: string }> = ({ x, y, t, o = 1, col = PAPER, size = 44, tc = INK }) => {
  const w = Math.max(120, t.length * size * 0.5 + 50)
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2} y={-size - 26} width={w} height={size + 34} rx={12} fill={col} stroke={BRASS2} strokeWidth={3} />
    <text y={-14} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}

// # tiny natural motion on the thing being talked about (fills short quiet moments): a ripple on water, or a glint of
// # light catching glass / metal. Lasts ~0.6 s from `at`.
export const Life: React.FC<{ f: number; at: number; x: number; y: number; kind?: 'ripple' | 'glint' }> = ({ f, at, x, y, kind = 'ripple' }) => {
  const t = (f - at) / 18
  if (t < 0 || t > 1) return null
  if (kind === 'ripple') return (
    <g transform={`translate(${x} ${y})`} opacity={1 - t}>
      <ellipse rx={20 + 60 * t} ry={6 + 16 * t} fill="none" stroke="#FFFFFF" strokeWidth={4} />
      <ellipse rx={8 + 30 * t} ry={3 + 8 * t} fill="none" stroke="#FFFFFF" strokeWidth={3} opacity={0.7} />
      {[-1, 1].map((d) => <circle key={d} cx={d * 18 * t} cy={-40 * Math.sin(Math.PI * t)} r={5} fill="#FFFFFF" />)}
    </g>
  )
  const k = Math.sin(Math.PI * t)
  return (
    <g transform={`translate(${x} ${y}) rotate(${30 * t}) scale(${k})`} opacity={0.9}>
      <path d="M0 -34 L7 -7 L34 0 L7 7 L0 34 L-7 7 L-34 0 L-7 -7 Z" fill="#FFFFFF" />
      <circle r={6} fill="#FFF6D0" />
    </g>
  )
}
