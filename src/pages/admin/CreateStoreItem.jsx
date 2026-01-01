// src/pages/admin/CreateStoreItem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStoreItem, uploadStoreImage } from '../../services/storeService';

const CreateStoreItem = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock_quantity: 0,
    image_url: '',
    is_active: true
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter an item name');
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('Please enter a valid price');
      return;
    }

    if (!imageFile) {
      alert('Please upload an image');
      return;
    }

    setUploading(true);
    
    try {
      // Upload image
      const { data: uploadData, error: uploadError } = await uploadStoreImage(imageFile);
      if (uploadError) throw uploadError;

      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        image_url: uploadData.url
      };

      const { error } = await createStoreItem(itemData);
      if (error) throw error;

      alert('Item created successfully!');
      navigate('/admin/store/manage');
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Error creating item: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <style>{`
        .create-store-item {
          padding: 40px 0;
          min-height: 100vh;
          background: #f7fafc;
        }

        .page-header {
          margin-bottom: 30px;
        }

        .page-title {
          font-size: 2rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .back-link {
          color: #c43c2dff;
          text-decoration: none;
          font-weight: 600;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        .form-container {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          max-width: 800px;
          margin: 0 auto;
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

        .image-preview {
          margin-top: 15px;
          max-width: 300px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .image-preview img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #c43c2dff;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #a2544bff;
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #718096;
          color: white;
          margin-left: 10px;
        }

        .btn-secondary:hover {
          background: #4a5568;
        }
      `}</style>

      <div className="create-store-item">
        <div className="container">
          <div className="page-header">
            <a href="/admin/store/manage" className="back-link">← Back to Store Management</a>
            <h1 className="page-title">Create New Store Item</h1>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Item Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter item name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-input form-textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter item description"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Price (Pula) *</label>
                <input
                  type="number"
                  name="price"
                  className="form-input"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Books, Merchandise, Courses"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Stock Quantity</label>
                <input
                  type="number"
                  name="stock_quantity"
                  className="form-input"
                  value={formData.stock_quantity}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Item Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input"
                  onChange={handleImageChange}
                  required
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Item preview" />
                  </div>
                )}
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

              <div>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={uploading}
                >
                  {uploading ? 'Creating...' : 'Create Item'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => navigate('/admin/store/manage')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateStoreItem;