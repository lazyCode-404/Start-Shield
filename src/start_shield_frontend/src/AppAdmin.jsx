import React, { useState } from 'react';
import ErrorBoundary from './components/NewAD/ErrorBoundary.jsx';
import AdminNavbar from './components/AdminNavBar/AdminNavBar.jsx';
import Footer from './components/Footer/index.jsx';
import AdminDashboard1 from './components/NewAD/ADasboard.jsx';
import DashboardPage from './components/NewAD/DashboardPage.jsx';
import UserManagement from './components/NewAD/UserManagement.jsx';
import PolicyManagement from './components/NewAD/POlicyManagement.jsx';
import TokenManagement from './components/NewAD/TokenManagement.jsx';
import TrainingYEvtsManag from './components/NewAD/TrainingYEvtsManag.jsx'
import InsuranceList from './components/InsuranceList/InsuranceList.jsx';

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
        return <PolicyManagement />;
      case 'tokenManagement':
        return <TokenManagement />;
      case 'trainingYEvtsManag':
        return <TrainingYEvtsManag />;
      case 'reportsAnalytics':
        return <div>ReportsAnalytics</div>;
      case 'supportHelp':
        return <div>SupportHelp</div>;
      case 'settings':
        return <div>Settings</div>;
        case 'insuranceList':
          return <InsuranceList />;
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


