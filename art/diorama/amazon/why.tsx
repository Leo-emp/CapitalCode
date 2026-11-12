// ---------------------------------------------------------------- s69–s86: step four — why it pays so well.
// A) Sam's headphones again: shelf → box → truck across a map of the country; every new order spawns a new box, a new
//    trip, a new cost coin. StreamCo: nothing packed or shipped — a dashed internet line from the data center to its TV.
// B) Built once, rented again and again: the data center with a "$$$ to build" crane, then many customers' lines plugging
//    in. The hotel: a building of rooms; each extra guest adds a tiny cost coin. Customers stay: a company tries to move
//    its app (a heavy crate) out of AWS — it barely budges; a calendar flips month after month.
// C) Not easy money: two rival data centers labelled MICROSOFT and GOOGLE; cranes building new data centers. The kitchen
//    again: each extra hour costs little; the store: each order needs its own box, truck seat, trip. Recap.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Coin2 } from '../uber/kit'
import { ASpot, DataHall, Parcel, StreamTV, Van } from './kit'

const GROUND = 900

const Why: React.FC<PieceProps> = ({ f, c }) => {
  const step69 = c('s69:step'), renting69 = c('s69:renting'), selling69 = c('s69:selling')
  const start70 = c('s70:start'), sale70 = c('s70:sale'), costs70 = c('s70:costs')
  const sam71 = c('s71:sam'), buy71 = c('s71:buy'), store71 = c('s71:store'), pack71 = c('s71:pack'), move71 = c('s71:move'), country = c('s71:country')
  const every72 = c('s72:every'), order72 = c('s72:order'), boxes72 = c('s72:boxes'), trips72 = c('s72:trips'), costs72 = c('s72:costs')
  const streamco73 = c('s73:streamco'), rents73 = c('s73:rents'), nothing73 = c('s73:nothing'), packed = c('s73:packed'), shipped = c('s73:shipped')
  const sit74 = c('s74:sit'), buildings74 = c('s74:buildings'), uses74 = c('s74:uses'), internet74 = c('s74:internet')
  const cost75 = c('s75:cost'), fortune = c('s75:fortune'), once75 = c('s75:once'), rented75 = c('s75:rented'), again75 = c('s75:again'), again75b = c('s75:again#2'), many75 = c('s75:many')
  const hotel = c('s76:hotel'), rooms = c('s76:rooms'), guest = c('s76:guest'), little76 = c('s76:little')
  const second77 = c('s77:second'), stay = c('s77:stay')
  const built78 = c('s78:built'), moving = c('s78:moving'), slow = c('s78:slow'), risky = c('s78:risky')
  const many79 = c('s79:many'), month79 = c('s79:month'), month79b = c('s79:month#2')
  const doesnt80 = c("s80:doesn't"), easy = c('s80:easy')
  const competes = c('s81:competes'), giants = c('s81:giants'), microsoft = c('s81:microsoft'), google = c('s81:google')
  const spending = c('s82:spending'), huge82 = c('s82:huge'), centers = c('s82:centers'), demand = c('s82:demand')
  const basic = c('s83:basic'), moves83 = c('s83:moves'), boxes83 = c('s83:boxes'), rents83 = c('s83:rents'), already = c('s83:already')
  const kitchen84 = c('s84:kitchen'), built84 = c('s84:built'), hour84 = c('s84:hour'), little84 = c('s84:little')
  const opposite = c('s85:opposite'), box85 = c('s85:box'), truck85 = c('s85:truck'), trip85 = c('s85:trip'), door85 = c('s85:door')
  const step86 = c('s86:step'), skips = c('s86:skips'), shipping86 = c('s86:shipping')

  const AB = cost75 - 20, BC = doesnt80 - 6
  const A = win(f, step69 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, streamco73 - 6, 10), A2 = on(f, streamco73 - 6, 10)
  const B1 = 1 - on(f, hotel - 6, 10), B2 = on(f, hotel - 6, 10) * (1 - on(f, second77 - 6, 10)), B3 = on(f, second77 - 6, 10)
  const C1 = 1 - on(f, basic - 6, 10), C2 = on(f, basic - 6, 10) * (1 - on(f, step86 - 4, 10)), C3 = on(f, step86 - 4, 10)
  const truckT = span(f, move71, country + 20)

  return (
    <g>
      <Stage id="az-why" frame={f} />
      <ASpot f={f} at={nothing73} x={1000} y={520} rx={220} ry={160} />
      <ASpot f={f} at={many75} x={960} y={560} rx={230} ry={200} />
      <Headline f={f} lines={[[step69, 'STEP 4: WHY IT PAYS SO WELL', P.ink, 100], [start70, 'WHAT EACH SALE COSTS', P.ink, 104], [every72, 'EVERY ORDER: NEW COSTS', P.coralInk, 100], [nothing73, 'NOTHING TO PACK OR SHIP', P.mintInk, 100], [fortune, 'COSTLY TO BUILD…', P.ink, 104], [rented75, '…RENTED AGAIN AND AGAIN', P.ink, 100], [hotel, 'LIKE A HOTEL', P.ink, 110], [second77, 'CUSTOMERS TEND TO STAY', P.ink, 100], [easy, 'NOT EASY MONEY', P.ink, 110], [centers, 'NEW DATA CENTERS', P.ink, 104], [basic, 'BOXES VS MACHINES', P.ink, 110], [step86, 'NO SHIPPING COSTS', P.mintInk, 110]]} />

      {/* # A) the store's costs per sale; StreamCo needs no shipping */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [sam71, 'phone', 'smiling'], [costs72, 'shrug', 'worried']]} x={200} y={GROUND} s={0.75} />
          {/* # a simple map strip with a truck crossing it */}
          <g opacity={on(f, move71, 8)}><rect x={420} y={GROUND - 30} width={1360} height={30} rx={6} fill="#5A6680" />{Array.from({ length: 10 }, (_, k) => <rect key={k} x={440 + k * 135} y={GROUND - 18} width={70} height={6} fill="#F2E6CC" />)}
            <Label x={1100} y={GROUND + 50} text={f >= country ? 'ACROSS THE COUNTRY' : 'MOVE IT'} size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, store71, 8)}><Parcel x={lerp(560, 1620, truckT)} y={GROUND - 220} s={0.8} /></g>
          <g opacity={on(f, pack71, 8)}><Van x={lerp(560, 1620, truckT)} y={GROUND - 30} s={0.6} f={f >= move71 ? f : 0} /></g>
          {/* # new box, new trip, new cost */}
          {([[boxes72, 'NEW BOX'], [trips72, 'NEW TRIP'], [costs72, 'NEW COST']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={on(f, at, 6)} transform={`translate(${720 + k * 360} ${360 - 14 * pop(f, at, 12)})`}>
            {k === 0 && <Parcel x={0} y={20} s={0.7} />}{k === 1 && <g transform="translate(0 20) scale(0.35)"><Van x={0} y={0} /></g>}{k === 2 && <Coin2 x={0} y={-20} r={36} t="$" />}
            <Label x={0} y={80} text={t} size={40} font="Bebas Neue" color={P.coralInk} /></g>)}
          <g opacity={on(f, order72, 8) * (1 - on(f, boxes72, 8))}><Label x={1080} y={360} text="EVERY NEW ORDER…" size={48} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={A2}>
          <DataHall x={1360} y={GROUND} s={0.95} f={f} label="AWS" />
          <StreamTV x={420} y={GROUND} s={0.95} title="STREAMCO" glow={on(f, uses74, 10)} />
          {/* # nothing packed: a box with an X; nothing shipped: a van with an X */}
          <g opacity={on(f, packed, 8)} transform="translate(860 330)"><Parcel x={0} y={40} s={0.8} /><path d="M-70 -80 L70 60 M70 -80 L-70 60" stroke={P.coralInk} strokeWidth={12} strokeLinecap="round" /></g>
          <g opacity={on(f, shipped, 8)} transform="translate(1100 330)"><g transform="translate(0 40) scale(0.4)"><Van x={0} y={0} /></g><path d="M-70 -80 L70 60 M70 -80 L-70 60" stroke={P.coralInk} strokeWidth={12} strokeLinecap="round" /></g>
          <g opacity={on(f, internet74 - 20, 8)}><path d="M1080 700 Q860 560 620 700" fill="none" stroke={P.sky} strokeWidth={8} strokeDasharray="1000" strokeDashoffset={1000 * (1 - span(f, internet74 - 20, internet74 + 6))} /><Label x={850} y={560} text="OVER THE INTERNET" size={40} font="Bebas Neue" color={P.skyD} /></g>
          <g opacity={on(f, buildings74, 8)}><Label x={1360} y={GROUND + 50} text="IN AMAZON'S BUILDINGS" size={40} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # B) built once, rented many times; the hotel; customers stay */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={B1}>
          <DataHall x={960} y={GROUND} s={1.1} f={f} label="AWS" />
          {/* # the crane while it's being built */}
          <g opacity={on(f, cost75, 8) * (1 - on(f, once75, 10))}><path d="M1400 900 L1400 360 L1640 360 M1400 400 L1640 360" fill="none" stroke={P.gold} strokeWidth={14} /><line x1={1600} y1={360} x2={1600} y2={500} stroke={P.ink} strokeWidth={4} /><rect x={1570} y={500} width={60} height={40} fill="#8A97AA" /></g>
          <g opacity={on(f, fortune, 8) * (1 - on(f, once75, 10))} transform="translate(960 330)"><rect x={-180} y={-44} width={360} height={88} rx={14} fill={P.coral} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>$$$ TO BUILD</text></g>
          {/* # many customers plug in, one after another */}
          {Array.from({ length: 6 }, (_, k) => { const at = [rented75, again75, again75b, many75, many75 + 6, many75 + 12][k], x = k < 3 ? 260 : 1660, y = 360 + (k % 3) * 150
            return <g key={k} opacity={on(f, at, 6)}>
              <path d={`M${x} ${y} Q${(x + 960) / 2} ${y - 60} ${x < 960 ? 700 : 1220} 700`} fill="none" stroke={P.sky} strokeWidth={5} strokeDasharray="10 8" />
              <g transform={`translate(${x} ${y})`}><rect x={-80} y={-40} width={160} height={80} rx={12} fill={P.card} stroke={P.edge} strokeWidth={3} /><text y={12} textAnchor="middle" fill={P.ink} style={{ font: '400 34px "Bebas Neue"' }}>{`CUSTOMER ${k + 1}`}</text></g>
            </g> })}
        </g>
        <g opacity={B2}>
          {/* # the hotel */}
          <g transform={`translate(760 ${GROUND})`}><rect x={-240} y={-560} width={480} height={560} rx={10} fill="#C9D3E1" />
            {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-200 + (k % 4) * 105} y={-520 + Math.floor(k / 4) * 150} width={70} height={90} rx={6} fill={k < 3 + Math.round(6 * on(f, guest, 20)) ? '#FFE08A' : '#5A6680'} />)}
            <rect x={-60} y={-90} width={120} height={90} fill="#2B3A55" /><text y={-575} textAnchor="middle" fill={P.navy0} style={{ font: '400 44px "Bebas Neue"' }}>HOTEL</text></g>
          <g opacity={on(f, rooms, 8)} transform={`translate(0 ${-10 * pop(f, c('s76:build'), 12)})`}><Label x={760} y={GROUND + 50} text="ROOMS: COSTLY TO BUILD" size={42} font="Bebas Neue" color={P.ink} /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, guest + k * 5, 6)}><Mini look={['buyer', 'hero', 'worker'][k]} x={1200 + k * 140} y={GROUND} scale={0.7} frame={f} seed={k + 76} mood="happy" /></g>)}
          <g opacity={on(f, little76, 8)} transform="translate(1340 520)"><Coin2 x={0} y={0} r={22} t="$" /><Label x={0} y={70} text="EACH EXTRA GUEST: A LITTLE COST" size={38} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={B3}>
          <DataHall x={560} y={GROUND} s={0.9} f={f} label="AWS" />
          {/* # moving out is heavy: a crate labelled "OUR APP" barely moves */}
          <g opacity={on(f, built78, 8)} transform={`translate(${lerp(1100, 1160, Math.sin(Math.min(1, span(f, moving, risky + 20)) * Math.PI * 3) * 0.5 + 0.5) * 1} 0)`}>
            <rect x={-150} y={GROUND - 240} width={300} height={240} rx={10} fill="#C99A62" /><text x={0} y={GROUND - 110} textAnchor="middle" fill="#5A3E1E" style={{ font: '400 44px "Bebas Neue"' }}>OUR APP</text></g>
          <g opacity={on(f, moving, 8)}><Person f={f} who="worker" beats={[[0, 'carryHeavy', 'worried']]} x={1380} y={GROUND} s={0.8} flip /></g>
          <g opacity={on(f, slow, 8)}><Label x={1250} y={380} text={f >= risky ? 'SLOW, RISKY WORK' : 'SLOW…'} size={48} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, many79, 8)}><Calendar x={1660} y={330} text={f >= month79b ? 'MONTH 2' : 'MONTH 1'} s={0.7} flip={span(f, month79, month79b)} /></g>
          <g opacity={on(f, stay, 8)}><Label x={560} y={GROUND + 50} text="CUSTOMERS STAY" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # C) rivals and spending; kitchen vs store; recap */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          <DataHall x={360} y={GROUND} s={0.6} f={f} label="AWS" />
          <g opacity={on(f, microsoft, 8)}><DataHall x={960} y={GROUND} s={0.6} f={f} label="MICROSOFT" /></g>
          <g opacity={on(f, google, 8)}><DataHall x={1560} y={GROUND} s={0.6} f={f} label="GOOGLE" /></g>
          <g opacity={on(f, giants, 8)}><Label x={960} y={380} text="OTHER GIANTS RENT COMPUTERS TOO" size={44} font="Bebas Neue" color={P.ink} /></g>
          {/* # cranes building new data centers */}
          <g opacity={on(f, spending, 8)}>{[0, 1].map((k) => <g key={k} transform={`translate(${560 + k * 800} ${-10 * pop(f, c(k ? 's82:computers' : 's82:giant'), 12)})`}><path d="M0 720 L0 470 L160 470 M0 500 L160 470" fill="none" stroke={P.gold} strokeWidth={10} /><rect x={-60} y={720 - lerp(0, 120, on(f, centers + k * 6, 20))} width={120} height={lerp(0, 120, on(f, centers + k * 6, 20))} fill="#C9D3E1" /></g>)}</g>
          <g opacity={on(f, huge82, 8)}>{[0, 1, 2].map((k) => { const fl = fly(f, huge82 + k * 4, [360, 600], [560 + (k % 2) * 800, 600], 16, 80); return fl.t < 1 ? <Coin2 key={k} x={fl.x} y={fl.y} r={24} t="$" /> : null })}</g>
          <g opacity={on(f, demand, 8)}><Label x={960} y={GROUND + 50} text="TO KEEP UP WITH DEMAND" size={42} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={C2}>
          <g transform="translate(520 0)">
            <g opacity={on(f, moves83, 8)}>{[0, 1, 2].map((k) => <Parcel key={k} x={(k - 1) * 120} y={GROUND} s={0.9} />)}<Label x={0} y={GROUND + 50} text="THE STORE MOVES BOXES" size={42} font="Bebas Neue" color={P.ink} /></g>
            {/* # each order: its own box, truck seat, trip */}
            <g opacity={on(f, c('s85:order'), 8)}><Label x={0} y={250} text="EVERY EXTRA ORDER NEEDS…" size={42} font="Bebas Neue" color={P.ink} /></g>
            {([[box85, 'ITS OWN BOX'], [truck85, 'ITS OWN TRUCK SEAT'], [trip85, 'ITS OWN TRIP']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={on(f, at, 6)} transform={`translate(0 ${330 + k * 90})`}><rect x={-200} y={-34} width={400} height={68} rx={12} fill={P.coral} /><text y={12} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{t}</text></g>)}
          </g>
          <g transform="translate(1400 0)">
            <g opacity={on(f, rents83, 8)}><DataHall x={0} y={GROUND} s={0.75} f={f} label="AWS" /><Label x={0} y={GROUND + 50} text="AWS RENTS WHAT'S ALREADY THERE" size={40} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, hour84, 8)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, hour84 + k * 6, 6)} transform={`translate(${(k - 1) * 120} 380)`}><circle r={40} fill={P.card} stroke={P.ink} strokeWidth={4} /><line x1={0} y1={0} x2={0} y2={-26} stroke={P.ink} strokeWidth={4} transform={`rotate(${k * 120})`} /></g>)}
              <Label x={0} y={470} text={f >= little84 ? 'EACH EXTRA HOUR: LITTLE COST' : 'EXTRA HOURS'} size={38} font="Bebas Neue" color={P.mintInk} /></g>
          </g>
          <g opacity={on(f, opposite, 8)}><Label x={960} y={GROUND - 450} text="OPPOSITES" size={48} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={C3}>
          <g transform="translate(560 0)"><Van x={0} y={GROUND} s={0.9} /><path d="M-170 -50 L170 -50 M-170 -50" stroke="none" /><path d={`M-200 ${GROUND - 260} L200 ${GROUND + 20}`} stroke={P.coralInk} strokeWidth={14} strokeLinecap="round" opacity={on(f, skips, 8)} /></g>
          <g opacity={on(f, shipping86, 8)}><DataHall x={1360} y={GROUND} s={0.85} f={f} label="AWS" /><Label x={1360} y={GROUND + 50} text="NO SHIPPING" size={46} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}
      <Vignette id="az-why" />
    </g>
  )
}

const BEATS = ['s85:order', 's76:build', 's82:giant', 's82:computers', 's69:step', 's69:renting', 's69:selling', 's70:start', 's70:sale', 's70:costs', 's71:sam', 's71:buy', 's71:store', 's71:pack', 's71:move', 's71:country', 's72:every', 's72:order', 's72:boxes', 's72:trips', 's72:costs', 's73:streamco', 's73:rents', 's73:nothing', 's73:packed', 's73:shipped', 's74:sit', 's74:buildings', 's74:uses', 's74:internet', 's75:cost', 's75:fortune', 's75:once', 's75:rented', 's75:again', 's75:again#2', 's75:many', 's76:hotel', 's76:rooms', 's76:guest', 's76:little', 's77:second', 's77:stay', 's78:built', 's78:moving', 's78:slow', 's78:risky', 's79:many', 's79:month', 's79:month#2', "s80:doesn't", 's80:easy', 's81:competes', 's81:giants', 's81:microsoft', 's81:google', 's82:spending', 's82:huge', 's82:centers', 's82:demand', 's83:basic', 's83:moves', 's83:boxes', 's83:rents', 's83:already', 's84:kitchen', 's84:built', 's84:hour', 's84:little', 's85:opposite', 's85:box', 's85:truck', 's85:trip', 's85:door', 's86:step', 's86:skips', 's86:shipping']
export const AZ_WHY = makePiece('az-why', 'Amazon long step 4: each store sale needs a box and a truck trip across the country, every new order brings a new box, trip and cost; StreamCo\'s rented computers need nothing packed or shipped, they sit in Amazon\'s buildings and are used over the internet; data centers cost a fortune to build but are rented again and again to many customers, like hotel rooms where each extra guest adds little cost; customers tend to stay because moving an app is slow, risky work; not easy money: Microsoft and Google rent computers too and AWS keeps building new data centers; boxes vs machines already there; no shipping costs', {
  mood: 'light', Component: Why, beats: BEATS,
  sfx: [['s71:move', 'whoosh', 0.2], ['s72:costs', 'coin', 0.2], ['s73:nothing', 'pop', 0.2], ['s75:fortune', 'thud', 0.2], ['s75:rented', 'pop', 0.15], ['s76:guest', 'pop', 0.15], ['s78:moving', 'thud', 0.2], ['s81:microsoft', 'pop', 0.15], ['s82:centers', 'thud', 0.15], ['s86:skips', 'swish', 0.2]] })
