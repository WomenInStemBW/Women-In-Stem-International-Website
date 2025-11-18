// src/pages/admin/EditGroup.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGroupById, updateGroup, uploadImage } from '../../services/opportunityService';

const EditGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchGroup();
  }, [id]);

  const fetchGroup = async () => {
    try {
      const { data, error } = await getGroupById(id);
      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name || '',
          description: data.description || '',
          image_url: data.image_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching group:', error);
      setMessage('Error loading group');
    } finally {
      setLoading(false);
    }
  };

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
    setSubmitting(true);
    setMessage('');

    try {
      const { data, error } = await updateGroup(id, formData);
      if (error) throw error;

      setMessage('Group updated successfully!');
      setTimeout(() => {
        navigate('/admin/groups');
      }, 1500);
    } catch (error) {
      console.error('Error updating group:', error);
      setMessage('Error updating group. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">Loading group...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Edit Group</h1>
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
                    disabled={submitting}
                    className="btn btn-primary"
                  >
                    {submitting ? 'Updating...' : 'Update Group'}
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

export default EditGroup;