import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AppContext';
import CC from '../CheckConnectivity/connectivityCheck.jsx';
import { Principal } from '@dfinity/principal';

const AllUsersView = ({ setActiveSubSection }) => {
    const { backendActor } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'inactive'

    useEffect(() => {
        const fetchAllUsers = async () => {
            if (!backendActor) {
                console.error("Backend actor is not available");
                setError("Backend actor is not available. Please check your authentication.");
                setLoading(false);
                return;
            }

            try {
                const principal = Principal.fromText(user.principal);
                const result = await backendActor.handleAdminApproval(principal, { Pending: null });
                console.log("Fetching all users");
                const allUsers = await backendActor.getAllUsers();
                
                if (!allUsers || !Array.isArray(allUsers)) {
                    throw new Error("Invalid user data received");
                }
                
                console.log("Users data received:", allUsers);
                setUsers(allUsers);
                if (result.ok) {
                    setSuccessMessage("User successfully added to pending.");
                } else {
                    setError(result.err || "Failed to add user to pending.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(`Error fetching users: ${error.message || String(error)}`);
                console.error("Error adding user to pending:", error);
            setError(`Error adding user to pending: ${error.message || String(error)}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    }, [backendActor]);

    const getVariantValue = (variantObj) => {
        if (!variantObj || typeof variantObj !== 'object') return 'Unknown';
        return Object.keys(variantObj)[0] || 'Unknown';
    };

    const filteredUsers = () => {
        if (filter === 'all') return users;
        
        return users.filter(user => {
            const status = user.status ? getVariantValue(user.status) : null;
            return filter === 'active' ? status === 'ACTIVE' : status === 'INACTIVE';
        });
    };

    const handleBack = () => {
        setActiveSubSection(null); // Revine la secțiunea principală UserManagement
    };

    if (loading) {
        return (
            <div className="loading-container">
                <CC />
                <div className="spinner"></div>
                <p>Loading users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <CC />
                <h2>All Users</h2>
                <div className="error-message">
                    <p>{error}</p>
                </div>
                <button onClick={handleBack} className="return-button">
                    Return to User Management
                </button>
            </div>
        );
    }

    return (
        <div className="all-users-container">
            <CC />
            <h2>All Users</h2>
            
            <div className="filter-controls">
                <button 
                    className={filter === 'all' ? 'active' : ''} 
                    onClick={() => setFilter('all')}
                >
                    All Users
                </button>
                <button 
                    className={filter === 'active' ? 'active' : ''} 
                    onClick={() => setFilter('active')}
                >
                    Active Users
                </button>
                <button 
                    className={filter === 'inactive' ? 'active' : ''} 
                    onClick={() => setFilter('inactive')}
                >
                    Inactive Users
                </button>
            </div>
            
            <div className="users-grid">
                {filteredUsers().length > 0 ? (
                    filteredUsers().map((user) => (
                        <div key={user.principal.toString()} className="user-card">
                            <div className="user-header">
                                <h3>{user.name}</h3>
                            </div>
                            <div className="user-details">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Access Level:</strong> {getVariantValue(user.accessLevel)}</p>
                                <p><strong>Status:</strong> {user.status ? getVariantValue(user.status) : 'N/A'}</p>
                                <p>Principal ID: {user.principal}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-users-message">
                        <p>No users found with the selected filter.</p>
                    </div>
                )}
            </div>
            
            <div className="action-buttons">
                <button onClick={handleBack} className="return-button">
                    Return to User Management
                </button>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleAddToPending}>Add to Pending</button>
            </div>
        </div>
    );
};

export default AllUsersView;


