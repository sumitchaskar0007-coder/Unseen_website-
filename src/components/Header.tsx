import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  {
    to: '/services',
    label: 'Services',
    dropdown: [
      { to: '/services/film', label: 'Documentary Films' },
      { to: '/services/podcast', label: 'Podcast & Jingles' },
      { to: '/services/ads', label: 'Video Ads' },
      { to: '/services/webdev', label: 'Website Development' },
      { to: '/services/erp', label: 'ERP Software' },
      { to: '/services/marketing', label: 'Digital Marketing' },
      { to: '/services/seo', label: 'SEO Optimization' },
      { to: '/services/campaign', label: 'Political Campaigns' },
      { to: '/services/bulk', label: 'Bulk SMS Marketing' },
    ]
  },
  { to: '/why-unseen', label: 'Why Choose Us' },
  { to: '/portfolio', label: 'Our Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()

  // Dynamic background based on scroll
  const bg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255,255,255,1)', 'rgba(255,255,255,1)']
  )

  // Dynamic shadow for depth on scroll
  const shadow = useTransform(
    scrollY,
    [0, 100],
    [
      '0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)',
      '0 20px 35px -12px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05)',
    ]
  )

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false)
        setMobileDropdownOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Split dropdown items into two columns
  const services = links.find(link => link.label === 'Services')?.dropdown || []
  const midPoint = Math.ceil(services.length / 2)
  const leftColumn = services.slice(0, midPoint)
  const rightColumn = services.slice(midPoint)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Manrope:wght@300;400;500;600;700;800&display=swap');

        :root {
          --font-heading: 'Manrope', sans-serif;
          --font-body: 'Inter', sans-serif;
        }

        /* Custom scrollbar for dropdown */
        .dropdown-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .dropdown-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .dropdown-scroll::-webkit-scrollbar-thumb {
          background: #f59e0b;
          border-radius: 10px;
        }
        .dropdown-scroll::-webkit-scrollbar-thumb:hover {
          background: #d97706;
        }

        /* Smooth gradient animation */
        .gradient-hover {
          background-size: 200% 200%;
          transition: background-position 0.5s ease;
        }
        .gradient-hover:hover {
          background-position: 100% 100%;
        }

        /* Dropdown animation */
        .dropdown-menu {
          animation: slideDown 0.25s ease forwards;
          transform-origin: top center;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Responsive text size adjustments */
        @media (max-width: 640px) {
          .nav-text {
            font-size: 18px !important;
          }
          .mobile-nav-text {
            font-size: 20px !important;
          }
          .logo-size {
            height: 48px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .nav-text {
            font-size: 19px !important;
          }
          .mobile-nav-text {
            font-size: 21px !important;
          }
          .logo-size {
            height: 52px !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .nav-text {
            font-size: 20px !important;
          }
          .mobile-nav-text {
            font-size: 22px !important;
          }
          .logo-size {
            height: 56px !important;
          }
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
          .nav-text {
            font-size: 15px !important;
          }
          .logo-size {
            height: 60px !important;
          }
        }

        @media (min-width: 1281px) and (max-width: 1536px) {
          .nav-text {
            font-size: 16px !important;
          }
          .logo-size {
            height: 64px !important;
          }
        }

        @media (min-width: 1537px) {
          .nav-text {
            font-size: 17px !important;
          }
          .logo-size {
            height: 72px !important;
          }
        }

        /* Mobile menu item spacing */
        .mobile-menu-item {
          padding-top: 14px !important;
          padding-bottom: 14px !important;
        }

        @media (min-width: 640px) {
          .mobile-menu-item {
            padding-top: 16px !important;
            padding-bottom: 16px !important;
          }
        }

        /* CTA button responsive */
        .cta-button {
          padding: 10px 20px !important;
          font-size: 14px !important;
        }

        @media (min-width: 640px) {
          .cta-button {
            padding: 12px 24px !important;
            font-size: 15px !important;
          }
        }

        @media (min-width: 768px) {
          .cta-button {
            padding: 14px 28px !important;
            font-size: 16px !important;
          }
        }

        @media (min-width: 1024px) {
          .cta-button {
            padding: 16px 32px !important;
            font-size: 17px !important;
          }
        }

        @media (min-width: 1280px) {
          .cta-button {
            padding: 18px 36px !important;
            font-size: 18px !important;
          }
        }

        /* Increased spacing between nav links */
        .nav-link-spacing {
          margin-left: 8px !important;
          margin-right: 8px !important;
        }

        @media (min-width: 1280px) {
          .nav-link-spacing {
            margin-left: 12px !important;
            margin-right: 12px !important;
          }
        }

        @media (min-width: 1536px) {
          .nav-link-spacing {
            margin-left: 16px !important;
            margin-right: 16px !important;
          }
        }
      `}</style>

      <motion.header
        style={{
          backgroundColor: bg,
          boxShadow: shadow,
        }}
        className="fixed inset-x-0 top-0 z-50 transition-shadow duration-300"
      >
        <div className="relative">
          {/* Ambient glow behind logo area */}
          <div className="absolute left-1/2 top-0 h-32 w-96 -translate-x-1/2 rounded-full bg-amber-400/5 blur-3xl" />

          <div className="relative mx-auto flex max-w-[1536px] items-center justify-between px-3 py-3 lg:px-6 lg:py-4">
            {/* LEFT SECTION - Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex shrink-0 items-center"
            >
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-amber-400/20 blur-md" />
                  <img
                    src="/assets/images/lll.png"
                    alt="Logo"
                    className="logo-size relative w-auto object-contain transition-all duration-500"
                  />
                </div>
              </Link>
            </motion.div>

            {/* CENTER SECTION - Navigation links with maximum spacing */}
            <div className="hidden xl:flex xl:flex-1 xl:flex-col xl:items-center xl:justify-center xl:gap-1.5 2xl:gap-2">
              <Link
                to="/"
                className="group flex items-center gap-2 font-heading text-[12px] font-extrabold uppercase tracking-[0.32em] text-neutral-800 transition-colors duration-300 hover:text-amber-600 2xl:text-[13px]"
                aria-label="Unseen Studios home"
              >
                <span className="h-px w-7 bg-gradient-to-r from-transparent to-amber-500 transition-all duration-300 group-hover:w-9" />
                <span className="bg-gradient-to-r from-neutral-950 via-neutral-700 to-amber-600 bg-clip-text text-transparent">
                  Unseen Studios
                </span>
                <span className="h-px w-7 bg-gradient-to-l from-transparent to-amber-500 transition-all duration-300 group-hover:w-9" />
              </Link>

              <nav
                className="flex items-center gap-3 2xl:gap-5"
                aria-label="Primary navigation"
              >
                {links.map((link, idx) => (
                  <div key={link.to} className="relative dropdown-container nav-link-spacing">
                    {link.dropdown ? (
                      // Services with Dropdown
                      <div
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <NavLink
                          to={link.to}
                          end={link.to === '/'}
                          className={({ isActive }) =>
                            `relative flex items-center gap-1 nav-text font-semibold tracking-tight transition-all duration-300 font-heading px-2 py-1.5 rounded-lg ${
                              isActive || location.pathname.startsWith('/services/')
                                ? 'text-amber-600 bg-amber-50/50'
                                : 'text-neutral-600 hover:text-amber-500 hover:bg-amber-50/30'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <motion.div
                              className="group relative flex items-center gap-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.03 }}
                            >
                              <span className="relative z-10 font-semibold">{link.label}</span>
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${
                                  dropdownOpen ? 'rotate-180' : ''
                                }`}
                              />
                              <motion.span
                                className={`absolute -bottom-0.5 left-0 h-[2.5px] rounded-full bg-gradient-to-r from-amber-400 to-amber-600 ${
                                  isActive || location.pathname.startsWith('/services/') ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                                layoutId={`nav-underline-${link.label}`}
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                              />
                            </motion.div>
                          )}
                        </NavLink>

                        {/* Two-Column Dropdown Menu */}
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-1/2 top-full mt-2 w-[560px] -translate-x-1/2 rounded-2xl bg-white shadow-2xl shadow-black/10 border border-neutral-100/80 backdrop-blur-sm overflow-hidden"
                              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.05)' }}
                            >
                              <div className="dropdown-scroll max-h-[420px] overflow-y-auto p-3">
                                {/* Header with icon */}
                                <div className="mb-3 flex items-center gap-2 px-3 py-2">
                                  <div className="h-6 w-1 rounded-full bg-gradient-to-b from-amber-400 to-orange-500" />
                                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                                    Our Services
                                  </span>
                                </div>

                                {/* Two Column Grid */}
                                <div className="grid grid-cols-2 gap-1">
                                  {/* Left Column */}
                                  <div className="space-y-1 pr-2">
                                    {leftColumn.map((subLink, subIdx) => (
                                      <motion.div
                                        key={subLink.to}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: subIdx * 0.02 }}
                                      >
                                        <NavLink
                                          to={subLink.to}
                                          onClick={() => setDropdownOpen(false)}
                                          className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                              isActive
                                                ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 text-amber-600'
                                                : 'text-neutral-600 hover:bg-amber-50/50 hover:text-amber-500'
                                            }`
                                          }
                                        >
                                          <div className="h-1.5 w-1.5 rounded-full bg-amber-400/60 flex-shrink-0" />
                                          <span className="flex-1">{subLink.label}</span>
                                        </NavLink>
                                      </motion.div>
                                    ))}
                                  </div>

                                  {/* Right Column */}
                                  <div className="space-y-1 pl-2">
                                    {rightColumn.map((subLink, subIdx) => (
                                      <motion.div
                                        key={subLink.to}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (midPoint + subIdx) * 0.02 }}
                                      >
                                        <NavLink
                                          to={subLink.to}
                                          onClick={() => setDropdownOpen(false)}
                                          className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                              isActive
                                                ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 text-amber-600'
                                                : 'text-neutral-600 hover:bg-amber-50/50 hover:text-amber-500'
                                            }`
                                          }
                                        >
                                          <div className="h-1.5 w-1.5 rounded-full bg-amber-400/60 flex-shrink-0" />
                                          <span className="flex-1">{subLink.label}</span>
                                        </NavLink>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>

                                {/* Footer with view all link */}
                                <div className="mt-3 border-t border-neutral-100 pt-3">
                                  <NavLink
                                    to="/services"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-amber-600 transition-all duration-200 hover:bg-amber-50"
                                  >
                                    View All Services
                                    <ChevronRight className="h-4 w-4" />
                                  </NavLink>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      // Regular Links
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          `relative nav-text font-semibold tracking-tight transition-all duration-300 font-heading px-2 py-1.5 rounded-lg ${
                            isActive
                              ? 'text-amber-600 bg-amber-50/50'
                              : 'text-neutral-600 hover:text-amber-500 hover:bg-amber-50/30'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <motion.div
                            className="group relative"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                          >
                            <span className="relative z-10 font-semibold">{link.label}</span>
                            <motion.span
                              className={`absolute -bottom-0.5 left-0 h-[2.5px] rounded-full bg-gradient-to-r from-amber-400 to-amber-600 ${
                                isActive ? 'w-full' : 'w-0 group-hover:w-full'
                              }`}
                              layoutId={`nav-underline-${link.label}`}
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          </motion.div>
                        )}
                      </NavLink>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* RIGHT SECTION - CTA Button + Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              {/* CTA BUTTON */}
              <motion.div
                className="hidden sm:flex"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="cta-button group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-500 font-bold tracking-tight text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30 font-heading"
                >
                  <span className="relative z-10 flex items-center gap-2 md:gap-2.5">
                    <span className="hidden xs:inline">Start</span> Project
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-4.5 md:w-4.5" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </Link>
              </motion.div>

              {/* MOBILE MENU BUTTON */}
              <motion.button
                onClick={() => setOpen(!open)}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all duration-300 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 md:h-11 md:w-11 xl:hidden"
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle menu"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
                >
                  {open ? <X className="h-4 w-4 md:h-5 md:w-5" /> : <Menu className="h-4 w-4 md:h-5 md:w-5" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden border-t border-neutral-100 bg-white/95 backdrop-blur-md xl:hidden"
              >
                <div className="flex max-h-[calc(100vh-80px)] flex-col gap-1 overflow-y-auto px-3 py-5 md:px-4 md:py-6">
                  {links.map((link, idx) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.3 }}
                    >
                      {link.dropdown ? (
                        // Mobile dropdown
                        <div>
                          <button
                            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                            className={`mobile-menu-item flex w-full items-center justify-between rounded-xl px-4 mobile-nav-text font-bold tracking-tight transition-all duration-200 font-heading md:px-5 ${
                              location.pathname.startsWith('/services/')
                                ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 text-amber-600'
                                : 'text-neutral-700 hover:bg-neutral-50 hover:text-amber-500'
                            }`}
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className={`h-5 w-5 transition-transform duration-300 ${
                                mobileDropdownOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-2 mt-2 flex flex-col gap-1 border-l-2 border-amber-200/50 pl-3">
                                  {services.map((subLink, subIdx) => (
                                    <motion.div
                                      key={subLink.to}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIdx * 0.02 }}
                                    >
                                      <NavLink
                                        to={subLink.to}
                                        onClick={() => {
                                          setOpen(false)
                                          setMobileDropdownOpen(false)
                                        }}
                                        className={({ isActive }) =>
                                          `flex items-center gap-3 rounded-xl px-4 py-3.5 text-[16px] font-medium transition-all duration-200 md:text-[17px] ${
                                            isActive
                                              ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 text-amber-600'
                                              : 'text-neutral-600 hover:bg-amber-50/50 hover:text-amber-500'
                                          }`
                                        }
                                      >
                                        <div className="h-2 w-2 rounded-full bg-amber-400/60 flex-shrink-0" />
                                        <span>{subLink.label}</span>
                                      </NavLink>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <NavLink
                          to={link.to}
                          end={link.to === '/'}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `mobile-menu-item flex items-center justify-between rounded-xl px-4 mobile-nav-text font-bold tracking-tight transition-all duration-200 font-heading md:px-5 ${
                              isActive
                                ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 text-amber-600'
                                : 'text-neutral-700 hover:bg-neutral-50 hover:text-amber-500'
                            }`
                          }
                        >
                          <span>{link.label}</span>
                          {link.to === '/' && (
                            <span className="text-xs text-amber-500">🏠</span>
                          )}
                        </NavLink>
                      )}
                    </motion.div>
                  ))}

                  {/* MOBILE CTA BUTTON */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="mt-4 px-1 md:mt-6"
                  >
                    <Link
                      to="/contact"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4.5 text-center text-[18px] font-bold tracking-tight text-white shadow-lg shadow-amber-500/20 transition-all duration-300 active:scale-[0.98] font-heading md:text-[20px]"
                    >
                      Start Project
                      <ArrowRight className="h-4.5 w-4.5 md:h-5 md:w-5" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Premium backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 -z-10 bg-black/30 backdrop-blur-sm xl:hidden"
              />
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-[68px] md:h-[76px] lg:h-[84px] xl:h-[96px]" />
    </>
  )
}

export default Header