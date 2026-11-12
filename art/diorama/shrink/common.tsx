// ============================================================
// sf-common (s24–s44, cream): how common is it? A) the BLS report and a magnifier
// over a wall of 100 little price tags — about 3 light up (2.9%); the paper aisle:
// one pack shrinks (≈1.8% of checks), one grows (≈1.1%); a snack bag shrinks (≈0.5%).
// B) "why does it feel like everything is shrinking": the GAO report; a 20% ruler;
// two bars appear — PRODUCTS and MONEY SPENT — each with its shrunk part in red;
// cereal: 60 of 5,591 products (1.1%) but 8.6% of the money.  C) the bars morph per
// category with the product beside them: toilet paper 2.4% / 10.7%, paper towels
// 2.57% / 38.6%, coffee ~0.1% / 6.4%.  D) the best sellers glow on the shelf; a
// per-unit price-rise range +11.6% (paper towels) … +32.4% (coffee).
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { type Beat, Headline, Person, win } from '../aimoney/common'
import { bump, Cereal, Coffee, Magnifier, Report, Rolls, S, Shelf, Snack, Sticker, Store , pulse } from './kit'

const GROUND = 880
// # one share bar: a full bar (100%) with the shrunk part in red on the left; label on the bar, value at its red end
const ShareBar: React.FC<{ x: number; y: number; w: number; pct: number; title: string; value: string; o: number }> = ({ x, y, w, pct, title, value, o }) => (
  <g opacity={o}>
    <Label x={x} y={y - 26} text={title} size={40} font="Bebas Neue" color={S.ink} anchor="start" />
    <rect x={x} y={y} width={w} height={64} rx={14} fill="#E7DFD0" />
    <rect x={x} y={y} width={Math.max(8, w * pct / 100)} height={64} rx={14} fill={S.red} />
    <Label x={x + Math.max(8, w * pct / 100) + 16} y={y + 46} text={value} size={46} font="Bebas Neue" color={S.redD} anchor="start" />
  </g>
)

const Common: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const bureau = c('s24:bureau'), checked24 = c('s24:checked'), food24 = c('s24:food')
  const found25 = c('s25:found'), d29 = c('s25:29'), size25 = c('s25:size'), smaller25 = c('s25:smaller'), bigger25 = c('s25:bigger')
  const across = c('s26:across'), common26 = c('s26:common'), household = c('s26:household'), towels26 = c('s26:towels'), toilet26 = c('s26:toilet')
  const d18 = c('s27:18'), smaller27 = c('s27:smaller')
  const way28 = c('s28:way'), aisle28 = c('s28:aisle'), d11b = c('s28:11'), bigger28 = c('s28:bigger')
  const snacks = c('s29:snacks'), half = c('s29:half'), smaller29 = c('s29:smaller')
  const sounds = c('s30:sounds'), feel = c('s30:feel'), shrinking30 = c('s30:shrinking')
  const office = c('s31:office'), deeper = c('s31:deeper'), sales31 = c('s31:sales')
  const counted = c('s32:counted'), d20 = c('s32:20'), dropped = c('s32:dropped')
  const questions = c('s33:questions'), many = c('s33:many'), money33 = c('s33:money'), spent33 = c('s33:spent')
  const cereal34 = c('s34:cereal'), d5591 = c('s34:5591'), d60 = c('s34:60'), smaller34 = c('s34:smaller')
  const d11 = c('s35:11'), d60b = c('s36:60'), d86 = c('s36:86'), spent36 = c('s36:spent')
  const words37 = c('s37:words'), boxes37 = c('s37:boxes'), buy37 = c('s37:buy')
  const toilet38 = c('s38:toilet'), d24 = c('s38:24'), d107 = c('s38:107')
  const towels39 = c('s39:towels'), extreme = c('s39:extreme'), d386 = c('s40:386')
  const coffee41 = c('s41:coffee'), thousand = c('s41:thousand'), d64 = c('s41:64')
  const rare = c('s42:rare'), store42 = c('s42:store'), best = c('s42:best'), sellers = c('s42:sellers')
  const lands = c('s43:lands'), small43 = c('s43:small')
  const unit44 = c('s44:unit'), d116 = c('s44:116'), d324 = c('s44:324'), coffee44 = c('s44:coffee')
  const A = win(f, c('s24') - 20, sounds), B = win(f, sounds, toilet38), Cc = win(f, toilet38, rare), D = on(f, rare, 8)
  const shopper: Beat[] = [[0, 'idle', 'neutral'], [feel, 'shrug', 'worried'], [shrinking30, 'scratchHead', 'thinking'], [c('s31:2025'), 'think', 'thinking']]
  // # the two share bars: values morph per category (cereal → toilet paper → paper towels → coffee)
  const cat = f >= coffee41 ? 3 : f >= towels39 ? 2 : f >= toilet38 ? 1 : 0
  const PROD = [1.1, 2.4, 2.57, 0.11], MONEY = [8.6, 10.7, 38.6, 6.44]
  const PV = ['1.1%', '2.4%', '2.6%', '≈0.1%'], MV = ['8.6%', '10.7%', '38.6%', '6.4%']
  const prodShown = [on(f, d11, 8), on(f, d24, 8), on(f, extreme, 8), on(f, thousand, 8)][cat]
  const moneyShown = [on(f, d86, 8), on(f, d107, 8), on(f, d386, 8), on(f, d64, 8)][cat]
  return (
    <g>
      <Stage id="sf-common" frame={f} />
      <Store f={f} aisle={f < across ? 'FOOD' : f < snacks ? 'PAPER' : f < sounds ? 'SNACKS' : f < rare ? undefined : 'ALL AISLES'} />
      <Headline f={f} lines={[[bureau, 'BLS: FOOD PRICES 2015–2021', P.ink, 104], [d29, 'ONLY 2.9% CHANGED SIZE', P.ink, 110], [household, 'MOST SHRINKING: HOUSEHOLD PAPER', P.ink, 96], [snacks, 'SNACKS: ABOUT 0.5%', P.ink, 110],
        [sounds, 'SO WHY DOES IT FEEL EVERYWHERE?', P.ink, 100], [office, 'GAO: STORE SALES 2021–2023', P.ink, 104], [questions, 'TWO QUESTIONS', P.ink, 120], [cereal34, 'CEREAL', P.ink, 130],
        [d86, 'CEREAL: 8.6% OF THE MONEY', S.redD, 104], [toilet38, 'TOILET PAPER', P.ink, 130], [towels39, 'PAPER TOWELS', P.ink, 130], [coffee41, 'COFFEE', P.ink, 130], [best, 'IT LANDS ON THE BEST SELLERS', S.redD, 100], [unit44, 'PRICE PER UNIT: +11.6% TO +32.4%', S.redD, 92]]} />

      {/* # A) BLS: 100 price tags, ~3 light up; the paper aisle; snacks */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, across, 8)}>
          <Report x={300} y={600} s={1.0 * pop(f, bureau) * bump(f, checked24, 0.05) * pulse(f, [c('s24:2015'), c('s25:found'), c('s25:tracked')])} title="BLS" />
          {Array.from({ length: 100 }, (_, k) => { const lit = [7, 41, 83].includes(k) ? on(f, d29 + [0, 4, 8][[7, 41, 83].indexOf(k)], 8) : 0
            return <g key={k} opacity={on(f, food24 + (k % 10), 6)}><rect x={620 + (k % 20) * 58} y={380 + Math.floor(k / 20) * 74} width={46} height={56} rx={6} fill={lit > 0.5 ? S.red : S.tag} stroke={S.tagD} strokeWidth={2} /></g> })}
          <g opacity={on(f, d29, 8)}><Label x={1190} y={800} text="≈ 3 IN 100 PRICES" size={48} font="Bebas Neue" color={S.redD} /></g>
          <g opacity={on(f, size25, 8)}><Magnifier x={lerp(900, 1500, easeInOut(span(f, size25, bigger25 + 10)))} y={520} s={0.8} /></g>
        </g>
        <g opacity={on(f, across, 8) * (1 - on(f, snacks, 8))}>
          <Shelf x={360} y={GROUND - 40} w={1200} rows={1} gap={320} />
          <Rolls x={560} y={GROUND - 40} s={0.8 * bump(f, towels26, 0.05)} n={4} label="TOWELS" />
          <Rolls x={960} y={GROUND - 40} s={lerp(0.8, 0.7, on(f, smaller27, 16)) * bump(f, toilet26, 0.05)} n={4} tp label="TP" />
          <Rolls x={1360} y={GROUND - 40} s={lerp(0.7, 0.8, on(f, bigger28, 16)) * pulse(f, [c('s28:paper')])} n={4} tp label="TP" o={on(f, way28, 8)} />
          <g opacity={on(f, d18, 8)}><Sticker x={1060} y={430} s={pop(f, d18)} text="≈1.8%" /><Label x={960} y={GROUND + 64} text="GOT SMALLER" size={36} font="Bebas Neue" color={S.redD} /></g>
          <g opacity={on(f, d11b, 8)}><Sticker x={1460} y={400} s={pop(f, d11b)} text="≈1.1%" color={S.mintD} /><Label x={1360} y={GROUND + 64} text="GOT BIGGER" size={36} font="Bebas Neue" color={S.mintD} /></g>
          <g opacity={on(f, common26, 8)}><Label x={560} y={GROUND + 64} text="HOUSEHOLD PAPER" size={36} font="Bebas Neue" color={S.ink2} /></g>
        </g>
        <g opacity={on(f, snacks, 8)}><Snack x={800} y={GROUND - 20} s={1.2 * pop(f, snacks)} /><Snack x={1140} y={GROUND - 20} s={lerp(1.2, 1.08, on(f, smaller29, 16))} color={S.berry} />
          <g opacity={on(f, half, 8)}><Sticker x={1300} y={460} s={pop(f, half)} text="≈0.5%" /></g></g>
      </g>}

      {/* # B) the GAO, the 20% rule, the two bars, cereal */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, office, 8)}><Person f={f} who="investorF" beats={shopper} x={300} y={GROUND} s={1.0} /><Rolls x={760} y={GROUND} s={0.7} n={3} tp /><Snack x={1040} y={GROUND} s={0.9} /><Cereal x={1300} y={GROUND} s={0.9} oz="" /></g>
        <g opacity={on(f, office, 8) * (1 - on(f, questions, 8))}><Report x={420} y={580} s={1.0 * pop(f, office) * bump(f, deeper, 0.05) * bump(f, sales31, 0.05) * pulse(f, [c('s31:2021'), c('s31:2023')])} title="GAO" color={S.mintD} />
          <g opacity={on(f, counted, 8)}>
            <Cereal x={1000} y={GROUND} s={1.0} oz="BEFORE" /><Cereal x={1300} y={GROUND} s={1.0} h={lerp(1, 0.82, on(f, dropped, 16))} oz="AFTER" />
            <g opacity={on(f, d20, 8)}><path d={`M1430 ${GROUND - 300} L1430 ${GROUND - 246}`} stroke={S.red} strokeWidth={8} /><Label x={1560} y={GROUND - 262} text="UP TO 20% SMALLER" size={34} font="Bebas Neue" color={S.redD} /></g></g></g>
        <g opacity={on(f, questions, 8)}>
          <Cereal x={330} y={GROUND} s={1.1 * pop(f, cereal34) * bump(f, boxes37, 0.05) * bump(f, buy37, 0.05) * pulse(f, [c('s33:spent'), c('s33:products'), c('s34:cereal#2'), c('s36:60'), c('s36:made')])} oz="CEREAL" o={on(f, cereal34, 8)} />
          <ShareBar x={620} y={430} w={1100} pct={on(f, d11, 16) * 1.1} title={f >= d5591 ? `PRODUCTS: ${f >= d60 ? '60' : '…'} OF 5,591 SHRANK` : 'HOW MANY PRODUCTS SHRANK?'} value={f >= d11 ? '1.1%' : ''} o={on(f, many, 8)} />
          <ShareBar x={620} y={680} w={1100} pct={on(f, d86, 16) * 8.6} title="SHARE OF THE MONEY SPENT" value={f >= d86 ? '8.6%' : ''} o={on(f, money33, 8) * bump(f, spent36, 0)} />
          <g opacity={on(f, words37, 8)}><Label x={1170} y={860} text="THE BOXES PEOPLE ACTUALLY BUY" size={40} font="Bebas Neue" color={S.redD} /></g>
        </g>
      </g>}

      {/* # C) the bars morph per category */}
      {Cc > 0 && <g opacity={Cc}>
        <g transform={`translate(330 ${GROUND})`}>
          <g opacity={cat === 1 ? 1 : 0}><Rolls x={0} y={0} s={0.8 * pop(f, toilet38)} n={3} tp label="TP" /></g>
          <g opacity={cat === 2 ? 1 : 0}><Rolls x={0} y={0} s={0.8 * pop(f, towels39) * pulse(f, [c('s40:shrank'), c('s40:towel')])} n={3} label="TOWELS" /></g>
          <g opacity={cat === 3 ? 1 : 0}><Coffee x={0} y={0} s={1.0 * pop(f, coffee41) * pulse(f, [c('s41:shrank'), c('s41:sales')])} /></g>
        </g>
        <ShareBar x={620} y={430} w={1100} pct={PROD[cat] * prodShown} title="SHARE OF PRODUCTS THAT SHRANK" value={prodShown > 0.5 ? PV[cat] : ''} o={1} />
        <ShareBar x={620} y={680} w={1100} pct={MONEY[cat] * moneyShown} title="SHARE OF THE MONEY SPENT" value={moneyShown > 0.5 ? MV[cat] : ''} o={1} />
      </g>}

      {/* # D) best sellers; the per-unit price-rise range */}
      {D > 0 && <g opacity={D}>
        <Shelf x={260} y={GROUND - 40} w={1400} rows={1} gap={320} />
        {[0, 1, 2, 3, 4, 5].map((k) => { const hot = k === 1 || k === 4
          return <g key={k}>{hot && <ellipse cx={380 + k * 230} cy={GROUND - 190} rx={110} ry={180} fill={S.glow} opacity={0.55 * on(f, best + (k === 4 ? 4 : 0), 10)} />}
            <Cereal x={380 + k * 230} y={GROUND - 40} s={0.75 * (hot ? bump(f, sellers, 0.08) * pulse(f, [c('s44:products'), c('s44:price')]) : 1)} color={[S.sun, S.coral, S.sky, S.leaf, S.berry, S.sun][k]} oz="" /></g> })}
        <g opacity={on(f, store42, 8) * (1 - on(f, unit44, 8))}><Label x={960} y={GROUND + 64} text="RARE ACROSS THE STORE…" size={44} font="Bebas Neue" color={S.ink2} /></g>
        <g opacity={on(f, lands, 8)}>
          <rect x={460} y={300} width={1000} height={22} rx={11} fill="#E7DFD0" />
          <g opacity={on(f, d116, 8)}><circle cx={460 + 1000 * 11.6 / 40} cy={311} r={26} fill={S.sun} /><Label x={460 + 1000 * 11.6 / 40} y={268} text="+11.6% TOWELS" size={36} font="Bebas Neue" color={S.ink} /></g>
          <g opacity={on(f, d324, 8)}><circle cx={460 + 1000 * 32.4 / 40} cy={311} r={26} fill={S.red} /><Label x={460 + 1000 * 32.4 / 40} y={268} text="+32.4% COFFEE" size={36} font="Bebas Neue" color={S.redD} /></g>
          <g opacity={on(f, d116, 8)}><rect x={460 + 1000 * 11.6 / 40} y={302} width={on(f, d324, 20) * 1000 * (32.4 - 11.6) / 40} height={18} rx={9} fill={S.coral} /></g>
          <g opacity={on(f, small43, 8)}><Label x={960} y={380} text="AVERAGE RISE IN PRICE PER UNIT" size={36} font="Bebas Neue" color={S.ink2} /></g>
        </g>
      </g>}
      <Vignette id="sf-common" />
    </g>
  )
}

const BEATS = ["s24:bureau", "s24:checked", "s24:food", "s25:29", "s25:size", "s25:bigger", "s26:across", "s26:common", "s26:household", "s26:towels", "s26:toilet", "s27:18", "s27:smaller", "s28:way", "s28:11", "s28:bigger", "s29:snacks", "s29:half", "s29:smaller", "s30:sounds", "s30:feel", "s30:shrinking", "s31:office", "s31:deeper", "s31:sales", "s32:counted", "s32:20", "s32:dropped", "s33:questions", "s33:many", "s33:money", "s34:cereal", "s34:5591", "s34:60", "s35:11", "s36:86", "s36:spent", "s37:words", "s37:boxes", "s37:buy", "s38:toilet", "s38:24", "s38:107", "s39:towels", "s39:extreme", "s40:386", "s41:coffee", "s41:thousand", "s41:64", "s42:rare", "s42:store", "s42:best", "s42:sellers", "s43:lands", "s43:small", "s44:unit", "s44:116", "s44:324", "s24", "s31:2025", "s24:2015", "s25:found", "s25:tracked", "s28:paper", "s31:2021", "s31:2023", "s33:spent", "s33:products", "s34:cereal#2", "s36:60", "s36:made", "s40:shrank", "s40:towel", "s41:shrank", "s41:sales", "s44:products", "s44:price"]
export const SF_COMMON = makePiece('sf-common', 'Shrinkflation ch2: BLS report, a wall of 100 price tags with about 3 lit (2.9%), magnifier; paper aisle: a pack shrinks (≈1.8%), one grows (≈1.1%), snacks shrink (≈0.5%); GAO report, before/after box with up-to-20% rule; two bars PRODUCTS vs MONEY SPENT: cereal 60 of 5,591 = 1.1% vs 8.6%; bars morph for toilet paper 2.4/10.7, paper towels 2.6/38.6, coffee ≈0.1/6.4; best sellers glow on a shelf; per-unit rise range +11.6% to +32.4%', {
  mood: 'light', Component: Common, beats: BEATS,
  sfx: [['s25:29', 'pop', 0.2], ['s36:86', 'pop', 0.25], ['s40:386', 'pop', 0.25], ['s44:324', 'pop', 0.2]],
})
