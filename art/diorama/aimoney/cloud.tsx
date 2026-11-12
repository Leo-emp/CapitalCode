// ---------------------------------------------------------------- s33–s37: the cloud companies are AI's landlords — Amazon, Microsoft and Google buy chips, fill data centers,
// rent computing by the hour; tenants rent instead of building, the landlord is paid every month; AWS 2025: ≈ $129B sales, ≈ $46B operating profit (≈ $35 per $100);
// OpenAI reportedly paid Microsoft ≈ $17B in 2025
import React from 'react'
import { Mini } from '../../rig/Mini'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, Calendar, camera, Coin, DataCenter, fly, Gpu, Headline, Label, Person, Prop, Split, win } from './common'

const Cloud: React.FC<PieceProps> = ({ f, c }) => {
  const layer = c('s33:layer'), landlords = c('s33:landlords'), cloud = c('s33:cloud')
  const amazon = c('s34:amazon'), microsoft = c('s34:microsoft'), google = c('s34:google'), buy = c('s34:buy'), fill = c('s34:fill'), rent = c('s34:rent'), hour = c('s34:hour')
  const afford = c('s34a:afford'), rent2 = c('s34a:rent'), landlord = c('s34a:landlord'), paid = c('s34a:paid'), month = c('s34a:month'), tenant = c('s34a:tenant')
  const aws = c('s35:aws'), d129 = c('s35:129')
  const d46 = c('s36:46'), operating = c('s36:operating'), d35 = c('s36:35'), d100 = c('s36:100')
  const tenants = c('s37:tenants'), openai = c('s37:openai'), reportedly = c('s37:reportedly'), msft = c('s37:microsoft'), d17 = c('s37:17')
  const A = win(f, layer, aws), B = win(f, aws, tenants), Cc = on(f, tenants, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [landlords, 'present', 'smiling'], [buy, 'carry', 'neutral'], [rent, 'offer', 'smiling'], [afford, 'emptyPockets', 'worried'], [landlord, 'countA', 'smug', 'countB', 14],
    [d129, 'shock', 'shocked'], [d46, 'explain', 'neutral'], [d35, 'thumbsUp', 'smiling'], [tenants, 'point', 'thinking'], [d17, 'oops', 'shocked']]
  const names: [number, string][] = [[amazon, 'AMAZON'], [microsoft, 'MICROSOFT'], [google, 'GOOGLE']]
  const S = 6.5 // # px per $1B
  return (
    <g>
      <Stage id="cl" frame={f} />
      <Headline f={f} lines={[[c("s34a:own"), "NO DATA CENTER OF THEIR OWN", P.ink, 108], [c("s35:amazon's"), "AMAZON'S CLOUD", P.ink, 124], [c("s35:in#2"), "IN 2025", P.ink, 130], [c("s37:ai"), "AND AI COMPANIES…", P.ink, 120], [c("s37:alone"), "IN 2025 ALONE · AS REPORTED", P.ink2, 104], [layer, 'ONE LAYER UP', P.ink, 130], [landlords, 'THE LANDLORDS OF AI', P.goldInk, 124], [amazon, 'AMAZON · MICROSOFT · GOOGLE', P.ink, 108], [buy, 'BUY HUGE NUMBERS OF CHIPS', P.ink, 110],
        [rent, 'RENT OUT COMPUTING', P.ink, 124], [hour, 'BY THE HOUR', P.goldInk, 130], [afford, 'MOST COMPANIES CAN’T BUILD THEIR OWN', P.ink, 96], [rent2, 'SO THEY RENT', P.ink, 130], [paid, 'THE LANDLORD GETS PAID', P.mintInk, 116], [month, 'EVERY MONTH', P.goldInk, 130],
        [aws, 'AWS', P.ink, 140], [d129, '≈ $129 BILLION', P.goldInk, 124], [d46, '≈ $46B OPERATING PROFIT', P.mintInk, 116], [d35, '≈ $35 PROFIT PER $100', P.mintInk, 116],
        [tenants, '…ARE HUGE TENANTS', P.ink, 120], [d17, 'OPENAI → MICROSOFT: ≈ $17B', P.goldInk, 112]]} />
      <g transform={camera(f, [[hour, 1300, 600, 1.05], [afford, 960, 540, 1], [d129, 1100, 620, 1.04], [tenants, 960, 540, 1], [d17, 1200, 620, 1.05]])}>
        {/* # A: three landlords' data centers fill with chips; a FOR RENT sign and an hourly meter; tenants pay every month */}
        <g opacity={A}>
          <g opacity={on(f, landlords, 6) * (1 - on(f, amazon, 8))}><DataCenter x={1240} y={860} s={0.9} f={f} /><g transform={`translate(1240 400) scale(${pop(f, landlords) * 1.2})`}><Prop id="key" x={0} y={0} size={180} f={f} /></g></g>
          {names.map(([at, t], k) => <DataCenter key={k} x={820 + k * 420} y={800} s={0.62} o={on(f, at, 8)} lit={on(f, fill, 20)} f={f} label={t} />)}
          {Array.from({ length: 9 }, (_, k) => { const m = fly(f, buy + k * 3, [1240, 300], [820 + (k % 3) * 420, 700], 22, -60); return <g key={k} opacity={m.o} transform={`translate(${m.x} ${m.y}) scale(0.22)`}><Gpu x={0} y={0} glow={1} /></g> })}
          <g opacity={on(f, rent, 6) * (1 - on(f, afford, 8))} transform={`translate(1300 380) rotate(-4) scale(${pop(f, rent)})`}><rect x={-170} y={-56} width={340} height={112} rx={14} fill={P.paper} stroke={P.coralInk} strokeWidth={6} /><Label x={0} y={24} text="FOR RENT" size={72} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, hour, 6) * (1 - on(f, afford, 8))} transform={`translate(1700 400) scale(${pop(f, hour)})`}><circle r={90} fill={P.card} /><Prop id="clock" x={0} y={-6} size={120} f={f} /><Label x={0} y={140} text="$ / HOUR" size={52} font="Bebas Neue" color={P.goldInk} /></g>
          {/* # tenants: small companies line up and pay the landlord each month */}
          <g opacity={on(f, afford, 6)}>
            {Array.from({ length: 4 }, (_, k) => <g key={k} opacity={on(f, afford + k * 3, 6)}><Mini look={['owner', 'buyer', 'worker', 'investor'][k]} x={760 + k * 150} y={1050} scale={0.85} frame={f} seed={k + 170} mood={f >= tenant ? (k % 2 ? 'sad' : 'happy') : 'neutral'} /></g>)}
            {Array.from({ length: 6 }, (_, k) => { const m = fly(f, paid + k * 5, [760 + (k % 4) * 130, 880], [1300, 640], 20, 120); return <Coin key={k} x={m.x} y={m.y} s={0.6} o={m.o} /> })}
            <g opacity={on(f, month, 6)} transform={`translate(1760 420) scale(${pop(f, month) * 0.9})`}><Calendar x={0} y={0} text="" s={1.1} /><Label x={0} y={140} text="EVERY MONTH" size={52} font="Bebas Neue" color={P.ink} /></g>
          </g>
        </g>
        {/* # B: AWS — sales bar with the operating-profit part; $100 → ≈ $35 profit */}
        <g opacity={B}>
          <DataCenter x={1640} y={1000} s={0.45} f={f} label="AWS" />
          <g opacity={on(f, aws, 6) * (1 - on(f, d35, 8))}>
            <Label x={700} y={470} text="AWS SALES, 2025" size={52} font="Bebas Neue" color={P.ink} anchor="start" />
            <rect x={700} y={500} width={129 * S * on(f, d129, 24)} height={130} rx={18} fill={P.sky} />
            <rect x={700} y={500} width={46 * S * on(f, d46, 20)} height={130} rx={18} fill={P.mint} opacity={on(f, d46, 6)} />
            <Label x={700 + 129 * S + 24} y={588} text={f >= d129 ? '$129B' : ''} size={70} font="Bebas Neue" color={P.ink} anchor="start" />
            <Label x={700 + 46 * S / 2} y={588} text={f >= operating ? '$46B' : ''} size={64} font="Bebas Neue" color={P.navy0} />
            <Label x={700 + 46 * S / 2} y={700} text={f >= operating ? 'OPERATING PROFIT' : ''} size={48} font="Bebas Neue" color={P.mintInk} />
          </g>
          <g opacity={on(f, d35, 6)}>
            <Label x={700} y={560} text={f >= d100 ? 'EVERY $100 OF SALES' : ''} size={52} font="Bebas Neue" color={P.ink} anchor="start" />
            <Split x={700} y={590} kept={35} t={on(f, d35, 20)} w={860} keptText="≈ $35" costText="RUNNING COSTS" />
            <Label x={700} y={790} text="PROFIT" size={52} font="Bebas Neue" color={P.mintInk} anchor="start" />
          </g>
        </g>
        {/* # C: a big tenant — OpenAI pays Microsoft's data center a stream of coins */}
        <g opacity={Cc}>
          <g opacity={on(f, openai, 6)} transform={`translate(880 620) scale(${pop(f, openai)})`}><circle r={120} fill={P.card} /><Prop id="robot-head" x={0} y={-6} size={150} f={f} /><Label x={0} y={180} text="OPENAI" size={60} font="Bebas Neue" color={P.ink} /></g>
          <DataCenter x={1560} y={880} s={0.7} f={f} label={f >= msft ? 'MICROSOFT' : ''} o={on(f, tenants, 8)} />
          {Array.from({ length: 10 }, (_, k) => { const t = ((f - d17) / 30 + k / 10) % 1; return f >= d17 ? <Coin key={k} x={lerp(980, 1480, t)} y={600 - Math.sin(t * Math.PI) * 140} s={0.6} o={Math.sin(t * Math.PI)} /> : null })}
          <g opacity={on(f, d17, 6)} transform={`translate(1230 400) scale(${pop(f, d17)})`}><rect x={-150} y={-60} width={300} height={120} rx={20} fill={P.gold} /><Label x={0} y={34} text="≈ $17B" size={90} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, reportedly, 6)}><Label x={1230} y={1040} text="2025 · AS REPORTED" size={46} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={300} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="cl" />
    </g>
  )
}

export const AI_CLOUD = makePiece('ai-cloud', 'Long: cloud companies are AI landlords — buy chips, rent compute by the hour, paid every month; AWS 2025 ≈ $129B sales, ≈ $46B operating profit (≈ $35 per $100); OpenAI reportedly paid Microsoft ≈ $17B', { mood: 'light', Component: Cloud,
  beats: ["s33:layer", "s33:landlords", "s33:cloud", "s34:amazon", "s34:microsoft", "s34:google", "s34:buy", "s34:fill", "s34:rent", "s34:hour", "s34a:afford", "s34a:rent", "s34a:landlord", "s34a:paid", "s34a:month", "s34a:tenant", "s35:aws", "s35:129", "s36:46", "s36:operating", "s36:35", "s36:100", "s37:tenants", "s37:openai", "s37:reportedly", "s37:microsoft", "s37:17", "s34a:own", "s35:amazon's", "s35:in#2", "s37:ai", "s37:alone"],
  sfx: [['s33:landlords', 'pop', 0.4], ['s34:buy', 'whoosh', 0.4], ['s34:hour', 'tick', 0.4], ['s34a:paid', 'coin', 0.5], ['s35:129', 'impact', 0.5], ['s36:35', 'chime', 0.4], ['s37:17', 'coin', 0.5]] })
