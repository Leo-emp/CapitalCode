// ---------------------------------------------------------------- s8–s21: the simplest bet, and the two green pockets.
// A $10 chip drops on RED; the wheel rolls in and its 38 pockets fill in around the rim; 18 red, 18 black and the two
// green pockets (0, 00) light up in turn. The ball lands on red (a second chip is paid), on black (the chip is swept
// away), then on green (both RED and BLACK bets are swept). A coin that looks fair flips — but a green slice is cut
// from it. Without green the balance sits level and the house tray stays empty; with it, 18 red chips against 20
// (18 black + 2 green) tip the balance, and the two green chips roll into the house tray. A single-number bet pays a
// stack of 35 chips, but 37 would be fair — two ghost chips are missing on top. Every betting box gets its green notch.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { camera, Headline } from '../aimoney/common'
import { Balance, Chip, CHIP, pocketOf, Stack, Table, Tray, Wheel } from './kit'

const WheelPiece: React.FC<PieceProps> = ({ f, c }) => {
  const simplest = c('s8:simplest'), ten = c('s9:10'), red9 = c('s9:red'), wheel9 = c('s9:wheel')
  const b38 = c('s10:38'), red11 = c('s11:red'), black11 = c('s11:black'), green11 = c('s11:green'), zero = c('s11:zero'), dzero = c('s11:zero#2')
  const lands = c('s12:lands'), win12 = c('s12:win'), else13 = c('s13:else'), lose13 = c('s13:lose')
  const green14 = c('s14:green'), red14 = c('s14:red'), black14 = c('s14:black'), loses14 = c('s14:loses')
  const coin = c('s15:coin'), flip = c('s15:flip'), not15 = c('s15:not')
  const only = c('s16:only'), half = c('s16:half'), nothing = c('s16:nothing')
  const p18 = c('s17:18'), p20 = c('s17:20'), two = c('s18:two'), business = c('s18:business')
  const single = c('s19:single'), pays = c('s19:pays'), b35 = c('s19:35')
  const n38 = c('s20:38'), fair = c('s20:fair'), b37 = c('s20:37')
  const every = c('s21:every'), same = c('s21:same')
  // # phases: A = wheel + table (s8–s14), B = coin + balance (s15–s18), C = single-number payout (s19–s21)
  const B = on(f, coin - 4, 12), C = on(f, single - 4, 12)
  // # the ball: lands on 1 (red), then 15 (black), then 0 (green)
  const ballPocket = f >= green14 - 6 ? pocketOf('0') : f >= else13 - 6 ? pocketOf('15') : f >= lands - 6 ? pocketOf('1') : -1
  const rot = f < lands - 6 ? f * 1.2 : (lands - 6) * 1.2
  const shown = Math.round(38 * easeInOut(span(f, b38 - 6, b38 + 22)))
  // # the chip on RED; paid on "win"; swept on "else"; a new chip on RED + one on BLACK, both swept on "loses"
  const sweep = (a: number) => easeInOut(span(f, a, a + 16))
  return (
    <g>
      <Stage id="cs-wheel" frame={f} />
      <Headline f={f} lines={[[simplest, 'THE SIMPLEST BET', P.ink, 104], [b38, '38 POCKETS', P.ink, 112], [lands, 'RED: YOU WIN $10', P.mintInk, 104], [else13, 'ANYTHING ELSE: YOU LOSE $10', P.coralInk, 100], [green14, 'GREEN: RED AND BLACK BOTH LOSE', P.coralInk, 96],
        [coin, 'A FAIR COIN FLIP?', P.ink, 104], [only, 'ONLY RED AND BLACK', P.ink, 104], [p18, 'WIN ON 18 · LOSE ON 20', P.ink, 104], [two, 'THE WHOLE BUSINESS', P.goldInk, 112], [single, 'ONE NUMBER PAYS 35 TO 1', P.ink, 100], [fair, 'FAIR WOULD BE 37 TO 1', P.goldInk, 100], [every, 'EVERY BET, THE SAME WAY', P.ink, 104]]} />
      {/* # A: wheel left, table right */}
      <g opacity={1 - B} transform={camera(f, [[0, 960, 560, 1], [b38, 700, 580, 1.08], [lands, 960, 560, 1]], 18)}>
        <g transform={`translate(${lerp(-700, 0, easeInOut(span(f, wheel9 - 8, wheel9 + 14)))} 0)`}>
          <Wheel cx={640} cy={600} r={330} rot={rot} shown={shown} ball={ballPocket}
            glowRed={on(f, red11, 8) * (1 - on(f, black11, 8)) + on(f, lands, 8) * (1 - on(f, else13, 8))} dimRed={on(f, black11, 8) * (1 - on(f, lands - 10, 8))}
            dimBlack={(on(f, red11, 8) * (1 - on(f, black11, 8)) + on(f, green11, 8) * (1 - on(f, lands - 10, 8)))} glowGreen={on(f, green11, 8) * (1 - on(f, lands - 10, 8)) + on(f, green14, 8)} />
          {[[zero, '0', -1], [dzero, '00', 1]].map(([a, t, side]) => {
            const i = pocketOf(t as string), ang = ((rot + ((i + 0.5) * 360) / 38 - 90) * Math.PI) / 180
            const px = 640 + Math.cos(ang) * 330 * 1.18, py = 600 + Math.sin(ang) * 330 * 0.62 * 1.18
            return <g key={t as string} opacity={on(f, a as number, 8) * (1 - on(f, lands - 10, 8))}><circle cx={px} cy={py} r={44} fill={CHIP.green} stroke={P.white} strokeWidth={4} /><Label x={px} y={py + 16} text={t as string} size={46} font="Bebas Neue" color={P.white} /></g>
          })}
        </g>
        <Table x={1380} y={700} w={760} d={260} red={on(f, red9, 8) * (1 - on(f, lands - 6, 6))} />
        {/* # the $10 chip on RED */}
        {(() => {
          const drop = easeInOut(span(f, ten, ten + 12)), y = lerp(560, 840, drop), out = sweep(lose13)
          return f >= ten && f < green14 ? <g opacity={1 - out}><Chip x={1250 + out * 500} y={y} s={1.1} color={CHIP.blue} label="$10" /></g> : null
        })()}
        {/* # paid on "win": a second chip slides in beside it, then both are swept on "else" (she lost the next spin) */}
        {f >= win12 && f < green14 && <g opacity={1 - sweep(lose13)}><Chip x={lerp(1700, 1250, easeInOut(span(f, win12, win12 + 12))) + sweep(lose13) * 500} y={830} s={1.1} color={CHIP.gold} label="$10" /></g>}
        {/* # on green: one chip on RED and one on BLACK, both swept */}
        {f >= green14 && [[1250, CHIP.blue, red14], [1510, CHIP.black, black14]].map(([x, col, at], k) => <g key={k} opacity={on(f, at as number, 6) * (1 - sweep(loses14))}><Chip x={(x as number) + sweep(loses14) * 600} y={840} s={1.1} color={col as string} label="$10" /></g>)}
      </g>
      {/* # B: the coin and the balance */}
      {B > 0 && C < 1 && <g opacity={B * (1 - C)}>
        {/* # the coin flips on "flip"; on "not" a green slice is cut out of it */}
        <g opacity={1 - on(f, only, 10)} transform={`translate(960 560) scale(${Math.cos((Math.max(0, f - flip) / 6) * Math.PI) * (f < not15 ? 1 : 0) + (f >= not15 ? 1 : 0)} 1)`}>
          <circle r={230} fill={P.goldD} transform="translate(0 14)" /><circle r={230} fill={P.gold} />
          <path d="M0 -200 A200 200 0 0 1 0 200 Z" fill={CHIP.black} opacity={0.85} /><path d="M0 -200 A200 200 0 0 0 0 200 Z" fill={CHIP.red} opacity={0.85} />
          {f >= not15 && <path d="M0 0 L-60 -192 A200 200 0 0 1 60 -192 Z" fill={CHIP.green} transform={`translate(0 ${-40 * on(f, not15, 10)})`} />}
        </g>
        <g opacity={on(f, only, 10)}>
          <Balance x={900} y={360} s={1.3} tilt={lerp(0, 0.9, easeInOut(span(f, p20, p20 + 18)))}
            left={<g>{Array.from({ length: Math.round(18 * on(f, f >= p18 ? p18 : only, 16)) }, (_, k) => <Chip key={k} x={-80 + (k % 5) * 40} y={-Math.floor(k / 5) * 14} s={0.42} color={CHIP.red} />)}</g>}
            right={<g>{Array.from({ length: Math.round(18 * on(f, only, 16)) }, (_, k) => <Chip key={k} x={-80 + (k % 5) * 40} y={-Math.floor(k / 5) * 14} s={0.42} color={CHIP.black} />)}
              {f >= p20 && f < two + 14 && [0, 1].map((k) => <Chip key={k} x={-20 + k * 40} y={-60} s={0.42} color={CHIP.green} />)}</g>} />
          {/* # labels stuck to each pan */}
          <g opacity={on(f, p18, 8)}><Label x={900 - 390} y={760 - 60 * lerp(0, 0.9, easeInOut(span(f, p20, p20 + 18)))} text="18 WIN" size={56} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, p20, 8)}><Label x={900 + 390} y={760 + 70 * lerp(0, 0.9, easeInOut(span(f, p20, p20 + 18)))} text="20 LOSE" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, half, 8) * (1 - on(f, p18, 8))}><Label x={900} y={1010} text="HALF THE TIME" size={56} font="Bebas Neue" color={P.ink} /></g>
          {/* # the house tray: empty on "nothing"; the two green chips roll into it on "two"; it glows on "business" */}
          <g opacity={on(f, nothing, 8)}><Tray x={1620} y={820} s={0.85} fill={on(f, two + 6, 16) * 0.35} label={f < two ? 'HOUSE: $0' : 'HOUSE'} /></g>
          {f >= two && f < two + 22 && [0, 1].map((k) => { const t = easeInOut(span(f, two + k * 3, two + 16 + k * 3)); return <Chip key={k} x={lerp(1290 + k * 40, 1620, t)} y={lerp(620, 800, t) - Math.sin(t * Math.PI) * 120} s={0.5} color={CHIP.green} /> })}
          {f >= business && <ellipse cx={1620} cy={820} rx={220 * on(f, business, 10)} ry={60 * on(f, business, 10)} fill={P.gold} opacity={0.25 * (1 - on(f, single - 8, 8))} />}
        </g>
      </g>}
      {/* # C: one number pays 35 to 1; fair would be 37 */}
      {C > 0 && <g opacity={C}>
        {/* # the number strip: 38 boxes appear on "38 numbers", 17 is the bet */}
        <g transform="translate(160 720)">
          {Array.from({ length: 38 }, (_, k) => {
            const t = k === 0 ? '0' : k === 37 ? '00' : String(k), col = t === '0' || t === '00' ? CHIP.green : [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(+t) ? CHIP.red : CHIP.black
            const show = k === 17 ? on(f, single, 8) : on(f, n38 + k * 0.6, 8)
            return <g key={k} opacity={show}><rect x={k * 42} y={0} width={38} height={60} rx={6} fill={col} stroke={k === 17 ? P.gold : 'none'} strokeWidth={5} /><text x={k * 42 + 19} y={42} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 26px "Bebas Neue"' }}>{t}</text></g>
          })}
          <g opacity={on(f, single, 8)}><Chip x={17 * 42 + 19} y={lerp(-200, -10, easeInOut(span(f, single, single + 12)))} s={0.7} color={CHIP.blue} label="$1" /></g>
          <g opacity={on(f, n38 + 20, 8)}><Label x={38 * 21} y={130} text="38 NUMBERS" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # the payout stack: 35 chips build on "35"; two ghost chips on top show what a fair 37 would add */}
        {[0, 1, 2, 3, 4].map((k) => <Stack key={k} x={700 + k * 110} y={560} n={Math.max(0, Math.min(7, Math.round(35 * easeInOut(span(f, pays, b35 + 14))) - k * 7))} s={1.1} color={CHIP.gold} />)}
        <g opacity={on(f, b35, 8)}><Label x={920} y={330} text="35 CHIPS" size={110} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
        {f >= fair && [0, 1].map((k) => <g key={k} opacity={on(f, b37 + k * 4, 8) * (0.6 + 0.2 * Math.sin(f / 6))}><ellipse cx={1250} cy={560 - k * 10} rx={48} ry={22} fill="none" stroke={P.goldInk} strokeWidth={5} strokeDasharray="8 6" /></g>)}
        <g opacity={on(f, b37, 8)}><Label x={1250} y={470} text="+2" size={70} font="Bebas Neue" color={P.ink} anchor="start" /></g>
        {/* # every bet has the same notch: four betting boxes each get a green sliver */}
        {['RED', 'BLACK', '1–12', '17'].map((t, k) => <g key={t} opacity={on(f, every + k * 5, 8)} transform={`translate(${1340 + (k % 2) * 260} ${470 + Math.floor(k / 2) * 150}) scale(${pop(f, every + k * 5)})`}>
          <rect x={-110} y={-50} width={220} height={100} rx={14} fill={k === 0 ? CHIP.red : k === 1 ? CHIP.black : '#1F7A52'} /><text x={0} y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 48px "Bebas Neue"' }}>{t}</text>
          <path d="M80 -50 L110 -50 L110 -20 Z" fill={CHIP.green} stroke="#FFFFFF" strokeWidth={3} opacity={on(f, same, 8)} />
        </g>)}
      </g>}
      <Vignette id="cs-wheel" />
    </g>
  )
}

const BEATS = ['s14:red', 's14:black', 's8:simplest', 's9:10', 's9:red', 's9:wheel', 's10:38', 's11:red', 's11:black', 's11:green', 's11:zero', 's11:zero#2', 's12:lands', 's12:win', 's13:else', 's13:lose', 's14:green', 's14:loses',
  's15:coin', 's15:flip', 's15:not', 's16:only', 's16:half', 's16:nothing', 's17:18', 's17:20', 's18:two', 's18:business', 's19:single', 's19:pays', 's19:35', 's20:38', 's20:fair', 's20:37', 's21:every', 's21:same']
export const CS_WHEEL = makePiece('cs-wheel', 'Casino long: $10 on red; the 38-pocket wheel fills in; red/black/green light up; win, lose, green sweeps both; coin with a green slice; balance 18 vs 20; green chips into the house; 35 paid vs 37 fair; every bet notched', {
  mood: 'light', Component: WheelPiece, beats: BEATS,
  sfx: [['s9:10', 'click', 0.45], ['s10:38', 'tick', 0.3], ['s12:lands', 'click', 0.4], ['s12:win', 'coin', 0.45], ['s13:lose', 'swish', 0.4], ['s14:loses', 'swish', 0.4], ['s15:flip', 'flutter', 0.35], ['s17:20', 'thud', 0.4], ['s18:two', 'coin', 0.45], ['s19:35', 'cash', 0.4], ['s21:every', 'pop', 0.3]] })
