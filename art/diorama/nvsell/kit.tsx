// ============================================================
// LONG VIDEO — "Why the Stock Market Just Fell: Nvidia's 440 Billion Dollar Day"
// Art direction (owner r82/r83): its own world — a neon CHIP CITY at night. Deep indigo/teal skies with gradient
// light, far skyline silhouettes (back layer), illustrated buildings and props (middle), and foreground
// silhouettes/light rims for depth. Green neon = AI chips; red = falling prices; warm amber = homes and people.
// Every object here is drawn fresh for this video. Only engine helpers (timing, Person rig, Headline) are shared.
// ============================================================
import React from 'react'
import { clamp01, lerp } from '../kit'
import { Label } from '../charts'

export const NEON = '#39F5A0', NEOND = '#12B872', RED = '#FF4D5E', REDD = '#B8243A', AMBER = '#FFB547', INDIGO = '#1B1546', TEAL = '#0D3B4C', INK = '#0A0820'
const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

// # full-frame sky: vertical gradient + glow + twinkling stars (back layer)
export const Sky: React.FC<{ id: string; top: string; bottom: string; glow?: string; gx?: number; gy?: number; stars?: number; f?: number }> = ({ id, top, bottom, glow, gx = 960, gy = 760, stars = 40, f = 0 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={top} /><stop offset="100%" stopColor={bottom} /></linearGradient>
      {glow && <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={glow} stopOpacity={0.55} /><stop offset="100%" stopColor={glow} stopOpacity={0} /></radialGradient>}
    </defs>
    <rect x={0} y={0} width={1920} height={1080} fill={`url(#${id}-sky)`} />
    {glow && <ellipse cx={gx} cy={gy} rx={900} ry={420} fill={`url(#${id}-glow)`} />}
    {Array.from({ length: stars }, (_, i) => <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 50) * 520} r={1 + rnd(i + 9) * 2} fill="#FFFFFF" opacity={0.25 + 0.35 * (0.5 + 0.5 * Math.sin(f / 20 + i))} />)}
  </g>
)

// # far skyline silhouette with a few lit windows (back/middle layer)
export const Skyline: React.FC<{ y: number; col?: string; win?: string; seed?: number; o?: number; h?: number }> = ({ y, col = '#120E33', win = AMBER, seed = 1, o = 1, h = 260 }) => (
  <g opacity={o}>{Array.from({ length: 18 }, (_, i) => {
    const w = 80 + rnd(i + seed) * 90, x = i * 110 - 20, bh = h * (0.4 + rnd(i * 3 + seed) * 0.6)
    return <g key={i}><rect x={x} y={y - bh} width={w} height={bh} fill={col} />
      {Array.from({ length: 6 }, (_, k) => rnd(i * 7 + k + seed) > 0.55 ? <rect key={k} x={x + 12 + (k % 3) * (w - 30) / 3} y={y - bh + 20 + Math.floor(k / 3) * 40} width={12} height={16} fill={win} opacity={0.55} /> : null)}</g>
  })}</g>
)

// # ground plane with a lit rim and soft reflection (foreground layer)
export const Floor: React.FC<{ id: string; y: number; top: string; bottom: string; rim?: string }> = ({ id, y, top, bottom, rim = NEON }) => (
  <g>
    <defs><linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={top} /><stop offset="100%" stopColor={bottom} /></linearGradient></defs>
    <rect x={0} y={y} width={1920} height={1080 - y} fill={`url(#${id}-floor)`} />
    <rect x={0} y={y} width={1920} height={4} fill={rim} opacity={0.6} />
  </g>
)

// # THE CHIP CITY: a giant AI chip as a glowing platform with circuit streets; crack 0..1 splits it; dim 0..1
export const ChipCity: React.FC<{ id: string; x: number; y: number; s?: number; o?: number; crack?: number; dim?: number; label?: string }> = ({ id, x, y, s = 1, o = 1, crack = 0, dim = 0, label = 'NVIDIA' }) => {
  const g = lerp(1, 0.35, dim)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <defs>
        <linearGradient id={`${id}-chip`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2C3A4F" /><stop offset="100%" stopColor="#0E1626" /></linearGradient>
        <radialGradient id={`${id}-core`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={NEON} stopOpacity={0.9 * g} /><stop offset="100%" stopColor={NEON} stopOpacity={0} /></radialGradient>
      </defs>
      <ellipse cx={0} cy={190} rx={420} ry={50} fill="#000" opacity={0.35} />
      {/* pins */}
      {Array.from({ length: 14 }, (_, k) => <rect key={k} x={-330 + k * 50} y={150} width={18} height={40} rx={4} fill="#C9A13A" />)}
      <g transform={`translate(${-14 * crack} ${10 * crack}) rotate(${-4 * crack})`}>
        <path d="M-360 -150 L0 -150 L-30 -40 L20 40 L-10 160 L-360 160 Z" fill={`url(#${id}-chip)`} stroke="#4A6A88" strokeWidth={6} />
      </g>
      <g transform={`translate(${14 * crack} ${10 * crack}) rotate(${4 * crack})`}>
        <path d="M360 -150 L0 -150 L-30 -40 L20 40 L-10 160 L360 160 Z" fill={`url(#${id}-chip)`} stroke="#4A6A88" strokeWidth={6} />
      </g>
      <ellipse cx={0} cy={0} rx={300} ry={130} fill={`url(#${id}-core)`} />
      {/* circuit streets */}
      {[-110, -50, 10, 70].map((yy, k) => <path key={k} d={`M-320 ${yy} L-140 ${yy} L-110 ${yy - 30} L110 ${yy - 30} L140 ${yy} L320 ${yy}`} fill="none" stroke={NEON} strokeWidth={4} opacity={0.65 * g} />)}
      {/* little towers on the chip */}
      {[-240, -160, 150, 230].map((tx, k) => <g key={k}><rect x={tx - 26} y={-150 - 60 - k * 12} width={52} height={60 + k * 12} fill="#1C2740" stroke={NEON} strokeOpacity={0.5 * g} strokeWidth={3} />{[0, 1, 2].map((r) => <rect key={r} x={tx - 14} y={-140 - 60 - k * 12 + r * 20} width={28} height={8} fill={NEON} opacity={0.6 * g} />)}</g>)}
      <rect x={-110} y={-60} width={220} height={120} rx={14} fill="#0B1220" stroke={NEON} strokeWidth={5} strokeOpacity={g} />
      <text x={0} y={18} textAnchor="middle" fill={NEON} opacity={g} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>{label}</text>
      {crack > 0 && <path d="M0 -150 L-30 -40 L20 40 L-10 160" fill="none" stroke={RED} strokeWidth={8} opacity={crack} />}
    </g>
  )
}

// # a big phone showing a stock app; red 0..1 turns every row red and the line down
export const AppPhone: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; red?: number; rows?: [string, string][] }> = ({ x, y, s = 1, r = 0, o = 1, red = 0, rows = [['NVDA', '-9.3%'], ['AMD', '-17.3%'], ['MU', '-17.5%'], ['S&P 500', '-4.4%'], ['NASDAQ', '-5.5%']] }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={300} ry={420} fill={RED} opacity={0.18 * red} />
    <rect x={-170} y={-330} width={340} height={660} rx={44} fill="#0B0A18" stroke="#3A3660" strokeWidth={8} />
    <rect x={-150} y={-300} width={300} height={600} rx={30} fill="#141230" />
    <path d={`M-130 -190 C -60 ${-230 + 60 * red} 0 ${-160 + 80 * red} 130 ${-200 + 120 * red}`} fill="none" stroke={red > 0.5 ? RED : NEON} strokeWidth={8} strokeLinecap="round" />
    {rows.map(([t, v], k) => <g key={k} opacity={clamp01(red * 5 - k * 0.6)}><rect x={-130} y={-120 + k * 82} width={260} height={64} rx={12} fill="#1F1B44" />
      <Label x={-110} y={-76 + k * 82} text={t} size={34} anchor="start" font="Bebas Neue" color="#E8E6FF" /><Label x={110} y={-76 + k * 82} text={v} size={34} anchor="end" font="Bebas Neue" color={RED} /></g>)}
  </g>
)

// # bedroom corner at night: window with city lights, lamp glow (warm), bed edge — foreground depth
export const Room: React.FC<{ id: string; lamp?: number }> = ({ id, lamp = 1 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2A1F55" /><stop offset="100%" stopColor="#140F33" /></linearGradient>
      <radialGradient id={`${id}-lamp`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={AMBER} stopOpacity={0.55} /><stop offset="100%" stopColor={AMBER} stopOpacity={0} /></radialGradient>
    </defs>
    <rect x={0} y={0} width={1920} height={1080} fill={`url(#${id}-wall)`} />
    <g transform="translate(1340 140)"><rect x={0} y={0} width={460} height={420} rx={14} fill="#0B0A1E" stroke="#3B2F6E" strokeWidth={16} />
      <rect x={10} y={10} width={440} height={400} fill="#14124A" /><Skyline y={410} col="#0A0828" seed={4} h={200} /><rect x={222} y={0} width={16} height={420} fill="#3B2F6E" /></g>
    <ellipse cx={300} cy={420} rx={420} ry={360} fill={`url(#${id}-lamp)`} opacity={lamp} />
    <g transform="translate(300 600)"><path d="M-70 -160 L70 -160 L110 -40 L-110 -40 Z" fill={AMBER} opacity={0.9} /><rect x={-8} y={-40} width={16} height={260} fill="#2A2050" /></g>
    <rect x={0} y={880} width={1920} height={200} fill="#0E0B26" />
    <path d="M0 860 L900 860 Q960 860 960 900 L960 1080 L0 1080 Z" fill="#3A2C6E" /><rect x={0} y={840} width={900} height={40} rx={20} fill="#5A47A0" />
  </g>
)

// # a ballot box with a paper going in
export const Ballot: React.FC<{ x: number; y: number; s?: number; o?: number; drop?: number }> = ({ x, y, s = 1, o = 1, drop = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-200} width={240} height={200} rx={14} fill="#E9ECF8" stroke="#8C93C0" strokeWidth={5} /><rect x={-60} y={-210} width={120} height={16} rx={6} fill="#2A2F55" />
    <rect x={-50} y={-300 + 100 * drop} width={100} height={130} rx={6} fill="#FFFFFF" stroke="#8C93C0" strokeWidth={4} opacity={1 - clamp01((drop - 0.8) * 5)} />
    <path d="M-30 -260 l14 14 l30 -30" fill="none" stroke="#2F5FD0" strokeWidth={6} opacity={1 - drop} transform={`translate(0 ${100 * drop})`} />
    <Label x={0} y={-90} text="VOTE" size={58} font="Bebas Neue" color="#2A2F55" />
  </g>
)

// # a day card for the timeline (tilted calendar page with weekday + date)
export const DayCard: React.FC<{ x: number; y: number; day: string; date: string; o?: number; lit?: number; col?: string; s?: number }> = ({ x, y, day, date, o = 1, lit = 0, col = '#2F5FD0', s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.06 * lit)})`} opacity={o}>
    {lit > 0 && <rect x={-110} y={-130} width={220} height={250} rx={26} fill={col} opacity={0.35 * lit} />}
    <rect x={-90} y={-110} width={180} height={210} rx={16} fill="#F4F3FF" /><rect x={-90} y={-110} width={180} height={56} rx={16} fill={col} />
    <Label x={0} y={-68} text={day} size={40} font="Bebas Neue" color="#FFFFFF" /><Label x={0} y={50} text={date} size={86} font="Bebas Neue" color="#1B1546" />
  </g>
)

// # storm cloud with rain and lightning; strike 0..1 flashes the bolt
export const StormCloud: React.FC<{ x: number; y: number; s?: number; o?: number; strike?: number; rain?: number; f?: number }> = ({ x, y, s = 1, o = 1, strike = 0, rain = 1, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: 14 }, (_, k) => <line key={k} x1={-200 + k * 30} y1={60 + ((f * 9 + k * 37) % 120)} x2={-210 + k * 30} y2={90 + ((f * 9 + k * 37) % 120)} stroke="#8FB4FF" strokeWidth={4} opacity={0.5 * rain} />)}
    {[[-120, 0, 90], [-20, -40, 120], [110, -10, 95], [200, 20, 70], [-210, 30, 60]].map(([cx, cy, r], k) => <circle key={k} cx={cx} cy={cy} r={r} fill={k % 2 ? '#3A3F66' : '#2C3055'} />)}
    <rect x={-270} y={10} width={530} height={70} rx={35} fill="#2C3055" />
    {strike > 0 && <path d="M10 60 L-40 170 L10 170 L-30 290 L80 140 L30 140 L70 60 Z" fill="#FFE86B" opacity={strike} />}
  </g>
)

// # a sunrise disc rising from the horizon
export const Sunrise: React.FC<{ x: number; y: number; t: number; r?: number }> = ({ x, y, t, r = 160 }) => (
  <g opacity={clamp01(t * 2)}><circle cx={x} cy={y - 220 * t} r={r} fill="#FFC86B" /><circle cx={x} cy={y - 220 * t} r={r * 1.6} fill="#FFC86B" opacity={0.18} /></g>
)

// # a data center: long building with server-light windows, roof fans, cable to the grid; build 0..1 raises it
export const DataCenter: React.FC<{ x: number; y: number; s?: number; o?: number; build?: number; lit?: number; f?: number }> = ({ x, y, s = 1, o = 1, build = 1, lit = 1, f = 0 }) => {
  const h = 230 * clamp01(build)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={320} ry={24} fill="#000" opacity={0.3} />
      <rect x={-280} y={-h} width={560} height={h} fill="#22305A" stroke="#4E6AB0" strokeWidth={4} />
      {build >= 0.99 && <>
        {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-250 + k * 64} y={-200} width={44} height={150} rx={6} fill="#0E1530" />)}
        {Array.from({ length: 32 }, (_, k) => <rect key={k} x={-244 + (k % 8) * 64} y={-190 + Math.floor(k / 8) * 34} width={10} height={10} rx={2} fill={(k + Math.floor(f / 8)) % 5 ? NEON : '#7EC8FF'} opacity={0.85 * lit} />)}
        {[-180, -60, 60, 180].map((fx, k) => <g key={k} transform={`translate(${fx} -246)`}><rect x={-44} y={-18} width={88} height={26} rx={6} fill="#3A4C80" /><g transform={`rotate(${f * 12 + k * 30})`}><rect x={-30} y={-4} width={60} height={8} rx={4} fill="#9FB2E8" /><rect x={-4} y={-30} width={8} height={60} rx={4} fill="#9FB2E8" /></g></g>)}
        <Label x={0} y={-12} text="DATA CENTER" size={34} font="Bebas Neue" color="#C9D6FF" />
      </>}
      {build < 0.99 && Array.from({ length: 7 }, (_, k) => <rect key={k} x={-280 + k * 90} y={-230} width={8} height={230} fill="#C9A13A" opacity={0.8} />)}
    </g>
  )
}

// # a construction crane (yellow lattice) with a hanging load; swing -1..1
export const Crane: React.FC<{ x: number; y: number; s?: number; o?: number; swing?: number; load?: React.ReactNode }> = ({ x, y, s = 1, o = 1, swing = 0, load }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-14} y={-560} width={28} height={560} fill="#F2B632" />{Array.from({ length: 14 }, (_, k) => <path key={k} d={`M-14 ${-k * 40} L14 ${-k * 40 - 40}`} stroke="#B88A2E" strokeWidth={5} />)}
    <rect x={-120} y={-580} width={480} height={24} fill="#F2B632" /><rect x={-150} y={-600} width={60} height={60} fill="#5A4A2A" />
    <g transform={`translate(300 -556) rotate(${8 * swing})`}><line x1={0} y1={0} x2={0} y2={200} stroke="#C9C9D8" strokeWidth={4} /><g transform="translate(0 200)">{load}</g></g>
  </g>
)

// # power pylon with sagging lines to the right
export const Pylon: React.FC<{ x: number; y: number; s?: number; o?: number; live?: number }> = ({ x, y, s = 1, o = 1, live = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} stroke="#8C96C0" strokeWidth={6} fill="none">
    <path d="M-60 0 L-10 -380 L10 -380 L60 0 M-40 -150 L40 -150 M-30 -260 L30 -260 M-90 -330 L90 -330" />
    <path d="M-90 -330 Q 200 -260 420 -330 M90 -330 Q 300 -250 520 -320" stroke={AMBER} strokeOpacity={0.8 * live} strokeWidth={4} />
  </g>
)

// # a permit form with a stamp that slams on (stamp 0..1)
export const Permit: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; stamp?: number; text?: string }> = ({ x, y, s = 1, r = -4, o = 1, stamp = 0, text = 'WAIT' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-170} width={260} height={340} rx={10} fill="#F4F3FF" /><Label x={0} y={-120} text="BUILDING PERMIT" size={36} font="Bebas Neue" color="#1B1546" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-100} y={-80 + k * 44} width={200 - (k % 2) * 60} height={14} rx={7} fill="#B9BEDD" />)}
    {stamp > 0 && <g transform={`translate(0 110) rotate(-12) scale(${lerp(1.6, 1, stamp)})`} opacity={stamp}><rect x={-100} y={-40} width={200} height={80} rx={10} fill="none" stroke={RED} strokeWidth={8} /><Label x={0} y={22} text={text} size={60} font="Bebas Neue" color={RED} /></g>}
  </g>
)

// # an apple tree; apples 0..n; sun 0..1 vs cloud 0..1 above it
export const AppleTree: React.FC<{ x: number; y: number; s?: number; o?: number; apples?: number; gloom?: number }> = ({ x, y, s = 1, o = 1, apples = 12, gloom = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={200} ry={24} fill="#000" opacity={0.25} />
    <path d="M-26 0 Q-20 -140 -40 -220 L40 -220 Q20 -140 26 0 Z" fill="#6B4528" />
    {[[-120, -300, 120], [0, -380, 150], [120, -300, 120], [-60, -240, 110], [70, -240, 110]].map(([cx, cy, r], k) => <circle key={k} cx={cx} cy={cy} r={r} fill={lerp(0, 1, gloom) > 0.5 ? (k % 2 ? '#2F6B45' : '#275A3A') : (k % 2 ? '#3DAA6E' : '#2E9A5E')} />)}
    {Array.from({ length: Math.round(apples) }, (_, k) => <circle key={k} cx={-150 + rnd(k + 3) * 300} cy={-420 + rnd(k + 11) * 230} r={18} fill="#E8433A" stroke="#9E1F1A" strokeWidth={3} />)}
  </g>
)

// # bakery shopfront with an awning and bread on the counter; trucks = bread crates leaving to the right
export const Bakery: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-220} y={-360} width={440} height={360} fill="#5A3B2A" /><rect x={-180} y={-250} width={360} height={170} rx={10} fill="#FFD9A0" opacity={0.9} />
    {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M${-240 + k * 80} -360 l80 0 l-10 60 l-60 0 Z`} fill={k % 2 ? '#FFFFFF' : '#E8433A'} />)}
    {[-120, -40, 40, 120].map((bx, k) => <ellipse key={k} cx={bx} cy={-110} rx={34} ry={18} fill="#C98A3E" stroke="#8A5A22" strokeWidth={3} />)}
    <rect x={-240} y={-420} width={480} height={60} rx={10} fill="#2A1A10" /><Label x={0} y={-376} text="BAKERY" size={46} font="Bebas Neue" color={AMBER} />
  </g>
)

// # a restaurant-chain sign tower with N little restaurants lit
export const ChainSign: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; total?: number }> = ({ x, y, s = 1, o = 1, open = 6, total = 6 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: total }, (_, k) => <g key={k} transform={`translate(${(k % 3) * 150 - 150} ${-Math.floor(k / 3) * 170})`} opacity={k < open ? 1 : 0.25}><rect x={-60} y={-130} width={120} height={130} fill="#3A2C6E" /><rect x={-70} y={-150} width={140} height={30} rx={8} fill={k < open ? AMBER : '#555'} /><rect x={-24} y={-70} width={48} height={70} fill={k < open ? '#FFD9A0' : '#333'} /></g>)}
  </g>
)

// # a skyline tower whose height shows weight in the index; glass gradient, lit windows, name plate
export const WeightTower: React.FC<{ id: string; x: number; y: number; w: number; h: number; name: string; col: string; o?: number; fall?: number; lit?: number }> = ({ id, x, y, w, h, name, col, o = 1, fall = 0, lit = 0 }) => {
  const hh = h * (1 - 0.093 * fall)
  return (
    <g opacity={o}>
      <defs><linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={col} /><stop offset="100%" stopColor="#0A0820" /></linearGradient></defs>
      {lit > 0 && <rect x={x - w / 2 - 20} y={y - hh - 20} width={w + 40} height={hh + 20} rx={16} fill={col} opacity={0.25 * lit} />}
      <rect x={x - w / 2} y={y - hh} width={w} height={hh} rx={6} fill={`url(#${id}-g)`} />
      {Array.from({ length: Math.floor(hh / 46) }, (_, r) => [0, 1, 2].map((c) => <rect key={`${r}-${c}`} x={x - w / 2 + 14 + c * (w - 28) / 3} y={y - hh + 18 + r * 46} width={(w - 28) / 3 - 10} height={20} rx={3} fill="#FFFFFF" opacity={0.18} />))}
      <Label x={x} y={y + 44} text={name} size={34} font="Bebas Neue" color="#E8E6FF" />
    </g>
  )
}

// # a glass jar of money with a highlighted slice band (slice 0..1 of height lit green), fill 0..1
export const MoneyJar: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number; slice?: number; red?: number; label?: string }> = ({ x, y, s = 1, o = 1, fill = 1, slice = 0, red = 0, label }) => {
  const H = 300 * fill
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-130} y={-360} width={260} height={360} rx={40} fill="#BFE6FF" opacity={0.18} stroke="#BFE6FF" strokeOpacity={0.6} strokeWidth={6} />
      <rect x={-112} y={-H - 10} width={224} height={H} rx={26} fill="#3DAA6E" />
      {Array.from({ length: Math.floor(H / 30) }, (_, k) => <rect key={k} x={-100} y={-30 - k * 30} width={200} height={20} rx={6} fill="#8FE0A8" opacity={0.6} />)}
      {slice > 0 && <rect x={-112} y={-10 - H * slice} width={224} height={H * slice} rx={10} fill={red > 0.5 ? RED : NEON} opacity={0.85} />}
      <rect x={-120} y={-390} width={240} height={40} rx={12} fill="#6A5AB0" />
      {label && <Label x={0} y={60} text={label} size={44} font="Bebas Neue" color="#E8E6FF" />}
    </g>
  )
}

// # mountain trail: a ridge path with flags at -10% (correction) and -20% (bear) and a cave for the bear
export const Ridge: React.FC<{ id: string; o?: number; flags?: number; bear?: number }> = ({ id, o = 1, flags = 1, bear = 0 }) => (
  <g opacity={o}>
    <defs><linearGradient id={`${id}-rock`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4A4A8A" /><stop offset="100%" stopColor="#1A1A40" /></linearGradient></defs>
    <path d="M0 1080 L0 330 Q300 300 520 360 L860 560 Q1100 700 1320 800 L1920 900 L1920 1080 Z" fill={`url(#${id}-rock)`} />
    <path d="M0 330 Q300 300 520 360 L860 560 Q1100 700 1320 800 L1920 900" fill="none" stroke="#C9C9FF" strokeWidth={6} strokeDasharray="20 14" opacity={0.7} />
    <g opacity={flags}>
      <g transform="translate(520 360)"><rect x={-4} y={-150} width={8} height={150} fill="#E8E6FF" /><path d="M4 -150 L110 -122 L4 -94 Z" fill={NEON} /><Label x={60} y={-170} text="PEAK" size={42} font="Bebas Neue" color="#E8E6FF" /></g>
      <g transform="translate(980 620)"><rect x={-4} y={-150} width={8} height={150} fill="#E8E6FF" /><path d="M4 -150 L110 -122 L4 -94 Z" fill={AMBER} /><Label x={60} y={-170} text="-10% CORRECTION" size={42} font="Bebas Neue" color={AMBER} /></g>
      <g transform="translate(1440 820)"><rect x={-4} y={-150} width={8} height={150} fill="#E8E6FF" /><path d="M4 -150 L110 -122 L4 -94 Z" fill={RED} /><Label x={80} y={-170} text="-20% BEAR MARKET" size={42} font="Bebas Neue" color={RED} /></g>
    </g>
    {bear > 0 && <g transform="translate(1660 870)" opacity={bear}><path d="M-120 0 Q-120 -150 0 -150 Q120 -150 120 0 Z" fill="#0A0820" /><circle cx={-30} cy={-60} r={8} fill={AMBER} /><circle cx={30} cy={-60} r={8} fill={AMBER} /></g>}
  </g>
)

// # an umbrella (held calm in the rain)
export const Umbrella: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number }> = ({ x, y, s = 1, o = 1, open = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M${-170 * open} 0 Q0 ${-200 * open} ${170 * open} 0 Q120 -30 85 0 Q40 -30 0 0 Q-40 -30 -85 0 Q-120 -30 ${-170 * open} 0 Z`} fill="#2F5FD0" stroke="#1B3A8A" strokeWidth={5} />
    <path d="M0 0 L0 220 Q0 250 -30 250" fill="none" stroke="#2A2050" strokeWidth={10} strokeLinecap="round" />
  </g>
)

// # a lit billboard on a pole
export const Billboard: React.FC<{ x: number; y: number; w?: number; h?: number; o?: number; children?: React.ReactNode }> = ({ x, y, w = 1100, h = 420, o = 1, children }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-20} y={0} width={40} height={300} fill="#2A2050" />
    <rect x={-w / 2 - 16} y={-h - 16} width={w + 32} height={h + 32} rx={20} fill="#2A2050" />
    <rect x={-w / 2} y={-h} width={w} height={h} rx={12} fill="#141230" stroke={NEON} strokeWidth={5} />
    {children}
  </g>
)
