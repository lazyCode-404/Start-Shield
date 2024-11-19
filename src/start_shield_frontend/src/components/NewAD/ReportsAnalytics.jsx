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

// import React from 'react';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
// import './ReportsAnalytics.css';

// // Înregistrarea componentelor necesare pentru ChartJS
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

// // Importarea datelor din fișierul data.json
// import data from '../../../data.json';

// const ReportsAnalytics = () => {
//   // Calcularea numărului de polițe active și inactive
//   const activePolicies = data.policies.filter(policy => policy.active).length;
//   const inactivePolicies = data.policies.filter(policy => !policy.active).length;

//   // Date pentru graficul tip Bar (Polițe active vs inactive)
//   const barData = {
//     labels: ['Active', 'Inactive'],
//     datasets: [
//       {
//         label: 'Number of Policies',
//         data: [activePolicies, inactivePolicies],
//         backgroundColor: ['#4caf50', '#f44336'],
//         borderColor: ['#388e3c', '#d32f2f'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Opțiuni pentru graficul tip Bar
//   const barOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//   };

//   // Date pentru graficul tip Pie (Tokens Earned)
//   const totalTokensEarned = data.policies.reduce((acc, policy) => acc + policy.tokensEarned, 0);
//   const pieData = {
//     labels: data.policies.map(policy => policy.id),
//     datasets: [
//       {
//         label: 'Tokens Earned',
//         data: data.policies.map(policy => policy.tokensEarned),
//         backgroundColor: [
//           '#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#f44336',
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   // Opțiuni pentru graficul tip Pie
//   const pieOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'left',
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//   };

//   return (
//     <div className="reports-analytics-container">
//       <h2>Reports & Analytics</h2>

//       <section className="chart-section">
//         <div className="chart-container">
//           <h3>Policy Status</h3>
//           <Bar data={barData} options={barOptions} />
//         </div>

//         <div className="chart-container">
//           <h3>Tokens Earned by Policy</h3>
//           <Pie data={pieData} options={pieOptions} />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ReportsAnalytics;

// import React, { useState, useEffect } from "react";
// import data from "../../../data.json";
// import { Bar } from "react-chartjs-2";
// import { saveAs } from "file-saver";
// import "./ReportsAnalytics.css";

// const ReportsAnalytics = () => {
//   const [userReports, setUserReports] = useState([]);
//   const [policyReports, setPolicyReports] = useState([]);
//   const [chartData, setChartData] = useState({});
  
//   useEffect(() => {
//     generateUserReports();
//     generatePolicyReports();
//     generateChartData();
//   }, []);

//   // Funcție pentru generarea raportului de utilizatori
//   const generateUserReports = () => {
//     const reports = data.users.map((user) => ({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       status: user.status,
//       lastActivity: user.lastActivity,
//     }));
//     setUserReports(reports);
//   };

//   // Funcție pentru generarea raportului de polițe
//   const generatePolicyReports = () => {
//     const reports = data.policies.map((policy) => ({
//       id: policy.id,
//       industry: policy.industry,
//       active: policy.active ? "Active" : "Inactive",
//       insuredValue: policy.insuredValue,
//       tokensEarned: policy.tokensEarned,
//       paymentOption: policy.paymentOption,
//     }));
//     setPolicyReports(reports);
//   };

//   // Generarea datelor pentru graficul de polițe active și inactive
//   const generateChartData = () => {
//     const activePolicies = data.policies.filter((policy) => policy.active).length;
//     const inactivePolicies = data.policies.length - activePolicies;
    
//     setChartData({
//       labels: ["Active Policies", "Inactive Policies"],
//       datasets: [
//         {
//           label: "Number of Policies",
//           data: [activePolicies, inactivePolicies],
//           backgroundColor: ["#36A2EB", "#FF6384"],
//         },
//       ],
//     });
//   };

//   // Exportarea datelor în CSV
//   const exportToCSV = () => {
//     const csvData = [
//       ["User ID", "Name", "Email", "Status", "Last Activity"],
//       ...userReports.map((report) => [
//         report.id,
//         report.name,
//         report.email,
//         report.status,
//         report.lastActivity,
//       ]),
//     ];
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       csvData.map((e) => e.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     saveAs(blob, "user_reports.csv");
//   };

//   return (
//     <div className="reports-analytics">
//       <h1>Reports & Analytics</h1>

//       {/* Raportul de utilizatori */}
//       <section className="report-section">
//         <h2>User Activity Report</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Last Activity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userReports.map((report) => (
//               <tr key={report.id}>
//                 <td>{report.id}</td>
//                 <td>{report.name}</td>
//                 <td>{report.email}</td>
//                 <td>{report.status}</td>
//                 <td>{report.lastActivity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button onClick={exportToCSV}>Export to CSV</button>
//       </section>

//       {/* Raportul de polițe */}
//       <section className="report-section">
//         <h2>Policy Status Report</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Policy ID</th>
//               <th>Industry</th>
//               <th>Status</th>
//               <th>Insured Value</th>
//               <th>Tokens Earned</th>
//               <th>Payment Option</th>
//             </tr>
//           </thead>
//           <tbody>
//             {policyReports.map((report) => (
//               <tr key={report.id}>
//                 <td>{report.id}</td>
//                 <td>{report.industry}</td>
//                 <td>{report.active}</td>
//                 <td>${report.insuredValue}</td>
//                 <td>{report.tokensEarned}</td>
//                 <td>{report.paymentOption}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* Analiză și vizualizare de date */}
//       <section className="chart-section">
//         <h2>Policies Analysis</h2>
//         <Bar data={chartData} />
//       </section>
//     </div>
//   );
// };

// export default ReportsAnalytics;
