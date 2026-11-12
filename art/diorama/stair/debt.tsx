// ---------------------------------------------------------------- s22–s30: step two, kill the expensive debt (dusk, the garden shed).
// A) By the shed: Maya's red card tips over and becomes a steel bucket tagged 22%; a hose fills it with her $2,000;
//    a hole near the bottom leaks a stream into a puddle: $450 a year in interest, gone (she shrugs: nothing for it).
// B) Stocks: a long road of 98 year-tiles 1928 → 2025 lays out; the green line grows ≈ 10% a year; then the 26 red tiles
//    (the real falling years) flash; a question mark hangs over the 10% (not guaranteed).
// C) Paying off: Maya drops a dollar coin into the hole — the drip stops, "22¢ a year"; a shield NO MARKET RISK; then the
//    full metaphor: a watering can (INVESTING) pours in at the top while the 22% hole drains the bottom.
// D) She pours 2,000 from her 3,000 tank into the bucket: the hole is plugged with a cork, the card snaps in half,
//    $1,000 left, the cushion still full. A small car with a LOAN · FEW % tag on a slow drip: a balance sits nearly level.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { Bucket, C, Car, Coin, Drop, Ground, Sky, Tank, TXT } from './kit'
import { UP } from './data'

const GROUND = 940

const Shed: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={240} ry={18} fill="#000" opacity={0.14} />
    <rect x={-200} y={-300} width={400} height={300} fill="#8C6A52" />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-200 + k * 50} y={-300} width={6} height={300} fill="#6E513E" />)}
    <path d="M-230 -290 L0 -400 L230 -290 Z" fill="#5E4434" />
    <rect x={-60} y={-200} width={120} height={200} fill="#5E4434" /><rect x={-50} y={-190} width={100} height={190} fill="#7A5A45" />
    {/* hanging tools */}
    <g transform="translate(130 -230)"><rect x={-4} y={0} width={8} height={120} fill={C.woodD} /><path d="M-24 120 L24 120 L16 160 L-16 160 Z" fill="#9AA6B2" /></g>
    <g transform="translate(-140 -230)"><rect x={-4} y={0} width={8} height={110} fill={C.woodD} />{[-18, -6, 6, 18].map((t) => <rect key={t} x={t - 2} y={110} width={4} height={34} fill="#9AA6B2" />)}<rect x={-22} y={106} width={44} height={8} fill="#9AA6B2" /></g>
  </g>
)
const CardHalf: React.FC<{ x: number; y: number; r: number; o?: number; side: -1 | 1 }> = ({ x, y, r, o = 1, side }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`} opacity={o}>
    <path d={side < 0 ? 'M-150 -95 L10 -95 L-10 -20 L15 30 L-5 95 L-150 95 Z' : 'M10 -95 L150 -95 L150 95 L-5 95 L15 30 L-10 -20 Z'} fill={C.red} />
    <rect x={side < 0 ? -150 : -5} y={-55} width={side < 0 ? 160 : 155} height={34} fill={C.redD} />
  </g>
)

const Debt: React.FC<PieceProps> = ({ f, c }) => {
  const k2a = c('s22:2000'), balance22 = c('s22:balance')
  const charges23 = c('s23:charges'), costs23 = c('s23:costs'), p22a = c('s23:22')
  const keeps24 = c('s24:keeps'), pays24 = c('s24:pays'), d450 = c('s24:450'), nothing24 = c('s24:nothing')
  const compare25 = c('s25:compare'), since25 = c('s25:since'), grew25 = c('s25:grew'), p10 = c('s25:10'), dividends25 = c('s25:dividends')
  const only26 = c('s26:only'), fell26 = c('s26:fell'), n26 = c('s26:26'), n98 = c('s26:98'), guarantees26 = c('s26:guarantees')
  const paying27 = c('s27:paying'), dollar27 = c('s27:dollar'), stops27 = c('s27:stops'), p22b = c('s27:22'), earning27 = c('s27:earning'), risk27 = c('s27:risk'), interest27 = c('s27:interest')
  const reliably28 = c('s28:reliably'), investing28 = c('s28:investing'), carrying28 = c('s28:carrying'), bucket28 = c('s28:bucket'), hole28 = c('s28:hole'), bottom28 = c('s28:bottom')
  const uses29 = c('s29:uses'), k2b = c('s29:2000'), full29 = c('s29:full'), k1 = c('s29:1000'), left29 = c('s29:left'), cushion29 = c('s29:cushion')
  const cheaper30 = c('s30:cheaper'), car30 = c('s30:car'), loan30 = c('s30:loan'), few30 = c('s30:few'), closer30 = c('s30:closer'), call30 = c('s30:call'), invest30 = c('s30:invest'), down30 = c('s30:down')

  const different27 = c('s27:different'), debt29 = c('s29:debt'), balance24 = c('s24:balance'), market25 = c('s25:market'), risk28 = c('s28:risk'), card29 = c('s29:card')
  const AB = compare25 - 6, BC = paying27 - 6, CD = uses29 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = on(f, CD - 8, 10)

  // # A) the card becomes the bucket
  const morph = on(f, balance22 + 4, 16)
  const aBeats: Beat[] = ([...[[0, 'idle', 'neutral'], [balance22, 'point', 'neutral'], [costs23, 'shock', 'shocked'], [keeps24, 'think', 'worried'], [pays24, 'despair', 'worried'], [nothing24, 'shrug', 'neutral']], [balance24, 'point', 'worried']] as Beat[]).sort((p, q) => p[0] - q[0])
  const puddle = span(f, pays24, d450 + 20)
  // # B) 98 year tiles
  const tiles = span(f, since25, grew25 + 10)
  // # C) the coin plug + the full metaphor
  const cBeats: Beat[] = ([...[[BC, 'hold', 'thinking'], [dollar27, 'reachDown', 'neutral'], [stops27, 'relief', 'smiling'], [risk27, 'confident', 'smiling'], [reliably28, 'explain', 'neutral'], [hole28, 'facepalm', 'worried']], [different27, 'pointUp', 'smiling'], [risk28, 'crossNoA', 'neutral', 'crossNoB', 12]] as Beat[]).sort((p, q) => p[0] - q[0])
  const coinT = span(f, dollar27, dollar27 + 16)
  const meta = on(f, investing28, 12)
  // # D) payoff + the car-loan side note
  const dBeats: Beat[] = ([...[[CD, 'push', 'smiling'], [full29, 'celebrate', 'smiling'], [cushion29, 'thumbsUp', 'smiling'], [cheaper30, 'think', 'thinking'], [closer30, 'weighA', 'thinking', 'weighB', 18], [down30, 'idle', 'smiling']], [card29, 'holdUp', 'smiling'], [debt29, 'thumbsUp', 'smiling']] as Beat[]).sort((p, q) => p[0] - q[0])
  const pour = span(f, uses29 + 4, k2b + 24)
  const snap = on(f, full29, 14)
  const side = on(f, cheaper30, 12)

  return (
    <g>
      <Sky id="sv-d-base" f={f} mood="dusk" />
      {/* # A) the bucket by the shed */}
      {A > 0 && <g opacity={A}>
        <Sky id="sv-d-a" f={f} mood="dusk" /><Ground y={GROUND - 20} seed={13} />
        <Shed x={300} y={GROUND - 10} />
        <Person f={f} who="investorF" beats={aBeats} x={650} y={GROUND} s={0.88} />
        {/* the card, then the bucket */}
        <g opacity={1 - morph} transform={`translate(1200 ${600 + 200 * morph}) rotate(${-8 + 70 * morph})`}>
          <rect x={-150} y={-95} width={300} height={190} rx={20} fill={C.red} /><rect x={-150} y={-55} width={300} height={34} fill={C.redD} /><rect x={-120} y={0} width={56} height={40} rx={8} fill={C.gold} />
          <text x={40} y={64} textAnchor="middle" fill="#FFFFFF" style={TXT(58)}>{f >= k2a ? '-$2,000' : ''}</text></g>
        <g opacity={morph}>
          <Bucket x={1200} y={GROUND - 10} s={1.05} f={f} fill={0.15 + 0.6 * on(f, keeps24, 24)} leak={on(f, pays24, 12)} tag={f >= p22a ? '22%' : f >= costs23 ? '…' : ''} />
          <g opacity={on(f, charges23, 10)}><text x={1200} y={GROUND + 70} textAnchor="middle" fill={C.ink} style={TXT(48)}>THE CARD BALANCE: $2,000</text></g>
          {/* the hose */}
          <g opacity={win(f, keeps24, pays24 + 20, 10)}><path d={`M 1700 ${GROUND} Q 1660 520 1420 480 Q 1300 470 1270 560`} fill="none" stroke={C.green} strokeWidth={22} strokeLinecap="round" /><rect x={1250} y={546} width={40} height={30} rx={8} fill={C.greenD} />
            {[0, 1, 2].map((k) => <Drop key={k} x={1270} y={590 + ((f * 6 + k * 30) % 80)} s={0.6} />)}</g>
          {/* the puddle of interest */}
          <ellipse cx={1500} cy={GROUND + 10} rx={40 + 170 * puddle} ry={10 + 26 * puddle} fill={C.water} opacity={0.75} />
          <g opacity={on(f, d450, 10)} transform={`translate(1560 ${GROUND - 120 - 10 * pop(f, d450, 12)})`}><rect x={-170} y={-44} width={340} height={80} rx={16} fill={C.red} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>$450 A YEAR</text></g>
        </g>
      </g>}

      {/* # B) the stock road: 98 years, 26 red */}
      {B > 0 && <g opacity={B}>
        <Sky id="sv-d-b" f={f} mood="dawn" /><Ground y={GROUND - 20} seed={15} />
        <g transform="translate(200 360)">
          {UP.map((u, k) => { const col = k % 14, row = Math.floor(k / 14), show = tiles * 98 > k
            const red = !u && f >= fell26, flash = red ? 0.75 + 0.25 * Math.sin(f / 5 + k) : 1
            return show ? <rect key={k} x={col * 108} y={row * 62} width={96} height={50} rx={10} fill={red ? C.red : C.green} opacity={(red ? flash : 0.85) * (f >= fell26 && u ? 0.55 : 1)} /> : null })}
          <g opacity={on(f, market25, 8)} transform="translate(1100 -60)"><rect x={-150} y={-34} width={300} height={60} rx={14} fill={C.ink} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={TXT(44)}>US STOCK MARKET</text></g>
          <g opacity={on(f, since25, 8)}><text x={-20} y={-24} fill={C.ink} style={TXT(48)}>1928</text></g>
          <g opacity={on(f, grew25, 8)}><text x={1500} y={460} textAnchor="end" fill={C.ink} style={TXT(48)}>2025</text></g>
        </g>
        <g opacity={on(f, p10, 10) * (1 - on(f, fell26, 10))} transform={`translate(960 ${860 - 10 * pop(f, p10, 12)})`}><rect x={-300} y={-46} width={600} height={84} rx={18} fill={C.greenD} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={TXT(60)}>≈ 10% A YEAR, ON AVERAGE</text></g>
        <g opacity={on(f, n26, 10)} transform="translate(960 860)"><rect x={-330} y={-46} width={660} height={84} rx={18} fill={C.red} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={TXT(60)}>{f >= n98 ? '26 OF 98 YEARS FELL' : '26 YEARS FELL'}</text></g>
        <g opacity={on(f, guarantees26, 10)} transform={`translate(1720 ${300 + 6 * Math.sin(f / 8)})`}><circle r={70} fill={C.paper} /><text y={34} textAnchor="middle" fill={C.terraD} style={TXT(110)}>?</text></g>
        <g opacity={on(f, dividends25, 8) * (1 - on(f, only26, 8))}><text x={960} y={330} textAnchor="middle" fill={C.ink2} style={TXT(42)}>WITH DIVIDENDS PUT BACK IN</text></g>
      </g>}

      {/* # C) the coin plug; the bucket with a hole */}
      {Cc > 0 && <g opacity={Cc}>
        <Sky id="sv-d-c" f={f} mood="dusk" /><Ground y={GROUND - 20} seed={17} />
        <Person f={f} who="investorF" beats={cBeats} x={520} y={GROUND} s={0.88} />
        <Bucket x={1180} y={GROUND - 10} s={1.05} f={f} fill={0.6} leak={(1 - 0.5 * on(f, stops27, 12) - 0.3 * on(f, interest27, 12)) * (1 - meta) + meta} plug={0} />
        {coinT > 0 && coinT < 1 && <Coin x={lerp(700, 1263, coinT)} y={lerp(600, GROUND - 52, coinT) - 160 * Math.sin(coinT * Math.PI)} s={0.5} />}
        <g opacity={on(f, stops27, 10) * (1 - meta)} transform="translate(1560 560)"><rect x={-190} y={-50} width={380} height={90} rx={18} fill={C.paper} /><text y={14} textAnchor="middle" fill={C.ink} style={TXT(58)}>{f >= earning27 ? 'LIKE EARNING 22%' : f >= p22b ? 'SAVES 22¢ A YEAR' : '$1 PAID OFF'}</text></g>
        <g opacity={on(f, risk27, 10) * (1 - meta)} transform={`translate(1560 ${330 - 10 * pop(f, risk27, 12)})`}>
          <path d="M0 -80 L70 -54 L70 10 Q70 66 0 94 Q-70 66 -70 10 L-70 -54 Z" fill={C.greenD} /><path d="M-30 6 L-6 30 L34 -20" fill="none" stroke="#FFFFFF" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          <text y={150} textAnchor="middle" fill={C.ink} style={TXT(46)}>NO MARKET RISK</text></g>
        {/* the full metaphor: invest in at the top, the 22% hole drains the bottom */}
        <g opacity={meta}>
          <g transform={`translate(1060 ${330 + 6 * Math.sin(f / 10)}) rotate(28)`}>
            <path d="M-110 -60 L70 -60 L84 70 L-96 70 Z" fill={C.terra} /><path d="M70 -24 L200 -84 L210 -66 L84 14 Z" fill={C.terraD} /><path d="M-110 -50 Q-180 0 -110 60" fill="none" stroke={C.terraD} strokeWidth={14} />
            <text x={-14} y={22} textAnchor="middle" fill="#FFFFFF" style={TXT(44)}>INVESTING</text></g>
          {f >= carrying28 && [0, 1, 2].map((k) => <Drop key={k} x={1160 + k * 10} y={560 + ((f * 5 + k * 30) % 100)} s={0.7} />)}
          <g opacity={on(f, hole28, 8)}><circle cx={1263} cy={GROUND - 52} r={32 + 6 * Math.sin(f / 4)} fill="none" stroke={C.red} strokeWidth={8} /></g>
          <g opacity={on(f, bottom28, 8)} transform={`translate(1560 ${GROUND - 60})`}><rect x={-120} y={-44} width={240} height={80} rx={16} fill={C.red} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>22% OUT</text></g>
          <g opacity={on(f, bucket28, 8)} transform="translate(1560 760)"><rect x={-130} y={-44} width={260} height={80} rx={16} fill={C.greenD} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>≈ 10% IN</text></g>
        </g>
      </g>}

      {/* # D) the plug, the snapped card, the side note on cheaper debt */}
      {D > 0 && <g opacity={D}>
        <Sky id="sv-d-d" f={f} mood="dawn" /><Ground y={GROUND - 20} seed={19} />
        <Person f={f} who="investorF" beats={dBeats} x={360} y={GROUND} s={0.88} />
        <g opacity={1 - side}>
          <Tank x={760} y={GROUND - 30} w={220} h={270} f={f} fill={lerp(0.62, 0.22, pour)} label={f >= k1 ? '$1,000' : '$3,000'} />
          {pour > 0 && pour < 1 && <path d={`M 840 ${GROUND - 280} Q 1000 ${GROUND - 470} 1150 ${GROUND - 300}`} fill="none" stroke={C.water} strokeWidth={20} strokeLinecap="round" opacity={0.85} />}
          <Bucket x={1200} y={GROUND - 10} s={0.95} f={f} fill={0.6} leak={1} plug={on(f, k2b + 10, 12)} />
          <g opacity={on(f, k2b, 8) * (1 - on(f, full29, 8))}><text x={1000} y={GROUND - 420} textAnchor="middle" fill={C.ink} style={TXT(56)}>$2,000 PAYS IT OFF</text></g>
          {/* the card snaps */}
          <g opacity={win(f, card29, full29 + 2, 6)} transform={`translate(1560 480) rotate(${-6 + 6 * pop(f, card29, 12)})`}><rect x={-150} y={-95} width={300} height={190} rx={20} fill={C.red} /><rect x={-150} y={-55} width={300} height={34} fill={C.redD} /><rect x={-120} y={0} width={56} height={40} rx={8} fill={C.gold} /></g>
          <g opacity={on(f, full29, 8) * (1 - on(f, left29, 10))}><CardHalf x={1560 - 60 * snap} y={480 + 80 * snap} r={-20 * snap} side={-1} /><CardHalf x={1560 + 60 * snap} y={480 + 80 * snap} r={20 * snap} side={1} /></g>
          <g opacity={on(f, left29, 10)} transform={`translate(760 ${GROUND + 50})`}><text textAnchor="middle" fill={C.ink} style={TXT(48)}>LEFT</text></g>
          <g opacity={on(f, cushion29, 10)}><g transform="translate(1600 0)"><ellipse cx={0} cy={GROUND - 30} rx={180} ry={40} fill="#E58C6B" /><Tank x={0} y={GROUND - 70} w={200} h={240} f={f} fill={0.62} label="$9,000" color="#59C9B8" /></g></g>
          <g opacity={on(f, full29 + 10, 8)} transform={`translate(1200 ${GROUND + 50})`}><rect x={-60} y={-30} width={120} height={60} rx={30} fill={C.gold} /><text y={18} textAnchor="middle" fill={C.ink} style={TXT(48)}>2 ✓</text></g>
        </g>
        {/* cheaper debt: a car loan on a slow drip, the balance nearly level */}
        <g opacity={side}>
          <Car x={900} y={GROUND + 10} s={0.9} f={f} o={on(f, car30, 10)} />
          <g opacity={on(f, loan30, 10)} transform="translate(900 700)"><rect x={-180} y={-44} width={360} height={80} rx={16} fill={C.paper} /><text y={16} textAnchor="middle" fill={C.ink} style={TXT(54)}>{f >= few30 ? 'LOAN: A FEW %' : 'CAR LOAN'}</text></g>
          <g opacity={on(f, closer30, 12)} transform="translate(1500 760)">
            <rect x={-10} y={-260} width={20} height={260} fill={C.woodD} /><path d="M-90 0 L90 0 L50 -30 L-50 -30 Z" fill={C.woodD} />
            <g transform={`rotate(${4 * Math.sin(f / 18)} 0 -260)`}><rect x={-240} y={-268} width={480} height={14} rx={7} fill={C.wood} />
              {[-1, 1].map((sd) => <g key={sd} transform={`translate(${sd * 220} -254)`}><line x1={0} y1={0} x2={0} y2={90} stroke={C.woodD} strokeWidth={4} /><path d="M-70 90 L70 90 Q60 130 0 130 Q-60 130 -70 90 Z" fill={C.stone} />
                <text y={124} textAnchor="middle" fill={C.ink} style={TXT(46)}>{sd < 0 ? 'PAY DOWN' : 'INVEST'}</text></g>)}</g>
            <g opacity={on(f, call30, 8)}><text y={80} textAnchor="middle" fill={C.ink} style={TXT(52)}>A CLOSER CALL</text></g>
          </g>
          {f >= invest30 && <g opacity={on(f, invest30, 8)}><Coin x={1720} y={600} s={0.5} /></g>}
        </g>
      </g>}

      <Headline f={f} lines={[[balance22, 'THE $2,000 CARD BALANCE', C.ink, 96], [p22a, '≈ 22% A YEAR IN INTEREST', C.red, 96], [compare25, 'STOCKS: ≈ 10%, NOT GUARANTEED', C.ink, 92], [paying27, 'PAYING IT OFF ≈ EARNING 22%', C.ink, 92], [reliably28, 'A BUCKET WITH A HOLE', C.ink, 96], [uses29, 'STEP 2: CARD PAID OFF', C.greenD, 96], [cheaper30, 'CHEAPER DEBT? A CLOSER CALL', C.ink, 92]]} />
    </g>
  )
}

export const SV_DEBT = makePiece('sv-debt', 'Step two, expensive debt: by a dusk garden shed Maya\'s red -$2,000 card tips over and becomes a steel bucket tagged 22%, a hose fills it, a hole leaks a stream into a puddle ($450 a year), she shrugs; a road of 98 year tiles 1928-2025 lays out green, ≈10% a year, then the 26 real falling years flash red, a question mark over the 10%; she drops a dollar coin into the hole, the drip slows (saves 22¢ a year), a NO MARKET RISK shield; a watering can labelled INVESTING pours in while the 22% hole drains the bottom; she pours $2,000 from her $3,000 tank, the hole is corked, the card snaps in half, $1,000 left, the $9,000 cushion still full; a car with a LOAN: A FEW % tag and a nearly level balance PAY DOWN vs INVEST (a closer call)', {
  mood: 'light', Component: Debt,
  beats: ["s22:2000", "s22:balance", "s23:charges", "s23:costs", "s23:22", "s24:keeps", "s24:pays", "s24:450", "s24:nothing", "s25:compare", "s25:since", "s25:grew", "s25:10", "s25:dividends", "s26:only", "s26:fell", "s26:26", "s26:98", "s26:guarantees", "s27:paying", "s27:dollar", "s27:stops", "s27:22", "s27:earning", "s27:risk", "s27:interest", "s28:reliably", "s28:investing", "s28:carrying", "s28:bucket", "s28:hole", "s28:bottom", "s29:uses", "s29:2000", "s29:full", "s29:1000", "s29:left", "s29:cushion", "s30:cheaper", "s30:car", "s30:loan", "s30:few", "s30:closer", "s30:call", "s30:invest", "s30:down", "s27:different", "s29:debt", "s24:balance", "s25:market", "s28:risk", "s29:card"],
  sfx: [['s22:balance', 'swish', 0.12], ['s24:pays', 'flutter', 0.12], ['s26:fell', 'thud', 0.14], ['s27:dollar', 'coin', 0.15], ['s29:2000', 'whoosh', 0.12], ['s29:full', 'crack', 0.16]] })
