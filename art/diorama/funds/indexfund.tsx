// ---------------------------------------------------------------- s29–s44: step three, index funds (cream).
// A) ACTIVE vs PASSIVE. Left: a manager with a magnifier picks a few companies, racing to beat the market flag.
//    Right: the index list (S&P 500) ticks every name; the fund owns them all and its price line follows the list up
//    and down. Nobody paid to pick → the manager's desk is crossed out and a CHEAP tag drops.
// B) Fee bars: broad index funds about 0.09% a year vs active funds about 0.57% — "6×" bracket. Do managers earn
//    it? A grid of 100 active large-company funds: 79 turn red (did worse than the S&P 500 in 2025) — four in five.
// C) $10,000 at an example 7% for 30 years: coin towers — no fee ≈ $76K, index fee ≈ $74K, active fee ≈ $65K; a red
//    ghost gap "$9,000+ GONE" (same returns before fees assumed).
// D) The catch: the index line sits exactly on the market line — never beats it, falls with it. The key idea: the
//    INDEX strategy card drops into either package — MUTUAL FUND or ETF.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, Stat, Stamp, win, type Beat } from '../aimoney/common'
import { Ground, Magnifier } from '../power/kit2'
import { DollarBill, NoMark } from '../bank/kit'
import { CoinTower, Tag } from '../money4/kit'
import { GhostPile } from '../fee/kit'
import { Company } from '../invest/kit'
import { Board, Folk, ListBoard, Parcel } from './kit'

const GROUND = 930
const K = {
  three: 's29:three', index29: 's29:index', choice: 's29:choice', active29: 's29:active', passive: 's29:passive',
  manager: 's30:manager', picks: 's30:picks', companies30: 's30:companies', trying: 's30:trying', beat30: 's30:beat', market30: 's30:market',
  index31: 's31:index', beat31: 's31:beat', buys31: 's31:buys', everything: 's31:everything', list31: 's31:list', called31: 's31:called', index31b: 's31:index#2',
  famous: 's32:famous', sp: 's32:sp', k500: 's32:500', k500b: 's32:500#2', biggest: 's32:biggest', sp2: 's32:sp#2', owns: 's32:owns', all32: 's32:all', rises: 's32:rises', falls32: 's32:falls',
  nobody: 's33:nobody', paid: 's33:paid', index33: 's33:index', cheap: 's33:cheap',
  y2025: 's34:2025', broad: 's34:broad', average: 's34:average', z34: 's34:0', nine: 's34:9', active34: 's34:active', z34c: 's34:0#3', seven34: 's34:7', six: 's34:six', times: 's34:times',
  expensive: 's35:expensive', earn: 's35:earn', fee35: 's35:fee', most35: 's35:most', no35: 's35:no',
  y2025b: 's36:2025', k79: 's36:79', active36: 's36:active', large: 's36:large', worse: 's36:worse', sp36: 's36:sp',
  four37: 's37:four', five37: 's37:five',
  now38: 's38:now', fees38: 's38:fees', say: 's38:say', k10000: 's38:10000', grows: 's38:grows', seven38: 's38:7', k30: 's38:30', fees38b: 's38:fees#2',
  no39: 's39:no', k76: 's39:76', z40: 's40:0', index40: 's40:index', k74: 's40:74', z41: 's41:0', active41: 's41:active', k65: 's41:65',
  k9000: 's42:9000', gone: 's42:gone', fee42: 's42:fee', both: 's42:both', same: 's42:same',
  downside: 's43:downside', never: 's43:never', market43: 's43:market', falls43: 's43:falls', falls43b: 's43:falls#2',
  key: 's44:key', index44: 's44:index', separate: 's44:separate', package44: 's44:package', mutual44: 's44:mutual', etf44: 's44:etf',
}
type Key = keyof typeof K

const IndexFund: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.y2025 - 8, BC = q.now38 - 8, CD = q.downside - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = win(f, BC, CD), D = on(f, CD, 10)
  const mgr: Beat[] = [[0, 'idle', 'neutral'], [q.picks, 'point', 'thinking'], [q.beat30, 'fistPump', 'smug'], [q.nobody, 'shrug', 'worried']]
  // # the index board: price line follows the list; rises then falls
  const board = span(f, q.owns, q.falls32 + 30)
  const tower = (n: number, at: number) => n * on(f, at, 24)
  return (
    <g>
      <Stage id="fd-index" frame={f} />
      {/* # A) active picks vs the index list */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <line x1={960} y1={260} x2={960} y2={GROUND - 20} stroke="#CDB58C" strokeWidth={5} strokeDasharray="14 12" opacity={on(f, q.choice, 8)} />
        <g opacity={on(f, q.active29, 8)}><Label x={480} y={300} text="ACTIVE: A MANAGER PICKS" size={56} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, q.passive, 8)}><Label x={1440} y={300} text="PASSIVE: COPY A LIST" size={56} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, q.manager, 10)}>
          <Person f={f} who="investorF" beats={mgr} x={260} y={GROUND} s={0.9} />
          <g transform={`translate(${lerp(420, 640, span(f, q.picks, q.companies30 + 20))} 560)`}><Magnifier x={0} y={0} s={0.7} /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, q.companies30 + k * 4, 8)}><Company x={520 + k * 150} y={GROUND} s={0.32} name="" col={['#5B7DB1', '#1E9A63', '#B4821C'][k]} glow={k === 1 ? win(f, q.picks, q.trying, 6) : 0} /></g>)}
          <g opacity={on(f, q.beat30, 8)} transform="translate(800 430)"><rect x={-4} y={-90} width={8} height={170} fill="#5C6F8E" /><path d="M4 -90 L110 -62 L4 -34 Z" fill="#D9483A" /><Label x={60} y={120} text={f >= q.market30 ? 'BEAT THE MARKET?' : 'BEAT…'} size={38} font="Bebas Neue" color={P.ink} /></g>
          <NoMark x={480} y={640} o={on(f, q.paid, 8)} r={150} />
        </g>
        <g opacity={on(f, q.index31, 10)}>
          <ListBoard x={1220} y={640} s={0.85} title={f >= q.sp ? 'S&P 500' : 'THE LIST'} ticks={6 * span(f, q.everything, q.all32 + 10)} />
          <g opacity={on(f, q.called31, 8) * (1 - on(f, q.sp, 8))}><Tag x={1220} y={380} t="= AN INDEX" r={-5} col="#9FD8B4" /></g>
          <g opacity={on(f, q.k500b, 8)}><Label x={1220} y={GROUND + 60} text="~500 OF AMERICA'S BIGGEST COMPANIES" size={40} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, q.owns, 10)}><Board x={1610} y={560} w={420} h={240} title="INDEX FUND = THE LIST" t={board} /></g>
          <g opacity={on(f, q.index33, 8)} transform={`translate(1610 ${800 - 12 * pop(f, q.index33, 12)})`}><Tag x={0} y={0} t="VERY CHEAP" r={-6} col="#9FD8B4" /></g>
        </g>
      </g>}
      {/* # B) fees, then 79% did worse */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, q.y2025b, 12)}>
          <Tag x={960} y={300} t="AVERAGE YEARLY FEE, 2025" r={-3} />
          <g opacity={on(f, q.broad, 8)}><rect x={360} y={GROUND - 30 - 380 * (0.09 / 0.57) * on(f, q.z34, 20)} width={300} height={380 * (0.09 / 0.57) * on(f, q.z34, 20)} rx={10} fill="#1E9A63" /><Label x={510} y={GROUND + 60} text="BROAD INDEX FUNDS" size={44} font="Bebas Neue" color={P.ink} />
            <Label x={510} y={GROUND - 110} text={f >= q.nine ? '≈ 0.09%' : '…'} size={64} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, q.active34, 8)}><rect x={1260} y={GROUND - 30 - 380 * on(f, q.z34c, 20)} width={300} height={380 * on(f, q.z34c, 20)} rx={10} fill="#D9483A" /><Label x={1410} y={GROUND + 60} text="ACTIVE FUNDS" size={44} font="Bebas Neue" color={P.ink} />
            <Label x={1410} y={GROUND - 450} text={f >= q.seven34 ? '≈ 0.57%' : '…'} size={64} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, q.six, 10)} transform={`translate(960 ${620 - 12 * pop(f, q.times, 12)})`}><rect x={-150} y={-70} width={300} height={120} rx={22} fill={P.card} stroke={P.coralInk} strokeWidth={5} /><Label x={0} y={12} text="6× MORE" size={70} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, q.expensive, 8)}><Person f={f} who="investorF" beats={[[q.expensive, 'idle', 'smug'], [q.earn, 'present', 'smug'], [q.no35, 'slump', 'worried']]} x={1730} y={GROUND} s={0.8} flip /></g>
          {f >= q.no35 - 4 && <Stamp x={1410} y={640} text="NO" f={f} at={q.no35} size={110} />}
        </g>
        <g opacity={on(f, q.y2025b, 12)}>
          <Tag x={480} y={330} t="ACTIVE LARGE-US-COMPANY FUNDS, 2025" r={-3} />
          {Array.from({ length: 100 }, (_, k) => { const cx = 160 + (k % 20) * 34, cy = 420 + Math.floor(k / 20) * 70, red = k < 79 * span(f, q.k79, q.worse + 20)
            return <Folk key={k} x={cx} y={cy + 40} s={0.7} col={red ? '#D9483A' : '#1E9A63'} o={on(f, q.y2025b + (k % 20), 6)} /> })}
          <g opacity={on(f, q.k79, 10)} transform={`translate(1380 ${520 - 12 * pop(f, q.k79, 12)})`}><Stat x={0} y={0} big="79%" small="DID WORSE THAN THE S&P 500" color={P.coralInk} w={620} /></g>
          <g opacity={on(f, q.four37, 10)}>{[0, 1, 2, 3, 4].map((k) => <Folk key={k} x={1180 + k * 100} y={GROUND - 20} s={1.8} col={k < 4 && f >= q.four37 + k * 3 ? '#D9483A' : '#1E9A63'} />)}
            <Label x={1380} y={GROUND + 60} text={f >= q.five37 ? '4 OUT OF EVERY 5' : '4…'} size={48} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}
      {/* # C) what fees do over 30 years */}
      {Cc > 0 && <g opacity={Cc}>
        <Ground y={GROUND} />
        <g opacity={on(f, q.say, 8)} transform={`translate(260 ${560 - 10 * pop(f, q.k10000, 12)})`}><DollarBill x={0} y={0} s={1.1} t="$10,000" />
          <Label x={0} y={140} text={f >= q.k30 ? '7% A YEAR · 30 YEARS' : f >= q.seven38 ? '7% A YEAR…' : 'EXAMPLE'} size={42} font="Bebas Neue" color={P.ink} />
          <Label x={0} y={190} text="(BEFORE FEES)" size={34} font="Bebas Neue" color={P.ink2} o={on(f, q.fees38b, 8)} /></g>
        {([[700, 19, q.no39, q.k76, 'NO FEE', '≈ $76K', false], [1060, 18.6, q.z40, q.k74, 'INDEX FEE 0.09%', '≈ $74K', false], [1420, 16.2, q.z41, q.k65, 'ACTIVE FEE 0.57%', '≈ $65K', true]] as [number, number, number, number, string, string, boolean][]).map(([x, n, at, v, t, val, red], k) =>
          <g key={k} opacity={on(f, at, 8)}><CoinTower x={x} y={GROUND - 30} n={tower(n, at)} w={150} red={red} /><Label x={x} y={GROUND + 60} text={t} size={40} font="Bebas Neue" color={P.ink} />
            <Label x={x} y={GROUND - 30 - 16 * n - (red ? 110 : 50)} text={val} size={60} font="Bebas Neue" color={red ? P.coralInk : P.goldInk} o={on(f, v, 8)} /></g>)}
        <g opacity={on(f, q.k9000, 10)}><GhostPile x={1420} y={GROUND - 30 - 16 * 16.2} n={3} w={150} /><g transform={`translate(1500 ${400 - 10 * pop(f, q.gone, 12)})`}><Tag x={0} y={0} t="$9,000+ GONE" r={6} col="#F6B1A8" /></g>
          <g opacity={on(f, q.both, 8)}><Label x={1060} y={GROUND + 120} text="IF BOTH EARN THE SAME BEFORE FEES" size={40} font="Bebas Neue" color={P.ink2} /></g></g>
      </g>}
      {/* # D) never beats it; one strategy, two packages */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, q.key, 12)}>
          <Board x={960} y={560} w={900} h={380} title="MARKET vs INDEX FUND" t={1} seed={5} flat={-0.6 * on(f, q.falls43, 20)} />
          <g opacity={on(f, q.never, 8)}><Label x={960} y={850} text={f >= q.falls43 ? 'FALLS RIGHT ALONG WITH IT' : 'INDEX FUND = THE MARKET, NEVER MORE'} size={52} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, q.key, 12)}>
          <Parcel x={480} y={GROUND - 40} s={0.9} label="MUTUAL FUND" col="#2A8FD0" open={0.4 * on(f, q.mutual44, 10)} glow={win(f, q.mutual44, q.mutual44 + 30)} />
          <Parcel x={1440} y={GROUND - 40} s={0.9} label="ETF" col="#7A5AA8" open={0.4 * on(f, q.etf44, 10)} glow={win(f, q.etf44, q.etf44 + 30)} />
          {(() => { const toM = on(f, q.mutual44, 16) * (1 - on(f, q.etf44 - 6, 10)), toE = on(f, q.etf44, 16), x = 960 + toM * -480 + toE * 480, y = 450 + 120 * Math.max(toM, toE)
            return <g opacity={on(f, q.index44, 8)}><ListBoard x={x} y={y} s={0.5} title="INDEX" ticks={6} /></g> })()}
          <g opacity={on(f, q.separate, 8)}><Label x={960} y={300} text={f >= q.package44 ? 'NOT A PACKAGE — A STRATEGY' : 'NOT SEPARATE…'} size={54} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}
      <Headline f={f} lines={[[q.three, 'ACTIVE OR PASSIVE?', P.ink, 106], [q.index31, 'AN INDEX FUND COPIES A LIST', P.ink, 98], [q.nobody, 'NOBODY PAID TO PICK', P.ink, 104],
        [q.y2025, 'THE FEE GAP', P.ink, 110], [q.expensive, 'DO THEY EARN IT?', P.ink, 106], [q.y2025b, 'MOST DID WORSE', P.coralInk, 106],
        [q.now38, 'WHAT FEES DO OVER TIME', P.ink, 104], [q.k9000, 'LOST TO THE FEE', P.coralInk, 106], [q.downside, 'THE DOWNSIDE', P.coralInk, 108], [q.key, 'THE KEY IDEA', P.ink, 110]]} />
      <Vignette id="fd-index" />
    </g>
  )
}

export const FD_INDEX = makePiece('fd-index', 'Index funds: split stage — an active manager with a magnifier picks three companies chasing a BEAT THE MARKET flag vs a clipboard list (S&P 500) that ticks every name and a price board that follows it; the manager crossed out, a VERY CHEAP tag; fee bars ≈0.09% vs ≈0.57% and a 6× MORE badge with a NO stamp; a grid of 100 little people where 79 turn red and 4 of 5 big ones turn red; $10,000 at 7% for 30 years as three coin towers ≈$76K, ≈$74K, ≈$65K and a ghost gap $9,000+ GONE; a market board where the index line never beats and falls with it; an INDEX list card that drops into a MUTUAL FUND parcel or an ETF parcel', {
  mood: 'light', Component: IndexFund, beats: Object.values(K),
  sfx: [['s31:index#2', 'pop', 0.2], ['s33:cheap', 'ding', 0.2], ['s34:times', 'pop', 0.2], ['s35:no', 'thud', 0.25], ['s36:79', 'pop', 0.2], ['s39:76', 'coin', 0.2], ['s42:gone', 'whoosh', 0.2], ['s44:etf', 'pop', 0.2]] })
