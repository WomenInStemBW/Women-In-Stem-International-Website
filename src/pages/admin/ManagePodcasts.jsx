// src/pages/admin/ManagePodcasts.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEpisodes, deleteEpisode, updateEpisode } from '../../services/podcastService';

const ManagePodcasts = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const { data, error } = await getAllEpisodes();
      if (error) throw error;
      setEpisodes(data || []);
    } catch (error) {
      console.error('Error fetching episodes:', error);
      setMessage('Error loading episodes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this episode?')) {
      return;
    }

    try {
      const { error } = await deleteEpisode(id);
      if (error) throw error;
      
      setMessage('Episode deleted successfully');
      fetchEpisodes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting episode:', error);
      setMessage('Error deleting episode');
    }
  };

  const handleTogglePublish = async (episode) => {
    try {
      const { error } = await updateEpisode(episode.id, {
        published: !episode.published
      });
      
      if (error) throw error;
      
      setMessage(`Episode ${!episode.published ? 'published' : 'unpublished'} successfully`);
      fetchEpisodes(); // Refresh the list
    } catch (error) {
      console.error('Error updating episode:', error);
      setMessage('Error updating episode');
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">Loading episodes...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Manage Podcast Episodes</h1>
            <Link to="/admin/podcasts/create" className="btn btn-primary">
              Create New Episode
            </Link>
          </div>

          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
              {message}
            </div>
          )}

          {episodes.length === 0 ? (
            <div className="text-center py-5">
              <p className="lead">No podcast episodes found.</p>
              <Link to="/admin/podcasts/create" className="btn btn-primary">
                Create Your First Episode
              </Link>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Episode #</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Spotify URL</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {episodes.map((episode) => (
                        <tr key={episode.id}>
                          <td>{episode.episode_number}</td>
                          <td>
                            <strong>{episode.title}</strong>
                          </td>
                          <td>
                            {episode.description && episode.description.length > 100 
                              ? `${episode.description.substring(0, 100)}...` 
                              : episode.description}
                          </td>
                          <td>
                            {episode.spotify_url ? (
                              <a 
                                href={episode.spotify_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                              >
                                View
                              </a>
                            ) : (
                              'No URL'
                            )}
                          </td>
                          <td>
                            <span 
                              className={`badge ${episode.published ? 'bg-success' : 'bg-secondary'}`}
                            >
                              {episode.published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td>
                            {new Date(episode.created_at).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="btn-group">
                              <button
                                onClick={() => handleTogglePublish(episode)}
                                className={`btn btn-sm ${episode.published ? 'btn-warning' : 'btn-success'}`}
                              >
                                {episode.published ? 'Unpublish' : 'Publish'}
                              </button>
                              <button
                                onClick={() => handleDelete(episode.id)}
                                className="btn btn-sm btn-outline-danger"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePodcasts;