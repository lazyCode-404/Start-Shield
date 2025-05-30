import React from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaUsers, FaFileContract, FaCoins, FaChartLine, FaCog, FaCalendarAlt } from 'react-icons/fa';

const UserDashboard1 = ({ setActiveSection }) => {
  const handleSectionClick = (section) => {
    if (!section) {
      console.error("Section is undefined");
      return;
    }
    setActiveSection(section);
  };

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li onClick={() => handleSectionClick('dashboard')}>
          <FaTachometerAlt className="icon" />
          <span>Dashboard (Home)</span>
        </li>
        <li onClick={() => handleSectionClick('myPolicies')}>
          <FaUsers className="icon" />
          <span>My Policies</span>
        </li>
        <li onClick={() => handleSectionClick('paymentPage')}>
          <FaCog className="icon" />
          <span>Payment Page</span>
        </li>
        <li onClick={() => handleSectionClick('checkPriceInsurance')}>
          <FaCog className="icon" />
          <span>Check Price Insurance</span>
        </li>
        <li onClick={() => handleSectionClick('tokenManagement')}>
          <FaCoins className="icon" />
          <span>Claims Management</span>
        </li>
        <li onClick={() => handleSectionClick('trainingEvents')}>
          <FaCalendarAlt className="icon" />
          <span>STSH Token Wallet</span>
        </li>
        <li onClick={() => handleSectionClick('support')}>
          <FaChartLine className="icon" />
          <span>AI Insights</span>
        </li>
        <li onClick={() => handleSectionClick('userSettings')}>s
          <FaChartLine className="icon" />
          <span>Suport and Comunity</span>
        </li>
        <li onClick={() => handleSectionClick('userSettings')}>s
          <FaChartLine className="icon" />
          <span>Settings</span>
        </li>
      </ul>
    </aside>
  );
};

export default UserDashboard1;
