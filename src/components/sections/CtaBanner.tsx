import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MagneticButton } from '../MagneticButton'

export function CtaBanner() {
  return (
    <section id="cta" className="relative border-t border-foreground/[0.06] bg-void py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(56,189,248,0.35), rgba(168,85,247,0.35), rgba(56,189,248,0.35))',
            backgroundSize: '200% 200%',
          }}
        />
        <div className="absolute inset-0 bg-void/80 backdrop-blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/[0.04] p-10 shadow-[0_0_80px_rgba(168,85,247,0.12)] backdrop-blur-2xl md:p-14"
        >
          <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-electric/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-violet/25 blur-3xl" />

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-electric">Next move</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
            Let’s Build Something <span className="text-gradient">Powerful Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted sm:text-base">
            Tell us what you’re launching — we’ll respond with a sharp plan, timeline, and the right
            team for the outcome you’re chasing.
          </p>

          <div className="mt-8 flex justify-center">
            <MagneticButton>
              <Link
                to="/contact"
                className="btn-primary-solid inline-flex items-center justify-center px-10 py-4"
              >
                Book Free Consultation
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
