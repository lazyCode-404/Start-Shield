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
          <li onClick={() => setActiveSection('trainingYEvtsManag')}>
            <FaCalendarAlt className="icon" />
            <span>Training & Events</span>
          </li>
          <li onClick={() => setActiveSection('reportsAnalytics')}>
            <FaChartLine className="icon" />
            <span>Reports & Analytics</span>
          </li>
          <li onClick={() => setActiveSection('supportHelp')}>
            <FaChartLine className="icon" />
            <span>Support & Help</span>
          </li>
          <li onClick={() => setActiveSection('insuranceList')}>
            <FaChartLine className="icon" />
            <span>Insurance List</span>
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

