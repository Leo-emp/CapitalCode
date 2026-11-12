// ---------------------------------------------------------------- s59–s79: step four, when everyone asks at once (navy mood).
// A) The bank and its cash shelf: customers come a few at a time, the shelf barely moves; then everyone comes at once,
//    the crowd fills the street and the shelf empties — BANK RUN.
// B) Silicon Valley Bank: a pile of fixed-rate bonds; 2022 the rate line shoots up; a shiny new bond pays more, so the
//    old bonds' price tags drop; March 8, 2023 the bank announces it sold some bonds and wants to raise money; worried
//    customers.
// C) March 9: money streams out through phones — a counter reaches "$40 BILLION+ IN ONE DAY"; a dashed ghost "$100 BILLION
//    MORE EXPECTED"; March 10: CLOSED.
// D) What protects Nora: the deposit-insurance shield over her money ($250,000 per person, per bank, per ownership type);
//    if the bank fails the FDIC pays; since 1933 not one cent lost; calm customers; money above the limit pokes out of
//    the shield — spread across several banks, each under its own shield.
// E) SVB relied on deposits above the limit; March 12 the government's umbrella covers all its depositors — a special
//    emergency decision; the rule book says $250,000.
// F) Recap: the bank can't pay everyone at once, so the shield stands behind the promise ticket.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { BankFront, BondCert, CalPage, CashBrick, DollarBill, NoMark, Shield, Ticket } from './kit'

const GROUND = 930
const LOOKS = ['buyer', 'investorF', 'worker', 'owner', 'investor']

// # a phone with an arrow out (money leaving)
const OutPhone: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-40} y={-70} width={80} height={140} rx={14} fill="#0D1424" /><rect x={-32} y={-58} width={64} height={116} rx={8} fill="#F7FAFF" />
    <path d="M-14 10 L14 -18 M14 -18 L-2 -18 M14 -18 L14 -2" stroke="#F06B5B" strokeWidth={7} strokeLinecap="round" fill="none" /></g>
)

const Run: React.FC<PieceProps> = ({ f, c }) => {
  const everyone59 = c('s59:everyone'), back59 = c('s59:back'), time59 = c('s59:time')
  const customers75 = c('s75:customers'), run76 = c('s76:run'), limit77 = c('s77:limit'), customers60 = c('s60:customers'), ask60 = c('s60:ask'), runs74 = c('s74:runs'), start74 = c('s74:start'), know74 = c('s74:know'), many76 = c('s76:many'), customers76 = c('s76:customers')
  const remember = c('s60:remember'), promise60 = c('s60:promise'), keep60 = c('s60:keep'), few60 = c('s60:few'), time60 = c('s60:time')
  const everyone61 = c('s61:everyone'), once61 = c('s61:once'), enough = c('s61:enough'), hand61 = c('s61:hand'), run61 = c('s61:run')
  const march62 = c('s62:march'), silicon62 = c('s62:silicon'), bank62 = c('s62:bank')
  const lot63 = c('s63:lot'), bonds63 = c('s63:bonds'), fixed63 = c('s63:fixed'), years63 = c('s63:years')
  const y2022 = c('s64:2022'), rates64 = c('s64:rates'), rose = c('s64:rose'), new64 = c('s64:new'), more64 = c('s64:more'), older = c('s64:older'), lost64 = c('s64:lost'), value64 = c('s64:value')
  const march65 = c('s65:march'), announced = c('s65:announced'), sold = c('s65:sold'), raise = c('s65:raise')
  const customers66 = c('s66:customers'), warning = c('s66:warning')
  const worried = c('s67:worried'), rushed = c('s67:rushed'), single = c('s67:single'), march67 = c('s67:march'), d40 = c('s67:40'), deposits67 = c('s67:deposits')
  const managers = c('s68:managers'), d100 = c('s68:100'), leave = c('s68:leave'), next68 = c('s68:next')
  const never69 = c('s69:never'), march69 = c('s69:march'), closed69 = c('s69:closed')
  const protects = c('s70:protects'), nora70 = c('s70:nora'), deposit70 = c('s70:deposit'), insurance70 = c('s70:insurance')
  const fdic71 = c('s71:fdic'), government71 = c('s71:government'), insures = c('s71:insures'), k250 = c('s71:250000'), person71 = c('s71:person'), per71 = c('s71:per#2'), ownership = c('s71:ownership')
  const fails72 = c('s72:fails'), fdic72 = c('s72:fdic'), paid72 = c('s72:paid')
  const since73 = c('s73:since'), y1933 = c('s73:1933'), depositor73 = c('s73:depositor'), cent = c('s73:cent')
  const insurance74 = c('s74:insurance'), stop74 = c('s74:stop'), safe74 = c('s74:safe'), rush74 = c('s74:rush')
  const above75 = c('s75:above'), limit75 = c('s75:limit'), covered = c('s75:covered'), large = c('s75:large'), spread = c('s75:spread'), several = c('s75:several'), banks75 = c('s75:banks')
  const partly = c('s76:partly'), fast76 = c('s76:fast'), relied = c('s76:relied'), above76 = c('s76:above'), lose76 = c('s76:lose')
  const two77 = c('s77:two'), closed77 = c('s77:closed'), government77 = c('s77:government'), protect77 = c('s77:protect'), all77 = c('s77:all'), even77 = c('s77:even')
  const special = c('s78:special'), decision = c('s78:decision'), written = c('s78:written'), rules78 = c('s78:rules'), k250b = c('s78:250000'), limit78 = c('s78:limit')
  const step79 = c('s79:step'), cant79 = c("s79:can't"), insurance79 = c('s79:insurance'), stands79 = c('s79:stands'), promise79 = c('s79:promise')

  const AB = march62 - 8, BC = worried - 8, CD = protects - 8, DE = partly - 8, EF = step79 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = on(f, EF, 10)
  const D1 = 1 - on(f, insurance74 - 4, 12), D2 = on(f, insurance74 - 4, 12) * (1 - on(f, above75 - 4, 12)), D3 = on(f, above75 - 4, 12)

  // # A) the cash shelf: 6 bricks, a few customers take a little, the crowd takes it all
  const bricks = 6 - 0.6 * on(f, few60, 20) - 5.4 * on(f, enough, 30)
  // # B) old bond tag drops on "lost value"
  const drop = on(f, lost64, 16)
  // # C) the out-flow counter
  const outN = Math.round(40 * on(f, single, 70))

  return (
    <g>
      <Stage id="bk-run" frame={f} />
      <Headline f={f} lines={[[everyone59, 'IF EVERYONE ASKS AT ONCE', P.ink, 104], [few60, 'A FEW AT A TIME: FINE', P.mintInk, 104], [everyone61, 'ALL AT ONCE: NOT ENOUGH CASH', P.coralInk, 98], [run61, 'A BANK RUN', P.coralInk, 116], [march62, 'SILICON VALLEY BANK, 2023', P.ink, 100], [y2022, 'RATES ROSE FAST', P.coralInk, 106], [march65, 'A WARNING SIGN', P.coralInk, 106], [worried, 'MONEY RUSHED OUT', P.coralInk, 106], [closed69, 'CLOSED', P.coralInk, 120], [protects, 'DEPOSIT INSURANCE', P.ink, 110], [insurance74, 'SAFE MONEY DOESN\'T RUN', P.mintInk, 104], [above75, 'ABOVE THE LIMIT: NOT COVERED', P.coralInk, 98], [partly, 'WHY SVB RAN SO FAST', P.ink, 106], [government77, 'A SPECIAL RESCUE', P.ink, 108], [written, 'THE RULE: $250,000', P.ink, 106], [step79, 'INSURANCE BACKS THE PROMISE', P.ink, 100]]} />

      {/* # A) a few at a time vs everyone at once */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} dark />
        <BankFront x={760} y={GROUND} s={1.0} open={0.7} />
        {/* the cash shelf beside the door */}
        <g transform="translate(1300 -110)"><rect x={-130} y={560} width={260} height={16} rx={6} fill="#8B97A8" /><rect x={-130} y={760} width={260} height={16} rx={6} fill="#8B97A8" />
          {Array.from({ length: 6 }, (_, k) => <CashBrick key={k} x={-70 + (k % 3) * 70} y={k < 3 ? 756 : 556} s={0.9} o={k < bricks ? 1 : 0.12} />)}
          <Label x={0} y={500} text="CASH ON HAND" size={44} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, remember, 8) * (1 - on(f, everyone61, 8))}><Ticket x={760} y={260} s={0.9} t="PROMISE" glow={win(f, promise60, promise60 + 30)} /></g>
        {/* a few customers, one at a time */}
        {[0, 1].map((k) => { const at = k === 0 ? customers60 : few60, x = lerp(1900, 1080, span(f, at, at + 26)); return <g key={k} opacity={on(f, at, 8) * (1 - on(f, everyone61, 8))}><Mini look={LOOKS[k]} x={x} y={GROUND} scale={0.85} frame={f} seed={k + 3} mood="happy" /></g> })}
        {/* everyone at once */}
        {Array.from({ length: 14 }, (_, k) => { const at = everyone61 + k * 2, x = lerp(2000 + (k % 7) * 60, 1000 + (k % 7) * 130, span(f, at, at + 24))
          return <g key={k} opacity={on(f, at, 6)}><Mini look={LOOKS[k % 5]} x={x} y={GROUND - (k > 6 ? 30 : 0)} scale={0.8} frame={f} seed={k + 11} mood={f >= enough ? 'sad' : 'neutral'} /></g> })}
        {(() => { const fl = fly(f, ask60 + 4, [960, 640], [1100, 700], 18, 100); return fl.t > 0 && fl.t < 1 ? <Coin x={fl.x} y={fl.y} s={0.7} /> : null })()}
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [ask60, 'offer', 'smiling'], [everyone61, 'shock', 'shocked'], [run61, 'despair', 'worried']]} x={300} y={GROUND} s={1.0} />
      </g>}

      {/* # B) Silicon Valley Bank and its bonds */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} dark />
        <BankFront x={420} y={GROUND} s={0.95} name="SILICON VALLEY BANK" open={0.4} />
        <g opacity={on(f, march62, 8) * (1 - on(f, lot63, 8))} transform="translate(960 520)"><CalPage x={0} y={0} s={0.9} m="MARCH" d="2023" /></g>
        {/* the pile of old fixed-rate bonds */}
        <g opacity={on(f, bonds63, 10)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, bonds63 + k * 4, 6)}><BondCert x={1000 + k * 30} y={820 - k * 70} s={1.0} r={k * 3 - 3} t="OLD BOND" tag={k === 2 ? (drop > 0.5 ? 'PRICE ↓' : 'FIXED') : undefined} tagO={on(f, fixed63, 8)} tagDrop={drop} /></g>)}</g>
        {/* the rate line rising */}
        <g opacity={on(f, y2022, 10) * (1 - on(f, march65, 10))} transform="translate(1540 0)">
          <line x1={-200} y1={820} x2={220} y2={820} stroke="#C2B9B1" strokeWidth={4} /><line x1={-200} y1={820} x2={-200} y2={420} stroke="#C2B9B1" strokeWidth={4} />
          <path d={`M-200 800 L${-200 + 420 * on(f, rose, 30)} ${800 - 340 * on(f, rose, 30) * on(f, rose, 30)}`} stroke={P.coral} strokeWidth={10} strokeLinecap="round" fill="none" />
          <Label x={0} y={880} text="INTEREST RATES, 2022" size={42} font="Bebas Neue" color={P.ink} o={on(f, rates64, 8)} />
        </g>
        <g opacity={on(f, new64, 8) * (1 - on(f, march65, 10))} transform={`translate(1560 ${360 - 10 * pop(f, more64, 12)})`}><BondCert x={0} y={0} s={0.85} t="NEW BOND" tag="PAYS MORE" tagO={on(f, more64, 8)} /></g>
        {/* March 8: the announcement */}
        <g opacity={on(f, march65, 10)} transform="translate(1520 0)">
          <CalPage x={-260} y={420} s={0.8} m="MARCH" d="8" />
          <g opacity={on(f, announced, 8)} transform={`translate(80 ${560 - 10 * pop(f, announced, 12)})`}><rect x={-210} y={-110} width={420} height={220} rx={14} fill="#F2E6CC" />
            <text y={-56} textAnchor="middle" fill="#16294A" style={{ font: '400 44px "Bebas Neue"' }}>BANK NEWS</text>
            <text y={4} textAnchor="middle" fill="#C94A3E" opacity={on(f, sold, 8)} style={{ font: '400 40px "Bebas Neue"' }}>SOLD SOME BONDS</text>
            <text y={60} textAnchor="middle" fill="#C94A3E" opacity={on(f, raise, 8)} style={{ font: '400 40px "Bebas Neue"' }}>NEEDS TO RAISE MONEY</text></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, customers66 + k * 4, 8)}><Mini look={LOOKS[k + 1]} x={-20 + k * 130} y={GROUND} scale={0.75} frame={f} seed={k + 21} mood="sad" /></g>)}
          <g opacity={on(f, warning, 8)}><path d="M-60 -60 L0 -170 L60 -60 Z" transform="translate(-440 620)" fill={P.gold} /><text x={-440} y={600} textAnchor="middle" fill="#16294A" style={{ font: '400 64px "Bebas Neue"' }}>!</text></g>
        </g>
      </g>}

      {/* # C) the run: $40 billion in a day, $100 billion expected, closed */}
      {Cw > 0 && <g opacity={Cw}>
        <Ground y={GROUND} dark />
        <BankFront x={520} y={GROUND} s={1.05} name="SILICON VALLEY BANK" open={1 - on(f, closed69, 10)} shut={on(f, closed69, 10)} />
        {/* money streams out through phones */}
        {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, rushed + k * 3, 6) * (1 - on(f, closed69, 8))}><OutPhone x={960 + k * 110} y={330} s={0.8} /></g>)}
        {f >= rushed && f < closed69 && Array.from({ length: 6 }, (_, k) => { const t = ((f - rushed) / 30 + k / 6) % 1; return <DollarBill key={k} x={lerp(700, 1340, t)} y={800 - Math.sin(t * Math.PI) * 120} s={0.6} digital={1} o={on(f, rushed, 8)} /> })}
        <g opacity={on(f, single, 8)} transform="translate(1660 0)">
          <CalPage x={60} y={330} s={0.8} m="MARCH" d={f >= march69 ? '10' : f >= c('s67:9') ? '9' : ''} col={f >= march69 ? '#2E5C9A' : '#C94A3E'} />
          <g opacity={on(f, d40, 6) * (1 - on(f, never69, 8))}><Label x={0} y={620} text={`$${outN} BILLION+`} size={64} font="Bebas Neue" color={P.coralInk} /><Label x={0} y={670} text="OUT IN ONE DAY" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, d100, 8) * (1 - on(f, never69, 8))}><rect x={-180} y={720} width={360} height={110} rx={14} fill="none" stroke={P.coral} strokeWidth={4} strokeDasharray="14 10" /><Label x={0} y={770} text="$100 BILLION MORE" size={48} font="Bebas Neue" color={P.coralInk} /><Label x={0} y={812} text="EXPECTED NEXT DAY" size={36} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # D) deposit insurance */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} dark />
        {D1 > 0 && <g opacity={D1}>
          <Person f={f} who="investorF" beats={[[CD, 'idle', 'worried'], [insurance70, 'relief', 'smiling'], [paid72, 'receive', 'smiling'], [cent, 'thumbsUp', 'smiling']]} x={330} y={GROUND} s={1.1} />
          <g opacity={on(f, nora70, 8)}><CashBrick x={760} y={GROUND - 4} s={1.6} /><CashBrick x={760} y={GROUND - 58} s={1.6} /><Label x={760} y={GROUND + 60} text="NORA'S MONEY" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, insurance70, 10)} transform={`translate(760 ${640 - 14 * pop(f, k250, 12)})`}><Shield x={0} y={0} s={1.15} t={f >= k250 ? '$250,000' : 'FDIC'} sub={f >= ownership ? 'PER PERSON · PER BANK' : 'INSURED'} glow={on(f, insures, 10)} /></g>
          <g opacity={on(f, fdic71, 8)}><Label x={1300} y={340} text="FDIC = A GOVERNMENT AGENCY" size={48} font="Bebas Neue" color={P.skyInk} o={on(f, government71, 8)} /></g>
          <g opacity={on(f, ownership, 8) * (1 - on(f, fails72, 8))}><Label x={1300} y={420} text="FOR EACH TYPE OF ACCOUNT OWNERSHIP" size={40} font="Bebas Neue" color={P.ink2} /></g>
          {/* the failed bank, the FDIC pays */}
          <g opacity={on(f, fails72, 8) * (1 - on(f, since73, 8))}><BankFront x={1450} y={GROUND} s={0.75} shut={on(f, fails72, 10)} />
            {(() => { const fl = fly(f, paid72 - 6, [1250, 560], [470, 600], 22, 160); return fl.t > 0 && fl.t < 1 ? <Coin x={fl.x} y={fl.y} s={1.0} /> : null })()}</g>
          <g opacity={on(f, y1933, 8)} transform={`translate(1450 ${600 - 12 * pop(f, y1933, 12)})`}><circle r={150} fill={P.gold} /><circle r={124} fill="none" stroke={P.goldD} strokeWidth={6} />
            <text y={-20} textAnchor="middle" fill="#16294A" style={{ font: '400 64px "Bebas Neue"' }}>SINCE 1933</text>
            <text y={40} textAnchor="middle" fill="#16294A" opacity={on(f, cent, 8)} style={{ font: '400 40px "Bebas Neue"' }}>0 CENTS LOST</text></g>
        </g>}
        {D2 > 0 && <g opacity={D2}>
          <BankFront x={1300} y={GROUND} s={0.95} open={0.6} />
          <Shield x={760} y={560} s={0.9} t="$250,000" sub="INSURED" glow={0.6} />
          {Array.from({ length: 5 }, (_, k) => <g key={k} transform={`translate(0 ${-24 * pop(f, know74 + k * 2, 12) * (1 - on(f, know74 + k * 2 + 12, 8))})`}><Mini look={LOOKS[k]} x={160 + k * 120} y={GROUND} scale={0.8} frame={f} seed={k + 31} mood={f >= know74 ? 'happy' : 'neutral'} /></g>)}
          <g opacity={win(f, runs74, start74 + 20, 6)}>{[0, 1, 2, 3].map((k) => <g key={k} opacity={0.35}><Mini look="buyer" x={980 + k * 90} y={GROUND} scale={0.75} frame={f} seed={k + 81} mood="sad" /></g>)}<NoMark x={1115} y={780} o={on(f, start74, 8)} r={110} /></g>
          <g opacity={on(f, rush74, 8)}><Label x={1300} y={GROUND + 60} text="NO RUSH TO PULL IT OUT" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        </g>}
        {D3 > 0 && <g opacity={D3}>
          {/* one tall stack: the part above the limit sticks out of the shield */}
          <g transform="translate(560 0)">
            {Array.from({ length: 8 }, (_, k) => <CashBrick key={k} x={0} y={GROUND - 4 - k * 52} s={1.6} o={on(f, above75 + k * 2, 6) * (1 - on(f, spread, 10))} />)}
            <g opacity={1 - on(f, spread, 10)}><Shield x={0} y={760} s={0.85} t="$250K" sub="COVERED" /></g>
            <g opacity={on(f, limit75, 8) * (1 - on(f, spread, 10))}><line x1={-160} y1={600} x2={160} y2={600} stroke={P.gold} strokeWidth={6} strokeDasharray="14 10" /><Label x={180} y={612} text="LIMIT" size={44} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
            <g opacity={on(f, covered, 8) * (1 - on(f, spread, 10))}><Label x={180} y={500} text="NOT COVERED" size={50} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
          </g>
          <Person o={on(f, customers75, 8)} f={f} who="owner" beats={[[above75, 'idle', 'thinking'], [large, 'armsCrossed', 'thinking'], [spread, 'present', 'smiling']]} x={1600} y={GROUND} s={1.0} flip />
          {/* spread across several banks, each under its own shield */}
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, lerp(spread, banks75, k / 2), 8)} transform={`translate(${300 + k * 420} 0)`}>
            <Shield x={0} y={GROUND - 250} s={0.95} t="" sub="" glow={0.5} /><BankFront x={0} y={GROUND} s={0.36} /><CashBrick x={0} y={GROUND - 210} s={1.3} /><CashBrick x={0} y={GROUND - 256} s={1.3} /><Label x={0} y={GROUND - 340} text="$250K" size={40} font="Bebas Neue" color="#FFFFFF" /></g>)}
        </g>}
      </g>}

      {/* # E) SVB's special rescue vs the rule */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} dark />
        <BankFront x={460} y={GROUND} s={0.95} name="SILICON VALLEY BANK" shut={1} />
        <g opacity={win(f, run76, relied, 6)}>{[0, 1, 2].map((k) => <path key={k} d={`M${800 + k * 10} ${700 + k * 60} l${160 + k * 30} ${-40 + k * 20}`} stroke={P.coral} strokeWidth={10} strokeLinecap="round" fill="none" />)}</g>
        <g opacity={on(f, relied, 8) * (1 - on(f, government77, 10))} transform="translate(1250 0)">
          {Array.from({ length: 9 }, (_, k) => <CashBrick key={k} x={0} y={GROUND - 4 - k * 52} s={1.6} o={k < 2 ? 1 : on(f, above76 + (k - 2) * 2, 6)} />)}
          <line x1={-150} y1={GROUND - 110} x2={150} y2={GROUND - 110} stroke={P.gold} strokeWidth={6} strokeDasharray="14 10" />
          <Label x={170} y={GROUND - 96} text="LIMIT" size={44} font="Bebas Neue" color={P.goldInk} anchor="start" />
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, k === 0 ? many76 : customers76 + (k - 1) * 4, 8)}><Mini look={LOOKS[k + 1]} x={-420 + k * 110} y={GROUND} scale={0.8} frame={f} seed={k + 91} mood="sad" /></g>)}
          <g opacity={on(f, lose76, 8)}><Label x={170} y={560} text="A LOT TO LOSE" size={52} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
        </g>
        <g opacity={on(f, two77, 8) * (1 - on(f, government77, 10))} transform="translate(1000 420)"><CalPage x={0} y={0} s={0.8} m="MARCH" d="12" col="#2E5C9A" /></g>
        {/* the umbrella over all depositors */}
        <g opacity={on(f, government77, 10) * (1 - on(f, written, 10))}>
          <g transform={`translate(1300 ${560 - 20 * pop(f, protect77, 14) - 16 * pop(f, limit77, 12)})`}><path d="M-300 0 Q-300 -220 0 -240 Q300 -220 300 0 Q250 -40 200 0 Q150 -40 100 0 Q50 -40 0 0 Q-50 -40 -100 0 Q-150 -40 -200 0 Q-250 -40 -300 0 Z" fill="#3E73B8" stroke="#FFFFFF" strokeWidth={6} />
            <rect x={-6} y={0} width={12} height={300} fill="#C2B9B1" /><path d="M6 300 q0 40 -36 40" fill="none" stroke="#C2B9B1" strokeWidth={12} strokeLinecap="round" /></g>
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, all77 + k * 2, 6)}><Mini look={LOOKS[k % 5]} x={1060 + k * 96} y={GROUND} scale={0.75} frame={f} seed={k + 41} mood="happy" /></g>)}
          <g opacity={on(f, even77, 8)}><Label x={1300} y={GROUND + 64} text="ALL DEPOSITORS, EVEN ABOVE THE LIMIT" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, special, 8) * (1 - on(f, written, 10))}><Label x={1300} y={270} text="A SPECIAL EMERGENCY DECISION" size={48} font="Bebas Neue" color={P.goldInk} /></g>
        {/* the rule book */}
        <g opacity={on(f, written, 10)} transform={`translate(1300 ${600 - 12 * pop(f, k250b, 12)})`}>
          <rect x={-230} y={-170} width={460} height={340} rx={16} fill="#2E5C9A" /><rect x={-210} y={-150} width={420} height={300} rx={10} fill="#F2E6CC" />
          <text y={-80} textAnchor="middle" fill="#16294A" style={{ font: '400 50px "Bebas Neue"' }}>THE RULES</text>
          <text y={20} textAnchor="middle" fill="#1E9A63" opacity={on(f, k250b, 8)} style={{ font: '400 76px "Bebas Neue"' }}>$250,000</text>
          <text y={80} textAnchor="middle" fill="#16294A" opacity={on(f, limit78, 8)} style={{ font: '400 40px "Bebas Neue"' }}>INSURED LIMIT</text>
        </g>
      </g>}

      {/* # F) recap */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} dark />
        <BankFront x={1300} y={GROUND} s={1.0} open={0.5} />
        <g opacity={on(f, cant79, 8)}>{Array.from({ length: 3 }, (_, k) => <g key={k}><Mini look={LOOKS[k % 5]} x={1700 + k * 90} y={GROUND} scale={0.7} frame={f} seed={k + 51} mood="neutral" /></g>)}</g>
        <g opacity={on(f, insurance79, 10)} transform={`translate(560 ${560 - 14 * pop(f, stands79, 12)})`}><Shield x={0} y={0} s={1.2} t="$250,000" sub="INSURED" glow={1} />
          <g opacity={on(f, promise79, 8)}><Ticket x={0} y={240} s={1.0} t="PROMISE" glow={1} /></g></g>
      </g>}
      <Vignette id="bk-run" />
    </g>
  )
}

const BEATS = ['s75:customers', 's76:run', 's77:limit', 's60:customers', 's60:ask', 's74:runs', 's74:start', 's74:know', 's76:many', 's76:customers', 's59:everyone', 's59:back', 's59:time', 's60:remember', 's60:promise', 's60:keep', 's60:few', 's60:time', 's61:everyone', 's61:once', 's61:enough', 's61:hand', 's61:run', 's62:march', 's62:silicon', 's62:bank', 's63:lot', 's63:bonds', 's63:fixed', 's63:years', 's64:2022', 's64:rates', 's64:rose', 's64:new', 's64:more', 's64:older', 's64:lost', 's64:value', 's65:march', 's65:8', 's65:announced', 's65:sold', 's65:raise', 's66:customers', 's66:warning', 's67:worried', 's67:rushed', 's67:single', 's67:march', 's67:9', 's67:40', 's67:deposits', 's68:managers', 's68:100', 's68:leave', 's68:next', 's69:never', 's69:march', 's69:closed', 's70:protects', 's70:nora', 's70:deposit', 's70:insurance', 's71:fdic', 's71:government', 's71:insures', 's71:250000', 's71:person', 's71:per#2', 's71:ownership', 's72:fails', 's72:fdic', 's72:paid', 's73:since', 's73:1933', 's73:depositor', 's73:cent', 's74:insurance', 's74:stop', 's74:safe', 's74:rush', 's75:above', 's75:limit', 's75:covered', 's75:large', 's75:spread', 's75:several', 's75:banks', 's76:partly', 's76:fast', 's76:relied', 's76:above', 's76:lose', 's77:two', 's77:closed', 's77:government', 's77:protect', 's77:all', 's77:even', 's78:special', 's78:decision', 's78:written', 's78:rules', 's78:250000', 's78:limit', 's79:step', "s79:can't", 's79:insurance', 's79:stands', 's79:promise']
export const BK_RUN = makePiece('bk-run', 'Banking step four (navy): customers come a few at a time and the cash shelf barely moves, then everyone comes at once and it empties (a bank run); Silicon Valley Bank with a pile of fixed-rate old bonds, interest rates shoot up in 2022, a new bond pays more so the old bonds lose value, March 8 2023 bank news (sold some bonds, needs to raise money), worried customers; March 9 money streams out through phones ($40 billion+ in one day, $100 billion more expected), March 10 CLOSED; the $250,000 FDIC insurance shield over Nora’s money, the FDIC pays when an insured bank fails, since 1933 no cent lost, calm customers; money above the limit sticks out of the shield, spread across several banks each under a shield; SVB relied on deposits above the limit, March 12 a government umbrella over all its depositors (a special emergency decision); the rule book says $250,000; recap shield and promise ticket', {
  mood: 'dark', Component: Run, beats: BEATS,
  sfx: [['s61:run', 'thud', 0.25], ['s64:lost', 'thud', 0.2], ['s67:40', 'pop', 0.2], ['s69:closed', 'thud', 0.3], ['s71:250000', 'pop', 0.25], ['s77:protect', 'pop', 0.2]] })
