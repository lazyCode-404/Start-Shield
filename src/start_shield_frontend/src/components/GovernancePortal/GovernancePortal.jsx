// GovernancePortal.jsx

import React from 'react';
import VotingMechanism from './VotingMechanism'; 
import CommunityDiscussions from './CommunityDiscussions'; 
import './style.css';

const GovernancePortal = () => {


  return (
    <div className="governance-portal">
      <header>
        <h1>StartShield Governance Portal</h1>
      </header>
      <VotingMechanism /> 
      <CommunityDiscussions /> 
      {/* Alte secțiuni pot*/}
      <footer>
        <p>© 2024 StartShield. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
};

export default GovernancePortal;


// import React, { lazy, Suspense } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // Import componentele lazy-loaded
// // const Overview = lazy(() => import('./Overview'));
// const VotingMechanism = lazy(() => import('./VotingMechanism'));
// const CommunityDiscussions = lazy(() => import('./CommunityDiscussions'));

// // Componenta principală
// function GovernancePortal() {
//   return (
//     <BrowserRouter>
//       <div className="governance-portal">
//         {/* Header sau alte elemente comune */}
//         <Routes>
//           <Route path="/" element={<Overview />} />
//           <Route path="/voting" element={
//             <Suspense fallback={<div>Loading...</div>}>
//               <VotingMechanism />
//             </Suspense>
//           } />
//           <Route path="/discussions" element={
//             <Suspense fallback={<div>Loading...</div>}>
//               <CommunityDiscussions />
//             </Suspense>
//           } />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default GovernancePortal;
