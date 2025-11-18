import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Astro-Space Talk Series', path: '/astro-space' },
    { name: 'Blog', path: '/blog' },
    { name: 'Teams', path: '/teams' },
    { name: 'Opportunities', path: '/news' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'About', path: '/about' }
  ];

  return (
    <>
      {/* Bootstrap CSS CDN */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          {/* Brand/Logo */}
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            Women In STEM - International
          </NavLink>

          {/* Mobile toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item) => (
                <li className="nav-item" key={item.name}>
                  <NavLink
                    className={({ isActive }) => 
                      `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`
                    }
                    to={item.path}
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

      {/* Font Awesome for icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />
      
      {/* Bootstrap JS CDN for mobile functionality */}
      <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"
      ></script>
    </>
  );
};

export default Navbar;