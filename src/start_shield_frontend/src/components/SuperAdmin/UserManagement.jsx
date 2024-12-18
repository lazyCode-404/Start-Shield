import React, { useState, useEffect } from 'react';
import data from '../../../data.json';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState(data.users);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = (column) => {
        const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortOrder(order);

        const sortedUsers = [...users].sort((a, b) => {
            const valA = a[column];
            const valB = b[column];
            if (typeof valA === "string") {
                return (order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA));
            } else {
                return (order === "asc" ? valA - valB : valB - valA);
            }
        });
        setUsers(sortedUsers);
    };


    const handleActionClick = (userId, action) => {
        // Add logic for Edit, View Profile, or Deactivate
        console.log(`${action} action on User ID: ${userId}`);
    };

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        {["name", "status", "role", "lastActivity"].map((column) => (
                            <th key={column} onClick={() => handleSort(column)}>
                                {column.charAt(0).toUpperCase() + column.slice(1)}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.status}</td>
                            <td>{user.role}</td>
                            <td>{user.lastActivity}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleActionClick(user.id, "Edit")}>Edit</button>
                                <button className="view-profile-button" onClick={() => handleActionClick(user.id, "View Profile")}>View Profile</button>
                                <button className="deactivate-button" onClick={() => handleActionClick(user.id, "Deactivate")}>Deactivate</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
