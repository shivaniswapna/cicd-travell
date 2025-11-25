import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isAuthenticated, onLoginClick, onSignupClick, onLogout, onThemeToggle, isDarkMode }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName') || '';
    setUserName(name);
  }, [isAuthenticated]);

  console.debug('Navbar isAuthenticated=', isAuthenticated);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TravelEase
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/travel-modes" className={`navbar-link ${['/flights', '/trains', '/buses', '/cabs', '/ferries', '/travel-modes'].includes(location.pathname) ? 'active' : ''}`}>
            Travel Modes
          </Link>
          <Link to="/hotels" className={`navbar-link ${location.pathname === '/hotels' ? 'active' : ''}`}>
            Hotels
          </Link>
          <Link to="/itinerary" className={`navbar-link ${location.pathname === '/itinerary' ? 'active' : ''}`}>
            Itinerary Planner
          </Link>
          <Link to="/payments" className={`navbar-link ${location.pathname === '/payments' ? 'active' : ''}`}>
            Payments
          </Link>
          {isAuthenticated && (
            <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
              Profile
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={onThemeToggle}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          {!isAuthenticated ? (
            <div className="nav-right">
              <button className="btn-outline" onClick={onLoginClick}>
                Login
              </button>
              <button className="btn-primary" onClick={onSignupClick}>
                Signup
              </button>
            </div>
          ) : (
            <div className="nav-right">
              <span className="user-greeting">👤 Welcome{userName ? `, ${userName.split(' ')[0]}!` : '!'}</span>
              {/* User avatar placeholder */}
              <div className="user-avatar">👤</div>
              <button className="btn-outline" onClick={onLogout}>
                Logout
              </button>
            </div>
          )}
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;