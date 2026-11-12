// ============================================================
// sf-hook (s1–s9, cream supermarket): 2016 — a shopper with a trolley opens a
// triangle chocolate bar; on "gaps" the gaps between the peaks widen; the wrapper
// weight ticks 400 G → 360 G; a "-10%" sticker; the ingredient sacks (cocoa,
// sugar, milk) get price-up tags on "expensive". Then: a cereal box shrinks while
// its $4.99 sticker stays put ("shrinkflation"); a government report appears;
// a tall price-rise column with a hair-thin sliver = "barely moved inflation".
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { type Beat, Headline, Person, win } from '../aimoney/common'
import { bump, Cereal, ChocBar, Report, S, Sticker, Store, Trolley , pulse } from './kit'

const GROUND = 880
// # an ingredient sack with a price tag that can show an up arrow
const Ingredient: React.FC<{ x: number; y: number; label: string; color: string; up: number; s?: number }> = ({ x, y, label, color, up, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-80 0 C-100 -70 -80 -170 -50 -190 L50 -190 C80 -170 100 -70 80 0 Z" fill={color} stroke={S.woodD} strokeWidth={4} />
    <rect x={-56} y={-110} width={112} height={44} rx={8} fill="#FFFFFF" opacity={0.9} /><Label x={0} y={-78} text={label} size={30} font="Bebas Neue" color={S.ink} />
    <g opacity={up} transform={`translate(70 -200) scale(${0.8 + 0.2 * up})`}><rect x={-42} y={-30} width={84} height={56} rx={10} fill={S.red} /><path d="M0 -18 L0 14 M-14 -4 L0 -20 L14 -4" stroke="#FFFFFF" strokeWidth={6} fill="none" strokeLinecap="round" /></g>
  </g>
)

const Hook: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const s1 = c('s1'), y2016 = c('s1:2016'), shoppers = c('s1:shoppers'), opened = c('s1:opened'), bar1 = c('s1:bar'), odd = c('s1:odd')
  const gaps = c('s2:gaps'), mountains = c('s2:mountains'), wider = c('s2:wider')
  const box3 = c('s3:box'), same3 = c('s3:same'), big3 = c('s3:big'), d400 = c('s3:400'), d360 = c('s3:360')
  const d10 = c('s4:10'), less4 = c('s4:less'), exactly = c('s4:exactly')
  const company5 = c('s5:company'), ingredients = c('s5:ingredients'), expensive = c('s5:expensive'), more5 = c('s5:more')
  const trick = c('s6:trick'), name6 = c('s6:name'), shrink6 = c('s6:shrinkflation')
  const gov7 = c('s7:government'), measured = c('s7:measured'), answer7 = c('s7:answer'), surprised = c('s7:surprised'), people7 = c('s7:people')
  const real8 = c('s8:real'), hits = c('s8:hits'), buy8 = c('s8:buy'), most8 = c('s8:most'), barely = c('s8:barely'), inflation8 = c('s8:inflation')
  const what9 = c('s9:what'), cost9 = c('s9:cost')
  const A = win(f, s1 - 20, company5), B = win(f, company5, trick), D = on(f, trick, 8)
  const shopper: Beat[] = [[0, 'idle', 'neutral'], [opened, 'hold', 'smiling'], [odd, 'think', 'thinking'], [wider, 'shock', 'shocked'], [d360, 'pointDown', 'worried'], [exactly, 'shrug', 'worried']]
  const shopper2: Beat[] = [[0, 'idle', 'thinking'], [surprised, 'shock', 'shocked'], [real8, 'nodA', 'neutral', 'nodB', 14], [what9, 'scratchHead', 'thinking']]
  // # the wrapper weight ticks from 400 to 360 on "360"
  const grams = f >= d360 ? '360 G' : '400 G'
  return (
    <g>
      <Stage id="sf-hook" frame={f} />
      <Store f={f} aisle={f < trick ? 'SWEETS' : 'CEREAL'} />
      <Headline f={f} lines={[[y2016, 'BRITAIN, 2016', P.ink, 120], [gaps, 'THE GAPS GOT WIDER', P.ink, 110], [d400, 'FROM 400 GRAMS…', P.ink, 110], [d360, '…TO 360 GRAMS', S.redD, 110], [d10, '10% LESS CHOCOLATE', S.redD, 110],
        [company5, 'THE COMPANY: COSTS WENT UP', P.ink, 100], [shrink6, 'SHRINKFLATION', S.redD, 140], [gov7, 'THE US GOVERNMENT MEASURED IT', P.ink, 96], [real8, 'REAL — BUT A TINY PART OF INFLATION', P.ink, 84], [what9, 'SO WHAT DOES IT COST YOU?', P.ink, 104]]} />

      {/* # A) the shopper and the bar whose gaps widen */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, shoppers, 8)}><Person f={f} who="investorF" beats={shopper} x={260} y={GROUND} s={1.0} /><Trolley x={470} y={GROUND} s={0.8} f={f} load={0.4} /></g>
        <g opacity={on(f, opened, 8)}><ChocBar x={1230} y={560} s={0.95 * pop(f, opened) * bump(f, mountains, 0.04) * bump(f, big3, 0.04) * bump(f, box3, 0.03) * bump(f, same3, 0.03)} gap={on(f, gaps, 30)} grams={grams} /></g>
        <g opacity={on(f, wider, 8) * (1 - on(f, d400, 8))}><path d="M1080 360 L1150 360 M1310 360 L1380 360" stroke={S.red} strokeWidth={8} strokeLinecap="round" /><path d="M1090 346 L1076 360 L1090 374 M1370 346 L1384 360 L1370 374" stroke={S.red} strokeWidth={8} fill="none" strokeLinecap="round" /></g>
        <g opacity={on(f, d10, 8)}><Sticker x={1660} y={420} s={1.1 * pop(f, d10) * bump(f, less4, 0.06)} text="-10%" /></g>
      </g>}

      {/* # B) the company's reason: ingredients got more expensive */}
      {B > 0 && <g opacity={B}>
        <ChocBar x={1480} y={560} s={0.55} gap={1} grams="360 G" />
        <Ingredient x={420} y={GROUND} label="COCOA" color={S.chocL} up={on(f, expensive, 8)} s={1.35 * pop(f, ingredients)} />
        <Ingredient x={720} y={GROUND} label="SUGAR" color="#F3EDE0" up={on(f, expensive + 4, 8)} s={1.35 * pop(f, ingredients + 4)} />
        <Ingredient x={1020} y={GROUND} label="MILK" color="#DDEBF5" up={on(f, expensive + 8, 8)} s={1.35 * pop(f, ingredients + 8) * bump(f, more5, 0.05)} />
      </g>}

      {/* # D) shrinkflation; the government measured it; tiny part of inflation */}
      {D > 0 && <g opacity={D}>
        {/* # the cereal box shrinks, the sticker stays the same */}
        <g opacity={1 - on(f, gov7, 8)}>
          <Cereal x={960} y={GROUND} s={1.6 * bump(f, name6, 0.04)} h={lerp(1, 0.86, on(f, shrink6, 24))} w={lerp(1, 0.94, on(f, shrink6, 24))} oz={f >= shrink6 + 10 ? '16 OZ' : '18 OZ'} />
          <Sticker x={1250} y={GROUND - 420} s={1.1 * pop(f, trick)} text="$4.99" color={S.mintD} />
        </g>
        <g opacity={on(f, gov7, 8)}><Report x={560} y={600} s={1.0 * pop(f, gov7) * bump(f, measured, 0.05) * bump(f, answer7, 0.05)} title="US GOV" /></g>
        <g opacity={on(f, people7, 8)}><Person f={f} who="investorF" beats={shopper2} x={260} y={GROUND} s={1.0} /></g>
        {/* # the price-rise column with a hair-thin sliver for shrinking */}
        <g opacity={on(f, hits, 8)}><Trolley x={960} y={GROUND} s={1.0 * bump(f, most8, 0.06) * pulse(f, [c('s9:going'), c('s9:cost')])} f={f} load={on(f, buy8, 20)} /></g>
        <g opacity={on(f, barely, 8)}>
          <rect x={1340} y={GROUND - 420} width={200} height={420} rx={12} fill={S.sky} /><rect x={1340} y={GROUND - 422} width={200} height={3} fill={S.red} />
          <Label x={1440} y={GROUND + 60} text="PRICES UP" size={44} font="Bebas Neue" color={S.skyD} />
          <g opacity={on(f, inflation8, 8)}><path d={`M1550 ${GROUND - 421} L1640 ${GROUND - 470}`} stroke={S.red} strokeWidth={4} /><Label x={1700} y={GROUND - 490} text="SHRINKING" size={36} font="Bebas Neue" color={S.redD} /></g>
        </g>
      </g>}
      <Vignette id="sf-hook" />
    </g>
  )
}

const BEATS = ["s1", "s1:shoppers", "s1:opened", "s1:odd", "s2:gaps", "s2:mountains", "s2:wider", "s3:box", "s3:same", "s3:big", "s3:400", "s3:360", "s4:10", "s4:less", "s4:exactly", "s5:company", "s5:ingredients", "s5:expensive", "s5:more", "s6:trick", "s6:name", "s6:shrinkflation", "s7:government", "s7:measured", "s7:answer", "s7:surprised", "s7:people", "s8:real", "s8:hits", "s8:buy", "s8:most", "s8:barely", "s8:inflation", "s9:what", "s9:going", "s9:cost"]
export const SF_HOOK = makePiece('sf-hook', 'Shrinkflation hook: sweets aisle, shopper with trolley opens a triangle chocolate bar whose gaps widen, wrapper 400 G → 360 G, -10% sticker; cocoa/sugar/milk sacks get price-up tags; cereal box shrinks under a fixed $4.99 sticker; US government report; trolley of best sellers; tall price-rise column with a hair-thin shrinking sliver', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s2:wider', 'pop', 0.2], ['s3:360', 'click', 0.2], ['s6:shrinkflation', 'whoosh', 0.2]],
})
