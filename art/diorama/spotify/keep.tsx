// ---------------------------------------------------------------- s47–s61: step three — what Spotify keeps.
// A) A €1 coin split into slices: 68¢ to music (gone), 32¢ left. Not profit yet: three workers take from the 32¢ —
//    an engineer at a laptop (€1.4B building the app), a marketer with a megaphone (€1.4B marketing), an office (€0.5B
//    running the company) — about 19¢. What's left: about 13¢, €2.2B operating profit in 2025.
// B) Lina's payment: a bar split two thirds / a fifth / an eighth. A made-up €10 note: €6.80 music, €1.90 running,
//    €1.30 profit; the last coin is small but becomes billions across €17B.
// C) The catch: for years nothing was left: red operating-loss bars 2022 (−€659M) and 2023 (−€446M); money in, more than
//    all of it out. Recap: about a third kept, most of it pays for running the company.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Euro, GREEN, LabelHQ, SSpot } from './kit'

const GROUND = 900

const Keep: React.FC<PieceProps> = ({ f, c }) => {
  const step47 = c('s47:step'), keeps47 = c('s47:keeps')
  const paying48 = c('s48:paying'), music48 = c('s48:music'), d32 = c('s48:32'), left48 = c('s48:left')
  const isnt = c("s49:isn't"), profit49 = c('s49:profit')
  const d32b = c('s50:32'), engineers = c('s50:engineers'), build = c('s50:build'), marketing = c('s50:marketing'), users50 = c('s50:users'), offices = c('s50:offices'), company50 = c('s50:company')
  const costs51 = c('s51:costs'), d19 = c('s51:19'), euro51 = c('s51:euro')
  const spent52 = c('s52:spent'), d14a = c('s52:4'), building52 = c('s52:building'), d14b = c('s52:4#2'), marketing52 = c('s52:marketing'), half52 = c('s52:half'), running52 = c('s52:running')
  const whats = c("s53:what's"), operating53 = c('s53:operating'), d13 = c('s53:13'), d22 = c('s53:2#2'), y2025 = c('s53:2025')
  const linas = c("s54:lina's"), thirds = c('s54:thirds'), fifth = c('s54:fifth'), eighth = c('s54:eighth'), operating54 = c('s54:operating')
  const picture = c('s55:picture'), d10 = c('s55:10'), d680 = c('s55:80'), music55 = c('s55:music'), d190 = c('s55:90'), d130 = c('s55:30'), left55 = c('s55:left')
  const last56 = c('s56:last'), small = c('s56:small'), d17 = c('s56:17'), adds = c('s56:adds'), billions56 = c('s56:billions')
  const catch57 = c('s57:catch'), years57 = c('s57:years'), nothing57 = c('s57:nothing'), end57 = c('s57:end')
  const bill58 = c('s58:bill'), big58 = c('s58:big'), growth = c('s58:growth'), coin58 = c('s58:coin'), disappearing = c('s58:disappearing')
  const y2022 = c('s59:2022'), loss59 = c('s59:loss'), d659 = c('s59:659'), y2023 = c('s59:2023'), d446 = c('s59:446')
  const came60 = c('s60:came'), more60 = c('s60:more'), went60 = c('s60:went')
  const step61 = c('s61:step'), third61 = c('s61:third'), running61 = c('s61:running')

  const AB = linas - 6, BC = catch57 - 6
  const A = win(f, step47 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const B1 = 1 - on(f, picture - 6, 10), B2 = on(f, picture - 6, 10)
  const C1 = 1 - on(f, step61 - 4, 10), C2 = on(f, step61 - 4, 10)
  // # the euro bar: 680 px music, 190 px running costs, 130 px profit (out of 1000)
  const BX = 460, BW = 1000

  return (
    <g>
      <Stage id="sp-keep" frame={f} />
      <SSpot f={f} at={d13} x={BX + BW - 65} y={420} rx={140} ry={140} />
      <SSpot f={f} at={d130} x={1500} y={460} rx={160} ry={160} />
      <Headline f={f} lines={[[step47, 'STEP 3: WHAT SPOTIFY KEEPS', P.ink, 100], [d32, '≈ 32¢ LEFT AFTER THE MUSIC', P.ink, 96], [isnt, 'NOT PROFIT YET', P.ink, 110], [d19, 'RUNNING COSTS: ≈ 19¢', P.ink, 104], [d13, 'OPERATING PROFIT: ≈ 13¢', P.mintInk, 100], [linas, "LINA'S PAYMENT", P.ink, 110], [d10, 'A MADE-UP €10', P.ink, 110], [small, 'A SMALL LAST COIN…', P.ink, 104], [billions56, '…THAT ADDS UP TO BILLIONS', P.mintInk, 96], [catch57, 'THE CATCH', P.ink, 110], [d659, 'YEARS OF OPERATING LOSSES', P.coralInk, 96], [step61, 'ABOUT A THIRD KEPT', P.ink, 110]]} />

      {/* # A) €1 split: music, running costs, profit */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={on(f, keeps47, 8)}>
          <text x={BX - 30} y={445} textAnchor="end" fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>€1</text>
          <rect x={BX} y={380} width={BW * 0.68} height={100} rx={12} fill="#9D7FD0" opacity={1 - on(f, d32, 14) * 0.65} />
          <text x={BX + 340} y={445} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>68¢ MUSIC</text>
          <rect x={BX + BW * 0.68} y={380} width={BW * 0.32} height={100} rx={12} fill={P.gold} opacity={on(f, music48, 8)} />
          <g opacity={on(f, d32, 8) * (1 - on(f, d19, 8))}><text x={BX + BW * 0.84} y={445} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>32¢</text></g>
          {/* # the 19¢ running-cost slice and the 13¢ profit slice */}
          <rect x={BX + BW * 0.68} y={380} width={BW * 0.19} height={100} rx={12} fill={P.coral} opacity={on(f, costs51, 10)} />
          <g opacity={on(f, d19, 8)}><text x={BX + BW * 0.775} y={445} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>19¢</text></g>
          <rect x={BX + BW * 0.87} y={380} width={BW * 0.13} height={100} rx={12} fill={P.mint} opacity={on(f, whats, 10)} />
          <g opacity={on(f, d13, 8)} transform={`translate(0 ${-8 * pop(f, c('s53:euro'), 12)})`}><text x={BX + BW * 0.935} y={445} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>13¢</text></g>
          <g opacity={on(f, d22, 8)} transform={`translate(${BX + BW * 0.935} ${560 - 14 * pop(f, d22, 12)})`}><rect x={-150} y={-40} width={300} height={80} rx={14} fill={P.mint} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>{f >= y2025 ? '€2.2B IN 2025' : '€2.2B'}</text></g>
        </g>
        {/* # who takes the running costs */}
        <g opacity={on(f, c('s52:2025'), 8) * (1 - on(f, whats - 4, 10))} transform={`translate(1620 ${330 - 12 * pop(f, c('s52:spent'), 12)})`}><rect x={-80} y={-34} width={160} height={68} rx={12} fill={P.navy3} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>2025</text></g>
        <g opacity={on(f, c('s52:app'), 8) * (1 - on(f, whats - 4, 10))}><Label x={520} y={GROUND - 320} text="THE APP" size={38} font="Bebas Neue" color={P.ink2} /></g>
        {([[engineers, 'BUILDING THE APP', d14a, '≈ €1.4B', 520], [marketing, 'MARKETING', d14b, '≈ €1.4B', 900], [offices, 'RUNNING THE COMPANY', half52, '≈ €0.5B', 1280]] as [number, string, number, string, number][]).map(([at, t, vat, v, x], k) => (
          <g key={k} opacity={on(f, at, 6) * (1 - on(f, whats - 4, 10))}>
            {k === 0 && <g><Mini look="worker" x={x - 40} y={GROUND} scale={0.8} frame={f} seed={91} mood="happy" /><g transform={`translate(${x + 50} ${GROUND - 70})`}><rect x={-40} y={-30} width={80} height={50} rx={6} fill="#2B3A55" /><rect x={-50} y={20} width={100} height={8} rx={4} fill="#2B3A55" /></g></g>}
            {k === 1 && <g><Mini look="hero" x={x - 40} y={GROUND} scale={0.8} frame={f} seed={92} mood="happy" /><g transform={`translate(${x + 50} ${GROUND - 120})`}><path d="M-30 -20 L30 -40 L30 40 L-30 20 Z" fill={P.coral} /><rect x={-44} y={-20} width={16} height={40} rx={4} fill={P.coral} /></g></g>}
            {k === 2 && <g transform={`translate(${x} ${GROUND})`}><rect x={-80} y={-200} width={160} height={200} rx={8} fill="#8A97AA" />{[0, 1, 2].map((r) => [0, 1].map((cc) => <rect key={`${r}${cc}`} x={-56 + cc * 62} y={-180 + r * 56} width={50} height={36} rx={4} fill="#EEF3FA" />))}</g>}
            <Label x={x} y={GROUND + 50} text={t} size={36} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, vat, 8)}><Label x={x} y={GROUND - 260} text={v} size={46} font="Bebas Neue" color={P.coralInk} /></g>
            {(() => { const fl = fly(f, at + 4, [BX + BW * 0.775, 480], [x, GROUND - 200], 16, 60); return fl.t < 1 && f >= at + 4 ? <Euro x={fl.x} y={fl.y} r={20} /> : null })()}
          </g>))}
        <g opacity={on(f, operating53, 8)}><Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [d13, 'point', 'smiling']]} x={1620} y={GROUND} s={0.75} /></g>
      </g>}

      {/* # B) Lina's payment shares; the made-up €10 */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={B1}>
          <Person f={f} who="investorF" beats={[[0, 'phone', 'smiling'], [thirds, 'countA', 'thinking']]} x={250} y={GROUND} s={0.8} />
          <rect x={460} y={460} width={lerp(0, 1000 * 0.68, on(f, linas + 6, 30))} height={110} rx={12} fill="#9D7FD0" /><g opacity={on(f, thirds + 6, 8)}><text x={800} y={530} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>≈ 2/3 THE MUSIC</text></g>
          <rect x={1140} y={460} width={lerp(0, 1000 * 0.19, on(f, fifth, 14))} height={110} rx={12} fill={P.coral} /><g opacity={on(f, fifth + 6, 8)}><text x={1235} y={530} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>≈ 1/5</text><Label x={1235} y={650} text="RUNS THE COMPANY" size={36} font="Bebas Neue" color={P.ink} /></g>
          <rect x={1330} y={460} width={lerp(0, 1000 * 0.13, on(f, eighth, 14))} height={110} rx={12} fill={P.mint} /><g opacity={on(f, eighth + 6, 8)}><text x={1395} y={530} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>≈ 1/8</text><Label x={1395} y={420} text="OPERATING PROFIT" size={36} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={B2}>
          {/* # the made-up €10 note splitting */}
          <g transform={`translate(560 ${480})`}><rect x={-170} y={-70} width={340} height={140} rx={14} fill="#7FC98F" opacity={1 - on(f, d680, 10) * 0.5} /><text y={28} textAnchor="middle" fill="#245C3A" style={{ font: '400 90px "Bebas Neue"' }}>€10</text></g>
          {([[d680, '€6.80', 'MUSIC', '#9D7FD0', 900], [d190, '€1.90', 'RUNNING THE COMPANY', P.coral, 1200], [d130, '€1.30', 'OPERATING PROFIT', P.mint, 1500]] as [number, string, string, string, number][]).map(([at, v, t, col, x], k) => {
            const fl = fly(f, at - 6, [560, 480 - (k === 1 ? 12 * pop(f, c('s55:run'), 12) + 12 * pop(f, c('s55:company'), 12) : 0)], [x, 480 - (k === 1 ? 12 * pop(f, c('s55:run'), 12) + 12 * pop(f, c('s55:company'), 12) : 0)], 16, 80)
            return f >= at - 6 ? <g key={k}><g transform={`translate(${fl.x} ${fl.y})`}><rect x={-110} y={-50} width={220} height={100} rx={14} fill={col} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>{v}</text></g><g opacity={on(f, at + 6, 8)}><Label x={x} y={600} text={t} size={34} font="Bebas Neue" color={P.ink} /></g></g> : null })}
          <g opacity={on(f, last56, 8)} transform={`translate(1500 ${760 - 14 * pop(f, small, 12)})`}><Euro x={0} y={0} r={40} /></g>
          <g opacity={on(f, d17, 8)} transform={`translate(0 ${-10 * pop(f, c('s56:revenue'), 12)})`}>{Array.from({ length: 10 }, (_, k) => <Euro key={k} x={1300 + (k % 5) * 90} y={GROUND - 60 + Math.floor(k / 5) * 0 - Math.floor(k / 5) * 60} r={26} o={on(f, adds + k * 2, 4)} />)}<Label x={1480} y={GROUND + 50} text="ACROSS €17B OF REVENUE" size={38} font="Bebas Neue" color={P.ink} /></g>
          <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [small, 'shrug', 'smiling'], [billions56, 'celebrate', 'smiling']]} x={250} y={GROUND} s={0.75} />
        </g>
      </g>}

      {/* # C) the catch: years of losses */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          {/* # the old picture: music bill so big, growth spending, last coin disappears */}
          <g opacity={on(f, catch57, 8) * (1 - on(f, y2022 - 4, 10))}>
            <rect x={300} y={360} width={1000 * 0.74} height={100} rx={12} fill="#9D7FD0" /><text x={300 + 370} y={425} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>THE MUSIC BILL</text>
            <rect x={1040} y={360} width={1000 * 0.29} height={100} rx={12} fill={P.coral} opacity={on(f, c('s58:spent'), 8)} /><text x={1185} y={425} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{f >= growth ? 'GROWTH SPENDING' : ''}</text>
            <g opacity={on(f, coin58, 8) * (1 - on(f, disappearing, 14))} transform={`translate(1400 ${560 + 60 * on(f, disappearing, 14)})`}><Euro x={0} y={0} r={36} /></g>
            <g opacity={on(f, big58, 8)}><Label x={790} y={330} text="SO BIG…" size={44} font="Bebas Neue" color={P.ink2} /></g>
          </g>
          <g opacity={on(f, y2022 - 4, 10)}>
            <line x1={500} y1={480} x2={1420} y2={480} stroke={P.ink} strokeWidth={5} /><Label x={480} y={492} text="€0" size={44} font="Bebas Neue" color={P.ink} anchor="end" />
            {([[y2022, d659, 659, '2022', 760], [y2023, d446, 446, '2023', 1160]] as [number, number, number, string, number][]).map(([ya, va, v, t, x], k) => { const h = v * 0.5 * on(f, ya, 16)
              return <g key={k} opacity={on(f, ya, 6)}><rect x={x - 90} y={480} width={180} height={h} rx={12} fill={P.coral} /><Label x={x} y={450} text={t} size={46} font="Bebas Neue" color={P.ink} /><g opacity={on(f, va, 8)}><Label x={x} y={480 + v * 0.5 + 50} text={`−€${v}M`} size={50} font="Bebas Neue" color={P.coralInk} /></g></g> })}
            <g opacity={on(f, loss59, 8)}><Label x={960} y={400} text="OPERATING LOSS" size={44} font="Bebas Neue" color={P.coralInk} /></g>
          </g>
          {/* # money in, more than all of it out */}
          <g opacity={on(f, came60, 8)}>{[0, 1, 2].map((k) => { const fl = fly(f, came60 + k * 4, [200, 300], [960, 300], 14, 40); return fl.t < 1 ? <Euro key={k} x={fl.x} y={fl.y} r={22} /> : null })}{[0, 1, 2, 3].map((k) => { const fl = fly(f, went60 + k * 4, [960, 300], [1720, 300], 14, 40); return f >= went60 && fl.t < 1 ? <Euro key={k} x={fl.x} y={fl.y} r={22} /> : null })}</g>
          <Person f={f} who="investor" beats={[[0, 'think', 'thinking'], [nothing57, 'shrug', 'worried'], [loss59, 'facepalm', 'worried'], [more60, 'emptyPockets', 'worried']]} x={1700} y={GROUND} s={0.75} flip />
        </g>
        <g opacity={C2}>
          <rect x={460} y={460} width={680} height={110} rx={12} fill="#9D7FD0" opacity={0.35} />
          <rect x={1140} y={460} width={320} height={110} rx={12} fill={P.gold} />
          <g opacity={on(f, c('s61:spotify'), 8)} transform={`translate(0 ${-8 * pop(f, third61, 12)})`}><text x={1300} y={430} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>≈ 1/3 KEPT</text></g>
          <g opacity={on(f, c('s61:most'), 8)}><rect x={1140} y={460} width={190} height={110} rx={12} fill={P.coral} /><Label x={1235} y={640} text="MOSTLY RUNNING COSTS" size={40} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}
      <Vignette id="sp-keep" />
    </g>
  )
}

const BEATS = ['s53:euro', 's61:most', 's56:revenue', 's58:spent', 's61:spotify', 's52:app', 's52:2025', 's52:spent', 's55:run', 's55:company', 's47:step', 's47:keeps', 's48:paying', 's48:music', 's48:32', 's48:left', "s49:isn't", 's49:profit', 's50:32', 's50:engineers', 's50:build', 's50:marketing', 's50:users', 's50:offices', 's50:company', 's51:costs', 's51:19', 's51:euro', 's52:spent', 's52:4', 's52:building', 's52:4#2', 's52:marketing', 's52:half', 's52:running', "s53:what's", 's53:operating', 's53:13', 's53:2#2', 's53:2025', "s54:lina's", 's54:thirds', 's54:fifth', 's54:eighth', 's54:operating', 's55:picture', 's55:10', 's55:80', 's55:music', 's55:90', 's55:30', 's55:left', 's56:last', 's56:small', 's56:17', 's56:adds', 's56:billions', 's57:catch', 's57:years', 's57:nothing', 's57:end', 's58:bill', 's58:big', 's58:growth', 's58:coin', 's58:disappearing', 's59:2022', 's59:loss', 's59:659', 's59:2023', 's59:446', 's60:came', 's60:more', 's60:went', 's61:step', 's61:third', 's61:running']
export const SP_KEEP = makePiece('sp-keep', 'Spotify long step 3: a euro split — 68 cents for the music, 32 cents left but not profit yet; an engineer (about €1.4B building the app), a marketer (about €1.4B marketing) and an office (about €0.5B running the company) take about 19 cents; about 13 cents is operating profit, about €2.2B in 2025; Lina\'s payment: about two thirds music, a fifth running costs, an eighth profit; a made-up €10 splits into €6.80, €1.90 and €1.30; the small last coin adds up to billions across €17B; the catch: the music bill and growth spending used to swallow the last coin, operating losses of about €659M in 2022 and €446M in 2023; recap: about a third kept, mostly running costs', {
  mood: 'light', Component: Keep, beats: BEATS,
  sfx: [['s48:32', 'pop', 0.2], ['s50:engineers', 'pop', 0.15], ['s51:19', 'pop', 0.2], ['s53:13', 'coin', 0.25], ['s55:80', 'swish', 0.15], ['s55:30', 'coin', 0.2], ['s56:billions', 'coin', 0.2], ['s58:disappearing', 'swish', 0.2], ['s59:659', 'thud', 0.25], ['s61:third', 'pop', 0.2]] })
