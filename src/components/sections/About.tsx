import { motion } from 'framer-motion'
import { ArrowUpRight, Play, Sparkles } from 'lucide-react'
import { onlineImages } from '../../data/onlineImages'

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f8f8fb] px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:px-20 lg:py-32"
    >
      {/* BACKGROUND DETAILS */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-[#ff8a00]/5 blur-3xl" />

      <div className="mx-auto max-w-[1400px]">

        {/* =========================================
            TOP INTRO
        ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[2px] w-12 bg-[#ff8a00]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ff8a00] sm:text-[11px]">
                About Unseen Studio
              </span>
            </div>

            <h2
              className="max-w-[850px] text-[2.5rem] font-black leading-[0.95] tracking-[-0.055em] text-black sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]"
              style={{
                fontFamily:
                  'Inter, SF Pro Display, Helvetica Neue, sans-serif',
              }}
            >
              We create things
              <br />
              people
              <span
                className="ml-2 font-serif italic text-[#ff8a00] sm:ml-4"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                }}
              >
                remember.
              </span>
            </h2>
          </div>

          <div className="max-w-[300px] md:pb-2">
            <p className="text-sm leading-7 text-black/55 md:text-base">
              A creative studio where cinematic storytelling,
              technology and strategy come together to build
              meaningful brands.
            </p>
          </div>
        </motion.div>

        {/* =========================================
            MAIN EDITORIAL GRID
        ========================================= */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">

          {/* =========================================
              FOUNDER SIDE
          ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* FOUNDER IMAGE */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-black sm:rounded-[2.8rem]">

              <img
                src="/assets/images/founder.png"
                alt="Founder of Unseen Studio"
                className="h-[520px] w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.04] sm:h-[650px] lg:h-[720px]"
              />

              {/* IMAGE GRADIENT */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* SMALL LABEL */}
              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-md">
                  <Sparkles
                    size={13}
                    className="text-[#ff8a00]"
                  />

                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white">
                    The Founder
                  </span>
                </div>
              </div>

              {/* FOUNDER TEXT ON IMAGE */}
              <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ff8a00]">
                  Founder & Creative Director
                </p>

                <h3 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
                  Your Founder Name
                </h3>
              </div>
            </div>

            {/* FOUNDER SLOGAN */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative -mt-10 ml-5 mr-5 rounded-[1.7rem] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)] sm:-mt-14 sm:ml-10 sm:mr-10 sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/40">
                  Founder’s Note
                </span>

                <div className="h-2 w-2 rounded-full bg-[#ff8a00]" />
              </div>

              <p
                className="max-w-[650px] text-[1.5rem] font-medium leading-[1.2] tracking-[-0.035em] text-black sm:text-[2rem] md:text-[2.25rem]"
                style={{
                  fontFamily:
                    'Inter, SF Pro Display, Helvetica Neue, sans-serif',
                }}
              >
                “Great work isn't just seen.
                <span className="text-[#ff8a00]">
                  {' '}
                  It stays with you.
                </span>
                ”
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
                <span className="text-xs text-black/45">
                  Building ideas into experiences.
                </span>

                <ArrowUpRight
                  size={18}
                  className="text-[#ff8a00]"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* =========================================
              RIGHT CREATIVE SIDE
          ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col"
          >

            {/* SECOND IMAGE */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-black sm:rounded-[2.8rem]">
              <img
                src={onlineImages.creativeOffice}
                alt="A bright creative studio workspace"
                className="h-[400px] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04] sm:h-[500px] lg:h-[540px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

              {/* PLAY STYLE BUTTON */}
              <div className="absolute right-5 top-5 sm:right-7 sm:top-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Play
                    size={15}
                    fill="black"
                    className="ml-0.5 text-black"
                  />
                </div>
              </div>

              {/* IMAGE TEXT */}
              <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#ff8a00]">
                  Behind The Scenes
                </p>

                <h3 className="max-w-[450px] text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                  Where ideas become visual stories.
                </h3>
              </div>
            </div>

            {/* =========================================
                PHILOSOPHY BLOCK
            ========================================= */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* BLACK QUOTE */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="rounded-[1.8rem] bg-black p-7 sm:p-8"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
                    Our Philosophy
                  </span>

                  <span className="text-[#ff8a00]">✦</span>
                </div>

                <h3
                  className="text-2xl font-medium leading-[1.15] tracking-[-0.04em] text-white sm:text-3xl"
                  style={{
                    fontFamily:
                      'Inter, SF Pro Display, Helvetica Neue, sans-serif',
                  }}
                >
                  Think
                  <br />
                  <span className="font-serif italic text-[#ff8a00]">
                    different.
                  </span>
                  <br />
                  Make
                  <br />
                  impact.
                </h3>
              </motion.div>

              {/* APPROACH */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="rounded-[1.8rem] border border-black/5 bg-[#ff8a00] p-7 sm:p-8"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/50">
                    Our Approach
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-black"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">
                      01
                    </span>

                    <span className="text-lg font-bold">
                      Create
                    </span>
                  </div>

                  <div className="h-px bg-black/15" />

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">
                      02
                    </span>

                    <span className="text-lg font-bold">
                      Connect
                    </span>
                  </div>

                  <div className="h-px bg-black/15" />

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">
                      03
                    </span>

                    <span className="text-lg font-bold">
                      Impact
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* =========================================
            BOTTOM STATEMENT
        ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 border-t border-black/10 pt-10 sm:mt-20 sm:pt-12"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">

            <div>
              <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#ff8a00]">
                Why Unseen
              </p>

              <h3
                className="max-w-[850px] text-2xl font-bold leading-[1.15] tracking-[-0.04em] text-black sm:text-3xl md:text-4xl"
              >
                We don't just make content.
                <br />
                We build{' '}
                <span className="font-serif italic text-[#ff8a00]">
                  presence.
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#ff8a00]" />

              <span className="text-xs font-medium text-black/45">
                Creative · Strategy · Technology
              </span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
