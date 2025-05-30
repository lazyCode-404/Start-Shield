import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import './UserProfile.css'; // Import CSS for styling

const UserProfile = ({ user, setActiveSubSection }) => {
    const { backendActor } = useAuth();
    const { principal } = useParams(); // Get the principal from the route params
    const [userData, setUserData] = useState(user || null);
    const [loading, setLoading] = useState(!user); // If user is passed as prop, no need to load
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!backendActor) {
                setError("Backend actor is not available.");
                setLoading(false);
                return;
            }

            if (!user && !principal) {
                setError("User data or principal is not available.");
                setLoading(false);
                return;
            }

            try {
                console.log(`Fetching user with principal: ${principal}`);
                const userPrincipal = user ? user.principal : Principal.fromText(principal);
                const userData = await backendActor.getUserById(userPrincipal);

                if (userData && Array.isArray(userData) && userData.length > 0) {
                    setUserData(userData[0]);
                } else {
                    setError("User not found.");
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to fetch user details.");
            } finally {
                setLoading(false);
            }
        };

        if (!user) {
            fetchUser();
        }
    }, [backendActor, principal, user]);

    const handleBack = () => {
        setActiveSubSection(null); // Revine la secțiunea principală UserManagement
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading user details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>User Profile</h2>
                <div className="error-message">
                    <p>{error}</p>
                </div>
                <button onClick={handleBack} className="return-button">
                    Go Back
                </button>
            </div>
        );
    }

    const address = userData.address?.[0] || {
        country: "N/A",
        state: "N/A",
        city: "N/A",
        street: "N/A",
        number: "N/A",
        postalCode: "N/A",
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            {userData ? (
                <div className="user-details">
                    <div className="user-header">
                        {userData.photo && userData.photo.length > 0 ? (
                            <img
                                src={`data:image/jpeg;base64,${btoa(
                                    String.fromCharCode(...new Uint8Array(userData.photo[0]))
                                )}`}
                                alt={userData.name}
                                className="user-avatar"
                            />
                        ) : (
                            <div className="user-avatar-placeholder">
                                {userData.name?.charAt(0).toUpperCase() || "?"}
                            </div>
                        )}
                        <h3>{userData.name}</h3>
                    </div>
                    <div className="user-info">
                        <p><strong>Email:</strong> {userData.email || "N/A"}</p>
                        <p><strong>Phone:</strong> {userData.phone?.[0] || "N/A"}</p>
                        <p><strong>Photo ID:</strong> {userData.photoId?.[0] || "N/A"}</p>
                        <h4>Address:</h4>
                        <p><strong>Country:</strong> {address.country}</p>
                        <p><strong>State:</strong> {address.state}</p>
                        <p><strong>City:</strong> {address.city}</p>
                        <p><strong>Street:</strong> {address.street}</p>
                        <p><strong>Number:</strong> {address.number}</p>
                        <p><strong>Postal Code:</strong> {address.postalCode}</p>
                    </div>
                </div>
            ) : (
                <p>No user details available.</p>
            )}
            <div className="user-profile">
                <h2>{user.name}'s Profile</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Access Level:</strong> {user.accessLevel ? Object.keys(user.accessLevel)[0] : 'N/A'}</p>
                <p><strong>Status:</strong> {user.status ? Object.keys(user.status)[0] : 'N/A'}</p>
                <p><strong>Principal ID:</strong> {user.principal.toString()}</p>
                {user.photo && user.photo.length > 0 && (
                    <img
                        src={`data:image/jpeg;base64,${btoa(
                            String.fromCharCode(...new Uint8Array(user.photo[0]))
                        )}`}
                        alt={`${user.name} Photo 1`}
                        className="user-photo"
                    />
                )}
                {user.photo2 && user.photo2.length > 0 && (
                    <img
                        src={`data:image/jpeg;base64,${btoa(
                            String.fromCharCode(...new Uint8Array(user.photo2[0]))
                        )}`}
                        alt={`${user.name} Photo 2`}
                        className="user-photo"
                    />
                )}
            </div>
            <button onClick={handleBack} className="return-button">
                Go Back
            </button>
        </div>
    );
};

export default UserProfile;