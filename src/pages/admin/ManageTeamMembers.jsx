// src/pages/admin/ManageTeamMembers.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeamById, createTeamMember, updateTeamMember, deleteTeamMember, uploadTeamMemberImage } from '../../services/teamService';

const ManageTeamMembers = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image_url: ''
  });

  useEffect(() => {
    fetchTeamAndMembers();
  }, [teamId]);

  const fetchTeamAndMembers = async () => {
    try {
      const { data, error } = await getTeamById(teamId);
      if (error) throw error;

      setTeam(data);
      setMembers(data.members || []);
    } catch (error) {
      console.error('Error fetching team and members:', error);
      setMessage('Error loading team members');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please select a valid image file');
        return;
      }
      
      // Validate file size (e.g., 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image size should be less than 5MB');
        return;
      }
      
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const { data, error } = await uploadTeamMemberImage(file);
      if (error) throw error;
      setFormData(prev => ({ ...prev, image_url: data.url }));
      setMessage('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' }));
    setMessage('Image removed');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      bio: '',
      image_url: ''
    });
    setEditingMember(null);
    setShowAddForm(false);
    setUploading(false);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const { error } = await createTeamMember({
        ...formData,
        team_id: teamId
      });
      
      if (error) throw error;

      setMessage('Team member added successfully!');
      resetForm();
      fetchTeamAndMembers(); // Refresh the list
    } catch (error) {
      console.error('Error adding team member:', error);
      setMessage('Error adding team member');
    }
  };

  const handleEditMember = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const { error } = await updateTeamMember(editingMember.id, formData);
      if (error) throw error;

      setMessage('Team member updated successfully!');
      resetForm();
      fetchTeamAndMembers(); // Refresh the list
    } catch (error) {
      console.error('Error updating team member:', error);
      setMessage('Error updating team member');
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    try {
      const { error } = await deleteTeamMember(memberId);
      if (error) throw error;

      setMessage('Team member deleted successfully');
      fetchTeamAndMembers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting team member:', error);
      setMessage('Error deleting team member');
    }
  };

  const startEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      role: member.role || '',
      bio: member.bio || '',
      image_url: member.image_url || ''
    });
    setShowAddForm(true);
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">Loading team members...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">Team not found.</div>
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
            <div>
              <h1>Manage Team Members</h1>
              <p className="text-muted mb-0">Team: <strong>{team.name}</strong></p>
            </div>
            <div className="d-flex gap-2">
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn btn-primary"
              >
                {showAddForm ? 'Cancel' : 'Add Member'}
              </button>
              <button 
                onClick={() => navigate('/admin/teams')}
                className="btn btn-outline-secondary"
              >
                Back to Teams
              </button>
            </div>
          </div>

          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
              {message}
            </div>
          )}

          {/* Add/Edit Member Form */}
          {showAddForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                </h5>
                <form onSubmit={editingMember ? handleEditMember : handleAddMember}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          className="form-control"
                          placeholder="Enter member name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Role</label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleFormChange}
                          className="form-control"
                          placeholder="Enter role (e.g., Team Lead, Member)"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleFormChange}
                      rows="3"
                      className="form-control"
                      placeholder="Enter member bio or description"
                    />
                  </div>

                  {/* Image Upload Section - NEW */}
                  <div className="mb-3">
                    <label className="form-label">Team Member Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                    {uploading && (
                      <div className="form-text text-primary">
                        <div className="spinner-border spinner-border-sm me-2" />
                        Uploading image...
                      </div>
                    )}
                    <div className="form-text">
                      Supported formats: JPG, PNG, GIF. Max size: 5MB
                    </div>
                    {formData.image_url && (
                      <div className="mt-2">
                        <img 
                          src={formData.image_url} 
                          alt="Team member preview" 
                          style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div>
                          <button 
                            type="button" 
                            className="btn btn-sm btn-outline-danger mt-1"
                            onClick={handleRemoveImage}
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-success"
                    >
                      {editingMember ? 'Update Member' : 'Add Member'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn btn-outline-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Members List */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Team Members ({members.length})</h5>
              
              {members.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No team members yet. Click "Add Member" to get started.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Bio</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => (
                        <tr key={member.id}>
                          <td>
                            {member.image_url ? (
                              <img 
                                src={member.image_url} 
                                alt={member.name}
                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                              />
                            ) : (
                              <div 
                                style={{ 
                                  width: '50px', 
                                  height: '50px', 
                                  backgroundColor: '#f8f9fa', 
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#6c757d',
                                  fontSize: '12px'
                                }}
                              >
                                No Image
                              </div>
                            )}
                          </td>
                          <td>
                            <strong>{member.name}</strong>
                          </td>
                          <td>{member.role || '-'}</td>
                          <td>
                            {member.bio && member.bio.length > 50 
                              ? `${member.bio.substring(0, 50)}...` 
                              : member.bio || '-'}
                          </td>
                          <td>
                            <div className="btn-group">
                              <button
                                onClick={() => startEdit(member)}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.id)}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTeamMembers;