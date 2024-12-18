import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import './navbar.css';
import { useAuth } from "../../context/AppContext";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // const handleLogout = () => {
  //   // Funcția de logout
  //   window.location.reload();
  // };

  return (
    <nav className="navbar">
      <Container>
        <Row className="align-items-center">
          <Col xs={6} sm={1}>
            <a href="#">
              <img
                className="logo"
                src="/assets/images/start-shield-black-logo.jpg"
                alt="StartShield Logo"
              />
            </a>
          </Col>
          <Col xs={6} className="text-right d-sm-none">
            <div className="menu-icon" onClick={toggleNavbar}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </Col>
          <Col sm={11} className={`nav-links ${isOpen ? 'active' : ''}`}>
            <ul>
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Homepage
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/insuranceSolution" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Insurance Solutions
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/tokenizationAndStaking" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Tokenization & Staking
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/governancePortal" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Governance Portal
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/educationalResources" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Educational Resources
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/blogNews" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Blog & News
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/aboutUs" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/legalCompliance" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Legal Compliance
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/checkPriceInsurance" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                
                </NavLink>
              </li>
              {/* Afișează linkurile pentru dashboard doar dacă utilizatorul este logat */}
              {userInfo && userInfo.role === 'SUPER_ADMIN' && (
                <>
                <li className="nav-item">
                  <NavLink to="/s-a-dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Super Admin Dashboard
                  </NavLink>
                  </li>
                <li className="nav-item">
                  <NavLink to="/a-dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Admin Dashboard
                  </NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink to="/u-dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    User Dashboard
                  </NavLink>
                </li>
                </>
              )}
              {userInfo && userInfo.role === 'ADMIN' && (
                <li className="nav-item">
                  <NavLink to="/a-dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              {userInfo && userInfo.role === 'USER' && (
                <li className="nav-item">
                  <NavLink to="/u-dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    User Dashboard
                  </NavLink>
                </li>
              )}
            </ul>

            <Col sm={2}>
            <ul>
              {!isAuthenticated ? (
                <>
                  <li>
                    <NavLink to="/createAccountSignIn" className="nav-link">
                      <button className="sign-in-button">Login or SignUp</button>
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  {/* Dacă utilizatorul este autentificat */}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      logout();
                      navigate("/"); // Navighează către pagina de start după logout
                    }}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              )}
            </ul>
          </Col>
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default NavBar;
