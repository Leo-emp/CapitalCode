// ============================================================
// PLACES — new scenes for variety (owner 2026-10-25: "build more
// variety for scenes"): everyday places money stories happen in.
// Solid night-flat art; rooms follow the room moods like the
// redrawn interiors. No made-up figures.
// ============================================================
import React from 'react'
import { COLORS } from '../tokens'
import { Desk, DeskLamp, Extra, makeScene, Monitor, NightSky, OfficeChair, Pavement, Plant, rnd, Skyline, StreetLamp, wc } from './kit'
import { Bookcase, CityWindow, Counter, FloorLamp, Painting, Pendant, roomTone, Room, Rug, WallScreen } from './rooms'

const A = (x: number, y: number, scale = 1, layer: 'back' | 'mid' | 'front' = 'mid') => ({ x, y, scale, layer })
const tone = (variant?: string) => roomTone(wc(), variant)
const LEAF = ['#2E8B57', '#3BAA6E', '#5BBF85']

// # a round-crowned tree: trunk + three flat canopy blobs, swaying a touch
const Tree: React.FC<{ x: number; y: number; s?: number; frame: number; seed?: number }> = ({ x, y, s = 1, frame, seed = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(frame / 60 + seed) * 1.2} 0 0)`}>
    <path d="M-16 0 L-10 -170 L10 -170 L16 0 Z" fill="#6B4A33" /><path d="M0 0 L10 -170 L16 0 Z" fill="#4E3524" />
    <circle cx={-60} cy={-210} r={80} fill={LEAF[0]} /><circle cx={60} cy={-220} r={86} fill={LEAF[1]} /><circle cx={0} cy={-290} r={96} fill={LEAF[2]} />
    <circle cx={30} cy={-300} r={40} fill="#7ED39C" opacity={0.6} />
  </g>
)
// # a park bench: slats, legs, armrests
const Bench: React.FC<{ x: number; y: number; w?: number }> = ({ x, y, w = 300 }) => (
  <g>
    <ellipse cx={x + w / 2} cy={y + 4} rx={w / 2 + 20} ry={12} fill="#0E1D33" opacity={0.4} />
    {[0, 1, 2].map((i) => <rect key={i} x={x} y={y - 130 + i * 26} width={w} height={18} rx={4} fill="#A0704A" />)}
    <rect x={x - 10} y={y - 60} width={w + 20} height={20} rx={4} fill="#A0704A" /><rect x={x - 10} y={y - 44} width={w + 20} height={8} fill="#6F4B31" />
    {[x + 16, x + w - 30].map((lx) => <rect key={lx} x={lx} y={y - 140} width={14} height={140} fill="#2E3A55" />)}
  </g>
)

export const PLACE_SCENES = [
  // ---------------------------------------------------------------- rooftop terrace over the city
  makeScene('rooftop-terrace', 'Rooftop terrace at night', ['city', 'lifestyle', 'success', 'wealth', 'personal-finance', 'thumbnail'],
    { stand: A(500, 1010), prop1: A(1300, 300), prop2: A(1500, 820, 0.8) },
    ({ u, frame }) => {
      const w = wc()
      return {
        back: <g><NightSky u={u} stars={60} /><Skyline frame={frame} ground={760} seed={21} tall={0.9} /><Skyline frame={frame} x0={-40} ground={820} seed={5} tall={0.6} /></g>,
        mid: <g>
          {/* # string lights between two poles */}
          {[120, 1800].map((x) => <rect key={x} x={x - 6} y={300} width={12} height={620} fill="#2E3A55" />)}
          <path d="M120 320 Q960 470 1800 320" stroke="#2E3A55" strokeWidth={4} fill="none" />
          {Array.from({ length: 24 }, (_, i) => { const t = i / 23, x = 120 + t * 1680, y = 320 + 150 * 4 * t * (1 - t)
            return <circle key={i} cx={x} cy={y + 14} r={10} fill={['#FFD58A', '#F2C35B', '#FFE3A3'][i % 3]} opacity={0.75 + 0.25 * Math.sin(frame / 9 + i)} /> })}
          {/* # parapet wall and deck */}
          <rect x={0} y={760} width={1920} height={160} fill={w.body} /><rect x={0} y={750} width={1920} height={20} fill={w.solidShade} />
          <rect x={0} y={920} width={1920} height={160} fill="#7A5A44" />
          {Array.from({ length: 12 }, (_, i) => <rect key={i} x={0} y={930 + i * 13} width={1920} height={3} fill="#5E4434" />)}
          {/* # planters and a lounge chair */}
          {[860, 1720].map((x) => <g key={x}><rect x={x - 70} y={820} width={140} height={100} fill="#4E5E7C" /><circle cx={x - 30} cy={800} r={46} fill={LEAF[1]} /><circle cx={x + 30} cy={790} r={52} fill={LEAF[2]} /></g>)}
          <path d="M1180 900 L1260 820 L1460 820 L1420 900 Z" fill="#E8D9B5" /><path d="M1180 900 L1150 760 L1190 760 L1230 860 Z" fill="#C9B48A" />
          {[1200, 1400].map((x) => <rect key={x} x={x} y={900} width={12} height={22} fill="#2E3A55" />)}</g>,
      }
    }),

  // ---------------------------------------------------------------- train platform
  makeScene('train-platform', 'Train platform at night', ['commute', 'work', 'city', 'transport', 'personal-finance', 'economy'],
    { stand: A(420, 1010), prop1: A(1250, 250), prop2: A(1600, 800, 0.8) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      const slide = Math.max(0, 600 - frame * 6) // # the train pulls in, then stands
      return {
        back: <g><Room u={u} variant={variant} floorY={900} wainscot={false} planks={false} />
          {/* # tiled wall */}
          {Array.from({ length: 96 }, (_, i) => <rect key={i} x={(i % 16) * 120 + 4} y={120 + Math.floor(i / 16) * 60} width={112} height={52} rx={4} fill={i % 3 ? t.wallLo : t.wallHi} opacity={0.6} />)}
          {/* # departures board: icons and bars, no times */}
          <rect x={1000} y={150} width={500} height={200} rx={10} fill={t.metalDark} /><rect x={1014} y={164} width={472} height={172} rx={6} fill={t.screen} />
          {[0, 1, 2].map((r) => <g key={r}><rect x={1036} y={186 + r * 50} width={34} height={28} rx={6} fill={['#E9B949', '#5BCBFF', '#3DDC97'][r]} /><rect x={1086} y={192 + r * 50} width={220 - r * 40} height={16} rx={8} fill="#E8D9B5" /><rect x={1390} y={192 + r * 50} width={70} height={16} rx={8} fill={COLORS.green} /></g>)}</g>,
        mid: <g>
          {/* # the train */}
          <g transform={`translate(${slide} 0)`}>
            <rect x={620} y={430} width={1400} height={380} rx={40} fill="#D6DEE8" /><rect x={620} y={680} width={1400} height={50} fill="#E9B949" />
            <rect x={620} y={730} width={1400} height={80} fill="#9AA8BC" />
            {Array.from({ length: 7 }, (_, i) => <g key={i}><rect x={680 + i * 190} y={480} width={150} height={150} rx={18} fill={t.screen} /><rect x={680 + i * 190} y={480} width={150} height={60} rx={18} fill={t.screenHi} opacity={0.35} />
              {rnd(i) > 0.4 && <Extra x={755 + i * 190} y={640} s={0.4} c={['#3E7CC9', '#B5577A', '#2FC4B2'][i % 3]} />}</g>)}
            <rect x={1300} y={470} width={120} height={330} rx={10} fill="#9AA8BC" /><rect x={1358} y={470} width={4} height={330} fill="#6A7A90" />
          </g>
          {/* # platform edge */}
          <rect x={0} y={880} width={1920} height={40} fill="#E9B949" /><rect x={0} y={920} width={1920} height={160} fill={t.floor} />
          {[260, 1760].map((x) => <g key={x}><rect x={x - 22} y={110} width={44} height={790} fill={t.metal} /><rect x={x} y={110} width={22} height={790} fill={t.metalDark} /></g>)}</g>,
      }
    }),

  // ---------------------------------------------------------------- city park
  makeScene('city-park', 'City park at night', ['lifestyle', 'personal-finance', 'saving', 'family', 'calm', 'city'],
    { stand: A(460, 1010, 1, 'front'), prop1: A(1250, 300), prop2: A(1450, 860, 0.8) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} stars={50} /><Skyline frame={frame} ground={720} seed={33} tall={0.8} />
        <rect x={0} y={700} width={1920} height={380} fill="#2C6A55" /><path d="M0 760 Q960 690 1920 770 L1920 1080 L0 1080 Z" fill="#358066" /></g>,
      mid: <g>
        {[[180, 840, 1.1], [760, 790, 0.85], [1500, 800, 0.95], [1820, 860, 1.2]].map(([x, y, s], i) => <Tree key={i} x={x} y={y} s={s} frame={frame} seed={i} />)}
        <StreetLamp x={1100} ground={900} frame={frame} u={u} />
        {/* # a path, a pond with the moon in it, a bench */}
        <path d="M600 1080 Q900 900 1300 880 Q1700 870 1920 900 L1920 960 Q1600 940 1300 950 Q1000 970 820 1080 Z" fill="#C9B48A" />
        <ellipse cx={1420} cy={980} rx={260} ry={50} fill="#1E4E7A" /><ellipse cx={1500} cy={975} rx={30} ry={8} fill="#F5E9C8" opacity={0.7} />
        <Bench x={1180} y={880} w={280} /></g>,
      front: <g><Pavement y={1010} u={u} /></g>,
    })),

  // ---------------------------------------------------------------- library
  makeScene('library', 'Library reading room', ['learning', 'research', 'knowledge', 'history', 'study', 'investing'],
    { stand: A(420, 1010), prop1: A(1250, 300), prop2: A(1250, 700, 0.8) },
    ({ u, frame, variant }) => {
      const v = variant?.includes('cool') ? variant : `${variant ?? ''} warm`
      const t = tone(v)
      return {
        back: <g><Room u={u} variant={v} floorY={930} wainscot={false} />
          {[60, 560, 1360].map((x, i) => <Bookcase key={x} x={x} y={120} w={i === 1 ? 300 : 500} h={760} seed={i * 4 + 1} variant={v} />)}
          <CityWindow x={920} y={160} w={380} h={460} frame={frame} seed={14} variant={v} u={u} /></g>,
        mid: <g><Pendant x={1250} y={0} len={360} frame={frame} variant={v} u={u} />
          <Rug cx={1150} cy={1000} rx={520} ry={56} color="#7A3550" />
          {/* # reading table with green lamps and open books */}
          <rect x={860} y={800} width={780} height={26} rx={6} fill={t.wood} /><rect x={880} y={826} width={30} height={110} fill={t.woodDark} /><rect x={1590} y={826} width={30} height={110} fill={t.woodDark} />
          {[1000, 1460].map((x) => <g key={x}><rect x={x - 4} y={740} width={8} height={60} fill={t.metal} /><path d={`M${x - 50} 740 Q${x} 700 ${x + 50} 740 Z`} fill="#2E8B57" /><ellipse cx={x} cy={800} rx={60} ry={10} fill={t.glow} opacity={0.4} /></g>)}
          <path d="M1170 798 L1250 788 L1330 798 L1330 790 L1250 776 L1170 790 Z" fill="#F2E6CC" />
          {/* # rolling ladder */}
          <g><rect x={1700} y={150} width={14} height={780} fill={t.woodDark} /><rect x={1800} y={150} width={14} height={780} fill={t.woodDark} />
            {Array.from({ length: 12 }, (_, i) => <rect key={i} x={1700} y={200 + i * 62} width={114} height={10} fill={t.wood} />)}</g></g>,
      }
    }),

  // ---------------------------------------------------------------- classroom
  makeScene('classroom', 'Classroom', ['learning', 'school', 'explain', 'basics', 'education', 'personal-finance'],
    { stand: A(420, 1010), board: A(1150, 400), prop1: A(1150, 380), prop2: A(1650, 760, 0.8) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      return {
        back: <g><Room u={u} variant={variant} floorY={930} />
          {/* # the board: green, chalk shapes only */}
          <rect x={680} y={170} width={940} height={460} rx={10} fill={t.woodDark} /><rect x={700} y={190} width={900} height={420} rx={6} fill="#2F6B55" />
          <path d="M760 520 L900 420 L1040 470 L1180 330" stroke="#E8F2E8" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
          <circle cx={1360} cy={330} r={70} fill="none" stroke="#E8F2E8" strokeWidth={8} opacity={0.85} /><path d="M1360 330 L1360 260 A70 70 0 0 1 1425 355 Z" fill="#E8F2E8" opacity={0.5} />
          <rect x={700} y={612} width={900} height={14} fill={t.wood} />
          <CityWindow x={110} y={190} w={360} h={380} frame={frame} seed={18} variant={variant} u={u} /></g>,
        mid: <g>
          {/* # the teacher's desk with an apple and a globe */}
          <Counter x={1460} y={760} w={360} h={170} variant={variant} />
          <circle cx={1560} cy={716} r={22} fill="#F06B5B" /><rect x={1558} y={690} width={4} height={10} fill="#4E3524" />
          <circle cx={1720} cy={690} r={44} fill="#2B6CB0" /><path d="M1700 670 q20 -10 30 10 q-10 20 -30 10 Z" fill="#3DDC97" /><rect x={1716} y={734} width={8} height={26} fill={t.metal} />
          {/* # pupils' desks in front */}
          {[680, 960, 1240].map((x) => <g key={x}><rect x={x - 110} y={860} width={220} height={20} rx={4} fill={t.wood} /><rect x={x - 100} y={880} width={14} height={60} fill={t.metalDark} /><rect x={x + 86} y={880} width={14} height={60} fill={t.metalDark} />
            <Extra x={x} y={940} s={0.55} c={['#3E7CC9', '#B5577A', '#2FC4B2'][(x / 280) % 3 | 0]} /></g>)}</g>,
      }
    }),

  // ---------------------------------------------------------------- home office
  makeScene('home-office', 'Home office at night', ['work', 'personal-finance', 'budget', 'side-hustle', 'home', 'startup'],
    { stand: A(380, 1010), sit: A(1000, 1000, 0.95), prop1: A(1100, 260), prop2: A(1650, 760, 0.8) },
    ({ u, frame, variant }) => {
      const v = variant?.includes('cool') ? variant : `${variant ?? ''} warm`
      const t = tone(v)
      return {
        back: <g><Room u={u} variant={v} floorY={960} />
          <CityWindow x={1340} y={160} w={480} h={420} frame={frame} seed={27} variant={v} u={u} />
          <Painting x={640} y={190} w={240} h={160} seed={2} variant={v} />
          {/* # a cork board with notes */}
          <rect x={930} y={170} width={300} height={220} rx={8} fill="#B88A5A" />
          {[[950, 190, '#F2C35B'], [1050, 200, '#5BCBFF'], [1140, 186, '#F06B5B'], [970, 290, '#3DDC97'], [1080, 300, '#E8D9B5']].map(([x, y, c], i) => <rect key={i} x={x as number} y={y as number} width={70} height={70} fill={c as string} transform={`rotate(${(i % 2 ? 4 : -5)} ${x} ${y})`} />)}</g>,
        mid: <g><Rug cx={1000} cy={1020} rx={420} ry={44} color="#2F6B8A" />
          <Desk x={700} y={760} w={640} drawers />
          <Monitor x={880} y={600} w={240} h={150} frame={frame} trend="up" />
          <DeskLamp x={760} y={760} frame={frame} u={u} /><OfficeChair x={1000} y={990} />
          <rect x={1180} y={730} width={36} height={30} rx={6} fill="#F06B5B" /><rect x={1230} y={740} width={70} height={20} rx={4} fill="#E8D9B5" />
          <Bookcase x={120} y={360} w={220} h={420} seed={11} variant={v} />
          <Plant x={1560} y={960} frame={frame} s={1.5} />
          {/* # a sleeping cat on the rug */}
          <g transform="translate(1250 1000)"><ellipse rx={70} ry={30} fill="#E9A15B" /><circle cx={56} cy={-14} r={26} fill="#E9A15B" /><path d="M42 -34 l8 -18 l10 16 Z M62 -36 l10 -16 l6 18 Z" fill="#E9A15B" /><path d="M-60 6 Q-100 0 -96 -24" stroke="#E9A15B" strokeWidth={14} fill="none" strokeLinecap="round" /></g></g>,
      }
    }),

  // ---------------------------------------------------------------- beach at sunset (retirement, freedom)
  makeScene('beach-sunset', 'Beach at sunset', ['retirement', 'freedom', 'goal', 'lifestyle', 'personal-finance', 'thumbnail'],
    { stand: A(500, 1010, 1, 'front'), prop1: A(1300, 300), prop2: A(1500, 880, 0.8) },
    ({ u, frame }) => ({
      back: <g>
        <defs><linearGradient id={u('dusk')} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B2F6B" /><stop offset="55%" stopColor="#C2577A" /><stop offset="100%" stopColor="#F2A55B" /></linearGradient></defs>
        <rect width={1920} height={700} fill={`url(#${u('dusk')})`} />
        <circle cx={1300} cy={640} r={150} fill="#FFD58A" /><circle cx={1300} cy={640} r={220} fill="#FFD58A" opacity={0.18} />
        {[[300, 180, 90], [700, 120, 60], [1650, 200, 110]].map(([x, y, r], i) => <g key={i} opacity={0.75}><ellipse cx={x} cy={y} rx={r * 1.6} ry={r * 0.35} fill="#F2C3B5" /><ellipse cx={x + r * 0.5} cy={y - r * 0.15} rx={r} ry={r * 0.3} fill="#F7D6C8" /></g>)}
        <rect x={0} y={640} width={1920} height={200} fill="#2C5E8C" />
        {Array.from({ length: 10 }, (_, i) => <rect key={i} x={((i * 260 + frame * (1 + i % 3)) % 2200) - 200} y={660 + i * 16} width={120 + (i % 3) * 60} height={6} rx={3} fill="#F2C3B5" opacity={0.5} />)}
        <rect x={1220} y={650} width={160} height={180} fill="#FFD58A" opacity={0.25} /></g>,
      mid: <g>
        <path d="M0 830 Q480 790 960 820 Q1440 850 1920 810 L1920 1080 L0 1080 Z" fill="#E8C98E" />
        <path d="M0 860 Q600 830 1200 860 Q1600 880 1920 850 L1920 880 Q1400 900 960 880 Q400 860 0 890 Z" fill="#F2E6CC" opacity={0.7} />
        {/* # palm tree */}
        <g transform={`rotate(${Math.sin(frame / 50) * 1.5} 1700 900)`}>
          <path d="M1690 900 Q1660 650 1740 420 L1760 426 Q1690 650 1716 900 Z" fill="#7A5A3A" />
          {[[-150, -60], [-120, 40], [130, -40], [150, 60], [0, -120]].map(([dx, dy], i) => <path key={i} d={`M1750 420 Q${1750 + dx * 0.6} ${420 + dy - 50} ${1750 + dx} ${420 + dy + 20} Q${1750 + dx * 0.5} ${420 + dy * 0.3} 1750 430 Z`} fill={LEAF[i % 3]} />)}
          {[0, 1, 2].map((i) => <circle key={i} cx={1740 + i * 12} cy={440 + (i % 2) * 8} r={12} fill="#6B4A33" />)}</g>
        {/* # umbrella + deck chair */}
        <rect x={1336} y={700} width={8} height={200} fill="#6B4A33" />
        <path d="M1180 720 Q1340 600 1500 720 Z" fill="#F06B5B" /><path d="M1340 650 Q1420 670 1500 720 L1340 720 Z" fill="#F2E6CC" opacity={0.5} />
        <path d="M1240 900 L1300 820 L1460 820 L1420 900 Z" fill="#5BCBFF" /><path d="M1240 900 L1210 790 L1250 790 L1290 870 Z" fill="#2AA8F2" /></g>,
      front: <g><path d="M0 1010 Q960 990 1920 1010 L1920 1080 L0 1080 Z" fill="#D9B97E" /></g>,
    })),

  // ---------------------------------------------------------------- highway billboard
  makeScene('highway-billboard', 'Highway billboard at night', ['marketing', 'advertising', 'economy', 'consumer', 'business', 'city'],
    { stand: A(400, 1010, 1, 'front'), prop1: A(1250, 330), billboard: A(1250, 330), prop2: A(1600, 860, 0.8) },
    ({ u, frame }) => {
      const w = wc()
      return {
        back: <g><NightSky u={u} stars={50} /><Skyline frame={frame} ground={700} seed={41} tall={0.7} />
          <rect x={0} y={690} width={1920} height={390} fill={w.bodyShade} /></g>,
        mid: <g>
          {/* # the road in perspective with moving lane marks and car lights */}
          <path d="M760 700 L1160 700 L1920 1080 L0 1080 Z" fill="#2E3A55" />
          {Array.from({ length: 8 }, (_, i) => { const k = ((i / 8) + frame / 120) % 1, y = 700 + k * k * 380, wd = 6 + k * 30, x = 960 - 4 + k * 0
            return <rect key={i} x={x - wd / 2} y={y} width={wd} height={10 + k * 50} fill="#F2C35B" /> })}
          {Array.from({ length: 6 }, (_, i) => { const k = ((i / 6) + frame / 90) % 1, y = 700 + k * k * 380, x = 860 - k * 520
            return <g key={i}><circle cx={x} cy={y} r={4 + k * 14} fill="#FFF4D6" /><circle cx={x + 20 + k * 40} cy={y} r={4 + k * 14} fill="#FFF4D6" /></g> })}
          {Array.from({ length: 6 }, (_, i) => { const k = ((i / 6) + frame / 100 + 0.3) % 1, y = 700 + k * k * 380, x = 1060 + k * 520
            return <g key={i}><circle cx={x} cy={y} r={3 + k * 10} fill="#F06B5B" /><circle cx={x + 16 + k * 30} cy={y} r={3 + k * 10} fill="#F06B5B" /></g> })}
          {/* # billboard: a blank lit panel on legs, our emblem colours */}
          {[1040, 1440].map((x) => <rect key={x} x={x} y={520} width={24} height={300} fill="#4E5E7C" />)}
          <rect x={890} y={110} width={720} height={420} rx={10} fill="#4E5E7C" /><rect x={910} y={130} width={680} height={380} rx={6} fill="#F2E6CC" />
          <rect x={910} y={130} width={680} height={120} fill={COLORS.champagne} opacity={0.5} />
          {[960, 1100, 1240, 1380, 1520].map((x) => <g key={x}><rect x={x} y={86} width={14} height={30} fill="#4E5E7C" /><path d={`M${x - 20} 86 L${x + 34} 86 L${x + 60} 140 L${x - 46} 140 Z`} fill="#FFE3A3" opacity={0.25} /></g>)}</g>,
        front: <g><Pavement y={1010} u={u} /></g>,
      }
    }),
]
