// ---------------------------------------------------------------- s23–s34: step two — 1 percent of everything.
// A) A dashed ring circles the whole jar ("1% of everything you have") while the jar keeps rising. One saver drops $500 a
//    month in; "+7% a year" sprouts over the jar; "not a promise": the hero says no to a crystal ball. The two ways it
//    grows: a coin falling in (new money) and coins budding inside (growth on the money already there).
// B) Four jars on a line — year 1, 10, 20, 40 — each arriving on its year, each with its balance and, beside it, the coral
//    pile the 1% scoop took that year: $60, $800, $2,300, $9,600.
// C) Four identical 1% scoops (the fee never changed); the year-40 jar and its big coral pile light up (1% of a big pile);
//    a jar and its fee pile grow together, year after year.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { SaverJar, Scoop, Stack, YearFlag, Spot } from './kit'

const GROUND = 920
// # the four years: x, jar height, fill, the balance text, the fee text, the fee pile height (coins)
const YEARS: [number, number, number, string, string, number][] = [[270, 280, 0.25, '$6,200', '$60', 1], [710, 360, 0.5, '$82,000', '$800', 3], [1170, 450, 0.7, '$228,000', '$2,300', 6], [1660, 590, 0.92, '≈ $1 MILLION', '$9,600', 14]]

const Step2: React.FC<PieceProps> = ({ f, c }) => {
  const d1 = c('s23:1'), everything = c('s23:everything'), keeps = c('s23:keeps'), growing = c('s23:growing')
  const follow = c('s24:follow'), saver = c('s24:saver'), d500 = c('s24:500'), month24 = c('s24:month')
  const simple = c('s25:simple'), seven = c('s25:7'), before = c('s25:before')
  const example26 = c('s26:example'), not26 = c('s26:not'), promise = c('s26:promise'), markets = c('s26:markets')
  const two = c('s27:two'), newm = c('s27:new'), added = c('s27:added'), growth27 = c('s27:growth'), already = c('s27:already')
  const y1 = c('s28:year'), d6200 = c('s28:6200'), d60 = c('s28:60'), put28 = c('s28:put')
  const y10 = c('s29:year'), d82 = c('s29:82000'), d800 = c('s29:800')
  const y20 = c('s30:year'), d228 = c('s30:228000'), d2300 = c('s30:2300')
  const y40 = c('s31:year'), million = c('s31:million'), d9600 = c('s31:9600')
  const changed = c('s32:changed'), always = c('s32:always')
  const big = c('s33:big'), pile33 = c('s33:pile'), number = c('s33:number')
  const pile34 = c('s34:pile'), grows34 = c('s34:grows'), fee34 = c('s34:fee'), grows34b = c('s34:grows#2')
  const AB = y1 - 4, BC = changed - 4
  const A = win(f, d1, AB), B = win(f, AB, BC), C = on(f, BC, 8)
  const yearAt = [y1, y10, y20, y40], balAt = [d6200, d82, d228, million], feeAt = [d60, d800, d2300, d9600]
  return (
    <g>
      <Stage id="fe-step2" frame={f} />
      <Spot f={f} at={c("s28:grew")} x={860} y={700} rx={260} ry={260} />
      <Spot f={f} at={c("s31:single")} x={1830} y={750} rx={120} ry={220} />
      <Spot f={f} at={c("s33:1")} x={760} y={620} rx={260} ry={320} />
      <Spot f={f} at={c("s34")} x={760} y={620} rx={260} ry={320} />
      <Headline f={f} lines={[[everything, '1% OF EVERYTHING YOU HAVE', P.coralInk, 100], [follow, '', P.ink], [d500, '$500 EVERY MONTH', P.ink, 104], [seven, '+7% A YEAR', P.mintInk, 100], [two, 'IT GROWS 2 WAYS', P.ink, 104], [y1, '', P.ink], [changed, 'THE FEE NEVER CHANGED', P.ink, 104], [always, 'ALWAYS 1%', P.coralInk, 116], [big, '1% OF A BIG PILE', P.coralInk, 110], [number, '1% OF A BIG PILE = A BIG NUMBER', P.coralInk, 96]]} />

      {/* # A) 1% of everything; one saver, 500 a month, 7% a year (an example, not a promise), two ways of growing */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {(() => { const h = lerp(320, 480, span(f, d1, AB)); return <g>
          <SaverJar x={860} y={GROUND} w={340} h={h} fill={0.75} label="EVERYTHING YOU HAVE" glow={on(f, growing, 10)} />
          <g opacity={on(f, everything, 8) * (1 - on(f, follow, 8))}><rect x={860 - 210} y={GROUND - h - 60} width={420} height={h + 80} rx={50} fill="none" stroke={P.coral} strokeWidth={8} strokeDasharray="20 12" /></g>
        </g> })()}
        <g opacity={on(f, saver, 10)}><Person f={f} who="buyer" beats={[[0, 'idle', 'smiling'], [d500, 'reachDown', 'smiling', 'hold', 14], [two, 'present', 'smiling'], [growth27, 'point', 'smiling']]} x={420} y={GROUND} s={0.8} /></g>
        {f >= d500 && f < two && (() => { const ph = ((f - d500) % 12) / 12; return <Coin x={lerp(560, 860, ph)} y={lerp(520, GROUND - 480, ph) - Math.sin(ph * Math.PI) * 50} s={0.6} /> })()}
        {/* # +7% a year: green arrows sprouting over the jar */}
        <g opacity={on(f, seven, 8) * (1 - on(f, example26 + 30, 8))}>{[-80, 0, 80].map((dx, k) => <path key={k} d={`M${860 + dx} ${GROUND - 520} l0 -${50 + 20 * Math.sin(f / 8 + k)} m-18 18 l18 -18 l18 18`} fill="none" stroke={P.mint} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />)}</g>
        {/* # not a promise: a crystal ball, the hero says no */}
        <g opacity={on(f, example26, 8) * (1 - on(f, two, 8))}>
          <g transform="translate(1340 680)"><circle r={90} fill="#B9D8F2" opacity={0.8} /><circle cx={-30} cy={-30} r={24} fill="#FFFFFF" opacity={0.7} /><path d="M-70 90 L70 90 L50 130 L-50 130 Z" fill="#8E6232" /></g>
          <Person f={f} who="investorF" beats={[[0, 'point', 'neutral'], [not26, 'crossNoA', 'neutral', 'crossNoB', 10], [markets + 10, 'idle', 'neutral']]} x={1640} y={GROUND} s={0.78} />
        </g>
        {/* # the two ways: a coin falling in (new money), coins budding inside (growth on what is there) */}
        <g opacity={on(f, two, 8)}>
          {f >= newm && (() => { const ph = ((f - newm) % 14) / 14; return <Coin x={860} y={lerp(GROUND - 640, GROUND - 480, ph)} s={0.8} /> })()}
          <g opacity={on(f, added, 8)}><Label x={1180} y={GROUND - 560} text="1 · NEW MONEY" size={52} font="Bebas Neue" color={P.ink} /></g>
          {f >= growth27 && [0, 1, 2].map((k) => { const ph = ((f - growth27) / 20 + k / 3) % 1; return <circle key={k} cx={800 + k * 60} cy={GROUND - 200 - ph * 160} r={14 + 10 * ph} fill={P.mint} opacity={1 - ph} /> })}
          <g opacity={on(f, already, 8)}><Label x={1180} y={GROUND - 260} text="2 · GROWTH ON WHAT'S THERE" size={52} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}

      {/* # B) years 1, 10, 20, 40: the jar, its balance, and the pile the 1% scoop took that year */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {YEARS.map(([x, h, fill, bal, fee, n], k) => { const m = k === 0 ? 1 - on(f, y10, 18) : 0, sc = lerp(1, 1.7, m), cx = lerp(x - 40, 860, m); return <g key={k} opacity={on(f, yearAt[k], 8)} transform={`translate(${cx} ${GROUND + lerp(30, 0, on(f, yearAt[k], 12))}) scale(${sc}) translate(${-(x - 40)} ${-GROUND})`}>
          <SaverJar x={x - 40} y={GROUND} w={lerp(200, 260, k / 3)} h={h} fill={fill} />
          <YearFlag x={x - 120 - lerp(0, 40, k / 3)} y={GROUND - h - 50} text={['YEAR 1', 'YEAR 10', 'YEAR 20', 'YEAR 40'][k]} s={0.9} />
          <g opacity={on(f, balAt[k], 8)}><Label x={x - 40} y={GROUND + 70} text={bal} size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, feeAt[k], 8)} transform={`translate(${x + lerp(110, 170, k / 3)} 0)`}>
            <Stack x={0} y={GROUND - 10} n={n * on(f, feeAt[k], 14)} w={90} color={P.coral} />
            <Label x={0} y={GROUND - 40 - n * 22} text={fee} size={52} font="Bebas Neue" color={P.coralInk} />
          </g>
          {k === 0 && <g opacity={on(f, put28, 8) * (1 - on(f, y10, 8))}><Label x={x + 140} y={GROUND - h * 0.5} text="$6,000 PUT IN" size={40} font="Bebas Neue" color={P.ink2} /></g>}
        </g> })}
      </g>}

      {/* # C) the fee never changed — four identical 1% scoops; 1% of a big pile; the jar and the fee grow together */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, big, 10)}>{[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, changed + k * 4, 8)}><Scoop x={360 + k * 380} y={560} s={1.0} r={-10} /><Label x={360 + k * 380} y={700} text="1%" size={72} font="Bebas Neue" color={P.coralInk} /></g>)}</g>
        <g opacity={on(f, big, 10) * (1 - on(f, pile34, 10))}>
          <SaverJar x={760} y={GROUND} w={360} h={600} fill={0.92} glow={on(f, pile33, 8)} />
          <Stack x={1240} y={GROUND - 10} n={14} w={160} color={P.coral} />
          <g opacity={on(f, number, 8)}><Label x={1240} y={GROUND - 360} text="$9,600" size={80} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        {/* # year after year: the jar and its fee pile grow together */}
        <g opacity={on(f, pile34, 10)}>
          {(() => { const t = span(f, grows34, grows34b + 30), h = lerp(200, 600, t), n = Math.round(lerp(1, 14, t)); return <g>
            <SaverJar x={760} y={GROUND} w={lerp(220, 360, t)} h={h} fill={lerp(0.3, 0.92, t)} />
            <Stack x={1240} y={GROUND - 10} n={n} w={160} color={P.coral} />
            <g opacity={on(f, fee34, 8)}><Label x={1240} y={GROUND + 70} text="THE FEE" size={56} font="Bebas Neue" color={P.coralInk} /></g>
          </g> })()}
        </g>
      </g>}
      <Vignette id="fe-step2" />
    </g>
  )
}

const BEATS = ['s23:1', 's23:everything', 's23:keeps', 's23:growing', 's24:follow', 's24:saver', 's24:500', 's24:month', 's25:simple', 's25:7', 's25:before', 's26:example', 's26:not', 's26:promise', 's26:markets', 's27:two', 's27:new', 's27:added', 's27:growth', 's27:already', 's28:year', 's28:put', 's28:6200', 's28:60', 's29:year', 's29:82000', 's29:800', 's30:year', 's30:228000', 's30:2300', 's31:year', 's31:million', 's31:9600', 's32:changed', 's32:always', 's33:big', 's33:pile', 's33:number', 's34:pile', 's34:grows', 's34:fee', 's34:grows#2', "s28:grew", "s31:single", "s33:1", "s34"]
export const FE_STEP2 = makePiece('fe-step2', 'Fee long step two: 1% of everything you have; one saver, $500 a month, 7% a year (example, not a promise), two ways of growing; jars at years 1/10/20/40 with the fee each took ($60/$800/$2,300/$9,600); the fee never changed, 1% of a big pile; jar and fee grow together', {
  mood: 'light', Component: Step2, beats: BEATS,
  sfx: [['s23:everything', 'swish', 0.25], ['s24:500', 'coin', 0.25], ['s25:7', 'riser', 0.2], ['s26:not', 'swish', 0.25], ['s28:60', 'coin', 0.3], ['s29:800', 'coin', 0.3], ['s30:2300', 'coin', 0.3], ['s31:9600', 'thud', 0.35], ['s33:number', 'ding', 0.3]] })
