// ---------------------------------------------------------------- s66–s74: Silicon Valley Bank (navy night)
// A) s66–68  the bank at night; customers' deposit coins flow from the bank into a vault of LONG-TERM BONDS bought
//            at low rates; rates rose — a RATES ↑ tag and the vault's value gauge sinks (just like the seesaw).
// B) s69     March 2023: the bond stack slides out of the vault — $21 BILLION SOLD — and a red slab LOSS $1.8 BILLION
//            breaks off it.
// C) s70–71  customers run out carrying their money, coins streaming from the door: OVER $40 BILLION IN ONE DAY;
//            then boards and a CLOSED sign: MARCH 10, 2023.
// D) s72–73  the rule, two paths: the bank HAD TO SELL → LOSS; holding to maturity → PAID IN FULL (tick).
// E) s74     the open loop: a retirement-fund crate with bonds inside; a saver scratches his head.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { PriceTag, Arrow, B, BDefs, BGrain, Bank, Cash, Certificate, Coin, FLOOR, Flourish, Skyline, Tag, Tick, cues, fadeIn, scene, FONT } from './kit'

const K = {
  bank66: 's66:bank',
  silicon67: 's67:silicon', customers67: 's67:customers', deposits67: 's67:deposits', long67: 's67:long', bonds67: 's67:bonds', low67: 's67:low',
  rates68: 's68:rates', rose68: 's68:rose', fell68: 's68:fell', seesaw68: 's68:seesaw',
  march69: 's69:march', sold69: 's69:sold', billion69: 's69:billion', loss69: 's69:loss', eight69: 's69:eight',
  panicked70: 's70:panicked', pulled70: 's70:pulled', forty70: 's70:forty', single70: 's70:single',
  tenth71: 's71:tenth', shut71: 's71:shut',
  rule72: 's72:rule', drop72: 's72:drop', loss72: 's72:loss', sell72: 's72:sell',
  bank73: 's73:bank', sell73: 's73:sell', holding73: 's73:holding', maturity73: 's73:maturity', full73: 's73:full',
  fall74: 's74:fall', retirement74: 's74:retirement', own74: 's74:own',
}

// # the bank's bond vault: a dark box with a stack of certificates (n of them) and a value gauge
const Vault: React.FC<{ x: number; o: number; n: number; gauge: number }> = ({ x, o, n, gauge }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${FLOOR})`}>
    <ellipse cx={0} cy={6} rx={280} ry={18} fill="#000" opacity={0.25} />
    <rect x={-250} y={-470} width={500} height={470} rx={20} fill="#3A4A68" stroke="#7C89A6" strokeWidth={6} />
    <rect x={-220} y={-440} width={440} height={410} rx={12} fill="#26344F" />
    {Array.from({ length: Math.round(n) }, (_, k) => <rect key={k} x={-190 + (k % 2) * 12} y={-80 - k * 52} width={360} height={44} rx={6} fill="url(#bd-cert)" stroke={B.green} strokeWidth={3} />)}
    <g transform="translate(320 -240)">
      <rect x={-34} y={-200} width={68} height={400} rx={34} fill="#26344F" stroke="#7C89A6" strokeWidth={5} />
      <rect x={-22} y={188 - 376 * gauge} width={44} height={376 * gauge} rx={22} fill={gauge < 0.75 ? B.coral : B.mint} />
      <text y={250} textAnchor="middle" fill="#B9C3D6" style={{ font: `400 30px ${FONT.big}` }}>VALUE</text>
    </g>
  </g>
)

const SVB: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s69') - 4, BC = c('s70') - 4, CD = c('s72') - 4, DE = c('s74') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = scene(f, CD, DE), Es = fadeIn(f, DE)
  const gauge = lerp(1, 0.6, easeInOut(span(f, t.rose68, t.seesaw68 + 6)))
  const slide = easeInOut(span(f, t.sold69 - 2, t.sold69 + 18)), brk = easeInOut(span(f, t.loss69, t.loss69 + 16))
  const run = (k: number) => span(f, t.panicked70 + k * 10, t.single70 + 30 + k * 10)
  return (
    <g>
      <BDefs />
      <Skyline night />
      {/* ---------------- A) deposits into long-term bonds ---------------- */}
      {A > 0 && <g opacity={A}>
        <Bank x={560} y={FLOOR} s={0.85} night sign="SILICON VALLEY BANK" o={on(f, t.bank66 - 4, 10)} />
        {f > t.deposits67 && f < t.rates68 && [0, 1, 2].map((k) => { const p = ((f - t.deposits67) / 30 + k / 3) % 1; return <Coin key={k} x={lerp(820, 1140, p)} y={lerp(700, 640, p) - Math.sin(Math.PI * p) * 120} r={28} /> })}
        <Tag x={560} y={FLOOR + 74} text="CUSTOMERS' DEPOSITS" size={38} bg={B.navyL} o={on(f, t.customers67, 8)} />
        <Vault x={1360} o={on(f, t.long67 - 4, 10)} n={Math.round(lerp(0, 7, on(f, t.bonds67 - 2, 20)))} gauge={gauge} />
        <Tag x={1360} y={FLOOR + 74} text="LONG-TERM BONDS" size={38} bg={B.green} o={on(f, t.long67, 8)} />
        <Tag x={1360} y={330} text="BOUGHT AT LOW RATES" size={36} bg={B.green} o={on(f, t.low67, 8) * (1 - on(f, t.rates68 - 2, 8))} />
        <Tag x={1360} y={330} text="RATES ROSE" size={44} bg={B.ox} o={on(f, t.rose68 - 2, 8)} />
      </g>}

      {/* ---------------- B) the sale and the loss ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Bank x={420} y={FLOOR} s={0.75} night sign="SVB" />
        <Tag x={420} y={FLOOR + 74} text="MARCH 2023" size={40} bg={B.navyL} o={on(f, t.march69, 8)} />
        <g transform={`translate(${lerp(1000, 1180, slide)} 0)`}>
          {Array.from({ length: 7 }, (_, k) => <rect key={k} x={-180 + (k % 2) * 12} y={FLOOR - 50 - k * 52} width={360} height={44} rx={6} fill="url(#bd-cert)" stroke={B.green} strokeWidth={3} />)}
          <Tag x={0} y={FLOOR + 74} text="$21 BILLION SOLD" size={42} bg={B.green} o={on(f, t.billion69, 8)} />
        </g>
        {brk > 0.01 && <g transform={`translate(${1180 + 330 * brk} ${500 + 260 * brk}) rotate(${16 * brk})`}>
          <rect x={-180} y={-30} width={360} height={60} rx={8} fill={B.ox} />
          <text x={0} y={14} textAnchor="middle" fill="#fff" style={{ font: `400 40px ${FONT.big}` }}>LOSS: $1.8 BILLION</text>
        </g>}
      </g>}

      {/* ---------------- C) the run, then closed ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Bank x={760} y={FLOOR} s={0.95} night sign="SVB" closed={on(f, t.shut71 - 2, 12)} />
        {[0, 1, 2].map((k) => { const p = run(k); const o = on(f, t.panicked70 + k * 10 - 2, 6) * (1 - on(f, t.tenth71 - 2, 8)); return o > 0.01 && <g key={k} opacity={o}>
          <Person f={f} who={['worker', 'buyer', 'investor'][k]} beats={[[0, 'runA', 'shocked', 'runB', 8]]} x={lerp(1140 + k * 190, 2000 + k * 190, p)} y={1060} s={0.62} />
        </g> })}
        {f > t.pulled70 && f < t.tenth71 && [0, 1, 2, 3].map((k) => { const p = ((f - t.pulled70) / 20 + k / 4) % 1; return <Coin key={k} x={lerp(800, 1500, p)} y={FLOOR - 120 - Math.sin(Math.PI * p) * 80} r={26} o={1 - p} /> })}
        <Tag x={1480} y={330} text="OVER $40 BILLION LEFT IN ONE DAY" size={40} bg={B.ox} o={on(f, t.forty70, 8) * (1 - on(f, t.tenth71 - 2, 8))} />
        <Tag x={1400} y={420} text="MARCH 10, 2023" size={54} bg={B.ox} o={on(f, t.tenth71, 8)} />
        <Tag x={1400} y={510} text="SHUT DOWN" size={44} bg={B.oxD} o={on(f, t.shut71, 8)} />
      </g>}

      {/* ---------------- D) the rule: had to sell vs hold ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        {/* s72: the rule on one note: its price drop is only a loss on a sale */}
        <g opacity={1 - on(f, t.bank73 - 4, 8)}>
          <Certificate x={960} y={520} s={0.55} n={0} />
          <PriceTag x={960} y={680} text="PRICE DOWN" s={0.8} color={B.oxL} o={on(f, t.drop72 - 2, 8)} />
          <Tag x={960} y={950} text="A LOSS ONLY IF YOU SELL" size={46} bg={B.ox} o={on(f, t.sell72 - 2, 8)} />
        </g>
        <g opacity={on(f, t.bank73 - 2, 8)}>
        <rect x={960} y={250} width={4} height={780} fill="#5A6C8F" />
        <Bank x={420} y={FLOOR - 40} s={0.6} night sign="SVB" closed={1} />
        <Tag x={480} y={330} text="HAD TO SELL" size={50} bg={B.ox} o={on(f, t.sell73 - 2, 8)} />
        <Tag x={480} y={410} text="→ REAL LOSS" size={44} bg={B.oxD} o={on(f, t.sell73 + 6, 8)} />
        <Person f={f} who="investorF" beats={[[0, 'hold', 'neutral'], [t.full73, 'celebrate', 'smiling']]} x={1260} y={1060} s={0.75} o={on(f, t.holding73 - 4, 8)} />
        <Certificate x={1620} y={560} s={0.4} n={0} o={on(f, t.holding73, 8)} />
        <Tag x={1480} y={330} text="HOLD TO MATURITY" size={46} bg={B.green} o={on(f, t.maturity73 - 2, 8)} />
        <Tick x={1620} y={760} r={56} p={on(f, t.full73, 8)} />
        <Tag x={1620} y={860} text="PAID IN FULL" size={40} bg={B.green} o={on(f, t.full73, 8)} />
        </g>
      </g>}

      {/* ---------------- E) so why own them? ---------------- */}
      {Es > 0 && <g opacity={Es}>
        <Person f={f} who="hero" beats={[[0, 'think', 'thinking'], [t.own74, 'scratchHead', 'thinking']]} x={520} y={1060} s={0.8} />
        <g transform={`translate(1240 ${FLOOR})`} opacity={on(f, DE, 8)}>
          <ellipse cx={0} cy={6} rx={300} ry={20} fill="#000" opacity={0.25} />
          {[0, 1, 2].map((k) => <rect key={k} x={-200 + k * 40} y={-360 - k * 10} width={200} height={240} rx={8} fill="url(#bd-cert)" stroke={B.green} strokeWidth={4} />)}
          <rect x={-280} y={-200} width={560} height={200} rx={10} fill="#B08A57" stroke="#6E5230" strokeWidth={6} />
          <Tag x={0} y={-90} text="RETIREMENT FUND" size={40} bg={B.greenD} />
        </g>
      </g>}

      <Headline f={f} lines={[[t.bank66, 'THEN CAME THE BANK', B.coral, 112], [t.march69, 'FORCED TO SELL', B.coral, 116], [t.panicked70, 'A BANK RUN', B.coral, 116], [t.rule72, 'REMEMBER THE RULE', B.white, 112], [t.fall74, 'SO WHY OWN BONDS?', B.white, 112]]} />
      <Flourish f={f} at={(EXTRA['bd-svb'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_SVB = makePiece('bd-svb', "Silicon Valley Bank at night: customers' deposit coins flow from the bank into a vault of long-term bonds bought at low rates, rates rose and the vault's value gauge sinks; in March 2023 the stack slides out, $21 billion sold, and a red slab LOSS $1.8 billion breaks off; customers run out with their money, over $40 billion left in one day; boards and a CLOSED sign, March 10, 2023; the rule split in two — the bank had to sell, a real loss, vs Nina holding to maturity, paid in full; a retirement-fund crate full of bonds and a saver scratching his head", {
  mood: 'dark', Component: SVB, beats: [...Object.values(K), ...(EXTRA['bd-svb'] ?? [])],
  sfx: [['s69:loss', 'crack', 0.12], ['s70:panicked', 'whoosh', 0.1], ['s71:shut', 'thud', 0.14], ['s73:full', 'chime', 0.1]] })
