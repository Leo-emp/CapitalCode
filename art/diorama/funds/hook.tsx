// ---------------------------------------------------------------- s1–s7: the hook (cream).
// A) Four fund cards pop up one by one as they are named (INDEX, MUTUAL, ETF, HEDGE). Sam (made-up) wonders which
//    one; "30 years" → an hourglass; "tens of thousands … to fees" → coins slip out of Sam's jar into a fee scoop
//    while Sam smiles, not noticing.
// B) "Not four separate choices": the cards re-sort — MUTUAL + ETF slide left into two parcels (PACKAGES), INDEX
//    goes to the middle beside a list (STRATEGY), HEDGE goes right behind a velvet rope and a PRIVATE door; the
//    rope swings shut in front of Sam.
// C) Five step badges, one per part of the video, then COMPARE.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { StepBadge } from '../bank/kit'
import { Hourglass, Tag } from '../money4/kit'
import { SaverJar, Scoop } from '../fee/kit'
import { ClubDoor, ListBoard, Parcel } from './kit'

const GROUND = 930
const K = {
  index: 's1:index', mutual: 's1:mutual', etfs: 's1:etfs', hedge: 's1:hedge', which: 's1:which', money1: 's1:money',
  pick: 's2:pick', y30: 's2:30', years2: 's2:years', hand2: 's2:hand', tens: 's2:tens', thousands: 's2:thousands', fees2: 's2:fees', noticing: 's2:noticing',
  hear: 's3:hear', four3: 's3:four', time3: 's3:time', sound: 's3:sound', different: 's3:different',
  thing4: 's4:thing', miss: 's4:miss', not4: 's4:not', separate: 's4:separate', choices: 's4:choices',
  two5: 's5:two', describe: 's5:describe', packaged: 's5:packaged', one5: 's5:one', picks: 's5:picks', buy5: 's5:buy', private5: 's5:private', club: 's5:club', people5: 's5:people', allowed: 's5:allowed', join: 's5:join',
  see6: 's6:see', picture: 's6:picture', simple6: 's6:simple',
  walk: 's7:walk', five: 's7:five', steps: 's7:steps', first: 's7:first', fund7: 's7:fund', then: 's7:then', each7: 's7:each', type7: 's7:type', one7: 's7:one', one7b: 's7:one#2', finally: 's7:finally', compare: 's7:compare',
}
type Key = keyof typeof K
const CARDS: [Key, string, string][] = [['index', 'INDEX FUND', '#1E9A63'], ['mutual', 'MUTUAL FUND', '#2A8FD0'], ['etfs', 'ETF', '#7A5AA8'], ['hedge', 'HEDGE FUND', '#5A1E2E']]

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.hear - 8, BC = q.see6 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const sBeats: Beat[] = [[0, 'idle', 'neutral'], [q.which, 'think', 'thinking'], [q.pick, 'point', 'neutral'], [q.tens, 'idle', 'smiling'], [q.noticing, 'relax', 'smiling'],
    [AB, 'idle', 'neutral'], [q.miss, 'scratchHead', 'thinking'], [q.separate, 'explain', 'neutral'], [q.club, 'idle', 'neutral'], [q.join, 'stop', 'shocked']]
  // # B) where each card goes: [x, y] in the sorted layout
  const sortT = on(f, q.two5, 20), midT = on(f, q.one5, 20), clubT = on(f, q.private5, 20)
  const dest: Record<string, [number, number, number]> = { mutual: [300, 420, sortT], etfs: [620, 420, sortT], index: [960, 420, midT], hedge: [1560, 380, clubT] }
  const start: Record<string, [number, number]> = { index: [420, 560], mutual: [780, 560], etfs: [1140, 560], hedge: [1500, 560] }
  const spread = on(f, q.different, 14) * 60
  return (
    <g>
      <Stage id="fd-hook" frame={f} />
      {/* # A) four names, which one? fees leak */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {CARDS.map(([k, t, col], i) => <g key={k} opacity={on(f, q[k], 8)} transform={`translate(${300 + i * 440} ${380 - 18 * pop(f, q[k], 12)})`}>
          <rect x={-180} y={-80} width={360} height={150} rx={22} fill={col} /><Label x={0} y={18} text={t} size={58} font="Bebas Neue" color="#FFFFFF" /></g>)}
                <g opacity={on(f, q.y30, 8)}><Hourglass x={1500} y={760} s={0.9} t={span(f, q.y30, q.noticing + 30)} /><Tag x={1500} y={600} t="30 YEARS" o={on(f, q.years2, 8)} /></g>
        <g opacity={on(f, q.hand2, 8)}><SaverJar x={600} y={GROUND - 10} w={220} h={280} fill={1 - 0.35 * span(f, q.tens, q.noticing)} label="SAM'S MONEY" /></g>
        <g opacity={on(f, q.fees2 - 10, 8)}><Scoop x={330} y={700} s={0.9} full={span(f, q.tens, q.noticing)} /><Label x={330} y={GROUND - 40} text="FEES" size={50} font="Bebas Neue" color={P.coralInk} /></g>
        {[q.tens, q.thousands, q.fees2].map((t0, k) => { const fl = fly(f, t0, [600, 640], [360, 660], 16, 110); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.6} /> : null })}
        <Person f={f} who="investor" beats={sBeats} x={960} y={GROUND} s={1.0} />
        <g opacity={on(f, q.noticing, 8)}><Label x={960} y={GROUND + 60} text="SAM (MADE-UP) DOESN'T NOTICE" size={42} font="Bebas Neue" color={P.ink2} /></g>
      </g>}
      {/* # B) sort the four cards: packages, a strategy, a private club */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={sortT}><Parcel x={300} y={760} s={0.75} label="MUTUAL FUND" col="#2A8FD0" open={0.35 * on(f, q.packaged, 14)} /><Parcel x={620} y={760} s={0.75} label="ETF" col="#7A5AA8" open={0.35 * on(f, q.packaged, 14)} />
          <Label x={460} y={290} text="2 PACKAGES" size={56} font="Bebas Neue" color={P.skyInk} o={on(f, q.describe, 8)} /></g>
        <g opacity={midT}><ListBoard x={960} y={720} s={0.62} ticks={6 * span(f, q.picks, q.buy5 + 20)} /><Label x={960} y={290} text="1 STRATEGY" size={56} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={clubT}><ClubDoor x={1560} y={GROUND} s={0.7} rope={on(f, q.club, 12)} /><Label x={1560} y={290} text="1 PRIVATE CLUB" size={56} font="Bebas Neue" color={P.coralInk} o={on(f, q.club, 8)} /></g>
        {CARDS.map(([k, t, col], i) => { const [sx, sy] = start[k], [dx, dy, tt] = dest[k], x = lerp(sx + (i - 1.5) * spread, dx, tt), y = lerp(sy, dy, tt), sc = lerp(1, 0.6, tt)
          return <g key={k} transform={`translate(${x} ${y - 14 * win(f, q.four3, q.four3 + 24, 6)}) scale(${sc})`} opacity={1 - 0.25 * on(f, q.not4, 8) * (1 - tt)}><rect x={-180} y={-80} width={360} height={150} rx={22} fill={col} /><Label x={0} y={18} text={t} size={58} font="Bebas Neue" color="#FFFFFF" /></g> })}
        <g opacity={win(f, q.not4, q.two5, 6)}><Label x={960} y={GROUND - 260} text="NOT 4 SEPARATE CHOICES" size={60} font="Bebas Neue" color={P.coralInk} /></g>
        <Person f={f} who="investor" beats={sBeats} x={lerp(960, 1220, on(f, q.allowed, 16))} y={GROUND} s={0.9} />
        <g opacity={on(f, q.join, 8)}><Label x={1220} y={GROUND + 60} text="NOT ALLOWED IN" size={42} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}
      {/* # C) five steps */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={on(f, q.picture, 8) * (1 - on(f, q.five, 10))}>
          <Parcel x={480} y={720} s={0.7} label="PACKAGE" col="#2A8FD0" glow={win(f, q.picture, q.simple6 + 20)} /><ListBoard x={960} y={640} s={0.55} ticks={6} /><ClubDoor x={1440} y={GROUND} s={0.62} />
          <g opacity={on(f, q.simple6, 8)}><Label x={960} y={GROUND + 60} text="THE WHOLE PICTURE, SIMPLE" size={46} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={on(f, q.walk, 8)}><line x1={330} y1={600} x2={330 + 1260 * on(f, q.steps, 30)} y2={600} stroke={P.goldInk} strokeWidth={6} strokeDasharray="14 12" /></g>
        {([[q.first, 'WHAT A FUND IS'], [q.each7, 'MUTUAL FUNDS'], [q.type7, 'INDEX FUNDS'], [q.one7, 'ETFS'], [q.one7b, 'HEDGE FUNDS']] as [number, string][]).map(([at, t], k) =>
          <StepBadge key={k} x={330 + k * 315} y={460 - 16 * pop(f, at, 14)} n={k + 1} t={t} o={on(f, at, 8)} lit={win(f, at, at + 24, 6)} />)}
        <g opacity={on(f, q.finally, 8)} transform={`translate(960 ${780 - 12 * pop(f, q.compare, 12)})`}><rect x={-260} y={-60} width={520} height={110} rx={20} fill={P.card} stroke={P.goldInk} strokeWidth={4} /><Label x={0} y={18} text={f >= q.compare ? 'THEN: COMPARE ALL 4' : 'AND FINALLY…'} size={56} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      <Headline f={f} lines={[[q.index, '4 KINDS OF FUNDS', P.ink, 104], [q.which, 'WHICH ONE FOR YOUR MONEY?', P.ink, 100], [q.pick, 'PICK BADLY…', P.coralInk, 106], [q.tens, 'TENS OF THOUSANDS TO FEES', P.coralInk, 100],
        [q.hear, 'THEY SOUND DIFFERENT', P.ink, 104], [q.thing4, 'WHAT MOST PEOPLE MISS', P.ink, 104], [q.two5, 'WHAT THEY REALLY ARE', P.ink, 104], [q.see6, 'NOW IT’S SIMPLE', P.ink, 106], [q.five, '5 SIMPLE STEPS', P.ink, 110]]} />
      <Vignette id="fd-hook" />
    </g>
  )
}

export const FD_HOOK = makePiece('fd-hook', 'Funds hook: four fund cards (index, mutual, ETF, hedge) pop up as named; Sam wonders which; an hourglass for 30 years while coins slip from Sam’s jar into a fee scoop unnoticed; the cards re-sort into two parcels (mutual fund, ETF = packages), a list board (index = strategy) and a private door behind a velvet rope (hedge fund) that shuts in front of Sam; five step badges and COMPARE', {
  mood: 'light', Component: Hook, beats: Object.values(K),
  sfx: [['s1:index', 'pop', 0.2], ['s2:fees', 'coin', 0.2], ['s5:packaged', 'pop', 0.2], ['s5:join', 'thud', 0.25], ['s7:five', 'pop', 0.2]] })
