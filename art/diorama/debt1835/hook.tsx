// ============================================================
// db-hook (s1–s7, cream): 1835 — the Treasury, a clerk, ONE bond worth $33,733.
// "Today" — the 1835 group slides left and a night office with a $40 trillion
// bond tower rises on the right. Then a stopwatch: every second a $33,000 sack
// drops into the interest chute — about the whole 1835 debt. Last: the debt
// pile shrinks to almost nothing (how?) and shoots straight back up (why?).
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { type Beat, Headline, Person, win } from '../aimoney/common'
import { Bond, BondPile, bump, C, Defs, OfficeNight, Sack, Stopwatch, Street, Treasury, YearPage , Backdrop } from './kit'

const GROUND = 880
const Hook: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  // # cue words (nothing appears before its word)
  const s1 = c('s1'), start = c('s1:start'), y1835 = c('s1:1835'), gov1 = c('s1:government'), d33 = c('s1:33733')
  const closest = c('s2:closest'), nothing = c('s2:nothing'), ever2 = c('s2:ever')
  const today = c('s3:today'), owes3 = c('s3:owes'), d40 = c('s3:40')
  const interest4 = c('s4:interest'), d33k = c('s4:33000'), second4 = c('s4:second')
  const roughly = c('s5:roughly'), whole5 = c('s5:whole'), owed5 = c('s5:owed')
  const how6 = c('s6:how'), pay6 = c('s6:pay'), almost6 = c('s6:almost'), back6 = c('s6:back')
  const why7 = c('s7:why'), come7 = c('s7:come'), back7 = c('s7:back')
  // # picture groups, one at a time
  const A = win(f, s1 - 20, interest4), B = win(f, interest4, how6), D = on(f, how6, 8)
  const clerk: Beat[] = [[0, 'read', 'neutral'], [d33, 'present', 'smiling'], [nothing, 'relief', 'smiling'], [today, 'idle', 'neutral']]
  const clerk2: Beat[] = [[0, 'idle', 'thinking'], [pay6, 'present', 'smiling'], [back7, 'shock', 'shocked']]
  // # "today": the 1835 group shrinks to the left half, the modern group rises on the right
  const sh = easeInOut(span(f, today, today + 18))
  return (
    <g>
      <Defs />
      <Stage id="db-hook" frame={f} />
      <Headline f={f} lines={[[y1835, 'JANUARY 1835', C.sepia, 110], [d33, 'THE US OWED JUST $33,733', P.ink, 104], [today, 'TODAY', C.brick, 120], [d40, 'TODAY: OVER $40 TRILLION', C.brick, 104],
        [interest4, 'THE INTEREST BILL', P.ink, 110], [d33k, 'INTEREST: ~$33,000 EVERY SECOND', P.ink, 96], [c('s5:1835'), '≈ THE WHOLE DEBT OF 1835, EVERY SECOND', P.ink, 84], [how6, 'HOW DID THEY PAY IT OFF?', P.ink, 104], [why7, 'AND WHY DID IT COME BACK?', C.brick, 104]]} />

      {/* # A) 1835 (left after "today") and today (right) */}
      {A > 0 && <g opacity={A}>
        <Backdrop kind="town" f={f} />
        <Street y={GROUND} />
        {/* # shrink about the Treasury's ground point (760, 880) so feet stay on the street, then slide left */}
        <g transform={`translate(${lerp(0, -560, sh)} 0) translate(760 ${GROUND}) scale(${lerp(1, 0.72, sh)}) translate(-760 ${-GROUND})`}>
          <g transform={`translate(${lerp(30, 0, on(f, s1, 14))} 0)`}><Treasury x={760} y={GROUND} s={0.9 * bump(f, gov1, 0.04)} door={on(f, gov1, 10)} /></g>
          <g opacity={on(f, y1835, 8) * (1 - on(f, d33 - 8, 8))}><YearPage x={1580} y={380} s={pop(f, y1835)} year="1835" top="JANUARY" /></g>
          <g opacity={on(f, s1 + 6, 10)}><Person f={f} who="owner" beats={clerk} x={1250} y={GROUND} s={0.95} /></g>
          <g opacity={on(f, d33, 8)}><Bond x={1560} y={640} s={1.15 * pop(f, d33) * bump(f, closest, 0.06) * bump(f, ever2, 0.05)} amount="$33,733" r={-4} /></g>
        </g>
        {/* # today: a night office and a bond tower that rises on "40" */}
        <g opacity={on(f, today + 18, 10)}>
          <rect x={980} y={420} width={900} height={GROUND - 420} rx={24} fill={C.night} opacity={0.92} />
          {/* # a night sky: a moon and a few stars */}
          <circle cx={1800} cy={480} r={30} fill={C.glow} opacity={0.9} /><circle cx={1788} cy={472} r={26} fill={C.night} />
          {[[1060, 470], [1150, 520], [1420, 460], [1500, 540], [1700, 520], [1330, 500]].map(([sx, sy], k) => <circle key={k} cx={sx} cy={sy} r={3 + (k % 2)} fill={C.glow} opacity={0.5 + 0.4 * Math.sin(f / 12 + k)} />)}
          <OfficeNight x={1210} y={GROUND} s={0.85 * bump(f, owes3, 0.04)} f={f} />
          <g transform={`translate(1620 ${GROUND}) scale(1 ${on(f, d40, 24)})`}><BondPile x={0} y={0} n={26} s={1} /></g>
          <g opacity={on(f, d40 + 16, 8)}><Label x={1620} y={GROUND - 395} text="$40 TRILLION+" size={64} font="Bebas Neue" color={C.glow} /></g>
        </g>
      </g>}

      {/* # B) the interest clock: each second a $33,000 sack drops into the chute; then it sits beside the 1835 bond */}
      {B > 0 && <g opacity={B}>
        <Backdrop kind="town" f={f} />
        <Street y={GROUND} />
        <g transform={`translate(${lerp(0, -180, on(f, whole5, 16))} 0)`}>
          <Stopwatch x={620} y={540} s={1.2 * pop(f, interest4, 14) * bump(f, second4, 0.06)} t={((f - interest4) % 30) / 30} />
        </g>
        {/* # the chute in the street */}
        <g opacity={on(f, interest4 + 6, 10) * (1 - on(f, whole5, 10))}><rect x={1100} y={GROUND - 6} width={220} height={26} rx={10} fill={C.sepia} /><rect x={1112} y={GROUND} width={196} height={12} rx={6} fill="#2A1C10" /></g>
        {f >= d33k && f < whole5 && (() => { const t = ((f - d33k) % 30) / 30, y = lerp(260, GROUND + 40, easeInOut(t))
          return <g opacity={Math.min(1, (1 - t) * 4)}><Sack x={1210} y={y} s={0.9} label="$33,000" /></g> })()}
        {/* # the sack stops and sits beside the 1835 bond: about the same */}
        <g opacity={on(f, whole5, 10)}><Sack x={980} y={700} s={1.1 * pop(f, whole5)} label="$33,000" /></g>
        <g opacity={on(f, owed5, 8)}><Label x={1210} y={640} text="≈" size={110} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, owed5, 8)}><Bond x={1500} y={600} s={1.1 * pop(f, owed5)} amount="$33,733" r={-4} /><YearPage x={1500} y={800} s={0.6} year="1835" top="1835 DEBT" o={on(f, owed5 + 6, 8)} /></g>
        <g opacity={on(f, roughly, 8) * (1 - on(f, whole5, 8))}><Label x={620} y={GROUND + 80} text="1 SECOND" size={52} font="Bebas Neue" color={C.sepia} /></g>
      </g>}

      {/* # D) the 1835 Treasury: the pile shrinks to almost nothing, then shoots back up */}
      {D > 0 && <g opacity={D}>
        <Backdrop kind="town" f={f} />
        <Street y={GROUND} />
        <Treasury x={640} y={GROUND} s={0.85} door={on(f, how6, 10)} />
        {(() => { const down = on(f, pay6, 30), up = on(f, come7, 24), n = Math.round(lerp(lerp(14, 1, down), 16, up))
          return <g transform={`translate(1250 ${GROUND}) scale(${bump(f, back7, 0.08)})`}><BondPile x={0} y={0} n={n} /></g> })()}
        <g opacity={on(f, almost6, 8) * (1 - on(f, why7, 8))}><Label x={1250} y={GROUND - 60} text="ALMOST $0" size={56} font="Bebas Neue" color={C.forest} /></g>
        <g opacity={on(f, back6, 8)}><Person f={f} who="owner" beats={clerk2} x={1620} y={GROUND} s={0.95} /></g>
      </g>}
      <Vignette id="db-hook" />
    </g>
  )
}

const BEATS = ["s1", "s1:start", "s1:1835", "s1:government", "s1:33733", "s2:closest", "s2:nothing", "s2:ever", "s3:today", "s3:owes", "s3:40", "s4:interest", "s4:33000", "s4:second", "s5:roughly", "s5:whole", "s5:owed", "s6:how", "s6:pay", "s6:almost", "s6:back", "s7:why", "s7:come", "s7:back"]
export const DB_HOOK = makePiece('db-hook', 'Debt 1835 hook: Treasury + clerk + one $33,733 bond; today a night office and a $40T bond tower; stopwatch with a $33,000 sack each second ≈ the 1835 bond; the pile shrinks to almost $0 and shoots back up', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:33733', 'pop', 0.2], ['s3:40', 'whoosh', 0.2], ['s4:second', 'coin', 0.25]],
})
