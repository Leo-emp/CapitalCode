// # Webhook alerting — sends Discord/Slack notifications
// # Never throws — alert failures are non-fatal
import { envOr } from './env'

export async function sendAlert(
  type: string,
  message: string,
  attachments?: string[]
): Promise<void> {
  const webhookUrl = envOr('ALERT_WEBHOOK_URL', '')
  if (!webhookUrl) {
    // # No webhook configured — just log
    console.log(`[Alert] ${type}: ${message}`)
    return
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `**[CapitalCode ${type}]** ${message}`,
        embeds: attachments?.map((url) => ({ image: { url } })),
      }),
    })
  } catch (err) {
    // # Alert failures never crash the pipeline
    console.error(`[Alert] Failed to send: ${err}`)
  }
}
