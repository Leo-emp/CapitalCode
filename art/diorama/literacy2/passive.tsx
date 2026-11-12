// ---------------------------------------------------------------- s127–s146: PASSIVE INCOME — the peak
// A) s127–s128 the hourglass (active, needs your time) beside the money tree (passive); "not free": a seed bag of
//             money and a toolbox of work appear at the tree's foot (money or work up front).
// B) s129–s133 four routes as four cards that light one at a time: 1 INTEREST (a bank paying coins, small), 2 DIVIDENDS
//             (a company paying a coin every 3 months), 3 RENT (a house with a key, a wrench and an empty-month calendar),
//             4 BUILD ONCE, SELL MANY (one box copied into many). Then the quiet route: a growing pile of investments.
// C) s134–s140 how big a pile: the 1994 Bengen study page, a pile with a 4% tap that runs for 30 years; the steps —
//             one bill (phone + internet $250 a month) → × 12 = $3,000 a year → ÷ 0.04 = $75,000; the pile covers the bill.
// D) s141–s146 Maya's pile climbs to $75,000 in under 7 years; the bill is stamped PAID BY HER MONEY; the next bills
//             turn green one by one; after 20 years $380,000 → about $1,270 a month; her NEEDS jar two-thirds filled by it;
//             a chain of bills each turning green: one bill, then another, then another.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Calendar, Hourglass, Jar } from '../literacy/kit2'
import { Big, BillSheet, Coin, Cross, FLOOR, House, L, LDefs, LGrain, MoneyTree, Paper, Room, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  remember: 's127:remember', two127: 's127:two', active127: 's127:active', time127: 's127:time', passive127: 's127:passive',
  never128: 's128:never', free128: 's128:free', money128: 's128:money', work128: 's128:work',
  one129: 's129:one', interest129: 's129:interest', bank129: 's129:bank', four129: 's129:four', simple129: 's129:simple', small129: 's129:small',
  two130: 's130:two', dividends130: 's130:dividends', profits130: 's130:profits', shareholders: 's130:shareholders', three130: 's130:three',
  three131: 's131:three', rent131: 's131:rent', property: 's131:property', live131: 's131:live', repairs: 's131:repairs', empty131: 's131:empty', tenants: 's131:tenants',
  four132: 's132:four', build: 's132:build', many132: 's132:many', course: 's132:course', app: 's132:app', book132: 's132:book', real132: 's132:real', never132: 's132:never',
  reachable: "s133:maya's", quiet: 's133:quiet', pile133: 's133:pile', later133: 's133:investments',
  big134: 's134:big', pile134: 's134:pile',
  y1994: 's135:1994', bengen: 's135:bengen', four135: 's135:four', thirty135: 's135:thirty', tested: 's135:tested', rule135: 's135:rule',
  use136: "s137:here's", step136: 's137:uses', mix136: 's136:mix', near136: 's136:near',
  one137: 's137:one', bill137: 's137:bill', phone: "s137:maya's", internet: 's137:internet', two137: 's137:two',
  two138: 's138:two', yearly: 's138:yearly', twelve138: 's138:twelve', three138: 's138:three',
  divide139: 's139:divide', divided139: 's139:divided', four139: 's139:four', three139: 's139:three', seventy139: 's139:seventy',
  rule140: 's140:rule', pile140: 's140:pile', cover140: 's140:cover', thirty140: 's140:thirty',
  seven141: 's141:seven', example141: 's141:growing', maya141: "s141:maya's", under141: 's141:six',
  bill142: 's142:bill', paid142: 's142:paid', instead142: 's142:instead', time142: 's142:time',
  picks143: 's143:cover', next143: 's143:next',
  twenty144: 's144:twenty', four144: 's144:four', three144: 's144:three', one144: 's144:one', works144: 's144:works',
  catch145: 's145:catch', retirement145: 's145:retirement', fifty145: 's145:fifty', ten145: 's145:ten',
  eight146: 's146:eight', own146: 's146:own', rest146: 's146:rest', age146: 's146:age',
  two145: 's147:altogether', needs145: 's147:needs', four147: 's147:four',
  way146: 's148:way', paycheck146: 's148:paycheck', big146: 's148:big', covering: 's148:covering', another146: 's148:another', another146b: 's148:another#2',
}
const ROUTES: [string, string, string][] = [['1 · INTEREST', 'interest129', L.duskD], ['2 · DIVIDENDS', 'dividends130', L.mustardD], ['3 · RENT', 'rent131', L.terraD], ['4 · BUILD ONCE, SELL MANY', 'build', L.plum]]

const Box: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-60 -40 L0 -70 L60 -40 L60 40 L0 70 L-60 40 Z" fill={L.plum} /><path d="M-60 -40 L0 -10 L60 -40" stroke="#fff" strokeWidth={5} fill="none" opacity={0.5} /><path d="M0 -10 L0 70" stroke="#fff" strokeWidth={5} opacity={0.5} /></g>
)
const Pile: React.FC<{ x: number; y: number; w: number; h: number; o?: number }> = ({ x, y, w, h, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o}><path d={`M${x - w / 2} ${y} Q${x} ${y - h * 2} ${x + w / 2} ${y} Z`} fill={L.gold} stroke={L.goldD} strokeWidth={5} />
    {Array.from({ length: 5 }, (_, k) => <ellipse key={k} cx={x - w * 0.25 + (k % 3) * w * 0.25} cy={y - h * (0.2 + 0.25 * Math.floor(k / 3))} rx={w * 0.08} ry={w * 0.03} fill="#fff" opacity={0.4} />)}</g>
)

const Passive: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s129') - 6, BC = c('s134') - 6, CD = c('s141') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)
  const card = (k: number) => on(f, t[ROUTES[k][1] as keyof typeof t] - 4, 8)
  const lit = (k: number) => { const a = t[ROUTES[k][1] as keyof typeof t], b = k < 3 ? t[ROUTES[k + 1][1] as keyof typeof t] : t.reachable; return win(f, a - 4, b, 8) }
  // # D: the pile toward $75,000, then $380,000
  const pileH = lerp(40, 140, on(f, t.maya141, 20)) + 120 * on(f, t.twenty144, 24)
  const greens = Math.min(5, Math.max(0, Math.floor((f - t.picks143) / 10) + 1))

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) not free ---------------- */}
      {A > 0 && <g opacity={A}>
        <Room />
        <Hourglass x={520} y={FLOOR} s={1.2} t={((f) / 120) % 1} o={on(f, t.active127 - 4, 8)} />
        <Tag x={520} y={420} text="ACTIVE: NEEDS YOUR TIME" size={40} bg={L.terraD} o={on(f, t.time127, 8)} />
        <MoneyTree x={1300} y={FLOOR} s={0.95} g={0.8} drop={((f - t.passive127) / 30) % 1} o={on(f, t.passive127 - 4, 8)} />
        <Tag x={1300} y={330} text="PASSIVE: DOESN'T" size={44} bg={L.sageD} o={on(f, t.passive127, 8)} />
        <g opacity={on(f, t.never128 - 2, 8)}>
          <Tag x={960} y={620} text="BUT NEVER FREE" size={44} bg={L.ink} o={on(f, t.free128, 8)} />
          <g opacity={on(f, t.money128 - 2, 8)} transform={`translate(1560 ${FLOOR})`}><path d="M-80 0 Q-100 -130 -40 -150 L40 -150 Q100 -130 80 0 Z" fill={L.mustard} /><rect x={-50} y={-180} width={100} height={36} rx={10} fill={L.mustardD} /><text x={0} y={-50} textAnchor="middle" fill={L.ink} style={{ font: `400 80px ${FONT.big}` }}>$</text></g>
          <g opacity={on(f, t.work128 - 2, 8)} transform={`translate(1040 ${FLOOR})`}><rect x={-110} y={-110} width={220} height={110} rx={12} fill={L.terra} /><path d="M-50 -110 L-50 -150 L50 -150 L50 -110" stroke={L.terraD} strokeWidth={12} fill="none" /><rect x={-110} y={-70} width={220} height={14} fill={L.terraD} /></g>
          <Tag x={1300} y={1000} text="MONEY OR WORK UP FRONT" size={38} bg={L.inkSoft} o={on(f, t.work128, 8)} />
        </g>
      </g>}

      {/* ---------------- B) four routes ---------------- */}
      {B > 0 && <g opacity={B}>
        <Paper />
        {ROUTES.map(([name, , col], k) => { const x = 520 + (k % 2) * 880, y = 300 + Math.floor(k / 2) * 380, hi = lit(k), dim = f > t.reachable - 4 && k > 1 ? 0.35 : 1
          return <g key={name} opacity={card(k) * dim}>
            <rect x={x - 400} y={y} width={800} height={340} rx={26} fill={L.creamL} stroke={hi > 0.5 ? col : L.creamD} strokeWidth={hi > 0.5 ? 10 : 5} />
            <Tag x={x} y={y + 62} text={name} size={44} bg={col} />
          </g> })}
        {/* 1 interest */}
        <g opacity={card(0)}>
          <g transform="translate(330 560)"><path d="M-110 -50 L0 -110 L110 -50 Z" fill={L.duskD} />{[-70, -23, 23, 70].map((k) => <rect key={k} x={k - 12} y={-46} width={24} height={86} fill={L.dusk} />)}<rect x={-110} y={40} width={220} height={16} fill={L.duskD} /></g>
          <Coin x={520} y={520} r={40} label="4%" o={on(f, t.four129, 8)} />
          <Tag x={720} y={600} text="SAFE, BUT SMALL" size={34} bg={L.duskD} o={on(f, t.small129, 8)} />
        </g>
        {/* 2 dividends */}
        <g opacity={card(1)}>
          <g transform="translate(1180 600)"><rect x={-70} y={-170} width={140} height={190} fill={L.mustard} />{Array.from({ length: 6 }, (_, k) => <rect key={k} x={-50 + (k % 3) * 38} y={-150 + Math.floor(k / 3) * 60} width={24} height={34} fill={L.creamL} />)}</g>
          {f > t.profits130 && [0, 1].map((k) => { const p = ((f - t.profits130) / 26 + k / 2) % 1; return <Coin key={k} x={lerp(1270, 1470, p)} y={560} r={30} o={1 - p * 0.4} /> })}
          <Calendar x={1700} y={510} s={0.5} top="EVERY" big="3" color={L.mustardD} o={on(f, t.three130, 8)} />
          <Tag x={1560} y={600} text="MONTHS" size={30} bg={L.mustardD} o={on(f, t.three130, 8)} />
        </g>
        {/* 3 rent */}
        <g opacity={card(2)}>
          <House x={330} y={1000} s={0.55} color={L.terra} />
          <Tag x={660} y={820} text="LOTS OF MONEY UP FRONT" size={30} bg={L.terraD} o={on(f, t.property, 8)} />
          <g opacity={on(f, t.repairs - 2, 8)} transform="translate(560 940) rotate(-30)"><rect x={-8} y={-60} width={16} height={100} rx={6} fill={L.inkSoft} /><circle cx={0} cy={-70} r={26} fill="none" stroke={L.inkSoft} strokeWidth={12} /></g>
          <Tag x={760} y={900} text="EMPTY MONTHS" size={30} bg={L.inkSoft} o={on(f, t.empty131, 8)} />
          <Tag x={760} y={970} text="TENANTS" size={30} bg={L.inkSoft} o={on(f, t.tenants, 8)} />
        </g>
        {/* 4 build once */}
        <g opacity={card(3)}>
          <Box x={1180} y={900} s={0.9} />
          {Array.from({ length: 6 }, (_, k) => <Box key={k} x={1360 + (k % 3) * 110} y={830 + Math.floor(k / 3) * 90} s={0.55} o={on(f, t.many132 + k * 2, 6)} />)}
          <Tag x={1700} y={800} text={f < t.app ? 'A COURSE' : f < t.book132 ? 'AN APP' : 'A BOOK'} size={32} bg={L.plum} o={on(f, t.course, 8)} />
          <Tag x={1400} y={995} text="REAL WORK · MANY EARN LITTLE" size={28} bg={L.inkSoft} o={on(f, t.real132, 8)} />
        </g>
        {/* the quiet route */}
        <g opacity={on(f, t.quiet - 2, 8)}><Pile x={960} y={640} w={260} h={70} /><Tag x={960} y={700} text="A GROWING PILE OF INVESTMENTS" size={34} bg={L.sageD} o={on(f, t.pile133, 8)} /></g>
      </g>}

      {/* ---------------- C) how big a pile ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Paper />
        <g opacity={1 - on(f, t.use136 - 4, 8)}>
          <g opacity={on(f, t.y1994 - 2, 8)} transform="translate(520 600) rotate(-4)">
            <rect x={-200} y={-260} width={400} height={520} rx={12} fill="#fff" stroke={L.creamD} strokeWidth={6} />
            <text x={0} y={-180} textAnchor="middle" fill={L.ink} style={{ font: `400 60px ${FONT.big}`, letterSpacing: 3 }}>1994 STUDY</text>
            <text x={0} y={-120} textAnchor="middle" fill={L.inkSoft} style={{ font: `400 44px ${FONT.big}` }} opacity={on(f, t.bengen, 8)}>W. BENGEN</text>
            {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-150} y={-60 + k * 50} width={300 - (k % 2) * 60} height={16} rx={8} fill={L.creamD} />)}
          </g>
          <Pile x={1280} y={FLOOR} w={520} h={170} o={on(f, t.four135 - 6, 8)} />
          <Tag x={1280} y={FLOOR - 60} text="HIS TEST: STOCKS + BONDS" size={38} bg={L.inkSoft} o={on(f, t.mix136, 8)} />
          <g opacity={on(f, t.four135 - 2, 8)}><rect x={1530} y={720} width={120} height={36} rx={10} fill={L.inkSoft} /><rect x={1620} y={720} width={30} height={90} rx={8} fill={L.inkSoft} />
            {[0, 1, 2].map((k) => { const p = ((f - t.four135) / 22 + k / 3) % 1; return <Coin key={k} x={1635} y={830 + p * 120} r={22} o={1 - p} /> })}
            <Tag x={1660} y={640} text="TAKE OUT 4% A YEAR" size={36} bg={L.sageD} /></g>
          <Calendar x={1700} y={420} s={0.6} top="LASTED" big="30+" color={L.sageD} o={on(f, t.thirty135, 8)} />
          <Tag x={960} y={330} text="A RULE OF THUMB, NOT A PROMISE" size={38} bg={L.ink} o={on(f, t.rule135, 8)} />
        </g>
        {/* the three steps */}
        <g opacity={on(f, t.use136 - 2, 8)}>
          {[{ x: 380, at: t.one137, head: 'STEP 1: ONE BILL', big: '$250', sub: 'A MONTH', subAt: t.two137, col: L.terra },
            { x: 960, at: t.two138, head: 'STEP 2: × 12', big: '$3,000', sub: 'A YEAR', subAt: t.three138, col: L.duskD },
            { x: 1540, at: t.divide139, head: 'STEP 3: ÷ 4%', big: '$75,000', sub: 'THE PILE', subAt: t.seventy139, col: L.sageD }].map((s) => (
            <g key={s.head} opacity={on(f, s.at - 2, 8)}>
              <rect x={s.x - 250} y={360} width={500} height={420} rx={26} fill={L.creamL} stroke={s.col} strokeWidth={8} />
              <Tag x={s.x} y={430} text={s.head} size={42} bg={s.col} />
              <Big x={s.x} y={630} text={s.big} size={s.big.length > 6 ? 110 : 130} color={s.col} o={on(f, s.subAt, 8)} />
              <Big x={s.x} y={710} text={s.sub} size={44} color={L.inkSoft} o={on(f, s.subAt, 8)} />
            </g>))}
          <Tag x={380} y={850} text="PHONE + INTERNET" size={34} bg={L.inkSoft} o={on(f, t.internet, 8)} />
          <Tag x={1540} y={850} text="$3,000 ÷ 0.04" size={36} bg={L.sageD} o={on(f, t.divided139, 8)} />
          <Tag x={960} y={920} text="COULD COVER THAT BILL FOR 30+ YEARS" size={42} bg={L.sageD} o={on(f, t.cover140, 8)} />
        </g>
      </g>}

      {/* ---------------- D) bill after bill ---------------- */}
      {D > 0 && <g opacity={D}>
        <Room />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.under141, 'celebrate', 'smiling'], [t.paid142, 'relax', 'smiling'], [t.picks143, 'point', 'smiling'], [t.works144, 'leanBack', 'smiling'], [t.covering, 'fistPump', 'smiling']]} x={240} y={1060} s={0.78} />
        <g opacity={1 - on(f, t.catch145 - 4, 8)}>
          <Pile x={760} y={FLOOR} w={lerp(300, 520, on(f, t.twenty144, 24))} h={pileH} />
          <Tag x={760} y={FLOOR + 70} text={f < t.twenty144 ? '$75,000 IN ABOUT 6 YEARS' : 'AFTER 20 YEARS: $443,000'} size={36} bg={L.sageD} o={on(f, t.under141 - 6, 8)} />
          <Tag x={760} y={360} text="$860 A MONTH · 7%" size={36} bg={L.inkSoft} o={on(f, t.seven141, 8) * (1 - on(f, t.bill142 - 2, 8))} />
          <BillSheet x={1300} y={560} s={0.7} r={-3} head="PHONE + INTERNET" amount="$250" color={L.terra} stamp="PAID" stampO={on(f, t.paid142, 10)} o={on(f, t.bill142 - 2, 8) * (1 - on(f, t.picks143 - 2, 8))} />
          <Tag x={1300} y={820} text="BY HER MONEY, NOT HER TIME" size={36} bg={L.sageD} o={on(f, t.time142, 8) * (1 - on(f, t.picks143 - 2, 8))} />
          <g opacity={on(f, t.picks143 - 2, 8) * (1 - on(f, t.twenty144 - 2, 8))}>
            {Array.from({ length: 5 }, (_, k) => <BillSheet key={k} x={1120 + (k % 3) * 250} y={480 + Math.floor(k / 3) * 330} s={0.42} r={(k % 2 ? 4 : -4)} head="BILL" amount={k < greens ? 'PAID' : 'DUE'} color={k < greens ? L.sageD : L.terra} />)}
          </g>
          <g opacity={on(f, t.twenty144 - 2, 8)}>
            {[0, 1, 2].map((k) => { const p = ((f - t.four144) / 24 + k / 3) % 1; return <Coin key={k} x={lerp(920, 1300, p)} y={lerp(700, 600, p)} r={30} o={1 - p * 0.5} /> })}
            <rect x={1290} y={420} width={480} height={300} rx={24} fill={L.creamL} stroke={L.sageD} strokeWidth={8} />
            <Big x={1530} y={560} text="$1,480" size={130} color={L.sageD} o={on(f, t.one144, 8)} />
            <Big x={1530} y={640} text="A MONTH BEFORE TAX" size={40} color={L.inkSoft} o={on(f, t.works144, 8)} />
          </g>
        </g>
        {/* one catch: the 401(k) part waits for retirement age */}
        <g opacity={on(f, t.catch145 - 2, 8) * (1 - on(f, t.two145 - 4, 8))}>
          <Pile x={760} y={FLOOR} w={420} h={150} />
          <Tag x={760} y={FLOOR + 70} text="OWN ACCOUNT ≈ $242,000" size={34} bg={L.sageD} />
          <Pile x={1380} y={FLOOR} w={380} h={130} />
          <Tag x={1380} y={FLOOR + 70} text="401(K) ≈ $201,000" size={34} bg={L.duskD} />
          <g opacity={on(f, t.retirement145 - 2, 8) * (1 - on(f, t.rest146, 10))} transform="translate(1380 640)">
            <path d="M-50 -40 L-50 -90 Q-50 -140 0 -140 Q50 -140 50 -90 L50 -40" stroke={L.ink} strokeWidth={18} fill="none" />
            <rect x={-80} y={-50} width={160} height={130} rx={18} fill={L.mustard} stroke={L.mustardD} strokeWidth={6} />
            <circle cx={0} cy={10} r={16} fill={L.ink} />
          </g>
          <Tag x={1380} y={460} text="BEFORE 59½: +10% TAX" size={36} bg={L.terraD} o={on(f, t.ten145, 8) * (1 - on(f, t.rest146 - 2, 8))} />
          <Tag x={1380} y={460} text="AT RETIREMENT AGE" size={36} bg={L.duskD} o={on(f, t.age146, 8)} />
          {f > t.eight146 && [0, 1, 2].map((k) => { const p = ((f - t.eight146) / 24 + k / 3) % 1; return <Coin key={k} x={760} y={lerp(560, 700, p)} r={26} o={1 - p} /> })}
          <Tag x={760} y={480} text="≈ $810 A MONTH, ANY TIME" size={38} bg={L.sageD} o={on(f, t.eight146, 8)} />
        </g>
        <g opacity={on(f, t.two145 - 2, 8) * (1 - on(f, t.way146 - 4, 8))}>
          <Jar x={960} y={FLOOR - 4} s={1.4} fill={0.81} color={L.sage} label="NEEDS" />
          <Tag x={960} y={360} text="≈ 4/5 OF HER NEEDS BUDGET" size={46} bg={L.sageD} o={on(f, t.four147, 8)} />
        </g>
        <g opacity={on(f, t.way146 - 2, 8)}>
          <Cross x={760} y={520} r={0} p={0} />
          {[0, 1, 2, 3].map((k) => { const at = [t.covering, t.covering + 8, t.another146, t.another146b][k]
            return <BillSheet key={k} x={720 + k * 300} y={600} s={0.5} r={k % 2 ? 3 : -3} head="BILL" amount={f > at ? 'PAID' : 'DUE'} color={f > at ? L.sageD : L.terra} /> })}
          <Tag x={1170} y={360} text="NOT ONE BIG WIN" size={46} bg={L.ink} o={on(f, t.big146, 8)} />
        </g>
      </g>}

      <Headline f={f} lines={[[t.remember, 'TWO KINDS OF INCOME', L.ink, 104], [t.never128, 'NEVER FREE', L.ink, 120], [t.one129, 'THE MAIN ROUTES', L.ink, 110], [t.big134, 'HOW BIG A PILE?', L.ink, 110],
        [t.use136, 'STEP BY STEP', L.sageD, 110], [t.seven141, "MAYA'S FIRST BILL", L.sageD, 104], [t.picks143, 'THEN THE NEXT', L.sageD, 110], [t.twenty144, 'AFTER 20 YEARS', L.sageD, 110], [t.catch145, 'ONE CATCH', L.terraD, 120], [t.two145, 'ALTOGETHER', L.sageD, 120], [t.way146, 'THE WAY OUT', L.sageD, 120]]} />
      <Sweep f={f} at={(EXTRA['ll-passive'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_PASSIVE = makePiece('ll-passive', "Passive income: an hourglass (active, needs your time) beside a money tree (passive, doesn't); never free — a money bag and a toolbox at the tree (money or work up front); four route cards light one by one — 1 interest (a bank, a 4% coin, safe but small), 2 dividends (a company paying coins every 3 months), 3 rent (a house, lots of money up front, a wrench, empty months, tenants), 4 build once, sell many (a box copied into many: a course, an app, a book; real work, many earn little); a growing pile of investments; the 1994 Bengen study page and a stocks-and-bonds pile with a tap taking out 4% a year that lasted 30+ years, a rule of thumb; three step cards — one bill $250 a month (phone + internet), × 12 = $3,000 a year, ÷ 4% = $75,000; that pile could cover the bill for 30+ years; Maya's pile reaches $75,000 in about 6 years at $860 a month (7%), the $250 bill stamped PAID by her money not her time; five bills turn PAID one by one; after 20 years $443,000 → about $1,480 a month before tax; one catch — her own account (≈ $242,000) can pay ≈ $810 a month any time, the 401(k) part (≈ $201,000) sits behind a lock until retirement age (before 59½ an extra 10% tax); altogether her NEEDS jar about four-fifths full; a row of bills turning paid — not one big win", {
  mood: 'light', Component: Passive, beats: [...Object.values(K), ...(EXTRA['ll-passive'] ?? [])],
  sfx: [['s128:free', 'thud', 0.1], ['s129:interest', 'pop', 0.08], ['s130:dividends', 'pop', 0.08], ['s131:rent', 'pop', 0.08], ['s132:build', 'pop', 0.08], ['s139:seventy', 'ding', 0.14], ['s142:paid', 'cash', 0.14], ['s144:one', 'chime', 0.14]] })
void Cross
