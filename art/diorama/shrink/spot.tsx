// ============================================================
// sf-spot (s81–s93) and sf-payoff (s94–s99), cream supermarket.
// spot: A) a shelf label grows huge; its small unit-price box lights up; it shows
// per ounce / per sheet / per item and two packs of different sizes compare.
// B) "16 states + DC" stamped on a simple US silhouette (no states singled out);
// the tuna study: two shelves of tuna cans, shoppers in unit-pricing states put
// back the shrunken cans (30–84% more cut back).  C) France: a supermarket notice
// card beside a pack — QUANTITY 500 G → 450 G, PRICE PER KG +11% (labelled
// EXAMPLE); the US problem: three different, hard-to-read unit labels.
// D) the tells: redesigned pack, jar dip, thinner box; "look at the unit price".
// payoff: the cereal box and its two labels — STICKER: WHAT YOU PAY / UNIT PRICE:
// WHAT YOU GET; the shopper picks by the unit price.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { type Beat, Headline, Person, win } from '../aimoney/common'
import { bump, Cereal, ChocBar, Jar, Magnifier, Rolls, S, Shelf, ShelfLabel, Sticker, Store, Trolley , pulse } from './kit'

const GROUND = 880
// # a tuna can
const Tuna: React.FC<{ x: number; y: number; s?: number; o?: number; small?: boolean }> = ({ x, y, s = 1, o = 1, small }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-46} y={small ? -46 : -58} width={92} height={small ? 46 : 58} rx={8} fill="#C9D3DE" /><rect x={-46} y={small ? -40 : -50} width={92} height={small ? 26 : 34} fill={S.sky} /><ellipse cx={0} cy={small ? -46 : -58} rx={46} ry={10} fill="#E3E9EF" /></g>
)
// # a simple, undetailed US silhouette (no individual states shown)
const USA: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-300 -110 L-120 -130 L60 -120 L150 -140 L240 -110 L300 -60 L280 -10 L230 20 L240 90 L190 70 L120 80 L60 120 L0 100 L-80 110 L-170 80 L-250 60 L-300 0 Z" fill="#DCEBF5" stroke={S.skyD} strokeWidth={6} strokeLinejoin="round" />
  </g>
)

const Spot: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const protect = c('s81:protect'), answer82 = c('s82:answer'), small82 = c('s82:small'), label82 = c('s82:label'), unit82 = c('s82:unit')
  const ounce83 = c('s83:ounce'), sheet83 = c('s83:sheet'), item83 = c('s83:item'), compare83 = c('s83:compare'), size83 = c('s83:size')
  const d16 = c('s84:16'), states84 = c('s84:states'), washington = c('s84:washington'), rules84 = c('s84:rules')
  const work = c('s85:work'), tuna = c('s86:tuna'), found86 = c('s86:found'), cut86 = c('s86:cut'), shrunken = c('s86:shrunken'), d30 = c('s86:30'), d84 = c('s86:84'), elsewhere = c('s86:elsewhere')
  const countries = c('s87:countries'), further = c('s87:further')
  const july = c('s88:july'), y2024 = c('s88:2024'), france = c('s88:france'), notice88 = c('s88:notice'), smaller88 = c('s88:smaller')
  const quantity = c('s89:quantity'), fell = c('s89:fell'), pay89 = c('s89:pay')
  const problem = c('s90:problem'), labels90 = c('s90:labels'), hard = c('s90:hard'), different = c('s90:different'), ways = c('s90:ways')
  const tells = c('s91:tells'), redesigned = c('s92:redesigned'), dip92 = c('s92:dip'), jar92 = c('s92:jar'), thinner92 = c('s92:thinner'), less92 = c('s92:less')
  const habit = c('s93:habit'), unit93 = c('s93:unit'), sticker93 = c('s93:sticker')
  const A = win(f, c('s81') - 20, d16), B = win(f, d16, countries), Cc = win(f, countries, tells), D = on(f, tells, 8)
  const shopper: Beat[] = [[0, 'idle', 'thinking'], [answer82, 'point', 'smiling'], [compare83, 'explain', 'smiling']]
  return (
    <g>
      <Stage id="sf-spot" frame={f} />
      <Store f={f} />
      <Headline f={f} lines={[[protect, 'HOW TO PROTECT YOURSELF', P.ink, 110], [unit82, 'THE UNIT PRICE', S.redD, 130], [compare83, 'COMPARE ANY SIZE', P.ink, 120], [d16, '16 STATES + DC: UNIT PRICE RULES', P.ink, 96],
        [tuna, 'A TUNA STUDY', P.ink, 120], [d30, '30–84% MORE CUT BACK', S.mintD, 110], [countries, 'OTHER COUNTRIES GO FURTHER', P.ink, 104], [france, 'FRANCE, SINCE JULY 2024', P.ink, 110],
        [problem, 'US LABELS: HARD TO READ', S.redD, 110], [tells, 'KNOW THE TELLS', P.ink, 120], [habit, 'UNIT PRICE, NOT STICKER PRICE', S.redD, 100]]} />

      {/* # A) the shelf label and its unit price */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="investorF" beats={shopper} x={260} y={GROUND} s={1.0} />
        <Shelf x={560} y={GROUND - 60} w={1200} rows={1} gap={320} o={on(f, answer82, 8)} />
        <g opacity={on(f, answer82, 8)}><Cereal x={780} y={GROUND - 60} s={0.8} oz="18 OZ" /><Cereal x={1180} y={GROUND - 60} s={0.8} h={0.9} oz="16 OZ" /><Rolls x={1560} y={GROUND - 60} s={0.55} n={3} tp /></g>
        {/* # the big label: price and the highlighted unit price */}
        <g opacity={on(f, label82, 8)}><ShelfLabel x={960} y={360} s={2.4 * pop(f, label82) * bump(f, small82, 0)} price="$4.99" unit={f >= ounce83 ? '31¢' : '28¢'} hi={on(f, unit82, 10)} /></g>
        <g opacity={on(f, ounce83, 8)}><Label x={1300} y={300} text={f >= item83 ? 'PER ITEM' : f >= sheet83 ? 'PER SHEET' : 'PER OUNCE'} size={52} font="Bebas Neue" color={S.redD} /></g>
        <g opacity={on(f, size83, 8)}><ShelfLabel x={780} y={GROUND + 40} s={0.85} price="$4.99" unit="28¢" hi={1} /><ShelfLabel x={1180} y={GROUND + 40} s={0.85} price="$4.99" unit="31¢" hi={1} /></g>
      </g>}

      {/* # B) the rules and the tuna study */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, tuna, 8)}><USA x={760} y={560} s={1.4 * pop(f, d16) * bump(f, states84, 0.04) * pulse(f, [c('s84:showing'), c('s84:prices')])} />
          <g opacity={on(f, washington, 8)}><Sticker x={1300} y={420} s={1.2 * pop(f, washington) * bump(f, rules84, 0.05)} text="16 + DC" /></g>
          <g opacity={on(f, work, 8)}><Sticker x={1500} y={640} s={pop(f, work)} text="WORKS?" color={S.mintD} /></g></g>
        <g opacity={on(f, tuna, 8)}>
          {[0, 1].map((r) => <g key={r}><Shelf x={360} y={r ? 560 : GROUND - 40} w={1200} rows={1} gap={300} />
            <Label x={300} y={(r ? 560 : GROUND - 40) - 120} text={r ? 'UNIT-PRICE STATES' : 'OTHER STATES'} size={36} font="Bebas Neue" color={S.ink2} anchor="end" o={r ? on(f, c('s86:states'), 8) * pulse(f, [c('s86:pricing'), c('s86:rules')], 0) : 1} />
            {Array.from({ length: 8 }, (_, k) => { const sm = k % 2 === 1, gone = r === 1 && sm ? on(f, cut86 + k * 2, 10) : r === 0 && sm && k === 7 ? on(f, cut86 + 10, 10) : 0
              return <g key={k} transform={`translate(0 ${-gone * 60})`} opacity={1 - gone}><Tuna x={460 + k * 140} y={r ? 560 : GROUND - 40} small={sm} s={1.0 * (sm ? bump(f, shrunken, 0.08) : 1)} /></g> })}</g>)}
          <g opacity={on(f, d84, 8)}><Sticker x={1660} y={420} s={pop(f, d84) * bump(f, elsewhere, 0.05)} text="30–84%" color={S.mintD} /></g>
        </g>
      </g>}

      {/* # C) France's notice; the US label problem */}
      {Cc > 0 && <g opacity={Cc}>
        <g opacity={1 - on(f, problem, 8)}>
          <g opacity={on(f, countries, 8)}><Cereal x={600} y={GROUND} s={1.2 * pop(f, countries) * bump(f, france, 0.05) * bump(f, smaller88, 0.04)} h={lerp(1, 0.9, on(f, smaller88, 16))} oz="450 G" /></g>
          <g opacity={on(f, notice88, 8)} transform={`translate(1220 560) scale(${pop(f, notice88) * pulse(f, [c('s88:price'), c('s88:unit'), c('s88:up'), c('s89:notice'), c('s90:gao'), c('s90:points')])})`}>
            <rect x={-300} y={-200} width={600} height={400} rx={20} fill="#FFFFFF" stroke={S.red} strokeWidth={10} />
            <rect x={-300} y={-200} width={600} height={80} rx={18} fill={S.red} /><Label x={0} y={-146} text="NOTICE" size={52} font="Bebas Neue" color="#FFFFFF" />
            <g opacity={on(f, quantity, 8)}><Label x={0} y={-40} text="QUANTITY: 500 G → 450 G" size={46} font="Bebas Neue" color={S.ink} /></g>
            <g opacity={on(f, pay89, 8)}><Label x={0} y={50} text="PRICE PER KG: +11%" size={46} font="Bebas Neue" color={S.redD} /></g>
            <Label x={0} y={150} text="(EXAMPLE)" size={30} font="Bebas Neue" color={S.ink2} />
          </g>
          <g opacity={on(f, y2024, 8)}><Sticker x={420} y={360} s={pop(f, y2024)} text="JULY 2024" color={S.skyD} /></g>
        </g>
        <g opacity={on(f, problem, 8)}>
          <g opacity={on(f, c('s90:prices'), 8)}><ShelfLabel x={560} y={560} s={1.4 * pop(f, c('s90:prices')) * bump(f, labels90, 0.06) * bump(f, c('s90:us'), 0.05)} price="$4.99" unit="¢/OZ" hi={0} /></g>
          <g transform="translate(960 560) scale(1.4)" opacity={on(f, hard, 8)}><rect x={-100} y={-44} width={200} height={88} rx={8} fill={S.tag} stroke={S.tagD} strokeWidth={4} /><Label x={-20} y={14} text="$4.99" size={46} font="Bebas Neue" color={S.ink} /><Label x={70} y={30} text="¢/100G" size={10} font="Bebas Neue" color={S.ink2} /></g>
          <g transform="translate(1360 560) scale(1.4)" opacity={on(f, different, 8)}><rect x={-100} y={-44} width={200} height={88} rx={8} fill="#FFFFFF" stroke={S.paperD} strokeWidth={4} /><Label x={0} y={14} text="$4.99" size={46} font="Bebas Neue" color={S.ink} /><Label x={0} y={36} text="UNIT: EACH" size={12} font="Bebas Neue" color={S.ink2} /></g>
          <g opacity={on(f, ways, 8)}><Label x={960} y={760} text="TINY · DIFFERENT UNITS · DIFFERENT LAYOUTS" size={40} font="Bebas Neue" color={S.redD} /></g>
        </g>
      </g>}

      {/* # D) the tells; the habit */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, habit, 8)}>
          <g opacity={on(f, redesigned, 8)}><Cereal x={460} y={GROUND} s={1.0 * pop(f, redesigned)} color={S.coral} oz="NEW LOOK!" /></g>
          <g opacity={on(f, dip92, 8)}><Jar x={900} y={GROUND} s={1.0 * pop(f, dip92) * pulse(f, [c('s93:where'), c('s93:notice')])} dip={on(f, jar92, 16)} cut={on(f, jar92 + 6, 8)} /></g>
          <g opacity={on(f, thinner92, 8)}><rect x={1300} y={GROUND - 300} width={lerp(110, 84, on(f, thinner92, 16))} height={300} rx={6} fill={S.sunD} /><rect x={1440} y={GROUND - 300} width={110} height={300} rx={6} fill="none" stroke={S.ink2} strokeWidth={4} strokeDasharray="12 8" /></g>
          <g opacity={on(f, less92, 8)}><Label x={960} y={GROUND + 64} text="SIGNS THAT LESS IS INSIDE" size={44} font="Bebas Neue" color={S.redD} /></g>
        </g>
        <g opacity={on(f, habit, 8)}>
          <Trolley x={420} y={GROUND} s={1.2} f={f} load={1} />
          <ShelfLabel x={1100} y={540} s={2.6 * pop(f, habit)} price="$4.99" unit="31¢" hi={on(f, unit93, 10)} />
          <g opacity={on(f, unit93, 8)}><Magnifier x={1330} y={560} s={0.9} /></g>
          <g opacity={on(f, sticker93, 8)}><Label x={1100} y={760} text="LOOK HERE, NOT THERE" size={44} font="Bebas Neue" color={S.redD} /></g>
        </g>
      </g>}
      <Vignette id="sf-spot" />
    </g>
  )
}

const BEATS = ["s81:protect", "s82:answer", "s82:small", "s82:label", "s82:unit", "s83:ounce", "s83:sheet", "s83:item", "s83:compare", "s83:size", "s84:16", "s84:states", "s84:washington", "s84:rules", "s85:work", "s86:tuna", "s86:cut", "s86:shrunken", "s86:84", "s86:elsewhere", "s87:countries", "s87:further", "s88:july", "s88:2024", "s88:france", "s88:notice", "s88:smaller", "s89:quantity", "s89:fell", "s89:pay", "s90:problem", "s90:labels", "s90:hard", "s90:different", "s90:ways", "s91:tells", "s92:redesigned", "s92:dip", "s92:jar", "s92:thinner", "s92:less", "s93:habit", "s93:unit", "s93:sticker", "s81", "s84:showing", "s84:prices", "s86:states", "s86:pricing", "s86:rules", "s88:price", "s88:unit", "s88:up", "s89:notice", "s90:gao", "s90:points", "s90:prices", "s90:us", "s93:where", "s93:notice"]
export const SF_SPOT = makePiece('sf-spot', 'Shrinkflation ch6: shopper and a shelf of 18 oz / 16 oz boxes; a giant shelf label whose unit price lights up (per ounce / sheet / item), 28¢ vs 31¢ labels compare sizes; a plain US silhouette with a 16 + DC sticker; two shelves of tuna cans, the small cans leave the unit-price states shelf (30–84%); France: a shrinking pack and a red NOTICE card (example: 500 G → 450 G, price per kg +11%); three different hard-to-read US labels; the tells: new-look pack, jar dip, thinner box; a giant label with the unit price under a magnifier', {
  mood: 'light', Component: Spot, beats: BEATS,
  sfx: [['s82:unit', 'pop', 0.2], ['s86:84', 'pop', 0.2], ['s88:notice', 'whoosh', 0.2]],
})

