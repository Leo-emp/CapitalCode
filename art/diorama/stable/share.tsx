// ---------------------------------------------------------------- s67–s76: who else gets a share.
// A) Circle's gold block ($2.64B); a large part breaks off and slides to a row of app phones and partners: paid out
//    about $1.66B in distribution and transaction costs.
// B) The exchange (a plain building signed COINBASE, no logo). Their deal as one bar of all USDC: the part sitting on
//    Coinbase sends its interest to Coinbase; the rest's interest splits in half — one half to Coinbase, one to Circle.
//    Coinbase's pile: about $1.35B of stablecoin revenue in 2025.
// C) An app hands a few coins back to a customer as a reward; "the app's choice" — a toggle flips. Maya's dollars'
//    interest splits: part to Circle, part to her app. The coin company to Maya: a coin starts toward her and is
//    crossed — nothing.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { CoinHQ, Cross, SCoin } from './kit'

const GROUND = 920
const Gold: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 16, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={P.gold} /><circle r={r * 0.7} fill="none" stroke={P.goldD} strokeWidth={3} /></g>
// # a small phone standing up (an app)
const AppPhone: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = P.sky }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-200} width={120} height={200} rx={20} fill="#0D1424" /><rect x={-50} y={-188} width={100} height={176} rx={12} fill="#F7FAFF" />
    <rect x={-34} y={-160} width={68} height={68} rx={16} fill={color} /><rect x={-34} y={-76} width={68} height={10} rx={5} fill="#C9D3E1" /><rect x={-34} y={-58} width={46} height={10} rx={5} fill="#C9D3E1" />
  </g>
)
// # the exchange building
const Exchange: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={200} ry={16} fill={P.shadow} opacity={0.18} />
    <rect x={-170} y={-380} width={340} height={380} rx={14} fill="#2F5FD0" />
    {Array.from({ length: 5 }, (_, r) => [0, 1, 2, 3].map((cc) => <rect key={`${r}${cc}`} x={-140 + cc * 72} y={-300 + r * 52} width={52} height={32} rx={5} fill="#BFD3FF" opacity={0.85} />))}
    <rect x={-130} y={-366} width={260} height={50} rx={12} fill="#FFFFFF" />
    <text x={0} y={-329} textAnchor="middle" fill="#2F5FD0" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>COINBASE</text>
    <rect x={-36} y={-72} width={72} height={72} rx={6} fill="#1C3A85" />
  </g>
)

const Share: React.FC<PieceProps> = ({ f, c }) => {
  const keep = c('s67:keep'), d264 = c('s67:264')
  const pays = c('s68:pays'), large = c('s68:large'), apps = c('s68:apps'), partners = c('s68:partners'), coins68 = c('s68:coins')
  const s69 = c('s69'), circle69 = c('s69:circle'), paid = c('s69:paid'), d166 = c('s69:166'), costs = c('s69:costs')
  const distribution = c('s69:distribution'), cb71 = c('s71:coinbase'), apps73 = c('s73:apps'), keeping = c('s73:keeping'), company76b = c('s76:company')
  const coin73 = c('s73:coin')
  const biggest = c('s70:biggest'), coinbase70 = c('s70:coinbase'), exchange = c('s70:exchange')
  const deal = c('s71:deal'), share71 = c('s71:share'), usdc71 = c('s71:usdc'), sits = c('s71:sits'), half = c('s71:half'), left = c('s71:left'), everywhere = c('s71:everywhere')
  const reported = c('s72:reported'), d135 = c('s72:135'), revenue = c('s72:revenue')
  const some = c('s73:some'), pass = c('s73:pass'), customers = c('s73:customers'), reward = c('s73:reward')
  const choice = c('s74:choice')
  const interest75 = c('s75:interest'), maya75 = c("s75:maya's"), circle75 = c('s75:circle'), app75 = c('s75:app')
  const company76 = c('s76:company'), pays76 = c('s76:pays'), person = c('s76:person'), nothing = c('s76:nothing')
  const AB = biggest - 4, BC = some - 4
  const A = win(f, keep - 20, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const C1 = win(f, BC, interest75 - 4), C2 = on(f, interest75 - 4, 10)
  return (
    <g>
      <Stage id="sc-share" frame={f} />
      <Headline f={f} lines={[[d264, "CIRCLE DOESN'T KEEP ALL $2.64B", P.ink, 92], [d166, 'PAID OUT: ABOUT $1.66 BILLION', P.ink, 92], [coinbase70, 'ITS BIGGEST PARTNER', P.ink, 100], [deal, 'THEIR DEAL', P.ink, 104], [d135, 'COINBASE, 2025: ≈ $1.35B', P.ink, 96], [reward, 'A REWARD FROM THE APP', P.ink, 96], [choice, "THE APP'S CHOICE", P.ink, 104], [interest75, "THE INTEREST ON MAYA'S DOLLARS", P.ink, 92], [nothing, 'TO THE HOLDER: NOTHING', P.coralInk, 100]]} />

      {/* # A) Circle's block breaks: a large part goes to apps and partners */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${-16 * pop(f, circle69, 12) * (1 - on(f, circle69 + 14, 8))})`}><CoinHQ x={360} y={GROUND} s={0.75} sign="CIRCLE" /></g>
        <g opacity={on(f, s69, 8)}><rect x={290} y={340} width={140} height={56} rx={14} fill={P.navy3} /><text x={360} y={380} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>2025</text></g>
        {(() => { const sl = on(f, large, 26)
          return <g>
            {/* # what Circle keeps */}
            <rect x={640} y={GROUND - 264} width={300} height={264 - 166} rx={14} fill={P.gold} transform={`translate(0 ${lerp(0, 166, sl)})`} />
            {/* # the part paid out: slides right to the apps */}
            <g transform={`translate(${lerp(0, 560, sl)} 0)`}><rect x={640} y={GROUND - 166} width={300} height={166} rx={14} fill="#F6D47A" stroke={P.goldD} strokeWidth={4} />
              <g opacity={on(f, d166, 8)}><Label x={790} y={GROUND - 60} text="$1.66B" size={58} font="Bebas Neue" color={P.navy2} /></g></g>
            <g opacity={on(f, d264, 8)}><rect x={630} y={GROUND - 274} width={320} height={274} rx={18} fill="none" stroke={P.goldInk} strokeWidth={4} strokeDasharray="12 8" /><Label x={790} y={GROUND - 300} text="$2.64B IN ALL" size={52} font="Bebas Neue" color={P.goldInk} /></g>
            <g opacity={on(f, large + 20, 8)}><Label x={790} y={GROUND + 70} text="CIRCLE KEEPS" size={48} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, distribution, 8)}><Label x={1350} y={GROUND + 70} text="DISTRIBUTION & TRANSACTION COSTS" size={42} font="Bebas Neue" color={P.ink2} /></g>
          </g> })()}
        {/* # the apps and partners that hand out the coins */}
        {[0, 1, 2].map((k) => <AppPhone key={k} x={1260 + k * 170} y={GROUND - 200} s={0.9} o={on(f, apps + k * 3, 8)} color={[P.sky, P.mint, P.coral][k]} />)}
        <g opacity={on(f, coins68, 8)}>{[0, 1, 2].map((k) => <SCoin key={k} x={1260 + k * 170} y={GROUND - 460} s={0.55} />)}</g>
      </g>}

      {/* # B) Coinbase and the deal */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${-16 * pop(f, cb71, 12) * (1 - on(f, cb71 + 14, 8))})`}><Exchange x={1560} y={GROUND} s={0.85} o={on(f, coinbase70, 10)} /></g>
        <CoinHQ x={300} y={GROUND} s={0.7} sign="CIRCLE" />
        {/* # one bar: all USDC — a part on Coinbase, the rest everywhere else */}
        <g opacity={on(f, usdc71, 10)}>
          <rect x={560} y={360} width={240} height={110} rx={14} fill="#2F5FD0" />
          <Label x={680} y={430} text="ON COINBASE" size={40} font="Bebas Neue" color="#FFFFFF" />
          <rect x={810} y={360} width={540} height={110} rx={14} fill={P.sky} opacity={on(f, left, 10) * 0.9 + 0.1} />
          <g opacity={on(f, everywhere, 8)}><Label x={1080} y={430} text="EVERYWHERE ELSE" size={40} font="Bebas Neue" color="#FFFFFF" /></g>
          {/* # the interest from each part: the Coinbase part's goes right; the rest splits in half */}
          {f >= sits && [0, 1].map((k) => { const fl = fly(f, sits + k * 6, [680, 480], [1500, 560], 22, 100); return fl.t < 1 ? <Gold key={k} x={fl.x} y={fl.y} r={20} o={fl.o} /> : null })}
          <g opacity={on(f, half, 8)}><line x1={1080} y1={350} x2={1080} y2={480} stroke="#FFFFFF" strokeWidth={6} strokeDasharray="10 8" /></g>
          {f >= half && [0, 1].map((k) => { const fl = fly(f, half + 4 + k * 6, [k ? 1220 : 940, 480], k ? [1500, 560] : [380, 560], 24, 100); return fl.t < 1 ? <Gold key={k} x={fl.x} y={fl.y} r={20} o={fl.o} /> : null })}
          <g opacity={on(f, half, 8)}><Label x={945} y={330} text="½ CIRCLE" size={50} font="Bebas Neue" color={P.ink} /><Label x={1215} y={330} text="½ COINBASE" size={50} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # Coinbase's pile */}
        <g opacity={on(f, reported, 10)}>
          <rect x={1735} y={GROUND - lerp(0, 220, on(f, d135, 24))} width={120} height={lerp(0, 220, on(f, d135, 24))} rx={12} fill={P.gold} />
          <g opacity={on(f, d135, 8)}><Label x={1795} y={GROUND - 250} text="$1.35B" size={52} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, revenue, 8)}><Label x={1560} y={GROUND + 70} text="STABLECOIN REVENUE" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # C) rewards, Maya's interest split, nothing for the holder */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {C1 > 0 && <g opacity={C1}>
          <AppPhone x={760} y={GROUND - 60} s={1.4} o={on(f, apps73, 8)} />
          <Label x={760} y={GROUND + 70} text="AN APP" size={48} font="Bebas Neue" color={P.ink2} />
          <Mini look="buyer" x={1300} y={GROUND} scale={1.1} frame={f} seed={77} mood={f >= reward ? 'happy' : 'neutral'} />
          <g opacity={on(f, customers, 8)}><Label x={1300} y={GROUND + 70} text="CUSTOMER" size={48} font="Bebas Neue" color={P.ink2} /></g>
          {f >= pass && [0, 1].map((k) => { const fl = fly(f, pass + k * 6, [760, GROUND - 380], [1300, GROUND - 330], 24, 120); return fl.t < 1 ? <Gold key={k} x={fl.x} y={fl.y} r={20} o={fl.o} /> : <Gold key={k} x={1280 + k * 40} y={GROUND - 300 + 20 * on(f, keeping, 10)} r={20 + 6 * on(f, keeping, 6) * (1 - on(f, keeping + 14, 8))} /> })}
          <g opacity={on(f, coin73, 8) * (1 - on(f, interest75 - 6, 6))}><rect x={1220} y={GROUND - 420} width={180} height={50} rx={12} fill={P.mint} /><text x={1310} y={GROUND - 384} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"' }}>REWARD</text></g>
          {/* # the app's choice: a switch flips on */}
          <g opacity={on(f, choice, 8)} transform="translate(760 360)"><rect x={-80} y={-36} width={160} height={72} rx={36} fill={on(f, choice + 6, 8) > 0.5 ? P.mint : '#C9D3E1'} /><circle cx={lerp(-44, 44, on(f, choice + 6, 8))} cy={0} r={28} fill="#FFFFFF" /></g>
        </g>}
        {C2 > 0 && <g opacity={C2}>
          {(() => { const beats: Beat[] = [[0, 'phone', 'neutral'], [person, 'idle', 'neutral'], [nothing, 'shrug', 'worried']]
            return <g>
              <Person f={f} who="investorF" beats={beats} x={360} y={GROUND} s={0.85} />
              <g opacity={on(f, maya75, 8)}><Label x={360} y={GROUND + 70} text="MAYA" size={48} font="Bebas Neue" color={P.ink2} /></g>
              {/* # her dollars' interest, splitting */}
              <g opacity={on(f, interest75, 8)}><circle cx={960} cy={420} r={70} fill={P.gold} /><circle cx={960} cy={420} r={50} fill="none" stroke={P.goldD} strokeWidth={5} /></g>
              <g opacity={on(f, circle75, 10)} transform={`translate(0 ${-16 * pop(f, company76b, 12) * (1 - on(f, company76b + 14, 8))})`}><CoinHQ x={1260} y={GROUND} s={0.62} sign="CIRCLE" /></g>
              <g opacity={on(f, app75, 10)}><AppPhone x={1640} y={GROUND} s={1.1} /><Label x={1640} y={GROUND + 70} text="HER APP" size={46} font="Bebas Neue" color={P.ink2} /></g>
              {f >= circle75 && (() => { const fl = fly(f, circle75, [960, 420], [1260, 520], 18, 80); return fl.t < 1 ? <Gold x={fl.x} y={fl.y} r={30} o={fl.o} /> : null })()}
              {f >= app75 && (() => { const fl = fly(f, app75, [960, 420], [1640, 640], 18, 80); return fl.t < 1 ? <Gold x={fl.x} y={fl.y} r={30} o={fl.o} /> : null })()}
              {/* # from the coin company to the holder: nothing */}
              <g opacity={on(f, pays76, 8)}>
                <Gold x={lerp(1160, 640, on(f, pays76, 16))} y={560} r={30} />
                <Cross x={640} y={560} o={on(f, nothing, 8)} size={52} />
              </g>
            </g> })()}
        </g>}
      </g>}
      <Vignette id="sc-share" />
    </g>
  )
}

const BEATS = ['s73:coin', "s69:distribution", "s71:coinbase", "s73:apps", "s73:keeping", "s76:company", 's67:264', 's68:pays', 's68:large', 's68:apps', 's68:partners', 's68:coins', 's69', 's69:circle', 's69:166', 's69:costs', 's70:coinbase', 's70:exchange', 's71:deal', 's71:usdc', 's71:sits', 's71:half', 's71:left', 's71:everywhere', 's72:reported', 's72:135', 's72:revenue', 's73:pass', 's73:customers', 's73:reward', 's74:choice', 's75:interest', "s75:maya's", 's75:circle', 's75:app', 's76:pays', 's76:person', 's76:nothing']
export const SC_SHARE = makePiece('sc-share', 'Stablecoin long ch5: Circle\'s $2.64B block — about $1.66B slides off to apps and partners (distribution and transaction costs); Coinbase deal as one bar: the interest on USDC held on Coinbase goes to Coinbase, the rest is split in half; Coinbase ~$1.35B stablecoin revenue 2025; an app passes some back as a reward (its choice); Maya\'s interest splits between Circle and her app; the coin company pays the holder nothing', {
  mood: 'light', Component: Share, beats: BEATS,
  sfx: [['s68:large', 'swish', 0.25], ['s69:166', 'thud', 0.25], ['s71:half', 'pop', 0.2], ['s72:135', 'cash', 0.25], ['s73:reward', 'coin', 0.25], ['s76:nothing', 'swish', 0.25]] })
