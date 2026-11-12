// ---------------------------------------------------------------- s31–s47: step two — the hidden business.
// A) Down into the basement: a server room lights up; a sign "AWS = AMAZON WEB SERVICES". Three things it rents — a
//    computer, a storage drive, a software window — slide out along cables "over the internet". Four kinds of customers
//    pop up: a start-up garage, a tower, a government dome, a university.
// B) The kitchen: a big professional kitchen with an hourly meter vs a costly home-built one. StreamCo (made up): a TV with
//    viewers; "thousands of computers"; option A — buy racks, build a cool room, hire fixers (bills pile up, racks sit
//    idle); option B — rent from AWS and pay a meter. Friday night: viewers flood in, more racks light; quiet: fewer.
// C) Your phone: app icons wired to the data center; "no box, no van, no doorstep" crossed out; a monthly bill. Growth:
//    AWS sales $62B (2021) → $129B (2025), more than twice.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Coin2 } from '../uber/kit'
import { ASpot, DataHall, Parcel, Rack, StreamTV, Van } from './kit'

const GROUND = 900

const Aws: React.FC<PieceProps> = ({ f, c }) => {
  const step31 = c('s31:step'), part31 = c('s31:part'), never31 = c('s31:never')
  const called = c('s32:called'), aws32 = c('s32:aws'), stands = c('s32:stands'), web = c('s32:web'), services32 = c('s32:services')
  const rents33 = c('s33:rents'), computers33 = c('s33:computers'), storage = c('s33:storage'), software = c('s33:software'), internet = c('s33:internet')
  const customers34 = c('s34:customers'), startups = c('s34:startups'), big34 = c('s34:big'), governments = c('s34:governments'), universities = c('s34:universities')
  const renting35 = c('s35:renting'), professional = c('s35:professional'), kitchen35 = c('s35:kitchen'), hour = c('s35:hour'), instead35 = c('s35:instead'), building35 = c('s35:building'), restaurant = c('s35:restaurant')
  const streaming = c('s36:streaming'), app36 = c('s36:app'), streamco36 = c('s36:streamco')
  const needs = c('s37:needs'), thousands = c('s37:thousands'), computers37 = c('s37:computers'), shows = c('s37:shows'), viewers = c('s37:viewers')
  const buy38 = c('s38:buy'), build38 = c('s38:build'), cool = c('s38:cool'), hire = c('s38:hire'), fix = c('s38:fix')
  const lot39 = c('s39:lot'), front = c('s39:front'), idle = c('s39:idle'), half39 = c('s39:half')
  const rent40 = c('s40:rent'), aws40 = c('s40:aws'), pay40 = c('s40:pay'), uses40 = c('s40:uses')
  const watch = c('s41:watch'), friday = c('s41:friday'), rents41 = c('s41:rents'), more41 = c('s41:more#2'), quiet = c('s41:quiet'), less41 = c('s41:less')
  const apps = c('s42:apps'), websites = c('s42:websites'), every42 = c('s42:every'), rented42 = c('s42:rented')
  const never43 = c('s43:never'), aws43 = c('s43:aws'), using43 = c('s43:using'), now43 = c('s43:now')
  const box44 = c('s44:box'), van44 = c('s44:van'), doorstep44 = c('s44:doorstep'), monthly = c('s44:monthly'), bill44 = c('s44:bill')
  const growing = c('s45:growing'), fast = c('s45:fast')
  const y2021 = c('s46:2021'), d62 = c('s46:62'), y2025 = c('s46:2025'), d129 = c('s46:129'), twice = c('s46:twice')
  const step47 = c('s47:step'), behind = c('s47:behind'), giant47 = c('s47:giant'), business47 = c('s47:business')

  const AB = renting35 - 6, BC = apps - 6
  const A = win(f, step31 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, customers34 - 6, 10), A2 = on(f, customers34 - 6, 10)
  const B1 = 1 - on(f, streaming - 6, 10), B2 = on(f, streaming - 6, 10) * (1 - on(f, rent40 - 6, 10)), B3 = on(f, rent40 - 6, 10)
  const C1 = 1 - on(f, growing - 6, 10), C2 = on(f, growing - 6, 10) * (1 - on(f, step47 - 4, 10)), C3 = on(f, step47 - 4, 10)
  // # how busy StreamCo is: rises on Friday night, falls when quiet
  const busy = 0.4 + 0.6 * on(f, friday, 20) - 0.6 * on(f, quiet, 20)

  return (
    <g>
      <Stage id="az-aws" frame={f} />
      <ASpot f={f} at={aws32} x={960} y={420} rx={230} ry={140} />
      <ASpot f={f} at={d129} x={1300} y={500} rx={180} ry={220} />
      <Headline f={f} lines={[[step31, 'STEP 2: THE HIDDEN BUSINESS', P.ink, 100], [aws32, 'AWS', P.ink, 120], [web, 'AMAZON WEB SERVICES', P.ink, 104], [rents33, 'IT RENTS OUT COMPUTERS', P.ink, 104], [customers34, 'ITS CUSTOMERS: ORGANISATIONS', P.ink, 92], [professional, 'LIKE RENTING A KITCHEN', P.ink, 104], [streamco36, 'STREAMCO (MADE UP)', P.ink, 104], [buy38, 'OPTION A: BUY IT ALL', P.ink, 100], [rent40, 'OPTION B: RENT FROM AWS', P.ink, 100], [friday, 'BUSY? RENT MORE', P.ink, 104], [quiet, 'QUIET? RENT LESS', P.ink, 104], [apps, 'APPS YOU USE', P.ink, 110], [monthly, 'JUST A MONTHLY BILL', P.ink, 104], [d62, 'AWS SALES: 2021 → 2025', P.ink, 100], [step47, 'A GIANT COMPUTER-RENTAL BUSINESS', P.ink, 88]]} />

      {/* # A) the basement; what it rents; its customers */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <DataHall x={960} y={GROUND} s={1.2} f={f} lit={on(f, part31, 30)} label="AMAZON WEB SERVICES" />
          <g opacity={on(f, never31, 8)}><Mini look="buyer" x={240} y={GROUND} scale={0.9} frame={f} seed={31} mood="neutral" /><g transform={`translate(240 ${GROUND - 220})`}><path d="M-40 -10 Q0 -40 40 -10 Q0 20 -40 -10 Z" fill="#FFFFFF" stroke={P.ink} strokeWidth={4} /><path d="M-50 -30 L50 10" stroke={P.coralInk} strokeWidth={8} strokeLinecap="round" /></g>
            <Label x={240} y={GROUND + 56} text="SHOPPERS DON'T SEE IT" size={38} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, stands, 8)} transform={`translate(960 ${300 - 14 * pop(f, stands, 12)})`}><rect x={-140} y={-44} width={280} height={88} rx={14} fill="#1F2B4A" /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 6 }}>AWS</text></g>
          {/* # what it rents: computer, storage, software, sliding out along a cable */}
          {([[computers33, 'COMPUTERS'], [storage, 'STORAGE'], [software, 'SOFTWARE']] as [number, string][]).map(([at, t], k) => { const t2 = on(f, at, 18)
            return <g key={k} opacity={on(f, at, 6)} transform={`translate(${lerp(1300, 1560 + 0, t2)} ${360 + k * 150})`}>
              <rect x={-110} y={-50} width={220} height={100} rx={14} fill={P.card} stroke={P.edge} strokeWidth={4} />
              {k === 0 && <g><rect x={-40} y={-34} width={80} height={52} rx={6} fill="#2B3A55" /><rect x={-50} y={22} width={100} height={8} rx={4} fill="#2B3A55" /></g>}
              {k === 1 && <g><rect x={-40} y={-34} width={80} height={60} rx={8} fill="#5A6680" /><circle cx={20} cy={14} r={6} fill={P.mint} /></g>}
              {k === 2 && <g><rect x={-46} y={-34} width={92} height={64} rx={6} fill="#EEF3FA" stroke="#2B3A55" strokeWidth={4} /><rect x={-46} y={-34} width={92} height={14} fill="#2B3A55" /></g>}
              <text x={0} y={76} textAnchor="middle" fill={P.ink} style={{ font: '400 34px "Bebas Neue"' }}>{t}</text>
            </g> })}
          <g opacity={on(f, internet, 8)}><path d="M1250 560 Q1350 470 1440 400 M1250 600 Q1350 560 1440 550 M1250 640 Q1350 680 1440 700" fill="none" stroke={P.sky} strokeWidth={6} strokeDasharray="12 8" /><Label x={1300} y={300} text="OVER THE INTERNET" size={38} font="Bebas Neue" color={P.skyD} /></g>
        </g>
        <g opacity={A2}>
          <DataHall x={960} y={520} s={0.8} f={f} label="AWS" />
          {([[startups, 'START-UPS', 300], [big34, 'BIG COMPANIES', 760], [governments, 'GOVERNMENTS', 1180], [universities, 'UNIVERSITIES', 1620]] as [number, string, number][]).map(([at, t, x], k) => (
            <g key={k} opacity={on(f, at, 6)} transform={`translate(${x} ${GROUND - 20 * (1 - pop(f, at, 14))})`}>
              {k === 0 && <g><rect x={-90} y={-130} width={180} height={130} rx={8} fill="#C9D3E1" /><path d="M-100 -130 L0 -190 L100 -130 Z" fill="#8A97AA" /><rect x={-50} y={-80} width={100} height={80} fill="#5A6680" /></g>}
              {k === 1 && <g><rect x={-70} y={-280} width={140} height={280} rx={6} fill="#5A6680" />{Array.from({ length: 6 }, (_, r) => <rect key={r} x={-50} y={-260 + r * 42} width={100} height={22} rx={3} fill="#BFE3FF" />)}</g>}
              {k === 2 && <g><rect x={-110} y={-130} width={220} height={130} fill="#D9DFE8" /><path d="M-70 -130 Q0 -230 70 -130 Z" fill="#B8C6D9" />{[-80, -40, 0, 40, 80].map((cx) => <rect key={cx} x={cx - 8} y={-120} width={16} height={110} fill="#EEF3FA" />)}</g>}
              {k === 3 && <g><rect x={-100} y={-150} width={200} height={150} fill="#B5523E" /><path d="M-120 -150 L0 -220 L120 -150 Z" fill="#8A3A2A" /><rect x={-20} y={-60} width={40} height={60} fill="#5A3E1E" /><circle cx={0} cy={-170} r={16} fill={P.gold} /></g>}
              <Label x={0} y={56} text={t} size={40} font="Bebas Neue" color={P.ink} />
              <path d={`M0 -${k === 1 ? 290 : 200} L${960 - x} ${-GROUND + 520 + 10}`} stroke={P.sky} strokeWidth={4} strokeDasharray="8 8" opacity={on(f, at + 6, 8) * 0.8} />
            </g>))}
        </g>
      </g>}

      {/* # B) the kitchen; StreamCo; buy vs rent; busy vs quiet */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={B1}>
          {/* # the professional kitchen with an hourly meter */}
          <g transform={`translate(560 ${GROUND})`} opacity={on(f, professional, 8)}>
            <rect x={-280} y={-340} width={560} height={340} rx={14} fill="#EEF3FA" stroke="#9AA8BC" strokeWidth={4} />
            {[-180, -40, 100].map((kx) => <g key={kx}><rect x={kx - 50} y={-140} width={120} height={140} rx={6} fill="#8A97AA" /><circle cx={kx - 10} cy={-150} r={20} fill="#5A6680" /><circle cx={kx + 40} cy={-150} r={20} fill="#5A6680" /></g>)}
            <rect x={-240} y={-300} width={480} height={60} rx={8} fill="#C9D3E1" />
            <text y={-260} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>PRO KITCHEN</text>
            <g opacity={on(f, hour, 8)} transform="translate(220 -380)"><circle r={50} fill={P.card} stroke={P.ink} strokeWidth={5} /><line x1={0} y1={0} x2={0} y2={-34} stroke={P.ink} strokeWidth={5} transform={`rotate(${(f - hour) * 6})`} /><Label x={0} y={90} text="PAY PER HOUR" size={34} font="Bebas Neue" color={P.ink} /></g>
          </g>
          <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [renting35, 'point', 'smiling'], [restaurant, 'shrug', 'thinking']]} x={1000} y={GROUND} s={0.75} />
          <g opacity={on(f, instead35, 8)} transform={`translate(1460 ${GROUND})`}>
            <rect x={-200} y={-260} width={400} height={260} rx={10} fill="#F2E6CC" stroke="#C9B48A" strokeWidth={4} />
            <g opacity={on(f, building35, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${-120 + k * 120} ${-300 - k * 20})`}><rect x={-44} y={-30} width={88} height={60} rx={8} fill={P.coral} /><text y={10} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 30px "Bebas Neue"' }}>$$$</text></g>)}</g>
            <text y={-120} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>BUILD YOUR OWN</text>
          </g>
        </g>
        <g opacity={B2}>
          <StreamTV x={500} y={GROUND} s={1} title="STREAMCO" glow={on(f, shows, 10)} />
          {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, viewers + k * 3, 6)}><Mini look={['buyer', 'investorF', 'hero', 'worker', 'owner'][k]} x={[140, 230, 780, 870, 960][k]} y={GROUND} scale={0.5} frame={f} seed={k + 40} mood="happy" /></g>)}
          <g opacity={on(f, thousands, 8)}>{Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, thousands + k * 2, 5)} transform={`translate(${1000 + k * 120} ${GROUND}) scale(0.7)`}><Rack x={0} y={0} f={f + k * 4} lit={f >= idle ? 0.3 : 1} /></g>)}
            <Label x={1300} y={GROUND + 50} text={f >= buy38 ? 'BUY THEM…' : 'THOUSANDS OF COMPUTERS'} size={42} font="Bebas Neue" color={P.ink} /></g>
          {([[build38, 'BUILD A COOL ROOM'], [hire, 'HIRE PEOPLE TO FIX THEM'], [front, 'BIG COST UP FRONT']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={on(f, at, 6)} transform={`translate(1300 ${300 + k * 90})`}><rect x={-230} y={-36} width={460} height={72} rx={12} fill={P.coral} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{t}</text></g>)}
          <g opacity={on(f, idle, 8)}><Label x={1300} y={GROUND - 230} text={f >= half39 ? 'IDLE HALF THE TIME?' : 'IDLE…'} size={44} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, cool, 8)}>{[0, 1, 2].map((k) => <path key={k} d={`M${1020 + k * 300} 520 l20 20 m0 -20 l-20 20 m10 -26 v32 m-16 -16 h32`} stroke={P.sky} strokeWidth={4} />)}</g>
        </g>
        <g opacity={B3}>
          <StreamTV x={420} y={GROUND} s={0.9} title="STREAMCO" glow={busy} />
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, watch, 6) * (k < Math.round(2 + 4 * busy) ? 1 : 0.15)}><Mini look={['buyer', 'investorF', 'hero', 'worker', 'owner', 'buyer'][k]} x={[90, 170, 670, 750, 830, 910][k]} y={GROUND} scale={0.45} frame={f} seed={k + 50} mood="happy" /></g>)}
          <DataHall x={1350} y={GROUND} s={0.95} f={f} lit={busy} label="AWS" />
          <g opacity={on(f, aws40, 8)}><path d="M640 640 Q980 520 1080 640" fill="none" stroke={P.sky} strokeWidth={6} strokeDasharray="12 8" /></g>
          {/* # the meter: pay only for what you use */}
          <g opacity={on(f, pay40, 8)} transform={`translate(960 ${330 - 12 * pop(f, uses40, 12)})`}><rect x={-160} y={-60} width={320} height={120} rx={16} fill={P.card} stroke={P.edge} strokeWidth={4} />
            <text y={-12} textAnchor="middle" fill={P.ink2} style={{ font: '400 32px "Bebas Neue"' }}>PAY FOR WHAT YOU USE</text>
            <rect x={-130} y={10} width={260} height={28} rx={8} fill="#D9DFE8" /><rect x={-130} y={10} width={260 * busy} height={28} rx={8} fill={P.mint} /></g>
          <g opacity={on(f, friday, 8) * (1 - on(f, quiet, 8))}><Label x={420} y={300} text="FRIDAY NIGHT" size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, quiet, 8)}><Label x={420} y={300} text="QUIET" size={48} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, more41, 8) * (1 - on(f, quiet, 8))}><Label x={1350} y={GROUND + 50} text="RENTS MORE" size={42} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, less41, 8)}><Label x={1350} y={GROUND + 50} text="RENTS LESS" size={42} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # C) your phone; no box; growth; recap */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          <Person f={f} who="investorF" beats={[[0, 'phone', 'smiling'], [never43, 'phone', 'thinking'], [now43, 'phone', 'shocked']]} x={300} y={GROUND} s={0.8} />
          <g transform="translate(640 520)"><rect x={-120} y={-230} width={240} height={460} rx={36} fill="#111A2E" /><rect x={-104} y={-206} width={208} height={412} rx={24} fill="#EEF3FA" />
            {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-84 + (k % 3) * 64} y={-180 + Math.floor(k / 3) * 70} width={44} height={44} rx={10} fill={[P.coral, P.sky, P.mint, P.gold, '#9D7FD0', P.coral, P.sky, P.mint, P.gold][k]} opacity={on(f, apps + k * 2, 5)} />)}</g>
          <DataHall x={1360} y={GROUND} s={0.85} f={f} label="AWS" />
          <g opacity={on(f, run42(), 8)}>{[0, 1, 2].map((k) => <path key={k} d={`M760 ${400 + k * 70} Q1000 ${360 + k * 70} 1140 ${600 + k * 30}`} fill="none" stroke={P.sky} strokeWidth={5} strokeDasharray="1000" strokeDashoffset={1000 * (1 - span(f, run42() + k * 4, run42() + k * 4 + 20))} />)}</g>
          <g opacity={on(f, websites, 8)}><Label x={640} y={GROUND + 50} text="APPS & WEBSITES" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, using43, 8) * (1 - on(f, box44 - 4, 8))}><Label x={1360} y={360} text="YOU MIGHT BE USING IT NOW" size={40} font="Bebas Neue" color={P.ink2} /></g>
          {/* # no box, no van, no doorstep */}
          {([[box44, 'box'], [van44, 'van'], [doorstep44, 'door']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={on(f, at, 6) * (1 - on(f, monthly - 4, 10))} transform={`translate(${1000 + k * 260} 240) scale(0.55)`}>
            {t === 'box' && <Parcel x={0} y={60} s={1.4} />}{t === 'van' && <Van x={0} y={60} s={0.6} />}{t === 'door' && <g><rect x={-60} y={-100} width={120} height={160} rx={6} fill="#B5523E" /></g>}
            <path d="M-90 -90 L90 90" stroke={P.coralInk} strokeWidth={14} strokeLinecap="round" /></g>)}
          <g opacity={on(f, monthly, 8)} transform={`translate(1360 ${300 - 14 * pop(f, bill44, 12) - 10 * pop(f, c('s44:time'), 12)})`}><rect x={-150} y={-60} width={300} height={120} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={4} /><text y={-14} textAnchor="middle" fill={P.navy0} style={{ font: '400 36px "Bebas Neue"' }}>MONTHLY BILL</text><text y={34} textAnchor="middle" fill={P.ink2} style={{ font: '400 30px "Bebas Neue"' }}>COMPUTER TIME</text></g>
        </g>
        <g opacity={C2}>
          {([[y2021, d62, 62.2, '2021', '$62B', 760], [y2025, d129, 128.7, '2025', '$129B', 1160]] as [number, number, number, string, string, number][]).map(([ya, va, v, t, lab, x], k) => { const h = lerp(0, v * 4.4, on(f, va, 20))
            return <g key={k} opacity={on(f, ya, 8)}><rect x={x - 110} y={GROUND - h} width={220} height={h} rx={14} fill="#1F2B4A" /><Label x={x} y={GROUND + 56} text={t} size={48} font="Bebas Neue" color={P.ink} /><g opacity={on(f, va, 8)} transform={`translate(0 ${k === 0 ? -12 * pop(f, c('s46:services'), 12) : 0})`}><Label x={x} y={GROUND - v * 4.4 - 30} text={lab} size={56} font="Bebas Neue" color={P.navy0} /></g></g> })}
          <g opacity={on(f, twice, 8)}>{[0, 1].map((k) => <rect key={k} x={1360} y={GROUND - 62.2 * 4.4 * (k + 1)} width={140} height={62.2 * 4.4 - 6} rx={10} fill="#1F2B4A" opacity={0.5} />)}<Label x={1430} y={GROUND + 56} text="> 2 × 2021" size={42} font="Bebas Neue" color={P.ink} /></g>
          <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [growing, 'point', 'smiling'], [twice, 'celebrate', 'smiling']]} x={360} y={GROUND} s={0.8} />
        </g>
        <g opacity={C3}>
          <g transform="translate(960 0)"><DataHall x={0} y={GROUND} s={1.3} f={f} label="AWS" /></g>
          <g opacity={on(f, behind, 8)}><Label x={960} y={GROUND + 56} text="BEHIND THE STORE" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, giant47, 8)} transform={`translate(960 ${330 - 14 * pop(f, business47, 12)})`}><rect x={-260} y={-44} width={520} height={88} rx={14} fill="#1F2B4A" /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>COMPUTER RENTAL</text></g>
        </g>
      </g>}
      <Vignette id="az-aws" />
    </g>
  )
  function run42() { return c('s42:run') }
}

const BEATS = ['s44:time', 's46:services', 's31:step', 's31:part', 's31:never', 's32:called', 's32:aws', 's32:stands', 's32:web', 's32:services', 's33:rents', 's33:computers', 's33:storage', 's33:software', 's33:internet', 's34:customers', 's34:startups', 's34:big', 's34:governments', 's34:universities', 's35:renting', 's35:professional', 's35:kitchen', 's35:hour', 's35:instead', 's35:building', 's35:restaurant', 's36:streaming', 's36:app', 's36:streamco', 's37:needs', 's37:thousands', 's37:computers', 's37:shows', 's37:viewers', 's38:buy', 's38:build', 's38:cool', 's38:hire', 's38:fix', 's39:lot', 's39:front', 's39:idle', 's39:half', 's40:rent', 's40:aws', 's40:pay', 's40:uses', 's41:watch', 's41:friday', 's41:rents', 's41:more#2', 's41:quiet', 's41:less', 's42:apps', 's42:websites', 's42:run', 's42:rented', 's43:never', 's43:aws', 's43:using', 's43:now', 's44:box', 's44:van', 's44:doorstep', 's44:monthly', 's44:bill', 's45:growing', 's45:fast', 's46:2021', 's46:62', 's46:2025', 's46:129', 's46:twice', 's47:step', 's47:behind', 's47:giant', 's47:business']
export const AZ_AWS = makePiece('az-aws', 'Amazon long step 2: a basement data center labelled AWS, Amazon Web Services; it rents out computers, storage and software over the internet to start-ups, big companies, governments and universities; like renting a pro kitchen by the hour instead of building your own; StreamCo (made up) needs thousands of computers: buying means a cool room, people to fix them, big cost up front and idle machines, renting from AWS means paying for what you use; Friday night it rents more, quiet nights less; your phone\'s apps run on rented computers; no box, no van, no doorstep, just a monthly bill; AWS sales $62B in 2021 to $129B in 2025, more than twice', {
  mood: 'light', Component: Aws, beats: BEATS,
  sfx: [['s31:part', 'whoosh', 0.2], ['s32:aws', 'pop', 0.25], ['s33:computers', 'pop', 0.15], ['s34:startups', 'pop', 0.15], ['s35:hour', 'pop', 0.15], ['s38:build', 'thud', 0.15], ['s40:pay', 'coin', 0.2], ['s41:friday', 'whoosh', 0.2], ['s44:monthly', 'pop', 0.2], ['s46:129', 'pop', 0.25]] })
