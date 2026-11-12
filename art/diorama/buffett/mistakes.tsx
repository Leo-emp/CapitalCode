// ---------------------------------------------------------------- s97–s103: not every bet works (casino-style rebuild).
// 1) Three buildings stand side by side: Goldman and Bank of America light up as wins, the third, an IRISH BANK pair,
// starts to crack. The 2008 letter on the desk gets red rings. An OIL barrel rides up a hill to the top and rolls back
// down (illustration). Two small Irish banks crumble while a $244M coin tower beside them shrinks to $27M and a −89%
// stamp lands. 2) A storm: a person stands bravely on a ledge that crumbles under them; then two buildings in the
// wind: one on thin legs topples, one on deep foundations stands, and Buffett points at it.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, Stamp, win } from '../aimoney/common'
import { Building } from '../kit'
import { Bank, Letter, Storm } from './kit'
import { Buffett, CoinTower, Street, gestB } from './hook'

const Mistakes: React.FC<PieceProps> = ({ f, c }) => {
  const wrong = c('s97:wrong'), wins = c('s97:wins'), letter = c('s98:letter'), mistakes98 = c('s98:mistakes')
  const oil = c('s99:oil'), top = c('s99:top'), billion = c('s99:billion')
  const n244 = c('s100:244'), irish = c('s100:irish'), n27 = c('s101:27'), n89 = c('s101:89')
  const brave = c('s102:brave'), enough = c('s102:enough'), pick = c('s103:pick'), survive = c('s103:survive')
  const A = win(f, 0, brave - 4, 10), B = on(f, brave - 4, 10)
  // # the oil barrel rides up the hill, sits at the top, then rolls back down
  const up = easeInOut(span(f, oil, top)), down = easeInOut(span(f, top + 10, billion + 20)), u = up * 0.5 + down * 0.5
  const hill = (t: number) => ({ x: lerp(1080, 1800, t), y: 860 - Math.sin(t * Math.PI) * 420 })
  const barrel = hill(u)
  // # extra gesture words (each pause gets Buffett acting on a word)
  const G = [c('s101:of')]
  return (
    <g>
      <StageBg id="wb-mistakes" frame={f} />
      <Headline f={f} lines={[[wrong, 'BUFFETT DOESN’T ALWAYS WIN', P.ink, 104], [letter, 'HIS OWN 2008 MISTAKES', P.coralInk, 104], [oil, 'OIL SHARES NEAR THE TOP', P.ink, 104], [billion, 'COST: SEVERAL BILLION', P.coralInk, 104],
        [n244, '$244M INTO TWO IRISH BANKS', P.ink, 100], [n27, 'WORTH $27M BY YEAR END', P.coralInk, 104], [brave, 'BRAVE IS NOT ENOUGH', P.ink, 104], [pick, 'PICK WHAT WILL SURVIVE', P.goldInk, 104]]} />
      {/* # A: wins and losses; the letter; the oil hill; the Irish banks */}
      {A > 0 && <g opacity={A}>
        <Street f={f} lamps={[]} />
        <g opacity={1 - on(f, letter, 10)}>
          {[['GOLDMAN SACHS', 1], ['BANK OF AMERICA', 1], ['IRISH BANK', 0]].map(([nm, ok], k) => <g key={k} opacity={on(f, wins + k * 6, 6)}>
            <Bank x={360 + k * 600} y={1000} s={0.8} name={nm as string} f={f} crack={ok ? 0 : on(f, wins + 14, 10)} shake={ok ? 0 : on(f, wins + 14, 6) * 0.6} />
            <g transform={`translate(${360 + k * 600} 330) scale(${pop(f, wins + k * 6 + 6)})`}><circle r={60} fill={ok ? P.mint : P.coral} />{ok ? <path d="M-28 0 l20 20 l38 -42" stroke="#FFFFFF" strokeWidth={14} fill="none" strokeLinecap="round" /> : <path d="M-26 -26 L26 26 M26 -26 L-26 26" stroke="#FFFFFF" strokeWidth={14} strokeLinecap="round" />}</g>
          </g>)}
        </g>
        <g opacity={on(f, letter, 10) * (1 - on(f, n244, 10))}>
          <g transform="translate(520 600) rotate(-3)"><Letter x={0} y={0} year="2008" /></g>
          {Array.from({ length: 2 }, (_, k) => <ellipse key={k} cx={520 + (k - 0.5) * 20} cy={560 + k * 110} rx={190} ry={34} fill="none" stroke={P.coral} strokeWidth={8} opacity={on(f, mistakes98 + k * 6, 5)} />)}
          <text x={1080} y={250} fill={P.ink2} opacity={on(f, oil, 6)} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>ILLUSTRATION</text>
          <path d={`M1080 860 Q1440 ${860 - 840} 1800 860`} fill="none" stroke={P.ink2} strokeWidth={10} opacity={on(f, oil, 6)} />
          <g opacity={on(f, oil, 6)} transform={`translate(${barrel.x} ${barrel.y - 90}) rotate(${down * 540})`}><rect x={-70} y={-90} width={140} height={180} rx={24} fill="#2A3448" /><rect x={-70} y={-50} width={140} height={16} fill={P.gold} /><rect x={-70} y={30} width={140} height={16} fill={P.gold} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>OIL</text></g>
        </g>
        <g opacity={on(f, n244, 10)}>
          {[0, 1].map((k) => <g key={k} opacity={on(f, irish + k * 4, 6)}><Bank x={1100 + k * 440} y={1000} s={0.62} name="IRISH BANK" f={f} crack={on(f, n27 + k * 4, 10)} shake={on(f, n27, 6) * 0.5} /></g>)}
          <CoinTower x={520} y={960} n={lerp(0, 24.4, on(f, n244, 16)) * (1 - 0.89 * easeInOut(span(f, n27, n27 + 20)))} s={0.95} label={f > n27 + 10 ? '$27M' : '$244M'} />
          <g opacity={on(f, n89, 4)}><Stamp x={1320} y={400} text="−89%" f={f} at={n89} size={140} /></g>
        </g>
      </g>}
      {/* # B: the storm: a crumbling ledge; then a weak and a strong building */}
      {B > 0 && <g opacity={B}>
        <g transform="translate(960 230)"><Storm x={0} y={0} s={1.2} f={f} bolt={on(f, enough, 4) * (1 - on(f, enough + 8, 4)) + on(f, survive, 4) * (1 - on(f, survive + 8, 4))} /></g>
        <g opacity={1 - on(f, pick, 10)}>
          <rect x={200} y={820} width={lerp(900, 640, easeInOut(span(f, enough, enough + 24)))} height={260} fill="#5A6680" />
          {Array.from({ length: 4 }, (_, k) => <rect key={k} x={840 - k * 70} y={lerp(820, 1200, easeInOut(span(f, enough + k * 5, enough + k * 5 + 24)))} width={64} height={64} rx={8} fill="#5A6680" opacity={on(f, enough + k * 5, 4)} />)}
          <Person f={f} who="hero" beats={[[0, 'confident', 'smiling'], [enough, 'nervous', 'worried']]} x={lerp(400, 760, on(f, brave, 20))} y={820} s={1} />
        </g>
        <g opacity={on(f, pick, 10)}>
          <Street f={f} lamps={[]} />
          <g transform={`translate(560 ${lerp(980, 1320, easeInOut(span(f, survive + 4, survive + 34)))}) rotate(${lerp(0, -28, easeInOut(span(f, survive + 4, survive + 34)))})`}><rect x={-140} y={-40} width={20} height={40} fill="#5C4A3A" /><rect x={120} y={-40} width={20} height={40} fill="#5C4A3A" /><g transform="translate(0 -40)"><Building x={0} y={0} s={2.4} seed={9} /></g></g>
          <Building x={1300} y={980} s={2.8} seed={3} glow={on(f, survive, 8)} /><rect x={1060} y={980} width={480} height={100} rx={10} fill={P.ink2} opacity={0.7} />
          <Buffett f={f} beats={gestB([[0, 'idle', 'neutral'], [survive, 'point', 'smiling']], G)} x={1720} y={1060} s={0.95} plate={0} flip />
        </g>
      </g>}
      <Vignette id="wb-mistakes" />
    </g>
  )
}

const BEATS = ['s101:of', 's97:wrong', 's97:wins', 's98:letter', 's98:mistakes', 's99:oil', 's99:top', 's99:billion', 's100:244', 's100:irish', 's101:27', 's101:89', 's102:brave', 's102:enough', 's103:pick', 's103:survive']
export const WB_MISTAKES = makePiece('wb-mistakes', 'Buffett long (casino-style): Goldman Sachs and Bank of America light up as wins while an IRISH BANK cracks; the 2008 letter gets red rings; an illustrative OIL barrel climbs a hill to the top and rolls back down; two small Irish banks crumble while a $244M coin tower shrinks to $27M under a −89% stamp; in a storm a person stands bravely on a ledge that crumbles; a building on thin legs topples while one on deep foundations stands and Buffett points at it', {
  mood: 'dark', Component: Mistakes, beats: BEATS,
  sfx: [['s97:wins', 'click', 0.3], ['s99:billion', 'thud', 0.3], ['s101:89', 'thud', 0.35], ['s103:survive', 'crack', 0.3]] })
