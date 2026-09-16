import { motion } from 'framer-motion'

export function About() {
  return (
    <section className="relative overflow-hidden bg-[#f8f8fb] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-[620px]"
        >
          {/* TOP LABEL */}
          <div className="mb-7 flex items-center gap-4">
            <div className="h-[2px] w-14 bg-[#ff8a00]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#ff8a00]">
              About Unseen Studio
            </span>
          </div>

          {/* HEADING */}
         <h2
  className="
    max-w-2xl
    font-black
    tracking-[-0.05em]
    text-black
    leading-[1]
    text-[1.9rem]
    sm:text-[2.4rem]
    md:text-[3rem]
    lg:text-[3.5rem]
  "
  style={{
    fontFamily:
      'Inter, SF Pro Display, Helvetica Neue, sans-serif',
  }}
>
  A unseen studio
  <br />
  engineered for modern
  <br />

  <span
    className="italic text-[#ff8a00]"
    style={{
      fontFamily:
        'Playfair Display, serif',
    }}
  >
    influence.
  </span>
</h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              max-w-xl
              text-base
              leading-[1.9]
              text-black/60
              md:text-lg
            "
            style={{
              fontFamily:
                'Inter, sans-serif',
            }}
          >
            We blend cinematic craft with performance systems —
            building brands, campaigns, and platforms that feel
            inevitable in the feed and unforgettable on screen.
          </p>

          {/* SECOND TEXT */}
          <div className="mt-10 border-l-[3px] border-[#ff8a00] pl-5">
            <p
              className="
                max-w-xl
                text-sm
                leading-[2]
                text-black/65
                md:text-base
              "
            >
              Founded at the intersection of storytelling and data,
              Unseen Studio partners with ambitious brands to turn
              scroll-stopping content into measurable growth.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">

            {/* CARD 1 */}
            <div className="group rounded-[1.8rem] border border-black/5 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff8a00]/10 text-2xl">
                🎬
              </div>

              <h3 className="text-lg font-bold text-black">
                Cinematic Craft
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/60">
                Storytelling that connects emotionally.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="group rounded-[1.8rem] border border-black/5 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff8a00]/10 text-2xl">
                🎯
              </div>

              <h3 className="text-lg font-bold text-black">
                Data Driven
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/60">
                Performance-focused systems for growth.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="group rounded-[1.8rem] border border-black/5 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff8a00]/10 text-2xl">
                🚀
              </div>

              <h3 className="text-lg font-bold text-black">
                End to End
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/60">
                From concept to impactful execution.
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-5"
        >
          {/* LARGE IMAGE */}
          <div className="overflow-hidden rounded-[2.5rem] shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
            <img
              src="assets/images/a33.png"
              alt="Camera Studio"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5">

            {/* TOP IMAGE */}
            <div className="overflow-hidden rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
              <img
                src="assets/images/a2.png"
                alt="Creative Workspace"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* BOTTOM IMAGE */}
            <div className="overflow-hidden rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
              <img
                src="assets/images/a1.png"
                alt="Studio Editing"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}