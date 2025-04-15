import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import SuperAdminNavbar from '../SuperAdminNavBar/SuperAdminNavBar.jsx';
import Footer from '../../components/Footer/index.jsx';
import SuperAdminDashboard1 from './SADasboard.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determină secțiunea activă din URL
  const activeSection = location.pathname.split('/')[1] || 'dashboard';

  return (
    <div>
      {/* Navbar-ul rămâne vizibil */}
      <SuperAdminNavbar />
      <div className="admin-container">
        {/* Dashboard-ul secundar */}
        <SuperAdminDashboard1
          activeSection={activeSection}
          setActiveSection={(section) => navigate(`/${section}`)}
        />
        <div className="section-content">
          {/* Conținutul principal al secțiunii */}
          <ErrorBoundary>
            <Outlet /> {/* Randează rutele copil */}
          </ErrorBoundary>
        </div>
      </div>
      {/* Footer-ul rămâne vizibil */}
      <Footer />
    </div>
  );
}

export default AdminLayout;
