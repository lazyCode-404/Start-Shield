import React, { useState } from 'react';
import { registerUser } from '../../utils/api'; // Funcția registerUser
import { validateFormData } from '../../utils/helpers'; // Funcția de validare
import { HttpAgent } from '@dfinity/agent'; // HttpAgent pentru conectarea la canister
import { canisterId, createActor } from '../../../../declarations/start_shield_backend/'; // CanisterId și createActor
import { hashPassword } from '../../utils/bcryptjs'; // Funcția de hash pentru parolă
import './style.css';

const SignUp = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'User',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors.join(' '));
      return;
    }

    try {
      const { firstName, lastName, email, password, role } = formData;

      if (!password) {
        throw new Error('Password is required');
      }
      console.log('Date formular înainte de hashing:', formData);

      const hashedPassword = await hashPassword(formData.password);
      console.log('Parolă hashed:', hashedPassword);

      const agent = new HttpAgent();
      const actor = createActor(canisterId, { agent });

      const response = await actor.registerUser(
        firstName,
        lastName,
        email,
        hashedPassword,
        role === 'Admin' ? { "ADMIN": null } : { "USER": null }
      );
     

      if (response === "User signed up successfully.") {
        onSignUp(response);
        alert('Înregistrare reușită!');
      } else {
        setErrorMessage('Înregistrare eșuată.');
      }
    } catch (error) {
      console.error('Eroare în timpul înregistrării:', error);
      setErrorMessage('A apărut o eroare. Te rog să încerci din nou.');
    }
  };

  return (
    <div className="create-account-form">
      <h2>Sign Up</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="input-field"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="input-field"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="username" // Fixed case
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete="current-password" // Fixed case
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="select-field"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
