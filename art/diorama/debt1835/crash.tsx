// ============================================================
// db-crash (s59–s69, dark): the Panic of 1837. A) New York's bank shuts its
// doors (CLOSED) on a customer holding a note; three more banks shut one by one;
// the 1837 page and a worried crowd.  B) land plots wither with falling arrows,
// the years run 1837 → 1843; revenue columns $50M (1836) vs about half (1837);
// four payment sacks, the fourth crossed out.  C) the Treasury borrows again: a
// new bond, the pile grows to $3.3M (1838) and $33M (1843) beside the tiny 1835
// sheet (almost ×1,000); other causes: a British ship and a falling cotton price;
// the land boom fades.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { Mini } from '../../rig/Mini'
import { Headline, win } from '../aimoney/common'
import { Bank, Bond, BondPile, bump, C, Column, Defs, Note, Plots, Sack, Ship, Street, Treasury, YearPage , Backdrop } from './kit'

const GROUND = 880
// # a red cross that fits the thing it marks (owner r68: comfortable size, never tiny or huge)
const Cross: React.FC<{ x: number; y: number; o: number; r?: number }> = ({ x, y, o, r = 70 }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${0.8 + 0.2 * o})`}><path d={`M${-r} ${-r} L${r} ${r} M${r} ${-r} L${-r} ${r}`} stroke="#FFFFFF" strokeWidth={r * 0.34} strokeLinecap="round" opacity={0.9} /><path d={`M${-r} ${-r} L${r} ${r} M${r} ${-r} L${-r} ${r}`} stroke={C.brick} strokeWidth={r * 0.22} strokeLinecap="round" /></g>
)
// # a cotton bale with a price tag whose arrow points down
const Cotton: React.FC<{ x: number; y: number; s?: number; o?: number; fall: number }> = ({ x, y, s = 1, o = 1, fall }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-150} width={220} height={150} rx={20} fill="#F3EFE6" stroke={C.stoneD} strokeWidth={6} />
    {[-70, 0, 70].map((bx) => <rect key={bx} x={bx - 6} y={-150} width={12} height={150} fill={C.wood} />)}
    <g transform={`translate(150 ${-200 + fall * 60})`}><rect x={-80} y={-36} width={160} height={66} rx={10} fill={C.parch} stroke={C.goldD} strokeWidth={4} /><Label x={0} y={14} text="PRICE ▼" size={40} font="Bebas Neue" color={C.brick} /></g>
  </g>
)

const Crash: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const may = c('s59:may'), york = c('s59:york'), stopped = c('s59:stopped'), paper59 = c('s59:paper'), gold59 = c('s59:gold')
  const weeks = c('s60:weeks'), cities = c('s60:cities'), followed = c('s60:followed')
  const known = c('s61:known'), panic = c('s61:panic'), y1837 = c('s61:1837')
  const land62 = c('s62:land'), collapsed = c('s62:collapsed'), failed = c('s62:failed'), depression = c('s62:depression'), until = c('s62:until')
  const took = c('s63:took'), d50 = c('s63:50'), got = c('s63:got'), half = c('s63:half')
  const fourth = c('s64:fourth'), states64 = c('s64:states'), never = c('s64:never')
  const less = c('s65:less'), borrow65 = c('s65:borrow'), again65 = c('s65:again')
  const start66 = c('s66:start'), y1838 = c('s66:1838'), d3 = c('s66:3')
  const it67 = c('s67:it'), d33 = c('s67:33'), thousand = c('s67:thousand'), left67 = c('s67:left')
  const historians = c('s68:historians'), britain = c('s68:britain'), cotton = c('s68:cotton'), played = c('s68:played')
  const boom69 = c('s69:boom'), last69 = c('s69:last'), pay69 = c('s69:pay')
  const A = win(f, c('s59') - 20, land62), B1 = win(f, land62, c('s63')), B2 = win(f, c('s63'), fourth), B3 = win(f, fourth, less), D = on(f, less, 8)
  return (
    <g>
      <Defs />
      <Stage id="db-crash" frame={f} />
      <Headline f={f} lines={[[c('s59:1837'), 'MAY 1837: NEW YORK BANKS STOP PAYING COINS', C.coral, 84], [weeks, 'OTHER CITIES FOLLOW', P.ink, 110], [known, 'THE PANIC OF 1837', C.coral, 120],
        [land62, 'LAND PRICES COLLAPSE', P.ink, 110], [c('s62:1843'), 'A DEPRESSION UNTIL 1843', P.ink, 104], [took, 'GOVERNMENT INCOME', P.ink, 110], [half, 'GOVERNMENT INCOME HALVES', P.ink, 104], [fourth, 'THE 4TH PAYMENT', C.coral, 110], [never, 'THE 4TH PAYMENT: NEVER SENT', C.coral, 100],
        [less, 'BORROWING AGAIN', P.ink, 110], [c('s67:1843'), 'BY 1843', C.coral, 120], [d33, '1843: ABOUT $33 MILLION', C.coral, 104], [historians, 'OTHER CAUSES TOO', P.ink, 110], [boom69, 'THE BOOM DID NOT LAST', C.glow, 110]]} />

      {/* # A) banks shut, one city after another */}
      {A > 0 && <g opacity={A}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        <Bank x={480} y={GROUND} s={1.0 * bump(f, york, 0.04)} fill={0.05} shut={on(f, stopped, 10)} name="NEW YORK BANK" />
        <g opacity={on(f, paper59, 8)}><Mini look="buyer" x={720} y={GROUND} scale={0.95} frame={f} seed={7} mood={f >= stopped + 6 ? 'sad' : 'neutral'} />
          <g opacity={1 - on(f, panic, 8)}><Note x={790} y={790} s={0.42} r={-12} /></g></g>
        <g opacity={on(f, gold59, 8) * (1 - on(f, weeks, 8))}><Label x={720} y={GROUND + 60} text="NO COINS FOR NOTES" size={44} font="Bebas Neue" color={C.coral} /></g>
        {[0, 1, 2].map((k) => { const at = [cities, followed, followed + 10][k]
          return <g key={k} opacity={on(f, weeks + k * 4, 8)}><Bank x={1080 + k * 290} y={GROUND} s={0.62} fill={0.1} shut={on(f, at, 10)} cut={false} name="BANK" /></g> })}
        <g opacity={on(f, panic, 8)}>{/* # two more worried people join the first customer in the open space beside the New York bank */}
          {[0, 1].map((k) => <g key={k} opacity={on(f, panic + k * 4, 6)}><Mini look={['worker', 'owner'][k]} x={820 + k * 90} y={GROUND} scale={0.75} frame={f} seed={k + 20} mood="sad" /></g>)}</g>
        <g opacity={on(f, y1837, 8)}><YearPage x={960} y={360} s={0.9 * pop(f, y1837)} year="1837" top="PANIC" /></g>
      </g>}

      {/* # B1) land withers, banks fail, the years run to 1843 */}
      {B1 > 0 && <g opacity={B1}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        <Plots x={560} y={760} s={1.0} sold={1 - on(f, collapsed, 20)} />
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, collapsed + k * 4, 6)} transform={`translate(${380 + k * 180} ${lerp(560, 620, on(f, collapsed + k * 4, 20))})`}><path d="M0 -40 L0 30 M-24 8 L0 34 L24 8" stroke={C.coral} strokeWidth={10} fill="none" strokeLinecap="round" /></g>)}
        <g opacity={on(f, failed, 8)}><Bank x={1180} y={GROUND} s={0.6 * pop(f, failed)} fill={0} shut={1} cut={false} name="BANK" /><Bank x={1450} y={GROUND} s={0.6 * pop(f, failed + 5)} fill={0} shut={1} cut={false} name="BANK" /></g>
        <g opacity={on(f, depression, 8)}><YearPage x={1700} y={520} s={0.9 * pop(f, depression)} year={String(Math.round(lerp(1837, 1843, on(f, until, 26))))} top="DEPRESSION" /></g>
      </g>}

      {/* # B2) government income: 1836 vs 1837 */}
      {B2 > 0 && <g opacity={B2}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        <Treasury x={500} y={GROUND} s={0.75 * pop(f, c('s63')) * bump(f, c('s63:in#3'), 0.05)} dark />
        <Column x={1150} y={GROUND - 10} h={on(f, d50, 16) * 400} w={160} />
        <g opacity={on(f, d50, 8)}><Label x={1150} y={GROUND + 60} text="1836: ≈ $50M" size={48} font="Bebas Neue" color={C.glow} /></g>
        <g opacity={on(f, got, 8)}><Column x={1500} y={GROUND - 10} h={on(f, half, 16) * 200} w={160} color={C.coral} />
          <g opacity={on(f, half, 8)}><Label x={1500} y={GROUND + 60} text="1837: ≈ HALF" size={48} font="Bebas Neue" color={C.coral} /></g></g>
      </g>}

      {/* # B3) the four payments: the fourth never goes */}
      {B3 > 0 && <g opacity={B3}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, fourth - 2 + k * 3, 6) * (k === 3 ? 1 - 0.55 * on(f, never, 10) : 1)}><Sack x={480 + k * 320} y={GROUND} s={1.0 * (k === 3 ? bump(f, fourth, 0.08) : 1)} label={String(k + 1)} />
          <Label x={480 + k * 320} y={GROUND + 60} text={['SENT', 'SENT', 'SENT', 'OCT 1837'][k]} size={40} font="Bebas Neue" color={k === 3 ? C.coral : C.mint} /></g>)}
        <Cross x={1440} y={GROUND - 70} o={on(f, never, 8)} r={70} />
        <g opacity={on(f, states64, 8)}><Label x={960} y={680} text="TO THE STATES" size={52} font="Bebas Neue" color={C.glow} /></g>
      </g>}

      {/* # D) borrowing again; the pile grows back; other causes; the boom fades */}
      {D > 0 && <g opacity={D}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        <Treasury x={440} y={GROUND} s={0.75 * bump(f, borrow65, 0.04) * bump(f, c('s65:government'), 0.04)} dark door={on(f, less, 10)} />
        <g opacity={on(f, borrow65, 8) * (1 - on(f, start66, 8))}><Bond x={900} y={560} s={1.0 * pop(f, borrow65) * bump(f, again65, 0.06)} amount="NEW" /></g>
        <g opacity={on(f, start66, 8) * (1 - on(f, historians, 10))}>
          {(() => { const n = Math.round(lerp(2, 6, on(f, d3, 14)) + on(f, d33, 30) * 16); return <g transform={`translate(1100 ${GROUND}) scale(${bump(f, thousand, 0.05) * bump(f, c('s67:by'), 0.05)})`}><BondPile x={0} y={0} n={n} /></g> })()}
          <g opacity={on(f, d3, 8) * (1 - on(f, it67, 8))}><Label x={1100} y={GROUND + 60} text="1838: $3.3 MILLION" size={48} font="Bebas Neue" color={C.glow} /></g>
          <g opacity={on(f, d33, 8)}><Label x={1100} y={GROUND + 60} text="1843: $33 MILLION" size={48} font="Bebas Neue" color={C.coral} /></g>
          <g opacity={on(f, y1838, 8)}><YearPage x={1100} y={300} s={0.7} year={f >= c('s67:1843') ? '1843' : '1838'} top={f >= c('s67:1843') ? 'BY' : 'START OF'} /></g>
          {/* # the 1835 sheet, tiny, beside it */}
          <g opacity={on(f, left67, 8)}><BondPile x={1560} y={GROUND} n={1} /><Label x={1560} y={GROUND + 60} text="1835: $33,733" size={44} font="Bebas Neue" color={C.glow} />
            <Label x={1330} y={600} text="≈ ×1,000" size={64} font="Bebas Neue" color={C.coral} o={on(f, thousand, 8)} /></g>
        </g>
        {/* # historians argue: two readers appear, then the causes: a British ship, a falling cotton price */}
        <g opacity={on(f, c('s68:argue'), 8) * (1 - on(f, britain, 8))}><Mini look="investor" x={860} y={GROUND} scale={0.9} frame={f} seed={51} /><g opacity={on(f, c('s68:caused'), 8)}><Mini look="owner" x={1080} y={GROUND} scale={0.9} frame={f} seed={52} /></g>
          <g opacity={on(f, c('s68:panic'), 8)}><Label x={970} y={GROUND + 60} text="WHAT CAUSED IT?" size={44} font="Bebas Neue" color={C.glow} /></g></g>
        <g opacity={on(f, britain + 8, 8) * (1 - on(f, boom69, 8))}><Ship x={1000} y={GROUND - 30} s={0.75} f={f} cargo={0} /><Label x={1000} y={GROUND + 60} text="BRITAIN" size={44} font="Bebas Neue" color={C.glow} /></g>
        <g opacity={on(f, cotton, 8) * (1 - on(f, boom69, 8))}><Cotton x={1500} y={GROUND} s={0.9 * pop(f, cotton)} fall={on(f, played, 20)} /><Label x={1500} y={GROUND + 60} text="COTTON" size={44} font="Bebas Neue" color={C.glow} /></g>
        <g opacity={on(f, boom69 + 8, 8)}><Plots x={1250} y={760} s={0.95} sold={lerp(1, 0, on(f, last69, 24))} />
          <g opacity={on(f, pay69, 8)}><Label x={1250} y={600} text="THE LAND BOOM" size={52} font="Bebas Neue" color={C.glow} /></g></g>
      </g>}
      <Vignette id="db-crash" />
    </g>
  )
}

const BEATS = ["s59:may", "s59:york", "s59:stopped", "s59:paper", "s59:gold", "s60:weeks", "s60:cities", "s60:followed", "s61:known", "s61:panic", "s61:1837", "s62:land", "s62:collapsed", "s62:failed", "s62:depression", "s62:until", "s63:took", "s63:50", "s63:got", "s63:half", "s64:fourth", "s64:states", "s64:never", "s65:less", "s65:borrow", "s65:again", "s66:start", "s66:1838", "s66:3", "s67:it", "s67:33", "s67:thousand", "s67:left", "s68:historians", "s68:britain", "s68:cotton", "s68:played", "s69:boom", "s69:last", "s69:pay", "s59", "s63", "s63:in#3", "s65:government", "s67:by", "s67:1843", "s68:argue", "s68:caused", "s68:panic"]
export const DB_CRASH = makePiece('db-crash', 'Debt 1835 ch4 (night): New York bank shuts on a customer with a note; three more banks close; 1837 page and worried crowd; land withers with falling arrows, banks fail, years run 1837→1843; revenue columns $50M vs about half; four payment sacks, the 4th crossed out; Treasury borrows again (new bond), pile grows $3.3M (1838) → $33M (1843) beside the 1835 sheet (≈×1,000); British ship and falling cotton price; land boom fades', {
  mood: 'dark', Component: Crash, beats: BEATS,
  sfx: [['s59:stopped', 'thud', 0.3], ['s61:panic', 'whoosh', 0.2], ['s64:never', 'click', 0.2], ['s67:thousand', 'pop', 0.2]],
})
