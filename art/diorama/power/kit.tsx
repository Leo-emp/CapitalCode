// ============================================================
// LONG VIDEO — "How AI Data Centers Ended Up on Your Power Bill" —
// objects for this story: the power plant that stands ready, pylons
// and the wires between them, homes and shops, the itemised power
// bill (each line a part of what you pay), the data center, the
// auction ladder of plant offers, the price meter and the coin pot.
// The cast, headline and money helpers come from ../aimoney/common.
// One file per scene in this folder. No camera moves (owner r56):
// every change is the drawing itself transforming on its word.
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

// # this story's own colours: plant concrete, steam, the grid's copper wire, the data center's server glow
export const W = { concrete: '#C9CFD8', concreteD: '#9AA5B5', steam: '#FFFFFF', wire: '#5C6F8E', copper: '#C98B4A', server: '#26324A', led: '#5FE3A1', ledOff: '#2E7A58', shop: '#7FC8D8', roof: '#C94A3E' }

// ------------------------------------------------------------ the power plant
// # a gas plant: a hall, two cooling towers and a stack; ready 0–1 lights its windows and lifts the steam
export const PowerPlant: React.FC<{ x: number; y: number; s?: number; o?: number; ready?: number; f?: number; tag?: string; tagColor?: string }> = ({ x, y, s = 1, o = 1, ready = 1, f = 0, tag, tagColor = P.goldInk }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={10} rx={300} ry={24} fill="#000" opacity={0.14} />
    {/* # cooling towers: curved waists, steam puffs rising when ready */}
    {[-150, 10].map((tx, k) => (
      <g key={k}>
        <path d={`M${tx - 80} 0 Q${tx - 44} -130 ${tx - 62} -250 L${tx + 62} -250 Q${tx + 44} -130 ${tx + 80} 0 Z`} fill={W.concrete} />
        <path d={`M${tx + 20} 0 Q${tx + 36} -130 ${tx + 22} -250 L${tx + 62} -250 Q${tx + 44} -130 ${tx + 80} 0 Z`} fill={W.concreteD} opacity={0.5} />
        {[0, 1, 2].map((j) => {
          const ph = ((f / 50 + j / 3 + k * 0.17) % 1)
          return <circle key={j} cx={tx + Math.sin(ph * 6 + j) * 14} cy={-270 - ph * 150} r={34 + ph * 46} fill={W.steam} opacity={ready * 0.55 * (1 - ph)} />
        })}
      </g>
    ))}
    {/* # the turbine hall */}
    <rect x={60} y={-170} width={230} height={170} rx={10} fill="#E9EEF5" />
    <rect x={60} y={-170} width={230} height={36} rx={10} fill={W.concreteD} />
    {[0, 1, 2].map((k) => <rect key={k} x={84 + k * 70} y={-118} width={46} height={52} rx={6} fill={P.gold} opacity={0.2 + 0.7 * ready} />)}
    <rect x={240} y={-330} width={34} height={170} rx={6} fill={W.concreteD} />
    <rect x={240} y={-330} width={34} height={20} rx={6} fill={P.coral} />
    {tag && <g transform="translate(70 70)"><rect x={-130} y={-34} width={260} height={68} rx={34} fill={P.card} stroke={P.edge} strokeWidth={3} />
      <text x={0} y={16} textAnchor="middle" fill={tagColor} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>{tag}</text></g>}
  </g>
)

// ------------------------------------------------------------ pylons and wires
// # a steel lattice pylon (base at x,y)
export const Pylon: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} stroke={W.wire} strokeWidth={6} strokeLinecap="round" fill="none">
    <path d="M-40 0 L-10 -220 L10 -220 L40 0" />
    <path d="M-34 -40 L28 -90 M34 -40 L-28 -90 M-24 -110 L18 -160 M24 -110 L-18 -160" strokeWidth={3} />
    <path d="M-70 -190 L70 -190 M-50 -160 L50 -160" />
  </g>
)
// # a sagging wire between two points, drawn in from a over draw 0–1; glow 0–1 brightens it
export const Wire: React.FC<{ a: [number, number]; b: [number, number]; draw?: number; sag?: number; glow?: number; o?: number }> = ({ a, b, draw = 1, sag = 40, glow = 0, o = 1 }) => {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + sag, d = `M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}`
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) * 1.1 + sag
  return (
    <g opacity={o}>
      {glow > 0 && <path d={d} fill="none" stroke={P.gold} strokeWidth={14} opacity={0.35 * glow} strokeDasharray={len} strokeDashoffset={len * (1 - clamp01(draw))} />}
      <path d={d} fill="none" stroke={W.wire} strokeWidth={4} strokeDasharray={len} strokeDashoffset={len * (1 - clamp01(draw))} />
    </g>
  )
}

// ------------------------------------------------------------ homes and shops
// # a small home: walls, red roof, door, two windows; lit 0–1 lights them
export const Home: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number; color?: string }> = ({ x, y, s = 1, o = 1, lit = 0, color = '#F3D9A4' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={130} ry={14} fill="#000" opacity={0.12} />
    <rect x={-100} y={-150} width={200} height={150} rx={8} fill={color} />
    <path d="M-124 -150 L0 -250 L124 -150 Z" fill={W.roof} />
    <rect x={-26} y={-92} width={52} height={92} rx={6} fill="#6E5236" />
    {[-66, 66].map((wx) => <g key={wx}><rect x={wx - 24} y={-122} width={48} height={44} rx={5} fill="#BFE4FF" /><rect x={wx - 24} y={-122} width={48} height={44} rx={5} fill={P.gold} opacity={0.75 * lit} /></g>)}
  </g>
)
// # a shop with an awning
export const Shop: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number; color?: string }> = ({ x, y, s = 1, o = 1, lit = 0, color = W.shop }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={150} ry={14} fill="#000" opacity={0.12} />
    <rect x={-130} y={-200} width={260} height={200} rx={8} fill="#E9EEF5" />
    <rect x={-130} y={-200} width={260} height={40} rx={8} fill={color} />
    {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M${-130 + k * 43.3} -120 L${-86.7 + k * 43.3} -120 L${-86.7 + k * 43.3} -100 Q${-108 + k * 43.3} -84 ${-130 + k * 43.3} -100 Z`} fill={k % 2 ? '#FFFFFF' : color} />)}
    <rect x={-110} y={-90} width={130} height={90} rx={6} fill="#BFE4FF" /><rect x={-110} y={-90} width={130} height={90} rx={6} fill={P.gold} opacity={0.6 * lit} />
    <rect x={40} y={-90} width={60} height={90} rx={6} fill="#6E5236" />
  </g>
)

// ------------------------------------------------------------ the data center
// # a long white hall with server racks seen through a glass band; lit 0–1 blinks the LEDs; ai 0–1 lights the AI chip on
// # the roof; locked 0–1 closes a padlock on the door
export const DataHall: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; lit?: number; ai?: number; locked?: number; waves?: number }> = ({ x, y, s = 1, o = 1, f = 0, lit = 0, ai = 0, locked = 0, waves = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={380} ry={26} fill="#000" opacity={0.14} />
    <rect x={-350} y={-280} width={700} height={280} rx={18} fill="#E9EEF5" />
    <rect x={-350} y={-280} width={700} height={40} rx={16} fill="#A9B7CB" />
    {/* # cooling units on the roof */}
    {[-250, -130, 130, 250].map((cx) => <g key={cx}><rect x={cx - 44} y={-322} width={88} height={44} rx={8} fill="#8A99B0" /><circle cx={cx} cy={-300} r={14} fill="#5C6A80" /></g>)}
    {/* # the glass band with racks inside */}
    <rect x={-320} y={-224} width={640} height={150} rx={10} fill={W.server} />
    {Array.from({ length: 7 }, (_, k) => (
      <g key={k}>
        <rect x={-306 + k * 90} y={-212} width={74} height={126} rx={6} fill="#1A2436" />
        {Array.from({ length: 8 }, (_, j) => <circle key={j} cx={-292 + k * 90 + (j % 2) * 44} cy={-196 + Math.floor(j / 2) * 30} r={6} fill={(Math.floor(f / 5) + k * 3 + j * 5) % 7 < 5 ? W.led : W.ledOff} opacity={0.25 + 0.75 * lit} />)}
      </g>
    ))}
    {/* # the door with a padlock */}
    <rect x={250} y={-64} width={70} height={64} rx={6} fill="#6E7E96" />
    <g opacity={locked} transform={`translate(285 ${-34 - 20 * (1 - locked)})`}>
      <path d="M-14 -6 L-14 -20 Q0 -36 14 -20 L14 -6" fill="none" stroke={P.goldD} strokeWidth={6} />
      <rect x={-20} y={-8} width={40} height={32} rx={6} fill={P.gold} />
    </g>
    {/* # the AI chip on the front wall */}
    <g opacity={ai} transform="translate(-200 -36)">
      <rect x={-46} y={-30} width={92} height={60} rx={8} fill="#2A3F6E" stroke={P.sky} strokeWidth={4} />
      {[-30, -10, 10, 30].map((dx) => <g key={dx}><rect x={dx - 3} y={-42} width={6} height={12} fill={P.sky} /><rect x={dx - 3} y={30} width={6} height={12} fill={P.sky} /></g>)}
      <text x={0} y={12} textAnchor="middle" fill={P.sky} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>AI</text>
      <circle cx={0} cy={0} r={70} fill={P.sky} opacity={0.12 * ai * (0.7 + 0.3 * Math.sin(f / 6))} />
    </g>
    {/* # internet waves rising from the roof */}
    {waves > 0 && [0, 1, 2].map((k) => <path key={k} d={`M${-60 - k * 34} ${-350 - k * 30} Q0 ${-400 - k * 46} ${60 + k * 34} ${-350 - k * 30}`} fill="none" stroke={P.skyD} strokeWidth={8} strokeLinecap="round" opacity={waves * clamp01(0.4 + 0.6 * Math.sin(f / 8 - k))} />)}
  </g>
)

// ------------------------------------------------------------ the power bill
// # a tall paper bill with up to three item lines. Each line: label, a small drawn icon, state:
// #   show 0–1 slides the line in, strike 0–1 draws a coral line through it (not this one), glow 0–1 lights it gold,
// #   flap 0–1 folds a paper flap over the line (hidden), peek 0–1 lifts that flap a little
export type BillLine = { label: string; icon: 'bulb' | 'pole' | 'mystery'; show: number; strike?: number; glow?: number; flap?: number; peek?: number; extra?: React.ReactNode }
const Icon: React.FC<{ kind: BillLine['icon']; x: number; y: number }> = ({ kind, x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    {kind === 'bulb' && <g><circle cx={0} cy={-8} r={22} fill={P.gold} /><rect x={-10} y={12} width={20} height={14} rx={3} fill="#8A97AA" /></g>}
    {kind === 'pole' && <g><rect x={-4} y={-30} width={8} height={56} fill="#8A6A44" /><rect x={-24} y={-24} width={48} height={7} rx={3} fill="#8A6A44" /><path d="M-24 -20 Q-32 -12 -38 -16 M24 -20 Q32 -12 38 -16" stroke={W.wire} strokeWidth={3} fill="none" /></g>}
    {kind === 'mystery' && <g><circle cx={0} cy={0} r={26} fill={P.gold} /><text x={0} y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '800 38px Inter' }}>?</text></g>}
  </g>
)
export const PowerBill: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; lines: BillLine[]; title?: string }> = ({ x, y, s = 1, o = 1, open = 1, lines, title = 'ELECTRICITY BILL' }) => {
  const W0 = 640, H0 = 560, h = H0 * clamp01(open)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-W0 / 2 + 12} y={-H0 / 2 + 14} width={W0} height={h} rx={18} fill="#000" opacity={0.12} />
      <rect x={-W0 / 2} y={-H0 / 2} width={W0} height={h} rx={18} fill={P.paper} stroke={P.edge} strokeWidth={4} />
      {open > 0.3 && <g opacity={clamp01((open - 0.3) / 0.4)}>
        <rect x={-W0 / 2} y={-H0 / 2} width={W0} height={86} rx={18} fill={P.skyD} />
        <rect x={-W0 / 2} y={-H0 / 2 + 60} width={W0} height={26} fill={P.skyD} />
        <text x={0} y={-H0 / 2 + 58} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 48px "Bebas Neue"', letterSpacing: 6 }}>{title}</text>
        {lines.map((l, k) => {
          const ly = -H0 / 2 + 160 + k * 130, sh = clamp01(l.show)
          if (sh <= 0) return null
          return (
            <g key={k} opacity={sh} transform={`translate(${lerp(-40, 0, sh)} 0)`}>
              {(l.glow ?? 0) > 0 && <rect x={-W0 / 2 + 24} y={ly - 54} width={W0 - 48} height={108} rx={16} fill={P.gold} opacity={0.22 * (l.glow ?? 0)} stroke={P.gold} strokeWidth={4} strokeOpacity={l.glow} />}
              <Icon kind={l.icon} x={-W0 / 2 + 84} y={ly} />
              <text x={-W0 / 2 + 140} y={ly + 16} fill={P.navy0} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>{l.label}</text>
              <rect x={W0 / 2 - 150} y={ly - 6} width={110} height={12} rx={6} fill="#C8B994" />
              {(l.strike ?? 0) > 0 && <line x1={-W0 / 2 + 50} y1={ly} x2={-W0 / 2 + 50 + (W0 - 100) * clamp01(l.strike ?? 0)} y2={ly} stroke={P.coral} strokeWidth={8} strokeLinecap="round" />}
              {l.extra}
              {(l.flap ?? 0) > 0 && (() => {
                // # the flap folds down from the line's top edge; peek lifts its free edge again
                const fl = clamp01(l.flap ?? 0) * (1 - 0.72 * clamp01(l.peek ?? 0))
                return <g><rect x={-W0 / 2 + 24} y={ly - 54} width={W0 - 48} height={108 * fl} rx={14} fill="#E9DDC4" stroke="#CDB58C" strokeWidth={4} />
                  {fl > 0.7 && <text x={0} y={ly + 18} textAnchor="middle" fill="#B79E78" opacity={clamp01((fl - 0.7) / 0.3)} style={{ font: '800 54px Inter' }}>?</text>}</g>
              })()}
            </g>
          )
        })}
      </g>}
    </g>
  )
}

// ------------------------------------------------------------ small gears that turn (how it works)
export const Gear: React.FC<{ x: number; y: number; r: number; rot: number; color?: string; o?: number }> = ({ x, y, r, rot, color = P.navy3, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-r * 0.16} y={-r * 1.18} width={r * 0.32} height={r * 0.4} rx={3} fill={color} transform={`rotate(${k * 36})`} />)}
    <circle r={r} fill={color} /><circle r={r * 0.38} fill={P.paper} />
  </g>
)

// ------------------------------------------------------------ a big light bulb on a little stand (the power you use)
// # glow 0–1 lights it; dim 0–1 greys it once the story moves past it
export const BigBulb: React.FC<{ x: number; y: number; s?: number; o?: number; glow?: number; dim?: number; f?: number }> = ({ x, y, s = 1, o = 1, glow = 1, dim = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o * (1 - 0.45 * dim)}>
    <ellipse cx={0} cy={6} rx={90} ry={14} fill="#000" opacity={0.12} />
    <rect x={-60} y={-24} width={120} height={24} rx={8} fill="#8A97AA" />
    <rect x={-10} y={-120} width={20} height={100} rx={6} fill="#8A97AA" />
    <rect x={-40} y={-176} width={80} height={60} rx={10} fill="#9AA5B5" />
    {[0, 1, 2].map((k) => <rect key={k} x={-40} y={-168 + k * 18} width={80} height={6} rx={3} fill="#7A8698" />)}
    {glow > 0 && <circle cx={0} cy={-280} r={170} fill={P.gold} opacity={0.16 * glow * (1 - dim) * (0.85 + 0.15 * Math.sin(f / 9))} />}
    <path d="M-40 -176 Q-110 -240 -100 -300 Q-90 -390 0 -396 Q90 -390 100 -300 Q110 -240 40 -176 Z" fill={glow > 0.5 && dim < 0.5 ? '#FFE38A' : '#EDE6D2'} stroke="#D9B657" strokeWidth={6} />
    <path d="M-14 -190 L-14 -250 M14 -190 L14 -250 M-14 -250 Q-14 -268 -4 -262 Q6 -256 6 -270 Q6 -284 14 -276 L14 -250" fill="none" stroke={P.goldD} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" opacity={0.8} />
    <path d="M-60 -330 Q-50 -370 -10 -378" fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.7} />
  </g>
)

// ------------------------------------------------------------ a wooden utility pole with crossarm and wires off both sides
export const UtilityPole: React.FC<{ x: number; y: number; s?: number; o?: number; dim?: number }> = ({ x, y, s = 1, o = 1, dim = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o * (1 - 0.45 * dim)}>
    <ellipse cx={0} cy={6} rx={60} ry={10} fill="#000" opacity={0.12} />
    <rect x={-14} y={-420} width={28} height={420} rx={8} fill="#8A6A44" />
    <rect x={-120} y={-390} width={240} height={20} rx={8} fill="#6E5236" />
    {[-100, 0, 100].map((ix) => <rect key={ix} x={ix - 8} y={-412} width={16} height={24} rx={4} fill="#E9EEF5" />)}
    <path d="M-100 -404 Q-170 -370 -230 -386 M100 -404 Q170 -370 230 -386 M0 -404 Q-110 -356 -230 -366 M0 -404 Q110 -356 230 -366" fill="none" stroke={W.wire} strokeWidth={4} />
    <rect x={-40} y={-300} width={80} height={60} rx={10} fill="#9AA5B5" />
  </g>
)

// ------------------------------------------------------------ a wooden crate whose lid lifts (the hidden part of the bill)
// # open 0–1 lifts and tilts the lid; glow 0–1 lights the inside; gears 0–1 shows the turning gears inside
export const Crate: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; glow?: number; gears?: number; f?: number }> = ({ x, y, s = 1, o = 1, open = 0, glow = 0, gears = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={190} ry={20} fill="#000" opacity={0.14} />
    {/* # inside (seen when the lid lifts) */}
    <rect x={-160} y={-250} width={320} height={40} fill="#4A3522" />
    {glow > 0 && <ellipse cx={0} cy={-250} rx={150} ry={60} fill={P.gold} opacity={0.45 * glow} />}
    {gears > 0 && <g opacity={gears}>
      <g transform={`translate(-40 -262) rotate(${f * 2.4})`}>{Array.from({ length: 10 }, (_, k) => <rect key={k} x={-6} y={-44} width={12} height={14} rx={3} fill={P.navy3} transform={`rotate(${k * 36})`} />)}<circle r={34} fill={P.navy3} /><circle r={12} fill={P.gold} /></g>
      <g transform={`translate(40 -248) rotate(${-f * 3.4 + 18})`}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-5} y={-30} width={10} height={10} rx={3} fill={P.goldD} transform={`rotate(${k * 45})`} />)}<circle r={22} fill={P.goldD} /><circle r={8} fill="#FFFFFF" /></g>
    </g>}
    {/* # the box */}
    <rect x={-170} y={-240} width={340} height={240} rx={10} fill="#B9864C" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-170} y={-236 + k * 60} width={340} height={6} fill="#8E6232" opacity={0.6} />)}
    <rect x={-170} y={-240} width={30} height={240} fill="#8E6232" /><rect x={140} y={-240} width={30} height={240} fill="#8E6232" />
    <path d="M-140 -10 L140 -230" stroke="#8E6232" strokeWidth={24} />
    {/* # the lid hinges at the back-left */}
    <g transform={`rotate(${-open * 34} -176 -256)`}>
      <rect x={-182} y={-272} width={364} height={36} rx={8} fill="#C99A5E" />
      <rect x={-182} y={-272} width={364} height={10} rx={5} fill="#E2B87E" />
      {open < 0.3 && <text x={0} y={-240} textAnchor="middle" fill="#8E6232" style={{ font: '800 30px Inter' }}>?</text>}
    </g>
  </g>
)

// ------------------------------------------------------------ a home cut open to show the living room
// # lamp 0–1 lights the floor lamp, tv 0–1 lights the TV, meter 0–1 spins the meter dial on the outside wall (f drives it)
export const HomeCutaway: React.FC<{ x: number; y: number; s?: number; o?: number; lamp?: number; tv?: number; meter?: number; f?: number }> = ({ x, y, s = 1, o = 1, lamp = 0, tv = 0, meter = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={330} ry={22} fill="#000" opacity={0.12} />
    {/* # walls and roof */}
    <rect x={-300} y={-420} width={600} height={420} rx={10} fill="#F3D9A4" />
    <path d="M-340 -420 L0 -620 L340 -420 Z" fill={W.roof} />
    <path d="M-340 -420 L0 -620 L0 -590 L-300 -420 Z" fill="#000" opacity={0.08} />
    {/* # the room, cut open */}
    <rect x={-270} y={-390} width={540} height={360} rx={6} fill="#FBF3E2" />
    <rect x={-270} y={-390} width={540} height={360} rx={6} fill="#2A2418" opacity={0.28 * (1 - Math.max(lamp, tv * 0.6))} />
    <rect x={-270} y={-60} width={540} height={30} fill="#C9A47A" />
    {/* # window */}
    <rect x={-230} y={-340} width={120} height={110} rx={6} fill="#BFE4FF" /><rect x={-172} y={-340} width={4} height={110} fill="#FFFFFF" /><rect x={-230} y={-287} width={120} height={4} fill="#FFFFFF" />
    {/* # floor lamp with its glow */}
    {lamp > 0 && <ellipse cx={-180} cy={-210} rx={150} ry={120} fill={P.gold} opacity={0.22 * lamp} />}
    <rect x={-184} y={-210} width={8} height={150} fill="#8A97AA" /><ellipse cx={-180} cy={-60} rx={34} ry={8} fill="#8A97AA" />
    <path d="M-220 -210 L-140 -210 L-156 -268 L-204 -268 Z" fill={lamp > 0.5 ? '#FFE38A' : '#E9DCC0'} />
    {/* # TV on a low stand */}
    <rect x={40} y={-110} width={200} height={50} rx={6} fill="#8E6232" />
    <rect x={56} y={-250} width={170} height={110} rx={8} fill="#26324A" />
    <rect x={64} y={-242} width={154} height={94} rx={4} fill={P.sky} opacity={0.15 + 0.75 * tv} />
    {tv > 0.3 && <path d="M90 -170 L120 -210 L150 -180 L190 -225" fill="none" stroke="#FFFFFF" strokeWidth={6} opacity={tv * 0.8} />}
    <rect x={136} y={-140} width={10} height={30} fill="#26324A" />
    {/* # the electricity meter on the outside wall */}
    <g transform="translate(300 -190)">
      <rect x={0} y={-50} width={70} height={100} rx={10} fill="#E9EEF5" stroke="#9AA5B5" strokeWidth={4} />
      <circle cx={35} cy={-6} r={24} fill="#FFFFFF" stroke="#9AA5B5" strokeWidth={3} />
      <line x1={35} y1={-6} x2={35 + 18 * Math.cos(f * 0.35 * meter)} y2={-6 + 18 * Math.sin(f * 0.35 * meter)} stroke={P.coral} strokeWidth={4} strokeLinecap="round" />
      <rect x={14} y={26} width={42} height={12} rx={3} fill="#26324A" />
    </g>
  </g>
)

// ------------------------------------------------------------ a little cart heaped with gold coins
export const CoinCart: React.FC<{ x: number; y: number; s?: number; o?: number; roll?: number }> = ({ x, y, s = 1, o = 1, roll = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={130} ry={14} fill="#000" opacity={0.14} />
    {[-70, 70].map((wx) => <g key={wx} transform={`translate(${wx} -20) rotate(${roll})`}><circle r={26} fill="#5C6A80" /><circle r={10} fill="#C9CFD8" /><rect x={-3} y={-24} width={6} height={48} fill="#C9CFD8" /></g>)}
    <path d="M-120 -40 L120 -40 L100 -110 L-100 -110 Z" fill="#8E6232" />
    {Array.from({ length: 11 }, (_, k) => <circle key={k} cx={-80 + (k % 6) * 32 + (k >= 6 ? 16 : 0)} cy={k >= 6 ? -148 : -120} r={22} fill={P.gold} stroke={P.goldD} strokeWidth={4} />)}
    <circle cx={0} cy={-172} r={22} fill={P.gold} stroke={P.goldD} strokeWidth={4} />
    <rect x={110} y={-60} width={80} height={10} rx={5} fill="#5C6A80" transform="rotate(-20 110 -55)" />
  </g>
)
