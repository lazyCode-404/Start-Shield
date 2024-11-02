import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import data from '../../../data.json'; // Assuming data.json is imported

const ViewPolicies = () => {
  const [policies, setPolicies] = useState(data.policies); // Get policies from JSON

  return (
    <Container className="input-field">
      <h4>Your Active Policies</h4>
      {policies.length > 0 ? (
        <div className="summary-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <>
                  <tr>
                    <td>Policy ID</td>
                    <td>{policy.id}</td>
                  </tr>
                  <tr>
                    <td>Industry</td>
                    <td>{policy.industry}</td>
                  </tr>
                  <tr>
                    <td>Revenue</td>
                    <td>{policy.revenue}</td>
                  </tr>
                  <tr>
                    <td>Employees</td>
                    <td>{policy.employees}</td>
                  </tr>
                  <tr>
                    <td>Coverage</td>
                    <td>{policy.coverage}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{policy.active ? "Active" : "Inactive"}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No active policies found.</p>
      )}
    </Container>
  );
};

export default ViewPolicies;
