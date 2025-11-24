// src/pages/Teams.jsx
import React, { useState, useEffect } from 'react';
import { getAllTeamsWithMembers } from '../services/teamService';
import teamsPic from "../assets/teams.jpg";

const Teams = () => {
  const [teams, setTeams] = useState([]);
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
                <div style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }}>
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
                    <p style={{ color: '#667eea', fontSize: '0.9rem', fontWeight: '500', marginBottom: '15px' }}>
                      {member.teamName} Team
                    </p>
                  )}

                  {member.bio && (
                    <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;