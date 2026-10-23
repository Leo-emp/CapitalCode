// ============================================================
// ACTOR — the ONE way a character appears anywhere (scenes, demo,
// thumbnails, the Phase-2 engine). Always the approved HD cast,
// always the same on-screen size for a given scene anchor scale,
// so the hero looks identical in every scene and every video.
// ============================================================

import React from 'react'
import { CharacterHD, getLookHD, HD_SKELETON, LOOKS_HD } from './hd/CharacterHD'
import { type ExpressionId, footDrop, getPose, type Pose } from './pose'

// # The approved cast (owner, 2026-10-24)
export const CAST = Object.keys(LOOKS_HD) as ReadonlyArray<string>

// # Head top above the neck in HD drawing units (hair/hard-hat peak, head scaled 1.14)
const HEAD_TOP = 204
// # Standing height of the HD figure in its own units, measured from the idle pose
const STANDING = footDrop(getPose('idle'), HD_SKELETON) + HEAD_TOP
// # On-screen height of a standing actor at anchor scale 1 (the size the owner approved)
export const STANDING_PX = 560
const BASE = STANDING_PX / STANDING

// # On-screen height for a pose at an anchor scale (used for layout checks)
export const actorHeight = (pose: string | Pose, scale = 1): number => {
  const p = typeof pose === 'string' ? getPose(pose) : pose
  return (footDrop(p, HD_SKELETON) + HEAD_TOP) * BASE * scale
}

export const Actor: React.FC<{
  who: string                      // # 'hero' | 'buyer' | 'investor' | 'owner' | 'worker'
  pose: string | Pose              // # pose id or a blended pose from poseAt()
  expression?: ExpressionId        // # override the pose's expression
  x: number; y: number             // # anchor point between the feet (scene pixels)
  scale?: number                   // # the anchor's scale
  frame?: number
  breathe?: boolean
  flip?: boolean                   // # face the other way
}> = ({ who, pose, expression, x, y, scale = 1, frame = 0, breathe = true, flip = false }) => {
  const look = getLookHD(who)
  const base = typeof pose === 'string' ? getPose(pose) : pose
  const p = expression ? { ...base, expression } : base
  return (
    <g data-actor={who} transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * BASE * scale} ${BASE * scale})`}>
      <CharacterHD pose={p} look={look} frame={frame} breathe={breathe} />
    </g>
  )
}
