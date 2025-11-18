// src/pages/admin/ManageTeams.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTeamsWithMembers, deleteTeam } from '../../services/teamService';

const ManageTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const { data, error } = await getAllTeamsWithMembers();
      if (error) throw error;
      setTeams(data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setMessage('Error loading teams');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team? This will also delete all team members.')) {
      return;
    }

    try {
      const { error } = await deleteTeam(id);
      if (error) throw error;
      
      setMessage('Team deleted successfully');
      fetchTeams(); // Refresh the list
    } catch (error) {
      console.error('Error deleting team:', error);
      setMessage('Error deleting team');
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">Loading teams...</div>
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
            <h1>Manage Teams</h1>
            <Link to="/admin/teams/create" className="btn btn-primary">
              Create New Team
            </Link>
          </div>

          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
              {message}
            </div>
          )}

          {teams.length === 0 ? (
            <div className="text-center py-5">
              <p className="lead">No teams found.</p>
              <Link to="/admin/teams/create" className="btn btn-primary">
                Create Your First Team
              </Link>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Team Name</th>
                        <th>Description</th>
                        <th>Members</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team) => (
                        <tr key={team.id}>
                          <td>
                            <strong>{team.name}</strong>
                          </td>
                          <td>
                            {team.description && team.description.length > 100 
                              ? `${team.description.substring(0, 100)}...` 
                              : team.description || 'No description'}
                          </td>
                          <td>
                            <span className="badge bg-primary">
                              {team.members?.length || 0} members
                            </span>
                          </td>
                          <td>
                            {new Date(team.created_at).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="btn-group">
                              <Link 
                                to={`/admin/teams/edit/${team.id}`}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Edit
                              </Link>
                              <Link 
                                to={`/admin/teams/members/${team.id}`}
                                className="btn btn-sm btn-outline-success"
                              >
                                Members
                              </Link>
                              <button
                                onClick={() => handleDelete(team.id)}
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

export default ManageTeams;