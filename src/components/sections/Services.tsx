import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clapperboard,
  Mic,
  Video,
  Share2,
  Globe,
  Database,
  TrendingUp,
  Search,
  Landmark,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import { cmsService } from "../../services/cmsService";

type ServiceItem = {
  title: string;
  tag: string;
  desc: string;
  features: string[];
  icon: LucideIcon;
};

const services: ServiceItem[] = [
  {
    title: "Documentary Films",
    tag: "Production",
    desc: "Cinematic storytelling with premium editing and creative direction. We capture real stories with artistic vision and professional production quality.",
    features: [
      "4K Cinematography",
      "Professional Editing",
      "Color Grading",
      "Sound Design",
    ],
    icon: Clapperboard,
  },
  {
    title: "Podcast & Jingles",
    tag: "Audio",
    desc: "Professional podcast production and audio branding solutions. From concept to distribution, we handle everything.",
    features: [
      "Studio Recording",
      "Audio Mixing",
      "Jingle Creation",
      "Distribution",
    ],
    icon: Mic,
  },
  {
    title: "Video Ads",
    tag: "Production",
    desc: "Creative ad videos designed for engagement and conversions. Drive results with compelling visual storytelling.",
    features: [
      "Concept Development",
      "Professional Shooting",
      "Post Production",
      "A/B Testing",
    ],
    icon: Video,
  },
  {
    title: "Social Media Marketing",
    tag: "Marketing",
    desc: "Creative social campaigns and audience growth strategies. Build your brand presence across all platforms.",
    features: [
      "Content Strategy",
      "Community Management",
      "Paid Ads",
      "Analytics",
    ],
    icon: Share2,
  },
  {
    title: "Website Development",
    tag: "Technology",
    desc: "Modern websites with premium UI and smooth user experience. Transform your online presence.",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "Fast Loading",
      "CMS Integration",
    ],
    icon: Globe,
  },
  {
    title: "ERP Software",
    tag: "Technology",
    desc: "Custom ERP systems that unify inventory, finance, HR, and operations into one reliable platform built around how your business actually runs.",
    features: [
      "Custom Modules",
      "Inventory & Finance",
      "Role-Based Access",
      "Cloud Deployment",
    ],
    icon: Database,
  },
  {
    title: "Digital Marketing",
    tag: "Marketing",
    desc: "Powerful marketing strategies for business growth. Reach your target audience effectively.",
    features: [
      "Market Research",
      "Campaign Management",
      "ROI Tracking",
      "Growth Hacking",
    ],
    icon: TrendingUp,
  },
  {
    title: "SEO Optimization",
    tag: "Marketing",
    desc: "Improve visibility and rank higher with smart SEO solutions. Drive organic traffic to your website.",
    features: [
      "Keyword Research",
      "On-page SEO",
      "Link Building",
      "Performance Tracking",
    ],
    icon: Search,
  },
  {
    title: "Political Campaigns",
    tag: "Strategy",
    desc: "Professional campaign management and digital outreach. Connect with voters effectively.",
    features: [
      "Voter Targeting",
      "Social Media Campaigns",
      "Message Strategy",
      "Analytics",
    ],
    icon: Landmark,
  },
  {
    title: "Bulk SMS Marketing",
    tag: "Marketing",
    desc: "Reach thousands instantly with targeted SMS campaigns. High engagement rates with direct communication.",
    features: [
      "Mass Messaging",
      "Scheduled Campaigns",
      "2-Way Communication",
      "Delivery Reports",
    ],
    icon: MessageSquare,
  },
];

type ServicesProps = {
  limit?: number;
  showHeader?: boolean;
  showViewMore?: boolean;
  /** "sidebar" = compact interactive teaser (homepage). "grid" = full card grid (services page).
   *  Defaults to "grid" when showing the full, un-limited list. */
  variant?: "sidebar" | "grid";
};

export function Services({
  limit,
  showHeader = true,
  showViewMore = false,
  variant,
}: ServicesProps) {
  const [, setContentRevision] = useState(0);

  useEffect(() => {
    let active = true;
    cmsService.sync("services").catch(() => []).finally(() => {
      if (active) setContentRevision((revision) => revision + 1);
    });
    return () => { active = false; };
  }, []);

  const cmsServices: ServiceItem[] = cmsService.published("services")
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
    .map((item) => ({
      title: String(item.name || "Creative Service"),
      tag: String(item.category || "Service"),
      desc: String(item.description || item.shortDescription || "A tailored Unseen Studios service."),
      features: String(item.features || item.services || "Strategy,Creative direction,Execution")
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
      icon: Sparkles,
    }));
  const allServices = [
    ...cmsServices,
    ...services.filter((service) => !cmsServices.some((item) => item.title.toLowerCase() === service.title.toLowerCase())),
  ];
  const visibleServices =
    typeof limit === "number" ? allServices.slice(0, limit) : allServices;

  const resolvedVariant: "sidebar" | "grid" =
    variant ?? (!limit && !showViewMore ? "grid" : "sidebar");

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24"
    >
      {/* Soft Background Glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-orange-100 blur-[70px] sm:h-64 sm:w-64 sm:blur-[100px] lg:h-96 lg:w-96 lg:blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-orange-200/60 blur-[70px] sm:h-64 sm:w-64 sm:blur-[100px] lg:h-96 lg:w-96 lg:blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-16"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-orange-500 sm:mb-3 sm:tracking-[5px]">
              Our Services
            </p>

            <h2 className="text-[26px] font-bold leading-tight tracking-tight text-gray-900 xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Creative Digital Solutions
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 sm:mt-5 sm:text-base md:mt-6 md:text-lg">
              A single team for production, marketing, and technology.
            </p>
          </motion.div>
        )}

        {resolvedVariant === "grid" ? (
          <ServicesGrid visibleServices={visibleServices} />
        ) : (
          <ServicesSidebar visibleServices={visibleServices} />
        )}

        {showViewMore && (
          <div className="mt-8 flex justify-center sm:mt-10 md:mt-12">
            <Link
              to="/services"
              className="inline-flex items-center rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:bg-orange-700 sm:px-6 sm:py-3 sm:text-base"
            >
              View More Services
              <span className="ml-2">→</span>
            </Link>
          </div>
        )}

        {/* Additional Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-orange-50 to-orange-100/50 p-6 text-center sm:mt-14 sm:rounded-3xl sm:p-8 md:mt-16"
        >
          <h3 className="mb-2 text-lg font-bold text-gray-900 sm:mb-3 sm:text-2xl">
            Ready to Transform Your Digital Presence?
          </h3>

          <p className="mx-auto max-w-2xl px-2 text-sm text-gray-600 sm:text-base">
            Let's discuss how our services can help you achieve your business
            goals. Pick a service above and get in touch.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Full card grid — used on the standalone /services page                  */
/* ----------------------------------------------------------------------- */

function ServicesGrid({
  visibleServices,
}: {
  visibleServices: typeof services;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {visibleServices.map((service, index) => {
        const Icon = service.icon;

        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: (index % 6) * 0.06,
            }}
            className="group relative flex flex-col overflow-hidden rounded-[22px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl sm:rounded-[26px] sm:p-7"
          >
            {/* Hover accent glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />

            <div className="relative flex items-start justify-between gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-sm shadow-orange-500/30 sm:h-14 sm:w-14">
                <Icon
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  strokeWidth={1.85}
                />
              </span>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-600 sm:text-xs">
                {service.tag}
              </span>
            </div>

            <h3 className="relative mt-5 text-lg font-bold leading-snug text-gray-900 sm:mt-6 sm:text-xl">
              {service.title}
            </h3>

            <p className="relative mt-2.5 text-sm leading-relaxed text-gray-500 sm:text-[15px]">
              {service.desc}
            </p>

            {/* Features with Check Icons */}
            <div className="relative mt-5 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
              {service.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600 ring-1 ring-inset ring-gray-100 sm:px-3 sm:text-xs"
                >
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-orange-500"
                    strokeWidth={2.5}
                  />
                  {feature}
                </span>
              ))}
            </div>

            <div className="relative mt-6 flex-1" />

            <Link
              to="/contact"
              className="relative mt-5 inline-flex min-h-10 w-fit items-center gap-1.5 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700 sm:text-[15px]"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Compact sidebar + detail view — used on the homepage teaser             */
/* ----------------------------------------------------------------------- */

function ServicesSidebar({
  visibleServices,
}: {
  visibleServices: typeof services;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const active = visibleServices[activeIndex];
  const serviceCount = visibleServices.length;

  const goTo = (index: number) =>
    setActiveIndex((index + serviceCount) % serviceCount);

  const nextService = () => goTo(activeIndex + 1);
  const prevService = () => goTo(activeIndex - 1);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.targetTouches[0].clientX);

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      (diff > 0 ? nextService : prevService)();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextService();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      prevService();
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]">
      {/* Service selector */}
      <div
        role="tablist"
        aria-label="Our services"
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-1 lg:gap-2 lg:rounded-[28px] lg:border lg:border-orange-100 lg:bg-gradient-to-b lg:from-orange-50/60 lg:to-white lg:p-3 lg:shadow-sm lg:max-h-[560px] lg:overflow-y-auto"
      >
        {visibleServices.map((service, index) => {
          const isActive = index === activeIndex;
          const Icon = service.icon;

          return (
            <button
              key={service.title}
              role="tab"
              aria-selected={isActive}
              onClick={() => goTo(index)}
              className={`group relative flex min-h-[92px] flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:min-h-[104px] sm:gap-2.5 sm:px-3 lg:min-h-0 lg:flex-row lg:justify-start lg:gap-4 lg:rounded-2xl lg:border-0 lg:px-4 lg:py-4 lg:text-left ${
                isActive
                  ? "border-orange-200 bg-white shadow-md lg:shadow-md"
                  : "border-orange-100/80 bg-orange-50/40 hover:border-orange-200 hover:bg-orange-50 lg:border-0 lg:bg-transparent lg:hover:bg-orange-50/80"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="service-active-bar"
                  className="absolute inset-x-3 top-1 hidden h-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 lg:inset-y-2 lg:inset-x-auto lg:left-0 lg:top-auto lg:block lg:h-auto lg:w-1 lg:bg-gradient-to-b"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                  }}
                />
              )}

              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-11 sm:w-11 lg:h-12 lg:w-12 ${
                  isActive
                    ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                    : "bg-orange-100 text-orange-600 group-hover:bg-orange-200"
                }`}
              >
                <Icon
                  className="h-5 w-5 sm:h-5.5 sm:w-5.5 lg:h-6 lg:w-6"
                  strokeWidth={2}
                />
              </span>

              <div className="min-w-0">
                <p
                  className={`line-clamp-2 text-[13px] font-semibold leading-tight sm:text-sm lg:truncate lg:text-base ${
                    isActive ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {service.title}
                </p>

                <p className="mt-0.5 hidden text-xs text-gray-400 sm:block lg:mt-0">
                  {service.tag}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="tabpanel"
        aria-label={`${active.title} details`}
        className="relative min-h-[380px] overflow-hidden rounded-[24px] bg-gradient-to-br from-orange-500 to-orange-700 p-[1px] shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:min-h-[400px] sm:rounded-[28px] md:min-h-[420px] lg:min-h-[480px]"
      >
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[23px] bg-gradient-to-br from-orange-500 to-orange-700 p-5 sm:rounded-[27px] sm:p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex h-full flex-col justify-between"
            >
              <div className="min-w-0">
                <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm sm:h-14 sm:w-14 sm:rounded-2xl md:h-16 md:w-16">
                    <active.icon
                      className="h-6 w-6 text-white sm:h-7 sm:w-7 md:h-8 md:w-8"
                      strokeWidth={1.75}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[2px] text-orange-100 sm:text-xs sm:tracking-[3px]">
                      {active.tag}
                    </p>

                    <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
                      {active.title}
                    </h3>
                  </div>
                </div>

                <p className="max-w-2xl text-sm leading-relaxed text-orange-50 sm:text-base">
                  {active.desc}
                </p>

                <div className="mt-6 sm:mt-8">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[2px] text-white/70 sm:mb-3 sm:text-xs sm:tracking-[3px]">
                    What's included
                  </p>

                  {/* Active Features with Check Icons */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {active.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm"
                      >
                        <Check
                          className="h-3.5 w-3.5 shrink-0 text-white"
                          strokeWidth={2.5}
                        />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 sm:mt-10">
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-orange-600 transition-all hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-600 sm:px-6 sm:text-base"
                >
                  Get a Quote →
                </Link>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {visibleServices.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goTo(index)}
                        aria-label={`Go to service ${index + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeIndex === index
                            ? "w-6 bg-white"
                            : "w-2 bg-white/40 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs text-orange-100 sm:text-sm">
                    {activeIndex + 1}/{serviceCount}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
