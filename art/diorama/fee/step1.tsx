// ---------------------------------------------------------------- s9–s22: step one — a small cut, every year.
// A) The saver's jar sits at a fund house; the fund's manager scoops a slice every year (calendar flips) — the scoop is
//    tagged EXPENSE RATIO; then an adviser steps in with a second scoop, tagged ADVISER FEE.
// B) $10,000 as 100 coins (each $100). The fee is 1%: the scoop lifts exactly one coin ($100) out; 99 are left ($9,900).
//    A small market arrow goes up, then down — the scoop still takes its coin both times.
// C) "You never even get a bill": the hero crosses his arms and shakes his head next to an envelope. Instead the fund's
//    coin tank drips a little at a time; thin slices come off the top through the year and stack into one 1% coin.
// D) "Feels like nothing": the 100 coins with one missing. "Compare it with what your money earns": 7 growth coins rise on
//    top (7%); "not with what you have": the hero says no to the big grid. The scoop takes one of the 7: "7 becomes 6".
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Bill as Envelope, Calendar, Coin, hand, Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { FundHouse, SaverJar, Scoop, Spot } from './kit'

const GROUND = 920
// # 100 coins in a 10 × 10 grid; gone = how many are missing from the end; dim fades them
const CoinGrid: React.FC<{ x: number; y: number; gone?: number; s?: number; o?: number; dim?: number; lift?: number }> = ({ x, y, gone = 0, s = 1, o = 1, dim = 0, lift = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: 100 }, (_, k) => {
      const r = Math.floor(k / 10), cc = k % 10, isGone = k >= 100 - gone, isTop = k === 99
      return <g key={k} transform={`translate(${cc * 46} ${r * 46 - (isTop ? lift : 0)})`} opacity={isGone && !isTop ? 0 : 1 - 0.5 * dim}>
        <circle r={20} fill={isTop && lift > 0 ? P.coral : P.gold} stroke={P.goldD} strokeWidth={3} />
      </g>
    })}
  </g>
)

const Step1: React.FC<PieceProps> = ({ f, c }) => {
  const taken9 = c('s9:taken'), every9 = c('s9:every')
  const invest = c('s10:invest'), fund10 = c('s10:fund'), company = c('s10:company'), takes10 = c('s10:takes'), expense = c('s10:expense')
  const adviser = c('s11:adviser'), manages = c('s11:manages'), take11 = c('s11:take'), too = c('s11:too')
  const example12 = c('s12:example'), d10k = c('s13:10000'), d1 = c('s13:1')
  const takes14 = c('s14:takes'), d100 = c('s14:100')
  const d9900 = c('s15:9900'), grow15 = c('s15:grow')
  const taken16 = c('s16:taken'), up16 = c('s16:up'), down16 = c('s16:down')
  const s17 = c('s17'), never17 = c('s17:never'), bill17 = c('s17:bill')
  const paid18 = c('s18:paid'), money18 = c('s18:money'), quietly = c('s18:quietly'), time18 = c('s18:time')
  const slice19 = c('s19:slice'), value19 = c('s19:value'), year19 = c('s19:year'), slices19 = c('s19:slices'), add19 = c('s19:add'), one19 = c('s19:1')
  const d100b = c('s20:100')
  const compare = c('s21:compare'), earns = c('s21:earns'), not21 = c('s21:not'), have21 = c('s21:have')
  const grow22 = c('s22:grow'), seven22 = c('s22:7'), seventh = c('s22:seventh'), becomes = c('s22:becomes'), six = c('s22:6')
  const AB = example12 - 4, BC = s17 - 4, CD = d100b - 4
  const A = win(f, taken9, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 8)
  const mgr: Beat[] = [[0, 'idle', 'smug'], [takes10, 'reachDown', 'smug'], [expense, 'hold', 'smug']]
  return (
    <g>
      <Stage id="fe-step1" frame={f} />
      <Spot f={f} at={c("s9:cut")} x={800} y={700} rx={200} ry={200} />
      <Spot f={f} at={c("s22:fee")} x={1330} y={540} rx={420} ry={140} />
      <Spot f={f} at={c("s14:10000")} x={800} y={480} rx={320} ry={260} />
      <Spot f={f} at={c("s22:year")} x={1330} y={540} rx={420} ry={140} />
      <Headline f={f} lines={[[expense, 'THE EXPENSE RATIO', P.ink, 100], [adviser, '', P.ink], [d10k, '$10,000', P.ink, 120], [d1, '$10,000 · FEE 1%', P.ink, 110], [d100, '1% OF $10,000 = $100', P.coralInk, 104], [d9900, '$9,900 LEFT', P.ink, 110], [s17, '', P.ink], [d100b, '$100 OF $10,000', P.ink, 104], [seven22, '7% GROWTH', P.mintInk, 110], [seventh, 'ONE SEVENTH OF THE GROWTH', P.coralInk, 100], [six, 'YOUR 7% BECOMES 6%', P.coralInk, 104]]} />

      {/* # A) the fund's scoop, every year; then the adviser's */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={on(f, fund10, 10)}><FundHouse x={360} y={GROUND} s={0.9} /></g>
        <SaverJar x={800} y={GROUND} w={320} h={440} fill={0.7} label="YOUR SAVINGS" cut={on(f, taken9, 8) * (1 - on(f, taken9 + 20, 8)) + on(f, takes10, 8) * (1 - on(f, takes10 + 20, 8)) + on(f, take11, 8) * (1 - on(f, take11 + 20, 8))} />
        <g opacity={on(f, every9, 8)}><Calendar x={800} y={300} text="YEAR" s={1.1} flip={((f - every9) % 10) / 10} /></g>
        {/* # the fund manager with the scoop */}
        <g opacity={on(f, company, 10)}>
          <Person f={f} who="owner" beats={mgr} x={1080} y={GROUND} s={0.78} />
          {(() => { const hp = hand(f, mgr, 1080, GROUND, 0.78); return <g><Scoop x={hp.x} y={hp.y} s={0.8} r={-30 + 40 * on(f, takes10, 10)} full={on(f, takes10 + 6, 8)} />
            <g opacity={on(f, expense, 8)}><rect x={955} y={GROUND - 690} width={250} height={56} rx={28} fill={P.card} stroke={P.edge} strokeWidth={3} /><text x={1080} y={GROUND - 650} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>EXPENSE RATIO</text></g></g> })()}
        </g>
        {/* # the adviser with a second scoop */}
        <g opacity={on(f, adviser, 10)}>
          {(() => { const ab: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 12], [manages, 'explain', 'smiling'], [take11, 'reachDown', 'smug'], [too, 'hold', 'smug']]; const ax = lerp(1950, 1660, on(f, adviser, 24)), hp = hand(f, ab, ax, GROUND, 0.78)
            return <g><Person f={f} who="investorF" beats={ab} x={ax} y={GROUND} s={0.78} />
              <g opacity={on(f, take11, 8)}><Scoop x={hp.x} y={hp.y} s={0.8} r={-20} full={on(f, take11 + 6, 8)} /></g>
              <g opacity={on(f, too, 8)}><rect x={ax - 130} y={GROUND - 640} width={260} height={56} rx={28} fill={P.card} stroke={P.edge} strokeWidth={3} /><text x={ax} y={GROUND - 600} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>ADVISER FEE</text></g></g> })()}
        </g>
      </g>}

      {/* # B) $10,000 = 100 coins; the fee lifts one ($100); 99 left; up or down, it still takes one */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, d10k, 10)}><CoinGrid x={560} y={250} s={1.32} gone={f >= d9900 ? 1 : 0} lift={on(f, takes14, 14) * 60 * (1 - on(f, d9900, 8))} /></g>
        {/* # the scoop carries the one coin away */}
        <g opacity={on(f, takes14, 8)}>
          <Person f={f} who="owner" beats={[[0, 'idle', 'smug'], [takes14, 'reachUp', 'smug'], [d100, 'holdUp', 'smug'], [taken16, 'hold', 'smug']]} x={1560} y={GROUND} s={0.78} />
          {f >= d100 && <Coin x={lerp(1106, 1480, on(f, d100, 16))} y={lerp(717, 420, on(f, d100, 16))} s={1.1} text="$" />}
          <g opacity={on(f, d100, 8)}><Label x={1480} y={350} text="$100" size={64} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        {/* # the market arrow: up, then down — the coin is taken either way */}
        <g opacity={on(f, up16, 8)} transform="translate(290 560) scale(1.3)">
          <rect x={-140} y={-170} width={280} height={300} rx={18} fill={P.card} stroke={P.edge} strokeWidth={3} />
          <path d={`M-100 80 L-20 20 L40 50 L${lerp(40, 110, on(f, up16, 12))} ${lerp(50, -110, on(f, up16, 12)) + lerp(0, 220, on(f, down16, 14))}`} fill="none" stroke={f >= down16 ? P.coral : P.mint} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {[up16 + 10, down16 + 10].map((a, k) => { const t = on(f, a, 16); return f >= a ? <Coin key={k} x={lerp(1106, 1480, t)} y={lerp(717, 420, t)} s={1.0} o={1 - on(f, a + 16, 6)} /> : null })}
      </g>}

      {/* # C) no bill: the hero says no; the fund's tank drips; thin slices add up to one 1% coin */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={on(f, s17, 8) * (1 - on(f, paid18, 10))}>
          <Envelope x={760} y={GROUND - 330} s={1.2} r={-6} text="BILL" />
          <Person f={f} who="hero" beats={[[0, 'point', 'neutral'], [never17, 'crossNoA', 'neutral', 'crossNoB', 10], [bill17 + 12, 'idle', 'neutral']]} x={1120} y={GROUND} s={0.8} />
        </g>
        <g opacity={on(f, paid18, 10)}>
          <FundHouse x={420} y={GROUND} s={0.9} />
          {/* # the fund's money tank; a tap drips a little at a time */}
          <g transform={`translate(860 ${GROUND - 20})`}>
            <rect x={-150} y={-420} width={300} height={420} rx={24} fill="#DDEBF7" opacity={0.5} stroke="#A9C4DE" strokeWidth={6} />
            <rect x={-136} y={-380} width={272} height={366} rx={18} fill={P.gold} />
            <rect x={150} y={-60} width={90} height={20} rx={8} fill="#8A97AA" />
            {f >= quietly && Array.from({ length: 3 }, (_, k) => { const ph = ((f - quietly) / 24 + k / 3) % 1; return <ellipse key={k} cx={240} cy={-40 + ph * 120} rx={16} ry={8} fill={P.gold} stroke={P.goldD} strokeWidth={3} opacity={1 - ph} /> })}
          </g>
          <g opacity={on(f, money18, 8)}><Label x={860} y={GROUND + 70} text="THE FUND'S OWN MONEY" size={48} font="Bebas Neue" color={P.ink} /></g>
          {/* # thin slices peel off and stack into one 1% coin */}
          <g opacity={on(f, slice19, 8)}>
            {Array.from({ length: 12 }, (_, k) => { const at = slice19 + k * 9, t = on(f, at, 14); return f >= at ? <ellipse key={k} cx={lerp(860, 1480, t)} cy={lerp(GROUND - 400, GROUND - 40 - k * 9, t) - Math.sin(t * Math.PI) * 80} rx={44} ry={7} fill={P.coral} opacity={1 - on(f, add19 + 10, 8)} /> : null })}
            <g opacity={on(f, year19, 8)}><Calendar x={1480} y={330} text="1 YEAR" s={1.0} /></g>
            <g opacity={on(f, add19, 10)} transform={`translate(1480 ${GROUND - 120}) scale(${pop(f, add19)})`}><Coin x={0} y={0} s={2.0} text="1%" /></g>
          </g>
        </g>
      </g>}

      {/* # D) feels like nothing — until you compare it with what you earn: 7 growth coins, the fee takes 1 */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <CoinGrid x={300} y={360} s={0.85} gone={1} dim={on(f, compare, 10) * 0.6} />
        {/* # what it earns: 7 growth coins rise in a row on the right */}
        {Array.from({ length: 7 }, (_, k) => {
          const at = earns + k * 3, take = k === 6 ? on(f, seventh, 14) : 0
          return <g key={k} opacity={on(f, at, 8)} transform={`translate(${1000 + k * 110} ${GROUND - 380 - take * 200}) scale(${pop(f, at)})`}>
            <circle r={48} fill={k === 6 && f >= seventh ? P.coral : P.mint} stroke={k === 6 && f >= seventh ? P.coralD : '#1E9A63'} strokeWidth={5} />
            <text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{k === 6 && f >= seventh ? 'FEE' : `${k + 1}%`}</text>
          </g>
        })}
        <g opacity={on(f, earns, 8)}><Label x={1330} y={GROUND - 250} text="WHAT IT EARNS" size={52} font="Bebas Neue" color={P.mintInk} /></g>
        {/* # "not with what you have": the hero says no to the big pile */}
        <g opacity={on(f, not21 - 6, 8) * (1 - on(f, grow22, 10))}><Person f={f} who="hero" beats={[[0, 'point', 'neutral'], [not21, 'crossNoA', 'neutral', 'crossNoB', 10], [have21 + 16, 'idle', 'neutral']]} x={830} y={GROUND} s={0.62} /></g>
      </g>}
      <Vignette id="fe-step1" />
    </g>
  )
}

const BEATS = ['s9:taken', 's9:every', 's10:invest', 's10:fund', 's10:company', 's10:takes', 's10:expense', 's11:adviser', 's11:manages', 's11:take', 's11:too', 's12:example', 's13:10000', 's13:1', 's14:takes', 's14:100', 's15:9900', 's15:grow', 's16:taken', 's16:up', 's16:down', 's17', 's17:never', 's17:bill', 's18:paid', 's18:money', 's18:quietly', 's19:slice', 's19:value', 's19:year', 's19:slices', 's19:add', 's20:100', 's20:nothing', 's21:compare', 's21:earns', 's21:not', 's21:have', 's22:grow', 's22:7', 's22:seventh', 's22:becomes', 's22:6', "s14:10000", "s22:year", "s9:cut", "s22:fee"]
export const FE_STEP1 = makePiece('fe-step1', 'Fee long step one: the fund scoop (expense ratio) and the adviser scoop; $10,000 as 100 coins, 1% lifts one ($100), 99 left, up or down; no bill (hero says no), the tank drips, slices add up to 1%; compare with what it earns: 7 becomes 6', {
  mood: 'light', Component: Step1, beats: BEATS,
  sfx: [['s9:taken', 'swish', 0.25], ['s10:expense', 'pop', 0.25], ['s11:take', 'swish', 0.25], ['s13:10000', 'cash', 0.3], ['s14:100', 'coin', 0.35], ['s16:up', 'riser', 0.2], ['s16:down', 'swish', 0.2], ['s17:never', 'swish', 0.25], ['s19:add', 'ding', 0.3], ['s22:seventh', 'swish', 0.3], ['s22:6', 'thud', 0.3]] })
