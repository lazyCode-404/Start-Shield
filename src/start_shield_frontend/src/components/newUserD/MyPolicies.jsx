import React, { useState, useEffect } from 'react';
import ClaimForm from "./ClaimForm.jsx"; // Import the ClaimForm component
import './MyPolicies.css';
import { useAuth } from '../../context/AppContext'; // Import context for Principal

function MyPolicies() {
  const { backendActor, principal } = useAuth(); // Get backendActor and Principal
  const [policies, setPolicies] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc'); // Default to newest first
  const [selectedPolicy, setSelectedPolicy] = useState(null); // Store the selected policy for claims

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const userPolicies = await backendActor.getPoliciesByPrincipal(principal.toText());
        if (!userPolicies || !Array.isArray(userPolicies)) {
          console.error("Invalid data format:", userPolicies);
          setPolicies([]); // Setăm un array gol dacă datele sunt invalide
          return;
        }
        const sortedPolicies = userPolicies.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setPolicies(sortedPolicies);
      } catch (error) {
        console.error("Failed to fetch policies:", error);
        setPolicies([]); // Setăm un array gol în caz de eroare
      }
    };

    fetchPolicies();
  }, [backendActor, principal]);

  useEffect(() => {
    const fetchPrincipal = async () => {
        try {
            const principal = await backendActor.getCallerPrincipal();
            console.log("Caller principal from backend:", principal.toText());
        } catch (error) {
            console.error("Error fetching principal:", error);
        }
    };

    fetchPrincipal();
}, [backendActor]);

  const handleSort = (field) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedPolicies = [...policies].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setPolicies(sortedPolicies);
    setSortField(field);
    setSortOrder(order);
  };

  const viewPolicyDetails = (id) => {
    alert(`Viewing details for Policy ID: ${id}`);
  };

  const submitClaim = (policy) => {
    setSelectedPolicy(policy); // Set the selected policy for the Claim Form
  };

  const closeClaimForm = () => {
    setSelectedPolicy(null); // Close the Claim Form
  };

  const renewPolicy = (id) => {
    alert(`Renewing Policy ID: ${id}`);
  };

  const getRowClass = (policy) => {
    const today = new Date();
    const expiryDate = new Date(policy.endDate);
    const daysToExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    if (expiryDate < today) {
      return 'expired-policy'; // Red background for expired policies
    } else if (daysToExpiry <= 10) {
      return 'near-expiry-policy'; // Yellow background for policies expiring in 10 days
    }
    return '';
  };

  return (
    <div className="policies-container">
      <h2>My Policies</h2>
      {policies && policies.length > 0 ? (
        <table className="policies-table">
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Status</th>
              <th>Type</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td>{policy.id || "N/A"}</td>
                <td>{policy.status === "active" ? "Active" : "Inactive"}</td>
                <td>{policy.coverage || "Unknown"}</td>
                <td>{policy.endDate || "N/A"}</td>
                <td>
                  <button onClick={() => viewPolicyDetails(policy.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Nu există polițe disponibile.</p>
      )}
    </div>
  );
}

export default MyPolicies;
