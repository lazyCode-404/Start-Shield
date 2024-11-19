import React from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaUsers, FaFileContract, FaCoins, FaChartLine, FaCog, FaCalendarAlt } from 'react-icons/fa';

const UserDashboard1 = ({ setActiveSection }) => {
    return (
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li onClick={() => setActiveSection('dashboard')}>
            <FaTachometerAlt className="icon" />
            <span>Dashboard Overview</span>
          </li>
          <li onClick={() => setActiveSection('myPolicies')}>
            <FaUsers className="icon" />
            <span>My Policies</span>
          </li>
          {/* <li onClick={() => setActiveSection('tokenManagement')}>
            <FaFileContract className="icon" />
            <span>Token Management</span>
          </li> */}
          <li onClick={() => setActiveSection('tokenManagement')}>
            <FaCoins className="icon" />
            <span>Token Management</span>
          </li>
          <li onClick={() => setActiveSection('trainingEvents')}>
            <FaCalendarAlt className="icon" />
            <span>Training & Events</span>
          </li>
          <li onClick={() => setActiveSection('support')}>
            <FaChartLine className="icon" />
            <span>Support</span>
          </li>
          <li onClick={() => setActiveSection('userSettings')}>s
            <FaChartLine className="icon" />
            <span>User Settings</span>
          </li>
        </ul>
      </aside>
    );
};

export default UserDashboard1;
