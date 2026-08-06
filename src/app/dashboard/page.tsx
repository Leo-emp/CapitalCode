// # Dashboard queue page — shows all videos grouped by status
import { db } from '@/db/client'
import { videos, renders } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import Link from 'next/link'

const STATUS_COLORS: Record<string, string> = {
  generating: '#3498DB',
  ready_for_review: '#D4A853',
  approved: '#2ECC71',
  uploading: '#F39C12',
  published: '#2ECC71',
  rejected: '#E74C3C',
  failed: '#E74C3C',
}

const STATUS_LABELS: Record<string, string> = {
  generating: 'Generating',
  ready_for_review: 'Review',
  approved: 'Approved',
  uploading: 'Uploading',
  published: 'Published',
  rejected: 'Rejected',
  failed: 'Failed',
}

export const dynamic = 'force-dynamic'

export default async function QueuePage() {
  const rows = await db
    .select({
      id: videos.id,
      topic: videos.topic,
      type: videos.type,
      status: videos.status,
      createdAt: videos.createdAt,
      qualityScore: videos.qualityScore,
      thumbnailUrl: renders.thumbnailUrl,
      r2Url: renders.r2Url,
      duration: renders.duration,
    })
    .from(videos)
    .leftJoin(renders, eq(videos.id, renders.videoId))
    .orderBy(desc(videos.createdAt))
    .limit(100)

  // # Group by status for the queue view
  const reviewable = rows.filter((v) => v.status === 'ready_for_review')
  const rest = rows.filter((v) => v.status !== 'ready_for_review')

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        Video Queue
      </h1>

      {/* # Review section — highlighted */}
      {reviewable.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#D4A853' }}>
            Ready for Review ({reviewable.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviewable.map((v) => (
              <VideoCard key={v.id} video={v} highlight />
            ))}
          </div>
        </section>
      )}

      {/* # All other videos */}
      <section>
        <h2 className="text-lg font-semibold text-slate-300 mb-4">
          All Videos ({rest.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </section>

      {rows.length === 0 && (
        <p className="text-slate-500 text-center py-20">No videos yet. Run the pipeline to generate your first video.</p>
      )}
    </div>
  )
}

function VideoCard({ video, highlight }: { video: any; highlight?: boolean }) {
  const borderColor = highlight ? '#D4A853' : '#1B2838'
  const date = new Date(video.createdAt * 1000).toLocaleDateString()
  const typeLabel = video.type === 'long_form' ? 'Long' : video.type === 'short_explainer' ? 'Short' : 'Data'

  return (
    <Link
      href={video.status === 'ready_for_review' ? `/dashboard/review/${video.id}` : '#'}
      className="block rounded-xl p-4 transition-all hover:scale-[1.02]"
      style={{ backgroundColor: '#0D1B2A', border: `1px solid ${borderColor}` }}
    >
      {/* # Thumbnail or placeholder */}
      <div className="w-full h-36 rounded-lg mb-3 flex items-center justify-center" style={{ backgroundColor: '#1B2838' }}>
        {video.thumbnailUrl ? (
          <img src={video.thumbnailUrl} alt="" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-slate-600 text-sm">No thumbnail</span>
        )}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: STATUS_COLORS[video.status] + '20', color: STATUS_COLORS[video.status] }}>
          {STATUS_LABELS[video.status] ?? video.status}
        </span>
        <span className="text-xs text-slate-500">{typeLabel}</span>
        {video.duration && <span className="text-xs text-slate-500">{Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}</span>}
      </div>

      <p className="text-white text-sm font-medium line-clamp-2">{video.topic || 'Untitled'}</p>
      <p className="text-slate-500 text-xs mt-1">{date}</p>
    </Link>
  )
}
