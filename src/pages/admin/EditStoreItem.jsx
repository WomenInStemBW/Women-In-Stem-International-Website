// src/pages/admin/EditStoreItem.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  getStoreItemById, 
  updateStoreItem, 
  uploadStoreImage, 
  deleteStoreImage 
} from '../../services/storeService';

const EditStoreItem = () => {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  
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

  

  useEffect(() => {
    loadItem();
  }, [itemId]);

  const loadItem = async () => {
    try {
      // Try to get item from location state first
      if (location.state?.item) {
        const item = location.state.item;
        setFormData({
          name: item.name,
          description: item.description || '',
          price: item.price.toString(),
          category: item.category || '',
          stock_quantity: item.stock_quantity,
          image_url: item.image_url,
          is_active: item.is_active
        });
        setImagePreview(item.image_url);
      } else {
        // Otherwise fetch from database
        const { data, error } = await getStoreItemById(itemId);
        if (error) throw error;
        
        setFormData({
          name: data.name,
          description: data.description || '',
          price: data.price.toString(),
          category: data.category || '',
          stock_quantity: data.stock_quantity,
          image_url: data.image_url,
          is_active: data.is_active
        });
        setImagePreview(data.image_url);
      }
    } catch (error) {
      console.error('Error loading item:', error);
      alert('Error loading item');
      navigate('/admin/store');
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

  setUploading(true);
  
  try {
    let imageUrl = formData.image_url;
    
    // Upload new image if file is selected
    if (imageFile) {
      const { data: uploadData, error: uploadError } = await uploadStoreImage(imageFile);
      if (uploadError) {
        console.error('Image upload error:', uploadError);
        throw new Error('Failed to upload image: ' + uploadError.message);
      }
      imageUrl = uploadData.url;

      // Delete old image if it exists and is different from new one
      if (formData.image_url && formData.image_url !== imageUrl) {
        try {
          await deleteStoreImage(formData.image_url);
        } catch (deleteError) {
          console.warn('Failed to delete old image:', deleteError);
          // Continue anyway - this is not critical
        }
      }
    }

    const itemData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock_quantity: parseInt(formData.stock_quantity) || 0,
      image_url: imageUrl,
      is_active: formData.is_active,
      updated_at: new Date().toISOString() // Add explicit updated_at timestamp
    };

    console.log('Sending update data:', itemData); // Debug log
    
    const { data: updatedItem, error } = await updateStoreItem(itemId, itemData);
    if (error) {
      console.error('Update service error:', error);
      throw error;
    }

    console.log('Update successful, response:', updatedItem); // Debug log
    alert('Item updated successfully!');
    navigate('/admin/store/manage');
  } catch (error) {
    console.error('Error updating item:', error);
    alert('Error updating item: ' + (error.message || 'Unknown error'));
  } finally {
    setUploading(false);
  }
};

  if (loading) {
    return (
      <div style={{ padding: '60px 0', minHeight: '100vh', background: '#f7fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Loading item...</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .edit-store-item {
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

      <div className="edit-store-item">
        <div className="container">
          <div className="page-header">
            <a href="/admin/store" className="back-link">← Back to Store Management</a>
            <h1 className="page-title">Edit Store Item</h1>
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
                <label className="form-label">Item Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input"
                  onChange={handleImageChange}
                />
                <small style={{ color: '#718096', display: 'block', marginTop: '5px' }}>
                  Leave empty to keep current image
                </small>
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
                  {uploading ? 'Updating...' : 'Update Item'}
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

export default EditStoreItem;