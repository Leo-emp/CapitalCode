// ============================================================
// sf-why (s45–s56, cream): why companies shrink instead of raising the price.
// A) a company office: the boss at a desk between two choices — a bigger price
// tag or a smaller box; the GAO report; costs go up (ingredient crates with
// price arrows), coins to cover them, and a coin stack for "earn more".
// B) the shelf as the shopper sees it: on the left a label jumps $4.99 → $5.49 in
// big numbers and the shopper is shocked; on the right a box goes 18 → 16 oz and
// looks the same from the front; customers walk away from the left one (fewer
// from the right); both earn the same extra per ounce.  C) the tells: a jar with a
// hidden dip, a thinner box (side view), wider chocolate gaps; the small print
// under a magnifier: NET WT 16 OZ.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { Mini } from '../../rig/Mini'
import { type Beat, Headline, Person, win } from '../aimoney/common'
import { bump, Cent, Cereal, ChocBar, Jar, Magnifier, Report, S, Shelf, ShelfLabel, Sticker, Store , pulse } from './kit'

const GROUND = 880
// # a choice card: a drawing inside a round frame with a short title
const Choice: React.FC<{ x: number; y: number; o: number; s: number; kind: 'tag' | 'box'; title: string; pick?: number }> = ({ x, y, o, s, kind, title, pick = 0 }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={140} fill="#FFFFFF" stroke={pick > 0.5 ? S.red : S.paperD} strokeWidth={pick > 0.5 ? 10 : 6} />
    {kind === 'tag' ? <g><rect x={-70} y={-60} width={140} height={90} rx={12} fill={S.tag} stroke={S.tagD} strokeWidth={4} /><Label x={0} y={0} text="$$" size={50} font="Bebas Neue" color={S.ink} /><path d="M80 -60 L80 -110 M62 -92 L80 -114 L98 -92" stroke={S.red} strokeWidth={10} fill="none" strokeLinecap="round" /></g>
      : <g><rect x={-50} y={-90} width={100} height={130} rx={8} fill={S.sun} stroke={S.sunD} strokeWidth={4} /><path d="M80 -110 L80 -60 M62 -78 L80 -56 L98 -78" stroke={S.red} strokeWidth={10} fill="none" strokeLinecap="round" /></g>}
    <Label x={0} y={100} text={title} size={36} font="Bebas Neue" color={S.ink} />
  </g>
)
// # a wooden crate of an ingredient with a price arrow
const Crate: React.FC<{ x: number; y: number; label: string; up: number; s?: number }> = ({ x, y, label, up, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-120} width={180} height={120} rx={8} fill={S.woodL} stroke={S.woodD} strokeWidth={5} /><path d="M-90 -60 L90 -60" stroke={S.woodD} strokeWidth={4} />
    <rect x={-60} y={-104} width={120} height={36} rx={6} fill="#FFFFFF" /><Label x={0} y={-78} text={label} size={28} font="Bebas Neue" color={S.ink} />
    <g opacity={up} transform="translate(0 -160)"><path d="M0 26 L0 -20 M-18 -2 L0 -24 L18 -2" stroke={S.red} strokeWidth={10} fill="none" strokeLinecap="round" /></g>
  </g>
)

const Why: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const why45 = c('s45:why'), company45 = c('s45:company'), shrink45 = c('s45:shrink'), raising = c('s45:raising'), price45 = c('s45:price')
  const gao46 = c('s46:gao'), obvious = c('s46:obvious'), reasons = c('s46:reasons')
  const costs47 = c('s47:costs'), up47 = c('s47:up'), cover = c('s47:cover'), earn = c('s47:earn'), more47 = c('s47:more')
  const second48 = c('s48:second'), quieter = c('s48:quieter')
  const think49 = c('s49:think'), see49 = c('s49:see'), shelf49 = c('s49:shelf')
  const jumps = c('s50:jumps'), d549 = c('s50:5'), printed = c('s50:printed'), big50 = c('s50:big')
  const box51 = c('s51:box'), d16 = c('s51:16'), same51 = c('s51:same'), front51 = c('s51:front')
  const gao52 = c('s52:gao'), fewer52 = c('s52:fewer'), customers52 = c('s52:customers'), tag52 = c('s52:tag'), notice52 = c('s52:notice')
  const extra53 = c('s53:extra'), ounce53 = c('s53:ounce'), losing = c('s53:losing')
  const hidden54 = c('s54:hidden'), shape = c('s54:shape'), dip = c('s54:dip'), jar54 = c('s54:jar'), thinner = c('s54:thinner'), gaps54 = c('s54:gaps')
  const front55 = c('s55:front'), package55 = c('s55:package'), tell55 = c('s55:tell')
  const small56 = c('s56:small'), print56 = c('s56:print'), weight56 = c('s56:weight'), count56 = c('s56:count')
  const A = win(f, c('s45') - 20, think49), B = win(f, think49, hidden54), D = on(f, hidden54, 8)
  const boss: Beat[] = [[0, 'idle', 'thinking'], [shrink45, 'present', 'smug'], [costs47, 'worried' as never, 'worried'], [earn, 'countA', 'smug', 'countB', 14]]
  const shopperL: Beat[] = [[0, 'idle', 'neutral'], [jumps, 'shock', 'shocked'], [big50, 'pointUp', 'angry']]
  const shopperR: Beat[] = [[0, 'idle', 'neutral'], [box51, 'idle', 'smiling'], [same51, 'thumbsUp', 'smiling']]
  return (
    <g>
      <Stage id="sf-why" frame={f} />
      <Store f={f} aisle={f >= second48 && f < hidden54 ? 'CEREAL' : undefined} />
      <Headline f={f} lines={[[why45, 'WHY SHRINK INSTEAD?', P.ink, 120], [gao46, 'THE GAO: THE OBVIOUS REASONS', P.ink, 100], [costs47, 'COSTS UP · EARN MORE', P.ink, 110], [second48, 'A QUIETER REASON', S.redD, 120],
        [think49, 'WHAT YOU SEE ON THE SHELF', P.ink, 104], [gao52, 'FEWER SHOPPERS NOTICE', P.ink, 110], [extra53, 'SAME EXTRA MONEY PER OUNCE', P.ink, 100], [hidden54, 'HIDDEN IN THE SHAPE', S.redD, 120], [small56, 'CHECK THE SMALL PRINT', P.ink, 120]]} />

      {/* # A) the boss, two choices, the reasons */}
      {A > 0 && <g opacity={A}>
        <rect x={180} y={GROUND - 190} width={420} height={26} rx={8} fill={S.woodD} /><rect x={200} y={GROUND - 164} width={20} height={164} fill={S.woodD} /><rect x={560} y={GROUND - 164} width={20} height={164} fill={S.woodD} />
        <g opacity={on(f, company45, 8)}><Person f={f} who="owner" beats={boss.map((b) => (b[1] === ('worried' as never) ? [b[0], 'nervous', 'worried'] : b) as Beat)} x={390} y={GROUND - 30} s={0.95} /></g>
        <g opacity={1 - on(f, gao46, 8)}>
          <Choice x={940} y={540} o={on(f, raising, 8)} s={pop(f, raising)} kind="tag" title="RAISE THE PRICE" pick={0} />
          <Choice x={1400} y={540} o={on(f, shrink45, 8)} s={pop(f, shrink45) * bump(f, price45, 0.05)} kind="box" title="SHRINK THE PACK" pick={on(f, price45, 8)} />
        </g>
        <g opacity={on(f, gao46, 8)}><Report x={900} y={560} s={0.9 * pop(f, gao46) * bump(f, obvious, 0.05) * bump(f, reasons, 0.05)} title="GAO" color={S.mintD} /></g>
        <g opacity={on(f, costs47, 8)}><Crate x={1220} y={GROUND} label="INGREDIENTS" up={on(f, up47, 8)} /><Crate x={1460} y={GROUND} label="PACKAGING" up={on(f, up47 + 4, 8)} /></g>
        <g opacity={on(f, cover, 8)}>{[0, 1, 2].map((k) => <Cent key={k} x={1220 + k * 60} y={GROUND - 200 - k * 4} r={24 * pop(f, cover + k * 3)} t="$" />)}</g>
        <g opacity={on(f, earn, 8)}><Cent x={1700} y={GROUND - 60} r={44 * pop(f, earn) * bump(f, more47, 0.1)} t="+$" /></g>
      </g>}

      {/* # B) the shelf as the shopper sees it */}
      {B > 0 && <g opacity={B}>
        <Shelf x={300} y={GROUND - 120} w={1320} rows={1} gap={320} o={on(f, think49, 8) * bump(f, shelf49, 0)} />
        <g opacity={on(f, see49, 8)}>
          <Cereal x={640} y={GROUND - 120} s={0.95} oz="18 OZ" />
          <ShelfLabel x={640} y={GROUND - 30} s={1.5 * bump(f, jumps, 0.1) * bump(f, printed, 0.06) * pulse(f, [c('s52:gao')])} price={f >= d549 ? '$5.49' : '$4.99'} />
          <Cereal x={1260} y={GROUND - 120} s={0.95} h={lerp(1, 0.9, on(f, d16, 16))} oz={f >= d16 ? '16 OZ' : '18 OZ'} />
          <ShelfLabel x={1260} y={GROUND - 30} s={1.5 * bump(f, same51, 0.04) * pulse(f, [c('s52:pack'), c('s54:why')])} price="$4.99" />
        </g>
        <g opacity={on(f, jumps, 8)}><Sticker x={860} y={GROUND - 420} s={pop(f, jumps)} text="SEEN" /></g>
        <g opacity={on(f, front51, 8)}><Sticker x={1480} y={GROUND - 420} s={pop(f, front51)} text="LOOKS SAME" color={S.mintD} /></g>
        {/* # customers walking away: three from the left box, one from the right */}
        <g opacity={on(f, fewer52, 8) * (1 - on(f, extra53, 8))}>
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${lerp(0, -220, easeInOut(span(f, customers52 + k * 4, customers52 + k * 4 + 40)))} 0)`}><Mini look={['buyer', 'worker', 'owner'][k]} x={380 + k * 90} y={GROUND + 120} scale={0.6} frame={f} seed={k + 10} mood="sad" /></g>)}
          <g transform={`translate(${lerp(0, 220, easeInOut(span(f, tag52, tag52 + 40)))} 0)`}><Mini look="investor" x={1500} y={GROUND + 120} scale={0.6} frame={f} seed={14} /></g>
          <g opacity={on(f, notice52, 8)}><Label x={960} y={1050} text="A BIGGER TAG LOSES MORE SHOPPERS" size={36} font="Bebas Neue" color={S.redD} /></g>
        </g>
        <g opacity={on(f, extra53, 8)}>
          <Cent x={640} y={260} r={50 * pop(f, extra53)} t="+$" /><Cent x={1260} y={260} r={50 * pop(f, ounce53)} t="+$" />
          <Label x={950} y={280} text="=" size={90} font="Bebas Neue" color={S.ink} o={on(f, ounce53, 8)} />
          <g opacity={on(f, losing, 8)}><Label x={1260} y={360} text="FEWER LOST" size={36} font="Bebas Neue" color={S.mintD} /></g>
        </g>
      </g>}

      {/* # C) the tells, then the small print */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, small56, 8)}>
          <g opacity={on(f, dip, 8)}><Jar x={480} y={GROUND} s={1.1 * pop(f, dip) * bump(f, jar54, 0.05) * pulse(f, [c('s56:only'), c('s56:sure')])} dip={on(f, jar54, 16)} cut={on(f, jar54 + 6, 8)} /><Label x={480} y={GROUND + 64} text="DIP IN THE BOTTOM" size={36} font="Bebas Neue" color={S.ink2} /></g>
          <g opacity={on(f, thinner, 8)}>
            <rect x={900} y={GROUND - 300} width={lerp(100, 78, on(f, thinner, 16))} height={300} rx={6} fill={S.sunD} stroke={S.sunD} strokeWidth={4} />
            <rect x={1040} y={GROUND - 300} width={100} height={300} rx={6} fill="none" stroke={S.ink2} strokeWidth={4} strokeDasharray="12 8" />
            <Label x={1010} y={GROUND + 64} text="THINNER BOX (SIDE)" size={36} font="Bebas Neue" color={S.ink2} /></g>
          <g opacity={on(f, gaps54, 8)}><ChocBar x={1520} y={GROUND - 200} s={0.45 * pop(f, gaps54)} gap={1} grams="" /><Label x={1520} y={GROUND + 64} text="WIDER GAPS" size={36} font="Bebas Neue" color={S.ink2} /></g>
          <g opacity={on(f, front55, 8)}><Label x={960} y={340} text="THE FRONT USUALLY WON'T SAY" size={44} font="Bebas Neue" color={S.redD} o={bump(f, tell55, 0)} /></g>
        </g>
        <g opacity={on(f, small56, 8)}>
          <Cereal x={720} y={GROUND} s={1.4 * pop(f, small56)} h={0.9} oz="NET WT 16 OZ" />
          <g transform={`translate(${lerp(1300, 860, easeInOut(span(f, print56, weight56 + 10)))} ${GROUND - 50})`}><Magnifier x={0} y={0} s={0.9} /></g>
          <g opacity={on(f, count56, 8)}><Label x={1300} y={420} text="WEIGHT OR COUNT" size={52} font="Bebas Neue" color={S.ink} /></g>
        </g>
      </g>}
      <Vignette id="sf-why" />
    </g>
  )
}

const BEATS = ["s45:company", "s45:shrink", "s45:raising", "s45:price", "s46:gao", "s46:obvious", "s46:reasons", "s47:costs", "s47:up", "s47:cover", "s47:earn", "s47:more", "s48:second", "s48:quieter", "s49:think", "s49:see", "s49:shelf", "s50:jumps", "s50:5", "s50:printed", "s50:big", "s51:box", "s51:16", "s51:same", "s51:front", "s52:fewer", "s52:customers", "s52:tag", "s52:notice", "s53:extra", "s53:ounce", "s53:losing", "s54:hidden", "s54:shape", "s54:dip", "s54:jar", "s54:thinner", "s54:gaps", "s55:front", "s55:tell", "s56:small", "s56:print", "s56:weight", "s56:count", "s45", "s52:gao", "s52:pack", "s54:why", "s56:only", "s56:sure"]
export const SF_WHY = makePiece('sf-why', 'Shrinkflation ch3: boss at a desk between two choices (raise the price / shrink the pack), GAO report, ingredient and packaging crates with price arrows, coins to cover costs and +$ for earning more; shelf: $4.99 → $5.49 label in big numbers (SEEN) vs 18 → 16 oz box that looks the same; three shoppers walk away from the price rise, one from the shrink; same +$ per ounce; tells: jar with a dip, thinner box side view, wider chocolate gaps; NET WT 16 OZ under a magnifier', {
  mood: 'light', Component: Why, beats: BEATS,
  sfx: [['s50:jumps', 'pop', 0.2], ['s51:16', 'click', 0.2], ['s54:dip', 'whoosh', 0.2]],
})
