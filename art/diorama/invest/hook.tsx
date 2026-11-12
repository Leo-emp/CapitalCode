// ---------------------------------------------------------------- s1–s8: the hook (cream).
// A) Maya holds a $100 bill under a 1928 calendar. Two roads split from her: left to a government building and a
//    small coin pile (Treasury bills → ≈ $2,600), right to a row of company buildings where a gold mountain rises
//    (stocks → ≈ $1.16 million).
// B) Same $100, same 98 years: the two results side by side, a huge gap bracket; luck and tricks crossed out (dice, hat).
// C) A storm cloud gathers over the mountain (the catch); four step badges; Maya waves.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CalPage, DollarBill, NoMark, StepBadge, Street } from '../bank/kit'
import { CoinTower } from '../money4/kit'
import { Company, Mountain, Storm } from './kit'

const GROUND = 930

// # a domed government building (Treasury)
const Gov: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x={-170} y={-30} width={340} height={30} fill="#CFC3AA" /><rect x={-150} y={-230} width={300} height={200} fill="#EFE6D2" />
    {[-110, -55, 0, 55, 110].map((cx) => <rect key={cx} x={cx - 12} y={-220} width={24} height={186} fill="#FFFFFF" />)}
    <rect x={-160} y={-250} width={320} height={24} fill="#E2D8C2" /><path d="M-70 -250 Q0 -330 70 -250 Z" fill="#E2D8C2" /></g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const putting = c('s1:putting'), d100 = c('s1:100'), y1928 = c('s1:1928'), touching = c('s1:touching'), y2025 = c('s1:2025')
  const safest = c('s2:safest'), government = c('s2:government'), treasury = c('s2:treasury'), grown2 = c('s2:grown'), d2600 = c('s2:2600')
  const same3 = c('s3:same'), biggest = c('s3:biggest'), companies = c('s3:companies'), grown3 = c('s3:grown'), million3 = c('s3:million')
  const same4 = c('s4:same'), y98 = c('s4:98'), thousand = c('s4:thousand'), million4 = c('s4:million')
  const gap5 = c('s5:gap'), invest5 = c('s5:invest')
  const short2 = c('s2:shortterm'), walk8 = c('s8:walk'), came6 = c('s6:came'), years6 = c('s6:years'), gap7 = c('s7:gap'), luck = c('s6:luck'), trick = c('s6:trick'), doing = c('s6:doing')
  const catch7 = c('s7:catch'), things7 = c('s7:things')
  const four8 = c('s8:four'), simple8 = c('s8:simple'), steps8 = c('s8:steps'), maya8 = c('s8:maya')

  const AB = same4 - 8, BC = catch7 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const mBeats: Beat[] = [[0, 'idle', 'smiling'], [d100, 'holdUp', 'smiling'], [safest, 'point', 'neutral'], [biggest, 'point', 'smiling'], [million3, 'shock', 'shocked']]
  const hp = hand(f, mBeats, 960, GROUND, 1.0, false)
  const tTreasury = span(f, grown2, d2600 + 10), tStock = span(f, grown3, million3 + 20)

  return (
    <g>
      <Stage id="iv-hook" frame={f} />

      {/* # A) the two roads */}
      {A > 0 && <g opacity={A}>
        <Street f={f} ground={GROUND} trees={[]} lamps={[]} o={0.5} />
        <Ground y={GROUND} />
        <g opacity={on(f, y1928, 8) * (1 - on(f, safest, 10))} transform={`translate(1360 ${420 - 10 * pop(f, y1928, 12)})`}><CalPage x={0} y={0} s={0.85} m={f >= y2025 ? '1928 → 2025' : 'START OF'} d={f >= y2025 ? '' : '1928'} /></g>
        <g opacity={on(f, safest, 10)}>
          <g transform={`translate(0 ${-10 * pop(f, short2, 12)})`}><Gov x={330} y={GROUND} s={0.9} /></g>
          <g opacity={on(f, treasury, 8)}><Label x={330} y={GROUND + 60} text="TREASURY BILLS" size={46} font="Bebas Neue" color={P.ink} /></g>
          <CoinTower x={560} y={GROUND - 10} n={1 + 5 * tTreasury} w={100} />
          <g opacity={on(f, d2600, 8)}><Label x={560} y={GROUND - 140} text="≈ $2,600" size={58} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        <g opacity={on(f, biggest, 10)}>
          {[0, 1, 2].map((k) => <Company key={k} x={1300 + k * 230} y={GROUND} s={0.55 + 0.05 * k} name={['FOOD CO', 'TECH CO', 'AUTO CO'][k]} col={['#5B7DB1', '#7E6BB8', '#4E9A8A'][k]} grow={tStock} />)}
          <Mountain x={1520} base={GROUND} h={40 + 360 * tStock * tStock} w={560} o={on(f, grown3, 8)} />
          <g opacity={on(f, million3, 8)} transform={`translate(1520 ${GROUND - 470 - 14 * pop(f, million3, 12)})`}><rect x={-230} y={-50} width={460} height={100} rx={20} fill="#16294A" /><text y={22} textAnchor="middle" fill={P.gold} style={{ font: '400 62px "Bebas Neue"' }}>≈ $1.16 MILLION</text></g>
          <g opacity={on(f, companies, 8)}><Label x={1520} y={GROUND + 60} text="AMERICA'S BIGGEST COMPANIES" size={42} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <Person f={f} who="investorF" beats={mBeats} x={960} y={GROUND} s={1.0} />
        <g opacity={on(f, d100, 8) * (1 - on(f, safest, 8))}><DollarBill x={hp.x + 80} y={hp.y - 10} s={0.8} r={-8} t="$100" /></g>
      </g>}

      {/* # B) same $100, same 98 years, a huge gap */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <CoinTower x={520} y={GROUND - 10} n={6} w={110} />
        <Label x={520} y={GROUND + 60} text="SAFE: ≈ $2,600" size={50} font="Bebas Neue" color={P.ink} />
        <Mountain x={1360} base={GROUND} h={560} w={640} />
        <Label x={1360} y={GROUND + 60} text="STOCKS: ≈ $1.16 MILLION" size={50} font="Bebas Neue" color={P.goldInk} />
        <g opacity={on(f, gap5, 8)} transform={`translate(${-10 * pop(f, gap7, 12)} 0)`}><path d={`M760 ${GROUND - 110} L760 ${GROUND - 560} M740 ${GROUND - 110} L780 ${GROUND - 110} M740 ${GROUND - 560} L780 ${GROUND - 560}`} stroke={P.coral} strokeWidth={8} /><Label x={800} y={GROUND - 320} text="THE GAP" size={60} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
        <g opacity={win(f, luck, doing, 6)}>
          <g transform="translate(470 420)"><rect x={-50} y={-50} width={100} height={100} rx={16} fill="#FFFFFF" stroke="#16294A" strokeWidth={5} />{[[-22, -22], [22, 22], [0, 0]].map(([dx, dy], k) => <circle key={k} cx={dx} cy={dy} r={10} fill="#16294A" />)}<NoMark x={0} y={0} o={on(f, luck + 4, 8)} r={80} /></g>
          <g opacity={on(f, trick, 8)} transform="translate(700 420)"><rect x={-60} y={-10} width={120} height={60} rx={6} fill="#16294A" /><rect x={-90} y={44} width={180} height={18} rx={6} fill="#16294A" /><rect x={-60} y={10} width={120} height={14} fill={P.coral} /><NoMark x={0} y={20} o={on(f, trick + 4, 8)} r={80} /></g>
        </g>
        <g opacity={on(f, came6, 8)} transform={`translate(0 ${-10 * pop(f, years6, 12)})`}><Label x={960} y={300} text={f >= doing ? 'WHAT THE MONEY WAS DOING' : 'IT CAME DOWN TO…'} size={56} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # C) the catch, four steps, Maya */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, four8, 10)}>
          <Mountain x={1100} base={GROUND} h={460} w={620} />
          <Storm x={1100} y={330} s={1.2} strike={win(f, catch7 + 6, catch7 + 30, 4)} />
          <g opacity={on(f, things7, 8)}><Label x={1100} y={GROUND + 60} text="A CATCH, AND A FEW THINGS TO KNOW" size={46} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, walk8, 8)}><line x1={700} y1={760} x2={700 + 990 * on(f, walk8, 30)} y2={760} stroke={P.goldInk} strokeWidth={6} strokeDasharray="14 12" /></g>
        {([[four8, 'SAVE VS INVEST'], [lerp(four8, simple8, 0.6), '98 YEARS OF DATA'], [simple8, 'THE CATCH'], [steps8, 'WHY IT MATTERS']] as [number, string][]).map(([at, t], k) =>
          <StepBadge key={k} x={700 + k * 330} y={620 - 16 * pop(f, at, 14)} n={k + 1} t={t} o={on(f, at, 8)} lit={win(f, at, at + 24, 6)} />)}
        <Person f={f} who="investorF" beats={[[BC, 'idle', 'thinking'], [catch7, 'nervous', 'worried'], [maya8, 'waveA', 'smiling']]} x={300} y={GROUND} s={1.05} />
        <g opacity={on(f, maya8, 8)}><Label x={300} y={GROUND + 60} text="MAYA (MADE-UP)" size={44} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      <Headline f={f} lines={[[putting, '$100 PUT AWAY IN 1928…', P.ink, 104], [touching, '…UNTOUCHED UNTIL 2025', P.ink, 104], [safest, 'THE SAFEST PLACE', P.ink, 106], [same3, 'OR AMERICA’S BIGGEST COMPANIES', P.ink, 96], [same4, f >= y98 ? 'SAME $100, SAME 98 YEARS' : 'SAME $100…', P.ink, 104], [gap5, 'THE REASON PEOPLE INVEST', P.ink, 104], [catch7, 'BUT THERE’S A CATCH', P.coralInk, 106], [four8, '4 SIMPLE STEPS', P.ink, 110]]} />
      <Vignette id="iv-hook" />
    </g>
  )
}

const BEATS = ['s2:shortterm', 's8:walk', 's6:came', 's6:years', 's7:gap', 's1:putting', 's1:100', 's1:1928', 's1:touching', 's1:2025', 's2:safest', 's2:government', 's2:treasury', 's2:grown', 's2:2600', 's3:same', 's3:biggest', 's3:companies', 's3:grown', 's3:million', 's4:same', 's4:98', 's4:thousand', 's4:million', 's5:gap', 's5:invest', 's6:luck', 's6:trick', 's6:doing', 's7:catch', 's7:things', 's8:four', 's8:simple', 's8:steps', 's8:maya']
export const IV_HOOK = makePiece('iv-hook', 'Investing hook: Maya holds $100 under a 1928 calendar; a government building with a small coin tower (Treasury bills ≈ $2,600) vs company buildings growing behind a rising gold mountain (stocks ≈ $1.16 million); same $100 same 98 years with a big gap bracket; dice and a magic hat crossed (not luck or tricks); a storm cloud strikes over the mountain (the catch); four step badges; Maya waves', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s2:2600', 'coin', 0.2], ['s3:million', 'pop', 0.25], ['s5:gap', 'pop', 0.2], ['s7:catch', 'thud', 0.25], ['s8:four', 'pop', 0.2]] })
