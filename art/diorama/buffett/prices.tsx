// ---------------------------------------------------------------- s11–s24: what fear does to prices (casino-style rebuild).
// One market street that stays on screen. Sunny and busy: the owner shows a red bike tagged $500 and a buyer pays $500.
// Then the bill: a BILL DUE paper drops into the owner's hand and the sky turns grey; shop shutters roll down; the
// passers-by turn their pockets out and walk on; a lone buyer offers $300 and the tag flips; a storm sits over the very
// same bike. The market: a big board where a scared crowd sells and the price line dives under a dashed WORTH line,
// then a greedy crowd buys it far above; the gap glows gold while Buffett points. His desk: the 1986 letter, the fear-
// greed dial swinging both ways, and a briefcase of cash that opens while hands reach in from every side.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Doc, Headline, Person, fly, win } from '../aimoney/common'
import { PriceTag } from '../charts'
import { Mini } from '../../rig/Mini'
import { Note, Storefront } from '../gift/kit'
import { Bike, Briefcase, Dial, Letter, LineChart, Storm } from './kit'
import { Buffett, gestB } from './hook'

// # a row of shops along the back of the street; shut 0–1 rolls the shutters down
const Shops: React.FC<{ shut: number }> = ({ shut }) => (
  <g>{[['BAKERY', '#E9A23B'], ['BOOKS', '#3A6EA8'], ['CAFE', '#2FA36B'], ['TOYS', '#8A5CC2']].map(([nm, col], k) => <Storefront key={k} x={240 + k * 480} y={760} s={0.85} sign={nm} color={col} shutter={Math.max(0, Math.min(1, shut * 1.4 - k * 0.12))} />)}</g>
)

const Prices: React.FC<PieceProps> = ({ f, c }) => {
  const bike12 = c('s12:bike'), n500 = c('s12:500')
  const normal = c('s13:normal'), sells = c('s13:sells')
  const cash14 = c('s14:cash'), bill = c('s14:bill'), wait = c('s14:wait')
  const street = c('s15:street'), short = c('s15:short')
  const nobody = c('s16:nobody'), n300 = c('s16:300')
  const bike17 = c('s17:bike'), fear17 = c('s17:fear')
  const markets = c('s18:markets'), scared19 = c('s19:scared'), sell19 = c('s19:sell'), below = c('s19:below')
  const greedy20 = c('s20:greedy'), rise = c('s20:rise'), gap = c('s21:gap'), looks = c('s21:looks')
  const letter = c('s22:letter'), n1986 = c('s22:back'), fearful = c('s23:fearful'), greedy23 = c('s23:greedy#2'), fearful2 = c('s23:fearful#2')
  const words = c('s24:words'), cash24 = c('s24:cash'), everybody = c('s24:everybody')
  const A = win(f, 0, markets - 4, 10), B = win(f, markets - 4, letter - 4, 10), Cw = on(f, letter - 4, 10)
  // # the street darkens from the bill on; the shutters come down as everyone runs short of cash
  const grey = on(f, cash14, 20), shut = easeInOut(span(f, street, nobody))
  const owner: Beat[] = [[0, 'idle', 'smiling'], [bike12, 'present', 'smiling'], [sells, 'receive', 'smiling'], [cash14, 'scratchHead', 'worried'], [bill, 'hold', 'worried'], [nobody, 'despair', 'worried'], [n300, 'receive', 'worried']]
  const buyerX = f < cash14 ? lerp(2100, 1450, on(f, normal - 10, 24)) : lerp(1450, 2200, on(f, cash14, 24))
  const bargain = lerp(2200, 1450, easeInOut(span(f, nobody, n300)))
  // # extra gesture words (each pause gets Buffett acting on a word)
  const G = [c('s21:and'), c('s14:now'), c('s18:way'), c('s19:worth'), c('s21:really'), c('s21:worth'), c('s22:wrote'), c('s23:he')]
  return (
    <g>
      <StageBg id="wb-prices" frame={f} />
      <Headline f={f} lines={[[bike12, 'EXAMPLE: A $500 BIKE', P.ink, 100], [cash14, 'NEEDS CASH TODAY', P.coralInk, 104], [street, 'EVERYONE IS SHORT OF CASH', P.ink, 100], [n300, 'SOLD FOR $300', P.coralInk, 110],
        [fear17, 'ONLY THE FEAR CHANGED', P.ink, 104], [scared19, 'SCARED: PRICE BELOW WORTH', P.coralInk, 100], [greedy20, 'GREEDY: PRICE ABOVE WORTH', P.mintInk, 100], [gap, 'THE GAP BUFFETT LOOKS FOR', P.goldInk, 104],
        [letter, 'HIS 1986 LETTER', P.ink, 104], [fearful, 'FEARFUL WHEN OTHERS ARE GREEDY', P.ink, 96], [greedy23, 'GREEDY WHEN OTHERS ARE FEARFUL', P.goldInk, 96], [cash24, 'HAVE CASH WHEN OTHERS NEED IT', P.ink, 96]]} />
      {/* # A: the market street, sunny then grey */}
      {A > 0 && <g opacity={A}>
        <rect x={0} y={0} width={1920} height={1080} fill="#56627C" opacity={0.55 * grey} />
        <circle cx={1700} cy={260} r={90} fill={P.gold} opacity={1 - grey} />
        <Shops shut={shut} />
        <rect x={0} y={1000} width={1920} height={80} fill="#C9B48E" />
        <g transform={`translate(960 ${lerp(1100, 860, on(f, bike12, 14))})`}><Bike x={0} y={0} s={1.25} /></g>
        <g opacity={on(f, n500, 6)} transform={`translate(${f > nobody ? 1000 : 1230} ${lerp(560, 600, on(f, n500, 10)) - (f > nobody ? 60 : 0)}) rotate(${lerp(0, 360, easeInOut(span(f, n300 - 4, n300 + 10)))}) scale(${pop(f, n500) * lerp(1.2, 1.4, on(f, n300, 8))})`}><PriceTag x={0} y={0} text={f > n300 ? '$300' : '$500'} r={0} color={f > n300 ? P.coral : P.paper} /></g>
        <Person f={f} who="hero" beats={owner} x={470} y={1020} s={1.05} />
        {/* # the first buyer: pays $500 on a sunny day, then goes */}
        <Person f={f} who="buyer" beats={[[0, 'walkA', 'smiling', 'walkB', 10], [normal + 14, 'offer', 'smiling'], [cash14, 'walkA', 'neutral', 'walkB', 10]]} x={buyerX} y={1020} s={1} flip={f < cash14} />
        {(() => { const p = fly(f, sells + 4, [1400, 720], [560, 720], 18, 160); return <g opacity={on(f, sells, 4) * (1 - on(f, cash14, 6))}><Note x={p.t > 0 ? p.x : 1400} y={p.t > 0 ? p.y : 720} s={0.8} text="500" /></g> })()}
        {/* # the bill drops into the owner's hand */}
        <g opacity={on(f, bill, 6) * (1 - on(f, nobody, 8))} transform={`translate(640 ${lerp(200, 640, easeInOut(span(f, bill, bill + 14)))}) rotate(-8) scale(0.6)`}><Doc x={0} y={0} title="BILL DUE" stamp="TODAY" stampO={on(f, wait, 6)} /></g>
        {/* # passers-by with their pockets turned out */}
        {Array.from({ length: 8 }, (_, k) => { const t = ((f - street) / 160 + k / 8) % 1, x = lerp(-100, 2020, t); return <g key={k} opacity={on(f, street, 10) * (1 - on(f, nobody + 30, 10))}><Mini look={['buyer', 'worker', 'owner', 'hero'][k % 4]} x={x} y={1060} scale={0.8} frame={f} seed={k + 40} mood={f > short ? 'sad' : 'neutral'} />{f > short && <g transform={`translate(${x} 990)`}><rect x={-28} y={0} width={18} height={22} rx={4} fill="#FFFFFF" /><rect x={10} y={0} width={18} height={22} rx={4} fill="#FFFFFF" /></g>}</g> })}
        {/* # the bargain hunter offers $300 */}
        <Person f={f} who="owner" beats={[[0, 'walkA', 'smug', 'walkB', 10], [n300 - 6, 'offer', 'smug']]} x={bargain} y={1020} s={1} flip />
        {(() => { const p = fly(f, n300 + 4, [1400, 720], [560, 720], 18, 140); return <g opacity={on(f, n300, 4)}><Note x={p.t > 0 ? p.x : 1400} y={p.t > 0 ? p.y : 720} s={0.8} text="300" /></g> })()}
        <g opacity={on(f, fear17, 6)} transform={`translate(960 ${lerp(120, 330, on(f, fear17, 12))})`}><Storm x={0} y={0} s={1} f={f} bolt={on(f, fear17 + 4, 4) * (1 - on(f, fear17 + 12, 4))} /></g>
        <g opacity={on(f, bike17, 6) * (1 - on(f, fear17 + 20, 8))}><ellipse cx={960} cy={880} rx={330} ry={60} fill={P.gold} opacity={0.25} /></g>
      </g>}
      {/* # B: the market board: scared sellers push the price under WORTH, greedy buyers push it above */}
      {B > 0 && <g opacity={B}>
        <rect x={200} y={230} width={1520} height={660} rx={30} fill="#0D1424" />
        <path d="M260 560 L1660 560" stroke="#FFFFFF" strokeWidth={8} strokeDasharray="30 20" /><text x={1680} y={545} textAnchor="end" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>WORTH</text>
        <g opacity={1 - on(f, greedy20, 8)}><LineChart x={260} y={300} w={1400} h={560} pts={[[0, 0.55], [0.2, 0.5], [0.4, 0.35], [0.6, 0.25], [0.8, 0.15], [1, 0.1]]} t={easeInOut(span(f, sell19, below + 24))} /></g>
        <g opacity={on(f, greedy20, 8)}><LineChart x={260} y={300} w={1400} h={560} pts={[[0, 0.45], [0.2, 0.55], [0.4, 0.68], [0.6, 0.8], [0.8, 0.9], [1, 0.96]]} t={easeInOut(span(f, greedy20, rise + 26))} color={P.mint} /></g>
        <g opacity={on(f, gap, 6)}><rect x={760} y={560} width={420} height={lerp(0, 230, on(f, gap, 14))} fill={P.gold} opacity={0.35} /><path d="M760 560 L760 790 M1180 560 L1180 790" stroke={P.gold} strokeWidth={6} /></g>
        {Array.from({ length: 12 }, (_, k) => { const sad = f < greedy20; return <g key={k} opacity={on(f, scared19 + k, 6)}><Mini look={['buyer', 'worker', 'owner', 'hero'][k % 4]} x={240 + k * 130 + Math.sin(f / 6 + k) * (sad ? 14 : 6)} y={1070} scale={0.7} frame={f} seed={k + 60} mood={sad ? 'sad' : 'happy'} /></g> })}
        <g opacity={on(f, looks - 10, 8)}><Buffett f={f} beats={gestB([[0, 'idle', 'neutral'], [looks, 'point', 'smiling']], G)} x={lerp(2100, 1720, on(f, looks - 10, 16))} y={1060} s={0.9} plate={0} flip /></g>
      </g>}
      {/* # C: Buffett's desk: the 1986 letter, the dial, and a briefcase everyone reaches for */}
      {Cw > 0 && <g opacity={Cw}>
        <rect x={0} y={900} width={1920} height={180} fill="#8E5E36" /><rect x={0} y={900} width={1920} height={16} fill="#B07A48" />
        <g opacity={1 - on(f, words, 10)}>
          <g transform={`translate(${lerp(1300, 560, on(f, letter, 16))} 560) rotate(${lerp(14, -4, on(f, letter, 16))})`}><Letter x={0} y={0} s={1.05} year="1986" hi={on(f, n1986, 8)} /></g>
          <g opacity={on(f, fearful, 8)}><Dial x={1340} y={800} s={1.25} v={f < greedy23 ? lerp(0, 0.9, on(f, fearful, 14)) : lerp(0.9, -0.9, easeInOut(span(f, greedy23, fearful2 + 10)))} /></g>
        </g>
        <g opacity={on(f, words, 10)}>
          <g transform="translate(960 840)"><Briefcase x={0} y={0} s={1.5} open={on(f, cash24, 14)} /></g>
          {Array.from({ length: 6 }, (_, k) => { const a = Math.PI * (0.12 + 0.76 * k / 5), r = lerp(900, 520, on(f, everybody + k * 2, 14)); return <path key={k} d={`M${960 - Math.cos(a) * 1100} ${880 - Math.sin(a) * 760} L${960 - Math.cos(a) * r} ${840 - Math.sin(a) * r * 0.66}`} stroke="#F2C9A0" strokeWidth={40} strokeLinecap="round" opacity={on(f, everybody + k * 2, 6)} /> })}
          <Buffett f={f} beats={gestB([[0, 'confident', 'smiling']], G)} x={360} y={1000} s={0.9} plate={0} />
        </g>
      </g>}
      <Vignette id="wb-prices" />
    </g>
  )
}

const BEATS = ['s21:and', 's14:now', 's18:way', 's19:worth', 's21:really', 's21:worth', 's22:wrote', 's23:he', 's11:idea', 's12:bike', 's12:500', 's13:normal', 's13:sells', 's13:500', 's14:cash', 's14:bill', 's14:wait', 's15:street', 's15:short', 's16:nobody', 's16:300', 's17:bike', 's17:fear', 's18:markets',
  's19:scared', 's19:sell', 's19:below', 's20:greedy', 's20:rise', 's21:gap', 's21:looks', 's22:letter', 's22:back', 's23:fearful', 's23:greedy#2', 's23:fearful#2', 's24:words', 's24:cash', 's24:everybody']
export const WB_PRICES = makePiece('wb-prices', 'Buffett long (casino-style): a market street with shops; the owner shows a red $500 bike and a buyer pays $500 in the sun; a BILL DUE paper drops into the owner\'s hand and the sky turns grey; shutters roll down; passers-by walk past with pockets turned out; a bargain hunter offers $300 and the tag spins to $300; a storm over the same bike; a market board where a scared crowd pushes the price line under a dashed WORTH line and a greedy crowd pushes it above, the gap glowing gold as Buffett points; Buffett\'s desk with the 1986 letter, the fear-greed dial swinging, and a briefcase of cash that hands reach for', {
  mood: 'light', Component: Prices, beats: BEATS,
  sfx: [['s12:500', 'click', 0.3], ['s13:sells', 'coin', 0.3], ['s14:bill', 'thud', 0.3], ['s16:300', 'swish', 0.3], ['s17:fear', 'crack', 0.3], ['s21:gap', 'ding', 0.3], ['s24:cash', 'pop', 0.3]] })
