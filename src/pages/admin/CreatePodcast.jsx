// src/pages/admin/CreatePodcast.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEpisode, uploadEpisodeImage } from '../../services/podcastService';

const CreatePodcast = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    episode_number: '',
    spotify_url: '',
    speaker: '',
    episode_image: '',
    published: true
  });
  
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let episodeImageUrl = formData.episode_image;

      // Upload image if selected
      if (imageFile) {
        const { data, error: uploadError } = await uploadEpisodeImage(imageFile);
        if (uploadError) throw uploadError;
        episodeImageUrl = data.url;
      }

      const { data, error } = await createEpisode({
        ...formData,
        episode_number: parseInt(formData.episode_number),
        episode_image: episodeImageUrl
      });

      if (error) throw error;

      setMessage('Podcast episode created successfully!');
      setTimeout(() => {
        navigate('/admin/podcasts');
      }, 1500);
    } catch (error) {
      console.error('Error creating episode:', error);
      setMessage('Error creating episode. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Create New Podcast Episode</h1>
            <button
              onClick={() => navigate('/admin/podcasts')}
              className="btn btn-outline-secondary"
            >
              Back to Episodes
            </button>
          </div>

          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
              {message}
            </div>
          )}

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Episode Number *</label>
                  <input
                    type="number"
                    name="episode_number"
                    value={formData.episode_number}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter episode number"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter episode title"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="form-control"
                    placeholder="Enter episode description"
                  />
                </div>

                {/* Speaker Field - ADD THIS */}
                <div className="mb-3">
                  <label className="form-label">Speaker/Host</label>
                  <input
                    type="text"
                    name="speaker"
                    value={formData.speaker}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter speaker name"
                  />
                </div>

                {/* Episode Image - ADD THIS */}
                <div className="mb-3">
                  <label className="form-label">Episode Flyer Image</label>
                  <div
                    onClick={() => document.getElementById('episode-image').click()}
                    style={{
                      border: '2px dashed #dee2e6',
                      borderRadius: '8px',
                      padding: '30px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      minHeight: '250px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '400px',
                          borderRadius: '8px'
                        }}
                      />
                    ) : (
                      <div>
                        <p className="mb-2">📷 Click to upload episode flyer</p>
                        <p className="text-muted small">JPG, PNG (Recommended: 16:9 ratio)</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="episode-image"
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Spotify URL</label>
                  <input
                    type="url"
                    name="spotify_url"
                    value={formData.spotify_url}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="https://open.spotify.com/episode/..."
                  />
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="form-check-input"
                    id="publishedCheck"
                  />
                  <label className="form-check-label" htmlFor="publishedCheck">
                    Publish immediately
                  </label>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? 'Creating...' : 'Create Episode'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/podcasts')}
                    className="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePodcast;