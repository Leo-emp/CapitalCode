// # Video review page — watch, approve, or reject a single video
import { db } from '@/db/client'
import { videos, renders, scripts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ReviewActions } from './actions'

export const dynamic = 'force-dynamic'

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [video] = await db.select().from(videos).where(eq(videos.id, id)).limit(1)
  if (!video) notFound()

  const renderRows = await db.select().from(renders).where(eq(renders.videoId, id))
  const scriptRows = await db.select().from(scripts).where(eq(scripts.videoId, id))

  const render = renderRows[0]
  const script = scriptRows[0]
  const qualityCheck = video.qualityScore ? JSON.parse(video.qualityScore) : null

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        Review Video
      </h1>
      <p className="text-slate-400 mb-8">{video.topic}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* # Video player */}
        <div className="lg:col-span-2">
          {render?.r2Url ? (
            <video
              controls
              className="w-full rounded-xl"
              style={{ backgroundColor: '#0D1B2A' }}
              src={render.r2Url}
              poster={render.thumbnailUrl ?? undefined}
            />
          ) : (
            <div className="w-full aspect-video rounded-xl flex items-center justify-center" style={{ backgroundColor: '#0D1B2A' }}>
              <span className="text-slate-500">No render available</span>
            </div>
          )}

          {/* # Approve/Reject buttons */}
          {video.status === 'ready_for_review' && (
            <ReviewActions videoId={id} />
          )}

          {video.status !== 'ready_for_review' && (
            <div className="mt-4 px-4 py-3 rounded-lg" style={{ backgroundColor: '#0D1B2A' }}>
              <span className="text-sm text-slate-400">Status: </span>
              <span className="text-sm font-medium text-white">{video.status}</span>
              {video.rejectionReason && (
                <p className="text-sm text-red-400 mt-1">Reason: {video.rejectionReason}</p>
              )}
            </div>
          )}
        </div>

        {/* # Sidebar info */}
        <div className="space-y-4">
          {/* # Video details */}
          <InfoCard title="Details">
            <InfoRow label="Type" value={video.type} />
            <InfoRow label="Status" value={video.status} />
            <InfoRow label="Created" value={new Date(video.createdAt * 1000).toLocaleString()} />
            {render && <>
              <InfoRow label="Duration" value={`${render.duration}s`} />
              <InfoRow label="File size" value={`${Math.round(render.fileSize / 1024 / 1024)}MB`} />
              <InfoRow label="Render time" value={`${render.renderTime}s`} />
            </>}
          </InfoCard>

          {/* # Quality check */}
          {qualityCheck && (
            <InfoCard title="Quality Check">
              <InfoRow label="Result" value={qualityCheck.pass ? 'PASS' : 'FAIL'} />
              <InfoRow label="Reason" value={qualityCheck.reason} />
            </InfoCard>
          )}

          {/* # Script preview */}
          {script && (
            <InfoCard title="Script">
              <p className="text-xs text-slate-400 mb-1">Hook:</p>
              <p className="text-sm text-white mb-3">{script.hook}</p>
              <p className="text-xs text-slate-400 mb-1">Word count: {script.wordCount}</p>
              <p className="text-xs text-slate-400">Est. duration: {script.estimatedDuration}s</p>
            </InfoCard>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: '#0D1B2A' }}>
      <h3 className="text-sm font-semibold mb-3" style={{ color: '#D4A853' }}>{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  )
}
