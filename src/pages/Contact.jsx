import React, { useState } from 'react';
import wisLogoRed from "../assets/LOGO2 COPY PNG@300x.png"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <>
      <style>{`
        .contact-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #faf6f5ff 0%, #d57b7bff 100%);
          padding: 60px 0;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .contact-logo {
          max-width: 250px;
          margin: 0 auto 30px;
          display: block;
        }

        .contact-header h1 {
          font-size: 2.8rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 15px;
        }

        .contact-header p {
          font-size: 1.2rem;
          color: #4a5568;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .contact-form-wrapper h3 {
          font-size: 1.8rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 25px;
          text-align: center;  /* ADD THIS LINE */
        }

        .contact-form-wrapper {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .contact-form-wrapper h3 {
          font-size: 1.8rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .form-control {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-control:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        textarea.form-control {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #ea8966ff 0%, #a2544bff 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .success-message {
          background: #48bb78;
          color: white;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 20px;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
          }

          .contact-header h1 {
            font-size: 2rem;
          }

          .contact-info,
          .contact-form-wrapper {
            padding: 25px;
          }
        }
      `}</style>

      <div className="contact-page">
        <div className="container">
          <div className="contact-header">
            <img 
              src={wisLogoRed} 
              alt="Women in STEM International Logo" 
              className="contact-logo"
            />
            <h1>Contact Us</h1>
            <p>
              Have questions? We'd love to hear from you. Send us a message and 
              we'll respond as soon as possible.
            </p>
          </div>

          <div className="contact-container">
              <div className="contact-form-wrapper">
                <h3>Send Us a Message</h3>
                
                {submitted && (
                  <div className="success-message">
                    ✓ Thank you! Your message has been sent successfully.
                  </div>
                )}

                <div onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+267 12345678"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-control"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button type="button" onClick={handleSubmit} className="submit-btn">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Contact;