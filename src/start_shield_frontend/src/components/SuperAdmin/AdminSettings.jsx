import React, { useState, useEffect } from "react";
import "./AdminSettings.css";
import data from "../../../data.json";

const AdminSettings = () => {
  const [profile, setProfile] = useState(data.users[0]);
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    passwordUpdated: "2024-01-01",
  });
  const [system, setSystem] = useState({
    theme: "Light",
    notifications: true,
    language: "English",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSecurityChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSecurity({ ...security, [name]: type === "checkbox" ? checked : value });
  };

  const handleSystemChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSystem({ ...system, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="admin-settings">
      <h1>Admin Settings</h1>
      <div className="section">
        <h2>Profile Management</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
            />
          </label>
          <button type="button" onClick={() => alert("Profile updated!")}>
            Save Changes
          </button>
        </form>
      </div>
      <div className="section">
        <h2>Security Settings</h2>
        <form>
          <label>
            Two-Factor Authentication:
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={security.twoFactorAuth}
              onChange={handleSecurityChange}
            />
          </label>
          <label>
            Last Password Update:
            <input
              type="date"
              name="passwordUpdated"
              value={security.passwordUpdated}
              onChange={handleSecurityChange}
            />
          </label>
          <button type="button" onClick={() => alert("Security updated!")}>
            Save Changes
          </button>
        </form>
      </div>
      <div className="section">
        <h2>System Configuration</h2>
        <form>
          <label>
            Theme:
            <select name="theme" value={system.theme} onChange={handleSystemChange}>
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </label>
          <label>
            Notifications:
            <input
              type="checkbox"
              name="notifications"
              checked={system.notifications}
              onChange={handleSystemChange}
            />
          </label>
          <label>
            Language:
            <select name="language" value={system.language} onChange={handleSystemChange}>
              <option value="English">English</option>
              <option value="Español">Español</option>
              <option value="中文 (Zhōngwén)">中文 (Zhōngwén)</option>
              <option value="العربية (Al-‘Arabīyah)">العربية (Al-‘Arabīyah)</option>
              <option value="हिंदी (Hindi)">हिंदी (Hindi)</option>
              <option value="Nyanja (Chichewa)">Nyanja (Chichewa)</option>
              <option value="Русский (Russkiy)">Русский (Russkiy)</option>
              <option value="Français">Français</option>
              <option value="Kiswahili (Swahili)">Kiswahili (Swahili)</option>
            </select>
          </label>
          <button type="button" onClick={() => alert("System settings updated!")}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
