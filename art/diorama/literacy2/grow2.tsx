// ---------------------------------------------------------------- s104–s126: GROW (2) — compound growth, fees, Maya's money trail, 20 years
// A) s104–s108 compound growth at the 7%: a $1,000 coin stack; year one +$70, year two 7% of $1,070 = +$75; the rule
//              of 72 card builds up (72 ÷ 7% ≈ 10 years to double) and stacks double at year 0, 10 and 20.
// B) s109–s112 fees: two piles from $10,000 leaking — index fund 0.09% (a drip) ends $74,000, active fund 0.57% (a stream)
//              $65,000 after 30 years at 7%; ten trophies, eight grey (79% of active large-US funds did worse in 2025).
// C) s113–s120 Maya's money trail: her $730 stack; step one — $260 slides into a 401(K) jar (6% of pay; before tax it
//              only shrinks her paycheck by about $230); her employer's hand adds 50¢ per $1 → +$130 a month; step two —
//              the other $470 slides into her OWN ACCOUNT jar; both jars get an S&P 500 badge; $730 + $130 = $860 a month.
// D) s121–s124 the growth at 7% minus the 0.09% fee: after 10 years $103,000 in → $148,000; after 20 years $206,000 in →
//              $443,000, the gold growth part bigger than what went in; today's dollars (after inflation).
// E) s125–s126 not advice; Maya beside a money tree that starts paying (growth → income).
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Arrow, Jar } from '../literacy/kit2'
import { Big, Coin, FLOOR, L, LDefs, LGrain, MoneyTree, Paper, Room, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  seven104: 's104:seven', compound104: 's104:compound', earning104: 's104:earning', already: 's104:already',
  picture105: 's105:picture', thousand105: 's105:thousand', seven105: 's105:seven',
  one106: 's106:one', seventy106: 's106:seventy', two106: 's106:two', five106: 's106:five',
  bigger107: 's107:bigger', gains107: 's107:gains', earning107: 's107:earning',
  rule108: 's108:rule', seventy108: 's108:seventy', divide: 's108:divide', rate108: 's108:rate', roughly: 's108:roughly', double108: 's108:double', ten108: 's108:ten',
  eats: 's109:eats', fees109: 's109:fees', broad: 's109:broad', zero109: 's109:zero', actively: 's109:actively', five109: 's109:five',
  tiny: 's110:tiny', fee110: 's110:fee', compounds: 's110:compounds', against110: 's110:against',
  thirty111: 's111:thirty', ten111: 's111:ten', seventy111: 's111:seventy', sixty111: 's111:sixty', active111: "s111:fund's#2",
  most112: 's112:most', win112: 's112:win', seventy112: 's112:seventy', worse: 's112:worse',
  exactly: 's113:exactly', maya113: 's113:maya', seven113: 's113:seven',
  step114: 's114:one', two114: 's114:two', k401: 's114:401k', retirement114: 's114:retirement', six114: 's114:six',
  before115: 's115:before', shrinks: 's115:shrinks', thirty115: 's115:thirty', less115: 's115:less',
  why116: 's116:why', employers116: 's116:employers', match116: 's116:match', vanguard: "s116:vanguard's", dollar116: 's116:dollar', fifty116: 's116:fifty',
  employer117: 's117:employer', one117: 's117:one', free117: 's117:free',
  step118: 's118:step', four118: 's118:four', index118: 's118:index', own118: 's118:own', account118: 's118:account',
  inside119: 's119:inside', picks119: 's119:picks', index119: 's119:index',
  every120: 's120:every', eight120: 's120:eight', seven120: 's120:seven', hers120: 's120:hers', employer120: 's120:employer',
  grow121: 's121:grow', seven121: 's121:seven', minus: 's121:minus', fee121: 's121:fee',
  ten122: 's122:ten', three122: 's122:three', grown122: 's122:grown', forty122: 's122:forty',
  twenty123: 's123:twenty', six123: 's123:six', grown123: 's123:grown', four123: 's123:four', half123: 's123:half',
  after124: 's124:after', inflation124: 's124:inflation', today124: "s124:today's",
  advice: 's125:advice', works125: 's125:works',
  growing126: 's126:growing', last126: 's126:last', turning: 's126:turning', income126: 's126:income',
}
const Stack: React.FC<{ x: number; base: number; n: number; o?: number; color?: string }> = ({ x, base, n, o = 1, color = L.gold }) => o <= 0.01 ? null : (
  <g opacity={o}>{Array.from({ length: Math.round(n) }, (_, k) => <g key={k}><ellipse cx={x} cy={base - k * 26} rx={90} ry={24} fill={color} stroke={L.goldD} strokeWidth={4} /></g>)}</g>
)
const Trophy: React.FC<{ x: number; y: number; gold: boolean; o?: number }> = ({ x, y, gold, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d="M-50 -120 L50 -120 Q50 -40 0 -30 Q-50 -40 -50 -120 Z" fill={gold ? L.gold : '#C9CDD3'} stroke={gold ? L.goldD : '#9AA1A9'} strokeWidth={5} />
    <rect x={-8} y={-32} width={16} height={30} fill={gold ? L.goldD : '#9AA1A9'} /><rect x={-36} y={-4} width={72} height={20} rx={6} fill={gold ? L.goldD : '#9AA1A9'} />
  </g>
)
const Pile: React.FC<{ x: number; y: number; h: number; label: string; color: string }> = ({ x, y, h, label, color }) => (
  <g><path d={`M${x - 200} ${y} Q${x} ${y - h * 2} ${x + 200} ${y} Z`} fill={color} opacity={0.9} />
    <text x={x} y={y - h * 0.6} textAnchor="middle" fill="#fff" style={{ font: `400 64px ${FONT.big}` }}>{label}</text></g>
)
const BarPair: React.FC<{ x: number; base: number; inH: number; outH: number; o: number; inLabel: string; outLabel: string; year: string; oOut: number; gold: number }> = ({ x, base, inH, outH, o, inLabel, outLabel, year, oOut, gold }) => o <= 0.01 ? null : (
  <g opacity={o}>
    <rect x={x - 170} y={base - inH} width={150} height={inH} rx={10} fill={L.dusk} />
    <text x={x - 95} y={base - inH - 20} textAnchor="middle" fill={L.duskD} style={{ font: `400 46px ${FONT.big}` }}>{inLabel}</text>
    <g opacity={oOut}>
      <rect x={x + 20} y={base - outH} width={150} height={outH} rx={10} fill={L.sage} />
      <rect x={x + 20} y={base - outH} width={150} height={(outH - inH) * gold} rx={10} fill={L.gold} />
      <text x={x + 95} y={base - outH - 20} textAnchor="middle" fill={L.sageD} style={{ font: `400 46px ${FONT.big}` }}>{outLabel}</text>
    </g>
    <text x={x} y={base + 60} textAnchor="middle" fill={L.ink} style={{ font: `400 48px ${FONT.big}`, letterSpacing: 2 }}>{year}</text>
  </g>
)
// # an employer's hand (sleeve + open palm), dropping coins
const Hand: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}><rect x={0} y={-36} width={260} height={84} rx={20} fill={L.ink} /><rect x={-14} y={-40} width={36} height={92} rx={10} fill={L.creamL} /><path d="M-10 -36 Q-90 -56 -130 -16 Q-150 8 -110 26 L-40 30 Q0 56 -10 46 Z" fill="#E0A97A" /></g>
)

const Grow2: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s109') - 6, BC = c('s113') - 6, CD = c('s121') - 6, DE = c('s125') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = fadeIn(f, DE)
  const base = FLOOR - 20
  const coins = 10 + on(f, t.seventy106, 10) * 0.7 + on(f, t.five106, 10) * 0.75
  const leak = (f - t.fee110) / 20
  // # C: the trail — the $730 stack splits 260 / 470
  const to401 = on(f, t.two114, 14), toOwn = on(f, t.four118, 14)
  const stackN = 7.3 - 2.6 * to401 - 4.7 * toOwn
  const jar401 = 0.12 + 0.3 * to401 + 0.15 * on(f, t.one117, 14), jarOwn = 0.12 + 0.45 * toOwn
  const scaleH = 560 / 443000   // # one scale for every bar: $443,000 = 560 px

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) compound growth ---------------- */}
      {A > 0 && <g opacity={A}>
        <Paper />
        <g opacity={1 - on(f, t.rule108 - 4, 8)}>
          <Stack x={600} base={base} n={coins} o={on(f, t.thousand105 - 2, 8)} />
          <Tag x={600} y={base - 330} text="$1,000" size={48} bg={L.ink} o={on(f, t.thousand105, 8)} />
          <Tag x={600} y={base - 400} text="AT 7% A YEAR" size={36} bg={L.sageD} o={on(f, t.seven105, 8)} />
          <Tag x={960} y={330} text="MONEY EARNING ON MONEY IT EARNED" size={40} bg={L.ink} o={on(f, t.earning104, 8) * (1 - on(f, t.picture105 - 2, 8))} />
          <g opacity={on(f, t.one106 - 2, 8)}>
            <Tag x={1120} y={500} text="YEAR 1: +$70" size={50} bg={L.sageD} o={on(f, t.seventy106, 8)} />
            <Tag x={1120} y={620} text="YEAR 2: 7% OF $1,070" size={44} bg={L.duskD} o={on(f, t.two106, 8)} />
            <Tag x={1120} y={720} text="= +$75" size={56} bg={L.sageD} o={on(f, t.five106, 8)} />
            <Tag x={1120} y={850} text="GAINS ON LAST YEAR'S GAINS" size={36} bg={L.mustardD} o={on(f, t.gains107, 8)} />
          </g>
        </g>
        <g opacity={on(f, t.rule108 - 2, 8)}>
          <rect x={560} y={300} width={800} height={190} rx={24} fill={L.ink} />
          <text x={960} y={378} textAnchor="middle" fill={L.creamD} style={{ font: `400 46px ${FONT.big}`, letterSpacing: 4 }}>THE RULE OF 72</text>
          <text x={960} y={455} textAnchor="middle" fill={L.gold} style={{ font: `400 70px ${FONT.big}` }} opacity={on(f, t.divide, 8)}>{f < t.rate108 ? '72 ÷' : f < t.roughly ? '72 ÷ GROWTH RATE' : f < t.ten108 ? '72 ÷ RATE ≈ YEARS TO DOUBLE' : '72 ÷ 7% ≈ 10 YEARS TO DOUBLE'}</text>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, k === 0 ? t.double108 : t.ten108 + (k - 1) * 10, 8)}>
            <Stack x={560 + k * 400} base={base} n={[3, 6, 12][k]} />
            <Tag x={560 + k * 400} y={base + 70} text={['YEAR 0', 'YEAR 10', 'YEAR 20'][k]} size={36} bg={L.inkSoft} />
          </g>)}
        </g>
      </g>}

      {/* ---------------- B) fees ---------------- */}
      {B > 0 && <g opacity={B}>
        <Paper />
        <g opacity={1 - on(f, t.most112 - 4, 8)}>
          <Pile x={560} y={FLOOR} h={lerp(60, 240, on(f, t.seventy111, 12))} label={f < t.seventy111 ? '$10,000' : '$74,000'} color={L.sageD} />
          <Pile x={1360} y={FLOOR} h={lerp(60, 211, on(f, t.sixty111, 12))} label={f < t.sixty111 ? '$10,000' : '$65,000'} color={L.duskD} />
          <Tag x={560} y={380} text="INDEX FUND · 0.09% A YEAR" size={40} bg={L.sageD} o={on(f, t.broad, 8)} />
          <Tag x={1360} y={380} text="ACTIVE FUND · 0.57% A YEAR" size={40} bg={L.duskD} o={on(f, t.actively, 8)} />
          {f > t.fee110 && [0, 1, 2].map((k) => { const p = (leak + k / 3) % 1; return <g key={k}>
            <circle cx={720 + p * 60} cy={FLOOR - 40 + p * 120} r={8} fill={L.sageD} opacity={1 - p} />
            <circle cx={1530 + p * 90} cy={FLOOR - 40 + p * 120} r={22} fill={L.duskD} opacity={1 - p} /></g> })}
          <Tag x={960} y={470} text="FEES COMPOUND TOO, AGAINST YOU" size={38} bg={L.terraD} o={on(f, t.compounds, 8) * (1 - on(f, t.thirty111 - 2, 8))} />
          <Tag x={960} y={470} text="$10,000 · 7% · 30 YEARS" size={38} bg={L.ink} o={on(f, t.thirty111, 8)} />
        </g>
        <g opacity={on(f, t.most112 - 2, 8)}>
          {Array.from({ length: 10 }, (_, k) => <Trophy key={k} x={420 + k * 120} y={700} gold={k >= 8} o={on(f, t.seventy112 + k, 6)} />)}
          <Tag x={960} y={800} text="79% OF ACTIVE FUNDS DID WORSE (2025)" size={42} bg={L.terraD} o={on(f, t.worse, 8)} />
          <Tag x={960} y={420} text="ACTIVE LARGE-US FUNDS VS THE S&P 500" size={38} bg={L.ink} o={on(f, t.seventy112, 8)} />
        </g>
      </g>}

      {/* ---------------- C) Maya's money trail ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Room />
        <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [t.step114, 'countOne', 'thinking'], [t.shrinks, 'thumbsUp', 'smiling'], [t.match116, 'point', 'smiling'], [t.free117, 'celebrate', 'smiling'], [t.step118, 'countOne', 'thinking'], [t.every120, 'present', 'smiling']]} x={200} y={1060} s={0.75} />
        {/* her $730 a month */}
        <Stack x={600} base={FLOOR - 20} n={stackN} o={on(f, t.seven113 - 2, 8)} />
        <Tag x={600} y={FLOOR + 60} text="$730 A MONTH" size={36} bg={L.ink} o={on(f, t.seven113, 8) * (1 - toOwn)} />
        {/* step one: the 401(k) */}
        <Jar x={1060} y={FLOOR - 4} s={0.95} fill={jar401} color={L.duskD} label="401(K)" o={on(f, t.step114 - 2, 8)} />
        <Arrow x1={700} y1={FLOOR - 160} x2={960} y2={FLOOR - 200} p={span(f, t.two114, t.two114 + 10)} color={L.duskD} w={10} />
        <Tag x={1060} y={FLOOR + 60} text="$260 · 6% OF PAY" size={34} bg={L.duskD} o={on(f, t.six114, 8)} />
        <Tag x={960} y={330} text="BEFORE TAX: PAYCHECK ONLY −$230" size={36} bg={L.sageD} o={on(f, t.before115, 8) * (1 - on(f, t.why116 - 2, 8))} />
        {/* the match */}
        <Hand x={1180} y={420} o={on(f, t.employers116 - 2, 8)} />
        <Tag x={960} y={330} text="MATCH: 50¢ PER $1, UP TO 6%" size={36} bg={L.mustardD} o={on(f, t.dollar116, 8) * (1 - on(f, t.employer117 - 2, 8))} />
        {f > t.employer117 && f < t.free117 + 40 && [0, 1].map((k) => { const p = ((f - t.employer117) / 20 + k / 2) % 1; return <Coin key={k} x={lerp(1060, 1060, p)} y={lerp(470, 620, p)} r={30} label="$" o={1 - p * 0.5} /> })}
        <Tag x={960} y={330} text="+$130 A MONTH, FREE" size={40} bg={L.mustardD} o={on(f, t.one117, 8) * (1 - on(f, t.step118 - 2, 8))} />
        {/* step two: her own account */}
        <Jar x={1520} y={FLOOR - 4} s={0.95} fill={jarOwn} color={L.sage} label="OWN ACCOUNT" o={on(f, t.step118 - 2, 8)} />
        <Arrow x1={700} y1={FLOOR - 240} x2={1430} y2={FLOOR - 230} p={span(f, t.four118, t.four118 + 12)} color={L.sageD} w={10} bend={-0.22} />
        <Tag x={1520} y={FLOOR + 60} text="THE OTHER $470" size={34} bg={L.sageD} o={on(f, t.four118, 8)} />
        {/* both into the S&P 500 */}
        <Tag x={1520} y={560} text="S&P 500 FUND" size={32} bg={L.ink} o={on(f, t.index118, 8)} />
        <Tag x={1060} y={560} text="S&P 500 FUND" size={32} bg={L.ink} o={on(f, t.index119, 8)} />
        <Tag x={960} y={330} text="$730 + $130 = $860 A MONTH INTO THE S&P 500" size={38} bg={L.ink} o={on(f, t.eight120, 8)} />
      </g>}

      {/* ---------------- D) twenty years at 7% ---------------- */}
      {D > 0 && <g opacity={D}>
        <Paper />
        <rect x={0} y={FLOOR} width={1920} height={1080 - FLOOR} fill={L.creamD} opacity={0.6} />
        <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [t.ten122, 'countOne', 'thinking'], [t.four123, 'celebrate', 'smiling'], [t.today124, 'thumbsUp', 'smiling']]} x={250} y={1060} s={0.78} />
        <Tag x={760} y={320} text="$860 A MONTH · 7% − 0.09% FEE" size={42} bg={L.ink} o={on(f, t.seven121, 8)} />
        <BarPair x={800} base={base} inH={103200 * scaleH} outH={148100 * scaleH} o={on(f, t.ten122 - 2, 8)} inLabel="$103,000" outLabel="$148,000" year="10 YEARS" oOut={on(f, t.grown122, 8)} gold={on(f, t.grown122 + 6, 10)} />
        <BarPair x={1400} base={base} inH={206400 * scaleH} outH={443100 * scaleH} o={on(f, t.twenty123 - 2, 8)} inLabel="$206,000" outLabel="$443,000" year="20 YEARS" oOut={on(f, t.grown123, 8)} gold={on(f, t.four123, 12)} />
        <g opacity={on(f, t.ten122, 8)}><rect x={1600} y={380} width={40} height={40} fill={L.dusk} /><Big x={1650} y={414} text="WENT IN" size={36} color={L.inkSoft} anchor="start" />
          <rect x={1600} y={440} width={40} height={40} fill={L.gold} opacity={on(f, t.grown122, 8)} /><Big x={1650} y={474} text="GROWTH" size={36} color={L.inkSoft} anchor="start" o={on(f, t.grown122, 8)} /></g>
        <Tag x={1400} y={980} text="MORE THAN HALF IS GROWTH" size={40} bg={L.mustardD} o={on(f, t.half123, 8)} />
        <Tag x={800} y={980} text="IN TODAY'S DOLLARS" size={36} bg={L.sageD} o={on(f, t.today124, 8)} />
      </g>}

      {/* ---------------- E) not advice; growth → income ---------------- */}
      {E > 0 && <g opacity={E}>
        <Room />
        <Tag x={960} y={330} text="NOT ADVICE · JUST HOW IT WORKS" size={44} bg={L.inkSoft} o={on(f, t.advice - 4, 8) * (1 - on(f, t.growing126 - 2, 8))} />
        <Person f={f} who="investorF" beats={[[0, 'explain', 'neutral'], [t.growing126, 'present', 'smiling'], [t.turning, 'celebrate', 'smiling']]} x={360} y={1060} s={0.8} />
        <MoneyTree x={1200} y={FLOOR} s={1} g={lerp(0.15, 0.6, on(f, t.growing126, 20)) + 0.4 * on(f, t.turning, 20)} drop={f > t.income126 ? ((f - t.income126) / 30) % 1 : 0} />
        <Tag x={1200} y={330} text="GROWTH → INCOME" size={50} bg={L.sageD} o={on(f, t.income126, 8)} />
      </g>}

      <Headline f={f} lines={[[t.seven104, 'COMPOUND GROWTH', L.sageD, 110], [t.rule108, 'TIME DOES THE WORK', L.ink, 104], [t.eats, 'FEES', L.ink, 130], [t.most112, 'MOST ACTIVE FUNDS LOSE', L.terraD, 100],
        [t.exactly, "MAYA'S $730, EXACTLY", L.sageD, 104], [t.why116, 'THE MATCH', L.mustardD, 120], [t.step118, 'STEP TWO', L.sageD, 120], [t.every120, '$860 A MONTH', L.sageD, 120],
        [t.grow121, 'TWENTY YEARS AT 7%', L.sageD, 104], [t.advice, 'NOW MAYA’S MONEY GROWS', L.sageD, 100]]} />
      <Sweep f={f} at={(EXTRA['ll-grow2'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_GROW2 = makePiece('ll-grow2', "Grow, part two: compound growth at 7% — a $1,000 coin stack, year 1 +$70, year 2 7% of $1,070 = +$75, gains on last year's gains; the rule of 72 builds up to 72 ÷ 7% ≈ 10 years to double, stacks doubling at year 0, 10 and 20; fees — two piles from $10,000 leaking, index fund 0.09% ends $74,000, active fund 0.57% $65,000 after 30 years; ten trophies, eight grey — 79% of active large-US funds did worse in 2025; Maya's money trail — her $730 stack: $260 into a 401(K) jar (6% of pay; before tax her paycheck only drops about $230), her employer's hand adds 50¢ per $1 up to 6% → +$130 a month free, the other $470 into her OWN ACCOUNT jar, both S&P 500 funds, $730 + $130 = $860 a month; twenty years at 7% minus the 0.09% fee — 10 years $103,000 in → $148,000, 20 years $206,000 in → $443,000, more than half growth, in today's dollars; not advice; a money tree starts paying — growth → income", {
  mood: 'light', Component: Grow2, beats: [...Object.values(K), ...(EXTRA['ll-grow2'] ?? [])],
  sfx: [['s106:five', 'ding', 0.1], ['s108:divide', 'pop', 0.1], ['s111:sixty', 'swish', 0.1], ['s112:worse', 'thud', 0.1], ['s117:free', 'cash', 0.12], ['s120:eight', 'chime', 0.12], ['s123:four', 'chime', 0.14], ['s126:income', 'chime', 0.14]] })
