// ---------------------------------------------------------------- s32–s39: step three, invest first, spend the rest.
// A) Leo's warm apartment, payday: a calendar shows PAYDAY, the pay envelope opens; 20% of its bills slide straight down a chute into the INVESTING jar (s33);
//    $15,000 A YEAR · $1,250 A MONTH (s34).
// B) Automatic: a little conveyor carries a pay envelope each month; a gear marked AUTO tips 20% into the jar every time while Leo relaxes (s35).
// C) The rest: $60,000 A YEAR lands on a shelf with his home, food and travel lit up — the life he wants, already paid for (s36).
// D) Why first: three months — busy (briefcase), tired (moon), fun (balloons) — each still drops its coins into the jar (s37).
// E) Not ready for 20%? A dial starts at 5%; a sprout in a pot: the habit matters more than the size (s38).
// F) The job: an office tower with a GOAL flag that is crossed, then a fuel line from the tower into the brass machine (s39).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Bundle, C, City, Cross, Defs, Envelope, FONT, Grain, Jar, Machine, Tag, fadeIn, scene } from './kit'

const G = 930
const Room: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="url(#ff-room)" />
    <rect x={1300} y={250} width={420} height={330} rx={12} fill="#6C76B8" /><rect x={1300} y={250} width={420} height={330} rx={12} fill="none" stroke="#B9976E" strokeWidth={16} /><path d="M1510 250 V580" stroke="#B9976E" strokeWidth={10} />
    <rect x={0} y={G - 8} width={1920} height={160} fill="#B08A63" /><rect x={0} y={G - 8} width={1920} height={160} fill="url(#ff-tiles)" />
  </g>
)
const Calendar: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; icon?: 'case' | 'moon' | 'balloon' }> = ({ x, y, text, s = 1, o = 1, icon }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-130} width={220} height={240} rx={14} fill="#fff" /><rect x={-110} y={-130} width={220} height={60} rx={14} fill={C.red} />
    {[-60, 60].map((rx) => <rect key={rx} x={rx - 8} y={-150} width={16} height={44} rx={6} fill={C.ink} />)}
    <text y={-86} textAnchor="middle" fill="#fff" style={{ font: `400 40px ${FONT.big}` }}>{text}</text>
    {icon === 'case' && <g transform="translate(0 30)"><rect x={-60} y={-40} width={120} height={80} rx={10} fill={C.bark} /><path d="M-20 -40 V-56 H20 V-40" stroke={C.bark} strokeWidth={8} fill="none" /></g>}
    {icon === 'moon' && <g transform="translate(0 30)"><circle r={46} fill={C.violet} /><circle cx={20} cy={-14} r={40} fill="#fff" /><text x={40} y={-30} fill={C.violet} style={{ font: `400 36px ${FONT.big}` }}>z</text></g>}
    {icon === 'balloon' && <g transform="translate(0 20)">{[[-30, C.red], [10, C.amber], [40, C.teal]].map(([bx, col], k) => <g key={k}><ellipse cx={bx as number} cy={-10 - k * 8} rx={24} ry={30} fill={col as string} /><path d={`M${bx} ${20 - k * 8} Q${(bx as number) - 6} 50 0 70`} stroke={C.inkSoft} strokeWidth={2} fill="none" /></g>)}</g>}
    {!icon && <g>{Array.from({ length: 12 }, (_, k) => <rect key={k} x={-90 + (k % 4) * 46} y={-50 + Math.floor(k / 4) * 46} width={34} height={34} rx={4} fill={k === 6 ? C.cash : '#EEE6DA'} />)}</g>}
  </g>
)
const Home: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><rect x={-90} y={-120} width={180} height={120} fill={C.cream} /><path d="M-110 -110 L0 -200 L110 -110 Z" fill={C.brick} /><rect x={-22} y={-70} width={44} height={70} fill={C.bark} />{[40, -76].map((wx) => <rect key={wx} x={wx} y={-96} width={36} height={32} fill={lit > 0.5 ? C.sun : '#9CC0D8'} />)}</g>
const Food: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><path d="M-70 -90 L70 -90 L56 0 L-56 0 Z" fill="#E0B070" /><circle cx={-30} cy={-104} r={28} fill={C.red} /><rect x={6} y={-150} width={24} height={70} rx={8} fill={C.leaf} /><circle cx={44} cy={-100} r={20} fill={C.amber} /></g>
const Plane: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s}) rotate(-12)`}><path d="M-110 0 Q-110 -18 -80 -18 L90 -18 Q120 -18 130 0 Q120 18 90 18 L-80 18 Q-110 18 -110 0 Z" fill="#F4F6FA" /><path d="M-10 -14 L-60 -90 L-30 -90 L40 -14 Z M-10 14 L-60 90 L-30 90 L40 14 Z" fill="#C7D3E6" /><path d="M-100 -10 L-130 -60 L-110 -60 L-80 -12 Z" fill={C.teal} /></g>
// # a dial that reads a percent
const Dial: React.FC<{ x: number; y: number; v: number; text: string; o?: number }> = ({ x, y, v, text, o = 1 }) => {
  const a = Math.PI * (1 + v)
  return <g opacity={o} transform={`translate(${x} ${y})`}><path d="M-200 0 A200 200 0 0 1 200 0 Z" fill="#2F3A5A" /><path d="M-170 0 A170 170 0 0 1 170 0" fill="none" stroke="#E7D3B0" strokeWidth={34} />
    <path d={`M-170 0 A170 170 0 0 1 ${170 * Math.cos(a)} ${170 * Math.sin(a)}`} fill="none" stroke={C.cash} strokeWidth={34} />
    <line x1={0} y1={0} x2={130 * Math.cos(a)} y2={130 * Math.sin(a)} stroke={C.amber} strokeWidth={12} strokeLinecap="round" /><circle r={22} fill={C.brass} />
    <text y={70} textAnchor="middle" fill={C.ink} style={{ font: `400 64px ${FONT.big}` }}>{text}</text></g>
}

const First: React.FC<PieceProps> = ({ f, c }) => {
  const invest = c('s32:invest'), rest32 = c('s32:rest')
  const payday = c('s33:payday'), spends = c('s33:spends'), moves = c('s33:moves'), twenty33 = c('s33:twenty'), investing = c('s33:investing')
  const fifteen = c('s34:fifteen'), twelve = c('s34:twelve'), month = c('s34:month')
  const auto = c('s35:automatically'), lands = c('s35:lands'), never = c('s35:never')
  const lives = c('s36:lives'), sixty = c('s36:sixty'), life36 = c('s36:life'), paid = c('s36:paid')
  const why = c('s37:why'), always = c('s37:always'), busy = c('s37:busy'), tired = c('s37:tired'), fun = c('s37:fun')
  const twenty38 = c('s38:twenty'), start = c('s38:start'), five = c('s38:five'), habit = c('s38:habit'), size = c('s38:size')
  const job = c('s39:job'), goal = c('s39:goal'), fuel = c('s39:fuel'), builds = c('s39:builds'), second = c('s39:second')

  const AB = c('s35') - 6, BC = c('s36') - 6, CD = c('s37') - 6, DE = c('s38') - 6, EF = c('s39') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = scene(f, DE, EF), F = fadeIn(f, EF)
  const slice = span(f, twenty33, investing + 6)
  const monthAt = [busy, tired, fun]

  return (
    <g>
      <Defs />
      {/* # A) payday: 20% slides into the jar first */}
      {A > 0 && <g opacity={A}>
        <Room />
        <Calendar x={1180} y={400} text="PAYDAY" o={on(f, payday - 4, 8)} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [payday, 'receive', 'smiling'], [moves, 'push', 'smiling'], [fifteen, 'present', 'smiling']]} x={300} y={G} s={0.92} />
        <g transform={`translate(760 ${G - 330}) scale(${1 + 0.06 * pop(f, payday, 12)})`} opacity={on(f, invest - 6, 8)}>
          <Envelope x={0} y={0} s={1.3} text="PAY" />
          {/* # five bundles: the 20% one (one in five) drops out first */}
          {[0, 1, 2, 3].map((k) => <Bundle key={k} x={-90 + k * 60} y={-150 - (k % 2) * 10} s={0.5} o={on(f, spends, 8)} />)}
        </g>
        <path d={`M900 ${G - 420} C 1240 ${G - 420} 1500 ${G - 420} 1540 ${G - 300}`} stroke={C.brassD} strokeWidth={36} fill="none" strokeLinecap="round" opacity={on(f, moves - 6, 8)} />
        {f >= twenty33 - 2 && <g transform={`translate(${lerp(900, 1560, slice)} ${lerp(G - 480, G - 220, slice) - 60 * Math.sin(Math.PI * slice)}) rotate(${40 * slice})`}><Bundle x={0} y={0} s={0.9} /></g>}
        <Tag x={900} y={G - 560} text="20% FIRST" size={46} o={on(f, twenty33, 8)} color={C.cash} ink="#fff" />
        <Jar x={1560} y={G} level={0.15 + 0.2 * span(f, investing, fifteen)} s={0.95} label="INVESTING" o={on(f, moves - 6, 8)} />
        <Tag x={760} y={G - 40} text="$15,000 A YEAR" size={44} o={on(f, fifteen, 8)} point="none" color={C.sun} />
        <Tag x={760} y={G + 40} text="$1,250 A MONTH" size={44} o={on(f, twelve, 8)} point="none" />
      </g>}

      {/* # B) automatic, every month */}
      {B > 0 && <g opacity={B}>
        <Room />
        <rect x={140} y={G - 300} width={1200} height={30} rx={15} fill="#4B5578" opacity={on(f, AB, 8)} />
        {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={200 + k * 216} cy={G - 285} r={22} fill="#2E3552" />)}
        {[0, 1, 2].map((k) => { const at = auto + k * 40, x = lerp(160, 1180, span(f, at, at + 60)); return f >= at - 2 ? <g key={k} opacity={on(f, at - 2, 6) * (1 - span(f, at + 54, at + 62))} transform={`translate(${x} ${G - 360})`}><Envelope x={0} y={0} s={0.6} text="PAY" /></g> : null })}
        <g transform={`translate(1300 ${G - 380}) rotate(${f * 4})`} opacity={on(f, auto - 4, 8)}>{Array.from({ length: 8 }, (_, i) => <rect key={i} x={-12} y={-82} width={24} height={30} rx={5} fill={C.brassD} transform={`rotate(${i * 45})`} />)}<circle r={64} fill={C.brass} /><circle r={26} fill={C.brassL} /></g>
        <Tag x={1300} y={G - 520} text="AUTO" size={50} o={on(f, auto, 8)} color={C.cash} ink="#fff" />
        <Jar x={1560} y={G} level={0.35 + 0.35 * span(f, auto, never + 20)} s={0.95} label="INVESTING" />
        <Calendar x={420} y={430} text="SAME DAY" o={on(f, lands - 6, 8)} s={0.9} />
        <Person f={f} who="investor" beats={[[0, 'relax', 'smiling'], [never, 'leanBack', 'smiling']]} x={760} y={G} s={0.85} o={on(f, never - 10, 8)} />
        <Tag x={760} y={G + 60} text="NEVER DECIDES AGAIN" size={38} o={on(f, never + 4, 8)} point="none" />
      </g>}

      {/* # C) the rest is the life he wants */}
      {Cc > 0 && <g opacity={Cc}>
        <City sky="day" f={f} sun={[1700, 260]} ground={G} />
        <g transform={`translate(560 ${G - 420}) scale(${1 + 0.05 * pop(f, sixty, 12)})`} opacity={on(f, lives - 4, 8)}><Envelope x={0} y={0} s={1.2} text="THE REST" /></g>
        <Tag x={560} y={G - 600} text="$60,000 A YEAR" size={50 * (1 + 0.1 * pop(f, c('s36:year'), 12))} o={on(f, sixty, 8)} color={C.sun} />
        <Home x={360} y={G} o={on(f, life36 - 4, 8)} lit={on(f, paid, 6)} /><Food x={760} y={G} o={on(f, life36, 8)} /><Plane x={1100} y={G - 160} o={on(f, life36 + 4, 8)} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [life36, 'celebrate', 'smiling']]} x={1480} y={G} s={0.92} flip />
        <Tag x={760} y={G + 60} text="THE LIFE HE WANTS, ALREADY PAID FOR" size={38} o={on(f, paid - 4, 8)} point="none" color={C.cash} ink="#fff" />
      </g>}

      {/* # D) why first: every kind of month */}
      {D > 0 && <g opacity={D}>
        <Room />
        {monthAt.map((at, k) => <g key={k}><Calendar x={360 + k * 400} y={480} text={['BUSY', 'TIRED', 'FUN'][k]} icon={(['case', 'moon', 'balloon'] as const)[k]} o={on(f, at - 4, 8)} s={1.05} />
          {[0, 1].map((j) => { const a = at + 8 + j * 7, t = span(f, a, a + 18); return f >= a && t < 1 ? <g key={j} transform={`translate(${lerp(360 + k * 400, 1640, t)} ${lerp(620, G - 200, t) - 120 * Math.sin(Math.PI * t)})`}><ellipse rx={20} ry={9} fill={C.goldD} /><ellipse cy={-3} rx={20} ry={9} fill={C.gold} /></g> : null })}</g>)}
        <Jar x={1640} y={G} level={0.4 + 0.3 * span(f, busy, fun + 30)} s={0.9} label="INVESTING" />
        <Tag x={760} y={G + 40} text="IT ALWAYS HAPPENS" size={46} o={on(f, always, 8)} point="none" color={C.cash} ink="#fff" />
      </g>}

      {/* # E) start small */}
      {E > 0 && <g opacity={E}>
        <City sky="day" f={f} sun={[1700, 260]} ground={G} />
        <Dial x={620} y={G - 160} v={f < five ? 0.2 : lerp(0.2, 0.05, span(f, five, five + 14))} text={f < five ? '20%' : '5%'} o={on(f, twenty38 - 4, 8)} />
        <Tag x={620} y={G + 50} text="START WITH WHAT YOU CAN" size={40} o={on(f, start, 8)} point="none" />
        <g opacity={on(f, habit - 4, 8)} transform={`translate(1320 ${G})`}>
          <path d="M-90 0 L-70 -150 L70 -150 L90 0 Z" fill={C.brick} /><rect x={-80} y={-170} width={160} height={30} rx={8} fill={C.brickD} />
          <g transform={`translate(0 -170) scale(${lerp(0.4, 1, span(f, habit, size + 20))}) translate(0 170)`}><path d="M0 -170 V-320" stroke={C.leafD} strokeWidth={12} /><path d="M0 -270 Q-80 -300 -90 -360 Q-20 -350 0 -270 Z M0 -300 Q70 -330 90 -390 Q20 -380 0 -300 Z" fill={C.leaf} /></g>
        </g>
        <Tag x={1320} y={G + 50} text="THE HABIT MATTERS MOST" size={40} o={on(f, habit + 6, 8)} point="none" color={C.cash} ink="#fff" />
      </g>}

      {/* # F) the job is the fuel */}
      {F > 0 && <g opacity={F}>
        <City sky="dawn" f={f} sun={[960, 520]} ground={G} />
        <g transform={`translate(440 ${G})`} opacity={on(f, job - 4, 8)}>
          <rect x={-150} y={-440} width={300} height={440} fill="#7D93B8" />{Array.from({ length: 18 }, (_, k) => <rect key={k} x={-120 + (k % 3) * 90} y={-410 + Math.floor(k / 3) * 66} width={60} height={40} rx={3} fill={C.sunL} opacity={0.9} />)}
          <g opacity={win(f, goal - 6, fuel, 8)}><rect x={-4} y={-600} width={8} height={160} fill={C.bark} /><path d="M4 -600 L120 -570 L4 -540 Z" fill={C.gold} /><text x={50} y={-562} textAnchor="middle" fill={C.ink} style={{ font: `400 24px ${FONT.big}` }}>GOAL</text><Cross x={40} y={-560} r={80} p={on(f, goal + 2, 12)} /></g>
        </g>
        <Tag x={440} y={G + 60} text="LEO'S JOB" size={40} o={on(f, job, 8)} point="none" />
        <g opacity={on(f, fuel - 4, 8)}>
          <path d={`M590 ${G - 200} C 900 ${G - 200} 1000 ${G - 120} 1240 ${G - 120}`} stroke={C.brassD} strokeWidth={34} fill="none" strokeLinecap="round" />
          <path d={`M590 ${G - 200} C 900 ${G - 200} 1000 ${G - 120} 1240 ${G - 120}`} stroke={C.sun} strokeWidth={14} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="0.05 0.05" strokeDashoffset={-f / 40} />
          <Tag x={900} y={G - 280} text="FUEL" size={50} o={on(f, fuel, 8)} color={C.amber} />
        </g>
        <Machine x={1420} y={G} f={f} s={0.9} run={on(f, builds, 20)} plate="SECOND PAYCHECK" glow={0.6 * on(f, second, 14)} o={on(f, fuel - 4, 8)} />
      </g>}

      <Headline f={f} lines={[[invest, 'STEP 3: INVEST FIRST, SPEND THE REST', C.ink, 90], [rest32 + 30, 'EVERY PAYDAY: 20% FIRST', C.ink, 100], [auto, 'IT HAPPENS AUTOMATICALLY', C.ink, 100], [lives, 'THEN LIVE ON THE REST', C.ink, 104],
        [why, 'WHY FIRST?', C.ink, 108], [twenty38, 'START WHERE YOU CAN', C.ink, 104], [job, 'YOUR JOB IS THE FUEL', C.ink, 104]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s36:year", 's32:invest', 's32:rest', 's33:payday', 's33:spends', 's33:moves', 's33:twenty', 's33:investing', 's34:fifteen', 's34:twelve', 's34:month', 's35:automatically', 's35:lands', 's35:never',
  's36:lives', 's36:sixty', 's36:life', 's36:paid', 's37:why', 's37:always', 's37:busy', 's37:tired', 's37:fun', 's38:twenty', 's38:start', 's38:five', 's38:habit', 's38:size', 's39:job', 's39:goal', 's39:fuel', 's39:builds', 's39:second']
export const FF_FIRST = makePiece('ff-first', 'Freedom step three: Leo in his warm apartment on PAYDAY, the pay envelope opens and one bundle (20% FIRST) slides down a brass chute into the INVESTING jar ($15,000 A YEAR, $1,250 A MONTH); a conveyor carries monthly pay envelopes past an AUTO gear into the jar, a SAME DAY calendar, Leo leans back (NEVER DECIDES AGAIN); THE REST envelope $60,000 A YEAR over his home, food and travel (THE LIFE HE WANTS, ALREADY PAID FOR); BUSY, TIRED and FUN month calendars each drop coins into the jar (IT ALWAYS HAPPENS); a dial from 20% to 5% (START WITH WHAT YOU CAN), a sprout grows (THE HABIT MATTERS MOST); LEO\'S JOB tower with a GOAL flag crossed, a FUEL line into the SECOND PAYCHECK machine', {
  mood: 'light', Component: First, beats: BEATS,
  sfx: [['s33:payday', 'chime', 0.15], ['s33:twenty', 'swish', 0.15], ['s34:fifteen', 'coin', 0.15], ['s35:automatically', 'pop', 0.12], ['s36:sixty', 'pop', 0.12], ['s37:busy', 'coin', 0.1], ['s37:tired', 'coin', 0.1], ['s37:fun', 'coin', 0.1], ['s39:fuel', 'chime', 0.15]] })
