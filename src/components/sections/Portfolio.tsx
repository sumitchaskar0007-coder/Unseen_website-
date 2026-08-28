import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'

const cats = ['All', 'Ads', 'Branding', 'Political Campaigns', 'Social Media', 'Films'] as const
type Cat = (typeof cats)[number]

type Item = {
  title: string
  cat: Exclude<Cat, 'All'>
  image: string
}

const items: Item[] = [
  {
    title: 'Neon Velocity Launch',
    cat: 'Ads',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Monolith Rebrand',
    cat: 'Branding',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Field Operations Film',
    cat: 'Political Campaigns',
    image:
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Always-On Social System',
    cat: 'Social Media',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Midnight Documentary',
    cat: 'Films',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Product Mythology',
    cat: 'Ads',
    image:
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1200&q=80',
  },
]

export function Portfolio() {
  const [filter, setFilter] = useState<Cat>('All')

  const visible = useMemo(() => {
    if (filter === 'All') return items
    return items.filter((i) => i.cat === filter)
  }, [filter])

  return (
    <section id="portfolio" className="relative border-t border-foreground/[0.06] bg-void py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Cinematic case studies — built to convert attention into outcomes."
          subtitle="Hover to preview motion treatments. Each project pairs bold creative with distribution intelligence."
        />

        <Reveal className="mb-10 flex flex-wrap gap-2">
          {cats.map((c) => {
            const active = filter === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  active
                    ? 'border-transparent bg-gradient-to-r from-electric to-violet text-ink-strong shadow-[0_0_30px_rgba(56,189,248,0.25)]'
                    : 'border-foreground/10 bg-foreground/5 text-muted hover:border-foreground/20 hover:text-foreground'
                }`}
              >
                {c}
              </button>
            )
          })}
        </Reveal>

        <motion.ul layout className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.li
                layout
                key={p.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mb-5 break-inside-avoid"
              >
                <article className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-elevated">
                  <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                    <motion.img
                      layout
                      src={p.image}
                      alt={`${p.title} — ${p.cat} case study thumbnail`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-80" />

                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
                    >
                      <div className="absolute inset-0 translate-x-[-45%] bg-[linear-gradient(115deg,transparent_35%,rgba(56,189,248,0.35)_50%,rgba(168,85,247,0.35)_55%,transparent_70%)] transition-transform duration-[1100ms] ease-out group-hover:translate-x-[45%]" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-md">
                        <Play className="h-6 w-6 text-foreground" aria-hidden />
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-electric">{p.cat}</p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{p.title}</h3>
                      <Link
                        to="/contact"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground/90 transition-colors hover:text-foreground"
                      >
                        View Case Study
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
