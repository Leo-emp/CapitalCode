// ---------------------------------------------------------------- s77–s90: what Nina really pays.
// A) Nina at her desk: her tag goes $69.99 → $99.99; the spark she never uses sleeps (she shakes her head); year by
//    year her extra stacks up: year 1 $30, year 3 $90, year 5 $150.
// B) The Family card: six people pay the same +$30; only the owner gets the spark; the other five dim (1 of 6).
// C) The heavy user: answers burst from his laptop; $30 vs the $240 extra (with a smaller allowance gauge);
//    a see-saw — heavy users' good deal against everyone else's quiet cost; five identical plans, five different
//    amounts of value.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Bubble, Coin, Spark, Spot, SubBox, Tag, XMark } from './kit'
import { CoinColumn, Desk, PlanCard } from './kit2'

const GROUND = 930

const Nina: React.FC<PieceProps> = ({ f, c }) => {
  const states77 = c('s77:states'), nina77 = c('s77:nina'), personal77 = c('s77:personal')
  const before = c('s78:before'), d69 = c('s78:69'), now = c('s78:now'), d99 = c('s78:99#2')
  const d30a = c('s79:30'), every79 = c('s79:every'), feature = c('s79:feature'), not79 = c('s79:not'), use79 = c('s79:use')
  const one80 = c('s80:one'), d30b = c('s80:30'), three = c('s81:three'), d90 = c('s81:90'), five82 = c('s82:five'), same82 = c('s82:same'), d150 = c('s82:150')
  const nina83 = c('s83:nina'), family83 = c('s83:family'), shared = c('s83:shared'), five83 = c('s83:five')
  const fam83 = c('s83:family'), p78c = c('s78:99#3'), every79b = c('s79:every'), now83 = c('s83:now'), family86 = c('s86:family'), extra88 = c('s88:extra'), even88 = c('s88:even'), five83b = c('s83:five'), family84 = c('s84:family'), each84 = c('s84:each'), ms85 = c('s85:microsoft'), person85 = c('s85:person'), paid78 = c('s78:paid'), year78 = c('s78:year')
  const pays84 = c('s84:pays'), d30c = c('s84:30')
  const only85 = c('s85:only'), owns = c('s85:owns'), copilot85 = c('s85:copilot')
  const nina83b = c('s83:nina'), ai86 = c('s86:ai'), only86 = c('s86:only'), six86 = c('s86:six')
  const flip = c('s87:flip'), someone = c('s87:someone'), uses87 = c('s87:uses'), every87 = c('s87:every'), day = c('s87:day')
  const d30d = c('s88:30'), cheap = c('s88:cheap'), d240 = c('s88:240'), smaller = c('s88:smaller'), allowance = c('s88:allowance')
  const bundle = c('s89:bundle'), heavy = c('s89:heavy'), quiet = c('s89:quiet'), everyone89 = c('s89:everyone')
  const everyone90 = c('s90:everyone'), plan90 = c('s90:plan'), not90 = c('s90:not'), value = c('s90:value')

  const A = win(f, nina77 - 20, fam83), B = win(f, fam83 - 2, flip), C1 = win(f, flip - 2, bundle), C2 = win(f, bundle - 2, everyone90), C3 = on(f, everyone90 - 2, 8)
  const ninaA: Beat[] = [[0, 'type', 'neutral', 'idle', 22], [d99, 'shock', 'shocked'], [not79, 'crossNoA', 'worried', 'crossNoB', 14], [one80, 'idle', 'thinking'], [d150, 'facepalm', 'worried'], [now83, 'idle', 'thinking'], [nina83b, 'scratchHead', 'thinking']]
  const user: Beat[] = [[0, 'type', 'smiling', 'idle', 10], [cheap, 'thumbsUp', 'smiling']]
  // # year-by-year columns: column k shows after its year is reached
  const yearAt = [d30b, three - 6, d90, five82 - 6, d150]
  return (
    <g>
      <Stage id="ab-nina" frame={f} />
      <Spot f={f} at={d99} x={980} y={360} rx={200} ry={120} />
      <Spot f={f} at={d150} x={1700} y={640} rx={160} ry={260} />
      <Spot f={f} at={owns} x={760} y={560} rx={140} ry={200} />
      <Spot f={f} at={d240} x={1500} y={640} rx={200} ry={260} />
      <Headline f={f} lines={[[nina77, "NINA'S PERSONAL PLAN (US)", P.ink, 104], [d30a, '+$30 A YEAR FOR AI SHE DOES NOT USE', P.coralInk, 90], [one80, 'YEAR BY YEAR', P.ink, 110], [d150, '5 YEARS: $150 (IF THE PRICE STAYS)', P.coralInk, 92],
        [family83, 'THE FAMILY PLAN: SIX PEOPLE', P.ink, 104], [only85, 'COPILOT: OWNER ONLY', P.ink, 110], [only86, 'ONLY 1 OF THE 6 CAN USE IT', P.coralInk, 100],
        [someone, 'A HEAVY USER', P.ink, 110], [d240, '$30 VS THE $240 EXTRA', P.mintInk, 104], [bundle, 'GOOD DEAL VS QUIET COST', P.ink, 104], [everyone90, 'SAME PLAN, DIFFERENT VALUE', P.ink, 104]]} />

      {/* # A) Nina's own numbers */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Desk x={600} y={GROUND - 214} s={0.95} screen="letter" fill={1} />
        <g transform={`translate(0 ${lerp(30, 0, on(f, states77, 12))})`} opacity={on(f, states77 - 8, 10)}><Person f={f} who="investorF" beats={ninaA} x={270} y={GROUND} s={1.0} /></g>
        <g opacity={on(f, personal77, 8) * (1 - on(f, one80, 10))}><Tag x={980} y={380} text={f >= d99 ? '$99.99' : '$69.99'} s={1.2 * (f >= now ? 1.05 : 1) * (1 + 0.1 * on(f, d69, 6) * (1 - on(f, d69 + 14, 8))) * (1 + 0.08 * on(f, p78c, 6) * (1 - on(f, p78c + 14, 8)))} color={f >= d99 ? P.gold : '#F3E3B5'} sticker="+$30" stickerO={on(f, d30a, 10)} /></g>
        {f >= paid78 && (() => { const fl = fly(f, paid78, [330, 640], [940, 420], 18, 100); return fl.t < 1 ? <Coin x={fl.x} y={fl.y} r={30} o={fl.o} /> : null })()}
        <g opacity={on(f, year78, 8) * (1 - on(f, d30a, 8))}><Label x={980} y={560} text="EVERY YEAR" size={48} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, every79b, 8) * (1 - on(f, one80, 8))}><path d="M1040 600 A60 60 0 1 1 1039 600" fill="none" stroke={P.coralInk} strokeWidth={8} /><path d="M1090 600 l14 -26 l14 26 Z" fill={P.coralInk} /></g>
        {/* # the spark she never uses: asleep in the corner of the laptop */}
        <g opacity={on(f, feature, 8) * (1 - on(f, one80, 10))}><Spark x={1360} y={400} s={0.9} f={0} glow={0.2} eyes={false} />
          <Label x={1440} y={330} text="z z" size={52} font="Bebas Neue" color={P.ink2} /><XMark x={1360} y={400} o={on(f, use79, 8)} size={56} /></g>
        {/* # year by year */}
        {[0, 1, 2, 3, 4].map((k) => { const at = yearAt[k]
          return <g key={k} opacity={on(f, at, 8)}>
            <CoinColumn x={1020 + k * 170} y={GROUND - 20} n={Math.round(on(f, at, 16) * (k + 1) * 3)} w={110} />
            <Label x={1020 + k * 170} y={GROUND + 60} text={`YEAR ${k + 1}`} size={40} font="Bebas Neue" color={P.ink2} />
            {(k === 0 || k === 2 || k === 4) && <Label x={1020 + k * 170} y={GROUND - 60 - (k + 1) * 66} text={['$30', '', '$90', '', '$150'][k]} size={56} font="Bebas Neue" color={P.coralInk} />}
          </g> })}
        <g opacity={on(f, same82, 8)}><Label x={1360} y={300} text="IF THE PRICE STAYS THE SAME" size={44} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      {/* # B) the Family plan */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <PlanCard f={f} x={960} y={560} s={(1 + 0.04 * on(f, family86, 6) * (1 - on(f, family86 + 14, 8))) * (1 + 0.05 * on(f, fam83, 6) * (1 - on(f, fam83 + 14, 8))) * (1 + 0.05 * on(f, family84, 6) * (1 - on(f, family84 + 14, 8)))} title="FAMILY" people={6} shown={on(f, shared, 20)} price="+$30" priceO={on(f, d30c, 8)} color={P.teal2} sub="A YEAR, SAME AS ALWAYS"
          dim={f >= only86 ? [0, 1, 1, 1, 1, 1] : []} />
        {[0, 1, 2, 3, 4, 5].map((k) => <g key={k} opacity={on(f, each84 + k * 2, 6) * (1 - on(f, only85, 8))}><Coin x={760 + k * 80} y={205} r={24} t="" /></g>)}
        <g opacity={on(f, five83b, 8) * (1 - on(f, family84, 8))}><Label x={1100} y={215} text="+ 5 OTHERS" size={48} font="Bebas Neue" color={P.ink2} /></g>
                <g opacity={on(f, ms85, 8) * (1 - on(f, owns, 8))}><circle cx={760} cy={480} r={70} fill="none" stroke={P.gold} strokeWidth={6} /></g>
        <Spot f={f} at={person85} x={760} y={470} rx={110} ry={160} />
        <g opacity={on(f, copilot85, 8)}><Spark x={600} y={430} s={0.7} f={f} glow={1} /></g>
        <g opacity={on(f, owns, 8)}><Label x={600} y={340} text="OWNER" size={44} font="Bebas Neue" color={P.goldInk} /></g>
        {[1, 2, 3, 4, 5].map((k) => <g key={k}><XMark x={760 + k * 80} y={420} o={on(f, six86 + k * 2, 8)} size={22} /></g>)}
        <g opacity={on(f, ai86, 8)}><Label x={1150} y={760} text="ALL PAY" size={52} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
      </g>}

      {/* # C1) the heavy user; $30 vs $240 */}
      {C1 > 0 && <g opacity={C1}>
        <Ground y={GROUND} />
        <Desk x={600} y={GROUND - 214} s={0.95} screen="slides" fill={1} glow={on(f, uses87, 10)} />
        <Person f={f} who="worker" beats={user} x={270} y={GROUND} s={1.0} />
        {f >= every87 && [0, 1, 2].map((k) => { const t = ((f - every87 + k * 12) % 36) / 36
          return <g key={k} opacity={Math.sin(t * Math.PI) * (1 - on(f, d240, 10))}><Bubble x={600 + (k - 1) * 120} y={lerp(420, 260, t)} s={0.45} lines={2} w={240} /></g> })}
        <g opacity={on(f, d30d, 8)}><CoinColumn x={1150} y={GROUND - 20} n={Math.round(on(f, d30d, 12) * 2)} w={140} /><Label x={1150} y={GROUND + 60} text="$30 / YEAR" size={48} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, d240, 8)}><CoinColumn x={1500} y={GROUND - 20} n={Math.round(on(f, d240, 20) * 16 + on(f, extra88, 10))} w={140} color={P.coral} /><Label x={1500} y={GROUND + 60} text="$240 / YEAR EXTRA" size={48} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, even88, 8)} transform="translate(1150 520)">
          <rect x={-40} y={-90} width={80} height={180} rx={18} fill="#FFFFFF" stroke="#8A5BD6" strokeWidth={5} />
          <rect x={-28} y={78 - 70 * on(f, allowance, 16)} width={56} height={70 * on(f, allowance, 16)} rx={10} fill="#8A5BD6" opacity={0.7} />
          <Label x={0} y={-110} text="SMALLER ALLOWANCE" size={36} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      {/* # C2) the see-saw: heavy users vs everyone else */}
      {C2 > 0 && <g opacity={C2}>
        <Ground y={GROUND} />
        {(() => { const tilt = 9 * on(f, quiet, 20) + 3 * on(f, everyone89, 16) - 3 * on(f, heavy, 16) * (1 - on(f, quiet, 10))
          return <g>
            <path d="M920 900 L1000 900 L960 780 Z" fill={P.navy3} />
            <g transform={`translate(960 780) rotate(${tilt})`}>
              <rect x={-620} y={-16} width={1240} height={32} rx={12} fill="#B9874E" />
              <g opacity={on(f, heavy, 8)}><Mini look="worker" x={-480} y={-16} scale={1.2} frame={f} seed={2} mood="happy" /><Spark x={-330} y={-120} s={0.6} f={f} glow={1} /></g>
              {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, quiet + k * 3, 8)}><Mini look={['investorF', 'buyer', 'owner', 'investor'][k]} x={260 + k * 100} y={-16} scale={1.0} frame={f} seed={k + 50} /></g>)}
            </g>
            <g opacity={on(f, c('s89:good'), 8)}><Label x={480} y={GROUND + 70} text="GOOD DEAL" size={56} font="Bebas Neue" color={P.mintInk} /></g>
            <g opacity={on(f, quiet, 8)}><Label x={1440} y={GROUND + 70} text="QUIET COST" size={56} font="Bebas Neue" color={P.coralInk} /></g>
          </g> })()}
      </g>}

      {/* # C3) same plan, different value */}
      {C3 > 0 && <g opacity={C3}>
        <Ground y={GROUND} />
        {[0, 1, 2, 3, 4].map((k) => { const v = [0.08, 0.15, 1, 0.1, 0.4][k]
          return <g key={k} opacity={on(f, plan90 - 6 + k * 3, 8)}>
            <SubBox x={300 + k * 330} y={720} s={0.38} />
            <g opacity={on(f, value, 8)}><rect x={300 + k * 330 - 50} y={625 - 300 * v * on(f, value, 20)} width={100} height={300 * v * on(f, value, 20)} rx={12} fill={k === 2 ? P.mint : P.gold} /></g>
          </g> })}
        <g opacity={on(f, value, 8)}><Label x={960} y={GROUND + 70} text="VALUE FROM THE AI" size={52} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, not90, 8) * (1 - on(f, value, 8))}><Label x={960} y={GROUND + 70} text="SAME PRICE" size={52} font="Bebas Neue" color={P.ink2} /></g>
      </g>}
      <Vignette id="ab-nina" />
    </g>
  )
}

const BEATS = ["s77:states", "s77:nina", "s77:personal", "s78:before", "s78:69", "s78:now", "s78:99#2", "s79:30", "s79:feature", "s79:not", "s79:use", "s80:one", "s80:30", "s81:three", "s81:90", "s82:five", "s82:same", "s82:150", "s83:shared", "s83:family", "s78:99#3", "s79:every", "s83:now", "s86:family", "s88:extra", "s88:even", "s83:five", "s84:family", "s84:each", "s85:microsoft", "s85:person", "s78:paid", "s78:year", "s84:30", "s85:only", "s85:owns", "s85:copilot", "s83:nina", "s86:ai", "s86:only", "s86:six", "s87:flip", "s87:someone", "s87:uses", "s87:every", "s87:day", "s88:30", "s88:cheap", "s88:240", "s88:smaller", "s88:allowance", "s89:bundle", "s89:heavy", "s89:quiet", "s89:everyone", "s90:everyone", "s90:plan", "s90:not", "s90:value", "s89:good"]
export const AB_NINA = makePiece('ab-nina', 'AI bundle ch5: Nina at her desk, tag $69.99 → $99.99 (+$30), her sleeping spark crossed (she shakes her head); five year columns of coins ($30, $90, $150); Family card six people +$30, owner gets the spark, five dim with crosses; heavy user typing, answer bubbles, $30 coin column vs $240 coral column, smaller allowance gauge; see-saw good deal vs quiet cost; five identical plans with different value bars', {
  mood: 'light', Component: Nina, beats: BEATS,
  sfx: [['s78:99#2', 'pop', 0.2], ['s82:150', 'thud', 0.25], ['s86:six', 'softpop', 0.2], ['s88:240', 'cash', 0.2], ['s89:heavy', 'swish', 0.2], ['s90:value', 'pop', 0.2]] })
