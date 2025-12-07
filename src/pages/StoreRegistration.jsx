// src/pages/StoreRegistration.jsx
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { submitStoreRegistration } from '../services/storeService';
import emailjs from '@emailjs/browser';
import wisLogoRed from "../assets/LOGO1 PNG@300x.png";
import telescopePic from "../assets/telescope.webp";

const StoreRegistration = () => {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    quantity: 1,
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
        store_item_id: itemId,
        item_name: item?.name || 'Unknown Item',
        ...formData
      };

      const { error: dbError } = await submitStoreRegistration(registrationData);
      if (dbError) throw dbError;

      // Send email via EmailJS
      const emailData = {
        item_name: item?.name || 'Unknown Item',
        item_price: item?.price ? item.price.toFixed(2) : '0.00',
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone || 'Not provided',
        quantity: formData.quantity.toString(),
        total_price: item?.price ? (item.price * formData.quantity).toFixed(2) : '0.00',
        message: formData.message || ''
      };

      await emailjs.send(
        'service_50i8omn', 
        'template_tgyh7wm', 
        emailData,
        'bi0rnHG6n43Pi4L2U' 
      );

      setSubmitted(true);
      
      // Redirect back to store after 3 seconds
      setTimeout(() => {
        navigate('/store');
      }, 3000);
    } catch (err) {
      console.error('Error submitting registration:', err);
      alert('Failed to submit registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!item) {
    return (
      <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <p>Item not found.</p>
          <button onClick={() => navigate('/store')} style={{ marginTop: '20px', padding: '10px 20px', background: '#c43c2dff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .registration-page {
          min-height: 100vh;
          background: url(${telescopePic}) center/cover no-repeat;
          padding: 60px 0;
          position: relative;
        }

        .registration-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 0;
        }

        .registration-page > .container {
          position: relative;
          z-index: 1;
        }

        .registration-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .registration-logo {
          max-width: 250px;
          margin: 0 auto 30px;
          display: block;
        }

        .registration-header h1 {
          font-size: 2.8rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 15px;
        }

        .registration-header p {
          font-size: 1.2rem;
          color: #4a5568;
          max-width: 600px;
          margin: 0 auto;
        }

        .registration-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .item-info {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .item-info h3 {
          color: #2d3748;
          margin-bottom: 10px;
        }

        .item-info .price {
          color: #667eea;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .registration-form-wrapper {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .registration-form-wrapper h3 {
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

      <div className="registration-page">
        <div className="container">
          <div className="registration-header">
            <img
              src={wisLogoRed}
              alt="Women in STEM International Logo"
              className="registration-logo"
            />
            <h1>Register Interest</h1>
            <p>
              Fill out the form below to register your interest in this item.
            </p>
          </div>

          <div className="registration-container">
            <div className="item-info">
              <h3>{item.name}</h3>
              <p className="price">P{item.price.toFixed(2)}</p>
            </div>

            <div className="registration-form-wrapper">
              <h3>Your Information</h3>

              {submitted && (
                <div className="success-message">
                  ✓ Thank you! Your registration has been submitted successfully. Redirecting...
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="customer_name">Full Name *</label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    className="form-control"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customer_email">Email Address *</label>
                  <input
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    className="form-control"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customer_phone">Phone Number</label>
                  <input
                    type="tel"
                    id="customer_phone"
                    name="customer_phone"
                    className="form-control"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    placeholder="+267 12345678"
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Quantity *</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-control"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    min="1"
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
                    placeholder="Any special requests or questions..."
                    disabled={submitting}
                  ></textarea>
                </div>

                <div style={{ marginBottom: '20px', padding: '15px', background: '#f7fafc', borderRadius: '8px' }}>
                  <p style={{ margin: 0, color: '#4a5568' }}>
                    <strong>Total:</strong> P{(item.price * formData.quantity).toFixed(2)}
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreRegistration;