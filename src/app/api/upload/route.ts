// # POST /api/upload — trigger upload processing for approved videos
// # Called by cron or manually from dashboard
import { NextRequest, NextResponse } from 'next/server'
import { processApprovedVideos } from '@/uploaders/upload-worker'
import { cronCheck } from '../auth'

export async function POST(req: NextRequest) {
  const denied = cronCheck(req)
  if (denied) return denied

  const { processed, errors } = await processApprovedVideos()

  return NextResponse.json({
    success: true,
    processed,
    errors,
    message: `Processed ${processed} videos, ${errors} errors`,
  })
}
