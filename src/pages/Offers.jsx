// src/pages/Offers.jsx
import React, { useState, useEffect } from 'react';
import { getAllOffers } from '../services/offerService';
import girlPic from "../assets/girl_background.webp";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'detail'

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await getAllOffers();
      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferClick = (offer) => {
    setSelectedOffer(offer);
    setView('detail');
  };

  const handleBackToList = () => {
    setSelectedOffer(null);
    setView('list');
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Loading offers...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container">
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
          backgroundImage: `url(${girlPic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '80px 20px',
          borderRadius: '10px',
          position: 'relative'
        }}>
          {/* Overlay for better text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '10px'
          }}></div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '15px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Our Offers
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'white',
              maxWidth: '700px',
              margin: '0 auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              Explore the services and programs we offer to support women in STEM.
            </p>
          </div>
        </div>

        {view === 'list' && (
          <div>
            <h2 style={{ fontSize: '2rem', color: '#c43c2dff', marginBottom: '30px' }}>Available Offers</h2>
            
            {offers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#718096', fontSize: '1.1rem' }}>No offers available at the moment.</p>
              </div>
            ) : (
              <div className="row g-4">
                {offers.map((offer) => (
                  <div key={offer.id} className="col-md-6 col-lg-4">
                    <div 
                      style={{ 
                        background: 'white', 
                        padding: '0', 
                        borderRadius: '10px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        overflow: 'hidden'
                      }}
                      onClick={() => handleOfferClick(offer)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                      }}
                    >
                      {/* Flyer Image */}
                      <div style={{ 
                        width: '100%', 
                        height: '250px',
                        overflow: 'hidden',
                        background: '#f0f0f0'
                      }}>
                        <img 
                          src={offer.flyer_url}
                          alt={offer.title}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                          }}
                        />
                      </div>
                      
                      {/* Content */}
                      <div style={{ padding: '25px' }}>
                        <h4 style={{ color: '#2d3748', marginBottom: '15px' }}>{offer.title}</h4>
                        <p style={{ 
                          color: '#4a5568', 
                          fontSize: '0.95rem', 
                          lineHeight: '1.6',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {offer.description || 'No description available.'}
                        </p>
                        {offer.deadline && (
                          <p style={{ color: '#718096', fontSize: '0.85rem', marginTop: '15px' }}>
                            Deadline: {new Date(offer.deadline).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'detail' && selectedOffer && (
          <div>
            <button 
              onClick={handleBackToList}
              style={{
                background: 'none',
                border: 'none',
                color: '#c43c2dff',
                cursor: 'pointer',
                fontSize: '1rem',
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ← Back to Offers
            </button>
            
            <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '30px' }}>{selectedOffer.title}</h2>
              
              {/* Flyer Display */}
              <div style={{ 
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                <img 
                  src={selectedOffer.flyer_url}
                  alt={selectedOffer.title}
                  style={{ 
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '600px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '20px', fontSize: '1.05rem' }}>
                  {selectedOffer.description || 'No description available.'}
                </p>
                
                {selectedOffer.deadline && (
                  <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '10px' }}>
                    <strong>Deadline:</strong> {new Date(selectedOffer.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>

              {selectedOffer.website_url && (
                <div style={{ marginTop: '30px' }}>
                  <a 
                    href={selectedOffer.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-block',
                      padding: '12px 30px',
                      background: '#c43c2dff',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontWeight: '600',
                      transition: 'background 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#a2544bff'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#c43c2dff'}
                  >
                    Visit Website →
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;