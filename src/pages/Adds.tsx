import React from 'react';
import './Adds.css'; // We'll create this for styling

const Adds: React.FC = () => {
  // Instagram Reels URLs
  const instagramReels = [
    'https://www.instagram.com/p/DZuuaDdFWki/',
    'https://www.instagram.com/p/Da7pw7Cj0kd/',
    'https://www.instagram.com/p/DJo-ZJrotvB/',
    'https://www.instagram.com/p/DXJ3jyICDS6/',
  ];

  // YouTube Shorts URL
  const youtubeShort = 'https://www.youtube.com/shorts/Fcj8aG-TAIM';

  return (
    <div className="adds-container">
      <h1 className="adds-title">Our Reels & Shorts</h1>
      
      {/* Instagram Reels Section */}
      <section className="reels-section">
        <h2 className="section-title">Instagram Reels</h2>
        <div className="reels-grid">
          {instagramReels.map((url, index) => (
            <div key={index} className="reel-card">
              <div className="reel-embed">
                <iframe
                  src={`https://www.instagram.com/p/${url.split('/p/')[1].split('/')[0]}/embed`}
                  title={`Instagram Reel ${index + 1}`}
                  className="reel-iframe"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="reel-link"
              >
                View on Instagram
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube Shorts Section */}
      <section className="shorts-section">
        <h2 className="section-title">YouTube Shorts</h2>
        <div className="shorts-container">
          <div className="short-card">
            <div className="short-embed">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeShort.split('/shorts/')[1].split('?')[0]}`}
                title="YouTube Short"
                className="short-iframe"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <a 
              href={youtubeShort} 
              target="_blank" 
              rel="noopener noreferrer"
              className="short-link"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Adds;