import React from 'react';
import { 
  Search, 
  FileText, 
  Settings, 
  BarChart3, 
  Link, 
  MapPin,
  Star,
  Users,
  Award,
  TrendingUp,
  Target,
  DollarSign,
  Shield,
  ArrowRight
} from 'lucide-react';
import './Seo.css';

const Seo: React.FC = () => {
  // SEO Services Data
  const seoServices = [
    {
      id: 1,
      title: 'Keyword Research & Strategy',
      description: 'In-depth keyword analysis to identify high-value search terms that drive qualified traffic to your website.',
      icon: Search,
      color: '#ff6b00'
    },
    {
      id: 2,
      title: 'On-Page SEO Optimization',
      description: 'Comprehensive optimization of meta tags, headers, content structure, and internal linking for maximum search visibility.',
      icon: FileText,
      color: '#e05a00'
    },
    {
      id: 3,
      title: 'Technical SEO Audit',
      description: 'Advanced technical analysis including site speed, mobile responsiveness, crawlability, and indexation optimization.',
      icon: Settings,
      color: '#ff6b00'
    },
    {
      id: 4,
      title: 'Content Marketing Strategy',
      description: 'Data-driven content creation that engages your audience, builds authority, and ranks higher in search results.',
      icon: BarChart3,
      color: '#e05a00'
    },
    {
      id: 5,
      title: 'Authority Building & Link Outreach',
      description: 'Strategic link building through quality partnerships, guest posts, and digital PR to boost domain authority.',
      icon: Link,
      color: '#ff6b00'
    },
    {
      id: 6,
      title: 'Local SEO & Google Maps',
      description: 'Optimize your business for local search, Google Maps, and location-based queries to attract nearby customers.',
      icon: MapPin,
      color: '#e05a00'
    }
  ];

  // SEO Stats
  const seoStats = [
    { value: '93%', label: 'Online experiences start with search engines' },
    { value: '75%', label: 'Users never scroll past the first page' },
    { value: '61%', label: 'Marketers prioritize SEO for growth' },
    { value: '70%', label: 'Traffic comes from organic search' }
  ];

  return (
    <div className="seo-container">
      {/* Hero Section */}
      <section className="seo-hero">
        <div className="hero-content">
          <span className="hero-badge">🚀 Professional SEO Services</span>
          <h1 className="hero-title">
            Elevate Your <span className="orange-text">Search Rankings</span> with Data-Driven SEO
          </h1>
          <p className="hero-description">
            Transform your online presence with comprehensive SEO strategies designed to increase visibility, drive qualified traffic, and deliver measurable business growth.
          </p>
          <div className="hero-buttons">
            <button className="hero-cta primary">Start Your SEO Journey</button>
            <button className="hero-cta secondary">View Our Case Studies</button>
          </div>
          <div className="hero-trust">
            <span><Star size={16} fill="#ff6b00" color="#ff6b00" /> 4.9/5 Rating</span>
            <span><Users size={16} color="#ff6b00" /> 500+ Happy Clients</span>
            <span><Award size={16} color="#ff6b00" /> Award-Winning Agency</span>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="assets/images/seo1.png"
            alt="SEO professionals analyzing data and search engine optimization strategies"
            className="seo-hero-image"
          />
          <div className="hero-stats-float">
            <div><TrendingUp size={16} color="#ff6b00" /> +150% Traffic</div>
            <div><Target size={16} color="#ff6b00" /> Top 3 Rankings</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="seo-stats">
        {seoStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Services Section */}
      <section className="seo-services">
        <div className="section-header">
          <span className="section-tag">Our Services</span>
          <h2 className="section-title">
            Comprehensive <span className="orange-text">SEO Solutions</span>
          </h2>
          <p className="section-subtitle">
            Tailored strategies to improve your search visibility and drive sustainable growth
          </p>
        </div>
        <div className="services-grid">
          {seoServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="service-card">
                <div className="service-icon" style={{ backgroundColor: service.color }}>
                  <IconComponent size={28} color="#ffffff" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-footer">
                  <span className="service-learn">Learn More <ArrowRight size={14} /></span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="seo-process">
        <div className="section-header">
          <span className="section-tag light">Our Process</span>
          <h2 className="section-title light">
            How We Drive <span className="orange-text">Results</span>
          </h2>
          <p className="section-subtitle light">
            A systematic approach to SEO that delivers measurable outcomes
          </p>
        </div>
        <div className="process-timeline">
          <div className="process-step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Discovery & Audit</h3>
              <p>Comprehensive analysis of your website, competitors, and market opportunities</p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Strategy Development</h3>
              <p>Customized SEO roadmap aligned with your business objectives and budget</p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Implementation</h3>
              <p>Expert execution of on-page, technical, and off-page SEO tactics</p>
            </div>
          </div>
          <div className="process-step">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>Monitoring & Optimization</h3>
              <p>Continuous tracking, analysis, and refinement for optimal performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      

      {/* Benefits Section */}
      <section className="seo-benefits">
        <div className="section-header">
          <span className="section-tag">Why Choose Us</span>
          <h2 className="section-title">
            Benefits of <span className="orange-text">Professional SEO</span>
          </h2>
        </div>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">
              <TrendingUp size={40} color="#ff6b00" />
            </div>
            <h3>Increase Organic Traffic</h3>
            <p>Attract more qualified visitors actively searching for your products or services</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <Target size={40} color="#ff6b00" />
            </div>
            <h3>Targeted Audience Reach</h3>
            <p>Connect with users at the right moment in their buyer's journey</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <DollarSign size={40} color="#ff6b00" />
            </div>
            <h3>Cost-Effective Growth</h3>
            <p>Achieve higher ROI compared to paid advertising channels</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <Shield size={40} color="#ff6b00" />
            </div>
            <h3>Build Brand Authority</h3>
            <p>Establish credibility and trust in your industry through search prominence</p>
          </div>
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="seo-full-image">
        <img 
          src="assets/images/seo2.png"
          alt="SEO growth and business success visualization"
          className="full-width-image"
        />
      </section>
    </div>
  );
};

export default Seo;
