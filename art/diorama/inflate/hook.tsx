// ---------------------------------------------------------------- s1–s8: the hook (grandma's kitchen, gold afternoon light).
// A) You (hero) at the kitchen counter with a full shopping cart; its price tag climbs (costs more); your wallet's bill shrinks.
// B) The kitchen drawer slides open: a crisp 100-dollar bill inside (January 2000). It lifts out; beside it a grocery bag:
//    full in 2000, then half full today (buys what 50 bought). A pair of scissors cuts toward the bill — crossed
//    (nobody stole half); price tags float up around the bag and double.
// C) The hero shrugs (that's just life); a small wall dial appears, watched and steered every month; a thick
//    ECONOMICS book is crossed (no degree needed); six little signs line up on the counter and light one by one.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bag, Bill, Cart, Drawer, K, Kitchen, Label, Mango, No, Tag, Thermostat } from './kit'

const G = 900

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const felt1 = c("s1:felt"), checkout1 = c('s1:checkout'), nobody1 = c('s1:nobody'), word1 = c('s1:word')
  const cart2 = c('s2:cart'), groceries2 = c('s2:groceries'), costs2 = c('s2:costs'), more2 = c('s2:more'), ago2 = c('s2:ago'), feel2 = c('s2:feel'), money2 = c('s2:money'), shrinking2 = c('s2:shrinking'), quietly2 = c('s2:quietly')
  const imagine3 = c('s3:imagine'), grandma3 = c('s3:grandma'), tucked3 = c('s3:tucked'), bill3 = c('s3:bill'), drawer3 = c('s3:drawer'), january3 = c('s3:january'), found3 = c('s3:found'), today3 = c('s3:today')
  const bill4 = c('s4:bill'), crisp4 = c('s4:crisp'), store4 = c('s4:store'), buys4 = c('s4:buys'), n50 = c('s4:50'), back4 = c('s4:back')
  const stole5 = c('s5:stole'), half5 = c('s5:half'), prices5 = c('s5:prices'), doubled5 = c('s5:doubled'), little5 = c('s5:little'), time5 = c('s5:time')
  const thinking6 = c('s6:thinking'), life6 = c('s6:life'), up6 = c('s6:up'), partly6 = c('s6:partly'), fast6 = c('s6:fast'), watch6 = c('s6:watch'), month6 = c('s6:month'), steer6 = c('s6:steer'), purpose6 = c('s6:purpose')
  const need7 = c('s7:need'), economics7 = c('s7:economics'), degree7 = c('s7:degree'), follow7 = c('s7:follow'), okay7 = c('s7:okay')
  const step8 = c('s8:step'), inflation8 = c('s8:inflation'), measured8 = c('s8:measured'), causes8 = c('s8:causes'), goal8 = c('s8:goal'), pushed8 = c('s8:pushed'), money8 = c('s8:money'), pocket8 = c('s8:pocket')

  const AB = imagine3 - 6, BC = thinking6 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = on(f, BC - 8, 10)

  // # A) the cart and its climbing tag
  const tagV = f >= more2 ? lerp(84, 112, span(f, more2, ago2)) : 84
  const aBeats: Beat[] = [[0, 'idle', 'neutral'], [felt1, 'scratchHead', 'thinking'], [checkout1, 'point', 'neutral'], [nobody1, 'shrug', 'thinking'], [word1, 'think', 'thinking'], [cart2, 'push', 'neutral'], [costs2, 'shock', 'shocked'], [feel2, 'emptyPockets', 'worried'], [shrinking2, 'despair', 'worried']]
  // # B) the drawer, the bill, the bag
  const open = span(f, drawer3 - 4, drawer3 + 14)
  const billUp = span(f, found3, found3 + 16)
  const bagFill = f < today3 ? on(f, january3, 10) : lerp(1, 0.5, span(f, n50 - 6, n50 + 10))
  const tagsUp = on(f, prices5, 14)
  const cut = win(f, stole5 - 4, prices5, 6)
  const bBeats: Beat[] = [[AB, 'think', 'thinking'], [found3, 'reachDown', 'shocked'], [today3, 'holdUp', 'smiling'], [store4, 'point', 'neutral'], [n50, 'shock', 'shocked'], [stole5, 'crossNoA', 'neutral', 'crossNoB', 12], [doubled5, 'facepalm', 'worried'], [time5, 'explain', 'neutral']]
  // # C) the dial, the book, six signs
  const dialV = f < watch6 ? 2 : 2 + 1.4 * Math.sin((f - watch6) / 9) * (1 - span(f, steer6, purpose6 + 10))
  const cBeats: Beat[] = [[BC, 'shrug', 'thinking'], [partly6, 'pointUp', 'neutral'], [watch6, 'lookFar', 'neutral'], [steer6, 'point', 'smiling'], [need7, 'stop', 'smiling'], [follow7, 'thumbsUp', 'smiling'], [okay7, 'explain', 'smiling'], [step8, 'present', 'smiling'], [pocket8, 'thumbsUp', 'smiling']]
  const signs = [inflation8, measured8, causes8, goal8, pushed8, money8]
  const SIGN = ['WHAT IT IS', 'MEASURED', 'CAUSES', 'THE GOAL', 'PUSHED DOWN', 'YOUR MONEY']

  return (
    <g>
      <Kitchen id="in-h" f={f} mood="gold" counter={G} />
      {/* # A) the cart at the checkout */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="hero" beats={aBeats} x={420} y={G + 10} s={0.95} />
        <Cart x={1040} y={G} s={1.15} f={f} o={on(f, cart2 - 4, 10)} />
        <g opacity={on(f, groceries2, 8)}><Tag x={1100 + 120} y={500 - 60 * span(f, more2, ago2)} s={1.3} text={`$${Math.round(tagV)}`} color={f >= more2 ? K.coral : K.sun} string={90} /></g>
        <g opacity={on(f, money2 - 4, 8)}><Bill x={700} y={560} s={0.7 * (1 - 0.35 * span(f, quietly2, shrinking2 + 16))} r={-8} /></g>
        <g opacity={on(f, checkout1, 8) * (1 - on(f, cart2, 8))}><Label x={1040} y={G + 70} text="THE CHECKOUT" size={40} /></g>
      </g>}
      {/* # B) grandma's drawer */}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="hero" beats={bBeats} x={330} y={G + 10} s={0.95} />
        <g opacity={on(f, grandma3, 10)}>
          <Drawer x={820} y={G - 170} open={open}>{billUp < 0.5 && <Bill x={0} y={-40} s={0.6} />}</Drawer>
          <Label x={820} y={G + 70} text={f >= january3 ? 'JANUARY 2000' : "GRANDMA'S DRAWER"} size={40} o={on(f, grandma3, 8) * (1 - on(f, store4, 8))} />
        </g>
        {f >= found3 && <Bill x={lerp(820, 760, billUp)} y={lerp(G - 210, 380, billUp) - 6 * pop(f, crisp4, 12)} s={lerp(0.6, 1.1, billUp)} r={lerp(0, -6, billUp) + 8 * pop(f, bill4, 14)} glow={on(f, crisp4, 10)} />}
        {/* the bill drops into the drawer as it is named */}
        <g opacity={win(f, bill3, drawer3 + 6, 6)}><Bill x={820} y={lerp(420, G - 220, span(f, bill3, drawer3))} s={0.55} r={lerp(-20, 0, span(f, bill3, drawer3))} /></g>
        {/* the bag: what the bill buys */}
        <g opacity={on(f, january3, 10)}>
          <Bag x={1420} y={G} s={1.1} fill={bagFill} />
          <Label x={1420} y={G + 70} text={f >= n50 ? 'TODAY: HALF' : 'IN 2000'} size={40} fill={f >= n50 ? K.coral : K.paper} ink={f >= n50 ? K.paper : K.ink} />
        </g>
        {/* scissors (nobody stole half) — crossed */}
        <g opacity={cut} transform={`translate(${lerp(980, 900, span(f, stole5, half5))} 330)`}>
          <circle cx={-30} cy={30} r={22} fill="none" stroke={K.ink} strokeWidth={8} /><circle cx={30} cy={30} r={22} fill="none" stroke={K.ink} strokeWidth={8} />
          <path d="M-14 14 L40 -70 M14 14 L-40 -70" stroke="#9AA5B4" strokeWidth={10} strokeLinecap="round" />
        </g>
        <No x={900} y={320} r={100} o={win(f, half5, prices5, 6)} />
        {/* price tags floating up around the bag */}
        {[[1230, 480, '$1'], [1620, 440, '$3'], [1300, 300, '$2'], [1560, 250, '$4']].map(([tx, ty, t], k) => <Tag key={k} x={tx as number} y={(ty as number) - 50 * tagsUp - 20 * on(f, doubled5, 12)} s={0.75 * (1 + 0.6 * on(f, doubled5 + k * 3, 10))} text={f >= doubled5 ? `$${Number(String(t).slice(1)) * 2}` : (t as string)} color={f >= doubled5 ? K.coral : K.sun} r={k % 2 ? 8 : -8} o={tagsUp * (1 - on(f, BC - 10, 8))} />)}
      </g>}
      {/* # C) the dial and the six steps */}
      {Cc > 0 && <g opacity={Cc}>
        <Person f={f} who="hero" beats={cBeats} x={300} y={G + 10} s={0.95} />
        <g opacity={on(f, life6, 10) * (1 - on(f, need7, 8))}>
          {/* prices go up: a rising stack of tags */}
          {[0, 1, 2].map((k) => <Tag key={k} x={760 + k * 150} y={G - 80 - k * 90 * on(f, up6, 12)} s={0.9} text={`$${10 + k * 2}`} color={K.sun} o={on(f, up6 + k * 3, 8)} />)}
          <g opacity={on(f, fast6, 10)}><Thermostat x={1420} y={460} s={0.85} value={dialV} goal={on(f, steer6, 10)} />
            <Label x={1420} y={760} text={f >= month6 ? 'WATCHED EVERY MONTH' : 'HOW FAST?'} size={40} /></g>
        </g>
        {/* the economics book — crossed */}
        <g opacity={win(f, economics7, okay7 + 6, 6)}>
          <g transform="translate(1120 560) rotate(-6)"><rect x={-170} y={-120} width={340} height={240} rx={14} fill={K.plum} /><rect x={-170} y={-120} width={40} height={240} rx={10} fill={K.plumD} />
            <text x={20} y={10} textAnchor="middle" fill={K.paper} style={BB(52)}>ECONOMICS</text><text x={20} y={64} textAnchor="middle" fill={K.lilac} style={BB(34)}>VOL. 1–12</text></g>
          <No x={1120} y={560} r={190} o={on(f, degree7, 8)} />
        </g>
        {/* six signs on the counter */}
        {signs.map((s, k) => { const x = 690 + k * 210, lit = on(f, s, 8)
          return <g key={k} opacity={on(f, step8 + k * 2, 8)} transform={`translate(${x} ${G - 20 - 14 * pop(f, s, 12)})`}>
            <rect x={-92} y={-150} width={184} height={150} rx={16} fill={lit > 0.5 ? K.sun : K.paper} stroke={K.ink} strokeOpacity={0.2} strokeWidth={3} />
            {k === 0 && <Tag x={6} y={-92} s={0.7} text="$" color={K.coral} />}
            {k === 1 && <g transform="translate(0 -92)"><rect x={-44} y={-30} width={88} height={60} rx={10} fill={K.wood} /><rect x={-50} y={-42} width={100} height={16} rx={6} fill={K.woodD} /></g>}
            {k === 2 && <Mango x={0} y={-92} s={0.9} />}
            {k === 3 && <Thermostat x={0} y={-92} s={0.17} value={2} />}
            {k === 4 && <g transform="translate(0 -92)"><path d="M0 -36 L0 30 M-24 8 L0 32 L24 8" fill="none" stroke={K.green} strokeWidth={10} strokeLinecap="round" /></g>}
            {k === 5 && <Bill x={0} y={-92} s={0.42} />}
            <text y={-14} textAnchor="middle" fill={K.ink} style={BB(30)}>{SIGN[k]}</text>
          </g> })}
      </g>}
      <Headline f={f} lines={[[felt1, 'YOU FEEL IT AT THE CHECKOUT', K.ink, 92], [imagine3, "GRANDMA'S $100", K.ink, 100], [stole5, 'PRICES DOUBLED', K.coralD, 100], [thinking6, 'JUST LIFE?', K.ink, 100], [step8, '6 STEPS', K.ink, 100]]} />
    </g>
  )
}

export const IN_HOOK = makePiece('in-hook', "Hook: grandma's sunlit kitchen; you at the checkout with a full cart whose price tag climbs, the bill in your hand shrinks; the kitchen drawer slides open on a crisp 100-dollar bill from January 2000; a grocery bag full in 2000 is only half full today; scissors toward the bill are crossed (nobody stole half), price tags float up and double; you shrug, a wall thermostat appears that is watched every month and steered to 2%; a thick economics book is crossed; six little signs on the counter light up one by one (what it is, measured, causes, the goal, pushed down, your money)", {
  mood: 'light', Component: Hook,
  beats: ["s1:felt", "s1:checkout", "s1:nobody", "s1:word", "s2:cart", "s2:groceries", "s2:costs", "s2:more", "s2:ago", "s2:feel", "s2:money", "s2:shrinking", "s2:quietly", "s3:imagine", "s3:grandma", "s3:bill", "s3:drawer", "s3:january", "s3:found", "s3:today", "s4:bill", "s4:crisp", "s4:store", "s4:50", "s5:stole", "s5:half", "s5:prices", "s5:doubled", "s5:time", "s6:thinking", "s6:life", "s6:up", "s6:partly", "s6:fast", "s6:watch", "s6:month", "s6:steer", "s6:purpose", "s7:need", "s7:economics", "s7:degree", "s7:follow", "s7:okay", "s8:step", "s8:inflation", "s8:measured", "s8:causes", "s8:goal", "s8:pushed", "s8:money", "s8:pocket"],
  sfx: [['s3:drawer', 'swish', 0.1], ['s4:50', 'tick', 0.1], ['s5:doubled', 'pop', 0.1]] })
