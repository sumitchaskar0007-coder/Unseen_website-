import { ArrowRight, ArrowUpRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import './about-premium.css'

const values = [
  ['01', 'Think clearly', 'We find the honest idea beneath the noise and give every project a sharp strategic centre.'],
  ['02', 'Make bravely', 'We combine craft, technology and experimentation to create work with a point of view.'],
  ['03', 'Grow together', 'We work as one team with our clients—open, accountable and invested in the outcome.'],
]

export default function AboutPage() {
  return (
    <div className="about-premium">
      <section className="about-intro">
        <div className="about-shell">
          <div className="about-intro-head" data-reveal>
            <p className="about-kicker">Who we are</p>
            <h2>Creating impactful brand<br /><em>experiences.</em></h2>
            <div className="about-squares" aria-hidden="true"><span /><span /></div>
          </div>

          <div className="about-story-grid">
            <div className="about-founder-visual" data-clip>
              <img src="assets/images/founder.png" alt="Govind Budhwant, founder of Unseen Studios" />
              <button type="button" className="about-play" aria-label="Play our studio story"><span>Creative digital agency · Unseen Studios · </span><Play /></button>
            </div>

            <div className="about-story-copy" data-reveal>
              <p>Unseen Studios is an independent creative and digital agency built around a simple belief: meaningful work begins with understanding. We get close to the problem, uncover the real opportunity and shape ideas that connect.</p>
              <p>From films and identities to websites and growth campaigns, our team brings strategy, creativity and technology together under one roof.</p>
              <div className="about-stat-row">
                <div><strong>99%</strong><span>Projects delivered<br />with satisfaction</span></div>
                <div><strong>436+</strong><span>Creative projects<br />completed</span></div>
              </div>
            </div>
          </div>

          <div className="about-wordmark" aria-hidden="true"><span>un</span><span>seen</span></div>
        </div>
      </section>

      <section className="about-manifesto">
        <div className="about-shell about-manifesto-grid">
          <div data-reveal><p className="about-kicker is-dark">Our point of view</p><h2>Good work gets seen.<br /><em>Great work gets felt.</em></h2></div>
          <div className="about-manifesto-image" data-clip><img src="assets/images/meeting.png" alt="The Unseen Studios team in a creative meeting" /></div>
          <div className="about-manifesto-copy" data-reveal><p>We are a deliberately close team of filmmakers, designers, strategists and developers. Different disciplines, one standard: make every detail earn its place.</p><Link to="/portfolio">Explore our work <ArrowRight /></Link></div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-shell">
          <div className="about-values-head" data-reveal><div><p className="about-kicker">How we work</p><h2>Principles over<br /><em>process theatre.</em></h2></div><p>Clear thinking, generous collaboration and craft that holds up long after launch.</p></div>
          <div className="about-value-list">{values.map(([number, title, copy]) => <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight /></article>)}</div>
        </div>
      </section>

      <section className="about-next">
        <div className="about-shell" data-reveal><p>Have a project in mind?</p><h2>Let’s make it<br /><em>unmissable.</em></h2><Link to="/contact">Start a conversation <ArrowUpRight /></Link></div>
      </section>
    </div>
  )
}
