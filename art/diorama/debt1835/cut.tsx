// ============================================================
// db-cut (s34–s42, cream): part two, money going out — coins leave the Capitol,
// a barrier arm drops across the flow; the Maysville road bill (Kentucky) gets a
// VETO stamp, then two more bills. Part three, pay back — bonds get PAID stamps
// and the pile counts down year by year (1829 → 1835) to one sheet: $33,733.
// "Free of debt": a $440,000 sack left in the Treasury; a 1790 → today line
// marks 1835 as the lowest point; then coins keep pouring in and overflow.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { type Beat, fly, Headline, Person, win } from '../aimoney/common'
import { Bond, BondPile, bump, C, Capitol, Coin, CoinStack, Counter, Defs, Sack, Scroll, Stamp, Street, Treasury, VetoPrint, YearPage , Backdrop } from './kit'

const GROUND = 880
const Cut: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const two34 = c('s34:two'), going = c('s34:going'), out34 = c('s34:out')
  const blocked = c('s35:blocked'), spending35 = c('s35:spending'), washington = c('s35:washington')
  const vetoed = c('s36:vetoed'), road = c('s36:road'), kentucky = c('s36:kentucky'), more36 = c('s36:more'), followed = c('s36:followed')
  const three37 = c('s37:three'), left37 = c('s37:left'), paying37 = c('s37:paying'), due = c('s37:due')
  const year38 = c('s38:year'), pile38 = c('s38:pile'), smaller = c('s38:smaller')
  const start39 = c('s39:start'), y1835 = c('s39:1835'), records39 = c('s39:records'), d33 = c('s39:33733')
  const told = c('s40:told'), congress = c('s40:congress'), free = c('s40:free'), d440 = c('s40:440000')
  const lowest = c('s41:lowest'), records41 = c('s41:records'), y1790 = c('s41:1790')
  const kept = c('s42:kept'), pouring = c('s42:pouring'), strange = c('s42:strange'), problem = c('s42:problem')
  const A = win(f, c('s34') - 20, three37), B = on(f, three37, 8)
  const clerk: Beat[] = [[0, 'idle', 'neutral'], [paying37, 'offer', 'neutral'], [d33, 'celebrate', 'smiling'], [kept, 'idle', 'thinking'], [problem, 'scratchHead', 'worried']]
  // # the barrier arm drops on "blocked"
  const arm = easeInOut(span(f, blocked, blocked + 12))
  return (
    <g>
      <Defs />
      <Stage id="db-cut" frame={f} />
      <Headline f={f} lines={[[two34, 'PART 2: MONEY GOING OUT', C.brick, 100], [blocked, 'SPENDING BLOCKED', P.ink, 110], [vetoed, 'VETO: A ROAD IN KENTUCKY', P.ink, 100],
        [three37, 'PART 3: PAY BACK THE BONDS', C.forest, 100], [d33, 'JANUARY 1835: $33,733 LEFT', C.forest, 100], [free, '"FREE OF DEBT"', P.ink, 110], [lowest, 'THE LOWEST EVER RECORDED', P.ink, 104], [kept, 'BUT THE MONEY KEPT COMING', C.brick, 100]]} />

      {/* # A) money going out, blocked, vetoed */}
      {A > 0 && <g opacity={A}>
        <Backdrop kind="town" f={f} />
        <Street y={GROUND} />
        <Capitol x={430} y={GROUND} s={1.0 * bump(f, washington, 0.04)} />
        {/* # coins leave the Capitol towards the right, until the barrier stops them */}
        {f >= going && [0, 1, 2, 3].map((k) => { const t0 = going + k * 7 + Math.floor((f - going) / 28) * 28, fl = fly(f, t0, [640, 660], [1040, 700], 22, 70)
          const stop = f > blocked + 10 && fl.x > 820
          return fl.t < 1 && !stop ? <Coin key={k} x={Math.min(fl.x, f > blocked + 10 ? 800 : 2000)} y={fl.y} r={22} o={fl.o * (1 - on(f, vetoed, 8))} /> : null })}
        {/* # barrier: a post with a striped arm that swings down across the coin path */}
        <g opacity={on(f, blocked - 4, 6) * (1 - on(f, vetoed, 8))} transform={`translate(860 880) scale(${bump(f, c('s35:paying'), 0.06)})`}>
          <rect x={-14} y={-300} width={28} height={300} fill={C.woodD} />
          <g transform={`translate(0 -280) rotate(${lerp(-80, 0, arm)})`}><rect x={0} y={-16} width={300} height={32} rx={10} fill="#FFFDF7" stroke={C.brick} strokeWidth={4} />{[40, 120, 200].map((bx) => <rect key={bx} x={bx} y={-16} width={40} height={32} fill={C.brick} />)}</g>
        </g>
        {/* # the bills: the road bill gets the VETO stamp, then two more */}
        <g opacity={on(f, c('s36'), 8)}>
          <Scroll x={1180} y={700} s={1.0 * pop(f, c('s36'))} title="ROAD BILL" />
          <g opacity={on(f, kentucky, 8)}><Label x={1180} y={760} text="KENTUCKY" size={40} font="Bebas Neue" color={C.sepia} /></g>
          <Stamp x={1180} y={560} s={1.0} down={on(f, vetoed, 6)} o={on(f, vetoed - 6, 6) * (1 - on(f, road, 8))} />
          <VetoPrint x={1180} y={652} o={on(f, vetoed + 6, 6)} />
        </g>
        <g opacity={on(f, more36, 8)}><Scroll x={1520} y={720} s={0.8 * pop(f, more36)} title="BILL" /><VetoPrint x={1520} y={690} o={on(f, more36 + 8, 6)} r={8} /></g>
        <g opacity={on(f, followed, 8)}><Scroll x={1780} y={720} s={0.8 * pop(f, followed)} title="BILL" /><VetoPrint x={1780} y={690} o={on(f, followed + 8, 6)} r={-6} /></g>
      </g>}

      {/* # B) paying back the bonds, year by year, down to one sheet */}
      {B > 0 && <g opacity={B}>
        <Backdrop kind="town" f={f} />
        <Street y={GROUND} />
        <Treasury x={520} y={GROUND} s={0.85 * bump(f, records39, 0.04) * bump(f, c('s40:jackson'), 0.04) * bump(f, c('s40:treasury'), 0.05)} door={on(f, pouring, 10)} />
        <g opacity={on(f, paying37 - 10, 8) * (1 - on(f, told, 8))}><Person f={f} who="owner" beats={clerk} x={930} y={GROUND} s={0.9} /></g>
        {/* # bonds stamped PAID one after another, then flown off to the lenders */}
        {[0, 1, 2].map((k) => { const at = paying37 + k * 12
          return <g key={k} opacity={on(f, left37, 8) * (1 - on(f, at + 26, 8)) * (1 - on(f, year38, 6))} transform={`translate(${lerp(0, 300, easeInOut(span(f, at + 14, at + 30)))} ${lerp(0, -200, easeInOut(span(f, at + 14, at + 30)))})`}><Bond x={1180 + k * 260} y={540} s={0.8} paid={on(f, at, 6)} r={-3 + k * 3} /></g> })}
        {/* # the pile counts down year by year */}
        {(() => { const t = span(f, year38, c('s39:1835')), n = Math.max(1, Math.round(lerp(8, 1, t)))
          return <g opacity={on(f, year38 + 8, 8) * (1 - on(f, free, 10))}>
            <g transform={`translate(1360 ${GROUND}) scale(${1.4 * bump(f, smaller, 0.06) * bump(f, d33, 0.1)})`}><BondPile x={0} y={0} n={n} /></g>
            <YearPage x={1360} y={420} s={0.85 * bump(f, start39, 0.06)} year={String(Math.min(1834, Math.round(lerp(1829, 1835, t))) + (f >= c('s39:1835') ? 1 : 0))} top={f >= start39 ? 'JANUARY' : 'YEAR'} />
            <g opacity={on(f, pile38, 8)}><Counter x={1360} y={GROUND + 70} f={f} t0={pile38} t1={d33} a={58421414} b={33733} size={60} color={C.brick} /></g></g> })()}
        {/* # "free of debt": the last sheet goes, a $440,000 sack is left over */}
        <g opacity={on(f, free + 10, 8) * (1 - on(f, lowest, 8))}><Capitol x={1450} y={GROUND} s={0.6 * bump(f, congress, 0.05)} /></g>
        <g opacity={on(f, d440, 8) * (1 - on(f, pouring, 8))}><Sack x={930} y={GROUND} s={1.0 * pop(f, d440)} label="$440,000" /></g>
        {/* # 1790 → today: 1835 is the lowest point */}
        <g opacity={on(f, lowest, 8) * (1 - on(f, kept, 8))}>
          <rect x={960} y={540} width={760} height={10} rx={5} fill={C.sepiaL} />
          <g opacity={on(f, y1790, 8)}><Label x={960} y={610} text="1790" size={44} font="Bebas Neue" color={C.sepia} /></g>
          <Label x={1720} y={610} text="TODAY" size={44} font="Bebas Neue" color={C.sepia} />
          <g transform={`translate(1110 545) scale(${pop(f, lowest)})`}><circle r={26} fill={C.forest} /><Label x={0} y={-50} text="1835: LOWEST" size={44} font="Bebas Neue" color={C.forest} /></g>
          <g opacity={on(f, records41, 8)}><BondPile x={1110} y={GROUND} n={1} s={0.8} /></g>
        </g>
        {/* # the money keeps pouring in: coins rain into the Treasury and spill out on the steps */}
        {f >= pouring && [0, 1, 2, 3].map((k) => { const t0 = pouring + k * 6 + Math.floor((f - pouring) / 24) * 24, fl = fly(f, t0, [1400 + k * 60, 300], [560, 760], 20, 60); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={34} o={fl.o} /> : null })}
        <g opacity={on(f, strange, 8)}><CoinStack x={980} y={GROUND - 10} n={Math.round(on(f, strange, 30) * 14)} w={160} /><CoinStack x={1180} y={GROUND - 10} n={Math.round(on(f, problem, 24) * 10)} w={160} /></g>
      </g>}
      <Vignette id="db-cut" />
    </g>
  )
}

const BEATS = ["s34:going", "s35:blocked", "s35:washington", "s36:vetoed", "s36:road", "s36:kentucky", "s36:more", "s36:followed", "s37:three", "s37:left", "s37:paying", "s37:due", "s38:year", "s38:pile", "s38:smaller", "s39:start", "s39:records", "s39:33733", "s40:told", "s40:congress", "s40:free", "s40:440000", "s41:lowest", "s41:records", "s41:1790", "s42:kept", "s42:pouring", "s42:strange", "s42:problem", "s34", "s35:paying", "s36", "s40:jackson", "s40:treasury", "s39:1835"]
export const DB_CUT = makePiece('db-cut', 'Debt 1835 ch2b: coins leave the Capitol and a barrier arm drops; road bill (Kentucky) VETO stamp + two more; bonds stamped PAID, pile counts down 1829→1835 to one sheet ($33,733); Capitol + $440,000 sack; 1790→today line, 1835 lowest; coins pour in and spill over', {
  mood: 'light', Component: Cut, beats: BEATS,
  sfx: [['s36:vetoed', 'thud', 0.3], ['s37:paying', 'click', 0.2], ['s39:33733', 'pop', 0.2], ['s42:pouring', 'coin', 0.2]],
})
