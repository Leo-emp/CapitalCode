// ---------------------------------------------------------------- s29–s46: step two — who gets paid first.
// A) Spotify doesn't own the songs: a shop with other makers' goods on the shelves; the till takes the money, most of it
//    flows back to the makers. A licence deal gets signed. The owners pop in on their names: a record label, a publisher's
//    songbook, a distributor van, a collecting-society office, an artist with a guitar; then podcasts and audiobooks.
// B) Lina presses play: coins stream from her phone to the owners. The accounts: a ledger line "COST OF REVENUE", note
//    "mostly royalties", €11.7B, 68¢. Lina's coin stack: two thirds of it fades away.
// C) Who gets it first: the label, then — through a contract — the artist; Spotify can't set that deal. A balance: "Spotify
//    pays out billions" vs "many artists earn little" — both true. Recap.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Van } from '../amazon/kit'
import { Contract, Euro, GREEN, Guitar, LabelHQ, MusicPhone, SongBook, SSpot, Stack } from './kit'

const GROUND = 900

const Owners: React.FC<PieceProps> = ({ f, c }) => {
  const step29 = c('s29:step'), who29 = c('s29:who'), first29 = c('s29:first')
  const doesnt30 = c("s30:doesn't"), own30 = c('s30:own'), songs = c('s30:songs')
  const shop = c('s31:shop'), sells31 = c('s31:sells'), products31 = c('s31:products'), collects = c('s31:collects'), till = c('s31:till'), belongs = c('s31:belongs'), goods = c('s31:goods')
  const signs = c('s32:signs'), licence = c('s32:licence'), deals = c('s32:deals'), rights = c('s32:rights')
  const labels33 = c('s33:labels'), publishers = c('s33:publishers'), distributors = c('s33:distributors'), societies = c('s33:societies'), artists33 = c('s33:artists'), directly = c('s33:directly')
  const podcasts = c('s34:podcasts'), audiobooks = c('s34:audiobooks'), paid34 = c('s34:paid')
  const lina35 = c('s35:lina'), presses = c('s35:presses'), owners35 = c('s35:owners'), share35 = c('s35:share')
  const accounts = c('s36:accounts'), payments36 = c('s36:payments'), cost36 = c('s36:cost'), revenue36 = c('s36:revenue')
  const royalty = c('s37:royalty'), distribution = c('s37:distribution'), streaming37 = c('s37:streaming')
  const y2025 = c('s38:2025'), d117 = c('s38:7'), euros38 = c('s38:euros')
  const d68 = c('s39:68'), cents39 = c('s39:cents')
  const picture = c('s40:picture'), stack40 = c('s40:stack'), before40 = c('s40:before'), thirds = c('s40:thirds'), gone = c('s40:gone')
  const notice = c('s41:notice'), labels41 = c('s41:labels'), singer = c('s41:singer')
  const artists42 = c('s42:artists'), label42 = c('s42:label#2'), deal42 = c('s42:deal'), signed42 = c('s42:signed#2')
  const deal43 = c('s43:deal'), reaches = c('s43:reaches'), set43 = c('s43:set')
  const hear = c('s44:hear'), billions44 = c('s44:billions'), little = c('s44:little'), true44 = c('s44:true')
  const argue = c('s45:argue'), deal45 = c('s45:deal'), matters = c('s45:matters')
  const step46 = c('s46:step'), owners46 = c('s46:owners'), cent = c('s46:cent')

  const AB = lina35 - 6, BC = notice - 6
  const A = win(f, step29 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, signs - 6, 10), A2 = on(f, signs - 6, 10)
  const B1 = 1 - on(f, picture - 6, 10), B2 = on(f, picture - 6, 10)
  const C1 = 1 - on(f, hear - 6, 10), C2 = on(f, hear - 6, 10) * (1 - on(f, step46 - 4, 10)), C3 = on(f, step46 - 4, 10)
  const OWN: [number, string, number][] = [[labels33, 'RECORD LABELS', 300], [publishers, 'PUBLISHERS', 680], [distributors, 'DISTRIBUTORS', 1060], [societies, 'COLLECTING SOCIETIES', 1440], [artists33, 'SOME ARTISTS', 1760]]

  return (
    <g>
      <Stage id="sp-owners" frame={f} />
      <SSpot f={f} at={d68} x={1400} y={520} rx={200} ry={200} />
      <SSpot f={f} at={gone} x={760} y={600} rx={160} ry={220} />
      <Headline f={f} lines={[[step29, 'STEP 2: WHO GETS PAID FIRST', P.ink, 100], [doesnt30, "SPOTIFY DOESN'T OWN THE SONGS", P.ink, 92], [shop, 'LIKE A SHOP', P.ink, 110], [signs, 'LICENCE DEALS', P.ink, 110], [labels33, 'THE RIGHTS OWNERS', P.ink, 104], [podcasts, 'PODCASTS & AUDIOBOOKS TOO', P.ink, 96], [presses, 'EVERY PLAY: A SHARE', P.ink, 104], [cost36, '"COST OF REVENUE"', P.ink, 110], [d117, '2025: ≈ €11.7 BILLION', P.ink, 100], [d68, '≈ 68¢ OF EVERY €1', P.ink, 110], [thirds, 'TWO THIRDS GONE', P.coralInk, 110], [notice, 'LABELS FIRST, NOT THE SINGER', P.ink, 96], [deal43, "THE ARTIST'S DEAL DECIDES", P.ink, 100], [true44, 'BOTH CAN BE TRUE', P.ink, 110], [step46, 'THE OWNERS GET PAID FIRST', P.ink, 100]]} />

      {/* # A) the shop; the deal; the owners */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          {/* # a shop with other makers' goods */}
          <g opacity={on(f, songs - 10, 8)} transform={`translate(700 ${GROUND})`}>
            <rect x={-300} y={-420} width={600} height={420} rx={14} fill="#F2E6CC" stroke="#C9B48A" strokeWidth={4} />
            <path d="M-320 -420 L320 -420 L300 -480 L-300 -480 Z" fill={GREEN} /><text y={-438} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>THE SHOP</text>
            {[0, 1, 2].map((r) => <g key={r}><rect x={-260} y={-370 + r * 110} width={520} height={10} fill="#C9B48A" />{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-240 + k * 100} y={-420 + r * 110} width={70} height={50} rx={6} fill={[P.coral, P.sky, '#9D7FD0', P.gold, P.mint][(k + r) % 5]} opacity={on(f, products31 + r * 3, 6)} />)}</g>)}
            <g opacity={on(f, collects, 8)} transform="translate(200 -40)"><rect x={-70} y={-60} width={140} height={60} rx={8} fill="#5A6680" /><text y={-20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 32px "Bebas Neue"' }}>TILL</text></g>
          </g>
          {/* # makers get most of it back */}
          <g opacity={on(f, belongs, 8)}>{[0, 1, 2].map((k) => <g key={k}><Mini look={['worker', 'owner', 'hero'][k]} x={1300 + k * 200} y={GROUND} scale={0.75} frame={f} seed={k + 60} mood="happy" />
            {(() => { const fl = fly(f, belongs + k * 5, [900, GROUND - 100], [1300 + k * 200, GROUND - 200], 18, 120); return fl.t < 1 ? <Euro x={fl.x} y={fl.y} r={22} /> : null })()}</g>)}
            <Label x={1500} y={GROUND + 56} text={f >= goods ? 'WHOEVER MADE THE GOODS' : 'THE MAKERS'} size={42} font="Bebas Neue" color={P.ink} /></g>
          <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [own30, 'shrug', 'thinking'], [till, 'point', 'smiling']]} x={180} y={GROUND} s={0.75} />
        </g>
        <g opacity={A2}>
          {/* # the licence deal */}
          <g opacity={1 - on(f, labels33 - 4, 10)}><Contract x={960} y={540} s={1.2} t="LICENCE" sign={span(f, licence, rights + 10)} /><Label x={960} y={GROUND + 40} text="THE PEOPLE WHO OWN THE RIGHTS" size={42} font="Bebas Neue" color={P.ink} /></g>
          {OWN.map(([at, t, x], k) => (
            <g key={k} opacity={on(f, at, 6) * (1 - on(f, podcasts - 4, 10) * 0.7)} transform={`translate(0 ${-20 * (1 - pop(f, at, 12))})`}>
              {k === 0 && <LabelHQ x={x} y={GROUND} s={0.7} f={f} t="RECORD LABEL" />}
              {k === 1 && <SongBook x={x} y={GROUND - 120} s={1} />}
              {k === 2 && <g transform={`translate(${x} ${GROUND})`}><Van x={0} y={0} s={0.55} /></g>}
              {k === 3 && <g transform={`translate(${x} ${GROUND})`}><rect x={-110} y={-200} width={220} height={200} rx={10} fill="#D9DFE8" /><path d="M-130 -200 L0 -260 L130 -200 Z" fill="#B8C6D9" />{[-60, 0, 60].map((cx) => <rect key={cx} x={cx - 14} y={-170} width={28} height={150} fill="#EEF3FA" />)}</g>}
              {k === 4 && <g><Mini look="hero" x={x - 30} y={GROUND} scale={0.8} frame={f} seed={77} mood="happy" /><Guitar x={x + 50} y={GROUND - 110} s={0.8} /></g>}
              <Label x={x} y={GROUND + 50} text={k === 4 && f >= directly ? 'ARTISTS, DIRECTLY' : t} size={36} font="Bebas Neue" color={P.ink} />
            </g>))}
          {/* # podcasts and audiobooks */}
          <g opacity={on(f, podcasts, 8)} transform={`translate(760 ${420 - 14 * pop(f, podcasts, 12)})`}><circle r={70} fill="#9D7FD0" /><rect x={-16} y={-44} width={32} height={60} rx={16} fill="#FFFFFF" /><path d="M-30 4 Q0 40 30 4 M0 30 L0 50" fill="none" stroke="#FFFFFF" strokeWidth={6} /><Label x={0} y={110} text="PODCASTS" size={40} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, audiobooks, 8)} transform={`translate(1160 ${420 - 14 * pop(f, audiobooks, 12)})`}><rect x={-60} y={-70} width={120} height={140} rx={8} fill={P.coral} /><rect x={-44} y={-54} width={88} height={20} rx={4} fill="#FFFFFF" /><Label x={0} y={110} text="AUDIOBOOKS" size={40} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, paid34, 8)}><Label x={960} y={260} text="THEIR OWNERS GET PAID TOO" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # B) every play; the accounts; the stack */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={B1}>
          <Person f={f} who="investorF" beats={[[0, 'phone', 'smiling'], [presses, 'phone', 'smiling']]} x={240} y={GROUND} s={0.8} />
          <MusicPhone x={480} y={560} s={0.8} f={f} playing={on(f, presses, 8)} />
          <LabelHQ x={1600} y={GROUND} s={0.75} f={f} t="RIGHTS OWNERS" />
          {f >= presses && Array.from({ length: 6 }, (_, k) => { const t = ((f - presses) / 40 + k / 6) % 1; return <Euro key={k} x={lerp(580, 1500, t)} y={560 - Math.sin(t * Math.PI) * 140} r={20} o={on(f, presses, 10) * (1 - on(f, accounts - 6, 10))} /> })}
          <g opacity={on(f, share35, 8) * (1 - on(f, accounts - 6, 10))}><Label x={1040} y={360} text="A SHARE OF EVERY PLAY" size={44} font="Bebas Neue" color={P.ink} /></g>
          {/* # the ledger */}
          <g opacity={on(f, accounts - 6, 10)} transform="translate(1000 520)">
            <rect x={-300} y={-220} width={600} height={440} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={4} />
            <text y={-160} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>SPOTIFY'S ACCOUNTS, 2025</text>
            {[-110, -60].map((ly) => <rect key={ly} x={-250} y={ly} width={500} height={14} rx={7} fill="#D9DFE8" />)}
            <g opacity={on(f, cost36, 8)}><rect x={-260} y={-20} width={520} height={80} rx={10} fill={P.coral} opacity={0.18 + 0.12 * pop(f, revenue36, 14)} /><text x={-240} y={34} fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>COST OF REVENUE</text>
              <text x={240} y={34} textAnchor="end" fill={P.coralInk} style={{ font: '400 46px "Bebas Neue"' }}>{f >= d117 ? '€11.7B' : ''}</text></g>
            <g opacity={on(f, c('s37:says'), 8)} transform={`translate(0 ${-8 * pop(f, c('s37:line'), 12)})`}><text y={110} textAnchor="middle" fill={P.ink2} style={{ font: '400 36px "Bebas Neue"' }}>{f >= streaming37 ? 'MOSTLY ROYALTIES & DISTRIBUTION FOR STREAMING' : 'MOSTLY ROYALTIES…'}</text></g>
            <g opacity={on(f, d68, 8)} transform={`translate(0 ${-8 * pop(f, c('s39:euro'), 12) - 8 * pop(f, c('s39:took'), 12)})`}><text y={180} textAnchor="middle" fill={P.coralInk} style={{ font: '400 50px "Bebas Neue"' }}>≈ 68¢ OF EVERY €1</text></g>
          </g>
        </g>
        <g opacity={B2}>
          {/* # Lina's coin stack: two thirds fades away */}
          <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [gone, 'shrug', 'shocked']]} x={300} y={GROUND} s={0.8} />
          <Stack x={760} y={GROUND - 20} n={15} left={lerp(1, 0.32, on(f, thirds, 24))} w={150} />
          {f >= before40 && Array.from({ length: 5 }, (_, k) => { const fl = fly(f, thirds + k * 4, [760, GROUND - 300 + k * 20], [1500, GROUND - 200], 18, 120); return fl.t < 1 ? <Euro key={k} x={fl.x} y={fl.y} r={24} /> : null })}
          <g opacity={on(f, stack40, 8)}><Label x={760} y={GROUND + 50} text="LINA'S PAYMENT" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, thirds, 8)}><LabelHQ x={1500} y={GROUND} s={0.7} f={f} t="MUSIC OWNERS" /></g>
          <g opacity={on(f, before40, 8) * (1 - on(f, thirds, 8))} transform={`translate(0 ${-10 * pop(f, c('s40:anything'), 12)})`}><Label x={1100} y={420} text="BEFORE SPOTIFY KEEPS ANYTHING…" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # C) labels first; the artist's deal; both true */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          <LabelHQ x={760} y={GROUND} s={0.85} f={f} t="RECORD LABEL" />
          {f >= labels41 && [0, 1, 2].map((k) => { const fl = fly(f, labels41 + k * 4, [240, 500], [760, GROUND - 280], 18, 120); return fl.t < 1 ? <Euro key={k} x={fl.x} y={fl.y} r={24} /> : null })}
          <g transform={`translate(0 ${-14 * pop(f, c('s41:first'), 12)})`}><Euro x={240} y={500} r={50} o={on(f, notice, 8) * (1 - on(f, labels41 + 10, 8))} /></g>
          <g opacity={on(f, c('s41:mostly'), 8) * (1 - on(f, singer, 8))}><Label x={760} y={GROUND + 50} text="MOSTLY THE LABELS" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, singer, 8)}><Mini look="hero" x={1450} y={GROUND} scale={0.95} frame={f} seed={88} mood="neutral" /><Guitar x={1530} y={GROUND - 120} s={0.85} /><Label x={1470} y={GROUND + 50} text="THE SINGER" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, label42, 8)}><Contract x={1120} y={480} s={0.9} t="ARTIST DEAL" sign={span(f, deal42, signed42 + 10)} /></g>
          {f >= label42 && [0].map((k) => { const fl = fly(f, label42 + 10, [860, GROUND - 260], [1440, GROUND - 260], 20, 100); return fl.t < 1 ? <Euro key={k} x={fl.x} y={fl.y} r={18} /> : null })}
          <g opacity={on(f, reaches, 8)}><Label x={1120} y={290} text="HOW MUCH REACHES THE ARTIST?" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, set43, 8)} transform="translate(300 420)"><rect x={-130} y={-40} width={260} height={80} rx={12} fill="#191F2E" /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"' }}>SPOTIFY DOESN'T SET IT</text></g>
        </g>
        <g opacity={C2}>
          {/* # a balance: both statements */}
          <g transform="translate(960 560)"><path d="M-40 300 L0 200 L40 300 Z" fill="#5A6680" /><line x1={-420} y1={0} x2={420} y2={0} stroke="#5A6680" strokeWidth={10} /><line x1={0} y1={0} x2={0} y2={200} stroke="#5A6680" strokeWidth={10} />
            <g opacity={on(f, billions44, 8)} transform="translate(-320 -20)"><rect x={-180} y={-90} width={360} height={90} rx={14} fill={GREEN} /><text y={-32} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 38px "Bebas Neue"' }}>SPOTIFY PAYS OUT BILLIONS</text></g>
            <g opacity={on(f, c('s44:many'), 8)} transform="translate(320 -20)"><rect x={-180} y={-90} width={360} height={90} rx={14} fill={P.coral} /><text y={-32} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 38px "Bebas Neue"' }}>MANY ARTISTS EARN LITTLE</text></g></g>
          <g opacity={on(f, c('s45:artists'), 8)} transform={`translate(0 ${-10 * pop(f, c('s45:streaming'), 12) - 10 * pop(f, matters, 12) - 10 * pop(f, c('s45:spotify'), 12) - 10 * pop(f, c('s45:pays'), 12)})`}><Label x={960} y={340} text={f >= matters ? "THE ARTIST'S DEAL MATTERS AS MUCH" : 'WHAT DO ARTISTS EARN?'} size={44} font="Bebas Neue" color={P.ink} /></g>
          <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [true44, 'present', 'smiling'], [argue, 'countA', 'thinking']]} x={200} y={GROUND} s={0.75} />
        </g>
        <g opacity={C3}>
          <Stack x={600} y={GROUND - 20} n={15} left={lerp(1, 0.32, on(f, c('s46:money'), 20))} w={150} />
          <g transform={`translate(0 ${-12 * pop(f, c("s46:music's"), 12)})`}><LabelHQ x={1300} y={GROUND} s={0.85} f={f} t="MUSIC OWNERS" /></g>
          <g opacity={on(f, owners46, 8)}><Label x={1300} y={GROUND + 50} text="PAID FIRST" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, cent, 8)}><Label x={600} y={GROUND + 50} text="WHAT'S LEFT FOR SPOTIFY" size={42} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}
      <Vignette id="sp-owners" />
    </g>
  )
}

const BEATS = ['s40:anything', 's44:many', 's39:euro', 's39:took', 's41:first', 's41:mostly', 's37:says', 's37:line', 's45:artists', 's45:streaming', 's45:spotify', 's45:pays', 's46:money', "s46:music's", 's29:step', 's29:who', 's29:first', "s30:doesn't", 's30:own', 's30:songs', 's31:shop', 's31:sells', 's31:products', 's31:collects', 's31:till', 's31:belongs', 's31:goods', 's32:signs', 's32:licence', 's32:deals', 's32:rights', 's33:labels', 's33:publishers', 's33:distributors', 's33:societies', 's33:artists', 's33:directly', 's34:podcasts', 's34:audiobooks', 's34:paid', 's35:lina', 's35:presses', 's35:owners', 's35:share', 's36:accounts', 's36:payments', 's36:cost', 's36:revenue', 's37:royalty', 's37:distribution', 's37:streaming', 's38:2025', 's38:7', 's38:euros', 's39:68', 's39:cents', 's40:picture', 's40:stack', 's40:before', 's40:thirds', 's40:gone', 's41:notice', 's41:labels', 's41:singer', 's42:artists', 's42:label#2', 's42:deal', 's42:signed#2', 's43:deal', 's43:reaches', 's43:set', 's44:hear', 's44:billions', 's44:little', 's44:true', 's45:argue', 's45:deal', 's45:matters', 's46:step', 's46:owners', 's46:cent']
export const SP_OWNERS = makePiece('sp-owners', 'Spotify long step 2: Spotify doesn\'t own the songs, like a shop selling other makers\' goods whose money mostly goes back to the makers; it signs licence deals with rights owners: record labels, publishers, distributors, collecting societies and some artists directly, plus podcasts and audiobooks; every play owes them a share; in its accounts that is cost of revenue, mostly royalties and distribution, about €11.7 billion or 68 cents of every euro in 2025; two thirds of Lina\'s coin stack is gone before Spotify keeps anything; labels get paid first and pay the singer through the artist deal Spotify doesn\'t set; Spotify pays out billions and many artists earn little, both true', {
  mood: 'light', Component: Owners, beats: BEATS,
  sfx: [['s31:collects', 'coin', 0.15], ['s32:licence', 'swish', 0.2], ['s33:labels', 'pop', 0.15], ['s35:presses', 'pop', 0.2], ['s36:cost', 'pop', 0.2], ['s39:68', 'thud', 0.25], ['s40:thirds', 'coin', 0.2], ['s42:deal', 'swish', 0.15], ['s44:true', 'pop', 0.2]] })
