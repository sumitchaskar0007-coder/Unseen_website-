// frontend/src/pages/Podcast.tsx
import React from 'react';
import { FaPlay, FaYoutube, FaPodcast, FaHeadphones, FaMicrophone, FaMusic, FaUsers, FaArrowRight, FaClock, FaEye, FaThumbsUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Podcast: React.FC = () => {
  const episodes = [
    {
      id: 1,
      title: "ऑनलाईन गेमिंग आणि आजची तरुणाई",
      englishTitle: "Online Gaming Vs Students",
      guest: "Dinesh Tathe",
      date: "May 14, 2025",
      views: "6,170",
      likes: 134,
      videoId: "iP-KveyaLhY",
      description: "A deep dive into the impact of online gaming on today's youth and students. Dinesh Tathe shares his insights on balancing digital entertainment with academic and personal growth.",
      tags: ["Online Gaming", "Students", "Digital Wellbeing"],
      duration: "45:32"
    },
    {
      id: 2,
      title: "Episode 2 Title",
      englishTitle: "English Title for Episode 2",
      guest: "Guest Name",
      date: "May 21, 2025",
      views: "4,200",
      likes: 98,
      videoId: "KQnDttJ_GFE",
      description: "This episode features a compelling conversation about the evolving media landscape and its influence on Marathi culture and society.",
      tags: ["Marathi Culture", "Media", "Society"],
      duration: "52:18"
    },
    {
      id: 3,
      title: "Episode 3 Title",
      englishTitle: "English Title for Episode 3",
      guest: "Guest Name",
      date: "May 28, 2025",
      views: "3,800",
      likes: 112,
      videoId: "G2oLfbie6LA",
      description: "Join us as we discuss the creative process and the importance of storytelling in the modern world. An inspiring session for creators and enthusiasts.",
      tags: ["Creativity", "Storytelling", "Inspiration"],
      duration: "38:45"
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-black rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full filter blur-2xl opacity-40"></div>
                <div className="relative bg-black p-4 rounded-full shadow-2xl border-4 border-orange-500">
                  <FaPodcast className="text-5xl text-orange-500" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
              Unseen Marathi <span className="text-orange-500">Podcast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
              Exploring stories that matter, conversations that inspire
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://www.youtube.com/@unseenmarathi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 border-2 border-orange-500"
              >
                <FaYoutube className="text-xl text-orange-500" />
                Subscribe on YouTube
                <FaArrowRight className="text-sm text-orange-500" />
              </a>
              <div className="flex items-center gap-4">
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUsers className="text-orange-500" />
                  <span>10.6K Subscribers</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: FaHeadphones, label: "Episodes", value: "12+", color: "from-orange-500 to-orange-600" },
            { icon: FaMicrophone, label: "Guests", value: "8+", color: "from-orange-400 to-orange-500" },
            { icon: FaUsers, label: "Total Views", value: "50K+", color: "from-orange-600 to-orange-700" },
            { icon: FaMusic, label: "Duration", value: "40+ hrs", color: "from-orange-500 to-orange-600" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center border-2 border-gray-200 hover:border-orange-500 transition-all hover:shadow-xl hover:shadow-orange-100 group">
              <div className={`bg-gradient-to-br ${stat.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className="text-2xl text-white" />
              </div>
              <div className="text-2xl font-bold text-black">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Episodes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Latest Episodes</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-black mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {episodes.map((episode) => (
            <motion.div
              key={episode.id}
              variants={itemVariants}
              className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-orange-500 transition-all hover:shadow-2xl hover:shadow-orange-100"
            >
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${episode.videoId}/maxresdefault.jpg`}
                  alt={episode.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href={`https://youtu.be/${episode.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-20 bg-black rounded-full flex items-center justify-center hover:bg-orange-500 transition transform hover:scale-110 shadow-2xl group-hover:shadow-orange-500/50 border-2 border-orange-500"
                  >
                    <FaPlay className="text-white text-2xl ml-1" />
                  </a>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1">
                    <FaClock className="text-orange-400" />
                    {episode.duration}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="bg-orange-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-semibold">
                      <FaYoutube className="inline mr-1" />
                      YouTube
                    </span>
                    <span className="text-gray-300 flex items-center gap-1">
                      <FaEye className="text-orange-400" />
                      {episode.views} views
                    </span>
                    <span className="text-gray-300 flex items-center gap-1">
                      <FaThumbsUp className="text-orange-400" />
                      {episode.likes} likes
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs text-orange-500 font-bold uppercase tracking-wider">Episode {episode.id}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-400">{episode.date}</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-1 group-hover:text-orange-500 transition">
                  {episode.title}
                </h3>
                <p className="text-sm text-orange-500 mb-3 font-medium">with {episode.guest}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {episode.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {episode.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full border border-orange-200 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                <a
                  href={`https://youtu.be/${episode.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white bg-black hover:bg-orange-500 px-4 py-2 rounded-full text-sm font-medium transition hover:shadow-lg hover:shadow-orange-200 border border-orange-500"
                >
                  Watch Episode
                  <FaArrowRight className="text-xs text-orange-400 group-hover:text-white" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-orange-50 to-white border-2 border-orange-200 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent"></div>
          <div className="relative">
            <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-orange-500">
              <FaPodcast className="text-3xl text-orange-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
              Never Miss an Episode
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Subscribe to the Unseen Marathi Podcast on YouTube for thought-provoking conversations and inspiring stories.
            </p>
            <a
              href="https://www.youtube.com/@unseenmarathi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black hover:bg-orange-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-200 border-2 border-orange-500"
            >
              <FaYoutube className="text-xl text-orange-500 group-hover:text-white" />
              Subscribe Now
              <FaArrowRight className="text-sm text-orange-400 group-hover:text-white" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Podcast;