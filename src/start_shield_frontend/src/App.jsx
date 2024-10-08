import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Wrapper from './components/Wrapper';
import Hero from './components/Hero'
// import TokenizationStaking from './components/TokenizationAndStaking';
import Homepage from './components/Homepage/index';
import InsuranceSolutions from './components/InsuranceSolutions/index';
import TokenizationAndStaking from './components/TokenizationAndStaking/index';
import GovernancePortal from './components/GovernancePortal/GovernancePortal';
import EducationalResources from './components/EducationalResources/EducationalResources';
import BlogNews from './components/BlogNews/BlogNews';
// import UserDashboard from './components/UserDashboard/UserDashboard';
import UserDashboard from './components/UserDashboard/UserDasboard';
import AboutUs from './components/AboutUs/AboutUs';
import LegalCompliance from './components/LegalCompliance/LegalCompliance';
import CreateAccount from './components/CreateAccount';
import SignIn from './components/SignIn';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CheckPriceInsurance from './components/CheckPriceInsurance/index.jsx';
function App() {
  return (
    <>
      <Router>
        <div>
          <NavBar />
          {/* <Hero /> */}
          <Wrapper>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/insuranceSolution" element={<InsuranceSolutions />} />
              <Route path="/tokenizationAndStaking" element={<TokenizationAndStaking />} />
              <Route path="/governancePortal" element={<GovernancePortal />} />
              <Route path="/educationalResources" element={<EducationalResources />} />
              <Route path="/blogNews" element={<BlogNews />} />
              <Route path="/userDashboard" element={<UserDashboard />} /> 
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/legalCompliance" element={<LegalCompliance />} />
              <Route path='/createAccountSignUp' element={<CreateAccount />} />
              <Route path='/createAccountSignIn' element={<SignIn />} />
              <Route path='/checkPriceInsuranc' element={<CheckPriceInsurance />} />
            </Routes>
          </Wrapper>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;


