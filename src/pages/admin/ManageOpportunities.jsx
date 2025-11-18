// src/pages/admin/ManageOpportunities.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOpportunities, deleteOpportunity } from '../../services/opportunityService';

const ManageOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await getAllOpportunities();
      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      setMessage('Error loading opportunities');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this opportunity?')) {
      return;
    }

    try {
      const { error } = await deleteOpportunity(id);
      if (error) throw error;
      
      setMessage('Opportunity deleted successfully');
      fetchOpportunities(); // Refresh the list
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      setMessage('Error deleting opportunity');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">Loading opportunities...</div>
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
            <h1>Manage Opportunities</h1>
            <Link to="/admin/opportunities/create" className="btn btn-primary">
              Create New Opportunity
            </Link>
          </div>

          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
              {message}
            </div>
          )}

          {opportunities.length === 0 ? (
            <div className="text-center py-5">
              <p className="lead">No opportunities found.</p>
              <Link to="/admin/opportunities/create" className="btn btn-primary">
                Create Your First Opportunity
              </Link>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Deadline</th>
                        <th>Website</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {opportunities.map((opportunity) => (
                        <tr key={opportunity.id}>
                          <td>{opportunity.title}</td>
                          <td>
                            <span 
                              className="badge" 
                              style={{ 
                                backgroundColor: getTypeColor(opportunity.type),
                                textTransform: 'capitalize'
                              }}
                            >
                              {opportunity.type}
                            </span>
                          </td>
                          <td>{formatDate(opportunity.deadline)}</td>
                          <td>
                            {opportunity.website_url ? (
                              <a 
                                href={opportunity.website_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                              >
                                Visit
                              </a>
                            ) : (
                              'No URL'
                            )}
                          </td>
                          <td>{formatDate(opportunity.created_at)}</td>
                          <td>
                            <div className="btn-group">
                              <Link 
                                to={`/admin/opportunities/edit/${opportunity.id}`}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(opportunity.id)}
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

// Helper function for type colors
const getTypeColor = (type) => {
  const colors = {
    scholarship: '#ea8966ff',
    workshop: '#a2544bff',
    competition: '#667eea',
    internship: '#48bb78',
    conference: '#9f7aea',
    default: '#c43c2dff'
  };
  return colors[type?.toLowerCase()] || colors.default;
};

export default ManageOpportunities;