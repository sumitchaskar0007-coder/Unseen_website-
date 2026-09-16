import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import {
  FaFilm,
  FaPodcast,
  FaVideo,
  FaBullhorn,
  FaGlobe,
  FaSearch,
  FaSms,
} from "react-icons/fa";

const services = [
  {
    title: "Documentary Films",
    icon: <FaFilm />,
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Podcast & Jingles",
    icon: <FaPodcast />,
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Video Ads",
    icon: <FaVideo />,
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Social Media Marketing",
    icon: <FaBullhorn />,
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Website Development",
    icon: <FaGlobe />,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Digital Marketing",
    icon: <FaBullhorn />,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "SEO Optimization",
    icon: <FaSearch />,
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Political Campaigns",
    icon: <FaBullhorn />,
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Bulk SMS Marketing",
    icon: <FaSms />,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
];

const Whyunseen = () => {
  return (
    <div className="bg-white text-black overflow-hidden">
      {/* IMPORT FONT */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');

          .cinematic-font {
            font-family: 'Cinzel', serif;
          }

          .body-font {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-20 py-20 overflow-hidden">
        {/* Background Image */}
       {/* Background Image */}
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: "url('assets/images/w33.png')",
  }}
></div>

        {/* Overlay */}

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="uppercase tracking-[10px] text-orange-500 font-semibold mb-5 body-font">
              Unseen Studio
            </p>

            <h1 className="cinematic-font text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8 text-black">
              Crafting
              <span className="text-white"> Cinematic</span>
              <br />
              Digital Stories
            </h1>

            <p className="text-gray-700 text-lg leading-9 body-font max-w-2xl mb-10">
              We create powerful visual experiences through films, branding,
              digital marketing, websites, and storytelling that emotionally
              connect with your audience.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="bg-black text-white px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-xl">
                Explore Services
              </button>

              <button className="border border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                View Portfolio
              </button>
            </div>
          </motion.div>

          {/* RIGHT VIDEO */}
        <motion.div
  initial={{ opacity: 0, x: 80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="relative"
>
  {/* Glow Effect */}
  <div className="absolute -inset-4 rounded-[40px] bg-orange-200 opacity-40 blur-3xl"></div>

  {/* Image Container */}
  <div className="relative overflow-hidden rounded-[40px] border border-gray-200 shadow-2xl">
    
    {/* Main Image */}
    <img
      src="assets/images/podcast.png"
      alt="Creative Studio"
      className="h-[550px] w-full object-cover transition-transform duration-700 hover:scale-105"
    />

    {/* Cinematic Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

    {/* Floating Badge */}
    <div className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-white/20 px-5 py-3 backdrop-blur-md">
      <p className="text-sm font-semibold uppercase tracking-[3px] text-white">
        Cinematic Creativity
      </p>
    </div>
  </div>
</motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 px-6 lg:px-20 bg-[#fafafa]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[8px] text-orange-500 body-font mb-5">
            Premium Services
          </p>

          <h2 className="cinematic-font text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
            What We Create
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-8 body-font">
            Every project is designed with creativity, emotion, strategy, and
            cinematic aesthetics to make your brand unforgettable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* IMAGE */}
              <div className="h-72 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-5 left-5 text-white text-4xl">
                  {service.icon}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <h3 className="cinematic-font text-3xl font-semibold mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-8 body-font">
                  Innovative and cinematic solutions that elevate your digital
                  presence with elegance and creativity.
                </p>

               
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-28 px-6 lg:px-20 bg-white">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-5 bg-orange-100 rounded-[40px] blur-3xl opacity-60"></div>

            <img
              src="assets/images/meeting.png"
              alt="team"
              className="relative rounded-[40px] shadow-2xl"
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="uppercase tracking-[8px] text-orange-500 body-font mb-5">
              Why Unseen Studio
            </p>

            <h2 className="cinematic-font text-3xl sm:text-5xl lg:text-6xl leading-tight font-bold mb-10">
              We Turn Ideas Into
              <span className="text-orange-500"> Visual Masterpieces</span>
            </h2>

            <div className="space-y-7 text-gray-700 body-font text-lg leading-9">
              <p>
                ✨ Premium cinematic storytelling for brands and businesses.
              </p>

              <p>
                🎬 Creative video production with emotional visual direction.
              </p>

              <p>
                🚀 Digital marketing strategies focused on real growth.
              </p>

              <p>
                🌐 Elegant and modern website experiences.
              </p>

              <p>
                📈 SEO and branding solutions that build visibility.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="assets/images/w4.png"
            alt="office"
            className="w-full h-full object-cover"
          />

        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <p className="uppercase tracking-[8px] text-black body-font mb-5">
            Let’s Create Together
          </p>

          <h2 className="cinematic-font text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Your Brand Deserves
            <span className="text-white"> A Cinematic Presence</span>
          </h2>

          <p className="text-white text-lg leading-9 body-font mb-10">
            From creative storytelling to strategic marketing, Unseen Studio
            helps brands stand out beautifully in the digital world.
          </p>

         <Link to="/contact">
  <button className="bg-black text-white px-10 py-5 rounded-full hover:bg-orange-500 transition duration-300 shadow-2xl text-lg font-semibold">
    Start Your Journey
  </button>
</Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Whyunseen;
