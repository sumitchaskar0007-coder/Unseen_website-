// frontend/src/pages/Website.tsx
import React, { useState } from 'react';
import { 
  FaExternalLinkAlt, 
  FaGraduationCap, 
  FaUniversity, 
  FaSchool, 
  FaBuilding, 
  FaGlobe,
  FaSearch,
  FaFilter,
  FaTimes,
  FaArrowRight,
  FaCrown,
  FaAward,
  FaUsers,
  FaHandsHelping,
  FaLaptopCode,
  FaHeartbeat,
  FaGavel
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Website: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const websites = [
    {
      id: 1,
      name: "Jadhavar Paramedical College",
      url: "https://www.jadhavarparamedicalcollege.com",
      category: "College",
      type: "paramedical",
      icon: <FaHeartbeat className="text-orange-500" />,
      description: "Premier paramedical education institution offering healthcare and medical training programs.",
      features: ["Paramedical Courses", "Healthcare Training", "Clinical Practice"],
      color: "from-orange-500 to-red-500"
    },
    {
      id: 2,
      name: "Jadhavar Senior College",
      url: "https://jadhavarseniorcollege.com",
      category: "College",
      type: "senior",
      icon: <FaUniversity className="text-orange-500" />,
      description: "Senior college providing quality higher education with diverse academic programs.",
      features: ["Higher Education", "Arts & Science", "Commerce"],
      color: "from-orange-500 to-yellow-500"
    },
    {
      id: 3,
      name: "Jadhavar International School",
      url: "https://jadhavarinternationalschool.com",
      category: "School",
      type: "international",
      icon: <FaGlobe className="text-orange-500" />,
      description: "International school offering world-class education with modern facilities and global curriculum.",
      features: ["International Curriculum", "Modern Facilities", "Holistic Development"],
      color: "from-orange-500 to-blue-500"
    },
    {
      id: 4,
      name: "Dr. Sudhakarrao Jadhavar School",
      url: "https://jadhavarsemienglish.in",
      category: "School",
      type: "primary",
      icon: <FaSchool className="text-orange-500" />,
      description: "Primary and secondary school with CBSE & State Board curriculum, established in 2009.",
      features: ["CBSE & State Board", "Holistic Education", "15+ Years Excellence"],
      color: "from-orange-500 to-green-500"
    },
    {
      id: 5,
      name: "Jadhavar College of Law",
      url: "https://jadhavarcollegeoflaw.com",
      category: "College",
      type: "law",
      icon: <FaGavel className="text-orange-500" />,
      description: "Premier law college offering 3-Year LL.B program with BCI approval and modern infrastructure.",
      features: ["3-Year LL.B", "BCI Approved", "Moot Court Practice"],
      color: "from-orange-500 to-purple-500"
    },
    {
      id: 6,
      name: "Shardulrao Jadhavar Law College",
      url: "https://www.shardulraojadhavarcollegeoflaw.com",
      category: "College",
      type: "law",
      icon: <FaGavel className="text-orange-500" />,
      description: "NAAC A+ Accredited law college offering 5-Year Integrated LL.B program.",
      features: ["5-Year Integrated LL.B", "NAAC A+", "BCI Approved"],
      color: "from-orange-500 to-indigo-500"
    },
    {
      id: 7,
      name: "Jadhavar Junior College",
      url: "https://jadhavarjrcollege.com",
      category: "College",
      type: "junior",
      icon: <FaGraduationCap className="text-orange-500" />,
      description: "Premier junior college offering Arts, Commerce & Science streams with 98% pass rate.",
      features: ["Arts, Commerce & Science", "98% Pass Rate", "25+ Years Experience"],
      color: "from-orange-500 to-teal-500"
    },
    {
      id: 8,
      name: "Paradise English Medium School",
      url: "https://paradiseems.co.in",
      category: "School",
      type: "english-medium",
      icon: <FaBuilding className="text-orange-500" />,
      description: "English medium school dedicated to academic excellence and holistic student development.",
      features: ["English Medium", "Academic Excellence", "Student Development"],
      color: "from-orange-500 to-pink-500"
    },
    {
      id: 9,
      name: "MILES - Mandke Skills",
      url: "https://mandkeskills.com",
      category: "Training",
      type: "skills",
      icon: <FaLaptopCode className="text-orange-500" />,
      description: "Industry-aligned certification programs in Finance, Technology, AI, Cyber Security & Business Skills.",
      features: ["250+ Students Trained", "10+ Hiring Partners", "Industry-Relevant Courses"],
      color: "from-orange-500 to-cyan-500"
    },
    {
      id: 10,
      name: "Dr. Jadhavar Physiotherapy",
      url: "https://drjadhavarphysiotherapy.com",
      category: "Healthcare",
      type: "physiotherapy",
      icon: <FaHeartbeat className="text-orange-500" />,
      description: "Advanced physiotherapy and rehabilitation center for sports injury, pain relief, and recovery.",
      features: ["Advanced Physiotherapy", "Sports Injury Care", "Pain Relief & Recovery"],
      color: "from-orange-500 to-rose-500"
    },
    {
      id: 11,
      name: "Mandke College",
      url: "http://mandkecollege.com",
      category: "College",
      type: "mandke",
      icon: <FaUniversity className="text-orange-500" />,
      description: "College providing quality education with diverse academic programs and modern facilities.",
      features: ["Quality Education", "Modern Facilities", "Diverse Programs"],
      color: "from-orange-500 to-amber-500"
    }
  ];

  const categories = ['All', 'School', 'College', 'Training', 'Healthcare'];

  const filteredWebsites = websites.filter(website => {
    const matchesSearch = website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          website.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || website.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
                  <FaGlobe className="text-5xl text-orange-500" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
              Our <span className="text-orange-500">Institutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our network of educational institutions and service centers dedicated to excellence in education, healthcare, and professional development
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <div className="inline-flex items-center gap-4 bg-black/5 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-200">
                <FaBuilding className="text-orange-500" />
                <span className="text-gray-700 font-medium">11 Institutions</span>
                <span className="w-px h-6 bg-gray-300"></span>
                <FaUsers className="text-orange-500" />
                <span className="text-gray-700 font-medium">10,000+ Students</span>
                <span className="w-px h-6 bg-gray-300"></span>
                <FaAward className="text-orange-500" />
                <span className="text-gray-700 font-medium">15+ Years</span>
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
            { icon: FaSchool, label: "Schools", value: "3", color: "from-orange-500 to-orange-600" },
            { icon: FaUniversity, label: "Colleges", value: "5", color: "from-orange-400 to-orange-500" },
            { icon: FaHandsHelping, label: "Training Centers", value: "2", color: "from-orange-600 to-orange-700" },
            { icon: FaHeartbeat, label: "Healthcare", value: "1", color: "from-orange-500 to-orange-600" }
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

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg"
        >
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search institutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <FaFilter className="text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterCategory === category
                      ? 'bg-black text-white border-2 border-orange-500'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Websites Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence>
          {filteredWebsites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-2xl p-12 border-2 border-gray-200">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Results Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredWebsites.map((website) => (
                <motion.div
                  key={website.id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-orange-500 transition-all hover:shadow-2xl hover:shadow-orange-100"
                >
                  <div className={`bg-gradient-to-br ${website.color} p-6 relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-center justify-between">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                        <div className="text-4xl text-white">{website.icon}</div>
                      </div>
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {website.category}
                      </span>
                    </div>
                    <h3 className="relative text-xl font-bold text-white mt-4 line-clamp-1">
                      {website.name}
                    </h3>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {website.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {website.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full border border-orange-200 font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-black hover:bg-orange-500 px-4 py-2 rounded-full text-sm font-medium transition hover:shadow-lg hover:shadow-orange-200 border border-orange-500 w-full justify-center group"
                    >
                      Visit Website
                      <FaExternalLinkAlt className="text-xs text-orange-400 group-hover:text-white" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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
              <FaCrown className="text-3xl text-orange-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
              Join Our Educational Network
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Explore opportunities at our institutions and become part of a legacy of academic excellence and professional growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.youtube.com/@unseenmarathi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black hover:bg-orange-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-200 border-2 border-orange-500"
              >
                <FaGraduationCap className="text-orange-500 group-hover:text-white" />
                Explore Opportunities
                <FaArrowRight className="text-sm text-orange-400 group-hover:text-white" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Website;
