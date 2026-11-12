// ---------------------------------------------------------------- s8–s22: idea one — everything is limited, so every choice has a cost.
// A) Six people reach for one half-empty carton (never enough). They step back; eggs, two houses and a clock appear on
//    three plinths (only so many…). The people come back wanting more (scarcity). A balance: choosing one tips the other up.
// B) An evening: a person holds a $20 note between a cinema and a pizza shop; NOT BOTH; she walks to the cinema, the pizza
//    shop fades to a grey ghost — that is the opportunity cost.
// C) A farmer and one field that turns from wheat to corn (not both); then one coin between ROADS and SCHOOLS: the coin
//    goes to the road and the school greys.
// D) A baker with bread and a shoemaker with shoes swap: bread flies right, shoes fly left, both thumbs up.
// E) Goods on a market table get price tags dropped on them: prices decide who gets what.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, House, Coin, hand, fly, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { PizzaShop } from '../pe/kit'
import { Backdrop, Balance, Bread, Carton, Cinema, Evening, Field, NoCross, Note, Road, School, Shoes, Tag, TXT, WallClock, GREEN } from './kit'

const GROUND = 930
const Plinth: React.FC<{ x: number; o?: number }> = ({ x, o = 1 }) => <g opacity={o}><rect x={x - 130} y={640} width={260} height={36} rx={10} fill="#D9C7A5" /><rect x={x - 105} y={676} width={210} height={GROUND - 676} fill="#E6D6B8" /></g>

const Scarce: React.FC<PieceProps> = ({ f, c }) => {
  const there = c('s8:there'), enough = c('s8:enough'), everything = c('s8:everything')
  const only = c('s9:only'), eggs = c('s9:eggs'), houses = c('s9:houses'), hours = c('s9:hours')
  const scarcity = c('s10:scarcity'), more = c('s10:more'), day9 = c('s9:day'), economists = c('s10:economists')
  const scarce11 = c('s11:scarce')
  const choice = c('s11:choice'), cost = c('s11:cost'), nothing = c('s11:nothing')
  const madeup = c('s12:madeup'), d20 = c('s12:20'), evening = c('s12:evening')
  const movie = c('s13:movie'), pizza = c('s13:pizza'), both = c('s13:both')
  const pick = c('s14:pick'), real = c('s14:real'), pizza14 = c('s14:pizza'), d20b = c('s14:20'), gave = c('s14:gave')
  const opportunity = c('s15:opportunity'), best = c('s15:best')
  const businesses = c('s16:businesses'), farmer = c('s16:farmer'), wheat = c('s16:wheat'), corn = c('s16:corn'), both16 = c('s16:both')
  const governments = c('s17:governments'), dollar = c('s17:dollar'), roads = c('s17:roads'), cant = c("s17:can't"), schools = c('s17:schools')
  const trade = c('s18:trade'), baker = c('s19:baker'), baking = c('s19:baking'), buys = c('s19:buys'), bread19 = c('s19:bread'), herself = c('s19:herself')
  const giving = c('s20:giving'), less = c('s20:less'), more20 = c('s20:more')
  const rule = c('s21:rule'), limited = c('s21:limited'), tradeoff = c('s21:tradeoff')
  const but22 = c('s22:but'), every22 = c('s22:everything'), limited22 = c('s22:limited')
  const decides = c('s22:decides'), gets = c('s22:gets'), world = c('s22:world'), prices = c('s22:prices')

  // # sub-scene windows: each idea clears before the next arrives
  const A = win(f, 0, madeup - 4), B = win(f, madeup - 4, businesses - 4), C1 = win(f, businesses - 4, governments - 2), C2 = win(f, governments - 2, trade - 4)
  const D = win(f, trade - 4, rule - 2), E1 = win(f, rule - 2, but22 - 2), E2 = on(f, but22 - 2, 10)

  // # A: the crowd reaching for too few eggs; it steps away for the plinths and comes back on "more"
  const crowdIn = on(f, enough, 14) * (1 - on(f, only, 12)) + on(f, more, 14) * (1 - on(f, choice, 12))
  const items = 1 - on(f, choice - 4, 12)

  // # B: the evening choice
  const walkT = on(f, pick, 30)
  const girlX = lerp(960, 720, walkT)
  const girl: Beat[] = [[madeup, 'hold', 'thinking'], [movie, 'hold', 'smiling'], [both, 'crossNoA', 'neutral', 'crossNoB', 12], [pick, 'walkA', 'smiling', 'walkB', 10], [pick + 30, 'hold', 'smiling'], [gave, 'think', 'thinking'], [opportunity, 'point', 'neutral']]
  const hp = hand(f, girl, girlX, GROUND, 1, walkT > 0.01 && walkT < 0.99)
  const ghost = on(f, gave, 16)

  // # C: farmer, field
  const farmerB: Beat[] = [[businesses, 'idle', 'neutral'], [farmer, 'present', 'smiling'], [both16, 'crossNoA', 'neutral', 'crossNoB', 12]]
  const kind = on(f, corn, 14)
  const coinT = on(f, cant - 10, 22)

  // # D: the trade
  const bakerB: Beat[] = [[trade, 'idle', 'smiling'], [baking, 'present', 'smiling'], [giving, 'offer', 'smiling'], [more20, 'thumbsUp', 'smiling']]
  const shoeB: Beat[] = [[trade, 'idle', 'neutral'], [buys, 'present', 'smiling'], [giving, 'offer', 'smiling'], [more20, 'thumbsUp', 'smiling']]
  const swap = (a: [number, number], b: [number, number]) => { const t = on(f, giving, 26); return [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - 160 * Math.sin(Math.PI * t)] as [number, number] }
  const breadP = swap([620, 700], [1300, 700]), shoesP = swap([1300, 700], [620, 700])

  return (
    <g>
      <Stage id="ec-scarce" frame={f} />
      <Backdrop f={f} o={1 - B} />
      {B > 0 && <Evening o={B} />}
      <Headline f={f} lines={[[there, 'NEVER ENOUGH OF EVERYTHING', P.ink, 96], [madeup, 'MADE-UP EXAMPLE', '#FFFFFF', 64], [businesses, 'ONE FIELD, TWO CROPS', P.ink, 90], [governments, 'ONE DOLLAR, TWO USES', P.ink, 90], [trade, 'WHY PEOPLE TRADE', P.ink, 96], [rule, 'EVERY CHOICE IS A TRADE-OFF', P.ink, 96], [decides, 'WHO GETS WHAT?', P.ink, 100]]} />
      <Ground y={GROUND} dark={B > 0.5} />

      {/* # A) never enough */}
      {A > 0 && <g opacity={A}>
        <g opacity={items} transform={`translate(${6 * Math.sin((f - scarce11) / 2) * win(f, scarce11, choice, 4)} 0)`}>
          {/* at first: one half-empty carton on a stool, then three plinths */}
          <g opacity={win(f, there - 4, only, 8)}><rect x={880} y={700} width={160} height={230} rx={10} fill="#D9C7A5" /><Carton x={960} y={700} s={1.1} n={4} /></g>
          {win(f, economists, scarcity + 10, 6) > 0 && <ellipse cx={960} cy={560} rx={760} ry={180} fill={P.gold} opacity={0.14 * win(f, economists, scarcity + 10, 6)} />}
          <Plinth x={480} o={on(f, eggs - 6, 10)} /><Plinth x={960} o={on(f, houses - 6, 10)} /><Plinth x={1440} o={on(f, hours - 6, 10)} />
          <g opacity={on(f, eggs, 8)} transform={`translate(480 640) scale(${pop(f, eggs, 12)})`}><Carton x={0} y={0} s={0.9} n={5} /></g>
          <g opacity={on(f, houses, 8)} transform={`translate(960 640) scale(${0.6 * pop(f, houses, 12)})`}><House x={-130} y={0} /><House x={150} y={0} color="#7FA8D8" /></g>
          <g opacity={on(f, hours, 8)} transform={`translate(1440 500) scale(${pop(f, hours, 12)})`}><WallClock x={0} y={0} f={f + 120 * on(f, day9, 20)} /></g>
          <g opacity={on(f, scarcity, 8)}><Label x={960} y={890} text="SCARCITY" size={72} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* the people who want it all */}
        {crowdIn > 0.01 && [0, 1, 2, 3, 4, 5].map((k) => {
          const back = f >= more - 10
          const x = (back ? [80, 190, 300, 1620, 1730, 1840] : [180, 330, 620, 1300, 1590, 1740])[k]
          const who = ['buyer', 'investorF', 'worker', 'owner', 'investor', 'buyer'][k]
          return <g key={k} opacity={crowdIn}><Person f={f} who={who} beats={[[there, 'reachUp', k % 2 ? 'worried' : 'thinking']]} x={x} y={GROUND + 40 * (1 - crowdIn)} s={back ? 0.5 : 0.62} flip={x > 960} /></g>
        })}
        {/* every choice has a cost */}
        <g opacity={on(f, choice, 10)}>
          <Balance x={960} y={GROUND} s={0.95} tilt={-on(f, cost, 20)} left={<g transform="translate(0 -6) scale(0.5)"><Carton x={0} y={0} /></g>} right={<g transform="translate(0 -4) scale(0.35)"><House x={0} y={0} /></g>} />
          <g opacity={on(f, nothing, 8)}><Note x={1560} y={430} t="$0" s={1.1} r={-6} /><NoCross x={1560} y={430} s={0.8} o={on(f, nothing + 8, 8)} /></g>
        </g>
      </g>}

      {/* # B) $20, one evening: movie or pizza */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, movie - 4, 10)}><Cinema x={420} y={GROUND} s={1.05} lit={0.4 + 0.6 * on(f, pick, 20)} /></g>
        <g opacity={on(f, pizza - 4, 10) * (1 - 0.6 * ghost)}><PizzaShop x={1500} y={GROUND} s={0.78 * (1 + 0.06 * win(f, pizza14, gave, 6))} f={f} glow={0.6 * (1 - ghost)} name="PIZZA" /></g>
        {ghost > 0 && <g opacity={ghost * 0.5}><rect x={1290} y={660} width={420} height={270} fill="#2B3A63" /></g>}
        <Person f={f} who="investorF" beats={girl} x={girlX} y={GROUND} s={1} flip={walkT > 0.01 && walkT < 0.99} />
        <g opacity={on(f, d20, 8) * (1 - on(f, pick + 30, 10))}><Note x={hp.x} y={hp.y + 16} t="$20" s={0.5} /></g>
        <g opacity={win(f, real, opportunity, 8)}><Label x={420} y={520} text="$20 +" size={64} font="Bebas Neue" color="#FFE48A" o={on(f, d20b, 8)} /><Label x={1500} y={490} text="THE NIGHT YOU GAVE UP" size={44} font="Bebas Neue" color="#FFE48A" o={on(f, pizza14, 8)} /></g>
        <g opacity={win(f, both, pick, 8)}><Label x={960} y={340} text="NOT BOTH" size={90} font="Bebas Neue" color="#FFE48A" /></g>
        <g opacity={on(f, opportunity, 10)}>
          <rect x={1270} y={330} width={460} height={110} rx={18} fill="#FFE48A" /><path d="M1500 440 l-24 40 l48 0 z" fill="#FFE48A" transform="rotate(180 1500 460)" />
          <text x={1500} y={398} textAnchor="middle" fill={P.ink} style={TXT(58)}>OPPORTUNITY COST</text>
        </g>
        <g opacity={on(f, best, 10)}><Label x={1500} y={510} text="THE BEST THING YOU DIDN'T PICK" size={34} font="Inter" color="#FFFFFF" /></g>
      </g>}

      {/* # C1) one field: wheat or corn */}
      {C1 > 0 && <g opacity={C1}>
        <Person f={f} who="worker" beats={farmerB} x={460} y={GROUND} s={1} />
        <g opacity={on(f, farmer, 10)}>
          <g opacity={1 - kind}><Field x={1240} y={GROUND} s={1.15} kind={0} grow={0.4 + 0.6 * on(f, wheat, 20)} /></g>
          <g opacity={kind}><Field x={1240} y={GROUND} s={1.15} kind={1} grow={0.3 + 0.7 * on(f, corn, 20)} /></g>
          <Label x={1240} y={460} text={kind > 0.5 ? 'CORN' : 'WHEAT'} size={80} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, both16, 8)}><NoCross x={1580} y={430} s={0.7} /><Label x={1580} y={330} text="BOTH" size={54} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # C2) one dollar: roads or schools */}
      {C2 > 0 && <g opacity={C2}>
        <g opacity={on(f, roads - 4, 10)}><Road x={560} y={GROUND - 60} s={1.3} /></g>
        <g opacity={on(f, schools - 4, 10)}><School x={1360} y={GROUND - 60} s={1.25} dim={on(f, cant + 10, 16)} /></g>
        <g opacity={on(f, dollar, 8)}><Coin x={lerp(960, 560, coinT)} y={lerp(380, 560, coinT) - 120 * Math.sin(Math.PI * coinT)} s={2.2 * pop(f, dollar, 12)} /></g>
      </g>}

      {/* # D) the baker and the shoemaker trade */}
      {D > 0 && <g opacity={D}>
        <Person f={f} who="investorF" beats={bakerB} x={380} y={GROUND} s={1} />
        <Person f={f} who="worker" beats={shoeB} x={1540} y={GROUND} s={1} flip />
        <rect x={500} y={760} width={240} height={170} rx={10} fill="#D9C7A5" /><rect x={1180} y={760} width={240} height={170} rx={10} fill="#D9C7A5" />
        <g opacity={on(f, baking, 8)}><Bread x={breadP[0]} y={breadP[1] + 60} s={1.2 * pop(f, baking, 12)} /></g>
        <g opacity={on(f, buys, 8)}><Shoes x={shoesP[0]} y={shoesP[1] + 60} s={1.2 * pop(f, buys, 12)} /></g>
        <g opacity={on(f, bread19, 10) * (1 - on(f, giving, 10))}><Label x={960} y={560} text="EACH MAKES ONE THING" size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, herself, 10) * (1 - on(f, giving, 10))}><Label x={960} y={640} text="…AND TRADES FOR THE REST" size={50} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, less, 8)}><Label x={960} y={470} text="GIVE WHAT YOU VALUE LESS" size={50} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, more20, 8)}><Label x={960} y={540} text="GET WHAT YOU VALUE MORE" size={50} font="Bebas Neue" color={GREEN} /></g>
      </g>}

      {/* # E1) the rule: a balance of what you get vs what you give up */}
      {E1 > 0 && <g opacity={E1}>
        <Balance x={960} y={GROUND} s={1} tilt={0.5 * Math.sin((f - rule) / 20) * on(f, limited, 20) * (1 - on(f, tradeoff, 20)) + 0.0} left={<g transform="translate(0 -4) scale(0.9)"><Bread x={0} y={0} /></g>} right={<g transform="translate(0 -4) scale(0.9)"><Shoes x={0} y={0} /></g>} />
        <g opacity={on(f, tradeoff, 8)}><Label x={960} y={420} text="GET ONE, GIVE UP THE OTHER" size={56} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # E2) who gets what? price tags drop onto the goods */}
      {E2 > 0 && <g opacity={E2}>
        <g opacity={on(f, every22, 10)}><rect x={360} y={760} width={1200} height={40} rx={10} fill="#C9B18A" /><rect x={400} y={800} width={30} height={130} fill="#A88F66" /><rect x={1490} y={800} width={30} height={130} fill="#A88F66" /></g>
        <g opacity={on(f, limited22, 8)} transform={`translate(0 ${-20 * (1 - pop(f, limited22, 12))})`}><Carton x={560} y={760} s={0.9} /><Bread x={960} y={760} s={1.6} /><g transform="translate(1360 760) scale(0.45)"><House x={0} y={0} /></g></g>
        {([[560, gets], [960, world], [1360, prices]] as [number, number][]).map(([x, at], k) => <g key={k} opacity={on(f, at, 6)}><line x1={x} y1={330} x2={x} y2={lerp(330, 520, on(f, at, 14))} stroke="#8E7A5A" strokeWidth={4} /><Tag x={x} y={lerp(380, 570, on(f, at, 14))} t={['$3', '$4', '$300K'][k]} s={0.85} /></g>)}
        <g opacity={on(f, prices, 10)}><Label x={960} y={890} text="PRICES DECIDE" size={64} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s10:simply")} x={960} y={640} rx={230} ry={170} />
        <Spot f={f} at={c("s11:and")} x={960} y={640} rx={230} ry={170} />
        <Spot f={f} at={c("s15:choose")} x={960} y={640} rx={200} ry={230} />
        <Spot f={f} at={c("s16:choice")} x={1240} y={800} rx={230} ry={150} />
        <Spot f={f} at={c("s18:this")} x={960} y={720} rx={230} ry={170} />
        <Spot f={f} at={c("s19:than")} x={960} y={720} rx={230} ry={170} />
        <Spot f={f} at={c("s20:every")} x={960} y={720} rx={230} ry={170} />
        <Spot f={f} at={c("s21:every")} x={960} y={620} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="ec-scarce" />
    </g>
  )
}

export const EC_SCARCE = makePiece('ec-scarce', 'Scarcity: six people reach for a half-empty egg carton; eggs, two houses and a ticking clock stand on three plinths; SCARCITY; a balance tips between eggs and a house; at night a woman holds a $20 note between a cinema and a pizza shop — NOT BOTH — she walks to the cinema and the pizza shop fades: OPPORTUNITY COST; a farmer\'s one field turns from wheat to corn; one coin flies to ROADS while SCHOOLS greys; a baker and a shoemaker swap bread and shoes with thumbs up; price tags drop onto goods on a market table.', {
  mood: 'light', Component: Scarce,
  beats: ["s8:there", "s8:enough", "s8:everything", "s9:only", "s9:eggs", "s9:houses", "s9:hours", "s10:scarcity", "s10:more", "s9:day", "s10:economists", "s11:scarce", "s11:choice", "s11:cost", "s11:nothing", "s12:madeup", "s12:20", "s12:evening", "s13:movie", "s13:pizza", "s13:both", "s14:pick", "s14:real", "s14:pizza", "s14:20", "s14:gave", "s15:opportunity", "s15:best", "s16:businesses", "s16:farmer", "s16:wheat", "s16:corn", "s16:both", "s17:governments", "s17:dollar", "s17:roads", "s17:can't", "s17:schools", "s18:trade", "s19:baker", "s19:baking", "s19:buys", "s19:bread", "s19:herself", "s20:giving", "s20:less", "s20:more", "s21:rule", "s21:limited", "s21:tradeoff", "s22:but", "s22:everything", "s22:limited", "s22:decides", "s22:gets", "s22:world", "s22:prices", "s10:simply", "s11:and", "s15:choose", "s16:choice", "s18:this", "s19:than", "s20:every", "s21:every"],
  sfx: [['s13:both', 'pop', 0.12], ['s14:gave', 'swish', 0.12], ['s17:roads', 'coin', 0.15], ['s20:giving', 'swish', 0.15], ['s22:prices', 'pop', 0.12]] })
