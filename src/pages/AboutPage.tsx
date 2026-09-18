import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EditablePageSections } from '../components/EditablePageSections'
import { usePageContent } from '../data/pageContent'
import { onlineImages } from '../data/onlineImages'
import './about-premium.css'

const values = [
  ['01', 'Think clearly', 'We find the honest idea beneath the noise and give every project a sharp strategic centre.'],
  ['02', 'Make bravely', 'We combine craft, technology and experimentation to create work with a point of view.'],
  ['03', 'Grow together', 'We work as one team with our clients—open, accountable and invested in the outcome.'],
]

const disciplines = ['Strategy', 'Branding', 'Film', 'Web', 'Digital growth']

export default function AboutPage() {
  const content = usePageContent('about')
  const [titleLead, ...titleRest] = content.title.split('\n')

  return (
    <div className="about-premium">
      <section className="about-intro">
        <div className="about-shell">
          <div className="about-intro-head" data-reveal>
            <p className="about-kicker">{content.eyebrow}</p>
            <h2>{titleLead}{titleRest.length > 0 && <><br /><em>{titleRest.join(' ')}</em></>}</h2>
            <div className="about-squares" aria-hidden="true"><span /><span /></div>
          </div>

          <div className="about-story-grid">
            <div className="about-story-lead" data-reveal>
              <span>{content.subtitle}</span>
              <p className="about-preserve-lines">{content.secondaryTitle}</p>
            </div>

            <div className="about-story-copy" data-reveal>
              <p>{content.body}</p>
              <p>{content.bodyTwo}</p>
            </div>
          </div>

          <div className="about-proof" data-reveal>
            <div className="about-stat-row">
              <div><strong>99%</strong><span>Client satisfaction</span></div>
              <div><strong>436+</strong><span>Projects completed</span></div>
              <div><strong>11+</strong><span>Creative disciplines</span></div>
            </div>
            <div className="about-disciplines" aria-label="Our disciplines">
              {disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
            </div>
          </div>

          <div className="about-wordmark" aria-hidden="true"><span>un</span><span>seen</span></div>
        </div>
      </section>

      <section className="about-manifesto">
        <div className="about-shell about-manifesto-grid">
          <div data-reveal><p className="about-kicker is-dark">Our point of view</p><h2>Good work gets seen.<br /><em>Great work gets felt.</em></h2></div>
          <div className="about-manifesto-image" data-clip><img src={onlineImages.collaboration} alt="Creative professionals collaborating around a table" /></div>
          <div className="about-manifesto-copy" data-reveal><p>We are a deliberately close team of filmmakers, designers, strategists and developers. Different disciplines, one standard: make every detail earn its place.</p><Link to="/portfolio">Explore our work <ArrowRight /></Link></div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-shell">
          <div className="about-values-head" data-reveal><div><p className="about-kicker">How we work</p><h2>Principles over<br /><em>process theatre.</em></h2></div><p>Clear thinking, generous collaboration and craft that holds up long after launch.</p></div>
          <div className="about-value-list">{values.map(([number, title, copy]) => <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight /></article>)}</div>
        </div>
      </section>

      <EditablePageSections sections={content.sections} />

      <section className="about-founder">
        <div className="about-shell about-founder-grid">
          <div className="about-founder-image" data-clip>
            <img src="assets/images/founder.png" alt="Govind Budhwant, founder of Unseen Studios" />
          </div>
          <div data-reveal>
            <p className="about-kicker">Founder’s note</p>
            <h2>Stay curious.<br /><em>Make it matter.</em></h2>
            <p>Unseen Studios was founded to give ambitious ideas the care they deserve. We bring the right people around the table, ask better questions and stay close to the work from the first thought to the final frame.</p>
            <blockquote>“Our job is not simply to make brands visible. It is to make them worth remembering.”</blockquote>
            <div className="about-founder-signoff"><strong>Govind Budhwant</strong><span>Founder, Unseen Studios</span></div>
          </div>
        </div>
      </section>

      <section className="about-next">
        <div className="about-shell" data-reveal><p>Have a project in mind?</p><h2>Let’s make it<br /><em>unmissable.</em></h2><Link to={content.buttonUrl || '/contact'}>{content.buttonLabel || 'Start a conversation'} <ArrowUpRight /></Link></div>
      </section>
    </div>
  )
}
