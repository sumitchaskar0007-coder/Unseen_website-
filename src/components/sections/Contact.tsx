import { motion } from 'framer-motion'
import { AlertCircle, MapPin, MessageCircle, Send } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { getWhatsAppChatUrl, openWhatsAppWithMessage } from '../../config/whatsapp'
import { IconInstagram, IconLinkedin, IconX, IconYoutube } from '../icons/SocialIcons'
import { MagneticButton } from '../MagneticButton'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'

const services = [
  'Documentary Films',
  'Podcast & Jingles',
  'Video Ads',
  'Social Media Marketing',
  'Website Development',
  'Digital Marketing',
  'SEO Optimization',
  'Political Campaigns',
  'Bulk SMS Marketing',
  'Other / Not sure',
]

const fieldClass =
  'rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-[15px] text-black outline-none transition-[border-color,box-shadow] placeholder:text-black/25 focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20'

function buildInquiryMessage(fd: FormData) {
  const name = String(fd.get('name') ?? '').trim()
  const email = String(fd.get('email') ?? '').trim()
  const phone = String(fd.get('phone') ?? '').trim()
  const service = String(fd.get('service') ?? '').trim()
  const message = String(fd.get('message') ?? '').trim()

  return [
    'New inquiry — Unseen Studio website',
    '—',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    `Service: ${service}`,
    '—',
    'Message:',
    message,
  ].join('\n')
}

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const waQuick = getWhatsAppChatUrl()

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setStatus('idle')
    const fd = new FormData(e.currentTarget)
    const body = buildInquiryMessage(fd)

    const ok = openWhatsAppWithMessage(body)
    if (!ok) {
      setError('Could not open WhatsApp. Please try again.')
      setStatus('error')
      return
    }

    setStatus('sent')
    e.currentTarget.reset()
    window.setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="relative min-h-screen bg-white pb-20 pt-0 md:pb-28 md:pt-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,165,0,0.06),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Start a conversation — we'll reply where you already work."
          subtitle="Send the brief through the form. It opens WhatsApp with your details prefilled so we can respond fast."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
          <div className="space-y-8">
            <Reveal>
              <div className="contact-quick-actions">
                <MagneticButton className="contact-whatsapp-wrap">
                  <a
                    href={waQuick || 'https://wa.me/917709814062'}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-whatsapp-link"
                  >
                    <MessageCircle aria-hidden />
                    Chat on WhatsApp
                  </a>
                </MagneticButton>
                <div className="contact-social-links" aria-label="Social media links">
                  <a
                    href="https://www.instagram.com/unseenstudios.in"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="contact-social-link"
                  >
                    <IconInstagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/search/top?q=unseenstudio"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="contact-social-link"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@unseenstudios01"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="contact-social-link"
                  >
                    <IconYoutube className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="contact-social-link"
                  >
                    <IconLinkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X"
                    className="contact-social-link"
                  >
                    <IconX className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-2 border-b border-black/10 px-5 py-4">
                  <MapPin className="h-4 w-4 text-orange-500" aria-hidden />
                  <p className="text-sm font-medium text-black">Studio map</p>
                </div>
                <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-50 via-white to-gray-100">
                  <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-black/60 backdrop-blur-sm">
                      Map embed placeholder
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <motion.form
              onSubmit={onSubmit}
              className="relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_28px_100px_rgba(0,0,0,0.08)] md:p-9"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />

              {error ? (
                <div className="relative mb-5 flex gap-3 rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-600">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>{error}</span>
                </div>
              ) : null}

              <div className="relative grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/60">Name</span>
                    <input required name="name" autoComplete="name" className={fieldClass} placeholder="Your name" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/60">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={fieldClass}
                      placeholder="you@company.com"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/60">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    className={fieldClass}
                    placeholder="Include country code"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/60">Service</span>
                  <select name="service" required className={fieldClass} defaultValue="">
                    <option value="" disabled className="bg-white text-black/60">
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/60">Message</span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className={`${fieldClass} min-h-[140px] resize-y`}
                    placeholder="Goals, timeline, budget range, links…"
                  />
                </label>

                <MagneticButton className="pt-1">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 py-4 text-sm font-semibold text-white shadow-[0_0_45px_rgba(255,165,0,0.22)] transition-transform hover:scale-[1.01] hover:shadow-[0_0_60px_rgba(255,165,0,0.35)] sm:w-auto sm:min-w-[220px] sm:px-10"
                  >
                    <Send className="h-4 w-4" aria-hidden />
                    {status === 'sent' ? 'Sent — check WhatsApp' : 'Send via WhatsApp'}
                  </button>
                </MagneticButton>

              </div>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
