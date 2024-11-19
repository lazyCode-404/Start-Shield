import React, { useState } from 'react';
// import ErrorBoundary from './components/NewAD/ErrorBoundary.jsx';
import AdminNavbar from './components/AdminNavBar/AdminNavBar.jsx';
import Footer from './components/Footer/index.jsx';
import UserDashboard1 from './components/newUserD/UDasboard.jsx';
import DashboardOverview from './components/newUserD/DashboardOverview';
import MyPolicies from './components/newUserD/MyPolicies.jsx';
import TokenManagement from './components/newUserD/TokenManagement.jsx'
import TrainingEvents from './components/newUserD/TrainingEvents.jsx';
import Support from './components/newUserD/Support.jsx';
import UserSettings from './components/newUserD/UserSettings.jsx';
// import DashboardPage from './components/newd/DashboardPage.jsx';
// import UserManagement from './components/NewAD/UserManagement.jsx';
// import PolicyManagement from './components/NewAD/POlicyManagement.jsx';
// import TokenManagement from './components/NewAD/TokenManagement.jsx';
// import TrainingEvtsManag from './components/NewAD/TrainingEvtsManag.jsx';
// import ReportsAnalytics from './components/NewAD/ReportsAnalytics.jsx';
function AppUser() {
    const [activeSection, setActiveSection] = useState('dashboard');

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'dashboard':
                // return <DashboardPage />;
                return <DashboardOverview />;
             case 'myPolicies':
                return <MyPolicies />
             case 'tokenManagement':
                // return <div>Settings</div>;
                return <TokenManagement />;
            case 'trainingEvents':
                // return <div>Settings</div>;
                return <TrainingEvents />;
            case 'support':
                return <Support />;
             case 'userSettings':
                return <UserSettings />;
            // case 'settings':
            //     return <div>Settings</div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="user-container">
                <UserDashboard1 setActiveSection={setActiveSection} />
                <div className="section-content">
                    {renderSectionContent()}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AppUser;


