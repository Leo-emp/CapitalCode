// ---------------------------------------------------------------- s9–s28: step one — what you really pay.
// A) Lina (made up) with her phone playing; a monthly price tag; then the average coin: €4.63 per subscriber per month.
//    "Why so low?" — four plan cards drop in on their names (Individual, Duo, Family, Student); the Family card splits one
//    bill into six slices; a student discount tag; a strip of countries with smaller price tags; an exchange-rate arrow.
// B) €4.63 is an average, not a bill; ×12 → about €55 a year. Then the crowd: 751 million users, 290 million paying (green),
//    the rest free with an ad banner; a pie: 11% from ads; the year's pile: €17.2 billion.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Donut } from '../charts'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Euro, GREEN, MusicPhone, PlanCard, SSpot } from './kit'

const GROUND = 900
const LOOKS = ['buyer', 'investorF', 'hero', 'worker', 'owner', 'investor']

const Pay: React.FC<PieceProps> = ({ f, c }) => {
  const step9 = c('s9:step'), really = c('s9:really')
  const meet = c('s10:meet'), lina = c('s10:lina'), madeup = c('s10:madeup'), pays10 = c('s10:pays'), month10 = c('s10:month')
  const expect = c('s11:expect'), collect = c('s11:collect'), full = c('s11:full'), price11 = c('s11:price'), everyone11 = c('s11:everyone')
  const average12 = c('s12:average'), collected = c('s12:collected'), d4 = c('s12:4'), d63 = c('s12:63'), subscriber12 = c('s12:subscriber'), month12 = c('s12:month')
  const why13 = c('s13:why'), low = c('s13:low'), everyone13 = c('s13:everyone'), same13 = c('s13:same')
  const kinds = c('s14:kinds'), individual = c('s14:individual'), duo = c('s14:duo'), family = c('s14:family'), student = c('s14:student')
  const family15 = c('s15:family'), six = c('s15:six'), payment15 = c('s15:payment'), split15 = c('s15:split'), ways = c('s15:ways')
  const students16 = c('s16:students'), discount = c('s16:discount'), countries16 = c('s16:countries'), lower = c('s16:lower'), united = c('s16:united')
  const calls = c('s17:calls'), mix = c('s17:mix'), markets = c('s17:markets'), exchange = c('s17:exchange'), pulls = c('s17:pulls'), down17 = c('s17:down')
  const says = c('s18:says'), d63b = c('s18:63'), average18 = c('s18:average'), plans18 = c('s18:plans'), bill18 = c('s18:bill')
  const whole = c('s19:whole'), d55 = c('s19:55'), paying19 = c('s19:paying')
  const people20 = c('s20:people'), dont20 = c("s20:don't"), all20 = c('s20:all')
  const end21 = c('s21:end'), d751 = c('s21:751'), users21 = c('s21:users')
  const only22 = c('s22:only'), d290 = c('s22:290'), paying22 = c('s22:paying')
  const d6 = c('s23:6'), d10 = c('s23:10'), free23 = c('s23:free'), ads23 = c('s23:ads')
  const ads24 = c('s24:ads'), d11 = c('s24:11'), percent24 = c('s24:percent')
  const free25 = c('s25:free'), majority = c('s25:majority'), paying25 = c('s25:paying'), almost = c('s25:almost')
  const works26 = c('s26:works'), turn26 = c('s26:turn'), paying26 = c('s26:paying')
  const total27 = c('s27:total'), d172 = c('s27:2'), year27 = c('s27:year')
  const step28 = c('s28:step'), comes = c('s28:comes'), each28 = c('s28:each'), less28 = c('s28:less')

  const AB = says - 6
  const A = win(f, step9 - 40, AB), B = on(f, AB, 10)
  const A1 = 1 - on(f, individual - 6, 10), A2 = on(f, individual - 6, 10)
  const B1 = 1 - on(f, people20 - 6, 10), B2 = on(f, people20 - 6, 10) * (1 - on(f, total27 - 6, 10)), B3 = on(f, total27 - 6, 10)

  return (
    <g>
      <Stage id="sp-pay" frame={f} />
      <SSpot f={f} at={d63} x={1300} y={520} rx={200} ry={200} />
      <SSpot f={f} at={d11} x={1400} y={520} rx={200} ry={200} />
      <Headline f={f} lines={[[step9, 'STEP 1: WHAT YOU REALLY PAY', P.ink, 100], [madeup, 'LINA (MADE UP)', P.ink, 110], [average12, 'THE AVERAGE: ≈ €4.63 A MONTH', P.ink, 96], [why13, 'WHY SO LOW?', P.ink, 110], [kinds, 'DIFFERENT PLANS', P.ink, 110], [students16, 'DISCOUNTS & CHEAPER COUNTRIES', P.ink, 92], [calls, 'PLANS + MARKETS + EXCHANGE RATES', P.ink, 88], [says, 'AN AVERAGE, NOT A BILL', P.ink, 104], [d55, '≈ €55 A YEAR', P.ink, 110], [people20, "SOME DON'T PAY AT ALL", P.ink, 104], [d6, '≈ 6 IN 10 LISTEN FREE', P.ink, 104], [d11, 'ADS: ≈ 11% OF THE MONEY', P.ink, 100], [works26, 'TURN FREE INTO PAID', P.ink, 104], [total27, '2025: ≈ €17.2 BILLION IN', P.ink, 100], [step28, 'LESS THAN YOU THINK', P.ink, 110]]} />

      {/* # A) Lina's payment; the average; why so low */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [lina, 'phone', 'smiling'], [average12, 'shrug', 'thinking']]} x={330} y={GROUND} s={0.85} />
          <g opacity={on(f, lina, 8)}><Label x={330} y={GROUND + 56} text="LINA" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, pays10, 8)}><MusicPhone x={640} y={540} s={0.85} f={f} playing={1} /></g>
          <g opacity={on(f, month10, 8) * (1 - on(f, average12, 10))} transform={`translate(1000 ${400 - 14 * pop(f, month10, 12)})`}><rect x={-130} y={-50} width={260} height={100} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={4} /><text y={18} textAnchor="middle" fill={P.navy0} style={{ font: '400 48px "Bebas Neue"' }}>{f >= full ? 'FULL PRICE?' : 'EVERY MONTH'}</text></g>
          {/* # collected from everyone: arrows from many users */}
          <g opacity={on(f, everyone11, 8) * (1 - on(f, average12, 10))}>{[0, 1, 2, 3].map((k) => <Mini key={k} look={LOOKS[k]} x={1260 + k * 150} y={GROUND} scale={0.6} frame={f} seed={k + 20} mood="happy" />)}</g>
          {/* # the average coin */}
          <g opacity={on(f, everyone13, 8)} transform={`translate(1300 ${270 - 10 * pop(f, c('s14:spotify'), 12) - 10 * pop(f, c('s14:several'), 12)})`}><Label x={0} y={0} text={f >= everyone13 ? 'NOT EVERYONE PAYS THE SAME' : 'WHY SO LOW?'} size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, average12, 8)} transform={`translate(1300 ${520 - 16 * pop(f, d63, 12)})`}><Euro x={0} y={0} r={130} t={f >= d63 ? '€4.63' : f >= d4 ? '€4…' : '€'} />
            <g opacity={on(f, subscriber12, 8)}><text y={190} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>{f >= month12 ? 'PER SUBSCRIBER, PER MONTH (2025)' : 'PER SUBSCRIBER'}</text></g></g>
        </g>
        <g opacity={A2}>
          {/* # four plans */}
          {([[individual, 'INDIVIDUAL', 1], [duo, 'DUO', 2], [family, 'FAMILY', 6], [student, 'STUDENT', 1]] as [number, string, number][]).map(([at, t, n], k) => (
            <g key={k} opacity={on(f, at, 6) * (k === 2 ? 1 : 1 - on(f, family15, 10) * 0.6)}><PlanCard x={330 + k * 420} y={360 - 20 * (1 - pop(f, at, 12))} t={t} people={n} col={k === 3 ? P.sky : GREEN} /></g>))}
          <g opacity={0}><Label x={960} y={460} text="NOT EVERYONE PAYS THE SAME" size={52} font="Bebas Neue" color={P.ink} /></g>
          {/* # the family bill split six ways */}
          <g opacity={on(f, payment15, 8) * (1 - on(f, students16, 10))} transform="translate(1170 640)">
            <rect x={-150} y={-50} width={300} height={100} rx={14} fill="#7FC98F" /><text y={18} textAnchor="middle" fill="#245C3A" style={{ font: '400 48px "Bebas Neue"' }}>ONE PAYMENT</text>
            {Array.from({ length: 6 }, (_, k) => { const t = on(f, split15 + k * 2, 12); return <g key={k} opacity={t} transform={`translate(${lerp(0, -375 + k * 150, t)} ${lerp(0, 160, t)})`}><rect x={-60} y={-30} width={120} height={60} rx={10} fill="#7FC98F" /><text y={12} textAnchor="middle" fill="#245C3A" style={{ font: '400 34px "Bebas Neue"' }}>1/6</text></g> })}
          </g>
          <g opacity={on(f, six, 8) * (1 - on(f, students16, 10))}><Label x={1170} y={530} text="UP TO 6 PEOPLE" size={44} font="Bebas Neue" color={P.ink} /></g>
          {/* # student discount; cheaper countries */}
          <g opacity={on(f, discount, 8)} transform={`translate(400 ${640 - 14 * pop(f, discount, 12)})`}><rect x={-120} y={-44} width={240} height={88} rx={12} fill={P.coral} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 48px "Bebas Neue"' }}>STUDENT −%</text></g>
          <g opacity={on(f, countries16, 8)}>{['US', '', '', ''].map((t, k) => { const h = [160, 90, 70, 50][k], x = 900 + k * 230
            return <g key={k} opacity={on(f, countries16 + k * 4, 6)}><rect x={x - 70} y={GROUND - h * on(f, lower, 14)} width={140} height={h * on(f, lower, 14)} rx={10} fill={GREEN} opacity={0.85} /><Label x={x} y={GROUND + 50} text={t} size={40} font="Bebas Neue" color={P.ink} /></g> })}
            <g opacity={on(f, lower, 8)}><Label x={1360} y={GROUND + 50} text="MANY OTHER COUNTRIES" size={40} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, united, 8)}><Label x={1245} y={GROUND - 220} text="ILLUSTRATIVE: SAME APP, LOWER PRICES ELSEWHERE" size={40} font="Bebas Neue" color={P.ink2} /></g></g>
          <g opacity={on(f, exchange, 8)} transform="translate(400 820)"><text textAnchor="middle" fill={P.navy0} style={{ font: '400 56px "Bebas Neue"' }}>$ ⇄ €</text><Label x={0} y={56} text="EXCHANGE RATES" size={36} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, pulls, 8)} transform={`translate(1700 ${lerp(380, 520, on(f, down17, 16))})`}><Euro x={0} y={0} r={50} t="AVG" /><path d="M0 70 L0 130 M-20 110 L0 130 L20 110" fill="none" stroke={P.coralInk} strokeWidth={8} strokeLinecap="round" /></g>
        </g>
      </g>}

      {/* # B) average not a bill; €55 a year; free vs paying; ads; the total */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={B1}>
          <g transform={`translate(560 ${520 - 14 * pop(f, d63b, 12)})`}><Euro x={0} y={0} r={110} t="€4.63" /><Label x={0} y={170} text="AN AVERAGE" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, c('s18:countries'), 8)} transform={`translate(1000 ${520 - 10 * pop(f, c('s18:not'), 12)})`}><rect x={-120} y={-80} width={240} height={160} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={4} /><text y={10} textAnchor="middle" fill={P.ink2} style={{ font: '400 40px "Bebas Neue"' }}>A REAL BILL</text><path d="M-130 -90 L130 90" stroke={P.coralInk} strokeWidth={10} strokeLinecap="round" /></g>
          {/* # ×12 → €55 */}
          <g opacity={on(f, whole, 8)}>{Array.from({ length: 12 }, (_, k) => <Euro key={k} x={1300 + (k % 6) * 70} y={380 + Math.floor(k / 6) * 70} r={26} o={on(f, whole + k * 2, 4)} />)}
            <g opacity={on(f, d55, 8)} transform={`translate(1475 ${620 - 14 * pop(f, d55, 12)})`}><rect x={-150} y={-50} width={300} height={100} rx={16} fill={P.gold} /><text y={20} textAnchor="middle" fill={P.navy0} style={{ font: '400 60px "Bebas Neue"' }}>≈ €55 / YEAR</text></g></g>
          <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [says, 'point', 'smiling'], [d55, 'present', 'smiling']]} x={250} y={GROUND} s={0.75} />
        </g>
        <g opacity={B2}>
          {/* # the crowd: 10 figures, 4 green (paying), 6 with ad bubbles (free) */}
          {Array.from({ length: 10 }, (_, k) => { const paid = k % 5 < 2, x = 220 + k * 150
            return <g key={k} opacity={on(f, end21 + k, 5)}>
              <Mini look={LOOKS[k % 6]} x={x} y={GROUND} scale={0.8} frame={f} seed={k + 30} mood="happy" />
              <g opacity={on(f, paid ? only22 : free23, 8)} transform={`translate(${x} ${GROUND - 210})`}>{paid ? <g><rect x={-46} y={-22} width={92} height={44} rx={10} fill={GREEN} /><text y={10} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 28px "Bebas Neue"' }}>PAYS</text></g> : <g opacity={on(f, ads23, 8)}><rect x={-38} y={-22} width={76} height={44} rx={10} fill={P.gold} /><text y={10} textAnchor="middle" fill={P.navy0} style={{ font: '400 28px "Bebas Neue"' }}>ADS</text></g>}</g>
            </g> })}
          <g opacity={on(f, d751, 8) * (1 - on(f, ads24 - 4, 10))}><Label x={960} y={380} text={f >= d290 ? '751M USERS · 290M PAYING' : '751 MILLION USERS'} size={52} font="Bebas Neue" color={P.ink} /></g>
          {/* # the pie: 11% from ads */}
          <g opacity={on(f, ads24 - 4, 10)} transform="translate(960 420)"><Donut cx={0} cy={0} r={110} part={0.11} p={on(f, d11, 20)} color={P.gold} rest={GREEN} thick={60} />
            <g opacity={on(f, percent24, 8)} transform={`translate(0 ${-10 * pop(f, c('s24:2025'), 12) - 10 * pop(f, c('s25:listeners'), 12)})`}><Label x={230} y={-40} text="ADS ≈ 11%" size={44} font="Bebas Neue" color={P.goldInk} anchor="start" /><Label x={230} y={20} text="PREMIUM ≈ 89%" size={44} font="Bebas Neue" color={P.mintInk} anchor="start" /></g></g>
          <g opacity={on(f, turn26, 8)}>{(() => { const t = on(f, turn26, 20); return <path d={`M${370} ${GROUND - 260} Q${560} ${GROUND - 380} ${750 + 0 * t} ${GROUND - 260}`} fill="none" stroke={GREEN} strokeWidth={8} strokeDasharray="400" strokeDashoffset={400 * (1 - t)} /> })()}<Label x={560} y={GROUND - 390} text="FREE → PAID" size={42} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={B3}>
          <g transform="translate(960 0)">{Array.from({ length: 14 }, (_, k) => <ellipse key={k} cx={(k % 2) * 30 - 15} cy={GROUND - 20 - k * 26} rx={120} ry={18} fill={P.gold} stroke={P.goldD} strokeWidth={3} opacity={on(f, total27 + k, 4)} />)}</g>
          <g opacity={on(f, d172, 8)} transform={`translate(960 ${GROUND - 450})`}><rect x={-170} y={-44} width={340} height={88} rx={14} fill={P.navy3} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>€17.2 BILLION</text></g>
          <g opacity={on(f, each28, 8)}><Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [less28, 'shrug', 'smiling']]} x={400} y={GROUND} s={0.8} /></g>
          <g opacity={on(f, comes, 8)}><Label x={1500} y={GROUND - 200} text="MOSTLY FROM PAYING SUBSCRIBERS" size={42} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}
      <Vignette id="sp-pay" />
    </g>
  )
}

const BEATS = ['s14:spotify', 's14:several', 's18:countries', 's18:not', 's24:2025', 's25:listeners', 's9:step', 's9:really', 's10:meet', 's10:lina', 's10:madeup', 's10:pays', 's10:month', 's11:expect', 's11:collect', 's11:full', 's11:price', 's11:everyone', 's12:average', 's12:collected', 's12:4', 's12:63', 's12:subscriber', 's12:month', 's13:why', 's13:low', 's13:everyone', 's13:same', 's14:kinds', 's14:individual', 's14:duo', 's14:family', 's14:student', 's15:family', 's15:six', 's15:payment', 's15:split', 's15:ways', 's16:students', 's16:discount', 's16:countries', 's16:lower', 's16:united', 's17:calls', 's17:mix', 's17:markets', 's17:exchange', 's17:pulls', 's17:down', 's18:says', 's18:63', 's18:average', 's18:plans', 's18:bill', 's19:whole', 's19:55', 's19:paying', 's20:people', "s20:don't", 's20:all', 's21:end', 's21:751', 's21:users', 's22:only', 's22:290', 's22:paying', 's23:6', 's23:10', 's23:free', 's23:ads', 's24:ads', 's24:11', 's24:percent', 's25:free', 's25:majority', 's25:paying', 's25:almost', 's26:works', 's26:turn', 's26:paying', 's27:total', 's27:2', 's27:year', 's28:step', 's28:comes', 's28:each', 's28:less']
export const SP_PAY = makePiece('sp-pay', 'Spotify long step 1: Lina (made up) pays for Premium every month, but the average collected per subscriber is about €4.63 a month in 2025; plan cards Individual, Duo, Family (one payment split across up to six people) and Student; student discounts and lower prices in many countries; plan mix, markets and exchange rates pull the average down; an average, not a bill; about €55 a year; 751 million users, 290 million paying, about 6 in 10 listen free with ads; ads only about 11% of revenue; turn free into paid; about €17.2 billion in 2025', {
  mood: 'light', Component: Pay, beats: BEATS,
  sfx: [['s10:lina', 'pop', 0.2], ['s12:63', 'coin', 0.25], ['s14:individual', 'pop', 0.15], ['s15:split', 'swish', 0.2], ['s16:discount', 'pop', 0.15], ['s19:55', 'coin', 0.2], ['s23:free', 'pop', 0.15], ['s24:11', 'pop', 0.2], ['s27:2', 'coin', 0.25]] })
