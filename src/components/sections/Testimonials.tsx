import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Rahul Patil",
    role: "Business Owner",
    service: "Website Development",
    review:
      "Their website design completely transformed our online presence. We started getting more customer inquiries within weeks.",
  },
  {
    id: 2,
    name: "Sneha Kulkarni",
    role: "Marketing Manager",
    service: "Social Media Marketing",
    review:
      "Creative campaigns and amazing content strategy helped our brand grow rapidly on Instagram and Facebook.",
  },
  {
    id: 3,
    name: "Amit Deshmukh",
    role: "Political Leader",
    service: "Political Campaigns",
    review:
      "Professional campaign management and digital outreach delivered excellent public engagement.",
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Startup Founder",
    service: "SEO Optimization",
    review:
      "Our website ranking improved significantly and traffic increased organically after SEO optimization.",
  },
  {
    id: 5,
    name: "Karan Jadhav",
    role: "Hotel Owner",
    service: "Digital Marketing",
    review:
      "Their digital marketing strategies boosted our bookings and helped us reach more customers online.",
  },
  {
    id: 6,
    name: "Meera Joshi",
    role: "Content Creator",
    service: "Podcast & Jingles",
    review:
      "The podcast production quality and audio jingles were creative, professional, and engaging.",
  },
  {
    id: 7,
    name: "Vikas More",
    role: "Brand Manager",
    service: "Video Ads",
    review:
      "Their video advertisements were cinematic and highly engaging. Perfect for our product launch campaign.",
  },
  {
    id: 8,
    name: "Anjali Patne",
    role: "Media Agency",
    service: "Documentary Films",
    review:
      "Exceptional storytelling and cinematic visuals made our documentary project look premium and impactful.",
  },
  {
    id: 9,
    name: "Rohit Pawar",
    role: "Retail Business",
    service: "Bulk SMS Marketing",
    review:
      "Bulk SMS campaigns helped us reach thousands of customers instantly and increased our sales dramatically.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-orange-100 rounded-full text-orange-600 text-sm font-semibold mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Our <span className="text-orange-600">Clients Say</span>
          </h2>
          <div className="w-16 h-0.5 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-base mt-4">
            Trusted by 500+ businesses worldwide
          </p>
        </div>

        {/* Testimonial Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-orange-200 text-3xl mx-auto mb-6" />

                  {/* Review Text */}
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
                    "{currentTestimonial.review}"
                  </p>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900">
                    {currentTestimonial.name}
                  </h3>

                  {/* Role */}
                  <p className="text-orange-600 text-sm font-medium">
                    {currentTestimonial.role}
                  </p>

                  {/* Service Tag */}
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                    {currentTestimonial.service}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 group"
            aria-label="Previous"
          >
            <FaChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-white" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 group"
            aria-label="Next"
          >
            <FaChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-orange-600"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        {/* <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;