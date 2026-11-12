// ============================================================
// db-plan (s22–s33, cream): the debt shrinks from $127M to $58M (1829); the
// three-part plan as three medallions (money in / money out / pay back);
// part one, money in: a merchant ship docks at the harbour customs house and
// the importer pays the tariff at the window; coins stream to the Treasury;
// then the frontier land office: plots sell to a farmer and a speculator;
// land money 1832 ($2.5M a YEAR) vs summer 1836 ($5M a MONTH) as two columns.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { type Beat, fly, Headline, Person, win } from '../aimoney/common'
import { BondPile, bump, C, Coin, Column, Counter, CustomsHouse, Defs, LandOffice, Plots, Ship, Street, Treasury, Water, YearPage, Bond , Backdrop } from './kit'

const GROUND = 880
// # a round medallion with a small drawing inside (the three parts of the plan)
const Medal: React.FC<{ x: number; y: number; o: number; s: number; kind: 'in' | 'out' | 'pay'; title: string }> = ({ x, y, o, s, kind, title }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={150} fill="#FFFDF7" stroke={C.sepiaL} strokeWidth={6} />
    {kind === 'in' && <g><path d="M-70 -10 L10 -10" stroke={C.forest} strokeWidth={14} strokeLinecap="round" /><path d="M0 -40 L40 -10 L0 20 Z" fill={C.forest} /><Coin x={-90} y={-10} r={30} /><rect x={50} y={-70} width={60} height={110} rx={6} fill={C.stone} stroke={C.stoneD} strokeWidth={4} /></g>}
    {kind === 'out' && <g><rect x={-110} y={-70} width={60} height={110} rx={6} fill={C.stone} stroke={C.stoneD} strokeWidth={4} /><path d="M-40 -10 L50 -10" stroke={C.brick} strokeWidth={14} strokeLinecap="round" /><path d="M44 -40 L84 -10 L44 20 Z" fill={C.brick} /><Coin x={104} y={-10} r={26} o={0.6} /></g>}
    {kind === 'pay' && <g><Bond x={0} y={-14} s={0.62} amount="$" paid={1} /></g>}
    <Label x={0} y={110} text={title} size={40} font="Bebas Neue" color={C.sepia} />
  </g>
)

const Plan: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const next22 = c('s22:next'), shrank = c('s22:shrank'), slowly = c('s22:slowly')
  const president = c('s23:president'), the23 = c('s23:the'), still23 = c('s23:still'), d58 = c('s23:58')
  const hated = c('s24:hated'), gone = c('s24:gone')
  const three25 = c('s25:three'), parts = c('s25:parts')
  const one26 = c('s26:one'), coming = c('s26:coming')
  const tariffs = c('s27:tariffs'), taxes27 = c('s27:taxes'), shipped = c('s27:shipped')
  const ship28 = c('s28:ship'), arrives = c('s28:arrives'), cloth28 = c('s28:cloth'), importer = c('s28:importer'), pays28 = c('s28:pays'), port = c('s28:port')
  const goods29 = c('s29:goods'), flowed = c('s29:flowed'), treasury29 = c('s29:treasury')
  const rest30 = c('s30:rest'), selling30 = c('s30:selling'), land30 = c('s30:land')
  const owned = c('s31:owned'), west = c('s31:west'), sold31 = c('s31:sold'), farmers = c('s31:farmers'), hoping = c('s31:hoping'), resell = c('s31:resell')
  const sales32 = c('s32:sales'), d2 = c('s32:2'), whole32 = c('s32:whole')
  const summer = c('s33:summer'), y1836 = c('s33:1836'), d5 = c('s33:5'), month = c('s33:month')
  const A = win(f, c('s22') - 20, one26), B = win(f, one26, rest30), D = on(f, rest30, 8)
  const importerB: Beat[] = [[0, 'idle', 'neutral'], [importer, 'carry', 'neutral'], [pays28, 'offer', 'neutral'], [goods29, 'idle', 'smiling']]
  const farmerB: Beat[] = [[0, 'idle', 'smiling'], [sold31, 'offer', 'smiling'], [farmers + 10, 'thumbsUp', 'smiling']]
  const specB: Beat[] = [[0, 'idle', 'smug'], [resell, 'pointUp', 'smug']]
  const ship = easeInOut(span(f, arrives - 30, arrives + 10))
  return (
    <g>
      <Defs />
      <Stage id="db-plan" frame={f} />
      <Headline f={f} lines={[[next22, 'THE DEBT SHRINKS', P.ink, 110], [c('s23:1829'), '1829: JACKSON TAKES OFFICE', P.ink, 100], [hated, 'GOAL: NO DEBT AT ALL', C.brick, 104], [three25, 'THE PLAN: THREE PARTS', P.ink, 104],
        [one26, 'PART 1: MONEY COMING IN', C.forest, 100], [tariffs, 'TARIFFS = TAXES ON IMPORTS', P.ink, 96], [rest30, 'AND SELLING LAND', C.forest, 104], [sales32, 'LAND MONEY', P.ink, 110]]} />

      {/* # A) the shrinking pile, 1829, the goal, the three parts */}
      {A > 0 && <g opacity={A}>
        <Backdrop kind="town" f={f} />
        <Street y={GROUND} />
        <g opacity={1 - on(f, three25, 10)}>
          <Treasury x={600} y={GROUND} s={0.85 * bump(f, still23, 0.04)} />
          {(() => { const n = Math.round(lerp(16, 8, on(f, slowly, 50))); return <g transform={`translate(1360 ${GROUND}) scale(${bump(f, shrank, 0.05) * bump(f, hated, 0.05)})`}><BondPile x={0} y={0} n={n} /></g> })()}
          <Counter x={1360} y={GROUND + 70} f={f} t0={slowly} t1={d58} a={127} b={58} prefix="$" size={64} color={C.brick} fmt={(v) => `${Math.round(v)} MILLION`} o={on(f, next22, 8)} />
          <g opacity={on(f, c('s23:1829'), 8)}><YearPage x={1360} y={420} s={0.9 * pop(f, c('s23:1829'))} year="1829" top="PRESIDENT" /></g>
          <g opacity={on(f, gone, 8)}><g transform={`translate(1720 ${GROUND}) scale(${pop(f, gone)})`}><rect x={-8} y={-260} width={16} height={260} fill={C.woodD} /><rect x={-110} y={-330} width={220} height={100} rx={10} fill="#FFFDF7" stroke={C.brick} strokeWidth={6} /><Label x={0} y={-266} text="GOAL: $0" size={52} font="Bebas Neue" color={C.brick} /></g></g>
        </g>
        <Medal x={480} y={560} o={on(f, three25 + 8, 8)} s={pop(f, three25 + 8)} kind="in" title="MONEY IN" />
        <Medal x={960} y={560} o={on(f, three25 + 14, 8)} s={pop(f, three25 + 14)} kind="out" title="MONEY OUT" />
        <Medal x={1440} y={560} o={on(f, parts, 8)} s={pop(f, parts)} kind="pay" title="PAY BACK" />
      </g>}

      {/* # B) the harbour: ship docks, the importer pays the tariff, coins flow to the Treasury */}
      {B > 0 && <g opacity={B}>
        <Backdrop kind="harbour" f={f} y={800} />
        <Water y={800} f={f} />
        <rect x={900} y={760} width={1100} height={60} fill={C.woodD} /><rect x={900} y={752} width={1100} height={12} fill={C.wood} />
        <g opacity={on(f, tariffs, 8)}><CustomsHouse x={1330} y={760} s={0.85 * bump(f, taxes27, 0.05) * bump(f, port, 0.04)} /></g>
        <g opacity={on(f, ship28 - 30, 10)}><Ship x={lerp(-260, 560, ship)} y={812} s={0.9 * bump(f, goods29, 0.06) * bump(f, c('s28:sold'), 0.05)} f={f} cargo={on(f, cloth28, 16)} /></g>
        <g opacity={on(f, shipped, 8) * (1 - on(f, ship28, 8))}><Label x={560} y={700} text="GOODS FROM ABROAD" size={52} font="Bebas Neue" color={C.sepia} /></g>
        <g opacity={on(f, importer, 8)}><Person f={f} who="owner" beats={importerB} x={1020} y={760} s={0.8} /></g>
        {f >= pays28 && f < pays28 + 26 && (() => { const fl = fly(f, pays28, [1060, 560], [1330, 620], 20, 90); return <Coin x={fl.x} y={fl.y} r={28} o={fl.o} /> })()}
        <g opacity={on(f, pays28 + 18, 8)}><Label x={1330} y={680} text="TARIFF PAID" size={40} font="Bebas Neue" color={C.forest} /></g>
        {/* # s26 "money coming in": coins roll along the quay into the Treasury */}
        {f >= coming && f < tariffs && [0, 1, 2].map((k) => { const t0 = coming + k * 8 + Math.floor((f - coming) / 24) * 24, fl = fly(f, t0, [1000, 700], [1770, 680], 20, 70); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={24} o={fl.o} /> : null })}
        <g opacity={on(f, one26, 10)}><Treasury x={1770} y={760} s={0.42 * pop(f, one26) * bump(f, c('s27:most'), 0.08) * bump(f, treasury29, 0.08) * bump(f, c('s27:money'), 0.08)} door={on(f, treasury29, 8)} /></g>
        {f >= flowed && [0, 1, 2].map((k) => { const t0 = flowed + k * 8 + Math.floor((f - flowed) / 26) * 26, fl = fly(f, t0, [1420, 560], [1770, 640], 18, 80); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={20} o={fl.o} /> : null })}
      </g>}

      {/* # D) the frontier land office; plots sell; then the money columns */}
      {D > 0 && <g opacity={D}>
        <Backdrop kind="prairie" f={f} />
        <Street y={GROUND} />
        <LandOffice x={480} y={GROUND} s={1.15 * bump(f, selling30, 0.05) * bump(f, c('s32'), 0.06)} busy={on(f, sold31, 10)} />
        <g opacity={on(f, owned, 10) * (1 - on(f, sales32, 10))}>
          <Plots x={1340} y={720} s={1.0 * bump(f, west, 0.04)} sold={on(f, sold31, 40)} />
          <g opacity={on(f, west, 8)}><Label x={1340} y={600} text="GOVERNMENT LAND IN THE WEST" size={44} font="Bebas Neue" color={C.sepia} /></g>
          <g opacity={on(f, farmers, 8)}><Person f={f} who="worker" beats={farmerB} x={880} y={GROUND} s={0.85} /></g>
          <g opacity={on(f, hoping, 8)}><Person f={f} who="investor" beats={specB} x={1780} y={GROUND} s={0.85} /></g>
        </g>
        {/* # land money: 1832 for the whole year vs 1836 for one month */}
        <g opacity={on(f, sales32, 10)}>
          <Column x={1150} y={GROUND - 10} h={on(f, d2, 16) * 190} w={200} />
          <g opacity={on(f, whole32, 8)}><Label x={1150} y={GROUND + 60} text="1832: $2.5M A YEAR" size={44} font="Bebas Neue" color={C.sepia} /></g>
          <g opacity={on(f, y1836, 8)}><Column x={1560} y={GROUND - 10} h={on(f, d5, 16) * 380} w={200} color={C.goldD} />
            <g opacity={on(f, month, 8)}><Label x={1560} y={GROUND + 60} text="1836: $5M A MONTH" size={44} font="Bebas Neue" color={C.brick} /></g>
            <g opacity={on(f, y1836, 8)}><YearPage x={1560} y={360} s={0.75 * pop(f, y1836) * bump(f, summer, 0)} year="1836" top="SUMMER" /></g></g>
        </g>
      </g>}
      <Vignette id="db-plan" />
    </g>
  )
}

const BEATS = ["s22:next", "s22:shrank", "s22:slowly", "s23:president", "s23:still", "s23:58", "s24:hated", "s24:gone", "s25:three", "s25:parts", "s26:one", "s26:coming", "s27:tariffs", "s27:taxes", "s27:shipped", "s28:ship", "s28:arrives", "s28:cloth", "s28:importer", "s28:pays", "s28:port", "s29:goods", "s29:flowed", "s29:treasury", "s30:rest", "s30:selling", "s31:owned", "s31:west", "s31:sold", "s31:farmers", "s31:hoping", "s31:resell", "s32:sales", "s32:2", "s32:whole", "s33:summer", "s33:1836", "s33:5", "s33:month", "s22", "s23:1829", "s28:sold", "s27:most", "s27:money", "s32"]
export const DB_PLAN = makePiece('db-plan', 'Debt 1835 ch2a: pile shrinks $127M→$58M, 1829 page, GOAL $0 sign; three medallions (money in / out / pay back); harbour: ship docks, importer pays tariff at the customs house, coins flow to the Treasury; land office: plots sell to a farmer and a speculator; land money 1832 $2.5M a year vs 1836 $5M a month', {
  mood: 'light', Component: Plan, beats: BEATS,
  sfx: [['s28:arrives', 'whoosh', 0.2], ['s28:pays', 'coin', 0.25], ['s33:month', 'pop', 0.2]],
})
