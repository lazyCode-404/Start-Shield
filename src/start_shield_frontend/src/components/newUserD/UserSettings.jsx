import React, { useState } from "react";
import data from '../../../data.json';
import "./UserSettings.css";

function UserSettings() {
    const { users } = data;
    // State pentru actualizarea profilului
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [editProfile, setEditProfile] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({ ...selectedUser });

    const handleEditToggle = () => {
        setEditProfile(!editProfile);
        setUpdatedUser({ ...selectedUser });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    const handleSaveProfile = () => {
        setSelectedUser(updatedUser);
        setEditProfile(false);
        alert("Profile updated successfully!");
    };
    return (
        <div className="user-settings-container">
            <h1>User Settings</h1>

            {/* Profile Management Section */}
            <div className="section">
                <h2>Profile Management</h2>
                <div className="profile-management">
                    <h3>Current Profile Details</h3>
                    <div className="user-card">
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Phone:</strong> {selectedUser.phone}</p>
                        <p><strong>Status:</strong> {selectedUser.status}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        <p><strong>Last Activity:</strong> {selectedUser.lastActivity}</p>
                    </div>
                    <button className="edit-button" onClick={handleEditToggle}>
                        {editProfile ? "Cancel" : "Edit Profile"}
                    </button>

                    {editProfile && (
                        <div className="edit-form">
                            <h3>Edit Profile</h3>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedUser.name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedUser.email}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Phone:
                                <input
                                    type="text"
                                    name="phone"
                                    value={updatedUser.phone}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button className="save-button" onClick={handleSaveProfile}>
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Security Settings Section */}
            <div className="section">
                <h2>Security Settings</h2>
                <div className="security-settings">
                    <ul>
                        <li>
                            <strong>Change Password</strong>
                            <p>Ensure your password is strong and updated regularly.</p>
                            <button className="security-button" onClick={() => alert("Change password functionality coming soon!")}>
                                Change Password
                            </button>
                        </li>
                        <li>
                            {/* Enable Two-Factor Authentication */}
                            <strong>Enable Two-Factor Authentication</strong>
                            <p>
                                Add an extra layer of security to your account by enabling 2FA.
                            </p>
                            <button className="security-button">Enable 2FA</button>
                        </li>
                        <li>
                            {/* Update Security Questions */}
                            <strong>Update Security Questions</strong>
                            <p>Keep your security questions up-to-date for account recovery.</p>
                            <button className="security-button">Update Questions</button>
                        </li>
                    </ul>
                </div>
            </div>

        </div >
    );
}

export default UserSettings;
