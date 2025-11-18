// src/pages/admin/CreateGroup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGroup, uploadImage } from '../../services/opportunityService';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data, error } = await uploadImage(file);
      if (error) throw error;

      setFormData(prev => ({
        ...prev,
        image_url: data.url
      }));
      setMessage('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await createGroup(formData);
      if (error) throw error;

      setMessage('Group created successfully!');
      setTimeout(() => {
        navigate('/admin/groups');
      }, 1500);
    } catch (error) {
      console.error('Error creating group:', error);
      setMessage('Error creating group. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Create New Group</h1>
            <button 
              onClick={() => navigate('/admin/groups')}
              className="btn btn-outline-secondary"
            >
              Back to Groups
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
                  <label className="form-label">Group Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter group name"
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
                    placeholder="Enter group description..."
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Group Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="form-control"
                  />
                  {uploading && <div className="form-text">Uploading image...</div>}
                  {formData.image_url && (
                    <div className="mt-2">
                      <img 
                        src={formData.image_url} 
                        alt="Preview" 
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                      />
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? 'Creating...' : 'Create Group'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/groups')}
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

export default CreateGroup;