// ---------------------------------------------------------------- s50–s56: the real scoreboard (US home, car and business insurers)
// A harbour pier at bright noon with a big wooden scoreboard. Each year is a bay with two piles of coins on a waterline:
// INSURANCE (red coins sink below the line for a loss) and INVESTMENTS (gold coins stack up). 1 coin = $5 billion.
// 2023: insurance −$21B, combined ratio over 101% (s51); investments +$70B (s52). 2024: insurance +$23B (s53); investments $85B, nearly 4× (s54).
// 2025: insurance +$61B, BEST IN A DECADE (s55). Then the insurance piles bob up and down while the investment piles glow every year (s56).
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { C, Coin, Defs, Flag, Grain, SkyBg, big, fadeIn } from './kit'

const Y0 = 700  // # the waterline of the board
const Pile: React.FC<{ x: number; n: number; red?: boolean; o: number; glow?: number }> = ({ x, n, red, o, glow = 0 }) => o <= 0.01 ? null : (
  <g opacity={o}>
    {glow > 0 && <circle cx={x} cy={Y0 - n * 9} r={90 + n * 4} fill="url(#in-glow)" opacity={glow} />}
    {[...Array(Math.max(0, Math.round(n)))].map((_, k) => { const y = red ? Y0 + 16 + k * 16 : Y0 - 8 - k * 16
      return <g key={k}><ellipse cx={x} cy={y + 5} rx={56} ry={13} fill={red ? C.redD : C.goldD} /><ellipse cx={x} cy={y} rx={56} ry={13} fill={red ? C.red : C.gold} /></g> })}
  </g>
)
const Score: React.FC<PieceProps> = ({ f, c }) => {
  const whole = c('s50:whole'), real = c('s50:real'), y23 = c('s51:american'), lost = c('s51:lost'), combined = c('s51:combined'), inv23 = c('s52:investments'), seventy = c('s52:seventy')
  const twenty = c('s51:twenty'), itself = c('s51:itself'), income52 = c('s52:income'), times = c('s54:times'), y24 = c('s53:prices'), gain = c('s53:gain'), inv24 = c('s54:investments'), eighty = c('s54:eighty'), four = c('s54:four'), y25 = c('s55:insurance'), sixty = c('s55:sixty'), decade = c('s55:decade')
  const makes = c('s56:makes'), loses = c('s56:loses'), income = c('s56:income'), every = c('s56:every')
  const A = fadeIn(f, -20)
  const bob = (k: number) => f >= makes ? Math.sin((f - makes) / 8 + k) * 0.5 * (1 - on(f, income, 10)) : 0
  const bays: { x: number; yr: string; at: number; ins: number; insAt: number; inv?: number; invAt?: number; tag: string; tagAt: number }[] = [
    { x: 380, yr: '2023', at: y23, ins: -21, insAt: lost, inv: 70, invAt: seventy, tag: 'COMBINED RATIO 101.6%', tagAt: combined },
    { x: 960, yr: '2024', at: y24, ins: 23, insAt: gain, inv: 85, invAt: eighty, tag: 'NEARLY 4× THE INSURANCE', tagAt: four },
    { x: 1540, yr: '2025', at: y25, ins: 61, insAt: sixty, tag: 'BEST IN A DECADE', tagAt: decade },
  ]
  return (
    <g opacity={A} transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.035] as [number, number, number, number]), 18)}>
      <Defs />
      <SkyBg sky="noon" f={f} sun={[1780, 170]} />
      <rect x={0} y={880} width={1920} height={200} fill="url(#in-seaG)" />
      {[...Array(10)].map((_, k) => <rect key={k} x={80 + k * 190} y={860} width={26} height={220} fill="#6E4528" />)}
      <rect x={60} y={300} width={1800} height={580} rx={26} fill="#7A4E2E" /><rect x={80} y={320} width={1760} height={540} rx={18} fill="#1E3446" />
      {[...Array(14)].map((_, k) => <line key={k} x1={80} y1={340 + k * 38} x2={1840} y2={340 + k * 38} stroke="#000" opacity={0.08} />)}
      <line x1={100} y1={Y0} x2={1820} y2={Y0} stroke={C.waterL} strokeWidth={4} opacity={on(f, real, 10)} />
      <g opacity={on(f, real, 10)}><Coin x={1700} y={360} r={22} /><text x={1730} y={372} fill={C.cream} style={big(34)}>= $5 BILLION</text></g>
      {bays.map((b, k) => { const o = on(f, b.at - 6, 8); return o > 0.01 && <g key={k} opacity={o}>
        <text x={b.x} y={400} textAnchor="middle" fill={C.lamp} style={big(72)}>{b.yr}</text>
        <Pile x={b.x - 120} n={Math.abs(b.ins) / 5 * on(f, b.insAt - 4, 16) + bob(k)} red={b.ins < 0} o={on(f, b.insAt - 6, 6)} />
        <text x={b.x - 120} y={b.ins < 0 ? Y0 - 30 : Y0 + 50} textAnchor="middle" fill={b.ins < 0 ? '#FF8A7E' : C.cream} opacity={on(f, k === 0 ? twenty : b.insAt, 8)} style={big(46)}>{b.ins < 0 ? '−' : '+'}${Math.abs(b.ins)}B</text>
        <text x={b.x - 120} y={840} textAnchor="middle" fill={C.stoneL} opacity={on(f, b.insAt, 8)} style={big(30)}>INSURANCE</text>
        {k === 0 && <rect x={b.x - 190} y={Y0 + 4} width={140} height={84} rx={14} fill="none" stroke="#FF8A7E" strokeWidth={6} opacity={win(f, itself, combined + 20, 6)} />}
        {b.inv && <g><Pile x={b.x + 120} n={b.inv / 5 * on(f, b.invAt! - 4, 20)} o={on(f, b.invAt! - 6, 6)} glow={0.5 * on(f, income, 10)} />
          <text x={b.x + 120} y={Y0 + 50} textAnchor="middle" fill={C.goldL} opacity={on(f, b.invAt!, 8)} style={big(46)}>${b.inv}B</text>
          <text x={b.x + 120} y={840} textAnchor="middle" fill={C.stoneL} opacity={on(f, k === 0 ? income52 : b.invAt!, 8)} style={big(30)}>INVESTMENTS</text></g>}
        {k === 1 && <g opacity={on(f, times - 2, 8)}><path d={`M${b.x - 120} ${Y0 - 110} C ${b.x - 110} ${Y0 - 200} ${b.x + 20} ${Y0 - 250} ${b.x + 50} ${Y0 - 220}`} fill="none" stroke={C.lamp} strokeWidth={8} strokeDasharray="16 10" /><text x={b.x - 40} y={Y0 - 230} textAnchor="middle" fill={C.lamp} style={big(64)}>×4</text></g>}
        <g opacity={pop(f, b.tagAt - 2, 10)}><Flag x={b.x} y={258} text={b.tag} size={34} color={k === 0 ? C.red : C.lamp} ink={k === 0 ? '#fff' : C.ink} /></g>
      </g> })}
      <Flag x={540} y={1010} text="INSURANCE: UP SOME YEARS, DOWN OTHERS" size={36} o={on(f, loses - 4, 8)} />
      <Flag x={1400} y={1010} text="INVESTMENT INCOME: EVERY YEAR" size={36} color={C.gold} o={on(f, every - 6, 8)} />
      <Headline f={f} lines={[[whole, 'THE REAL SCOREBOARD', C.navy, 104]]} until={y23 - 4} />
      <Grain />
    </g>
  )
}
const ACC = ["s51:business","s51:dollars","s51:one#3","s52:year","s53:insurance","s53:billion","s54:billion","s54:made","s55:best","s56:others"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s50:whole', 's50:real', 's51:american', 's51:lost', 's51:twenty', 's51:itself', 's51:combined', 's52:investments', 's52:seventy', 's52:income', 's53:prices', 's53:gain', 's54:investments', 's54:eighty', 's54:four', 's54:times', 's55:insurance', 's55:sixty', 's55:decade', 's56:makes', 's56:loses', 's56:income', 's56:every']
export const IN_SCORE = makePiece('ins-score', 'The real US home, car and business insurer scoreboard on a harbour pier: a wooden board with a waterline, 1 coin = $5 BILLION; 2023 insurance −$21B red coins sink (COMBINED RATIO 101.6%) and investments $70B gold stack; 2024 insurance +$23B and investments $85B (NEARLY 4× THE INSURANCE); 2025 insurance +$61B (BEST IN A DECADE); insurance piles bob (INSURANCE: UP SOME YEARS, DOWN OTHERS) while investment piles glow (INVESTMENT INCOME: EVERY YEAR)', {
  mood: 'light', Component: Score, beats: [...BEATS, ...ACC],
  sfx: [['s51:lost', 'thud', 0.12], ['s52:seventy', 'coin', 0.1], ['s53:gain', 'coin', 0.1], ['s54:eighty', 'cash', 0.1], ['s55:sixty', 'ding', 0.12], ['s56:income', 'chime', 0.1]] })
