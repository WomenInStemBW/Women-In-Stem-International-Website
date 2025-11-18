import React, { useState, useEffect } from 'react';
import { getAllPosts, deletePost } from '../../services/blogService';

const ManageBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  console.log('🔴 ManageBlogs rendering, deleteConfirm:', deleteConfirm);


  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const { data, error } = await getAllPosts();
    if (data) {
      setPosts(data);
    } else {
      console.error('Error loading posts:', error);
    }
    setLoading(false);
  };

  const handleDeleteClick = (postId) => {
    console.log('🖱️ Delete button clicked for post:', postId);
    console.log('🎯 Before setDeleteConfirm, deleteConfirm is:', deleteConfirm);
    setDeleteConfirm(postId);
    console.log('🎯 After setDeleteConfirm, deleteConfirm should be:', postId);

    // Force a state check
    setTimeout(() => {
      console.log('📝 In setTimeout, deleteConfirm is now:', deleteConfirm);
    }, 100);
  };

  const handleDelete = async (id) => {
    console.log('🗑️ Handling delete for post:', id);

    const { error } = await deletePost(id);

    if (!error) {
      console.log('✅ Delete successful, updating UI');
      setPosts(posts.filter(post => post.id !== id));
      setDeleteConfirm(null);
    } else {
      console.log('❌ Delete failed:', error);
      alert('Error deleting post: ' + error.message);
      setDeleteConfirm(null); // Close modal even on error
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <style>{`
        .manage-blogs {
          min-height: 100vh;
          background: #f7fafc;
          padding: 40px 0;
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
          margin: 0;
        }

        .create-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .create-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .back-link {
          margin-bottom: 20px;
        }

        .back-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .back-link a:hover {
          color: #764ba2;
        }

        .posts-table {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table thead {
          background: #f7fafc;
          border-bottom: 2px solid #e2e8f0;
        }

        .table th {
          padding: 15px;
          text-align: left;
          font-weight: 600;
          color: #4a5568;
          font-size: 0.9rem;
          text-transform: uppercase;
        }

        .table td {
          padding: 15px;
          border-bottom: 1px solid #e2e8f0;
          color: #2d3748;
        }

        .table tbody tr:hover {
          background: #f7fafc;
        }

        .post-title {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 5px;
        }

        .post-excerpt {
          color: #718096;
          font-size: 0.9rem;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .status-published {
          background: #c6f6d5;
          color: #22543d;
        }

        .status-draft {
          background: #fed7d7;
          color: #742a2a;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-edit {
          background: #667eea;
          color: white;
        }

        .btn-edit:hover {
          background: #5568d3;
        }

        .btn-delete {
          background: #c43c2dff;
          color: white;
        }

        .btn-delete:hover {
          background: #a2544bff;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #718096;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-state h3 {
          color: #2d3748;
          margin-bottom: 10px;
        }

        .empty-state p {
          color: #718096;
          margin-bottom: 20px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          padding: 30px;
          border-radius: 10px;
          max-width: 400px;
          width: 90%;
        }

        .modal h3 {
          color: #2d3748;
          margin-bottom: 15px;
        }

        .modal p {
          color: #718096;
          margin-bottom: 20px;
        }

        .modal-buttons {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .btn-cancel {
          background: #e2e8f0;
          color: #4a5568;
        }

        .btn-confirm {
          background: #c43c2dff;
          color: white;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }

          .table {
            font-size: 0.85rem;
          }

          .table th, .table td {
            padding: 10px;
          }
        }
      `}</style>

      <div className="manage-blogs">
        <div className="container">
          <div className="back-link">
            <a href="/admin">← Back to Dashboard</a>
          </div>

          <div className="page-header">
            <h1 className="page-title">Manage Blog Posts</h1>
            <a href="/admin/blogs/create" className="create-btn">
              + Create New Post
            </a>
          </div>

          {loading ? (
            <div className="posts-table">
              <div className="loading">
                <p>Loading posts...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="posts-table">
              <div className="empty-state">
                <h3>No blog posts yet</h3>
                <p>Create your first blog post to get started!</p>
                <a href="/admin/blogs/create" className="create-btn">
                  Create Your First Post
                </a>
              </div>
            </div>
          ) : (
            <div className="posts-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <div className="post-title">{post.title}</div>
                        <div className="post-excerpt">
                          {post.excerpt?.substring(0, 100)}...
                        </div>
                      </td>
                      <td>{post.author || 'Admin'}</td>
                      <td>{formatDate(post.created_at)}</td>
                      <td>
                        <span className={`status-badge ${post.published ? 'status-published' : 'status-draft'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <a
                            href={`/admin/blogs/edit/${post.id}`}
                            className="btn btn-edit"
                          >
                            Edit
                          </a>
                          <button
                            onClick={() => handleDeleteClick(post.id)}
                            className="btn btn-delete"
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

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }} onClick={() => setDeleteConfirm(null)}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: '#2d3748', marginBottom: '15px', fontSize: '1.3rem' }}>
              Confirm Delete
            </h3>
            <p style={{ color: '#718096', marginBottom: '20px', lineHeight: '1.5' }}>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: '8px 16px',
                  background: '#e2e8f0',
                  color: '#4a5568',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                style={{
                  padding: '8px 16px',
                  background: '#c43c2d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageBlogs;