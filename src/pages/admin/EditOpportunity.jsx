// src/pages/admin/EditOpportunity.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOpportunityById, updateOpportunity, getAllGroups } from '../../services/opportunityService';

const EditOpportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'scholarship',
    deadline: '',
    website_url: '',
    group_id: ''
  });
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [groupsLoading, setGroupsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchOpportunity();
    fetchGroups();
  }, [id]);

  const fetchGroups = async () => {
    try {
      const { data, error } = await getAllGroups();
      if (error) throw error;
      setGroups(data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
      setMessage('Error loading groups');
    } finally {
      setGroupsLoading(false);
    }
  };

  const fetchOpportunity = async () => {
    try {
      const { data, error } = await getOpportunityById(id);
      if (error) throw error;

      if (data) {
        // Format date for input field
        const formattedDeadline = data.deadline 
          ? new Date(data.deadline).toISOString().split('T')[0]
          : '';

        setFormData({
          title: data.title || '',
          description: data.description || '',
          type: data.type || 'scholarship',
          deadline: formattedDeadline,
          website_url: data.website_url || '',
          group_id: data.group_id || ''
        });
      }
    } catch (error) {
      console.error('Error fetching opportunity:', error);
      setMessage('Error loading opportunity');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const { data, error } = await updateOpportunity(id, formData);
      if (error) throw error;

      setMessage('Opportunity updated successfully!');
      setTimeout(() => {
        navigate('/admin/opportunities');
      }, 1500);
    } catch (error) {
      console.error('Error updating opportunity:', error);
      setMessage('Error updating opportunity. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">Loading opportunity...</div>
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
            <h1>Edit Opportunity</h1>
            <button 
              onClick={() => navigate('/admin/opportunities')}
              className="btn btn-outline-secondary"
            >
              Back to Opportunities
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
                  <label className="form-label">Opportunity Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
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

                <div className="mb-3">
                  <label className="form-label">Group *</label>
                  <select
                    name="group_id"
                    value={formData.group_id}
                    onChange={handleChange}
                    required
                    className="form-control"
                    disabled={groupsLoading}
                  >
                    <option value="">Select a group</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                  {groupsLoading && <div className="form-text">Loading groups...</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="scholarship">Scholarship</option>
                    <option value="workshop">Workshop</option>
                    <option value="competition">Competition</option>
                    <option value="internship">Internship</option>
                    <option value="conference">Conference</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Website URL</label>
                  <input
                    type="url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="form-control"
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                  >
                    {submitting ? 'Updating...' : 'Update Opportunity'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/opportunities')}
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

export default EditOpportunity;