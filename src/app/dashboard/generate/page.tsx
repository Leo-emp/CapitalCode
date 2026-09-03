'use client'

// # Generate page — trigger CapitalCode pipeline from dashboard
// # Dispatches GitHub Actions workflow, polls run status with live progress
import { useState, useEffect, useCallback } from 'react'

// # Video type options with labels and descriptions
const VIDEO_TYPES = [
  { value: 'long_form', label: 'Long Form', desc: '8-12 min deep-dive explainer' },
  { value: 'short_explainer', label: 'Short', desc: '60s vertical explainer' },
  { value: 'short_data_reveal', label: 'Data Reveal', desc: '30-60s stat reveal short' },
  { value: 'all', label: 'All 3', desc: 'Generate one of each type' },
] as const

// # Content pillar hints for the topic field placeholder
const PILLAR_HINTS = [
  'How the Fed rate cut affects your mortgage',
  'Why AI is replacing middle managers first',
  'How Netflix actually makes money',
  'The psychology behind impulse investing',
  'Why index funds beat 90% of fund managers',
]

// # Pipeline step names mapped from GitHub Actions step names
const PIPELINE_STEPS = [
  { name: 'Install ffmpeg', label: 'Setup' },
  { name: 'Run pipeline', label: 'Pipeline Running' },
]

interface RunStatus {
  id: number
  status: string
  conclusion: string | null
  progress: number
  steps: Array<{ name: string; status: string; conclusion: string | null }>
  created_at: string
  html_url: string
}

interface RecentRun {
  id: number
  status: string
  conclusion: string | null
  created_at: string
  html_url: string
}

export default function GeneratePage() {
  const [topic, setTopic] = useState('')
  const [videoType, setVideoType] = useState('long_form')
  const [generating, setGenerating] = useState(false)
  const [currentRun, setCurrentRun] = useState<RunStatus | null>(null)
  const [recentRuns, setRecentRuns] = useState<RecentRun[]>([])
  const [error, setError] = useState('')
  const [hint] = useState(() => PILLAR_HINTS[Math.floor(Math.random() * PILLAR_HINTS.length)])

  // # Load recent runs on mount
  useEffect(() => {
    fetchRecentRuns()
  }, [])

  // # Poll current run status every 5 seconds while active
  useEffect(() => {
    if (!currentRun || currentRun.status === 'completed') return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/generate?run_id=${currentRun.id}`)
        if (res.ok) {
          const data: RunStatus = await res.json()
          setCurrentRun(data)

          // # Run finished — stop polling, refresh recent runs
          if (data.status === 'completed') {
            setGenerating(false)
            fetchRecentRuns()
          }
        }
      } catch {
        // # Network hiccup — keep polling
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentRun])

  async function fetchRecentRuns() {
    try {
      const res = await fetch('/api/generate')
      if (res.ok) {
        const data = await res.json()
        setRecentRuns(data.runs ?? [])
      }
    } catch {
      // # Dashboard might not have GITHUB_TOKEN yet
    }
  }

  const handleGenerate = useCallback(async () => {
    setError('')
    setGenerating(true)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim() || undefined,
          videoType,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to dispatch pipeline')
      }

      const data = await res.json()

      if (data.run_id) {
        // # Start polling the run
        setCurrentRun({
          id: data.run_id,
          status: data.status ?? 'queued',
          conclusion: null,
          progress: 0,
          steps: [],
          created_at: new Date().toISOString(),
          html_url: data.html_url ?? '',
        })
      } else {
        // # Dispatched but couldn't get run ID — show success message
        setGenerating(false)
        setError('')
        fetchRecentRuns()
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Generation failed')
      setGenerating(false)
    }
  }, [topic, videoType])

  function handleReset() {
    setCurrentRun(null)
    setTopic('')
    setError('')
  }

  // # Get display info for a run's conclusion
  function conclusionStyle(conclusion: string | null) {
    if (conclusion === 'success') return { color: '#2ECC71', label: 'Success' }
    if (conclusion === 'failure') return { color: '#E74C3C', label: 'Failed' }
    if (conclusion === 'cancelled') return { color: '#95A5A6', label: 'Cancelled' }
    return { color: '#3498DB', label: 'Running' }
  }

  return (
    <div className="max-w-2xl">
      {/* # Page header */}
      <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        Generate Video
      </h1>
      <p className="text-slate-400 mb-8">Trigger the CapitalCode pipeline via GitHub Actions</p>

      {/* # Generation form — hidden while a run is active */}
      {!currentRun && (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#0D1B2A' }}>
          {/* # Topic input */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={hint}
              className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 outline-none focus:ring-1"
              style={{ backgroundColor: '#1B2838', border: '1px solid #2A3A4E' }}
            />
            <p className="text-xs text-slate-600 mt-1.5">
              Leave empty for AI to pick from 6 content pillars
            </p>
          </div>

          {/* # Video type selector */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
              Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              {VIDEO_TYPES.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setVideoType(opt.value)}
                  className="px-4 py-3 rounded-lg text-left transition-all"
                  style={{
                    backgroundColor: videoType === opt.value ? 'rgba(212, 168, 83, 0.1)' : '#1B2838',
                    border: `1px solid ${videoType === opt.value ? '#D4A853' : '#2A3A4E'}`,
                  }}
                >
                  <span className="block text-sm font-semibold text-white">{opt.label}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* # Cost estimate */}
          <div className="flex items-center justify-between px-4 py-3 rounded-lg mb-6" style={{ backgroundColor: '#1B2838' }}>
            <span className="text-xs text-slate-500">Estimated cost</span>
            <span className="text-sm font-bold" style={{ color: '#D4A853' }}>
              {videoType === 'all' ? '~$2.50' : videoType === 'long_form' ? '~$1.20' : '~$0.40'}
            </span>
          </div>

          {/* # Error message */}
          {error && (
            <div className="px-4 py-3 rounded-lg mb-4 text-sm" style={{ backgroundColor: 'rgba(231, 76, 60, 0.1)', color: '#E74C3C' }}>
              {error}
            </div>
          )}

          {/* # Generate button */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-3 rounded-lg text-sm font-bold transition-all"
            style={{
              backgroundColor: generating ? '#2A3A4E' : '#D4A853',
              color: generating ? '#6B7280' : '#0A1628',
              cursor: generating ? 'not-allowed' : 'pointer',
            }}
          >
            {generating ? 'Dispatching...' : 'Generate Video'}
          </button>
        </div>
      )}

      {/* # Active run progress */}
      {currentRun && (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#0D1B2A' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {currentRun.status === 'completed'
                ? currentRun.conclusion === 'success' ? 'Generation Complete' : 'Generation Failed'
                : 'Generating...'}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: conclusionStyle(currentRun.conclusion ?? (currentRun.status === 'completed' ? 'success' : null)).color + '20',
                color: conclusionStyle(currentRun.conclusion ?? (currentRun.status === 'completed' ? 'success' : null)).color,
              }}
            >
              {conclusionStyle(currentRun.conclusion ?? (currentRun.status === 'completed' ? 'success' : null)).label}
            </span>
          </div>

          {/* # Progress bar */}
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">Progress</span>
              <span style={{ color: '#D4A853' }}>{currentRun.progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#1B2838' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${currentRun.progress}%`,
                  backgroundColor: currentRun.conclusion === 'failure' ? '#E74C3C' : '#D4A853',
                }}
              />
            </div>
          </div>

          {/* # Step list */}
          {currentRun.steps.length > 0 && (
            <div className="flex flex-col gap-2 mt-4 mb-6">
              {currentRun.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      backgroundColor: step.status === 'completed'
                        ? (step.conclusion === 'success' ? '#2ECC71' : '#E74C3C')
                        : step.status === 'in_progress' ? '#D4A853' : '#1B2838',
                      color: step.status === 'completed' || step.status === 'in_progress' ? '#0A1628' : '#4B5563',
                    }}
                  >
                    {step.status === 'completed' ? (step.conclusion === 'success' ? '✓' : '✕') : ''}
                  </div>
                  <span className="text-sm" style={{ color: step.status === 'completed' ? '#E2E8F0' : '#6B7280' }}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* # GitHub link */}
          {currentRun.html_url && (
            <a
              href={currentRun.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline"
              style={{ color: '#D4A853' }}
            >
              View on GitHub Actions
            </a>
          )}

          {/* # Reset button when done */}
          {currentRun.status === 'completed' && (
            <button
              onClick={handleReset}
              className="w-full mt-4 py-3 rounded-lg text-sm font-bold transition-all"
              style={{ backgroundColor: '#1B2838', color: '#E2E8F0', border: '1px solid #2A3A4E' }}
            >
              Generate Another
            </button>
          )}
        </div>
      )}

      {/* # Recent pipeline runs */}
      {recentRuns.length > 0 && !currentRun && (
        <div className="rounded-xl p-6 mt-6" style={{ backgroundColor: '#0D1B2A' }}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Recent Runs
          </h3>
          <div className="flex flex-col gap-2">
            {recentRuns.map((run) => (
              <a
                key={run.id}
                href={run.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors hover:brightness-110"
                style={{ backgroundColor: '#1B2838' }}
              >
                <span className="text-sm text-slate-300">
                  {new Date(run.created_at).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                  })}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: conclusionStyle(run.conclusion).color + '20',
                    color: conclusionStyle(run.conclusion).color,
                  }}
                >
                  {conclusionStyle(run.conclusion).label}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
