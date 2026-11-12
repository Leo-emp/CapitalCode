// ---------------------------------------------------------------- s8–s21: step one, what a mortgage really is (the street).
// A) A sunset street: a home with a FOR SALE sign; you walk up and fall for it ("love"); a gold price tag $417,500 swings
//    on; a chip "MIDDLE PRICE, SEPT 2026". Your piggy bank is far too small; on "borrow" a lender's hall rises on the hill.
// B) The deal: you and the lender shake hands; gold coins fly from the hall to the home ("pay for the house now"), then
//    each month smaller coins + red interest coins flow back. "Promise": a gold ribbon ties the home to the hall, the
//    lender holds a brass key. "Stop paying": the flow stops, the home greys, a FORECLOSURE sign. Then the coin tag
//    "THE PRICE OF MONEY = INTEREST". "You live in the house": you stand at the door; the ribbon stays (THE BANK'S CLAIM).
// C) The down payment: a price bar under the home splits 20% gold (from your piggy, $83,500) and 80% plum (borrowed,
//    $334,000). The typical first-time buyer: a second bar with only 9% gold, a badge AGE 40. Less than 20% down: an
//    umbrella opens over the hall (MORTGAGE INSURANCE) — it shelters the lender, you pay for it each month (a 'no'
//    gesture on "not you"). Good news: a gauge of what you owe falls to 80% (ASK TO DROP IT) and 78% (IT ENDS); the
//    umbrella folds away.
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { BRICK, Bush, ClaimRibbon, Coins, CREAM, Fence, GOLD, GOLDD, Ground, Hills, Home, INK, Key, LenderHall, OweGauge, Piggy, PLUM, SAGED, Sky, Tag, Tree, Umbrella, YardSign } from './kit'

const K = {
  mortgage8: 's8:mortgage',
  imagine: 's9:imagine', found: 's9:found', love: 's9:love', price9: 's9:price', k417: 's9:417500', middle: 's9:middle', september: 's9:september', existing: 's9:existing',
  few: 's10:few', money10: 's10:money', bank10: 's10:bank', borrow10: 's10:borrow',
  mortgage11: 's11:mortgage', deal: 's11:deal', lender11: 's11:lender', pay11: 's11:pay', now11: 's11:now', back11: 's11:back', interest11: 's11:interest', month11: 's11:month',
  lender12: 's12:lender', safe: 's12:safe', itself: 's12:itself', promise: 's12:promise',
  stop: 's13:stop', right13: 's13:right', take: 's13:take', back13: 's13:back', foreclosure: 's13:foreclosure',
  giving: "s14:isn't", lending: "s14:lending", price14: 's14:price', interest14: 's14:interest',
  think15: 's15:think', live: 's15:live', until: 's15:until', bank15: 's15:bank', claim: 's15:claim',
  first16: 's16:first', part: 's16:part', down16: 's16:down',
  example17: 's17:example', twenty17: 's17:20', k83: 's17:83500', borrow17: 's17:borrow', k334: 's17:334000',
  now18: 's18:now', much18: 's18:much', buyers18: 's18:buyers', regular20: 's20:regular', survey: 's18:survey', typical: 's18:typical', nine: 's18:9', forty: 's18:40',
  putting: 's19:putting', allowed: 's19:allowed', costs: 's19:costs',
  less20: 's20:less', adds: 's20:adds', insurance20: 's20:insurance', protects: 's20:protects', notyou: 's20:not', pay20: 's20:pay',
  good: 's21:good', ask: 's21:ask', drop: 's21:drop', eighty: 's21:80', original: 's21:original', end21: 's21:end', k78: 's21:78',
}
type Key = keyof typeof K

// # a price bar under a home: gold share (yours) vs plum share (borrowed)
const SplitBar: React.FC<{ x: number; y: number; w: number; mine: number; o?: number; grow?: number; a?: string; b?: string }> = ({ x, y, w, mine, o = 1, grow = 1, a, b }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2} y={-34} width={w} height={68} rx={16} fill="#EFE3CC" stroke={INK} strokeWidth={4} />
    <rect x={-w / 2} y={-34} width={w * mine * grow} height={68} rx={16} fill={GOLD} />
    <rect x={-w / 2 + w * mine} y={-34} width={w * (1 - mine) * grow} height={68} fill={PLUM} opacity={grow > 0.02 ? 1 : 0} />
    <rect x={-w / 2} y={-34} width={w} height={68} rx={16} fill="none" stroke={INK} strokeWidth={4} />
    {a && <Label x={-w / 2 + (w * mine) / 2} y={16} text={a} size={42} font="Bebas Neue" color={INK} />}
    {b && <Label x={-w / 2 + w * mine + (w * (1 - mine)) / 2} y={16} text={b} size={42} font="Bebas Neue" color={CREAM} />}
  </g>
)

const What: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.mortgage11 - 8, BC = q.first16 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const you: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 16], [q.found, 'idle', 'smiling'], [q.love, 'holdChest', 'smiling'], [q.k417, 'shock', 'shocked'], [q.few, 'emptyPockets', 'worried'], [q.borrow10, 'point', 'thinking']]
  const youB: Beat[] = [[0, 'idle', 'smiling'], [q.deal, 'handshake', 'smiling'], [q.back11, 'offer', 'neutral'], [q.stop, 'emptyPockets', 'worried'], [q.foreclosure, 'despair', 'worried'],
    [q.giving, 'idle', 'neutral'], [q.lending, 'explain', 'neutral'], [q.live, 'relax', 'smiling'], [q.claim, 'idle', 'neutral']]
  const lender: Beat[] = [[0, 'idle', 'neutral'], [q.deal, 'handshake', 'smiling'], [q.lender12, 'idle', 'smug'], [q.safe, 'armsCrossed', 'neutral'], [q.promise, 'point', 'smug'], [q.take, 'point', 'neutral'], [q.giving, 'idle', 'neutral']]
  const youC: Beat[] = [[0, 'explain', 'smiling'], [q.part, 'offer', 'smiling'], [q.borrow17, 'point', 'neutral'], [q.buyers18, 'explain', 'neutral'], [q.typical, 'present', 'neutral'], [q.costs, 'shrug', 'worried'],
    [q.notyou, 'crossNoA', 'neutral', 'crossNoB', 10], [q.pay20, 'offer', 'worried'], [q.good, 'thumbsUp', 'smiling'], [q.k78, 'celebrate', 'smiling']]
  // # B timeline
  const flowIn = span(f, q.pay11, q.now11 + 14), flowOut = on(f, q.back11, 10) * (1 - on(f, q.stop, 6)), grey = on(f, q.stop, 14) * (1 - on(f, q.giving, 12))
  const ribbon = span(f, q.itself, q.promise + 10)
  const gaugeV = lerp(lerp(0.91, 0.8, span(f, q.ask, q.eighty + 10)), 0.78, span(f, q.end21, q.k78 + 10))
  return (
    <g>
      <Stage id="mg-what" frame={f} />
      <Sky id="mgw-sky" sun={[1640, 620]} f={f} />
      <Hills id="mgw-hills" y={740} seed={7} />
      <Ground id="mgw-ground" y={830} />
      {/* # A) the home you love, its price, your small piggy, the lender appears */}
      {A > 0 && <g opacity={A}>
        <Tree x={1820} y={850} s={0.9} />
        <Home id="mgw-home" x={1260} y={640} s={0.9} lit={0.4} />
        <YardSign x={1610} y={850} t="FOR SALE" o={on(f, q.imagine, 10) * (1 - on(f, q.borrow10, 10))} />
        <g opacity={on(f, q.k417, 8)}><Tag x={1260} y={330 + 8 * Math.sin(f / 9)} t="$417,500" s={1.1} r={-3} /></g>
        <g opacity={on(f, q.middle, 10) * (1 - on(f, q.few, 10))} transform={`translate(0 ${-8 * pop(f, q.existing, 12) + 8})`}><rect x={1030} y={880} width={460} height={70} rx={35} fill={CREAM} stroke={GOLDD} strokeWidth={4} /><Label x={1260} y={928} text="A MIDDLE US PRICE, SEPT 2026" size={38} font="Bebas Neue" color={INK} /></g>
        <g opacity={on(f, q.few, 10) * (1 - on(f, q.borrow10, 12))} transform={`translate(760 ${800 - 10 * pop(f, q.money10, 12)})`}><Piggy x={0} y={0} s={0.55} /><Label x={0} y={120} text="YOUR SAVINGS" size={40} font="Bebas Neue" color={INK} /></g>
        <g opacity={on(f, q.borrow10, 12)} transform={`translate(0 ${30 * (1 - on(f, q.borrow10, 16))})`}><LenderHall id="mgw-hall" x={760} y={800} s={0.66} /></g>
        <Person f={f} who="investorF" beats={you} x={lerp(-80, 260, on(f, q.imagine, 40))} y={960} s={0.95} />
      </g>}
      {/* # B) the deal, the money both ways, the promise, foreclosure, interest = price of money, the claim */}
      {B > 0 && <g opacity={B}>
        <LenderHall id="mgw-hall2" x={420} y={760} s={0.72} />
        <Home id="mgw-home2" x={1450} y={640} s={0.85} lit={0.5} grey={grey} />
        <ClaimRibbon a={[420, 410]} b={[1450, 380]} p={ribbon} o={on(f, q.itself, 8)} />
        {/* # the loan arrives in one go */}
        {Array.from({ length: 6 }, (_, i) => { const t = span(f, q.pay11 + i * 3, q.pay11 + i * 3 + 22); return t > 0 && t < 1 ? <g key={i} transform={`translate(${lerp(560, 1340, t)} ${lerp(520, 520, t) - 230 * Math.sin(Math.PI * t)})`}><Coins x={0} y={0} n={2} s={0.6} /></g> : null })}
        {/* # monthly payments flow back, with red interest coins */}
        {flowOut > 0 && Array.from({ length: 5 }, (_, i) => { const t = ((f - q.back11) / 40 + i / 5) % 1; return <g key={i} opacity={flowOut} transform={`translate(${lerp(1260, 600, t)} ${1005 - 20 * Math.sin(Math.PI * t)})`}><Coins x={0} y={0} n={1} s={0.5} col={i % 5 === 4 ? GOLD : BRICK} /></g> })}
        <g opacity={win(f, q.back11, q.stop, 10)}><Label x={930} y={1062} text="EVERY MONTH, FOR YEARS" size={46} font="Bebas Neue" color={CREAM} /></g>
        <g opacity={on(f, q.promise, 10) * (1 - on(f, q.stop, 10))}><Label x={950} y={290} text="THE HOUSE IS THE PROMISE" size={56} font="Bebas Neue" color={INK} /></g>
        <g opacity={on(f, q.safe, 10)}><Key x={300} y={330 - 8 * pop(f, q.promise, 12)} s={0.6} r={-20} /></g>
        <YardSign x={1700} y={880} t="FORECLOSURE" col={BRICK} o={win(f, q.foreclosure, q.giving, 10)} />
        <g opacity={win(f, q.take, q.giving, 10)}><path d={`M1300 600 Q 950 ${430 - 30 * on(f, q.back13, 12)} 600 560`} fill="none" stroke={BRICK} strokeWidth={10} strokeDasharray="20 16" /><path d="M620 540 L590 572 L634 580 Z" fill={BRICK} /></g>
        <g opacity={win(f, q.price14, q.think15, 10)} transform={`translate(950 ${290 - 10 * pop(f, q.interest14, 12)})`}><rect x={-330} y={-58} width={660} height={100} rx={50} fill={CREAM} stroke={BRICK} strokeWidth={5} /><Label x={0} y={14} text="THE PRICE OF MONEY = INTEREST" size={52} font="Bebas Neue" color={BRICK} /></g>
        <g opacity={on(f, q.claim, 10)}><Label x={950} y={290} text="THE BANK'S CLAIM ON YOUR HOME" size={60} font="Bebas Neue" color={INK} /></g>
        <Person f={f} who="worker" beats={lender} x={720} y={960} s={0.9} />
        <Person f={f} who="investorF" beats={youB} x={lerp(990, 1450, on(f, q.live, 20))} y={lerp(960, 820, on(f, q.live, 20))} s={lerp(0.95, 0.7, on(f, q.live, 20))} flip />
        <Bush x={140} y={900} s={0.9} />
      </g>}
      {/* # C) down payment split, the typical buyer, mortgage insurance, when it ends */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, q.putting, 12)}>
          <g transform={`translate(0 ${-12 * pop(f, q.much18, 12) + 12})`}><Home id="mgw-home3" x={1150} y={560} s={0.75} lit={0.4} /></g>
          <SplitBar x={1150} y={810} w={720} mine={0.2} grow={on(f, q.down16, 18)} a={on(f, q.k83, 6) > 0.5 ? '$83,500' : '20%'} b={on(f, q.k334, 6) > 0.5 ? '$334,000 BORROWED' : ''} o={on(f, q.part, 10) * (1 - on(f, q.now18, 10))} />
          <g opacity={on(f, q.down16, 10) * (1 - on(f, q.now18, 10))}><Piggy x={520} y={720} s={0.45} /></g>
          <g opacity={on(f, q.now18, 10)}>
            <SplitBar x={1150} y={810} w={720} mine={0.09} grow={on(f, q.typical, 18)} a="" b="BORROWED" />
            <g opacity={on(f, q.nine, 8)}><rect x={760} y={850} width={130} height={80} rx={40} fill={CREAM} stroke={GOLDD} strokeWidth={4} /><Label x={825} y={910} text="9%" size={66} font="Bebas Neue" color={GOLDD} /></g>
            <g opacity={on(f, q.forty, 10)} transform={`translate(1650 ${420 - 10 * pop(f, q.forty, 12)})`}><circle r={86} fill={GOLD} stroke={INK} strokeWidth={5} /><Label x={0} y={-6} text="AGE" size={36} font="Bebas Neue" color={INK} /><Label x={0} y={46} text="40" size={64} font="Bebas Neue" color={INK} /></g>
            <g opacity={on(f, q.survey, 10)}><Label x={1150} y={330} text="TYPICAL FIRST-TIME BUYER" size={54} font="Bebas Neue" color={INK} /></g>
          </g>
        </g>
        <g opacity={on(f, q.putting, 12)}>
          <Umbrella x={1080} y={lerp(500, 440, on(f, q.adds, 16))} s={1.5} open={on(f, q.adds, 16) * (1 - on(f, q.k78, 16))} o={on(f, q.less20, 10) * (1 - on(f, q.k78 + 20, 10))} />
          <g transform={`translate(0 ${-10 * pop(f, q.regular20, 12) + 10})`}><LenderHall id="mgw-hall3" x={1080} y={800} s={0.62} /></g>
          <g opacity={win(f, q.insurance20, q.good, 10)}><Label x={1080} y={950} text="MORTGAGE INSURANCE" size={60} font="Bebas Neue" color={CREAM} /></g>
          <g opacity={win(f, q.protects, q.good, 10)}><Label x={1080} y={1030} text="IT PROTECTS THE LENDER" size={48} font="Bebas Neue" color={CREAM} /></g>
          {on(f, q.pay20, 6) * (1 - on(f, q.good, 8)) > 0 && Array.from({ length: 3 }, (_, i) => { const t = ((f - q.pay20) / 30 + i / 3) % 1; return <g key={i} opacity={1 - on(f, q.good, 8)} transform={`translate(${lerp(560, 860, t)} ${700 - 80 * Math.sin(Math.PI * t)})`}><Coins x={0} y={0} n={1} s={0.45} col={GOLD} /></g> })}
          <g opacity={on(f, q.good, 10)}><OweGauge x={1580} y={720} v={gaugeV} s={0.85} /></g>
          <g opacity={on(f, q.eighty, 8)}><Label x={1580} y={430} text={on(f, q.k78, 6) > 0.5 ? '78%: IT ENDS BY ITSELF' : '80%: ASK TO DROP IT'} size={46} font="Bebas Neue" color={on(f, q.k78, 6) > 0.5 ? SAGED : GOLDD} /></g>
        </g>
        <Person f={f} who="investorF" beats={youC} x={300} y={960} s={0.95} />
        <Fence x0={1500} x1={1960} y={1080} />
      </g>}
      <Headline f={f} lines={[[q.mortgage8, 'WHAT A MORTGAGE REALLY IS', INK, 92], [q.imagine, 'THE HOME YOU LOVE', INK, 100], [q.few, 'SO YOU BORROW', INK, 104],
        [q.mortgage11, 'A DEAL WITH A LENDER', INK, 100], [q.stop, 'IF YOU STOP PAYING', BRICK, 100], [q.giving, 'THEY LEND YOU MONEY', INK, 100], [q.think15, 'YOU LIVE THERE', INK, 100],
        [q.first16, 'YOUR DOWN PAYMENT', INK, 100], [q.now18, 'MOST PUT DOWN LESS', INK, 100], [q.putting, 'LESS DOWN COSTS EXTRA', BRICK, 96], [q.good, 'THE GOOD NEWS', SAGED, 104]]} />
      <Vignette id="mg-what" />
    </g>
  )
}

export const MG_WHAT = makePiece('mg-what', 'Mortgage step one (sunset street): you walk up to a home with a FOR SALE sign, a $417,500 price tag (a middle US price, Sept 2026), your piggy bank too small, a lender hall rises; the deal handshake with the lender, coins fly to the home then monthly coins with red interest flow back; a gold ribbon ties the home to the hall (the house is the promise), a brass key; stop paying — the home greys, FORECLOSURE sign; THE PRICE OF MONEY = INTEREST; you at the door, the bank\'s claim; a price bar splits 20% gold ($83,500) vs plum ($334,000 borrowed); the typical first-time buyer 9%, AGE 40; an umbrella of MORTGAGE INSURANCE over the lender hall, coins paid each month; a gauge of what you owe falls to 80% (ask to drop it) and 78% (it ends)', {
  mood: 'light', Component: What, beats: Object.values(K),
  sfx: [['s9:417500', 'pop', 0.2], ['s11:deal', 'click', 0.2], ['s12:promise', 'ding', 0.15], ['s13:foreclosure', 'thud', 0.25], ['s20:adds', 'whoosh', 0.2], ['s21:78', 'ding', 0.2]] })
