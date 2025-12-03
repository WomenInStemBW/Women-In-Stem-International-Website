import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'AstroSpace Talk', path: '/astro-space' },
    { name: 'Blog', path: '/blog' },
    { name: 'Teams', path: '/teams' },
    { name: 'Opportunities', path: '/opportunities' },
    { name: 'Offers', path: '/offers' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleNavLinkClick = () => {
    setIsNavCollapsed(true);
  };

  return (
    <>
      {/* Bootstrap CSS CDN */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      {/* Font Awesome for icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />

      {/* Google Fonts - Smooch Sans */}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@100..900&display=swap" rel="stylesheet"/>
      
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-custom">
        <div className="container">
          {/* Brand/Logo */}
          <NavLink className="navbar-brand fw-bold fs-4" to="/" onClick={handleNavLinkClick}>
            Women In STEM - International
          </NavLink>

          {/* Mobile toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={handleNavToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar items */}
          <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item) => (
                <li className="nav-item" key={item.name}>
                  <NavLink
                    className={({ isActive }) => 
                      `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`
                    }
                    to={item.path}
                    onClick={handleNavLinkClick}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              
              {/* Admin Icon - Changes based on auth state */}
              <li className="nav-item">
                {user ? (
                  <NavLink
                    className={({ isActive }) => 
                      `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`
                    }
                    to="/admin"
                    title="Admin Dashboard"
                    onClick={handleNavLinkClick}
                  >
                    <i className="fas fa-user-shield me-1"></i>
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive }) => 
                      `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`
                    }
                    to="/admin/login"
                    title="Admin Login"
                    onClick={handleNavLinkClick}
                  >
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Admin
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Add padding to body to account for fixed navbar */}
      <style>{`
        .navbar-custom {
          background: linear-gradient(135deg, #0d254a 0%, #1e3a8a 100%) !important;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Smooch Sans', sans-serif;
          transition: all 0.3s ease;
        }

        .navbar-brand {
          font-family: 'Smooch Sans', sans-serif;
          font-weight: 700;
          font-size: 1.4rem !important;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.3s ease;
        }

        .navbar-brand:hover {
          transform: translateY(-1px);
          background: linear-gradient(135deg, #ffffff 0%, #cbd5e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .navbar-nav .nav-link {
          font-family: 'Smooch Sans', sans-serif;
          font-weight: 500;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.85) !important;
          transition: all 0.3s ease;
          position: relative;
          margin: 0 5px;
          border-radius: 8px;
        }

        .navbar-nav .nav-link:hover {
          color: rgba(255, 255, 255, 1) !important;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .navbar-nav .nav-link.active {
          color: rgba(255, 255, 255, 1) !important;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.15);
        }

        .navbar-nav .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 15px;
          right: 15px;
          height: 2px;
          background: linear-gradient(90deg, #ffffffff, #ffffffff);
          border-radius: 2px;
        }

        .navbar-toggler {
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 6px 10px;
        }

        .navbar-toggler:focus {
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
        }

        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        body {
          padding-top: 80px;
        }
        
        @media (max-width: 991.98px) {
  .navbar-collapse {
    background: transparent;
    padding: 0;
    margin-top: 0;
  }

  .navbar-nav .nav-link {
    margin: 2px 0;
    padding: 8px 12px !important;
    text-align: center;
  }

  .navbar-nav .nav-link.active::after {
    display: none;
  }

  .navbar-brand {
    font-size: 1.3rem !important;
  }
}

        @media (max-width: 576px) {
          .navbar-brand {
            font-size: 1.2rem !important;
          }
          
          body {
            padding-top: 70px;
          }
        }

        /* Smooth scrolling for better user experience */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

export default Navbar;