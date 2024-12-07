import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Wrapper from './components/Wrapper';
import Homepage from './components/Homepage/index';
import InsuranceSolutions from './components/InsuranceSolutions/BopPage.jsx';
import TokenizationAndStaking from './components/TokenizationAndStaking/index';
import GovernancePortal from './components/GovernancePortal/GovernancePortal';
import EducationalResources from './components/EducationalResources/EducationalResources';
import BlogNews from './components/BlogNews/BlogNews';
import AboutUs from './components/AboutUs/AboutUs';
import LegalCompliance from './components/LegalCompliance/LegalCompliance';
import CheckPriceInsurance from './components/CheckPriceInsurance/index.jsx';
import SignUp from './components/CreateAccount/index.jsx';  // Only one import for SignUp
// import { Login } from './components/SignIn/index.jsx'
import Login from './login.jsx';
import { WelcomePage } from './components/Welcome/welcome.jsx'
import AdminPage from './components/AdminPage/AdminPage.jsx';
import ViewPolicies from './components/InsuranceSolutions/ViewPolicies';
import RenewPolicy from './components/InsuranceSolutions/RenewPolicy';
import TokenManagement from './components/InsuranceSolutions/TokenManagement.jsx'
import Claims from './components/InsuranceSolutions/Claims.jsx'
import GetQuote from './components/InsuranceSolutions/GetQuote.jsx';
import AdminDashboard1 from './components/NewAD/ADasboard.jsx';
import UserDashboard1 from './components/newUserD/UDasboard.jsx';
import AppAdmin from './AppAdmin.jsx'; // Import the new AppAdmin component
import AppUser from './AppUser.jsx';
import Alb from './components/InsuranceSolutions/Albcolor.jsx'


function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <Router>
      <AppContent userInfo={userInfo} setUserInfo={setUserInfo} />
    </Router>
  );
}

function AppContent({ userInfo, setUserInfo }) {
  // const [userInfo, setUserInfo] = useState(null); // Stare pentru informațiile utilizatorului
  const location = useLocation();

  const handleLogin = (user) => {
    setUserInfo(user); // Setează datele utilizatorului după login
  };
  // Verifică ruta pentru a afișa navbar-ul corect
  const isAdminDashboard = location.pathname === '/a-dashboard';
  // const isAdminDashboard = location.pathname.startsWith('/admin') 
  // && userInfo?.role === ('Admin');
  const isUserDashboard = location.pathname === '/u-dashboard';
  return (
    <>
      {/* <Router> */}
      {/* <div> */}
      {/* Afișează AdminNavbar doar pe pagina specifică */}
      {/* {isAdminDashboard ? <AdminNavbar /> : <NavBar userInfo={userInfo} />} */}
      {isAdminDashboard ? (
        <AppAdmin /> // Renders the admin-specific app if the path matches
      ) : isUserDashboard ? (
        <AppUser /> // Afișează aplicația User dacă rolul și URL-ul se potrivesc
      ) : (
        <div>
          <NavBar userInfo={userInfo} />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/insuranceSolution" element={<InsuranceSolutions />} />
              <Route path="/tokenizationAndStaking" element={<TokenizationAndStaking />} />
              <Route path="/governancePortal" element={<GovernancePortal />} />
              <Route path="/educationalResources" element={<EducationalResources />} />
              <Route path="/blogNews" element={<BlogNews />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/legalCompliance" element={<LegalCompliance />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/createAccountSignIn" element={<Login onLogin={handleLogin} />} />
              <Route path="/checkPriceInsurance" element={<CheckPriceInsurance />} />
              <Route path="/adminPage" element={<AdminPage />} />
              <Route path="/" element={<WelcomePage />} />
              <Route path="/view-policies" element={<ViewPolicies />} />
              <Route path="/renew-policy" element={<RenewPolicy />} />
              <Route path="/token-management" element={<TokenManagement />} />
              <Route path="/claims" element={<Claims />} />
              <Route path="/get-quote" element={<GetQuote />} />
              <Route path='/a-dashboard' element={<AdminDashboard1 />} />
              <Route path='/u-dashboard' element={<UserDashboard1 />} />

              {/* <Route path='/u-dashboard' element={<UserDashboard1/>} /> */}
              <Route path='/alb' element={<Alb />} />
              {/* Redirecționează către dashboard-uri doar dacă utilizatorul e autentificat */}
              {userInfo && userInfo.role === 'Admin' && (
                <Route path="/adminDashboard" element={<AdminDashboard />} />
              )}
              {userInfo && userInfo.role === 'User' && (
                <Route path="/userDashboard" element={<UserDashboard />} />
              )}
              {userInfo && userInfo.role === 'Admin' && (
                <Route path="/adminPage" element={<AdminPage />} />
              )}

            </Routes>
          </Wrapper>
          <Footer />
        </div>
      )}
      {/* </Router> */}
    </>
  );
}

export default App;
