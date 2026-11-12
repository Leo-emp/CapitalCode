// ---------------------------------------------------------------- s42–s58: PROTECT — the tooth, insurance, scams
// A) s42      dinner: Maya at the table bites, a big tooth cracks.
// B) s43–s47  the dentist: an $800 bill; Maya pays it from her cushion jar (2,190 → 1,390), PAID; then Jordan, same
//             bill, no jar — a card swipes and now shows $800; three people, one of them lit (more than 1 in 3
//             couldn't cover a $400 surprise with cash).
// C) s48–s53  the big shocks: the small jar next to a hospital, a fire and a crash that tower over it; an umbrella
//             opens (insurance); many people drop small coins (the premium) into one pool; when one of them gets a
//             huge bill, they pay a small first slice (deductible) and the pool pays the rest;
//             for a small known coin; the three that matter most: health, car, renters (the landlord's policy
//             covers the building, not your sofa).
// D) s54–s58  scams: a phone with a fake "YOUR BANK" text; a pile marked $16 BILLION (2025); an imposter's mask
//             (bank, government, company); a gift card is shown then crossed; back to Jordan's card: $800 of debt.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Arrow, Jar } from '../literacy/kit2'
import { Big, BillSheet, Card, Clinic, Coin, Cross, FLOOR, House, Icon, L, LDefs, LGrain, Paper, Room, Sofa, Table, Tag, Tooth, Umbrella, cues, fadeIn, scene, FONT } from './kit'

const K = {
  bites: 's42:bites', hard: 's42:hard', dinner: 's42:dinner', cracks: 's42:cracks', tooth42: 's42:tooth',
  dentist: 's43:dentist', bill43: 's43:bill', eight43: 's43:eight',
  hurts: 's44:hurts', two44: 's44:two', saved44: 's44:saved', pays44: 's44:pays', cash44: 's44:cash', end44: 's44:fill',
  imagine45: 's45:imagine', jordan45: 's45:jordan', bill45: 's45:bill',
  cushion46: 's46:cushion', credit46: 's46:credit', card46: 's46:card',
  small48: 's47:small', some48: 's47:some', big48: 's47:big', hospital: 's47:hospital', fire: 's47:fire', accident: 's47:accident',
  insurance49: 's48:insurance',
  works50: 's49:works', small50: 's49:small', month50: 's49:month', premium: 's49:premium',
  lots51: 's50:lots', bad51: 's50:bad', insurer: 's50:insurer', big51: 's50:big', person51: 's50:person', slice51: 's50:slice', deductible: 's50:deductible',
  people53: 's51:people', health53: 's51:health', car53: 's51:car', renters: 's51:renters', landlord: "s51:landlord's", building53: 's51:building', things53: 's51:things',
  protect54: 's52:protect', people54: 's52:people', take54: 's52:take',
  americans55: 's53:americans', sixteen55: 's53:sixteen', fraud55: 's53:fraud', record55: 's53:record',
  imposter: 's54:imposter', pretending: 's54:pretending', bank56: 's54:bank', government56: 's54:government', company56: 's54:company',
  federal57: 's55:federal', simply57: 's55:simply', gift57: 's55:gift', scammer: 's55:scammer',
  protected58: 's56:protected', jordan58: "s56:jordan's", debt58: 's56:debt',
}

// # big-shock icons
const Hospital: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-150} y={-380} width={300} height={380} fill={L.creamL} stroke={L.creamD} strokeWidth={6} />
    <rect x={-40} y={-340} width={80} height={140} rx={8} fill={L.red} /><rect x={-70} y={-310} width={140} height={80} rx={8} fill={L.red} />
    {[0, 1].map((r) => [0, 1, 2].map((k) => <rect key={r + '-' + k} x={-120 + k * 90} y={-170 + r * 70} width={60} height={46} rx={4} fill={L.sky} />))}</g>
)
const Fire: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><House x={0} y={0} s={1} color={L.inkSoft} />
    {[-80, 0, 80].map((k, i) => <path key={k} d={`M${k - 50} -200 Q${k - 60} ${-300 - Math.sin(f / 4 + i) * 30} ${k} ${-380 - Math.sin(f / 5 + i) * 30} Q${k + 60} -300 ${k + 50} -200 Z`} fill={i % 2 ? L.mustard : L.terra} opacity={0.9} />)}</g>
)
const Crash: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-200 -40 L-180 -110 L-90 -120 L-40 -180 L90 -180 L150 -110 L200 -90 L200 -30 Z" fill={L.dusk} transform="rotate(-8)" />
    {[-110, 120].map((k) => <circle key={k} cx={k} cy={-14} r={40} fill={L.ink} />)}
    <path d="M190 -160 L230 -200 L240 -150 L290 -170 L260 -120" stroke={L.mustardD} strokeWidth={10} fill="none" strokeLinejoin="round" />
  </g>
)
const GiftCard: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-105} width={340} height={210} rx={22} fill={L.plum} /><rect x={-20} y={-105} width={40} height={210} fill={L.mustard} /><rect x={-170} y={-20} width={340} height={40} fill={L.mustard} />
    <path d="M0 -20 Q-60 -90 -80 -40 Q-70 -10 0 -20 Q60 -90 80 -40 Q70 -10 0 -20" fill={L.mustardL} stroke={L.mustardD} strokeWidth={4} />
  </g>
)

const Protect: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s43') - 6, BC = c('s47') - 6, CD = c('s52') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)
  const jarFill = lerp(0.3, 0.19, on(f, t.cash44, 14))
  // # C: the pool
  const poolO = on(f, t.small50 - 4, 8) * (1 - on(f, t.people53 - 4, 8))
  const poolLevel = lerp(0.2, 0.75, on(f, t.lots51, 20)) - 0.3 * on(f, t.insurer, 16)

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) dinner, a cracked tooth ---------------- */}
      {A > 0 && <g opacity={A}>
        <Room />
        <Table x={760} y={780} s={1.1} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.bites, 'holdUp', 'smiling'], [t.cracks, 'shock', 'shocked']]} x={420} y={1060} s={0.8} />
        <Tooth x={1360} y={560} s={1.25} crack={span(f, t.cracks, t.cracks + 10)} o={on(f, t.hard - 4, 8)} />
      </g>}

      {/* ---------------- B) the dentist bill, two ways ---------------- */}
      {B > 0 && <g opacity={B}>
        <Clinic />
        <BillSheet x={1080} y={540} s={0.85} head="DENTIST" amount="$800" color={L.terra} stamp="PAID" stampO={on(f, t.cash44 + 6, 10) * (1 - on(f, t.imagine45 - 4, 8))} o={on(f, t.bill43 - 2, 8)} />
        {/* Maya: pays from the jar */}
        <g opacity={1 - on(f, t.imagine45 - 4, 8)}>
          <Person f={f} who="investorF" beats={[[0, 'holdChest', 'worried'], [t.hurts, 'nervous', 'worried'], [t.saved44, 'present', 'neutral'], [t.cash44, 'offer', 'smiling'], [t.end44, 'relief', 'smiling']]} x={220} y={1060} s={0.78} />
          <Jar x={1520} y={FLOOR - 4} s={1} fill={jarFill} color={L.sage} label="CUSHION" o={on(f, t.two44 - 4, 8)} />
          <Tag x={1520} y={500} text={f < t.cash44 + 8 ? '$2,190 SAVED' : '$1,390 LEFT'} size={40} bg={L.sageD} o={on(f, t.two44, 8)} />
          <Arrow x1={1420} y1={720} x2={1240} y2={660} p={span(f, t.pays44, t.pays44 + 12)} color={L.sageD} w={12} />
        </g>
        {/* Jordan: same bill, a card */}
        <g opacity={on(f, t.imagine45 - 2, 8)}>
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [t.bill45, 'facepalm', 'worried'], [t.cushion46, 'emptyPockets', 'worried'], [t.card46, 'offer', 'worried']]} x={1560} y={1060} s={0.78} flip />
          <Card x={1250} y={760} s={0.7} r={-6} text={f > t.card46 + 6 ? '$800' : ''} o={on(f, t.credit46 - 2, 8)} />
          <Tag x={1250} y={900} text="NO CUSHION" size={40} bg={L.terraD} o={on(f, t.cushion46, 8)} />
        </g>
      </g>}

      {/* ---------------- C) big shocks and insurance ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Paper />
        {/* the small jar vs the towering shocks */}
        <g opacity={1 - on(f, t.small50 - 4, 8)}>
          <Jar x={300} y={FLOOR} s={0.7} fill={0.4} color={L.sage} label="CUSHION" o={on(f, t.small48 - 2, 8)} />
          <Hospital x={760} y={FLOOR} s={1.1} o={on(f, t.hospital - 2, 8)} />
          <Fire x={1190} y={FLOOR} s={1} f={f} o={on(f, t.fire - 2, 8)} />
          <Crash x={1620} y={FLOOR} s={1} o={on(f, t.accident - 2, 8)} />
          <Umbrella x={960} y={420} s={1.1} open={on(f, t.insurance49, 14)} o={on(f, t.insurance49 - 2, 8)} />
        </g>
        {/* the pool */}
        <g opacity={poolO}>
          <g transform="translate(960 840)">
            <ellipse cx={0} cy={0} rx={420} ry={110} fill={L.duskD} opacity={0.25} />
            <ellipse cx={0} cy={0} rx={400 * poolLevel + 40} ry={100 * poolLevel + 10} fill={L.gold} opacity={0.85} />
            <text x={0} y={18} textAnchor="middle" fill={L.ink} style={{ font: `400 54px ${FONT.big}`, letterSpacing: 3 }}>THE INSURER'S POOL</text>
          </g>
          {Array.from({ length: 6 }, (_, k) => { const x = 360 + k * 240, drop = ((f - t.small50) / 26 + k / 6) % 1
            return <g key={k}><Icon x={x} y={600} s={0.8} color={k === 4 ? L.terraD : L.inkSoft} o={on(f, k < 2 ? t.small50 : t.lots51 + (k - 2) * 2, 6)} />
              {f > t.small50 && f < t.bad51 && <Coin x={x} y={lerp(620, 780, drop)} r={20} o={1 - drop} />}</g> })}
          <Tag x={960} y={330} text="A SMALL PREMIUM EACH" size={44} bg={L.ink} o={on(f, t.premium, 8) * (1 - on(f, t.bad51 - 2, 6))} />
          <BillSheet x={1320} y={300} s={0.42} head="BIG BILL" amount="$$$" color={L.red} o={on(f, t.big51 - 2, 8)} />
          <Arrow x1={1330} y1={820} x2={1460} y2={340} p={span(f, t.insurer, t.insurer + 12)} color={L.cashD} w={12} bend={0.25} />
          <Tag x={1620} y={960} text="THEY PAY A FIRST SLICE" size={34} bg={L.terraD} o={on(f, t.slice51, 8)} />
          <Tag x={1620} y={1020} text="= THE DEDUCTIBLE" size={34} bg={L.terraD} o={on(f, t.deductible, 8)} />
        </g>
        {/* the three that matter */}
        <g opacity={on(f, t.people53 - 2, 8)}>
          {[['HEALTH', t.health53, 420], ['CAR', t.car53, 960], ['RENTERS', t.renters, 1500]].map(([name, at, x]) => (
            <g key={name as string} opacity={0.35 * on(f, t.people53 - 2, 8) + 0.65 * on(f, (at as number) - 2, 8)}>
              <rect x={(x as number) - 230} y={360} width={460} height={560} rx={26} fill={L.creamL} stroke={L.creamD} strokeWidth={6} />
              <Tag x={x as number} y={880} text={name as string} size={46} bg={L.sageD} />
            </g>))}
          <g opacity={on(f, t.health53 - 2, 8)} transform="translate(420 620)"><rect x={-50} y={-150} width={100} height={300} rx={14} fill={L.red} /><rect x={-150} y={-50} width={300} height={100} rx={14} fill={L.red} /></g>
          <g opacity={on(f, t.car53 - 2, 8)}><Crash x={960} y={720} s={0.85} /></g>
          <g opacity={on(f, t.renters - 2, 8)}>
            <g opacity={1 - 0.6 * on(f, t.things53, 8)}><rect x={1360} y={420} width={280} height={240} fill={L.dusk} /><Tag x={1500} y={470} text="BUILDING: LANDLORD" size={30} bg={L.duskD} o={on(f, t.building53, 8)} /></g>
            <Sofa x={1500} y={800} s={0.5} /><Tag x={1500} y={700} text="YOUR THINGS: YOU" size={30} bg={L.sageD} o={on(f, t.things53, 8)} />
          </g>
        </g>
      </g>}

      {/* ---------------- D) scams ---------------- */}
      {D > 0 && <g opacity={D}>
        <Room cool />
        <g opacity={1 - on(f, t.protected58 - 4, 8)}>
          {/* the phone with a fake message */}
          <g transform="translate(560 620)" opacity={on(f, t.people54 - 4, 8)}>
            <rect x={-170} y={-300} width={340} height={600} rx={40} fill={L.ink} /><rect x={-150} y={-270} width={300} height={540} rx={24} fill="#F2F5F9" />
            <rect x={-130} y={-200} width={260} height={150} rx={20} fill="#fff" stroke={L.creamD} strokeWidth={4} />
            <text x={-110} y={-150} fill={L.terraD} style={{ font: `400 36px ${FONT.big}`, letterSpacing: 1 }}>{f < t.bank56 ? 'URGENT!' : 'YOUR BANK?'}</text>
            <text x={-110} y={-100} fill={L.ink} style={{ font: `400 34px ${FONT.big}` }}>PAY NOW OR ELSE</text>
            {/* the imposter's mask over the sender */}
            <g opacity={on(f, t.imposter, 8)} transform="translate(0 90)"><path d="M-110 -20 Q0 -90 110 -20 Q100 60 40 50 Q0 30 -40 50 Q-100 60 -110 -20 Z" fill={L.ink} /><ellipse cx={-50} cy={0} rx={26} ry={16} fill="#F2F5F9" /><ellipse cx={50} cy={0} rx={26} ry={16} fill="#F2F5F9" /></g>
          </g>
          <g opacity={on(f, t.sixteen55 - 4, 8) * (1 - on(f, t.imposter - 4, 8))}>
            {Array.from({ length: 10 }, (_, k) => <rect key={k} x={1100 + (k % 4) * 130} y={820 - Math.floor(k / 4) * 70} width={120} height={60} rx={8} fill={L.cash} stroke={L.cashD} strokeWidth={4} />)}
            <Tag x={1300} y={480} text="$16 BILLION LOST (2025)" size={46} bg={L.terraD} />
            <Tag x={1300} y={560} text="THE MOST ON RECORD" size={36} bg={L.inkSoft} o={on(f, t.record55, 8)} />
          </g>
          <g opacity={on(f, t.pretending - 2, 8) * (1 - on(f, t.federal57 - 4, 8))}>
            {[['BANK', t.bank56], ['GOVERNMENT', t.government56], ['COMPANY', t.company56]].map(([n, at], k) => <Tag key={n as string} x={1300} y={480 + k * 110} text={n as string} size={48} bg={L.duskD} o={on(f, at as number, 6)} />)}
          </g>
          <g opacity={on(f, t.gift57 - 4, 8)}>
            <GiftCard x={1300} y={600} s={1.3} />
            <Cross x={1300} y={600} r={150} p={span(f, t.scammer, t.scammer + 12)} />
            <Tag x={1300} y={420} text="FTC: GIFT CARD = SCAMMER" size={38} bg={L.ink} o={on(f, t.simply57, 8)} />
          </g>
        </g>
        <g opacity={on(f, t.protected58 - 2, 8)}>
          <Jar x={500} y={FLOOR - 4} s={1} fill={0.2} color={L.sage} label="CUSHION" />
          <Tag x={500} y={480} text="MAYA: PROTECTED" size={40} bg={L.sageD} />
          <Card x={1400} y={620} s={1.2} r={-6} text="$800" o={on(f, t.jordan58, 8)} />
          <Tag x={1400} y={820} text="JORDAN: NOW DEBT" size={44} bg={L.terraD} o={on(f, t.debt58, 8)} />
        </g>
      </g>}

      <Headline f={f} lines={[[t.bites, 'A CRACKED TOOTH', L.ink, 110], [t.dentist, '$800', L.ink, 130], [t.imagine45, 'SAME BILL, NO CUSHION', L.terraD, 104],
        [t.small48, 'SOME SHOCKS ARE TOO BIG', L.ink, 100], [t.works50, 'HOW INSURANCE WORKS', L.ink, 104], [t.people53, 'THE ONES THAT MATTER MOST', L.ink, 96], [t.protect54, 'PEOPLE TRYING TO TAKE IT', L.terraD, 100],
        [t.protected58, 'TWO OUTCOMES', L.ink, 110]]} />
      <Sweep f={f} at={(EXTRA['ll-protect'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_PROTECT = makePiece('ll-protect', "Protect: Maya at dinner bites and a big tooth cracks; the $800 dentist bill — Maya pays from her cushion jar ($2,190 saved, $1,390 left) and it is stamped PAID; Jordan gets the same bill, has no cushion and swipes a card that now shows $800; a small cushion jar beside a towering hospital, a house on fire and a car crash; an umbrella opens (insurance); many people drop small coins (a premium) into the insurer's pool, one gets a big bill, pays a first slice (the deductible) and the pool pays the rest; three tiles — health, car, renters (the landlord's policy covers the building, your things are yours); a phone with a fake urgent bank text behind an imposter's mask; $16 billion lost to fraud in 2025, the most on record; bank, government, company; a gift card crossed (FTC: gift card = scammer); Maya protected, Jordan's card now $800 of debt", {
  mood: 'light', Component: Protect, beats: [...Object.values(K), ...(EXTRA['ll-protect'] ?? [])],
  sfx: [['s42:cracks', 'thud', 0.14], ['s44:cash', 'cash', 0.12], ['s46:card', 'swish', 0.12], ['s48:insurance', 'pop', 0.12], ['s53:sixteen', 'thud', 0.12], ['s55:scammer', 'swish', 0.12]] })
void easeInOut
