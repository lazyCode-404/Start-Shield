import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Wrapper from './components/Wrapper';
import Hero from './components/Hero'
// import TokenizationStaking from './components/TokenizationAndStaking';
import Homepage from './components/Homepage/index';
import InsuranceSolutions from './components/InsuranceSolutions/InsuranceSolutions';
import TokenizationAndStaking from './components/TokenizationAndStaking/TokenizationAndStaking';
import GovernancePortal from './components/GovernancePortal/GovernancePortal';
import EducationalResources from './components/EducationalResources/EducationalResources';
import BlogNews from './components/BlogNews/BlogNews';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AboutUs from './components/AboutUs/AboutUs';
import LegalCompliance from './components/LegalCompliance/LegalCompliance';
function App() {
  return (
    <>
    <Router>
      <div>
      <NavBar />
      <Hero />
      <Wrapper>
      <Routes>
      <Route path="/" element={<Homepage />} />
              <Route path="/insuranceSolutions" element={<InsuranceSolutions />} />
              <Route path="/tokenizationAndStaking" element={<TokenizationAndStaking />} />
              <Route path="/governancePortal" element={<GovernancePortal />} />
              <Route path="/educationalResources" element={<EducationalResources />} />
              <Route path="/blogNews" element={<BlogNews />} />
              <Route path="/userDashboard" element={<UserDashboard />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/legalCompliance" element={<LegalCompliance />} />
      </Routes>
      </Wrapper>
      <Footer />
      </div>
    </Router>
    </>
  );
}

export default App;


{/* 
// import React from 'react';
// import NavBar from './components/NavBar';
// import Hero from './components/Hero';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <main>
//       <NavBar />
//       <Hero />
//       <Footer />
//     </main>
//   );
// }

// export default App; */}
