import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import { useAuth } from '../../context/AppContext';
import './PendingApproval.css';

const PendingApproval = ({ user, setActiveSubSection }) => {
  const { backendActor } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [blockReason, setBlockReason] = useState(""); // Motivul blocării

  useEffect(() => {
    if (!user) {
      setError("User data is missing. Please check the input.");
    }
  }, [user]);

  const handleApproval = async (approve) => {
    if (!backendActor || !user || !user.principal) {
      setError("Backend actor or User data is not available.");
      return;
    }

    try {
      const principal = Principal.fromText(user.principal.toString());
      const status = approve ? { Approved: null } : { Rejected: null };
      const result = await backendActor.handleAdminApproval(principal, status);

      if (result.ok) {
        setSuccessMessage(`User has been ${approve ? 'approved' : 'rejected'}.`);
      } else {
        setError(`Failed to ${approve ? 'approve' : 'reject'} user.`);
      }
    } catch (error) {
      console.error(`Error ${approve ? 'approving' : 'rejecting'} user:`, error);
      setError(`Error ${approve ? 'approving' : 'rejecting'} user: ${error.message || String(error)}`);
    }
  };

  const handleRestoreAccount = async () => {
    if (!backendActor || !user || !user.principal) {
      setError("Backend actor or User data is not available.");
      return;
    }

    try {
      const principal = Principal.fromText(user.principal.toString());
      const result = await backendActor.restoreAccount(principal);

      if (result.ok) {
        setSuccessMessage("User account has been restored.");
      } else {
        setError("Failed to restore user account.");
      }
    } catch (error) {
      console.error("Error restoring user account:", error);
      setError(`Error restoring user account: ${error.message || String(error)}`);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User Details</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Principal ID: {user.principal.toString()}</p>
        </div>
      )}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div className="actions">
  <div className="action-buttons">
    <button className="btn btn-success" onClick={() => handleApproval(true)}>Approve</button>
    <button className="btn btn-danger" onClick={() => handleApproval(false)}>Reject</button>
    <button className="btn btn-secondary" onClick={() => setActiveSubSection(null)}>Back</button>
  </div>
</div>
    </div>
  );
};

export default PendingApproval;
