// src/pages/Store.jsx
import React, { useState, useEffect } from 'react';
import { getAllStoreItems } from '../services/storeService';
import { useNavigate } from 'react-router-dom';
import girlPic from "../assets/girl_background.webp";

const Store = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await getAllStoreItems();
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching store items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView('detail');
  };

  const handleBackToList = () => {
    setSelectedItem(null);
    setView('list');
  };

  const handleRegister = (item) => {
    navigate(`/store/register/${item.id}`, { state: { item } });
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Loading store items...</div>
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
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '10px'
          }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '15px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Our Store
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'white',
              maxWidth: '700px',
              margin: '0 auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              Explore our products and services designed to support women in STEM.
            </p>
          </div>
        </div>

        {view === 'list' && (
          <div>
            <h2 style={{ fontSize: '2rem', color: '#c43c2dff', marginBottom: '30px' }}>Available Items</h2>
            
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#718096', fontSize: '1.1rem' }}>No items available at the moment.</p>
              </div>
            ) : (
              <div className="row g-4">
                {items.map((item) => (
                  <div key={item.id} className="col-md-6 col-lg-4">
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
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                      }}
                    >
                      <div style={{ 
                        width: '100%', 
                        height: '250px',
                        overflow: 'hidden',
                        background: '#f0f0f0'
                      }}>
                        <img 
                          src={item.image_url}
                          alt={item.name}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                          }}
                        />
                      </div>
                      
                      <div style={{ padding: '25px' }}>
                        <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>{item.name}</h4>
                        <p style={{ 
                          color: '#667eea',
                          fontSize: '1.3rem',
                          fontWeight: 'bold',
                          marginBottom: '15px'
                        }}>
                          P{item.price.toFixed(2)}
                        </p>
                        <p style={{ 
                          color: '#4a5568', 
                          fontSize: '0.95rem', 
                          lineHeight: '1.6',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {item.description || 'No description available.'}
                        </p>
                        {item.category && (
                          <p style={{ 
                            color: '#718096', 
                            fontSize: '0.85rem', 
                            marginTop: '15px',
                            textTransform: 'capitalize'
                          }}>
                            Category: {item.category}
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

        {view === 'detail' && selectedItem && (
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
              ← Back to Store
            </button>
            
            <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '10px' }}>{selectedItem.name}</h2>
              <p style={{ 
                color: '#667eea',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '30px'
              }}>
                P{selectedItem.price.toFixed(2)}
              </p>
              
              <div style={{ 
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                <img 
                  src={selectedItem.image_url}
                  alt={selectedItem.name}
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
                {selectedItem.category && (
                  <p style={{ 
                    color: '#718096', 
                    fontSize: '0.9rem', 
                    marginBottom: '15px',
                    textTransform: 'capitalize'
                  }}>
                    <strong>Category:</strong> {selectedItem.category}
                  </p>
                )}
                
                <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>Description</h3>
                <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '1.05rem' }}>
                  {selectedItem.description || 'No description available.'}
                </p>
              </div>

              <div style={{ marginTop: '30px' }}>
                <button
                  onClick={() => handleRegister(selectedItem)}
                  style={{ 
                    display: 'inline-block',
                    padding: '12px 30px',
                    background: '#c43c2dff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#a2544bff'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#c43c2dff'}
                >
                  Order →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;