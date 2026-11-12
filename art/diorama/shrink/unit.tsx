// ============================================================
// sf-unit (s10–s23, cream): the hidden price rise in three steps. A) a 64 oz tub
// with its $5.99 shelf label; on "divide" a 9.4¢ coin rolls out (per ounce); the
// tub shrinks to 60 oz with the same label; an almost-10¢ coin; the two coins side
// by side with a +6.7% sticker; the label never changes (it pulses). B) the BLS
// report turns three products into per-ounce / per-sheet tags; an up-arrow "price
// increase". C) the two chocolate bars (400 G / 360 G) with "+11% PER GRAM".
// D) a magnifier sweeps a shelf: "how often?".
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { type Beat, Headline, Person, win } from '../aimoney/common'
import { bump, Cent, Cereal, ChocBar, Magnifier, pulse, Report, Rolls, S, Shelf, ShelfLabel, Sticker, Store, Tub } from './kit'

const GROUND = 880
// # a numbered step badge (fresh)
const Step: React.FC<{ x: number; y: number; n: number; o: number; lit: number }> = ({ x, y, n, o, lit }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${1 + 0.1 * lit})`}><circle r={38} fill={lit > 0.5 ? S.red : '#FFFFFF'} stroke={S.redD} strokeWidth={4} /><Label x={0} y={15} text={String(n)} size={46} font="Bebas Neue" color={lit > 0.5 ? '#FFFFFF' : S.redD} /></g>
)

const Unit: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const means = c('s10:means'), smaller10 = c('s10:smaller'), stays = c('s10:stays'), up10 = c('s10:up')
  const why11 = c('s11:why'), three11 = c('s11:three'), steps11 = c('s11:steps')
  const one12 = c('s12:one'), tub12 = c('s12:tub'), d64 = c('s12:64'), costs12 = c('s12:costs'), d599 = c('s12:5')
  const divide = c('s13:divide'), size13 = c('s13:size'), ounce13 = c('s13:ounce'), d94 = c('s13:94')
  const two14 = c('s14:two'), shrinks = c('s14:shrinks'), d60 = c('s14:60'), keeps = c('s14:keeps')
  const now15 = c('s15:now'), d10 = c('s15:10')
  const three16 = c('s16:three'), compare = c('s16:compare'), d67 = c('s16:67')
  const sticker17 = c('s17:sticker'), changed = c('s17:changed'), paying = c('s17:paying'), spoonful = c('s17:spoonful')
  const exactly18 = c('s18:exactly'), index18 = c('s18:index'), treats = c('s18:treats')
  const bureau = c('s19:bureau'), statistics = c('s19:statistics'), ounce19 = c('s19:ounce'), sheet19 = c('s19:sheet'), toilet19 = c('s19:toilet')
  const pack20 = c('s20:pack'), shrinks20 = c('s20:shrinks'), official = c('s20:official'), increase20 = c('s20:increase'), shelf20 = c('s20:shelf')
  const same21 = c('s21:same'), maths21 = c('s21:maths'), toblerone21 = c('s21:toblerone')
  const ten22 = c('s22:ten'), less22 = c('s22:less'), d11 = c('s22:11'), gram = c('s22:gram')
  const often = c('s23:often'), actually = c('s23:actually'), happen = c('s23:happen')
  const A = win(f, c('s10') - 20, index18), B = win(f, index18, same21), Cc = win(f, same21, c('s23')), D = on(f, c('s23'), 8)
  const shopper: Beat[] = [[0, 'idle', 'neutral'], [means, 'explain', 'neutral'], [up10, 'pointUp', 'thinking'], [one12, 'idle', 'neutral'], [paying, 'shock', 'worried'], [spoonful, 'facepalm', 'worried']]
  // # the tub shrinks on "shrinks" (s14): 64 oz → 60 oz is 6.25% less — the tub's height follows
  const h = lerp(1, 0.9375, on(f, shrinks, 20))
  return (
    <g>
      <Stage id="sf-unit" frame={f} />
      <Store f={f} aisle={f < same21 ? 'FROZEN' : 'SWEETS'} />
      <Headline f={f} lines={[[means, 'SHRINKFLATION', S.redD, 130], [three11, 'WHY IT IS A PRICE RISE', P.ink, 110], [one12, 'STEP 1: 64 OZ FOR $5.99', P.ink, 104], [d94, '≈ 9.4¢ AN OUNCE', P.ink, 110],
        [two14, 'STEP 2: 60 OZ, SAME $5.99', P.ink, 104], [d10, 'ALMOST 10¢ AN OUNCE', P.ink, 110], [three16, 'STEP 3: +6.7% PER OUNCE', S.redD, 104],
        [exactly18, 'THE OFFICIAL PRICE INDEX', P.ink, 104], [bureau, 'BLS: PRICE PER OUNCE', P.ink, 110], [same21, 'THE CHOCOLATE BAR', P.ink, 110], [d11, '≈ 11% MORE PER GRAM', S.redD, 110], [often, 'HOW OFTEN?', P.ink, 130]]} />

      {/* # the three steps along the floor */}
      <g opacity={on(f, three11, 8) * (1 - on(f, index18, 8))}>
        <Step x={1340} y={1010} n={1} o={pop(f, three11)} lit={on(f, one12, 6) * (1 - on(f, two14, 6))} />
        <Step x={1480} y={1010} n={2} o={pop(f, three11 + 4)} lit={on(f, two14, 6) * (1 - on(f, three16, 6))} />
        <Step x={1620} y={1010} n={3} o={pop(f, three11 + 8)} lit={on(f, three16, 6)} />
      </g>

      {/* # A) the tub, the label, the per-ounce coins */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="buyer" beats={shopper} x={250} y={GROUND} s={1.0} o={on(f, means - 10, 8)} />
        {/* # s10: a pack shrinks under a price that stays */}
        <g opacity={on(f, means, 8) * (1 - on(f, one12, 8))}><Cereal x={900} y={GROUND} s={1.2} h={lerp(1, 0.85, on(f, smaller10, 20))} oz="CEREAL" /><Sticker x={1100} y={GROUND - 330} s={pop(f, stays) * pulse(f, [c('s11:why'), c('s11:price')])} text="SAME $" color={S.mintD} /><g opacity={on(f, up10, 8)}><Sticker x={1300} y={GROUND - 200} s={pop(f, up10)} text="OR UP" color={S.red} /></g></g>
        <g opacity={on(f, tub12, 8)}>
          <Tub x={820} y={GROUND} s={1.2 * pop(f, tub12) * bump(f, d64, 0.05) * pulse(f, [c('s13:size'), c('s13:each'), c('s14:99'), c('s15:now'), c('s18:exactly'), c('s18:own')])} oz={f >= d60 ? '60 OZ' : '64 OZ'} h={h} />
          <g opacity={on(f, costs12, 8)}><ShelfLabel x={820} y={GROUND + 70} s={1.0 * bump(f, d599, 0.08) * bump(f, keeps, 0.08) * bump(f, sticker17, 0.08) * bump(f, changed, 0.06)} price="$5.99" /></g>
        </g>
        {/* # per ounce: the price is split into a coin for one ounce */}
        <g opacity={on(f, divide, 8)}><path d={`M1000 ${GROUND - 200} C1100 ${GROUND - 260} 1180 ${GROUND - 260} 1240 ${GROUND - 220}`} stroke={S.ink2} strokeWidth={5} strokeDasharray="10 8" fill="none" opacity={1 - on(f, two14, 8)} />
          <g transform={`translate(${lerp(1300, 1250, on(f, compare, 16))} ${GROUND - 200})`}><Cent x={0} y={0} r={60 * pop(f, d94) * pulse(f, [c('s16:price')])} t="9.4¢" /></g>
          <g opacity={on(f, d94, 8)}><Label x={1250} y={GROUND - 80} text="1 OUNCE (64 OZ)" size={34} font="Bebas Neue" color={S.ink2} /></g></g>
        <g opacity={on(f, d10, 8)}><Cent x={1560} y={GROUND - 200} r={64 * pop(f, d10) * pulse(f, [c('s16:up')])} t="10¢" /><Label x={1560} y={GROUND - 80} text="1 OUNCE (60 OZ)" size={34} font="Bebas Neue" color={S.ink2} /></g>
        <g opacity={on(f, d67, 8)}><Sticker x={1410} y={GROUND - 360} s={1.1 * pop(f, d67) * bump(f, spoonful, 0.06)} text="+6.7%" /></g>
      </g>}

      {/* # B) the BLS turns products into per-unit prices */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, index18, 8)}><Report x={360} y={600} s={1.1 * pop(f, index18) * bump(f, statistics, 0.05) * pulse(f, [c('s19:product')])} title="BLS" /></g>
        <Shelf x={720} y={GROUND - 40} w={1060} rows={1} gap={300} o={on(f, treats, 8)} />
        <g opacity={on(f, ounce19, 8)}><Tub x={860} y={GROUND - 40} s={0.7} oz="60 OZ" h={0.94} /><ShelfLabel x={860} y={GROUND + 60} s={0.9} price="$5.99" unit="10¢" hi={on(f, ounce19, 10)} /></g>
        <g opacity={on(f, sheet19, 8)}><Rolls x={1250} y={GROUND - 40} s={0.6} n={4} tp label="TOILET" /><ShelfLabel x={1250} y={GROUND + 60} s={0.9} price="PRICE" unit="/SHT" hi={on(f, toilet19, 10)} /></g>
        <g opacity={on(f, pack20, 8)}><Cereal x={1620} y={GROUND - 40} s={0.75} h={lerp(1, 0.88, on(f, shrinks20, 16))} oz="16 OZ" /></g>
        <g opacity={on(f, official, 8)}><path d="M1620 380 L1620 260 M1590 290 L1620 256 L1650 290" stroke={S.red} strokeWidth={12} fill="none" strokeLinecap="round" /><Label x={1620} y={230} text="PRICE INCREASE" size={40} font="Bebas Neue" color={S.redD} o={on(f, increase20, 8)} /></g>
        <g opacity={on(f, shelf20, 8)}><Label x={1620} y={GROUND + 64} text="SHELF PRICE: SAME" size={34} font="Bebas Neue" color={S.mintD} /></g>
      </g>}

      {/* # C) the chocolate bar maths */}
      {Cc > 0 && <g opacity={Cc}>
        <ChocBar x={960} y={360} s={0.75 * pop(f, same21) * bump(f, toblerone21, 0.04)} gap={0} grams="400 G" />
        <ChocBar x={960} y={720} s={0.75 * pop(f, maths21) * bump(f, less22, 0.04)} gap={1} grams="360 G" />
        <g opacity={on(f, ten22, 8)}><Sticker x={1440} y={720} s={pop(f, ten22)} text="-10%" /></g>
        <g opacity={on(f, d11, 8)}><Sticker x={1640} y={540} s={1.15 * pop(f, d11) * bump(f, gram, 0.06)} text="+11%/G" color={S.redD} /></g>
      </g>}

      {/* # D) how often? a magnifier sweeps a full shelf */}
      {D > 0 && <g opacity={D}>
        <Shelf x={260} y={GROUND - 40} w={1400} rows={2} gap={260} />
        {[0, 1, 2, 3, 4, 5].map((k) => <g key={k}><Cereal x={380 + k * 230} y={GROUND - 40} s={0.6} color={[S.sun, S.coral, S.sky, S.leaf, S.sun, S.berry][k]} oz="" />
          <Rolls x={380 + k * 230} y={GROUND - 300} s={0.45} n={3} tp={k % 2 === 1} /></g>)}
        <g opacity={on(f, often, 8)}><Magnifier x={lerp(500, 1400, easeInOut(span(f, often, happen + 20)))} y={460} s={1.1 * bump(f, actually, 0.04)} /></g>
      </g>}
      <Vignette id="sf-unit" />
    </g>
  )
}

const BEATS = ["s10:means", "s10:smaller", "s10:stays", "s10:up", "s11:three", "s12:one", "s12:tub", "s12:64", "s12:costs", "s12:5", "s13:divide", "s13:94", "s14:two", "s14:shrinks", "s14:60", "s14:keeps", "s15:10", "s16:three", "s16:compare", "s16:67", "s17:sticker", "s17:changed", "s17:paying", "s17:spoonful", "s18:index", "s18:treats", "s19:bureau", "s19:statistics", "s19:ounce", "s19:sheet", "s19:toilet", "s20:pack", "s20:shrinks", "s20:official", "s20:increase", "s20:shelf", "s21:same", "s21:maths", "s21:toblerone", "s22:ten", "s22:less", "s22:11", "s22:gram", "s23:often", "s23:actually", "s23:happen", "s10", "s23", "s11:why", "s11:price", "s13:size", "s13:each", "s14:99", "s15:now", "s18:exactly", "s18:own", "s16:price", "s16:up", "s19:product"]
export const SF_UNIT = makePiece('sf-unit', 'Shrinkflation ch1: a cereal box shrinks under a SAME $ sticker; three steps: 64 oz tub + $5.99 label → 9.4¢ an ounce coin; tub shrinks to 60 oz, same label → 10¢ coin; +6.7% sticker; BLS report, a shelf of tub / toilet paper / cereal with per-ounce or per-sheet unit prices, PRICE INCREASE arrow; 400 G vs 360 G bars with -10% and +11%/G; magnifier sweeps a full shelf', {
  mood: 'light', Component: Unit, beats: BEATS,
  sfx: [['s13:94', 'coin', 0.2], ['s14:shrinks', 'whoosh', 0.2], ['s16:67', 'pop', 0.25], ['s22:11', 'pop', 0.2]],
})
