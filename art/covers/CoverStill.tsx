// # The Remotion composition body: draws one cover by id
import React from 'react'
import { AbsoluteFill } from 'remotion'
import { getCover } from './index'

export const CoverStill: React.FC<{ id: string }> = ({ id }) => {
  const C = getCover(id).Component
  return <AbsoluteFill><C /></AbsoluteFill>
}
