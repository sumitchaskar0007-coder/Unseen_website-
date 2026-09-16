import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-[#f7f1ee]">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-[-12%] top-[-10%] h-[500px] w-[500px] rounded-full border border-[#d8b8ae]/25" />
        <div className="absolute bottom-[-18%] right-[-12%] h-[540px] w-[540px] rounded-full border border-[#d8b8ae]/25" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-12 xl:gap-16">
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative h-[420px] w-full max-w-[520px] overflow-hidden rounded-none bg-[#ece4e0] sm:h-[500px] lg:h-[560px] lg:max-w-[620px]">
            <img
              src="assets/images/h22.png"
              alt="Unseen Studio team"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="relative">
          <p className="max-w-xl text-base font-medium leading-relaxed text-[#2d2d2d] sm:text-lg">
            Working with this consulting firm was a turning point for our company. They quickly understood our challenges &amp; deliver .
          </p>

          <div className="mt-8 flex justify-end">
            <div className="flex items-center gap-3">
              <span className="block h-16 w-16 rounded-sm bg-[#f3a08c] sm:h-20 sm:w-20" />
              <span className="block h-10 w-10 rounded-sm bg-[#d7d1ce] sm:h-12 sm:w-12" />
            </div>
          </div>

          <div className="mt-4 text-[clamp(4.2rem,9vw,14rem)] font-black leading-[0.72] tracking-[-0.06em] text-[#1a1a1a]">
            <span className="block -mb-3 md:-mb-4">Creative</span>
            <span
              className="block text-transparent"
              style={{
                WebkitTextStroke: '2px #000000',
                textShadow: 'none',
              }}
            >
              Solution
            </span>
          </div>

          <div className="mt-7 flex items-center gap-5">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#141414] text-white shadow-lg sm:h-28 sm:w-28"
            >
              <ArrowRight className="h-8 w-8 sm:h-10 sm:w-10" />
            </motion.div>

            <p className="max-w-xs text-lg font-medium leading-snug text-[#2a2a2a] sm:text-2xl">
              <span className="block">Strategy. Design. Digital</span>
              <span className="block">Execution.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}