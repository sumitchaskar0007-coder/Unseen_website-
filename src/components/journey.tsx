import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const journeySteps = [
  {
    step: "STEP 01",
    title: "DISCOVER",
    desc: "We start by understanding your brand, goals, and audience to create the perfect strategy.",
  },
  {
    step: "STEP 02",
    title: "STRATEGIZE",
    desc: "We craft a powerful marketing roadmap focused on growth, engagement, and conversions.",
  },
  {
    step: "STEP 03",
    title: "CREATE",
    desc: "Our creative team designs stunning visuals, videos, and campaigns that attract attention.",
  },
  {
    step: "STEP 04",
    title: "LAUNCH",
    desc: "We launch and optimize your campaign across platforms for maximum performance.",
  },
];

const Journey = () => {
  return (
    <section className="w-full min-h-screen bg-[#f5f5f5] py-24 px-6 md:px-16 overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <p className="text-[#6c63ff] text-sm tracking-[4px] uppercase font-semibold mb-3">
          The Working Process
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold text-[#0f172a] uppercase">
          From Strategy To Success
        </h1>

        <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
          Here’s how we turn ideas into impactful marketing campaigns.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Left Animation */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-center lg:justify-start"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="w-56 h-56 rounded-[40px] bg-gradient-to-br from-[#7b7fff] to-[#4f46e5] shadow-[0_25px_80px_rgba(99,102,241,0.45)] flex items-center justify-center">
              <Sparkles size={100} className="text-white" strokeWidth={1.5} />
            </div>

            <div className="absolute inset-0 bg-[#6c63ff]/20 blur-3xl rounded-full"></div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="lg:col-span-2 relative">
          {/* Vertical Line */}
          <div className="absolute left-[18px] top-0 w-[2px] h-full bg-gray-300"></div>

          <div className="space-y-24">
            {journeySteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative flex gap-10"
              >
                {/* Dot */}
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full border-4 border-[#6c63ff] bg-white flex items-center justify-center shadow-md">
                    <div className="w-3 h-3 rounded-full bg-[#6c63ff]"></div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className="text-[#6c63ff] text-sm font-bold tracking-[3px] uppercase mb-2">
                    {item.step}
                  </p>

                  <h2 className="text-3xl font-extrabold text-[#0f172a] uppercase mb-4">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 leading-relaxed max-w-xl text-lg">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;