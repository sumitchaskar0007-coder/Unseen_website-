import { useState, type ElementType, type SVGProps } from 'react';
import {
  Megaphone,
  PenTool,
  Target,
  Users,
  BarChart3,
  Sparkles,
  Search,
  Compass,
  Layers,
  LineChart,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Calendar,
  Award,
  ChevronRight
} from 'lucide-react';

const Instagram = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XformerlyTwitter = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" y1="4" x2="20" y2="20" />
    <line x1="20" y1="4" x2="4" y2="20" />
  </svg>
);

const Facebook = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Linkedin = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Youtube = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Pinterest = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.5 17c.6-2 1.2-4.4 1.6-6a2.7 2.7 0 0 1 5.3.7c0 2-1.2 3.6-2.9 3.6a1.8 1.8 0 0 1-1.8-2.2" />
  </svg>
);

type IconPanelProps = {
  mainIcon: ElementType;
  satelliteIcons?: ElementType[];
};

const IconPanel = ({ mainIcon: MainIcon, satelliteIcons = [] }: IconPanelProps) => (
  <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl bg-neutral-900 overflow-hidden border border-neutral-900">
    <div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage:
          'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }}
    />
    <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-orange-500 blur-3xl opacity-30" />
    <div className="absolute -bottom-14 -left-14 w-56 h-56 rounded-full bg-orange-600 blur-3xl opacity-20" />

    <div className="relative h-full w-full flex items-center justify-center">
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-orange-500 flex items-center justify-center shadow-xl">
        <MainIcon className="w-14 h-14 sm:w-16 sm:h-16 text-white" strokeWidth={1.5} />
      </div>
      {satelliteIcons.map((Icon, i) => {
        const positions = ['top-6 left-6', 'top-8 right-8', 'bottom-8 left-10', 'bottom-6 right-6'];
        return (
          <div
            key={i}
            className={`absolute ${positions[i % positions.length]} w-11 h-11 rounded-xl bg-white/95 flex items-center justify-center border border-white`}
          >
            <Icon className="w-5 h-5 text-neutral-900" strokeWidth={1.75} />
          </div>
        );
      })}
    </div>
    <div className="absolute bottom-0 left-0 h-1 w-full bg-orange-500" />
  </div>
);

const SocialMediaMarketing = () => {
  const studio = {
    name: 'Unseen Studios',
    tagline: 'Creative Digital Agency',
    location: 'Sinhgad Road, Pune, Maharashtra 411051',
    phone: '+91 98765 43210',
    email: 'info@unseenstudios.com',
    website: 'www.unseenstudios.com'
  };

  const services = [
    { title: 'Content Strategy & Creation', description: 'x', icon: PenTool },
    { title: 'Paid Social Advertising', description: 'x', icon: Target },
    { title: 'Community Management', description: 'x', icon: MessageCircle },
    { title: 'Influencer Partnerships', description: 'x', icon: Users },
    { title: 'Analytics & Reporting', description: 'x', icon: BarChart3 },
    { title: 'Brand Strategy', description: 'x', icon: Compass }
  ];

  const platforms = {
    instagram: { icon: Instagram, label: 'Instagram', description: 'x' },
    facebook: { icon: Facebook, label: 'Facebook', description: 'x' },
    x: { icon: XformerlyTwitter, label: 'X (Twitter)', description: 'x' },
    linkedin: { icon: Linkedin, label: 'LinkedIn', description: 'x' },
    youtube: { icon: Youtube, label: 'YouTube', description: 'x' },
    pinterest: { icon: Pinterest, label: 'Pinterest', description: 'x' }
  };
  const [activePlatform, setActivePlatform] = useState<keyof typeof platforms>('instagram');

  const process = [
    { step: '01', title: 'Discover', description: 'x', icon: Search },
    { step: '02', title: 'Strategy', description: 'x', icon: Compass },
    { step: '03', title: 'Create & Publish', description: 'x', icon: Layers },
    { step: '04', title: 'Analyze & Optimize', description: 'x', icon: LineChart }
  ];

  const results = [
    { label: 'Average Engagement Growth', value: '3.2x', icon: TrendingUp },
    { label: 'Brands Managed', value: '120+', icon: Award },
    { label: 'Platforms Covered', value: '6', icon: Globe },
    { label: 'Monthly Content Pieces', value: '900+', icon: Calendar }
  ];

  const whyUs = [
    'Dedicated strategist and content team for every account',
    'Regional market understanding, based right here in Pune',
    'Transparent monthly reporting with no vanity-metric fluff',
    'Paid and organic strategy handled under one roof'
  ];

  const ActivePlatform = platforms[activePlatform];

  return (
    <div className="min-h-screen bg-white">
      <header className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-orange-500" strokeWidth={2} />
          </div>
          <span className="text-neutral-900 font-bold tracking-tight text-lg">Unseen Studios</span>
        </div>
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-neutral-700">
          <a href="#services" className="hover:text-orange-600 transition-colors">Services</a>
          <a href="#platforms" className="hover:text-orange-600 transition-colors">Platforms</a>
          <a href="#process" className="hover:text-orange-600 transition-colors">Process</a>
          <a href="#studio" className="hover:text-orange-600 transition-colors">Studio</a>
        </nav>
        <a href="#contact" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
          Get a Proposal
          <ArrowRight className="w-4 h-4" />
        </a>
      </header>

      <section className="max-w-7xl mx-auto px-6 sm:px-10 pt-10 sm:pt-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span className="text-orange-700 text-xs font-semibold tracking-wide uppercase">
                Social Media Marketing
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight mb-6">
              Social media that builds
              <span className="text-orange-500"> real communities</span>, not just numbers.
            </h1>
            <p className="text-neutral-700 text-lg leading-relaxed mb-8 max-w-xl">
              Unseen Studios is a creative digital agency based on Sinhgad Road, Pune.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a href="#contact" className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-black text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors">
                Start a Campaign
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 border border-neutral-300 hover:border-orange-400 text-neutral-900 text-sm font-semibold px-6 py-3 rounded-full transition-colors">
                View Services
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>{studio.location}</span>
            </div>
          </div>

          <IconPanel mainIcon={Megaphone} satelliteIcons={[Instagram, Facebook, Linkedin, BarChart3]} />
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {results.map((r, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                <r.icon className="w-5 h-5 text-white" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">{r.value}</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wide">{r.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <div className="max-w-2xl mb-12">
          <span className="text-orange-600 text-xs font-semibold tracking-widest uppercase mb-3 block">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            Full-service social media marketing
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            From the first content brief to the monthly performance report.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 p-6 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-orange-600" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{s.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="platforms" className="bg-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-12">
            <span className="text-orange-400 text-xs font-semibold tracking-widest uppercase mb-3 block">
              Platforms We Manage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              One strategy, every channel
            </h2>
            <p className="text-neutral-300 leading-relaxed">
              We tailor content format and tone.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex lg:flex-col flex-wrap gap-3 w-full lg:w-56 lg:shrink-0">
              {(Object.entries(platforms) as [keyof typeof platforms, (typeof platforms)[keyof typeof platforms]][]).map(([key, p]) => (
                <button key={key} onClick={() => setActivePlatform(key)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors w-full ${activePlatform === key ? 'bg-orange-500 border-orange-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:border-orange-400'}`}>
                  <p.icon className="w-4 h-4" strokeWidth={1.75} />
                  {p.label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-neutral-800 border border-neutral-700 p-8 flex items-start gap-5 w-full flex-1">
              <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                <ActivePlatform.icon className="w-7 h-7 text-white" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">{ActivePlatform.label}</h3>
                <p className="text-neutral-300 leading-relaxed">{ActivePlatform.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <div className="max-w-2xl mb-12">
          <span className="text-orange-600 text-xs font-semibold tracking-widest uppercase mb-3 block">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            A four-step process, run every month
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((p, i) => (
            <div key={i} className="relative rounded-2xl border border-neutral-200 p-6">
              <span className="text-4xl font-extrabold text-orange-100 absolute top-4 right-5">{p.step}</span>
              <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center mb-5 relative">
                <p.icon className="w-5 h-5 text-white" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">{p.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{p.description}</p>
              {i < process.length - 1 && (
                <ChevronRight className="hidden lg:block w-5 h-5 text-orange-300 absolute -right-9 top-1/2 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="studio" className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-orange-600 text-xs font-semibold tracking-widest uppercase mb-3 block">
                About The Studio
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                {studio.name}
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-6">
                {studio.tagline} based on Sinhgad Road, Pune.
              </p>
              <ul className="space-y-3 mb-8">
                {whyUs.map((w, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span className="text-neutral-800 text-sm leading-relaxed">{w}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-neutral-800">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{studio.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-800">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{studio.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-800">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{studio.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-800">
                  <Globe className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{studio.website}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                {[Instagram, Facebook, XformerlyTwitter, Linkedin, Youtube].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-neutral-900 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors cursor-pointer">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                ))}
              </div>
            </div>

            <IconPanel mainIcon={Sparkles} satelliteIcons={[Users, Target, BarChart3, PenTool]} />
          </div>
        </div>
      </section>

      <section id="contact" className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="rounded-2xl bg-neutral-900 px-8 sm:px-14 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
              Ready to grow your social presence?
            </h2>
            <p className="text-neutral-300 max-w-lg">
              Tell us about your brand and goals.
            </p>
          </div>
          <a href="mailto:info@unseenstudios.com" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-7 py-3.5 rounded-full whitespace-nowrap transition-colors">
            Contact Unseen Studios
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-center text-neutral-400 text-xs mt-8">
          Unseen Studios — Sinhgad Road, Pune, Maharashtra 411051
        </p>
      </section>
    </div>
  );
};

export default SocialMediaMarketing;
