// src/pages/News.jsx
import React, { useState, useEffect } from 'react';
import { getAllGroupsWithOpportunities } from '../services/opportunityService';

const News = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('groups'); // 'groups', 'group', or 'opportunity'

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const { data, error } = await getAllGroupsWithOpportunities();
      if (error) throw error;
      setGroups(data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setView('group');
  };

  const handleOpportunityClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setView('opportunity');
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setSelectedOpportunity(null);
    setView('groups');
  };

  const handleBackToGroup = () => {
    setSelectedOpportunity(null);
    setView('group');
  };

  const getTypeColor = (type) => {
    const colors = {
      scholarship: '#ea8966ff',
      workshop: '#a2544bff',
      competition: '#667eea',
      internship: '#48bb78',
      conference: '#9f7aea',
      default: '#c43c2dff'
    };
    return colors[type?.toLowerCase()] || colors.default;
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Loading opportunities...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '15px' }}>
            Opportunities
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#718096', maxWidth: '700px', margin: '0 auto' }}>
            Discover the latest opportunities in STEM, Astronomy, and Space industries.
          </p>
        </div>

        {view === 'groups' && (
          <div>
            <h2 style={{ fontSize: '2rem', color: '#c43c2dff', marginBottom: '30px' }}>Opportunity Categories</h2>
            
            {groups.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#718096', fontSize: '1.1rem' }}>No opportunity categories available at the moment.</p>
              </div>
            ) : (
              <div className="row g-4">
                {groups.map((group) => (
                  <div key={group.id} className="col-md-6 col-lg-4">
                    <div 
                      style={{ 
                        background: 'white', 
                        padding: '30px', 
                        borderRadius: '10px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        textAlign: 'center'
                      }}
                      onClick={() => handleGroupClick(group)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                      }}
                    >
                      {group.image_url ? (
                        <div style={{ 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          margin: '0 auto 20px',
                          overflow: 'hidden',
                          border: '4px solid #667eea'
                        }}>
                          <img 
                            src={group.image_url}
                            alt={group.name}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover' 
                            }}
                          />
                        </div>
                      ) : (
                        <div style={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          margin: '0 auto 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                          color: 'white'
                        }}>
                          📁
                        </div>
                      )}
                      <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>{group.name}</h3>
                      <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                        {group.description || 'No description available.'}
                      </p>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                          {group.opportunities?.length || 0} opportunity{group.opportunities?.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'group' && selectedGroup && (
          <div>
            <button 
              onClick={handleBackToGroups}
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
              ← Back to Categories
            </button>

            <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 style={{ color: '#2d3748', marginBottom: '15px' }}>{selectedGroup.name}</h2>
                  <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '1.1rem' }}>
                    {selectedGroup.description}
                  </p>
                </div>
                {selectedGroup.image_url && (
                  <div className="col-md-4" style={{ textAlign: 'center' }}>
                    <div style={{ 
                      width: '120px', 
                      height: '120px', 
                      borderRadius: '50%', 
                      margin: '0 auto',
                      overflow: 'hidden',
                      border: '4px solid #667eea'
                    }}>
                      <img 
                        src={selectedGroup.image_url}
                        alt={selectedGroup.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h3 style={{ fontSize: '1.8rem', color: '#c43c2dff', marginBottom: '30px' }}>Available Opportunities</h3>
            
            {selectedGroup.opportunities && selectedGroup.opportunities.length > 0 ? (
              <div className="row g-4">
                {selectedGroup.opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="col-md-6 col-lg-4">
                    <div 
                      style={{ 
                        background: 'white', 
                        padding: '25px', 
                        borderRadius: '10px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                      onClick={() => handleOpportunityClick(opportunity)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                      }}
                    >
                      <div 
                        style={{ 
                          background: getTypeColor(opportunity.type), 
                          color: 'white', 
                          padding: '5px 15px', 
                          borderRadius: '5px', 
                          display: 'inline-block', 
                          marginBottom: '15px', 
                          fontSize: '0.85rem',
                          textTransform: 'capitalize'
                        }}
                      >
                        {opportunity.type || 'Opportunity'}
                      </div>
                      <h4 style={{ color: '#2d3748', marginBottom: '15px' }}>{opportunity.title}</h4>
                      <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {opportunity.description || 'No description available.'}
                      </p>
                      <p style={{ color: '#718096', fontSize: '0.85rem', marginTop: '15px' }}>
                        Deadline: {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : 'TBA'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '10px' }}>
                <p style={{ color: '#718096', fontSize: '1.1rem' }}>No opportunities available in this category.</p>
              </div>
            )}
          </div>
        )}

        {view === 'opportunity' && selectedOpportunity && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <button 
                onClick={handleBackToGroup}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#c43c2dff',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ← Back to {selectedGroup?.name}
              </button>
              <button 
                onClick={handleBackToGroups}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#718096',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                View All Categories
              </button>
            </div>
            
            <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '30px' }}>{selectedOpportunity.title}</h2>
              
              <div style={{ marginBottom: '30px' }}>
                <div 
                  style={{ 
                    background: getTypeColor(selectedOpportunity.type), 
                    color: 'white', 
                    padding: '5px 15px', 
                    borderRadius: '5px', 
                    display: 'inline-block', 
                    fontSize: '0.9rem',
                    textTransform: 'capitalize',
                    marginBottom: '20px'
                  }}
                >
                  {selectedOpportunity.type || 'Opportunity'}
                </div>
                
                <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '20px' }}>
                  {selectedOpportunity.description || 'No description available.'}
                </p>
                
                <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '10px' }}>
                  <strong>Deadline:</strong> {selectedOpportunity.deadline ? new Date(selectedOpportunity.deadline).toLocaleDateString() : 'TBA'}
                </p>
              </div>

              {selectedOpportunity.website_url && (
                <div>
                  <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>Opportunity Details</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ textAlign: 'left', padding: '12px', color: '#2d3748', fontWeight: '600' }}>Opportunity Name</th>
                        <th style={{ textAlign: 'left', padding: '12px', color: '#2d3748', fontWeight: '600' }}>Website Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px', color: '#4a5568' }}>{selectedOpportunity.title}</td>
                        <td style={{ padding: '12px' }}>
                          <a 
                            href={selectedOpportunity.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                              color: '#c43c2dff', 
                              textDecoration: 'none',
                              fontWeight: '600'
                            }}
                          >
                            Visit Website →
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;