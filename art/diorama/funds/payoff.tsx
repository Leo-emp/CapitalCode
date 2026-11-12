// ---------------------------------------------------------------- s69–s78: payoff, all four side by side (cream).
// A) Four cards slide in, one per sentence, each with its picture: MUTUAL FUND = a package with a clock (one price a
//    day); ETF = a package with a price board (all day); INDEX FUND = a list that fits in EITHER package; HEDGE FUND =
//    a private door (wealthy investors, big freedom, big fees).
// B) Three questions on a checklist: what does it own (magnifier), what does it charge every year (fee tag), how
//    easily can I get my money out (door/key). A tiny fee coin grows into a pile over the decades. Ordinary
//    investors (a small crowd) choose low-cost index funds — as mutual funds or as ETFs.
// C) Closing card: how the money works, not investment advice.
import React from 'react'
import { on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, Tick, win, type Beat } from '../aimoney/common'
import { Ground, Magnifier } from '../power/kit2'
import { CoinTower, Tag } from '../money4/kit'
import { Board, ClubDoor, Crowd, DayClock, ListBoard, Parcel } from './kit'

const GROUND = 930
const K = {
  four69: 's69:four', side: 's69:side', side2: 's69:side#2',
  mutual70: 's70:mutual', package70: 's70:package', buy70: 's70:buy', straight70: 's70:straight', one70: 's70:one', day70: 's70:day',
  etf71: 's71:etf', different: 's71:different', package71: 's71:package', trades: 's71:trades', exchange71: 's71:exchange', prices71: 's71:prices', day71: 's71:day',
  index72: 's72:index', strategy: 's72:strategy', copies: 's72:copies', list72: 's72:list', pick72: 's72:pick', winners: 's72:winners', either: 's72:either', package72: 's72:package',
  hedge73: 's73:hedge', private73: 's73:private', wealthy: 's73:wealthy', investors73: 's73:investors', lots: 's73:lots', freedom: 's73:freedom', big73: 's73:big', fees73: 's73:fees',
  whichever: 's74:whichever', looking: 's74:looking', ask: 's74:ask', three: 's74:three', questions: 's74:questions',
  own75: 's75:own', how75: 's75:how', charge: 's75:charge', year75: 's75:year', easily: 's75:easily', money75: 's75:money', out75: 's75:out',
  decades: 's76:decades', fee76: 's76:fee', tiny: 's76:tiny', quietly: 's76:quietly', grow: 's76:grow', thousands: 's76:thousands', dollars76: 's76:dollars',
  reason: 's77:reason', many77: 's77:many', ordinary: 's77:ordinary', choose: 's77:choose', lowcost: 's77:lowcost', index77: 's77:index', mutual77: 's77:mutual', etfs77: 's77:etfs',
  this78: 's78:this', works: 's78:works', advice: 's78:advice',
}
type Key = keyof typeof K

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.whichever - 8, BC = q.this78 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const card = (at: number) => on(f, at, 12)
  const lit = (a: number, b: number) => win(f, a, b, 8)
  const qs: [number, string][] = [[q.own75, 'WHAT DOES IT OWN?'], [q.charge, 'WHAT DOES IT CHARGE EVERY YEAR?'], [q.easily, 'HOW EASILY CAN I GET MY MONEY OUT?']]
  const sam: Beat[] = [[AB, 'idle', 'neutral'], [q.ask, 'countOne', 'thinking'], [q.own75, 'point', 'thinking'], [q.decades, 'idle', 'neutral'], [q.thousands, 'shock', 'shocked'], [q.choose, 'thumbsUp', 'smiling']]
  // # the four columns: x, colour, title, cue
  const COLS: [number, string, string, number, number][] = [[255, '#2A8FD0', 'MUTUAL FUND', q.mutual70, q.etf71], [725, '#7A5AA8', 'ETF', q.etf71, q.index72], [1195, '#1E9A63', 'INDEX FUND', q.index72, q.hedge73], [1665, '#5A1E2E', 'HEDGE FUND', q.hedge73, q.whichever]]
  return (
    <g>
      <Stage id="fd-payoff" frame={f} />
      {/* # A) four side by side */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {COLS.map(([x, col, t, at, nx], k) => <g key={k} opacity={card(at)} transform={`translate(0 ${-14 * pop(f, at, 14)})`}>
          <rect x={x - 220} y={250} width={440} height={640} rx={26} fill={P.card} stroke={col} strokeWidth={lit(at, nx) > 0.5 ? 8 : 4} />
          <rect x={x - 220} y={250} width={440} height={96} rx={26} fill={col} /><Label x={x} y={318} text={t} size={58} font="Bebas Neue" color="#FFFFFF" />
        </g>)}
        {/* mutual: package + clock */}
        <g opacity={card(q.mutual70)}><Parcel x={255} y={720} s={0.55} label="PACKAGE" col="#2A8FD0" /><DayClock x={255} y={470} s={0.6} hour={16} ring={lit(q.one70, q.etf71)} />
          <Label x={255} y={820} text={f >= q.one70 ? 'FROM THE FUND · 1 PRICE A DAY' : 'BUY FROM THE FUND'} size={30} font="Bebas Neue" color={P.ink} o={on(f, q.buy70, 8)} /></g>
        {/* etf: package + board */}
        <g opacity={card(q.etf71)}><Parcel x={725} y={720} s={0.55} label="PACKAGE" col="#7A5AA8" /><Board x={725} y={480} w={320} h={150} title="EXCHANGE" t={span(f, q.trades, q.day71 + 20)} />
          <Label x={725} y={820} text="ON AN EXCHANGE · PRICES ALL DAY" size={30} font="Bebas Neue" color={P.ink} o={on(f, q.trades, 8)} /></g>
        {/* index: list into either package */}
        <g opacity={card(q.index72)}><ListBoard x={1195} y={560} s={0.5} title="THE LIST" ticks={6 * span(f, q.copies, q.list72 + 20)} />
          <Label x={1195} y={760} text="A STRATEGY, NOT A PACKAGE" size={32} font="Bebas Neue" color={P.mintInk} o={on(f, q.strategy, 8)} />
          <Label x={1195} y={820} text="FITS EITHER PACKAGE" size={30} font="Bebas Neue" color={P.ink} o={on(f, q.either, 8)} /></g>
        {/* hedge: private door */}
        <g opacity={card(q.hedge73)}><ClubDoor x={1665} y={700} s={0.5} sign="PRIVATE" />
          <Label x={1665} y={760} text={f >= q.freedom ? 'LOTS OF FREEDOM' : 'FOR WEALTHY INVESTORS'} size={32} font="Bebas Neue" color={P.goldInk} o={on(f, q.wealthy, 8)} />
          <Label x={1665} y={820} text="BIG FEES" size={34} font="Bebas Neue" color={P.coralInk} o={on(f, q.fees73, 8)} /></g>
      </g>}
      {/* # B) three questions, tiny fee grows, low-cost index funds */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, q.decades, 12)}>
          <Person f={f} who="investor" beats={sam} x={1600} y={GROUND} s={1.0} flip />
          {qs.map(([at, t], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${-8 * pop(f, at, 12)})`}><rect x={180} y={330 + k * 170} width={1060} height={130} rx={22} fill={P.card} stroke={P.edge} strokeWidth={3} />
            <Label x={270} y={410 + k * 170} text={`${k + 1}`} size={70} font="Bebas Neue" color={P.goldInk} /><Label x={330} y={414 + k * 170} text={t} size={52} anchor="start" font="Bebas Neue" color={P.ink} /><Tick x={1180} y={395 + k * 170} o={on(f, at + 24, 8)} r={30} /></g>)}
          <g opacity={on(f, q.own75, 8) * (1 - on(f, q.charge, 8))}><Magnifier x={1340} y={420} s={0.6} /></g>
          <g opacity={on(f, q.charge, 8) * (1 - on(f, q.easily, 8))}><Tag x={1300} y={570} t="FEE %" r={-4} col="#F6B1A8" /></g>
          <g opacity={on(f, q.easily, 8)}><ClubDoor x={1330} y={900} s={0.3} sign="EXIT?" open={on(f, q.out75, 14)} rope={0} /></g>
        </g>
        <g opacity={on(f, q.decades, 12) * (1 - on(f, q.reason, 12))}>
          <Coin x={420} y={700} s={0.7 + 0.3 * win(f, q.tiny, q.quietly, 6)} />
          <g opacity={on(f, q.tiny, 8)}><Label x={420} y={820} text="A FEE THAT LOOKS TINY…" size={46} font="Bebas Neue" color={P.ink} /></g>
          {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={on(f, q.grow + k * 4, 8)}><CoinTower x={820 + k * 200} y={GROUND - 30} n={(k + 1) * 4 * on(f, q.grow + k * 4, 16)} w={130} red /></g>)}
          <g opacity={on(f, q.thousands, 10)}><Label x={1220} y={420} text="…CAN GROW INTO THOUSANDS" size={60} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, q.reason, 12)}>
          <Crowd x={520} y={560} cols={9} rows={5} gap={70} s={1.0} lit={45 * on(f, q.choose, 20)} />
          <g opacity={on(f, q.lowcost, 10)}><ListBoard x={1360} y={560} s={0.6} title="LOW-COST INDEX" ticks={6} /></g>
          <g opacity={on(f, q.mutual77, 8)}><Parcel x={1180} y={GROUND - 20} s={0.5} label="MUTUAL FUND" col="#2A8FD0" glow={lit(q.mutual77, q.etfs77 + 30)} /></g>
          <g opacity={on(f, q.etfs77, 8)}><Parcel x={1560} y={GROUND - 20} s={0.5} label="ETF" col="#7A5AA8" glow={lit(q.etfs77, q.etfs77 + 40)} /></g>
          <g opacity={on(f, q.ordinary, 8)}><Label x={520} y={GROUND + 60} text="MANY ORDINARY INVESTORS" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}
      {/* # C) closing card */}
      {C > 0 && <g opacity={C}>
        <rect x={460} y={420} width={1000} height={240} rx={30} fill={P.card} stroke={P.goldInk} strokeWidth={4} />
        <Label x={960} y={530} text="HOW THE MONEY WORKS" size={84} font="Bebas Neue" color={P.ink} />
        <Label x={960} y={610} text="NOT INVESTMENT ADVICE" size={50} font="Bebas Neue" color={P.ink2} o={on(f, q.advice - 10, 8)} />
      </g>}
      <Headline f={f} lines={[[q.four69, 'ALL FOUR, SIDE BY SIDE', P.ink, 104], [q.whichever, '3 QUESTIONS TO ASK', P.ink, 108], [q.decades, 'TINY FEES ADD UP', P.coralInk, 106], [q.reason, 'WHY INDEX FUNDS WIN FANS', P.ink, 104]]} until={BC} />
      <Vignette id="fd-payoff" />
    </g>
  )
}

export const FD_PAYOFF = makePiece('fd-payoff', 'Payoff: four cards slide in side by side — MUTUAL FUND (package + clock, one price a day), ETF (package + exchange board, prices all day), INDEX FUND (a list, a strategy that fits either package), HEDGE FUND (a private door, wealthy investors, lots of freedom, big fees); three numbered questions with ticks (what it owns, what it charges each year, how easily you get money out) beside Sam; a tiny fee coin grows into rising red coin towers; a crowd of ordinary investors lights up next to a LOW-COST INDEX list and the mutual fund and ETF parcels; closing card HOW THE MONEY WORKS · NOT INVESTMENT ADVICE', {
  mood: 'light', Component: Payoff, beats: Object.values(K),
  sfx: [['s70:mutual', 'pop', 0.2], ['s71:etf', 'pop', 0.2], ['s72:index', 'pop', 0.2], ['s73:hedge', 'pop', 0.2], ['s75:own', 'tick', 0.2], ['s76:thousands', 'coin', 0.2], ['s77:etfs', 'chime', 0.2]] })
