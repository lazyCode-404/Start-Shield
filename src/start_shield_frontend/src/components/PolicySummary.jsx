import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
// import { getPolicySummary, updatePolicySummary } from '../api';

function PolicySummary() {
  const [activePolicies, setActivePolicies] = useState('');
  const [claimsStatus, setClaimsStatus] = useState('');
  const [renewalDate, setRenewalDate] = useState('');

  useEffect(() => {
    // Fetch data from Motoko backend
    async function fetchData() {
      const data = await getPolicySummary();
      setActivePolicies(data.activePolicies);
      setClaimsStatus(data.claimsStatus);
      setRenewalDate(data.renewalDate);
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const policyData = { activePolicies, claimsStatus, renewalDate };
    await updatePolicySummary(policyData);
    alert('Policy Summary Updated');
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Policy Summary</Card.Title>
        <Form>
          <Form.Group controlId="formActivePolicies">
            <Form.Label>Active Policies</Form.Label>
            <Form.Control
              type="text"
              value={activePolicies}
              onChange={(e) => setActivePolicies(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formClaimsStatus">
            <Form.Label>Claims Status</Form.Label>
            <Form.Control
              type="text"
              value={claimsStatus}
              onChange={(e) => setClaimsStatus(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formRenewalDate">
            <Form.Label>Policy Renewal Date</Form.Label>
            <Form.Control
              type="date"
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PolicySummary;

// import React, { useState } from 'react';
// import { Card, Form, Button } from 'react-bootstrap';

// function PolicySummary() {
//   const [activePolicies, setActivePolicies] = useState("");
//   const [claimsStatus, setClaimsStatus] = useState("");
//   const [renewalDate, setRenewalDate] = useState("");

//   const handleSubmit = () => {
//     // Submit these details to backend (Motoko)
//     console.log({
//       activePolicies,
//       claimsStatus,
//       renewalDate,
//     });
//   };

//   return (
//     <Card>
//       <Card.Body>
//         <Card.Title>Policy Summary</Card.Title>
//         <Form>
//           <Form.Group controlId="formActivePolicies">
//             <Form.Label>Active Policies</Form.Label>
//             <Form.Control
//               type="text"
//               value={activePolicies}
//               onChange={(e) => setActivePolicies(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId="formClaimsStatus">
//             <Form.Label>Claims Status</Form.Label>
//             <Form.Control
//               type="text"
//               value={claimsStatus}
//               onChange={(e) => setClaimsStatus(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId="formRenewalDate">
//             <Form.Label>Policy Renewal Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={renewalDate}
//               onChange={(e) => setRenewalDate(e.target.value)}
//             />
//           </Form.Group>

//           <Button variant="primary" onClick={handleSubmit}>
//             Update
//           </Button>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// }

// export default PolicySummary;
