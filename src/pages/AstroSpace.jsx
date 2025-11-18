import React, { useState, useEffect } from 'react';
import { getAllPublishedEpisodes } from '../services/podcastService';

const AstroSpace = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const { data, error } = await getAllPublishedEpisodes();
      if (error) throw error;
      setEpisodes(data || []);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '15px' }}>
            Astro-Space Talk Series
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#718096', maxWidth: '700px', margin: '0 auto' }}>
            Join us for engaging discussions about space exploration, astronomy, and the wonders of the universe.
          </p>
        </div>

        {/* Podcast Info */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '50px' }}>
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 style={{ color: '#c43c2dff', marginBottom: '20px' }}>About the Podcast</h2>
              <p style={{ color: '#4a5568', lineHeight: '1.8', fontSize: '1.05rem' }}>
                The Astro-Space Talk Series is a podcast dedicated to exploring the fascinating world of
                space science, astronomy, and technology. Our hosts bring you insightful conversations,
                interviews with experts, and discussions about the latest developments in space exploration.
              </p>
              <div style={{ marginTop: '25px' }}>
                <a
                  href="https://creators.spotify.com/pod/show/1xZW5J6ex9v5AjFuD6GK9Q/episodes"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(135deg, #ea8966ff 0%, #a2544bff 100%)',
                    color: 'white',
                    padding: '12px 30px',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontWeight: '600'
                  }}
                >
                  🎧 Listen on Spotify
                </a>
              </div>
            </div>
            <div className="col-md-4" style={{ textAlign: 'center', marginTop: '20px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem'
              }}>
                🎙️
              </div>
            </div>
          </div>
        </div>

        {/* Recent Episodes */}
        <div style={{ marginBottom: '50px', background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#2d3748', marginBottom: '30px' }}>Recent Episodes</h2>

          {loading ? (
            <p style={{ color: '#718096', textAlign: 'center' }}>Loading episodes...</p>
          ) : episodes.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center' }}>No episodes available yet. Check back soon!</p>
          ) : (
            <div className="row g-4">
              {episodes.map((episode) => (
                <div key={episode.id} className="col-md-6 col-lg-4">
                  <div style={{
                    background: '#f8f9fa',
                    padding: '25px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    height: '100%'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '5px',
                      display: 'inline-block',
                      marginBottom: '15px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      Episode {episode.episode_number}
                    </div>
                    <h4 style={{ color: '#2d3748', marginBottom: '15px' }}>{episode.title}</h4>
                    <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                      {episode.description}
                    </p>
                    {episode.spotify_url && (
                      <a
                        href={episode.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#c43c2dff',
                          textDecoration: 'none',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        🎧 Listen Now →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hosts Section */}
        <div>
          <h2 style={{ fontSize: '2rem', color: '#c43c2dff', marginBottom: '30px', textAlign: 'center' }}>
            Meet Our Hosts
          </h2>

          <div className="row g-4">
            {/* Host 1 */}
            <div className="col-md-4">
              <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center', height: '100%' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  overflow: 'hidden',
                  border: '4px solid #ea8966ff'
                }}>
                  <img
                    src="/src/assets/tumo.jpg" // Replace with your actual image path
                    alt="Host Name 1"
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
                  <div style={{
                    display: 'none',
                    background: 'linear-gradient(135deg, #ea8966ff 0%, #a2544bff 100%)',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: 'white'
                  }}>
                    👤
                  </div>
                </div>
                <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>Host Name 1</h4>
                <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '15px' }}>Title/Role</p>
                <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Brief bio and background information about the host will go here.
                  Their expertise and interests in space science.
                </p>
              </div>
            </div>

            {/* Host 2 */}
            <div className="col-md-4">
              <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center', height: '100%' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  overflow: 'hidden',
                  border: '4px solid #667eea'
                }}>
                  <img
                    src="/src/assets/keletso.jpg" // Replace with your actual image path
                    alt="Host Name 2"
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
                  <div style={{
                    display: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: 'white'
                  }}>
                    👤
                  </div>
                </div>
                <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>Host Name 2</h4>
                <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '15px' }}>Title/Role</p>
                <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Brief bio and background information about the host will go here.
                  Their expertise and interests in space science.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstroSpace;