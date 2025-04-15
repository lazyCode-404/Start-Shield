import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import CC from '../CheckConnectivity/connectivityCheck.jsx';
import { Principal } from '@dfinity/principal';


const AllUsersView = () => {
    const { backendActor } = useAuth();
    const navigate = useNavigate();
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
                console.log("Fetching all users");
                const allUsers = await backendActor.getAllUsers();
                
                if (!allUsers || !Array.isArray(allUsers)) {
                    throw new Error("Invalid user data received");
                }
                
                console.log("Users data received:", allUsers);
                setUsers(allUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(`Error fetching users: ${error.message || String(error)}`);
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

    const formatBigInt = (value) => {
        if (typeof value === 'bigint') {
            return Number(value).toLocaleString();
        }
        return value?.toString() || 'N/A';
    };

    const getOptionalValue = (optionalArray, defaultValue = 'N/A') => {
        if (Array.isArray(optionalArray) && optionalArray.length > 0) {
            return optionalArray[0];
        }
        return defaultValue;
    };

    const getImageUrl = (photoArray) => {
        if (!Array.isArray(photoArray) || photoArray.length === 0 || !photoArray[0]) {
            return null;
        }

        try {
            const bytes = new Uint8Array(photoArray[0]);
            const blob = new Blob([bytes], { type: 'image/jpeg' });
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error("Error creating image URL:", error);
            return null;
        }
    };

    const handleViewDetails = (user) => {
        if (user && user.principal) {
            navigate(`/userManagement/profile/${user.principal.toString()}`);
        }
    };

    const handleEditUser = (user) => {
        if (user && user.principal) {
            navigate(`/userManagement/edit/${user.principal.toString()}`);
        }
    };

    const filteredUsers = () => {
        if (filter === 'all') return users;
        
        return users.filter(user => {
            const status = user.status ? getVariantValue(user.status) : null;
            return filter === 'active' ? status === 'ACTIVE' : status === 'INACTIVE';
        });
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
                <button onClick={() => navigate('/userManagement')} className="return-button">
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
                                {user.photo && user.photo.length > 0 ? (
                                    <img 
                                        src={getImageUrl(user.photo)} 
                                        alt={user.name} 
                                        className="user-avatar"
                                    />
                                ) : (
                                    <div className="user-avatar-placeholder">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <h3>{user.name}</h3>
                            </div>
                            
                            <div className="user-details">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Access Level:</strong> {getVariantValue(user.accessLevel)}</p>
                                <p><strong>Admin Status:</strong> {getVariantValue(user.adminStatus)}</p>
                                <p><strong>Status:</strong> {user.status ? getVariantValue(user.status) : 'N/A'}</p>
                            </div>
                            
                            <div className="user-actions">
                                <button onClick={() => handleViewDetails(user)}>View Details</button>
                                <button onClick={() => handleEditUser(user)}>Edit</button>
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
                <button onClick={() => navigate('/userManagement')} className="return-button">
                    Return to User Management
                </button>
            </div>
        </div>
    );
};

export default AllUsersView;


