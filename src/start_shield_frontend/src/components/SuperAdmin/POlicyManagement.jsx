import React, { useState, useEffect } from "react";
import "./PolicyManagement.css";
import data from "../../../data.json";

const PolicyManagemet = () => {
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    coverage: "",
    startDate: "",
    endDate: "",
    insuredValue: 0,
    policyValue: 0,
    premium: false,
    active: false,
  });

  useEffect(() => {
    setPolicies(data.policies);
    setClaims(data.claims);
  }, []);

  // Sortable Table Headers
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const sortData = (dataList) => {
    return [...dataList].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Sorting Handler
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Form Handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleCreatePolicy = (e) => {
    e.preventDefault();
    setPolicies([...policies, { ...formData }]);
    setFormData({
      id: "",
      coverage: "",
      startDate: "",
      endDate: "",
      insuredValue: 0,
      policyValue: 0,
      premium: false,
      active: false,
    });
  };

  return (
    <div className="app-container">
      <h1>Insurance Management Dashboard</h1>

      {/* Policy Overview */}
      <section className="section">
        <h2>Policy Overview</h2>
        <table>
          <thead>
            <tr>
              {["id", "active", "coverage", "endDate"].map((key) => (
                <th key={key} onClick={() => handleSort(key)}>
                  {key.toUpperCase()} {sortConfig.key === key ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortData(policies).map((policy) => (
              <tr key={policy.id}>
                <td>{policy.id}</td>
                <td>{policy.active ? "Active" : "Inactive"}</td>
                <td>{policy.coverage}</td>
                <td>{policy.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Claims Management */}
      <section className="section">
        <h2>Claims Management</h2>
        <table>
          <thead>
            <tr>
              {["id", "status", "policyId"].map((key) => (
                <th key={key} onClick={() => handleSort(key)}>
                  {key.toUpperCase()} {sortConfig.key === key ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {sortData(claims).map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.status}</td>
                <td>{claim.policyId}</td>
                <td>
                  <button className="btn">Review</button>
                  <button className="btn">Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Policy Creation & Updates */}
      <section className="section">
        <h2>Create / Update Policy</h2>
        <form onSubmit={handleCreatePolicy} className="form">
          <input
            type="text"
            name="id"
            placeholder="Policy ID"
            value={formData.id}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="coverage"
            placeholder="Coverage Type"
            value={formData.coverage}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="insuredValue"
            placeholder="Insured Value"
            value={formData.insuredValue}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="policyValue"
            placeholder="Policy Value"
            value={formData.policyValue}
            onChange={handleInputChange}
          />
          <label>
            Premium:
            <input
              type="checkbox"
              name="premium"
              checked={formData.premium}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="btn">Create Policy</button>
        </form>
      </section>
    </div>
  );
};

export default PolicyManagemet;
