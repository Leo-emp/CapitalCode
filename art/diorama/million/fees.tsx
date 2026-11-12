// ---------------------------------------------------------------- s66–s76: choice four, fees (navy: a quiet leak).
// A) The money machine with a small tap on its side; a manager holds a bucket under it; the tag says 1% (an example);
//    coins drip; the bucket reads $10,000 in year one; the $40,000 paycheck is cut into quarters and one quarter slides
//    to the bucket; the calendar runs year after year with a sun (good years) and a storm (bad years), the drip goes on.
// B) The 69 tests again: 65 glow; with the fee, 58 — seven more go grey, ringed red.
// C) Two taps side by side: 1% → a big bucket $10,000; an ETF's 0.14% → a small bucket $1,400; a handshake (a fee can
//    buy real help); a receipt under a magnifier (know what you pay), the paycheck's quarter outline.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground, Magnifier } from '../power/kit2'
import { CalPage } from '../bank/kit'
import { bump, Drip, FeeBucket, LeoGrid, Machine, Paycheck, Weather, gridPos } from './kit'
import { OK_6040, OK_FEE } from './data'

const GROUND = 930
const SEVEN = OK_6040.filter((k) => !OK_FEE.includes(k))

const Fees: React.FC<PieceProps> = ({ f, c }) => {
  const funds = c('s66:funds'), advisors = c('s66:advisors'), charge = c('s66:charge'), yearly66 = c('s66:yearly'), percentage = c('s66:percentage'), money66 = c('s66:money')
  const million67 = c('s67:million'), manager = c('s67:manager'), p1 = c('s67:1'), example = c('s67:example'), tiny = c('s67:tiny')
  const million68 = c('s68:million'), d10 = c('s68:10000')
  const remember = c('s69:remember'), d40 = c('s69:40000'), quarter = c('s69:quarter')
  const every70 = c('s70:every'), single70 = c('s70:single'), pile70 = c('s70:pile'), good70 = c('s70:good'), bad70 = c('s70:bad')
  const reran = c('s71:reran'), n69 = c('s71:69'), fee71 = c('s71:fee')
  const lasted72 = c('s72:lasted'), n58 = c('s72:58'), n65 = c('s72:65')
  const seven = c('s73:seven'), early73 = c('s73:early'), matter = c('s73:matter')
  const vary = c('s74:vary'), average74 = c('s74:average'), exchange = c('s74:exchange'), etf = c('s74:etf'), p014 = c('s74:0')
  const million75 = c('s75:million'), d1400 = c('s75:1400'), d10b = c('s75:10000')
  const higher76 = c('s76:higher'), help76 = c('s76:help'), point76 = c('s76:point'), know76 = c('s76:know'), paying76 = c('s76:paying'), paycheck76 = c('s76:paycheck')

  const AB = reran - 8, BC = vary - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = on(f, BC, 10)

  // # A) the tap, the drip, the bucket
  const tapX = 860 - 290 * 0.95 - 76, tapY = GROUND - 170 * 0.95 + 40
  const bucketFill = 0.15 + 0.5 * on(f, d10, 24) + 0.3 * on(f, quarter, 24) + 0.05 * span(f, every70, bad70 + 30)
  const quarterFly = span(f, quarter, quarter + 26)
  const yr = 1 + Math.floor(5 * span(f, every70, bad70 + 30))
  const mBeats: Beat[] = [[0, 'idle', 'smiling'], [manager, 'hold', 'smiling'], [d10, 'holdUp', 'smiling'], [quarter, 'receive', 'smug'], [every70, 'hold', 'smiling']]
  // # B) glow
  const glow = (k: number) => (OK_FEE.includes(k) ? 1 : OK_6040.includes(k) ? 1 - on(f, n58, 16) : 0)
  // # C)
  const cBeats: Beat[] = [[BC, 'idle', 'smiling'], [help76, 'handshake', 'smiling'], [know76, 'read', 'thinking'], [paycheck76, 'present', 'smiling']]

  return (
    <g>
      <Stage id="m-fees" frame={f} />
      <Ground y={GROUND} dark />

      {/* # A) the leak */}
      {A > 0 && <g opacity={A}>
        <g opacity={Math.max(win(f, million67, manager + 20, 6), win(f, c('s69:machine'), d40, 6))}><ellipse cx={860} cy={GROUND - 300} rx={340} ry={340} fill={P.gold} opacity={0.12} /></g>
        <Machine x={860} y={GROUND} s={0.95} f={f} fill={0.8} leak={on(f, charge, 12)} tap={f >= p1 ? '1%' : undefined} plate="LEO'S $1M" />
        {/* what a fee is: a percentage taken from all the money */}
        <g opacity={win(f, funds, manager, 8)} transform="translate(1440 560)">
          <circle r={150} fill="#7FC495" /><path d={`M0 0 L0 -150 A150 150 0 0 1 ${150 * Math.sin(0.35)} ${-150 * Math.cos(0.35)} Z`} fill={P.coral} transform={`translate(${30 * on(f, percentage, 12) + 24 * on(f, c('s66:after'), 10)} ${-20 * on(f, percentage, 12) - 16 * on(f, c('s66:after'), 10)})`} opacity={on(f, yearly66, 8)} />
          <Label x={0} y={210} text={f >= money66 ? 'A % OF ALL THE MONEY' : f >= advisors ? 'FUNDS AND ADVISORS' : 'FUNDS'} size={50} font="Bebas Neue" color={P.ink} /></g>
        {f > charge && <Drip x={tapX} y={tapY} t={(f - charge) / 22} d={GROUND - tapY - 190} />}
        <g opacity={on(f, manager, 10)}>
          <FeeBucket x={tapX} y={GROUND} s={0.9} fill={bucketFill} t={f >= d10 ? (f >= every70 ? `YEAR ${yr}` : '$10,000') : undefined} />
          <Person f={f} who="owner" beats={mBeats} x={160} y={GROUND} s={1.0} />
          <Label x={160} y={GROUND + 64} text="THE MANAGER" size={46} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, example, million68, 8)}><Label x={860} y={GROUND - 660} text={f >= tiny ? '1% SOUNDS TINY' : 'AN EXAMPLE FEE: 1%'} size={62} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, million68, remember, 8)}><Label x={860} y={GROUND - 660} text={f >= d10 ? '1% OF $1M = $10,000 IN YEAR 1' : '1% OF $1,000,000'} size={62} font="Bebas Neue" color={P.goldInk} /></g>
        {/* the paycheck and its quarter */}
        <g opacity={on(f, d40, 10) * (1 - on(f, every70, 10))}>
          <Paycheck x={1450} y={520} s={1.2 + 0.06 * bump(f, [c('s69:fee')])} amt="$40,000" sub="LEO'S YEARLY PAY" split={on(f, quarter, 8)} />
          {quarterFly > 0 && <g transform={`translate(${lerp(1450 + 162, tapX + 40, quarterFly)} ${lerp(520, GROUND - 260, quarterFly)}) rotate(${-20 * quarterFly})`} opacity={1 - on(f, quarter + 22, 4)}>
            <rect x={-54} y={-120} width={108} height={240} rx={12} fill="#FFFDF8" stroke={P.coralD} strokeWidth={5} /><text y={16} textAnchor="middle" fill={P.coralD} style={{ font: '400 50px "Bebas Neue"' }}>¼</text></g>}
          <g opacity={on(f, quarter, 8)}><Label x={1450} y={720} text="THE FEE = ABOUT A QUARTER" size={56} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, every70, 10)}>
          <g transform={`translate(1460 ${380 - 8 * pop(f, single70, 12)})`}><CalPage x={0} y={0} s={0.95} m="EVERY YEAR" d={`YR ${yr}`} col="#2E5C9A" /></g>
          <g opacity={on(f, good70, 8)}><Weather x={1300} y={680} kind="sun" s={0.9} f={f} /><Label x={1300} y={800} text="GOOD YEARS" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, bad70, 8)}><Weather x={1640} y={680} kind="storm" s={0.9} f={f} /><Label x={1640} y={800} text="BAD YEARS" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, pile70, 8)}><Label x={860} y={GROUND - 660} text="TAKEN FROM THE WHOLE PILE" size={58} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # B) 65 → 58 */}
      {B > 0 && <g opacity={B}>
        <LeoGrid x={960} y={480} jump={bump(f, [c('s72:tests')], 18)} glow={glow} f={f} mark={SEVEN} markO={on(f, seven, 10) * (1 - 0.5 * bump(f, [c('s73:fee')], 14))} shown={69} />
        <g opacity={on(f, n69, 8)}><Label x={960} y={880} text={f >= n58 ? (f >= n65 ? 'WITH A 1% FEE: 58 OF 69 (WAS 65)' : 'WITH A 1% FEE: 58 OF 69') : 'THE SAME 69 TESTS'} size={62} font="Bebas Neue" color={P.ink} /></g>
        
        <g opacity={on(f, fee71, 8) * (1 - on(f, seven, 8))} transform={`translate(960 ${330 - 10 * pop(f, fee71, 12)})`}><rect x={-120} y={-44} width={240} height={76} rx={16} fill={P.coral} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>+ 1% FEE</text></g>
        <g opacity={win(f, lasted72, n58, 6)}><ellipse cx={960} cy={600} rx={820} ry={240} fill={P.gold} opacity={0.08} /></g>
        <g opacity={on(f, early73, 8)}><Label x={960} y={340} text={f >= matter ? '7 MORE RUN OUT EARLY' : '7 MORE RUN OUT'} size={60} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # C) two taps; help; know what you pay */}
      {Cc > 0 && <g opacity={Cc}>
        <g opacity={1 - on(f, higher76, 10)}>
          {([[640, '1%', d10b, 0.95, '$10,000', 'EXAMPLE 1% FEE'], [1300, '0.14%', p014, 0.16, '$1,400', 'AVERAGE INDEX STOCK ETF']] as [number, string, number, number, string, string][]).map(([X, tag, at, fill, amt, name], k) =>
            <g key={k} opacity={on(f, k === 0 ? vary : average74, 10)} transform={`translate(0 ${-14 * bump(f, [k === 0 ? c('s74:lot') : c('s74:4')], 16)})`}>
              <rect x={X - 20} y={300} width={40} height={180} fill="#5D6878" /><rect x={X - 20} y={470} width={120} height={40} rx={10} fill="#8B97A8" /><rect x={X + 70} y={490} width={36} height={50} rx={8} fill="#8B97A8" />
              <g transform={`translate(${X - 120} 380)`}><rect x={-80} y={-36} width={160} height={64} rx={14} fill={P.coral} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{tag}</text></g>
              {f > at - 20 && <Drip x={X + 88} y={560} t={(f - at) / (k === 0 ? 14 : 40)} d={150} />}
              <FeeBucket x={X + 88} y={GROUND - 10} s={0.95} fill={fill * on(f, million75, 20)} t={f >= (k === 0 ? d10b : d1400) ? amt : undefined} />
              <Label x={X + 88} y={GROUND + 62} text={name} size={46} font="Bebas Neue" color={P.ink} />
            </g>)}
          <g opacity={on(f, exchange, 8) * (1 - on(f, million75, 8))}><Label x={1390} y={260} text={f >= etf ? 'AN ETF: A FUND TRADED ON THE EXCHANGE' : 'A FUND TRADED ON THE EXCHANGE'} size={46} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, million75, 8)}><Label x={960} y={260} text="PER YEAR, ON $1,000,000" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, higher76, 10)}>
          <Person f={f} who="investor" beats={cBeats} x={560} y={GROUND} s={1.05} />
          <Person f={f} who="owner" beats={[[higher76, 'idle', 'smiling'], [help76, 'handshake', 'smiling'], [know76, 'present', 'smiling']]} x={860} y={GROUND} s={1.05} flip />
          <g opacity={on(f, help76, 8) * (1 - on(f, know76, 8))}><Label x={710} y={GROUND - 640} text="A FEE CAN BUY REAL HELP" size={58} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, point76, 8)} transform="translate(1440 560)"><rect x={-170} y={-230} width={340} height={460} rx={14} fill="#FFFDF8" stroke="#CDB58C" strokeWidth={4} />
            <text y={-160} textAnchor="middle" fill="#16294A" style={{ font: '400 58px "Bebas Neue"' }}>WHAT YOU PAY</text>
            {[0, 1, 2].map((k) => <rect key={k} x={-120} y={-110 + k * 50} width={240} height={16} rx={8} fill="#E3D3AE" />)}
            <text y={110} textAnchor="middle" fill={P.coralD} style={{ font: '400 72px "Bebas Neue"' }}>{f >= paying76 ? 'FEE: __%' : ''}</text>
            <g opacity={on(f, know76, 8)}><Magnifier x={150} y={300} s={0.8} /></g></g>
          <g opacity={on(f, paycheck76, 8)}><Label x={1440} y={GROUND + 62} text="IT COMES OUT OF EVERY PAYCHECK" size={48} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      <Headline f={f} lines={[[funds, 'THE YEARLY FEE', P.ink, 104], [manager, 'SAY A MANAGER CHARGES 1%', P.ink, 96], [remember, 'THE MACHINE PAYS ≈ $40,000', P.ink, 96], [reran, 'OUR 69 TESTS, WITH THE FEE', P.ink, 96], [vary, 'FEES VARY A LOT', P.ink, 104], [higher76, 'KNOW WHAT YOU PAY', P.ink, 104]]} />
      <Vignette id="m-fees" />
    </g>
  )
}

export const M_FEES = makePiece('m-fees', 'Choice four, fees: a pie with a slice taken (a % of all the money, funds and advisors); the machine’s side tap opens, tagged 1% (an example), coins drip into a manager’s bucket ($10,000 in year one); the $40,000 paycheck is cut and a quarter slides into the bucket; the calendar runs every year with a sun and a storm, the drip goes on; the 69 tests: 65 glow, a 1% fee tag, with the fee 58, seven more ringed red with their years; two taps: 1% fills a big bucket $10,000, an index stock ETF’s 0.14% a small bucket $1,400; a handshake (real help) and a receipt under a magnifier (know what you pay)', {
  mood: 'dark', Component: Fees,
  beats: ["s66:funds", "s66:advisors", "s66:charge", "s66:yearly", "s66:percentage", "s66:money", "s67:million", "s67:manager", "s67:1", "s67:example", "s67:tiny", "s68:million", "s68:10000", "s69:remember", "s69:40000", "s69:quarter", "s70:every", "s70:single", "s70:pile", "s70:good", "s70:bad", "s71:reran", "s71:69", "s71:fee", "s72:lasted", "s72:58", "s72:65", "s73:seven", "s73:early", "s73:matter", "s74:vary", "s74:average", "s74:exchange", "s74:etf", "s74:0", "s75:million", "s75:1400", "s75:10000", "s76:higher", "s76:help", "s76:point", "s76:know", "s76:paying", "s76:paycheck", "s69:machine", "s66:after", "s69:fee", "s72:tests", "s73:fee", "s74:lot", "s74:4"],
  sfx: [['s66:charge', 'tick', 0.12], ['s68:10000', 'coin', 0.15], ['s69:quarter', 'swish', 0.15], ['s72:58', 'thud', 0.15], ['s75:1400', 'coin', 0.12]] })
