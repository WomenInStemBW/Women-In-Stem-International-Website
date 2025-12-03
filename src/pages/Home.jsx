import React from 'react';
import wisLogoBlue from "../assets/LOGO1 COPY PNG@300x.png";
import nasaBackground from "../assets/nasa-background.webp";

const Home = () => {
  return (
    <>
      <style>{`
        .hero-section {
          background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${nasaBackground});
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
        }

        /* Mobile-specific fix */
        @media (max-width: 768px) {
          .hero-section {
            background-attachment: scroll;
            background-size: cover;
            background-position: center center;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.3rem;
          }
          .hero-description {
            font-size: 1rem;
          }
          .section-header h2 {
            font-size: 2rem;
          }
        }

        .hero-content {
          text-align: center;
          padding: 40px 20px;
          max-width: 900px;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.8rem;
          margin-bottom: 15px;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
          font-weight: 300;
        }

        .hero-description {
          font-size: 1.2rem;
          margin-bottom: 30px;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-btn {
          padding: 15px 35px;
          font-size: 1.1rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          font-weight: 600;
        }

        .btn-primary-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary-hero:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary-hero {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
          backdrop-filter: blur(10px);
        }

        .btn-secondary-hero:hover {
          background: white;
          color: #667eea;
          transform: translateY(-3px);
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 15px;
        }

        .section-header p {
          font-size: 1.2rem;
          color: #718096;
          max-width: 700px;
          margin: 0 auto;
        }

        /* Optimized gradient sections - no background images */
        .gradient-section-purple {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 80px 0;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .gradient-section-orange {
          background: linear-gradient(135deg, #ea8966 0%, #a2544b 100%);
          padding: 80px 0;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .gradient-section-dark {
          background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
          padding: 80px 0;
          color: white;
          position: relative;
          overflow: hidden;
        }

        /* Add subtle pattern overlay for visual interest without images */
        .gradient-section-purple::before,
        .gradient-section-orange::before,
        .gradient-section-dark::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .section-content {
          position: relative;
          z-index: 1;
        }

        .section-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          display: inline-block;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.3rem;
          }
          .hero-description {
            font-size: 1rem;
          }
          .section-header h2 {
            font-size: 2rem;
          }
          .section-icon {
            font-size: 3rem;
          }
        }
      `}</style>

      {/* Hero Section with Background Image */}
      <section className="hero-section">
        <div className="hero-content">
          <img 
            src={wisLogoBlue} 
            alt="Women in STEM International Logo" 
            style={{ maxWidth: '300px', marginBottom: '30px', animation: 'fadeInUp 1.2s ease-out' }}
          />
          <h1 className="hero-title">
            STEM, Astronomy and Space Education
          </h1>
          <h2 className="hero-subtitle">
            Training, Outreach and Consulting
          </h2>
          <p className="hero-description">
            Women in STEM - International provides STEM, Astronomy and Space Technology 
            intelligence, consulting, news and opportunities for Botswana and Africa space industry
          </p>
          <div className="hero-buttons">
            <a href="/about" className="hero-btn btn-primary-hero">Learn More</a>
            <a href="/offers" className="hero-btn btn-secondary-hero">Get Involved</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ 
        background: 'white', 
        padding: '80px 0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: '#2d3748', 
                marginBottom: '20px' 
              }}>
                Advancing Africa's Next Space Generation
              </h2>
              <p style={{ 
                fontSize: '1.1rem', 
                color: '#4a5568', 
                lineHeight: '1.7', 
                marginBottom: '30px' 
              }}>
                Women in STEM - International is dedicated to advancing STEM, Astronomy, and Space 
                Science education across Africa. We provide training, mentorship, and opportunities 
                to inspire the next generation of female leaders in science and technology.
              </p>
              <a href="/about" className="hero-btn btn-primary-hero">
                Learn Our Story →
              </a>
            </div>
            <div className="col-lg-6 text-center">
              <div style={{
                fontSize: '8rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px'
              }}>
                🚀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section - Dark Gradient */}
      <section className="gradient-section-dark">
        <div className="container">
          <div className="section-content">
            <div className="row align-items-center">
              <div className="col-lg-2 text-center mb-4 mb-lg-0">
                <div className="section-icon">📚</div>
              </div>
              <div className="col-lg-10">
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '20px' 
                }}>
                  Latest Insights & Stories
                </h2>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.7', 
                  marginBottom: '30px',
                  opacity: 0.9
                }}>
                  Discover inspiring stories, latest news, and educational content from our 
                  community. Stay updated with the advancements in STEM and Space sciences.
                </p>
                <a href="/blog" className="hero-btn btn-secondary-hero">
                  Read Our Blog →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section - Purple Gradient */}
      <section className="gradient-section-purple">
        <div className="container">
          <div className="section-content">
            <div className="row align-items-center">
              <div className="col-lg-2 text-center mb-4 mb-lg-0">
                <div className="section-icon">🎯</div>
              </div>
              <div className="col-lg-10">
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '20px' 
                }}>
                  Explore Opportunities
                </h2>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.7', 
                  marginBottom: '30px',
                  opacity: 0.9
                }}>
                  Find scholarships, internships, workshops, and career opportunities in STEM 
                  and Space industries. Take the next step in your professional journey.
                </p>
                <a href="/opportunities" className="hero-btn" style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '2px solid white',
                  backdropFilter: 'blur(10px)'
                }}>
                  View Opportunities →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Section - Orange Gradient */}
      <section className="gradient-section-orange">
        <div className="container">
          <div className="section-content">
            <div className="row align-items-center">
              <div className="col-lg-2 text-center mb-4 mb-lg-0">
                <div className="section-icon">👥</div>
              </div>
              <div className="col-lg-10">
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '20px' 
                }}>
                  Meet Our Team
                </h2>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.7', 
                  marginBottom: '30px',
                  opacity: 0.9
                }}>
                  Get to know the passionate individuals driving our mission forward. Our diverse 
                  team of experts and volunteers are committed to empowering women in STEM.
                </p>
                <a href="/teams" className="hero-btn" style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '2px solid white',
                  backdropFilter: 'blur(10px)'
                }}>
                  Meet the Team →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;