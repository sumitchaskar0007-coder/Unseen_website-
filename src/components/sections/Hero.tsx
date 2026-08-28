import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export function Hero() {
  const { scrollY } = useScroll()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const y1 = useTransform(scrollY, [0, 500], [0, isMobile ? 60 : 120])

  const y2 = useTransform(scrollY, [0, 500], [0, isMobile ? -40 : -80])

  const opacity = useTransform(scrollY, [0, 400], [1, 0.15])

  return (
    <section
      id="top"
      className="relative min-h-[calc(100svh-68px)] w-full overflow-hidden bg-white md:min-h-[calc(100svh-76px)] lg:min-h-[calc(100svh-84px)] xl:mt-4 xl:min-h-[calc(100svh-96px)] 2xl:mt-6"
      aria-labelledby="hero-heading"
    >
      {/* Solid orange base — mobile & tablet only. Desktop keeps the plain white/mesh look. */}
      <div className="absolute inset-0 bg-orange-500 lg:hidden" />

      {/* Background Elements */}
      <div className="mesh-gradient noise absolute inset-0" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{ opacity }}
      >
        <motion.div
          style={{ y: y1 }}
          className="absolute -left-1/4 top-1/4 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-orange-400/20 via-orange-300/10 to-transparent blur-3xl"
        />

        <motion.div
          style={{ y: y2 }}
          className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-orange-500/20 via-orange-300/10 to-transparent blur-3xl"
        />
      </motion.div>

      {/* Desktop overlay fades to white; mobile/tablet overlay fades to orange so the two blend */}
      <div className="absolute inset-0 hidden bg-gradient-to-b from-white/20 via-white/40 to-white lg:block" />
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/0 via-orange-500/10 to-orange-600/30 lg:hidden" />

      <div className="hero-grid pointer-events-none absolute inset-0 opacity-20" />

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[calc(100svh-68px)] w-full flex-col items-center justify-center gap-6 px-4 py-8 sm:min-h-[calc(100svh-68px)] sm:gap-8 sm:px-8 sm:py-10 md:min-h-[calc(100svh-76px)] lg:min-h-[calc(100svh-84px)] lg:justify-center lg:gap-0 lg:px-0 lg:py-0 xl:min-h-[calc(100svh-96px)]">

        {/* Company intro — mobile & tablet only, hidden at lg (desktop keeps the image-only hero) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl text-center lg:hidden"
        >
          <span className="inline-block rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm sm:text-xs">
            Unseen Studio
          </span>

          <h1
            id="hero-heading"
            className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl sm:leading-tight"
          >
            Creative Stories.<br />Real Growth.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
            We're a full-service digital marketing and production studio helping
            institutions, hospitality brands, and businesses across Maharashtra
            grow through documentary films, websites, SEO, and data-driven campaigns.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center xl:pt-20 2xl:pt-28"
        >
          <img
            src="/assets/images/h22.png"
            alt="Hero"
            className="w-full object-cover"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              margin: 0,
              padding: 0,
            }}
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 transform flex-col items-center gap-1 sm:bottom-6 sm:flex sm:gap-2 md:bottom-8"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 sm:text-xs lg:text-black/60">
          Scroll
        </span>

        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: 'easeInOut',
          }}
          className="inline-flex h-6 w-4 items-start justify-center rounded-full border border-white/40 pt-1 sm:h-7 sm:w-4.5 md:h-8 md:w-5 lg:border-black/20"
        >
          <span className="block h-1 w-1 rounded-full bg-white sm:h-1.5 sm:w-1.5 lg:bg-orange-500" />
        </motion.span>
      </motion.div>

      {/* Bottom Gradient — orange on mobile/tablet to match the base, white on desktop */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-24 bg-gradient-to-t from-white to-transparent sm:h-32 lg:block md:h-40" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-600/40 to-transparent sm:h-32 lg:hidden md:h-40" />
    </section>
  )
}
