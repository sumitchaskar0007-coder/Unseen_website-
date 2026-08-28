import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Diamond } from 'lucide-react'
import { Link } from 'react-router-dom'

const Cta = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Manrope:wght@300;400;500;600;700;800&display=swap');

        :root {
          --font-heading: 'Manrope', sans-serif;
          --font-body: 'Inter', sans-serif;
        }

        /* ──────────── GLOBAL TEXT ──────────── */
        .cta-section,
        .cta-section * {
          font-weight: 700;
        }

        /* ──────────── HEADLINE ──────────── */
        .cta-h2 {
          font-family: var(--font-heading);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #0a0a0a;
          font-weight: 900;
        }

        .cta-h2 .w-bold {
          font-weight: 900;
          font-style: normal;
        }

        .cta-h2 .w-italic {
          font-weight: 900;
          font-style: italic;
        }

        /* ──────────── EYEBROW ──────────── */
        .cta-eyebrow {
          font-family: var(--font-body);
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        /* ──────────── BODY TEXT ──────────── */
        .cta-body {
          font-family: var(--font-body);
          font-size: clamp(0.78rem, 1.5vw, 0.88rem);
          font-weight: 700;
          line-height: 1.6;
          color: #4a4a4a;
          letter-spacing: 0.01em;
        }

        .cta-body strong {
          font-weight: 900;
          color: #0a0a0a;
        }

        /* ──────────── STAT CARDS ──────────── */
        .stat-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1px;
          border: 1px solid rgba(10,10,10,0.08);
          background: rgba(10,10,10,0.08);
          overflow: hidden;
          border-radius: 1rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          background: #fff;
          padding: clamp(12px,2vw,18px) clamp(16px,3vw,28px);
          flex: 1 1 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-num {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3.5vw, 2.2rem);
          font-weight: 900;
          font-style: italic;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .stat-label {
          font-family: var(--font-body);
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6a6a6a;
          margin-top: 4px;
          white-space: nowrap;
        }

        /* ──────────── PRIMARY BUTTON ──────────── */
        .btn-primary {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
          border: 1px solid transparent;
          padding: 12px 24px;
          border-radius: 999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(234, 88, 12, 0.2);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.2) 0%,
            rgba(255,255,255,0) 100%
          );
          pointer-events: none;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(234, 88, 12, 0.3);
        }

        .btn-primary span,
        .btn-primary svg {
          position: relative;
          z-index: 1;
        }

        /* ──────────── GHOST BUTTON ──────────── */
        .btn-ghost {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0a0a0a;
          background: rgba(255,255,255,0.92);
          border: 1.5px solid rgba(10,10,10,0.1);
          padding: 12px 24px;
          border-radius: 999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .btn-ghost:hover {
          border-color: #f97316;
          color: #f97316;
          transform: translateY(-2px);
        }

        /* ──────────── DIVIDER ──────────── */
        .ink-rule {
          width: 36px;
          height: 2px;
          background: #f97316;
          margin: 0 auto;
        }

        /* ──────────── TAGLINE ──────────── */
        .cta-tagline {
          font-family: var(--font-heading);
          font-style: italic;
          font-weight: 800;
          font-size: clamp(0.7rem, 1.2vw, 0.8rem);
          color: #6a6a6a;
          letter-spacing: 0.01em;
        }

        /* ──────────── CORNER MARKS ──────────── */
        .corner {
          position: absolute;
          width: 16px;
          height: 16px;
        }

        .corner.tl {
          top: 20px;
          left: 20px;
          border-top: 1.5px solid rgba(10,10,10,0.08);
          border-left: 1.5px solid rgba(10,10,10,0.08);
        }

        .corner.tr {
          top: 20px;
          right: 20px;
          border-top: 1.5px solid rgba(10,10,10,0.08);
          border-right: 1.5px solid rgba(10,10,10,0.08);
        }

        .corner.bl {
          bottom: 20px;
          left: 20px;
          border-bottom: 1.5px solid rgba(10,10,10,0.08);
          border-left: 1.5px solid rgba(10,10,10,0.08);
        }

        .corner.br {
          bottom: 20px;
          right: 20px;
          border-bottom: 1.5px solid rgba(10,10,10,0.08);
          border-right: 1.5px solid rgba(10,10,10,0.08);
        }

        /* ──────────── RESPONSIVE ──────────── */
        @media (max-width: 480px) {
          .corner {
            display: none;
          }

          .cta-h2 {
            font-size: clamp(1.6rem, 7vw, 2.2rem) !important;
          }

          .cta-eyebrow {
            font-size: 0.5rem !important;
          }

          .cta-body {
            font-size: 0.78rem !important;
          }

          .stat-num {
            font-size: 1.4rem !important;
          }

          .stat-label {
            font-size: 0.5rem !important;
          }

          .btn-primary,
          .btn-ghost {
            font-size: 0.6rem !important;
            padding: 10px 20px !important;
          }
        }

        @media (min-width: 481px) and (max-width: 640px) {
          .cta-h2 {
            font-size: clamp(2rem, 6vw, 2.6rem) !important;
          }

          .cta-eyebrow {
            font-size: 0.52rem !important;
          }

          .cta-body {
            font-size: 0.82rem !important;
          }

          .stat-num {
            font-size: 1.6rem !important;
          }

          .stat-label {
            font-size: 0.52rem !important;
          }

          .btn-primary,
          .btn-ghost {
            font-size: 0.62rem !important;
            padding: 11px 22px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .cta-h2 {
            font-size: clamp(2.4rem, 5vw, 3rem) !important;
          }

          .cta-eyebrow {
            font-size: 0.54rem !important;
          }

          .cta-body {
            font-size: 0.85rem !important;
          }

          .stat-num {
            font-size: 1.8rem !important;
          }

          .stat-label {
            font-size: 0.54rem !important;
          }

          .btn-primary,
          .btn-ghost {
            font-size: 0.64rem !important;
            padding: 12px 24px !important;
          }
        }
      `}</style>

      <section
        className="cta-section relative overflow-hidden"
        style={{
          background: '#ffffff',
          padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,48px)',
          borderTop: '1px solid rgba(10,10,10,0.08)',
        }}
      >
        {/* Corner registration marks */}
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />

        <div
          ref={ref}
          className="relative mx-auto flex flex-col items-center text-center"
          style={{ maxWidth: '720px' }}
        >
          {/* ── Eyebrow ── */}
          <motion.div
            className="flex items-center gap-2 mb-5"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <Diamond
              className="h-1.5 w-1.5 text-orange-500"
              fill="currentColor"
            />

            <span className="cta-eyebrow text-orange-500">
              Begin Your Transformation
            </span>

            <Diamond
              className="h-1.5 w-1.5 text-orange-500"
              fill="currentColor"
            />
          </motion.div>

          {/* ── Headline ── */}
          <motion.h2
            className="cta-h2 mb-4"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.55,
              ease: 'easeOut',
              delay: 0.06,
            }}
          >
            <span className="w-bold">
              Start Your{' '}
            </span>

            <span className=" text-orange-500">
              Journey
            </span>

            <br />

            <span className=" text-orange-500">
              Today{' '}
            </span>

            <span className="w-bold">
              &amp; Elevate
            </span>

            <br />

            <span className="w-bold">
              Your{' '}
            </span>

            <span className=" text-orange-500">
              Brand
            </span>
          </motion.h2>

          {/* ── Ink rule ── */}
          <motion.div
            className="ink-rule mb-5"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{
              duration: 0.45,
              ease: 'easeOut',
              delay: 0.18,
            }}
          />

          {/* ── Body ── */}
          <motion.p
            className="cta-body mb-6"
            style={{ maxWidth: '460px' }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.45,
              ease: 'easeOut',
              delay: 0.24,
            }}
          >
            Join <strong>100+ happy clients</strong> who trust Unseen Studio
            to craft cinematic digital experiences that command attention
            and convert with precision.
          </motion.p>

          {/* ── Stats ── */}
          <motion.div
            className="stat-grid w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.32,
            }}
          >
            <div className="stat-item">
              <span className="stat-num text-orange-500">
                100+
              </span>

              <span className="stat-label">
                Clients
              </span>
            </div>

            <div className="stat-item">
              <span className="stat-num text-orange-500">
                98%
              </span>

              <span className="stat-label">
                Satisfaction
              </span>
            </div>

            <div className="stat-item">
              <span className="stat-num text-orange-500">
                4.9★
              </span>

              <span className="stat-label">
                Rating
              </span>
            </div>
          </motion.div>

          {/* ── Buttons ── */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mb-6"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              delay: 0.38,
            }}
          >
            <Link
              to="/contact"
              className="btn-primary w-full sm:w-auto justify-center"
            >
              <span>Contact Us Now</span>

              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              to="/services"
              className="btn-ghost w-full sm:w-auto justify-center"
            >
              <span>Explore Services</span>
            </Link>
          </motion.div>

          {/* ── Tagline ── */}
          <motion.p
            className="cta-tagline"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.46,
            }}
          >
            No commitment required — let's simply talk.
          </motion.p>
        </div>
      </section>
    </>
  )
}

export default Cta