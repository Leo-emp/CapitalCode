// ---------------------------------------------------------------- s56–s66: billions, four cents at a time.
// A) One tiny 4¢ coin alone on the stage; then a crowd of holders, each with a coin that sprouts a tiny gold coin; on
//    "multiply" all their gold coins fly together into one pile.
// B) USDC as one object: a blue tower ($65B on average in 2025) with a gold slice on top (4.1%) that lifts off into a
//    gold block: ≈ $2.66B; Circle's reported block ($2.64B) slides in beside it — the same height, a tick.
// C) Tether: a green tower of coins ($186B), two of every three dollars inside it turn into Treasury bills ($122B+);
//    from those bills a gold block rises: about $5B a year. Its $10B+ profit pile splits into "interest" and "gold,
//    bitcoin, other investments". The engine underneath: a dollar loops company → government → interest back.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, fly, win, Tick } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { GovBuilding } from '../fee/kit'
import { Mini } from '../../rig/Mini'
import { CoinHQ, Dollar, SCoin, TBill } from './kit'

const GROUND = 920
const Gold: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 16, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={P.gold} /><circle r={r * 0.7} fill="none" stroke={P.goldD} strokeWidth={3} /></g>
const LOOKS = ['investorF', 'buyer', 'investor', 'hero', 'worker', 'owner']

const Billions: React.FC<PieceProps> = ({ f, c }) => {
  const tiny = c('s56:tiny'), sounds = c('s56:sounds')
  const happens = c('s57:happens'), every57 = c('s57:every'), everyone = c('s57:everyone'), holds57 = c('s57:holds')
  const multiply = c('s58:multiply'), tens = c('s58:tens'), billions58 = c('s58:billions'), dollars58 = c('s58:dollars'), s59 = c('s59')
  const d65 = c('s59:65'), usdc59 = c('s59:usdc'), average = c('s59:average'), coins63 = c('s63:coins'), same66 = c('s66:same'), dollars66 = c('s66:dollars')
  const d41 = c('s60:41'), d266 = c('s60:266')
  const circle61 = c('s61:circle'), reported = c('s61:reported'), exactly = c('s61:exactly'), d264 = c('s61:264'), income = c('s61:income'), coins61 = c('s61:coins')
  const tether62 = c('s62:tether'), bigger = c('s62:bigger')
  const d122 = c('s63:122'), d186 = c('s63:186'), two = c('s63:two'), three = c('s63:three')
  const interest64 = c('s64:interest'), b122 = c('s64:122'), tre64 = c('s64:treasuries'), year64 = c('s64:year'), alone = c('s64:alone'), similar = c('s64:similar'), d5 = c('s64:5')
  const tre63 = c('s63:treasuries'), similar64 = c('s64:similar')
  const owns = c('s65:owns'), gold65 = c('s65:gold'), bitcoin65 = c('s65:bitcoin'), investments = c('s65:investments'), not65 = c('s65:not'), d10 = c('s65:10'), interest65 = c('s65:interest')
  const engine = c('s66:engine'), cost = c('s66:cost'), nothing = c('s66:nothing'), lent = c('s66:lent'), interest66 = c('s66:interest')
  const AB = s59 - 6, BC = tether62 - 4
  const A = win(f, sounds - 20, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const C1 = win(f, BC, owns - 4), C2 = win(f, owns - 4, engine - 4), C3 = on(f, engine - 4, 10)
  return (
    <g>
      <Stage id="sc-billions" frame={f} />
      <Headline f={f} lines={[[tiny, '4¢ A DOLLAR', P.ink, 104], [everyone, 'EVERY DOLLAR, EVERY HOLDER', P.ink, 96], [billions58, '× TENS OF BILLIONS', P.ink, 104], [d65, 'USDC, 2025: ABOUT $65 BILLION ON AVERAGE', P.ink, 80], [d266, '× 4.1% ≈ $2.66 BILLION', P.ink, 96], [d264, 'CIRCLE REPORTED ≈ $2.64 BILLION', P.ink, 90], [tether62, 'TETHER IS EVEN BIGGER', P.ink, 100], [two, 'ABOUT 2 OF EVERY 3 DOLLARS', P.ink, 96], [d5, '≈ $5 BILLION A YEAR', P.ink, 104], [gold65, 'GOLD, BITCOIN, OTHER INVESTMENTS', P.ink, 88], [not65, 'NOT ALL PROFIT IS INTEREST', P.ink, 96], [engine, 'THE SAME ENGINE', P.ink, 104]]} />

      {/* # A) one tiny coin → a crowd → one pile */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, happens, 10)}>
          <Dollar x={700} y={540} s={2.4} />
          <Gold x={1260} y={560} r={lerp(40, 12, on(f, tiny, 14))} />
          <g opacity={on(f, tiny, 8)}><circle cx={1260} cy={560} r={130} fill="none" stroke={P.navy3} strokeWidth={14} /><path d="M1352 652 L1460 760" stroke={P.navy3} strokeWidth={26} strokeLinecap="round" /><Label x={1260} y={460} text="4¢" size={72} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        {/* # the crowd: two rows of holders, each with a coin above and a tiny interest coin rising */}
        <g opacity={on(f, happens, 10)}>
          {Array.from({ length: 14 }, (_, k) => {
            const row = k < 7 ? 0 : 1, col = k % 7, x = 330 + col * 210 + (row ? 105 : 0), y = GROUND - row * 170
            const at = every57 + k * 2, gather = on(f, multiply + k, 18)
            return <g key={k} opacity={on(f, at, 6)}>
              <Mini look={LOOKS[k % 6]} x={x} y={y} scale={0.85} frame={f} seed={k + 40} mood="happy" />
              <SCoin x={x} y={y - 210} s={0.45} />
              {f >= holds57 && <Gold x={lerp(x + 30, 960, gather)} y={lerp(y - 250 - ((f - holds57 + k * 3) % 30), 300, gather)} r={10} o={1 - on(f, billions58 + 10, 8)} />}
            </g>
          })}
          <g opacity={on(f, dollars58, 6)}><circle cx={960} cy={300} r={170} fill={P.gold} opacity={0.22} /></g>
          <g opacity={on(f, tens, 10)}>{Array.from({ length: Math.round(12 * on(f, tens, 30)) }, (_, k) => <Gold key={k} x={900 + (k % 4) * 40} y={330 - Math.floor(k / 4) * 26} r={22} />)}</g>
        </g>
      </g>}

      {/* # B) USDC: tower × 4.1% = gold block; the reported block beside it */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {(() => { const H = 560, x = 520, lift = on(f, d266, 24)
          return <g>
            <g opacity={on(f, s59, 8)}><rect x={620} y={250} width={140} height={56} rx={14} fill={P.navy3} /><text x={690} y={290} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>2025</text></g>
            <g opacity={on(f, d65, 10)}>
            <rect x={x - 150} y={GROUND - H} width={300} height={H} rx={18} fill={P.sky} />
            <g opacity={on(f, average, 8)}><line x1={x - 190} y1={GROUND - H} x2={x + 190} y2={GROUND - H} stroke={P.ink} strokeWidth={5} strokeDasharray="12 8" /><Label x={x - 200} y={GROUND - H + 14} text="AVG" size={40} font="Bebas Neue" color={P.ink2} anchor="end" /></g>
            {Array.from({ length: 13 }, (_, r) => <rect key={r} x={x - 150} y={GROUND - 40 - r * 40} width={300} height={6} fill="#000" opacity={0.1} />)}
            <SCoin x={x} y={GROUND - H - 70} s={1.2} text="USDC" glow={on(f, coins61, 8)} spin={f >= coins61 ? Math.max(0, 1 - span(f, coins61, coins61 + 16)) : f >= usdc59 ? Math.max(0, 1 - span(f, usdc59, usdc59 + 16)) : 0} />
            <Label x={x} y={GROUND + 70} text="≈ $65B" size={60} font="Bebas Neue" color={P.skyInk} />
            {/* # the 4.1% slice on top, lifting off to the right as a gold block */}
            {(() => { const sl = H * 0.041
              return <rect x={lerp(x - 150, x + 370, lift)} y={lerp(GROUND - H - sl - 4, GROUND - sl, lift)} width={300} height={sl} rx={6} fill={P.gold} opacity={on(f, d41, 8)} /> })()}
            <g opacity={on(f, d41, 8) * (1 - lift)}><Label x={x + 190} y={GROUND - H + 20} text="4.1%" size={56} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
            <g opacity={on(f, d266, 8)}><Label x={x + 520} y={GROUND - 60} text="≈ $2.66B" size={60} font="Bebas Neue" color={P.goldInk} /><Label x={x + 520} y={GROUND + 70} text="OUR MATHS" size={40} font="Bebas Neue" color={P.ink2} /></g>
            {/* # Circle's reported block */}
            <g opacity={on(f, reported, 10)} transform={`translate(${lerp(200, 0, on(f, reported, 18))} 0)`}>
              <rect x={1420} y={GROUND - 23} width={300} height={23} rx={6} fill={P.goldD} />
              <g opacity={on(f, d264, 8)}><Label x={1570} y={GROUND - 60} text="$2.64B" size={60} font="Bebas Neue" color={P.goldInk} /><Label x={1570} y={GROUND + 70} text="CIRCLE REPORTED" size={40} font="Bebas Neue" color={P.ink2} /></g>
              <Tick x={1570} y={GROUND - 170} o={on(f, exactly, 8)} r={44} />
            </g>
              <g opacity={on(f, income, 8)}>{[0, 1, 2].map((k) => <Gold key={k} x={1500 + k * 70} y={GROUND - 250 - 30 * Math.abs(Math.sin((f - income) / 6 + k))} r={20} />)}</g>
            </g>
          </g> })()}
      </g>}

      {/* # C) Tether: the tower, the bills inside it, the interest, the profit split, the engine */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {C1 > 0 && <g opacity={C1}>
          {(() => { const H = 600, x = 560, b = on(f, d122, 20)
            return <g>
              <rect x={x - 170} y={GROUND - H} width={340} height={H} rx={18} fill="#26A17B" />
              {Array.from({ length: 14 }, (_, r) => <rect key={r} x={x - 170} y={GROUND - 40 - r * 40} width={340} height={6} fill="#000" opacity={0.1} />)}
              {/* # the bills inside: about two-thirds of the tower turns cream */}
              <rect x={x - 156} y={GROUND - H * 0.65 * b} width={312} height={H * 0.65 * b - 12} rx={12} fill="#F4EBD6" stroke="#B9A57A" strokeWidth={4} />
              <rect x={x - 156} y={GROUND - H * 0.65} width={312} height={H * 0.65 - 12} rx={12} fill={P.gold} opacity={0.3 * on(f, b122, 6) * (1 - on(f, tre64 + 10, 10))} />
              <rect x={x - 156} y={GROUND - H * 0.65} width={312} height={H * 0.65 - 12} rx={12} fill="#FFFFFF" opacity={0.35 * on(f, tre63, 6) * (1 - on(f, tre63 + 16, 10))} />
              <g opacity={on(f, similar64, 8)}><rect x={x + 190} y={GROUND - H * 0.33 + 30} width={170} height={70} rx={16} fill={P.gold} /><text x={x + 275} y={GROUND - H * 0.33 + 80} textAnchor="middle" fill={P.navy0} style={{ font: '400 54px "Bebas Neue"' }}>≈ 4%</text></g>
              {b > 0.5 && Array.from({ length: 4 }, (_, k) => <g key={k} opacity={b}><circle cx={x - 70 + (k % 2) * 140} cy={GROUND - 90 - Math.floor(k / 2) * 150} r={30} fill={P.gold} /><circle cx={x - 70 + (k % 2) * 140} cy={GROUND - 90 - Math.floor(k / 2) * 150} r={20} fill="none" stroke={P.goldD} strokeWidth={4} /></g>)}
              <SCoin x={x} y={GROUND - H - 70} s={1.2} text="USDT" color="#26A17B" spin={f >= coins63 ? Math.max(0, 1 - span(f, coins63, coins63 + 16)) : 0} glow={on(f, coins63, 8) * (1 - on(f, two, 8))} />
              <g opacity={on(f, d122, 8)}><Label x={x + 200} y={GROUND - H * 0.33} text="$122B+ TREASURIES" size={50} font="Bebas Neue" color={P.ink} anchor="start" /></g>
              <g opacity={on(f, d186, 8)}><Label x={x + 200} y={GROUND - H + 30} text="≈ $186B OF COINS" size={50} font="Bebas Neue" color={P.ink} anchor="start" /></g>
              {/* # two of every three: three dollars, two turn into bills */}
              <g opacity={on(f, two, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${1260 + k * 240} 470)`}>{k < 2 && f >= three ? <TBill x={0} y={0} s={0.72} /> : <Dollar x={0} y={0} s={0.95} />}</g>)}</g>
              {/* # the interest from the bills: a gold block rises */}
              <g opacity={on(f, interest64, 10)}>
                <rect x={1360} y={GROUND - lerp(0, 230, on(f, d5, 24))} width={300} height={lerp(0, 230, on(f, d5, 24))} rx={14} fill={P.gold} />
                <g opacity={on(f, alone, 8)}><Label x={1510} y={GROUND + 70} text="INTEREST ON THE BILLS" size={44} font="Bebas Neue" color={P.ink2} /></g>
                <g opacity={on(f, d5, 8)}><Label x={1510} y={GROUND - 260} text="≈ $5B" size={64} font="Bebas Neue" color={P.goldInk} /></g>
                <g opacity={on(f, year64, 8)}><Label x={1510} y={GROUND - 200} text="EVERY YEAR" size={40} font="Bebas Neue" color={P.ink2} /></g>
              </g>
            </g> })()}
        </g>}
        {C2 > 0 && <g opacity={C2}>
          {/* # the things it also owns */}
          <g opacity={on(f, gold65, 8)} transform="translate(420 700)"><path d="M-90 40 L-60 -30 L60 -30 L90 40 Z" fill={P.gold} /><path d="M-60 -30 L-40 -60 L40 -60 L60 -30 Z" fill="#F6D47A" /><Label x={0} y={140} text="GOLD" size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, bitcoin65, 8)} transform="translate(720 690)"><circle r={60} fill="#F7931A" /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"' }}>B</text><Label x={0} y={150} text="BITCOIN" size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, investments, 8)} transform="translate(1000 760)"><rect x={-70} y={-160} width={140} height={160} rx={10} fill="#C9D3E1" />{[0, 1, 2].map((r) => <rect key={r} x={-50} y={-140 + r * 46} width={100} height={28} rx={5} fill="#EAF5FF" />)}<Label x={0} y={80} text="OTHER" size={48} font="Bebas Neue" color={P.ink} /></g>
          {/* # the profit pile, split into interest and the rest */}
          <g opacity={on(f, d10, 10)}>
            <rect x={1400} y={GROUND - 460} width={300} height={460} rx={16} fill={P.gold} />
            <g opacity={on(f, interest65, 8)}><rect x={1400} y={GROUND - 460} width={300} height={220} rx={16} fill="#F6D47A" stroke={P.goldD} strokeWidth={4} strokeDasharray="12 8" />
              <Label x={1550} y={GROUND - 330} text="NOT INTEREST" size={44} font="Bebas Neue" color={P.navy2} /><Label x={1550} y={GROUND - 110} text="INTEREST" size={44} font="Bebas Neue" color={P.navy2} /></g>
            <Label x={1550} y={GROUND + 70} text="$10B+ PROFIT" size={56} font="Bebas Neue" color={P.goldInk} />
          </g>
        </g>}
        {C3 > 0 && <g opacity={C3}>
          <g transform={`translate(0 ${-16 * pop(f, same66, 12) * (1 - on(f, same66 + 14, 8))})`}><CoinHQ x={520} y={GROUND} s={0.8} sign="COIN COMPANY" /></g>
          <g opacity={on(f, dollars66, 8) * (1 - on(f, lent, 8))}><Dollar x={720} y={GROUND - 120} s={0.8} /></g>
          <GovBuilding x={1440} y={GROUND} s={0.9} />
          {/* # the loop: dollars that cost nothing go out, interest comes back, again and again */}
          <path d="M700 420 Q980 280 1260 420" fill="none" stroke={P.ink2} strokeWidth={8} strokeDasharray="16 12" opacity={on(f, lent, 8)} />
          <path d="M1260 640 Q980 780 700 640" fill="none" stroke={P.goldInk} strokeWidth={8} strokeDasharray="16 12" opacity={on(f, interest66, 8)} />
          {f >= lent && (() => { const t = ((f - lent) % 40) / 40; return <Dollar x={lerp(700, 1260, t)} y={420 - Math.sin(t * Math.PI) * 110} s={0.6} /> })()}
          {f >= interest66 && (() => { const t = ((f - interest66) % 30) / 30; return <Gold x={lerp(1260, 700, t)} y={640 + Math.sin(t * Math.PI) * 110} r={22} /> })()}
          <g opacity={on(f, nothing, 8) * (1 - on(f, lent, 10))}><Label x={980} y={520} text="COST: $0" size={64} font="Bebas Neue" color={P.coralInk} /></g>
        </g>}
      </g>}
      <Vignette id="sc-billions" />
    </g>
  )
}

const BEATS = ["s63:treasuries", "s64:similar", 's56:tiny', 's57:happens', 's57:every', 's57:everyone', 's57:holds', 's58:multiply', 's58:tens', 's58:billions', 's58:dollars', 's59', 's59:usdc', 's59:average', 's59:65', 's60:41', 's60:266', 's61:reported', 's61:exactly', 's61:264', 's61:income', 's61:coins', 's62:tether', 's63:122', 's63:186', 's63:coins', 's63:two', 's63:three', 's64:interest', 's64:122', 's64:treasuries', 's64:alone', 's64:5', 's64:year', 's65:owns', 's65:gold', 's65:bitcoin', 's65:investments', 's65:10', 's65:interest', 's66:engine', 's66:same', 's66:dollars', 's66:nothing', 's66:lent', 's66:interest']
export const SC_BILLIONS = makePiece('sc-billions', 'Stablecoin long ch4: one tiny 4¢ coin becomes a crowd of holders whose interest coins gather into one pile; USDC ~$65B × 4.1% ≈ $2.66B vs Circle reported $2.64B (tick); Tether ~$186B of coins, $122B+ in Treasuries (2 of every 3 dollars) → ~$5B a year; it also owns gold, bitcoin, other investments so not all $10B+ profit is interest; the engine: dollars that cost nothing lent out for interest, looping', {
  mood: 'light', Component: Billions, beats: BEATS,
  sfx: [['s57:everyone', 'pop', 0.2], ['s58:billions', 'cash', 0.3], ['s60:266', 'ding', 0.25], ['s61:exactly', 'ding', 0.25], ['s63:122', 'thud', 0.3], ['s64:5', 'cash', 0.25], ['s66:lent', 'whoosh', 0.2]] })
