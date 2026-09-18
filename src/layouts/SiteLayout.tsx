import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { InnerPageHero } from '../components/InnerPageHero'

gsap.registerPlugin(ScrollTrigger)

export function SiteLayout() {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const [showIntro, setShowIntro] = useState(() => sessionStorage.getItem('unseen-site-intro') !== '1')
  const ownsHero = location.pathname === '/about' || location.pathname === '/blog' || location.pathname.startsWith('/blog/')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: .9 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenisRef.current = null }
  }, [])

  useEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => { window.history.scrollRestoration = previous }
  }, [])

  useLayoutEffect(() => {
    if (!showIntro || !introRef.current) return
    sessionStorage.setItem('unseen-site-intro', '1')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setShowIntro(false); return }
    const timeline = gsap.timeline({ onComplete: () => setShowIntro(false) })
    timeline.from('.site-intro-logo', { scale: .84, opacity: 0, duration: .7, ease: 'power3.out' })
      .from('.site-intro-name-image', { yPercent: 45, scale: .92, opacity: 0, duration: .8, ease: 'power4.out' }, '-=.35')
      .to({}, { duration: .35 })
      .to(introRef.current, { yPercent: -100, duration: .8, ease: 'power4.inOut' })
    return () => { timeline.kill() }
  }, [showIntro])

  useLayoutEffect(() => {
    const scrollToTop = () => {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    scrollToTop()
    const frame = window.requestAnimationFrame(scrollToTop)
    return () => window.cancelAnimationFrame(frame)
  }, [location.key])

  useLayoutEffect(() => {
    if (!mainRef.current || location.pathname === '/' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => {
      gsap.from('h1', { y: 42, opacity: 0, duration: .85, ease: 'power3.out' })
      gsap.utils.toArray<HTMLElement>('section').forEach((section, index) => {
        if (index === 0) return
        gsap.from(section, { y: 54, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 88%', once: true } })
      })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, { y: 46, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } })
      })
      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((element) => {
        gsap.from(element, { clipPath: 'inset(0 0 100% 0)', duration: 1.05, ease: 'power4.inOut', scrollTrigger: { trigger: element, start: 'top 84%', once: true } })
      })
      gsap.to('.inner-page-wave.wave-b', { xPercent: 8, ease: 'none', scrollTrigger: { trigger: '.inner-page-hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.utils.toArray<HTMLElement>('section img').forEach((image) => {
        gsap.fromTo(image, { scale: 1.035 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: .6 } })
      })
    }, mainRef)
    ScrollTrigger.refresh()
    return () => context.revert()
  }, [location.pathname])

  return (
    <>
      {showIntro && (
        <div className="site-intro" ref={introRef} aria-label="Unseen Studios">
          <img className="site-intro-logo" src="assets/images/lll.png" alt="" aria-hidden="true" />
          <div className="site-intro-name">
            <img className="site-intro-name-image" src="assets/images/work/comp_name/name.png" alt="Unseen Studios" />
          </div>
        </div>
      )}
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          id="main"
          ref={mainRef}
          initial={location.pathname === '/' ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`min-h-[calc(100svh-5.5rem)] ${location.pathname === '/' ? 'site-home-page' : 'site-inner-page'}`}
        >
          {location.pathname !== '/' && !ownsHero && <InnerPageHero />}
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
