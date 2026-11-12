// ---------------------------------------------------------------- s18–s28: step two, mutual funds (cream).
// A) The copper pot labelled MUTUAL FUND; a bar of all US fund money ($45T) fills its biggest part: $31 TRILLION.
// B) Sam buys: another investor appears and is crossed out — Sam's bill goes straight into the fund's pot and a
//    share ticket comes back; selling sends the ticket back and the money returns. A wall clock: one price a day —
//    at the close it rings, the fund adds up what it owns, divides by the shares, and a NAV price tag drops. An order
//    placed at 10 a.m. shows "?" until the clock runs to the end of the day.
// C) Two columns: GOOD (simple, everywhere, $14.7T of retirement savings, auto-invest monthly) and DOWNSIDES
//    (often actively managed → higher fees, minimums, a surprise tax bill even without selling); ACTIVELY MANAGED
//    glows as the bridge to step three.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Doc, Headline, Label, Person, Stat, Tick, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { DollarBill, NoMark, Ticket } from '../bank/kit'
import { Tag } from '../money4/kit'
import { DayClock, Pot } from './kit'

const GROUND = 930
const K = {
  mutual18: 's18:mutual', oldest: 's18:oldest', biggest: 's18:biggest', type18: 's18:type',
  exactly: 's19:exactly', pot19: 's19:pot', y2025: 's19:2025', held19: 's19:held', k31: 's19:31', trillion19: 's19:trillion',
  buy20: 's20:buy', another: 's20:another', investor20: 's20:investor', straight: 's20:straight', fund20: 's20:fund', sell20: 's20:sell', buys20: 's20:buys', shares20: 's20:shares', back20: 's20:back',
  one21: 's21:one', price21: 's21:price', day21: 's21:day', after21: 's21:after', closes: 's21:closes', adds: 's21:adds', everything: 's21:everything', divides: 's21:divides', number21: 's21:number', price21b: 's21:price#2', net: 's21:net', value: 's21:value', nav: 's21:nav',
  place: 's22:place', order: 's22:order', k10: 's22:10', morning: 's22:morning', know: 's22:know', exact: 's22:exact', end22: 's22:end', day22: 's22:day',
  good23: 's23:good', simple23: 's23:simple', everywhere: 's23:everywhere',
  big24: 's24:big', retirement: 's24:retirement', k14: 's24:14', trillion24: 's24:trillion', americans: 's24:americans', savings: 's24:savings', sits: 's24:sits',
  set25: 's25:set', fixed: 's25:fixed', automatically: 's25:automatically', every25: 's25:every', month: 's25:month',
  downsides: 's26:downsides', many26: 's26:many', actively26: 's26:actively', usually26: 's26:usually', higher: 's26:higher', fees26: 's26:fees',
  minimum: 's27:minimum', investment27: 's27:investment', regular: 's27:regular', taxable: 's27:taxable', account27: 's27:account', mutual27: 's27:mutual', tax: 's27:tax', bill: 's27:bill', even27: 's27:even', didnt: "s27:didn't", anything27: 's27:anything',
  brings: 's28:brings', word: 's28:word', actively28: 's28:actively', managed28: 's28:managed',
}
type Key = keyof typeof K

const Mutual: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.buy20 - 8, BC = q.good23 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const sBeats: Beat[] = [[AB, 'idle', 'neutral'], [q.buy20, 'holdUp', 'smiling'], [q.straight, 'offer', 'smiling'], [q.sell20, 'receive', 'smiling'], [q.one21, 'idle', 'neutral'], [q.order, 'point', 'neutral'], [q.know, 'shrug', 'thinking'], [q.day22, 'nodA', 'smiling']]
  const mBeats: Beat[] = [[AB, 'idle', 'smiling'], [q.fund20, 'receive', 'smiling'], [q.buys20, 'offer', 'smiling'], [q.adds, 'countA', 'thinking', 'countB'], [q.net, 'present', 'smiling']]
  // # clock: 10 a.m. most of the time; runs to 4 p.m. at "closes" and again from "morning" to "end of the day"
  const hour = f < q.morning ? lerp(10, 16, span(f, q.after21, q.closes + 10)) : lerp(10, 16, span(f, q.exact, q.day22 + 6))
  const ring = Math.max(win(f, q.closes, q.closes + 30), win(f, q.day22, q.day22 + 30))
  const billIn = fly(f, q.straight, [330, 600], [1160, 650], 20, 160), ticketBack = fly(f, q.fund20 + 10, [1160, 600], [360, 560], 20, 160)
  const ticketOut = fly(f, q.sell20, [360, 560], [1160, 620], 18, 140), cashBack = fly(f, q.buys20, [1160, 620], [360, 600], 20, 160)
  const navO = on(f, q.net, 10), qMark = win(f, q.know, q.day22, 6)
  const goods: [number, string][] = [[q.simple23, 'SIMPLE'], [q.everywhere, 'EVERYWHERE'], [q.retirement, 'BIG IN RETIREMENT ACCOUNTS'], [q.automatically, 'AUTO-INVEST EVERY MONTH']]
  const bads: [number, string][] = [[q.actively26, 'OFTEN ACTIVELY MANAGED'], [q.higher, 'USUALLY HIGHER FEES'], [q.minimum, 'SOME HAVE MINIMUMS'], [q.tax, 'SURPRISE TAX BILLS']]
  return (
    <g>
      <Stage id="fd-mutual" frame={f} />
      {/* # A) the biggest pot: $31T of $45T */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${-14 * pop(f, q.biggest, 14)})`}><Pot x={520} y={GROUND} s={0.9 + 0.15 * on(f, q.biggest, 14)} o={on(f, q.mutual18, 10)} fill={0.85} label="MUTUAL FUND" col="#2A8FD0" glow={win(f, q.pot19, q.pot19 + 30)} /></g>
        <g opacity={on(f, q.y2025, 10)}>
          <Tag x={1350} y={330} t="US FUNDS, END OF 2025" r={-3} />
          <rect x={1000} y={430} width={700} height={90} rx={16} fill={P.card} stroke={P.edge} strokeWidth={3} />
          <rect x={1000} y={430} width={700 * (31.4 / 45.1) * on(f, q.k31, 24)} height={90} rx={16} fill="#2A8FD0" />
          <Label x={1350} y={580} text="ALL US FUNDS: $45 TRILLION" size={38} font="Bebas Neue" color={P.ink2} />
        </g>
        <g opacity={on(f, q.k31, 10)} transform={`translate(0 ${-12 * pop(f, q.trillion19, 14)})`}><Stat x={1350} y={760} big="$31 TRILLION" small="IN MUTUAL FUNDS" w={640} /></g>
      </g>}
      {/* # B) buying straight from the fund; one price a day */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <Pot x={1160} y={GROUND} s={0.8} fill={0.7} label="MUTUAL FUND" col="#2A8FD0" />
        <Person f={f} who="investorF" beats={mBeats} x={1520} y={GROUND} s={0.9} flip />
        <Person f={f} who="investor" beats={sBeats} x={330} y={GROUND} s={0.95} />
        <g opacity={win(f, q.another, q.straight + 10, 8)}><Person f={f} who="buyer" beats={[[q.another, 'idle', 'neutral']]} x={720} y={GROUND} s={0.85} flip /><NoMark x={720} y={600} o={on(f, q.investor20 + 4, 8)} r={110} /></g>
        {f >= q.buy20 && f < q.straight && <DollarBill x={400} y={600} s={0.6} t="$" />}
        {billIn.t > 0 && billIn.t < 1 && <DollarBill x={billIn.x} y={billIn.y} s={0.6} t="$" />}
        {ticketBack.t > 0 && ticketBack.t < 1 && <Ticket x={ticketBack.x} y={ticketBack.y} s={0.6} t="SHARES" />}
        {ticketOut.t > 0 && ticketOut.t < 1 && <Ticket x={ticketOut.x} y={ticketOut.y} s={0.6} t="SHARES" />}
        {cashBack.t > 0 && cashBack.t < 1 && <Coin x={cashBack.x} y={cashBack.y} s={0.7} />}
        <g opacity={on(f, q.straight, 8) * (1 - on(f, q.one21, 8))}><Label x={760} y={GROUND + 60} text={f >= q.back20 ? 'SELL BACK TO THE FUND' : 'BUY STRAIGHT FROM THE FUND'} size={46} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, q.one21, 10)}>
          <DayClock x={760} y={420} s={1.0} hour={hour} ring={ring} />
          <g opacity={on(f, q.day21, 8)}><Label x={760} y={600} text={f >= q.closes && f < q.morning ? 'MARKET CLOSED' : 'ONE PRICE A DAY'} size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={win(f, q.adds, q.net, 8)}><Label x={1160} y={430} text={f >= q.divides ? 'EVERYTHING ÷ NUMBER OF SHARES' : 'ADD UP EVERYTHING IT OWNS'} size={42} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={navO} transform={`translate(1160 ${lerp(260, 380, navO) - 10 * pop(f, q.nav, 12)})`}>
          <Tag x={0} y={0} t={qMark > 0.5 ? 'NAV = ?' : 'NAV = $25.00'} r={-4} col="#9FD8B4" />
          <g opacity={on(f, q.value, 8) * (1 - on(f, q.place, 8))}><Label x={0} y={110} text="NET ASSET VALUE" size={38} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, q.order, 8)}><Doc x={560} y={640} s={0.55} title={f >= q.k10 ? 'BUY · 10 AM' : 'ORDER'} lines={2} /></g>
      </g>}
      {/* # C) good parts vs downsides */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={on(f, q.good23, 8)}><Label x={500} y={300} text="THE GOOD PARTS" size={62} font="Bebas Neue" color={P.mintInk} /></g>
        {goods.map(([at, t], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${-8 * pop(f, at, 12)})`}><Tick x={210} y={400 + k * 96} o={on(f, at, 10)} r={30} /><Label x={260} y={414 + k * 96} text={t} size={44} anchor="start" font="Bebas Neue" color={P.ink} /></g>)}
        <g opacity={win(f, q.k14, q.set25, 8)} transform={`translate(0 ${-10 * pop(f, q.trillion24, 12)})`}><Stat x={500} y={830} big="$14.7 TRILLION" small="OF RETIREMENT SAVINGS" w={600} /></g>
        <g opacity={on(f, q.month, 8)}>{[0, 1, 2, 3].map((k) => <Coin key={k} x={300 + k * 130} y={850 - 10 * pop(f, q.fixed + k * 6, 10)} s={0.6} o={on(f, q.fixed + k * 6, 6)} />)}</g>
        <line x1={960} y1={300} x2={960} y2={GROUND - 30} stroke="#CDB58C" strokeWidth={5} strokeDasharray="14 12" opacity={on(f, q.downsides, 8)} />
        <g opacity={on(f, q.downsides, 8)}><Label x={1420} y={300} text="THE DOWNSIDES" size={62} font="Bebas Neue" color={P.coralInk} /></g>
        {bads.map(([at, t], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${-8 * pop(f, at, 12)})`}><Tick x={1120} y={400 + k * 96} o={on(f, at, 10)} r={30} ok={false} /><Label x={1170} y={414 + k * 96} text={t} size={44} anchor="start" font="Bebas Neue" color={P.ink} /></g>)}
        <g opacity={on(f, q.mutual27, 8)} transform={`translate(${lerp(1900, 1720, on(f, q.mutual27, 14))} 770) rotate(${-8 + 6 * win(f, q.didnt, q.anything27 + 20)})`}><Doc x={0} y={0} s={0.7} title="TAX BILL" stamp="NO SALE?" stampO={on(f, q.didnt, 8)} lines={3} /></g>
        <g opacity={on(f, q.account27, 8) * (1 - on(f, q.brings, 8))}><Label x={1720} y={640} text="TAXABLE ACCOUNT" size={34} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, q.word, 8)} transform={`translate(1420 ${400 - 8 * pop(f, q.actively28, 12)})`}><rect x={-300} y={-50} width={600} height={74} rx={16} fill={P.gold} opacity={0.35 * win(f, q.actively28, q.actively28 + 90, 8)} /></g>
        <Person f={f} who="investor" beats={[[BC, 'idle', 'smiling'], [q.good23, 'thumbsUp', 'smiling'], [q.downsides, 'idle', 'neutral'], [q.tax, 'shock', 'shocked'], [q.word, 'point', 'neutral']]} x={960} y={GROUND} s={0.75} o={on(f, q.good23, 10)} />
      </g>}
      <Headline f={f} lines={[[q.mutual18, 'MUTUAL FUNDS', P.ink, 110], [q.oldest, 'THE OLDEST AND BIGGEST', P.ink, 104], [q.buy20, 'HOW YOU BUY ONE', P.ink, 104], [q.one21, 'ONE PRICE A DAY: THE NAV', P.ink, 100], [q.place, 'ORDER AT 10 AM… PRICE AT CLOSE', P.ink, 92],
        [q.good23, 'MUTUAL FUNDS: THE GOOD', P.mintInk, 104], [q.downsides, 'AND THE DOWNSIDES', P.coralInk, 104], [q.brings, 'WHAT IS “ACTIVELY MANAGED”?', P.ink, 98]]} />
      <Vignette id="fd-mutual" />
    </g>
  )
}

export const FD_MUTUAL = makePiece('fd-mutual', 'Mutual funds: a big blue MUTUAL FUND pot and a bar showing $31 trillion of the $45 trillion in US funds; Sam buys straight from the fund (another investor crossed out), a bill goes in and a SHARES ticket comes back, selling sends it back; a wall clock runs to the close and rings — add up everything, divide by shares, a NAV price tag; an order at 10 a.m. shows NAV = ? until the end of the day; two columns of ticks and crosses: simple, everywhere, $14.7 trillion of retirement savings, auto-invest monthly vs actively managed, higher fees, minimums, a surprise tax bill', {
  mood: 'light', Component: Mutual, beats: Object.values(K),
  sfx: [['s19:trillion', 'pop', 0.2], ['s20:straight', 'whoosh', 0.2], ['s21:closes', 'ding', 0.25], ['s21:nav', 'pop', 0.2], ['s22:day', 'ding', 0.2], ['s27:bill', 'thud', 0.2]] })
