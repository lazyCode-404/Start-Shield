// SignIn.js

import React, { useState } from 'react';
import './style.css'; // Import the CSS file

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Validate input fields
    if (!username || !password) {
      console.error('Please fill in both username and password.');
      return;
    }

    // Call backend API for sign-in
    try {
      const response = await fetch('/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Sign-in successful!');
        // Redirect to dashboard or other actions
      } else {
        console.error('Invalid username or password.');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="sign-in-form">
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      <p>
        <a href="/forgot-password">Forgot your password?</a>
      </p>
      <p>
        Don't have an account? <a href="/sign-up">Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;
