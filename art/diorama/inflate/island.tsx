// ---------------------------------------------------------------- s25–s36: step three, what causes it (the made-up mango island).
// A) The island appears; a wooden stall with a pile of 1,000 mangoes; islanders (two figures) bring a pile of coins
//    labelled 2,000 a day; the stall's board reads $2.
// B) CAUSE 1 DEMAND: a bonus rains coins (3,000 a day); the same pile of mangoes; three buyers raise their hands and bid;
//    the board climbs $2 → $3.
// C) CAUSE 2 COSTS: a boat sails in with mangoes and a red FUEL barrel; the fuel tag doubles ×2; the seller pays more
//    coins to the boat, and the board rises.
// D) CAUSE 3 EXPECTATIONS: islanders dream of a higher price next month and run to the stall; the seller raises early;
//    a worker asks for a raise; a loop arrow (raises ↔ prices) spins: the wage-price spiral.
// E) REAL LIFE: the sea turns to a harbour scene — a factory, a queue of ships, an oil barrel — all three at once;
//    a thermometer climbs to 9.1 % (June 2022, fastest in about 40 years); then a dial at ZERO with a question.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Boat, Coin, Island, K, Label, Mango, Pile, Stall, Tag, Thermostat } from './kit'

const G = 900

const Bubble: React.FC<{ x: number; y: number; o: number; children: React.ReactNode }> = ({ x, y, o, children }) => o > 0.01 ? (
  <g transform={`translate(${x} ${y})`} opacity={o}><ellipse rx={130} ry={80} fill="#FFFFFF" /><circle cx={-90} cy={90} r={16} fill="#FFFFFF" /><circle cx={-110} cy={124} r={10} fill="#FFFFFF" />{children}</g>
) : null
const Therm: React.FC<{ x: number; y: number; v: number; o: number; text: string }> = ({ x, y, v, o, text }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-40} y={-520} width={80} height={520} rx={40} fill={K.paper} stroke={K.ink} strokeWidth={6} /><circle cy={20} r={70} fill={K.red} stroke={K.ink} strokeWidth={6} />
    <rect x={-22} y={-500 * Math.min(1, v / 10) - 10} width={44} height={500 * Math.min(1, v / 10) + 20} rx={22} fill={K.red} />
    {[0, 2, 4, 6, 8, 10].map((t) => <g key={t}><line x1={40} y1={-500 * t / 10} x2={70} y2={-500 * t / 10} stroke={K.ink} strokeWidth={4} /><text x={84} y={-500 * t / 10 + 12} fill={K.ink} style={BB(34)}>{t}%</text></g>)}
    <g transform={`translate(-190 ${-500 * Math.min(1, v / 10)})`}><rect x={-100} y={-40} width={200} height={80} rx={16} fill={K.ink} /><text y={22} textAnchor="middle" fill={K.sun} style={BB(60)}>{text}</text></g>
  </g>
)

const IslandPiece: React.FC<PieceProps> = ({ f, c }) => {
  const see25b = c('s25:see'), mango26b = c('s26:mango'), cause30 = c('s30:cause'), keep33 = c('s33:keep'), sellers33 = c('s33:sellers'), itself33 = c('s33:itself'), called33 = c('s33:called'), mixes34 = c('s34:mixes'), y2021 = c('s34:2021'), y2022a = c('s34:2022'), keep34 = c('s34:keep'), y2022b = c('s35:2022'), prices35 = c('s35:prices'), see25 = c('s25:see'), rise25 = c('s25:rise'), shrink25 = c('s25:shrink'), economy25 = c('s25:economy'), island25 = c('s25:island')
  const grows26 = c('s26:grows'), n1000 = c('s26:1000'), mangoes26 = c('s26:mangoes'), islanders26 = c('s26:islanders'), spend26 = c('s26:spend'), n2000 = c('s26:2000'), mango26 = c('s26:mango'), n2 = c('s26:2')
  const demand27 = c('s27:demand'), everyone27 = c('s27:everyone'), bonus27 = c('s27:bonus'), n3000 = c('s27:3000'), mangoes27 = c('s27:mangoes')
  const still28 = c('s28:still'), n1000b = c('s28:1000'), buyers28 = c('s28:buyers'), outbid28 = c('s28:outbid'), price28 = c('s28:price'), climbs28 = c('s28:climbs'), n3 = c('s28:3')
  const money29 = c('s29:money'), same29 = c('s29:same'), higher29 = c('s29:higher')
  const costs30 = c('s30:costs'), market30 = c('s30:market'), boat30 = c('s30:boat'), fuel30 = c('s30:fuel'), doubles30 = c('s30:doubles')
  const nobody31 = c('s31:nobody'), extra31 = c('s31:extra'), sellers31 = c('s31:sellers'), pay31 = c('s31:pay'), bring31 = c('s31:bring'), charge31 = c('s31:charge'), cover31 = c('s31:cover')
  const expectations32 = c('s32:expectations'), expect32 = c('s32:expect'), next32 = c('s32:next'), rush32 = c('s32:rush'), raise32 = c('s32:raise'), early32b = c('s32:early#2')
  const workers33 = c('s33:workers'), raises33 = c('s33:raises'), again33 = c('s33:again'), pay33 = c('s33:pay'), feed33 = c('s33:feed'), spiral33 = c('s33:spiral')
  const real34 = c('s34:real'), three34 = c('s34:three'), spending34 = c('s34:spending'), pandemic34 = c('s34:pandemic'), factories34 = c('s34:factories'), ships34 = c('s34:ships'), energy34 = c('s34:energy'), struggled34 = c('s34:struggled')
  const june35 = c('s35:june'), up35 = c('s35:up'), n91 = c('s35:91'), single35 = c('s35:single'), fastest35 = c('s35:fastest'), n40 = c('s35:40')
  const rising36 = c('s36:rising'), hurt36 = c('s36:hurt'), why36 = c('s36:why'), aim36 = c('s36:aim'), zero36 = c('s36:zero')

  const AB = demand27 - 4, BC = costs30 - 4, CD = expectations32 - 4, DE = real34 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = win(f, CD - 8, DE), E = on(f, DE - 8, 10)

  // # price boards
  const bidPrice = f < price28 ? 2 : lerp(2, 3, span(f, climbs28, n3 + 6))
  const costPrice = f < charge31 ? 2 : lerp(2, 2.6, span(f, charge31, cover31 + 10))
  const expPrice = f < raise32 ? 2 : lerp(2, 2.5, span(f, raise32, early32b + 8)) + (f >= again33 ? lerp(0, 0.4, span(f, again33, pay33 + 8)) : 0)
  const sBeats: Beat[] = [[0, 'idle', 'smiling'], [n2, 'present', 'smiling'], [mangoes27, 'point', 'neutral'], [still28, 'shrug', 'neutral'], [buyers28, 'point', 'shocked'], [n3, 'celebrate', 'smiling']]
  const s2Beats: Beat[] = [[BC, 'idle', 'neutral'], [doubles30, 'shock', 'shocked'], [pay31, 'offer', 'worried'], [charge31, 'point', 'neutral']]
  const s3Beats: Beat[] = [[CD, 'idle', 'neutral'], [raise32, 'pointUp', 'smug'], [sellers33, 'point', 'smug'], [raises33, 'shrug', 'worried'], [again33, 'pointUp', 'neutral']]
  const wBeats: Beat[] = [[CD, 'idle', 'neutral'], [workers33, 'pitch', 'neutral'], [raises33, 'fistPump', 'smiling'], [keep33, 'pointUp', 'neutral'], [feed33, 'scratchHead', 'worried']]
  const boatX = lerp(2300, 1350, span(f, boat30 - 20, boat30 + 30))
  const loop = (f - spiral33) / 6

  return (
    <g>
      <Island id="in-i" f={f} mood={E > 0.5 ? 'storm' : 'day'} sand={G + 20} />
      {/* the whole economy (a little world) shrinks down to the island */}
      <g opacity={win(f, see25b, island25 + 4, 6)} transform={`translate(960 520) scale(${lerp(1, 0.25, span(f, shrink25, island25))})`}>
        <circle r={260} fill={K.sea} /><path d="M-200 -60 Q-120 -160 -20 -110 Q60 -200 160 -120 Q230 -40 180 60 Q90 150 -40 120 Q-180 120 -200 -60 Z" fill={K.leaf} />
        {[[-120, -40], [0, -70], [110, -10]].map(([x, y], k) => <rect key={k} x={x - 26} y={y - 70} width={52} height={70} fill={K.cream} />)}
        {[-140, 30, 150].map((x, k) => <Tag key={k} x={x} y={-180 - 40 * on(f, rise25 + k * 3, 10)} s={0.6} text="$" color={K.coral} o={on(f, rise25 + k * 3, 8)} />)}
      </g>
      {/* # A) the island market */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, island25 - 6, 12)}>
          <Stall x={960} y={G} s={1} price={f >= n2 ? '$2' : undefined}>
            <Pile x={0} y={-150} s={1.05} full={on(f, n1000 - 4, 20)} />
          </Stall>
          <Label x={960} y={G + 70} text={f >= mangoes26 ? '1,000 MANGOES A DAY' : 'A MADE-UP ISLAND'} size={40} />
        </g>
        <g opacity={on(f, islanders26, 10)}>
          <Person f={f} who="buyer" beats={[[0, 'idle', 'smiling'], [spend26, 'carry', 'smiling'], [n2, 'thumbsUp', 'smiling']]} x={360} y={G + 30} s={0.85} />
          {Array.from({ length: 8 }, (_, k) => <Coin key={k} x={500 + (k % 4) * 50} y={G - 40 - Math.floor(k / 4) * 60 - 30 * pop(f, n2000, 14)} s={0.85} o={on(f, spend26 + k, 6)} />)}
          <g opacity={on(f, n2000, 8)}><Label x={580} y={G - 230} text="$2,000 A DAY" size={40} /></g>
        </g>
        <g opacity={on(f, economy25, 8) * (1 - on(f, island25, 8))}><Label x={960} y={860} text="THE WHOLE ECONOMY…" size={52} /></g>
        {/* one mango goes to the price board */}
        <g opacity={win(f, mango26b, demand27, 6)}><Mango x={lerp(960, 1100, span(f, mango26b, n2))} y={lerp(G - 260, G - 560, span(f, mango26b, n2))} s={1.2} /></g>
      </g>}
      {/* # B) cause one: demand */}
      {B > 0 && <g opacity={B}>
        <Stall x={960} y={G} s={1} price={`$${bidPrice.toFixed(bidPrice % 1 ? 1 : 0).replace('.0', '')}`} priceColor={bidPrice > 2.1 ? K.coral : K.paper}>
          <Pile x={0} y={-150} s={1.05} full={1} />
        </Stall>
        <Person f={f} who="owner" beats={sBeats} x={1320} y={G + 30} s={0.8} />
        {/* bonus coins rain */}
        {Array.from({ length: 12 }, (_, k) => { const t = span(f, bonus27 + k * 2, bonus27 + k * 2 + 18)
          return <Coin key={k} x={420 + (k % 6) * 60} y={lerp(-60, G - 40 - Math.floor(k / 6) * 60, t)} s={0.85} o={(t > 0 ? 1 : 0) * (1 - on(f, buyers28 - 6, 8))} /> })}
        <g opacity={on(f, n3000, 8) * (1 - on(f, buyers28 - 6, 8))}><Label x={570} y={G - 250} text="$3,000 A DAY" size={42} fill={K.coral} ink={K.paper} /></g>
        <g opacity={on(f, n1000b, 8)}><Label x={960} y={G + 70} text="STILL 1,000 MANGOES" size={40} /></g>
        {/* three buyers bid */}
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, buyers28 + k * 3, 8)}>
          <Person f={f} who={['buyer', 'investorF', 'worker'][k]} beats={[[buyers28, 'idle', 'neutral'], [outbid28 + k * 4, 'pointUp', 'shocked'], [n3, 'reachUp', 'neutral']]} x={300 + k * 150} y={G + 40} s={0.7} />
          <g opacity={win(f, outbid28 + k * 4, money29, 6)}><Label x={300 + k * 150} y={G - 330} text={['$2.20', '$2.60', '$3'][k]} size={36} fill={K.sun} /></g>
        </g>)}
        <g opacity={on(f, money29, 8) * (1 - on(f, cause30, 8))}><Label x={960} y={260} text="MORE MONEY + SAME MANGOES" size={48} /></g>
        <g opacity={on(f, higher29, 8) * (1 - on(f, cause30, 8))}><Label x={960} y={340} text="= HIGHER PRICES" size={52} fill={K.coral} ink={K.paper} /></g>
      </g>}
      {/* # C) cause two: costs */}
      {Cc > 0 && <g opacity={Cc}>
        <Stall x={640} y={G} s={0.95} price={`$${costPrice.toFixed(1).replace('.0', '')}`} priceColor={costPrice > 2.1 ? K.coral : K.paper}><Pile x={0} y={-150} s={1} full={1} /></Stall>
        <Person f={f} who="owner" beats={s2Beats} x={1000} y={G + 30} s={0.8} />
        <Boat x={boatX} y={720} s={1.05} f={f} fuel={f >= fuel30 ? (f >= doubles30 ? 'FUEL ×2' : 'FUEL') : undefined} fuelColor={f >= doubles30 ? K.coral : K.paper} />
        {f >= pay31 && [0, 1, 2].map((k) => { const t = span(f, pay31 + k * 4, pay31 + k * 4 + 16); return <Coin key={k} x={lerp(1060, 1300, t)} y={lerp(600, 640, t) - 80 * Math.sin(Math.PI * t)} s={0.8} o={t > 0 && t < 1 ? 1 : 0} /> })}
        <g opacity={on(f, nobody31, 8) * (1 - on(f, sellers31, 8))}><Label x={960} y={300} text="NO EXTRA MONEY" size={48} /></g>
        <g opacity={on(f, bring31, 8)}><Label x={960} y={300} text={f >= charge31 ? 'COSTS PASSED ON' : 'IT COSTS MORE TO BRING IN'} size={46} fill={f >= charge31 ? K.coral : K.paper} ink={f >= charge31 ? K.paper : K.ink} /></g>
        <g opacity={on(f, costs30, 8) * (1 - on(f, nobody31, 8))}><Label x={960} y={300} text={f >= market30 ? 'MANGOES COME BY BOAT' : 'COSTS'} size={48} /></g>
      </g>}
      {/* # D) cause three: expectations, then the spiral */}
      {D > 0 && <g opacity={D}>
        <Stall x={980} y={G} s={0.95} price={`$${expPrice.toFixed(1).replace('.0', '')}`} priceColor={expPrice > 2.1 ? K.coral : K.paper}><Pile x={0} y={-150} s={1} full={1 - 0.5 * on(f, rush32, 20)} /></Stall>
        <Person f={f} who="owner" beats={s3Beats} x={1340} y={G + 30} s={0.8} />
        <g opacity={1 - on(f, workers33, 8)}>
          <Person f={f} who="buyer" beats={[[CD, 'think', 'thinking'], [rush32, 'runA', 'shocked', 'runB', 10]]} x={lerp(300, 560, span(f, rush32, rush32 + 30))} y={G + 30} s={0.8} />
          <Bubble x={420} y={380} o={win(f, expect32, rush32 + 10, 6)}><Mango x={-40} y={0} s={0.8} /><text x={50} y={18} textAnchor="middle" fill={K.coral} style={BB(54)}>{f >= next32 ? '$3?' : '$?'}</text></Bubble>
        </g>
        {/* the worker asks for a raise; the spiral */}
        <g opacity={on(f, workers33, 10)}>
          <Person f={f} who="worker" beats={wBeats} x={420} y={G + 30} s={0.8} />
          <g opacity={on(f, raises33, 8)}><Label x={420} y={G - 330} text="RAISE!" size={42} fill={K.sun} /></g>
          <g opacity={on(f, feed33 - 4, 10)} transform="translate(700 380)">
            <circle r={150 + 14 * pop(f, itself33, 14) + 10 * pop(f, called33, 14)} fill="none" stroke={K.coral} strokeWidth={14 + 8 * on(f, itself33, 10)} strokeDasharray="60 30" transform={`rotate(${loop * 12})`} />
            <path d="M150 -10 L170 30 L130 30 Z" fill={K.coral} transform={`rotate(${loop * 12})`} />
            <text y={-30} textAnchor="middle" fill={K.ink} style={BB(40)}>WAGES ↑</text><text y={40} textAnchor="middle" fill={K.ink} style={BB(40)}>PRICES ↑</text>
          </g>
          <g opacity={on(f, spiral33, 8)}><Label x={700} y={590} text="WAGE-PRICE SPIRAL" size={42} fill={K.coral} ink={K.paper} /></g>
        </g>
      </g>}
      {/* # E) real life, 2021–22 */}
      {E > 0 && <g opacity={E}>
        <g opacity={win(f, mixes34, spending34, 6)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${lerp(700 + k * 260, 960, on(f, three34, 14))} 480)`} opacity={on(f, mixes34 + k * 3, 6)}>{k === 0 && <Coin x={0} y={0} s={1.4} />}{k === 1 && <g><rect x={-40} y={-56} width={80} height={110} rx={14} fill={K.red} /><text y={10} textAnchor="middle" fill={K.paper} style={BB(26)}>FUEL</text></g>}{k === 2 && <g><ellipse rx={80} ry={52} fill="#FFFFFF" /><text y={16} textAnchor="middle" fill={K.coral} style={BB(46)}>$↑?</text></g>}</g>)}</g>
        <g opacity={on(f, y2021, 8) * (1 - on(f, june35 - 4, 8))}><Label x={960} y={300} text={f >= y2022a ? '2021 – 2022' : '2021…'} size={48} /></g>
        <g opacity={on(f, keep34, 8) * (1 - on(f, june35 - 4, 8))}><Label x={1300} y={420} text="STRUGGLING TO KEEP UP" size={40} fill={K.coral} ink={K.paper} /></g>
        <g opacity={1 - on(f, june35 - 4, 10)}>
          {/* spenders */}
          <g opacity={on(f, spending34, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${260 + k * 110} ${G - 10})`}><circle cy={-120} r={26} fill="#E8B48E" /><path d="M-30 0 L-30 -70 Q-30 -94 0 -94 Q30 -94 30 -70 L30 0 Z" fill={[K.coral, K.sea, K.plum][k]} /><rect x={20} y={-70} width={50} height={50} rx={6} fill="#D9B07A" /></g>)}<Label x={370} y={G + 70} text="SPENDING AGAIN" size={38} /></g>
          {/* a factory */}
          <g opacity={on(f, factories34, 8)} transform={`translate(860 ${G})`}><rect x={-160} y={-260} width={320} height={260} fill={K.cream} /><path d="M-160 -260 L-90 -320 L-90 -260 L-20 -320 L-20 -260 L50 -320 L50 -260 Z" fill={K.coralD} /><rect x={90} y={-400} width={50} height={140} fill={K.ink2} />
            {[0, 1, 2].map((k) => <circle key={k} cx={115 + 10 * Math.sin(f / 10 + k)} cy={-430 - k * 50 - ((f / 2) % 40)} r={26 + k * 8} fill="#B8B2C2" opacity={0.6} />)}<Label x={0} y={70} text="FACTORIES" size={38} /></g>
          {/* a queue of ships */}
          <g opacity={on(f, ships34, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${1260 + k * 170} ${640 + 3 * Math.sin(f / 15 + k)})`}><path d="M-80 0 L80 0 L60 36 L-60 36 Z" fill={K.ink2} />{[0, 1].map((j) => <rect key={j} x={-60 + j * 60} y={-44} width={52} height={44} fill={[K.coral, K.sea, K.sun][(k + j) % 3]} />)}</g>)}<Label x={1430} y={760} text="SHIPS WAITING" size={36} /></g>
          {/* energy */}
          <g opacity={on(f, energy34, 8)} transform={`translate(1700 ${G})`}><rect x={-60} y={-170} width={120} height={170} rx={18} fill={K.ink} /><rect x={-60} y={-120} width={120} height={14} fill={K.ink2} /><rect x={-60} y={-60} width={120} height={14} fill={K.ink2} /><Label x={0} y={70} text="ENERGY" size={38} /></g>
        </g>
        <Therm x={960} y={G - 80} v={f < june35 ? 0 : 9.1 * span(f, up35, n91 + 10)} o={on(f, june35 - 4, 10) * (1 - on(f, aim36, 10))} text={f >= n91 ? '9.1%' : '…'} />
        <g opacity={on(f, fastest35, 8) * (1 - on(f, aim36, 10))}><Label x={1440} y={420} text="FASTEST IN ~40 YEARS" size={44} fill={K.coral} ink={K.paper} /></g>
        <g opacity={on(f, june35, 8) * (1 - on(f, aim36, 10))}><Label x={1440} y={330} text={f >= y2022b ? 'JUNE 2022' : 'JUNE…'} size={44} /></g>
        <g opacity={on(f, prices35, 8) * (1 - on(f, aim36, 10))}><Tag x={620} y={360} s={1.1} text="PRICES ↑" color={K.coral} /></g>
        <g opacity={on(f, n40, 8) * (1 - on(f, aim36, 10))}><Label x={1440} y={510} text="LAST THIS HIGH: 1981" size={38} /></g>
        <g opacity={win(f, hurt36, aim36, 6)} transform={`translate(620 ${560 - 8 * pop(f, rising36, 12)})`}><circle r={70} fill={K.sun} /><circle cx={-24} cy={-12} r={8} fill={K.ink} /><circle cx={24} cy={-12} r={8} fill={K.ink} /><path d="M-30 34 Q0 8 30 34" fill="none" stroke={K.ink} strokeWidth={7} strokeLinecap="round" /></g>
        <g opacity={on(f, why36, 8)} transform="translate(1400 520)"><circle r={70} fill={K.sun} /><text y={34} textAnchor="middle" fill={K.ink} style={BB(110)}>?</text></g>
        <g opacity={on(f, aim36 - 4, 10)}><Thermostat x={960} y={520} s={0.95} value={f >= zero36 ? 0 : 9.1} /><Label x={960} y={840} text={f >= zero36 ? 'WHY NOT ZERO?' : 'AIM FOR…'} size={48} /></g>
      </g>}
      <Headline f={f} lines={[[see25, 'STEP 3: WHAT CAUSES IT', K.ink, 96], [demand27, 'CAUSE 1: DEMAND', K.ink, 100], [costs30, 'CAUSE 2: COSTS', K.ink, 100], [expectations32, 'CAUSE 3: EXPECTATIONS', K.ink, 96], [real34, 'REAL LIFE: ALL THREE', K.ink, 96], [june35, 'JUNE 2022', K.coralD, 100], [why36, 'WHY NOT ZERO?', K.ink, 100]]} />
    </g>
  )
}

export const IN_ISLAND = makePiece('in-island', "Step three, what causes inflation, on a made-up mango island: a wooden stall with a pile of 1,000 mangoes a day and islanders bringing 2,000 dollars of coins, so the board says 2 dollars; cause one demand: bonus coins rain down to 3,000 a day, three buyers bid against each other and the board climbs to 3 dollars; cause two costs: a boat sails in with a red fuel barrel whose price doubles, the seller pays the boat more coins and the board rises; cause three expectations: an islander dreams of a 3-dollar mango next month and runs to buy, the seller raises early, a worker asks for a raise and a loop arrow spins (wage-price spiral); real life 2021-22: shoppers spending again, a factory, a queue of ships and an energy barrel, a thermometer climbs to 9.1 percent in June 2022, the fastest in about 40 years; then a dial at zero asks why not zero", {
  mood: 'light', Component: IslandPiece,
  beats: ["s25:see", "s26:mango", "s30:cause", "s33:keep", "s33:sellers", "s33:itself", "s33:called", "s34:mixes", "s34:2021", "s34:2022", "s34:keep", "s35:2022", "s35:prices", "s25:rise", "s25:shrink", "s25:economy", "s25:island", "s26:1000", "s26:mangoes", "s26:islanders", "s26:spend", "s26:2000", "s26:2", "s27:demand", "s27:bonus", "s27:3000", "s27:mangoes", "s28:still", "s28:1000", "s28:buyers", "s28:outbid", "s28:price", "s28:climbs", "s28:3", "s29:money", "s29:higher", "s30:costs", "s30:market", "s30:boat", "s30:fuel", "s30:doubles", "s31:nobody", "s31:sellers", "s31:pay", "s31:bring", "s31:charge", "s31:cover", "s32:expectations", "s32:expect", "s32:next", "s32:rush", "s32:raise", "s32:early#2", "s33:workers", "s33:raises", "s33:again", "s33:pay", "s33:feed", "s33:spiral", "s34:real", "s34:three", "s34:spending", "s34:factories", "s34:ships", "s34:energy", "s35:june", "s35:up", "s35:91", "s35:fastest", "s35:40", "s36:rising", "s36:hurt", "s36:why", "s36:aim", "s36:zero"],
  sfx: [['s27:bonus', 'coin', 0.1], ['s28:climbs', 'tick', 0.1], ['s30:doubles', 'pop', 0.1], ['s33:spiral', 'whoosh', 0.1], ['s35:91', 'impact', 0.12]] })
