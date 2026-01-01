// src/pages/OfferBooking.jsx
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { submitOfferRegistration } from '../services/offerService';
import emailjs from '@emailjs/browser';
import wisLogoRed from "../assets/LOGO1 PNG@300x.png";
import telescopePic from "../assets/telescope.webp";

const OfferBooking = () => {
  const { offerId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const offer = location.state?.offer;

  const [formData, setFormData] = useState({
    participant_name: '',
    participant_email: '',
    participant_phone: '',
    organization: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save to database
      const registrationData = {
        offer_id: offerId,
        offer_title: offer?.title || 'Unknown Offer',
        ...formData
      };

      const { error: dbError } = await submitOfferRegistration(registrationData);
      if (dbError) throw dbError;

      // Send email via EmailJS
      const emailData = {
        offer_title: offer?.title || 'Unknown Offer',
        offer_deadline: offer?.deadline ? new Date(offer.deadline).toLocaleDateString() : 'N/A',
        participant_name: formData.participant_name,
        participant_email: formData.participant_email,
        participant_phone: formData.participant_phone || 'Not provided',
        organization: formData.organization || 'Not provided',
        message: formData.message || ''
      };

      console.log('Sending email with data:', emailData);

      await emailjs.send(
        'service_6s9eawa', // Replace with your EmailJS service ID
        'template_wz1vrr2', // Replace with your EmailJS template ID for offers
        emailData,
        'qlUpstTXW__PvMYcP' // Replace with your EmailJS public key
      );

      console.log('Email sent successfully!');

      setSubmitted(true);
      
      // Redirect back to offers after 3 seconds
      setTimeout(() => {
        navigate('/offers');
      }, 3000);
    } catch (err) {
      console.error('Error submitting booking:', err);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!offer) {
    return (
      <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <p>Offer not found.</p>
          <button onClick={() => navigate('/offers')} style={{ marginTop: '20px', padding: '10px 20px', background: '#c43c2dff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Back to Offers
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .booking-page {
          min-height: 100vh;
          background: url(${telescopePic}) center/cover no-repeat;
          padding: 60px 0;
          position: relative;
        }

        .booking-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 0;
        }

        .booking-page > .container {
          position: relative;
          z-index: 1;
        }

        .booking-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .booking-logo {
          max-width: 250px;
          margin: 0 auto 30px;
          display: block;
        }

        .booking-header h1 {
          font-size: 2.8rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 15px;
        }

        .booking-header p {
          font-size: 1.2rem;
          color: #4a5568;
          max-width: 600px;
          margin: 0 auto;
        }

        .booking-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .offer-info {
          background: white;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .offer-info h3 {
          color: #2d3748;
          margin-bottom: 10px;
          font-size: 1.5rem;
        }

        .offer-info .deadline {
          color: #c43c2dff;
          font-size: 1rem;
          font-weight: 600;
        }

        .booking-form-wrapper {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .booking-form-wrapper h3 {
          font-size: 1.8rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 25px;
          text-align: center;
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
          min-height: 100px;
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

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(234, 137, 102, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
      `}</style>

      <div className="booking-page">
        <div className="container">
          <div className="booking-header">
            <img
              src={wisLogoRed}
              alt="Women in STEM International Logo"
              className="booking-logo"
            />
            <h1>Book an Offer</h1>
            <p>
              Fill out the form below to book your spot for this offer.
            </p>
          </div>

          <div className="booking-container">
            <div className="offer-info">
              <h3>{offer.title}</h3>
              {offer.deadline && (
                <p className="deadline">
                  Deadline: {new Date(offer.deadline).toLocaleDateString()}
                </p>
              )}
              {offer.description && (
                <p style={{ color: '#4a5568', marginTop: '10px', lineHeight: '1.6' }}>
                  {offer.description}
                </p>
              )}
            </div>

            <div className="booking-form-wrapper">
              <h3>Your Information</h3>

              {submitted && (
                <div className="success-message">
                  ✓ Thank you! Your booking has been submitted successfully. Redirecting...
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="participant_name">Full Name *</label>
                  <input
                    type="text"
                    id="participant_name"
                    name="participant_name"
                    className="form-control"
                    value={formData.participant_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="participant_email">Email Address *</label>
                  <input
                    type="email"
                    id="participant_email"
                    name="participant_email"
                    className="form-control"
                    value={formData.participant_email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="participant_phone">Phone Number</label>
                  <input
                    type="tel"
                    id="participant_phone"
                    name="participant_phone"
                    className="form-control"
                    value={formData.participant_phone}
                    onChange={handleChange}
                    placeholder="+267 12345678"
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="organization">Organization / Institution</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="form-control"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Your organization or school"
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Additional Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any questions or special requests..."
                    disabled={submitting}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Booking'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferBooking;