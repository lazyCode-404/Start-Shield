// ClaimsProcessing.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

function ClaimsProcessing() {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    fetch('/api/getClaims')
      .then(res => res.json())
      .then(data => setClaims(data))
      .catch(error => console.error('Error fetching claims:', error));
  }, []);

  const handleApproveClaim = (id) => {
    fetch(`/api/approveClaim/${id}`, { method: 'POST' });
    setClaims(claims.map(claim => claim.id === id ? { ...claim, status: 'Approved' } : claim));
  };

  const handleRejectClaim = (id) => {
    fetch(`/api/rejectClaim/${id}`, { method: 'POST' });
    setClaims(claims.map(claim => claim.id === id ? { ...claim, status: 'Rejected' } : claim));
  };

  return (
    <div>
      <h2>Claims Processing</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Claimant</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map(claim => (
            <tr key={claim.id}>
              <td>{claim.id}</td>
              <td>{claim.claimant}</td>
              <td>{claim.description}</td>
              <td>{claim.status}</td>
              <td>
                {claim.status === 'Pending' && (
                  <>
                    <Button variant="success" onClick={() => handleApproveClaim(claim.id)}>Approve</Button>{' '}
                    <Button variant="danger" onClick={() => handleRejectClaim(claim.id)}>Reject</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ClaimsProcessing;

