// # SVG slot-filler — Gemini fills text labels into pre-designed SVG templates
// # Layout is fixed, labels only — can't break the design

import { geminiJson } from '@/lib/gemini'
import { buildSvgPrompt } from './data-fetcher'
import type { PipelineContext } from './orchestrator'

interface SvgLabels {
  labels: Record<string, string>
  title: string
}

// # Pipeline stage — fills SVG template labels via Gemini
export async function svgSlotFillerStage(ctx: PipelineContext): Promise<PipelineContext> {
  if (!ctx.scenePlan?.scenes) {
    throw new Error('No scene plan in context — run aiDirectorStage first')
  }

  const svgLabels: Record<string, SvgLabels> = {}

  // # Only fill SVGs for FlowDiagram scenes
  for (const scene of ctx.scenePlan.scenes) {
    if (scene.sceneType === 'FlowDiagram') {
      const templateName = scene.props?.templateName ?? 'money-flow-3box'
      const prompt = buildSvgPrompt(templateName, ctx.topic)
      const labels = await geminiJson<SvgLabels>(prompt)

      // # Truncate any labels over 20 chars — can't break the layout
      for (const key of Object.keys(labels.labels ?? {})) {
        if (labels.labels[key].length > 20) {
          labels.labels[key] = labels.labels[key].substring(0, 17) + '...'
        }
      }

      svgLabels[scene.segmentId] = labels
    }
  }

  return { ...ctx, svgLabels }
}
