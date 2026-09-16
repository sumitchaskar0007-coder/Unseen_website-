import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { serviceCategories } from '../data/serviceCategories'

const mainLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Work', '/portfolio'],
  ['Process', '/process'],
  ['Journal', '/blog'],
]

export function Header() {
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [activeServiceCategory, setActiveServiceCategory] = useState(0)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileServiceCategory, setMobileServiceCategory] = useState<number | null>(0)
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
    setMobileServicesOpen(false)
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
              className={location.pathname.startsWith('/services') ? 'is-active' : ''}
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
                  <div className="site-service-categories" role="menu" aria-label="Service categories">
                    {serviceCategories.map((category, index) => (
                      <button
                        type="button"
                        key={category.title}
                        className={activeServiceCategory === index ? 'is-active' : ''}
                        onMouseEnter={() => setActiveServiceCategory(index)}
                        onFocus={() => setActiveServiceCategory(index)}
                        onClick={() => setActiveServiceCategory(index)}
                        role="menuitem"
                      >
                        <span>{category.number}</span>
                        {category.title}
                        <ChevronRight />
                      </button>
                    ))}

                    <Link to="/services" className="site-services-all-link">
                      View all services
                      <ArrowUpRight />
                    </Link>
                  </div>

                  <div className="site-service-submenu">
                    <motion.div
                      key={serviceCategories[activeServiceCategory].title}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: .2 }}
                    >
                      <p>{serviceCategories[activeServiceCategory].title}</p>
                      <span>{serviceCategories[activeServiceCategory].summary}</span>

                      <div>
                        {serviceCategories[activeServiceCategory].services.map((service) => (
                          <Link key={service.title} to={service.to}>
                            {service.title}
                            <ArrowUpRight />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </div>
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
              {mainLinks.map(([label, path], index) => (
                <motion.div
                  key={path}
                  initial={{ y: 45, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + index * 0.055 }}
                >
                  <Link to={path}>
                    <span>0{index + 1}</span>
                    {label}
                    <ArrowUpRight />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="site-mobile-services"
                initial={{ y: 45, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: .46 }}
              >
                <button
                  type="button"
                  className="site-mobile-services-toggle"
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((value) => !value)}
                >
                  <span>06</span>
                  Services
                  <ChevronDown className={mobileServicesOpen ? 'is-open' : ''} />
                </button>

                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.div
                      className="site-mobile-services-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: .35 }}
                    >
                      <Link to="/services" className="site-mobile-view-all">
                        View all services <ArrowUpRight />
                      </Link>

                      {serviceCategories.map((category, index) => (
                        <div className="site-mobile-service-category" key={category.title}>
                          <button
                            type="button"
                            aria-expanded={mobileServiceCategory === index}
                            onClick={() => setMobileServiceCategory((value) => value === index ? null : index)}
                          >
                            <span>{category.number}</span>
                            {category.title}
                            <ChevronDown className={mobileServiceCategory === index ? 'is-open' : ''} />
                          </button>

                          <AnimatePresence initial={false}>
                            {mobileServiceCategory === index && (
                              <motion.div
                                className="site-mobile-service-links"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                              >
                                {category.services.map((service) => (
                                  <Link to={service.to} key={service.title}>
                                    {service.title}
                                    <ArrowUpRight />
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ y: 45, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: .52 }}
              >
                <Link to="/contact">
                  <span>07</span>
                  Contact
                  <ArrowUpRight />
                </Link>
              </motion.div>
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
