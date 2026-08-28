import { Mail, MapPin, Phone, Clock, Send, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
   
  FaFacebookF,
  
} from 'react-icons/fa'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/why-unseen', label: 'Why Choose Us' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const services = [
  { name: 'Documentary Films', to: '/services/film' },
  { name: 'Podcast & Jingles', to: '/services/podcast' },
  { name: 'Video Ads', to: '/services/ads' },
  { name: 'Website Development', to: '/services/website' },
  { name: 'SEO Optimization', to: '/services/seo' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        {/* Main grid */}
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr] xl:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center rounded-2xl bg-white p-4 shadow-lg transition-all hover:shadow-xl hover:scale-105">
              <img
                src="/assets/images/lll.png"
                alt="Unseen Studio"
                className="h-14 w-auto object-contain sm:h-20"
              />
            </Link>
            <p className="max-w-md text-sm leading-7 text-gray-400 sm:text-base">
              Media production, digital marketing, and campaign systems crafted for brands that want
              to lead with clarity, creativity, and measurable growth.
            </p>
            
            {/* Professional Social Media Icons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { 
                  Icon: FaInstagram, 
                  label: 'Instagram', 
                  href: 'https://www.instagram.com/unseenstudios.in',
                  color: 'hover:bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400'
                },
                { 
                  Icon: FaLinkedinIn, 
                  label: 'LinkedIn', 
                  href: 'https://www.linkedin.com/company/collage-digital-marketing-technologies/',
                  color: 'hover:bg-[#0A66C2]'
                },
                { 
                  Icon: FaYoutube, 
                  label: 'YouTube', 
                  href: 'https://www.youtube.com/@unseenstudios01',
                  color: 'hover:bg-[#FF0000]'
                },
                
                { 
                  Icon: FaFacebookF, 
                  label: 'Facebook', 
                  href: 'https://www.facebook.com/search/top?q=unseenstudio',
                  color: 'hover:bg-[#1877F2]'
                },
              
              ].map(({ Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white hover:shadow-lg ${color}`}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {/* Tooltip */}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 scale-0 rounded-lg bg-gray-900 px-2.5 py-1 text-xs font-medium text-white shadow-lg transition-all duration-200 group-hover:scale-100">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-white sm:text-lg">
              Quick Links
              <span className="mt-2 block h-0.5 w-12 rounded-full bg-orange-500" />
            </h3>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-orange-500"
                  >
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-white sm:text-lg">
              Services
              <span className="mt-2 block h-0.5 w-12 rounded-full bg-orange-500" />
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.to}>
                  <Link
                    to={service.to}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-orange-500"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Subscribe */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-white sm:text-lg">
              Get In Touch
              <span className="mt-2 block h-0.5 w-12 rounded-full bg-orange-500" />
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-white/20 hover:bg-white/10">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                <p className="text-sm leading-6 text-gray-400">
Unseen studio/Trijja Media Works
office no 308, unseen studios, opp. shell petrol pump, near dange estate 411068, Vadgaon Khurd, Nanded Fata, Pandurang Industrial Area, Nanded, Pune, Maharashtra 411068                </p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-white/20 hover:bg-white/10">
                <Phone className="h-4 w-4 flex-shrink-0 text-orange-500" />
                <div className="flex flex-wrap gap-1">
                  <a href="tel:+917385501161" className="text-sm text-gray-400 transition-colors hover:text-orange-500">
                    +91 7385501161
                  </a>
                  <span className="text-gray-600">/</span>
                  <a href="tel:+917709814062" className="text-sm text-gray-400 transition-colors hover:text-orange-500">
                    +91 7709814062
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-white/20 hover:bg-white/10">
                <Mail className="h-4 w-4 flex-shrink-0 text-orange-500" />
                <a href="mailto:hello.trijjamedia@gmail.com" className="break-all text-sm text-gray-400 transition-colors hover:text-orange-500">
hello.trijjamedia@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-white/20 hover:bg-white/10">
                <Clock className="h-4 w-4 flex-shrink-0 text-orange-500" />
                <p className="text-sm text-gray-400">Mon - Sat: 9:00 AM - 7:00 PM</p>
              </div>
            </div>

            {/* Subscribe */}
            <div className="mt-6">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
                Subscribe
              </h4>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
                  aria-label="Subscribe"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Join
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 animate-pulse text-sm text-emerald-400">✓ Subscribed successfully!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-center text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Unseen Studios / Trijja Media Works. All rights reserved.</p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/privacy-policy" className="transition-colors hover:text-orange-500">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-orange-500">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="transition-colors hover:text-orange-500">
              Sitemap
            </Link>
          </div>
          
          <p className="text-xs uppercase tracking-[0.25em] text-gray-600">Crafted for cinematic brands</p>
        </div>
      </div>
    </footer>
  )
}