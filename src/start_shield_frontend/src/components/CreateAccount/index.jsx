import React, { useState } from 'react';
import './style.css';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = async () => {
    // Validate input fields
    if (!username || !email || !dob || !address || !firstName || !lastName || !password || !confirmPassword) {
      console.error('Please fill in all required fields.');
      return;
    }

    // Validate email and confirm email
    if (email !== confirmEmail) {
      console.error('Email addresses do not match.');
      return;
    }

    // Validate password and confirm password
    if (password !== confirmPassword) {
      console.error('Passwords do not match.');
      return;
    }

    // Call backend API to create the account
    try {
      const response = await fetch('/api/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          dob,
          address,
          firstName,
          lastName,
          password,
        }),
      });

      if (response.ok) {
        console.log('Account created successfully!');
        // Redirect to login page or perform other actions
      } else {
        console.error('Error creating account');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
 
  };
  

  return (
    <div className="create-account-form">
      <div >
        <h2>Create an Account</h2>
        <input
          type="text"
          placeholder="Firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lastrname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="email"
          placeholder="Confirm Email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* Add other input fields (first name, last name, etc.) similarly */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />     
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
};

export default CreateAccount;
