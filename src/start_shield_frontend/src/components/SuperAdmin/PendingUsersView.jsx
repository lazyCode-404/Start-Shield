import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AppContext';
import CC from '../CheckConnectivity/connectivityCheck.jsx';
import './PendingUsersView.css';

const PendingUsersView = ({ setActiveSubSection }) => {
  const { backendActor } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      if (!backendActor) {
        console.error("Backend actor is not available");
        setError("Backend actor is not available. Please check your authentication.");
        setLoading(false);
        return;
      }

      try {
        const allUsers = await backendActor.getAllUsers();
        const pendingUsers = allUsers.filter(user => {
          const adminStatus = user.adminStatus ? Object.keys(user.adminStatus)[0] : null;
          return adminStatus === "Pending";
        });

        setUsers(pendingUsers);
      } catch (error) {
        console.error("Error fetching pending users:", error);
        setError(`Error fetching pending users: ${error.message || String(error)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, [backendActor]);

  const handleBack = () => {
    setActiveSubSection(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CC />
        <p>Loading pending users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <CC />
        <p>{error}</p>
        <button onClick={handleBack} className="return-button">Return</button>
      </div>
    );
  }

  return (
    <div className="pending-users-container">
      <CC />
      <h2>Pending Users</h2>
      <div className="users-grid">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.principal.toString()} className="user-card">
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Principal ID:</strong> {user.principal.toString()}</p>
            </div>
          ))
        ) : (
          <p>No pending users found.</p>
        )}
      </div>
      <button onClick={handleBack} className="return-button">Return</button>
    </div>
  );
};

export default PendingUsersView;