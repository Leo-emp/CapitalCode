// ---------------------------------------------------------------- s40–s58: cause one (too much money) and why prices don't come back down
// A) The bread market: a paper stall with 100 loaves (10 x 10) and a $100 pile (s41); the price tag reads $1 (s42); the money pile doubles to $200, the loaves stay (s43);
//    the tag drifts to $2 (s44); your dollar shrinks: A CLAIM ON LESS BREAD (s46); a fast-spinning dollar vs a sleeping one in a drawer (velocity, s48).
// B) The real story: a paper M2 money stack grows +40% (s49); relief cheques, a rate dial at ZERO (s50); a shut factory and stuck ships (s51); the thermometer to 9.1% in JUNE 2022 (s52).
// C) A staircase of prices: inflation falling to 3.7% is a smaller step up, never down (s54–s55); +31% SINCE 2020 stays (s56); your shop $120 → $157 (s57);
//    two signs DISINFLATION (slower up) vs DEFLATION (down) (s58).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Arrow, Back, Basket, C, Calendar, Cash, Cut, Defs, Dollar, Grain, Loaf, Tag, Thermo, big, box, fadeIn, scene } from './kit'

const G = 900
const Money: React.FC<PieceProps> = ({ f, c }) => {
  const causes = c('s40:causes'), chasing = c('s40:chasing'), loaves = c('s41:loaves'), pockets = c('s41:pockets'), dollar = c('s42:dollar'), doubles = c('s43:doubles'), two = c('s43:two')
  const bakers = c('s44:bakers'), drifts = c('s44:drifts'), richer = c('s45:richer'), claim = c('s46:claim'), core = c('s47:core'), grows = c('s47:grows'), fast = c('s48:fast'), ten = c('s48:ten'), drawer = c('s48:drawer')
  const m2 = c('s49:m2'), forty = c('s49:forty'), relief = c('s50:relief'), zero = c('s50:zero'), spend = c('s50:spend'), factories = c('s51:factories'), ships = c('s51:ships'), less = c('s51:less'), nine = c('s52:nine'), decades = c('s52:decades')
  const confuses = c('s53:confuses'), news = c('s54:news'), slowly = c('s55:slowly'), three = c('s55:three'), still = c('s55:still'), stays = c('s56:stays'), thirty = c('s56:thirty'), gone = c('s56:gone')
  const early = c('s57:early'), fifty = c('s57:fifty'), disinflation = c('s58:disinflation'), deflation = c('s58:deflation')
  const AB = c('s49') - 6, BC = c('s53') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const price = f < drifts ? 1 : lerp(1, 2, on(f, drifts, 24))
  const steps = [100.9, 106.3, 115.1, 119.3, 122.2, 125.9, 130.6]  // # CPI-U each September as % of Jan 2020 (FRED CPIAUCNS)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.025] as [number, number, number, number]), 26)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <Back sky="warm" f={f} sun={[1660, 230]} />
        <g opacity={1 - on(f, core - 6, 8)}>
          <Cut d={box(220, 520, 760, 380, 10)} fill={C.brown} /><Cut d="M200 520 H1000 L960 440 H240 Z" fill={C.coral} />
          {[...Array(30)].map((_, k) => <Loaf key={k} x={290 + (k % 10) * 70} y={620 + Math.floor(k / 10) * 90} s={0.62} o={on(f, loaves - 6 + k * 0.5, 6)} />)}
          <Tag x={600} y={380} text="100 LOAVES" size={40} o={on(f, loaves, 8) * (1 - on(f, dollar - 4, 6))} />
          <Tag x={600} y={380} text={`$${price.toFixed(2)} A LOAF`} size={56} color={price > 1.05 ? C.coral : C.mustard} ink={price > 1.05 ? '#fff' : C.ink} o={on(f, dollar - 2, 8)} />
          <Cash x={1400} y={G - 20} n={lerp(6, 12, on(f, doubles, 20))} s={1.3} o={on(f, pockets - 6, 8)} />
          <Tag x={1400} y={420} text={f >= two ? '$200 OF MONEY' : '$100 OF MONEY'} size={48} color={f >= two ? C.coral : C.cream} ink={f >= two ? '#fff' : C.ink} o={on(f, pockets - 2, 8)} />
          <Tag x={600} y={300} text="BAKERS DIDN'T BAKE MORE" size={36} color={C.teal} ink="#fff" o={win(f, bakers - 2, richer, 8)} />
          <g opacity={on(f, claim - 6, 8)}><rect width={1920} height={1080} fill={C.paper} opacity={0.97} /><Dollar x={960} y={540} s={2} power={lerp(1, 0.5, on(f, claim, 24))} /><Loaf x={960} y={830} s={lerp(2, 1, on(f, claim, 24))} /><Tag x={960} y={300} text="EACH DOLLAR: A CLAIM ON LESS BREAD" size={48} color={C.coral} ink="#fff" o={on(f, claim, 8)} /></g>
        </g>
        <g opacity={on(f, core - 6, 8)}>
          <Tag x={960} y={300} text="SPENDING GROWS FASTER THAN STUFF" size={50} color={C.mustard} o={on(f, grows - 4, 8) * (1 - on(f, fast - 6, 8))} />
          <g opacity={on(f, fast - 6, 8)}>
            <g transform={`translate(560 560) rotate(${(f - fast) * 9 * on(f, ten - 4, 10)})`}><Dollar x={0} y={0} s={1.3} /></g>
            <Tag x={560} y={800} text="CHANGES HANDS 10x A YEAR" size={40} color={C.coral} ink="#fff" o={on(f, ten, 8)} />
            <Cut d={box(1160, 600, 520, 220, 14)} fill={C.brown} /><Dollar x={1420} y={560} s={0.9} />
            <Tag x={1420} y={880} text="ASLEEP IN A DRAWER" size={40} o={on(f, drawer - 2, 8)} />
          </g>
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Back sky="day" f={f} sun={[1660, 230]} />
        <g opacity={1 - on(f, nine - 8, 8)}>
          <Cash x={420} y={G - 20} n={lerp(8, 11.2, on(f, forty - 4, 30))} s={1.6} o={on(f, AB, 8)} />
          <Tag x={420} y={340} text={f >= forty ? 'M2: +40% IN ~2 YEARS' : 'US MONEY SUPPLY (M2)'} size={44} color={f >= forty ? C.coral : C.cream} ink={f >= forty ? '#fff' : C.ink} o={on(f, m2 - 2, 8)} />
          <g opacity={pop(f, relief - 2, 10)} transform="translate(960 480) rotate(-6)"><Cut d={box(-150, -70, 300, 140, 10)} fill={C.cream} /><text y={-10} textAnchor="middle" fill={C.ink} style={big(40)}>RELIEF</text><text y={44} textAnchor="middle" fill={C.teal} style={big(44)}>PAY TO YOU</text></g>
          <Tag x={960} y={680} text="RATES NEAR ZERO" size={44} color={C.mustard} o={pop(f, zero - 2, 10)} />
          <Tag x={960} y={790} text="MORE TO SPEND" size={40} color={C.coral} ink="#fff" o={on(f, spend - 2, 8)} />
          <g opacity={on(f, factories - 4, 8)} transform="translate(1480 0)"><Cut d={`M-200 ${G} V${G - 200} L-120 ${G - 260} V${G - 200} L-40 ${G - 260} V${G - 200} L40 ${G - 260} V${G} Z`} fill={C.grey} /><Tag x={-80} y={G - 320} text="SHUT" size={40} color={C.coral} ink="#fff" /></g>
          <g opacity={on(f, ships - 4, 8)}>{[0, 1, 2].map((k) => <Cut key={k} d={`M${1240 + k * 150} ${G + 70} h120 l-18 34 h-84 Z M${1260 + k * 150} ${G + 70} v-40 h60 v40 Z`} fill={[C.coral, C.teal, C.mustard][k]} />)}<Tag x={1480} y={G + 150} text="SHIPS STUCK" size={36} /></g>
          <Tag x={1480} y={420} text="LESS STUFF TO BUY" size={44} color={C.teal} ink="#fff" o={on(f, less - 2, 8)} />
        </g>
        <g opacity={on(f, nine - 8, 8)}>
          <Thermo x={960} y={800} v={9.06 * on(f, nine - 6, 30)} max={10} label="JUNE 2022: 9.1%" s={1.05} />
          <Tag x={1450} y={420} text="FASTEST IN FOUR DECADES" size={44} color={C.coral} ink="#fff" o={on(f, decades - 2, 8)} />
        </g>
      </g>}
      {Cc > 0 && <g opacity={Cc}>
        <Back sky="mint" f={f} sun={null} />
        {steps.map((v, k) => { const x = 320 + k * 210, h = (v - 95) * 13, o = on(f, (k < 3 ? news : slowly) - 6 + k * 4, 8)
          return <g key={k} opacity={o}><Cut d={box(x - 90, G - h, 180, h, 6)} fill={k < 3 ? C.coral : C.mustard} /><text x={x} y={G - h - 20} textAnchor="middle" fill={C.ink} style={big(36)}>{2020 + k}</text></g> })}
        <Tag x={560} y={300} text="INFLATION FALLING ≠ PRICES FALLING" size={44} color={C.coral} ink="#fff" o={on(f, news, 8) * (1 - on(f, stays - 6, 8))} />
        <Tag x={1300} y={300} text="9% → 3.7%: SMALLER STEPS, STILL UP" size={40} color={C.mustard} o={on(f, three - 2, 8) * (1 - on(f, stays - 6, 8))} />
        <rect x={320 - 100} y={G - (steps[0] - 95) * 13 - 10} width={200} height={(steps[0] - 95) * 13 + 10} fill="none" stroke={C.ink} strokeWidth={8} opacity={on(f, c('s56:2020') - 2, 8)} />
        <rect x={320 + 6 * 210 - 100} y={G - (steps[6] - 95) * 13 - 10} width={200} height={(steps[6] - 95) * 13 + 10} fill="none" stroke={C.coral} strokeWidth={8} opacity={on(f, c('s56:2026') - 2, 8)} />
        <Arrow x1={320} y1={G - 110} x2={1580} y2={G - 480} o={on(f, still, 8) * (1 - on(f, stays - 6, 8))} col={C.ink} w={8} />
        <g opacity={on(f, stays - 4, 8) * (1 - on(f, disinflation - 6, 8))}>
          <Tag x={960} y={300} text="+31% SINCE JAN 2020, AND IT STAYS" size={50} color={C.coral} ink="#fff" o={on(f, thirty - 2, 8)} />
          <Basket x={1600} y={G - 520} s={0.9} tag={f >= fifty ? '$157' : '$120'} tagCol={f >= fifty ? C.coral : C.cream} o={on(f, early - 6, 8)} />
        </g>
        <g opacity={on(f, disinflation - 4, 8)}>
          <rect width={1920} height={1080} fill={C.paper} opacity={0.97} />
          <Tag x={560} y={500} text="DISINFLATION" size={72} color={C.mustard} rot={-3} /><text x={560} y={640} textAnchor="middle" fill={C.ink} style={big(48)}>PRICES RISE SLOWER</text><Arrow x1={460} y1={820} x2={680} y2={740} col={C.mustard} />
          <g opacity={on(f, deflation - 2, 8)}><Tag x={1360} y={500} text="DEFLATION" size={72} color={C.teal} ink="#fff" rot={3} /><text x={1360} y={640} textAnchor="middle" fill={C.ink} style={big(48)}>PRICES FALL</text><Arrow x1={1260} y1={740} x2={1480} y2={820} col={C.teal} /></g>
        </g>
      </g>}
      <Headline f={f} lines={[[causes, 'CAUSE ONE: TOO MUCH MONEY', C.ink, 96], [m2, 'WHAT HAPPENED AFTER 2020', C.ink, 100], [confuses, 'WHY PRICES DON\'T COME DOWN', C.ink, 96]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s40:what","s40:rise","s40:there","s40:first","s40:goods","s41:picture","s41:hundred#2","s42:people","s42:bread","s42:ends","s43:still","s43:loaves","s44:more","s44:dollars","s45:same","s45:more","s46:every","s46:bread","s47:when","s47:there","s47:rise","s48:how","s48:exists","s48:dollar","s48:far","s49:2020","s49:america's","s49:years","s50:governments","s50:interest","s50:people","s51:same","s51:buy","s52:2022","s52:us","s52:year","s52:fastest","s53:now","s53:everyone","s54:falling","s54:prices","s55:means","s55:inflation","s55:nine","s55:2022","s55:2026","s55:year","s56:us","s56:total","s57:hundred","s57:costs","s58:slower","s58:falling","s58:see","s58:news"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s56:2020', 's56:2026', 's40:causes', 's40:chasing', 's41:loaves', 's41:pockets', 's42:dollar', 's43:doubles', 's43:two', 's44:bakers', 's44:drifts', 's45:richer', 's46:claim', 's47:core', 's47:grows', 's48:fast', 's48:ten', 's48:drawer', 's49:m2', 's49:forty', 's50:relief', 's50:zero', 's50:spend', 's51:factories', 's51:ships', 's51:less', 's52:nine', 's52:decades', 's53:confuses', 's54:news', 's55:slowly', 's55:three', 's55:still', 's56:stays', 's56:thirty', 's56:gone', 's57:early', 's57:fifty', 's58:disinflation', 's58:deflation']
export const DD_MONEY = makePiece('dd-money', 'Cause one, paper-cut bread market: a stall of loaves (100 LOAVES), $1.00 A LOAF, a cash pile doubles from $100 OF MONEY to $200 OF MONEY, BAKERS DIDN\'T BAKE MORE, the tag drifts to $2.00 A LOAF; a shrinking banknote over a loaf (EACH DOLLAR: A CLAIM ON LESS BREAD); SPENDING GROWS FASTER THAN STUFF; a spinning dollar CHANGES HANDS 10x A YEAR vs one ASLEEP IN A DRAWER; after 2020: US MONEY SUPPLY (M2) +40% IN ~2 YEARS, a RELIEF cheque, RATES NEAR ZERO, MORE TO SPEND, a SHUT factory, SHIPS STUCK, LESS STUFF TO BUY, thermometer JUNE 2022: 9.1% (FASTEST IN FOUR DECADES); a staircase of yearly price levels 2020–2026 (INFLATION FALLING ≠ PRICES FALLING, SMALLER STEPS, STILL UP, +31% SINCE JAN 2020, AND IT STAYS, basket $120 → $157); DISINFLATION (prices rise slower) vs DEFLATION (prices fall)', {
  mood: 'light', Component: Money, beats: [...BEATS, ...ACC],
  sfx: [['s41:loaves', 'pop', 0.08], ['s43:doubles', 'cash', 0.12], ['s44:drifts', 'riser', 0.08], ['s46:claim', 'swish', 0.1], ['s48:ten', 'whoosh', 0.08], ['s49:forty', 'pop', 0.1], ['s50:relief', 'pop', 0.08], ['s51:factories', 'thud', 0.08], ['s52:nine', 'impact', 0.12], ['s55:still', 'tick', 0.08], ['s56:thirty', 'ding', 0.1], ['s58:deflation', 'pop', 0.1]] })
