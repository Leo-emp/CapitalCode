// ---------------------------------------------------------------- s57–s66: step six, what it means for your money (back in grandma's kitchen).
// A) The drawer again: the 100-dollar bill inside, and the grocery bag beside it slowly emptying year by year.
// B) A savings jar labelled 1 % and a grocery bag with a price tag: the jar's label climbs $1,000 → $1,010, the bag's tag
//    climbs $1,000 → $1,030; a gap bracket between them reads $20 BEHIND; then REAL RETURN = what you earn − inflation.
// C) Winners: a little car with a fixed $ payment tag (FIXED) beside a paycheck that grows; the payment's slice of the
//    paycheck gets smaller.
// D) Your pay: two climbing columns from 2006 to 2026 — PAY +90 %, PRICES +69 %; then a race between a money arrow and a
//    price arrow (is your money rising faster?).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bag, Bill, Car, Drawer, Jar, K, Kitchen, Label, Tag } from './kit'

const G = 900

const Money: React.FC<PieceProps> = ({ f, c }) => {
  const remember57 = c('s57:remember'), bill57 = c('s57:bill'), drawer57 = c('s57:drawer'), cash57 = c('s57:cash'), nothing57 = c('s57:nothing'), loses57 = c('s57:loses'), power57 = c('s57:power'), every57 = c('s57:every'), year57 = c('s57:year')
  const keep58 = c('s58:keep'), n1000 = c('s58:1000'), savings58 = c('s58:savings'), n1 = c('s58:1'), prices58 = c('s58:prices'), n3 = c('s58:3')
  const year59 = c('s59:year'), n1010 = c('s59:1010'), things59 = c('s59:things'), n1030 = c('s59:1030'), n20 = c('s59:20'), behind59 = c('s59:behind'), balance59 = c('s59:balance'), up59 = c('s59:up')
  const n1000c = c('s59:1000'), last59 = c('s59:last'), now59 = c('s59:now'), people60 = c('s60:people'), not65b = c('s65:not#2'), real66 = c('s66:real'), real60 = c('s60:real'), return60 = c('s60:return'), earns60 = c('s60:earns'), inflation60 = c('s60:inflation'), taken60 = c('s60:taken')
  const winners61 = c('s61:winners'), borrowed61 = c('s61:borrowed'), fixed61 = c('s61:fixed'), payment61 = c('s61:payment'), same61 = c('s61:same'), prices61 = c('s61:prices'), pay61 = c('s61:pay'), rise61 = c('s61:rise')
  const fixed62 = c('s62:fixed'), car62 = c('s62:car'), smaller62 = c('s62:smaller'), bite62 = c('s62:bite'), paycheck62 = c('s62:paycheck'), goes62 = c('s62:goes')
  const pay63 = c('s63:pay'), matters63 = c('s63:matters'), raise63 = c('s63:raise'), better63 = c('s63:better'), bigger63 = c('s63:bigger'), inflation63 = c('s63:inflation')
  const y2006 = c('s64:2006'), y2026 = c('s64:2026'), hourly64 = c('s64:hourly'), n90 = c('s64:90'), prices64 = c('s64:prices'), n69 = c('s64:69')
  const average65 = c('s65:average'), ahead65 = c('s65:ahead'), not65 = c('s65:not'), everyone65 = c('s65:everyone'), year65 = c('s65:year')
  const question66 = c('s66:question'), prices66 = c('s66:prices'), rise66 = c('s66:rise'), money66 = c('s66:money'), faster66 = c('s66:faster')

  const AB = keep58 - 4, BC = winners61 - 4, CD = pay63 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = on(f, CD - 8, 10)

  // # A) the drawer and the emptying bag
  const open = on(f, drawer57 - 6, 16)
  const bagFill = 1 - 0.65 * span(f, loses57, year57 + 30)
  const aBeats: Beat[] = [[0, 'idle', 'smiling'], [remember57, 'point', 'neutral'], [cash57, 'reachDown', 'thinking'], [loses57, 'despair', 'worried']]
  // # B) the jar and the bag
  const jarV = f < year59 ? 1000 : lerp(1000, 1010, span(f, year59, n1010 + 8))
  const bagV = f < things59 ? 1000 : lerp(1000, 1030, span(f, n1030 - 10, n1030 + 8))
  const bBeats: Beat[] = [[AB, 'explain', 'neutral'], [savings58, 'point', 'neutral'], [n1010, 'thumbsUp', 'smiling'], [n1030, 'shock', 'shocked'], [behind59, 'facepalm', 'worried'], [people60, 'shrug', 'neutral'], [real60, 'explain', 'neutral'], [return60, 'present', 'smiling'], [taken60, 'pointDown', 'neutral']]
  // # C) the fixed payment and the growing paycheck
  const pay = 1 + 0.6 * span(f, rise61, goes62 + 20)
  const cBeats: Beat[] = [[BC, 'explain', 'smiling'], [winners61, 'celebrate', 'smiling'], [fixed61, 'point', 'neutral'], [smaller62, 'thumbsUp', 'smiling']]
  // # D) pay vs prices columns
  const colT = span(f, y2026, n69 + 10)
  const dBeats: Beat[] = [[CD, 'explain', 'neutral'], [raise63, 'pointUp', 'neutral'], [bigger63, 'thumbsUp', 'smiling'], [ahead65, 'celebrate', 'smiling'], [not65, 'shrug', 'neutral'], [not65b, 'crossNoA', 'neutral', 'crossNoB', 12], [year65, 'scratchHead', 'thinking'], [real66, 'think', 'thinking'], [question66, 'think', 'thinking'], [faster66, 'point', 'smiling']]
  const race = span(f, prices66, faster66 + 16)

  return (
    <g>
      <Kitchen id="in-mo" f={f} mood="day" counter={G} />
      {/* # A) the drawer */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="hero" beats={aBeats} x={320} y={G + 10} s={0.95} />
        <Drawer x={860} y={G - 170} open={open}><Bill x={0} y={-40} s={0.6} glow={on(f, bill57, 10)} /></Drawer>
        <g opacity={on(f, cash57, 10)}><Bag x={1420} y={G} s={1.1} fill={bagFill} /></g>
        <g opacity={on(f, nothing57, 8)}><Label x={860} y={G + 70} text="EARNS NOTHING" size={40} /></g>
        <g opacity={on(f, power57, 8)}><Label x={1420} y={G + 70} text={f >= every57 ? 'LESS EVERY YEAR' : 'BUYING POWER'} size={40} fill={K.coral} ink={K.paper} /></g>
      </g>}
      {/* # B) savings at 1 % vs prices at 3 % */}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="hero" beats={bBeats} x={300} y={G + 10} s={0.95} />
        <g opacity={on(f, savings58 - 4, 10)} transform={`translate(0 ${-14 * pop(f, up59, 14) - 10 * pop(f, earns60, 14)})`}><Jar x={820} y={G} s={1.15} fill={0.55 + 0.1 * span(f, year59, n1010)} text={`$${Math.round(jarV).toLocaleString('en-US')}`} />
          <Label x={820} y={G + 70} text={f >= n1 ? 'SAVINGS, +1% A YEAR' : 'SAVINGS'} size={40} /></g>
        <g opacity={on(f, prices58 - 4, 10)}><Bag x={1380} y={G} s={1.1} fill={1} />
          <Tag x={1380} y={560 - 30 * span(f, n1030 - 10, n1030 + 8)} s={1.2} text={`$${Math.round(bagV).toLocaleString('en-US')}`} color={bagV > 1001 ? K.coral : K.sun} />
          <Label x={1380} y={G + 70} text={f >= n3 ? 'PRICES, +3% A YEAR' : 'PRICES'} size={40} />
          <g opacity={on(f, last59, 8) * (1 - on(f, n20, 8))} transform={`translate(1380 ${440 - 8 * pop(f, n1000c, 12)})`}><Label x={0} y={0} text={f >= now59 ? 'NOW' : 'LAST YEAR'} size={38} fill={f >= now59 ? K.coral : K.paper} ink={f >= now59 ? K.paper : K.ink} /></g></g>
        <g opacity={on(f, n1000, 8) * (1 - on(f, year59, 8))}><Label x={1100} y={230} text="YOU KEEP $1,000" size={46} /></g>
        {/* the gap */}
        <g opacity={on(f, n20, 8)}>
          <path d={`M980 ${520 - 0} L1220 ${490}`} stroke={K.coral} strokeWidth={8} strokeDasharray="16 10" />
          <Label x={1100} y={400} text={f >= behind59 ? '$20 BEHIND' : '$20'} size={58} fill={K.coral} ink={K.paper} />
        </g>
        <g opacity={on(f, balance59, 8) * (1 - on(f, real60, 8))}><Label x={1100} y={240} text="EVEN THOUGH YOUR BALANCE WENT UP" size={40} /></g>
        <g opacity={on(f, real60, 8)}><Label x={1100} y={240} text={f >= inflation60 ? 'REAL RETURN = EARNED − INFLATION' : 'THE REAL RETURN'} size={46} fill={K.ink} ink={K.paper} /></g>
      </g>}
      {/* # C) winners: a fixed payment */}
      {Cc > 0 && <g opacity={Cc}>
        <Person f={f} who="hero" beats={cBeats} x={300} y={G + 10} s={0.95} />
        <g opacity={on(f, borrowed61, 10)}><Car x={780} y={G} s={1.1} c={K.sea} f={f * 0} />
          <Tag x={780} y={560 - 10 * pop(f, fixed62, 14)} s={1.1 * (1 + 0.15 * pop(f, fixed62, 14))} text={f >= fixed61 ? '$ FIXED' : 'LOAN'} color={K.mint} /></g>
        <g opacity={on(f, car62, 8) * (1 - on(f, CD, 8))}><Label x={780} y={430} text="SAME PAYMENT" size={36} /></g>
        <g opacity={on(f, payment61, 10)}><Label x={780} y={G + 70} text={f >= same61 ? 'PAYMENT STAYS THE SAME' : 'YOUR PAYMENT'} size={38} /></g>
        {/* the paycheck that grows, with the payment slice */}
        <g opacity={on(f, pay61 - 4, 10)} transform={`translate(1380 ${G})`}>
          <rect x={-90} y={-360 * pay} width={180} height={360 * pay} rx={16} fill={K.mint} />
          <rect x={-90} y={-120} width={180} height={120} rx={16} fill={K.sea} />
          <text y={-60} textAnchor="middle" fill={K.paper} style={BB(40)}>CAR</text>
          <text y={-360 * pay + 60} textAnchor="middle" fill={K.ink} style={BB(44)}>PAYCHECK</text>
          <Label x={0} y={70} text={f >= smaller62 ? 'A SMALLER BITE' : f >= rise61 ? 'PAY RISES' : 'PAY'} size={38} fill={f >= smaller62 ? K.green : K.paper} ink={f >= smaller62 ? K.paper : K.ink} />
        </g>
        <g opacity={on(f, winners61, 8) * (1 - on(f, borrowed61, 8))}><Label x={1100} y={300} text="INFLATION HAS WINNERS" size={50} /></g>
      </g>}
      {/* # D) pay vs prices */}
      {D > 0 && <g opacity={D}>
        <Person f={f} who="hero" beats={dBeats} x={300} y={G + 10} s={0.95} />
        <g opacity={win(f, raise63, y2006, 8)}>
          <g transform="translate(900 0)"><rect x={-80} y={G - 320} width={160} height={320} rx={14} fill={K.mint} /><Label x={0} y={G + 60} text="RAISE" size={38} /></g>
          <g transform="translate(1260 0)"><rect x={-80} y={G - 260} width={160} height={260} rx={14} fill={K.coral} /><Label x={0} y={G + 60} text="INFLATION" size={38} /></g>
          <g opacity={on(f, bigger63, 8)}><Label x={1080} y={360} text="RAISE BIGGER = BETTER OFF" size={44} fill={K.green} ink={K.paper} /></g>
        </g>
        <g opacity={on(f, y2006, 10) * (1 - on(f, question66, 8))}>
          {[[900, 90, K.mint, 'PAY', n90], [1260, 69, K.coral, 'PRICES', n69]].map(([x, v, col, name, at], k) => { const h = 220 + 3 * (v as number) * (f >= (at as number) ? 1 : colT)
            return <g key={k} transform={`translate(${x} 0)`}>
              <rect x={-90} y={G - 220} width={180} height={220} rx={14} fill={col as string} opacity={0.45} />
              <rect x={-90} y={G - h} width={180} height={h} rx={14} fill={col as string} />
              <text y={G - 80} textAnchor="middle" fill={K.ink} style={BB(40)}>2006</text>
              <g opacity={on(f, at as number, 8)}><text x={0} y={G - h + 70} textAnchor="middle" fill={K.paper} style={BB(64)}>{`+${v}%`}</text></g>
              <Label x={0} y={G + 60} text={name as string} size={40} />
            </g> })}
          <g opacity={on(f, hourly64, 8)}><Label x={1080} y={220} text="AVERAGE HOURLY PAY, 2006 → 2026" size={40} /></g>
          <g opacity={on(f, ahead65, 8)}><Label x={1080} y={300} text={f >= everyone65 ? 'NOT FOR EVERYONE, NOT EVERY YEAR' : 'PAY STAYED AHEAD (ON AVERAGE)'} size={40} fill={f >= not65 ? K.paper : K.green} ink={f >= not65 ? K.ink : K.paper} /></g>
        </g>
        {/* the race */}
        <g opacity={on(f, question66, 10)}>
          <path d={`M700 ${G - 120} L${700 + 900 * race} ${G - 120 - 380 * race}`} stroke={K.coral} strokeWidth={22} strokeLinecap="round" />
          <path d={`M700 ${G - 60} L${700 + 920 * race} ${G - 60 - 460 * race * (f >= money66 ? 1 : 0)}`} stroke={K.green} strokeWidth={22} strokeLinecap="round" opacity={on(f, money66, 8)} />
          <Tag x={720 + 900 * race} y={G - 140 - 380 * race} s={0.9} text="PRICES" color={K.coral} />
          <g opacity={on(f, money66, 8)}><Bill x={760 + 920 * race} y={G - 60 - 460 * race} s={0.5} /></g>
          <g opacity={on(f, faster66, 8)}><Label x={1100} y={260} text="IS YOUR MONEY RISING FASTER?" size={46} /></g>
        </g>
      </g>}
      <Headline f={f} lines={[[remember57, 'STEP 6: YOUR MONEY', K.ink, 100], [keep58, '1% SAVINGS VS 3% PRICES', K.ink, 92], [winners61, 'FIXED DEBTS WIN', K.ink, 100], [pay63, 'YOUR PAY MATTERS MOST', K.ink, 96], [question66, 'THE REAL QUESTION', K.ink, 100]]} />
    </g>
  )
}

export const IN_MONEY = makePiece('in-money', "Step six, what inflation means for your money, back in grandma's kitchen: the drawer slides open on the 100-dollar bill that earns nothing while the grocery bag beside it empties year by year; a savings jar paying 1 percent climbs from 1,000 to 1,010 dollars while the grocery bag's tag climbs from 1,000 to 1,030, a dashed gap reads 20 dollars behind, then the real return; winners: a car with a fixed payment tag and a growing paycheck column where the car payment's slice gets smaller; a raise column vs an inflation column; two columns from 2006: pay +90 percent and prices +69 percent, pay stayed ahead on average but not for everyone; a race between a price arrow and a money arrow", {
  mood: 'light', Component: Money,
  beats: ["s57:remember", "s57:bill", "s57:drawer", "s57:cash", "s57:nothing", "s57:loses", "s57:power", "s57:every", "s57:year", "s58:keep", "s58:1000", "s58:savings", "s58:1", "s58:prices", "s58:3", "s59:year", "s59:1010", "s59:things", "s59:1030", "s59:20", "s59:behind", "s59:balance", "s59:up", "s59:1000", "s59:last", "s59:now", "s60:people", "s65:not#2", "s66:real", "s60:real", "s60:return", "s60:earns", "s60:inflation", "s60:taken", "s61:winners", "s61:borrowed", "s61:fixed", "s61:payment", "s61:same", "s61:pay", "s61:rise", "s62:fixed", "s62:car", "s62:smaller", "s62:goes", "s63:pay", "s63:raise", "s63:bigger", "s64:2006", "s64:2026", "s64:hourly", "s64:90", "s64:69", "s65:ahead", "s65:not", "s65:everyone", "s65:year", "s66:question", "s66:prices", "s66:money", "s66:faster"],
  sfx: [['s57:drawer', 'swish', 0.1], ['s59:20', 'thud', 0.1], ['s64:90', 'ding', 0.1]] })
