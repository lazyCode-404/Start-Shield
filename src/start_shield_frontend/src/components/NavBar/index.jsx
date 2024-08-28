// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import './navbar.css';

// import { Container, Row, Col } from 'react-bootstrap';
// import { FaBars, FaTimes } from 'react-icons/fa';
 
// function NavBar() {
//   return (
//     <nav className="navbar">
//       <div className="container">
//         <Row lg={12}>
//           <Col sm={1}>
//         <a href="#"><img className="logo" src="/assets/images/start-shield-black-logo.jpg" alt="StartShield Logo" /></a>
//         </Col>
//         <Col lg={9}>
//         <div className="nav-links">
//           <ul>
//             <li>
//               <a className="text-design" href="#">Homepage</a>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/insuranceSolution" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
//                 Insurance Solutions
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/tokenizationAndStaking" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
//                 Tokenization and Staking
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/governancePortal" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
//                 Governance Portal
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/educationalResources" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
//                 Educational Resources
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/blogAndNews" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
//                 Blog and News
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/userDashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
//                 User Dashboard
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/aboutUs" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
//                 About Us
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/legalAndCompliance" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
//                 Legal and Compliance
//               </NavLink>
//             </li>
//           </ul>
//       <Col sm={2}>
//       <button className="sign-up-button">Sign Up</button>
//       </Col>
//         </div>
//         </Col>
//         </Row>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import './navbar.css';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
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
              <li>
                <a className="text-design" href="#">
                  Homepage
                </a>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/insuranceSolution"
                  activeClassName="nav-link active"
                  className="nav-link"
                >
                  Insurance Solutions
                </NavLink>
              </li>
              {/* Add other NavLink components for remaining links */}
              <li className="nav-item">
                <NavLink
                  to="/tokenizationAndStaking"
                  activeClassName="nav-link active"
                  className="nav-link"
                >
                 Tokenization and Staking
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/governancePortal"
                  activeClassName="nav-link active"
                  className="nav-link"
                >
                 Governance Portal
                </NavLink>
              </li>
              {/* ... */}
              <li className="nav-item">
                <NavLink
                  to="/educationalResources"
                  activeClassName="nav-link active"
                  className="nav-link"
                >
                 Educational Resources
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/blogAndNews"
                  activeClassName="nav-link active"
                  className="nav-link"
                >
                 Blog and News
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/userDashboard"
                  activeClassName="nav-link active"
                  className="nav-link"
                >
                 User Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/aboutUs"
                  activeClassName="nav-link active"
                  className="nav-link"
                >
                 About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/legalAndCompliance"
                  activeClassName="nav-link active"
                  className="nav-link"
                >
                 Legal and Compliance
                </NavLink>
              </li>

            </ul>
            <Col sm={2}>
              <button className="sign-up-button">Sign Up</button>
            </Col>
          </Col>
        </Row>
      </Container>
    </nav>
  );
}

export default NavBar;
