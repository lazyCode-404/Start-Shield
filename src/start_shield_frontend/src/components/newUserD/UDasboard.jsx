import React from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaUsers, FaFileContract, FaCoins, FaChartLine, FaCog, FaCalendarAlt } from 'react-icons/fa';

const UserDashboard1 = ({ setActiveSection }) => {
    return (
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li onClick={() => setActiveSection('dashboard')}>
            <FaTachometerAlt className="icon" />
<<<<<<< HEAD
            <span>Dashboard Overview U</span>
=======
            <span>Dashboard(Home)</span>
>>>>>>> cab7a48bfd1554dab43c795654e43d2f4b1aa8a8
          </li>
          <li onClick={() => setActiveSection('myPolicies')}>
            <FaUsers className="icon" />
            <span>My Policies</span>
          </li>
          <li onClick={() => setActiveSection('paymentPage')}>
            <FaCog className="icon" />
            <span>Payment Page</span>
          </li>
          <li onClick={() => setActiveSection('tokenManagement')}>
            <FaCoins className="icon" />
            <span>Claims Management</span>
          </li>
          <li onClick={() => setActiveSection('trainingEvents')}>
            <FaCalendarAlt className="icon" />
            <span>STSH Token Wallet</span>
          </li>
          <li onClick={() => setActiveSection('support')}>
            <FaChartLine className="icon" />
            <span>AI Insights</span>
          </li>
          <li onClick={() => setActiveSection('userSettings')}>s
            <FaChartLine className="icon" />
            <span>Suport and Comunity</span>
          </li>
          <li onClick={() => setActiveSection('userSettings')}>s
            <FaChartLine className="icon" />
            <span>Settings</span>
          </li>
        </ul>
      </aside>
    );
};

export default UserDashboard1;
