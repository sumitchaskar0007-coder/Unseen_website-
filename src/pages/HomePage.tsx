import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { About } from '../components/sections/About'
import { Hero } from '../components/sections/Hero'
import { Services } from '../components/sections/Services'
import { WhyUnseen } from '../components/WhyUnseen'
import Cta from '../components/Cta'
import Client from '../components/Client'
import {
  X, ChevronDown, Film, Music, Video, Share2, Globe, Megaphone,
  Search, Landmark, MessageSquare, Star, Quote, ArrowLeft, ArrowRight,
  Building2, GraduationCap, Hotel, User, Sparkles,
  Lightbulb, PenTool, Rocket, Plus
} from 'lucide-react'

export function HomePage() {
  const { hash, pathname } = useLocation()
  const [showPopup, setShowPopup] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [aiTagIndex, setAiTagIndex] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const services = [
    { name: "Documentary Films", icon: Film, description: "Cinematic storytelling that captures real emotions" },
    { name: "Podcast & Jingles", icon: Music, description: "Engaging audio content and memorable jingles" },
    { name: "Video Ads", icon: Video, description: "High-conversion video advertisements" },
    { name: "Social Media Marketing", icon: Share2, description: "Strategic social campaigns that build communities" },
    { name: "Website Development", icon: Globe, description: "Modern, responsive websites that convert" },
    { name: "Digital Marketing", icon: Megaphone, description: "Comprehensive digital strategies" },
    { name: "SEO Optimization", icon: Search, description: "Data-driven SEO for top rankings" },
    { name: "Political Campaigns", icon: Landmark, description: "Strategic political marketing" },
    { name: "Bulk SMS Marketing", icon: MessageSquare, description: "Reach thousands instantly with targeted SMS" }
  ]

  // Impact numbers — shown as a stat strip right under the hero for early credibility
 

  // The actual sequence we run every project through — numbering carries real meaning here
  const processSteps = [
    {
      number: "01",
      title: "Discover",
      icon: Lightbulb,
      description: "We start by understanding your goals, your audience, and the story only your brand can tell."
    },
    {
      number: "02",
      title: "Strategize",
      icon: PenTool,
      description: "We map out the channels, formats, and timeline that fit your budget and business goals."
    },
    {
      number: "03",
      title: "Create",
      icon: Film,
      description: "Our in-house team shoots, edits, designs, and writes every asset — no outsourcing, no delays."
    },
    {
      number: "04",
      title: "Launch & Grow",
      icon: Rocket,
      description: "We publish, track real performance data, and refine the campaign every week."
    }
  ]

  // Representative work categories shown in the gallery below Services.
  // Swap the src paths for real project photography once available — the
  // onError handler below falls back to a clean icon tile if an image is missing.
  const workGallery = [
    { title: "Documentary Films", icon: Film, image: "/assets/images/work/documentary.png" },
    { title: "Website Development", icon: Globe, image: "/assets/images/work/website1.png" },
    { title: "Social Media Campaigns", icon: Share2, image: "/assets/images/work/social.png" },
    { title: "Hospitality & Events", icon: Hotel, image: "/assets/images/work/hospitality.png" }
  ]

  const faqs = [
    {
      question: "What services does Unseen Studio provide?",
      answer: "We handle documentary films, podcasts and jingles, video ads, social media marketing, website development, digital marketing, SEO, political campaigns, and bulk SMS marketing — all under one roof."
    },
    {
      question: "Do you work with clients outside Maharashtra?",
      answer: "Most of our current clients are based across Maharashtra, but our production and digital marketing services are fully remote-friendly and we welcome projects from anywhere in India."
    },
    {
      question: "How long does a typical project take?",
      answer: "A website or a short campaign usually takes 2-4 weeks. Documentary films and multi-channel digital marketing retainers are scoped individually based on what you need."
    },
    {
      question: "Can you handle production and digital marketing together?",
      answer: "Yes — that's actually our core strength. The same team that shoots your film or ad also builds the website and runs the campaign that gets it seen, so nothing gets lost in handoffs."
    },
    {
      question: "How do I get started?",
      answer: "Use the Get Free Consultation form on this page or reach out through the contact section below. We'll set up a short call to understand your goals and share a plan within a few days."
    }
  ]

  // Rotating "AI-powered" insight tags shown near the testimonials header.
  // Kept short and factual per the copy guidance — no filler, one job each.
  const aiInsightTags = [
    "AI-assisted audience targeting",
    "Smart content optimization",
    "Data-driven creative decisions",
    "Automated performance tracking"
  ]

  // Testimonials Data with Real Maharashtrian Clients
  const testimonialsData = [
    {
      id: 1,
      name: "Jadhavar Group of Institute",
      role: "Educational Institute",
      content: "Unseen Studio ने आमच्या संस्थेची संपूर्ण वेबसाइट आणि ERP प्रणाली विकसित केली. त्यांच्या SEO धोरणांमुळे आमची ऑनलाइन उपस्थिती वाढली आणि विद्यार्थ्यांची संख्या दुप्पट झाली.",
      rating: 5,
      icon: GraduationCap,
      location: "Narhe, Pune",
      services: ["Website Development", "ERP System", "SEO Optimization"]
    },
    {
      id: 2,
      name: "Mandke College",
      role: "Educational Institution",
      content: "Unseen Studio ने आमच्या कॉलेजसाठी उत्कृष्ट वेबसाइट आणि डिजिटल मार्केटिंग धोरणे तयार केली. त्यांच्या कार्यामुळे आमची ब्रँड ओळख वाढली आणि अधिक विद्यार्थी आकर्षित झाले.",
      rating: 5,
      icon: Building2,
      location: "Pune, Maharashtra",
      services: ["Website Development", "Digital Marketing"]
    },
    {
      id: 3,
      name: "Dr. Pratibha Kendre Jadhavar",
      role: "Medical Professional",
      content: "Unseen Studio च्या सोशल मीडिया आणि वेबसाइट व्यवस्थापनामुळे माझ्या वैद्यकीय सेवांची ऑनलाइन उपस्थिती मोठ्या प्रमाणात वाढली. त्यांची टीम अत्यंत व्यावसायिक आणि कार्यक्षम आहे.",
      rating: 5,
      icon: User,
      location: "Maharashtra",
      services: ["Social Media Marketing", "Website Development"]
    },
    {
      id: 4,
      name: "Hotel Chava",
      role: "Premium Hospitality",
      content: "Unseen Studio ने आमच्या हॉटेलची सोशल मीडिया हाताळणी आणि डिजिटल मार्केटिंग केली. त्यांच्या क्रिएटिव्ह कॅम्पेन्समुळे आमची बुकिंग 200% ने वाढली आणि ब्रँड ओळख प्रस्थापित झाली.",
      rating: 5,
      icon: Hotel,
      location: "Maharashtra",
      services: ["Social Media Marketing", "Digital Marketing"]
    },
    {
      id: 5,
      name: "Hotel Shivaraj",
      role: "Luxury Hospitality",
      content: "Unseen Studio च्या सोशल मीडिया व्यवस्थापनामुळे आमच्या हॉटेलची ऑनलाइन प्रतिष्ठा वाढली. त्यांच्या धोरणात्मक दृष्टिकोनामुळे आम्हाला अधिक ग्राहक मिळाले आणि व्यवसाय वाढीस मदत झाली.",
      rating: 5,
      icon: Hotel,
      location: "Maharashtra",
      services: ["Social Media Marketing"]
    },
    {
      id: 6,
      name: "Sahyadri Group of Institutes",
      role: "Educational Network",
      content: "Unseen Studio ने आमच्या सर्व शाखांसाठी एकात्मिक डिजिटल धोरण विकसित केले. त्यांच्या कार्यामुळे आमची ऑनलाइन उपस्थिती आणि विद्यार्थी नोंदणीत लक्षणीय वाढ झाली.",
      rating: 5,
      icon: GraduationCap,
      location: "Maharashtra",
      services: ["Digital Marketing", "SEO Optimization", "Website Development"]
    },
    {
      id: 7,
      name: "Pune Medical Foundation",
      role: "Healthcare Organization",
      content: "Unseen Studio च्या डिजिटल मार्केटिंग धोरणांमुळे आमच्या वैद्यकीय सेवांची पोहोच वाढली. त्यांची टीम अत्यंत व्यावसायिक आणि विश्वासू आहे.",
      rating: 5,
      icon: User,
      location: "Pune",
      services: ["Social Media Marketing", "Website Development"]
    },
    {
      id: 8,
      name: "Mumbai Hospitality Group",
      role: "Hotel Chain",
      content: "Unseen Studio ने आमच्या हॉटेल शृंखलेसाठी अभिनव डिजिटल मार्केटिंग मोहिमा राबवल्या. त्यांच्या क्रिएटिव्ह दृष्टिकोनामुळे आमची बुकिंग 300% वाढली.",
      rating: 5,
      icon: Hotel,
      location: "Mumbai",
      services: ["Social Media Marketing", "Digital Marketing"]
    }
  ]

  // Show popup on every visit and refresh
  useEffect(() => {
    if (pathname === '/') {
      const timer = setTimeout(() => {
        setShowPopup(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  useEffect(() => {
    const handleLoad = () => {
      if (pathname === '/' && !sessionStorage.getItem('popupJustClosed')) {
        const timer = setTimeout(() => {
          setShowPopup(true)
        }, 1000)
        return () => clearTimeout(timer)
      }
    }

    window.addEventListener('load', handleLoad)
    return () => window.removeEventListener('load', handleLoad)
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/' || hash !== '#why') return
    const t = window.setTimeout(() => {
      document.getElementById('why')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => window.clearTimeout(t)
  }, [hash, pathname])

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonialsData.length / 4))
      }, 5000)
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, testimonialsData.length])

  // Cycle the small "AI insight" tag every few seconds — quiet, ambient motion only.
  useEffect(() => {
    const t = setInterval(() => {
      setAiTagIndex((prev) => (prev + 1) % aiInsightTags.length)
    }, 3200)
    return () => clearInterval(t)
  }, [aiInsightTags.length])

  const totalSlides = Math.ceil(testimonialsData.length / 4)

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName)
    setIsDropdownOpen(false)
    console.log(`Selected service: ${serviceName}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService) {
      alert('Please select a service')
      return
    }
    alert(`Thank you for your interest in ${selectedService}! We'll contact you soon.`)
    setShowPopup(false)
    sessionStorage.setItem('popupJustClosed', 'true')
    setTimeout(() => {
      sessionStorage.removeItem('popupJustClosed')
    }, 100)
  }

  const closePopup = () => {
    setShowPopup(false)
    sessionStorage.setItem('popupJustClosed', 'true')
    setTimeout(() => {
      sessionStorage.removeItem('popupJustClosed')
    }, 100)
  }

  // Get current slide testimonials - always show 4 cards
  const getCurrentTestimonials = () => {
    const start = currentSlide * 4
    const end = start + 4
    // If we don't have enough items, wrap around from the beginning
    if (end > testimonialsData.length) {
      const remaining = testimonialsData.slice(start)
      const needed = 4 - remaining.length
      return [...remaining, ...testimonialsData.slice(0, needed)]
    }
    return testimonialsData.slice(start, end)
  }

  return (
    <>
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4 animate-fadeIn">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closePopup}
          ></div>

          <div className="relative bg-white rounded-2xl w-full max-w-[92vw] sm:max-w-md p-5 sm:p-6 shadow-2xl animate-slideUp border border-gray-200 max-h-[88vh] overflow-y-auto">
            <button
              onClick={closePopup}
              aria-label="Close"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5 sm:mb-6">
              <div className="flex justify-center mb-3">
                <img
                  src="/assets/images/lll.png"
                  alt="UNSEEN STUDIO"
                  className="h-14 sm:h-16 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center';
                      fallback.innerHTML = '<span className="text-orange-600 font-bold text-xl">US</span>';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Transform Your Vision Into Reality</p>
            </div>

            <p className="text-gray-700 text-center text-sm sm:text-base mb-5 sm:mb-6">
              Get a free consultation for your digital marketing needs
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-left text-gray-900 flex items-center justify-between focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                >
                  <span className={`text-sm sm:text-base truncate pr-2 ${selectedService ? 'text-gray-900' : 'text-gray-500'}`}>
                    {selectedService || 'Select a Service'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 max-h-56 sm:max-h-64 overflow-y-auto">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleServiceSelect(service.name)}
                        className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center gap-3 group border-b border-gray-100 last:border-0"
                      >
                        <service.icon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-gray-900 text-sm group-hover:text-orange-600 transition-colors font-medium truncate">
                            {service.name}
                          </div>
                          <div className="text-gray-500 text-xs truncate">{service.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="relative w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
              >
                <span className="relative z-10">Get Free Consultation</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </button>
            </form>

            <p className="text-gray-500 text-[11px] sm:text-xs text-center mt-4">
              By submitting, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      )}

      {/* Main Page Content — no top margin/padding so it sits flush under the header on mobile */}
      <div className="bg-white w-full overflow-x-hidden m-0 p-0">
        <Hero />

        {/* Impact Stats — quick credibility strip right under the hero */}
        {/* <section className="relative border-y border-gray-100 bg-white py-8 sm:py-10">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
              {impactStats.map((stat, index) => {
                const StatIcon = stat.icon
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center gap-1.5 sm:flex-row sm:items-center sm:text-left sm:gap-3"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 border border-orange-100">
                      <StatIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-none">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-[11px] sm:text-xs text-gray-500 font-medium leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section> */}

        <About />
        <WhyUnseen />
        <Services limit={3} showViewMore />

        {/* How We Work — the real, ordered process behind every project */}
        <section className="relative py-14 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-orange-100 rounded-full mb-4">
                <span className="text-orange-600 text-xs sm:text-sm font-semibold">Our Process</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight px-2">
                How We <span className="text-orange-500">Work</span>
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4" />
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-2">
                A straightforward, four-step process — the same one behind every project we deliver.
              </p>
            </div>

            <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {/* Connecting line — desktop only */}
              <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gray-200 lg:block" />

              {processSteps.map((step, index) => {
                const StepIcon = step.icon
                return (
                  <div key={index} className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
                    <div className="relative z-10 flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-2xl bg-white border border-gray-200 shadow-sm">
                      <StepIcon className="w-7 h-7 text-orange-500" />
                      <span className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-[11px] font-bold text-white shadow-md">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Work — visual proof, organized by category */}
        <section className="relative py-14 sm:py-16 md:py-20 bg-white overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-orange-100 rounded-full mb-4">
                <span className="text-orange-600 text-xs sm:text-sm font-semibold">Our Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight px-2">
                Work That <span className="text-orange-500">Speaks</span>
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4" />
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-2">
                A look across the categories we produce and manage for clients across Maharashtra.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {workGallery.map((item, index) => {
                const ItemIcon = item.icon
                return (
                  <div
                    key={index}
                    className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 via-orange-50 to-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-transparent">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur">
                        <ItemIcon className="w-6 h-6 text-orange-500" />
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-4 py-4">
                      <span className="text-sm font-semibold text-white">{item.title}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <Client />

        {/* Professional Testimonials Section */}
        <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-br from-white via-orange-50/30 to-white overflow-hidden">
          {/* Ambient AI-style animated gradient orbs — quiet motion, respects reduced-motion */}
          <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden="true">
            <div className="ai-orb ai-orb-1 absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-orange-300/20 blur-3xl" />
            <div className="ai-orb ai-orb-2 absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] rounded-full bg-amber-200/25 blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-orange-100 rounded-full mb-4">
                <span className="text-orange-600 text-xs sm:text-sm font-semibold">Client Testimonials</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight px-2">
                What Our <span className="text-orange-500">Clients</span> Say
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4" />
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-2">
                आमच्या महाराष्ट्रीय क्लायंट्सच्या शब्दांत — Real stories from real clients across Maharashtra
              </p>

              {/* Rotating AI-insight badge — the one signature motion element on this page */}
              <div className="mt-5 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 backdrop-blur px-3.5 py-1.5 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="ai-pulse-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                  <span key={aiTagIndex} className="ai-tag-fade text-[11px] sm:text-xs font-medium text-gray-700">
                    {aiInsightTags[aiTagIndex]}
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonials Slider - Always 4 Cards */}
            <div className="relative">
              {/* Navigation Arrows — desktop only, floating outside the grid */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl border border-gray-200 hover:border-orange-500 transition-all duration-300 hover:scale-110 hidden lg:flex items-center justify-center"
                aria-label="Previous testimonials"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-10 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl border border-gray-200 hover:border-orange-500 transition-all duration-300 hover:scale-110 hidden lg:flex items-center justify-center"
                aria-label="Next testimonials"
              >
                <ArrowRight className="w-5 h-5 text-gray-700" />
              </button>

              {/* Testimonials Grid - responsive 1 / 2 / 4 columns */}
              <div className="overflow-hidden">
                <div
                  key={currentSlide}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
                >
                  {getCurrentTestimonials().map((testimonial, idx) => {
                    const IconComponent = testimonial.icon
                    return (
                      <div
                        key={testimonial.id}
                        style={{ animationDelay: `${idx * 0.08}s` }}
                        className="testimonial-card bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                      >
                        {/* Rating */}
                        <div className="flex mb-3 sm:mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>

                        {/* Quote Icon */}
                        <div className="mb-3">
                          <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-orange-100 fill-orange-200" />
                        </div>

                        {/* Content */}
                        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4 min-h-[76px] sm:min-h-[80px]">
                          "{testimonial.content}"
                        </p>

                        {/* Client Info */}
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center flex-shrink-0 mt-1">
                              <IconComponent className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 text-sm leading-tight truncate">
                                {testimonial.name}
                              </div>
                              <div className="text-xs text-gray-500 font-medium mt-0.5 truncate">
                                {testimonial.role}
                              </div>
                              <div className="text-xs text-gray-400 flex items-center gap-1 mt-1 truncate">
                                <span>📍</span>
                                <span className="truncate">{testimonial.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Services Tags */}
                          {testimonial.services && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {testimonial.services.map((service, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[10px] bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full font-medium border border-orange-100"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mobile / tablet arrows — visible below lg, sit under the grid */}
              <div className="flex lg:hidden justify-center gap-4 mt-6">
                <button
                  onClick={prevSlide}
                  className="bg-white rounded-full p-2.5 shadow-md border border-gray-200 active:scale-95 transition-transform"
                  aria-label="Previous testimonials"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-white rounded-full p-2.5 shadow-md border border-gray-200 active:scale-95 transition-transform"
                  aria-label="Next testimonials"
                >
                  <ArrowRight className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center mt-6 sm:mt-10 gap-2 sm:gap-2.5">
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 ${
                      currentSlide === index
                        ? 'w-8 sm:w-9 h-2.5 sm:h-3 bg-orange-500 rounded-full shadow-md shadow-orange-200'
                        : 'w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="relative py-14 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-3xl">
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-orange-100 rounded-full mb-4">
                <span className="text-orange-600 text-xs sm:text-sm font-semibold">FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight px-2">
                Common <span className="text-orange-500">Questions</span>
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto rounded-full" />
            </div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
                    >
                      <span className="text-sm sm:text-base font-semibold text-gray-900">
                        {faq.question}
                      </span>
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 border border-orange-100">
                        {isOpen ? (
                          <Plus className="w-4 h-4 rotate-45 text-orange-500 transition-transform duration-300" />
                        ) : (
                          <Plus className="w-4 h-4 text-orange-500 transition-transform duration-300" />
                        )}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm leading-relaxed text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <Cta />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes orbFloatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.08); }
        }

        @keyframes orbFloatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 25px) scale(1.05); }
        }

        @keyframes pulseRing {
          0% { transform: scale(0.9); opacity: 0.8; }
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }

        @keyframes tagFade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .testimonial-card {
          animation: fadeInUp 0.6s ease-out both;
        }

        .ai-orb-1 {
          top: -60px;
          left: -80px;
          animation: orbFloatA 14s ease-in-out infinite;
        }

        .ai-orb-2 {
          bottom: -60px;
          right: -60px;
          animation: orbFloatB 16s ease-in-out infinite;
        }

        .ai-pulse-ping {
          animation: pulseRing 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .ai-tag-fade {
          display: inline-block;
          animation: tagFade 0.5s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-card,
          .ai-orb-1,
          .ai-orb-2,
          .ai-pulse-ping,
          .ai-tag-fade,
          .animate-fadeIn,
          .animate-slideUp {
            animation: none !important;
          }
        }

        @media (max-width: 768px) {
          .testimonial-card {
            animation-delay: 0s !important;
          }
        }
      `}</style>
    </>
  )
}
