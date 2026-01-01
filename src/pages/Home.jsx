import React, { useState, useEffect } from 'react';
import wisLogoBlue from "../assets/LOGO1 COPY PNG@300x.png";
import nasaBackground from "../assets/nasa-background.webp";
import labBackground from "../assets/lab.webp";
import scienceBackground from "../assets/science.webp";
import podcastBackground from "../assets/podcast.webp";


const Home = () => {
  // Only load section backgrounds when scrolled near
const [loadedSections, setLoadedSections] = useState({
  blog: false,
  opportunities: false,
  teams: false
});

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setLoadedSections(prev => ({
          ...prev,
          [entry.target.dataset.section]: true
        }));
      }
    });
  });

  // Observe each section
  document.querySelectorAll('[data-section]').forEach(el => {
    observer.observe(el);
  });
}, []);
  return (
    <>
      <style>{`
        .hero-section {
          background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${nasaBackground});
          background-size: cover;
          background-position: center;
          background-attachment: scroll;
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

        .gradient-section-blue {
  background: linear-gradient(135deg, #0070ba 0%, #1546a0 100%);
  padding: 80px 0;
  color: white;
  position: relative;
  overflow: hidden;
}

.gradient-section-blue::before {
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

      {/* Blog Section */}
      <section style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${labBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
        color: 'white'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
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
                Read Our Blog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section style={{ 
        backgroundImage: `linear-gradient(rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8)), url(${scienceBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
        color: 'white'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
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
                View Opportunities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section style={{ 
        backgroundImage: `linear-gradient(rgba(234, 137, 102, 0.8), rgba(162, 84, 75, 0.8)), url(${podcastBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
        color: 'white'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
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
                Meet the Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section - Blue Gradient with PayPal */}
      <section className="gradient-section-blue">
        <div className="container">
          <div className="section-content">
            <div className="row align-items-center">
              <div className="col-lg-2 text-center mb-4 mb-lg-0">
                <div className="section-icon" style={{
                  fontSize: '4rem',
                  background: 'white',
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  padding: '15px'
                }}>
                  <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.125 2.25H4.875C3.83947 2.25 3 3.08947 3 4.125V19.875C3 20.9105 3.83947 21.75 4.875 21.75H19.125C20.1605 21.75 21 20.9105 21 19.875V4.125C21 3.08947 20.1605 2.25 19.125 2.25Z" stroke="#0070BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.5 8.25C7.5 7.42157 8.17157 6.75 9 6.75H15C15.8284 6.75 16.5 7.42157 16.5 8.25V15C16.5 15.8284 15.8284 16.5 15 16.5H9C8.17157 16.5 7.5 15.8284 7.5 15V8.25Z" stroke="#0070BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.5 11.25H13.5" stroke="#0070BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="col-lg-10">
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  marginBottom: '20px'
                }}>
                  Support Our Cause
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  marginBottom: '30px',
                  opacity: 0.9
                }}>
                  Women in STEM - International is positioned to bring impact across Africa with a particular
                  focus on girls, young women, and students through its programs. We would be delighted
                  to have your support on this mission.
                </p>
                <a
                  href="https://paypal.me/wisbw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '2px solid white',
                    backdropFilter: 'blur(10px)',
                    textDecoration: 'none'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.125 2.25H4.875C3.83947 2.25 3 3.08947 3 4.125V19.875C3 20.9105 3.83947 21.75 4.875 21.75H19.125C20.1605 21.75 21 20.9105 21 19.875V4.125C21 3.08947 20.1605 2.25 19.125 2.25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.5 8.25C7.5 7.42157 8.17157 6.75 9 6.75H15C15.8284 6.75 16.5 7.42157 16.5 8.25V15C16.5 15.8284 15.8284 16.5 15 16.5H9C8.17157 16.5 7.5 15.8284 7.5 15V8.25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.5 11.25H13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Donate via PayPal →
                  </span>
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