// ---------------------------------------------------------------- s1–s11: the hook.
// A) The store building; parcels pile up beside it ("$717B of sales"). A doorstep parcel with a profit coin over it that
//    gets crossed out ("most of its profit didn't come from the boxes"). The ground slab lifts: servers humming in the
//    basement ("a part most shoppers never see"). A sales bar: 82% store / 18% servers; a profit bar: 43% / 57%; 2022: the
//    server bar towers over the whole-company bar.
// B) Operating profit, with a lemonade stand: coins come in from a customer; cups, lemons and rent each take coins away;
//    the coin that's left glows "operating profit".
// C) The business behind the business: the store with its basement lit; the four step icons.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Coin2 } from '../uber/kit'
import { ASpot, Parcel, Rack, TwoFloor } from './kit'

const GROUND = 820

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const sold = c('s1:sold'), d717 = c('s1:717'), stuff = c('s1:stuff'), y2025a = c('s1:2025')
  const most2 = c('s2:most'), profit2 = c('s2:profit'), didnt = c("s2:didn't"), boxes2 = c('s2:boxes'), doorstep = c('s2:doorstep')
  const part3 = c('s3:part'), never3 = c('s3:never'), see3 = c('s3:see'), makes3 = c('s3:makes'), fifth = c('s3:fifth'), sales3 = c('s3:sales')
  const hidden4 = c('s4:hidden'), d57 = c('s4:57'), operating4 = c('s4:operating')
  const y2022 = c('s5:2022'), stranger = c('s5:stranger'), more5 = c('s5:more'), whole5 = c('s5:whole'), company5 = c('s5:company')
  const what6 = c('s6:what'), why6 = c('s6:why'), store6 = c('s6:store')
  const first7 = c('s7:first'), word7 = c('s7:word'), operating7 = c('s7:operating')
  const money8 = c('s8:money'), left8 = c('s8:left'), paying = c('s8:paying'), products = c('s8:products'), staff = c('s8:staff'), buildings = c('s8:buildings'), delivery8 = c('s8:delivery'), before8 = c('s8:before'), taxes8 = c('s8:taxes')
  const lemonade = c('s9:lemonade'), cups = c('s9:cups'), lemons = c('s9:lemons'), rent9 = c('s9:rent'), whats = c("s9:what's"), profit9 = c('s9:profit')
  const story = c('s10:story'), behind = c('s10:behind')
  const four = c('s11:four'), store11 = c('s11:store'), hidden11 = c('s11:hidden'), split11 = c('s11:split'), pays11 = c('s11:pays')

  const AB = what6 - 6, BC = story - 6
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, hidden4 - 30, 10), A2 = on(f, hidden4 - 30, 10)
  const open = on(f, part3, 20)

  return (
    <g>
      <Stage id="az-hook" frame={f} />
      <ASpot f={f} at={never3} x={700} y={GROUND + 100} rx={230} ry={120} />
      <ASpot f={f} at={d57} x={1300} y={560} rx={200} ry={160} />
      <Headline f={f} lines={[[d717, '2025: ≈ $717 BILLION OF SALES', P.ink, 96], [didnt, 'BUT MOST PROFIT ISN\'T FROM BOXES', P.ink, 88], [never3, 'A PART YOU NEVER SEE', P.ink, 104], [fifth, 'UNDER 1/5 OF THE SALES', P.ink, 104], [d57, '≈ 57% OF OPERATING PROFIT', P.ink, 100], [y2022, '2022: MORE THAN THE WHOLE COMPANY', P.ink, 88], [why6, 'WHAT IS IT?', P.ink, 110], [operating7, 'OPERATING PROFIT', P.ink, 110], [lemonade, 'LIKE A LEMONADE STAND', P.ink, 104], [story, 'THE BUSINESS BEHIND THE BUSINESS', P.ink, 92], [four, '4 SIMPLE STEPS', P.ink, 110]]} />

      {/* # A) the store, the doorstep, the basement, the bars */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <TwoFloor x={700} y={GROUND} s={0.9} f={f} open={open} />
          {/* # parcels pile up beside the store */}
          {Array.from({ length: 9 }, (_, k) => <g key={k} opacity={on(f, sold + k * 3, 5) * (1 - on(f, most2, 10))}><Parcel x={1200 + (k % 3) * 130} y={GROUND - Math.floor(k / 3) * 95} s={0.95} /></g>)}
          <g opacity={on(f, d717, 8) * (1 - on(f, most2, 10))} transform={`translate(1330 ${GROUND - 380 - 16 * pop(f, d717, 12)})`}><rect x={-150} y={-44} width={300} height={88} rx={14} fill={P.navy3} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>{f >= stuff ? '$717B SALES' : '$717B'}</text></g>
          <g opacity={on(f, y2025a, 8) * (1 - on(f, most2, 10))}><Label x={1330} y={GROUND - 450} text="2025" size={44} font="Bebas Neue" color={P.ink2} /></g>
          {/* # the doorstep */}
          <g opacity={on(f, most2, 8) * (1 - on(f, makes3 - 4, 10))}>
            <rect x={1220} y={GROUND - 300} width={260} height={300} rx={8} fill="#B5523E" /><circle cx={1440} cy={GROUND - 150} r={10} fill={P.gold} />
            <rect x={1180} y={GROUND - 20} width={340} height={20} fill="#8A97AA" />
            <Parcel x={1300} y={GROUND - 20} s={1} />
            <Mini look="buyer" x={1620} y={GROUND} scale={0.9} frame={f} seed={4} mood="happy" />
            <g opacity={on(f, profit2, 8)} transform={`translate(1300 ${GROUND - 220 - 14 * pop(f, profit2, 12)})`}><Coin2 x={0} y={0} r={40} t="$" />
              <path d="M-50 -50 L50 50 M50 -50 L-50 50" stroke={P.coralInk} strokeWidth={12} strokeLinecap="round" opacity={on(f, didnt, 6)} /></g>
            <g opacity={on(f, doorstep, 8)}><Label x={1350} y={GROUND + 60} text="YOUR DOORSTEP" size={42} font="Bebas Neue" color={P.ink} /></g>
          </g>
          {/* # a sales bar: 82 / 18 */}
          <g opacity={on(f, makes3 - 4, 10)} transform="translate(1180 360)">
            <rect x={0} y={0} width={lerp(0, 560, on(f, makes3, 18))} height={70} rx={10} fill="#E9A23B" />
            <rect x={560 * 0.82} y={0} width={lerp(0, 560 * 0.18, on(f, fifth, 14))} height={70} rx={10} fill="#1F2B4A" />
            <text x={0} y={-16} fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>SALES</text>
            <g opacity={on(f, sales3, 8)}><text x={230} y={48} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>STORE 82%</text><text x={510} y={110} textAnchor="middle" fill="#1F2B4A" style={{ font: '400 40px "Bebas Neue"' }}>18%</text></g>
          </g>
          <g opacity={open}><Label x={700} y={GROUND + 240} text="SERVERS, OUT OF SIGHT" size={40} font="Bebas Neue" color="#FFFFFF" /></g>
        </g>
        <g opacity={A2}>
          {/* # the profit bar 43 / 57, then 2022 */}
          <g opacity={1 - on(f, y2022 - 4, 10)} transform="translate(360 300)">
            <text x={0} y={-16} fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>SALES</text>
            <rect x={0} y={0} width={1200} height={80} rx={10} fill="#E9A23B" /><rect x={1200 * 0.82} y={0} width={1200 * 0.18} height={80} rx={10} fill="#1F2B4A" />
            <text x={490} y={54} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>STORE 82%</text><text x={1092} y={54} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>18%</text>
            <g opacity={on(f, hidden4, 8)}><text x={0} y={204} fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>OPERATING PROFIT</text>
              <rect x={0} y={220} width={lerp(0, 1200, on(f, hidden4, 18))} height={80} rx={10} fill="#E9A23B" />
              <rect x={1200 * 0.43} y={220} width={lerp(0, 1200 * 0.57, on(f, d57, 18))} height={80} rx={10} fill="#1F2B4A" />
              <g opacity={on(f, d57, 8)}><text x={258} y={274} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>STORE 43%</text><text x={858} y={274} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>THE HIDDEN PART 57%</text></g></g>
            <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [hidden4, 'point', 'smiling'], [d57, 'shrug', 'shocked'], [operating4, 'think', 'thinking']]} x={1400} y={GROUND - 300} s={0.75} flip />
          </g>
          <g opacity={on(f, y2022 - 4, 10)}>
            <g transform={`translate(960 ${300 - 14 * pop(f, y2022, 12)})`}><rect x={-100} y={-44} width={200} height={88} rx={12} fill={P.navy3} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>2022</text></g>
            <rect x={620} y={GROUND - lerp(0, 22.8 * 18, on(f, more5, 18))} width={220} height={lerp(0, 22.8 * 18, on(f, more5, 18))} rx={12} fill="#1F2B4A" />
            <Label x={730} y={GROUND + 56} text="THE HIDDEN PART" size={42} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, whole5, 8)}><rect x={1080} y={GROUND - lerp(0, 12.2 * 18, on(f, whole5, 18))} width={220} height={lerp(0, 12.2 * 18, on(f, whole5, 18))} rx={12} fill="#E9A23B" />
              <Label x={1190} y={GROUND + 56} text="ALL OF AMAZON" size={42} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, company5, 8)}><Label x={730} y={GROUND - 22.8 * 18 - 30} text="$22.8B" size={48} font="Bebas Neue" color={P.navy0} /><Label x={1190} y={GROUND - 12.2 * 18 - 30} text="$12.2B" size={48} font="Bebas Neue" color={P.goldInk} /></g>
            <g opacity={on(f, stranger, 8)}><Person f={f} who="buyer" beats={[[0, 'idle', 'thinking'], [more5, 'shrug', 'shocked']]} x={300} y={GROUND} s={0.8} /></g>
          </g>
        </g>
      </g>}

      {/* # B) operating profit: the lemonade stand */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, lemonade - 6, 10)}>
          <TwoFloor x={600} y={GROUND} s={0.8} f={f} open={1} />
          <g opacity={on(f, why6, 8) * (1 - on(f, money8, 8))} transform={`translate(1350 ${520 - 16 * pop(f, why6, 12)})`}><circle r={80} fill={P.gold} /><text y={34} textAnchor="middle" fill={P.navy0} style={{ font: '400 110px "Bebas Neue"' }}>?</text></g>
          <g opacity={on(f, word7, 8)} transform={`translate(1350 ${GROUND - 60})`}><rect x={-230} y={-50} width={460} height={100} rx={16} fill={P.mint} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>OPERATING PROFIT</text></g>
        </g>
        <g opacity={on(f, lemonade - 6, 10)}>
          {/* # the stand */}
          <g transform={`translate(760 ${GROUND})`}>
            <rect x={-200} y={-180} width={400} height={180} rx={10} fill="#F2E6CC" stroke="#C9B48A" strokeWidth={4} />
            <path d="M-230 -180 L230 -180 L200 -250 L-200 -250 Z" fill="#E9C25A" />{[-170, -90, -10, 70, 150].map((sx) => <rect key={sx} x={sx} y={-250} width={30} height={70} fill="#FFFFFF" opacity={0.5} />)}
            <text y={-90} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>LEMONADE</text>
            <path d="M-120 -230 L-90 -180 M120 -230 L90 -180" stroke="#C9B48A" strokeWidth={8} />
          </g>
          <Person f={f} who="hero" beats={[[0, 'present', 'smiling'], [cups, 'countA', 'thinking'], [whats, 'celebrate', 'smiling']]} x={500} y={GROUND} s={0.75} />
          <Mini look="buyer" x={1080} y={GROUND} scale={0.85} frame={f} seed={9} mood="happy" />
          {/* # coins in, then cups, lemons and rent each take some */}
          {f >= lemonade && [0, 1, 2, 3, 4].map((k) => { const fl = fly(f, lemonade + k * 4, [1080, GROUND - 200], [760 + (k - 2) * 50, GROUND - 320], 16, 100)
            const away = [cups, lemons, rent9, -1, -1][k], gone = away > 0 ? on(f, away, 14) : 0
            const tx = [1300, 1500, 1700, 0, 0][k]
            return <g key={k} opacity={1 - (away > 0 ? on(f, away + 14, 6) : 0)}><Coin2 x={lerp(fl.x, tx || fl.x, gone)} y={lerp(fl.y, 360, gone)} r={26} t="$" /></g> })}
          {([[cups, 'CUPS', 1300], [lemons, 'LEMONS', 1500], [rent9, 'RENT', 1700]] as [number, string, number][]).map(([at, t, x], k) => <g key={k} opacity={on(f, at, 6)} transform={`translate(${x} 300)`}><rect x={-80} y={-36} width={160} height={72} rx={12} fill={P.coral} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>{t}</text></g>)}
          <g opacity={on(f, whats, 8)} transform={`translate(760 ${GROUND - 320})`}><circle r={80} fill={P.mint} opacity={0.25} /><Label x={0} y={-100} text={f >= profit9 ? 'OPERATING PROFIT' : "WHAT'S LEFT"} size={46} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        {/* # before: the definition chips */}
        <g opacity={on(f, money8, 8) * (1 - on(f, lemonade - 6, 10))}>
          {([[products, 'PRODUCTS'], [staff, 'STAFF'], [buildings, 'BUILDINGS'], [delivery8, 'DELIVERY']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={on(f, at, 6)} transform={`translate(${1150 + (k % 2) * 260} ${300 + Math.floor(k / 2) * 90})`}><rect x={-110} y={-32} width={220} height={64} rx={12} fill={P.coral} /><text y={12} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 38px "Bebas Neue"' }}>{`− ${t}`}</text></g>)}
          <g opacity={on(f, before8, 8)}><Label x={1280} y={530} text={f >= taxes8 ? 'BEFORE TAXES' : 'BEFORE…'} size={42} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # C) the business behind the business; four steps */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, four - 6, 10)}>
          <TwoFloor x={960} y={GROUND} s={1} f={f} open={1} />
          <g opacity={on(f, behind, 8)} transform={`translate(0 ${-12 * pop(f, c('s10:business#2'), 12) - 10 * pop(f, c('s11:follow'), 12)})`}><path d="M1300 900 L1400 960" stroke={P.ink2} strokeWidth={5} /><Label x={1420} y={980} text="BEHIND THE BUSINESS" size={40} font="Bebas Neue" color={P.ink} anchor="start" /></g>
        </g>
        <g opacity={on(f, four - 6, 10)}>
          {([[store11, 'THE STORE', P.coral], [hidden11, 'THE HIDDEN BUSINESS', '#1F2B4A'], [split11, 'THE SPLIT', P.gold], [pays11, 'WHY IT PAYS', P.mint]] as [number, string, string][]).map(([at, t, col], k) => {
            const x = 300 + k * 440
            return <g key={k} opacity={on(f, Math.min(at, four + k * 6), 8)} transform={`translate(${x} ${GROUND - 120 - 20 * pop(f, at, 14)})`}>
              {k === 0 && <g transform="translate(0 -80)"><Parcel x={0} y={0} s={1} /></g>}
              {k === 1 && <g transform="translate(0 -60) scale(0.55)"><Rack x={0} y={0} f={f} /></g>}
              {k === 2 && <g><rect x={-90} y={-170} width={60} height={100} rx={8} fill="#E9A23B" /><rect x={30} y={-200} width={60} height={130} rx={8} fill="#1F2B4A" /></g>}
              {k === 3 && <g transform="translate(0 -120)"><Coin2 x={0} y={0} r={48} t="$" /></g>}
              <circle cx={0} cy={40} r={36} fill={col} /><text x={0} y={58} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{k + 1}</text>
              <Label x={0} y={130} text={t} size={42} font="Bebas Neue" color={P.ink} />
            </g> })}
        </g>
      </g>}
      <Vignette id="az-hook" />
    </g>
  )
}

const BEATS = ['s10:business#2', 's11:follow', 's1:sold', 's1:717', 's1:stuff', 's1:2025', 's2:most', 's2:profit', "s2:didn't", 's2:boxes', 's2:doorstep', 's3:part', 's3:never', 's3:see', 's3:makes', 's3:fifth', 's3:sales', 's4:hidden', 's4:57', 's4:operating', 's5:2022', 's5:stranger', 's5:more', 's5:whole', 's5:company', 's6:what', 's6:why', 's6:store', 's7:first', 's7:word', 's7:operating', 's8:money', 's8:left', 's8:paying', 's8:products', 's8:staff', 's8:buildings', 's8:delivery', 's8:before', 's8:taxes', 's9:lemonade', 's9:cups', 's9:lemons', 's9:rent', "s9:what's", 's9:profit', 's10:story', 's10:behind', 's11:four', 's11:store', 's11:hidden', 's11:split', 's11:pays']
export const AZ_HOOK = makePiece('az-hook', 'Amazon long hook: the store building with parcels piling up ($717B of sales in 2025); a doorstep parcel whose profit coin gets crossed out; the ground lifts to show servers in the basement, a part shoppers never see; sales bar 82% store / 18% hidden part; operating profit bar 43% / 57%; 2022: the hidden part $22.8B vs all of Amazon $12.2B; operating profit explained with a lemonade stand (cups, lemons and rent take coins, what is left is operating profit); the business behind the business; four steps', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:717', 'pop', 0.25], ["s2:didn't", 'swish', 0.2], ['s3:part', 'whoosh', 0.25], ['s4:57', 'pop', 0.25], ['s5:2022', 'thud', 0.25], ['s7:operating', 'pop', 0.2], ['s9:cups', 'coin', 0.15], ["s9:what's", 'pop', 0.2], ['s11:four', 'pop', 0.25]] })
