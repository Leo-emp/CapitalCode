// # Remotion configuration — 30fps, H.264, CRF 18
import { Config } from '@remotion/cli/config'

Config.setVideoImageFormat('jpeg')
Config.setOverwriteOutput(true)

// # Fonts/assets get up to 2 minutes before a frame is abandoned (default 28 s was too tight under load)
Config.setDelayRenderTimeoutInMilliseconds(120000)
