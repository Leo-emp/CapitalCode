// ---------------------------------------------------------------- s76–s88: where the fees are.
// A) A shelf of funds with price tags. The ICI's report: stock mutual funds ≈ 0.4% a year (2024); stock index ETFs ≈ 0.14%.
//    Fees falling: a line drops 62% from 1996 to 2024; a saver cheers. An average hides a wide range: tags spread out.
//    Stock-picking funds charge more: a manager at a wall of charts and a stack of research.
// B) In our example: 0.05% vs the 0.4% average — a ≈ $107,000 gap. One year's sliver vs a lifetime's.
// C) Advisers are a separate layer: a second scoop on top. A crowd of 800 advisers (Kitces 2020): the typical fee 1% up to
//    $1 million. Adviser 1% + fund 0.4% = 1.4% a year: ≈ $361,000 compared with the cheap fund.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Doc, Headline, Label, Person, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { FundHouse, SaverJar, Scoop, Spot } from './kit'

const GROUND = 920
const PriceTagT: React.FC<{ x: number; y: number; text: string; color?: string; o?: number; s?: number }> = ({ x, y, text, color = P.ink, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(-6)`} opacity={o}>
    <path d="M-90 -40 L60 -40 L100 0 L60 40 L-90 40 Z" fill={P.paper} stroke={P.edge} strokeWidth={4} />
    <circle cx={64} cy={0} r={8} fill="#C8B994" />
    <text x={-15} y={18} textAnchor="middle" fill={color} style={{ font: '400 52px "Bebas Neue"' }}>{text}</text>
  </g>
)

const Where: React.FC<PieceProps> = ({ f, c }) => {
  const fees76 = c('s76:fees'), real = c('s76:real')
  const institute = c('s77:institute'), average77 = c('s77:average'), funds77 = c('s77:funds'), d04 = c('s77:04')
  const index78 = c('s78:index'), etfs = c('s78:etfs'), d014 = c('s78:014')
  const down = c('s79:down'), fell = c('s79:fell'), d62 = c('s79:62'), from79 = c('s79:from')
  const good = c('s80:good'), savers = c('s80:savers'), hides = c('s80:hides'), range = c('s80:range')
  const managers = c('s81:managers'), pick = c('s81:pick'), charge81 = c('s81:charge'), research = c('s81:research')
  const example82 = c('s82:example'), d04b = c('s82:04'), d005 = c('s82:005'), d107 = c('s82:107000')
  const notice = c('s83:notice'), single = c('s83:single'), lifetime = c('s83:lifetime')
  const advisers84 = c('s84:advisers'), layer = c('s84:layer')
  const survey = c('s85:survey'), d800 = c('s85:800'), kitces = c('s85:kitces'), typical = c('s85:typical'), d1 = c('s85:1'), d1m = c('s85:1#2')
  const added86 = c('s86:added'), top86 = c('s86:top'), charge86 = c('s86:charge')
  const put87 = c('s87:put'), d1b = c('s87:1'), d04c = c('s87:04'), d14 = c('s87:14')
  const d361 = c('s88:361000'), cheap88 = c('s88:cheap')
  const AB = example82 - 4, BC = advisers84 - 4
  const A = win(f, fees76, AB), B = win(f, AB, BC), C = on(f, BC, 8)
  return (
    <g>
      <Stage id="fe-where" frame={f} />
      <Spot f={f} at={c("s76:big")} x={780} y={700} rx={520} ry={260} />
      <Spot f={f} at={c("s77:according")} x={1600} y={560} rx={200} ry={240} />
      <Spot f={f} at={c("s79:average")} x={620} y={560} rx={340} ry={220} />
      <Spot f={f} at={c("s80:news")} x={1440} y={700} rx={200} ry={300} />
      <Spot f={f} at={c("s81:index")} x={1100} y={600} rx={260} ry={260} />
      <Spot f={f} at={c("s81:pay")} x={1400} y={800} rx={200} ry={220} />
      <Spot f={f} at={c("s83:fee")} x={1100} y={660} rx={220} ry={320} />
      <Spot f={f} at={c("s86:adviser's")} x={1040} y={400} rx={220} ry={200} />
      <Spot f={f} at={c("s88:example")} x={620} y={600} rx={220} ry={320} />
      <Spot f={f} at={c("s88:compared")} x={620} y={600} rx={220} ry={320} />
      <Headline f={f} lines={[[institute, 'INVESTMENT COMPANY INSTITUTE', P.ink, 92], [d04, 'STOCK MUTUAL FUNDS ≈ 0.4%', P.ink, 96], [d014, 'STOCK INDEX ETFs ≈ 0.14%', P.ink, 96], [down, 'FEES HAVE COME DOWN', P.mintInk, 100], [d62, '−62% SINCE 1996', P.mintInk, 110], [good, '', P.ink], [example82, '', P.ink], [d107, '≈ $107,000', P.coralInk, 120], [notice, '', P.ink], [layer, 'A SEPARATE LAYER', P.ink, 104], [d800, '800+ ADVISERS SURVEYED', P.ink, 96], [typical, 'TYPICAL FEE: 1% A YEAR', P.coralInk, 100], [added86, '', P.ink], [d14, '1% + 0.4% = 1.4% A YEAR', P.coralInk, 100], [d361, '≈ $361,000', P.coralInk, 120]]} />

      {/* # A) real fee levels */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {/* # the shelf of funds, tags appear on their numbers */}
        <g opacity={on(f, real, 10) * (1 - on(f, down, 10))}>
          <FundHouse x={480} y={GROUND} s={0.75} sign="STOCK FUND" />
          <FundHouse x={1100} y={GROUND} s={0.75} sign="INDEX ETF" color={P.mint} />
          <g opacity={on(f, d04, 8)}><PriceTagT x={480} y={GROUND - 400} text="0.4%" s={1.2} /></g>
          <g opacity={on(f, d014, 8)}><PriceTagT x={1100} y={GROUND - 400} text="0.14%" s={1.2} color={P.mintInk} /></g>
          <g opacity={on(f, institute, 10)}><Doc x={1600} y={560} s={1.2} title="ICI 2024" lines={5} /></g>
        </g>
        {/* # fees falling: 1996 → 2024 */}
        <g opacity={on(f, down, 10) * (1 - on(f, hides, 10))} transform="translate(620 560)">
          <rect x={-320} y={-260} width={640} height={400} rx={18} fill={P.card} stroke={P.edge} strokeWidth={3} />
          <path d={`M-260 -180 C -100 -150, 40 0, ${lerp(-260, 260, span(f, down, d62 + 20))} ${lerp(-180, 60, span(f, down, d62 + 20))}`} fill="none" stroke={P.mint} strokeWidth={12} strokeLinecap="round" />
          <g opacity={on(f, c('s79:1996'), 8)}><Label x={-260} y={120} text="1996" size={48} font="Bebas Neue" color={P.ink2} /></g><g opacity={on(f, c('s79:2024'), 8)}><Label x={260} y={120} text="2024" size={48} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, good, 8) * (1 - on(f, hides, 10))}><Person f={f} who="buyer" beats={[[0, 'celebrate', 'smiling']]} x={1440} y={GROUND} s={0.75} /></g>
        {/* # an average hides a wide range: tags spread from cheap to dear */}
        <g opacity={on(f, hides, 10) * (1 - on(f, managers, 10))}>
          <line x1={300} y1={600} x2={1620} y2={600} stroke={P.ink2} strokeWidth={6} />
          {Array.from({ length: 9 }, (_, k) => <circle key={k} cx={lerp(960, 340 + k * 160, on(f, range, 16))} cy={600} r={22} fill={k < 3 ? P.mint : k < 6 ? P.gold : P.coral} />)}
        </g>
        {/* # stock pickers charge more: a manager at the charts, a stack of research */}
        <g opacity={on(f, managers, 10)}>
          <rect x={300} y={300} width={560} height={360} rx={16} fill={P.navy1} />
          {[0, 1, 2].map((k) => <path key={k} d={`M${330 + k * 180} 600 l40 -60 l40 30 l60 -90`} fill="none" stroke={[P.mint, P.coral, P.gold][k]} strokeWidth={8} strokeLinejoin="round" />)}
          <Person f={f} who="owner" beats={[[0, 'point', 'thinking'], [pick, 'point', 'smiling'], [charge81, 'present', 'smug']]} x={1000} y={GROUND} s={0.75} />
          <g opacity={on(f, research, 8)}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={1300 + (k % 2) * 6} y={GROUND - 24 - k * 22} width={200} height={20} rx={4} fill={k % 2 ? '#FFFFFF' : '#F2EADB'} stroke="#CDB58C" strokeWidth={2} />)}</g>
          <g opacity={on(f, charge81, 8)}><PriceTagT x={1620} y={GROUND - 420} text="MORE" s={1.1} color={P.coralInk} /></g>
        </g>
      </g>}

      {/* # B) in our example: 0.05% vs the 0.4% average; one year vs a lifetime */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <SaverJar x={560} y={GROUND} w={300} h={600} fill={0.92} label="0.05%" o={on(f, example82, 8)} />
        <SaverJar x={1100} y={GROUND} w={300} h={lerp(600, 600 * 0.913, on(f, d107 - 10, 16))} fill={0.92} label="0.4%" o={on(f, example82 + 6, 8)} />
        <g opacity={on(f, d107, 8) * (1 - on(f, notice, 10))}><line x1={720} y1={GROUND - 600} x2={1300} y2={GROUND - 600} stroke={P.coral} strokeWidth={5} strokeDasharray="12 8" /><line x1={1300} y1={GROUND - 600} x2={1300} y2={GROUND - 548} stroke={P.coral} strokeWidth={10} /></g>
        <g opacity={on(f, single, 8)}><Calendar x={1560} y={360} text="1 YEAR" s={1.1} /></g>
        <g opacity={on(f, lifetime, 8)}><Label x={1560} y={GROUND + 72} text="A LIFETIME" size={60} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # C) advisers: a second scoop on top; the survey; 1% + 0.4% = 1.4%; ≈ $361,000 */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, survey, 10)}>
          <SaverJar x={700} y={GROUND} w={320} h={480} fill={0.85} label="YOUR SAVINGS" />
          <Scoop x={1000} y={GROUND - 420} s={0.9} r={-20} full={1} />
          <g opacity={on(f, layer, 8)}><Scoop x={1040} y={GROUND - 560} s={0.9} r={-30} full={1} /><Person f={f} who="investorF" beats={[[0, 'present', 'smiling']]} x={1440} y={GROUND} s={0.75} /></g>
        </g>
        {/* # the survey: a crowd of advisers; the typical fee 1% up to $1 million */}
        <g opacity={on(f, survey, 10) * (1 - on(f, added86, 10))}>
          {Array.from({ length: 16 }, (_, k) => <g key={k} opacity={on(f, d800 + k, 5)}><Mini look={['investorF', 'owner', 'investor', 'hero'][k % 4]} x={300 + (k % 8) * 150} y={GROUND - (k < 8 ? 0 : 200)} scale={1.0} frame={f} seed={k + 200} mood="happy" /></g>)}
          <g opacity={on(f, kitces, 8)}><Doc x={1600} y={520} s={1.2} title="KITCES 2020" lines={5} /></g>
          <g opacity={on(f, d1m, 8)}><Label x={1600} y={760} text="UP TO $1 MILLION" size={52} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # on top of the fund's fee: 1% + 0.4% = 1.4%, then ≈ $361,000 */}
        <g opacity={on(f, added86, 10)}>
          <g opacity={1 - on(f, d361, 10)}>
            {/* # the savings jar with the fund's scoop already in it */}
            <SaverJar x={620} y={GROUND} w={320} h={500} fill={0.85} label="YOUR SAVINGS" cut={1} />
            <Scoop x={900} y={GROUND - 430} s={0.9} r={-20} full={1} />
            <g opacity={on(f, charge86, 8)}><Label x={1000} y={GROUND - 330} text="THE FUND" size={48} font="Bebas Neue" color={P.ink2} /></g>
            {/* # the adviser walks in and dips a second scoop on top */}
            <g transform={`translate(${lerp(560, 0, on(f, added86, 22))} 0)`}><Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [top86, 'reachUp', 'smiling', 'present', 16]]} x={1330} y={GROUND} s={0.8} /></g>
            <g opacity={on(f, top86, 8)} transform={`translate(0 ${lerp(-60, 0, on(f, top86, 12))})`}><Scoop x={940} y={GROUND - 600} s={0.9} r={-30} full={1} />
              <Label x={940} y={GROUND - 780} o={1 - on(f, d1b - 6, 6)} text="THE ADVISER" size={48} font="Bebas Neue" color={P.coralInk} /></g>
            {/* # the two tags sit on their scoops, then merge into 1.4% on the jar */}
            {(() => { const m = on(f, d14, 14); return <g>
              <PriceTagT x={lerp(1230, 620, m)} y={lerp(GROUND - 650, GROUND - 640, m)} text="1%" s={1.3} color={P.coralInk} o={on(f, d1b, 8) * (1 - on(f, d14 + 10, 6))} />
              <PriceTagT x={lerp(1130, 620, m)} y={lerp(GROUND - 450, GROUND - 640, m)} text="0.4%" s={1.3} o={on(f, d04c, 8) * (1 - on(f, d14 + 10, 6))} />
              <g opacity={on(f, d14 + 8, 8)} transform={`translate(620 ${GROUND - 640}) scale(${pop(f, d14 + 8)})`}><PriceTagT x={0} y={0} text="1.4%" s={1.8} color={P.coralInk} /></g>
            </g> })()}
          </g>
          <g opacity={on(f, d361, 10)}>
            <SaverJar x={620} y={GROUND} w={300} h={600} fill={0.92} label="CHEAP FUND" />
            <SaverJar x={1160} y={GROUND} w={300} h={600 * 0.706} fill={0.92} label="1.4%" />
            <line x1={780} y1={GROUND - 600} x2={1360} y2={GROUND - 600} stroke={P.coral} strokeWidth={5} strokeDasharray="12 8" /><line x1={1360} y1={GROUND - 600} x2={1360} y2={GROUND - 600 * 0.706} stroke={P.coral} strokeWidth={10} />
          </g>
        </g>
      </g>}
      <Vignette id="fe-where" />
    </g>
  )
}

const BEATS = ['s76:fees', 's76:real', 's77:institute', 's77:average', 's77:funds', 's77:04', 's78:index', 's78:etfs', 's78:014', 's79:down', 's79:fell', 's79:62', 's79:from', 's80:good', 's80:savers', 's80:hides', 's80:range', 's81:managers', 's81:pick', 's81:charge', 's81:research', 's82:example', 's82:04', 's82:005', 's82:107000', 's83:notice', 's83:single', 's83:lifetime', 's84:advisers', 's84:layer', 's85:survey', 's85:800', 's85:kitces', 's85:typical', 's85:1', 's85:1#2', 's86:added', 's86:top', 's86:charge', 's87:put', 's87:1', 's87:04', 's87:14', 's88:361000', 's88:cheap', "s76:big", "s77:according", "s79:average", "s80:news", "s81:index", "s81:pay", "s83:fee", "s86:adviser's", "s88:example", "s88:compared", "s79:1996", "s79:2024"]
export const FE_WHERE = makePiece('fe-where', 'Fee long: real fee levels — ICI 2024 stock mutual funds ~0.4%, index ETFs ~0.14%, fees down 62% since 1996, a wide range, stock pickers charge more; 0.4% vs 0.05% costs ~$107,000; advisers a separate layer, typical 1% (Kitces, 800+), 1% + 0.4% = 1.4%, ~$361,000', {
  mood: 'light', Component: Where, beats: BEATS,
  sfx: [['s77:04', 'pop', 0.25], ['s78:014', 'pop', 0.25], ['s79:62', 'swish', 0.25], ['s80:good', 'ding', 0.25], ['s82:107000', 'thud', 0.3], ['s84:layer', 'swish', 0.25], ['s85:1', 'pop', 0.25], ['s87:14', 'thud', 0.3], ['s88:361000', 'thud', 0.35]] })
