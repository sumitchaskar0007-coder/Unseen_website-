import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Crown, Globe2, Minus, Network, Play, Plus, Quote, Trophy } from 'lucide-react'
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { A11y, Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { serviceCategories } from '../data/serviceCategories'
import { onlineImages } from '../data/onlineImages'
import { cmsService } from '../services/cmsService'
import './home-premium.css'

gsap.registerPlugin(ScrollTrigger)

const defaultPeople = [
  { name: 'Govind Budhwant', role: 'Founder & Creative Director', image: 'assets/images/founder.png', instagram: 'https://www.instagram.com/unseenstudios.in', linkedin: 'https://www.linkedin.com/company/collage-digital-marketing-technologies/' },
  { name: 'Creative Collective', role: 'Film & Production', image: onlineImages.cameraOperator, instagram: 'https://www.instagram.com/unseenstudios.in', linkedin: 'https://www.linkedin.com/company/collage-digital-marketing-technologies/' },
  { name: 'Digital Studio', role: 'Design & Technology', image: onlineImages.developerWorkspace, instagram: 'https://www.instagram.com/unseenstudios.in', linkedin: 'https://www.linkedin.com/company/collage-digital-marketing-technologies/' },
  { name: 'Growth Team', role: 'Strategy & Performance', image: onlineImages.agencyTeam, instagram: 'https://www.instagram.com/unseenstudios.in', linkedin: 'https://www.linkedin.com/company/collage-digital-marketing-technologies/' },
]

const awards = [
  ['2019', 'Independent studio founded', 'Pune, India'],
  ['2022', 'Creative excellence recognition', 'Brand & Film'],
  ['2024', '100+ collaborations delivered', 'Across Maharashtra'],
  ['2026', 'Full-service digital studio', 'Ideas to impact'],
]

const defaultTestimonials = [
  { quote: 'Unseen Studio brought our website, ERP and search presence together with unusual clarity. The team understood the institution, not just the brief.', name: 'Jadhavar Group of Institutes', role: 'Education partner' },
  { quote: 'Their creative direction made our brand communication feel premium and consistent. We saw the difference in both attention and response.', name: 'Hotel Chava', role: 'Hospitality partner' },
  { quote: 'From content to digital execution, the team is thoughtful, quick and deeply collaborative. They feel like an extension of our own team.', name: 'Pune Medical Foundation', role: 'Healthcare partner' },
]

const faqs = [
  ['What kind of projects do you take on?', 'We partner on brand films, websites, digital products, social campaigns, SEO and integrated growth programs. The best fit is a meaningful challenge that needs both creative and strategic thinking.'],
  ['How does your process work?', 'Every engagement moves through four clear stages: discover, define, create and grow. You always know what we are making, why it matters and what comes next.'],
  ['How long does a project take?', 'Focused campaigns can launch in two to four weeks. Larger websites, brand systems and production engagements usually take six to twelve weeks.'],
  ['Can you redesign an existing website?', 'Yes. We can refresh the experience, messaging and technology while protecting the brand equity and useful content you already have.'],
  ['Do you provide ongoing support?', 'Yes. We offer retained creative, content, SEO, performance and product support after launch.'],
]

const homepageDefaults = {
  heroHeading: 'Ideas with clarity. Built for impact.',
  heroDescription: 'We turn ambitious ideas into memorable brands, films and digital experiences—combining strategy, design and production in one focused team.',
  primaryButton: 'Explore our work',
  secondaryButton: 'View services',
  heroImage: '',
  aboutHeading: 'We bridge the gap between brands and modern digital experiences.',
  aboutDescription: 'Unseen Studios is an independent creative company in Pune. We unite strategy, filmmaking, design, technology and growth so every idea moves with one clear direction.',
  aboutImage: '',
  aboutCta: 'Discover our story',
  projects: '100+',
  clients: '45+',
  years: '7+',
  awards: '11',
  founderName: 'Govind Budhwant',
  founderRole: 'Founder & Creative Director',
  founderBio: 'Govind founded Unseen Studios to build a more thoughtful kind of creative partner—close to the business, curious about the audience and uncompromising about the craft.',
  founderImage: '',
  ctaHeading: 'Have a project in mind?',
  ctaDescription: 'Let’s turn your idea into an experience people remember.',
  ctaButton: "Let's talk",
  ctaLink: '/contact',
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`hp-eyebrow ${dark ? 'is-dark' : ''}`}><span />{children}</p>
}

function RoundLink({ to, label, dark = false }: { to: string; label: string; dark?: boolean }) {
  return <Link to={to} className={`hp-round-link ${dark ? 'is-dark' : ''}`} data-cursor="OPEN"><span>{label}</span><ArrowUpRight /></Link>
}

export function HomePage() {
  const root = useRef<HTMLDivElement>(null)
  const cursor = useRef<HTMLDivElement>(null)
  const cursorLabel = useRef<HTMLSpanElement>(null)
  const [openFaq, setOpenFaq] = useState(0)
  const [activeService, setActiveService] = useState(0)
  const [, setContentRevision] = useState(0)

  useEffect(() => {
    let active = true
    Promise.allSettled([
      ...['projects', 'clients', 'blogs', 'testimonials', 'services', 'team'].map((collection) => cmsService.sync(collection)),
      cmsService.syncValue('homepage'),
    ]).then(() => { if (active) setContentRevision((revision) => revision + 1) })
    return () => { active = false }
  }, [])

  useLayoutEffect(() => {
    if (!root.current) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {

      gsap.timeline()
        .from('.hp-collage-card', {
          clipPath: 'inset(0 100% 0 0)',
          scale: 1.04,
          stagger: .08,
          duration: .85,
          ease: 'power4.inOut'
        })
        .from(['.hp-collage-kicker', '.hp-collage-note'], {
          y: 24,
          opacity: 0,
          stagger: .08,
          duration: .6
        }, '-=.45')
        .from('.hp-title-line > span', {
          yPercent: 115,
          stagger: .1,
          duration: 1.05,
          ease: 'power4.out'
        }, '-=.4')
        .from(['.hp-collage-intro', '.hp-collage-action'], {
          y: 24,
          opacity: 0,
          stagger: .08,
          duration: .65
        }, '-=.5')

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) =>
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: .9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true
          }
        })
      )

      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) =>
        gsap.from(el, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true
          }
        })
      )

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) =>
        gsap.fromTo(
          el,
          {
            yPercent: -5,
            scale: 1.08
          },
          {
            yPercent: 5,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              scrub: .7,
              start: 'top bottom',
              end: 'bottom top'
            }
          }
        )
      )

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const value = { n: 0 }

        gsap.to(value, {
          n: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          },
          onUpdate: () => {
            el.textContent = `${Math.round(value.n)}${el.dataset.suffix || ''}`
          }
        })
      })

      gsap.from('.hp-award-line', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hp-awards-list',
          start: 'top 75%',
          end: 'bottom 75%',
          scrub: true
        }
      })

    }, root)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!cursor.current || window.matchMedia('(pointer: coarse)').matches) return

    const x = gsap.quickTo(cursor.current, 'x', {
      duration: .22,
      ease: 'power3'
    })

    const y = gsap.quickTo(cursor.current, 'y', {
      duration: .22,
      ease: 'power3'
    })

    const move = (event: MouseEvent) => {
      x(event.clientX)
      y(event.clientY)
    }

    const over = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-cursor]')

      cursor.current?.classList.toggle(
        'is-active',
        Boolean(target)
      )

      if (cursorLabel.current) {
        cursorLabel.current.textContent = target?.dataset.cursor || ''
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
    }
  }, [])

  const cmsPeople = cmsService.published('team').map((item) => ({
    name: String(item.name || 'Team member'),
    role: String(item.designation || item.department || 'Unseen Studios'),
    image: String(item.image || onlineImages.cameraOperator),
    instagram: String(item.instagram || 'https://www.instagram.com/unseenstudios.in'),
    linkedin: String(item.linkedin || 'https://www.linkedin.com/company/collage-digital-marketing-technologies/'),
  }))
  const people = cmsPeople.length ? cmsPeople : defaultPeople
  const cmsTestimonials = cmsService.published('testimonials').map((item) => ({
    quote: String(item.description || ''),
    name: String(item.name || 'Client'),
    role: [item.designation, item.company].filter(Boolean).join(' · ') || 'Client partner',
  }))
  const testimonials = cmsTestimonials.length ? cmsTestimonials : defaultTestimonials
  const cmsClients = cmsService.published('clients')
    .filter((item) => Boolean(item.image))
    .map((item) => ({ name: String(item.name || item.company || 'Client'), logo: String(item.image) }))
  const defaultClientLogos = Array.from({ length: 25 }, (_, index) => ({ name: `Client ${index + 1}`, logo: `assets/client/c${index + 1}.png` }))
  const clientSet = cmsClients.length ? cmsClients : defaultClientLogos
  const clients = [...clientSet, ...clientSet]
  const homepage = { ...homepageDefaults, ...cmsService.get<Partial<typeof homepageDefaults>>('homepage', homepageDefaults) }
  const existingServiceNames = new Set(serviceCategories.flatMap((category) => category.services.map((service) => service.title.toLowerCase())))
  const extraServices = cmsService.published('services')
    .filter((item) => !existingServiceNames.has(String(item.name || '').toLowerCase()))
    .map((item) => ({ title: String(item.name || 'Creative Service'), to: '/services', images: item.image ? [String(item.image)] : [] }))
  const homeServiceCategories = extraServices.length
    ? [...serviceCategories, { number: String(serviceCategories.length + 1).padStart(2, '0'), title: 'Latest Services', summary: 'New capabilities from the Unseen Studios team.', services: extraServices }]
    : serviceCategories

  return (
    <>
      <div
        className="hp-cursor"
        ref={cursor}
        aria-hidden="true"
      >
        <span ref={cursorLabel} />
      </div>

      <div className="hp" ref={root}>

        {/* ================= HERO ================= */}

        <section className="hp-hero hp-collage-hero" aria-labelledby="home-title">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, A11y]}
            slidesPerView={1}
            speed={900}
            loop
            autoplay={{ delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: '.hp-hero-prev', nextEl: '.hp-hero-next' }}
            pagination={{ el: '.hp-hero-pagination', clickable: true }}
            className="hp-hero-slider"
          >
            <SwiperSlide>
              <div className="hp-collage-slide">
                <div className="hp-collage-grid" aria-hidden="true" />
                <div className="hp-collage-kicker">
                  <span>Unseen Studios</span><i /><span>Pune · India</span>
                </div>
                <div className="hp-collage-stage">
                  <Link to="/services/film" className="hp-collage-card card-film" data-cursor="VIEW"><img src={onlineImages.cameraOperator} alt="Film production by Unseen Studios" /><span>Film / 01</span></Link>
                  <Link to="/portfolio" className="hp-collage-card card-studio" data-cursor="VIEW"><img src={homepage.heroImage || onlineImages.collaboration} alt="Unseen Studios creative team collaborating" /><span>Studio / 02</span></Link>
                  <Link to="/services/marketing" className="hp-collage-card card-digital" data-cursor="VIEW"><img src={onlineImages.socialMedia} alt="Digital marketing campaign artwork" /><span>Digital / 03</span></Link>
                  <Link to="/services/website" className="hp-collage-card card-web" data-cursor="VIEW"><img src={onlineImages.webDevelopment} alt="Website design by Unseen Studios" /><span>Web / 04</span></Link>
                  <Link to="/services/ads" className="hp-collage-card card-brand" data-cursor="VIEW"><img src={onlineImages.businessPlanning} alt="Brand campaign by Unseen Studios" /><span>Campaign / 05</span></Link>
                  <h1 id="home-title" className="hp-collage-title"><span className="hp-title-line"><span>{homepage.heroHeading}</span></span></h1>
                  <p className="hp-collage-intro">{homepage.heroDescription}</p>
                  <Link to="/portfolio" className="hp-collage-action" data-cursor="OPEN"><span>{homepage.primaryButton}</span><ArrowUpRight aria-hidden="true" /></Link>
                  <p className="hp-collage-note">Strategy · Design · Film · Digital</p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="hp-campaign-slide is-ai">
                <img src={onlineImages.leakingFaucet} alt="A dripping faucet representing lost business time" />
                <span className="hp-campaign-overlay" aria-hidden="true" />
                <div className="hp-campaign-content">
                  <p>AI · Automation · Scale</p>
                  <h2>Your business is leaking time.</h2>
                  <strong>Stop running tomorrow on yesterday’s systems.</strong>
                  <Link to="/services/erp" className="hp-campaign-button">Automate with AI <ArrowRight /></Link>
                </div>
                <div className="hp-campaign-signature"><span>Unseen</span><small>Intelligence, simplified.</small></div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="hp-campaign-slide is-saas">
                <img src={onlineImages.codeScreen} alt="Modern SaaS website development" />
                <span className="hp-campaign-overlay" aria-hidden="true" />
                <div className="hp-campaign-content">
                  <p>Product · UX · Development</p>
                  <h2>Adding the soul to SaaS.</h2>
                  <strong>Web experiences engineered to feel as good as they perform.</strong>
                  <Link to="/services/website" className="hp-campaign-button">Build your platform <ArrowRight /></Link>
                </div>
                <div className="hp-campaign-signature"><span>Unseen</span><small>Digital products with character.</small></div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="hp-campaign-slide is-awards">
                <img src={onlineImages.businessPlanning} alt="Creative strategy and award-worthy campaign work" />
                <span className="hp-campaign-overlay" aria-hidden="true" />
                <div className="hp-awards-hero-content">
                  <p>Recognition follows meaningful work</p>
                  <h2>Built to perform.<br />Designed to be remembered.</h2>
                  <div className="hp-awards-hero-list">
                    <div><Trophy /><strong>Strategy</strong><span>Ideas grounded in insight</span></div>
                    <div><Crown /><strong>Craft</strong><span>Execution without compromise</span></div>
                    <div><Globe2 /><strong>Impact</strong><span>Work that moves audiences</span></div>
                  </div>
                  <Link to="/portfolio" className="hp-campaign-button">See the work <ArrowRight /></Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <button type="button" className="hp-hero-arrow hp-hero-prev" aria-label="Previous hero slide"><ArrowLeft /></button>
          <button type="button" className="hp-hero-arrow hp-hero-next" aria-label="Next hero slide"><ArrowRight /></button>
          <div className="hp-hero-pagination" aria-label="Choose hero slide" />
        </section>

        {/* ================= PROOF BAND ================= */}

        <section className="hp-proof-band" aria-label="Studio highlights">
          <article><Building2 aria-hidden="true" /><strong>Independent</strong><p>Founded in Pune with a sharp, hands-on studio approach.</p></article>
          <article><Network aria-hidden="true" /><strong>Full service</strong><p>Strategy, storytelling, design and technology under one roof.</p></article>
          <article><Trophy aria-hidden="true" /><strong>{homepage.projects} projects</strong><p>Campaigns and experiences built to create measurable impact.</p></article>
          <article><Globe2 aria-hidden="true" /><strong>{homepage.clients} partners</strong><p>Creative collaborations across industries, formats and markets.</p></article>
        </section>

        {/* ================= LATEST WORK / STUDIO STORY ================= */}

        <section className="hp-latest" aria-labelledby="studio-story-title">
          <div className="hp-latest-backdrop" aria-hidden="true"><img src={onlineImages.creativeOffice} alt="" /></div>
          <Link to="/portfolio" className="hp-latest-card latest-left-top" data-reveal aria-label="Open social media work in portfolio"><img src={onlineImages.socialMedia} alt="Social media campaign" /></Link>
          <Link to="/portfolio" className="hp-latest-card latest-left-bottom" data-reveal aria-label="Open digital campaign work in portfolio"><img src={onlineImages.analyticsDashboard} alt="Digital campaign analytics" /></Link>
          <Link to="/portfolio" className="hp-latest-card latest-right-top" data-reveal aria-label="Open strategy work in portfolio"><img src={onlineImages.businessPlanning} alt="Search and performance strategy" /></Link>
          <Link to="/portfolio" className="hp-latest-card latest-right-bottom" data-reveal aria-label="Open website work in portfolio"><img src={onlineImages.webDevelopment} alt="Website design work" /></Link>

          <Link to="/portfolio" className="hp-latest-frame" data-reveal aria-label="Open the Unseen Studios portfolio">
            <img className="hp-latest-main-image" src={onlineImages.cameraOperator} alt="Cinematic camera operator on a production set" />
            <span className="hp-latest-shade" aria-hidden="true" />
            <i className="corner corner-tl" /><i className="corner corner-tr" /><i className="corner corner-bl" /><i className="corner corner-br" />
            <span className="hp-latest-word word-our">Our</span>
            <strong id="studio-story-title" className="hp-latest-word word-latest">Latest</strong>
            <span className="hp-latest-word word-work">Work</span>
          </Link>

          <div className="hp-latest-copy" data-reveal>
            <p>{homepage.aboutDescription}</p>
            <Link to="/portfolio" className="hp-text-link">View selected work <ArrowUpRight /></Link>
          </div>
        </section>

        {/* ================= SHOWREEL ================= */}

        <section className="hp-showreel" aria-labelledby="showreel-title">
          <div className="hp-shell">
            <div className="hp-showreel-copy" data-reveal>
              <Eyebrow dark>Inside the studio</Eyebrow>
              <h2 id="showreel-title">Showreel</h2>
              <p>A glimpse of the stories, campaigns and digital experiences we bring to life.</p>
            </div>
            <div className="hp-showreel-device" data-clip>
              <video autoPlay muted loop playsInline preload="metadata" aria-label="Unseen Studios showreel">
                <source src="/assets/videos/unseen.mp4" type="video/mp4" />
              </video>
              <Link to="/portfolio" className="hp-showreel-play" aria-label="Explore our showreel and portfolio"><Play fill="currentColor" /></Link>
            </div>
          </div>
          <div className="hp-showreel-stats">
            <div><strong>{homepage.years}</strong><span>Years creating</span></div>
            <div><strong>{homepage.awards}</strong><span>Creative disciplines</span></div>
            <div><strong>{homepage.projects}</strong><span>Projects delivered</span></div>
            <div><Crown aria-hidden="true" /><span>One focused team</span></div>
          </div>
        </section>

        {/* ================= ALL SERVICES SLIDER ================= */}

        <section className="hp-section hp-services-showcase" id="services">
          <div className="hp-shell">
            <div className="hp-services-showcase-head" data-reveal>
              <div>
                <Eyebrow>Our services</Eyebrow>
                <h2>
                  All the expertise to move
                  <br />
                  <em>your brand forward.</em>
                </h2>
              </div>

              <div className="hp-services-showcase-side">
                <p>
                  Creative, digital, strategic, PR and outreach expertise—organised clearly so you can find the right support.
                </p>

                <div className="hp-services-controls">
                  <span className="hp-services-count" aria-live="polite">
                    {String(activeService + 1).padStart(2, '0')}
                    <i />
                    {String(homeServiceCategories.length).padStart(2, '0')}
                  </span>

                  <button className="hp-services-prev" type="button" aria-label="Previous service">
                    <ArrowLeft />
                  </button>

                  <button className="hp-services-next" type="button" aria-label="Next service">
                    <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hp-services-slider-wrap" data-clip>
            <Swiper
              modules={[Autoplay, EffectCoverflow, Navigation, Pagination, A11y]}
              effect="coverflow"
              coverflowEffect={{
                rotate: 0,
                stretch: -18,
                depth: 135,
                modifier: 1.15,
                slideShadows: false,
              }}
              centeredSlides
              grabCursor
              loop
              speed={900}
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: '.hp-services-prev',
                nextEl: '.hp-services-next',
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                0: { slidesPerView: 1.08, spaceBetween: 14 },
                640: { slidesPerView: 1.45, spaceBetween: 22 },
                1024: { slidesPerView: 2.25, spaceBetween: 30 },
                1440: { slidesPerView: 2.7, spaceBetween: 36 },
              }}
              onRealIndexChange={(swiper) => setActiveService(swiper.realIndex)}
              className="hp-services-slider"
            >
              {homeServiceCategories.map((category) => {
                const categoryImages = category.services.flatMap((service) => service.images ?? [])

                return (
                  <SwiperSlide key={category.number}>
                    <article className="hp-service-category-card" data-cursor="EXPLORE">
                      <div className={`hp-service-card-visual ${categoryImages.length ? 'has-images' : 'is-graphic'}`}>
                        {categoryImages.slice(0, 3).map((image, imageIndex) => (
                          <img
                            src={image}
                            alt=""
                            key={image}
                            style={{ '--visual-index': imageIndex } as React.CSSProperties}
                          />
                        ))}
                        <span className="hp-service-card-shade" aria-hidden="true" />
                        <span className="hp-service-card-number">{category.number}</span>
                        <span className="hp-service-card-kicker">Unseen / Services</span>
                        <span className="hp-service-category-mark" aria-hidden="true"><i /><i /><i /></span>
                      </div>

                      <div className="hp-service-card-body">
                        <div className="hp-service-category-copy">
                          <p>Service category</p>
                          <h3>{category.title}</h3>
                          <span>{category.summary}</span>
                        </div>

                        <div className="hp-service-category-list">
                          {category.services.map((service) => (
                            <Link to={service.to} key={service.title}>
                              <span className={`hp-service-row-visual ${service.images?.length ? 'has-images' : ''}`} aria-hidden="true">
                                {service.images?.map((image, imageIndex) => (
                                  <img src={image} alt="" key={image} style={{ '--image-index': imageIndex } as React.CSSProperties} />
                                ))}
                              </span>
                              <span>{service.title}</span>
                              <ArrowUpRight />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </article>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </section>

        {/* ================= TEAM ================= */}

        <section
          className="hp-section hp-team"
          id="team"
        >
          <div className="hp-shell">

            <div
              className="hp-section-head hp-section-head-light"
              data-reveal
            >

              <div>

                <Eyebrow>
                  People behind the work
                </Eyebrow>

                <h2>
                  Small team.
                  <br />
                  <em>Big energy.</em>
                </h2>

              </div>

              <p>
                Strategists, filmmakers, designers and developers working as one deliberately close team.
              </p>

            </div>

            <div className="hp-team-grid">

              {people.map(
                (person, index) => (
                  <article
                    className={`hp-person person-${index + 1}`}
                    key={person.name}
                    data-reveal
                  >

                    <div
                      className="hp-person-image"
                      data-cursor="HELLO"
                    >

                      <img
                        src={person.image}
                        alt={person.name}
                      />

                      <div className="hp-person-social">

                        <a
                          href={person.instagram}
                          aria-label={`${person.name} on Instagram`}
                        >
                          <FaInstagram />
                        </a>

                        <a
                          href={person.linkedin}
                          aria-label={`${person.name} on LinkedIn`}
                        >
                          <FaLinkedinIn />
                        </a>

                      </div>

                    </div>

                    <div>

                      <h3>
                        {person.name}
                      </h3>

                      <p>
                        {person.role}
                      </p>

                    </div>

                  </article>
                )
              )}

            </div>

          </div>
        </section>

        {/* ================= AWARDS ================= */}

        <section className="hp-section hp-awards">

          <div className="hp-shell hp-awards-grid">

            <div
              className="hp-awards-intro"
              data-reveal
            >

              <Eyebrow dark>
                Our journey
              </Eyebrow>

              <h2>
                Progress worth
                <br />
                <em>marking.</em>
              </h2>

              <p>
                A studio built project by project, relationship by relationship.
              </p>

            </div>

            <div className="hp-awards-list">

              <span className="hp-award-line" />

              {awards.map(
                ([year, title, note]) => (
                  <div
                    className="hp-award"
                    key={year}
                    data-reveal
                  >

                    <strong>
                      {year}
                    </strong>

                    <h3>
                      {title}
                    </h3>

                    <span>
                      {note}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* ================= TESTIMONIALS ================= */}

        <section className="hp-section hp-testimonials">

          <div className="hp-shell">

            <div
              className="hp-testimonials-top"
              data-reveal
            >

              <Eyebrow>
                Kind words
              </Eyebrow>

              <div className="hp-slider-nav">

                <button
                  className="hp-prev"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft />
                </button>

                <button
                  className="hp-next"
                  aria-label="Next testimonial"
                >
                  <ArrowRight />
                </button>

              </div>

            </div>

            <Swiper
              modules={[
                Navigation,
                Pagination,
                A11y
              ]}
              navigation={{
                prevEl: '.hp-prev',
                nextEl: '.hp-next'
              }}
              pagination={{
                clickable: true
              }}
              slidesPerView={1}
              spaceBetween={40}
              className="hp-testimonial-slider"
            >

              {testimonials.map(
                (item) => (
                  <SwiperSlide key={item.name}>

                    <article className="hp-testimonial">

                      <Quote />

                      <blockquote>
                        “{item.quote}”
                      </blockquote>

                      <div>

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          {item.role}
                        </span>

                      </div>

                    </article>

                  </SwiperSlide>
                )
              )}

            </Swiper>

          </div>

        </section>

        {/* ================= FAQ ================= */}

        <section className="hp-section hp-faq">

          <div className="hp-shell hp-faq-grid">

            <div
              className="hp-faq-title"
              data-reveal
            >

              <Eyebrow>
                Good to know
              </Eyebrow>

              <h2>
                Questions,
                <br />
                <em>answered.</em>
              </h2>

            </div>

            <div className="hp-faq-list">

              {faqs.map(
                ([question, answer], index) => (
                  <div
                    className={`hp-faq-item ${
                      openFaq === index
                        ? 'is-open'
                        : ''
                    }`}
                    key={question}
                    data-reveal
                  >

                    <button
                      onClick={() =>
                        setOpenFaq(
                          openFaq === index
                            ? -1
                            : index
                        )
                      }
                      aria-expanded={
                        openFaq === index
                      }
                    >

                      <span>
                        {String(index + 1).padStart(
                          2,
                          '0'
                        )}
                      </span>

                      <strong>
                        {question}
                      </strong>

                      {openFaq === index ? (
                        <Minus />
                      ) : (
                        <Plus />
                      )}

                    </button>

                    <div className="hp-faq-answer">
                      <p>
                        {answer}
                      </p>
                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* ================= CLIENTS ================= */}

        <section
          className="hp-clients"
          aria-label="Selected clients"
        >

          <div className="hp-client-track">

            {clients.map((client, index) => (
              <span className="hp-client-logo" key={`${client.name}-${index}`}>
                <img src={client.logo} alt={client.name} loading="lazy" decoding="async" />
              </span>
            ))}

          </div>

        </section>

        {/* ================= CTA ================= */}

        <section className="hp-cta">

          <div className="hp-cta-bg">

            <img
              src={onlineImages.agencyTeam}
              alt=""
              data-parallax
            />

          </div>

          <div className="hp-cta-overlay" />

          <div
            className="hp-shell hp-cta-content"
            data-reveal
          >

            <Eyebrow>
              Start something meaningful
            </Eyebrow>

            <h2>
              {homepage.ctaHeading}
            </h2>

            <p>
              {homepage.ctaDescription}
            </p>

            <RoundLink
              to={homepage.ctaLink}
              label={homepage.ctaButton}
              dark
            />

          </div>

        </section>

      </div>
    </>
  )
}
