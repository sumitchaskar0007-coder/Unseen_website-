import type { FC } from 'react';
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
  FaSnapchat,
  FaTiktok,
  FaArrowRight,
  FaChartLine,
  FaUsers,
  FaBullhorn,
  FaCalendarAlt,
  FaCheckCircle,
  FaRocket,
  FaBullseye,
  FaPenFancy,
  FaHashtag,
  FaVideo,
  FaQuoteLeft
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SocialMediaMarketing: FC = () => {

  // Social media platforms
  const platforms = [
    { icon: FaInstagram, name: 'Instagram', color: 'text-pink-600', bg: 'bg-pink-100' },
    { icon: FaFacebook, name: 'Facebook', color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: FaTwitter, name: 'Twitter', color: 'text-blue-400', bg: 'bg-blue-50' },
    { icon: FaLinkedin, name: 'LinkedIn', color: 'text-blue-700', bg: 'bg-blue-100' },
    { icon: FaYoutube, name: 'YouTube', color: 'text-red-600', bg: 'bg-red-100' },
    { icon: FaPinterest, name: 'Pinterest', color: 'text-red-500', bg: 'bg-red-50' },
    { icon: FaTiktok, name: 'TikTok', color: 'text-black', bg: 'bg-gray-100' },
    { icon: FaSnapchat, name: 'Snapchat', color: 'text-yellow-500', bg: 'bg-yellow-50' }
  ];

  // Services
  const services = [
    {
      icon: FaPenFancy,
      title: 'Content Creation',
      description: 'Engaging posts, stories, reels, and videos tailored to your brand voice'
    },
    {
      icon: FaBullseye,
      title: 'Strategy Development',
      description: 'Data-driven social media strategies aligned with your business goals'
    },
    {
      icon: FaUsers,
      title: 'Community Management',
      description: 'Build and nurture relationships with your audience through authentic engagement'
    },
    {
      icon: FaHashtag,
      title: 'Hashtag Strategy',
      description: 'Research and implementation of trending and niche hashtags for maximum reach'
    },
    {
      icon: FaVideo,
      title: 'Video Marketing',
      description: 'Professional video content including reels, shorts, and live streaming'
    },
    {
      icon: FaChartLine,
      title: 'Analytics & Reporting',
      description: 'Detailed insights and performance reports to track ROI and growth'
    }
  ];

  // Campaign results
  const campaignResults = [
    { label: 'Average Engagement Rate', value: '4.8%', change: '+32%' },
    { label: 'Follower Growth', value: '156%', change: '+156%' },
    { label: 'Reach Increase', value: '287%', change: '+287%' },
    { label: 'Conversion Rate', value: '12.5%', change: '+8.2%' }
  ];

  // Why choose us
  const whyChooseUs = [
    '10+ years of social media marketing experience',
    'Data-driven strategies for measurable results',
    'Dedicated team of social media experts',
    'Creative content that stands out',
    'Transparent reporting and analytics',
    '24/7 community management and support'
  ];

  // Pricing plans
  const pricingPlans = [
    {
      name: 'Starter',
      price: '$499',
      period: '/month',
      platforms: '3 Platforms',
      features: [
        '12 Posts/month',
        'Community Management',
        'Basic Analytics',
        'Monthly Report',
        'Email Support'
      ]
    },
    {
      name: 'Professional',
      price: '$999',
      period: '/month',
      platforms: '5 Platforms',
      features: [
        '20 Posts/month',
        'Advanced Strategy',
        'Video Content',
        'Detailed Analytics',
        'Priority Support',
        'Monthly Consultation'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      platforms: 'All Platforms',
      features: [
        'Custom Content Strategy',
        'Dedicated Account Manager',
        'Full Video Production',
        'Advanced Analytics',
        '24/7 Premium Support',
        'Quarterly Strategy Sessions'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4">
              <FaBullhorn className="text-orange-500" />
              <span className="text-sm font-semibold">Unseen Studios - Social Media Marketing</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
              Social Media <span className="text-orange-500">Marketing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-2">Grow Your Brand. Engage Your Audience. Drive Results.</p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Comprehensive social media marketing services to build your brand presence, connect with your audience, and achieve your business goals
            </p>
          </motion.div>
        </div>
      </div>

      {/* Platforms Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Platforms We Manage</h2>
            <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">Full Service</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg hover:shadow-md transition border border-gray-200 hover:border-orange-300 group cursor-pointer"
              >
                <div className={`${platform.bg} w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition`}>
                  <platform.icon className={`text-xl ${platform.color}`} />
                </div>
                <span className="text-xs font-medium text-gray-700">{platform.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 border-y border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {campaignResults.map((result, index) => (
              <div key={index} className="bg-white rounded-xl p-5 text-center border border-gray-200 hover:border-orange-300 transition">
                <div className="text-2xl font-bold text-orange-500">{result.value}</div>
                <div className="text-sm text-gray-600">{result.label}</div>
                <div className="text-xs text-green-500 font-semibold mt-1">{result.change}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Services</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm">
            Comprehensive social media marketing services to grow your brand
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 transition hover:shadow-md group"
            >
              <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition">
                <service.icon className="text-xl text-orange-500 group-hover:text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
              <p className="text-sm text-gray-500">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-orange-50 border-y border-orange-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Why Choose Unseen Studios</h2>
              <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whyChooseUs.map((reason, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-orange-200">
                  <FaCheckCircle className="text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pricing Plans</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-3 text-sm">Choose a plan that fits your business needs</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-white rounded-xl border p-6 transition hover:shadow-lg ${
                plan.popular ? 'border-orange-500 ring-2 ring-orange-500' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="bg-orange-500 text-white text-center py-1 text-xs font-semibold rounded-t-lg -mt-6 -mx-6 mb-4">
                  ★ Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-orange-500">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{plan.platforms}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <FaCheckCircle className="text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full mt-6 py-2.5 rounded-lg font-semibold transition ${
                plan.popular
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50'
              }`}>
                {plan.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonial */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
        >
          <FaQuoteLeft className="text-3xl text-orange-400 mx-auto mb-4" />
          <blockquote className="text-lg md:text-xl text-gray-700 font-medium mb-4">
            "Unseen Studios transformed our social media presence. Our engagement grew by 300% in just 3 months!"
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center">
              <FaUsers className="text-orange-500" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-sm">Client Testimonial</p>
              <p className="text-xs text-gray-500">Social Media Marketing Client</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-orange-50 to-white border border-orange-200 rounded-2xl p-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4">
            <FaRocket className="text-orange-500" />
            <span className="text-sm font-semibold">Grow Your Social Media Presence</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Ready to Skyrocket Your Social Media?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm">
            Let's create a social media strategy that drives engagement, builds your brand, and delivers results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-orange-200"
            >
              Get Started Today
              <FaArrowRight className="text-sm" />
            </Link>
            <button className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full font-semibold transition">
              <FaCalendarAlt />
              Schedule Consultation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Unseen Studios. All rights reserved. | Sinhgad Road, Pune
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Social Media Marketing Agency | Grow Your Brand Online
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaMarketing;
