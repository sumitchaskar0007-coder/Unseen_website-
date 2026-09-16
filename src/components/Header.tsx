import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const mainLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Work', '/portfolio'],
  ['Process', '/process'],
  ['Journal', '/blog'],
]

const serviceLinks = [
  ['Film & Production', '/services/film'],
  ['Podcasts & Audio', '/services/podcast'],
  ['Web Development', '/services/webdev'],
  ['Digital Marketing', '/services/marketing'],
  ['SEO & Search', '/services/seo'],
]

export function Header() {
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const onDarkHero = false

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36)
    }

    onScroll()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`site-header ${
        scrolled ? 'is-scrolled' : ''
      } ${onDarkHero ? 'is-on-dark' : ''}`}
    >
      <div className="site-header-inner">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="site-wordmark"
          aria-label="Unseen Studios home"
        >
          <img
            className="site-wordmark-image"
            src="assets/images/work/comp_name/logo.jpeg"
            alt="Unseen Studios"
            style={{
              width: '180px',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav
          className="site-desktop-nav"
          aria-label="Main navigation"
        >
          {mainLinks.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className={
                location.pathname === path
                  ? 'is-active'
                  : ''
              }
            >
              {label}
            </Link>
          ))}

          {/* SERVICES */}
          <div
            className="site-services-menu"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              onClick={() =>
                setServicesOpen((value) => !value)
              }
            >
              Services
              <ChevronDown />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  className="site-services-popover"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                  }}
                  transition={{
                    duration: 0.22,
                  }}
                >
                  {serviceLinks.map(
                    ([label, path], index) => (
                      <Link
                        key={path}
                        to={path}
                      >
                        <span>
                          0{index + 1}
                        </span>

                        {label}

                        <ArrowUpRight />
                      </Link>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* ================= HEADER ACTIONS ================= */}
        <div className="site-header-actions">

          <Link
            to="/contact"
            className="site-contact-link"
          >
            Start a project
            <ArrowUpRight />
          </Link>

          <button
            type="button"
            className="site-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>

        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="site-mobile-menu"
            initial={{
              y: '-100%',
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: '-100%',
            }}
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
          >

            {/* MOBILE TOP */}
            <div className="site-mobile-top">

              <Link
                to="/"
                className="site-wordmark"
                aria-label="Unseen Studios home"
              >
                <img
                  className="site-wordmark-image"
                  src="assets/images/work/comp_name/logo.jpeg"
                  alt="Unseen Studios"
                  style={{
                    width: '160px',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X />
              </button>

            </div>

            {/* MOBILE NAV */}
            <nav aria-label="Mobile navigation">

              {[
                ...mainLinks,
                ['Services', '/services'],
                ['Contact', '/contact'],
              ].map(([label, path], index) => (

                <motion.div
                  key={path}
                  initial={{
                    y: 45,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.18 + index * 0.055,
                  }}
                >

                  <Link to={path}>

                    <span>
                      0{index + 1}
                    </span>

                    {label}

                    <ArrowUpRight />

                  </Link>

                </motion.div>

              ))}

            </nav>

            {/* MOBILE META */}
            <div className="site-mobile-meta">

              <span>
                Pune · India
              </span>

              <a href="mailto:hello.trijjamedia@gmail.com">
                hello.trijjamedia@gmail.com
              </a>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}