import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import logo from '../../../public/assets/images/start-shield-black-logo.jpg';
import { FaUserCircle, FaSearch, FaBell, FaSignOutAlt, FaCog, FaHome } from 'react-icons/fa';
import Hero from "../Hero";
import imag_hero from "../../src/assets/images/hero4.png";
import { useAuth } from "../../context/AppContext";

function AdminNavbar({ adminName }) {
  const navigate = useNavigate();
  const { backendActor, login, logout, isAuthenticated } = useAuth();

  // Navigate to the home page
  const handleHomeClick = () => {
    navigate('/');
  };

  useEffect(() => {
    if (backendActor && isAuthenticated) {
      console.log("Authenticated and backend ready.");
    }
  }, [backendActor, isAuthenticated]);

  return (
    <>
      <nav className="admin-navbar">
        <div className="navbar-left">
          <img src={logo} alt="StartShield Logo" className="navbar-logo" onClick={handleHomeClick} />
        </div>
        <div className="navbar-left-center">
          <button className="home-button" onClick={handleHomeClick}>
            <FaHome />
          </button>
        </div>
        <div className="navbar-center">
          <input
            type="text"
            placeholder="Search users, policies, or tokens..."
            className="navbar-search"
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="navbar-right">
          <div className="profile-dropdown">
            <FaUserCircle className="profile-icon" />
            <div className="dropdown-menu">
              <div className="dropdown-item"><FaBell /> Notifications</div>
              <div className="dropdown-item"><FaCog /> Settings</div>
              {isAuthenticated && (
                <div className="dropdown-item">
                  <button className="btn btn-danger" onClick={() => {
                    logout();
                    navigate("/"); // Navighează după logout
                  }}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Hero backgroundImage={imag_hero}>
        <section className="overview">
          <h1 className="hero-text">
            Hello and Welcome back, {adminName}!
          </h1>
        </section>
      </Hero>
    </>
  );
}

export default AdminNavbar;