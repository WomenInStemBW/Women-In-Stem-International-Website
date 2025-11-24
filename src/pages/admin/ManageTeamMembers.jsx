// src/pages/admin/ManageTeamMembers.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  getTeamById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  uploadTeamMemberImage,
  updateTeamMemberOrder
} from '../../services/teamService';
import SortableTableRow from '../../components/SortableTableRow';

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
  const [activeId, setActiveId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image_url: '',
    position: 0
  });

  // DND Kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      if (!file.type.startsWith('image/')) {
        setMessage('Please select a valid image file');
        return;
      }
      
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
      image_url: '',
      position: 0
    });
    setEditingMember(null);
    setShowAddForm(false);
    setUploading(false);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const newPosition = members.length;
      const { error } = await createTeamMember({
        ...formData,
        team_id: teamId,
        position: newPosition
      });
      
      if (error) throw error;

      setMessage('Team member added successfully!');
      resetForm();
      fetchTeamAndMembers();
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
      fetchTeamAndMembers();
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
      fetchTeamAndMembers();
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
      image_url: member.image_url || '',
      position: member.position || 0
    });
    setShowAddForm(true);
  };

  // Drag and drop handlers
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = members.findIndex((member) => member.id === active.id);
    const newIndex = members.findIndex((member) => member.id === over.id);

    const reorderedMembers = arrayMove(members, oldIndex, newIndex);
    setMembers(reorderedMembers);

    // Save to database
    try {
      const memberOrders = reorderedMembers.map((member, index) => ({
        id: member.id,
        position: index
      }));

      const { error } = await updateTeamMemberOrder(teamId, memberOrders);
      if (error) throw error;

      setMessage('Team member order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      setMessage('Error updating team member order');
      // Revert on error
      fetchTeamAndMembers();
    }
  };

  // Move member function (for up/down buttons)
  const moveMember = async (memberId, direction) => {
    const currentIndex = members.findIndex(m => m.id === memberId);
    if ((direction === 'up' && currentIndex === 0) ||
        (direction === 'down' && currentIndex === members.length - 1)) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const reorderedMembers = arrayMove(members, currentIndex, newIndex);
    setMembers(reorderedMembers);

    try {
      const memberOrders = reorderedMembers.map((member, index) => ({
        id: member.id,
        position: index
      }));

      const { error } = await updateTeamMemberOrder(teamId, memberOrders);
      if (error) throw error;

      setMessage(`Team member moved ${direction} successfully!`);
    } catch (error) {
      console.error('Error moving member:', error);
      setMessage('Error moving team member');
      fetchTeamAndMembers();
    }
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

          {/* Members List with Drag & Drop */}
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Team Members ({members.length})</h5>
                <small className="text-muted">Drag handles (⠿) or use arrows to reorder</small>
              </div>
              
              {members.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No team members yet. Click "Add Member" to get started.</p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: '120px' }}>Order</th>
                          <th style={{ width: '80px' }}>Image</th>
                          <th>Name</th>
                          <th>Role</th>
                          <th>Bio</th>
                          <th style={{ width: '220px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <SortableContext items={members.map(m => m.id)} strategy={verticalListSortingStrategy}>
                          {members.map((member, index) => (
                            <SortableTableRow
                              key={member.id}
                              member={member}
                              index={index}
                              onEdit={startEdit}
                              onDelete={handleDeleteMember}
                              onMove={moveMember}
                              isDragging={activeId === member.id}
                              totalMembers={members.length} 
                            />
                          ))}
                        </SortableContext>
                      </tbody>
                    </table>
                  </div>
                </DndContext>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTeamMembers;