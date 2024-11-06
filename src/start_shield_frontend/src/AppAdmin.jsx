import React, { useState } from 'react';
import ErrorBoundary from './components/NewAD/ErrorBoundary.jsx';
import AdminNavbar from './components/AdminNavBar/AdminNavBar.jsx';
import Footer from './components/Footer/index.jsx';
import AdminDashboard1 from './components/NewAD/ADasboard.jsx';
import DashboardPage from './components/NewAD/DashboardPage.jsx';
import UserManagement from './components/NewAD/UserManagement.jsx';

function AppAdmin() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage />;
      case 'userManagement':
        return  <ErrorBoundary>
        <UserManagement />
      </ErrorBoundary>;
      case 'policyManagement':
        return <div>Policy Management Content</div>;
      case 'tokenManagement':
        return <div>Token Management Content</div>;
      case 'trainingEvents':
        return <div>Training & Events Content</div>;
      case 'reports':
        return <div>Reports Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="admin-container">
        <AdminDashboard1 setActiveSection={setActiveSection} />
        <div className="section-content">
          {renderSectionContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppAdmin;


