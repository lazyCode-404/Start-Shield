import React, { useState } from 'react';
import ErrorBoundary from './components/NewAD/ErrorBoundary.jsx';
import SuperAdminNavbar from './components/SuperAdminNavBar/SuperAdminNavBar.jsx';
import Footer from './components/Footer/index.jsx';
import SuperAdminDashboard1 from './components/SuperAdmin/SADasboard.jsx';
import DashboardPage from './components/SuperAdmin/DashboardPage.jsx';
import UserManagement from './components/SuperAdmin/UserManagement.jsx';
import PolicyManagement from './components/SuperAdmin/POlicyManagement.jsx';
import TokenManagement from './components/SuperAdmin/TokenManagement.jsx';
import TrainingEvtsManag from './components/SuperAdmin/TrainingEvtsManag.jsx';
import ReportsAnalytics from './components/SuperAdmin/ReportsAnalytics.jsx';
import AdminSettings from './components/SuperAdmin/AdminSettings.jsx';
import SupportHelp from './components/SuperAdmin/SupportHelp.jsx';
import AdminDashboard from './components/SuperAdmin/AdminDashboard.jsx';
import AdminApprovalRegister from './components/RegisterAdmin/registerAdmin.jsx';
import AppSuperAdmin from './components/SuperAdmin/AppSuperAdmin.jsx';
import UserProfile from './components/SuperAdmin/UserProfile.jsx';
import PendingApproval from './components/SuperAdmin/PendingApproval.jsx';
import SecurePaymentsPage from './components/PaymentPage/paymentPage.jsx';

function AppSuperAdmin() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeSubSection, setActiveSubSection] = useState(null);

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage />;
      case 'userManagement':
        return (
          <ErrorBoundary>
            {activeSubSection === 'edit-user' && <AppSuperAdmin />}
            {activeSubSection === 'user-profile' && <UserProfile />}
            {activeSubSection === 'pending-approval' && <PendingApproval />}
            {!activeSubSection && <UserManagement setActiveSubSection={setActiveSubSection} />}
          </ErrorBoundary>
        );
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
        case 'paymentPage':
          return <SecurePaymentsPage />;
      default:
        return null;
    }
  };

  return (
    <div>
      <SuperAdminNavbar />
      <div className="admin-container">
        <SuperAdminDashboard1 setActiveSection={setActiveSection} />
        <div className="section-content">
          {renderSectionContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppSuperAdmin;

