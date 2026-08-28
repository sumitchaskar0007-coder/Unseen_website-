import React, { useState } from 'react';
import { 
  FaPlay, 
  FaYoutube, 
  FaFilm, 
  FaEye, 
  FaArrowRight,
  FaClock,
  FaQuoteLeft,
  FaGraduationCap,
  FaVideo,
  FaCamera,
  FaEdit,
  FaMusic,
  FaTheaterMasks,
  FaDollarSign,
  FaCheckCircle
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Film: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "Vh_de2VecAA";

  const filmDetails = {
    title: "Dr. Sudhakarrao Jadhavar - A Visionary's Journey",
    subtitle: "Documentary Film 2023",
    description: "An inspiring documentary film celebrating the life, vision, and legacy of Dr. Sudhakarrao Jadhavar - a pioneer in education who transformed the landscape of learning in Maharashtra.",
    releaseDate: "November 27, 2023",
    views: "3,035",
    likes: 134,
    duration: "4:32",
    channel: "Jadhavar Group Of Institutes",
    subscribers: "10.6K",
    category: "Documentary"
  };

  const keyMoments = [
    {
      time: "0:00",
      title: "Opening",
      description: "Introduction to Dr. Sudhakarrao Jadhavar's journey"
    },
    {
      time: "1:15",
      title: "Early Life",
      description: "Humble beginnings and early education"
    },
    {
      time: "2:30",
      title: "Vision for Education",
      description: "Founding the Jadhavar Group of Institutes"
    },
    {
      time: "3:45",
      title: "Legacy",
      description: "Impact on thousands of students"
    }
  ];

  

  // Documentary Services
  const documentaryServices = [
    {
      icon: FaVideo,
      title: "Documentary Production",
      description: "End-to-end documentary filmmaking from concept to final cut"
    },
    {
      icon: FaCamera,
      title: "Cinematography",
      description: "Professional camera work with cinematic quality and storytelling"
    },
    {
      icon: FaEdit,
      title: "Post-Production",
      description: "Expert editing, color grading, sound design, and visual effects"
    },
    {
      icon: FaMusic,
      title: "Music & Sound",
      description: "Original score, sound design, and audio mixing for impact"
    },
    {
      icon: FaTheaterMasks,
      title: "Storytelling",
      description: "Compelling narrative development and scriptwriting services"
    },
    {
      icon: FaDollarSign,
      title: "Distribution",
      description: "YouTube optimization, social media promotion, and distribution strategy"
    }
  ];

  // Portfolio Projects
  const portfolioProjects = [
    {
      title: "Educational Documentary Series",
      description: "Multi-part series on educational institutions and their impact",
      year: "2024",
      type: "Series"
    },
    {
      title: "Corporate Profile Films",
      description: "Professional company documentaries highlighting vision and values",
      year: "2023-2024",
      type: "Corporate"
    },
    {
      title: "Social Impact Documentaries",
      description: "Stories of change-makers and community transformation",
      year: "2023",
      type: "Social"
    },
    {
      title: "Institutional History Films",
      description: "Documenting the journey and legacy of educational institutions",
      year: "2022-2024",
      type: "Educational"
    }
  ];

  // Why Choose Us
  const whyChooseUs = [
    "10+ years of documentary filmmaking experience",
    "Professional equipment and production team",
    "End-to-end service from concept to distribution",
    "Storytelling that connects with audiences",
    "Optimized for YouTube and social media reach",
    "Competitive pricing with high-quality output"
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
      {/* Hero Section - Agency Introduction */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4">
              <FaFilm className="text-orange-500" />
              <span className="text-sm font-semibold">Unseen Studios - Documentary Production</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
              Professional <span className="text-orange-500">Documentary</span> Films
            </h1>
            <p className="text-xl text-gray-600 mb-2">We tell stories that inspire and educate</p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From concept to completion - Our documentary filmmaking services capture the essence of people, institutions, and movements
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Documentary - Sample Work */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">Featured Project</span>
              <span className="text-sm text-gray-500">Sample Documentary</span>
            </div>
          </div>
          
          <div className="relative aspect-video bg-black">
            {!isPlaying ? (
              <>
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt={filmDetails.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-orange-500 transition transform hover:scale-105 shadow-lg group"
                  >
                    <FaPlay className="text-black text-2xl ml-1 group-hover:text-white" />
                  </button>
                  <p className="text-white text-sm mt-3 font-medium bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    Watch Sample Documentary
                  </p>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white">
                  <div className="flex items-center gap-3">
                    <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <FaClock className="text-orange-400" />
                      {filmDetails.duration}
                    </span>
                    <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <FaEye className="text-orange-400" />
                      {filmDetails.views} views
                    </span>
                  </div>
                  <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    {filmDetails.category}
                  </span>
                </div>
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={filmDetails.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          {/* Video Details */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{filmDetails.title}</h2>
            <p className="text-gray-600 text-sm mb-3">{filmDetails.subtitle}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{filmDetails.description}</p>
            
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-black hover:bg-orange-500 px-5 py-2 rounded-full text-sm font-medium transition border border-orange-500"
              >
                <FaYoutube className="text-orange-500" />
                Watch on YouTube
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Services Section - What We Offer */}
      <div className="bg-gray-50 border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Documentary Services</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm">
              We provide comprehensive documentary filmmaking services to bring your story to life
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {documentaryServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 transition hover:shadow-md"
              >
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <service.icon className="text-xl text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Documentary Portfolio</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-3 text-sm">Sample projects we've produced for our clients</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 transition hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-900">{project.title}</h3>
                <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {project.type}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{project.description}</p>
              <p className="text-xs text-gray-400">Year: {project.year}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
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

      {/* Key Moments Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Sample Key Moments</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-3 text-sm">Timeline from our featured documentary</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {keyMoments.map((moment, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-5 border border-gray-200 hover:border-orange-300 transition hover:shadow-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-500 text-white font-bold px-2.5 py-0.5 rounded-full text-xs">
                  {moment.time}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{moment.title}</h3>
              <p className="text-sm text-gray-500">{moment.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      

      {/* Testimonial Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
        >
          <FaQuoteLeft className="text-3xl text-orange-400 mx-auto mb-4" />
          <blockquote className="text-lg md:text-xl text-gray-700 font-medium mb-4">
            "Unseen Studios captured the essence of our institution's journey perfectly. Their documentary film has inspired our students and faculty alike."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="bg-black w-10 h-10 rounded-full flex items-center justify-center border-2 border-orange-500">
              <FaGraduationCap className="text-orange-500 text-lg" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-sm">Jadhavar Group of Institutes</p>
              <p className="text-xs text-gray-500">Documentary Client</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section - Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-orange-50 to-white border border-orange-200 rounded-2xl p-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4">
            <FaFilm className="text-orange-500" />
            <span className="text-sm font-semibold">Let's Create Your Documentary</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Ready to Tell Your Story?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm">
            Contact us to discuss your documentary or film project. Our team at Unseen Studios is ready to bring your vision to life with professional documentary filmmaking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-orange-200"
            >
              Contact Us Today
              <FaArrowRight className="text-sm" />
            </Link>
            <a
              href={`https://youtu.be/${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full font-semibold transition"
            >
              <FaYoutube />
              View Sample
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default Film;
