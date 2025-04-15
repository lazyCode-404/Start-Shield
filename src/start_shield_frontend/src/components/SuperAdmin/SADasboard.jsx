import React from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaUsers, FaFileContract, FaCoins, FaChartLine, FaCog, FaCalendarAlt } from 'react-icons/fa';

const SuperAdminDashboard1 = ({ setActiveSection }) => {
  // if (!setActiveSection || typeof setActiveSection !== 'function') {
  //   console.error("Error: setActiveSection is not defined or not a function.");
  // }
    return (
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li onClick={() => setActiveSection('dashboard')}>
            <FaTachometerAlt className="icon" />
            <span>Dashboard Overview S</span>
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
          <li onClick={() => setActiveSection('trainingEvtsManag')}>
            <FaCalendarAlt className="icon" />
            <span>Training & Events</span>
          </li>
          <li onClick={() => setActiveSection('reportsAnalytics')}>
            <FaChartLine className="icon" />
            <span>Reports & Analytics</span>
          </li>
          <li onClick={() => setActiveSection('supportHelp')}>s
            <FaChartLine className="icon" />
            <span>Support & Help</span>
          </li>
          <li onClick={() => setActiveSection('insuranceList')}>
            <FaChartLine className="icon" />
            <span>Insurance List</span>
          </li>
          <li onClick={() => setActiveSection('adminDhboard')}>
            <FaChartLine className="icon" />
            <span>Admin Dashbord</span>
          </li>
          <li onClick={() => setActiveSection('adminApprove')}>
            <FaChartLine className="icon" />
            <span>Admin Approve</span>
          </li>
          <li onClick={() => setActiveSection('paymentPage')}>
            <FaChartLine className="icon" />
            <span>Payment Page</span>
          </li>
          <li onClick={() => setActiveSection('settings')}>
            <FaCog className="icon" />
            <span>Admin Settings</span>
          </li>
        </ul>
      </aside>
    );
};

export default SuperAdminDashboard1;

