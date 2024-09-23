// LegalCompliance.js

import React from 'react';
import './style.css'; 

const LegalCompliance = () => {
  const legalItems = [
    'Terms of Service',
    'Privacy Policy',
    'Regulatory Information',
    'Legal Disclosures',
  ];

  return (
    <div>

      
      <h1>Legal and Compliance</h1>
      <ul className="list-group">
        {legalItems.map((item, index) => (
          <li key={index} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LegalCompliance;
