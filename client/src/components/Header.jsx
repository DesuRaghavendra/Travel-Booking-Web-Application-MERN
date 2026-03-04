// LAST UPDATED CODE WITH ADMIN DASHBOARD.
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="container">
        {
        <div 
          className="logo" 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        >
          Travel
          <div className="logo-icon">TA</div>
          App
        </div>
}
        <div className="nav-items">
          <NavLink to="#" className="nav-item">
            <span role="img" aria-label="house">🏠</span> List Your Property
          </NavLink>
          <NavLink to="#" className="nav-item">
            <span role="img" aria-label="briefcase">💼</span> Introducing myBiz
          </NavLink>
          <NavLink to="/my-bookings" className="nav-item">
            <span role="img" aria-label="backpack">🎒</span> My Bookings
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin" className="nav-item">
              <span role="img" aria-label="wrench">🛠️</span> Admin Dashboard
            </NavLink>
          )}
        </div>

        <div className="auth-btn">
          {isAuthenticated ? (
            <div className="user-section">
              <span className="user-name">Hi, {user?.name || 'User'}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/auth" className="login-btn">
              Login or Create Account
            </NavLink>
          )}
        </div>
      </div>

      <div className="container_tabs">
        <div className="booking-card_tabs">
          <div className="service-tabs">
            <div className="tab">
              <NavLink
                to="/flights"
                className={({ isActive }) => `tab-icon ${isActive ? 'active' : ''}`}
              >
                ✈️
              </NavLink>
              <div>Flights</div>
            </div>

            <div className="tab">
              <NavLink
                to="/hotels"
                className={({ isActive }) => `tab-icon ${isActive ? 'active' : ''}`}
              >
                🏨
              </NavLink>
              <div>Hotels</div>
            </div>

            <div className="tab">
              <div className="tab-icon">🏖️</div>
              <div>Holiday Packages</div>
            </div>

            <div className="tab">
              <div className="tab-icon">🚆</div>
              <div>Trains</div>
            </div>

            <div className="tab">
              <div className="tab-icon">🚌</div>
              <div>Buses</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
