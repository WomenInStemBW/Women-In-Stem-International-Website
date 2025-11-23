import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'AstroSpace Talk', path: '/astro-space' },
    { name: 'Blog', path: '/blog' },
    { name: 'Teams', path: '/teams' },
    { name: 'Opportunities', path: '/opportunities' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'About', path: '/about' }
  ];

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleNavLinkClick = () => {
    setIsNavCollapsed(true);
  };

  // Initialize Bootstrap JavaScript after component mounts
  useEffect(() => {
    // Load Bootstrap JS dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
        <div className="container">
          {/* Brand/Logo */}
          <NavLink className="navbar-brand fw-bold fs-4" to="/" onClick={handleNavLinkClick}>
            Women In STEM - International
          </NavLink>

          {/* Mobile toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
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
        body {
          padding-top: 76px; /* Adjust based on your navbar height */
        }
        
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background-color: #0d6efd;
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 0.375rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;