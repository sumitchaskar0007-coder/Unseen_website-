import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import type { EditablePageContent } from '../../data/pageContent'

export function Process({ content }: { content: EditablePageContent }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0.15, 0.85], ['6%', '-42%'])
  const steps = content.sections

  return (
    <section
      id="process"
      ref={ref}
      className="process-section relative border-t border-foreground/[0.06] bg-charcoal py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.07),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          subtitle={content.subtitle}
        />

        <Reveal>
          <div className="relative mt-4 md:mt-8">
            <div className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent md:block" />

            <div className="md:hidden">
              <ol className="space-y-5">
                {steps.map((s, idx) => (
                  <li key={s.id} className="glass rounded-2xl p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-electric">
                      Step {String(idx + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="hidden md:block">
              <motion.div style={{ x }} className="flex w-[160%] gap-6 lg:w-[140%]">
                {steps.map((s, idx) => (
                  <div key={s.id} className="relative w-[22%] shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-gradient-to-br from-electric/30 to-violet/20 text-sm font-bold text-ink-strong shadow-[0_0_40px_rgba(56,189,248,0.18)]">
                        {idx + 1}
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-foreground/20 to-transparent" />
                    </div>
                    <div className="mt-6 rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6 backdrop-blur-xl">
                      <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
