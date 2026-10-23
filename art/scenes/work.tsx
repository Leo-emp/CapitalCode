// ============================================================
// SCENES B — WORK & INDUSTRY (10)
// ============================================================

import React from 'react'
import { COLORS } from '../tokens'
import {
  BlindsWindow, BrandPoster, Desk, DeskLamp, Door, Extra, L, LightPool, makeScene, Monitor, NightSky, OfficeChair, Plant, rnd,
  RoomShell, Shelf, Skyline,
} from './kit'

const A = (x: number, y: number, scale = 1, layer: 'back' | 'mid' | 'front' = 'mid') => ({ x, y, scale, layer })

export const WORK_SCENES = [
  // ---------------------------------------------------------------- office (the Alux desk scene, our version)
  makeScene('office', 'Office at night', ['work', 'business', 'office', 'desk'],
    { stand: A(420, 1010), sit: A(960, 1000, 0.95), prop1: A(1460, 300), prop2: A(960, 560, 0.7) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} />{[0, 1, 2].map((i) => <BlindsWindow key={i} x={150 + i * 190} y={170} w={170} h={230} />)}
        <Shelf x={1380} y={300} w={360} seed={7} /><rect x={1380} y={430} width={360} height={300} fill="none" stroke={L.dim} strokeWidth={2} /><line x1={1560} x2={1560} y1={430} y2={730} stroke={L.dim} strokeWidth={2} />
        <BrandPoster x={1140} y={160} /></g>,
      mid: <g><DeskLamp x={600} y={750} frame={frame} u={u} /><Desk x={380} y={750} w={1160} /><Monitor x={860} y={600} w={200} h={130} frame={frame} />
        <Plant x={1270} y={750} frame={frame} /></g>,
    })),

  // ---------------------------------------------------------------- trading desk
  makeScene('trading-desk', 'Trading desk with screens', ['work', 'investing', 'stocks', 'markets'],
    { stand: A(420, 1010), sit: A(960, 1000, 0.95), prop1: A(960, 180), prop2: A(1550, 420) },
    ({ frame, variant }) => ({
      back: <g><RoomShell floor={960} /><BlindsWindow x={1500} y={150} w={340} h={420} city frame={frame} /></g>,
      mid: <g>{[[640, 380], [860, 360], [1080, 380], [750, 540], [970, 540]].map(([x, y], i) => (
        <Monitor key={i} x={x} y={y} w={200} h={140} frame={frame + i * 9} trend={variant === 'crash' ? 'down' : variant === 'boom' ? 'up' : (['up', 'down', 'mixed', 'up', 'mixed'] as const)[i]} stand={y > 500} />))}
        <Desk x={520} y={720} w={900} drawers={false} /><OfficeChair x={960} y={960} /></g>,
    })),

  // ---------------------------------------------------------------- meeting room
  makeScene('meeting-room', 'Meeting room', ['work', 'business', 'deal', 'boardroom'],
    { stand: A(330, 1010), board: A(1500, 420, 1), prop1: A(1500, 400), prop2: A(960, 700, 0.7) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} /><rect x={1300} y={220} width={420} height={300} fill="#F4F2EC" stroke={L.line} strokeWidth={3} />
        <path d="M1330 470 L1420 420 L1500 440 L1600 330 L1690 300" stroke={COLORS.green} strokeWidth={6} fill="none" />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={1350 + i * 80} y={480 - [40, 70, 55, 110][i]} width={40} height={[40, 70, 55, 110][i]} fill={COLORS.blue} opacity={0.5} />)}</g>,
      mid: <g><LightPool cx={960} cy={760} rx={600} ry={160} u={u} k="mr" />
        <path d="M560 720 L1360 720 L1460 820 L460 820 Z" fill="#0E1A2E" stroke={L.line} strokeWidth={2} />
        {[620, 820, 1020, 1220].map((x) => <g key={x}><Extra x={x} y={720} s={0.75} /><rect x={x - 40} y={706} width={80} height={10} fill={L.cream} opacity={0.7} /></g>)}
        <Plant x={200} y={960} frame={frame} s={1.2} /></g>,
    })),

  // ---------------------------------------------------------------- startup garage
  makeScene('startup-garage', 'Startup garage', ['work', 'startup', 'entrepreneurship', 'tech'],
    { stand: A(430, 1010), sit: A(1150, 1000, 0.9), prop1: A(1600, 300), prop2: A(1150, 520, 0.7) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={960} panels={false} />{Array.from({ length: 10 }, (_, i) => <line key={i} x1={80} x2={900} y1={120 + i * 40} y2={120 + i * 40} stroke={L.dim} strokeWidth={2} />)}
        <rect x={80} y={120} width={820} height={380} fill="none" stroke={L.line} strokeWidth={3} /><Shelf x={1420} y={260} w={400} rows={3} seed={12} /></g>,
      mid: <g><LightPool cx={1150} cy={700} rx={500} ry={220} u={u} k="g" />
        <path d="M1150 80 L1150 280" stroke={L.line} strokeWidth={2} /><circle cx={1150} cy={300} r={18} fill="#FFE7A8" opacity={0.9} />
        <Desk x={850} y={760} w={620} drawers={false} /><Monitor x={1060} y={620} w={180} h={120} frame={frame} trend="up" />
        {[0, 1, 2].map((i) => <rect key={i} x={1600 + i * 70} y={880 - i * 4} width={64} height={80} fill="#C9A06B" stroke={L.ink} strokeWidth={3} />)}</g>,
    })),

  // ---------------------------------------------------------------- factory floor
  makeScene('factory-floor', 'Factory floor', ['work', 'industry', 'manufacturing', 'jobs'],
    { stand: A(360, 1010), prop1: A(1200, 260), prop2: A(1600, 700, 0.8) },
    ({ u, frame }) => ({
      back: <g><RoomShell floor={940} panels={false} />{Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${i * 300} 140 L${i * 300 + 150} 60 L${i * 300 + 300} 140`} stroke={L.line} strokeWidth={2} fill="none" />)}</g>,
      mid: <g><rect x={560} y={760} width={1300} height={40} fill="#1A2638" stroke={L.line} strokeWidth={2} />
        {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={580 + i * 92} cy={800} r={16} fill="none" stroke={L.line} strokeWidth={2} />)}
        {Array.from({ length: 6 }, (_, i) => { const x = 560 + ((i * 220 + frame * 3) % 1300); return <rect key={i} x={x} y={700} width={90} height={60} fill="#C9A06B" stroke={L.ink} strokeWidth={3} /> })}
        {[800, 1300].map((x) => <g key={x}><rect x={x} y={360} width={200} height={300} fill="#1A2638" stroke={L.line} strokeWidth={2} /><rect x={x + 40} y={400} width={120} height={60} fill="#4FB5E8" opacity={0.3 + 0.2 * Math.sin(frame / 7)} /></g>)}
        <LightPool cx={1200} cy={760} rx={700} ry={200} u={u} k="f" o={0.2} /></g>,
    })),

  // ---------------------------------------------------------------- warehouse
  makeScene('warehouse', 'Warehouse', ['work', 'logistics', 'inventory', 'trade'],
    { stand: A(400, 1010), prop1: A(1300, 260), prop2: A(1250, 700, 0.9) },
    ({ u }) => ({
      back: <g><RoomShell floor={940} panels={false} />{Array.from({ length: 4 }, (_, r) => <line key={r} x1={700} x2={1880} y1={300 + r * 160} y2={300 + r * 160} stroke={L.line} strokeWidth={3} />)}
        {[700, 1090, 1480, 1870].map((x) => <line key={x} x1={x} x2={x} y1={280} y2={940} stroke={L.line} strokeWidth={3} />)}</g>,
      mid: <g>{Array.from({ length: 4 }, (_, r) => Array.from({ length: 9 }, (_, i) => rnd(r * 20 + i) > 0.25 &&
        <rect key={`${r}${i}`} x={715 + i * 128} y={300 + r * 160 - 100} width={110} height={100} fill="#C9A06B" stroke={L.ink} strokeWidth={3} />))}
        <LightPool cx={1250} cy={600} rx={700} ry={400} u={u} k="w" o={0.15} /></g>,
    })),

  // ---------------------------------------------------------------- construction site
  makeScene('construction-site', 'Construction site', ['work', 'property', 'construction', 'housing'],
    { stand: A(360, 1011), prop1: A(1200, 220), prop2: A(1550, 760, 0.8) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} /><Skyline frame={frame} ground={960} seed={31} tall={0.7} /></g>,
      mid: <g>{Array.from({ length: 6 }, (_, r) => <line key={r} x1={900} x2={1500} y1={960 - r * 110} y2={960 - r * 110} stroke="#E8792A" strokeWidth={6} />)}
        {[900, 1050, 1200, 1350, 1500].map((x) => <line key={x} x1={x} x2={x} y1={410} y2={960} stroke="#E8792A" strokeWidth={6} />)}
        <rect x={1640} y={140} width={20} height={820} fill="#F7C531" /><rect x={1100} y={140} width={760} height={18} fill="#F7C531" />
        <line x1={1250} x2={1250} y1={158} y2={260 + Math.sin(frame / 25) * 20} stroke="#C9D2DC" strokeWidth={3} /><rect x={1210} y={260 + Math.sin(frame / 25) * 20} width={80} height={40} fill="#7D8B9C" /></g>,
      front: <rect x={0} y={960} width={1920} height={120} fill="#0A0F18" />,
    })),

  // ---------------------------------------------------------------- port / containers
  makeScene('port', 'Container port', ['work', 'trade', 'logistics', 'world'],
    { stand: A(300, 1011), prop1: A(1100, 220), prop2: A(1500, 300) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} /><rect x={0} y={760} width={1920} height={320} fill="#06121F" />
        {Array.from({ length: 12 }, (_, i) => <line key={i} x1={rnd(i) * 1920} x2={rnd(i) * 1920 + 80} y1={800 + i * 20} y2={800 + i * 20} stroke="#1E6FA8" strokeWidth={2} opacity={0.4 + 0.3 * Math.sin(frame / 15 + i)} />)}</g>,
      mid: <g><path d="M700 760 L1800 760 L1740 860 L760 860 Z" fill="#1A2638" stroke={L.line} strokeWidth={2} />
        {Array.from({ length: 3 }, (_, r) => Array.from({ length: 8 }, (_, i) => <rect key={`${r}${i}`} x={780 + i * 120} y={700 - r * 60} width={112} height={56} fill={['#D9434E', '#2AA8F2', '#3DDC97', '#E8792A', '#F4E9D8'][(r + i) % 5]} stroke={L.ink} strokeWidth={3} />))}
        <path d="M560 760 L560 240 L1000 240" stroke="#F7C531" strokeWidth={14} fill="none" /></g>,
    })),

  // ---------------------------------------------------------------- stock exchange floor
  makeScene('stock-exchange', 'Stock exchange floor', ['work', 'investing', 'stocks', 'markets'],
    { stand: A(330, 1010), prop1: A(960, 160), prop2: A(1500, 520, 0.8) },
    ({ u, frame, variant }) => {
      const down = variant === 'crash'
      return {
        back: <g><RoomShell floor={960} panels={false} /><rect x={100} y={90} width={1720} height={120} fill="#071526" stroke={L.line} strokeWidth={2} />
          <g><clipPath id={u('tick')}><rect x={110} y={100} width={1700} height={100} /></clipPath><g clipPath={`url(#${u('tick')})`}>{Array.from({ length: 14 }, (_, i) => { const x = ((i * 330 - frame * 4) % 4620 + 4620) % 4620 - 1450; const up = down ? rnd(i) > 0.8 : rnd(i) > 0.4
            return <text key={i} x={x} y={162} fill={up ? COLORS.green : COLORS.red} style={{ font: '700 34px "JetBrains Mono"' }}>{['ACME', 'NOVA', 'ORBT', 'KITE', 'ZENO', 'LUMA', 'VOLT'][i % 7]} {up ? '▲' : '▼'}{(rnd(i + 3) * 9).toFixed(1)}%</text> })}</g></g>
          {[300, 760, 1220].map((x) => <Monitor key={x} x={x} y={300} w={400} h={220} frame={frame} trend={down ? 'down' : 'mixed'} stand={false} />)}</g>,
        mid: <g>{Array.from({ length: 9 }, (_, i) => <Extra key={i} x={560 + i * 150} y={960 - (i % 2) * 20} s={0.8} />)}<LightPool cx={960} cy={520} rx={900} ry={300} u={u} k="se" color={down ? COLORS.red : '#4FB5E8'} o={0.14} /></g>,
      }
    }),

  // ---------------------------------------------------------------- courtroom
  makeScene('courtroom', 'Courtroom', ['work', 'legal', 'court', 'regulation'],
    { stand: A(400, 1010), prop1: A(1300, 260), prop2: A(1300, 560, 0.7) },
    ({ u }) => ({
      back: <g><RoomShell floor={960} panels={false} />{[400, 700, 1000, 1300, 1600].map((x) => <rect key={x} x={x - 20} y={80} width={40} height={880} fill="none" stroke={L.line} strokeWidth={2} />)}
        <circle cx={1300} cy={240} r={90} fill="none" stroke={COLORS.champagne} strokeWidth={4} /><text x={1300} y={258} textAnchor="middle" fill={COLORS.champagne} style={{ font: '700 44px Georgia' }}>⚖</text></g>,
      mid: <g><LightPool cx={1300} cy={620} rx={500} ry={260} u={u} k="c" /><rect x={1000} y={560} width={600} height={400} fill="#2A1C14" stroke={COLORS.champagne} strokeWidth={3} />
        <rect x={980} y={540} width={640} height={30} fill="#3A281C" stroke={COLORS.champagne} strokeWidth={3} /><Extra x={1300} y={540} s={0.7} c={COLORS.champagne} /></g>,
    })),
]


