import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { serviceCategories } from '../data/serviceCategories'


const mainLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Work', '/portfolio'],
  ['Gallery', '/gallery'],
  ['Process', '/process'],
  ['Journal', '/blog'],
]


export function Header() {
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const [activeServiceCategory, setActiveServiceCategory] =
    useState(0)

  const [mobileServicesOpen, setMobileServicesOpen] =
    useState(false)

  const [mobileServiceCategory, setMobileServiceCategory] =
    useState<number | null>(0)

  const [scrolled, setScrolled] = useState(false)


  /*
   * Keep false because the current design uses
   * a light header background.
   */
  const onDarkHero = false


  /* =========================================================
     SCROLL
     ========================================================= */

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


  /* =========================================================
     CLOSE MENU ON ROUTE CHANGE
     ========================================================= */

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }, [location.pathname])


  /* =========================================================
     LOCK PAGE SCROLL WHEN MOBILE MENU IS OPEN
     ========================================================= */

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])


  return (
    <header
      className={`
        site-header
        ${scrolled ? 'is-scrolled' : ''}
        ${onDarkHero ? 'is-on-dark' : ''}
      `}
    >
      <div className="site-header-inner">

        {/* =====================================================
            LOGO
           ===================================================== */}

        <Link
          to="/"
          className="site-wordmark"
          aria-label="Unseen Studios home"
        >
          <div
            style={{
              width: '180px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: '34px',
                fontWeight: 700,
                lineHeight: '0.85',
                letterSpacing: '-0.07em',
                color: 'currentColor',
              }}
            >
              UNSEEN
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '9px',
              }}
            >
              <span
                style={{
                  width: '22px',
                  height: '1px',
                  background: 'currentColor',
                  opacity: 0.35,
                }}
              />

              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '0.3em',
                  color: 'currentColor',
                  opacity: 0.55,
                }}
              >
                STUDIOS
              </span>
            </div>
          </div>
        </Link>


        {/* =====================================================
            DESKTOP NAVIGATION
           ===================================================== */}

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


          {/* ===================================================
              SERVICES DROPDOWN
             =================================================== */}

          <div
            className="site-services-menu"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              className={
                location.pathname.startsWith('/services')
                  ? 'is-active'
                  : ''
              }
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
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >

                  {/* ===========================================
                      LEFT SERVICE CATEGORY LIST
                     =========================================== */}

                  <div
                    className="site-service-categories"
                    role="menu"
                    aria-label="Service categories"
                  >
                    {serviceCategories.map(
                      (category, index) => (
                        <button
                          type="button"
                          key={category.title}
                          className={
                            activeServiceCategory === index
                              ? 'is-active'
                              : ''
                          }
                          onMouseEnter={() =>
                            setActiveServiceCategory(index)
                          }
                          onFocus={() =>
                            setActiveServiceCategory(index)
                          }
                          onClick={() =>
                            setActiveServiceCategory(index)
                          }
                          role="menuitem"
                        >
                          <span>
                            {category.number}
                          </span>

                          {category.title}

                          <ChevronRight />
                        </button>
                      ),
                    )}


                    {/* VIEW ALL SERVICES */}

                    <Link
                      to="/services"
                      className="site-services-all-link"
                    >
                      View all services

                      <ArrowUpRight />
                    </Link>
                  </div>


                  {/* ===========================================
                      RIGHT SERVICE DETAILS
                     =========================================== */}

                  <div className="site-service-submenu">
                    <motion.div
                      key={
                        serviceCategories[
                          activeServiceCategory
                        ].title
                      }
                      initial={{
                        opacity: 0,
                        x: 15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: 'easeOut',
                      }}
                    >
                      <p>
                        {
                          serviceCategories[
                            activeServiceCategory
                          ].title
                        }
                      </p>

                      <span>
                        {
                          serviceCategories[
                            activeServiceCategory
                          ].summary
                        }
                      </span>


                      <div>
                        {serviceCategories[
                          activeServiceCategory
                        ].services.map(
                          (service) => (
                            <Link
                              key={service.title}
                              to={service.to}
                            >
                              {service.title}

                              <ArrowUpRight />
                            </Link>
                          ),
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>


        {/* =====================================================
            HEADER ACTIONS
           ===================================================== */}

        <div className="site-header-actions">

          {/* START PROJECT */}

          <Link
            to="/contact"
            className="site-contact-link"
          >
            Start a project

            <ArrowUpRight />
          </Link>


          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className="site-menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu />
          </button>

        </div>
      </div>


      {/* =======================================================
          MOBILE MENU
         ======================================================= */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
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

            {/* =================================================
                MOBILE TOP
               ================================================= */}

            <div className="site-mobile-top">

              {/* MOBILE LOGO */}

              <Link
                to="/"
                className="site-wordmark"
                aria-label="Unseen Studios home"
              >
                <div
                  style={{
                    width: '160px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '30px',
                      fontWeight: 700,
                      lineHeight: '0.85',
                      letterSpacing: '-0.07em',
                      color: 'currentColor',
                    }}
                  >
                    UNSEEN
                  </h2>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      marginTop: '8px',
                    }}
                  >
                    <span
                      style={{
                        width: '20px',
                        height: '1px',
                        background: 'currentColor',
                        opacity: 0.4,
                      }}
                    />

                    <span
                      style={{
                        fontSize: '8px',
                        fontWeight: 500,
                        letterSpacing: '0.3em',
                        color: 'currentColor',
                        opacity: 0.55,
                      }}
                    >
                      STUDIOS
                    </span>
                  </div>
                </div>
              </Link>


              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X />
              </button>

            </div>


            {/* =================================================
                MOBILE NAVIGATION
               ================================================= */}

            <nav aria-label="Mobile navigation">

              {/* NORMAL NAVIGATION ITEMS */}

              {mainLinks.map(
                ([label, path], index) => (
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
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
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
                ),
              )}


              {/* =================================================
                  MOBILE SERVICES
                 ================================================= */}

              <motion.div
                className="site-mobile-services"
                initial={{
                  y: 45,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.46,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <button
                  type="button"
                  className="site-mobile-services-toggle"
                  aria-expanded={mobileServicesOpen}
                  onClick={() =>
                    setMobileServicesOpen(
                      (value) => !value,
                    )
                  }
                >
                  <span>
                    06
                  </span>

                  Services

                  <ChevronDown
                    className={
                      mobileServicesOpen
                        ? 'is-open'
                        : ''
                    }
                  />
                </button>


                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.div
                      className="site-mobile-services-panel"
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >

                      {/* VIEW ALL */}

                      <Link
                        to="/services"
                        className="site-mobile-view-all"
                      >
                        View all services

                        <ArrowUpRight />
                      </Link>


                      {/* SERVICE CATEGORIES */}

                      {serviceCategories.map(
                        (category, index) => (
                          <div
                            className="site-mobile-service-category"
                            key={category.title}
                          >
                            <button
                              type="button"
                              aria-expanded={
                                mobileServiceCategory ===
                                index
                              }
                              onClick={() =>
                                setMobileServiceCategory(
                                  (value) =>
                                    value === index
                                      ? null
                                      : index,
                                )
                              }
                            >
                              <span>
                                {category.number}
                              </span>

                              {category.title}

                              <ChevronDown
                                className={
                                  mobileServiceCategory ===
                                  index
                                    ? 'is-open'
                                    : ''
                                }
                              />
                            </button>


                            {/* SUB SERVICES */}

                            <AnimatePresence
                              initial={false}
                            >
                              {mobileServiceCategory ===
                                index && (
                                <motion.div
                                  className="site-mobile-service-links"
                                  initial={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    height: 'auto',
                                    opacity: 1,
                                  }}
                                  exit={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                  }}
                                >
                                  {category.services.map(
                                    (service) => (
                                      <Link
                                        to={service.to}
                                        key={
                                          service.title
                                        }
                                      >
                                        {
                                          service.title
                                        }

                                        <ArrowUpRight />
                                      </Link>
                                    ),
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ),
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>


              {/* =================================================
                  CONTACT
                 ================================================= */}

              <motion.div
                initial={{
                  y: 45,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.52,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link to="/contact">
                  <span>
                    07
                  </span>

                  Contact

                  <ArrowUpRight />
                </Link>
              </motion.div>

            </nav>


            {/* =================================================
                MOBILE META
               ================================================= */}

            <motion.div
              className="site-mobile-meta"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.65,
                duration: 0.5,
              }}
            >
              <span>
                Pune · India
              </span>

              <a
                href="mailto:hello.trijjamedia@gmail.com"
              >
                hello.trijjamedia@gmail.com
              </a>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
