import React from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaUsers, FaFileContract, FaCoins, FaChartLine, FaCog, FaCalendarAlt } from 'react-icons/fa';

const AdminDashboard1 = ({ setActiveSection }) => {
    return (
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li onClick={() => setActiveSection('dashboard')}>
            <FaTachometerAlt className="icon" />
            <span>Dashboard</span>
          </li>
          <li onClick={() => setActiveSection('userManagement')}>
            <FaUsers className="icon" />
            <span>User Management</span>
          </li>
          <li onClick={() => setActiveSection('policyManagement')}>
            <FaFileContract className="icon" />
            <span>Policy Management</span>
          </li>
          <li onClick={() => setActiveSection('tokenManagement')}>
            <FaCoins className="icon" />
            <span>Token Management</span>
          </li>
          <li onClick={() => setActiveSection('trainingEvents')}>
            <FaCalendarAlt className="icon" />
            <span>Training & Events</span>
          </li>
          <li onClick={() => setActiveSection('reports')}>
            <FaChartLine className="icon" />
            <span>Reports</span>
          </li>
          <li onClick={() => setActiveSection('settings')}>
            <FaCog className="icon" />
            <span>Settings</span>
          </li>
        </ul>
      </aside>
    );
};

export default AdminDashboard1;

