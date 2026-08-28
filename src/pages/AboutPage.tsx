// AboutPage.tsx
import React from 'react';
import {About} from '../components/sections/About'; // Adjust the import path if necessary

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      {/* Founder Section */}
      <section className="founder-section">
        <div className="founder-container">
          {/* Left Side: Image */}
          <div className="founder-image">
            <img
              src="/assets/images/founder.png"
              alt="Founder"
            />
          </div>

          {/* Right Side: Information */}
          <div className="founder-info">
            <h1 className="founder-heading">
              Govind Budhawant
            </h1>
            <p className="founder-description">
              Govind Budhawant is the Founder of Unseen Studios, a creative digital marketing company focused on helping businesses build a strong online presence. With a passion for innovation and technology, he leads the company in delivering high-quality web development, branding, SEO, social media marketing, and digital advertising solutions. His vision is to combine creativity with strategy to help brands achieve sustainable growth. Under his leadership, Unseen Studios has successfully delivered impactful digital solutions across multiple industries while maintaining a strong commitment to quality, innovation, and client satisfaction.
            </p>
            <p className="founder-quote">
              "Perfection is not just a goal; it's a continuous journey."
            </p>
          </div>
        </div>
      </section>

      {/* Below: About Component */}
      <About />
    </div>
  );
};

export default AboutPage;