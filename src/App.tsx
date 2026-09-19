// frontend/src/App.tsx
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { CursorGlow } from './components/CursorGlow'
import { SiteLayout } from './layouts/SiteLayout'
import AboutPage from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import { ProcessPage } from './pages/ProcessPage'
import { ServicesPage } from './pages/ServicesPage'
import WhyUnseen from './pages/WhyUnseen'
import Podcast from './pages/Podcast'
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import { AdminHome, AdminLayout, ContentManager, HomepageManager, MediaManager, PageContentManager, SettingsManager } from './pages/admin/CMSAdmin';
import Gallery from './pages/Gallery';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ProjectPage from './pages/ProjectPage';
import Website from './pages/Website';
import Film from './pages/Film';
import Adds from './pages/Adds';
import Seo from './pages/Seo';
import WebDev from './pages/WebDev';
import ERP from './pages/ERP';
import DigitalPage from './pages/DigitalPage';
import CampaignPage from './pages/CampaignPage';
import BulkSmsPage from './pages/BulkSmsPage';
import { getWhatsAppChatUrl } from './config/whatsapp';

// Social Media URLs - Update these with your actual URLs
const SOCIAL_URLS = {
  whatsapp: getWhatsAppChatUrl() || 'https://wa.me/917709814062',
  youtube: 'https://www.youtube.com/@unseenmarathi',
  instagram: 'https://www.instagram.com/unseenstudios.in',
}

// Social Media Icons Component
const SocialIcons = () => {
  const location = useLocation()
  
  // Don't show social icons on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* WhatsApp */}
        <a
          href={SOCIAL_URLS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          aria-label="WhatsApp"
        >
          <div className="relative h-12 w-12 transform rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl sm:h-14 sm:w-14">
            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex h-full w-full items-center justify-center">
              <svg
                className="h-7 w-7 text-white drop-shadow-md"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.48 2 2 6.48 2 12c0 1.891.515 3.665 1.413 5.196L2.05 21.95l4.754-1.363A9.955 9.955 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 left-1 right-1 h-2 rounded-full bg-black/30 blur-sm" />
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900/90 px-3 py-1.5 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            WhatsApp
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900/90" />
          </span>
        </a>

        {/* YouTube */}
        <a
          href={SOCIAL_URLS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative hidden sm:block"
          aria-label="YouTube"
        >
          <div className="relative h-14 w-14 transform rounded-full bg-gradient-to-br from-[#FF0000] to-[#CC0000] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl">
            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex h-full w-full items-center justify-center">
              <svg
                className="h-7 w-7 text-white drop-shadow-md"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 left-1 right-1 h-2 rounded-full bg-black/30 blur-sm" />
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900/90 px-3 py-1.5 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            YouTube
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900/90" />
          </span>
        </a>

        {/* Instagram */}
        <a
          href={SOCIAL_URLS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative hidden sm:block"
          aria-label="Instagram"
        >
          <div className="relative h-14 w-14 transform rounded-full bg-gradient-to-br from-[#FCAF45] via-[#F77737] to-[#D62976] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl">
            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex h-full w-full items-center justify-center">
              <svg
                className="h-7 w-7 text-white drop-shadow-md"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 left-1 right-1 h-2 rounded-full bg-black/30 blur-sm" />
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900/90 px-3 py-1.5 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            Instagram
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900/90" />
          </span>
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="relative min-h-svh bg-white text-neutral-800">
      <CursorGlow />
      <div className="relative z-10">
        <Routes>
          {/* Main Routes with SiteLayout */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/why-unseen" element={<WhyUnseen />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<ProjectPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/services/podcast" element={<Podcast />} />
            <Route path="/services/website" element={<Website />} />
            <Route path="/services/film" element={<Film />} />
            <Route path="/services/ads" element={<Adds />} />
            <Route path="/services/seo" element={<Seo />} />
            <Route path="/services/webdev" element={<WebDev />} />
            <Route path="/services/erp" element={<ERP />} />
            <Route path="/services/marketing" element={<DigitalPage />} />
            <Route path="/services/campaign" element={<CampaignPage />} />
            <Route path="/services/bulk" element={<BulkSmsPage />} />
            <Route path="/privacy-policy" element={<SimpleLegalPage title="Privacy Policy" />} />
            <Route path="/terms-of-service" element={<SimpleLegalPage title="Terms of Service" />} />
            <Route path="/sitemap" element={<SimpleLegalPage title="Sitemap" />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* <Route path="/services/social" element={<SocialMediaMarketing/>} /> */}



          </Route>
          
          {/* Admin Routes - Without SiteLayout */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="dashboard" element={<Navigate to="/admin" replace />} />

              <Route path="projects" element={<ContentManager module="projects" />} />
              <Route path="projects/new" element={<ContentManager module="projects" />} />
              <Route path="projects/:id/edit" element={<ContentManager module="projects" />} />

              <Route path="clients" element={<ContentManager module="clients" />} />
              <Route path="clients/new" element={<ContentManager module="clients" />} />
              <Route path="clients/:id/edit" element={<ContentManager module="clients" />} />

              <Route path="blogs" element={<ContentManager module="blogs" />} />
              <Route path="blogs/new" element={<ContentManager module="blogs" />} />
              <Route path="blogs/:id/edit" element={<ContentManager module="blogs" />} />

              <Route path="testimonials" element={<ContentManager module="testimonials" />} />
              <Route path="testimonials/new" element={<ContentManager module="testimonials" />} />
              <Route path="testimonials/:id/edit" element={<ContentManager module="testimonials" />} />

              <Route path="hiring" element={<ContentManager module="hiring" />} />
              <Route path="hiring/new" element={<ContentManager module="hiring" />} />
              <Route path="hiring/:id/edit" element={<ContentManager module="hiring" />} />

              <Route path="services" element={<ContentManager module="services" />} />
              <Route path="services/new" element={<ContentManager module="services" />} />
              <Route path="services/:id/edit" element={<ContentManager module="services" />} />

              <Route path="team" element={<ContentManager module="team" />} />
              <Route path="team/new" element={<ContentManager module="team" />} />
              <Route path="team/:id/edit" element={<ContentManager module="team" />} />

              <Route path="media" element={<MediaManager />} />
              <Route path="homepage" element={<HomepageManager />} />
              <Route path="pages/:page" element={<PageContentManager />} />
              <Route path="settings" element={<SettingsManager />} />

              <Route path="gallery" element={<Navigate to="/admin/media" replace />} />
              <Route path="careers" element={<Navigate to="/admin/hiring" replace />} />
            </Route>
          </Route>
        </Routes>
      </div>
      
      {/* Social Media Icons */}
      <SocialIcons />
    </div>
  )
}

function SimpleLegalPage({ title }: { title: string }) {
  return (
    <section className="min-h-[60svh] bg-white px-5 py-20">
      <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-orange-50 p-8 sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">Unseen Studio</p>
        <h1 className="mt-3 text-4xl font-extrabold text-neutral-950">{title}</h1>
        <p className="mt-5 leading-7 text-neutral-600">
          This page is being prepared. For questions about your information or our services,
          please contact Unseen Studio directly.
        </p>
        <a
          href="mailto:hello.trijjamedia@gmail.com"
          className="mt-7 inline-flex rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Contact us
        </a>
      </div>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="grid min-h-[60svh] place-items-center bg-white px-5 py-20 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-600">404</p>
        <h1 className="mt-3 text-4xl font-extrabold text-neutral-950">Page not found</h1>
        <p className="mt-4 text-neutral-600">The page may have moved or no longer exists.</p>
        <a
          href="/"
          className="mt-7 inline-flex rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Back home
        </a>
      </div>
    </section>
  )
}
