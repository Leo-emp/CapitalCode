// ---------------------------------------------------------------- s1–s8: the hook (night).
// A) Your room at night: a warm lamp, the city through the window. Mia (made-up) sits on the bed edge with her
//    investing app; an index-fund card and a retirement card float by her ("you probably felt it"). On "red" the
//    phone floods red, rows drop in: NVDA -9.3%, AMD, MU, S&P 500, NASDAQ.
// B) Out the window into CHIP CITY: a giant glowing Nvidia chip under a night sky. On "lost" it cracks, the glow
//    dies, and a red counter runs to -$440 BILLION. Two falling index arrows: NASDAQ -5.5%, S&P 500 -4.4%; every
//    district's lights go out.
// C) Mia wonders: CRASH? SELL? A light bulb — one simple idea. Two days later the chip city flickers back on and a
//    green arrow climbs. Four neon street signs light up: WHAT HAPPENED · WHY AN ELECTION · ONE COMPANY · WORRY?
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { AMBER, AppPhone, ChipCity, Floor, NEON, RED, Room, Sky, Skyline } from './kit'

const K = {
  you: 's1:you', share1: 's1:share', nvidia1: 's1:nvidia', index1: 's1:index', fund1: 's1:fund', retirement: 's1:retirement', felt: 's1:felt', thursday1: 's1:thursday',
  know: 's2:know', sinking: 's2:sinking', open2: 's2:open', app: 's2:app', everything: 's2:everything', red: 's2:red', november: 's2:november', exactly: 's2:exactly', saw: 's2:saw',
  company3: 's3:company', nvidia3: 's3:nvidia', chips3: 's3:chips', intelligence: 's3:intelligence', lost3: 's3:lost', k440: 's3:440', billion3: 's3:billion', value3: 's3:value', day3: 's3:day',
  nasdaq4: 's4:nasdaq', fell4: 's4:fell', percent4: 's4:percent', sp4: 's4:sp', fell4b: 's4:fell#2', percent4b: 's4:percent#2', every4: 's4:every', down4: 's4:down',
  thinking: 's5:thinking', crash5: 's5:crash', sell5: 's5:sell', worse: 's5:worse',
  dont6: "s6:don't", wall: 's6:wall', expert: 's6:expert', understand: 's6:understand', comes: 's6:comes', simple6: 's6:simple', idea: 's6:idea',
  because7: 's7:because', trading: 's7:trading', later7: 's7:later', stocks7: 's7:stocks', jumped: 's7:jumped', up7: 's7:up',
  today8: 's8:today', step8: 's8:step', happened8: 's8:happened', why8: 's8:why', election8: 's8:election', how8: 's8:how', dragged: 's8:dragged', whether: 's8:whether', worry: 's8:worry',
}
type Key = keyof typeof K

// # a neon street sign for a step (fresh drawing for this video)
const StepSign: React.FC<{ x: number; y: number; n: number; t: string; o: number; lit: number }> = ({ x, y, n, t, o, lit }) => (
  <g transform={`translate(${x} ${y}) scale(0.85)`} opacity={o}>
    <rect x={-6} y={0} width={12} height={340} fill="#2A2050" />
    <rect x={-190} y={-110} width={380} height={130} rx={18} fill="#141230" stroke={lit > 0.5 ? NEON : '#4E4A88'} strokeWidth={6} />
    {lit > 0 && <rect x={-200} y={-120} width={400} height={150} rx={22} fill={NEON} opacity={0.15 * lit} />}
    <circle cx={-140} cy={-45} r={34} fill={lit > 0.5 ? NEON : '#4E4A88'} /><Label x={-140} y={-30} text={`${n}`} size={46} font="Bebas Neue" color="#0A0820" />
    <Label x={30} y={-28} text={t} size={42} font="Bebas Neue" color="#E8E6FF" />
  </g>
)
// # a small floating card (index fund / retirement account)
const Card: React.FC<{ x: number; y: number; t: string; col: string; o: number }> = ({ x, y, t, col, o }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}><rect x={-150} y={-55} width={300} height={110} rx={18} fill={col} /><rect x={-150} y={-55} width={300} height={110} rx={18} fill="none" stroke="#FFFFFF" strokeOpacity={0.4} strokeWidth={4} /><Label x={0} y={14} text={t} size={40} font="Bebas Neue" color="#FFFFFF" /></g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.company3 - 8, BC = q.thinking - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const red = on(f, q.red, 14)
  const mia: Beat[] = [[0, 'phone', 'neutral'], [q.felt, 'phone', 'worried'], [q.red, 'shock', 'shocked'], [q.saw, 'phone', 'worried'],
    [BC, 'think', 'thinking'], [q.sell5, 'nervous', 'worried'], [q.dont6, 'idle', 'neutral'], [q.idea, 'pointUp', 'smiling'], [q.jumped, 'relief', 'smiling'], [q.today8, 'explain', 'smiling']]
  const counter = Math.round(440 * span(f, q.k440, q.billion3 + 10))
  const relight = on(f, q.jumped, 20)
  return (
    <g>
      <Stage id="nv-hook" frame={f} />
      {/* # A) your room, your app */}
      {A > 0 && <g opacity={A}>
        <Room id="nvh-room" lamp={1 - 0.6 * red} />
        <rect x={0} y={0} width={1920} height={1080} fill={RED} opacity={0.12 * red} />
        <Card x={760} y={330} t="INDEX FUND" col="#2F5FD0" o={win(f, q.index1, q.app, 8)} />
        <Card x={760} y={480} t="RETIREMENT ACCOUNT" col="#7A5AA8" o={win(f, q.retirement, q.app, 8)} />
        <Person f={f} who="investorF" beats={mia} x={420} y={900} s={1.05} />
        <g transform={`translate(${lerp(1060, 1000, on(f, q.open2, 14))} ${lerp(640, 560, on(f, q.open2, 14))})`}><AppPhone x={0} y={0} s={lerp(0.6, 0.95, on(f, q.open2, 14))} r={-4} red={red} /></g>
        <g opacity={on(f, q.november, 8)}><Label x={1570} y={640} text="THURSDAY, NOV 5" size={56} font="Bebas Neue" color={AMBER} /></g>
      </g>}
      {/* # B) chip city cracks */}
      {B > 0 && <g opacity={B}>
        <Sky id="nvh-sky" top="#0B0A2A" bottom="#26134A" glow={lerp(0, 1, 1) > 0 ? NEON : undefined} gx={960} gy={720} f={f} />
        <Skyline y={820} col="#120E33" seed={2} o={1 - 0.6 * on(f, q.every4, 20)} />
        <Floor id="nvh-floor" y={820} top="#1A1240" bottom="#07061A" />
        <ChipCity id="nvh-chip" x={960} y={640} s={1.15} crack={on(f, q.lost3, 16)} dim={on(f, q.lost3, 30)} />
        <g opacity={on(f, q.k440, 8)} transform={`translate(960 ${300 - 10 * pop(f, q.billion3, 12)})`}><rect x={-330} y={-80} width={660} height={130} rx={24} fill="#1A0A1E" stroke={RED} strokeWidth={6} />
          <Label x={0} y={24} text={`-$${counter} BILLION`} size={92} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, q.value3, 8) * (1 - on(f, q.nasdaq4, 8))}><Label x={960} y={930} text="OF VALUE, IN ONE DAY" size={50} font="Bebas Neue" color="#E8E6FF" /></g>
        {([[400, q.nasdaq4, q.percent4, 'NASDAQ -5.5%'], [1520, q.sp4, q.percent4b, 'S&P 500 -4.4%']] as [number, number, number, string][]).map(([x, at, pct, t], k) =>
          <g key={k} opacity={on(f, at, 8)}><path d={`M${x} 420 L${x} ${420 + 260 * on(f, at, 24)}`} stroke={RED} strokeWidth={22} strokeLinecap="round" />
            <path d={`M${x - 50} ${380 + 260 * on(f, at, 24)} L${x} ${450 + 260 * on(f, at, 24)} L${x + 50} ${380 + 260 * on(f, at, 24)}`} fill={RED} />
            <Label x={x} y={360} text={t} size={58} font="Bebas Neue" color={RED} o={on(f, pct, 8)} /></g>)}
        <g opacity={on(f, q.every4, 8)}><Label x={960} y={980} text="EVERY PART OF THE MARKET WENT DOWN" size={46} font="Bebas Neue" color="#FFB3BA" /></g>
      </g>}
      {/* # C) crash? sell? one idea; the bounce; four signs */}
      {C > 0 && <g opacity={C}>
        <Sky id="nvh-sky2" top="#0B0A2A" bottom={relight > 0.5 ? '#123A3A' : '#26134A'} glow={NEON} gx={1300} gy={760} f={f} />
        <Skyline y={840} col="#120E33" seed={5} />
        <Floor id="nvh-floor2" y={840} top="#1A1240" bottom="#07061A" />
        <g opacity={1 - on(f, q.today8, 12)}>
          <ChipCity id="nvh-chip2" x={1300} y={660} s={0.95} crack={1 - relight} dim={1 - relight} />
          <g opacity={win(f, q.crash5, q.dont6, 8)}><Label x={620} y={360} text="A CRASH?" size={80} font="Bebas Neue" color={RED} /></g>
          <g opacity={win(f, q.sell5, q.dont6, 8)}><Label x={620} y={460} text="SELL NOW?" size={80} font="Bebas Neue" color={RED} /></g>
          <g opacity={win(f, q.comes, q.because7, 8)} transform={`translate(560 ${380 - 10 * pop(f, q.idea, 12)})`}>
            <circle r={70} fill={AMBER} opacity={0.9} /><circle r={120} fill={AMBER} opacity={0.18} /><rect x={-30} y={66} width={60} height={40} rx={8} fill="#8C8CB0" />
            <Label x={0} y={170} text="ONE SIMPLE IDEA" size={48} font="Bebas Neue" color={AMBER} /></g>
          <g opacity={on(f, q.jumped, 10)} transform={`translate(1640 ${520 - 120 * on(f, q.jumped, 24)})`}><path d="M0 -70 L60 10 L22 10 L22 120 L-22 120 L-22 10 L-60 10 Z" fill={NEON} /><Label x={0} y={180} text="2 DAYS LATER: BACK UP" size={44} font="Bebas Neue" color={NEON} /></g>
        </g>
        <Person f={f} who="investorF" beats={mia} x={lerp(300, 220, on(f, q.today8, 14))} y={840} s={0.95} />
        {([[q.happened8, 'WHAT HAPPENED'], [q.election8, 'WHY AN ELECTION'], [q.dragged, 'ONE COMPANY'], [q.worry, 'SHOULD YOU WORRY?']] as [number, string][]).map(([at, t], k) =>
          <StepSign key={k} x={620 + k * 350} y={560 - 14 * pop(f, at, 14)} n={k + 1} t={t} o={on(f, at, 8)} lit={win(f, at, at + 30, 6)} />)}
      </g>}
      <Headline f={f} lines={[[q.you, 'YOU MIGHT NOT OWN NVIDIA…', '#E8E6FF', 96], [q.index1, '…BUT YOU PROBABLY FELT IT', '#E8E6FF', 96], [q.red, 'EVERYTHING WAS RED', RED, 104],
        [q.company3, 'ONE COMPANY, ONE DAY', '#E8E6FF', 104], [q.nasdaq4, 'THE WHOLE MARKET FELL', '#E8E6FF', 100], [q.thinking, 'WAS THAT A CRASH?', '#E8E6FF', 104], [q.dont6, 'NO EXPERT NEEDED', '#E8E6FF', 104],
        [q.because7, 'THEN IT BOUNCED', NEON, 108], [q.today8, 'STEP BY STEP', '#E8E6FF', 110]]} />
      <Vignette id="nv-hook" />
    </g>
  )
}

export const NV_HOOK = makePiece('nv-hook', 'Nvidia sell-off hook (night): Mia on her bed in a lamp-lit room with the city in the window, index fund and retirement cards float by, her investing app floods red with NVDA -9.3%, AMD -17.3%, MU -17.5%, S&P 500 -4.4%, NASDAQ -5.5%; out into chip city — a giant glowing Nvidia chip cracks and goes dark under a counter running to -$440 BILLION, red arrows for NASDAQ -5.5% and S&P 500 -4.4%, the skyline lights go out; CRASH? SELL NOW? then a light bulb (one simple idea); the chip relights and a green arrow climbs (2 days later back up); four neon street signs for the steps', {
  mood: 'dark', Component: Hook, beats: Object.values(K),
  sfx: [['s2:red', 'impact', 0.25], ['s3:lost', 'crack', 0.3], ['s3:billion', 'thud', 0.25], ['s6:idea', 'ding', 0.2], ['s7:jumped', 'riser', 0.2], ['s8:happened', 'pop', 0.2]] })
