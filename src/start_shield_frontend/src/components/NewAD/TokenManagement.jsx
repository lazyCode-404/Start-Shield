import React, { useState, useEffect } from "react";
import data from "../../../data.json";
import "./TokenManagement.css";

const TokenManagement = () => {
  const [policies, setPolicies] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [tokensIssued, setTokensIssued] = useState(0);

  useEffect(() => {
    // Inițializăm datele
    setPolicies(data.policies);
    // Generăm tranzacțiile inițiale bazate pe tokensEarned din policies
    const initialTransactions = data.policies.map((policy) => ({
      id: `TX-${policy.id}`,
      policyId: policy.id,
      amount: policy.tokensEarned,
      date: new Date().toLocaleDateString(),
    }));
    setTransactions(initialTransactions);
  }, []);

  // Emite tokeni noi
  const handleTokenIssuance = () => {
    const newTransaction = {
      id: `TX-${transactions.length + 1}`,
      policyId: `BOP-${Math.floor(Math.random() * 100000)}`,
      amount: tokensIssued,
      date: new Date().toLocaleDateString(),
    };
    setTransactions([...transactions, newTransaction]);
    alert(`Emise ${tokensIssued} STSH Tokens`);
  };

  // Sortare tranzacții
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="token-management">
      <h1>Token Management</h1>

      {/* Token Issuance */}
      <section className="section">
        <h2>Token Issuance</h2>
        <div className="token-issuance">
          <input
            type="number"
            placeholder="Tokens to Issue"
            value={tokensIssued}
            onChange={(e) => setTokensIssued(Number(e.target.value))}
          />
          <button onClick={handleTokenIssuance}>Issue Tokens</button>
        </div>
      </section>

      {/* Transaction Monitoring */}
      <section className="section">
        <h2>Transaction Monitoring</h2>
        <table>
          <thead>
            <tr>
              {["id", "policyId", "amount", "date"].map((key) => (
                <th key={key} onClick={() => handleSort(key)}>
                  {key.toUpperCase()} {sortConfig.key === key ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.policyId}</td>
                <td>{tx.amount}</td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Token Utilization */}
      <section className="section">
        <h2>Token Utilization Overview</h2>
        <ul>
          {policies.map((policy) => (
            <li key={policy.id}>
              <strong>Policy ID:</strong> {policy.id} - <strong>Tokens Earned:</strong> {policy.tokensEarned}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TokenManagement;
