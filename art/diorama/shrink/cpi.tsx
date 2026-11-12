// ============================================================
// sf-cpi (s57–s70, cream): does shrinkflation drive inflation? A) a trolley worth
// $100 (2019) and the same trolley at $134.50 (2024): a tall column for the 34.5%
// rise with a hair-thin red sliver on top for shrinking (< 0.1 pt) — "less than
// 10¢" as a cent beside a $34.50 note pile.  B) the BLS report agrees (≈0.05 pt
// over five years; food and drink ≈0.2); almost all of the rise is ordinary price
// rises; rent (a house) and insurance (an umbrella) cannot shrink.  C) the paper
// aisle: inside it, shrinking adds ≈3 points; two cards — OVERALL: TINY and
// IN THESE AISLES: A REAL PRICE RISE.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { Headline, win } from '../aimoney/common'
import { bump, Cent, Dollar, Report, Rolls, S, Shelf, Sticker, Store, Trolley , pulse } from './kit'

const GROUND = 880
// # a small house (rent) and an umbrella (insurance), drawn here
const House: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-110} y={-150} width={220} height={150} fill="#F3D9B8" stroke={S.woodD} strokeWidth={4} /><path d="M-130 -150 L0 -250 L130 -150 Z" fill={S.red} /><rect x={-26} y={-80} width={52} height={80} fill={S.woodD} /><rect x={50} y={-120} width={40} height={40} fill="#DCEFFA" /></g>
)
const Umbrella: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-120 -160 C-120 -260 120 -260 120 -160 C90 -180 60 -180 40 -160 C20 -180 -20 -180 -40 -160 C-60 -180 -90 -180 -120 -160 Z" fill={S.sky} /><path d="M0 -160 L0 -10 C0 10 -30 10 -30 -10" stroke={S.ink} strokeWidth={8} fill="none" /></g>
)
// # a small card with a big word
const Card: React.FC<{ x: number; y: number; s: number; o: number; top: string; big: string; color: string }> = ({ x, y, s, o, top, big, color }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><rect x={-230} y={-110} width={460} height={220} rx={20} fill="#FFFFFF" stroke={color} strokeWidth={8} />
    <Label x={0} y={-40} text={top} size={40} font="Bebas Neue" color={S.ink2} /><Label x={0} y={50} text={big} size={64} font="Bebas Neue" color={color} /></g>
)

const Cpi: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const surprise = c('s57:surprise'), y2019 = c('s58:2019'), y2024 = c('s58:2024'), d345 = c('s58:345'), overall = c('s58:overall')
  const how59 = c('s59:how'), shrinking59 = c('s59:shrinking')
  const gao60 = c('s60:gao'), tenth = c('s60:tenth'), point60 = c('s60:point')
  const concrete = c('s61:concrete'), d100 = c('s61:100'), d134 = c('s61:134'), y2024b = c('s61:2024')
  const extra62 = c('s62:extra'), d3450 = c('s62:34'), packs62 = c('s62:packs'), d10 = c('s62:10')
  const bureau63 = c('s63:bureau'), same63 = c('s63:same'), five63 = c('s63:five'), hundredths = c('s63:hundredths')
  const food64 = c('s64:food'), fifth = c('s64:fifth')
  const ordinary = c('s65:ordinary'), smaller65 = c('s65:smaller')
  const slice = c('s66:slice'), rent = c('s66:rent'), insurance = c('s66:insurance'), shrink66 = c('s66:shrink')
  const aisles67 = c('s67:aisles'), adds = c('s67:adds')
  const household68 = c('s68:household'), d3 = c('s68:3'), five68 = c('s68:five')
  const both = c('s69:both'), true69 = c('s69:true')
  const everything70 = c('s70:everything'), aisles70 = c('s70:aisles'), real70 = c('s70:real')
  const A = win(f, c('s57') - 20, bureau63), B = win(f, bureau63, aisles67), D = on(f, aisles67, 8)
  // # the 34.5% column: 100 → 134.5 drawn as heights 300 → 403.5
  const H0 = 300, H1 = 300 * 1.345
  return (
    <g>
      <Stage id="sf-cpi" frame={f} />
      <Store f={f} />
      <Headline f={f} lines={[[surprise, 'NOW, THE SURPRISE', S.redD, 120], [d345, 'US PRICES 2019–2024: +34.5%', P.ink, 100], [how59, 'HOW MUCH FROM SHRINKING?', P.ink, 104], [tenth, 'LESS THAN 0.1 POINT', S.redD, 120],
        [d134, '$100 → $134.50', P.ink, 120], [d10, 'SHRINKING: UNDER 10¢ OF IT', S.redD, 104], [bureau63, 'THE BLS AGREES', P.ink, 120], [ordinary, 'ALMOST ALL: ORDINARY PRICE RISES', P.ink, 96],
        [aisles67, 'BUT INSIDE CERTAIN AISLES…', P.ink, 104], [d3, 'HOUSEHOLD PAPER: ≈ +3 POINTS', S.redD, 100], [both, 'BOTH ARE TRUE', P.ink, 130]]} />

      {/* # A) the trolley column, the sliver, the dollars */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, y2019, 8)}><Trolley x={360} y={GROUND} s={1.1 * pop(f, y2019)} f={f} load={1} /><Label x={360} y={GROUND + 64} text={f >= y2024 ? '2019 → 2024' : '2019'} size={44} font="Bebas Neue" color={S.ink2} /></g>
        <g opacity={on(f, y2019, 8)}>
          <rect x={780} y={GROUND - lerp(H0, H1, on(f, d345, 24))} width={240} height={lerp(H0, H1, on(f, d345, 24))} rx={14} fill={S.sky} />
          <rect x={780} y={GROUND - H0 - 2} width={240} height={4} fill="#FFFFFF" opacity={on(f, d345, 8) * 0.8} />
          <g opacity={on(f, overall, 8)}><Label x={900} y={GROUND - H1 - 30} text="+34.5%" size={56} font="Bebas Neue" color={S.skyD} /></g>
          {/* # the shrinking sliver (thin red line) and its pointer */}
          <g opacity={on(f, shrinking59, 8)}><rect x={780} y={GROUND - H1 - 3} width={240} height={3} fill={S.red} />
            <path d={`M1030 ${GROUND - H1 - 2} L1110 ${GROUND - H1 - 60}`} stroke={S.red} strokeWidth={4} /><Label x={1240} y={GROUND - H1 - 66} text="SHRINKING" size={40} font="Bebas Neue" color={S.redD} /></g>
          <g opacity={on(f, gao60, 8) * (1 - on(f, concrete - 8, 8))}><Report x={1560} y={560} s={0.75 * pop(f, gao60) * bump(f, point60, 0.05)} title="GAO" color={S.mintD} /></g>
        </g>
        {/* # $100 becomes $134.50: dollar notes; under 10 cents of the extra $34.50 came from shrinking */}
        <g opacity={on(f, concrete, 8) * (1 - on(f, bureau63, 8))}>
          <rect x={1120} y={300} width={720} height={500} rx={24} fill="#FFFFFF" opacity={0.95} stroke={S.paperD} strokeWidth={5} />
          <g opacity={on(f, d100, 8)}><Dollar x={1300} y={420} s={1.0 * pulse(f, [c('s61:2019')])} v="$100" /><Label x={1300} y={510} text="2019" size={40} font="Bebas Neue" color={S.ink2} /></g>
          <g opacity={on(f, d134, 8)}><Dollar x={1640} y={420} s={1.0 * pulse(f, [c('s61:2024'), c('s62:extra')])} v="$134.50" /><Label x={1640} y={510} text="2024" size={40} font="Bebas Neue" color={S.ink2} /></g>
          <g opacity={on(f, d3450, 8)}><Label x={1380} y={640} text="EXTRA $34.50" size={48} font="Bebas Neue" color={S.ink} /></g>
          <g opacity={on(f, packs62, 8)}><Cent x={1700} y={620} r={52 * pop(f, d10)} t="<10¢" /><Label x={1700} y={730} text="FROM SHRINKING" size={34} font="Bebas Neue" color={S.redD} /></g>
        </g>
      </g>}

      {/* # B) the BLS agrees; ordinary rises; rent and insurance */}
      {B > 0 && <g opacity={B}>
        <Report x={380} y={580} s={1.0 * pop(f, bureau63) * bump(f, same63, 0.05) * pulse(f, [c('s63:changes'), c('s63:overall'), c('s63:index'), c('s64:affected'), c('s64:even'), c('s65:almost'), c('s65:345'), c('s66:because'), c('s66:happens'), c('s66:things'), c('s66:costs')])} title="BLS" />
        <g opacity={on(f, five63, 8) * (1 - on(f, ordinary, 8))}>
          <rect x={760} y={GROUND - 400} width={200} height={400} rx={12} fill={S.sky} /><rect x={760} y={GROUND - 402} width={200} height={3} fill={S.red} />
          <g opacity={on(f, hundredths, 8)}><Label x={1180} y={GROUND - 420} text="SIZE CHANGES ≈ 0.05 PT" size={44} font="Bebas Neue" color={S.redD} /></g>
          <g opacity={on(f, food64, 8)}><Label x={1180} y={GROUND - 340} text="FOOD & DRINK ≈ 0.2 PT" size={44} font="Bebas Neue" color={S.redD} o={bump(f, fifth, 0)} /></g>
        </g>
        <g opacity={on(f, ordinary, 8)}>
          <rect x={760} y={GROUND - 400} width={200} height={400} rx={12} fill={S.sky} /><Label x={860} y={GROUND - 200} text="ORDINARY" size={40} font="Bebas Neue" color="#FFFFFF" /><Label x={860} y={GROUND - 156} text="RISES" size={40} font="Bebas Neue" color="#FFFFFF" />
          <g opacity={on(f, smaller65, 8)}><rect x={760} y={GROUND - 402} width={200} height={3} fill={S.red} /></g>
          <g opacity={on(f, rent, 8)}><House x={1240} y={GROUND} s={1.0 * pop(f, rent)} /><Label x={1240} y={GROUND + 64} text="RENT" size={40} font="Bebas Neue" color={S.ink2} /></g>
          <g opacity={on(f, insurance, 8)}><Umbrella x={1580} y={GROUND} s={1.0 * pop(f, insurance)} /><Label x={1580} y={GROUND + 64} text="INSURANCE" size={40} font="Bebas Neue" color={S.ink2} /></g>
          <g opacity={on(f, shrink66, 8)}><Label x={1410} y={560} text="NO PACK TO SHRINK" size={44} font="Bebas Neue" color={S.mintD} o={bump(f, slice, 0)} /></g>
        </g>
      </g>}

      {/* # C) the paper aisle: +3 points inside; both things are true */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, true69, 8)}>
          <Shelf x={300} y={GROUND - 40} w={900} rows={1} gap={320} />
          {[0, 1, 2].map((k) => <Rolls key={k} x={440 + k * 300} y={GROUND - 40} s={0.7 * bump(f, household68, 0.04) * pulse(f, [c('s68:alone')])} n={3} tp={k !== 1} label={k === 1 ? 'TOWELS' : 'TP'} />)}
          <g opacity={on(f, adds, 8)}><rect x={1400} y={GROUND - 340} width={200} height={340} rx={12} fill={S.sky} />
            <rect x={1400} y={GROUND - 340 - 30 * on(f, d3, 16)} width={200} height={30 * on(f, d3, 16)} rx={6} fill={S.red} />
            <g opacity={on(f, d3, 8)}><Label x={1500} y={GROUND - 390} text="+3 PTS FROM SHRINKING" size={40} font="Bebas Neue" color={S.redD} /></g>
            <g opacity={on(f, five68, 8)}><Label x={1500} y={GROUND + 64} text="2019–2024" size={40} font="Bebas Neue" color={S.ink2} /></g></g>
        </g>
        <Card x={600} y={560} s={pop(f, true69 + 8) * pulse(f, [c('s70:shrinkflation')])} o={on(f, true69 + 8, 8)} top="ACROSS EVERYTHING" big="TINY" color={S.skyD} />
        <Card x={1320} y={560} s={pop(f, aisles70) * bump(f, real70, 0.05)} o={on(f, aisles70, 8)} top="IN THESE AISLES" big="A REAL PRICE RISE" color={S.red} />
        <g opacity={on(f, everything70, 8)}><Sticker x={600} y={320} s={0.8 * pop(f, everything70)} text="NOT THE CAUSE" color={S.skyD} /></g>
      </g>}
      <Vignette id="sf-cpi" />
    </g>
  )
}

const BEATS = ["s57:surprise", "s58:2019", "s58:2024", "s58:345", "s58:overall", "s59:shrinking", "s60:gao", "s60:tenth", "s60:point", "s61:concrete", "s61:100", "s61:134", "s62:34", "s62:packs", "s62:10", "s63:bureau", "s63:same", "s63:five", "s63:hundredths", "s64:food", "s64:fifth", "s65:ordinary", "s65:smaller", "s66:slice", "s66:rent", "s66:insurance", "s66:shrink", "s67:aisles", "s67:adds", "s68:household", "s68:3", "s68:five", "s69:both", "s69:true", "s70:everything", "s70:aisles", "s70:real", "s57", "s61:2019", "s61:2024", "s62:extra", "s63:changes", "s63:overall", "s63:index", "s64:affected", "s64:even", "s65:almost", "s65:345", "s66:because", "s66:happens", "s66:things", "s66:costs", "s68:alone", "s70:shrinkflation"]
export const SF_CPI = makePiece('sf-cpi', 'Shrinkflation ch4: full trolley 2019→2024 and a +34.5% price column with a hair-thin red SHRINKING sliver; GAO report; $100 note → $134.50 note, extra $34.50, <10¢ cent from shrinking; BLS report agrees (≈0.05 pt, food & drink ≈0.2); ordinary rises; rent (house) and insurance (umbrella) have no pack to shrink; paper aisle with +3 points; two cards ACROSS EVERYTHING: TINY / IN THESE AISLES: A REAL PRICE RISE', {
  mood: 'light', Component: Cpi, beats: BEATS,
  sfx: [['s58:345', 'pop', 0.2], ['s62:10', 'coin', 0.2], ['s68:3', 'pop', 0.2], ['s70:real', 'pop', 0.2]],
})
