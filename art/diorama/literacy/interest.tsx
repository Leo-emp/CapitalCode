// ---------------------------------------------------------------- s58–s69: lesson five, interest works both ways
// A) s58–s59 the study: two arrows — a green one up (savings), a red one down (debt) that grows thick on "brutal";
//            a credit card with a 22% price tag.
// B) s60–s64 inside card 5: a $5,000 balance column. Each month a red interest sliver lands on top and a payment
//            knocks it off — the balance never moves. Over a year the red coins pile up: $1,100+ a year, $90+ a month;
//            a DAILY stamp: interest added every day makes it a little higher still.
// C) s65–s68 the study: a balance scale — 4% savings vs 22% card debt (the card side sinks); $1 paid off saves 22¢,
//            CERTAIN (check); "promise 22%?" for investments, crossed; three steps CUSHION → DEBT → INVEST, card 10 starred.
// D) s69     calendar pages fly (years) and a three-digit "???" appears (lesson six).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { C, Card, Check, Coin, CreditCard, Cross, DESK, Defs, Grain, Lamp, Study, Tag, fadeIn, scene } from './kit'
import { Arrow, Calendar, Column, Jar, Num, PriceTag, Scale, Sheet, cues, Sweep } from './kit2'

const K = {
  both: 's58:both', debt58: 's58:debt', brutal: 's58:brutal',
  third: 's59:third', average: 's59:average', card59: 's59:card', twenty59: 's59:twenty',
  step60: 's60:step',
  owe: 's61:owe', five61: 's61:five', month61: 's61:month', balance: 's61:balance',
  year62: 's62:year', twenty62: 's62:twenty', interest62: 's62:interest', one62: 's62:one',
  ninety: 's63:ninety', stay: 's63:stay', exactly63: 's63:exactly',
  every: 's64:every', day: 's64:day', higher: 's64:higher',
  next: 's65:next', four65: 's65:four', twenty65: 's65:twenty',
  dollar: 's66:dollar', twenty66: 's66:twenty', cents: 's66:cents', certain: 's66:certain',
  investments: 's67:investments', promise: 's67:promise',
  order: 's68:order', cushion: 's68:cushion', debt68: 's68:debt', investing: 's68:investing', exception: 's68:exception',
  another: 's69:another', years69: 's69:years', three69: 's69:three', number69: 's69:number',
}
const BASE = 930

const Interest: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s60') - 6, BC = c('s65') - 6, CD = c('s69') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)

  // # B) the monthly treadmill: a sliver rises and is knocked off every 24 frames once the balance is set
  const cyc = f > t.balance ? ((f - t.balance) % 24) / 24 : 0
  const sliver = f > t.balance && f < t.higher + 30 ? Math.sin(Math.min(1, cyc * 1.6) * Math.PI / 2) * (cyc < 0.75 ? 1 : 1 - (cyc - 0.75) * 4) : 0
  const months = f > t.balance ? Math.min(12, Math.floor((f - t.balance) / 24)) : 0
  // # C) the scale sinks on the card side
  const tilt = lerp(0, 14, on(f, t.twenty65, 16))

  return (
    <g>
      <Defs />
      {/* ---------------- A) both ways ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study f={f} />
        <Lamp x={1780} s={0.75} />
        <g opacity={1 - on(f, t.third - 4, 10)}>
          <Arrow x1={700} y1={DESK + 60} x2={700} y2={DESK - 380} p={span(f, t.both - 4, t.both + 12)} color={C.cash} w={26} />
          <Tag x={700} y={DESK + 140} text="SAVINGS: FOR YOU" size={40} point="none" color={C.cashL} o={on(f, t.both, 8)} />
          <Arrow x1={1220} y1={DESK - 380} x2={1220} y2={DESK + 60} p={span(f, t.debt58 - 4, t.debt58 + 12)} color={C.red} w={lerp(26, 52, on(f, t.brutal, 10))} />
          <Tag x={1220} y={DESK + 140} text="DEBT: AGAINST YOU" size={40} point="none" color={C.tomato} ink="#fff" o={on(f, t.debt58, 8)} />
        </g>
        <g opacity={on(f, t.third - 4, 10)}>
          <CreditCard x={900} y={DESK - 120} s={1.8} r={-6} />
          <PriceTag x={1270} y={DESK - 260} text="≈22%" s={1.3} o={on(f, t.twenty59, 8)} color={C.tomato} ink="#fff" />
          <Tag x={900} y={DESK + 140} text="A YEAR, ON CARDS CHARGED INTEREST" size={36} point="none" o={on(f, t.average, 8)} />
        </g>
      </g>}

      {/* ---------------- B) the treadmill ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet n={5} />
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [t.owe, 'nervous', 'worried'], [t.year62, 'scratchHead', 'worried'], [t.ninety, 'shock', 'shocked'], [t.stay, 'facepalm', 'worried'], [t.higher, 'despair', 'worried']]} x={260} y={BASE + 70} s={0.85} />
        <Column x={720} base={BASE} h={420 * on(f, t.five61, 14)} w={260} color={C.plum} under="CARD BALANCE" o={on(f, t.owe, 8)} />
        {/* # the monthly sliver: interest lands, the payment knocks it off */}
        <Num x={720} y={BASE - 520} text="$5,000" size={64} o={on(f, t.five61, 8)} />
        {sliver > 0.02 && <rect x={590} y={BASE - 420 - 70 * sliver} width={260} height={70 * sliver} rx={8} fill={C.red} />}
        <Tag x={1000} y={BASE - 470} text={`MONTH ${Math.max(1, months)}: INTEREST IN, PAYMENT OUT`} size={34} point="none" o={win(f, t.balance, t.year62, 8)} />
        {/* # the year's interest piles up as red coins */}
        <g opacity={on(f, t.year62, 8)}>
          {Array.from({ length: 12 }, (_, k) => <Coin key={k} x={1250 + (k % 4) * 110} y={BASE - 40 - Math.floor(k / 4) * 70} r={44} label="$" o={on(f, t.year62 + k * 3, 6)} />)}
          <Num x={1415} y={BASE - 300} text="22% OF $5,000" size={56} color={C.inkSoft} o={on(f, t.twenty62, 8)} />
          <Num x={1415} y={BASE - 380} text="$1,100+ A YEAR" size={90} color={C.redD} o={on(f, t.one62, 8)} />
        </g>
        <Tag x={1415} y={BASE + 70} text="$90+ A MONTH, JUST TO STAY PUT" size={38} point="none" color={C.tomato} ink="#fff" o={on(f, t.ninety, 8)} />
        <g opacity={on(f, t.every, 8)} transform="translate(1000 420) rotate(-10)"><rect x={-110} y={-44} width={220} height={88} rx={10} fill="none" stroke={C.red} strokeWidth={7} /><text y={24} textAnchor="middle" fill={C.red} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>DAILY</text></g>
      </g>}

      {/* ---------------- C) the scale, the certain saving, the order ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} />
        <g opacity={1 - on(f, t.dollar - 4, 10)}>
          <Scale x={960} y={DESK + 120} tilt={tilt} s={1} left={<g><Jar x={0} y={0} s={0.42} fill={0.6} /><Tag x={0} y={-170} text="SAVINGS 4%" size={34} point="none" color={C.cashL} o={on(f, t.four65, 8)} /></g>}
            right={<g><CreditCard x={0} y={-50} s={0.6} r={-4} /><Tag x={0} y={-170} text="CARD 22%" size={34} point="none" color={C.tomato} ink="#fff" o={on(f, t.twenty65, 8)} /></g>} />
        </g>
        <g opacity={on(f, t.dollar - 4, 10) * (1 - on(f, t.order - 4, 10))}>
          <Coin x={620} y={DESK - 160} r={130} label="$1" />
          <Tag x={620} y={DESK + 60} text="$1 OF CARD DEBT PAID OFF" size={36} point="none" />
          <Arrow x1={800} y1={DESK - 160} x2={1060} y2={DESK - 160} p={span(f, t.twenty66, t.twenty66 + 12)} color={C.cashD} w={16} />
          <Coin x={1250} y={DESK - 160} r={110} label="22¢" o={on(f, t.twenty66, 8)} />
          <Tag x={1250} y={DESK + 60} text="SAVED EVERY YEAR" size={36} point="none" color={C.cashL} o={on(f, t.cents, 8)} />
          <Check x={1400} y={DESK - 300} r={46} p={on(f, t.certain, 10)} />
          <g opacity={on(f, t.investments, 8)}><Tag x={960} y={DESK - 420} text="AN INVESTMENT THAT PROMISES 22%?" size={40} point="none" color={C.paperD} /><Cross x={1300} y={DESK - 420} r={50} p={on(f, t.promise + 6, 12)} /></g>
        </g>
        <g opacity={on(f, t.order - 4, 10)}>
          {[['SMALL CUSHION', t.cushion, C.tomato], ['HIGH-INTEREST DEBT', t.debt68, C.plum], ['INVESTING', t.investing, C.cashD]].map(([label, at, col], k) => (
            <g key={k} opacity={on(f, (at as number) - 2, 8)}>
              <rect x={360 + k * 400} y={DESK + 120 - (k + 1) * 110} width={380} height={(k + 1) * 110} rx={10} fill={col as string} />
              <text x={550 + k * 400} y={DESK + 100 - (k + 1) * 110 + 60} textAnchor="middle" fill="#fff" style={{ font: '400 46px "Bebas Neue"' }}>{`${k + 1}`}</text>
              <Tag x={550 + k * 400} y={DESK - 70 - (k + 1) * 110} text={label as string} size={36} />
            </g>
          ))}
          <Card x={1640} y={DESK - 380} s={0.6} n={10} r={6} o={on(f, t.exception, 8)} glow={on(f, t.exception, 8)} />
          <Tag x={1640} y={DESK - 230} text="ONE EXCEPTION" size={34} point="up" color={C.brassL} o={on(f, t.exception, 8)} />
        </g>
      </g>}

      {/* ---------------- D) a three-digit number follows you ---------------- */}
      {D > 0 && <g opacity={D}>
        <Study f={f} />
        {[0, 1, 2, 3].map((k) => <Calendar key={k} x={560 + k * 60} y={DESK - 160 - k * 20} s={0.9} top="YEAR" big={String(k + 1)} color={C.teal} o={on(f, t.years69 - 6 + k * 4, 6) * (1 - on(f, t.three69, 10) * 0.6)} />)}
        <Num x={1260} y={DESK - 60} text="???" size={320} color={C.brassL} o={on(f, t.three69, 10)} />
        <Tag x={1260} y={DESK + 80} text="A 3-DIGIT NUMBER" size={44} point="none" o={on(f, t.number69, 8)} />
      </g>}

      <Headline f={f} lines={[[t.both, 'INTEREST WORKS BOTH WAYS', C.paper, 96], [t.brutal, 'ON DEBT: BRUTAL', C.tomato, 110], [t.third, 'AVERAGE CARD RATE, 2026', C.paper, 96],
        [t.step60, 'STEP BY STEP', C.ink, 110], [t.year62, 'THE COST OF STANDING STILL', C.ink, 96], [t.next, '4% vs 22%', C.paper, 120], [t.dollar, 'A CERTAIN RETURN', C.paper, 104],
        [t.order, 'A COMMON ORDER', C.paper, 104], [CD + 4, 'IT FOLLOWS YOU FOR YEARS', C.paper, 96]]} />
      <Sweep f={f} at={EXTRA['fl-interest'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_INTEREST = makePiece('fl-interest', 'Lesson 5, interest works both ways: a green savings arrow up and a red debt arrow down that thickens on brutal; a credit card with a 22% price tag; inside card 5 a $5,000 card balance column, each month a red interest sliver lands and the payment knocks it off, a year of red coins piles up — 22% of $5,000 = $1,100+ a year, $90+ a month just to stay put, a DAILY stamp; a balance scale 4% savings vs 22% card sinks; $1 paid off saves 22¢ every year, certain; an investment promising 22% crossed; three steps small cushion → high-interest debt → investing, card 10 one exception; flying year pages and a three-digit ??? number', {
  mood: 'light', Component: Interest, beats: [...Object.values(K), ...EXTRA['fl-interest']],
  sfx: [['s58:brutal', 'thud', 0.18], ['s62:one', 'cash', 0.16], ['s65:twenty', 'thud', 0.14], ['s66:certain', 'ding', 0.16], ['s69:three', 'pop', 0.14]] })
void pop
