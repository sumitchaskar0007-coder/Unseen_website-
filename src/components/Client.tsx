import { useState } from 'react'

interface ClientData {
  id: number
  name: string
  logo: string
}

interface ClientLogoProps {
  client: ClientData
}

const clients: ClientData[] = [
  { id: 1, name: 'Client 1', logo: '/assets/client/c1.png' },
  { id: 2, name: 'Client 2', logo: '/assets/client/c2.png' },
  { id: 3, name: 'Client 3', logo: '/assets/client/c3.png' },
  { id: 4, name: 'Client 4', logo: '/assets/client/c4.png' },
  { id: 5, name: 'Client 5', logo: '/assets/client/c5.png' },
  { id: 6, name: 'Client 6', logo: '/assets/client/c6.png' },
  { id: 7, name: 'Client 7', logo: '/assets/client/c7.png' },
  { id: 8, name: 'Client 8', logo: '/assets/client/c8.png' },
  { id: 9, name: 'Client 9', logo: '/assets/client/c9.png' },
  { id: 10, name: 'Client 10', logo: '/assets/client/c10.png' },
  { id: 11, name: 'Client 11', logo: '/assets/client/c11.png' },
  { id: 12, name: 'Client 12', logo: '/assets/client/c12.png' },
  { id: 13, name: 'Client 13', logo: '/assets/client/c13.png' },
  { id: 14, name: 'Client 14', logo: '/assets/client/c14.png' },
  { id: 15, name: 'Client 15', logo: '/assets/client/c15.png' },
  { id: 16, name: 'Client 16', logo: '/assets/client/c16.png' },
  { id: 17, name: 'Client 17', logo: '/assets/client/c17.png' },
  { id: 18, name: 'Client 18', logo: '/assets/client/c18.png' },
  { id: 19, name: 'Client 19', logo: '/assets/client/c19.png' },
  { id: 20, name: 'Client 20', logo: '/assets/client/c20.png' },
  { id: 21, name: 'Client 21', logo: '/assets/client/c21.png' },
  { id: 22, name: 'Client 22', logo: '/assets/client/c22.png' },
  { id: 23, name: 'Client 23', logo: '/assets/client/c23.png' },
  { id: 24, name: 'Client 24', logo: '/assets/client/c24.png' },
  { id: 25, name: 'Client 25', logo: '/assets/client/c25.png' },
]

/* -------------------------------------------------------
   Individual Logo Card
------------------------------------------------------- */

const ClientLogo = ({ client }: ClientLogoProps) => {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="client-logo-item">
      <div className="client-logo-card">
        {/* Top accent */}
        <div className="client-card-accent" />

        {/* Logo */}
        <div className="client-logo-wrapper">
          {!imageError ? (
            <img
              src={client.logo}
              alt={client.name}
              loading="lazy"
              decoding="async"
              width="220"
              height="120"
              className="client-logo-image"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="client-logo-fallback">
              {client.name}
            </div>
          )}
        </div>

        {/* Bottom label */}
        <div className="client-logo-label">
          <span>PARTNER</span>
          <span className="client-dot" />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------
   Main Component
------------------------------------------------------- */

const Client = () => {
  /*
   * Only TWO copies are required for a seamless marquee.
   *
   * Previous:
   * 25 × 3 = 75 images
   *
   * Now:
   * 25 × 2 = 50 images
   */
  const marqueeClients = [...clients, ...clients]

  return (
    <section className="clients-section">
      <style>{`
        /* ==================================================
           FONT
        ================================================== */

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@500;600;700;800&display=swap');

        /* ==================================================
           SECTION
        ================================================== */

        .clients-section {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: clamp(55px, 8vw, 100px) 0;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(249, 115, 22, 0.07),
              transparent 38%
            ),
            #ffffff;
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          border-bottom: 1px solid rgba(15, 23, 42, 0.06);
        }

        /* ==================================================
           CONTAINER
        ================================================== */

        .clients-container {
          width: min(1400px, 100%);
          margin: 0 auto;
        }

        /* ==================================================
           HEADER
        ================================================== */

        .clients-header {
          text-align: center;
          padding: 0 20px;
          margin-bottom: clamp(35px, 5vw, 55px);
        }

        .clients-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 14px;
          margin-bottom: 18px;

          border: 1px solid rgba(249, 115, 22, 0.18);
          border-radius: 999px;

          background: rgba(249, 115, 22, 0.06);

          color: #ea580c;

          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .clients-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f97316;
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
        }

        .clients-title {
          margin: 0;

          font-family: 'Manrope', sans-serif;
          font-size: clamp(2rem, 5vw, 3.7rem);
          line-height: 1.08;
          letter-spacing: -0.04em;
          font-weight: 800;
          color: #111827;
        }

        .clients-title-highlight {
                  font-family: 'Manrope', sans-serif;

          color: #f97316;
          font-weight: 800;
        }

        .clients-description {
          max-width: 620px;
          margin: 16px auto 0;

          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 1.6vw, 1rem);
          line-height: 1.7;
          font-weight: 600;
          color: #6b7280;
        }

        /* ==================================================
           HEADER DIVIDER
        ================================================== */

        .clients-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
        }

        .clients-divider-line {
          width: 45px;
          height: 1px;
          background: rgba(15, 23, 42, 0.12);
        }

        .clients-divider-center {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #f97316;
        }

        /* ==================================================
           MARQUEE
        ================================================== */

        .clients-marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 12px 0 22px;
        }

        .clients-marquee {
          display: flex;
          width: max-content;
          gap: 22px;

          animation: clientMarquee 55s linear infinite;

          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        /*
          Since we have exactly two identical sets,
          move by 50% for a seamless loop.
        */

        @keyframes clientMarquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .clients-marquee-wrapper:hover .clients-marquee {
          animation-play-state: paused;
        }

        /* ==================================================
           LOGO ITEM
        ================================================== */

        .client-logo-item {
          flex: 0 0 auto;
          width: clamp(180px, 18vw, 235px);
        }

        /* ==================================================
           LOGO CARD
        ================================================== */

        .client-logo-card {
          position: relative;
          height: 170px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          padding: 18px;

          overflow: hidden;

          background: rgba(255, 255, 255, 0.96);

          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 18px;

          box-shadow:
            0 8px 25px rgba(15, 23, 42, 0.045);

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .client-logo-card:hover {
          transform: translateY(-7px);

          border-color: rgba(249, 115, 22, 0.28);

          box-shadow:
            0 18px 45px rgba(15, 23, 42, 0.10),
            0 5px 20px rgba(249, 115, 22, 0.08);
        }

        /* ==================================================
           CARD ACCENT
        ================================================== */

        .client-card-accent {
          position: absolute;
          top: 0;
          left: 18px;
          right: 18px;

          height: 2px;

          background: linear-gradient(
            90deg,
            transparent,
            #f97316,
            transparent
          );

          opacity: 0.55;
        }

        /* ==================================================
           LOGO WRAPPER
        ================================================== */

        .client-logo-wrapper {
          flex: 1;

          display: flex;
          align-items: center;
          justify-content: center;

          min-height: 115px;

          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              rgba(249, 115, 22, 0.025),
              rgba(15, 23, 42, 0.015)
            );
        }

        .client-logo-image {
          display: block;

          width: 100%;
          max-width: 190px;
          height: 105px;

          object-fit: contain;

          opacity: 0.88;

          filter: grayscale(15%);

          transition:
            opacity 0.3s ease,
            filter 0.3s ease,
            transform 0.3s ease;
        }

        .client-logo-card:hover .client-logo-image {
          opacity: 1;
          filter: grayscale(0%);
          transform: scale(1.04);
        }

        /* ==================================================
           FALLBACK
        ================================================== */

        .client-logo-fallback {
          padding: 15px;

          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 800;

          text-align: center;
          color: #f97316;
        }

        /* ==================================================
           LABEL
        ================================================== */

        .client-logo-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;

          padding-top: 11px;

          font-family: 'Inter', sans-serif;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.18em;

          color: #9ca3af;
        }

        .client-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #f97316;
        }

        /* ==================================================
           GRADIENT FADE
        ================================================== */

        .clients-fade {
          position: absolute;
          z-index: 5;
          top: 0;
          bottom: 0;

          width: clamp(45px, 9vw, 150px);

          pointer-events: none;
        }

        .clients-fade-left {
          left: 0;

          background: linear-gradient(
            90deg,
            #ffffff 0%,
            rgba(255, 255, 255, 0.9) 25%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        .clients-fade-right {
          right: 0;

          background: linear-gradient(
            270deg,
            #ffffff 0%,
            rgba(255, 255, 255, 0.9) 25%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        /* ==================================================
           BOTTOM NOTE
        ================================================== */

        .clients-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          margin-top: 25px;
          padding: 0 20px;
        }

        .clients-bottom-line {
          width: 25px;
          height: 1px;
          background: rgba(15, 23, 42, 0.12);
        }

        .clients-bottom-text {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9ca3af;
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 768px) {
          .clients-section {
            padding: 55px 0;
          }

          .clients-header {
            margin-bottom: 32px;
          }

          .clients-description {
            max-width: 520px;
          }

          .clients-marquee {
            gap: 16px;
            animation-duration: 48s;
          }

          .client-logo-item {
            width: 185px;
          }

          .client-logo-card {
            height: 155px;
            padding: 15px;
            border-radius: 15px;
          }

          .client-logo-wrapper {
            min-height: 105px;
          }

          .client-logo-image {
            height: 90px;
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 480px) {
          .clients-section {
            padding: 48px 0;
          }

          .clients-header {
            padding: 0 18px;
            margin-bottom: 28px;
          }

          .clients-eyebrow {
            font-size: 9px;
            padding: 6px 11px;
          }

          .clients-title {
            font-size: clamp(1.8rem, 9vw, 2.5rem);
          }

          .clients-description {
            font-size: 0.8rem;
            line-height: 1.6;
          }

          .clients-divider {
            margin-top: 18px;
          }

          .clients-marquee {
            gap: 12px;
            animation-duration: 42s;
          }

          .client-logo-item {
            width: 165px;
          }

          .client-logo-card {
            height: 140px;
            padding: 12px;
            border-radius: 13px;
          }

          .client-logo-wrapper {
            min-height: 92px;
          }

          .client-logo-image {
            height: 78px;
          }

          .client-logo-label {
            padding-top: 8px;
            font-size: 7px;
          }

          .clients-bottom {
            margin-top: 18px;
          }

          .clients-bottom-text {
            font-size: 8px;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .clients-marquee {
            animation: none;
          }

          .client-logo-card {
            transition: none;
          }
        }
      `}</style>

      <div className="clients-container">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="clients-header">

          <div className="clients-eyebrow">
            <span className="clients-eyebrow-dot" />
            Our Partners
          </div>

          <h2 className="clients-title">
            Trusted by{' '}
            <span className="clients-title-highlight">
              50+ Companies
            </span>
          </h2>

          <p className="clients-description">
            We're proud to work with innovative brands and organizations
            that trust us to create meaningful digital experiences.
          </p>

          <div className="clients-divider">
            <span className="clients-divider-line" />
            <span className="clients-divider-center" />
            <span className="clients-divider-line" />
          </div>

        </div>

        {/* ==================================================
            MARQUEE
        ================================================== */}

        <div className="clients-marquee-wrapper">

          {/* Left fade */}
          <div
            className="clients-fade clients-fade-left"
            aria-hidden="true"
          />

          {/* Right fade */}
          <div
            className="clients-fade clients-fade-right"
            aria-hidden="true"
          />

          <div className="clients-marquee">

            {marqueeClients.map((client, index) => (
              <ClientLogo
                key={`${client.id}-${index}`}
                client={client}
              />
            ))}

          </div>

        </div>

        {/* ==================================================
            BOTTOM NOTE
        ================================================== */}

        <div className="clients-bottom">

          <span className="clients-bottom-line" />

          <span className="clients-bottom-text">
            Trusted partnerships • Lasting results
          </span>

          <span className="clients-bottom-line" />

        </div>

      </div>
    </section>
  )
}

export default Client