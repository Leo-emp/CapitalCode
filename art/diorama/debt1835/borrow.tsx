// ============================================================
// db-borrow (s8–s21, cream): how a government gets into debt, in three steps.
// A) the Capitol, two coin stacks (spends > taxes), the dashed gap; a lender
//    buys a bond and her coins fill the gap.  B) a bond close-up: she lends a
//    $100 sack, gets $5 coins year by year, the sack comes back; for the
//    government the bond is a DEBT until it is stamped PAID.  C) every unpaid
//    bond piles up = the national debt.  D) the young country's wars grow the
//    pile: 1791 $75M+, 1812 warship, 1816 $127M; ten small people = < 10 million.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { Mini } from '../../rig/Mini'
import { type Beat, fly, Headline, Person, win } from '../aimoney/common'
import { Bond, BondPile, bump, C, Capitol, Coin, CoinStack, Defs, Sack, Ship, Street, Treasury, YearPage , Backdrop } from './kit'

const GROUND = 880
// # a little field cannon (War of Independence), drawn for this video
const Cannon: React.FC<{ x: number; y: number; s?: number; o?: number; fire?: number }> = ({ x, y, s = 1, o = 1, fire = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-20} y={-120} width={200} height={50} rx={24} fill="#3B3F4A" transform="rotate(-14)" />
    <circle cx={-10} cy={-40} r={46} fill="none" stroke={C.woodD} strokeWidth={12} /><circle cx={-10} cy={-40} r={8} fill={C.woodD} />
    <g opacity={fire}><circle cx={210} cy={-160} r={34 * fire + 10} fill="#EDE6DA" /><circle cx={250} cy={-180} r={24 * fire + 6} fill="#EDE6DA" /></g>
  </g>
)
// # a numbered step badge (1/2/3) that lights when its step is spoken
const StepBadge: React.FC<{ x: number; y: number; n: number; o: number; lit: number }> = ({ x, y, n, o, lit }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${1 + 0.12 * lit})`}><circle r={40} fill={lit > 0.5 ? C.brick : C.parchD} stroke={C.sepia} strokeWidth={4} /><Label x={0} y={16} text={String(n)} size={48} font="Bebas Neue" color={lit > 0.5 ? '#FFF5EA' : C.sepia} /></g>
)

const Borrow: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const mean8 = c('s8:mean'), debt8 = c('s8:debt'), three9 = c('s9:three'), steps9 = c('s9:steps')
  const one10 = c('s10:one'), spends = c('s10:spends'), taxes = c('s10:taxes'), collects = c('s10:collects')
  const two11 = c('s11:two'), gap = c('s11:gap'), borrows = c('s11:borrows'), bonds11 = c('s11:bonds')
  const bond12 = c('s12:bond'), lend = c('s12:lend'), int12 = c('s12:interest'), date12 = c('s12:date'), back12 = c('s12:back')
  const int13 = c('s13:interest'), five13 = c('s13:5'), year13 = c('s13:year'), ten13 = c('s13:ten'), come13 = c('s13:come')
  const gov14 = c('s14:government'), debt14 = c('s14:debt'), back14 = c('s14:back')
  const three15 = c('s15:three'), add15 = c('s15:add'), total15 = c('s15:total'), national = c('s15:national')
  const young = c('s16:young'), fight = c('s16:fight'), indep = c('s16:independence')
  const those17 = c('s17:those'), d75 = c('s17:75')
  const another18 = c('s18:another'), britain = c('s18:britain'), borrowing18 = c('s18:borrowing')
  const start19 = c('s19:start'), y1816 = c('s19:1816'), d127 = c('s19:127')
  const lot20 = c('s20:lot'), ten20 = c('s20:ten'), people20 = c('s20:people')
  const disappear = c('s21:disappear'), how21 = c('s21:how')
  const A = win(f, c('s8') - 20, bond12), B = win(f, bond12, three15), Cc = on(f, three15, 8)
  const lender: Beat[] = [[0, 'idle', 'neutral'], [borrows, 'offer', 'smiling'], [bonds11 + 10, 'hold', 'smiling']]
  const lender2: Beat[] = [[0, 'idle', 'neutral'], [lend, 'offer', 'smiling'], [int12, 'receive', 'smiling'], [back12, 'celebrate', 'smiling'], [int13, 'countA', 'thinking', 'countB', 14], [come13, 'receive', 'smiling'], [gov14, 'idle', 'neutral']]
  // # coin stacks: spending (coral) vs taxes (gold); the dashed gap is filled by the lender's coins
  const fillGap = on(f, bonds11 + 8, 20)
  return (
    <g>
      <Defs />
      <Stage id="db-borrow" frame={f} />
      <Headline f={f} lines={[[mean8, 'WHAT IS A GOVERNMENT DEBT?', P.ink, 100], [one10, 'STEP 1: SPENDS MORE THAN TAXES', P.ink, 96], [two11, 'STEP 2: BORROWS BY SELLING BONDS', P.ink, 96],
        [bond12, 'A BOND = A PROMISE', P.ink, 104], [five13, 'EXAMPLE: $100 AT 5%', C.sepia, 100], [gov14, 'FOR THE GOVERNMENT: A DEBT', P.ink, 100],
        [three15, 'STEP 3: ALL UNPAID BONDS = THE DEBT', P.ink, 92], [young, 'BORN IN DEBT', P.ink, 110], [another18, 'THE WAR OF 1812', P.ink, 110], [d127, '1816: ABOUT $127 MILLION', C.brick, 100], [how21, 'HOW DO YOU MAKE IT DISAPPEAR?', P.ink, 100]]} />


      {/* # A) the gap and the first bond */}
      {A > 0 && <g opacity={A}>
        <Backdrop kind="town" f={f} />
        <Street y={GROUND} />
        {(() => { const mv = easeInOut(span(f, spends - 10, spends + 10)); return <Capitol x={lerp(960, 480, mv)} y={GROUND} s={lerp(1.35, 0.95, mv) * pop(f, c('s8:mean'), 14) * bump(f, debt8, 0.04) * bump(f, steps9, 0.03)} /> })()}
        <g opacity={on(f, spends, 8)}><CoinStack x={1080} y={GROUND - 10} n={Math.round(on(f, spends, 18) * 22)} w={130} />
          <Label x={1080} y={GROUND + 60} text="SPENDS" size={44} font="Bebas Neue" color={C.brick} /></g>
        <g opacity={on(f, collects, 8)}><CoinStack x={1320} y={GROUND - 10} n={Math.round(on(f, taxes, 18) * 14)} w={130} silver />
          <Label x={1320} y={GROUND + 60} text="TAXES IN" size={44} font="Bebas Neue" color={C.forest} /></g>
        {/* # the gap: dashed outline above the taxes stack up to the spending height */}
        <g opacity={on(f, gap, 8) * (1 - fillGap)}><rect x={1252} y={GROUND - 10 - 22 * 12 - 20} width={136} height={8 * 12 + 14} rx={12} fill="none" stroke={C.brick} strokeWidth={5} strokeDasharray="14 10" />
          <Label x={1320} y={GROUND - 22 * 12 - 40} text="GAP" size={48} font="Bebas Neue" color={C.brick} /></g>
        <g opacity={fillGap}><CoinStack x={1320} y={GROUND - 10 - 14 * 12} n={8} w={130} /></g>
        <g opacity={on(f, borrows, 8)}><Person f={f} who="investorF" beats={lender} x={1680} y={GROUND} s={0.95} /></g>
        {/* # the bond travels from the Capitol to the lender; her coins travel to the gap */}
        {f >= bonds11 && (() => { const fl = fly(f, bonds11, [620, 560], [1640, 520], 22, 120); return <Bond x={fl.x} y={fl.y} s={0.6} o={1} r={-6} /> })()}
        {f >= bonds11 + 8 && f < bonds11 + 34 && (() => { const fl = fly(f, bonds11 + 8, [1660, 560], [1320, GROUND - 230], 24, 100); return <Coin x={fl.x} y={fl.y} r={30} o={fl.o} /> })()}
      </g>}

      {/* # B) the bond close-up: lender on the left, the Treasury window on the right */}
      {B > 0 && <g opacity={B}>
        <Backdrop kind="town" f={f} />
        <Street y={GROUND} />
        <Treasury x={1480} y={GROUND} s={0.78} door={on(f, lend, 10)} />
        <Person f={f} who="investorF" beats={lender2} x={330} y={GROUND} s={1.0} />
        <g opacity={on(f, bond12, 8)} transform={`translate(${lerp(0, 380, easeInOut(span(f, gov14, gov14 + 18)))} ${lerp(0, -60, easeInOut(span(f, gov14, gov14 + 18)))})`}>
          <Bond x={820} y={420} s={1.1 * pop(f, bond12) * bump(f, debt14, 0.06)} amount="$100" paid={on(f, back14, 8)} />
          {/* # labels stuck to the bond */}
          <g opacity={on(f, five13, 8)}><circle cx={950} cy={330} r={46} fill={C.brick} /><Label x={950} y={346} text="5%" size={44} font="Bebas Neue" color="#FFF5EA" /></g>
          <g opacity={on(f, date12, 8) * (1 - on(f, gov14, 8))}><YearPage x={560} y={270} s={0.55} year="10 YRS" top="REPAID IN" /></g>
          <g opacity={on(f, debt14, 8)}><rect x={740} y={510} width={160} height={52} rx={10} fill={C.brick} /><Label x={820} y={548} text="DEBT" size={44} font="Bebas Neue" color="#FFF5EA" /></g>
        </g>
        {/* # the $100 sack: to the Treasury on "lend", back on "back" (s12) and again on "come back" (s13) */}
        {(() => {
          // # the sack's trips: lent on "lend" (s12), back on "back"; lent again for the example on "interest" (s13), back on "come back"
          const go = easeInOut(span(f, lend, lend + 22)), ret = easeInOut(span(f, back12, back12 + 22)), go2 = easeInOut(span(f, int13, int13 + 22)), ret2 = easeInOut(span(f, come13, come13 + 22))
          const x = lerp(lerp(lerp(lerp(520, 1170, go), 520, ret), 1170, go2), 520, ret2)
          const y = 700 - (Math.sin(go * Math.PI) + Math.sin(ret * Math.PI) + Math.sin(go2 * Math.PI) + Math.sin(ret2 * Math.PI)) * 80
          return <g opacity={on(f, lend - 4, 6) * (1 - on(f, gov14, 8))}><Sack x={x} y={y + 120} s={0.8 * bump(f, c('s12:100'), 0.1)} label="$100" /></g> })()}
        {/* # interest: one coin after s12's "interest"; in the example one more coin every 5 frames from "year", up to ten */}
        {(() => { const n = f < int12 ? 0 : f < year13 ? 1 : Math.min(10, 1 + Math.floor((f - year13) / 5))
          return <g opacity={on(f, int12, 8) * (1 - on(f, gov14, 8))}><CoinStack x={720} y={GROUND - 10} n={Math.min(10, n)} w={84} />
            <g opacity={on(f, ten13, 8)}><Label x={720} y={GROUND + 60} text={`$5 × ${Math.min(10, Math.max(1, n))} YEARS`} size={40} font="Bebas Neue" color={C.goldD} /></g></g> })()}
        {f >= int12 && f < int12 + 20 && (() => { const fl = fly(f, int12, [1300, 640], [720, GROUND - 40], 20, 120); return <Coin x={fl.x} y={fl.y} r={22} o={fl.o} /> })()}
      </g>}

      {/* # C/D) every unpaid bond piles up = the national debt; wars grow the pile */}
      {Cc > 0 && <g opacity={Cc}>
        <Backdrop kind="town" f={f} />
        <Street y={GROUND} />
        {(() => { const n = Math.round(on(f, add15, 30) * 6 + on(f, those17, 20) * 6 + on(f, borrowing18, 20) * 8 + on(f, y1816, 12) * 2)
          return <g transform={`translate(1420 ${GROUND}) scale(${1.5 * bump(f, total15, 0.05) * bump(f, d127, 0.06) * bump(f, c('s15:bond'), 0.05) * bump(f, c('s15:paid'), 0.05) * bump(f, c('s16:debt'), 0.05) * bump(f, c('s17:by'), 0.04) * bump(f, c('s19:records'), 0.04) * bump(f, c('s20:that'), 0.04) * bump(f, c('s21:make'), 0.06)})`} opacity={1 - 0.5 * on(f, disappear, 6) * (1 - on(f, disappear + 12, 10))}><BondPile x={0} y={0} n={Math.max(1, n)} /></g> })()}
        <g opacity={on(f, national, 8) * (1 - on(f, those17, 8))}><Label x={1420} y={GROUND + 64} text="THE NATIONAL DEBT" size={48} font="Bebas Neue" color={C.brick} /></g>
        <g opacity={on(f, d75, 8) * (1 - on(f, y1816, 8))}><Label x={1420} y={GROUND + 64} text="1791: $75 MILLION+" size={48} font="Bebas Neue" color={C.brick} /></g>
        <g opacity={on(f, d127, 8)}><Label x={1420} y={GROUND + 64} text="1816: ≈ $127 MILLION" size={48} font="Bebas Neue" color={C.brick} /></g>
        {/* # left side, one picture at a time: the Capitol, the cannon, the 1791 page, the warship, the 1816 page, ten people */}
        <g opacity={(1 - on(f, fight, 10))}><Capitol x={560} y={GROUND} s={1.15} /></g>
        {f >= add15 && f < total15 + 10 && [0, 1, 2, 3].map((k) => { const fl = fly(f, add15 + k * 7, [700, 640], [1420, 700 - k * 30], 20, 160); return fl.t < 1 ? <Bond key={k} x={fl.x} y={fl.y} s={0.5} o={fl.o} r={-8 + k * 5} /> : null })}
        <g opacity={on(f, fight + 8, 8) * (1 - on(f, c('s17:1791'), 8))}><Cannon x={430} y={GROUND} s={1.8 * pop(f, fight + 8)} fire={on(f, indep, 6) * (1 - on(f, indep + 16, 10))} />
          <g transform={`translate(1010 ${GROUND})`} opacity={on(f, c('s16:war'), 8)}><rect x={-6} y={-420} width={12} height={420} fill={C.woodD} /><rect x={6} y={-416} width={180} height={110} fill="#FBF6EA" stroke={C.sepiaL} strokeWidth={3} />
            {[0, 1, 2, 3, 4, 5, 6].map((r) => <rect key={r} x={6} y={-416 + r * 15.7} width={180} height={7.8} fill={C.brick} opacity={r % 2 ? 0 : 1} />)}<rect x={6} y={-416} width={78} height={62} fill="#2E4A78" />
            {Array.from({ length: 13 }, (_, k) => { const a = (k / 13) * Math.PI * 2; return <circle key={k} cx={45 + Math.cos(a) * 20} cy={-385 + Math.sin(a) * 20} r={3.2} fill="#FBF6EA" /> })}</g></g>
        <g opacity={on(f, c('s17:1791') + 8, 8) * (1 - on(f, another18, 8))}><YearPage x={640} y={560} s={1.8 * pop(f, c('s17:1791') + 8)} year="1791" top="BY" /></g>
        <g opacity={on(f, britain, 8) * (1 - on(f, start19, 8))}><Ship x={620} y={GROUND - 30} s={1.35 * bump(f, c('s18:1812'), 0.06)} f={f} cargo={0} /></g>
        <g opacity={on(f, y1816, 8) * (1 - on(f, lot20, 8))}><YearPage x={640} y={560} s={1.8 * pop(f, y1816)} year="1816" top="START OF" /></g>
        <g opacity={on(f, ten20, 8)}>{Array.from({ length: 10 }, (_, k) => <g key={k} opacity={on(f, ten20 + k * 2, 6)}><Mini look={['buyer', 'investor', 'worker', 'owner', 'hero'][k % 5]} x={200 + k * 100} y={GROUND} scale={1.0} frame={f} seed={k + 3} /></g>)}
          <g opacity={on(f, people20, 8)}><Label x={650} y={GROUND + 64} text="FEWER THAN 10 MILLION PEOPLE" size={44} font="Bebas Neue" color={C.sepia} /></g></g>
      </g>}
      {/* # step badges along the bottom, on top of the street (they stay through the three steps) */}
      <g opacity={on(f, three9, 8) * (1 - on(f, young, 10))}>
        <StepBadge x={760} y={990} n={1} o={pop(f, three9)} lit={on(f, one10, 6) * (1 - on(f, two11, 6))} />
        <StepBadge x={960} y={990} n={2} o={pop(f, three9 + 4)} lit={on(f, two11, 6) * (1 - on(f, three15, 6))} />
        <StepBadge x={1160} y={990} n={3} o={pop(f, three9 + 8)} lit={on(f, three15, 6) * (1 - on(f, young, 6))} />
      </g>
      <Vignette id="db-borrow" />
    </g>
  )
}

const BEATS = ["s8:debt", "s9:three", "s9:steps", "s10:one", "s10:spends", "s10:taxes", "s10:collects", "s11:two", "s11:gap", "s11:borrows", "s11:bonds", "s12:bond", "s12:lend", "s12:interest", "s12:date", "s12:back", "s13:interest", "s13:5", "s13:year", "s13:ten", "s13:come", "s14:government", "s14:debt", "s14:back", "s15:three", "s15:add", "s15:total", "s15:national", "s16:young", "s16:fight", "s16:independence", "s17:those", "s17:75", "s18:another", "s18:britain", "s18:borrowing", "s19:start", "s19:1816", "s19:127", "s20:lot", "s20:ten", "s20:people", "s21:disappear", "s8", "s8:mean", "s12:100", "s15:bond", "s15:paid", "s16:debt", "s17:by", "s19:records", "s20:that", "s21:make", "s17:1791", "s16:war", "s18:1812"]
export const DB_BORROW = makePiece('db-borrow', 'Debt 1835 ch1: Capitol, spending vs taxes coin stacks, dashed GAP filled by a lender who buys a bond; bond close-up ($100 sack lent and returned, $5 coins a year for ten years, DEBT tag, PAID stamp); unpaid bonds pile up = national debt; cannon (1791 $75M+), warship (1812), 1816 $127M; ten small people', {
  mood: 'light', Component: Borrow, beats: BEATS,
  sfx: [['s11:bonds', 'whoosh', 0.2], ['s12:lend', 'coin', 0.2], ['s14:back', 'click', 0.2], ['s16:independence', 'thud', 0.2]],
})
