import { Link } from "react-router-dom";

import {
  TrendingUp,
  Target,
  BarChart3,
  Mail,
  Share2,
  Globe,
  Video,
  PenTool,
  Search,
  ArrowRight,
  Zap,
  Shield
} from 'lucide-react';

// Brand/social icons: lucide-react intentionally excludes logo marks
// (trademark reasons), so these come from react-icons instead.
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaYoutube
} from 'react-icons/fa6';

const DigitalPage = () => {
  const services = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Optimization",
      description: "Boost your search engine rankings with our proven SEO strategies and drive organic traffic to your website."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "PPC Advertising",
      description: "Maximize ROI with targeted pay-per-click campaigns across Google, Bing, and social media platforms."
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Marketing",
      description: "Build lasting relationships with personalized email campaigns that convert leads into loyal customers."
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Media Management",
      description: "Engage your audience with compelling content and strategic social media campaigns that drive results."
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Content Marketing",
      description: "Create valuable content that attracts, engages, and converts your target audience."
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Marketing",
      description: "Leverage the power of video to tell your brand story and connect with your audience emotionally."
    }
  ];

  const platforms = [
    { icon: <FaFacebook className="w-8 h-8" />, name: "Facebook", color: "text-blue-600" },
    { icon: <FaInstagram className="w-8 h-8" />, name: "Instagram", color: "text-pink-600" },
    { icon: <FaXTwitter className="w-8 h-8" />, name: "Twitter", color: "text-blue-400" },
    { icon: <FaLinkedin className="w-8 h-8" />, name: "LinkedIn", color: "text-blue-700" },
    { icon: <FaYoutube className="w-8 h-8" />, name: "YouTube", color: "text-red-600" }
  ];

  

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Rapid Growth",
      description: "Accelerate your business growth with data-driven marketing strategies."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Expand your brand's presence across international markets and audiences."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Measurable Results",
      description: "Track every campaign with detailed analytics and actionable insights."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Brand Protection",
      description: "Safeguard your brand reputation with expert reputation management."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-100/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6">
                <span className="text-orange-700 text-sm font-semibold">📈 Digital Marketing Agency</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Grow Your Business
                <span className="text-orange-500 block">With Digital Marketing</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We develop and execute comprehensive digital marketing strategies that drive 
                measurable growth and deliver exceptional ROI for your business.
              </p>
              <div className="flex flex-wrap gap-4">
                  <Link to="/contact">

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-orange-200">
                  Start Growing <ArrowRight className="w-5 h-5" />
                </button>
                  </Link>

              
              </div>
              <div className="flex flex-wrap items-center gap-8 mt-8">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-orange-200 border-2 border-white flex items-center justify-center text-orange-700 font-bold text-sm">JD</div>
                  <div className="w-10 h-10 rounded-full bg-orange-300 border-2 border-white flex items-center justify-center text-orange-700 font-bold text-sm">MK</div>
                  <div className="w-10 h-10 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm">AL</div>
                  <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">+8</div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Trusted by 250+ companies</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <span key={star} className="text-orange-400">★</span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(4.9/5)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                <img 
                  src="assets/images/digital.png"
                  alt="Digital Marketing Dashboard" 
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">+250% Growth</p>
                    <p className="text-xs text-gray-500">Average client increase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      

      {/* Services Section */}
      <div className="py-20 bg-orange-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-500">Digital Marketing</span> Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive suite of digital marketing services designed to 
              help your business thrive in the digital landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group bg-white border border-gray-100 hover:border-orange-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-orange-50"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platforms Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multi-Platform <span className="text-orange-500">Expertise</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We excel across all major digital platforms, ensuring your brand reaches 
              your audience wherever they are.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-8">
            {platforms.map((platform, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:border-orange-200 group"
              >
                <div className={`${platform.color} mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {platform.icon}
                </div>
                <p className="font-semibold text-gray-900">{platform.name}</p>
                <p className="text-xs text-gray-500 mt-1">Expert Management</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our <span className="text-orange-500">Digital Marketing</span> Services
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We combine creativity with data-driven strategies to deliver exceptional 
                results that help your business grow.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-orange-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-orange-500 mb-3">{benefit.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="assets/images/digital1.png"
                alt="Digital Marketing Analytics" 
                className="rounded-2xl shadow-2xl border-4 border-white"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 sm:p-10 md:p-16 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Scale Your Business?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's create a custom digital marketing strategy that delivers measurable results 
            and drives sustainable growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">

            <button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg">
              Get Free Consultation
            </button>
              </Link>

            
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default DigitalPage;
