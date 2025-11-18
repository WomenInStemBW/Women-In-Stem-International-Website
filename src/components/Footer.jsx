import React from 'react';

const Footer = () => {
  return (
    <>
      <style>{`
        .footer {
          background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
          color: white;
          padding: 50px 0 20px;
          margin-top: auto;
        }

        .footer-content {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          margin-bottom: 30px;
        }

        .footer-section {
          flex: 1;
          min-width: 250px;
        }

        .footer-section h4 {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 20px;
          color: #fff;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          padding-bottom: 10px;
        }

        .footer-section p,
        .footer-section address {
          margin-bottom: 10px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          font-style: normal;
        }

        .footer-section address {
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .social-link {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          font-size: 1.3rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .hours-list {
          list-style: none;
          padding: 0;
        }

        .hours-list li {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hours-list li:last-child {
          border-bottom: none;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 20px;
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
        }

        .footer-logo {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 15px;
          color: white;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
          }
          
          .footer-section {
            min-width: 100%;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            {/* About Section */}
            <div className="footer-section">
              <div className="footer-logo">Women in STEM - International</div>
              <p>
                Empowering individuals through STEM, Astronomy, and Space Science 
                education and outreach across Botswana and Africa.
              </p>
              <div className="social-links">
                <a 
                  href="https://www.youtube.com/channel/UCpEgbMPKAxBdu0CvHZ7jgVg" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="YouTube"
                >
                  ▶
                </a>
                <a 
                  href="https://www.facebook.com/womeninstembw/?_rdr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="Facebook"
                >
                  f
                </a>
                <a 
                  href="https://www.instagram.com/women_in_stem_bw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="Instagram"
                >
                  📷
                </a>
              </div>
            </div>

            {/* Find Us Section */}
            <div className="footer-section">
              <h4>Find Us</h4>
              <address>
                <strong>Address:</strong><br />
                BIUST, Physics & Astronomy Dept.<br />
                Plot 1088, Private Bag 16<br />
                Palapye, Botswana
              </address>
              <p>
                <strong>Phone:</strong> +267 74661487
              </p>
              <p>
                <strong>Email:</strong><br />
                tumok@wisbw.org<br />
                enqueries@wisbw.org<br />
                astrowis2018@gmail.com
              </p>
            </div>

            {/* Hours Section */}
            <div className="footer-section">
              <h4>Hours</h4>
              <ul className="hours-list">
                <li>
                  <strong>Monday – Friday</strong><br />
                  9:00 AM – 5:00 PM
                </li>
                <li>
                  <strong>Saturday & Sunday</strong><br />
                  11:00 AM – 3:00 PM
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Women in STEM - International. All rights reserved.</p>
            <p style={{ marginTop: '10px', fontSize: '0.85rem' }}>
              Knowledge — Power — Change
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;