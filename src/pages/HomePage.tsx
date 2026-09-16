import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, ArrowUpRight, Minus, Plus, Quote } from 'lucide-react'
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { A11y, Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { serviceCategories } from '../data/serviceCategories'
import './home-premium.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'Stories of Maharashtra', type: 'Film', year: '2026', category: 'Branding', image: 'assets/images/work/documentary.png', wide: true },
  { title: 'Jadhavar Digital Campus', type: 'Web Experience', year: '2025', category: 'Development', image: 'assets/images/work/website1.png' },
  { title: 'Hospitality, Reframed', type: 'Brand Campaign', year: '2025', category: 'Marketing', image: 'assets/images/work/hospitality.png' },
  { title: 'Always-On Social', type: 'Social Direction', year: '2024', category: 'Marketing', image: 'assets/images/work/social.png', wide: true },
  { title: 'The Unseen Edit', type: 'Creative Platform', year: '2026', category: 'Web Design', image: 'assets/images/web.png' },
  { title: 'Signals of Growth', type: 'Digital Strategy', year: '2025', category: 'Branding', image: 'assets/images/digital1.png' },
]

const people = [
  { name: 'Govind Budhwant', role: 'Founder & Creative Director', image: 'assets/images/founder.png' },
  { name: 'Creative Collective', role: 'Film & Production', image: 'assets/images/a33.png' },
  { name: 'Digital Studio', role: 'Design & Technology', image: 'assets/images/a31.png' },
  { name: 'Growth Team', role: 'Strategy & Performance', image: 'assets/images/work/comp_name/hero_section1.png' },
]

const awards = [
  ['2019', 'Independent studio founded', 'Pune, India'],
  ['2022', 'Creative excellence recognition', 'Brand & Film'],
  ['2024', '100+ collaborations delivered', 'Across Maharashtra'],
  ['2026', 'Full-service digital studio', 'Ideas to impact'],
]

const testimonials = [
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

const posts = [
  { category: 'Perspective', date: 'Aug 28, 2026', title: 'Why distinct brands outperform loud ones', image: 'assets/images/digital.png' },
  { category: 'Craft', date: 'Aug 12, 2026', title: 'Making a brand film people choose to watch', image: 'assets/images/a33.png' },
  { category: 'Growth', date: 'Jul 24, 2026', title: 'Designing websites for momentum, not decoration', image: 'assets/images/web.png' },
]

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
  const [filter, setFilter] = useState('All')
  const [openFaq, setOpenFaq] = useState(0)
  const [activeService, setActiveService] = useState(0)

  useLayoutEffect(() => {
    if (!root.current) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {

      gsap.timeline()
        .from('.hp-reference-photo', {
          clipPath: 'inset(0 100% 0 0)',
          scale: 1.04,
          duration: 1.05,
          ease: 'power4.inOut'
        })
        .from('.hp-reference-intro', {
          y: 24,
          opacity: 0,
          duration: .65
        }, '-=.45')
        .from('.hp-title-line > span', {
          yPercent: 115,
          stagger: .1,
          duration: 1.05,
          ease: 'power4.out'
        }, '-=.4')
        .from('.hp-reference-action', {
          y: 24,
          opacity: 0,
          duration: .65
        }, '-=.5')
        .from('.hp-reference-shapes span', {
          scale: 0,
          stagger: .1,
          duration: .5,
          ease: 'back.out(1.8)'
        }, '-=.65')

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

  const visibleProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter)

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

        <section
          className="hp-hero hp-reference-hero"
          aria-labelledby="home-title"
        >

          {/* ONLY HERO IMAGE - ALL OUTER CIRCLES REMOVED */}

          <div className="hp-reference-layout">

            <div
              className="hp-reference-photo"
              data-cursor="VIEW"
            >
              <img
                src="assets/images/work/comp_name/hero4.png"
                alt="Unseen Studios creative team collaborating"
              />
            </div>

            <div className="hp-reference-copy">

              <p className="hp-reference-intro">
                We turn ambitious ideas into clear, memorable digital experiences—combining
                strategy, design and production in one focused creative team.
              </p>

              <div
                className="hp-reference-shapes"
                aria-hidden="true"
              >
                <span />
                <span />
              </div>

              <h1
                id="home-title"
                className="hp-reference-title"
              >
                <span className="hp-title-line">
                  <span>
                    <img
                      className="hp-reference-wordmark"
                      src="assets/images/work/comp_name/name.png"
                      alt="Creative Solution — ideas, brands and experiences"
                    />
                  </span>
                </span>
              </h1>

              <Link
                to="/portfolio"
                className="hp-reference-action"
                data-cursor="OPEN"
              >
                <ArrowUpRight aria-hidden="true" />

                <span>
                  Strategy. Design. Digital
                  <br />
                  Execution.
                </span>

              </Link>

            </div>

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
                    {String(serviceCategories.length).padStart(2, '0')}
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
              {serviceCategories.map((category) => (
                <SwiperSlide key={category.number}>
                  <article className="hp-service-category-card" data-cursor="EXPLORE">
                    <div className="hp-service-category-top">
                      <span className="hp-service-card-number">{category.number}</span>
                      <span className="hp-service-category-mark" aria-hidden="true"><i /><i /><i /></span>
                    </div>

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
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ================= WORK ================= */}

        <section
          className="hp-section hp-work"
          id="work"
        >
          <div className="hp-shell">

            <div
              className="hp-section-head hp-section-head-light"
              data-reveal
            >

              <div>

                <Eyebrow>
                  Selected work
                </Eyebrow>

                <h2>
                  Made to be
                  <br />
                  <em>remembered.</em>
                </h2>

              </div>

              <p>
                Stories, systems and experiences that create a clear before and after.
              </p>

            </div>

            <div
              className="hp-filters"
              role="group"
              aria-label="Filter projects"
            >

              {[
                'All',
                'Branding',
                'Web Design',
                'Development',
                'Marketing'
              ].map((item) => (
                <button
                  key={item}
                  className={
                    filter === item
                      ? 'is-active'
                      : ''
                  }
                  onClick={() =>
                    setFilter(item)
                  }
                >
                  {item}
                </button>
              ))}

            </div>

            <div className="hp-project-grid">

              {visibleProjects.map((project) => (
                <article
                  className={`hp-project ${
                    project.wide
                      ? 'is-wide'
                      : ''
                  }`}
                  key={project.title}
                  data-reveal
                >

                  <Link
                    to="/portfolio"
                    className="hp-project-image"
                    data-cursor="VIEW"
                  >

                    <img
                      src={project.image}
                      alt=""
                      data-parallax
                    />

                    <span>
                      <ArrowUpRight />
                    </span>

                  </Link>

                  <div className="hp-project-meta">

                    <div>

                      <p>
                        {project.type}
                      </p>

                      <h3>
                        {project.title}
                      </h3>

                    </div>

                    <span>
                      {project.year}
                    </span>

                  </div>

                </article>
              ))}

            </div>

            <div
              className="hp-work-more"
              data-reveal
            >
              <RoundLink
                to="/portfolio"
                label="View all work"
                dark
              />
            </div>

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
                          href="https://www.instagram.com/unseenstudios.in"
                          aria-label={`${person.name} on Instagram`}
                        >
                          <FaInstagram />
                        </a>

                        <a
                          href="https://www.linkedin.com/company/collage-digital-marketing-technologies/"
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

        {/* ================= JOURNAL ================= */}

        <section className="hp-section hp-journal">

          <div className="hp-shell">

            <div
              className="hp-journal-head"
              data-reveal
            >

              <div>

                <Eyebrow dark>
                  Journal
                </Eyebrow>

                <h2>
                  Insights & <em>ideas.</em>
                </h2>

              </div>

              <Link
                to="/blog"
                className="hp-text-link"
              >
                View the journal
                <ArrowRight />
              </Link>

            </div>

            <div className="hp-post-grid">

              {posts.map((post) => (
                <Link
                  to="/blog"
                  className="hp-post"
                  key={post.title}
                  data-reveal
                  data-cursor="READ"
                >

                  <div className="hp-post-image">

                    <img
                      src={post.image}
                      alt=""
                    />

                  </div>

                  <div className="hp-post-meta">

                    <span>
                      {post.category}
                    </span>

                    <span>
                      {post.date}
                    </span>

                  </div>

                  <h3>
                    {post.title}
                  </h3>

                  <ArrowUpRight />

                </Link>
              ))}

            </div>

          </div>

        </section>

        {/* ================= CLIENTS ================= */}

        <section
          className="hp-clients"
          aria-label="Selected clients"
        >

          <div className="hp-client-track">

            {[
              'JADHAVAR',
              'SAHYADRI',
              'CHAVA',
              'SHIVARAJ',
              'MANDKE',
              'PMF',
              'JADHAVAR',
              'SAHYADRI',
              'CHAVA',
              'SHIVARAJ',
              'MANDKE',
              'PMF'
            ].map(
              (client, index) => (
                <span
                  key={`${client}-${index}`}
                >
                  {client}
                  <i>✦</i>
                </span>
              )
            )}

          </div>

        </section>

        {/* ================= CTA ================= */}

        <section className="hp-cta">

          <div className="hp-cta-bg">

            <img
              src="assets/images/h22.png"
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
              Have a project
              <br />
              <em>in mind?</em>
            </h2>

            <p>
              Let’s turn your idea into an experience people remember.
            </p>

            <RoundLink
              to="/contact"
              label="Let's talk"
              dark
            />

          </div>

        </section>

      </div>
    </>
  )
}
