import React, { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useAuth } from '../../context/AuthContext';
import { createPost, uploadImage } from '../../services/blogService';

const CreateBlog = () => {
  const { user } = useAuth();
  const [editor] = useState(() => withReact(createEditor()));

  console.log('🔴 CreateBlog component is rendering');
  
  // Initial value for Slate editor
  const [content, setContent] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    cover_image: '',
    author: user?.username || 'Admin',
    category: '',
    published: false
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImageSelect = (e) => {
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
    setLoading(true);
    setError('');

    try {
      let coverImageUrl = formData.cover_image;

      // Upload image if selected
      if (imageFile) {
        const { data, error: uploadError } = await uploadImage(imageFile);
        if (uploadError) throw uploadError;
        coverImageUrl = data.url;
      }

      // Convert Slate content to HTML for storage
      const htmlContent = serialize(content);

      // Create blog post
      const postData = {
        ...formData,
        content: htmlContent,
        cover_image: coverImageUrl
      };

      const { data, error: createError } = await createPost(postData);
      
      if (createError) throw createError;

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/admin/blogs';
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to create blog post');
      setLoading(false);
    }
  };

  // Basic serialization function to convert Slate content to HTML
  const serialize = (nodes) => {
    return nodes.map(n => {
      if (n.type === 'paragraph') {
        return `<p>${n.children.map(child => child.text).join('')}</p>`;
      }
      if (n.type === 'heading-one') {
        return `<h1>${n.children.map(child => child.text).join('')}</h1>`;
      }
      if (n.type === 'heading-two') {
        return `<h2>${n.children.map(child => child.text).join('')}</h2>`;
      }
      if (n.type === 'heading-three') {
        return `<h3>${n.children.map(child => child.text).join('')}</h3>`;
      }
      if (n.type === 'bulleted-list') {
        return `<ul>${n.children.map(child => `<li>${child.children.map(c => c.text).join('')}</li>`).join('')}</ul>`;
      }
      if (n.type === 'numbered-list') {
        return `<ol>${n.children.map(child => `<li>${child.children.map(c => c.text).join('')}</li>`).join('')}</ol>`;
      }
      if (n.type === 'list-item') {
        return `<li>${n.children.map(child => child.text).join('')}</li>`;
      }
      // Handle text formatting
      let text = n.text || '';
      if (n.bold) text = `<strong>${text}</strong>`;
      if (n.italic) text = `<em>${text}</em>`;
      if (n.underline) text = `<u>${text}</u>`;
      return text;
    }).join('');
  };

  // Define a rendering function based on the element type.
  const renderElement = (props) => {
    switch (props.element.type) {
      case 'heading-one':
        return <h1 {...props.attributes}>{props.children}</h1>;
      case 'heading-two':
        return <h2 {...props.attributes}>{props.children}</h2>;
      case 'heading-three':
        return <h3 {...props.attributes}>{props.children}</h3>;
      case 'bulleted-list':
        return <ul {...props.attributes}>{props.children}</ul>;
      case 'numbered-list':
        return <ol {...props.attributes}>{props.children}</ol>;
      case 'list-item':
        return <li {...props.attributes}>{props.children}</li>;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  };

  // Define a leaf rendering function that marks text as bold, italic, etc.
  const renderLeaf = (props) => {
    let { children, attributes, leaf } = props;
    
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
    
    if (leaf.italic) {
      children = <em>{children}</em>;
    }
    
    if (leaf.underline) {
      children = <u>{children}</u>;
    }
    
    return <span {...attributes}>{children}</span>;
  };

  return (
    <>
      <style>{`
        .create-blog {
          min-height: 100vh;
          background: #f7fafc;
          padding: 40px 0;
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
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 20px;
          display: inline-block;
        }

        .back-link:hover {
          color: #764ba2;
        }

        .form-container {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .form-label.required::after {
          content: '*';
          color: #c43c2dff;
          margin-left: 4px;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .slate-editor {
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 15px;
          min-height: 300px;
          font-size: 1rem;
          line-height: 1.6;
        }

        .slate-editor:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .slate-editor h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }

        .slate-editor h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.8rem 0;
        }

        .slate-editor h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.6rem 0;
        }

        .slate-editor ul, .slate-editor ol {
          padding-left: 2rem;
          margin: 1rem 0;
        }

        .slate-editor li {
          margin: 0.5rem 0;
        }

        .image-upload-area {
          border: 2px dashed #e2e8f0;
          border-radius: 8px;
          padding: 30px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .image-upload-area:hover {
          border-color: #667eea;
          background: #f7fafc;
        }

        .image-upload-area.has-image {
          border-style: solid;
          border-color: #667eea;
        }

        .image-preview {
          max-width: 100%;
          max-height: 300px;
          border-radius: 8px;
          margin-top: 15px;
        }

        .file-input {
          display: none;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .checkbox-input {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          margin-top: 30px;
          padding-top: 30px;
          border-top: 2px solid #e2e8f0;
        }

        .btn {
          padding: 12px 30px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: #e2e8f0;
          color: #4a5568;
        }

        .btn-secondary:hover {
          background: #cbd5e0;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-message {
          background: #c6f6d5;
          color: #22543d;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #22543d;
        }

        .error-message {
          background: #fed7d7;
          color: #c53030;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #c53030;
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 20px;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="create-blog">
        <div className="container">
          <a href="/admin/blogs" className="back-link">
            ← Back to Manage Blogs
          </a>

          <div className="page-header">
            <h1 className="page-title">Create New Blog Post</h1>
          </div>

          {success && (
            <div className="success-message">
              ✓ Blog post created successfully! Redirecting...
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="form-group">
                <label htmlFor="title" className="form-label required">
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog post title"
                  required
                  disabled={loading}
                />
              </div>

              {/* Excerpt */}
              <div className="form-group">
                <label htmlFor="excerpt" className="form-label">
                  Excerpt (Short Summary)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  className="form-textarea"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Brief description of the blog post (shown in cards)"
                  disabled={loading}
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., STEM Education, Space Science, News"
                  disabled={loading}
                />
              </div>

              {/* Cover Image */}
              <div className="form-group">
                <label className="form-label">Cover Image</label>
                <div 
                  className={`image-upload-area ${imagePreview ? 'has-image' : ''}`}
                  onClick={() => document.getElementById('cover-image').click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  ) : (
                    <div>
                      <p style={{ color: '#718096', marginBottom: '10px' }}>
                        📷 Click to upload cover image
                      </p>
                      <p style={{ color: '#a0aec0', fontSize: '0.85rem' }}>
                        JPG, PNG or GIF (Max 5MB)
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="cover-image"
                  className="file-input"
                  accept="image/*"
                  onChange={handleImageSelect}
                  disabled={loading}
                />
              </div>

              {/* Content Editor - Now using Slate */}
              <div className="form-group">
                <label className="form-label required">Content</label>
                <div className="slate-editor">
                  <Slate
                    editor={editor}
                    initialValue={content}
                    onChange={handleContentChange}
                  >
                    <Editable
                      renderElement={renderElement}
                      renderLeaf={renderLeaf}
                      placeholder="Write your blog post content here..."
                      style={{
                        minHeight: '300px',
                        outline: 'none'
                      }}
                    />
                  </Slate>
                </div>
              </div>

              {/* Author */}
              <div className="form-group">
                <label htmlFor="author" className="form-label">
                  Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className="form-input"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author name"
                  disabled={loading}
                />
              </div>

              {/* Publish Toggle */}
              <div className="form-group">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    className="checkbox-input"
                    checked={formData.published}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <label htmlFor="published" className="form-label" style={{ marginBottom: 0 }}>
                    Publish immediately
                  </label>
                </div>
                <p style={{ color: '#718096', fontSize: '0.85rem', marginTop: '5px', marginLeft: '30px' }}>
                  If unchecked, post will be saved as draft
                </p>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || !formData.title || !content[0].children[0].text}
                >
                  {loading ? 'Creating...' : 'Create Blog Post'}
                </button>
                <a href="/admin/blogs" className="btn btn-secondary">
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;