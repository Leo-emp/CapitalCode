// ---------------------------------------------------------------- s52–s72: idea three — inflation.
// A) A $10 note buys a full basket; as the voice says "less", items drop out of it.
// B) The giant shopping basket: food, rent, fuel, clothes go in one by one; a tag reads $100 last year, then $103 today: +3%.
// C) A made-up island: a palm with 10 coconuts (1 = 10) and a $100 stack → each coconut $1. Twice the money ($200), same coconuts
//    → $2. An islander shrugs (nobody is richer). A printing press runs, the tag climbs. Then the same $100 but half the coconuts → $2.
// D) A gauge: the Fed aims for about 2% a year (needle in the green).
// E) June 2022: the needle swings to 9.1% (biggest since 1981); a gas pump flashes +60%.
// F) The Federal Reserve building and its three reasons: pandemic (germ), energy (oil barrel), war in Ukraine; then shoppers' carts
//    pile up while a factory and a ship can't keep up.
// G) Pay vs prices: pay $1,000 → $1,030 (+3%), the basket $1,000 → $1,090 (+9%) → $60 SHORT every month.
// H) The basket's tag runs away upward — what stops it? Interest rates.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Calendar } from '../charts'
import { Basket } from '../money4/kit'
import { Cart } from '../costco/kit'
import { Factory } from '../power/kit2'
import { Arrow, Barrel, BoxShip, Cash, CentralBank, Gauge, Germ, Isle, Note, Palm, Press, Pump, Tag, TXT, GREEN, RED } from './kit'

const GROUND = 930
const ITEMS = ['bread', 'apple', 'house', 'gas', 'shirt', 'milk', 'car', 'bread', 'apple', 'milk'] as const

const Infl: React.FC<PieceProps> = ({ f, c }) => {
  const means = c('s52:means'), general = c('s52:general'), dollar = c('s52:dollar'), less = c('s52:less')
  const government = c('s53:government'), basket = c('s53:basket')
  const food = c('s54:food'), rent = c('s54:rent'), fuel = c('s54:fuel'), clothes = c('s54:clothes'), hundreds = c('s54:hundreds'), month = c('s54:month')
  const b100 = c('s55:100'), b103 = c('s55:103'), b3 = c('s55:3')
  const picture = c('s56:picture'), happen = c('s56:happen'), d100b = c('s59:100'), people59 = c('s59:people'), stuff60 = c('s60:stuff'), simply = c('s61:simply')
  const island = c('s56:island'), coconuts = c('s56:coconuts'), d100 = c('s56:dollars')
  const spend = c('s57:spend'), one = c('s57:1'), money57 = c('s57:money'), nuts57 = c('s57:coconuts')
  const twice = c('s58:twice'), same = c('s58:same')
  const d200 = c('s59:200'), climbs = c('s59:climbs'), two = c('s59:2')
  const nobody = c('s60:nobody'), richer = c('s60:richer'), cost60 = c('s60:cost'), chasing = c('s60:chasing')
  const printing = c('s61:printing'), richer61 = c('s61:richer'), cost61 = c('s61:cost'), country = c('s61:country'), mostly = c('s61:mostly'), money61 = c('s61:money'), exactly = c('s69:exactly'), inflation60 = c('s60:inflation')
  const other = c('s62:other'), half = c('s62:half'), rise62 = c('s62:rise')
  const normal = c('s63:normal'), aims = c('s63:aims'), two63 = c('s63:2'), steady = c('s63:steady')
  const mix = c('s64:mix'), june = c('s64:june'), p91 = c('s64:91'), year64 = c('s64:year')
  const biggest = c('s65:biggest'), y1981 = c('s65:1981')
  const gasoline = c('s66:gasoline'), p60 = c('s66:60'), year66 = c('s66:year'), p9 = c('s70:9'), basket70 = c('s70:basket')
  const supply67 = c('s67:supply'), demand67 = c('s67:demand'), balance67 = c('s67:balance')
  const central = c('s67:central'), pandemic = c('s67:pandemic'), energy = c('s67:energy'), war = c('s67:war'), ukraine = c('s67:ukraine')
  const words68 = c('s68:words'), buy68 = c('s68:buy'), factories = c('s68:factories'), ships = c('s68:ships'), oil = c('s68:oil'), keep = c('s68:keep')
  const hurts = c('s69:hurts'), earn = c('s69:earn'), basket69 = c('s69:basket')
  const pay = c('s70:pay'), p1030 = c('s70:1030'), prices70 = c('s70:prices'), p1090 = c('s70:1090')
  const earn71 = c('s71:earn'), short = c('s71:short'), single = c('s71:single')
  const stop = c('s72:stop'), running = c('s72:running'), fourth = c('s72:fourth'), interest = c('s72:interest')

  const A = win(f, 0, government - 4), B = win(f, government - 4, island - 6), Cw = win(f, island - 6, normal - 4)
  const D = win(f, normal - 4, central - 4), F = win(f, central - 4, hurts - 4), G = win(f, hurts - 4, stop - 4), H = on(f, stop - 4, 10)

  // # A: the note's basket loses items on "less"
  const shownA = Math.round(lerp(10, 6, on(f, less, 20)))
  // # B: basket items in by word
  const inB = [food, food + 6, rent, fuel, clothes, hundreds, hundreds + 4, hundreds + 8, hundreds + 12, hundreds + 16]
  const shownB = inB.filter((a) => f >= a).length
  // # C: island numbers
  const cashN = f >= other ? 4 : f >= twice ? Math.round(lerp(4, 8, on(f, twice, 20))) : 4
  const cashT = f >= other ? '$100' : f >= d200 - 10 || f >= twice + 20 ? '$200' : '$100'
  const nuts = f >= half ? Math.round(lerp(10, 5, on(f, half, 20))) : 10
  const tagT = f >= two || f >= rise62 ? '$2' : '$1'
  const pressOn = win(f, printing - 4, other, 10)
  // # D/E: gauge 0–10%
  const needle = f >= p91 ? lerp(0.2, 0.91, on(f, p91, 30)) : 0.2
  // # G
  const payT = f >= p1030 ? '$1,030' : '$1,000', basT = f >= p1090 ? '$1,090' : '$1,000'

  const islander: Beat[] = [[island, 'idle', 'smiling'], [twice, 'celebrate', 'smiling'], [people59, 'holdUp', 'smiling'], [nobody, 'shrug', 'thinking'], [printing, 'idle', 'worried']]
  const worker: Beat[] = [[hurts, 'idle', 'neutral'], [p1030, 'celebrate', 'smiling'], [p1090, 'shock', 'shocked'], [short, 'emptyPockets', 'worried']]
  return (
    <g>
      <Stage id="ec-infl" frame={f} />
      <Headline f={f} lines={[[means, 'PRICES IN GENERAL RISE', P.ink, 96], [government, 'A GIANT SHOPPING BASKET', P.ink, 96], [island, 'MADE-UP ISLAND', P.ink, 90], [printing, 'PRINTING MORE MONEY', P.ink, 96], [other, 'SAME MONEY, HALF THE COCONUTS', P.ink, 86], [normal, 'A LITTLE IS NORMAL', P.ink, 96], [mix, 'JUNE 2022, US PRICES', P.ink, 90], [central, 'WHY? THE FEDERAL RESERVE SAID…', P.ink, 86], [hurts, 'WHY IT HURTS', P.ink, 100], [stop, 'HOW DO YOU STOP IT?', P.ink, 100]]} />
      <Ground y={GROUND} />

      {/* # A) a dollar buys a little less */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, dollar - 6, 10)}><Note x={560} y={620} t="$10" s={1.6} r={-6} /></g>
        <g opacity={on(f, dollar, 10)}><Arrow x={820} y={620} dir="right" col={P.ink2} s={0.9} /></g>
        <g opacity={on(f, general - 6, 10)} transform="translate(1260 860) scale(1.5)"><Basket x={0} y={0} shown={shownA} items={ITEMS} /></g>
        <g opacity={on(f, less, 8)}><Label x={1260} y={430} text="A LITTLE LESS" size={70} font="Bebas Neue" color={RED} /></g>
      </g>}

      {/* # B) the basket the government tracks */}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(860 ${GROUND - 40}) scale(${1.9 * (0.9 + 0.1 * pop(f, basket, 14))})`}><Basket x={0} y={0} shown={shownB} items={ITEMS} pop={ITEMS.map((_, i) => 1 - on(f, inB[i], 10))} /></g>
        {([[food, 'FOOD'], [rent, 'RENT'], [fuel, 'FUEL'], [clothes, 'CLOTHES']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={win(f, at, [rent, fuel, clothes, hundreds + 20][k], 5)}><Label x={860} y={420} text={t} size={80} font="Bebas Neue" color={P.ink} /></g>)}
        <g opacity={on(f, month, 8) * (1 - on(f, b100, 8))}><Calendar x={1460} y={480} text="EVERY MONTH" s={1.2} /></g>
        <g opacity={on(f, b100, 8)}><line x1={1450} y1={300} x2={1450} y2={430} stroke="#8E7A5A" strokeWidth={4} /><Tag x={1450} y={490} t={f >= b103 ? '$103' : '$100'} s={1.3} col={f >= b103 ? RED : '#F4C95D'} ink={f >= b103 ? '#FFFFFF' : P.ink} /></g>
        <g opacity={on(f, b100, 8)}><Label x={1450} y={630} text={f >= b103 ? 'TODAY' : 'LAST YEAR'} size={54} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, b3, 8)} transform={`translate(1450 760) scale(${pop(f, b3, 12)})`}><rect x={-200} y={-60} width={400} height={110} rx={18} fill={RED} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={TXT(66)}>INFLATION 3%</text></g>
      </g>}

      {/* # C) the coconut island */}
      {Cw > 0 && <g opacity={Cw}>
        <g transform={`translate(0 ${60 * (1 - on(f, picture, 20))})`} opacity={on(f, picture - 4, 10)}><Isle x={900} y={GROUND - 20} s={1.15} f={f} /></g>
        <g opacity={win(f, happen, picture, 6)}><Label x={960} y={600} text="WHY?" size={140} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={Math.max(win(f, nuts57, nuts57 + 30, 6), win(f, d100b, climbs, 6), win(f, stuff60, simply, 6))}><ellipse cx={1100} cy={GROUND - 480} rx={240} ry={120} fill={P.gold} opacity={0.3} /></g>
        <g opacity={on(f, coconuts - 6, 10)}><Palm x={1080} y={GROUND - 40} s={1.15} n={nuts} f={f} /></g>
        <g opacity={on(f, coconuts, 8) * (1 - pressOn)}><Label x={1400} y={440} text={`${nuts * 10} COCONUTS`} size={56} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, d100, 8)} transform={`translate(0 ${-24 * Math.max(0, Math.sin((f - money57) / 5)) * win(f, money57, nuts57 + 20, 4)})`}><Cash x={700} y={GROUND - 50} n={cashN} s={0.9} label={f >= twice + 20 && f < other ? '$200' : cashT} /></g>
        <Person f={f} who="worker" beats={islander} x={460} y={GROUND - 40} s={0.8} />
        <g opacity={on(f, one, 8)}><circle cx={1290} cy={560} r={20} fill="#7A4E2A" stroke="#5B3820" strokeWidth={3} /><line x1={1290} y1={540} x2={1290} y2={500} stroke="#8E7A5A" strokeWidth={4} /><Tag x={1420} y={560 - 30 * win(f, climbs, nobody, 6)} t={`${tagT} EACH`} s={0.9 * (1 + 0.15 * win(f, climbs, nobody, 6))} col={tagT === '$2' ? RED : '#F4C95D'} ink={tagT === '$2' ? '#FFFFFF' : P.ink} r={0} /></g>
        <g opacity={win(f, richer, printing, 6)}><Label x={460} y={420} text="NOBODY RICHER" size={56} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, cost60, printing, 6)}><Arrow x={1600} y={560} dir="up" col={RED} s={0.7 * pop(f, cost60, 12)} /></g>
        <g opacity={win(f, inflation60, printing, 6)}><Label x={1420} y={700} text="= INFLATION" size={56} font="Bebas Neue" color={RED} /></g>
        <g opacity={win(f, country, other, 6)}><Label x={1520} y={330} text="A RICHER COUNTRY?" size={54} font="Bebas Neue" color={P.ink} /><line x1={1300} y1={312} x2={1740} y2={312} stroke={RED} strokeWidth={10} opacity={on(f, country + 12, 8)} /></g>
        <g opacity={win(f, mostly, other, 6)}><Label x={1520} y={420} text="MOSTLY HIGHER PRICES" size={50} font="Bebas Neue" color={RED} /></g>
        <g opacity={win(f, chasing, printing, 6)}><Label x={1520} y={330} text="MORE MONEY, SAME STUFF" size={54} font="Bebas Neue" color={RED} /></g>
        <g opacity={Math.max(pressOn, 0)}><g opacity={on(f, simply, 8)}><Press x={1660} y={GROUND} s={1.05} f={f} run={on(f, printing, 10) * (1 + on(f, money61, 10))} /></g><Arrow x={1520} y={430} dir="up" col={RED} s={0.8} o={on(f, cost61, 8)} /></g>
        <g opacity={on(f, rise62, 8)}><Arrow x={1580} y={560} dir="up" col={RED} s={0.8} /></g>
      </g>}

      {/* # D + E) the gauge: 2% target, then 9.1% */}
      {D > 0 && <g opacity={D}>
        <Gauge x={760} y={800} s={1.25} v={needle} t={f >= p91 ? '9.1%' : '2%'} />
        <g opacity={on(f, aims, 8) * (1 - on(f, mix, 8))}><Label x={760} y={880} text="THE FED'S TARGET, A YEAR" size={46} font="Bebas Neue" color={GREEN} /></g>
        <g opacity={on(f, june, 8)}><Calendar x={1420} y={420} text="2022" s={1.1} /><Label x={1420} y={540} text="JUNE" size={44} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, year64, 8)}><Label x={760} y={880} text="VS A YEAR BEFORE" size={46} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, biggest, 8)}><Label x={1420} y={600} text="BIGGEST RISE" size={60} font="Bebas Neue" color={P.ink} /><Label x={1420} y={670} text="SINCE 1981" size={60} font="Bebas Neue" color={RED} o={on(f, y1981, 8)} /></g>
        <g opacity={on(f, gasoline, 8)} transform={`translate(0 ${30 * (1 - pop(f, gasoline, 14))})`}><Pump x={1420} y={GROUND} s={0.85 * (1 + 0.06 * win(f, year66, central, 5))} t={f >= p60 ? '+60%' : 'GAS'} /></g>
      </g>}

      {/* # F) the reasons */}
      {F > 0 && <g opacity={F}>
        <g opacity={1 - on(f, words68 - 6, 12)}>
          <CentralBank x={960} y={GROUND} s={1} glow={on(f, central, 20)} />
          <g opacity={win(f, supply67 - 4, war, 8)} transform={`translate(960 330) rotate(${-10 * on(f, balance67, 16)})`}><rect x={-300} y={-10} width={600} height={20} rx={10} fill="#8E7A5A" /><path d="M-20 30 L20 30 L0 10 Z" fill="#8E7A5A" /><g opacity={on(f, supply67, 8)}><rect x={-290} y={-90} width={230} height={80} rx={12} fill="#7FA8D8" /><text x={-175} y={-36} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>SUPPLY</text></g><g opacity={on(f, demand67, 8)}><rect x={60} y={-90} width={230} height={80} rx={12} fill="#E5634F" /><text x={175} y={-36} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>DEMAND</text></g></g>
          {([[pandemic, 330, 'PANDEMIC', <Germ key="g" x={0} y={-120} s={1.3} f={f} />], [energy, 1590, 'ENERGY', <Barrel key="b" x={0} y={0} s={1.1} />], [ukraine, 960, 'WAR IN UKRAINE', null]] as [number, number, string, React.ReactNode][]).map(([at, x, t, pic], k) => <g key={k} opacity={on(f, k === 2 ? war : at, 8)} transform={`translate(${x} ${k === 2 ? 330 : GROUND}) scale(${pop(f, k === 2 ? war : at, 12)})`}>
            {pic}
            {k === 2 ? <g><rect x={-230} y={-50} width={460} height={90} rx={14} fill={P.ink} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>{t}</text></g> : <text y={-290} textAnchor="middle" fill={P.ink} style={TXT(60)}>{t}</text>}
          </g>)}
        </g>
        <g opacity={on(f, words68 - 6, 12)}>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, buy68 + k * 4, 8)} transform={`translate(${200 + k * 250} ${GROUND})`}><Cart x={0} y={0} s={0.7} fill={1} /></g>)}
          <g opacity={on(f, buy68, 8)}><Label x={410} y={560} text="PEOPLE WANT MORE" size={56} font="Bebas Neue" color={P.ink} /><Arrow x={410} y={420} dir="up" col={GREEN} s={0.8} /></g>
          <g opacity={on(f, factories, 8)}><Factory x={1180} y={GROUND} s={0.8} f={f} /></g>
          <g opacity={on(f, ships, 8)}><BoxShip x={1560} y={GROUND - 30} s={0.65} f={f} boxes={4} /></g>
          <g opacity={on(f, oil, 8)}><Barrel x={1800} y={GROUND} s={0.7} /></g>
          <g opacity={on(f, keep, 8)}><Label x={1480} y={560} text="CAN'T KEEP UP" size={56} font="Bebas Neue" color={RED} /></g>
        </g>
      </g>}

      {/* # G) pay vs the basket */}
      {G > 0 && <g opacity={G}>
        <Person f={f} who="worker" beats={worker} x={960} y={GROUND} s={0.88} />
        <g opacity={on(f, earn, 8)}>
          <Note x={470} y={620} t="PAY" s={1.4} r={-4} />
          <Label x={470} y={800} text={payT} size={90} font="Bebas Neue" color={f >= p1030 ? GREEN : P.ink} />
          <g opacity={on(f, pay, 8)}><Label x={470} y={470} text="+3%" size={70} font="Bebas Neue" color={GREEN} /></g>
        </g>
        <g opacity={on(f, basket69, 8)}>
          <g transform={`translate(1450 ${700 - 24 * Math.max(win(f, p9, basket70, 4), win(f, basket70, p1090, 4))})`}><Basket x={0} y={0} shown={8} items={ITEMS} /></g>
          <Label x={1450} y={830 - 16 * win(f, exactly, pay, 5)} text={basT} size={90 * (1 + 0.12 * win(f, exactly, pay, 5))} font="Bebas Neue" color={f >= p1090 ? RED : P.ink} />
          <g opacity={on(f, prices70, 8)}><Label x={1450} y={440} text="+9%" size={70} font="Bebas Neue" color={RED} /></g>
        </g>
        <g opacity={on(f, short, 8)} transform={`translate(960 280) scale(${pop(f, short, 14)})`}><rect x={-260} y={-64} width={520} height={120} rx={18} fill={RED} /><text y={24} textAnchor="middle" fill="#FFFFFF" style={TXT(80)}>$60 SHORT</text></g>
        <g opacity={on(f, single, 8)}><Label x={960} y={400} text="EVERY MONTH" size={46} font="Bebas Neue" color={RED} /></g>
      </g>}

      {/* # H) prices running away — what stops them? */}
      {H > 0 && <g opacity={H}>
        <g transform="translate(760 880) scale(1.3)"><Basket x={0} y={0} shown={8} items={ITEMS} /></g>
        <g opacity={on(f, running - 6, 8)} transform={`translate(${760 + 500 * on(f, running, 40)} ${560 - 260 * on(f, running, 40)}) rotate(-20)`}><Tag x={0} y={0} t="PRICE" s={1.1} col={RED} ink="#FFFFFF" r={0} />{[0, 1, 2].map((k) => <line key={k} x1={-140 - k * 20} y1={-30 + k * 30} x2={-220 - k * 30} y2={-30 + k * 30} stroke={RED} strokeWidth={6} strokeLinecap="round" opacity={0.6} />)}</g>
        <g opacity={on(f, interest, 8)} transform={`translate(1500 600) scale(${pop(f, interest, 14)})`}><circle r={130} fill="#E9C25A" stroke="#B88A2E" strokeWidth={10} /><text y={50} textAnchor="middle" fill={P.ink} style={TXT(160)}>%</text></g>
        <g opacity={on(f, fourth, 8)}><Label x={1500} y={820} text="INTEREST RATES" size={70} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s53:like")} x={860} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s54:tracks")} x={860} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s55:that")} x={860} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s55:inflation")} x={860} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s59:so")} x={1000} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s61:does")} x={1000} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s62:same")} x={1000} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s63:a")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s63:federal")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s63:a#2")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s64:real")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s64:us")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s67:reserve")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s69:month")} x={960} y={650} rx={230} ry={200} />
        <Spot f={f} at={c("s69:1000#2")} x={960} y={650} rx={230} ry={200} />
        <Spot f={f} at={c("s71:you")} x={960} y={650} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="ec-infl" />
    </g>
  )
}

export const EC_INFL = makePiece('ec-infl', 'Inflation: a $10 note buys a basket that loses items; a giant shopping basket fills with food, rent, fuel and clothes, its tag goes from $100 last year to $103 today — INFLATION 3%; a made-up island with a palm of 100 coconuts and a $100 cash stack (coconut $1 each), the cash doubles to $200 and the coconut tag turns $2, the islander shrugs, a printing press runs; half the coconuts with the same $100 → $2 again; a gauge shows the 2% target, then swings to 9.1% (June 2022, biggest since 1981) beside a gas pump +60%; the Federal Reserve with its reasons (pandemic germ, energy barrel, war in Ukraine); shopping carts vs a factory, a container ship and oil that can\'t keep up; a worker\'s pay $1,030 vs a $1,090 basket — $60 SHORT every month; a price tag runs away and a big % coin appears: interest rates.', {
  mood: 'light', Component: Infl,
  beats: ["s52:means", "s52:general", "s52:dollar", "s52:less", "s53:government", "s53:basket", "s54:food", "s54:rent", "s54:fuel", "s54:clothes", "s54:hundreds", "s54:month", "s55:100", "s55:103", "s55:3", "s56:picture", "s56:happen", "s59:100", "s59:people", "s60:stuff", "s61:simply", "s56:island", "s56:coconuts", "s56:dollars", "s57:spend", "s57:1", "s57:money", "s57:coconuts", "s58:twice", "s58:same", "s59:200", "s59:climbs", "s59:2", "s60:nobody", "s60:richer", "s60:cost", "s60:chasing", "s61:printing", "s61:cost", "s61:country", "s61:mostly", "s61:money", "s69:exactly", "s60:inflation", "s62:other", "s62:half", "s62:rise", "s63:normal", "s63:aims", "s63:steady", "s64:mix", "s64:june", "s64:91", "s64:year", "s65:biggest", "s65:1981", "s66:gasoline", "s66:60", "s66:year", "s70:9", "s70:basket", "s67:supply", "s67:demand", "s67:balance", "s67:central", "s67:pandemic", "s67:energy", "s67:war", "s67:ukraine", "s68:words", "s68:buy", "s68:factories", "s68:ships", "s68:oil", "s68:keep", "s69:hurts", "s69:earn", "s69:basket", "s70:pay", "s70:1030", "s70:prices", "s70:1090", "s71:short", "s71:single", "s72:stop", "s72:running", "s72:fourth", "s72:interest", "s53:like", "s54:tracks", "s55:that", "s55:inflation", "s59:so", "s61:does", "s62:same", "s63:a", "s63:federal", "s63:a#2", "s64:real", "s64:us", "s67:reserve", "s69:month", "s69:1000#2", "s71:you"],
  sfx: [['s55:3', 'pop', 0.12], ['s59:2', 'ding', 0.12], ['s61:printing', 'click', 0.1], ['s64:91', 'riser', 0.15], ['s71:short', 'thud', 0.15], ['s72:interest', 'pop', 0.12]] })
