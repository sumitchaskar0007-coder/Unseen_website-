import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'

const nav = [['About', '/about'], ['Services', '/services'], ['Work', '/portfolio'], ['Portfolio', '/gallery'], ['Journal', '/blog'], ['Contact', '/contact']]
const resources = [['Careers', '/careers'], ['Privacy', '/privacy-policy'], ['Terms', '/terms-of-service']]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-shell">
        <div className="site-footer-top">
          <div className="site-footer-brand"><Link to="/" className="site-footer-logo" aria-label="Unseen Studio home"><span>UNSEEN</span><small>STUDIO</small></Link><p>An independent creative studio building films, brands and digital experiences from Pune to everywhere.</p></div>
          <div className="site-footer-column"><p>Explore</p>{nav.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</div>
          <div className="site-footer-column"><p>Resources</p>{resources.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</div>
          <div className="site-footer-contact"><p>New business</p><a href="mailto:hello.trijjamedia@gmail.com">hello.trijjamedia@gmail.com <ArrowUpRight /></a><a href="https://wa.me/917709814062" target="_blank" rel="noopener noreferrer">+91 77098 14062 <ArrowUpRight /></a><span>Pune, Maharashtra 411068</span><Link to="/admin" className="site-footer-admin"><LockKeyhole /> Admin dashboard</Link></div>
        </div>
        <div className="site-footer-word" aria-label="Unseen Studios"><span>UNSEEN</span><small>STUDIOS</small></div>
        <div className="site-footer-bottom"><span>© {new Date().getFullYear()} Unseen Studios</span><div><a href="https://www.instagram.com/unseenstudios.in">Instagram</a><a href="https://www.linkedin.com/company/collage-digital-marketing-technologies/">LinkedIn</a><a href="https://www.youtube.com/@unseenstudios01">YouTube</a></div><span>Ideas to impact.</span></div>
      </div>
    </footer>
  )
}
