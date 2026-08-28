import { motion } from 'framer-motion'
import { Services } from '../components/sections/Services'

export function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-16 md:pt-28">
      <section className="mx-auto max-w-7xl px-6 pb-10 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
            Our Services
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Creative, strategy-led services that grow your brand.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            From cinematic production to digital marketing and performance campaigns, we build tailored experiences that help businesses stand out.
          </p>
        </motion.div>
      </section>
      <Services showHeader={false} />
    </main>
  )
}
