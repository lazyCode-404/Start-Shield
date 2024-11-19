import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import './navbar.css';

const NavBar = ({ userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Funcția de logout
    window.location.reload();
  };

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
             
                {/* </li> */}
              <li className="nav-item">
                <NavLink to="/adminPage" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                All Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/a-dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                ADashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/u-dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                UDashboard
                </NavLink>
              </li>
              {/* Afișează linkurile pentru dashboard doar dacă utilizatorul este logat */}
              {userInfo && userInfo.role === 'Admin' && (
                 <>
                 <li className="nav-item">
                  <NavLink to="/adminPage" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    All Users 
                  </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/adminDashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                      Admin Dashboard
                    </NavLink>
                  </li>
                  </>
                
              )}
              {userInfo && userInfo.role === 'User' && (
                <li className="nav-item">
                  <NavLink to="/userDashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    User Dashboard
                  </NavLink>
                </li>
              )}
            </ul>

            <Col sm={2}>
              <ul>
                {/* Afișează butonul de login sau logout */}
                {!userInfo ? (
                  <>
                    <li>
                      <NavLink to="/SignUp" className="nav-link">
                        <button className="sign-up-button">Join</button>
                      </NavLink>

                    </li>
                    <li>
                      <NavLink to="/createAccountSignIn" className="nav-link">
                        <button className="sign-in-button">Login</button>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li>
                    <button onClick={handleLogout} className="sign-out-button">
                      Logout
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
