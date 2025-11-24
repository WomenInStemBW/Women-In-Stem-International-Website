import React, { useState, useEffect } from 'react';
import { getAllPublishedPosts } from '../services/blogService';
import girlPic from "../assets/girl_background.jpg";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Add this line

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Calculate posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Pagination functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

      .blog-vertical {
        display: flex;
        flex-direction: column;
        gap: 30px;
        max-width: 100%;
        text-align: left;
      }

      .blog-card-vertical {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: left;
      }

      .blog-card-vertical:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(0,0,0,0.15);
      }

      .blog-card-image-vertical {
        width: 300px;
        height: 200px;
        object-fit: cover;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 3rem;
        flex-shrink: 0;
      }

      .blog-card-image-vertical img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .blog-card-content-vertical {
        padding: 25px;
        flex: 1;
        text-align: left;
      }

      @media (max-width: 768px) {
        .blog-card-vertical {
          flex-direction: column;
          text-align: left;
        }
  
        .blog-card-image-vertical {
            width: 100%;
            height: 220px;
          }
        }

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

        .pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.pagination-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #667eea;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-2px);
}

.pagination-numbers {
  display: flex;
  gap: 8px;
}

.pagination-number {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-number.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.pagination-number:hover:not(.active) {
  background: #f7fafc;
  border-color: #667eea;
}
      `}</style>

      <div className="blog-page">
        <div className="container">
          <div style={{
            textAlign: 'center',
            marginBottom: '50px',
            backgroundImage: `url(${girlPic})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '80px 20px',
            borderRadius: '10px',
            position: 'relative'
          }}>
            {/* Overlay for better text readability */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '10px'
            }}></div>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '15px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                Our Blog
              </h1>
              <p style={{
                fontSize: '1.1rem',
                color: 'white',
                maxWidth: '700px',
                margin: '0 auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}>
                Stay updated with the latest news, insights, and stories from Women in STEM
              </p>
            </div>
          </div>
          <div>
            <h1>Latest Blogs</h1>
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
            <div className="blog-vertical">
              {currentPosts.map((post) => (
                <a
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="blog-card-vertical"
                >
                  <div className="blog-card-image-vertical">
                    {post.cover_image ? (
                      <img src={post.cover_image} alt={post.title} />
                    ) : (
                      '📝'
                    )}
                  </div>

                  <div className="blog-card-content-vertical">
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
            <div className="pagination-controls">
              <button
                className="pagination-btn"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="pagination-btn"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;