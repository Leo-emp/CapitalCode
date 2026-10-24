// ============================================================
// PROPS — EVERYDAY LIFE & ECONOMY (20), owner 2026-10-25: more
// objects to illustrate with. Same house style as the rest:
// 200×200 box, bright flat fills, gradient light, dark outline.
// ============================================================
import React from 'react'
import { Grad, INK, makeProp } from './frame'

const O = INK.outline
const S = { stroke: O, strokeWidth: 4 } as const

export const LIFE_PROPS = [
  // ---------------------------------------------------------------- everyday life
  makeProp('coffee-cup', 'Coffee cup', ['daily', 'spending', 'habit', 'latte', 'small-costs'], ({ frame }) => (
    <g>
      {[0, 1].map((i) => <path key={i} d={`M${86 + i * 24} 58 q${-10 + Math.sin(frame / 8 + i) * 6} -16 0 -32`} stroke="#E8EEF5" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />)}
      <ellipse cx={100} cy={170} rx={72} ry={14} fill="#DCCFB2" {...S} />
      <path d="M52 70 L148 70 L138 160 Q100 172 62 160 Z" fill="#F2E6CC" {...S} />
      <path d="M58 104 L142 104 L138 132 L62 132 Z" fill="#B5577A" />
      <path d="M146 86 q34 2 30 32 q-4 24 -32 22 l2 -14 q18 0 20 -10 q2 -14 -18 -16 Z" fill="#F2E6CC" {...S} />
      <circle cx={150} cy={168} r={10} fill="#A0704A" {...S} strokeWidth={3} />
      <rect x={46} y={60} width={108} height={16} rx={6} fill="#6B4A33" {...S} />
    </g>)),
  makeProp('shopping-bag', 'Shopping bag', ['spending', 'consumer', 'retail', 'shopping'], () => (
    <g>
      <path d="M74 74 q0 -46 26 -46 q26 0 26 46 l-10 0 q0 -34 -16 -34 q-16 0 -16 34 Z" fill="#2E3A55" />
      <rect x={130} y={140} width={22} height={16} rx={3} fill="#F2E6CC" {...S} strokeWidth={2} />
      <path d="M44 72 L156 72 L166 170 L34 170 Z" fill="#F06B5B" {...S} />
      <path d="M100 72 L156 72 L166 170 L110 170 Z" fill="#C94A3E" />
      <circle cx={100} cy={118} r={22} fill="#F2E6CC" /><path d="M90 118 l8 8 l14 -16" stroke="#C94A3E" strokeWidth={6} fill="none" />
    </g>)),
  makeProp('grocery-basket', 'Grocery basket', ['spending', 'food', 'inflation', 'prices', 'household'], () => (
    <g>
      <circle cx={70} cy={74} r={20} fill="#F06B5B" {...S} /><rect x={92} y={34} width={26} height={60} rx={6} fill="#5BCBFF" {...S} /><path d="M120 86 q20 -50 40 -6 Z" fill="#E9B949" {...S} />
      <path d="M30 86 L170 86 L152 168 L48 168 Z" fill="#E9B949" {...S} />
      {[0, 1, 2].map((i) => <rect key={i} x={52 + i * 34} y={100} width={18} height={56} rx={4} fill="#C8962E" />)}
      <rect x={24} y={80} width={152} height={16} rx={6} fill="#A0704A" {...S} />
    </g>)),
  makeProp('pizza', 'Pizza', ['food', 'share', 'slices', 'split', 'portion'], () => (
    <g>
      <circle cx={100} cy={104} r={72} fill="#E9A15B" {...S} /><circle cx={100} cy={104} r={58} fill="#F06B5B" />
      {[[80, 80], [124, 90], [96, 130], [130, 128], [70, 118]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={9} fill="#B5344A" />)}
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M100 104 L${100 + 72 * Math.cos(i * Math.PI / 2)} ${104 + 72 * Math.sin(i * Math.PI / 2)}`} stroke={O} strokeWidth={4} />)}
    </g>)),
  makeProp('bills-stack', 'Pile of bills', ['debt', 'bills', 'expenses', 'budget', 'stress'], () => (
    <g>
      {[0, 1, 2, 3].map((i) => <g key={i} transform={`rotate(${(i - 1.5) * 6} 100 110)`}>
        <rect x={44} y={46 + i * 8} width={112} height={120} rx={6} fill={i === 3 ? '#F2E6CC' : '#DCCFB2'} {...S} /></g>)}
      {[0, 1, 2, 3].map((i) => <rect key={i} x={60} y={88 + i * 16} width={i === 3 ? 40 : 76} height={8} rx={4} fill="#9AA8BC" />)}
      <rect x={110} y={140} width={38} height={18} rx={4} fill="#F0454B" />
    </g>)),
  makeProp('family', 'Family', ['people', 'family', 'household', 'children', 'future'], () => (
    <g>
      {[[62, 1, '#3E7CC9'], [138, 1, '#B5577A'], [100, 0.7, '#E9B949']].map(([x, s, c], i) => {
        const k = s as number
        return <g key={i} transform={`translate(${x} ${178}) scale(${k})`}><path d="M-30 0 L-26 -70 Q0 -88 26 -70 L30 0 Z" fill={c as string} {...S} /><circle cx={0} cy={-104} r={24} fill="#1E2F55" {...S} /></g>
      })}
    </g>)),
  makeProp('baby-stroller', 'Baby stroller', ['family', 'children', 'costs', 'future', 'saving'], () => (
    <g>
      <path d="M40 60 A60 60 0 0 1 100 120 L40 120 Z" fill="#5BCBFF" {...S} />
      <rect x={40} y={110} width={110} height={40} rx={14} fill="#2AA8F2" {...S} />
      <path d="M150 110 L176 64" stroke={O} strokeWidth={8} strokeLinecap="round" />
      {[66, 132].map((x) => <g key={x}><circle cx={x} cy={166} r={18} fill="#2E3A55" {...S} /><circle cx={x} cy={166} r={6} fill="#A9BCD6" /></g>)}
    </g>)),
  makeProp('graduation-cap', 'Graduation cap', ['education', 'student', 'debt', 'career', 'learning'], () => (
    <g>
      <path d="M58 100 L58 140 Q100 166 142 140 L142 100 Z" fill="#2E3A55" {...S} />
      <path d="M100 50 L178 86 L100 122 L22 86 Z" fill="#3E4E70" {...S} />
      <circle cx={100} cy={86} r={8} fill="#E9B949" {...S} strokeWidth={3} /><rect x={157} y={98} width={6} height={50} fill="#E9B949" /><circle cx={160} cy={152} r={10} fill="#C8962E" {...S} />
    </g>)),
  makeProp('medical-kit', 'Medical kit', ['health', 'insurance', 'emergency', 'costs', 'risk'], () => (
    <g>
      <rect x={74} y={42} width={52} height={30} rx={8} fill="none" {...S} strokeWidth={8} />
      <rect x={30} y={64} width={140} height={104} rx={14} fill="#F2E6CC" {...S} />
      <rect x={30} y={64} width={140} height={24} rx={10} fill="#DCCFB2" />
      <rect x={44} y={78} width={18} height={14} rx={3} fill="#9AA8BC" {...S} strokeWidth={2} /><rect x={138} y={78} width={18} height={14} rx={3} fill="#9AA8BC" {...S} strokeWidth={2} />
      <path d="M88 96 h24 v20 h20 v24 h-20 v20 h-24 v-20 h-20 v-24 h20 Z" fill="#F0454B" {...S} strokeWidth={3} />
    </g>)),
  makeProp('gas-pump', 'Fuel pump', ['energy', 'oil', 'prices', 'inflation', 'cars'], () => (
    <g>
      <rect x={48} y={40} width={84} height={134} rx={10} fill="#F06B5B" {...S} />
      <rect x={62} y={56} width={56} height={40} rx={6} fill="#1D4A80" /><rect x={70} y={70} width={40} height={10} rx={5} fill="#5BCBFF" />
      <rect x={40} y={170} width={100} height={14} rx={4} fill="#4E5E7C" {...S} />
      <path d="M132 80 q32 0 32 30 v50 q0 14 -14 10" fill="none" {...S} strokeWidth={8} /><rect x={140} y={150} width={24} height={30} rx={4} fill="#2E3A55" {...S} />
    </g>)),

  // ---------------------------------------------------------------- economy and markets
  makeProp('oil-barrel', 'Oil barrel', ['energy', 'oil', 'commodities', 'economy', 'inflation'], ({ u }) => (
    <g><defs><Grad id={u('b')} stops={['#4E5E7C', '#2E3A55', '#1A2234']} x2={1} y2={0} /></defs>
      <rect x={50} y={36} width={100} height={136} rx={12} fill={`url(#${u('b')})`} {...S} />
      {[70, 136].map((y) => <rect key={y} x={46} y={y} width={108} height={10} rx={4} fill="#A9BCD6" {...S} strokeWidth={3} />)}
      <ellipse cx={100} cy={38} rx={50} ry={10} fill="#6A82A6" {...S} />
      <path d="M100 96 q-14 18 0 28 q14 -10 0 -28 Z" fill="#E9B949" />
    </g>)),
  makeProp('cargo-ship', 'Cargo ship', ['trade', 'shipping', 'global', 'imports', 'economy'], ({ frame }) => (
    <g transform={`translate(0 ${Math.sin(frame / 14) * 3})`}>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={40 + i * 24} y={84 - (i % 2) * 22} width={22} height={40 + (i % 2) * 22} fill={['#F06B5B', '#2AA8F2', '#E9B949', '#3DDC97', '#A07CFF'][i]} {...S} strokeWidth={3} />)}
      <rect x={152} y={70} width={22} height={54} fill="#E8EEF5" {...S} strokeWidth={3} />
      <path d="M20 124 L184 124 L164 160 L36 160 Z" fill="#2E3A55" {...S} /><rect x={36} y={140} width={128} height={8} fill="#F0454B" />
      <path d="M10 170 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0" stroke="#5BCBFF" strokeWidth={6} fill="none" />
    </g>)),
  makeProp('airplane', 'Airplane', ['travel', 'global', 'transport', 'economy', 'growth'], () => (
    <g transform="rotate(-18 100 100)">
      <path d="M24 100 Q24 84 44 84 L160 84 Q186 90 186 100 Q186 110 160 116 L44 116 Q24 116 24 100 Z" fill="#E8EEF5" {...S} />
      <path d="M90 92 L60 40 L82 40 L124 92 Z M90 108 L60 160 L82 160 L124 108 Z" fill="#2AA8F2" {...S} />
      <path d="M36 92 L24 64 L40 64 L56 90 Z" fill="#F06B5B" {...S} />
      {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={130 - i * 16} cy={98} r={4} fill="#1D4A80" />)}
    </g>)),
  makeProp('wheat', 'Wheat sheaf', ['food', 'commodities', 'farming', 'harvest', 'inflation'], () => (
    <g>
      {[-24, -8, 8, 24].map((dx, i) => <g key={i} transform={`rotate(${dx / 2} 100 180)`}>
        <rect x={98 + dx * 0.3} y={70} width={4} height={110} fill="#C8962E" />
        {Array.from({ length: 6 }, (_, k) => <ellipse key={k} cx={100 + dx * 0.3 + (k % 2 ? 8 : -8)} cy={40 + k * 12} rx={7} ry={12} fill="#E9B949" {...S} strokeWidth={2} transform={`rotate(${k % 2 ? 25 : -25} ${100 + dx * 0.3 + (k % 2 ? 8 : -8)} ${40 + k * 12})`} />)}
      </g>)}
      <rect x={76} y={128} width={48} height={14} rx={6} fill="#A0704A" {...S} strokeWidth={3} />
    </g>)),
  makeProp('skyscraper', 'Skyscraper', ['city', 'company', 'corporate', 'big-tech', 'growth'], ({ u }) => (
    <g><defs><Grad id={u('s')} stops={['#5BCBFF', '#2AA8F2', '#1A62B0']} x2={1} y2={0} /></defs>
      <path d="M70 180 L70 50 L100 22 L130 50 L130 180 Z" fill={`url(#${u('s')})`} {...S} />
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x={80 + (i % 2) * 22} y={60 + Math.floor(i / 2) * 14} width={16} height={8} fill={(i * 7) % 5 ? '#FFD58A' : '#1D4A80'} />)}
      <rect x={98} y={6} width={4} height={18} fill={O} /><rect x={40} y={176} width={120} height={8} fill="#4E5E7C" />
    </g>)),
  makeProp('hospital', 'Hospital', ['health', 'insurance', 'costs', 'public', 'care'], () => (
    <g>
      <rect x={34} y={70} width={132} height={104} fill="#F2E6CC" {...S} /><rect x={74} y={40} width={52} height={40} fill="#E8EEF5" {...S} />
      <path d="M92 48 h16 v8 h8 v16 h-8 v8 h-16 v-8 h-8 v-16 h8 Z" fill="#F0454B" />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={46 + (i % 3) * 40} y={88 + Math.floor(i / 3) * 34} width={28} height={20} fill="#5BCBFF" />)}
      <rect x={88} y={142} width={24} height={32} fill="#2E3A55" />
    </g>)),
  makeProp('school', 'School', ['education', 'public', 'learning', 'children', 'future'], () => (
    <g>
      <path d="M24 90 L100 40 L176 90 Z" fill="#F06B5B" {...S} />
      <rect x={34} y={88} width={132} height={86} fill="#E9B949" {...S} />
      <circle cx={100} cy={70} r={10} fill="#F2E6CC" {...S} strokeWidth={3} />
      {[48, 128].map((x) => <rect key={x} x={x} y={104} width={26} height={24} fill="#5BCBFF" {...S} strokeWidth={3} />)}
      <rect x={86} y={130} width={28} height={44} fill="#6B4A33" {...S} strokeWidth={3} />
      <rect x={98} y={14} width={4} height={30} fill={O} /><path d="M102 14 L128 22 L102 30 Z" fill="#3DDC97" />
    </g>)),
  makeProp('stock-certificate', 'Share certificate', ['stocks', 'ownership', 'shares', 'investing', 'company'], () => (
    <g>
      <rect x={28} y={46} width={144} height={108} rx={6} fill="#F2E6CC" {...S} />
      <rect x={38} y={56} width={124} height={88} rx={4} fill="none" stroke="#C8962E" strokeWidth={4} />
      <rect x={58} y={70} width={84} height={10} rx={5} fill="#2E3A55" />
      {[0, 1].map((i) => <rect key={i} x={58} y={92 + i * 14} width={60} height={6} rx={3} fill="#9AA8BC" />)}
      <circle cx={140} cy={124} r={18} fill="#E9B949" {...S} strokeWidth={3} /><path d="M132 140 l-6 22 l14 -8 l14 8 l-6 -22" fill="#F0454B" />
    </g>)),
  makeProp('interest-percent', 'Interest rate sign', ['interest', 'rates', 'loans', 'savings', 'central-bank'], ({ frame }) => (
    <g transform={`rotate(${Math.sin(frame / 20) * 3} 100 100)`}>
      <circle cx={100} cy={100} r={74} fill="#2AA8F2" {...S} /><circle cx={100} cy={100} r={58} fill="#5BCBFF" />
      <circle cx={76} cy={76} r={16} fill="#F2E6CC" {...S} strokeWidth={3} /><circle cx={124} cy={124} r={16} fill="#F2E6CC" {...S} strokeWidth={3} />
      <path d="M136 64 L64 136" stroke="#F2E6CC" strokeWidth={14} strokeLinecap="round" />
    </g>)),
  makeProp('inflation-balloon', 'Price balloon', ['inflation', 'prices', 'bubble', 'cost-of-living', 'economy'], ({ frame }) => {
    const k = 1 + 0.05 * Math.sin(frame / 12)
    return (
      <g>
        <path d="M100 150 q-10 20 6 34" stroke={O} strokeWidth={3} fill="none" />
        <g transform="rotate(-10 112 176)"><rect x={100} y={166} width={34} height={22} rx={4} fill="#F2E6CC" {...S} strokeWidth={2} /><circle cx={106} cy={177} r={3} fill={O} /></g>
        <g transform={`translate(100 90) scale(${k}) translate(-100 -90)`}>
          <ellipse cx={100} cy={86} rx={58} ry={66} fill="#F06B5B" {...S} />
          <ellipse cx={80} cy={60} rx={14} ry={22} fill="#FFFFFF" opacity={0.35} />
          <path d="M92 150 L108 150 L100 142 Z" fill="#C94A3E" {...S} strokeWidth={3} />
          <text x={100} y={104} textAnchor="middle" fill="#F2E6CC" style={{ font: '800 54px Inter' }}>$</text>
        </g>
      </g>
    )
  }),
]
