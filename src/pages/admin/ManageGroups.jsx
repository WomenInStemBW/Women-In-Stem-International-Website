// src/pages/admin/ManageGroups.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllGroups, deleteGroup } from '../../services/opportunityService';

const ManageGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const { data, error } = await getAllGroups();
      if (error) throw error;
      setGroups(data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
      setMessage('Error loading groups');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this group? This will also delete all opportunities in this group.')) {
      return;
    }

    try {
      const { error } = await deleteGroup(id);
      if (error) throw error;
      
      setMessage('Group deleted successfully');
      fetchGroups(); // Refresh the list
    } catch (error) {
      console.error('Error deleting group:', error);
      setMessage('Error deleting group');
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">Loading groups...</div>
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
            <h1>Manage Opportunity Groups</h1>
            <Link to="/admin/groups/create" className="btn btn-primary">
              Create New Group
            </Link>
          </div>

          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
              {message}
            </div>
          )}

          {groups.length === 0 ? (
            <div className="text-center py-5">
              <p className="lead">No groups found.</p>
              <Link to="/admin/groups/create" className="btn btn-primary">
                Create Your First Group
              </Link>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Group Name</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups.map((group) => (
                        <tr key={group.id}>
                          <td>
                            {group.image_url ? (
                              <img 
                                src={group.image_url} 
                                alt={group.name}
                                style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }}
                              />
                            ) : (
                              <div style={{ 
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '5px', 
                                background: '#f8f9fa',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#6c757d'
                              }}>
                                📁
                              </div>
                            )}
                          </td>
                          <td>
                            <strong>{group.name}</strong>
                          </td>
                          <td>
                            {group.description && group.description.length > 100 
                              ? `${group.description.substring(0, 100)}...` 
                              : group.description || 'No description'}
                          </td>
                          <td>
                            {new Date(group.created_at).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="btn-group">
                              <Link 
                                to={`/admin/groups/edit/${group.id}`}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Edit
                              </Link>
                              <Link 
                                to={`/admin/opportunities?group=${group.id}`}
                                className="btn btn-sm btn-outline-success"
                              >
                                Opportunities
                              </Link>
                              <button
                                onClick={() => handleDelete(group.id)}
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

export default ManageGroups;