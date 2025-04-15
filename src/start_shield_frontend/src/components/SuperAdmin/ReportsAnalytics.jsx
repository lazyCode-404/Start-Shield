import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import { CSVLink } from 'react-csv';
import 'chart.js/auto';
import './ReportsAnalytics.css';
import data from '../../../data.json';

const ReportsAnalytics = () => {
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [users, setUsers] = useState([]);
  
  // Fetch Data
  useEffect(() => {
    setPolicies(data.policies);
    setClaims(data.claims);
    setUsers(data.users);
  }, []);

  // Data Analysis - Active vs Inactive Policies
  const activePolicies = policies.filter(policy => policy.active).length;
  const inactivePolicies = policies.length - activePolicies;

  const policiesData = {
    labels: ['Active Policies', 'Inactive Policies'],
    datasets: [
      {
        label: 'Policies Status',
        data: [activePolicies, inactivePolicies],
        backgroundColor: ['#4CAF50', '#FF6347'],
      },
    ],
  };

  // Claims Analysis - Solved vs Pending
  const solvedClaims = claims.filter(claim => claim.status === 'Solved').length;
  const pendingClaims = claims.length - solvedClaims;

  const claimsData = {
    labels: ['Solved Claims', 'Pending Claims'],
    datasets: [
      {
        label: 'Claims Status',
        data: [solvedClaims, pendingClaims],
        backgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Users Activity
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const inactiveUsers = users.length - activeUsers;

  const usersData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        label: 'User Activity',
        data: [activeUsers, inactiveUsers],
        backgroundColor: ['#008080', '#FF4500'],
      },
    ],
  };

  // Export Functions
  const handlePDFExport = () => {
    const doc = new jsPDF();
    doc.text('Reports & Analytics', 10, 10);
    doc.text(`Active Policies: ${activePolicies}`, 10, 20);
    doc.text(`Inactive Policies: ${inactivePolicies}`, 10, 30);
    doc.text(`Solved Claims: ${solvedClaims}`, 10, 40);
    doc.text(`Pending Claims: ${pendingClaims}`, 10, 50);
    doc.text(`Active Users: ${activeUsers}`, 10, 60);
    doc.text(`Inactive Users: ${inactiveUsers}`, 10, 70);
    doc.save('report.pdf');
  };

  const csvData = [
    ["Metric", "Value"],
    ["Active Policies", activePolicies],
    ["Inactive Policies", inactivePolicies],
    ["Solved Claims", solvedClaims],
    ["Pending Claims", pendingClaims],
    ["Active Users", activeUsers],
    ["Inactive Users", inactiveUsers]
  ];

  return (
    <div className="reports-analytics">
      <h1>Reports & Analytics Dashboard</h1>
      
      <div className="chart-container">
        <div className="chart">
          <Bar data={policiesData} />
        </div>
        <div className="chart">
          <Pie data={claimsData} />
        </div>
        <div className="chart">
          <Line data={usersData} />
        </div>
      </div>

      <div className="export-buttons">
        <button onClick={handlePDFExport}>Export as PDF</button>
        <CSVLink data={csvData} filename="report.csv">Export as CSV</CSVLink>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
