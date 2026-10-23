// ============================================================
// REVIEW SHEETS — stills for checking the art by eye
// (pose strip, expression strip, line-ups…). The full style
// bible (Task 11) assembles these into pages.
// ============================================================

import React from 'react'
import { AbsoluteFill } from 'remotion'
import { Character, type FaceSlot } from '../rig/Character'
import type { Look } from '../rig/looks'
import { HERO, LOOKS } from '../rig/looks'
import { EXPRESSIONS } from '../rig/faces'
import { PROPS } from '../props/registry'
import { type Pose, POSE_IDS, POSES } from '../rig/pose'
import { COLORS, fontFaces } from '../tokens'

const Label: React.FC<{ x: number; y: number; text: string }> = ({ x, y, text }) => (
  <text x={x} y={y} textAnchor="middle" fill={COLORS.dim} style={{ fontFamily: 'Inter', fontSize: 26 }}>{text}</text>
)

// # Grid of characters: cells of [label, pose, look]
export const CharacterGrid: React.FC<{ cells: [string, Pose, Look][]; cols: number; scale: number; Face?: FaceSlot; cellH: number }> = ({
  cells, cols, scale, Face, cellH,
}) => {
  const cw = 1920 / cols
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <style>{fontFaces()}</style>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {cells.map(([label, pose, look], i) => {
          const cx = cw * (i % cols) + cw / 2, cy = cellH * Math.floor(i / cols) + cellH - 46
          return (
            <g key={i}>
              <g transform={`translate(${cx} ${cy}) scale(${scale})`}><Character pose={pose} look={look} Face={Face} breathe={false} /></g>
              <Label x={cx} y={cy + 36} text={label} />
            </g>
          )
        })}
      </svg>
    </AbsoluteFill>
  )
}

export const PoseStrip: React.FC<{ Face?: FaceSlot }> = ({ Face }) => (
  <CharacterGrid cells={POSE_IDS.map((id) => [id, POSES[id], HERO] as [string, Pose, Look])} cols={7} scale={0.55} Face={Face} cellH={540} />
)

// # Head-and-shoulders close-ups, one per expression
export const ExpressionStrip: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bg }}>
    <style>{fontFaces()}</style>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      {EXPRESSIONS.map((e, i) => {
        const cx = (1920 / 7) * i + 1920 / 14
        return (
          <g key={e}>
            <g transform={`translate(${cx} 1450) scale(1.25)`}><Character pose={{ ...POSES.idle, expression: e }} breathe={false} /></g>
            <text x={cx} y={90} textAnchor="middle" fill={COLORS.dim} style={{ fontFamily: "Inter", fontSize: 30 }}>{e}</text>
          </g>
        )
      })}
    </svg>
  </AbsoluteFill>
)

// # The cast side by side
export const CastLineup: React.FC = () => (
  <CharacterGrid cells={Object.entries(LOOKS).map(([id, look], i) => [id, POSES[(['idle', 'armsCrossed', 'present', 'hold', 'point'] as const)[i % 5]], look] as [string, Pose, Look])}
    cols={5} scale={1.15} cellH={1080} />
)

// # Every prop on one sheet (grid), each with its id
export const PropSheet: React.FC<{ page?: number }> = ({ page = 0 }) => {
  const per = 40, cols = 10, list = PROPS.slice(page * per, page * per + per)
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <style>{fontFaces()}</style>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {list.map((p, i) => {
          const x = (i % cols) * 192, y = Math.floor(i / cols) * 270
          const C = p.Component
          return (
            <g key={p.id}>
              <C size={160} x={x + 16} y={y + 20} frame={12} />
              <text x={x + 96} y={y + 220} textAnchor="middle" fill={COLORS.dim} style={{ fontFamily: 'Inter', fontSize: 20 }}>{p.id}</text>
            </g>
          )
        })}
      </svg>
    </AbsoluteFill>
  )
}
export const PropSheet2: React.FC = () => <PropSheet page={1} />
