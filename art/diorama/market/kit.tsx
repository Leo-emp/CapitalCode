// ============================================================
// LONG VIDEO — "The Stock Market Fully Explained for Beginners" — this video's own art.
// Art direction (owner r82/r83): MARKET STREET — a warm cobblestone town built around Rosa's bakery.
// Brick red, butter yellow, teal awnings, cream plaster, lamplight; three depth layers (far rooftops with haze,
// the street with shop fronts, near cobbles and lamp posts). Settings change by chapter: the bakery front, the
// counter, the 1792 buttonwood tree, the auction hall, the town square with a news board, a scoreboard, and a
// road of 98 year-stones. Drawn fresh for this video; only the engine is shared.
// ============================================================
import React from 'react'
import { clamp01, lerp, rnd } from '../kit'

export const M = {
  ink: '#2A1E1A', ink2: '#6B5248', paper: '#FFF9EE', cream: '#F6E8CF', plaster: '#F1DDBD',
  brick: '#B9543F', brickD: '#8E3B2C', butter: '#F4C95D', butterD: '#D9A43A', teal: '#2F8F8A', tealD: '#1F6764', tealL: '#8FD3C8',
  wood: '#9A6A45', woodD: '#6E4A30', stone: '#CFC3AE', stoneD: '#A89A82', green: '#3E9B5F', greenD: '#2B7344', red: '#D2473A', redD: '#A23328',
  gold: '#F2C14E', goldD: '#C8932A', sky: '#9ED3E6', night: '#24304A', lamp: '#FFE7A3', bread: '#D9944A', breadD: '#B06F2E',
}
export const BB = (size: number) => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 1 })
export const IN = (size: number, w = 800) => ({ font: `${w} ${size}px Inter` })

// ------------------------------------------------------------ sky + far rooftops (haze) + street ground with cobbles
export const Town: React.FC<{ id: string; f: number; mood?: 'morning' | 'noon' | 'evening' | 'grey'; ground?: number; roofs?: boolean }> = ({ id, f, mood = 'morning', ground = 940, roofs = true }) => {
  const S = { morning: ['#F7C9A1', '#FCE9D2'], noon: ['#8FCBE6', '#DDF0F4'], evening: ['#5E4B7A', '#E79C7A'], grey: ['#8C95A6', '#C9CED6'] }[mood]
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={S[0]} /><stop offset="1" stopColor={S[1]} /></linearGradient>
        <linearGradient id={`${id}-cob`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C9B497" /><stop offset="1" stopColor="#A8916F" /></linearGradient>
      </defs>
      <rect x={-200} y={-200} width={2400} height={1500} fill={`url(#${id}-sky)`} />
      {mood !== 'grey' && <circle cx={1500} cy={250 + 6 * Math.sin(f / 80)} r={110} fill={mood === 'evening' ? '#FFB27A' : '#FFF3C9'} opacity={0.75} />}
      {[0, 1].map((k) => { const x = ((300 + k * 900 + f * (0.3 + 0.1 * k)) % 2300) - 200
        return <g key={k} transform={`translate(${x} ${180 + k * 60})`} opacity={0.8}><ellipse rx={120} ry={30} fill="#FFFFFF" /><ellipse cx={-40} cy={-20} rx={60} ry={34} fill="#FFFFFF" /><ellipse cx={40} cy={-24} rx={56} ry={38} fill="#FFFFFF" /></g> })}
      {roofs && <g opacity={0.55}>
        {Array.from({ length: 14 }, (_, k) => { const w = 140 + rnd(k) * 60, h = 160 + rnd(k + 3) * 140, x = k * 150 - 40
          return <g key={k}><rect x={x} y={ground - 200 - h} width={w} height={h + 200} fill={k % 2 ? '#D9B79A' : '#CFA88A'} />
            <path d={`M${x - 10} ${ground - 200 - h} L${x + w / 2} ${ground - 260 - h} L${x + w + 10} ${ground - 200 - h} Z`} fill={k % 3 ? '#B07563' : '#9C6555'} />
            {[0, 1].map((j) => <rect key={j} x={x + 24 + j * (w - 80)} y={ground - 160 - h + 30} width={30} height={40} rx={4} fill="#F3E2C4" opacity={0.8} />)}</g> })}
      </g>}
      <rect x={-200} y={ground} width={2400} height={400} fill={`url(#${id}-cob)`} />
      {Array.from({ length: 60 }, (_, k) => <ellipse key={k} cx={(k % 15) * 140 + (Math.floor(k / 15) % 2) * 70} cy={ground + 30 + Math.floor(k / 15) * 36} rx={56} ry={12} fill="#B9A281" opacity={0.6} />)}
      <rect x={-200} y={ground - 6} width={2400} height={12} fill={M.stoneD} />
    </g>
  )
}
export const Lamp: React.FC<{ x: number; y: number; s?: number; on?: number }> = ({ x, y, s = 1, on = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-6} y={-320} width={12} height={320} fill="#3B3A40" /><rect x={-22} y={-360} width={44} height={50} rx={8} fill="#3B3A40" />
    <rect x={-16} y={-354} width={32} height={38} rx={6} fill={on > 0 ? M.lamp : '#E9E2CF'} />
    {on > 0 && <circle cy={-335} r={70} fill={M.lamp} opacity={0.25 * on} />}
  </g>
)

// ------------------------------------------------------------ Rosa's bakery front; grid 0–1 draws the 1,000-piece grid; lift 0–1 lifts one piece out
export const Bakery: React.FC<{ x: number; y: number; s?: number; o?: number; grid?: number; lift?: number; sign?: string; awning?: string; glow?: number; f: number }> = ({ x, y, s = 1, o = 1, grid = 0, lift = 0, sign = "ROSA'S", awning = M.teal, glow = 0, f }) => {
  const W = 520, H = 460, g = clamp01(grid)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={8} rx={W * 0.6} ry={20} fill="#000" opacity={0.14} />
      {glow > 0 && <ellipse cx={0} cy={-H / 2} rx={W * 0.75} ry={H * 0.7} fill={M.butter} opacity={0.22 * glow} />}
      <rect x={-W / 2} y={-H} width={W} height={H} fill={M.plaster} />
      <rect x={-W / 2 - 16} y={-H - 30} width={W + 32} height={44} rx={6} fill={M.brickD} />
      <rect x={-150} y={-H - 4} width={300} height={70} rx={14} fill={M.paper} /><text y={-H + 48} textAnchor="middle" fill={M.brickD} style={BB(56)}>{sign}</text>
      {/* the striped awning */}
      <g transform={`translate(0 ${-H + 120})`}>{Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${-W / 2 - 10 + k * (W + 20) / 8} 0 L${-W / 2 - 10 + (k + 1) * (W + 20) / 8} 0 L${-W / 2 - 10 + (k + 1) * (W + 20) / 8} 54 Q${-W / 2 - 10 + (k + 0.5) * (W + 20) / 8} 74 ${-W / 2 - 10 + k * (W + 20) / 8} 54 Z`} fill={k % 2 ? M.paper : awning} />)}</g>
      {/* the window with bread */}
      <rect x={-W / 2 + 40} y={-H + 210} width={260} height={180} rx={10} fill="#FFF3D9" stroke={M.woodD} strokeWidth={10} />
      {[0, 1, 2].map((k) => <ellipse key={k} cx={-W / 2 + 100 + k * 72} cy={-H + 350} rx={34} ry={20} fill={M.bread} />)}
      {[0, 1].map((k) => <ellipse key={k} cx={-W / 2 + 140 + k * 80} cy={-H + 300} rx={30} ry={18} fill={M.breadD} />)}
      {/* the door */}
      <rect x={W / 2 - 170} y={-260} width={120} height={260} rx={10} fill={M.wood} /><circle cx={W / 2 - 70} cy={-130} r={8} fill={M.gold} />
      {/* the 1,000-piece grid (40 × 25) over the whole front */}
      {g > 0 && <g opacity={g}>{Array.from({ length: 41 }, (_, k) => <line key={'v' + k} x1={-W / 2 + k * W / 40} y1={-H} x2={-W / 2 + k * W / 40} y2={-H + H * g} stroke={M.brickD} strokeWidth={1.6} opacity={0.6} />)}
        {Array.from({ length: 26 }, (_, k) => <line key={'h' + k} x1={-W / 2} y1={-H + k * H / 25} x2={-W / 2 + W * g} y2={-H + k * H / 25} stroke={M.brickD} strokeWidth={1.6} opacity={0.6} />)}</g>}
      {lift > 0 && <g transform={`translate(${-W / 2 + 13 * W / 40} ${-H + 9 * H / 25 - 90 * lift}) scale(${1 + 2.2 * lift})`}><rect x={0} y={0} width={W / 40} height={H / 25} fill={M.butter} stroke={M.brickD} strokeWidth={1} /></g>}
    </g>
  )
}

// ------------------------------------------------------------ a share certificate
export const Share: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; top?: string; big?: string; color?: string }> = ({ x, y, s = 1, o = 1, r = 0, top = 'ROSA\'S BAKERY', big = '1 SHARE', color = M.teal }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-100} width={300} height={200} rx={12} fill={M.paper} stroke={color} strokeWidth={8} />
    <rect x={-132} y={-82} width={264} height={164} rx={8} fill="none" stroke={color} strokeWidth={2} opacity={0.6} />
    <text y={-40} textAnchor="middle" fill={M.ink2} style={BB(32)}>{top}</text>
    <text y={30} textAnchor="middle" fill={M.ink} style={BB(64)}>{big}</text>
    <circle cx={100} cy={60} r={22} fill={M.gold} /><circle cx={100} cy={60} r={14} fill={M.goldD} />
  </g>
)
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={6} r={40} fill={M.goldD} /><circle r={40} fill={M.gold} /><circle r={30} fill="none" stroke={M.goldD} strokeWidth={4} opacity={0.7} />
    <text y={14} textAnchor="middle" fill={M.goldD} style={BB(text.length > 2 ? 32 : 44)}>{text}</text>
  </g>
)
export const Label: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; fill?: string; ink?: string; w?: number }> = ({ x, y, text, o = 1, size = 48, fill = M.paper, ink = M.ink, w }) => {
  const ww = w ?? Math.max(120, text.length * size * 0.46 + 40)
  return o > 0.001 ? <g transform={`translate(${x} ${y})`} opacity={o}><rect x={-ww / 2} y={-size * 0.75} width={ww} height={size * 1.25} rx={size * 0.3} fill={fill} /><text y={size * 0.28} textAnchor="middle" fill={ink} style={BB(size)}>{text}</text></g> : null
}
// ------------------------------------------------------------ a phone with a stock app: price and a BUY button (pressed 0–1)
export const Phone: React.FC<{ x: number; y: number; s?: number; o?: number; price?: string; pressed?: number; title?: string; line?: number }> = ({ x, y, s = 1, o = 1, price = '$101', pressed = 0, title = "ROSA'S", line = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-210} width={220} height={420} rx={34} fill="#22252E" /><rect x={-96} y={-186} width={192} height={372} rx={22} fill="#F7F4EC" />
    <text y={-140} textAnchor="middle" fill={M.ink2} style={BB(32)}>{title}</text>
    <text y={-80} textAnchor="middle" fill={M.ink} style={BB(64)}>{price}</text>
    <path d={`M-70 40 L-35 ${10 - 20 * line} L0 20 L35 ${-10 - 30 * line} L70 ${-30 - 20 * line}`} fill="none" stroke={M.green} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-70} y={100 + 6 * pressed} width={140} height={58} rx={16} fill={pressed > 0.5 ? M.greenD : M.green} /><text y={140 + 6 * pressed} textAnchor="middle" fill="#FFFFFF" style={BB(40)}>BUY</text>
  </g>
)
// ------------------------------------------------------------ a tiny townsperson (for crowds and the 24 brokers)
export const Folk: React.FC<{ x: number; y: number; s?: number; o?: number; c?: string; hat?: boolean }> = ({ x, y, s = 1, o = 1, c = M.teal, hat }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={-62} r={16} fill="#E8B48E" /><path d="M-20 0 L-20 -30 Q-20 -44 0 -44 Q20 -44 20 -30 L20 0 Z" fill={c} />
    {hat && <g><rect x={-14} y={-96} width={28} height={22} fill="#2A2A30" /><rect x={-22} y={-78} width={44} height={6} fill="#2A2A30" /></g>}
  </g>
)
// ------------------------------------------------------------ the old buttonwood tree
export const Buttonwood: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-40 0 Q-30 -160 -60 -300 L60 -300 Q30 -160 40 0 Z" fill="#8A6A55" />
    {[[-180, -380, 150], [0, -460, 190], [170, -390, 150], [-90, -300, 130], [100, -310, 130]].map(([cx, cy, r], k) => <circle key={k} cx={cx} cy={cy + 4 * Math.sin(f / 30 + k)} r={r} fill={k % 2 ? '#7BAF6A' : '#689C5A'} />)}
  </g>
)
// ------------------------------------------------------------ a newspaper / news board with a headline icon
export const News: React.FC<{ x: number; y: number; s?: number; o?: number; head: string; icon?: 'up' | 'down' | 'flour'; r?: number }> = ({ x, y, s = 1, o = 1, head, icon = 'up', r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-190} y={-140} width={380} height={280} rx={8} fill={M.paper} stroke="#D9CBB2" strokeWidth={4} />
    <text y={-92} textAnchor="middle" fill={M.ink} style={BB(36)}>THE TOWN NEWS</text><rect x={-170} y={-80} width={340} height={4} fill={M.ink} />
    <text y={-30} textAnchor="middle" fill={icon === 'up' ? M.greenD : M.redD} style={BB(head.length > 14 ? 38 : 46)}>{head}</text>
    {icon === 'up' && <path d="M-60 90 L-10 40 L20 64 L70 10 M40 10 L70 10 L70 40" fill="none" stroke={M.green} strokeWidth={10} strokeLinecap="round" />}
    {icon === 'down' && <path d="M-60 10 L-10 60 L20 36 L70 90 M40 90 L70 90 L70 60" fill="none" stroke={M.red} strokeWidth={10} strokeLinecap="round" />}
    {icon === 'flour' && <g transform="translate(0 50)"><path d="M-50 50 L-40 -40 L40 -40 L50 50 Z" fill="#EFE7DA" stroke={M.stoneD} strokeWidth={4} /><text y={20} textAnchor="middle" fill={M.redD} style={BB(36)}>×2</text></g>}
  </g>
)
// ------------------------------------------------------------ a sack of flour with a price tag
export const Flour: React.FC<{ x: number; y: number; s?: number; o?: number; tag?: string }> = ({ x, y, s = 1, o = 1, tag }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-80 0 L-90 -150 Q-60 -190 0 -186 Q60 -190 90 -150 L80 0 Z" fill="#EFE7DA" stroke={M.stoneD} strokeWidth={5} />
    <text y={-70} textAnchor="middle" fill={M.ink2} style={BB(40)}>FLOUR</text>
    {tag && <g transform="translate(70 -150) rotate(10)"><path d="M-50 -28 L40 -28 L64 0 L40 28 L-50 28 Z" fill={M.red} /><text x={-4} y={12} textAnchor="middle" fill="#FFFFFF" style={BB(34)}>{tag}</text></g>}
  </g>
)
// ------------------------------------------------------------ a slot machine (gambling) and a top hat
export const Slot: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-300} width={240} height={300} rx={24} fill={M.red} /><rect x={-96} y={-250} width={192} height={100} rx={12} fill="#FFFFFF" />
    {[0, 1, 2].map((k) => <text key={k} x={-60 + k * 60} y={-182} textAnchor="middle" fill={M.ink} style={BB(64)}>{['7', '$', '7'][(k + Math.floor(f / 6)) % 3]}</text>)}
    <rect x={120} y={-260} width={16} height={120} fill="#9AA6B2" /><circle cx={128} cy={-266} r={22} fill={M.gold} />
  </g>
)
export const TopHat: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-70} y={-150} width={140} height={150} rx={8} fill="#2A2A30" /><rect x={-110} y={-16} width={220} height={26} rx={12} fill="#2A2A30" /><rect x={-70} y={-46} width={140} height={20} fill={M.red} /></g>
)
// ------------------------------------------------------------ a big cross mark (owner r68)
export const No: React.FC<{ x: number; y: number; r?: number; o: number }> = ({ x, y, r = 120, o }) => o > 0.01 ? (
  <g transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * o})`} opacity={o}><circle r={r} fill="none" stroke={M.red} strokeWidth={r * 0.14} /><line x1={-r * 0.7} y1={-r * 0.7} x2={r * 0.7} y2={r * 0.7} stroke={M.red} strokeWidth={r * 0.14} strokeLinecap="round" /></g>
) : null
export { lerp, rnd }
