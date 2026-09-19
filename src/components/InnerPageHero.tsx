import { Link, useLocation } from 'react-router-dom'
import './InnerPageHero.css'

const pageNames: Record<string, string> = {
  '/about': 'About Us',
  '/why-unseen': 'Why Unseen',
  '/services': 'Our Services',
  '/services/film': 'Film Production',
  '/services/podcast': 'Podcast & Audio',
  '/services/ads': 'Video Advertising',
  '/services/website': 'Website Design',
  '/services/webdev': 'Web Development',
  '/services/erp': 'ERP Solutions',
  '/services/marketing': 'Digital Marketing',
  '/services/seo': 'SEO Optimisation',
  '/services/campaign': 'Campaign Strategy',
  '/services/bulk': 'Bulk SMS',
  '/portfolio': 'Our Work',
  '/process': 'Our Process',
  '/contact': 'Contact Us',
  '/gallery': 'Portfolio',
  '/careers': 'Careers',
  '/blog': 'Insights',
}

function resolveTitle(pathname: string) {
  if (pageNames[pathname]) return pageNames[pathname]
  if (pathname.startsWith('/portfolio/')) return 'Project Story'
  if (pathname.startsWith('/blog/')) return 'Article'
  return 'Unseen Studios'
}

export function InnerPageHero() {
  const { pathname } = useLocation()
  const title = resolveTitle(pathname)

  return (
    <section className="inner-page-hero" aria-labelledby="inner-page-title">
      <div className="inner-page-wave wave-a" aria-hidden="true" />
      <div className="inner-page-wave wave-b" aria-hidden="true" />
      <div className="inner-page-wave wave-c" aria-hidden="true" />
      <span className="inner-page-orb orb-a" aria-hidden="true" />
      <span className="inner-page-orb orb-b" aria-hidden="true" />

      <div className="inner-page-hero-content">
        <p>Unseen Studios / Creative Digital Agency</p>
        <h1 id="inner-page-title">{title}</h1>
        <nav aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>—</span><span>{title}</span>
        </nav>
      </div>
    </section>
  )
}
