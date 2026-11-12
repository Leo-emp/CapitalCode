// ---------------------------------------------------------------- s42–s55: who keeps the interest (steps three and four).
// A) Step three: interest coins stream from the government into the vault ("4.1% a year"). Then one object that grows:
//    a $1 bill sprouts a 4¢ coin; it becomes $100 with a $4.10 pile; then Maya's $1,000 with a $41 pile.
// B) Step four: Maya's phone still shows 1,000 coins a year later (calendar turns); she sells: her coins go, $1,000 comes
//    back to her hand, and the $41 pile slides away to the coin company.
// C) If rates stayed the same: three year columns side by side — Maya's $1,000 the same height every time, the
//    company's pile 41 → 82 → 205.
// D) Maya buys a Treasury bill herself: the interest coins come to her instead. Then the whole business in one line:
//    Maya's dollar goes to the company for $0, the company lends it to the government, interest flows back to it.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, Phone, fly, hand, win, type Beat } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground } from '../power/kit2'
import { GovBuilding, Stack } from '../fee/kit'
import { CoinHQ, Dollar, SCoin, Sprouts, TBill, Vault } from './kit'

const GROUND = 920
const Gold: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 16, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={P.gold} /><circle r={r * 0.7} fill="none" stroke={P.goldD} strokeWidth={3} /></g>

const Keep: React.FC<PieceProps> = ({ f, c }) => {
  const interest42 = c('s42:interest'), comes = c('s42:comes')
  const circle = c('s43:circle'), s52 = c('s52'), year43b = c('s43:year'), d41p = c('s43:41'), year43 = c('s43:year'), coins43 = c('s43:coins')
  const d4c = c('s44:4'), every44 = c('s44:every'), dollar44 = c('s44:dollar')
  const d100 = c('s45:100'), earns45 = c('s45:earns'), d410 = c('s45:4')
  const maya46 = c("s46:maya's"), d1000 = c('s46:1000'), d41 = c('s46:41')
  const step4 = c('s47:step'), back47 = c('s47:back'), nothing = c('s47:nothing')
  const later = c('s48:later'), shows48 = c('s48:shows'), d1000b = c('s48:1000'), worth48 = c('s48:worth')
  const sells = c('s49:sells'), gets49 = c('s49:gets'), d41b = c('s49:41'), stays = c('s49:stays'), company49 = c('s49:company')
  const longer = c('s50:longer'), holds50 = c('s50:holds'), adds = c('s50:adds'), rates = c('s50:rates')
  const one51 = c('s51:one'), d41c = c('s51:41'), two51 = c('s51:two'), d82 = c('s51:82'), five51 = c('s51:five'), d205 = c('s51:205')
  const through = c('s52:through'), same52 = c('s52:same')
  const s53 = c('s53'), bought = c('s53:bought'), bills53 = c('s53:bills'), interest53 = c('s53:interest'), hers = c('s53:hers')
  const whole = c('s54:whole'), business = c('s54:business')
  const gets55 = c('s55:gets'), free = c('s55:free'), lends55 = c('s55:lends'), government55 = c('s55:government'), interest55 = c('s55:interest')
  const s43 = c('s43')
  const year44 = c('s44:year'), coins45 = c('s45:coins'), year45 = c('s45:year')
  const AB = step4 - 4, BC = longer - 4, CD = s53 - 4
  const A = win(f, interest42 - 20, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  const D1 = win(f, CD, whole - 4), D2 = on(f, whole - 4, 10)
  return (
    <g>
      <Stage id="sc-keep" frame={f} />
      <Headline f={f} lines={[[interest42, 'STEP 3: THE INTEREST COMES IN', P.ink, 92], [d41p, 'CIRCLE, 2025: ABOUT 4.1% A YEAR', P.ink, 88], [d4c, 'ABOUT 4¢ PER DOLLAR, EVERY YEAR', P.ink, 88], [d100, '', P.ink], [step4, 'STEP 4: THE DOLLARS BACK — NOTHING MORE', P.ink, 80], [later, '', P.ink], [stays, 'THE $41 STAYS WITH THE COMPANY', P.ink, 88], [longer, '', P.ink], [rates, 'IF RATES STAYED THE SAME', P.ink, 92], [s53, '', P.ink], [business, 'THE WHOLE BUSINESS', P.ink, 104]]} />

      {/* # A) step three: interest arrives, then one bill and its interest grow together */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, dollar44 - 10, 10)}>
          <GovBuilding x={1440} y={GROUND} s={0.9} />
          <Vault x={500} y={GROUND} s={0.85} door={1} fill={0.66} tbills={0.66} />
          <g opacity={on(f, s43, 8) * (1 - on(f, dollar44 - 10, 8))}><rect x={1300} y={300} width={160} height={56} rx={14} fill={P.navy3} /><text x={1380} y={340} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>2025</text></g>
          <g opacity={on(f, circle, 8)} transform={`translate(500 ${GROUND - 440 - 10 * pop(f, circle, 12)})`}><rect x={-110} y={-36} width={220} height={60} rx={14} fill={P.navy3} /><text x={0} y={8} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 4 }}>CIRCLE</text></g>
          {Array.from({ length: 6 }, (_, k) => { const t0 = comes + k * 7, fl = fly(f, t0, [1340, GROUND - 330], [560, GROUND - 330], 24, 150); return f >= t0 && fl.t < 1 ? <Gold key={k} x={fl.x} y={fl.y} r={20} o={fl.o} /> : null })}
          <g opacity={on(f, coins43, 8) * (1 - on(f, dollar44 - 10, 8))}><SCoin x={500} y={GROUND - 540} s={0.9} spin={Math.max(0, 1 - span(f, coins43, coins43 + 14))} /></g>
          <g opacity={on(f, d41p, 8)} transform={`translate(960 355) scale(${1 + 0.08 * pop(f, year43b, 10) * (1 - on(f, year43b + 12, 8))}) translate(-960 -355)`}><rect x={830} y={300} width={260} height={110} rx={20} fill={P.card} stroke={P.edge} strokeWidth={3} /><Label x={960} y={380} text="4.1% / YEAR" size={64} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        {/* # the growing bill and its interest pile */}
        <g opacity={on(f, dollar44 - 10, 10)}>
          {(() => {
            const st = f < d100 ? 0 : f < maya46 ? 1 : 2
            const amt = ['$1', '$100', '$1,000'][st], s = [1.3, 1.7, 2.1][st] * (0.9 + 0.1 * pop(f, [dollar44 - 10, d100, maya46][st], 14))
            const pile = ['4¢', '$4.10', '$41'][st], pileAt = [d4c, d410, d41][st], n = [1, 3, 7][st]
            return <g>
              <Dollar x={620} y={560} s={s} text={amt} />
              <g opacity={on(f, coins45, 8) * (1 - on(f, maya46, 8))}>{[0, 1, 2, 3, 4].map((k) => <SCoin key={k} x={480 + k * 70} y={780} s={0.5} />)}</g>
              <g opacity={on(f, year44, 8)} transform={`translate(1300 330) scale(${1 + 0.12 * pop(f, year45, 10) * (1 - on(f, year45 + 12, 8))})`}><rect x={-90} y={-40} width={180} height={56} rx={14} fill={P.navy3} /><text x={0} y={0} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>EVERY YEAR</text></g>
              {st === 2 && <g opacity={on(f, maya46, 8)}><Label x={620} y={780} text="MAYA'S" size={50} font="Bebas Neue" color={P.ink2} /></g>}
              <path d="M900 560 L1080 560 M1050 530 L1080 560 L1050 590" fill="none" stroke={P.ink2} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={on(f, dollar44 - 10, 10)} />
              <g opacity={on(f, pileAt, 8)}>
                {st === 0 ? <Gold x={1300} y={560} r={40} /> : <Stack x={1300} y={700} n={n * 2} w={170} />}
                <Label x={1300} y={st === 0 ? 670 : 800} text={pile} size={76} font="Bebas Neue" color={P.goldInk} />
                <Label x={1300} y={st === 0 ? 730 : 860} text="A YEAR, TO THE COMPANY" size={40} font="Bebas Neue" color={P.ink2} />
              </g>
            </g>
          })()}
        </g>
      </g>}

      {/* # B) step four: a year later, she sells — $1,000 back, the $41 stays */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {(() => {
          const beats: Beat[] = [[0, 'phone', 'smiling'], [sells, 'offer', 'smiling'], [gets49, 'receive', 'smiling'], [stays, 'shrug', 'neutral']]
          const hp = hand(f, beats, 380, GROUND, 0.85)
          return <g>
            <Person f={f} who="investorF" beats={beats} x={380} y={GROUND} s={0.85} />
            <g opacity={1 - on(f, sells, 8)} transform="translate(800 520)"><Phone x={0} y={0} s={1.4}>
              <text x={0} y={-40} textAnchor="middle" fill={P.navy0} style={{ font: '400 34px "Bebas Neue"' }}>1,000 USDC</text>
              <text x={0} y={0} textAnchor="middle" fill="#5C6F8E" style={{ font: '400 28px "Bebas Neue"' }}>= $1,000</text>
              <SCoin x={0} y={80} s={0.7} glow={on(f, shows48, 8) * (1 - on(f, worth48 + 10, 8))} spin={f >= d1000b ? Math.max(0, 1 - span(f, d1000b, d1000b + 14)) : 0} />
              <g opacity={on(f, worth48, 8)}><rect x={-64} y={130} width={128} height={40} rx={10} fill={P.mint} /><text x={0} y={160} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 30px "Bebas Neue"' }}>STILL $1,000</text></g></Phone></g>
            <g opacity={on(f, later, 8) * (1 - on(f, sells, 8))}><Calendar x={1120} y={330} text={f < later + 20 ? 'TODAY' : '1 YEAR LATER'} s={1.0} flip={span(f, later, later + 20)} /></g>
            {/* # her coins go, $1,000 comes back to her hand */}
            {[0, 1, 2].map((k) => { const fl = fly(f, sells + k * 5, [800, 520], [1500, 480], 20, 120); return f >= sells && fl.t < 1 ? <SCoin key={k} x={fl.x} y={fl.y} s={0.7} o={fl.o} /> : null })}
            {(() => { const fl = fly(f, gets49, [1500, 560], [hp.x + 30, hp.y - 30], 22, 140); return f >= gets49 ? <Dollar x={fl.x} y={fl.y} s={0.8} text="$1,000" /> : null })()}
            {/* # the $41 pile, which slides away to the company */}
            <g opacity={on(f, back47, 8)}>
              <g transform={`translate(${lerp(1100, 1560, on(f, stays, 20))} 0)`}><Stack x={0} y={GROUND - 10} n={7} w={150} /><g opacity={on(f, d41b, 8)}><Label x={0} y={GROUND + 70} text="$41" size={60} font="Bebas Neue" color={P.goldInk} /></g></g>
            </g>
            <g opacity={on(f, stays - 10, 10)} transform={`translate(0 ${-16 * pop(f, company49, 12) * (1 - on(f, company49 + 14, 8))})`}><CoinHQ x={1640} y={GROUND} s={0.7} sign="COIN COMPANY" /></g>
          </g>
        })()}
      </g>}

      {/* # C) year by year, if rates stayed the same */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {([[one51, d41c, '1 YEAR', 41], [two51, d82, '2 YEARS', 82], [five51, d205, '5 YEARS', 205]] as [number, number, string, number][]).map(([at, num, t, v], k) => {
          const x = 480 + k * 480, gh = lerp(0, v * 0.5, on(f, num, 20))
          return <g key={k}>
            {/* # the empty columns are drawn as the idea starts; Maya's bars fill on "holds", the company's slots on "adds up" */}
            <rect x={x - 170} y={GROUND - 500} width={150} height={500} rx={14} fill="none" stroke={P.ink2} strokeWidth={4} strokeDasharray="12 8" opacity={on(f, longer + k * 3, 8) * (1 - on(f, holds50, 8))} />
            <rect x={x + 20} y={GROUND - 110} width={150} height={110} rx={14} fill="none" stroke={P.goldInk} strokeWidth={4} strokeDasharray="12 8" opacity={on(f, adds + k * 3, 8) * (1 - on(f, num, 8))} />
            <g opacity={on(f, holds50 + k * 3, 8)}><rect x={x - 170} y={GROUND - 500} width={150} height={500} rx={14} fill={P.sky} /><rect x={x - 170} y={GROUND - 500} width={150} height={500} rx={14} fill="#FFFFFF" opacity={0.35 * on(f, same52 + k * 4, 6) * (1 - on(f, same52 + k * 4 + 10, 8))} /></g>
            <g opacity={on(f, at, 10)}>
            <Label x={x - 95} y={GROUND - 520} text="$1,000" size={46} font="Bebas Neue" color={P.skyInk} />
            {/* # the company: its pile grows */}
            <rect x={x + 20} y={GROUND - gh} width={150} height={gh} rx={14} fill={P.gold} />
            <g opacity={on(f, num, 8)}><Label x={x + 95} y={GROUND - gh - 20} text={`$${v}`} size={56} font="Bebas Neue" color={P.goldInk} /></g>
            <Label x={x} y={GROUND + 70} text={t} size={52} font="Bebas Neue" color={P.ink} />
          </g></g>
        })}
        <g opacity={on(f, one51, 8)}>
          <rect x={300} y={260} width={30} height={30} rx={6} fill={P.sky} /><Label x={345} y={287} text="MAYA HAS" size={40} font="Bebas Neue" color={P.ink2} anchor="start" />
          <rect x={560} y={260} width={30} height={30} rx={6} fill={P.gold} /><Label x={605} y={287} text="COMPANY EARNED" size={40} font="Bebas Neue" color={P.ink2} anchor="start" />
        </g>
        <g opacity={on(f, s52, 8)}><path d={`M310 ${GROUND - 500} L1720 ${GROUND - 500}`} stroke={P.skyInk} strokeWidth={5} strokeDasharray="14 10" /></g>
      </g>}

      {/* # D) if Maya bought the bill herself; then the whole business in one line */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {D1 > 0 && <g opacity={D1}>
          {(() => { const beats: Beat[] = [[0, 'idle', 'neutral'], [bought, 'hold', 'smiling'], [interest53, 'receive', 'smiling'], [hers, 'celebrate', 'smiling']]
            const hp = hand(f, beats, 560, GROUND, 0.85)
            return <g>
              <Person f={f} who="investorF" beats={beats} x={560} y={GROUND} s={0.85} />
              <g opacity={on(f, bills53, 8)}><TBill x={hp.x + 40} y={hp.y - 40} s={0.6} r={-6} /></g>
              <GovBuilding x={1420} y={GROUND} s={0.9} />
              {Array.from({ length: 5 }, (_, k) => { const t0 = interest53 + k * 5, fl = fly(f, t0, [1340, GROUND - 330], [hp.x + 20, hp.y - 80], 22, 140); return f >= t0 && fl.t < 1 ? <Gold key={k} x={fl.x} y={fl.y} r={20} o={fl.o} /> : null })}
              <g opacity={on(f, hers, 8)}><Stack x={hp.x + 160} y={GROUND - 10} n={7} w={120} /><Label x={hp.x + 160} y={GROUND + 70} text="HERS" size={52} font="Bebas Neue" color={P.goldInk} /></g>
            </g> })()}
        </g>}
        {D2 > 0 && <g opacity={D2}>
          <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [gets55, 'offer', 'neutral'], [interest55, 'shrug', 'neutral']]} x={260} y={GROUND} s={0.8} />
          <CoinHQ x={900} y={GROUND} s={0.8} sign="COIN COMPANY" o={on(f, whole, 10)} />
          <GovBuilding x={1560} y={GROUND} s={0.85} o={on(f, lends55, 10)} />
          {(() => { const fl = fly(f, gets55, [360, 600], [820, 600], 20, 120); return f >= gets55 && fl.t < 1 ? <Dollar x={fl.x} y={fl.y} s={0.6} /> : null })()}
          <g opacity={on(f, free, 8)}><rect x={480} y={430} width={180} height={80} rx={16} fill={P.card} stroke={P.edge} strokeWidth={3} /><Label x={570} y={490} text="$0 COST" size={50} font="Bebas Neue" color={P.coralInk} /></g>
          {(() => { const fl = fly(f, lends55 + 4, [980, 600], [1480, 600], 20, 120); return f >= lends55 + 4 && fl.t < 1 ? <Dollar x={fl.x} y={fl.y} s={0.6} /> : null })()}
          <g opacity={on(f, interest55, 6)}><Sprouts x={1200} y={560} n={5} t={(f - interest55) / 30} spread={300} /></g>
          {Array.from({ length: 4 }, (_, k) => { const t0 = interest55 + k * 5, fl = fly(f, t0, [1480, 520], [960, 420], 20, 120); return f >= t0 && fl.t < 1 ? <Gold key={k} x={fl.x} y={fl.y} r={18} o={fl.o} /> : null })}
        </g>}
      </g>}
      <Vignette id="sc-keep" />
    </g>
  )
}

const BEATS = ["s43", "s44:year", "s45:coins", "s45:year", "s53", 's42:interest', 's42:comes', 's43:circle', 's43:41', 's43:year', 's43:coins', 's44:4', 's44:dollar', 's45:100', 's45:4', "s46:maya's", 's46:41', 's47:step', 's47:back', 's48:later', 's48:shows', 's48:1000', 's48:worth', 's49:sells', 's49:gets', 's49:41', 's49:stays', 's49:company', 's50:longer', 's50:holds', 's50:adds', 's50:rates', 's51:one', 's51:41', 's51:two', 's51:82', 's51:five', 's51:205', 's52', 's52:same', 's53:bought', 's53:bills', 's53:interest', 's53:hers', 's54:whole', 's55:gets', 's55:free', 's55:lends', 's55:interest']
export const SC_KEEP = makePiece('sc-keep', 'Stablecoin long ch3: step three — interest streams from the government to the vault (Circle ~4.1% in 2025); $1 → 4¢, $100 → $4.10, Maya\'s $1,000 → $41 a year to the company; step four — a year later she sells for $1,000 and the $41 stays; 1/2/5 years: $41, $82, $205 vs her same $1,000; had she bought T-bills the interest was hers; the whole business: her dollar free → company → government → interest back', {
  mood: 'light', Component: Keep, beats: BEATS,
  sfx: [['s42:comes', 'coin', 0.25], ['s44:4', 'pop', 0.25], ['s46:41', 'cash', 0.3], ['s49:stays', 'swish', 0.25], ['s51:205', 'ding', 0.3], ['s53:hers', 'coin', 0.25], ['s55:free', 'pop', 0.25]] })
