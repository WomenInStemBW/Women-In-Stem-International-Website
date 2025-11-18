import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Add this import
import wisLogoBlue from '../../assets/LOGO1 COPY PNG@300x.PNG';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(username, password);

    if (error) {
      setError(error.message || 'Failed to login. Please check your credentials.');
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .login-container {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-width: 450px;
          width: 100%;
        }

        .login-logo {
          max-width: 200px;
          margin: 0 auto 30px;
          display: block;
        }

        .login-title {
          text-align: center;
          color: #2d3748;
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .login-subtitle {
          text-align: center;
          color: #718096;
          margin-bottom: 30px;
          font-size: 0.95rem;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .error-message {
          background: #fed7d7;
          color: #c53030;
          padding: 12px 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          border-left: 4px solid #c53030;
        }

        .login-button {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .back-link {
          text-align: center;
          margin-top: 20px;
        }

        .back-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .back-link a:hover {
          color: #764ba2;
        }
      `}</style>

      <div className="login-page">
        <div className="login-container">
          <img src={wisLogoBlue} alt="WiS Logo" className="login-logo" />
          
          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">Sign in to manage your content</p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="username"
                id="username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin_xxxx"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="back-link">
            <a href="/">← Back to Website</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;