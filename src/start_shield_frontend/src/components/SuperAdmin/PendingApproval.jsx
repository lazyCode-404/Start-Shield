import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import { useAuth } from '../../context/AppContext';

const PendingApproval = () => {
  const { backendActor } = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams(); // Extrage userId din URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!backendActor) {
        console.error("Backend actor is not available");
        setError("Backend actor is not available.");
        setLoading(false);
        return;
      }

      if (!userId) {
        console.error("User ID is missing");
        setError("User ID is missing. Please check the input.");
        setLoading(false);
        return;
      }

      try {
        const principal = Principal.fromText(userId); // Convertim userID în Principal
        const userData = await backendActor.getUserById(principal);

        if (!userData || (Array.isArray(userData) && userData.length === 0)) {
          setError("User not found in the system");
        } else {
          setUser(Array.isArray(userData) ? userData[0] : userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(`Error fetching user: ${error.message || String(error)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [backendActor, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User Details</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Principal ID: {Principal.fromText(user.principal).toString()}</p>
        </div>
      )}
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default PendingApproval;
