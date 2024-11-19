import React, { useState, useEffect } from 'react';
import './MyPolicies.css';
import data from '../../../data.json';

function MyPolicies() {
  const [policies, setPolicies] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setPolicies(data.policies);
  }, []);

  const handleSort = (field) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedPolicies = [...policies].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setPolicies(sortedPolicies);
    setSortField(field);
    setSortOrder(order);
  };

  const viewPolicyDetails = (id) => {
    alert(`Viewing details for Policy ID: ${id}`);
  };

  const submitClaim = (id) => {
    alert(`Submitting claim for Policy ID: ${id}`);
  };

  const renewPolicy = (id) => {
    alert(`Renewing Policy ID: ${id}`);
  };

  return (
    <div className="policies-container">
      <h2>My Policies</h2>
      <table className="policies-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>Policy ID</th>
            <th onClick={() => handleSort('active')}>Status</th>
            <th onClick={() => handleSort('coverage')}>Type</th>
            <th onClick={() => handleSort('endDate')}>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id}>
              <td>{policy.id}</td>
              <td>{policy.active ? 'Active' : 'Inactive'}</td>
              <td>{policy.coverage}</td>
              <td>{policy.endDate}</td>
              <td>
                <button onClick={() => viewPolicyDetails(policy.id)}>View</button>
                <button onClick={() => submitClaim(policy.id)}>Claim</button>
                <button onClick={() => renewPolicy(policy.id)}>Renew</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyPolicies;
