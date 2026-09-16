import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Services } from '../components/sections/Services'

export function ServicesPage() {
  return (
    <div className="inner-editorial-page">
      <section className="inner-editorial-intro">
        <div data-reveal>
          <p className="inner-editorial-kicker">Exclusive services</p>
          <h2>Smart solutions for your<br /><strong>modern brand.</strong></h2>
        </div>
        <Link to="/contact" className="inner-editorial-round" data-reveal><ArrowUpRight />Start a project</Link>
      </section>
      <Services showHeader={false} variant="grid" />
    </div>
  )
}
