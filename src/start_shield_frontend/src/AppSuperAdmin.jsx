import React, { useState } from 'react';
import ErrorBoundary from './components/NewAD/ErrorBoundary.jsx';
import SuperAdminNavbar from './components/SuperAdminNavBar/SuperAdminNavBar.jsx';
import Footer from './components/Footer/index.jsx';
import AdminDashboard2 from './components/SuperAdmin/SADasboard.jsx';
import DashboardPage from './components/NewAD/DashboardPage.jsx';
import UserManagement from './components/NewAD/UserManagement.jsx';
import PolicyManagement from './components/NewAD/POlicyManagement.jsx';
import TokenManagement from './components/NewAD/TokenManagement.jsx';
import InsuranceList from './components/InsuranceList/InsuranceList.jsx';
import TrainingEvtsManag from './components/NewAD/TrainingEvtsManag.jsx';
import ReportsAnalytics from './components/NewAD/ReportsAnalytics.jsx';
import AdminSettings from './components/NewAD/AdminSettings.jsx';
import SupportHelp from './components/NewAD/SupportHelp.jsx';
import AdminDashboard from './components/SuperAdmin/AdminDashboard.jsx';
import AdminApprovalRegister from './components/RegisterAdmin/registerAdmin.jsx'


function AppSuperAdmin() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage />;
      case 'userManagement':
        return <ErrorBoundary>
          <UserManagement />
        </ErrorBoundary>;
      case 'policyManagement':
        return <PolicyManagement />;
      case 'tokenManagement':
        return <TokenManagement />;
      case 'trainingEvtsManag':
        return <TrainingEvtsManag />;
      case 'reportsAnalytics':
        return <ReportsAnalytics />;
      case 'supportHelp':
        return <SupportHelp />;
      case 'settings':
        return <AdminSettings />;
      case 'adminDashboard':
        return <AdminDashboard />;
      case 'adminApprove':
        return <AdminApprovalRegister />;
      default:
        return null;
    }
  };
  return (
    <div>
      <SuperAdminNavbar />
      <div className="admin-container">
        <AdminDashboard2 setActiveSection={setActiveSection} />
        <div className="section-content">
          {renderSectionContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppSuperAdmin;


