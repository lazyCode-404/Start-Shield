import React, { useState, useEffect } from 'react';
import { HttpAgent } from '@dfinity/agent';
import { canisterId, createActor } from '../../../../declarations/start_shield_backend/';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const agent = new HttpAgent();
        const actor = createActor(canisterId, { agent });

        // Asigură-te că getAllUsers există pe actor
        const response = await actor.getAllUsers();

        if (response.tag === 'ok') {
          setUsers(response.val);
        } else {
          setErrorMessage(response.err);
        }
      } catch (error) {
        setErrorMessage('Error fetching users');
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-page">
      <h2>Registered Users</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>Name:</strong> {user.firstName} {user.lastName} | 
            <strong>Email:</strong> {user.email} | 
            <strong>Role:</strong> {user.role === 'ADMIN' ? 'Admin' : 'User'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
