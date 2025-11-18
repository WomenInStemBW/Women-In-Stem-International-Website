import React from 'react';
import wisLogoRed from "../assets/LOGO2 COPY PNG@300x.png"
const About = () => {
  return (
    <>
      <style>{`
        .about-hero {
          background: linear-gradient(135deg, #ea8966ff 0%, #a2544bff 100%);
          color: white;
          padding: 60px 0;
          margin-bottom: 40px;
        }

        .hero-header {
          display: flex;
          align-items: center;
          gap: 30px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-logo {
          max-width: 150px;
         height: auto;
        }

        .hero-text {
           flex: 1;
           min-width: 300px;
        }

        .about-section {
          padding: 40px 0;
        }

        .section-title {
          color: #c43c2dff;
          font-weight: bold;
          margin-bottom: 20px;
          border-left: 4px solid #ea8766ff;
          padding-left: 15px;
        }

        .motto-box {
          background: linear-gradient(135deg, #ea8966ff 0%, #a2544bff 100%);
          color: white;
          padding: 30px;
          border-radius: 10px;
          text-align: center;
          margin: 30px 0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .values-card {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 20px;
          border-left: 4px solid #764ba2;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .values-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .mission-item {
          padding: 15px 0;
          border-bottom: 1px solid #e9ecef;
        }

        .mission-item:last-child {
          border-bottom: none;
        }

        .mission-item i {
          color: #ea8766ff;
          margin-right: 10px;
        }

        .partners-section {
          background: #f8f9fa;
          padding: 40px 30px;
          border-radius: 10px;
          position: sticky;
          top: 20px;
        }

        .partner-logo {
          background: white;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100px;
        }

        .partner-logo:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .partner-logo img {
          max-width: 100%;
          max-height: 80px;
          object-fit: contain;
        }

        .partner-placeholder {
          color: #adb5bd;
          font-size: 14px;
          text-align: center;
        }
      `}</style>

      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <div className="hero-header">
            <img
              src={wisLogoRed}
              alt="Women in STEM International Logo"
              className="hero-logo"
            />
            <div className="hero-text">
              <h1 className="display-4 fw-bold">About Women in STEM - International</h1>
              <p className="lead">Empowering the next generation through STEM, Astronomy, and Space Science</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container about-section">
        <div className="row">
          {/* Left Column - Main Content */}
          <div className="col-lg-8">
            {/* About Us Section */}
            <section className="mb-5">
              <h2 className="section-title">About Us</h2>
              <p className="lead">
                Women in STEM - International (WiS) is an organization dedicated to STEM, Astronomy,
                Space Science, and Technology education and outreach for secondary school students,
                university students, girls, young women, and teachers in Botswana and across Africa.
              </p>
              <p>
                We educate and inspire through workshops, seminars, webinars, training sessions,
                mentorship programs, and courses. In addition, we share news and opportunities for
                professional development in the STEM and Space industries.
              </p>
            </section>

            {/* Vision Section */}
            <section className="mb-5">
              <h2 className="section-title">Vision</h2>
              <p>
                To be a transformational and leading organization in delivering Space Science,
                Technology, Astronomy, and STEM skills and knowledge, pioneering the foundation
                and growth of the Space sector and industry in Botswana.
              </p>
            </section>

            {/* Motto */}
            <div className="motto-box">
              <h3 className="mb-3">Our Motto</h3>
              <h2 className="fw-bold">Knowledge — Power — Change</h2>
            </div>

            {/* Core Values */}
            <section className="mb-5">
              <h2 className="section-title">Core Values</h2>
              <div className="values-card">
                <h5 className="fw-bold mb-2">🚀 Driving Change</h5>
                <p className="mb-0">We are committed to creating meaningful impact and transformation in STEM education.</p>
              </div>
              <div className="values-card">
                <h5 className="fw-bold mb-2">🌍 Global Community & Collaboration</h5>
                <p className="mb-0">Building bridges across borders to advance STEM and Space industries in Africa.</p>
              </div>
              <div className="values-card">
                <h5 className="fw-bold mb-2">✨ Transparency & Integrity</h5>
                <p className="mb-0">Operating with honesty, accountability, and ethical standards in all we do.</p>
              </div>
            </section>

            {/* Mission Section */}
            <section className="mb-5">
              <h2 className="section-title">Mission</h2>
              <div className="mission-item">
                <p className="mb-0">
                  <strong>•</strong> Build human capital by empowering individuals in Space Science,
                  Technology, Astronomy, and STEM, contributing to the advancement of the STEM
                  and Space industries in Africa.
                </p>
              </div>
              <div className="mission-item">
                <p className="mb-0">
                  <strong>•</strong> Provide knowledge, information, and education in Space Science,
                  Technology, Astronomy, and STEM to African communities, while actively recruiting,
                  empowering, and impacting more women.
                </p>
              </div>
              <div className="mission-item">
                <p className="mb-0">
                  <strong>•</strong> Foster collaboration, research, development, and innovation in
                  Space Science, Technology, Astronomy, and STEM.
                </p>
              </div>
              <div className="mission-item">
                <p className="mb-0">
                  <strong>•</strong> Promote gender equality across Space Science, Technology,
                  Astronomy, and STEM fields.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column - Partners & Images */}
          <div className="col-lg-4">
            <div className="partners-section">
              <h4 className="fw-bold mb-4 text-center">Strategic Affiliations, Supporters & Partners</h4>

              {/* Partner Logo Placeholders */}
              <div className="partner-logo">
                <img
                  src="/src/assets/biust.png"
                  alt="BIUST Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>BIUST</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/basic_education.jpg"
                  alt="Ministry of Basic Education Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>Ministry of Basic Education</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/afas.png"
                  alt="AFAS Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>African Astronomical Society</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/cumbres_observation.jpg"
                  alt="Las Cumbres Observatory Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>Las Cumbres Observatory</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/papssn.png"
                  alt="PAPSSN Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>PAPSSN</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/science_logo.jpg"
                  alt="Science Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>SCIENCE</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/oad.png"
                  alt="OAD Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>OAD</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/oae.png"
                  alt="OAE Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>OAE</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/iau.jpg"
                  alt="International Astronomical Union Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>International Astronomical Union</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/dara.png"
                  alt="DARA"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>DARA</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/starlight_education.png"
                  alt="Starlight Education Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>Starlight Education</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/ssvi.jpg"
                  alt="SSVI Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>SSVI</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/stemi.png"
                  alt="STEMi Markers Africa Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>STEMi Makers Africa</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/isset.jpg"
                  alt="ISSET Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>ISSET</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/time_education.png"
                  alt="Time Education Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>Time Education</div>
              </div>
              <div className="partner-logo">
                <img
                  src="/src/assets/space_generation.png"
                  alt="Space Generation Partner Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="partner-placeholder" style={{ display: 'none' }}>Space Generation</div>
              </div>

              <div className="text-center mt-4">
                <p className="text-muted small">
                  <em>Building partnerships for a better tomorrow</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div style={{ height: '60px' }}></div>
    </>
  );
};

export default About;