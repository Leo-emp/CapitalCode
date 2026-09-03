// # POST /api/generate — triggers GitHub Actions pipeline via workflow_dispatch
// # GET /api/generate?run_id=xxx — polls a specific workflow run for status
// # Auth required on both endpoints (Bearer token = DASHBOARD_PASSWORD)
import { NextRequest, NextResponse } from 'next/server'
import { authCheck } from '../auth'
import { envOr } from '@/lib/env'

// # GitHub API base for the CapitalCode repo
const GITHUB_API = 'https://api.github.com'

// # Trigger a new pipeline run via GitHub Actions workflow_dispatch
export async function POST(req: NextRequest) {
  const denied = authCheck(req)
  if (denied) return denied

  const githubToken = envOr('GITHUB_TOKEN', '')
  const repo = envOr('GITHUB_REPO', 'Leo-emp/CapitalCode')

  if (!githubToken) {
    return NextResponse.json(
      { error: 'GITHUB_TOKEN not configured' },
      { status: 500 }
    )
  }

  // # Parse optional body — topic, videoType
  let body: Record<string, string> = {}
  try {
    body = await req.json()
  } catch {
    // # Empty body is fine — pipeline picks its own topic
  }

  // # Dispatch the workflow with optional inputs
  const dispatchRes = await fetch(
    `${GITHUB_API}/repos/${repo}/actions/workflows/pipeline.yml/dispatches`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: 'main',
        inputs: {
          topic: body.topic ?? '',
          video_type: body.videoType ?? 'long_form',
        },
      }),
    }
  )

  // # 204 = success (GitHub returns no body)
  if (dispatchRes.status !== 204) {
    const errText = await dispatchRes.text()
    return NextResponse.json(
      { error: `GitHub dispatch failed: ${errText}` },
      { status: dispatchRes.status }
    )
  }

  // # Wait briefly then fetch the latest run ID so the frontend can poll it
  await new Promise((r) => setTimeout(r, 2000))

  const runsRes = await fetch(
    `${GITHUB_API}/repos/${repo}/actions/workflows/pipeline.yml/runs?per_page=1`,
    {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  )

  if (!runsRes.ok) {
    // # Dispatch succeeded but we couldn't fetch the run — return success anyway
    return NextResponse.json({ dispatched: true, run_id: null })
  }

  const runsData = await runsRes.json()
  const latestRun = runsData.workflow_runs?.[0]

  return NextResponse.json({
    dispatched: true,
    run_id: latestRun?.id ?? null,
    status: latestRun?.status ?? 'unknown',
    html_url: latestRun?.html_url ?? null,
  })
}

// # Poll a workflow run's status
export async function GET(req: NextRequest) {
  const denied = authCheck(req)
  if (denied) return denied

  const githubToken = envOr('GITHUB_TOKEN', '')
  const repo = envOr('GITHUB_REPO', 'Leo-emp/CapitalCode')
  const url = new URL(req.url)
  const runId = url.searchParams.get('run_id')

  if (!githubToken) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
  }

  // # If no run_id, return the 5 most recent runs
  if (!runId) {
    const runsRes = await fetch(
      `${GITHUB_API}/repos/${repo}/actions/workflows/pipeline.yml/runs?per_page=5`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!runsRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch runs' }, { status: 502 })
    }

    const data = await runsRes.json()
    const runs = (data.workflow_runs ?? []).map((r: any) => ({
      id: r.id,
      status: r.status,
      conclusion: r.conclusion,
      created_at: r.created_at,
      updated_at: r.updated_at,
      html_url: r.html_url,
    }))

    return NextResponse.json({ runs })
  }

  if (!/^\d+$/.test(runId)) {
    return NextResponse.json({ error: 'Invalid run ID' }, { status: 400 })
  }

  // # Fetch a specific run + its jobs for step-level progress
  const [runRes, jobsRes] = await Promise.all([
    fetch(`${GITHUB_API}/repos/${repo}/actions/runs/${runId}`, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }),
    fetch(`${GITHUB_API}/repos/${repo}/actions/runs/${runId}/jobs`, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }),
  ])

  if (!runRes.ok) {
    return NextResponse.json({ error: 'Run not found' }, { status: 404 })
  }

  const run = await runRes.json()
  const jobsData = jobsRes.ok ? await jobsRes.json() : { jobs: [] }

  // # Extract step-level progress from the first job
  const job = jobsData.jobs?.[0]
  const steps = (job?.steps ?? []).map((s: any) => ({
    name: s.name,
    status: s.status,
    conclusion: s.conclusion,
  }))

  // # Calculate progress percentage from completed steps
  const totalSteps = steps.length || 1
  const completedSteps = steps.filter((s: any) => s.status === 'completed').length
  const progress = Math.round((completedSteps / totalSteps) * 100)

  return NextResponse.json({
    id: run.id,
    status: run.status,
    conclusion: run.conclusion,
    progress,
    steps,
    created_at: run.created_at,
    updated_at: run.updated_at,
    html_url: run.html_url,
  })
}
