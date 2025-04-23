import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AppContext';
import CC from '../CheckConnectivity/connectivityCheck.jsx';
import { Principal } from '@dfinity/principal';
import './ViewProfile.css';

const AllUsersView = ({ setActiveSubSection }) => {
    const { backendActor } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'inactive', 'pending', 'rejected'
    const [successMessage, setSuccessMessage] = useState(null);
    const [expandedImage, setExpandedImage] = useState(null); // Pentru imaginea mărită

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

    const filteredUsers = () => {
        if (filter === 'all') return users;

        return users.filter(user => {
            const status = user.status ? getVariantValue(user.status) : null;
            const adminStatus = user.adminStatus ? getVariantValue(user.adminStatus) : null;

            if (filter === 'active') return status === 'ACTIVE';
            if (filter === 'inactive') return status === 'INACTIVE';
            if (filter === 'pending') return adminStatus === 'Pending';
            if (filter === 'rejected') return adminStatus === 'Rejected';

            return false;
        });
    };

    const handleAddToPending = async (user) => {
        if (!backendActor || !user || !user.principal) {
            setError("Backend actor or user data is not available.");
            return;
        }

        try {
            const principal = Principal.fromText(user.principal.toString());
            const result = await backendActor.handleAdminApproval(principal, { Pending: null });

            if (result.ok) {
                setSuccessMessage(`User ${user.name} successfully added to pending.`);
            } else {
                setError(result.err || `Failed to add user ${user.name} to pending.`);
            }
        } catch (error) {
            console.error("Error adding user to pending:", error);
            setError(`Error adding user to pending: ${error.message || String(error)}`);
        }
    };

    const handleImageClick = (image) => {
        setExpandedImage(image); // Setează imaginea mărită
    };

    const handleCloseImage = () => {
        setExpandedImage(null); // Închide imaginea mărită
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
                    className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Users
                </button>
                <button
                    className={`filter-button ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Active Users
                </button>
                <button
                    className={`filter-button ${filter === 'inactive' ? 'active' : ''}`}
                    onClick={() => setFilter('inactive')}
                >
                    Inactive Users
                </button>
                <button
                    className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    Pending Users
                </button>
                <button
                    className={`filter-button ${filter === 'rejected' ? 'active' : ''}`}
                    onClick={() => setFilter('rejected')}
                >
                    Rejected Users
                </button>
            </div>

            <div className="users-grid">
                {filteredUsers().length > 0 ? (
                    filteredUsers().map((user) => {
                        const adminStatus = user.adminStatus ? getVariantValue(user.adminStatus) : null;
                        const rowClass =
                            adminStatus === 'Pending'
                                ? 'pending-row'
                                : adminStatus === 'Rejected'
                                ? 'rejected-row'
                                : '';

                        return (
                            <div key={user.principal.toString()} className={`user-card ${rowClass}`}>
                                <div className="user-header">
                                    <h3>{user.name}</h3>
                                </div>
                                <div className="user-details">
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Access Level:</strong> {getVariantValue(user.accessLevel)}</p>
                                    <p><strong>Status:</strong> {user.status ? getVariantValue(user.status) : 'N/A'}</p>
                                    <p>Principal ID: {user.principal.toString()}</p>
                                    {user.photo && user.photo.length > 0 && (
                                        <img
                                            src={`data:image/jpeg;base64,${btoa(
                                                String.fromCharCode(...new Uint8Array(user.photo[0]))
                                            )}`}
                                            alt={`${user.name} Photo 1`}
                                            className="user-photo"
                                            onClick={() => handleImageClick(
                                                `data:image/jpeg;base64,${btoa(
                                                    String.fromCharCode(...new Uint8Array(user.photo[0]))
                                                )}`
                                            )}
                                        />
                                    )}
                                    {user.photo2 && user.photo2.length > 0 && (
                                        <img
                                            src={`data:image/jpeg;base64,${btoa(
                                                String.fromCharCode(...new Uint8Array(user.photo2[0]))
                                            )}`}
                                            alt={`${user.name} Photo 2`}
                                            className="user-photo"
                                            onClick={() => handleImageClick(
                                                `data:image/jpeg;base64,${btoa(
                                                    String.fromCharCode(...new Uint8Array(user.photo2[0]))
                                                )}`
                                            )}
                                        />
                                    )}
                                </div>
                                <button onClick={() => handleAddToPending(user)}>Add to Pending</button>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-users-message">
                        <p>No users found with the selected filter.</p>
                    </div>
                )}
            </div>

            {expandedImage && (
                <div className="image-modal" onClick={handleCloseImage}>
                    <img src={expandedImage} alt="Expanded view" className="expanded-image" />
                </div>
            )}

            <div className="action-buttons">
                <button onClick={handleBack} className="return-button">
                    Return to User Management
                </button>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default AllUsersView;


