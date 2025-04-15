import React, { useEffect, useState } from "react";
import "./DashboardOverview.css";
import CC from '../CheckConnectivity/connectivityCheck.jsx';

// Importa datele din data.json
import data from "../../../data.json";

const DashboardOverview = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [activePolicies, setActivePolicies] = useState([]);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Simulare tranzacții recente și evenimente viitoare
  const mockTransactions = [
    { id: "TXN123", amount: 100, date: "2024-10-20" },
    { id: "TXN124", amount: 200, date: "2024-11-01" },
  ];
  const mockEvents = [
    { id: "EVT123", title: "Training Session 1", date: "2024-11-15" },
    { id: "EVT124", title: "Insurance Workshop", date: "2024-12-01" },
  ];

  // Inițializare date la montarea componentelor
  useEffect(() => {
    const user = data.users.find((user) => user.status === "Active");
    setUserInfo(user);
    
    // Filtrarea polițelor active
    const active = data.policies.filter((policy) => policy.active);
    setActivePolicies(active);

    // Calculul soldului de token STSH
    const totalTokens = active.reduce((sum, policy) => sum + policy.tokensEarned, 0);
    setTokenBalance(totalTokens);

    // Setarea tranzacțiilor recente și a evenimentelor
    setRecentTransactions(mockTransactions);
    setUpcomingEvents(mockEvents);
  }, []);

  return (
    <div className="dashboard-container">
       <CC/>
      <h2>Welcome, {userInfo?.name || "Guest"}!</h2>

      <div className="widgets-container">
        {/* Policy Summary */}
        <div className="widget">
          <h3>Policy Summary</h3>
          <p>Total Active Policies: {activePolicies.length}</p>
          <ul>
            {activePolicies.map((policy) => (
              <li key={policy.id}>
                <strong>{policy.id}:</strong> {policy.coverage} - Ends on {policy.endDate}
              </li>
            ))}
          </ul>
        </div>

        {/* Token Overview */}
        <div className="widget">
          <h3>Token Overview</h3>
          <p>STSH Token Balance: {tokenBalance}</p>
          <ul>
            {recentTransactions.map((txn) => (
              <li key={txn.id}>
                <strong>Transaction:</strong> {txn.id}, Amount: {txn.amount}, Date: {txn.date}
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="widget">
          <h3>Upcoming Events</h3>
          <ul>
            {upcomingEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong> - {event.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
