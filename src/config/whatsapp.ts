/**
 * Set `VITE_WHATSAPP_NUMBER` in `.env` (digits only, with country code, no spaces or +).
 * Default business number: +91 7709814062.
 */
export function getWhatsAppDigits(): string {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined
  return (raw || '917709814062').replace(/\D/g, '')
}

export function getWhatsAppChatUrl(text?: string): string | null {
  const digits = getWhatsAppDigits()
  if (!digits) return null
  if (!text?.trim()) return `https://wa.me/${digits}`
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export function openWhatsAppWithMessage(body: string): boolean {
  const url = getWhatsAppChatUrl(body)
  if (!url) return false
  window.open(url, '_blank', 'noopener,noreferrer')
  return true
}
