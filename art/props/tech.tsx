// ============================================================
// PROPS — TECH, CRYPTO & DRAMA family (21). Drama props (fire,
// cracks, arrows…) carry stakes in scenes and thumbnails.
// No real company logos; Bitcoin's ₿ symbol is a public mark.
// ============================================================

import React from 'react'
import { COLORS } from '../tokens'
import { Grad, INK, makeProp } from './frame'

const O = INK.outline

// # Flickering flame tongues, also used by the fire prop
export const flamePath = (cx: number, base: number, w: number, h: number, sway: number) =>
  `M${cx - w / 2} ${base} C${cx - w / 2} ${base - h * 0.45}, ${cx - w * 0.15 + sway} ${base - h * 0.6}, ${cx + sway * 1.5} ${base - h}
   C${cx + w * 0.2 + sway} ${base - h * 0.62}, ${cx + w / 2} ${base - h * 0.4}, ${cx + w / 2} ${base} Z`

export const TECH_PROPS = [
  makeProp('bitcoin', 'Bitcoin coin', ['crypto', 'bitcoin', 'money'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={['#FFD08A', '#F7931A', '#B4600A']} x2={1} /></defs>
      <circle cx={100} cy={106} r={70} fill="#8A4A08" stroke={O} strokeWidth={4} /><circle cx={100} cy={100} r={70} fill={`url(#${u('g')})`} stroke={O} strokeWidth={4} />
      <text x={100} y={128} textAnchor="middle" fill="#FFF4E0" style={{ font: '900 84px Inter' }}>₿</text></g>)),
  makeProp('crypto-coin', 'Crypto coin', ['crypto', 'altcoin', 'money'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={['#D7B8FF', '#8E5BD8', '#4A2380']} x2={1} /></defs>
      <circle cx={100} cy={106} r={66} fill="#33185C" stroke={O} strokeWidth={4} /><circle cx={100} cy={100} r={66} fill={`url(#${u('g')})`} stroke={O} strokeWidth={4} />
      <path d={Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + (i * Math.PI) / 3; return `${i ? 'L' : 'M'}${100 + 38 * Math.cos(a)} ${100 + 38 * Math.sin(a)}` }).join(' ') + ' Z'} fill="none" stroke="#F3EAFF" strokeWidth={6} />
      <circle cx={100} cy={100} r={12} fill="#F3EAFF" /></g>)),
  makeProp('blockchain', 'Blockchain blocks', ['crypto', 'tech', 'blockchain'], () => (
    <g>{[30, 80, 130].map((x, i) => (
      <g key={x}><path d={`M${x} ${110 - i * 10} l20 -12 l20 12 l0 26 l-20 12 l-20 -12 Z`} fill={COLORS.blue} stroke={O} strokeWidth={3} />
        <path d={`M${x} ${110 - i * 10} l20 12 l20 -12 M${x + 20} ${122 - i * 10} l0 26`} stroke="#BFE6FF" strokeWidth={2} fill="none" />
        {i < 2 && <path d={`M${x + 40} ${118 - i * 10} L${x + 50} ${112 - i * 10}`} stroke={COLORS.champagne} strokeWidth={4} />}</g>))}</g>)),
  makeProp('ai-chip', 'AI chip', ['tech', 'ai', 'semiconductor'], ({ u, frame }) => (
    <g><defs><Grad id={u('g')} stops={['#3E4A5C', '#1A2233']} /></defs>
      {Array.from({ length: 6 }, (_, i) => [0, 1, 2, 3].map((s) => <rect key={`${i}${s}`} x={56 + i * 16} y={24} width={6} height={20} fill={COLORS.champagne} transform={`rotate(${s * 90} 100 100)`} />))}
      <rect x={44} y={44} width={112} height={112} rx={10} fill={`url(#${u('g')})`} stroke={O} strokeWidth={4} />
      <rect x={64} y={64} width={72} height={72} rx={6} fill="none" stroke={COLORS.blue} strokeWidth={3} opacity={0.6 + 0.4 * Math.sin(frame / 6)} />
      <text x={100} y={112} textAnchor="middle" fill="#BFE6FF" style={{ font: '800 30px Inter' }}>AI</text></g>)),
  makeProp('robot-head', 'Robot head', ['tech', 'ai', 'automation'], ({ frame }) => (
    <g><rect x={98} y={22} width={4} height={22} fill={O} /><circle cx={100} cy={22} r={8} fill={COLORS.red} opacity={0.6 + 0.4 * Math.sin(frame / 5)} />
      <rect x={44} y={44} width={112} height={100} rx={22} fill="#C9D2DC" stroke={O} strokeWidth={4} />
      <rect x={58} y={64} width={84} height={44} rx={14} fill="#1A2233" />
      {[80, 120].map((x) => <circle key={x} cx={x} cy={86} r={10} fill="#4FB5E8" />)}
      <rect x={76} y={120} width={48} height={10} rx={5} fill="#7D8B9C" /><rect x={30} y={78} width={14} height={34} rx={6} fill="#9AA6B4" /><rect x={156} y={78} width={14} height={34} rx={6} fill="#9AA6B4" /></g>)),
  makeProp('server-rack', 'Server rack', ['tech', 'data', 'cloud', 'ai'], ({ frame }) => (
    <g><rect x={50} y={20} width={100} height={160} rx={6} fill="#1A2233" stroke={O} strokeWidth={4} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}><rect x={58} y={30 + i * 24} width={84} height={18} rx={3} fill="#2E3A4C" />
          {[0, 1, 2].map((j) => <circle key={j} cx={70 + j * 10} cy={39 + i * 24} r={3} fill={(frame + i * 7 + j * 3) % 12 < 6 ? COLORS.green : '#1F4A35'} />)}</g>))}</g>)),
  makeProp('cloud', 'Cloud', ['tech', 'cloud', 'data'], () => (
    <g><path d="M50 140 Q22 140 24 114 Q26 92 52 92 Q56 60 90 58 Q120 56 130 82 Q164 76 172 106 Q178 140 146 140 Z" fill="#DCEBF7" stroke={O} strokeWidth={4} />
      <path d="M100 150 L100 112 M86 126 L100 112 L114 126" stroke={COLORS.blue} strokeWidth={6} fill="none" strokeLinecap="round" /></g>)),
  makeProp('lock', 'Padlock', ['tech', 'security', 'privacy'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={['#FFF1B8', '#E9C25A', '#B98A2A']} x2={1} /></defs>
      <path d="M66 96 L66 70 A34 34 0 0 1 134 70 L134 96" stroke="#9AA6B4" strokeWidth={14} fill="none" />
      <rect x={50} y={92} width={100} height={82} rx={10} fill={`url(#${u('g')})`} stroke={O} strokeWidth={4} />
      <circle cx={100} cy={126} r={10} fill={O} /><rect x={96} y={130} width={8} height={22} fill={O} /></g>)),
  makeProp('shield', 'Shield', ['tech', 'security', 'protection', 'insurance'], ({ u }) => (
    <g><defs><Grad id={u('g')} stops={['#5BCBFF', COLORS.blue, '#0D5A96']} x2={1} /></defs>
      <path d="M100 24 L164 48 Q164 130 100 176 Q36 130 36 48 Z" fill={`url(#${u('g')})`} stroke={O} strokeWidth={4} />
      <path d="M72 100 L94 122 L132 80" stroke="#F7F3EA" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>)),
  makeProp('warning', 'Warning sign', ['drama', 'risk', 'warning'], () => (
    <g><path d="M100 26 L176 160 L24 160 Z" fill="#F7C531" stroke={O} strokeWidth={5} strokeLinejoin="round" />
      <rect x={93} y={70} width={14} height={50} rx={6} fill={O} /><circle cx={100} cy={138} r={8} fill={O} /></g>)),
  makeProp('arrow-up', 'Rising arrow', ['drama', 'growth', 'gain'], () => (
    <g><path d="M30 160 L80 110 L106 132 L150 70" stroke={COLORS.green} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M122 62 L164 52 L156 96 Z" fill={COLORS.green} stroke={O} strokeWidth={3} /></g>)),
  makeProp('arrow-down', 'Crashing arrow', ['drama', 'crash', 'loss'], () => (
    <g><path d="M30 46 L80 96 L106 74 L150 136" stroke={COLORS.red} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M122 144 L164 154 L156 110 Z" fill={COLORS.red} stroke={O} strokeWidth={3} /></g>)),
  makeProp('fire', 'Fire', ['drama', 'crisis', 'loss'], ({ frame }) => (
    <g>{[0, 1, 2].map((layer) => [0, 1, 2, 3, 4].map((i) => {
      const h = (120 - layer * 34) * (0.75 + 0.25 * Math.sin(frame * 0.45 + i * 2.1 + layer))
      return <path key={`${layer}${i}`} d={flamePath(40 + i * 30, 176, 54 - layer * 12, h, Math.sin(frame * 0.3 + i) * 8)} fill={['#D9362B', '#FF7A1F', '#FFD86B'][layer]} />
    }))}</g>)),
  makeProp('smoke', 'Smoke', ['drama', 'crisis', 'pollution'], ({ frame }) => (
    <g>{[0, 1, 2, 3, 4].map((i) => {
      const t = ((frame / 50 + i / 5) % 1)
      return <circle key={i} cx={90 + Math.sin(i * 2 + frame / 30) * 20 + t * 20} cy={170 - t * 140} r={18 + t * 34} fill="#8A8A96" opacity={0.75 * (1 - t)} />
    })}</g>)),
  makeProp('cracks', 'Cracks', ['drama', 'collapse', 'failure'], () => (
    <g stroke="#F7F3EA" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M100 100 L60 60 L52 30 M100 100 L150 70 L176 74 M100 100 L120 150 L112 180 M100 100 L44 122 L20 150 M60 60 L30 70 M120 150 L150 160" /></g>)),
  makeProp('lightning', 'Lightning bolt', ['drama', 'shock', 'energy'], () => (
    <g><path d="M118 20 L54 112 L96 112 L80 180 L150 82 L106 82 Z" fill="#FFE38A" stroke={O} strokeWidth={4} strokeLinejoin="round" /></g>)),
  makeProp('explosion', 'Explosion burst', ['drama', 'shock', 'impact'], ({ frame }) => (
    <g transform={`rotate(${frame} 100 100)`}><path d={Array.from({ length: 24 }, (_, i) => { const r = i % 2 ? 44 : 84, a = (i / 24) * Math.PI * 2; return `${i ? 'L' : 'M'}${100 + r * Math.cos(a)} ${100 + r * Math.sin(a)}` }).join(' ') + ' Z'}
      fill="#FF7A1F" stroke={O} strokeWidth={4} /><circle cx={100} cy={100} r={36} fill="#FFD86B" /></g>)),
  makeProp('question', 'Question mark', ['drama', 'mystery', 'unknown'], () => (
    <g><text x={100} y={168} textAnchor="middle" fill={COLORS.champagneLight} stroke={O} strokeWidth={6} paintOrder="stroke" style={{ font: '900 170px Inter' }}>?</text></g>)),
  makeProp('exclamation', 'Exclamation mark', ['drama', 'alert', 'surprise'], () => (
    <g><text x={100} y={168} textAnchor="middle" fill={COLORS.red} stroke={O} strokeWidth={6} paintOrder="stroke" style={{ font: '900 170px Inter' }}>!</text></g>)),
  makeProp('cross', 'Red cross mark', ['drama', 'wrong', 'fail'], () => (
    <g><path d="M48 48 L152 152 M152 48 L48 152" stroke={COLORS.red} strokeWidth={28} strokeLinecap="round" /></g>)),
  makeProp('tick', 'Green tick', ['drama', 'right', 'success'], () => (
    <g><path d="M40 104 L84 148 L164 56" stroke={COLORS.green} strokeWidth={28} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>)),
]
