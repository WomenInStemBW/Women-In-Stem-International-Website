// src/pages/Teams.jsx
import React, { useState, useEffect } from 'react';
import { getAllTeamsWithMembers } from '../services/teamService';
import teamsPic from "../assets/teams.jpg";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const { data, error } = await getAllTeamsWithMembers();
      if (error) throw error;
      setTeams(data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Loading team members...</div>
      </div>
    );
  }

  // Get all team members from all teams
  const allMembers = teams.flatMap(team =>
    (team.members || [])
      .map(member => ({
        ...member,
        teamName: team.name
      }))
      .sort((a, b) => (a.position || 0) - (b.position || 0))
  );

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  position: relative;
  animation: slideUp 0.3s ease;
}

        /* Add this new class for the scrollable bio section */
.bio-scrollable {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 20px;
}

/* Scrollbar styling for bio section */
.bio-scrollable::-webkit-scrollbar {
  width: 6px;
}

.bio-scrollable::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.bio-scrollable::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.bio-scrollable::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .close-button {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #718096;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: #f7fafc;
          color: #2d3748;
        }

        .member-card {
          cursor: pointer;
          position: relative;
        }

        .member-card::after {
          content: 'Click to view bio';
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(102, 126, 234, 0.9);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .member-card:hover::after {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .modal-content {
            padding: 30px 20px;
          }
        }
      `}</style>

      <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa' }}>
        <div className="container">
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '50px',
            backgroundImage: `url(${teamsPic})`,
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
                Our Team
              </h1>
              <p style={{
                fontSize: '1.1rem',
                color: 'white',
                maxWidth: '700px',
                margin: '0 auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}>
                Meet the dedicated individuals who make our organization thrive.
              </p>
            </div>
          </div>

          {allMembers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#718096', fontSize: '1.1rem' }}>No team members available at the moment.</p>
            </div>
          ) : (
            <div className="row g-4">
              {allMembers.map((member) => (
                <div key={member.id} className="col-md-6 col-lg-4">
                  <div 
                    className="member-card"
                    style={{
                      background: 'white',
                      padding: '30px',
                      borderRadius: '15px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      height: '100%',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onClick={() => handleMemberClick(member)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                    }}
                  >
                    {/* Member Image */}
                    <div style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      margin: '0 auto 20px',
                      overflow: 'hidden',
                      border: '4px solid #667eea',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}>
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div style={{
                          display: 'flex',
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2.5rem',
                          color: 'white'
                        }}>
                          👤
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <h3 style={{ color: '#2d3748', marginBottom: '8px' }}>{member.name}</h3>

                    {member.role && (
                      <p style={{ color: '#c43c2dff', fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>
                        {member.role}
                      </p>
                    )}

                    {member.teamName && (
                      <p style={{ color: '#667eea', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0' }}>
                        {member.teamName} Team
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for member bio */}
{selectedMember && (
  <div className="modal-overlay" onClick={handleCloseModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={handleCloseModal}>
        ×
      </button>

      {/* Member Image */}
      <div style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        margin: '0 auto 25px',
        overflow: 'hidden',
        border: '4px solid #667eea',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        {selectedMember.image_url ? (
          <img
            src={selectedMember.image_url}
            alt={selectedMember.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'white'
          }}>
            👤
          </div>
        )}
      </div>

      {/* Member Details */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#2d3748', marginBottom: '10px' }}>
          {selectedMember.name}
        </h2>

        {selectedMember.role && (
          <p style={{ 
            color: '#c43c2dff', 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            marginBottom: '8px' 
          }}>
            {selectedMember.role}
          </p>
        )}

        {selectedMember.teamName && (
          <p style={{ 
            color: '#667eea', 
            fontSize: '1rem', 
            fontWeight: '500', 
            marginBottom: '25px' 
          }}>
            {selectedMember.teamName} Team
          </p>
        )}

        {selectedMember.bio ? (
          <div style={{ 
            textAlign: 'left',
            marginTop: '20px'
          }}>
            <h3 style={{ 
              color: '#2d3748', 
              fontSize: '1.1rem', 
              marginBottom: '15px' 
            }}>
              About
            </h3>
            <div className="bio-scrollable" style={{
              background: '#f7fafc',
              padding: '20px',
              borderRadius: '10px'
            }}>
              <p style={{ 
                color: '#4a5568', 
                fontSize: '1rem', 
                lineHeight: '1.7',
                margin: 0,
                whiteSpace: 'pre-wrap'
              }}>
                {selectedMember.bio}
              </p>
            </div>
          </div>
        ) : (
          <p style={{ 
            color: '#718096', 
            fontSize: '0.95rem',
            fontStyle: 'italic',
            marginTop: '20px'
          }}>
            No bio available.
          </p>
        )}
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Teams;