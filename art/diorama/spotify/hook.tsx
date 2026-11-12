// ---------------------------------------------------------------- s1–s8: the hook.
// A) A crowd of listeners with phones fills the street ("290 million pay for Premium"). A loss chart: red bars for each
//    year 2018–2023, then a green bar for 2024.
// B) Where did the money go? A big music-app box with coins pouring in at the top; a pipe at the bottom carries most of
//    them straight out to a "music owners" building (68¢ of every €1). A € sign: "we'll follow the euros".
// C) The four steps as icons: a price tag, a record label, a coin kept, a rising arrow.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Euro, GREEN, LabelHQ, MusicPhone, SSpot } from './kit'

const GROUND = 900
const LOOKS = ['buyer', 'investorF', 'hero', 'worker', 'owner', 'investor']
const LOSSES: [string, number][] = [['2018', -78], ['2019', -186], ['2020', -581], ['2021', -34], ['2022', -430], ['2023', -532], ['2024', 1138]]

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const d290 = c('s1:290'), people = c('s1:people'), pay1 = c('s1:pay'), premium1 = c('s1:premium')
  const yet = c('s2:yet'), listed = c('s2:listed'), y2018 = c('s2:2018'), lost2 = c('s2:lost'), every2 = c('s2:every'), until = c('s2:until'), y2024 = c('s2:2024')
  const where3 = c('s3:where'), subscription = c('s3:subscription'), go3 = c('s3:go')
  const most4 = c('s4:most'), never4 = c('s4:never'), stayed = c('s4:stayed')
  const biggest = c('s5:biggest'), hundreds = c('s5:hundreds'), listeners = c('s5:listeners'), life = c('s5:life'), passed = c('s5:passed'), through5 = c('s5:through')
  const y2025 = c('s6:2025'), d68 = c('s6:68'), euro6 = c('s6:euro'), went6 = c('s6:went'), out6 = c('s6:out'), payments = c('s6:payments'), music6 = c('s6:music')
  const reports = c('s7:reports'), euros7 = c('s7:euros'), follow7 = c('s7:follow')
  const four = c('s8:four'), really8 = c('s8:really'), paid8 = c('s8:paid'), keeps8 = c('s8:keeps'), profit8 = c('s8:profit')

  const AB = where3 - 6, BC = four - 6
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, yet - 4, 10), A2 = on(f, yet - 4, 10)

  return (
    <g>
      <Stage id="sp-hook" frame={f} />
      <SSpot f={f} at={d68} x={1100} y={700} rx={230} ry={140} />
      <Headline f={f} lines={[[d290, '≈ 290 MILLION PAY FOR PREMIUM', P.ink, 96], [lost2, 'BUT IT LOST MONEY…', P.coralInk, 104], [y2024, '…EVERY YEAR UNTIL 2024', P.coralInk, 100], [where3, 'WHERE DID THE MONEY GO?', P.ink, 104], [d68, '≈ 68¢ OF EVERY €1 WENT OUT', P.ink, 96], [reports, 'FOLLOW THE EUROS', P.ink, 110], [four, '4 SIMPLE STEPS', P.ink, 110]]} />

      {/* # A) the listeners; the losses */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          {Array.from({ length: 14 }, (_, k) => <g key={k} opacity={on(f, d290 + k * 2, 5)}><Mini look={LOOKS[k % 6]} x={120 + k * 128} y={GROUND - (k % 2) * 30} scale={0.75} frame={f} seed={k + 1} mood="happy" />
            <g transform={`translate(${120 + k * 128 + 26} ${GROUND - 130 - (k % 2) * 30})`} opacity={on(f, pay1, 8)}><rect x={-12} y={-20} width={24} height={40} rx={5} fill="#111A2E" /><rect x={-8} y={-14} width={16} height={22} rx={3} fill={GREEN} /></g></g>)}
          <g opacity={on(f, premium1, 8)} transform={`translate(960 ${380 - 16 * pop(f, premium1, 12)})`}><rect x={-200} y={-50} width={400} height={100} rx={20} fill={GREEN} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>PREMIUM</text></g>
        </g>
        <g opacity={A2}>
          <line x1={300} y1={560} x2={1640} y2={560} stroke={P.ink} strokeWidth={5} /><Label x={280} y={572} text="€0" size={44} font="Bebas Neue" color={P.ink} anchor="end" />
          {LOSSES.map(([yr, v], k) => { const x = 400 + k * 190, at = k === 0 ? y2018 : k === 6 ? y2024 : lerp(every2, until, (k - 1) / 5), h = Math.abs(v) * 0.3 * on(f, at, 14)
            return <g key={k} opacity={on(f, at, 6)}><rect x={x - 60} y={v < 0 ? 560 : 560 - h} width={120} height={h} rx={10} fill={v < 0 ? P.coral : P.mint} /><Label x={x} y={v < 0 ? 530 : 600} text={yr} size={42} font="Bebas Neue" color={P.ink} /></g> })}
          <g opacity={on(f, listed, 8)} transform={`translate(560 ${380 - 14 * pop(f, listed, 12)})`}><rect x={-250} y={-36} width={500} height={72} rx={12} fill={P.navy3} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>2018: LISTED ON THE STOCK MARKET</text></g>
          <g opacity={on(f, lost2, 8)}><Label x={900} y={860} text="LOSSES" size={48} font="Bebas Neue" color={P.coralInk} /></g>
          <Person f={f} who="investorF" beats={[[0, 'idle', 'thinking'], [lost2, 'shrug', 'worried'], [y2024, 'point', 'smiling']]} x={1790} y={GROUND} s={0.75} flip />
        </g>
      </g>}

      {/* # B) the money passes through */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g transform="translate(700 0)">
          <rect x={-200} y={GROUND - 500} width={400} height={420} rx={30} fill="#191F2E" />
          <circle cx={0} cy={GROUND - 330} r={70} fill={GREEN} /><path d="M-22 -360 L36 -330 L-22 -300 Z" transform={`translate(0 ${GROUND})`} fill="#FFFFFF" />
          <text y={GROUND - 200} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 4 }}>SPOTIFY</text>
          <rect x={-60} y={GROUND - 80} width={120} height={80} fill="#5A6680" />
        </g>
        {/* # coins pour in from listeners on the left */}
        {f >= subscription && Array.from({ length: 8 }, (_, k) => { const fl = fly(f, subscription + k * 5, [180, 500], [700, GROUND - 500], 16, 120); return fl.t < 1 ? <Euro key={k} x={fl.x} y={fl.y} r={24} /> : null })}
        <g opacity={on(f, subscription, 8)}><Mini look="investorF" x={180} y={GROUND} scale={0.9} frame={f} seed={7} mood="happy" /><MusicPhone x={290} y={640} s={0.4} f={f} playing={1} /></g>
        {/* # the pipe out to the music's owners */}
        <g opacity={on(f, most4, 8)}><rect x={760} y={GROUND - 60} width={640} height={40} rx={20} fill="#8A97AA" /><LabelHQ x={1560} y={GROUND} s={0.85} f={f} t="MUSIC OWNERS" /></g>
        {f >= never4 && Array.from({ length: 7 }, (_, k) => { const t = ((f - never4) / 50 + k / 7) % 1; return <Euro key={k} x={lerp(800, 1400, t)} y={GROUND - 40} r={18} o={on(f, never4, 10)} /> })}
        <g opacity={on(f, d68, 8)} transform={`translate(1100 ${560 - 16 * pop(f, d68, 12)})`}><rect x={-170} y={-50} width={340} height={100} rx={16} fill={P.gold} /><text y={20} textAnchor="middle" fill={P.navy0} style={{ font: '400 56px "Bebas Neue"' }}>68¢ OF EVERY €1</text></g>
        <g opacity={on(f, payments, 8)}><Label x={1100} y={GROUND + 56} text={f >= music6 ? 'MOSTLY PAYMENTS FOR THE MUSIC' : 'PAYMENTS…'} size={42} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, c('s4:all'), 8) * (1 - on(f, d68, 8))} transform={`translate(0 ${-10 * pop(f, c('s5:one'), 12) - 10 * pop(f, passed, 12)})`}><Label x={950} y={560} anchor="start" text={f >= passed ? 'IT MOSTLY PASSED THROUGH' : 'NEVER STAYED'} size={48} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, euros7, 8)} transform={`translate(1700 ${400 - 14 * pop(f, follow7, 12) - 12 * pop(f, c('s8:subscription'), 12)})`}><Euro x={0} y={0} r={70} /></g>
      </g>}

      {/* # C) four steps */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {([[really8, 'WHAT YOU REALLY PAY', P.sky], [paid8, 'WHO GETS PAID FIRST', '#9D7FD0'], [keeps8, 'WHAT SPOTIFY KEEPS', P.gold], [profit8, 'HOW IT TURNED A PROFIT', GREEN]] as [number, string, string][]).map(([at, t, col], k) => {
          const x = 300 + k * 440
          return <g key={k} opacity={on(f, Math.min(at, four + k * 6), 8)} transform={`translate(${x} ${GROUND - 120 - 20 * pop(f, at, 14)})`}>
            {k === 0 && <g transform="translate(0 -110)"><rect x={-70} y={-40} width={140} height={80} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={4} /><text y={14} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>€ ?</text></g>}
            {k === 1 && <g transform="translate(0 -40) scale(0.42)"><LabelHQ x={0} y={0} f={f} t="LABEL" /></g>}
            {k === 2 && <g transform="translate(0 -110)"><Euro x={0} y={0} r={44} /></g>}
            {k === 3 && <path d="M-50 -60 L0 -150 L50 -60 Z M-20 -60 L-20 -20 L20 -20 L20 -60" fill={GREEN} />}
            <circle cx={0} cy={40} r={36} fill={col} /><text x={0} y={58} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{k + 1}</text>
            <Label x={0} y={130} text={t} size={40} font="Bebas Neue" color={P.ink} />
          </g> })}
      </g>}
      <Vignette id="sp-hook" />
    </g>
  )
}

const BEATS = ['s8:subscription', 's4:all', 's5:one', 's1:290', 's1:people', 's1:pay', 's1:premium', 's2:yet', 's2:listed', 's2:2018', 's2:lost', 's2:every', 's2:until', 's2:2024', 's3:where', 's3:subscription', 's3:go', 's4:most', 's4:never', 's4:stayed', 's5:biggest', 's5:hundreds', 's5:listeners', 's5:life', 's5:passed', 's5:through', 's6:2025', 's6:68', 's6:euro', 's6:went', 's6:out', 's6:payments', 's6:music', 's7:reports', 's7:euros', 's7:follow', 's8:four', 's8:really', 's8:paid', 's8:keeps', 's8:profit']
export const SP_HOOK = makePiece('sp-hook', 'Spotify long hook: a crowd of listeners, about 290 million pay for Premium; a chart of yearly net losses from the 2018 listing to 2023 and a profit in 2024; where did the money go: coins pour into the music app and about 68 cents of every euro flows straight out through a pipe to the music owners; follow the euros; four steps', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:290', 'pop', 0.2], ['s2:lost', 'thud', 0.25], ['s2:2024', 'pop', 0.2], ['s3:subscription', 'coin', 0.2], ['s6:68', 'pop', 0.25], ['s8:four', 'pop', 0.25]] })
