// ============================================================
// SCENES C — TECH, NEWS & WORLD (10)
// phone-frame / laptop-frame have a `screen` anchor: the engine
// draws app UIs, charts or headlines inside it.
// ============================================================

import React from 'react'
import { COLORS } from '../tokens'
import { BlindsWindow, Desk, Extra, L, LightPool, makeScene, Monitor, NightSky, rnd, RoomShell, Skyline } from './kit'

// # Coarse world land mask (48×18), dot-matrix style
const WORLD = [
  '................................................',
  '......######...........######.##########........',
  '...############.......###...################....',
  '..############.......####..##################...',
  '....##########.......###..###################...',
  '.....########.........##.####################...',
  '......#######........######..###############....',
  '.......####..........#######..##########.##.....',
  '........###..........#######...#######...#......',
  '.........###..........######....####.....#......',
  '..........####........#####......##......##.....',
  '...........#####.......####.............####....',
  '...........######......###..............####....',
  '............#####......##................##.....',
  '............####........................#.......',
  '............###.................................',
  '............##..................................',
  '................................................',
]

const A = (x: number, y: number, scale = 1, layer: 'back' | 'mid' | 'front' = 'mid') => ({ x, y, scale, layer })

const Rack: React.FC<{ x: number; y: number; frame: number; seed: number }> = ({ x, y, frame, seed }) => (
  <g><rect x={x} y={y} width={150} height={560} fill="#0B1424" stroke={L.line} strokeWidth={2} />
    {Array.from({ length: 14 }, (_, i) => (
      <g key={i}><rect x={x + 12} y={y + 14 + i * 38} width={126} height={28} fill="#101C30" stroke={L.dim} strokeWidth={1} />
        {[0, 1, 2, 3].map((j) => <circle key={j} cx={x + 26 + j * 12} cy={y + 28 + i * 38} r={3} fill={(frame + i * 5 + j * 3 + seed) % 14 < 7 ? COLORS.green : '#4FB5E8'} opacity={0.9} />)}</g>))}</g>
)

export const WORLD_SCENES = [
  makeScene('server-room', 'Server room', ['tech', 'ai', 'data', 'cloud'],
    { stand: A(960, 1010), prop1: A(960, 220), prop2: A(1600, 300) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} />{[100, 300, 1470, 1670].map((x, i) => <Rack key={x} x={x} y={400} frame={frame} seed={i * 7} />)}</g>,
      mid: <g>{[560, 1200].map((x, i) => <Rack key={x} x={x} y={330} frame={frame} seed={i * 3 + 1} />)}<LightPool cx={960} cy={700} rx={700} ry={400} u={u} k="sr" color="#4FB5E8" o={0.18} /></g>,
    })),

  makeScene('mining-room', 'Crypto mining room', ['tech', 'crypto', 'bitcoin', 'energy'],
    { stand: A(380, 1010), prop1: A(1250, 230), prop2: A(1250, 520, 0.8) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} />{Array.from({ length: 5 }, (_, r) => <line key={r} x1={760} x2={1820} y1={330 + r * 120} y2={330 + r * 120} stroke={L.line} strokeWidth={2} />)}</g>,
      mid: <g>{Array.from({ length: 5 }, (_, r) => Array.from({ length: 8 }, (_, i) => (
        <g key={`${r}${i}`}><rect x={780 + i * 130} y={250 + r * 120} width={110} height={74} fill="#141E2E" stroke={L.line} strokeWidth={1.5} />
          <circle cx={835 + i * 130} cy={287 + r * 120} r={22} fill="none" stroke={L.dim} strokeWidth={2} transform={`rotate(${frame * 20} ${835 + i * 130} ${287 + r * 120})`} strokeDasharray="10 6" />
          <circle cx={882 + i * 130} cy={262 + r * 120} r={3} fill={(frame + i + r) % 10 < 5 ? COLORS.green : '#F7931A'} /></g>)))}
        <LightPool cx={1300} cy={600} rx={600} ry={420} u={u} k="mn" color="#F7931A" o={0.12} /></g>,
    })),

  makeScene('phone-frame', 'Phone screen close-up', ['tech', 'app', 'consumer', 'screen', 'personal-finance'],
    { stand: A(360, 1040, 1.1), screen: A(1180, 540, 1), prop1: A(1650, 260), prop2: A(1650, 820, 0.8) },
    ({ u }) => ({
      back: <g><rect width={1920} height={1080} fill="#03050A" /><LightPool cx={1180} cy={540} rx={700} ry={520} u={u} k="ph" color="#1E6FA8" o={0.2} /></g>,
      mid: <g><rect x={960} y={60} width={440} height={960} rx={60} fill="#11161F" stroke="#3A4558" strokeWidth={6} />
        <rect x={988} y={110} width={384} height={860} rx={30} fill="#071526" /><rect x={1130} y={80} width={100} height={18} rx={9} fill="#03050A" /></g>,
    })),

  makeScene('laptop-frame', 'Laptop screen close-up', ['tech', 'work', 'online', 'screen', 'business'],
    { stand: A(300, 1040, 1.1), screen: A(1160, 470, 1), prop1: A(1700, 200), prop2: A(1700, 900, 0.7) },
    ({ u }) => ({
      back: <g><rect width={1920} height={1080} fill="#03050A" /><LightPool cx={1160} cy={470} rx={800} ry={500} u={u} k="lp" color="#1E6FA8" o={0.2} /></g>,
      mid: <g><rect x={640} y={110} width={1040} height={660} rx={24} fill="#11161F" stroke="#3A4558" strokeWidth={6} />
        <rect x={672} y={142} width={976} height={596} rx={8} fill="#071526" /><path d="M560 790 L1760 790 L1700 860 L620 860 Z" fill="#2A3446" stroke="#3A4558" strokeWidth={4} /></g>,
    })),

  makeScene('news-desk', 'News desk', ['world', 'news', 'media', 'breaking', 'economy', 'investing'],
    { stand: A(960, 1010), prop1: A(1500, 300), prop2: A(420, 300) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} /><rect x={160} y={120} width={1600} height={500} fill="#071526" stroke={L.line} strokeWidth={2} />
        <Skyline frame={frame} x0={170} x1={1750} ground={610} seed={41} tall={0.5} />
        <rect x={160} y={540} width={1600} height={80} fill={COLORS.red} opacity={0.9} /><text x={220} y={594} fill="#fff" style={{ font: '800 40px Inter', letterSpacing: 4 }}>BREAKING</text>
        <clipPath id={u('nt')}><rect x={470} y={540} width={1280} height={80} /></clipPath>
        <rect x={450} y={548} width={4} height={64} fill="#fff" opacity={0.6} />
        <text x={480 - ((frame * 4) % 760)} y={594} fill="#fff" clipPath={`url(#${u('nt')})`} style={{ font: '600 34px Inter' }}>{'MARKETS  ·  ECONOMY  ·  TECH  ·  CRYPTO  ·  '.repeat(4)}</text></g>,
      mid: <g><path d="M520 760 L1400 760 L1460 960 L460 960 Z" fill="#0E1A2E" stroke={L.line} strokeWidth={2} /><LightPool cx={960} cy={760} rx={600} ry={180} u={u} k="nd" color="#DCEBF7" o={0.15} /></g>,
    })),

  makeScene('parliament', 'Parliament / government', ['world', 'government', 'policy', 'tax', 'economy'],
    { stand: A(330, 1011), prop1: A(1150, 160), prop2: A(1550, 700, 0.8) },
    ({ u }) => ({
      back: <g><NightSky u={u} stars={60} /></g>,
      mid: <g><path d="M640 360 Q1150 120 1660 360" fill="#E9DED0" /><rect x={640} y={360} width={1020} height={40} fill="#D8CBB8" />
        {Array.from({ length: 10 }, (_, i) => <rect key={i} x={680 + i * 98} y={400} width={40} height={420} fill="#F4EDE2" stroke="#B8A890" strokeWidth={3} />)}
        <rect x={600} y={820} width={1100} height={60} fill="#D8CBB8" /><rect x={560} y={880} width={1180} height={80} fill="#C4B6A2" />
        <LightPool cx={1150} cy={600} rx={800} ry={400} u={u} k="pa" color="#FFE7A8" o={0.15} /></g>,
      front: <rect x={0} y={960} width={1920} height={120} fill="#050A10" />,
    })),

  makeScene('airport', 'Airport window', ['world', 'travel', 'trade', 'global', 'business', 'economy'],
    { stand: A(400, 1010), prop1: A(1300, 300), prop2: A(1600, 700, 0.8) },
    ({ u, frame }) => {
      const px = ((frame * 6) % 2600) - 400
      return {
        back: <g><NightSky u={u} /><rect x={0} y={700} width={1920} height={380} fill="#06101C" />
          <g transform={`translate(${px} ${520 - px * 0.12})`}><path d="M0 0 L180 -10 L220 0 L180 10 Z M80 -4 L40 -60 L70 -60 L130 -6 M80 4 L40 60 L70 60 L130 6" fill="#C9D2DC" /><circle cx={190} cy={0} r={3} fill={COLORS.red} opacity={frame % 20 < 10 ? 1 : 0.2} /></g></g>,
        mid: <g>
          {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={700 + i * 76} cy={740} r={4} fill={i % 2 ? '#FFD58A' : '#4FB5E8'} opacity={0.4 + 0.6 * ((frame + i * 3) % 16 < 8 ? 1 : 0.3)} />)}
          <g transform="translate(980 560) scale(2.2)"><path d="M0 0 L180 -10 L220 0 L180 10 Z M80 -4 L40 -60 L70 -60 L130 -6 M80 4 L40 60 L70 60 L130 6 M10 -2 L-10 -30 L6 -30 L30 -4" fill="#C9D2DC" stroke={L.ink} strokeWidth={2} />
            {[150, 136, 122, 108, 94].map((x) => <circle key={x} cx={x} cy={-2} r={2.5} fill="#4FB5E8" />)}</g>
          {Array.from({ length: 5 }, (_, i) => <rect key={i} x={680 + i * 250} y={150} width={240} height={620} fill="none" stroke={L.line} strokeWidth={3} />)}
          <rect x={660} y={770} width={1260} height={30} fill={L.ink} stroke={L.line} strokeWidth={2} /></g>,
      }
    }),

  makeScene('map-backdrop', 'World map backdrop', ['world', 'global', 'economy', 'thumbnail'],
    { stand: A(300, 1040, 1.1), prop1: A(1150, 420, 1.2), prop2: A(1550, 360) },
    ({ u, frame }) => ({
      back: <g><rect width={1920} height={1080} fill="#03050A" />
        {WORLD.flatMap((row, r) => [...row].map((ch, c) => ch === '#'
          ? <circle key={`${c}-${r}`} cx={530 + c * 26} cy={200 + r * 30} r={8} fill="#1E6FA8" opacity={0.5 + 0.3 * Math.sin(frame / 20 + c * 0.3)} /> : null))}<LightPool cx={1150} cy={500} rx={800} ry={420} u={u} k="mp" color="#1E6FA8" o={0.15} /></g>,
    })),

  makeScene('ai-lab', 'AI lab', ['tech', 'ai', 'research', 'future'],
    { stand: A(380, 1010), prop1: A(1250, 300, 1.2), prop2: A(1650, 760, 0.8) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} />{Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2, r = 230 + 40 * Math.sin(frame / 20 + i)
        return <line key={i} x1={1250} y1={420} x2={1250 + r * Math.cos(a)} y2={420 + r * Math.sin(a)} stroke="#4FB5E8" strokeWidth={1.5} opacity={0.35} />
      })}</g>,
      mid: <g><circle cx={1250} cy={420} r={150} fill="none" stroke="#4FB5E8" strokeWidth={3} opacity={0.6 + 0.3 * Math.sin(frame / 8)} />
        <circle cx={1250} cy={420} r={90} fill="#0B2440" stroke="#4FB5E8" strokeWidth={3} />
        <Desk x={900} y={760} w={700} drawers={false} /><Monitor x={980} y={620} w={180} h={120} frame={frame} trend="up" /><Monitor x={1340} y={620} w={180} h={120} frame={frame + 20} />
        <LightPool cx={1250} cy={420} rx={500} ry={420} u={u} k="ai" color="#4FB5E8" o={0.2} /></g>,
    })),

  makeScene('stage', 'Presentation stage', ['work', 'presentation', 'launch', 'thumbnail', 'business'],
    { stand: A(960, 1000, 1.05), prop1: A(1500, 320), prop2: A(420, 320) },
    ({ u }) => ({
      back: <g><rect width={1920} height={1080} fill="#03050A" /><rect x={260} y={100} width={1400} height={560} fill="#071526" stroke={L.line} strokeWidth={2} /></g>,
      mid: <g><LightPool cx={960} cy={900} rx={520} ry={180} u={u} k="st" color="#FFF1D6" o={0.35} />
        <path d="M960 0 L700 960 L1220 960 Z" fill="#FFF1D6" opacity={0.06} /><rect x={0} y={960} width={1920} height={120} fill="#0B1424" stroke={L.line} strokeWidth={2} />
        {Array.from({ length: 14 }, (_, i) => <Extra key={i} x={80 + i * 140} y={1110} s={0.6} c={L.dim} />)}</g>,
    })),
]


