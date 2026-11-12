// ---------------------------------------------------------------- s49–s58: the last step — she dies at the end of the ten years, shares pass to her children;
// inherited property gets a new starting price (value on the day of death) = step-up in basis ($10 → $100 example: sell at 100, no gain);
// $1M cost → ≈ $19.7M: the ≈ $18.7M gain is never taxed as a capital gain; the estate sells just enough to repay the loan (little or no gain);
// estate tax starts above $15M per person (debts taken off first): ≈ $14.1M → none in our example; above the line up to 40%; "buy, borrow, die" (McCaffery)
import React from 'react'
import { lerp, on, P, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, Headline, Person, Prop as Prop0, Stamp, win } from '../aimoney/common'
// # catalog props draw small at their nominal size; this story shows them big (owner r37: few objects, big)
const Prop: typeof Prop0 = (p) => <Prop0 {...p} size={p.size * 1.6} />
import { At, Bar, Cert, FlipTag, Stack, Tag, TaxOffice , Accents, xcam, punch, type Acc } from './kit'

const PX = 30 // # pixels per $1M on the estate bars
// # every cue that drives a drawing (the plan gate counts them; each one also punches the frame in)
const BEATS: string[] = ['s52a:tax', 's50:say', 's54:left', 's55:taken', 's56:using', 's56:example', 's57:face', 's55:today', 's57:careful', 's49:and', 's53:capital', 's53:her#2', 's53:children', 's55:federal', 's55:starts', 's56:loan', 's56:estate', 's57:line', 's57:rich', 's49:strangest', 's50:dies', 's50:end', 's50:shares', 's50:children', 's51:law', 's51:inherited', 's51:new', 's51:value', 's51:died', 's52:stepup', 's52:basis',
    's52a:mother', 's52a:10', 's52a:100', 's52a:starting', 's52a:sell', 's52a:no', 's53:1', 's53:197', 's53:187', 's53:never', 's54:sells', 's54:loan', 's54:reset', 's54:little',
    's55:estate', 's55:15', 's55:debts', 's56:141', 's56:no', 's57:bigger', 's57:40', 's57:trusts', 's58:buy', 's58:borrow', 's58:die', 's58:professor', 's58:mccaffery', 's58:plan']
const Die: React.FC<PieceProps> = ({ f, c }) => {
  const last = c('s49:and'), strangest = c('s49:strangest'), dies = c('s50:dies'), end = c('s50:end'), shares50 = c('s50:shares'), children = c('s50:children')
  const law = c('s51:law'), inherited = c('s51:inherited'), newP = c('s51:new'), value = c('s51:value'), died = c('s51:died'), stepup = c('s52:stepup'), basis = c('s52:basis')
  const mother = c('s52a:mother'), m10 = c('s52a:10'), m100 = c('s52a:100'), starting = c('s52a:starting'), sellA = c('s52a:sell'), noGain = c('s52a:no')
  const cost1 = c('s53:1'), d197 = c('s53:197'), d187 = c('s53:187'), never = c('s53:never'), sells = c('s54:sells'), loan = c('s54:loan'), reset = c('s54:reset'), little = c('s54:little')
  const capital = c('s53:capital'), her53 = c('s53:her#2'), kids53 = c('s53:children'), fed55 = c('s55:federal'), starts55 = c('s55:starts'), loan56 = c('s56:loan'), estate56 = c('s56:estate'), line57 = c('s57:line'), rich57 = c('s57:rich'), estate = c('s55:estate'), d15 = c('s55:15'), debts = c('s55:debts'), d141 = c('s56:141'), noTax = c('s56:no')
  const bigger = c('s57:bigger'), d40 = c('s57:40'), trusts = c('s57:trusts'), buy = c('s58:buy'), borrow = c('s58:borrow'), die = c('s58:die'), prof = c('s58:professor')
  const plan58 = c('s58:plan'), mcc = c('s58:mccaffery')
  const A = win(f, c('s49'), law), B = win(f, law, cost1), Cc = win(f, cost1, estate), D = win(f, estate, buy), E = on(f, buy, 8)
  const hero: Beat[] = [[0, 'present', 'neutral'], [strangest, 'scratchHead', 'thinking'], [dies, 'holdChest', 'neutral'], [children, 'present', 'smiling'],
    [newP, 'explain', 'neutral'], [stepup, 'pointUp', 'neutral'], [mother, 'explain', 'neutral'], [noGain, 'shrug', 'smug'], [d187, 'shock', 'shocked'], [never, 'stop', 'neutral'],
    [sells, 'explain', 'neutral'], [estate, 'think', 'thinking'], [d15, 'measure', 'neutral'], [noTax, 'thumbsUp', 'smiling'], [bigger, 'explain', 'neutral'], [d40, 'countOne', 'neutral'],
    [buy, 'countOne', 'neutral'], [die, 'present', 'neutral'], [prof, 'explain', 'neutral']]
  const flip = span(f, value, value + 12)
  const stackX = lerp(1340, 1480, on(f, shares50, 20))
  const XC = xcam(c, [["s52a:tax",1460,800,1.06],["s50:say",1240,640,1.04],["s54:left",1700,760,1.06],["s55:taken",1160,640,1.05],["s56:using",1300,560,1.04],["s56:example",960,540,1],["s57:face",1480,560,1.04]])
  const XA: Acc[] = [["s55:today","calendar",1740,660,100,"s55:debts"],["s57:careful","contract",1740,800,100,"s58:buy"]]
  return (
    <g>
      <Stage id="bd" frame={f} />
      <Headline f={f} lines={[[last, 'THE LAST STEP', P.ink, 130], [children, 'TO HER CHILDREN', P.ink, 120], [newP, 'A NEW STARTING PRICE', P.goldInk, 116], [stepup, 'STEP-UP IN BASIS', P.goldInk, 124],
        [m10, 'EXAMPLE: A $10 SHARE', P.ink, 110], [d187, '≈ $18.7M GAIN', P.goldInk, 130], [never, 'NEVER TAXED AS A GAIN', P.mintInk, 110], [estate, 'ESTATE TAX?', P.ink, 136],
        [noTax, 'NONE IN OUR EXAMPLE', P.mintInk, 116], [bigger, 'BIGGER FORTUNES', P.ink, 124], [d40, 'ABOVE THE LINE: UP TO 40%', P.coralInk, 104], [buy, 'BUY · BORROW · DIE', P.goldInk, 136]]} />
      <g transform={punch(f, BEATS.map(c))}><g transform={camera(f, [...XC, [last, 1240, 600, 1.03], [law, 960, 540, 1], [mother, 1260, 620, 1.05], [cost1, 960, 540, 1]])}>
        {/* # A: a staircase with its last step lit; the hourglass runs out at the end of the ten years; her stack slides across to her children */}
        <g opacity={A}>
          <g opacity={on(f, last, 6) * (1 - on(f, dies, 8))} transform="translate(1000 980)">{[0, 1, 2, 3].map((k) => <rect key={k} x={k * 160} y={-(k + 1) * 90} width={160} height={(k + 1) * 90} fill={k === 3 ? P.gold : P.card} opacity={k === 3 ? on(f, strangest, 8) * 0.6 + 0.4 : 1} />)}</g>
          <g opacity={on(f, dies, 6)}>
            <At f={f} at={dies} x={1000} y={600}><Prop id="hourglass" x={0} y={0} size={200} f={f} /></At>
            <Tag f={f} at={end} x={1000} y={760} text="END OF YEAR 10" size={48} color={P.ink2} />
            <Stack x={stackX} y={1000} n={12} basis={1} />
            <g opacity={on(f, shares50, 8)}><Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [shares50, 'receive', 'neutral'], [children, 'hug', 'smiling']]} x={1760} y={1040} s={0.9} /></g>
          </g>
        </g>
        {/* # B: the law (gavel); the inherited stack wears a price tag that flips to its value on the day she died; the tag climbs a step;
            # the $10 share bought by a mother: worth $100 at her death → starting price $100 → sold at $100 = no gain */}
        <g opacity={B}>
          <g opacity={1 - on(f, mother, 8)}>
            <At f={f} at={law} x={900} y={460} o={1 - on(f, newP, 8)}><Prop id="gavel" x={0} y={0} size={140} f={f} /></At>
            <At f={f} at={inherited} x={1300} y={1000}><Stack x={0} y={0} n={12} basis={1} /></At>
            <g opacity={on(f, newP, 6)}><FlipTag x={1300} y={lerp(560, 480, on(f, stepup, 14))} a="PAID $1M" b="$19.7M" t={flip} /></g>
            <At f={f} at={died} x={1680} y={500} s={0.9} o={1 - on(f, stepup, 8)}><Prop id="calendar" x={0} y={0} size={140} f={f} /></At>
            <g opacity={on(f, stepup, 6)} transform="translate(1560 980)">{[0, 1, 2].map((k) => <rect key={k} x={k * 90} y={-(k + 1) * 70} width={90} height={(k + 1) * 70} fill={P.gold} opacity={0.4 + 0.2 * k} />)}</g>
            <At f={f} at={basis} x={1840} y={720}><Prop id="arrow-up" x={0} y={0} size={110} f={f} /></At>
          </g>
          <g opacity={on(f, mother, 6)}>
            <At f={f} at={mother} x={1000} y={640}><Cert x={0} y={0} s={1.1} /></At>
            <g opacity={on(f, m10, 6)}><FlipTag x={1460} y={500} a="$10" b="$100" t={span(f, m100, m100 + 12)} /></g>
            <Tag f={f} at={starting} x={1460} y={640} text="NEW START: $100" size={56} color={P.goldInk} />
            <At f={f} at={sellA} x={1460} y={800}><Prop id="cash-stack" x={0} y={0} size={130} f={f} /></At>
            <Stamp x={1460} y={960} text="NO GAIN" f={f} at={noGain} size={58} color={P.mintInk} />
          </g>
        </g>
        {/* # C: cost $1M → $19.7M: the gold gain band ($18.7M) on a bar; the tax office stays shut; the estate sells a slice to repay the loan, little or no gain */}
        <g opacity={Cc}>
          <Bar x={1160} y={1000} h={on(f, d197, 18) * 19.7 * PX} color={P.gold} value={f >= d197 ? '$19.7M' : ''} />
          <g opacity={on(f, cost1, 6)}><rect x={1070} y={1000 - 1 * PX} width={180} height={PX} rx={6} fill="#7FB2E5" /><Tag f={f} at={cost1} x={1360} y={990} text="COST $1M" size={46} color={P.skyInk} /></g>
          <g opacity={on(f, d187, 6)}><path d={`M1280 ${1000 - PX} L1300 ${1000 - PX} L1300 ${1000 - 19.7 * PX} L1280 ${1000 - 19.7 * PX}`} fill="none" stroke={P.goldInk} strokeWidth={6} /><Tag f={f} at={d187} x={1420} y={1000 - 10.4 * PX} text="GAIN" size={52} color={P.goldInk} /></g>
          <At f={f} at={never} x={1660} y={940} s={0.55}><TaxOffice x={0} y={0} shut={1} /></At>
          <g opacity={1 - on(f, sells, 8)}>
            <Tag f={f} at={capital} x={1700} y={720} text="CAPITAL GAINS TAX: $0" size={46} color={P.mintInk} />
            <At f={f} at={her53} x={1560} y={460} s={0.8}><Person f={f} who="investor" beats={[[0, 'idle', 'smiling']]} x={0} y={140} s={0.45} /></At>
            <At f={f} at={kids53} x={1780} y={500}><Prop id="family" x={0} y={0} size={150} f={f} /></At>
          </g>
          <g opacity={on(f, sells, 6)}>
            <rect x={1070} y={1000 - 19.7 * PX} width={180} height={5.6 * PX} rx={8} fill={P.coral} opacity={1 - on(f, loan + 10, 10)} transform={`translate(${on(f, loan, 16) * 540} ${on(f, loan, 16) * -60})`} />
            <At f={f} at={loan} x={1700} y={480}><Prop id="bank" x={0} y={0} size={110} f={f} /></At>
            <Tag f={f} at={loan} x={1700} y={640} text="LOAN REPAID" size={46} color={P.mintInk} />
            <At f={f} at={reset} x={1480} y={420} s={0.8}><FlipTag x={0} y={0} a="$1M" b="$19.7M" t={1} /></At>
            <Tag f={f} at={little} x={1700} y={700} text="GAIN ≈ $0" size={52} color={P.mintInk} />
          </g>
        </g>
        {/* # D: estate tax — a $15M line across the stage; her estate after the loan ($14.1M) sits under it (tick, no tax); a bigger fortune pokes above: that part 40%; trusts (chest) */}
        <g opacity={D}>
          <g opacity={on(f, d15, 6)}><path d={`M960 ${1000 - 15 * PX} L1840 ${1000 - 15 * PX}`} stroke={P.ink} strokeWidth={6} strokeDasharray="16 10" /><Tag f={f} at={d15} x={890} y={1000 - 15 * PX - 20} text="$15M LINE" size={50} /></g>
          <At f={f} at={estate} x={1720} y={940} s={0.5}><TaxOffice x={0} y={0} eat={on(f, starts55, 10) * (1 - on(f, d141, 8))} /></At>
          <Tag f={f} at={fed55} x={1720} y={1040} text="FEDERAL" size={44} color={P.ink2} />
          <g opacity={on(f, loan56, 6) * (1 - on(f, estate56, 8))}><At f={f} at={loan56} x={1480} y={600}><Prop id="contract" x={0} y={0} size={120} f={f} /></At><path d="M1420 540 L1540 660" stroke={P.coral} strokeWidth={12} strokeLinecap="round" /></g>
          <At f={f} at={estate56} x={1160} y={300} s={0.8}><Prop id="house" x={0} y={0} size={110} f={f} /></At>
          <Bar x={1160} y={1000} h={lerp(19.7, 14.1, on(f, debts, 16)) * PX} color={P.gold} label="HER ESTATE" o={on(f, estate, 6)} />
          <Tag f={f} at={d141} x={1160} y={1000 - 14.1 * PX + 70} text="$14.1M" size={56} color={P.navy0} />
          <g opacity={on(f, debts, 6) * (1 - on(f, debts + 16, 6))}><rect x={1070} y={1000 - 19.7 * PX} width={180} height={5.6 * PX} rx={8} fill={P.coral} /></g>
          <At f={f} at={noTax} x={1160} y={1000 - 15 * PX - 90}><Prop id="tick" x={0} y={0} size={90} f={f} /></At>
          <g opacity={on(f, bigger, 6)}><Bar x={1480} y={1000} h={on(f, bigger, 16) * 24 * PX} color={P.gold} label="BIGGER" />
            <rect x={1390} y={1000 - 24 * PX} width={180} height={9 * PX} rx={10} fill={P.coral} opacity={on(f, d40, 8)} /><Tag f={f} at={d40} x={1480} y={1000 - 19.5 * PX + 16} text="40%" size={60} color="#FFF" /></g>
          <g opacity={on(f, line57, 6)}><path d={`M960 ${1000 - 15 * PX} L1840 ${1000 - 15 * PX}`} stroke={P.coral} strokeWidth={8} opacity={0.6 + 0.4 * Math.sin(f / 5)} /></g>
          <At f={f} at={rich57} x={1480} y={1000 - 24 * PX - 70}><Prop id="crown" x={0} y={0} size={100} f={f} /></At>
          <At f={f} at={trusts} x={1740} y={560}><Prop id="treasure-chest" x={0} y={0} size={160} f={f} /></At>
        </g>
        {/* # E: buy (shopping bag), borrow (bank), die (hourglass); a professor's cap */}
        <g opacity={E}>
          <At f={f} at={buy} x={1000} y={620}><Prop id="shopping-bag" x={0} y={0} size={220} f={f} /></At>
          <At f={f} at={borrow} x={1340} y={620}><Prop id="bank" x={0} y={0} size={220} f={f} /></At>
          <At f={f} at={die} x={1680} y={620}><Prop id="hourglass" x={0} y={0} size={220} f={f} /></At>
          <At f={f} at={prof} x={1100} y={900}><Prop id="graduation-cap" x={0} y={0} size={150} f={f} /></At>
          <Tag f={f} at={mcc} x={1420} y={920} text="EDWARD MCCAFFERY" size={52} />
          <At f={f} at={plan58} x={1740} y={900}><Prop id="contract" x={0} y={0} size={120} f={f} /></At>
        </g>
        <Accents f={f} c={c} list={XA} Prop={Prop} />
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g></g>
      <Vignette id="bd" />
    </g>
  )
}

export const BB_DIE = makePiece('bb-die', 'Long: step-up in basis at death ($10 → $100 example); ≈ $18.7M gain never taxed as a gain; estate repays loan; $15M estate line, ≈ $14.1M → none; up to 40% above', { mood: 'light', Component: Die,
  beats: BEATS,
  sfx: [['s51:value', 'swish', 0.4], ['s52:stepup', 'chime', 0.5], ['s52a:no', 'ding', 0.4], ['s53:187', 'impact', 0.5], ['s56:no', 'ding', 0.4], ['s58:die', 'thud', 0.4]] })
