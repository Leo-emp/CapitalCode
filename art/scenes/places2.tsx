// ============================================================
// PLACES 2 — twelve more settings for variety (owner 2026-10-25:
// "add more variety for scenes and objects"): everyday places,
// money metaphors as landscapes (summit, storm, oasis, space).
// Solid night-flat art; no made-up figures.
// ============================================================
import React from 'react'
import { COLORS } from '../tokens'
import { Extra, makeScene, NightSky, Pavement, Plant, rnd, Skyline, StreetLamp, wc } from './kit'
import { CityWindow, Counter, Pendant, roomTone, Room, WallScreen } from './rooms'

const A = (x: number, y: number, scale = 1, layer: 'back' | 'mid' | 'front' = 'mid') => ({ x, y, scale, layer })
const tone = (variant?: string) => roomTone(wc(), variant)
const LEAF = ['#2E8B57', '#3BAA6E', '#5BBF85']

// # a little house with a lit window: walls, roof, door, chimney
const House: React.FC<{ x: number; y: number; w?: number; wall?: string; roof?: string; lit?: boolean }> = ({ x, y, w = 260, wall = '#E8D9B5', roof = '#B5577A', lit = true }) => (
  <g>
    <rect x={x + w * 0.62} y={y - w * 0.95} width={w * 0.1} height={w * 0.3} fill="#7A5A44" />
    <rect x={x} y={y - w * 0.6} width={w} height={w * 0.6} fill={wall} />
    <rect x={x + w * 0.75} y={y - w * 0.6} width={w * 0.25} height={w * 0.6} fill="#2E3A55" opacity={0.18} />
    <path d={`M${x - 20} ${y - w * 0.58} L${x + w / 2} ${y - w * 1.02} L${x + w + 20} ${y - w * 0.58} Z`} fill={roof} />
    <path d={`M${x + w / 2} ${y - w * 1.02} L${x + w + 20} ${y - w * 0.58} L${x + w / 2} ${y - w * 0.58} Z`} fill="#2E3A55" opacity={0.25} />
    <rect x={x + w * 0.12} y={y - w * 0.45} width={w * 0.26} height={w * 0.2} fill={lit ? '#FFD58A' : '#2E3A55'} />
    <rect x={x + w * 0.12} y={y - w * 0.36} width={w * 0.26} height={4} fill="#7A5A44" />
    <rect x={x + w * 0.58} y={y - w * 0.38} width={w * 0.2} height={w * 0.38} fill="#6B4A33" /><circle cx={x + w * 0.74} cy={y - w * 0.18} r={4} fill="#E9B949" />
  </g>
)
// # a car seen from the side
const Car: React.FC<{ x: number; y: number; color: string; s?: number }> = ({ x, y, color, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 -40 L20 -80 Q30 -96 60 -96 L150 -96 Q178 -96 192 -76 L220 -46 L240 -40 L240 -14 L0 -14 Z" fill={color} />
    <path d="M40 -80 L64 -86 L104 -86 L104 -50 L32 -50 Z M116 -86 L156 -86 Q176 -84 186 -60 L186 -50 L116 -50 Z" fill="#CFE8FF" opacity={0.85} />
    <rect x={0} y={-30} width={240} height={10} fill="#2E3A55" opacity={0.25} />
    {[50, 190].map((cx) => <g key={cx}><circle cx={cx} cy={-12} r={24} fill="#1E2434" /><circle cx={cx} cy={-12} r={10} fill="#A9BCD6" /></g>)}
    <rect x={226} y={-40} width={14} height={10} rx={3} fill="#FFE38A" />
  </g>
)

export const PLACE2_SCENES = [
  // ---------------------------------------------------------------- hospital ward
  makeScene('hospital-ward', 'Hospital ward', ['health', 'insurance', 'costs', 'emergency', 'care', 'personal-finance'],
    { stand: A(420, 1010), prop1: A(1250, 260), prop2: A(1600, 760, 0.8) },
    ({ u, frame, variant }) => {
      const t = tone(variant ?? 'cool')
      return {
        back: <g><Room u={u} variant={variant} floorY={930} wainscot={false} />
          <rect x={0} y={560} width={1920} height={30} fill="#5BCBFF" opacity={0.5} />
          <CityWindow x={1380} y={160} w={420} h={340} frame={frame} seed={30} variant={variant} u={u} />
          {[0, 1].map((i) => <g key={i}><rect x={720 + i * 300} y={120} width={20} height={480} fill={t.metal} /><rect x={600 + i * 300} y={120} width={260} height={16} fill={t.metal} />
            <path d={`M${600 + i * 300} 136 L${700 + i * 300} 136 L${690 + i * 300} 600 L${610 + i * 300} 600 Z`} fill="#8FD8C8" opacity={0.8} /></g>)}</g>,
        mid: <g>
          {/* # bed, drip stand, heart monitor */}
          <rect x={980} y={720} width={560} height={40} rx={10} fill="#F2E6CC" /><rect x={980} y={760} width={560} height={60} fill={t.metal} />
          <rect x={1000} y={680} width={140} height={50} rx={20} fill="#FFFFFF" /><rect x={1140} y={700} width={390} height={40} rx={10} fill="#5BCBFF" />
          <rect x={980} y={600} width={24} height={220} fill={t.metalDark} /><rect x={1520} y={650} width={24} height={170} fill={t.metalDark} />
          {[1010, 1510].map((x) => <circle key={x} cx={x} cy={840} r={18} fill={t.metalDark} />)}
          <rect x={1600} y={330} width={14} height={500} fill={t.metal} /><path d="M1572 330 h70 v80 q-35 20 -70 0 Z" fill="#CFE8FF" opacity={0.85} />
          <WallScreen x={700} y={600} w={240} h={160} kind="line" frame={frame} variant={variant} />
          <rect x={700} y={760} width={14} height={160} fill={t.metal} /><rect x={926} y={760} width={14} height={160} fill={t.metal} /></g>,
      }
    }),

  // ---------------------------------------------------------------- farm
  makeScene('farm', 'Farm at dusk', ['food', 'commodities', 'farming', 'rural', 'inflation', 'harvest'],
    { stand: A(460, 1010, 1, 'front'), prop1: A(1250, 300), prop2: A(1500, 840, 0.8) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} stars={30} />
        <path d="M0 640 Q480 560 960 620 Q1440 680 1920 600 L1920 1080 L0 1080 Z" fill="#2C6A55" />
        <path d="M0 720 Q600 660 1200 720 Q1600 760 1920 700 L1920 1080 L0 1080 Z" fill="#358066" /></g>,
      mid: <g>
        {/* # crop rows in perspective */}
        {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${700 + i * 60} 760 L${400 + i * 140} 1080 L${440 + i * 140} 1080 L${720 + i * 60} 760 Z`} fill={i % 2 ? '#E9B949' : '#C8962E'} />)}
        {/* # red barn and silo */}
        <rect x={1320} y={470} width={340} height={290} fill="#C94A3E" /><path d="M1300 480 L1490 340 L1680 480 Z" fill="#8E2F2A" />
        <rect x={1440} y={600} width={100} height={160} fill="#F2E6CC" /><path d="M1440 600 L1540 760 M1540 600 L1440 760" stroke="#C94A3E" strokeWidth={12} />
        <rect x={1700} y={400} width={110} height={360} fill="#A9BCD6" /><ellipse cx={1755} cy={400} rx={55} ry={30} fill="#6A82A6" />
        <circle cx={1360} cy={530} r={30} fill="#FFD58A" opacity={0.85} />
        {/* # windmill */}
        <rect x={190} y={420} width={16} height={340} fill="#E8EEF5" />
        <g transform={`rotate(${frame * 1.2} 198 420)`}>{[0, 90, 180, 270].map((a) => <rect key={a} x={192} y={290} width={12} height={130} fill="#E8EEF5" transform={`rotate(${a} 198 420)`} />)}</g>
        <circle cx={198} cy={420} r={14} fill="#A9BCD6" />
        {[880, 980, 1080].map((x, i) => <g key={x}><ellipse cx={x} cy={700} rx={36} ry={22} fill="#E8EEF5" /><circle cx={x + 30} cy={690} r={14} fill="#2E3A55" />{[x - 20, x + 20].map((lx) => <rect key={lx} x={lx} y={712} width={8} height={22} fill="#2E3A55" />)}</g>)}</g>,
      front: <g><path d="M0 1010 Q960 990 1920 1010 L1920 1080 L0 1080 Z" fill="#6B4A33" /></g>,
    })),

  // ---------------------------------------------------------------- suburb street
  makeScene('suburb-street', 'Suburban street at night', ['home', 'housing', 'mortgage', 'family', 'property', 'personal-finance'],
    { stand: A(400, 1010, 1, 'front'), prop1: A(1250, 260), prop2: A(1550, 860, 0.8) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} stars={45} /><Skyline frame={frame} ground={600} seed={51} tall={0.5} /><rect x={0} y={600} width={1920} height={480} fill="#2C6A55" /></g>,
      mid: <g>
        {[[80, '#E8D9B5', '#B5577A'], [520, '#B8D4E8', '#3E7CC9'], [960, '#F2D6A0', '#2E8B57'], [1400, '#E8C9D8', '#8E2F2A']].map(([x, wall, roof], i) =>
          <g key={i}><House x={x as number} y={860} w={330} wall={wall as string} roof={roof as string} lit={rnd(i + frame / 200) > 0.2} />
            <rect x={(x as number) - 20} y={860} width={370} height={14} fill="#E8EEF5" /></g>)}
        {[460, 900, 1340, 1780].map((x, i) => <g key={x}><circle cx={x} cy={800} r={46} fill={LEAF[i % 3]} /><rect x={x - 6} y={830} width={12} height={40} fill="#6B4A33" /></g>)}
        <StreetLamp x={1880} ground={900} frame={frame} u={u} />
        {/* # sale sign in a front yard */}
        <rect x={1250} y={780} width={10} height={100} fill="#6B4A33" /><rect x={1200} y={760} width={130} height={70} rx={6} fill="#F2E6CC" /><rect x={1210} y={772} width={110} height={18} rx={4} fill="#F06B5B" /></g>,
      front: <g><Pavement y={1010} u={u} /><rect x={0} y={880} width={1920} height={130} fill="#3A4560" />{Array.from({ length: 8 }, (_, i) => <rect key={i} x={i * 260 + 40} y={940} width={140} height={10} fill="#F2C35B" />)}</g>,
    })),

  // ---------------------------------------------------------------- car dealership
  makeScene('car-dealership', 'Car dealership showroom', ['cars', 'debt', 'loans', 'spending', 'depreciation', 'consumer'],
    { stand: A(400, 1010), prop1: A(1250, 260), prop2: A(1500, 640, 0.8) },
    ({ u, frame, variant }) => {
      const t = tone(variant)
      return {
        back: <g><Room u={u} variant={variant} floorY={900} wainscot={false} planks={false} />
          <CityWindow x={60} y={120} w={1800} h={600} frame={frame} seed={60} panes={6} variant={variant} u={u} />
          <rect x={0} y={900} width={1920} height={180} fill={t.floorHi} />
          {Array.from({ length: 8 }, (_, i) => <rect key={i} x={i * 240} y={900} width={236} height={180} fill={i % 2 ? t.floor : t.floorHi} opacity={0.8} />)}</g>,
        mid: <g>
          {[700, 1320].map((x) => <Pendant key={x} x={x} y={0} len={120} frame={frame} variant={variant} u={u} cone={700} />)}
          {/* # turntable with a shiny car, and a second car */}
          <ellipse cx={1180} cy={900} rx={360} ry={50} fill={t.metal} /><ellipse cx={1180} cy={890} rx={340} ry={40} fill={t.metalDark} />
          <Car x={1000} y={890} color="#F0454B" s={1.5} />
          <Car x={1560} y={920} color="#2AA8F2" s={1.1} />
          <rect x={1060} y={560} width={240} height={90} rx={10} fill="#F2E6CC" /><rect x={1080} y={580} width={150} height={20} rx={6} fill={COLORS.champagne} /><rect x={1080} y={612} width={90} height={18} rx={6} fill="#F06B5B" /></g>,
      }
    }),

  // ---------------------------------------------------------------- casino
  makeScene('casino', 'Casino floor', ['gambling', 'luck', 'speculation', 'risk', 'lottery', 'crypto'],
    { stand: A(400, 1010), prop1: A(1250, 260), prop2: A(1500, 740, 0.8) },
    ({ u, frame }) => {
      const t = tone('warm')
      return {
        back: <g><Room u={u} variant="warm" floorY={900} wainscot={false} />
          <rect y={900} width={1920} height={180} fill="#7A2E46" />
          {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i % 15) * 130 + 60} cy={940 + Math.floor(i / 15) * 70} r={18} fill="#B5577A" opacity={0.6} />)}
          {/* # marquee lights */}
          {Array.from({ length: 30 }, (_, i) => <circle key={`m${i}`} cx={30 + i * 64} cy={100} r={12} fill="#FFD58A" opacity={(frame / 4 + i) % 3 < 1.5 ? 1 : 0.35} />)}</g>,
        mid: <g>
          {/* # slot machines */}
          {[620, 860].map((x, i) => <g key={x}><rect x={x} y={420} width={190} height={480} rx={18} fill={i ? '#2AA8F2' : '#A07CFF'} /><rect x={x + 20} y={480} width={150} height={110} rx={10} fill="#F2E6CC" />
            {[0, 1, 2].map((k) => <circle key={k} cx={x + 45 + k * 50} cy={535} r={18} fill={['#F0454B', '#E9B949', '#3DDC97'][(k + Math.floor(frame / 6) + i) % 3]} />)}
            <rect x={x + 30} y={640} width={130} height={30} rx={8} fill="#E9B949" /><rect x={x + 186} y={480} width={10} height={90} fill={t.metal} /><circle cx={x + 191} cy={474} r={14} fill="#F0454B" /></g>)}
          {/* # roulette table */}
          <ellipse cx={1420} cy={800} rx={340} ry={90} fill="#2E8B57" /><ellipse cx={1420} cy={812} rx={340} ry={90} fill="#6F4B31" opacity={0.6} />
          <ellipse cx={1420} cy={790} rx={320} ry={80} fill="#2E8B57" />
          <g transform={`rotate(${frame * 4} 1300 780)`}><circle cx={1300} cy={780} r={70} fill="#6F4B31" />{Array.from({ length: 12 }, (_, k) => <path key={k} d={`M1300 780 L${1300 + 66 * Math.cos(k * 0.5236)} ${780 + 66 * Math.sin(k * 0.5236)} L${1300 + 66 * Math.cos((k + 1) * 0.5236)} ${780 + 66 * Math.sin((k + 1) * 0.5236)} Z`} fill={k % 2 ? '#1E2434' : '#C94A3E'} />)}<circle cx={1300} cy={780} r={20} fill="#E9B949" /></g>
          {[[1500, 760], [1560, 790], [1620, 760]].map(([x, y], i) => <g key={i}>{[0, 1, 2].map((k) => <ellipse key={k} cx={x} cy={y - k * 8} rx={20} ry={7} fill={['#F0454B', '#3E7CC9', '#E9B949'][i]} />)}</g>)}</g>,
      }
    }),

  // ---------------------------------------------------------------- gas station
  makeScene('gas-station', 'Gas station at night', ['energy', 'oil', 'prices', 'inflation', 'cars', 'cost-of-living'],
    { stand: A(400, 1010, 1, 'front'), prop1: A(1250, 260), prop2: A(1500, 820, 0.8) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} stars={50} /><Skyline frame={frame} ground={700} seed={71} tall={0.6} /><rect x={0} y={700} width={1920} height={380} fill="#3A4560" /></g>,
      mid: <g>
        {/* # canopy with lights */}
        <rect x={560} y={260} width={1300} height={90} fill="#F2E6CC" /><rect x={560} y={330} width={1300} height={20} fill="#F06B5B" />
        {Array.from({ length: 6 }, (_, i) => <g key={i}><rect x={620 + i * 210} y={350} width={90} height={12} fill="#FFF4D6" /><path d={`M${620 + i * 210} 362 L${580 + i * 210} 900 L${750 + i * 210} 900 L${710 + i * 210} 362 Z`} fill="#FFF4D6" opacity={0.07} /></g>)}
        {[780, 1600].map((x) => <rect key={x} x={x} y={350} width={40} height={550} fill="#A9BCD6" />)}
        {/* # pumps on islands */}
        {[960, 1360].map((x) => <g key={x}><rect x={x - 80} y={860} width={240} height={40} fill="#A9BCD6" /><rect x={x} y={640} width={90} height={220} rx={10} fill="#F06B5B" />
          <rect x={x + 14} y={660} width={62} height={44} rx={6} fill="#1D4A80" /><rect x={x + 22} y={676} width={46} height={12} rx={6} fill="#5BCBFF" /><path d={`M${x + 90} 700 q30 0 30 40 v80`} stroke="#2E3A55" strokeWidth={10} fill="none" /></g>)}
        {/* # price sign: a fuel drop + an up arrow, no numbers */}
        <rect x={1730} y={260} width={20} height={420} fill="#4E5E7C" /><rect x={1660} y={140} width={160} height={160} rx={12} fill="#F2E6CC" />
        <path d="M1720 170 q-26 40 0 60 q26 -20 0 -60 Z" fill="#E9B949" /><path d="M1780 230 l20 -34 l20 34 Z" fill={COLORS.red} /></g>,
      front: <g><Pavement y={1010} u={u} /></g>,
    })),

  // ---------------------------------------------------------------- busy crosswalk
  makeScene('crosswalk', 'Busy city crosswalk', ['people', 'crowd', 'consumer', 'economy', 'city', 'workers'],
    { stand: A(400, 1010, 1, 'front'), prop1: A(1250, 260), prop2: A(1550, 820, 0.8) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} stars={30} /><Skyline frame={frame} ground={760} seed={81} tall={1.2} /><Skyline frame={frame} x0={-60} ground={800} seed={9} tall={0.8} /></g>,
      mid: <g>
        <rect x={0} y={800} width={1920} height={280} fill="#3A4560" />
        {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${560 + i * 90} 820 L${600 + i * 90} 820 L${520 + i * 130} 1080 L${450 + i * 130} 1080 Z`} fill="#E8EEF5" opacity={0.85} />)}
        {/* # walkers crossing both ways */}
        {Array.from({ length: 14 }, (_, i) => { const dir = i % 2 ? 1 : -1, speed = 1.5 + rnd(i) * 1.5, x = ((rnd(i + 3) * 2200 + dir * frame * speed) % 2200 + 2200) % 2200 - 140, y = 860 + (i % 4) * 40
          return <Extra key={i} x={x} y={y} s={0.55 + (i % 4) * 0.06} c={['#3E7CC9', '#B5577A', '#2FC4B2', '#E9B949', '#7A5A8C', '#F06B5B'][i % 6]} /> })}
        {/* # traffic light */}
        <rect x={1760} y={480} width={16} height={420} fill="#2E3A55" /><rect x={1730} y={380} width={76} height={160} rx={12} fill="#2E3A55" />
        <circle cx={1768} cy={420} r={20} fill={(frame / 60) % 2 < 1 ? '#F0454B' : '#5A2A2A'} /><circle cx={1768} cy={498} r={20} fill={(frame / 60) % 2 < 1 ? '#1E4A30' : '#3DDC97'} /></g>,
      front: <g><Pavement y={1010} u={u} /></g>,
    })),

  // ---------------------------------------------------------------- mountain summit
  makeScene('mountain-summit', 'Mountain summit at dawn', ['goal', 'success', 'achievement', 'long-term', 'peak', 'thumbnail'],
    { stand: A(960, 620, 0.9), prop1: A(1450, 260), prop2: A(500, 300) },
    ({ u, frame }) => ({
      back: <g>
        <defs><linearGradient id={u('dawn')} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#14284A" /><stop offset="60%" stopColor="#3B4F8A" /><stop offset="100%" stopColor="#F2A55B" /></linearGradient></defs>
        <rect width={1920} height={1080} fill={`url(#${u('dawn')})`} />
        <circle cx={1500} cy={760} r={120} fill="#FFD58A" /><circle cx={1500} cy={760} r={200} fill="#FFD58A" opacity={0.15} />
        {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 3) * 380} r={rnd(i + 7) * 2 + 0.6} fill="#FFFFFF" opacity={0.3 + 0.4 * rnd(i + 9)} />)}
        <path d="M0 820 L300 520 L520 700 L800 420 L1100 760 L1400 560 L1700 740 L1920 600 L1920 1080 L0 1080 Z" fill="#3B4F8A" />
        {[[220, 980, 110], [1500, 1000, 140], [700, 960, 90]].map(([x, y, r], i) => <g key={i} opacity={0.85}><ellipse cx={(x + frame * 0.4) % 2100 - 100} cy={y} rx={r * 2.4} ry={r * 0.5} fill="#E8EEF5" /><ellipse cx={(x + 80 + frame * 0.4) % 2100 - 100} cy={y - 30} rx={r * 1.4} ry={r * 0.45} fill="#F7FAFF" /></g>)}</g>,
      mid: <g>
        <path d="M560 1080 L960 560 L1360 1080 Z" fill="#6A82A6" /><path d="M960 560 L1360 1080 L1080 1080 Z" fill="#4E5E7C" />
        {/* # trail of steps up to the top, rocks, pines on the lower slopes, birds */}
        {Array.from({ length: 9 }, (_, i) => <rect key={'st' + i} x={1010 - i * 28} y={1060 - i * 52} width={70} height={12} rx={4} fill="#A9BCD6" />)}
        {[[700, 960, 40], [1220, 940, 34], [860, 860, 26], [1120, 820, 22]].map(([x, y, r], i) => <g key={'rk' + i}><path d={`M${x - r} ${y} L${x - r * 0.4} ${y - r} L${x + r * 0.6} ${y - r * 0.8} L${x + r} ${y} Z`} fill="#4E5E7C" /><path d={`M${x - r * 0.4} ${y - r} L${x + r * 0.6} ${y - r * 0.8} L${x + r * 0.2} ${y} Z`} fill="#6A82A6" /></g>)}
        {Array.from({ length: 8 }, (_, i) => { const x = i < 4 ? 600 + i * 50 : 1180 + (i - 4) * 50, y = 1060 - (i % 4) * 14
          return <g key={'pn' + i}><path d={`M${x} ${y - 110} L${x - 34} ${y - 20} L${x + 34} ${y - 20} Z`} fill="#2E8B57" /><path d={`M${x} ${y - 150} L${x - 26} ${y - 70} L${x + 26} ${y - 70} Z`} fill="#3BAA6E" /><rect x={x - 5} y={y - 20} width={10} height={20} fill="#6B4A33" /></g> })}
        {Array.from({ length: 5 }, (_, i) => { const x = (300 + i * 90 + frame * 1.5) % 2100 - 100, y = 300 + (i % 3) * 30 + Math.sin(frame / 8 + i) * 6
          return <path key={'bd' + i} d={`M${x - 16} ${y} Q${x - 8} ${y - 10} ${x} ${y} Q${x + 8} ${y - 10} ${x + 16} ${y} L${x} ${y + 4} Z`} fill="#14284A" /> })}
        <path d="M860 690 L960 560 L1060 690 L1020 670 L990 700 L960 660 L930 700 L900 670 Z" fill="#F7FAFF" />
        <rect x={1056} y={380} width={8} height={190} fill="#4E5E7C" />
        <path d={`M1064 384 L${1170 + Math.sin(frame / 8) * 8} ${400 + Math.sin(frame / 6) * 6} L1064 440 Z`} fill={COLORS.champagne} /></g>,
    })),

  // ---------------------------------------------------------------- stormy sea
  makeScene('stormy-sea', 'Stormy sea', ['risk', 'crisis', 'volatility', 'crash', 'uncertainty', 'thumbnail'],
    { stand: A(960, 760, 0.6), prop1: A(1450, 260), prop2: A(500, 260) },
    ({ u, frame }) => ({
      back: <g>
        <rect width={1920} height={1080} fill="#1E2A44" />
        {[[200, 140, 260], [800, 90, 320], [1500, 160, 300], [1100, 220, 240]].map(([x, y, r], i) => <ellipse key={i} cx={x + Math.sin(frame / 40 + i) * 20} cy={y} rx={r * 1.6} ry={r * 0.45} fill={i % 2 ? '#2E3A55' : '#3A4560'} />)}
        {/* # lightning on a beat */}
        {(frame % 90) < 6 && <g><rect width={1920} height={1080} fill="#FFFFFF" opacity={0.12} /><path d="M1320 160 L1270 330 L1320 330 L1250 520 L1380 290 L1320 290 L1370 160 Z" fill="#FFE38A" /></g>}
        {Array.from({ length: 60 }, (_, i) => { const x = (rnd(i) * 2100 + frame * 6) % 2100 - 90, y = (rnd(i + 50) * 1100 + frame * 30) % 1100 - 50
          return <rect key={`r${i}`} x={x} y={y} width={3} height={36} fill="#9FC4E8" opacity={0.4} transform={`rotate(12 ${x} ${y})`} /> })}</g>,
      mid: <g>
        {/* # a small boat riding the waves */}
        <g transform={`translate(0 ${Math.sin(frame / 10) * 18}) rotate(${Math.sin(frame / 12) * 8} 960 760)`}>
          <path d="M800 740 L1120 740 L1070 810 L850 810 Z" fill="#C94A3E" /><rect x={850} y={740} width={220} height={14} fill="#F2E6CC" />
          <rect x={955} y={520} width={10} height={220} fill="#6B4A33" /><path d="M965 530 L1080 720 L965 720 Z" fill="#F2E6CC" /><path d="M955 560 L860 720 L955 720 Z" fill="#E8D9B5" />
        </g>
        {[0, 1, 2].map((k) => <path key={k} d={`M0 ${820 + k * 80} ${Array.from({ length: 9 }, (_, i) => `Q${i * 240 + 120} ${820 + k * 80 - 60 + Math.sin(frame / 10 + i + k) * 25} ${(i + 1) * 240} ${820 + k * 80}`).join(' ')} L1920 1080 L0 1080 Z`} fill={['#2B6CB0', '#1D4A80', '#14365F'][k]} />)}
        {Array.from({ length: 8 }, (_, i) => <ellipse key={`f${i}`} cx={i * 260 + 120} cy={800 + Math.sin(frame / 10 + i) * 25} rx={50} ry={10} fill="#E8EEF5" opacity={0.7} />)}</g>,
    })),

  // ---------------------------------------------------------------- desert oasis
  makeScene('desert-oasis', 'Desert oasis', ['scarcity', 'hope', 'drought', 'opportunity', 'goal', 'cash-flow'],
    { stand: A(460, 1010, 1, 'front'), prop1: A(1300, 300), prop2: A(1450, 860, 0.8) },
    ({ u, frame }) => ({
      back: <g>
        <defs><linearGradient id={u('sky')} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2B3F7A" /><stop offset="100%" stopColor="#C2577A" /></linearGradient></defs>
        <rect width={1920} height={1080} fill={`url(#${u('sky')})`} /><circle cx={420} cy={240} r={70} fill="#FFE3A3" />
        {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 5) * 380} r={rnd(i + 9) * 2 + 1} fill="#FFFFFF" opacity={0.6} />)}
        <path d="M0 720 Q400 620 800 700 Q1200 780 1600 680 Q1800 640 1920 680 L1920 1080 L0 1080 Z" fill="#C8962E" />
        <path d="M0 820 Q500 740 1000 810 Q1500 880 1920 780 L1920 1080 L0 1080 Z" fill="#E2B85C" /></g>,
      mid: <g>
        <ellipse cx={1350} cy={880} rx={300} ry={50} fill="#2B6CB0" /><ellipse cx={1350} cy={872} rx={240} ry={32} fill="#5BCBFF" opacity={0.6} />
        {[[1170, 860, 1.1], [1540, 870, 0.9]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(frame / 50 + i) * 2})`}>
          <path d="M-8 0 Q-20 -160 20 -300 L32 -296 Q-4 -160 10 0 Z" fill="#7A5A3A" />
          {[[-140, -50], [-110, 40], [120, -30], [140, 60], [0, -110]].map(([dx, dy], k) => <path key={k} d={`M26 -300 Q${26 + dx * 0.6} ${-300 + dy - 50} ${26 + dx} ${-300 + dy + 20} Q${26 + dx * 0.5} ${-300 + dy * 0.3} 26 -290 Z`} fill={LEAF[k % 3]} />)}</g>)}
        {/* # a camel walking slowly */}
        <g transform={`translate(${(frame * 0.8) % 2200 - 200} 760)`}>
          <ellipse cx={0} cy={0} rx={70} ry={34} fill="#B88A5A" /><circle cx={-20} cy={-30} r={28} fill="#B88A5A" /><circle cx={24} cy={-26} r={24} fill="#B88A5A" />
          <path d="M60 -10 Q90 -40 84 -80 L104 -80 Q110 -40 76 6 Z" fill="#B88A5A" /><ellipse cx={104} cy={-84} rx={20} ry={12} fill="#B88A5A" />
          {[-44, -20, 26, 50].map((lx) => <rect key={lx} x={lx} y={20} width={10} height={60} fill="#8E6A42" />)}</g>
        <Plant x={1660} y={900} frame={frame} s={1.2} /></g>,
      front: <g><path d="M0 1010 Q960 980 1920 1010 L1920 1080 L0 1080 Z" fill="#D9A84E" /></g>,
    })),

  // ---------------------------------------------------------------- space
  makeScene('space', 'Space with planets', ['future', 'big-picture', 'scale', 'growth', 'ambition', 'thumbnail'],
    { stand: A(460, 960, 0.9), prop1: A(1300, 300), prop2: A(1550, 760, 0.8) },
    ({ u, frame }) => ({
      back: <g>
        <rect width={1920} height={1080} fill="#14284A" />
        <defs><radialGradient id={u('neb')}><stop offset="0%" stopColor="#A07CFF" stopOpacity={0.4} /><stop offset="100%" stopColor="#A07CFF" stopOpacity={0} /></radialGradient></defs>
        <ellipse cx={1300} cy={420} rx={700} ry={360} fill={`url(#${u('neb')})`} />
        {Array.from({ length: 120 }, (_, i) => <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 3) * 1080} r={rnd(i + 7) * 2.2 + 0.6} fill="#FFFFFF" opacity={0.4 + 0.5 * Math.abs(Math.sin(frame / 20 + i))} />)}
        <circle cx={1600} cy={260} r={130} fill="#F06B5B" /><path d="M1470 260 A130 130 0 0 0 1730 260 Q1600 300 1470 260 Z" fill="#C94A3E" />
        <ellipse cx={1600} cy={260} rx={210} ry={40} fill="none" stroke="#E9B949" strokeWidth={12} transform="rotate(-14 1600 260)" />
        <circle cx={300} cy={200} r={50} fill="#5BCBFF" /><circle cx={290} cy={190} r={14} fill="#2B6CB0" /></g>,
      mid: <g>
        {/* # the Earth with a curve of land at the bottom */}
        <circle cx={960} cy={1700} r={900} fill="#2B6CB0" />
        <path d="M300 1000 Q500 900 760 960 Q900 1000 1000 900 Q1200 850 1400 960 Q1550 1040 1700 1000 L1700 1080 L300 1080 Z" fill="#3DDC97" />
        <circle cx={960} cy={1700} r={910} fill="none" stroke="#5BCBFF" strokeWidth={14} opacity={0.35} />
        {/* # a satellite orbiting */}
        <g transform={`translate(${1100 + Math.cos(frame / 40) * 420} ${520 + Math.sin(frame / 40) * 120})`}>
          <rect x={-60} y={-14} width={44} height={28} fill="#5BCBFF" /><rect x={16} y={-14} width={44} height={28} fill="#5BCBFF" /><rect x={-16} y={-22} width={32} height={44} rx={6} fill="#E8EEF5" /></g></g>,
    })),

  // ---------------------------------------------------------------- factory town
  makeScene('factory-town', 'Factory town at night', ['industry', 'manufacturing', 'jobs', 'economy', 'workers', 'supply-chain'],
    { stand: A(420, 1010, 1, 'front'), prop1: A(1300, 260), prop2: A(1550, 840, 0.8) },
    ({ u, frame }) => ({
      back: <g><NightSky u={u} stars={30} />
        {/* # smoke rising */}
        {[1180, 1420, 1640].map((x, i) => Array.from({ length: 5 }, (_, k) => { const t = ((frame / 80 + k / 5 + i * 0.2) % 1)
          return <circle key={`${i}${k}`} cx={x + t * 120} cy={360 - t * 300} r={30 + t * 60} fill="#9AA8BC" opacity={0.35 * (1 - t)} /> }))}
        <rect x={0} y={760} width={1920} height={320} fill="#2E3A55" /></g>,
      mid: <g>
        {/* # the factory: saw-tooth roof, chimneys, lit windows */}
        <rect x={900} y={520} width={940} height={300} fill="#8E5A4A" />
        {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${900 + i * 157} 520 L${900 + i * 157} 430 L${1057 + i * 157} 520 Z`} fill="#6E4438" />)}
        {[1180, 1420, 1640].map((x) => <g key={x}><rect x={x - 26} y={300} width={52} height={230} fill="#B88A5A" /><rect x={x - 26} y={330} width={52} height={14} fill="#F0454B" /></g>)}
        {Array.from({ length: 14 }, (_, i) => <rect key={`w${i}`} x={940 + (i % 7) * 128} y={580 + Math.floor(i / 7) * 100} width={86} height={60} fill="#FFD58A" opacity={0.6 + 0.3 * Math.sin(frame / 30 + i)} />)}
        <rect x={1300} y={720} width={140} height={100} fill="#4E5E7C" />
        {/* # workers' houses */}
        {[[80, '#E8D9B5', '#B5577A'], [420, '#B8D4E8', '#3E7CC9']].map(([x, w2, r], i) => <g key={i}><House x={x as number} y={820} w={260} wall={w2 as string} roof={r as string} /></g>)}
        <StreetLamp x={800} ground={900} frame={frame} u={u} /></g>,
      front: <g><Pavement y={1010} u={u} /><rect x={0} y={890} width={1920} height={120} fill="#3A4560" /></g>,
    })),
]
