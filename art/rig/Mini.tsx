// ============================================================
// MINI — the cast drawn small, for crowds on pedestals (living film
// spec §5). Same looks as the HD cast (blazer, tee, skin, hair
// colours) in a simple flat body that stays cheap when 60 of them
// share a frame. Alive like the big cast: blinks, breathes, sways.
// Origin = between the feet; standing height ≈ 200 px at scale 1.
// ============================================================

import React from 'react'
import { idleLife } from '../motion/life'
import { getLookHD } from './hd/CharacterHD'

export const MINI_HEIGHT = 200

export const Mini: React.FC<{ look: string; x: number; y: number; scale: number; frame: number; seed: number; mood?: 'neutral' | 'happy' | 'sad' }> = ({ look, x, y, scale, frame, seed, mood = 'neutral' }) => {
  const L = getLookHD(look)
  const life = idleLife(frame, seed)
  const b = life.breath * 1.5, eye = life.blink > 0.9 ? 1 : 6
  const mouth = mood === 'happy' ? 'M-9 -138 Q0 -130 9 -138' : mood === 'sad' ? 'M-9 -132 Q0 -139 9 -132' : 'M-7 -135 L7 -135'
  return (
    <g transform={`translate(${x + life.sway * scale * 0.5} ${y}) scale(${scale})`}>
      {/* # legs + shoes */}
      <rect x={-17} y={-62} width={14} height={60} rx={6} fill={L.pants[0]} /><rect x={3} y={-62} width={14} height={60} rx={6} fill={L.pants[1]} />
      <rect x={-21} y={-6} width={19} height={8} rx={4} fill="#E8EEF5" /><rect x={2} y={-6} width={19} height={8} rx={4} fill="#E8EEF5" />
      {/* # body: tee + jacket with a lit and a shaded side; breathes */}
      <g transform={`translate(0 ${b})`}>
        <rect x={-30} y={-122} width={60} height={66} rx={18} fill={L.jacket[1]} />
        <rect x={8} y={-122} width={22} height={66} rx={12} fill={L.jacket[2]} />
        <path d="M-9 -122 L9 -122 L4 -70 L-4 -70 Z" fill={L.tee} />
        <rect x={-40} y={-116} width={12} height={50} rx={6} fill={L.jacket[0]} /><rect x={28} y={-116} width={12} height={50} rx={6} fill={L.jacket[2]} />
      </g>
      {/* # head turns a touch with idle life */}
      <g transform={`rotate(${life.headTurn} 0 -142)`}>
        <circle cx={0} cy={-146} r={24} fill={L.skin[0]} />
        <path d="M-25 -150 Q-22 -176 2 -175 Q26 -174 25 -150 Q14 -164 -2 -162 Q-16 -161 -25 -150 Z" fill={L.hairColor[0]} />
        <ellipse cx={-8} cy={-146} rx={5} ry={eye} fill="#F3F6FC" /><ellipse cx={9} cy={-146} rx={5} ry={eye} fill="#F3F6FC" />
        {eye > 1 && <><circle cx={-7} cy={-145} r={2.6} fill="#0A0F1E" /><circle cx={10} cy={-145} r={2.6} fill="#0A0F1E" /></>}
        <path d={mouth} stroke="#E6F4FF" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      </g>
    </g>
  )
}
