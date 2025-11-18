// src/pages/BlogPost.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../services/blogService';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    const { data, error } = await getPostBySlug(slug);
    if (data) {
      setPost(data);
    } else {
      setError(error?.message || 'Post not found');
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#718096' }}>Loading post...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', color: '#2d3748', marginBottom: '20px' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', color: '#4a5568', marginBottom: '15px' }}>Blog Post Not Found</h2>
          <p style={{ color: '#718096', marginBottom: '25px' }}>The blog post you're looking for doesn't exist.</p>
          <a 
            href="/blog" 
            style={{ 
              padding: '12px 24px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .blog-post-page {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .post-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 80px 0 60px;
          position: relative;
        }

        .post-hero.with-image {
          background-size: cover;
          background-position: center;
          min-height: 400px;
        }

        .post-hero.with-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7));
        }

        .post-hero-content {
          position: relative;
          z-index: 1;
        }

        .back-link {
          color: white;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 20px;
          display: inline-block;
          opacity: 0.9;
        }

        .back-link:hover {
          opacity: 1;
        }

        .post-category {
          background: rgba(255,255,255,0.2);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 20px;
        }

        .post-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .post-meta {
          display: flex;
          gap: 30px;
          font-size: 1rem;
          opacity: 0.9;
        }

        .post-content-wrapper {
          background: white;
          margin-top: -40px;
          position: relative;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .post-content {
          padding: 60px;
          max-width: 800px;
          margin: 0 auto;
        }

        .post-content h1,
        .post-content h2,
        .post-content h3 {
          color: #2d3748;
          margin-top: 30px;
          margin-bottom: 15px;
          font-weight: bold;
        }

        .post-content h1 { font-size: 2.2rem; }
        .post-content h2 { font-size: 1.8rem; }
        .post-content h3 { font-size: 1.5rem; }

        .post-content p {
          color: #4a5568;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .post-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 30px 0;
        }

        .post-content ul,
        .post-content ol {
          color: #4a5568;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 20px;
          padding-left: 30px;
        }

        .post-content li {
          margin-bottom: 10px;
        }

        .post-content a {
          color: #667eea;
          text-decoration: underline;
        }

        .post-content a:hover {
          color: #764ba2;
        }

        .post-content blockquote {
          border-left: 4px solid #667eea;
          padding-left: 20px;
          margin: 30px 0;
          font-style: italic;
          color: #718096;
        }

        .post-footer {
          padding: 40px 60px;
          border-top: 2px solid #e2e8f0;
        }

        .share-section {
          text-align: center;
        }

        .share-title {
          font-size: 1.2rem;
          color: #2d3748;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .back-to-blog-btn {
          display: inline-block;
          padding: 12px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-to-blog-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          .post-title {
            font-size: 2rem;
          }

          .post-meta {
            flex-direction: column;
            gap: 10px;
          }

          .post-content {
            padding: 40px 25px;
          }

          .post-footer {
            padding: 30px 25px;
          }

          .post-content h1 { font-size: 1.8rem; }
          .post-content h2 { font-size: 1.5rem; }
          .post-content h3 { font-size: 1.3rem; }
          .post-content p { font-size: 1rem; }
        }
      `}</style>

      <div className="blog-post-page">
        {/* Hero Section */}
        <div 
          className={`post-hero ${post.cover_image ? 'with-image' : ''}`}
          style={post.cover_image ? { backgroundImage: `url(${post.cover_image})` } : {}}
        >
          <div className="container">
            <div className="post-hero-content">
              <a href="/blog" className="back-link">← Back to Blog</a>
              
              {post.category && (
                <div className="post-category">{post.category}</div>
              )}
              
              <h1 className="post-title">{post.title}</h1>
              
              <div className="post-meta">
                <span>By {post.author || 'Admin'}</span>
                <span>•</span>
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container">
          <div className="post-content-wrapper">
            <div 
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="post-footer">
              <div className="share-section">
                <h3 className="share-title">Enjoyed this post?</h3>
                <a href="/blog" className="back-to-blog-btn">
                  Read More Articles
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: '60px' }}></div>
      </div>
    </>
  );
};

export default BlogPost;