// ---------------------------------------------------------------- s74–s83: one night vs millions of bets.
// One table under a spotlight with one player and a moon; the camera pulls back over a floor of many tables, each
// ticking chips into its tray. One player's stack jumps wildly up and down. Then a long row of bars — lucky nights
// up, unlucky nights down — that squeeze together and cancel until one thin bar is left just below the line: the
// edge. A crowd: some players smile, some don't; the house's balance settles and its tray fills anyway. For you: a
// pair of dice tumbling. For the casino: a bill that slides into the tray and gets stamped PAID. Down the hall, one
// machine lights up.
import React from 'react'
import { easeInOut, lerp, on, P, pop, rnd, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, Headline, Person, Stamp, win } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { Chip, CHIP, Slot, Stack, Table, Tray } from './kit'

const Average: React.FC<PieceProps> = ({ f, c }) => {
  const playing = c('s74:playing'), one = c('s74:one'), night = c('s74:night'), you = c('s74:you')
  const millions = c('s75:millions'), bets = c('s75:bets'), day = c('s75:day'), table = c('s75:table')
  const player76 = c('s76:player'), millions80 = c('s80:millions'), you81 = c('s81:you'), night81 = c('s81:night'), swing = c('s76:swing'), wildly = c('s76:wildly'), way = c('s76:way')
  const millions77 = c('s77:millions'), lucky = c('s77:lucky'), unlucky = c('s77:unlucky'), cancel = c('s77:cancel')
  const left78 = c('s78:left'), close = c('s78:close'), edge = c('s78:edge'), s79 = c('s79:casino'), need = c('s79:need')
  const every = c('s79:every'), lose = c('s79:lose'), average = c('s80:average'), hold = c('s80:hold'), does = c('s80:does')
  const gamble = c('s81:gamble'), casino82 = c('s82:casino'), bill = c('s82:bill'), paid = c('s82:paid')
  const game = c('s83:game'), collect = c('s83:collect'), faster = c('s83:faster')
  const A = win(f, 0, swing - 2), Bp = win(f, swing - 2, s79 - 2), Cp = win(f, s79 - 2, you81 - 2), D = on(f, you81 - 2, 10)
  const zoom = 1 - 0.62 * easeInOut(span(f, millions - 6, day + 10))
  return (
    <g>
      <Stage id="cs-avg" frame={f} />
      <Headline f={f} lines={[[one, 'YOU PLAY ONE NIGHT', P.ink, 108], [millions, 'THE CASINO PLAYS MILLIONS OF BETS', P.goldInk, 96], [swing, 'ONE NIGHT SWINGS WILDLY', P.ink, 104], [lucky, 'LUCKY AND UNLUCKY NIGHTS…', P.ink, 104], [cancel, '…CANCEL OUT', P.ink, 112],
        [close, 'WHAT IS LEFT ≈ THE EDGE', P.goldInk, 108], [every, 'NOT EVERY PLAYER LOSES', P.ink, 104], [average, 'THE AVERAGE HOLDS', P.goldInk, 112], [gamble, 'FOR YOU: A GAMBLE', P.ink, 108], [casino82, 'FOR THE CASINO: A BILL PAID', P.goldInk, 104], [game, 'ONE GAME COLLECTS FASTEST', P.goldInk, 104]]} />
      {/* # A: one table → a whole floor of tables */}
      {A > 0 && <g opacity={A} transform={`translate(960 560) scale(${zoom}) translate(-960 -560)`}>
        {Array.from({ length: 49 }, (_, i) => {
          const c0 = (i % 7) - 3, r0 = Math.floor(i / 7) - 3, cx = 960 + c0 * 980, cy = 640 + r0 * 520
          if (c0 === 0 && r0 === 0) return null
          if (560 + (cy - 560) * zoom < 300) return null
          return <g key={i} opacity={on(f, millions + rnd(i) * 30, 10)}><Table x={cx} y={cy} w={760} d={220} /><Tray x={cx + 200} y={cy - 40} s={0.4} fill={0.2 + ((f / 40 + rnd(i * 5)) % 1) * 0.5} /></g>
        })}
        <ellipse cx={960} cy={760} rx={620} ry={300} fill={P.gold} opacity={0.12 * (1 - on(f, millions, 12))} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [night, 'lookFar', 'thinking'], [you, 'point', 'neutral']] as Beat[]} x={760} y={690} s={0.75} />
        <Table x={960} y={640} w={760} d={220} />
        <g opacity={on(f, night, 8) * (1 - on(f, millions, 10))}><circle cx={1500} cy={260} r={60} fill={P.cream} /><circle cx={1530} cy={240} r={56} fill="var(--cc-bg1, #0E1B33)" /></g>
        <g opacity={on(f, playing, 8)}><Stack x={1040} y={760} n={6} s={0.7} color={CHIP.red} /></g>
        <g opacity={on(f, bets, 8)}>{Array.from({ length: 12 }, (_, k) => { const ph = ((f - bets) / 18 + k / 12) % 1, ang = k * 0.52; return <Chip key={k} x={960 + Math.cos(ang) * (300 + ph * 1400)} y={600 + Math.sin(ang) * (200 + ph * 900)} s={1.2} color={CHIP.gold} /> })}</g>
        <g opacity={on(f, table, 8)}><Label x={960} y={1040} text="EVERY TABLE, EVERY DAY" size={90} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {/* # B: one stack jumps wildly; then many bars cancel down to the thin edge */}
      {Bp > 0 && <g opacity={Bp}>
        <g opacity={1 - on(f, millions77 - 4, 10)}>
          <rect x={460} y={560} width={1000} height={4} fill={P.ink2} opacity={0.6} />
          <g opacity={on(f, player76, 8)}><Stack x={960} y={820} n={Math.round(12 + 10 * Math.sin((f - swing) / 9) * on(f, wildly, 10))} s={1.6} color={CHIP.blue} /></g>
          <Person f={f} who="investor" beats={[[0, 'think', 'thinking'], [wildly, 'shock', 'shocked'], [way, 'nervous', 'worried']] as Beat[]} x={560} y={1000} s={0.9} />
          <g opacity={on(f, way, 8)}><Label x={1400} y={420} text="UP…" size={70} font="Bebas Neue" color={P.mintInk} /><Label x={1400} y={760} text="…OR DOWN" size={70} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, millions77 - 4, 10)}>
          <rect x={160} y={560} width={1600} height={4} fill={P.ink2} opacity={0.6} />
          {Array.from({ length: 40 }, (_, k) => {
            const v = (rnd(k * 7.3) - 0.47) * 2, squeeze = easeInOut(span(f, cancel, close + 10)), h = lerp(v * 300, k === 0 ? -110 : -16, squeeze)
            const x = lerp(180 + k * 40, 960 - 18 + (k % 2) * 0, squeeze), lit = v > 0 ? on(f, lucky, 8) : on(f, unlucky, 8)
            return <rect key={k} x={x} y={h > 0 ? 560 - h : 564} width={30 + (k === 0 ? 50 * squeeze : -6 * squeeze)} height={Math.abs(h)} rx={6} fill={h > 0 ? P.mint : P.coral} opacity={(0.25 + 0.75 * lit) * (k === 0 ? 1 : 1 - 0.95 * squeeze)} />
          })}
          <ellipse cx={960} cy={580} rx={90 * on(f, left78, 10)} ry={40 * on(f, left78, 10)} fill={P.coral} opacity={0.25} />
          <g opacity={on(f, edge, 8)}><Label x={1080} y={660} text="THE EDGE ≈ 5.3%" size={80} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
        </g>
      </g>}
      {/* # C: a crowd — some win, some lose; the house tray fills anyway */}
      {Cp > 0 && <g opacity={Cp}>
        {Array.from({ length: 16 }, (_, k) => <g key={k} opacity={on(f, need + k * 1.2, 8)}><Mini look={['buyer', 'investor', 'hero', 'owner', 'worker'][k % 5]} x={140 + (k % 8) * 140} y={k < 8 ? 720 : 1000} scale={1.2} frame={f} seed={k + 11} mood={f >= lose ? (rnd(k * 2.7) < 0.3 ? 'happy' : 'sad') : 'neutral'} /></g>)}
        <g opacity={on(f, s79, 10)}><Tray x={1560} y={760} s={1} fill={0.2 + 0.6 * on(f, hold, 40)} label="HOUSE" /></g>
        <g opacity={on(f, average, 8)} transform={`translate(1560 420) scale(${pop(f, average)})`}><rect x={-200} y={-60} width={400} height={110} rx={20} fill={P.card} /><Label x={0} y={22} text="AVERAGE: −5.3%" size={60} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, millions80, 8)}>{Array.from({ length: 12 }, (_, k) => <rect key={k} x={1300 + (k % 6) * 90} y={260 + Math.floor(k / 6) * 60} width={70} height={36} rx={18} fill="#1F7A52" opacity={0.5 + 0.5 * Math.sin(f / 5 + k)} />)}</g>
        <g opacity={on(f, does, 8)}><Label x={1560} y={1000} text="EVERY DAY" size={56} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {/* # D: dice for you, a paid bill for the casino, then the slot machine lights up */}
      {D > 0 && <g opacity={D} transform={camera(f, [[0, 960, 560, 1], [game, 1500, 560, 1.15]], 20)}>
        <g opacity={1 - on(f, game - 2, 10)}>
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [night81, 'holdUp', 'thinking'], [gamble, 'point', 'neutral']] as Beat[]} x={160} y={1000} s={0.8} />
          {[0, 1].map((k) => { const t = span(f, gamble - 10 + k * 3, gamble + 14 + k * 3), r = (1 - t) * 540; return <g key={k} transform={`translate(${lerp(200, 520 + k * 150, easeInOut(t))} ${560 - Math.abs(Math.sin(t * 9)) * 80 * (1 - t)}) rotate(${r})`}>
            <rect x={-55} y={-55} width={110} height={110} rx={20} fill="#FFFFFF" />{[[-28, -28], [0, 0], [28, 28]].map(([px, py], j) => <circle key={j} cx={px} cy={py} r={10} fill={CHIP.red} />)}</g> })}
          <Tray x={1340} y={760} s={0.9} fill={0.6} label="HOUSE" />
          {f >= bill && (() => { const t = easeInOut(span(f, bill, paid)); return <g transform={`translate(${lerp(1800, 1340, t)} ${lerp(300, 620, t)}) rotate(${lerp(10, -4, t)})`}>
            <rect x={-130} y={-170} width={260} height={340} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={3} /><text x={0} y={-110} textAnchor="middle" fill={P.navy2} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>BILL</text>
            {[0, 1, 2].map((k) => <rect key={k} x={-90} y={-60 + k * 40} width={180 - k * 30} height={14} rx={7} fill="#C8B994" />)}</g> })()}
          <Stamp x={1340} y={560} text="PAID" f={f} at={paid} color={P.mintInk} />
        </g>
        <g opacity={on(f, game - 2, 10)}>
          {[600, 900, 1200].map((x, k) => <g key={x} opacity={0.35}><Slot x={x} y={980} s={0.55 + k * 0.05} f={f} lit={0} /></g>)}
          <Slot x={1560} y={1000} s={0.9} f={f} lit={on(f, collect, 10)} spinAt={faster} spinFor={60} />
          <ellipse cx={1560} cy={560} rx={340 * on(f, collect, 12)} ry={420 * on(f, collect, 12)} fill={P.gold} opacity={0.12} />
        </g>
      </g>}
      <Vignette id="cs-avg" />
    </g>
  )
}

const BEATS = ['s76:player', 's80:millions', 's81:you', 's81:night', 's78:left', 's79:casino', 's79:need', 's74:playing', 's74:one', 's74:night', 's74:you', 's75:millions', 's75:bets', 's75:day', 's75:table', 's76:swing', 's76:wildly', 's76:way', 's77:millions', 's77:lucky', 's77:unlucky', 's77:cancel',
  's78:close', 's78:edge', 's79:every', 's79:lose', 's80:average', 's80:hold', 's80:does', 's81:gamble', 's82:casino', 's82:bill', 's82:paid', 's83:game', 's83:collect', 's83:faster']
export const CS_AVERAGE = makePiece('cs-average', 'Casino long: one table at night → a floor of many tables; one stack swings wildly; many lucky/unlucky bars cancel down to the thin edge; a crowd of winners and losers while the tray fills; dice vs a bill stamped PAID; a slot machine lights up', {
  mood: 'dark', Component: Average, beats: BEATS,
  sfx: [['s75:millions', 'riser', 0.3], ['s76:wildly', 'swish', 0.3], ['s77:cancel', 'whoosh', 0.3], ['s78:edge', 'ding', 0.35], ['s80:hold', 'coin', 0.35], ['s81:gamble', 'click', 0.4], ['s82:paid', 'impact', 0.4], ['s83:collect', 'chime', 0.35]] })
