// ---------------------------------------------------------------- s8–s16: step one, a retirement account is a box (the greenhouse).
// A) An empty glass box on the bench: A CONTAINER, with a TAX RULES tag; Jordan sets two potted money plants inside it
//    (STOCKS, BONDS) — the investments.
// B) Outside the box, on the left, a plant in a plain pot (NORMAL ACCOUNT) beside the grey TAX envelope: each year a few of
//    its coin-leaves fly into the envelope; a $100 dividend coin pops, part of it flies to tax. Inside the box the same
//    plant keeps all 100 and grows taller, untouched.
// C) A brass lock appears on the box door (rules about taking money out); then two big question signs:
//    WHO GIVES YOU THE BOX? and WHEN DO YOU PAY THE TAX?
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Box, Coin, GreenRoom, Label, Lock, No, Plant, R, TaxBox } from './kit'

const G = 920

const BoxPiece: React.FC<PieceProps> = ({ f, c }) => {
  const account8 = c('s8:account'), isnt8 = c("s8:isn't"), investment8 = c('s8:investment'), itself8 = c('s8:itself'), container8 = c('s8:container'), box8 = c('s8:box'), tax8 = c('s8:tax'), rules8 = c('s8:rules')
  const inside9 = c('s9:inside'), choose9 = c('s9:choose'), hold9 = c('s9:hold'), funds9 = c('s9:funds'), stocks9 = c('s9:stocks'), bonds9 = c('s9:bonds')
  const why10 = c('s10:why'), matter10 = c('s10:matter'), taxes10 = c('s10:taxes')
  const normal11 = c('s11:normal'), earn11 = c('s11:earn'), dividends11 = c('s11:dividends'), interest11 = c('s11:interest'), taxed11 = c('s11:taxed'), every11 = c('s11:every'), year11 = c('s11:year')
  const fund12 = c('s12:fund'), pays12 = c('s12:pays'), n100 = c('s12:100'), dividends12 = c('s12:dividends'), normal12 = c('s12:normal'), part12 = c('s12:part'), tax12 = c('s12:tax'), away12 = c('s12:away')
  const inside13 = c('s13:inside'), all13 = c('s13:all'), stays13 = c('s13:stays'), working13 = c('s13:working')
  const yearly14 = c('s14:yearly'), happen14 = c('s14:happen'), earnings14 = c('s14:earnings'), growing14 = c('s14:growing'), untouched14 = c('s14:untouched')
  const return15 = c('s15:return'), rules15 = c('s15:rules'), allowed15 = c('s15:allowed'), take15 = c('s15:take'), out15 = c('s15:out')
  const every16 = c('s16:every'), answers16 = c('s16:answers'), two16 = c('s16:two'), questions16 = c('s16:questions'), who16 = c('s16:who'), gives16 = c('s16:gives'), when16 = c('s16:when'), pay16 = c('s16:pay'), tax16 = c('s16:tax')

  const AB = why10 - 4, BC = return15 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = on(f, BC - 8, 10)
  const jBeats: Beat[] = [[0, 'explain', 'neutral'], [isnt8, 'crossNoA', 'neutral', 'crossNoB', 12], [container8, 'present', 'smiling'], [choose9, 'carry', 'smiling'], [stocks9, 'point', 'smiling'], [bonds9, 'thumbsUp', 'smiling']]
  // # B) the outside plant loses coin-leaves to tax each year; the inside plant keeps them
  const years = [every11, year11, n100]
  const inGrow = 0.35 + 0.45 * span(f, stays13, untouched14 + 10)
  const outGrow = 0.35 + 0.1 * span(f, earn11, away12)
  const money11 = c('s11:money'), inside14 = c('s14:inside')
  const bBeats: Beat[] = [[AB, 'think', 'thinking'], [taxes10, 'point', 'neutral'], [money11, 'point', 'neutral'], [inside14, 'present', 'smiling'], [taxed11, 'nervous', 'worried'], [n100, 'holdUp', 'smiling'], [tax12, 'facepalm', 'worried'], [inside13, 'point', 'smiling'], [growing14, 'celebrate', 'smiling']]

  return (
    <g>
      <GreenRoom id="rt-b" f={f} mood="day" floor={G} />
      {/* # A) the box and what goes in it */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="investor" beats={jBeats} x={360} y={G + 10} s={0.95} />
        <g opacity={on(f, account8 - 4, 12)}>
          <Box x={1150} y={G} s={1.15} tag={f >= rules8 ? 'TAX RULES' : undefined} tagColor={R.gold} glow={on(f, box8, 10)}>
            <g opacity={on(f, stocks9 - 4, 10)}><Plant x={-90} y={-30} s={1} grow={0.7} f={f} /></g>
            <g opacity={on(f, bonds9 - 4, 10)}><Plant x={100} y={-30} s={0.9} grow={0.5} f={f} leaves={R.leafL} /></g>
          </Box>
          <g opacity={on(f, stocks9, 8)}><Label x={1045} y={G + 60} text="STOCKS" size={36} /></g>
          <g opacity={on(f, bonds9, 8)}><Label x={1265} y={G + 60} text="BONDS" size={36} /></g>
          <g opacity={on(f, container8, 8) * (1 - on(f, stocks9, 8))}><Label x={1150} y={G + 60} text="A CONTAINER" size={42} /></g>
        </g>
        {/* not an investment by itself */}
        <g opacity={win(f, investment8, container8, 6)}><Plant x={760} y={G - 20} s={0.9} grow={0.6} f={f} /><No x={760} y={G - 160} r={110} o={on(f, itself8, 8)} /></g>
        <g opacity={on(f, funds9, 8)}><Label x={1150} y={300} text="FUNDS OF STOCKS & BONDS" size={44} /></g>
        <g opacity={on(f, hold9, 8) * (1 - on(f, funds9, 8))}><Label x={1150} y={300} text={f >= inside9 ? 'YOU CHOOSE WHAT GOES IN' : ''} size={44} /></g>
      </g>}
      {/* # B) the normal pot vs the box */}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="investor" beats={bBeats} x={260} y={G + 10} s={0.9} />
        <g opacity={on(f, matter10, 10)}>
          <Plant x={640} y={G} s={1.1} grow={outGrow} f={f} />
          <g opacity={on(f, normal11, 8)}><Label x={640} y={G + 60} text="NORMAL ACCOUNT" size={38} /></g>
          <TaxBox x={860} y={G - 420} s={0.9} o={on(f, taxes10, 10)} />
          {years.map((a, k) => f >= a && span(f, a, a + 18) < 1 ? <Coin key={k} x={lerp(680, 860, span(f, a, a + 18))} y={lerp(G - 230, G - 420, span(f, a, a + 18)) - 60 * Math.sin(Math.PI * span(f, a, a + 18))} s={0.6} /> : null)}
          <g opacity={on(f, dividends11, 8) * (1 - on(f, fund12, 8))}><Label x={640} y={G - 360} text={f >= interest11 ? 'DIVIDENDS & INTEREST' : 'DIVIDENDS'} size={36} /></g>
          <g opacity={on(f, taxed11, 8) * (1 - on(f, fund12, 8))}><Label x={860} y={G - 290} text="TAXED EACH YEAR" size={34} fill={R.grey} ink={R.paper} /></g>
          {/* the $100 dividend */}
          <g opacity={win(f, n100, inside13, 6)}><Coin x={lerp(640, 760, span(f, part12, tax12 + 8))} y={G - 300 - 10 * pop(f, n100, 12) - 60 * span(f, part12, tax12 + 8)} s={1.3 * (1 - 0.3 * span(f, part12, away12)) * (1 + 0.12 * pop(f, dividends12, 12))} text="$100" /></g>
          <g opacity={win(f, dividends12, part12, 6)}><Label x={640} y={G - 420} text="$100 OF DIVIDENDS" size={36} /></g>
          <g opacity={on(f, part12, 8) * (1 - on(f, inside13, 8))}><Label x={860} y={G - 290} text="PART GOES TO TAX" size={34} fill={R.grey} ink={R.paper} /></g>
        </g>
        <g opacity={on(f, normal12 - 10, 10)}>
          <Box x={1380} y={G} s={1.05} tag={f >= inside13 ? 'RETIREMENT BOX' : undefined} glow={on(f, all13, 10)}>
            <Plant x={0} y={-30} s={1.05} grow={inGrow} f={f} />
          </Box>
          <g opacity={on(f, all13, 8)}><Coin x={1680} y={G - 300 - 10 * pop(f, stays13, 12)} s={1.2} text="$100" /></g>
          <g opacity={on(f, working13, 8) * (1 - on(f, yearly14, 8))}><Label x={1380} y={G + 60} text="ALL $100 KEEPS WORKING" size={38} fill={R.forest} ink={R.paper} /></g>
          <g opacity={on(f, yearly14, 8)}><Label x={1380} y={G + 60} text={f >= growing14 ? 'GROWS UNTOUCHED' : 'NO YEARLY TAX'} size={38} fill={R.forest} ink={R.paper} /></g>
          <g opacity={on(f, happen14, 8)}><No x={1600} y={G - 420} r={60} o={win(f, happen14, earnings14 + 20, 6)} /></g>
        </g>
      </g>}
      {/* # C) the lock and the two questions */}
      {Cc > 0 && <g opacity={Cc}>
        <Box x={960} y={G} s={1.1} door="out">
          <Plant x={-60} y={-30} s={1} grow={0.8} f={f} /><Plant x={90} y={-30} s={0.85} grow={0.6} f={f} leaves={R.leafL} />
        </Box>
        <g opacity={on(f, rules15, 10)}><Lock x={1200} y={G - 120} s={0.9} text={f >= take15 ? 'OUT?' : ''} open={0} /></g>
        <g opacity={on(f, allowed15, 8) * (1 - on(f, every16, 8))}><Label x={960} y={G + 60} text="RULES FOR TAKING MONEY OUT" size={40} /></g>
        {[[who16, 'WHO GIVES YOU THE BOX?', 520], [when16, 'WHEN DO YOU PAY THE TAX?', 1400]].map(([a, t, x], k) => <g key={k} opacity={on(f, (a as number) - 4, 10)} transform={`translate(${x} ${300 - 10 * pop(f, a as number, 12)})`}>
          <rect x={-300} y={-70} width={600} height={140} rx={24} fill={k ? R.grey : R.forest} /><text y={18} textAnchor="middle" fill={R.paper} style={BB(52)}>{t as string}</text></g>)}
        <g opacity={on(f, two16, 8) * (1 - on(f, who16 - 4, 8))}><Label x={960} y={300} text="TWO QUESTIONS" size={56} /></g>
      </g>}
      <Headline f={f} lines={[[account8, 'STEP 1: IT IS A BOX', R.ink, 100], [why10, 'WHY THE BOX MATTERS', R.ink, 96], [return15, 'THE CATCH: RULES', R.ink, 100]]} />
    </g>
  )
}

export const RT_BOX = makePiece('rt-box', "Step one, a retirement account is a box: in a sunlit greenhouse an empty glass box with a brass frame (a container, with a TAX RULES tag); a lone potted plant labelled as not an investment by itself is crossed; Jordan sets two potted money plants inside (stocks, bonds); outside, a plant in a plain pot (normal account) loses coin-leaves into a grey TAX envelope each year and a $100 dividend coin shrinks as part flies to tax, while inside the box the same plant keeps all 100 dollars and grows taller untouched (no yearly tax, crossed); a brass lock appears on the box door (rules for taking money out); two big signs ask who gives you the box and when you pay the tax", {
  mood: 'light', Component: BoxPiece,
  beats: ["s8:account", "s8:isn't", "s8:investment", "s8:itself", "s8:container", "s8:box", "s8:rules", "s9:inside", "s9:choose", "s9:hold", "s9:funds", "s9:stocks", "s9:bonds", "s10:why", "s10:matter", "s10:taxes", "s11:normal", "s11:earn", "s11:dividends", "s11:interest", "s11:taxed", "s11:every", "s11:year", "s12:fund", "s12:100", "s12:dividends", "s12:normal", "s12:part", "s12:tax", "s12:away", "s13:inside", "s13:all", "s13:stays", "s13:working", "s14:yearly", "s14:happen", "s14:earnings", "s14:growing", "s14:untouched", "s15:return", "s15:rules", "s15:allowed", "s15:take", "s16:every", "s16:two", "s16:who", "s16:when", "s11:money", "s14:inside"],
  sfx: [['s12:100', 'coin', 0.1], ['s15:rules', 'click', 0.1]] })
