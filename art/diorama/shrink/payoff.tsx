// ============================================================
// sf-payoff (s94–s99, cream): see the description at the bottom.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { type Beat, Headline, Person, win } from '../aimoney/common'
import { bump, Cereal, ChocBar, Jar, Magnifier, Rolls, S, Shelf, ShelfLabel, Sticker, Store, Trolley } from './kit'

const GROUND = 880
// ------------------------------------------------------------ payoff (s94–s99)
const Payoff: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const real94 = c('s94:real'), yes = c('s95:yes'), targets = c('s95:targets'), most95 = c('s95:most')
  const small96 = c('s96:small'), overall96 = c('s96:overall')
  const lesson = c('s97:lesson'), shown = c('s97:shown')
  const raise = c('s98:raise'), touching = c('s98:touching'), inside = c('s98:inside'), box98 = c('s98:box')
  const sticker99 = c('s99:sticker'), pay99 = c('s99:pay'), unit99 = c('s99:unit'), get = c('s99:get')
  const shopper: Beat[] = [[0, 'idle', 'thinking'], [yes, 'nodA', 'neutral', 'nodB', 14], [lesson, 'explain', 'smiling'], [get, 'thumbsUp', 'smiling']]
  return (
    <g>
      <Stage id="sf-payoff" frame={f} />
      <Store f={f} aisle="CEREAL" />
      <Headline f={f} lines={[[real94, 'IS SHRINKFLATION REAL?', P.ink, 120], [yes, 'YES — ON THE BEST SELLERS', S.redD, 110], [small96, 'A SMALL PART OF INFLATION', P.ink, 110], [lesson, 'HOW PRICES ARE SHOWN', P.ink, 120], [sticker99, 'STICKER = PAY · UNIT PRICE = GET', S.redD, 92]]} />
      <Person f={f} who="investorF" beats={shopper} x={280} y={GROUND} s={1.0} />
      <g opacity={on(f, real94, 8) * (1 - on(f, lesson, 8))}>
        <Shelf x={560} y={GROUND - 40} w={1200} rows={1} gap={320} />
        {[0, 1, 2, 3].map((k) => <g key={k}>{(k === 1 || k === 2) && <ellipse cx={720 + k * 300} cy={GROUND - 190} rx={110} ry={180} fill={S.glow} opacity={0.5 * on(f, targets + k * 3, 10)} />}
          <Cereal x={720 + k * 300} y={GROUND - 40} s={0.8 * ((k === 1 || k === 2) ? bump(f, most95, 0.06) : 1)} color={[S.sun, S.coral, S.berry, S.leaf][k]} oz="" /></g>)}
        <g opacity={on(f, small96, 8)}><Sticker x={1680} y={380} s={pop(f, small96) * bump(f, overall96, 0.05)} text="<0.1 PT" color={S.skyD} /></g>
      </g>
      <g opacity={on(f, lesson, 8)}>
        <Cereal x={960} y={GROUND} s={1.5 * pop(f, lesson) * bump(f, shown, 0.04)} h={lerp(1, 0.88, on(f, inside, 20))} oz={f >= inside ? '16 OZ' : '18 OZ'} />
        <g opacity={on(f, raise, 8)}><Sticker x={1240} y={GROUND - 420} s={pop(f, raise) * bump(f, touching, 0.06)} text="$4.99" color={S.mintD} /></g>
        <g opacity={on(f, box98, 8)}><Label x={960} y={GROUND + 64} text="SAME TAG, LESS INSIDE" size={44} font="Bebas Neue" color={S.redD} /></g>
        <g opacity={on(f, pay99, 8)}><ShelfLabel x={1520} y={420} s={1.4 * pop(f, pay99)} price="$4.99" unit="31¢" hi={on(f, unit99, 10)} />
          <Label x={1440} y={330} text="WHAT YOU PAY" size={36} font="Bebas Neue" color={S.ink} /><g opacity={on(f, unit99, 8)}><Label x={1610} y={520} text="WHAT YOU GET" size={36} font="Bebas Neue" color={S.redD} /></g></g>
      </g>
      <Vignette id="sf-payoff" />
    </g>
  )
}
const BEATS = ["s94:real", "s95:yes", "s95:targets", "s95:most", "s96:small", "s96:overall", "s97:lesson", "s97:shown", "s98:raise", "s98:touching", "s98:inside", "s98:box", "s99:pay", "s99:unit", "s99:get"]
export const SF_PAYOFF = makePiece('sf-payoff', 'Shrinkflation payoff: shopper; a cereal shelf where the best sellers glow; <0.1 PT sticker; one big box shrinks under the same $4.99 sticker (same tag, less inside); a shelf label: WHAT YOU PAY (price) / WHAT YOU GET (unit price lit)', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s95:yes', 'pop', 0.2], ['s98:inside', 'whoosh', 0.2], ['s99:get', 'pop', 0.2]],
})
