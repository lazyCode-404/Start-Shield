import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import data from '../../../data.json'; // Assuming data.json is in the src or public folder

function DashboardPage() {
  const [adminName, setAdminName] = useState("Admin User"); // Set admin's name dynamically if available
  const [role, setRole] = useState("Administrator");

  // Destructure data
  const { policies, claims, companies } = data;

  // Calculate metrics
  const totalActiveUsers = companies.length;
  const newRegistrations = 5; // Example, dynamically set based on your requirements
  const recentActivities = ["User A updated policy", "User B filed a claim"]; // Replace with dynamic data
  
  const activePolicies = policies.filter(policy => policy.active).length;
  const expiringPolicies = policies.filter(policy => new Date(policy.endDate) < new Date()).length;
  
  const totalTokens = 1000000; // Replace with dynamic data
  const recentTransactions = ["TX123: 500 STSH", "TX124: 1000 STSH"];
  
  const alerts = [
    { message: "System maintenance scheduled for tomorrow.", type: "info" },
    { message: "New update available for the admin dashboard.", type: "warning" }
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Hello and Welcome back, {adminName}!</h1>
        <p>Role: {role}</p>
      </header>

      <div className="widgets-container">
        {/* User Statistics */}
        <div className="widget user-statistics">
          <h2>User Statistics</h2>
          <p><strong>Total Active Users:</strong> {totalActiveUsers}</p>
          <p><strong>New Registrations:</strong> {newRegistrations}</p>
          <p><strong>Recent Activities:</strong></p>
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>

        {/* Policy Overview */}
        <div className="widget policy-overview">
          <h2>Policy Overview</h2>
          <p><strong>Active Policies:</strong> {activePolicies}</p>
          <p><strong>Expiring Policies:</strong> {expiringPolicies}</p>
          <p><strong>Claims Status:</strong></p>
          <ul>
            {claims.map(claim => (
              <li key={claim.id}>{claim.description} - <strong>{claim.status}</strong></li>
            ))}
          </ul>
        </div>

        {/* Token Overview */}
        <div className="widget token-overview">
          <h2>Token Overview</h2>
          <p><strong>Total STSH Tokens in Circulation:</strong> {totalTokens}</p>
          <p><strong>Recent Transactions:</strong></p>
          <ul>
            {recentTransactions.map((tx, index) => (
              <li key={index}>{tx}</li>
            ))}
          </ul>
        </div>

        {/* Alerts & Notifications */}
        <div className="widget alerts">
          <h2>Alerts & Notifications</h2>
          <ul>
            {alerts.map((alert, index) => (
              <li key={index} className={`alert ${alert.type}`}>{alert.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
