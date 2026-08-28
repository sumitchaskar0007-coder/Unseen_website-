import React from "react";
import {
  Code2,
  Braces,
  Layers,
  Server,
  Database,
  ShoppingCart,
  Palette,
  Terminal,
  GitBranch,
  MonitorSmartphone,
  ShieldCheck,
  Rocket,
  Globe,
  PenTool,
  Puzzle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface TechTag {
  label: string;
}

interface IconPanelProps {
  mainIcon: React.ElementType;
  satelliteIcons: React.ElementType[];
  reversed?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

interface SectionBlockProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  tags: TechTag[];
  mainIcon: React.ElementType;
  satelliteIcons: React.ElementType[];
  imageOnLeft?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

/* ------------------------------------------------------------------ */
/*  Decorative icon panel (stands in for a photograph)                */
/* ------------------------------------------------------------------ */

const IconPanel: React.FC<IconPanelProps> = ({
  mainIcon: MainIcon,
  satelliteIcons,
  imageSrc,
  imageAlt,
}) => {
  if (imageSrc) {
    return (
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-900">
        <img
          src={imageSrc}
          alt={imageAlt ?? "Website development illustration"}
          className="w-full h-full object-cover"
        />
        {/* orange corner accent to keep the palette consistent */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-orange-500" />
        <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg">
          <MainIcon className="w-4.5 h-4.5 text-white" strokeWidth={1.75} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl bg-neutral-900 overflow-hidden border border-neutral-900">
      {/* base grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* orange glow */}
      <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-orange-500 blur-3xl opacity-30" />
      <div className="absolute -bottom-14 -left-14 w-56 h-56 rounded-full bg-orange-600 blur-3xl opacity-20" />

      {/* central icon plate */}
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-orange-500 flex items-center justify-center shadow-xl">
          <MainIcon className="w-14 h-14 sm:w-16 sm:h-16 text-white" strokeWidth={1.5} />
        </div>

        {/* satellite icons */}
        {satelliteIcons.map((Icon, i) => {
          const positions = [
            "top-6 left-6",
            "top-8 right-8",
            "bottom-8 left-10",
            "bottom-6 right-6",
          ];
          return (
            <div
              key={i}
              className={`absolute ${positions[i % positions.length]} w-11 h-11 rounded-xl bg-white/95 flex items-center justify-center border border-white`}
            >
              <Icon className="w-5 h-5 text-neutral-900" strokeWidth={1.75} />
            </div>
          );
        })}
      </div>

      {/* thin orange corner accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-orange-500" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Tag pill                                                          */
/* ------------------------------------------------------------------ */

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full border border-orange-500/40 bg-orange-50 text-orange-700 text-xs font-medium tracking-wide">
    {label}
  </span>
);

/* ------------------------------------------------------------------ */
/*  Section block — alternates image left/right                      */
/* ------------------------------------------------------------------ */

const SectionBlock: React.FC<SectionBlockProps> = ({
  eyebrow,
  title,
  description,
  bullets,
  tags,
  mainIcon,
  satelliteIcons,
  imageOnLeft = false,
  imageSrc,
  imageAlt,
}) => {
  const InfoColumn = (
    <div className="flex flex-col justify-center">
      <span className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
        {eyebrow}
      </span>
      <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
        {title}
      </h3>
      <p className="text-neutral-700 text-base leading-relaxed mb-6">
        {description}
      </p>
      <ul className="space-y-3 mb-6">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" strokeWidth={1.75} />
            <span className="text-neutral-800 text-sm leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {tags.map((t, i) => (
          <Tag key={i} label={t.label} />
        ))}
      </div>
    </div>
  );

  const ImageColumn = (
    <IconPanel
      mainIcon={mainIcon}
      satelliteIcons={satelliteIcons}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
    />
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center py-14 border-b border-neutral-200">
      {imageOnLeft ? (
        <>
          <div className="order-2 md:order-1">{ImageColumn}</div>
          <div className="order-1 md:order-2">{InfoColumn}</div>
        </>
      ) : (
        <>
          <div className="order-2 md:order-1">{InfoColumn}</div>
          <div className="order-2 md:order-2">{ImageColumn}</div>
        </>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

const WebDev: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ---------------------------------------------------------- */}
      {/* Top bar                                                     */}
      {/* ---------------------------------------------------------- */}
      <header className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-orange-500" strokeWidth={2} />
          </div>
          <span className="text-neutral-900 font-bold tracking-tight text-lg">
            Unseen Studios
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-neutral-700">
          <a href="#services" className="hover:text-orange-600 transition-colors">Services</a>
          <a href="#stack" className="hover:text-orange-600 transition-colors">Tech Stack</a>
          <a href="#wordpress" className="hover:text-orange-600 transition-colors">WordPress</a>
          <a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          Get a Quote
          <ArrowRight className="w-4 h-4" />
        </a>
      </header>

      {/* ---------------------------------------------------------- */}
      {/* Hero — info left / image right                              */}
      {/* ---------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 pt-10 sm:pt-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span className="text-orange-700 text-xs font-semibold tracking-wide uppercase">
                Website Development
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-neutral-900 leading-[1.08] mb-6">
              We build websites in every
              <span className="text-orange-500"> language, framework</span> and
              platform.
            </h1>
            <p className="text-neutral-700 text-lg leading-relaxed mb-8 max-w-xl">
              Unseen Studios designs and develops custom websites end to end —
              from hand-coded HTML and modern JavaScript frameworks to
              full-stack applications and WordPress builds. One team, every
              layer of the stack.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-black text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </a>
            
            </div>
           
          </div>

          <IconPanel
            mainIcon={Globe}
            satelliteIcons={[Braces, Terminal, Layers, GitBranch]}
            imageSrc="/assets/images/web.png"
            imageAlt="Website development workspace"
          />
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Alternating info / icon-panel sections                      */}
      {/* ---------------------------------------------------------- */}
      <section id="services" className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionBlock
          eyebrow="Core Web Languages"
          title="Frontend Foundations: HTML, CSS &amp; JavaScript"
          description="Every site starts with a solid structural and visual foundation. We hand-code semantic, accessible markup and pair it with modern styling and scripting so pages load fast and behave predictably across devices."
          bullets={[
            "Semantic HTML5 markup built for accessibility and SEO",
            "CSS3, Sass and Tailwind for responsive, pixel-precise styling",
            "Vanilla JavaScript and TypeScript for interactive behaviour",
          ]}
          tags={[
            { label: "HTML5" },
            { label: "CSS3 / Sass" },
            { label: "JavaScript" },
            { label: "TypeScript" },
          ]}
          mainIcon={Code2}
          satelliteIcons={[Braces, Palette, PenTool, MonitorSmartphone]}
          imageOnLeft={false}
          imageSrc="/assets/images/front.png"
          imageAlt="HTML, CSS and JavaScript code on screen"
        />

        <SectionBlock
          eyebrow="Modern Frameworks"
          title="Frontend Frameworks &amp; Libraries"
          description="For product-grade interfaces we build on component-driven frameworks, giving your site the speed of a single-page app with the structure needed to scale as features grow."
          bullets={[
            "React and Next.js for fast, SEO-friendly applications",
            "Vue.js and Angular for enterprise-scale interfaces",
            "Reusable component libraries and design systems",
          ]}
          tags={[
            { label: "React" },
            { label: "Next.js" },
            { label: "Vue.js" },
            { label: "Angular" },
          ]}
          mainIcon={Layers}
          satelliteIcons={[Puzzle, Braces, GitBranch, Terminal]}
          imageOnLeft={true}
          imageSrc="/assets/images/framework.png"
          imageAlt="Responsive frontend framework interface"
        />

        <SectionBlock
          eyebrow="Server-Side Development"
          title="Backend Engineering"
          description="Behind every form, login and dashboard is server logic we build to be secure and maintainable. We select the backend language that fits your project's scale, team and budget."
          bullets={[
            "Node.js and Express for JavaScript-based APIs",
            "PHP and Laravel for robust, widely-hosted applications",
            "Python (Django / Flask) and Java for data-heavy systems",
          ]}
          tags={[
            { label: "Node.js" },
            { label: "PHP" },
            { label: "Python" },
            { label: "Java" },
          ]}
          mainIcon={Server}
          satelliteIcons={[Terminal, Database, ShieldCheck, GitBranch]}
          imageOnLeft={false}
          imageSrc="/assets/images/bc.png"
          imageAlt="Backend server infrastructure"
        />

        <SectionBlock
          eyebrow="Data Layer"
          title="Databases &amp; Storage"
          description="We design schemas and data flows that stay fast as your content and users grow, choosing relational or non-relational systems based on how your data actually behaves."
          bullets={[
            "MySQL and PostgreSQL for structured, relational data",
            "MongoDB and Firebase for flexible, real-time data",
            "Secure authentication, backups and data migrations",
          ]}
          tags={[
            { label: "MySQL" },
            { label: "PostgreSQL" },
            { label: "MongoDB" },
            { label: "Firebase" },
          ]}
          mainIcon={Database}
          satelliteIcons={[ShieldCheck, Server, GitBranch, Terminal]}
          imageOnLeft={true}
          imageSrc="/assets/images/db.png"
          imageAlt="Database architecture illustration"
        />

        <div id="wordpress">
          <SectionBlock
            eyebrow="Content Management"
            title="WordPress Website Development"
            description="For content-led sites and businesses that need an editable platform, we build on WordPress — combining custom themes and plugins with the flexibility clients need to manage content themselves."
            bullets={[
              "Custom WordPress themes built from Figma designs",
              "Bespoke plugin development and third-party integrations",
              "WooCommerce stores, Elementor and Gutenberg block builds",
            ]}
            tags={[
              { label: "WordPress" },
              { label: "WooCommerce" },
              { label: "Elementor" },
              { label: "PHP" },
            ]}
            mainIcon={ShoppingCart}
            satelliteIcons={[Palette, Puzzle, Globe, PenTool]}
            imageOnLeft={false}
            imageSrc="/assets/images/wp.png"
            imageAlt="WordPress website development"
          />
        </div>

        <SectionBlock
          eyebrow="Delivery &amp; Care"
          title="Launch, Hosting &amp; Ongoing Support"
          description="Development doesn't stop at launch. We handle deployment, performance tuning and long-term maintenance so your site keeps running smoothly as it grows."
          bullets={[
            "CI/CD deployment pipelines and version control with Git",
            "Performance audits, SEO structure and Core Web Vitals",
            "Ongoing maintenance, security patches and content updates",
          ]}
          tags={[
            { label: "Git / CI-CD" },
            { label: "SEO" },
            { label: "Security" },
            { label: "Maintenance" },
          ]}
          mainIcon={Rocket}
          satelliteIcons={[GitBranch, ShieldCheck, Globe, Terminal]}
          imageOnLeft={true}
          imageSrc="/assets/images/hosting.png"
          imageAlt="Website hosting and deployment"
        />
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Footer CTA                                                   */}
      {/* ---------------------------------------------------------- */}
      <section id="contact" className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="rounded-2xl bg-neutral-900 px-8 sm:px-14 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
              Have a website in mind?
            </h2>
            <p className="text-neutral-300 max-w-lg">
              Tell us about your project and we will recommend the right
              languages, framework and platform for it — whether that's a
              custom build or WordPress.
            </p>
          </div>
          <a
            href="mailto:hello.trijjamedia@gmail.com
"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-7 py-3.5 rounded-full whitespace-nowrap transition-colors"
          >
            Contact Unseen Studios
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-center text-neutral-400 text-xs mt-8">
          Unseen Studios — Website Development Studio
        </p>
      </section>
    </div>
  );
};

export default WebDev;