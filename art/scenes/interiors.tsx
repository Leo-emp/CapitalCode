// ============================================================
// INTERIORS — the 16 rooms redrawn in solid "night flat" art
// (owner 2026-10-25: "redraw, improve and build more variety").
// Same ids and the same spots as the old line-art rooms, so every
// plan still lands; `variant` containing "warm" gives a warm room
// mood, the teal world a teal one. No made-up figures anywhere.
// ============================================================
import React from 'react'
import { COLORS } from '../tokens'
import { Desk, DeskLamp, Extra, makeScene, Monitor, OfficeChair, Plant, rnd, wc } from './kit'
import { Bookcase, CityWindow, Column, Counter, Curtain, FloorLamp, MeetingTable, Painting, Pendant, Podium, Rack, roomTone, Room, Rug, Sofa, WallScreen } from './rooms'

const A = (x: number, y: number, scale = 1, layer: 'back' | 'mid' | 'front' = 'mid') => ({ x, y, scale, layer })
const tone = (variant?: string) => roomTone(wc(), variant)
const GOLD = '#E9C25A', GOLD_D = '#B88A2E'
// # homes and courtrooms are warm unless the plan asks for a cool room
const warmRoom = (variant?: string) => (variant?.includes('cool') ? variant : `${variant ?? ''} warm`)

export const INTERIOR_SCENES = [
  // ---------------------------------------------------------------- bank hall
  makeScene('bank-interior', 'Bank hall', ['money', 'bank', 'finance', 'institution', 'personal-finance', 'investing'],
    { stand: A(560, 1010), counter: A(1300, 760, 0.8), prop1: A(1300, 300), prop2: A(960, 620, 0.8) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      return {
        back: <g><Room u={u} variant={variant} floorY={900} wainscot={false} />
          {[220, 560, 1700].map((x) => <Column key={x} x={x} top={150} bottom={880} variant={variant} />)}
          <rect x={860} y={110} width={880} height={64} rx={8} fill={t.wallLo} />
          <text x={1300} y={156} textAnchor="middle" fill={COLORS.champagneLight} style={{ font: '700 40px Inter', letterSpacing: 14 }}>BANK</text>
          <Painting x={900} y={240} w={220} h={150} seed={2} variant={variant} /><Painting x={1480} y={240} w={180} h={150} seed={1} variant={variant} />
          <rect x={980} y={470} width={640} height={30} fill={t.trim} /></g>,
        mid: <g>
          <Pendant x={1090} y={0} len={250} frame={frame} variant={variant} u={u} /><Pendant x={1510} y={0} len={250} frame={frame} variant={variant} u={u} />
          {/* # tellers behind glass, then the counter */}
          {[1100, 1300, 1500].map((x, i) => <g key={x}>
            <rect x={x - 80} y={520} width={160} height={200} fill={t.screenHi} opacity={0.18} />
            <Extra x={x} y={720} s={0.62} c={['#3E7CC9', '#2FC4B2', '#B5577A'][i]} />
            <rect x={x - 86} y={510} width={8} height={210} fill={t.metal} /></g>)}
          <rect x={1006} y={510} width={588} height={10} fill={t.metal} />
          <Counter x={990} y={720} w={620} h={180} variant={variant} />
          <Plant x={820} y={900} frame={frame} s={1.2} />
          {/* # waiting customers */}
          {[0, 1].map((i) => <Extra key={i} x={190 + i * 150} y={900} s={0.7} c={['#5A6B8C', '#7A5A8C'][i]} />)}</g>,
      }
    }),

  // ---------------------------------------------------------------- vault
  makeScene('vault-room', 'Bank vault', ['money', 'bank', 'wealth', 'security', 'investing'],
    { stand: A(500, 1010), prop1: A(1300, 520, 1.6), prop2: A(1600, 820, 0.9) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      return {
        back: <g><Room u={u} variant={variant} floorY={900} wainscot={false} planks={false} />
          {/* # steel wall plates with rivets */}
          {Array.from({ length: 24 }, (_, i) => <rect key={i} x={20 + (i % 8) * 240} y={100 + Math.floor(i / 8) * 260} width={228} height={248} rx={6} fill={i % 2 ? t.metalDark : t.wallLo} opacity={0.75} />)}
          {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={36 + (i % 10) * 196} cy={116 + Math.floor(i / 10) * 260} r={5} fill={t.metal} />)}
          {/* # safe-deposit boxes on the left */}
          {Array.from({ length: 30 }, (_, i) => <g key={`b${i}`}><rect x={80 + (i % 5) * 70} y={180 + Math.floor(i / 5) * 90} width={62} height={80} rx={4} fill={t.metal} /><circle cx={111 + (i % 5) * 70} cy={220 + Math.floor(i / 5) * 90} r={6} fill={t.metalDark} /></g>)}</g>,
        mid: <g>
          <ellipse cx={1300} cy={900} rx={420} ry={40} fill={t.shadow} opacity={0.5} />
          {/* # the round door: thick ring, face, bolts, spinning wheel */}
          <circle cx={1300} cy={520} r={350} fill={t.metalDark} />
          <circle cx={1300} cy={520} r={310} fill={t.metal} />
          <path d={`M1300 210 A310 310 0 0 1 1300 830 Z`} fill={t.metalDark} opacity={0.35} />
          {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <circle key={i} cx={1300 + 330 * Math.cos(a)} cy={520 + 330 * Math.sin(a)} r={12} fill={GOLD} /> })}
          <circle cx={1300} cy={520} r={150} fill={t.metalDark} />
          <g transform={`rotate(${frame * 0.6} 1300 520)`}>{[0, 60, 120].map((a) => <rect key={a} x={1288} y={370} width={24} height={300} rx={12} fill={GOLD} transform={`rotate(${a} 1300 520)`} />)}</g>
          <circle cx={1300} cy={520} r={54} fill={GOLD} /><circle cx={1300} cy={520} r={28} fill={GOLD_D} />
          {/* # gold bars stacked by the door */}
          {[0, 1, 2, 3, 4, 5].map((i) => <g key={i}><path d={`M${1520 + (i % 3) * 96} ${880 - Math.floor(i / 3) * 46} l12 -40 l64 0 l12 40 Z`} fill={GOLD} /><path d={`M${1532 + (i % 3) * 96} ${840 - Math.floor(i / 3) * 46} l64 0 l12 40 l-12 0 Z`} fill={GOLD_D} opacity={0.5} /></g>)}</g>,
      }
    }),

  // ---------------------------------------------------------------- office
  makeScene('office', 'Office at night', ['work', 'business', 'office', 'desk'],
    { stand: A(420, 1010), sit: A(960, 1000, 0.95), prop1: A(1460, 300), prop2: A(960, 560, 0.7) },
    ({ u, frame, variant }) => ({
      back: <g><Room u={u} variant={variant} floorY={960} />
        <CityWindow x={110} y={150} w={560} h={420} frame={frame} seed={4} panes={3} variant={variant} u={u} />
        <Bookcase x={1260} y={140} w={420} h={560} seed={7} variant={variant} />
        <Painting x={780} y={200} w={200} h={140} seed={3} variant={variant} /></g>,
      mid: <g><FloorLamp x={1780} y={960} variant={variant} u={u} />
        <DeskLamp x={600} y={750} frame={frame} u={u} /><Desk x={380} y={750} w={1160} /><Monitor x={860} y={600} w={200} h={130} frame={frame} trend="up" />
        <OfficeChair x={1150} y={980} /><Plant x={1290} y={750} frame={frame} />
        <rect x={720} y={722} width={70} height={28} rx={6} fill="#E8D9B5" /><rect x={460} y={736} width={90} height={14} rx={3} fill="#F06B5B" /></g>,
    })),

  // ---------------------------------------------------------------- boardroom over the city
  makeScene('boardroom', 'Glass boardroom over the city', ['business', 'corporate', 'deal', 'investing'],
    { stand: A(330, 1010), focus: A(1100, 700), prop1: A(1100, 300), prop2: A(1650, 380) },
    ({ u, frame, variant }) => ({
      back: <g><Room u={u} variant={variant} floorY={930} wainscot={false} />
        <CityWindow x={60} y={90} w={1800} h={600} frame={frame} seed={9} panes={5} variant={variant} u={u} /></g>,
      mid: <g><Pendant x={760} y={0} len={140} frame={frame} variant={variant} u={u} /><Pendant x={1440} y={0} len={140} frame={frame} variant={variant} u={u} />
        <MeetingTable x={620} y={760} w={960} chairs={6} variant={variant} />
        {[760, 1100, 1440].map((x) => <g key={x}><rect x={x - 30} y={740} width={60} height={20} rx={4} fill="#E8D9B5" /><rect x={x + 40} y={730} width={14} height={30} rx={4} fill="#5BCBFF" /></g>)}
        <Plant x={1780} y={930} frame={frame} s={1.4} /></g>,
    })),

  // ---------------------------------------------------------------- meeting room with a board
  makeScene('meeting-room', 'Meeting room', ['work', 'business', 'deal', 'boardroom'],
    { stand: A(330, 1010), board: A(1500, 420), prop1: A(1500, 400), prop2: A(960, 700, 0.7) },
    ({ u, frame, variant }) => ({
      back: <g><Room u={u} variant={variant} floorY={930} />
        <WallScreen x={1180} y={210} w={640} h={400} kind="bars" frame={frame} variant={variant} />
        <CityWindow x={140} y={170} w={420} h={380} frame={frame} seed={2} variant={variant} u={u} />
        <Painting x={700} y={220} w={180} h={130} seed={4} variant={variant} /></g>,
      mid: <g><MeetingTable x={640} y={780} w={700} chairs={4} variant={variant} />
        <rect x={900} y={760} width={70} height={20} rx={4} fill="#E8D9B5" /><rect x={1100} y={752} width={40} height={28} rx={6} fill="#F06B5B" />
        <Plant x={1860} y={930} frame={frame} s={1.2} /></g>,
    })),

  // ---------------------------------------------------------------- trading desk
  makeScene('trading-desk', 'Trading desk with screens', ['work', 'investing', 'stocks', 'markets'],
    { stand: A(420, 1010), sit: A(960, 1000, 0.95), prop1: A(960, 180), prop2: A(1550, 420) },
    ({ u, frame, variant }) => {
      const tr = variant?.includes('crash') ? -1 : 1
      return {
        back: <g><Room u={u} variant={variant} floorY={960} />
          <CityWindow x={1380} y={150} w={460} h={460} frame={frame} seed={6} variant={variant} u={u} />
          <Bookcase x={80} y={200} w={240} h={500} seed={3} variant={variant} /></g>,
        mid: <g>
          {([[640, 330, 'candles'], [860, 330, 'line'], [1080, 330, 'bars'], [750, 500, 'line'], [970, 500, 'candles']] as const).map(([x, y, k], i) =>
            <WallScreen key={i} x={x} y={y} w={210} h={150} kind={k} frame={frame + i * 9} trend={i % 2 ? tr : tr} variant={variant} />)}
          <Desk x={560} y={760} w={800} drawers={false} /><OfficeChair x={960} y={990} />
          <rect x={620} y={736} width={120} height={24} rx={4} fill="#E8D9B5" /><rect x={1180} y={728} width={30} height={32} rx={6} fill="#F06B5B" /></g>,
      }
    }),

  // ---------------------------------------------------------------- stock exchange floor (no made-up figures)
  makeScene('stock-exchange', 'Stock exchange floor', ['work', 'investing', 'stocks', 'markets'],
    { stand: A(330, 1010), prop1: A(960, 160), prop2: A(1500, 520, 0.8) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      return {
        back: <g><Room u={u} variant={variant} floorY={900} wainscot={false} />
          {/* # a moving band of up/down arrows instead of fake tickers */}
          <rect x={0} y={90} width={1920} height={70} fill={t.wallLo} />
          {Array.from({ length: 22 }, (_, i) => { const x = ((i * 120 - frame * 3) % 2640 + 2640) % 2640 - 240, up = rnd(i * 7) > 0.4
            return <path key={i} d={up ? `M${x} 140 l22 -32 l22 32 Z` : `M${x} 108 l22 32 l22 -32 Z`} fill={up ? COLORS.green : COLORS.red} /> })}
          {[200, 700, 1220, 1720].map((x, i) => <WallScreen key={x} x={x - 180} y={230} w={360} h={240} kind={(['line', 'bars', 'candles', 'line'] as const)[i]} frame={frame + i * 11} variant={variant} />)}</g>,
        mid: <g>
          {/* # trading booths */}
          {[620, 1040, 1460].map((x) => <g key={x}><Counter x={x - 150} y={720} w={300} h={180} variant={variant} />
            <rect x={x - 120} y={640} width={110} height={70} rx={6} fill={t.screen} /><rect x={x + 10} y={640} width={110} height={70} rx={6} fill={t.screen} />
            <rect x={x - 110} y={660} width={90} height={10} rx={5} fill={COLORS.green} /><rect x={x + 20} y={680} width={80} height={10} rx={5} fill="#5BCBFF" /></g>)}
          {[0, 1, 2, 3, 4].map((i) => <Extra key={i} x={540 + i * 230} y={900} s={0.66} c={['#3E7CC9', '#5A6B8C', '#2FC4B2', '#B5577A', '#7A5A8C'][i]} />)}</g>,
      }
    }),

  // ---------------------------------------------------------------- chart wall
  makeScene('chart-wall', 'Giant candlestick chart wall', ['investing', 'markets', 'stocks', 'trading', 'thumbnail'],
    { stand: A(300, 1011), focus: A(1100, 470), prop1: A(1100, 200), prop2: A(1600, 820, 0.8) },
    ({ u, frame, variant }) => ({
      back: <g><Room u={u} variant={variant} floorY={920} wainscot={false} />
        <WallScreen x={540} y={130} w={1240} h={640} kind="candles" frame={frame} trend={variant?.includes('crash') ? -1 : 1} variant={variant} /></g>,
      mid: <g><Pendant x={1160} y={0} len={60} frame={frame} variant={variant} u={u} cone={300} />
        <Desk x={1380} y={830} w={420} drawers={false} /><Monitor x={1500} y={710} w={160} h={110} frame={frame} trend="up" />
        <Plant x={480} y={920} frame={frame} s={1.3} /></g>,
    })),

  // ---------------------------------------------------------------- server room
  makeScene('server-room', 'Server room', ['tech', 'ai', 'data', 'cloud'],
    { stand: A(960, 1010), prop1: A(960, 220), prop2: A(1600, 300), stand2: A(440, 1010) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      return {
        back: <g><Room u={u} variant={variant} floorY={930} wainscot={false} planks={false} />
          {/* # raised-floor tiles */}
          {Array.from({ length: 10 }, (_, i) => <rect key={i} x={i * 200} y={930} width={190} height={150} fill={i % 2 ? t.floorHi : t.floor} />)}
          {[60, 300, 540, 1200, 1440, 1680].map((x, i) => <Rack key={x} x={x} y={190} w={200} h={720} frame={frame} seed={i * 5} variant={variant} />)}
          {Array.from({ length: 6 }, (_, i) => <rect key={`c${i}`} x={i * 340} y={110} width={300} height={22} rx={11} fill={t.metalDark} />)}</g>,
        mid: <g><rect x={820} y={360} width={280} height={180} rx={10} fill={t.screen} />
          <circle cx={960} cy={450} r={60} fill="#5BCBFF" opacity={0.3 + 0.2 * Math.sin(frame / 10)} /><circle cx={960} cy={450} r={30} fill="#5BCBFF" /></g>,
      }
    }),

  // ---------------------------------------------------------------- AI lab
  makeScene('ai-lab', 'AI lab', ['tech', 'ai', 'research', 'future'],
    { stand: A(380, 1010), prop1: A(1250, 300, 1.2), prop2: A(1650, 760, 0.8) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      return {
        back: <g><Room u={u} variant={variant} floorY={930} wainscot={false} />
          <WallScreen x={850} y={120} w={800} h={420} kind="globe" frame={frame} variant={variant} />
          <Rack x={1720} y={260} w={160} h={640} frame={frame} variant={variant} /><Bookcase x={60} y={220} w={240} h={500} seed={5} variant={variant} /></g>,
        mid: <g>
          {/* # lab bench with a glowing chip under a glass dome */}
          <Counter x={760} y={760} w={980} h={170} variant={variant} front={t.metalDark} />
          <ellipse cx={1250} cy={740} rx={150} ry={26} fill={t.metal} />
          <path d="M1130 740 Q1130 560 1250 560 Q1370 560 1370 740 Z" fill="#9FD8FF" opacity={0.22} />
          <rect x={1200} y={660} width={100} height={80} rx={8} fill="#2B6CB0" /><rect x={1220} y={680} width={60} height={40} rx={4} fill="#5BCBFF" opacity={0.6 + 0.4 * Math.sin(frame / 8)} />
          {[860, 980, 1500, 1620].map((x, i) => <g key={x}><rect x={x - 20} y={690} width={40} height={50} rx={6} fill={['#3DDC97', '#A07CFF', '#E9B949', '#F06B5B'][i]} /><rect x={x - 8} y={670} width={16} height={22} fill={t.metal} /></g>)}</g>,
      }
    }),

  // ---------------------------------------------------------------- AI brain hologram
  makeScene('ai-brain', 'AI brain hologram', ['ai', 'tech', 'future', 'thumbnail'],
    { stand: A(330, 1010), focus: A(1150, 480, 1.2), prop1: A(1150, 480, 1.2), prop2: A(1650, 300) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      return {
        back: <g><Room u={u} variant={variant} floorY={930} wainscot={false} planks={false} />
          {[180, 1780].map((x) => <Rack key={x} x={x - 90} y={240} w={180} h={680} frame={frame} variant={variant} />)}
          <defs><radialGradient id={u('holo')}><stop offset="0%" stopColor="#5BCBFF" stopOpacity={0.45} /><stop offset="100%" stopColor="#5BCBFF" stopOpacity={0} /></radialGradient></defs>
          <circle cx={1150} cy={480} r={460} fill={`url(#${u('holo')})`} /></g>,
        mid: <g>
          {/* # projector base and the light beam */}
          <path d="M960 880 L1340 880 L1250 620 L1050 620 Z" fill="#5BCBFF" opacity={0.12} />
          <ellipse cx={1150} cy={890} rx={230} ry={40} fill={t.metalDark} /><ellipse cx={1150} cy={878} rx={200} ry={30} fill={t.metal} /><ellipse cx={1150} cy={872} rx={90} ry={14} fill="#5BCBFF" />
          {/* # the brain: two solid lobes, folds, sparks */}
          <g transform={`translate(0 ${Math.sin(frame / 20) * 8})`}>
            <path d="M1150 300 C1040 290 980 370 1000 450 C960 520 1020 610 1110 610 C1130 640 1150 640 1150 630 Z" fill="#5BCBFF" opacity={0.85} />
            <path d="M1150 300 C1260 290 1320 370 1300 450 C1340 520 1280 610 1190 610 C1170 640 1150 640 1150 630 Z" fill="#7FD6FF" opacity={0.85} />
            {[[1060, 400, 1120, 380], [1040, 480, 1110, 470], [1080, 560, 1130, 540], [1180, 380, 1240, 400], [1190, 470, 1260, 480], [1170, 540, 1220, 560]].map(([a, b, c, d], i) =>
              <path key={i} d={`M${a} ${b} Q${(a + c) / 2} ${b - 24} ${c} ${d} L${c} ${d + 10} Q${(a + c) / 2} ${b - 14} ${a} ${b + 10} Z`} fill="#2B6CB0" opacity={0.6} />)}
            {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={1030 + rnd(i) * 240} cy={330 + rnd(i + 7) * 270} r={6} fill="#FFFFFF" opacity={0.3 + 0.7 * Math.abs(Math.sin(frame / 7 + i))} />)}
          </g></g>,
      }
    }),

  // ---------------------------------------------------------------- stage
  makeScene('stage', 'Presentation stage', ['work', 'presentation', 'launch', 'thumbnail', 'business'],
    { stand: A(960, 1000, 1.05), prop1: A(1500, 320), prop2: A(420, 320), stand2: A(440, 1000, 1.05) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      return {
        back: <g><Room u={u} variant={variant} floorY={960} wainscot={false} planks={false} />
          <WallScreen x={560} y={110} w={800} h={450} kind="line" frame={frame} variant={variant} />
          <Curtain x={0} w={360} h={960} side={1} /><Curtain x={1560} w={360} h={960} side={-1} />
          <rect x={0} y={0} width={1920} height={60} fill="#7E2034" /></g>,
        mid: <g>
          {/* # spotlights from above */}
          {[700, 1220].map((x) => <path key={x} d={`M${x - 20} 0 L${x - 220} 1000 L${x + 180} 1000 L${x + 20} 0 Z`} fill={t.glow} opacity={0.08} />)}
          <ellipse cx={960} cy={1000} rx={280} ry={34} fill={t.glow} opacity={0.25} />
          <rect x={0} y={960} width={1920} height={30} fill={t.wood} /><rect x={0} y={990} width={1920} height={90} fill={t.woodDark} />
          <Podium x={1340} y={990} variant={variant} /></g>,
        front: <g>{Array.from({ length: 12 }, (_, i) => <g key={i}><circle cx={80 + i * 160} cy={1100} r={70} fill={t.wallLo} /><rect x={30 + i * 160} y={1050} width={100} height={40} rx={20} fill={t.shadow} opacity={0.5} /></g>)}</g>,
      }
    }),

  // ---------------------------------------------------------------- courtroom
  makeScene('courtroom', 'Courtroom', ['work', 'legal', 'court', 'regulation', 'business'],
    { stand: A(400, 1010), prop1: A(1300, 260), prop2: A(1300, 560, 0.7) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      return {
        back: <g><Room u={u} variant={warmRoom(variant)} floorY={920} />
          {[760, 1840].map((x) => <Column key={x} x={x} top={140} bottom={900} w={70} variant={warmRoom(variant)} />)}
          {/* # the seal over the bench (no words) */}
          <circle cx={1300} cy={260} r={110} fill={GOLD_D} /><circle cx={1300} cy={260} r={90} fill={GOLD} /><path d="M1250 290 L1300 200 L1350 290 Z" fill={GOLD_D} /></g>,
        mid: <g>
          <Counter x={960} y={560} w={680} h={360} variant={warmRoom(variant)} />
          <rect x={1250} y={500} width={100} height={60} rx={10} fill={t.woodDark} />
          {/* # gavel */}
          <g transform={`rotate(${Math.max(0, Math.sin(frame / 12)) * -20} 1420 520)`}><rect x={1410} y={500} width={70} height={30} rx={8} fill={t.wood} /><rect x={1440} y={526} width={10} height={50} fill={t.woodDark} /></g>
          {/* # public benches */}
          {[0, 1].map((i) => <g key={i}><rect x={60} y={720 + i * 90} width={540} height={26} fill={t.wood} /><rect x={60} y={746 + i * 90} width={540} height={60} fill={t.woodDark} /></g>)}
          <FloorLamp x={1820} y={920} variant={warmRoom(variant)} u={u} /></g>,
      }
    }),

  // ---------------------------------------------------------------- living room
  makeScene('living-room', 'Living room at night', ['money', 'personal', 'home', 'family', 'personal-finance'],
    { stand: A(500, 1010), sit: A(1150, 900, 0.9), prop1: A(1550, 380), prop2: A(1150, 560, 0.8) },
    ({ u, frame, variant }) => ({
      back: <g><Room u={u} variant={warmRoom(variant)} floorY={930} />
        <CityWindow x={1320} y={170} w={440} h={420} frame={frame} seed={8} variant={warmRoom(variant)} u={u} />
        <Painting x={880} y={230} w={260} h={170} seed={1} variant={warmRoom(variant)} /><Bookcase x={70} y={240} w={300} h={560} seed={9} variant={warmRoom(variant)} /></g>,
      mid: <g><Rug cx={1100} cy={1000} rx={520} ry={60} />
        <Sofa x={880} y={930} w={560} variant={warmRoom(variant)} />
        <FloorLamp x={1560} y={930} variant={warmRoom(variant)} u={u} />
        {/* # TV on a low cabinet */}
        {/* # TV on a low cabinet, between the standing spot and the sofa */}
        <rect x={600} y={800} width={260} height={130} fill={tone(warmRoom(variant)).woodDark} />
        <WallScreen x={610} y={640} w={240} h={150} kind="globe" frame={frame} variant={warmRoom(variant)} />
        <Plant x={1480} y={930} frame={frame} s={1.2} /></g>,
    })),

  // ---------------------------------------------------------------- coder desk
  makeScene('coder-desk', 'Coder desk with code screens', ['tech', 'ai', 'software', 'startup', 'work'],
    { stand: A(330, 1010), sit: A(1000, 1000, 0.95), focus: A(1100, 520), prop1: A(1100, 220), prop2: A(1650, 380) },
    ({ u, frame, variant }) => ({
      back: <g><Room u={u} variant={variant} floorY={960} />
        <CityWindow x={1460} y={170} w={380} h={380} frame={frame} seed={12} variant={variant} u={u} />
        <Painting x={200} y={220} w={200} h={140} seed={5} variant={variant} /></g>,
      mid: <g>
        <WallScreen x={760} y={420} w={300} h={210} kind="code" frame={frame} variant={variant} />
        <WallScreen x={1080} y={420} w={300} h={210} kind="code" frame={frame + 40} variant={variant} />
        <Desk x={680} y={760} w={780} drawers={false} /><OfficeChair x={1000} y={990} />
        <DeskLamp x={1380} y={760} frame={frame} u={u} />
        <rect x={880} y={730} width={260} height={30} rx={6} fill="#2E3A55" /><rect x={760} y={728} width={40} height={32} rx={8} fill="#F06B5B" />
        <Plant x={600} y={960} frame={frame} s={1.2} /></g>,
    })),

  // ---------------------------------------------------------------- savings jars
  makeScene('savings-jars', 'Savings jars on a desk', ['personal-finance', 'saving', 'budget', 'thumbnail'],
    { stand: A(330, 1010), focus: A(1150, 640), prop1: A(1150, 300), prop2: A(1600, 380) },
    ({ u, frame, variant }) => {
      const t = tone(warmRoom(variant))
      const JARS = [['RENT', '#5BCBFF'], ['SAVE', '#3DDC97'], ['FUN', '#E9B949'], ['INVEST', '#A07CFF']] as const
      return {
        back: <g><Room u={u} variant={warmRoom(variant)} floorY={940} />
          <CityWindow x={1380} y={160} w={420} h={360} frame={frame} seed={3} variant={warmRoom(variant)} u={u} />
          <Bookcase x={120} y={220} w={260} h={500} seed={2} variant={warmRoom(variant)} /></g>,
        mid: <g>
          <rect x={700} y={780} width={940} height={30} rx={6} fill={t.wood} /><rect x={720} y={810} width={900} height={130} fill={t.woodDark} />
          {JARS.map(([label, c], i) => { const x = 790 + i * 210, fill = 0.35 + 0.15 * i + 0.05 * Math.sin(frame / 30 + i)
            return <g key={label}>
              <rect x={x} y={560} width={150} height={220} rx={26} fill="#CFE8FF" opacity={0.35} />
              <rect x={x + 8} y={560 + 212 * (1 - fill)} width={134} height={212 * fill} rx={20} fill={c} />
              {Array.from({ length: 3 }, (_, k) => <ellipse key={k} cx={x + 40 + k * 35} cy={560 + 212 * (1 - fill) + 10} rx={16} ry={6} fill={GOLD} />)}
              <rect x={x + 10} y={540} width={130} height={28} rx={8} fill={t.metal} />
              <rect x={x + 22} y={640} width={106} height={44} rx={8} fill="#F2E6CC" />
              <text x={x + 75} y={672} textAnchor="middle" fill="#2E3A55" style={{ font: '800 28px Inter' }}>{label}</text>
            </g> })}
          <DeskLamp x={1560} y={780} frame={frame} u={u} /></g>,
      }
    }),
]
