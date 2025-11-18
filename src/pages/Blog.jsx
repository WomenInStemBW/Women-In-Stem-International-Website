import React, { useState, useEffect } from 'react';
import { getAllPublishedPosts } from '../services/blogService';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Add this line
  const postsPerPage = 3; // Add this line

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await getAllPublishedPosts();
    if (data) {
      setPosts(data);
    } else {
      console.error('Error loading posts:', error);
    }
    setLoading(false);

    console.log('Posts loaded:', posts.length);
    console.log('Current index:', currentIndex);
    console.log('Should show carousel:', posts.length > postsPerPage);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const nextSlide = () => {
  setCurrentIndex((prevIndex) => 
    prevIndex + postsPerPage >= posts.length ? 0 : prevIndex + postsPerPage
  );
};

const prevSlide = () => {
  setCurrentIndex((prevIndex) => 
    prevIndex - postsPerPage < 0 ? posts.length - postsPerPage : prevIndex - postsPerPage
  );
};

  return (
    <>
      <style>{`

        .carousel-controls {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 40px;
          }

          .carousel-btn {
             width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .carousel-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
          }

        .blog-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 60px 0;
        }

        .blog-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .blog-title {
          font-size: 2.8rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 15px;
        }

        .blog-subtitle {
          font-size: 1.2rem;
          color: #718096;
          max-width: 600px;
          margin: 0 auto;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .blog-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }

        .blog-card-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
        }

        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-card-content {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-card-meta {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 12px;
          font-size: 0.85rem;
          color: #718096;
        }

        .blog-card-category {
          background: #667eea;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.75rem;
        }

        .blog-card-title {
          font-size: 1.4rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .blog-card-excerpt {
          color: #4a5568;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 15px;
          flex: 1;
        }

        .blog-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px solid #e2e8f0;
        }

        .blog-card-author {
          color: #718096;
          font-size: 0.9rem;
        }

        .blog-card-read-more {
          color: #667eea;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .loading-container {
          text-align: center;
          padding: 60px 20px;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .empty-state p {
          color: #718096;
          font-size: 1.05rem;
        }

        @media (max-width: 768px) {
          .blog-title {
            font-size: 2rem;
          }

          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="blog-page">
        <div className="container">
          <div className="blog-header">
            <h1 className="blog-title">Our Blog</h1>
            <p className="blog-subtitle">
              Stay updated with the latest news, insights, and stories from Women in STEM
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p style={{ color: '#718096' }}>Loading blog posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <h3>No blog posts yet</h3>
              <p>Check back soon for exciting content!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.slice(currentIndex, currentIndex + postsPerPage).map((post) => (
                <a 
                  href={`/blog/${post.slug}`} 
                  key={post.id}
                  className="blog-card"
                >
                  <div className="blog-card-image">
                    {post.cover_image ? (
                      <img src={post.cover_image} alt={post.title} />
                    ) : (
                      '📝'
                    )}
                  </div>
                  
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      {post.category && (
                        <span className="blog-card-category">{post.category}</span>
                      )}
                      <span>{formatDate(post.created_at)}</span>
                    </div>

                    <h3 className="blog-card-title">{post.title}</h3>
                    
                    <p className="blog-card-excerpt">
                      {post.excerpt || stripHtml(post.content).substring(0, 150) + '...'}
                    </p>

                    <div className="blog-card-footer">
                      <span className="blog-card-author">
                        By {post.author || 'Admin'}
                      </span>
                      <span className="blog-card-read-more">
                        Read More →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
          {posts.length > postsPerPage && (
            console.log('Rendering carousel controls'),
            <div className="carousel-controls">
              <button className="carousel-btn prev-btn" onClick={prevSlide}>
                ‹
              </button>
              <button className="carousel-btn next-btn" onClick={nextSlide}>
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;