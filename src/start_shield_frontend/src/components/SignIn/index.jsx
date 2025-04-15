import React, { useState } from 'react';
import { HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { canisterId, createActor } from '../../../../declarations/start_shield_backend/';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

export const Login = ({ onLogin }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      const authClient = await AuthClient.create();

      await authClient.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const agent = new HttpAgent({ identity });
          const actor = createActor(canisterId, { agent });

          // Get user information based on the identity's principal
          const principal = identity.getPrincipal().toText();
          const info = await actor.getUserInfo(principal); // Update this to fetch based on the principal

          if (info) {
            setUserInfo(info);
            onLogin(info);
            navigate('/InsuranceSolution'); // Redirect to InsuranceSolution page
          } else {
            setErrorMessage('User not found. Please sign up first.');
          }
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  const handleLogout = () => {
    setUserInfo(null);
    onLogin(null);
  };

  return (
    <div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {userInfo ? (
        <div>
          <h1>Welcome, {userInfo.firstName} {userInfo.lastName}</h1>
          <h2>You are logged in as {userInfo.role}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Internet Identity</button>
      )}
    </div>
  );
};

