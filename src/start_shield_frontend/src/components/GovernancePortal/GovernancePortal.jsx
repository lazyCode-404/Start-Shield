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



