import { motion } from 'framer-motion'
import { Gauge, Rocket, Film, Sparkles, LineChart, Gem } from 'lucide-react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'

const reasons = [
  {
    title: 'Creative Strategy',
    desc: 'Positioning, narrative arcs, and visual systems that feel premium and ownable.',
    icon: Gem,
  },
  {
    title: 'Result-Driven Campaigns',
    desc: 'Testing frameworks, attribution discipline, and relentless optimization.',
    icon: Gauge,
  },
  {
    title: 'Professional Production',
    desc: 'Director-level craft across film, audio, motion, and post.',
    icon: Film,
  },
  {
    title: 'Fast Delivery',
    desc: 'Rapid sprints without sacrificing quality — built for momentum.',
    icon: Rocket,
  },
  {
    title: 'Data-Driven Marketing',
    desc: 'Creative decisions informed by analytics, cohorts, and market signals.',
    icon: LineChart,
  },
  {
    title: 'Premium Quality Visuals',
    desc: 'Grade, typography, and UI polish that signals trust instantly.',
    icon: Sparkles,
  },
]

export function WhyChooseUs() {
  return (
    <section id="why" className="relative border-t border-foreground/[0.06] bg-charcoal py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.1),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why Unseen"
          title="Built for brands that refuse to look ordinary."
          subtitle="We operate at the intersection of story, design, and distribution — so your presence feels cinematic and your pipeline stays measurable."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <Reveal key={r.title} delay={0.05 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="glass-strong relative h-full overflow-hidden rounded-3xl p-6"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/10 blur-3xl" />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric/25 to-violet/20 text-foreground ring-1 ring-foreground/10">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{r.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
