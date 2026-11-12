// ---------------------------------------------------------------- s76–s92: the other tax, two kinds of breaks, and the very top.
// A) A teal pump house with brick arches: payroll tax is one long glass channel, NO BUCKETS — two coin drips take a flat
//    share from the very first dollar: Social Security (blue) and Medicare (green), 7.65% together. On Maya's $10,000
//    raise that is $765 (a coin pile). Her raise as one bar: KEPT $7,685 · INCOME TAX $1,550 · PAYROLL $765. At $184,500
//    a gate stops the blue drip; the green one never stops.
// B) The waterworks tanks + chest. A deduction: a jug scoops $1,000 out of the 22% tank before the tax is added — $220
//    of coins come back out of the chest. A credit: $1,000 of coins lift straight out of the chest. A brass scale weighs
//    SAVES $220 against SAVES $1,000 and tips to the credit.
// C) All seven tanks at night: a million dollars pours through every lower tank first, then into 37%; a 37% OF ALL card is
//    crossed and the chest reads ≈ 32.6%. An old 1944 poster: TOP RATE 94% — ONLY ABOVE $200,000.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, win } from '../aimoney/common'
import { NightWorld, Terrace, Tank, Tap, Stream, Coin, Chest, Cross, Sign, Scale, Vig, STEP_X, STEP_Y, RATES, RATE_COL, TXT, INK, BRASS, BRASS2, CORAL, MINT, WARM, WATER, GLASS, PAPER, BRICK, Life } from './kit'
import { Steps3, Works, CoinTag, WX, WTOP, WSURF } from './works'

const SS = '#5FA8F5', MED = '#5BD69B'

// # the pump house: dark teal wall, three brick arches with lamps, a stone floor
const PumpHouse: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <defs><linearGradient id="tx-ph-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#123E4A" /><stop offset="100%" stopColor="#1D5C66" /></linearGradient></defs>
    <rect x={-40} y={-40} width={2000} height={1160} fill="url(#tx-ph-wall)" />
    {[0, 1, 2].map((k) => <g key={k} transform={`translate(${320 + k * 640} 0)`}>
      <path d="M-230 900 L-230 380 Q0 160 230 380 L230 900 Z" fill="#0E2F38" stroke={BRICK} strokeWidth={26} />
      <circle cx={0} cy={300} r={14} fill={WARM} opacity={0.8 + 0.2 * Math.sin(f / 9 + k)} /><circle cx={0} cy={300} r={60} fill={WARM} opacity={0.12} />
    </g>)}
    <rect x={-40} y={900} width={2000} height={240} fill="#3B4A52" /><rect x={-40} y={900} width={2000} height={14} fill="#55666F" />
  </g>
)

const Other: React.FC<PieceProps> = ({ f, c }) => {
  const tax76 = c('s76:tax'), differently = c('s76:differently')
  const payroll = c('s77:payroll'), social = c('s77:social'), medicare = c('s77:medicare'), p765 = c('s77:765'), noB = c('s77:no'), first = c('s77:first')
  const raise78 = c('s78:raise'), d765 = c('s78:765')
  const both = c('s79:both'), keeps = c('s79:keeps'), d7685 = c('s79:7685')
  const d184500 = c('s80:184500'), stops = c('s80:stops'), never = c('s80:never')
  const explain = c('s81:explain'), deductions = c('s81:deductions'), credits = c('s81:credits')
  const deduction = c('s82:deduction'), lowers = c('s82:lowers'), pour = c('s82:pour')
  const saves = c('s83:saves'), rate83 = c('s83:rate')
  const d1000 = c('s84:1000'), p22 = c('s84:22'), d220 = c('s84:220')
  const credit = c('s85:credit'), bill = c('s85:bill'), added = c('s85:added')
  const c1000 = c('s86:1000'), full = c('s86:full')
  const paper = c('s87:paper'), different = c('s87:different'), owe = c('s87:owe')
  const worth = c('s88:worth'), only88 = c('s88:only'), rate88 = c('s88:rate')
  const top89 = c('s89:top')
  const million = c('s90:million'), b37 = c('s90:37')
  const lower = c('s91:lower'), d10 = c('s91:10'), d326 = c('s91:326'), not37 = c('s91:not')
  const y1944 = c('s92:1944'), d94 = c('s92:94'), d200k = c('s92:200000')

  const A = 1 - on(f, explain - 6, 12), B = win(f, explain - 6, top89 - 4, 12), C = on(f, top89 - 4, 12)
  const CH = { x0: 200, x1: 1720, y: 560 }
  const gateX = lerp(CH.x0, CH.x1, 0.7)
  const scaleOn = on(f, paper - 6, 12)

  return (
    <g>
      {/* # A) payroll: one channel, no buckets */}
      {A > 0.001 && <g opacity={A}>
        <PumpHouse f={f} />
        <g opacity={on(f, payroll - 6, 10)}>
          {/* the channel */}
          <rect x={CH.x0} y={CH.y - 70} width={CH.x1 - CH.x0} height={140} rx={30} fill={GLASS} opacity={0.15} />
          <rect x={CH.x0 + 12} y={CH.y - 40} width={CH.x1 - CH.x0 - 24} height={98} rx={22} fill={WATER} opacity={0.85} />
          {Array.from({ length: 10 }, (_, k) => <circle key={k} cx={CH.x0 + ((k * 160 + f * 6) % (CH.x1 - CH.x0))} cy={CH.y + 4} r={10} fill="#FFFFFF" opacity={0.35} />)}
          <rect x={CH.x0} y={CH.y - 70} width={CH.x1 - CH.x0} height={140} rx={30} fill="none" stroke={GLASS} strokeWidth={6} />
          {[CH.x0 + 60, CH.x1 - 60].map((x) => <rect key={x} x={x - 20} y={CH.y + 70} width={40} height={340 - 70} fill={BRASS2} />)}
          {/* two drips all along: Social Security (blue) and Medicare (green) */}
          {Array.from({ length: 7 }, (_, k) => { const x = CH.x0 + 150 + k * 210, ss = x < gateX || on(f, stops, 10) < 0.5; return <g key={k} opacity={1 - win(f, d765 - 4, d184500, 8)}>
            {ss && <g opacity={on(f, social + k * 2, 6) * (x > gateX ? 1 - on(f, stops, 10) : 1)}><Coin x={x - 26} y={CH.y + 90 + 140 * (((f - social) / 26 + k * 0.17) % 1)} s={0.55} t="" /></g>}
            <g opacity={on(f, medicare + k * 2, 6)}><circle cx={x + 26} cy={CH.y + 90 + 140 * (((f - medicare) / 30 + k * 0.23) % 1)} r={13} fill={MED} stroke="#FFFFFF" strokeWidth={3} /></g>
          </g> })}
          <g opacity={on(f, social, 8)}><Sign x={600} y={330} t="SOCIAL SECURITY 6.2%" size={40} col={SS} tc="#FFFFFF" /></g>
          <g opacity={on(f, medicare, 8)}><Sign x={1300} y={330} t="MEDICARE 1.45%" size={40} col={MED} tc="#FFFFFF" /></g>
          <g opacity={win(f, p765, d184500, 8)}><Sign x={960} y={CH.y + 12 + 20} t="7.65% FROM THE FIRST DOLLAR · NO BUCKETS" size={36} col={PAPER} /></g>
          {/* gate at $184,500 */}
          <g opacity={on(f, d184500, 10)}>
            <rect x={gateX - 12} y={CH.y - 110} width={24} height={220} rx={8} fill={BRASS} stroke={BRASS2} strokeWidth={4} />
            <Sign x={gateX} y={CH.y - 120} t="$184,500" size={40} />
            <g opacity={on(f, never, 8)}><Sign x={CH.x1 - 140} y={CH.y + 260} t="MEDICARE: NO LIMIT" size={36} col={MED} tc="#FFFFFF" /></g>
          </g>
        </g>
        {/* $765 on the raise, then the split bar */}
        <g opacity={win(f, d765, both, 8)}><CoinTag x={960} y={880} t="$765" s={pop(f, d765, 12)} /></g>
        <g opacity={win(f, both, d184500 - 4, 10)} transform="translate(960 840)">
          <rect x={-620} y={-60} width={1240} height={120} rx={26} fill={GLASS} opacity={0.2} />
          <rect x={-600} y={-44} width={1200 * 0.7685 - 8} height={88} rx={18} fill={MINT} />
          <rect x={-600 + 1200 * 0.7685} y={-44} width={1200 * 0.155 - 8} height={88} rx={18} fill={CORAL} />
          <rect x={-600 + 1200 * 0.9235} y={-44} width={1200 * 0.0765} height={88} rx={18} fill={SS} />
          <g opacity={on(f, keeps, 8)}><text x={-140} y={22} textAnchor="middle" fill="#FFFFFF" style={TXT(f >= d7685 ? 64 : 50)}>{f >= d7685 ? 'KEPT $7,685' : 'KEPT'}</text></g>
          <text x={-600 + 1200 * 0.846} y={-70} textAnchor="middle" fill={CORAL} style={TXT(36)}>INCOME $1,550</text>
          <text x={-600 + 1200 * 0.962} y={100} textAnchor="middle" fill={SS} style={TXT(36)}>PAYROLL $765</text>
        </g>
      </g>}

      {/* # B) deduction vs credit */}
      {B > 0.001 && <g opacity={B}>
        <NightWorld f={f} id="tx-other-b" moon={false} />
        <Steps3 />
        <g opacity={1 - scaleOn}>
          <Works f={f} lv={[1, 1, lerp(0.5, 0.36, on(f, d1000, 24))]} lit={[0, 0, win(f, p22, credit, 6)]} />
          {/* the jug that scoops the deduction out before the tax is worked out */}
          <g opacity={win(f, deduction, credit, 10)} transform={`translate(${WX[2] + 40} ${lerp(WTOP(2) - 60, WTOP(2) - 140, on(f, d1000, 20))}) rotate(${-14 * on(f, d1000, 20)})`}>
            <path d="M-80 0 Q-100 -130 -50 -190 L50 -190 Q100 -130 80 0 Z" fill={GLASS} opacity={0.3} stroke={GLASS} strokeWidth={5} />
            <path d={`M-74 -10 Q-90 -100 -60 ${-10 - 120 * on(f, d1000, 24)} L60 ${-10 - 120 * on(f, d1000, 24)} Q90 -100 74 -10 Z`} fill={WATER} opacity={0.85} />
            <g opacity={on(f, d1000, 8)}><text y={-230} textAnchor="middle" fill="#FFFFFF" style={TXT(54)}>−$1,000</text></g>
          </g>
          <g opacity={win(f, lowers, d1000, 8)}><Sign x={WX[1]} y={330} t="DEDUCTION: LESS INCOME IN" size={44} col={PAPER} /></g>
          <g opacity={win(f, saves, d1000, 8)}><Sign x={WX[1]} y={330} t="SAVES THAT BUCKET'S RATE" size={44} col={PAPER} /></g>
          {/* chest */}
          <Chest x={1600} y={940} s={0.9} n={on(f, credit, 10) > 0.5 ? lerp(16, 6, on(f, c1000, 20)) : lerp(16, 14, on(f, d220, 20))} total={f >= credit ? 'TAX BILL' : undefined} />
          {/* $220 back out of the chest */}
          <g opacity={win(f, d220, credit, 8)} transform={`translate(0 ${-120 * on(f, d220, 20)})`}><CoinTag x={1600} y={700} t="SAVES $220" /></g>
          {/* the credit: coins lift straight out of the chest */}
          <g opacity={win(f, bill, paper, 8)}><Sign x={1400} y={330} t="CREDIT: OFF THE TAX BILL" size={44} col={PAPER} /></g>
          <g opacity={win(f, c1000, paper, 8)} transform={`translate(0 ${-140 * on(f, c1000, 20)})`}><CoinTag x={1600} y={700} t="SAVES $1,000" s={1.1} col={WARM} /></g>
        </g>
        {/* the scale */}
        <g opacity={scaleOn}>
          <Scale x={960} y={940} tilt={lerp(0, 0.9, on(f, different, 30)) + 0.12 * win(f, c('s88:size'), c('s88:only'), 8)}
            left={<g><CoinTag x={0} y={-10} t="$220" s={0.9 + 0.12 * win(f, c('s88:deduction'), c('s88:size'), 6)} /><g opacity={on(f, c('s88:save'), 8)}><text y={110} textAnchor="middle" fill={WARM} style={TXT(40)}>AT MOST 37¢ PER $1</text></g><text y={60} textAnchor="middle" fill="#FFFFFF" style={TXT(36)}>DEDUCTION</text></g>}
            right={<g><CoinTag x={0} y={-10} t="$1,000" s={1.1} col={WARM} /><text y={60} textAnchor="middle" fill="#FFFFFF" style={TXT(36)}>CREDIT</text></g>} />
          <g opacity={on(f, worth, 8)}><Sign x={960} y={300} t="A CREDIT USUALLY SAVES MORE" size={48} col={WARM} /></g>
          <g opacity={on(f, rate88, 8)}><Sign x={960} y={980} t="A DEDUCTION SAVES ONLY ITS BUCKET'S RATE" size={36} col={PAPER} /></g>
        </g>
      </g>}

      {/* # C) the very top, and 1944 */}
      {C > 0.001 && <g opacity={C}>
        <NightWorld f={f} id="tx-other-c" />
        <Terrace n={7} />
        <g opacity={1 - on(f, y1944 - 6, 10)}>
          {RATES.map((r, k) => <Tank key={k} x={STEP_X(k)} y={STEP_Y(k)} w={150} h={260} level={on(f, [million, d10, c('s91:12'), c('s91:22'), c('s91:up'), c('s91:up') + 8, c('s91:up') + 16][k], 24) * (k === 6 ? 0.55 : 1)} rate={r} col={RATE_COL[k]} f={f} lit={k === 6 ? win(f, b37, lower, 6) : win(f, [million, d10, c('s91:12'), c('s91:22'), c('s91:up'), c('s91:up') + 8][k], [million, d10, c('s91:12'), c('s91:22'), c('s91:up'), c('s91:up') + 8][k] + 16, 4)} />)}
          <Tap x={150} y={300} open={on(f, million, 20)} />
          <Stream x={STEP_X(0)} y0={340} y1={STEP_Y(0) - 120} f={f} o={on(f, million, 10) * (1 - on(f, y1944 - 6, 10))} />
          <g opacity={win(f, million, d10, 8)}><Sign x={900} y={330} t="$1,000,000 TAXABLE" size={50} col={WARM} /></g>
          <g opacity={win(f, c('s91:works'), y1944 - 6, 8)}><Sign x={760} y={330} t="37% OF ALL?" size={50} col={PAPER} /><g opacity={on(f, not37, 8)}><Cross x={760} y={300} s={0.75} /></g></g>
          <g opacity={win(f, d326, y1944 - 6, 8)} transform={`translate(1300 330) scale(${pop(f, d326, 12)})`}><rect x={-170} y={-60} width={340} height={110} rx={18} fill={MINT} stroke="#FFFFFF" strokeWidth={5} /><text y={24} textAnchor="middle" fill="#FFFFFF" style={TXT(78)}>≈ 32.6%</text></g>
        </g>
        {/* the old 1944 poster on a post */}
        <g opacity={on(f, y1944, 10)} transform={`translate(960 ${lerp(620, 560, on(f, y1944, 16))})`}>
          <rect x={-10} y={0} width={20} height={400} fill="#6B4B35" />
          <rect x={-300} y={-260} width={600} height={300} rx={8} fill="#EBD9B4" stroke="#A68B5B" strokeWidth={6} />
          <text y={-170} textAnchor="middle" fill="#6B4B35" style={TXT(90)}>1944</text>
          <g opacity={on(f, d94, 8)}><text y={-80} textAnchor="middle" fill={CORAL} style={TXT(76)}>TOP RATE 94%</text></g>
          <g opacity={on(f, d200k, 8)}><text y={0} textAnchor="middle" fill="#6B4B35" style={TXT(52)}>ONLY ABOVE $200,000</text></g>
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s77:buckets")} x={700} y={560} kind="ripple" />
        <Life f={f} at={c("s78:10000")} x={700} y={560} kind="ripple" />
        <Life f={f} at={c("s80:above")} x={700} y={560} kind="ripple" />
        <Life f={f} at={c("s80:2026")} x={700} y={560} kind="ripple" />
        <Life f={f} at={c("s81:mix")} x={1240} y={760} kind="ripple" />
        <Life f={f} at={c("s83:dollars")} x={1240} y={760} kind="ripple" />
        <Life f={f} at={c("s84:off")} x={1240} y={760} kind="ripple" />
        <Life f={f} at={c("s85:comes")} x={1600} y={820} kind="glint" />
        <Life f={f} at={c("s86:dollars")} x={1600} y={820} kind="glint" />
        <Life f={f} at={c("s88:why")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s89:the")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s90:income")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s91:dollars")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s91:but")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s92:to")} x={960} y={360} kind="glint" />
      </g>
      <g><Life f={f} at={c("s76:paycheck")} x={1300} y={560} kind="ripple" /><Life f={f} at={c("s76:works")} x={700} y={560} kind="ripple" /></g>
      {/* # life:end */}
      <Vig id="tx-other" />
      <Headline f={f} lines={[[tax76, 'ONE MORE TAX: PAYROLL', '#FFFFFF', 88], [explain, 'DEDUCTIONS VS. CREDITS', '#FFFFFF', 88], [top89, 'THE VERY TOP', '#FFFFFF', 92]]} />
    </g>
  )
}

export const TX_OTHER = makePiece('tx-other', "The other tax and two kinds of breaks: in a teal pump house with brick arches payroll tax is one long glass channel with no buckets — blue Social Security 6.2% and green Medicare 1.45% drips take a flat 7.65% from the first dollar; $765 on Maya's raise; her raise as one bar KEPT $7,685 · INCOME $1,550 · PAYROLL $765; a brass gate at $184,500 stops the blue drip, MEDICARE: NO LIMIT; at the waterworks a deduction is a jug scooping −$1,000 out of the 22% tank before the tax is added (SAVES $220 back out of the chest) while a credit lifts $1,000 of coins straight out of the TAX BILL chest; a brass scale tips $220 vs $1,000 — A CREDIT USUALLY SAVES MORE; then seven tanks at night: $1,000,000 TAXABLE pours through every lower tank first and then 37%; 37% OF ALL? is crossed, ≈ 32.6%; an old 1944 poster TOP RATE 94% — ONLY ABOVE $200,000.", {
  mood: 'dark', Component: Other,
  beats: ["s76:differently", "s77:payroll", "s77:social", "s77:medicare", "s77:765", "s77:first", "s78:765", "s79:both", "s79:keeps", "s79:7685", "s80:184500", "s80:stops", "s80:never", "s81:explain", "s81:deductions", "s81:credits", "s82:deduction", "s82:lowers", "s82:pour", "s83:saves", "s84:1000", "s84:22", "s84:220", "s85:credit", "s85:bill", "s85:added", "s86:1000", "s86:full", "s87:paper", "s87:different", "s87:owe", "s88:worth", "s88:rate", "s89:top", "s90:million", "s90:37", "s91:lower", "s91:10", "s91:326", "s91:not", "s92:1944", "s92:94", "s92:200000", "s88:size", "s88:only", "s88:deduction", "s88:save", "s91:12", "s91:22", "s91:up", "s91:works", "s77:buckets", "s78:10000", "s80:above", "s80:2026", "s81:mix", "s83:dollars", "s84:off", "s85:comes", "s86:dollars", "s88:why", "s89:the", "s90:income", "s91:dollars", "s91:but", "s92:to", "s76:paycheck", "s76:works"],
  sfx: [['s78:765', 'pop', 0.1], ['s80:stops', 'thud', 0.1], ['s84:220', 'pop', 0.1], ['s86:1000', 'pop', 0.12], ['s91:326', 'pop', 0.1], ['s92:1944', 'swish', 0.1]] })
