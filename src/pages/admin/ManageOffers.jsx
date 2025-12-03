// src/pages/admin/ManageOffers.jsx
import React, { useState, useEffect } from 'react';
import { 
  getAllOffersAdmin, 
  createOffer, 
  updateOffer, 
  deleteOffer,
  toggleOfferStatus,
  uploadFlyer,
  deleteFlyer
} from '../../services/offerService';

const ManageOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    flyer_url: '',
    deadline: '',
    website_url: '',
    is_active: true
  });
  const [flyerFile, setFlyerFile] = useState(null);
  const [flyerPreview, setFlyerPreview] = useState(null);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const { data, error } = await getAllOffersAdmin();
      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error loading offers:', error);
      alert('Error loading offers');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFlyerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFlyerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFlyerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!editingOffer && !flyerFile) {
      alert('Please upload a flyer');
      return;
    }

    setUploading(true);
    
    try {
      let flyerUrl = formData.flyer_url;
      
      // Upload new flyer if file is selected
      if (flyerFile) {
        const { data: uploadData, error: uploadError } = await uploadFlyer(flyerFile);
        if (uploadError) throw uploadError;
        flyerUrl = uploadData.url;

        // Delete old flyer if updating
        if (editingOffer && editingOffer.flyer_url) {
          await deleteFlyer(editingOffer.flyer_url);
        }
      }

      const offerData = {
        ...formData,
        flyer_url: flyerUrl,
        deadline: formData.deadline || null
      };

      if (editingOffer) {
        const { error } = await updateOffer(editingOffer.id, offerData);
        if (error) throw error;
        alert('Offer updated successfully!');
      } else {
        const { error } = await createOffer(offerData);
        if (error) throw error;
        alert('Offer created successfully!');
      }

      resetForm();
      loadOffers();
    } catch (error) {
      console.error('Error saving offer:', error);
      alert('Error saving offer: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description || '',
      flyer_url: offer.flyer_url,
      deadline: offer.deadline ? offer.deadline.split('T')[0] : '',
      website_url: offer.website_url || '',
      is_active: offer.is_active
    });
    setFlyerPreview(offer.flyer_url);
    setShowForm(true);
  };

  const handleDelete = async (offer) => {
    if (!window.confirm(`Are you sure you want to delete "${offer.title}"?`)) return;
    
    try {
      // Delete flyer from storage
      if (offer.flyer_url) {
        await deleteFlyer(offer.flyer_url);
      }

      const { error } = await deleteOffer(offer.id);
      if (error) throw error;
      alert('Offer deleted successfully!');
      loadOffers();
    } catch (error) {
      console.error('Error deleting offer:', error);
      alert('Error deleting offer');
    }
  };

  const handleToggleStatus = async (offer) => {
    try {
      const { error } = await toggleOfferStatus(offer.id, !offer.is_active);
      if (error) throw error;
      loadOffers();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Error updating offer status');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      flyer_url: '',
      deadline: '',
      website_url: '',
      is_active: true
    });
    setFlyerFile(null);
    setFlyerPreview(null);
    setEditingOffer(null);
    setShowForm(false);
  };

  return (
    <>
      <style>{`
        .manage-offers {
          padding: 40px 0;
          min-height: 100vh;
          background: #f7fafc;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .page-title {
          font-size: 2rem;
          font-weight: bold;
          color: #2d3748;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #c43c2dff;
          color: white;
        }

        .btn-primary:hover {
          background: #a2544bff;
        }

        .btn-secondary {
          background: #718096;
          color: white;
        }

        .btn-secondary:hover {
          background: #4a5568;
        }

        .btn-danger {
          background: #e53e3e;
          color: white;
        }

        .btn-danger:hover {
          background: #c53030;
        }

        .form-container {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #2d3748;
          font-weight: 600;
        }

        .form-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #cbd5e0;
          border-radius: 6px;
          font-size: 1rem;
        }

        .form-input:focus {
          outline: none;
          border-color: #c43c2dff;
        }

        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .flyer-preview {
          margin-top: 15px;
          max-width: 300px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .flyer-preview img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .offers-grid {
          display: grid;
          gap: 20px;
        }

        .offer-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          gap: 20px;
        }

        .offer-flyer {
          flex-shrink: 0;
          width: 150px;
          height: 150px;
          border-radius: 8px;
          overflow: hidden;
          background: #f0f0f0;
        }

        .offer-flyer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .offer-content {
          flex: 1;
        }

        .offer-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .offer-description {
          color: #4a5568;
          margin-bottom: 10px;
          line-height: 1.6;
        }

        .offer-meta {
          color: #718096;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }

        .offer-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-right: 10px;
        }

        .status-active {
          background: #c6f6d5;
          color: #22543d;
        }

        .status-inactive {
          background: #fed7d7;
          color: #742a2a;
        }

        @media (max-width: 768px) {
          .offer-card {
            flex-direction: column;
          }

          .offer-flyer {
            width: 100%;
            height: 200px;
          }
        }
      `}</style>

      <div className="manage-offers">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Manage Offers</h1>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Add New Offer'}
            </button>
          </div>

          {showForm && (
            <div className="form-container">
              <h2 style={{ marginBottom: '20px', color: '#2d3748' }}>
                {editingOffer ? 'Edit Offer' : 'Create New Offer'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-input"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-input form-textarea"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Flyer Image {!editingOffer && '*'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-input"
                    onChange={handleFlyerChange}
                  />
                  {flyerPreview && (
                    <div className="flyer-preview">
                      <img src={flyerPreview} alt="Flyer preview" />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Deadline (Optional)</label>
                  <input
                    type="date"
                    name="deadline"
                    className="form-input"
                    value={formData.deadline}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Website URL (Optional)</label>
                  <input
                    type="url"
                    name="website_url"
                    className="form-input"
                    value={formData.website_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      name="is_active"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="is_active" style={{ margin: 0 }}>
                      Active (visible to public)
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={uploading}
                  >
                    {uploading ? 'Saving...' : (editingOffer ? 'Update Offer' : 'Create Offer')}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="offers-grid">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading offers...</div>
            ) : offers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '10px' }}>
                <p style={{ color: '#718096' }}>No offers yet. Create your first offer!</p>
              </div>
            ) : (
              offers.map((offer) => (
                <div key={offer.id} className="offer-card">
                  <div className="offer-flyer">
                    <img src={offer.flyer_url} alt={offer.title} />
                  </div>
                  
                  <div className="offer-content">
                    <div>
                      <span className={`status-badge ${offer.is_active ? 'status-active' : 'status-inactive'}`}>
                        {offer.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <h3 className="offer-title">{offer.title}</h3>
                    </div>
                    
                    <p className="offer-description">
                      {offer.description || 'No description'}
                    </p>
                    
                    <div className="offer-meta">
                      {offer.deadline && (
                        <div>Deadline: {new Date(offer.deadline).toLocaleDateString()}</div>
                      )}
                      {offer.website_url && (
                        <div>
                          <a href={offer.website_url} target="_blank" rel="noopener noreferrer">
                            View Website
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="offer-actions">
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleEdit(offer)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => handleToggleStatus(offer)}
                      >
                        {offer.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDelete(offer)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOffers;