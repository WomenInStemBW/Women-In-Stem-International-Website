// src/pages/admin/CreateTeam.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeam } from '../../services/teamService';

const CreateTeam = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await createTeam(formData);
      if (error) throw error;

      setMessage('Team created successfully!');
      setTimeout(() => {
        navigate('/admin/teams');
      }, 1500);
    } catch (error) {
      console.error('Error creating team:', error);
      setMessage('Error creating team. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Create New Team</h1>
            <button 
              onClick={() => navigate('/admin/teams')}
              className="btn btn-outline-secondary"
            >
              Back to Teams
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
                  <label className="form-label">Team Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter team name"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="form-control"
                    placeholder="Enter team description and purpose..."
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? 'Creating...' : 'Create Team'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/teams')}
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

export default CreateTeam;