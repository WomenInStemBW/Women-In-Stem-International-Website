// src/pages/Teams.jsx
import React, { useState, useEffect } from 'react';
import { getAllTeamsWithMembers } from '../services/teamService';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const handleBackToTeams = () => {
    setSelectedTeam(null);
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Loading teams...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '15px' }}>
            Our Teams
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#718096', maxWidth: '700px', margin: '0 auto' }}>
            Meet the dedicated teams and members who make our organization thrive.
          </p>
        </div>

        {!selectedTeam ? (
          /* Teams Grid View */
          <div>
            {teams.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#718096', fontSize: '1.1rem' }}>No teams available at the moment.</p>
              </div>
            ) : (
              <div className="row g-4">
                {teams.map((team) => (
                  <div key={team.id} className="col-md-6 col-lg-4">
                    <div 
                      style={{ 
                        background: 'white', 
                        padding: '30px', 
                        borderRadius: '10px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                      onClick={() => handleTeamClick(team)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                      }}
                    >
                      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          margin: '0 auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                          color: 'white'
                        }}>
                          👥
                        </div>
                      </div>
                      <h3 style={{ color: '#2d3748', marginBottom: '15px', textAlign: 'center' }}>{team.name}</h3>
                      <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: '1.6', textAlign: 'center' }}>
                        {team.description || 'No description available.'}
                      </p>
                      <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                          {team.members?.length || 0} member{team.members?.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Team Detail View */
          <div>
            <button 
              onClick={handleBackToTeams}
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
              ← Back to Teams
            </button>

            <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ color: '#2d3748', marginBottom: '15px' }}>{selectedTeam.name}</h2>
                <p style={{ color: '#4a5568', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
                  {selectedTeam.description}
                </p>
              </div>

              <h3 style={{ color: '#c43c2dff', marginBottom: '30px', textAlign: 'center' }}>Team Members</h3>
              
              {selectedTeam.members && selectedTeam.members.length > 0 ? (
                <div className="row g-4">
                  {selectedTeam.members.map((member) => (
                    <div key={member.id} className="col-md-6 col-lg-4">
                      <div style={{ 
                        background: '#f8f9fa', 
                        padding: '25px', 
                        borderRadius: '10px', 
                        border: '1px solid #e2e8f0',
                        height: '100%',
                        textAlign: 'center'
                      }}>
                        <div style={{ 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          margin: '0 auto 15px',
                          overflow: 'hidden',
                          border: '3px solid #667eea'
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
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div style={{ 
                            display: member.image_url ? 'none' : 'flex',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                            width: '100%', 
                            height: '100%', 
                            borderRadius: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            color: 'white'
                          }}>
                            👤
                          </div>
                        </div>
                        <h4 style={{ color: '#2d3748', marginBottom: '8px' }}>{member.name}</h4>
                        {member.role && (
                          <p style={{ color: '#c43c2dff', fontSize: '0.9rem', fontWeight: '600', marginBottom: '10px' }}>
                            {member.role}
                          </p>
                        )}
                        {member.bio && (
                          <p style={{ color: '#4a5568', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            {member.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: '#718096' }}>No team members yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;