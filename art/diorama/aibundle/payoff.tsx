// ---------------------------------------------------------------- s91–s99: the payoff.
// A) Back to the three steps, as three circles: a laptop with Word (≈ $0 a copy), an answer bubble dropping a coin,
//    a field of data centers (billions).
// B) Way one: a few people at the add-on, a small pile. Way two: everyone in the bundle pays, sleepers included.
// C) The hidden plan: the crowd stays on the higher-price side because the Classic door is tucked behind a wall.
// D) The shop shelf: the big AI plan in front, the plan without AI behind it; a magnifier finds it and it slides
//    forward — the cheapest plan is not always the one shown first.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { DataCenter, Headline, Label, Prop, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Bubble, Coin, Spark, Spot, SubBox, Tag } from './kit'
import { CoinColumn, Desk } from './kit2'

const GROUND = 930
const LOOKS = ['investorF', 'buyer', 'worker', 'owner', 'investor', 'hero']

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const push = c('s91:push'), already = c('s91:already')
  const think = c('s92:think'), three = c('s92:three')
  const old = c('s93:old'), nothing = c('s93:nothing'), ai93 = c('s93:ai'), every93 = c('s93:every'), answering = c('s93:answering'), billions = c('s93:billions'), centers = c('s93:centers')
  const selling = c('s94:selling'), only94 = c('s94:only'), collects94 = c('s94:collects'), choose = c('s94:choose')
  const putting = c('s95:putting'), spreads = c('s95:spreads'), every95 = c('s95:every'), including = c('s95:including'), never95 = c('s95:never')
  const when96 = c('s96:when'), hard = c('s96:hard'), find96 = c('s96:find'), stay = c('s96:stay'), higher = c('s96:higher')
  const next97 = c('s97:next'), raises = c('s97:raises'), features = c('s97:features'), checking = c('s97:checking'), still = c('s97:still'), exists = c('s97:exists')
  const cheapest = c('s98:cheapest'), show = c('s98:show'), first = c('s98:first')
  const product91 = c('s91:product'), customer93 = c('s93:customer'), always98 = c('s98:always'), s99 = c('s99'), works99 = c('s99:works')

  const A0 = win(f, push - 20, three), A = win(f, three - 2, selling), B = win(f, selling - 2, when96), Cc = win(f, when96 - 2, next97), D = on(f, next97 - 2, 8)
  const circle = (k: number) => 400 + k * 560
  return (
    <g>
      <Stage id="ab-payoff" frame={f} />
      <Spot f={f} at={nothing} x={400} y={560} rx={230} ry={230} />
      <Spot f={f} at={every93} x={960} y={560} rx={230} ry={230} />
      <Spot f={f} at={billions} x={1520} y={560} rx={230} ry={230} />
      <Spot f={f} at={exists} x={1180} y={600} rx={220} ry={260} />
      <Spot f={f} at={always98} x={760} y={520} rx={240} ry={260} />
      <Headline f={f} lines={[[push, 'SO WHY PUSH AI INTO IT?', P.ink, 110], [think, 'THE THREE STEPS', P.ink, 120],
        [selling, 'AN EXTRA: ONLY THOSE WHO CHOOSE IT PAY', P.ink, 92], [putting, 'A BUNDLE: EVERY SUBSCRIBER PAYS', P.coralInk, 96],
        [when96, 'WHEN THE NO-AI PLAN IS HARD TO FIND…', P.ink, 92], [stay, '…MORE PEOPLE STAY ON THE HIGHER PRICE', P.coralInk, 88],
        [next97, 'NEXT TIME A PRICE RISES FOR AI…', P.ink, 96], [checking, 'CHECK FOR A PLAN WITHOUT IT', P.mintInk, 104], [cheapest, 'THE CHEAPEST PLAN IS NOT ALWAYS SHOWN FIRST', P.goldInk, 84]]} />

      {/* # A0) the question once more: the spark pushed into the box, the wallet already paying */}
      {A0 > 0 && <g opacity={A0}>
        <Ground y={GROUND} />
        <SubBox x={960} y={560} s={(1 + 0.06 * on(f, product91, 6) * (1 - on(f, product91 + 14, 8)))} />
        {(() => { const t = on(f, push, 16); return <Spark x={lerp(1600, 1190, t)} y={lerp(260, 360, t) - Math.sin(t * Math.PI) * 80} s={0.95} f={f} glow={1} /> })()}
        <g opacity={on(f, already, 8)}><Tag x={1560} y={720} text="$99.99" s={1.1} /></g>
      </g>}

      {/* # A) the three steps as three circles */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, three + k * 4, 8)} transform={`translate(${circle(k)} 560)`}>
          <circle r={240} fill="#FFFFFF" stroke="#D8CDB8" strokeWidth={5} /><circle cx={-170} cy={-170} r={50} fill={P.navy3} /><Label x={-170} y={-152} text={String(k + 1)} size={56} font="Bebas Neue" color="#FFFFFF" /></g>)}
        <g opacity={on(f, old, 8)}><Desk x={circle(0)} y={520} s={0.5} screen="w" /><g opacity={on(f, customer93, 8)}><Desk x={circle(0) - 80} y={690} s={0.24} screen="w" /><Desk x={circle(0) + 80} y={690} s={0.24} screen="w" /></g><Coin x={circle(0) + 150} y={470} r={40} t="≈0" o={on(f, nothing, 8)} /></g>
        <g opacity={on(f, ai93, 8)}><Spark x={circle(1) - 90} y={520} s={0.75} f={f} glow={1} /><Bubble x={circle(1) + 60} y={460} s={0.6} lines={3} />
          {f >= every93 && [0, 1].map((k) => { const t0 = every93 + k * 14 + Math.floor((f - every93) / 28) * 28, fl = fly(f, t0, [circle(1) + 60, 520], [circle(1) + 60, 700], 14, -10)
            return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={30} o={fl.o} /> : null })}</g>
        <g opacity={on(f, answering, 8)}>{[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, answering + k * 4, 8)}><DataCenter x={circle(2) - 90 + (k % 2) * 180} y={520 + Math.floor(k / 2) * 170} s={0.26} f={f + k * 5} /></g>)}
          <g opacity={on(f, billions, 8)}><Label x={circle(2)} y={860} text="BILLIONS" size={52} font="Bebas Neue" color={P.goldInk} /></g></g>
        <g opacity={on(f, nothing, 8)}><Label x={circle(0)} y={860} text="≈ $0 A COPY" size={52} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, every93, 8)}><Label x={circle(1)} y={860} text="COST PER ANSWER" size={52} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # B) way one vs way two */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, selling, 8) * (1 - on(f, putting, 10) * 0.6)}>
          <rect x={210} y={360} width={300} height={240} rx={30} fill="#FFFFFF" stroke="#8A5BD6" strokeWidth={6} strokeDasharray="16 10" />
          <Spark x={360} y={460} s={0.9} f={f} glow={1} />
          {[0, 1].map((k) => <g key={k} opacity={on(f, choose + k * 4, 8)}><Mini look={LOOKS[k]} x={290 + k * 140} y={GROUND} scale={1.2} frame={f} seed={k} mood="happy" /></g>)}
          <g opacity={on(f, collects94, 8)}><CoinColumn x={620} y={GROUND - 20} n={3} w={110} /></g>
        </g>
        <g opacity={on(f, putting, 8)}>
          <SubBox x={1300} y={430} s={0.7} />
          <Spark x={1445} y={305} s={0.6} f={f} glow={1} />
          {Array.from({ length: 6 }, (_, k) => { const sleeper = k % 2 === 1
            return <g key={k} opacity={on(f, every95 + k * 2, 8)}>
              <Mini look={LOOKS[k]} x={950 + k * 140} y={GROUND} scale={1.1} frame={f} seed={k + 60} mood={sleeper && f >= never95 ? 'sad' : 'neutral'} />
              {(() => { const t0 = spreads + k * 5 + Math.floor((f - spreads) / 40) * 40, fl = fly(f, t0, [950 + k * 140, GROUND - 260], [1300, 600], 18, 80); return f >= spreads && fl.t < 1 ? <Coin x={fl.x} y={fl.y} r={24} o={fl.o} /> : null })()}
              {sleeper && <g opacity={on(f, including + k, 8)}><Label x={950 + k * 140} y={GROUND - 270} text="z z" size={40} font="Bebas Neue" color={P.ink2} /></g>}
            </g> })}
          <g opacity={on(f, never95, 8)}><Label x={1300} y={GROUND + 70} text="EVEN THOSE WHO NEVER USE IT" size={46} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # C) the hidden plan keeps people on the higher price */}
      {Cc > 0 && <g opacity={Cc}>
        <Ground y={GROUND} />
        <SubBox x={1260} y={520} s={0.85} title="$99.99 PLAN" />
        {/* # the Classic door, tucked behind a wall at the far left */}
        <rect x={150} y={420} width={170} height={300} rx={14} fill={P.mint} stroke="#2E9E6E" strokeWidth={5} opacity={0.9} />
        <g opacity={on(f, hard, 8)}><rect x={100} y={360} width={320} height={GROUND - 360} rx={10} fill="#D9C7A6" stroke="#BFAE8E" strokeWidth={5} transform={`translate(${lerp(-340, 0, on(f, hard, 16))} 0)`} /></g>
        <g opacity={on(f, find96, 8)}><Label x={260} y={GROUND + 70} text="CLASSIC? HIDDEN" size={48} font="Bebas Neue" color={P.mintInk} /></g>
        {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, when96 + k * 3, 8)}><Mini look={LOOKS[k]} x={lerp(700 + k * 120, 900 + k * 120, on(f, stay, 30))} y={GROUND} scale={1.1} frame={f} seed={k + 70} mood={f >= higher ? 'sad' : 'neutral'} /></g>)}
      </g>}

      {/* # D) the shelf: the plan shown first, the cheaper plan behind it */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <rect x={420} y={760} width={1080} height={30} rx={8} fill="#B9874E" />
        {/* # the plan without AI, behind; slides forward when found */}
        <g opacity={on(f, features, 8)} transform={`translate(${lerp(1080, 1300, on(f, exists, 20))} ${lerp(520, 560, on(f, exists, 20))}) scale(${lerp(0.55, 0.7, on(f, exists, 20))})`}>
          <SubBox x={0} y={0} s={1} title="NO AI" color="#2E9E6E" />
          <Tag x={0} y={360} text="LOWER" s={1.0} r={0} color={P.mint} sub="PRICE" />
        </g>
        <g transform={`translate(${lerp(960, 760, on(f, exists, 20))} 470)`}>
          <SubBox x={0} y={0} s={0.85} />
          <Spark x={196} y={-170} s={0.75} f={f} glow={1} />
          <g opacity={on(f, raises, 8)}><Tag x={0} y={340} text="$99.99" s={0.9} r={0} sticker="+AI" stickerO={on(f, features, 10)} /></g>
        </g>
        <g opacity={on(f, checking, 8)} transform={`translate(${lerp(1750, 1600, on(f, still, 20))} ${lerp(520, 560, on(f, still, 20))})`}><Prop id="magnifier" x={0} y={0} size={220} f={f} /></g>
        <g opacity={on(f, show, 8)}><Label x={760} y={GROUND + 70} text="SHOWN FIRST" size={52} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, first, 8)}><Label x={1300} y={GROUND + 70} text="CHEAPER" size={52} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, s99, 8)} transform={`translate(1300 330) scale(${pop(f, s99)})`}><circle r={56} fill={P.mint} /><path d="M-26 0 L-6 22 L28 -22" stroke="#FFFFFF" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
        <g opacity={on(f, works99, 8)}><Coin x={1560} y={380} r={34} /></g>
      </g>}
      <Vignette id="ab-payoff" />
    </g>
  )
}

const BEATS = ["s91:push", "s91:already", "s92:think", "s92:three", "s93:old", "s93:nothing", "s93:ai", "s93:every", "s93:answering", "s93:billions", "s93:centers", "s94:selling", "s94:collects", "s94:choose", "s95:putting", "s95:spreads", "s95:every", "s95:including", "s95:never", "s96:when", "s96:hard", "s96:find", "s96:stay", "s96:higher", "s97:next", "s97:raises", "s97:features", "s97:checking", "s97:still", "s97:exists", "s98:cheapest", "s98:show", "s98:first", "s91:product", "s93:customer", "s98:always", "s99", "s99:works"]
export const AB_PAYOFF = makePiece('ab-payoff', 'AI bundle payoff: spark pushed into the $99.99 box; three circles (laptop with Word ≈ $0 a copy, answer bubble dropping coins = cost per answer, data centers = billions); way one: two people at the add-on, small pile; way two: six people pay into the bundle incl. sleepers (z z); the Classic door hidden behind a wall while the crowd stays at the $99.99 plan; shop shelf: the AI plan shown first, the no-AI plan behind it found by a magnifier and slid forward (cheaper)', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s92:three', 'pop', 0.2], ['s93:billions', 'thud', 0.2], ['s95:spreads', 'coin', 0.2], ['s96:hard', 'swish', 0.2], ['s97:exists', 'chime', 0.25]] })
