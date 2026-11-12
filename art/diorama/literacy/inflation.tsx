// ---------------------------------------------------------------- s82–s91: lesson seven, inflation
// A) s82     the study: a jar of coins sits still while calendar years flip; the coins inside shrink.
// B) s83–s85 inside card 7: a giant shopping basket (food, a car, a little house for rent) with a price tag; from
//            January 2000 the tag doubles ($50 → $100); a $100 bill today = a $50 bill in 2000.
// C) s86–s90 the study: the trap — $1,000 in an average account (0.38%) grows to $1,004, while the same basket goes from
//            $1,000 to $1,037 (+3.7%); the gap: ≈ 3% less buying power, without spending a cent.
// D) s91     two arrows race: money must grow faster than prices; a sparkle teases the secret weapon (card 8).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Bill, C, Card, Coin, DESK, Defs, FONT, Grain, Lamp, Study, Tag, fadeIn, scene } from './kit'
import { Arrow, Basket, Calendar, Jar, Num, PriceTag, Sheet, cues, Sweep } from './kit2'

const K = {
  sits: 's82:sits', still: 's82:still', shrinking: 's82:shrinking',
  inflation: 's83:inflation', prices83: 's83:prices', tracked: 's83:tracked', basket83: 's83:basket', food: 's83:food', cars: 's83:cars', rent: 's83:rent',
  since: 's84:since', january: 's84:january', doubled: 's84:doubled',
  hundred85: 's85:hundred', fifty85: 's85:fifty', bought: 's85:bought',
  trap: 's86:trap', prices86: 's86:prices', three86: 's86:three',
  thousand87: 's87:thousand', zero87: 's87:zero',
  later: 's88:later', grown: 's88:grown', four88: 's88:four',
  basket89: 's89:basket', costs: 's89:costs', thirty89: 's89:thirty',
  more90: 's90:more', less90: 's90:less', lost: 's90:lost', cent: 's90:cent',
  ahead: 's91:ahead', faster: 's91:faster', secret: 's91:secret', weapon: 's91:weapon',
}

// # a little sparkle
const Spark: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <path transform={`translate(${x} ${y}) scale(${s})`} opacity={o} d="M0 -60 Q8 -8 60 0 Q8 8 0 60 Q-8 8 -60 0 Q-8 -8 0 -60 Z" fill={C.brassL} />
)

const Inflation: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s83') - 6, BC = c('s86') - 6, CD = c('s91') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)

  const shrink = on(f, t.shrinking, 30)
  const dbl = span(f, t.since, t.doubled + 12)
  const grow = span(f, t.grown, t.four88 + 10), rise = span(f, t.costs, t.thirty89 + 10)
  const race = span(f, t.ahead, t.faster + 20)

  return (
    <g>
      <Defs />
      {/* ---------------- A) money that sits still ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study f={f} />
        <Lamp x={1780} s={0.75} />
        <Jar x={800} y={DESK + 100} s={1.2} fill={0.75} o={on(f, t.sits - 6, 10)} />
        {Array.from({ length: 6 }, (_, k) => <Coin key={k} x={720 + (k % 3) * 80} y={DESK - 60 - Math.floor(k / 3) * 110} r={lerp(40, 24, shrink)} />)}
        {[0, 1, 2].map((k) => <Calendar key={k} x={1300} y={DESK - 140} s={1} top="YEAR" big={String(k + 1)} color={C.teal} o={win(f, t.still + k * 12, k < 2 ? t.still + k * 12 + 14 : 9e9, 4)} />)}
      </g>}

      {/* ---------------- B) the basket's price doubles ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet n={7} />
        <g opacity={1 - on(f, t.hundred85 - 6, 10)}>
          <Basket x={760} y={920} s={1.5} o={on(f, t.basket83 - 6, 10)} />
          <Tag x={540} y={500} text="FOOD" size={36} o={on(f, t.food, 8)} />
          <Tag x={840} y={480} text="CARS" size={36} o={on(f, t.cars, 8)} />
          <Tag x={1000} y={520} text="RENT" size={36} o={on(f, t.rent, 8)} />
          <Tag x={760} y={330} text="CONSUMER PRICE INDEX" size={38} point="none" color={C.paperD} o={on(f, t.tracked, 8)} />
          <g opacity={on(f, t.since - 4, 8)}>
            <PriceTag x={1380} y={640} text={dbl < 0.5 ? '$50' : '$100'} s={lerp(1.1, 1.7, dbl)} />
            <Tag x={1430} y={860} text={dbl < 0.5 ? 'JANUARY 2000' : 'TODAY'} size={40} point="none" />
            <Num x={1430} y={420} text="× 2" size={120} color={C.tomatoD} o={on(f, t.doubled, 8)} />
          </g>
        </g>
        <g opacity={on(f, t.hundred85 - 6, 10)}>
          <Bill x={620} y={620} s={3.2} r={-4} /><Tag x={620} y={800} text="$100 TODAY" size={48} point="none" />
          <Num x={960} y={660} text="=" size={180} color={C.ink} o={on(f, t.fifty85, 8)} />
          <Bill x={1320} y={620} s={2.2} r={4} o={on(f, t.fifty85, 8)} /><Tag x={1320} y={800} text="$50 IN 2000" size={48} point="none" o={on(f, t.bought, 8)} />
        </g>
      </g>}

      {/* ---------------- C) the trap: +$4 vs +$37 ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} />
        <PriceTag x={1500} y={330} text="+3.7%" s={1} o={on(f, t.three86, 8)} color={C.tomato} ink="#fff" />
        <g opacity={on(f, t.thousand87 - 4, 10)}>
          <Jar x={700} y={DESK + 100} s={1.1} fill={0.6} label="AVG 0.38%" />
          <Num x={700} y={DESK - 300} text={grow > 0.5 ? '$1,004' : '$1,000'} size={110} color={C.paper} />
          <Num x={700} y={DESK - 400} text="+$4" size={64} color={C.cashL} o={on(f, t.four88, 8)} />
        </g>
        <g opacity={on(f, t.basket89 - 4, 10)}>
          <Basket x={1240} y={DESK + 100} s={1.0} />
          <Num x={1240} y={DESK - 300} text={rise > 0.5 ? '$1,037' : '$1,000'} size={110} color={C.brassL} />
          <Num x={1240} y={DESK - 400} text="+$37" size={64} color={C.tomato} o={on(f, t.thirty89, 8)} />
        </g>
        <Tag x={960} y={DESK + 230} text="≈ 3% LESS BUYING POWER" size={44} point="none" color={C.tomato} ink="#fff" o={on(f, t.less90, 8)} />
        <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [t.more90, 'present', 'thinking'], [t.lost, 'shock', 'shocked'], [t.cent, 'emptyPockets', 'worried']]} x={1620} y={1080} s={0.62} o={on(f, t.more90 - 6, 10)} />
      </g>}

      {/* ---------------- D) grow faster than prices ---------------- */}
      {D > 0 && <g opacity={D}>
        <Study f={f} />
        <Arrow x1={300} y1={DESK - 80} x2={lerp(400, 1300, race)} y2={DESK - 80} p={on(f, t.ahead - 4, 8)} color={C.red} w={26} />
        <Tag x={300} y={DESK - 160} text="PRICES" size={40} color={C.tomato} ink="#fff" point="none" o={on(f, t.ahead, 8)} />
        <Arrow x1={300} y1={DESK + 90} x2={lerp(400, 1520, race)} y2={DESK + 90} p={on(f, t.ahead - 4, 8)} color={C.cash} w={26} />
        <Tag x={300} y={DESK + 170} text="YOUR MONEY" size={40} color={C.cashL} point="none" o={on(f, t.ahead, 8)} />
        <Card x={1620} y={DESK - 300} s={0.7} n={8} r={5} o={on(f, t.secret - 4, 8)} glow={on(f, t.weapon, 10)} />
        <Spark x={1760} y={DESK - 420} s={1 + 0.2 * Math.sin(f / 6)} o={on(f, t.secret, 8)} />
        <Spark x={1500} y={DESK - 440} s={0.6} o={on(f, t.weapon, 8)} />
      </g>}

      <Headline f={f} lines={[[t.still, 'MONEY THAT SITS STILL SHRINKS', C.paper, 92], [t.inflation, 'INFLATION: PRICES RISE', C.ink, 104], [t.since, 'SINCE 2000: ROUGHLY DOUBLED', C.ink, 96],
        [t.trap, 'THE TRAP', C.paper, 120], [t.more90, 'MORE DOLLARS, LESS STUFF', C.paper, 100], [t.ahead, 'GROW FASTER THAN PRICES', C.paper, 100]]} />
      <Sweep f={f} at={EXTRA['fl-inflation'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_INFLATION = makePiece('fl-inflation', 'Lesson 7, inflation: a jar of coins sits still while calendar years flip and the coins shrink; inside card 7 a giant shopping basket of food, a car and a house (Consumer Price Index) whose price tag doubles from $50 in January 2000 to $100 today; a $100 bill today = a $50 bill in 2000; the trap: $1,000 in an average 0.38% jar grows to $1,004 while the same basket goes to $1,037 (+3.7%), about 3% less buying power, a worker shows empty pockets; a red PRICES arrow and a green YOUR MONEY arrow race, card 8 sparkles (secret weapon)', {
  mood: 'light', Component: Inflation, beats: [...Object.values(K), ...EXTRA['fl-inflation']],
  sfx: [['s84:doubled', 'pop', 0.14], ['s86:trap', 'thud', 0.16], ['s90:less', 'thud', 0.14], ['s91:secret', 'chime', 0.16]] })
void pop; void FONT
