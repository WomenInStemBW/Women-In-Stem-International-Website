// src/pages/admin/ManageStore.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAllStoreItemsAdmin, 
  deleteStoreItem,
  toggleStoreItemStatus,
  deleteStoreImage
} from '../../services/storeService';

const ManageStore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const { data, error } = await getAllStoreItemsAdmin();
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading store items:', error);
      alert('Error loading store items');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    navigate(`/admin/store/update/${item.id}`, { state: { item } });
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) return;
    
    try {
      // Delete image from storage
      if (item.image_url) {
        await deleteStoreImage(item.image_url);
      }

      const { error } = await deleteStoreItem(item.id);
      if (error) throw error;
      alert('Item deleted successfully!');
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      const { error } = await toggleStoreItemStatus(item.id, !item.is_active);
      if (error) throw error;
      loadItems();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Error updating item status');
    }
  };

  return (
    <>
      <style>{`
        .manage-store {
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

        .items-grid {
          display: grid;
          gap: 20px;
        }

        .item-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          gap: 20px;
        }

        .item-image {
          flex-shrink: 0;
          width: 150px;
          height: 150px;
          border-radius: 8px;
          overflow: hidden;
          background: #f0f0f0;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-content {
          flex: 1;
        }

        .item-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .item-price {
          color: #667eea;
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .item-description {
          color: #4a5568;
          margin-bottom: 10px;
          line-height: 1.6;
        }

        .item-meta {
          color: #718096;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }

        .item-actions {
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
          .item-card {
            flex-direction: column;
          }

          .item-image {
            width: 100%;
            height: 200px;
          }
        }
      `}</style>

      <div className="manage-store">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Manage Store</h1>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/admin/store/create')}
            >
              + Add New Item
            </button>
          </div>

          <div className="items-grid">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading items...</div>
            ) : items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '10px' }}>
                <p style={{ color: '#718096' }}>No items yet. Create your first item!</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-image">
                    <img src={item.image_url} alt={item.name} />
                  </div>
                  
                  <div className="item-content">
                    <div>
                      <span className={`status-badge ${item.is_active ? 'status-active' : 'status-inactive'}`}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <h3 className="item-title">{item.name}</h3>
                    </div>
                    
                    <p className="item-price">P{item.price.toFixed(2)}</p>
                    
                    <p className="item-description">
                      {item.description || 'No description'}
                    </p>
                    
                    <div className="item-meta">
                      {item.category && <div>Category: {item.category}</div>}
                      <div>Stock: {item.stock_quantity}</div>
                    </div>
                    
                    <div className="item-actions">
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => handleToggleStatus(item)}
                      >
                        {item.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDelete(item)}
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

export default ManageStore;