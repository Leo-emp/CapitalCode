// ---------------------------------------------------------------- s1–s8: the personal hook (owner rule r81)
// A) s1  a warm classroom: the chalkboard draws a triangle and its area formula; Maya points at it, then a
//        paycheck envelope lands on the teacher's desk, opens on "paycheck" and shows "$ ?" — she shrugs.
// B) s2  three classmates join; a 28-bubble MONEY TEST slides in and fills; half the marks come back wrong
//        and a red 49% is circled on "percent".
// C) s3  the lamp-lit study: a giant gold coin flips; it lands and three things rise on the desk on their
//        words: a house (rent), a credit card (debt), a rocking chair (the age you stop working).
// D) s4  a till on the desk prints a long receipt: MONEY MISTAKES / 2025 … total $948 on "dollars"; a man reacts.
// E) s5–s6 Maya wonders about a finance degree (cap appears, then a clean cross on "don't"); ten index cards
//        deal out across the desk on "ten index cards"; one lifts and glows on "one simple idea".
// F) s7–s8 the cards climb into a staircase: card 1 holds a paycheck ("last Friday"), the top card grows a money
//        plant on "grow"; the lamp dims and the moon glows on "sleep"; the ten cards light one by one on
//        "one at a time", and every card flips to the same % mark on "same idea".
import React from 'react'
import { lerp, on, pop, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Sweep } from './kit2'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { C, Card, Check, Coin, CreditCard, Cross, DESK, Defs, FONT, GradCap, Grain, House, Lamp, MoneyPlant, Paycheck, PctBadge, RockingChair, Study, Tag, TestSheet, Till, fadeIn, scene } from './kit'

const FLOOR = 940

// # the classroom: warm wall, big chalkboard, window light, teacher's desk on the right, wooden floor
const Classroom: React.FC<{ f: number; tri: number; formula: number }> = ({ f, tri, formula }) => (
  <g>
    <rect width={1920} height={1080} fill="url(#fl-class)" />
    {/* # window light bands */}
    <path d="M1500 0 L1760 0 L1400 940 L1140 940 Z" fill="#fff" opacity={0.18} />
    {/* # chalkboard */}
    <g transform="translate(140 230)">
      <rect x={-22} y={-22} width={964} height={504} rx={14} fill={C.walnut} />
      <rect width={920} height={460} rx={6} fill="url(#fl-chalk)" />
      <rect x={0} y={448} width={920} height={26} fill={C.walnutL} />
      {/* # chalk triangle draws on */}
      <path d="M140 380 L460 380 L300 110 Z" fill="none" stroke={C.chalkL} strokeWidth={8} strokeLinejoin="round" strokeDasharray="1000" strokeDashoffset={1000 * (1 - tri)} opacity={0.92} />
      <path d="M300 110 L300 380" stroke={C.chalkL} strokeWidth={4} strokeDasharray="12 12" opacity={0.7 * tri} />
      <text x={312} y={260} fill={C.chalkL} opacity={tri} style={{ font: `400 44px ${FONT.big}` }}>H</text>
      <text x={290} y={430} fill={C.chalkL} opacity={tri} style={{ font: `400 44px ${FONT.big}` }}>B</text>
      <text x={510} y={270} fill={C.brassL} opacity={formula} style={{ font: `400 92px ${FONT.big}`, letterSpacing: 3 }}>A = ½ × B × H</text>
      <path d="M510 300 Q 680 320 860 296" stroke={C.brassL} strokeWidth={5} fill="none" opacity={formula} strokeLinecap="round" />
    </g>
    {/* # floor */}
    <rect x={0} y={FLOOR - 10} width={1920} height={160} fill="url(#fl-floor)" /><rect x={0} y={FLOOR - 10} width={1920} height={160} fill="url(#fl-boards)" />
    <rect x={0} y={FLOOR - 24} width={1920} height={16} fill={C.paperD} />
    {/* # teacher's desk on the right */}
    <g transform={`translate(1600 ${FLOOR})`}>
      <ellipse cx={0} cy={6} rx={260} ry={18} fill="#000" opacity={0.18} />
      <rect x={-240} y={-300} width={480} height={36} rx={8} fill={C.walnutL} />
      <rect x={-220} y={-266} width={440} height={266} fill={C.walnut} /><rect x={-220} y={-266} width={440} height={30} fill="#000" opacity={0.12} />
      <rect x={-60} y={-210} width={120} height={14} rx={7} fill={C.walnutD} />
      {/* # an apple */}
      <circle cx={170} cy={-332} r={30} fill={C.tomato} /><rect x={166} y={-372} width={8} height={18} fill={C.walnutD} /><ellipse cx={184} cy={-372} rx={14} ry={7} fill={C.cash} />
    </g>
    {/* # clock */}
    <g transform="translate(1820 200)"><circle r={56} fill={C.paper} stroke={C.walnut} strokeWidth={8} /><line x1={0} y1={0} x2={0} y2={-40} stroke={C.ink} strokeWidth={6} strokeLinecap="round" transform={`rotate(${f * 0.6})`} /><line x1={0} y1={0} x2={28} y2={0} stroke={C.ink} strokeWidth={6} strokeLinecap="round" /></g>
  </g>
)

// # a school desk (front view) for a classmate
const SchoolDesk: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={170} ry={14} fill="#000" opacity={0.16} />
    <rect x={-160} y={-190} width={320} height={26} rx={6} fill={C.walnutL} />
    <rect x={-146} y={-166} width={16} height={166} fill={C.inkSoft} /><rect x={130} y={-166} width={16} height={166} fill={C.inkSoft} />
    <rect x={-150} y={-166} width={300} height={60} fill={C.walnut} />
  </g>
)

// # a stopwatch (for "about a minute")
const Stopwatch: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-12} y={-74} width={24} height={20} rx={4} fill={C.brassD} />
    <circle r={56} fill={C.brass} /><circle r={46} fill={C.paper} />
    <path d={`M0 0 L0 -46 A46 46 0 ${t > 0.5 ? 1 : 0} 1 ${46 * Math.sin(t * 2 * Math.PI)} ${-46 * Math.cos(t * 2 * Math.PI)} Z`} fill={C.teal} opacity={0.5} />
    <line x1={0} y1={0} x2={40 * Math.sin(t * 2 * Math.PI)} y2={-40 * Math.cos(t * 2 * Math.PI)} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
  </g>
)

// # 28 marks: 14 right (a little under half shown as 49%) in a scattered order
const MARKS = [1, -1, 1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, -1, 1, -1, -1, 1, 1, -1, 1, -1, 1, -1, -1, 1, 1, -1]

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const taught = c('s1:taught'), area = c('s1:area'), triangle = c('s1:triangle'), nobody = c('s1:nobody'), explained = c('s1:explained'), paycheck1 = c('s1:paycheck')
  const only = c('s2:only'), test = c('s2:test'), twenty = c('s2:twenty'), questions = c('s2:questions'), adults2 = c('s2:adults'), forty = c('s2:forty'), percent2 = c('s2:percent'), average = c('s2:average')
  const coin = c('s3:coin'), flip = c('s3:flip'), rent = c('s3:rent'), debt = c('s3:debt'), age = c('s3:age'), stop = c('s3:stop')
  const price = c('s4:price'), survey = c('s4:survey'), mistakes = c('s4:mistakes'), nine = c('s4:nine'), dollars4 = c('s4:dollars'), year4 = c('s4:year')
  const thinking = c('s5:thinking'), degree = c('s5:degree'), dont = c("s5:don't")
  const imagine = c('s6:imagine'), ten6 = c('s6:ten'), cards6 = c('s6:cards'), simple = c('s6:simple'), minute = c('s6:minute')
  const start7 = c('s7:start'), paycheck7 = c('s7:paycheck'), friday = c('s7:friday'), up7 = c('s7:up'), grow = c('s7:grow'), sleep = c('s7:sleep')
  const ten8 = c('s8'), time8 = c('s8:time'), end8 = c('s8:end'), same = c('s8:same'), idea = c('s8:idea')

  const AB = c('s2') - 4, BC = c('s3') - 6, CD = c('s4') - 6, DE = c('s5') - 6, EF = c('s7') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = scene(f, DE, EF), F = fadeIn(f, EF)

  // # A/B) the classroom stays across s1–s2 (only people and the test change)
  const erase = 1 - on(f, AB, 16)   // # the board is wiped as the classmates arrive
  const tri = span(f, triangle - 6, triangle + 22) * erase, formula = on(f, area + 4, 10) * erase
  const mayaA: Beat[] = [[0, 'explain', 'smiling'], [triangle, 'point', 'smiling'], [nobody, 'shrug', 'worried'], [paycheck1, 'scratchHead', 'thinking']]
  const payOpen = on(f, paycheck1 + 4, 14)

  // # B) the test bubbles fill one by one over "twenty eight questions"; marks come back on "forty nine"
  const filled = Math.floor(28 * span(f, twenty, questions + 18))
  const marked = Math.floor(28 * span(f, adults2, forty + 10))

  // # C) the coin: rises and spins on "coin", lands on "flip" end
  const coinUp = Math.sin(Math.PI * span(f, coin, flip + 22)) * 220
  const coinTurn = 3 * easeInOut(span(f, coin, flip + 22))

  // # E) ten cards deal from a deck at the lamp to a 5 x 2 grid
  const deal = (k: number) => lerp(ten6, cards6 + 14, k / 9)
  const gridXY = (k: number): [number, number] => [620 + (k % 5) * 250, DESK + 40 + Math.floor(k / 5) * 150]
  // # F) the staircase positions (card k climbs from bottom-left to top-right)
  const stairXY = (k: number): [number, number] => [260 + k * 155, 900 - k * 58]
  const climb = easeInOut(span(f, EF, start7 + 20))
  const lit = (k: number) => on(f, lerp(ten8, time8 + 10, k / 9), 6)
  const flipT = (k: number) => span(f, lerp(same, idea + 8, k / 9), lerp(same, idea + 8, k / 9) + 10)

  return (
    <g>
      <Defs />

      {/* ---------------- A + B) classroom ---------------- */}
      {(A > 0 || B > 0) && <g opacity={Math.max(A, B)}>
        <Classroom f={f} tri={tri} formula={formula} />
        {/* # A: Maya at the board, then the paycheck on the teacher's desk */}
        <g opacity={A}>
          <Person f={f} who="investorF" beats={mayaA} x={1190} y={FLOOR} s={1} flip />
          <g opacity={on(f, explained - 4, 10)}>
            <Paycheck x={1600} y={FLOOR - 400 + 40 * (1 - pop(f, explained - 4, 14))} s={0.9} open={payOpen} amount="$ ?" />
          </g>
          <Tag x={1600} y={FLOOR - 640} text="YOUR PAYCHECK" o={on(f, paycheck1, 8)} size={40} point="down" color={C.paper} />
        </g>
        {/* # B: three classmates at desks, the test on the right */}
        <g opacity={B}>
          {(['buyer', 'worker', 'investorF'] as const).map((who, k) => (
            <g key={who} opacity={on(f, AB + k * 6, 10)}>
              <Person f={f} who={who} beats={[[0, 'idle', 'neutral'], [test, 'read', 'thinking'], [forty + k * 4, k === 1 ? 'facepalm' : 'scratchHead', 'worried'], [average, k === 2 ? 'shrug' : 'nervous', 'worried']]} x={260 + k * 330} y={FLOOR} s={0.78} />
              <SchoolDesk x={260 + k * 330} y={FLOOR} s={0.82} />
            </g>
          ))}
          <TestSheet x={1500} y={FLOOR - 360 + 80 * (1 - on(f, test - 4, 14))} s={0.82} r={-3} o={on(f, test - 4, 10)}
            marks={MARKS.map((m, i) => (i < marked ? m : i < filled ? 2 : 0))} score="49%" scoreP={on(f, percent2, 10)} />
          {/* # filled-but-unmarked bubbles: dot only (drawn by TestSheet when mark ≠ 0) */}
        </g>
      </g>}

      {/* ---------------- C) the study: coin flip → rent, debt, stopping work ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} />
        <Lamp x={1700} />
        <Coin x={960} y={DESK - 290 - coinUp * 0.6} r={110} turn={coinTurn} />
        <ellipse cx={960} cy={DESK + 10} rx={110 - coinUp * 0.2} ry={14} fill="#000" opacity={0.2} />
        <g opacity={on(f, rent - 2, 10)} transform={`translate(0 ${30 * (1 - pop(f, rent - 2, 14))})`}><House x={480} y={DESK + 120} s={1.15} /><Tag x={480} y={DESK + 170} text="RENT" size={40} point="up" o={on(f, rent, 8)} /></g>
        <g opacity={on(f, debt - 2, 10)} transform={`translate(0 ${30 * (1 - pop(f, debt - 2, 14))})`}><CreditCard x={1440} y={DESK + 40} s={1.1} r={-8} /><Tag x={1440} y={DESK + 170} text="DEBT" size={40} point="up" o={on(f, debt, 8)} /></g>
        <g opacity={on(f, age - 2, 10)}><RockingChair x={960} y={DESK + 150} s={1} rock={4 * Math.sin(f / 12)} /><Tag x={960} y={DESK + 200} text="STOP WORKING" size={36} point="up" o={on(f, stop, 8)} /></g>
      </g>}

      {/* ---------------- D) the price of not knowing: a long receipt ---------------- */}
      {D > 0 && <g opacity={D}>
        <Study f={f} lamp={0.9} />
        <Lamp x={1720} s={0.9} />
        <Till x={860} y={DESK + 120} s={0.9} p={span(f, survey, dollars4 + 6)} lines={[['MONEY'], ['MISTAKES'], ['FROM NOT'], ['KNOWING'], ['IN 2025']]} total="$948" />
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [price, 'think', 'thinking'], [mistakes, 'read', 'worried'], [nine, 'shock', 'shocked'], [year4, 'facepalm', 'worried']]} x={1320} y={1060} s={0.95} flip />
        <Tag x={860} y={DESK + 236} text="ESTIMATED, PER ADULT" size={34} point="none" o={on(f, dollars4 + 4, 8)} color={C.paper} />
      </g>}

      {/* ---------------- E) a finance degree? no. ten index cards ---------------- */}
      {E > 0 && <g opacity={E}>
        <Study f={f} />
        <Lamp x={1760} s={0.85} />
        <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [degree, 'scratchHead', 'worried'], [dont, 'crossNoA', 'smug', 'crossNoB', 10], [imagine, 'present', 'smiling'], [simple, 'pointUp', 'smiling'], [minute, 'thumbsUp', 'smiling']]} x={230} y={1070} s={0.95} />
        <g opacity={win(f, degree - 6, imagine, 8)}><GradCap x={1000} y={DESK - 220} s={1.2} /><Cross x={1000} y={DESK - 220} r={170} p={on(f, dont, 12)} /></g>
        {Array.from({ length: 10 }, (_, k) => {
          const t = easeInOut(span(f, deal(k), deal(k) + 14)), [gx, gy] = gridXY(k)
          const lift = k === 2 ? on(f, simple, 12) : 0
          return f >= deal(k) - 1 ? <Card key={k} x={lerp(1640, gx, t)} y={lerp(DESK - 40, gy, t) - 60 * lift} s={0.62 + 0.18 * lift} r={lerp(-12, (k % 2 ? 2 : -2), t)} o={on(f, deal(k) - 1, 4)} glow={lift}>
            {k === 2 && <Stopwatch x={0} y={10} s={0.9 * on(f, minute - 4, 10)} t={span(f, minute, minute + 30)} />}
          </Card> : null
        })}
      </g>}

      {/* ---------------- F) the staircase of ten cards ---------------- */}
      {F > 0 && <g opacity={F}>
        <Study f={f} lamp={lerp(1, 0.55, on(f, sleep, 16))} />
        <circle cx={390} cy={210} r={150} fill="url(#fl-lamp)" opacity={on(f, sleep, 16)} />
        {Array.from({ length: 10 }, (_, k) => {
          const [gx, gy] = gridXY(k), [sx, sy] = stairXY(k), ft = flipT(k), sq = Math.abs(Math.cos(ft * Math.PI))
          // # card 1 (the paycheck) and card 10 (the money plant) grow while they are spoken, clear of their neighbours
          const big = k === 0 ? win(f, paycheck7 - 4, time8, 12) : k === 9 ? win(f, up7 - 4, time8, 12) : 0
          const x = lerp(gx, sx, climb) + (k === 9 ? 60 * big : 0), y = lerp(gy, sy, climb) - (k === 0 ? 190 : k === 9 ? 40 : 0) * big
          const back = ft > 0.5
          return <g key={k} transform={`translate(${x} ${y}) scale(${sq} 1) translate(${-x} ${-y})`}>
            <Card x={x} y={y} s={lerp(0.62, 0.5, climb) + 0.32 * big} r={0} n={k + 1} glow={lit(k) * (1 - on(f, same, 8)) * 0.8 + (back ? 0.6 : 0)}>
              {!back && k === 0 && <Paycheck x={0} y={4} s={0.42} o={on(f, paycheck7, 10)} amount="FRI" open={on(f, friday, 12) * 0.4} />}
              {!back && k === 9 && <MoneyPlant x={0} y={60} s={0.3} g={span(f, grow, grow + 30)} o={on(f, up7, 10)} />}
              {back && <PctBadge x={0} y={0} r={46} />}
            </Card>
          </g>
        })}
        <Tag x={stairXY(0)[0]} y={stairXY(0)[1] - 70} text="LAST FRIDAY" size={34} point="up" o={win(f, friday, ten8, 8)} />
        <Tag x={stairXY(9)[0] + 60} y={stairXY(9)[1] + 120} text="WHILE YOU SLEEP" size={34} point="up" o={win(f, sleep, ten8, 8)} color={C.ink} ink={C.paper} />
        <Check x={stairXY(9)[0] + 150} y={stairXY(9)[1]} r={30} p={on(f, end8, 8) * (1 - on(f, same, 8))} />
      </g>}

      <Headline f={f} lines={[[paycheck1, 'NOBODY EXPLAINED YOUR PAYCHECK', C.ink, 92], [percent2, 'ONLY 49% RIGHT', C.tomatoD, 110], [flip, 'A COIN FLIP', C.paper, 110],
        [price, 'THE PRICE OF NOT KNOWING', C.paper, 96], [cards6, '10 INDEX CARDS', C.paper, 110], [ten8, '10 LESSONS', C.paper, 110], [same, 'ALL THE SAME IDEA', C.brassL, 104]]} />
      <Sweep f={f} at={EXTRA['fl-hook'].map(c)} />
      <Grain />
    </g>
  )
}

const BEATS = ['s1:taught', 's1:area', 's1:triangle', 's1:nobody', 's1:explained', 's1:paycheck', 's2:only', 's2:test', 's2:twenty', 's2:questions', 's2:adults', 's2:forty', 's2:percent', 's2:average',
  's3:coin', 's3:flip', 's3:rent', 's3:debt', 's3:age', 's3:stop', 's4:price', 's4:survey', 's4:mistakes', 's4:nine', 's4:dollars', 's4:year', 's5:thinking', 's5:degree', "s5:don't",
  's6:imagine', 's6:ten', 's6:cards', 's6:simple', 's6:minute', 's7:start', 's7:paycheck', 's7:friday', 's7:up', 's7:grow', 's7:sleep', 's8', 's8:time', 's8:end', 's8:same', 's8:idea']
export const FL_HOOK = makePiece('fl-hook', 'Literacy hook: classroom chalkboard draws a triangle + area formula, Maya points, a paycheck envelope opens showing $ ?; three classmates take a 28-bubble MONEY TEST, half the marks come back wrong, red 49% circled; lamp-lit study: a gold coin flips, then a house (RENT), credit card (DEBT) and rocking chair (STOP WORKING) rise; a till prints a receipt of money mistakes from not knowing, total $948 per adult (estimated); Maya, a finance degree cap crossed; ten index cards deal across the desk, one lifts with a stopwatch; the cards climb into a staircase from a Friday paycheck to a money plant that grows as the lamp dims; the ten cards light one by one and all flip to the same % mark', {
  mood: 'light', Component: Hook, beats: [...BEATS, ...EXTRA['fl-hook']],
  sfx: [['s1:paycheck', 'swish', 0.18], ['s2:percent', 'thud', 0.2], ['s3:flip', 'ding', 0.2], ['s4:dollars', 'cash', 0.2], ["s5:don't", 'swish', 0.16], ['s6:cards', 'pop', 0.16], ['s8:same', 'chime', 0.2]] })
