import React, { useState, useEffect } from "react";

const SuperAdminPanel = ({ backendActor }) => {
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch pending admin requests
  const fetchPendingAdmins = async () => {
    try {
      if (!backendActor) {
        setMessage("Backend actor nu este inițializat!");
        return;
      }

      const response = await backendActor.getPendingAdmins(); // Apelează funcția din backend
      setPendingAdmins(response || []); // Stochează cererile primite
    } catch (error) {
      console.error("Eroare la preluarea cererilor de admin:", error);
      setMessage("Eroare la preluarea cererilor.");
    }
  };

  // Approve or reject admin requests
  const handleApproval = async (principal, approved) => {
    try {
      if (!backendActor) {
        setMessage("Backend actor nu este inițializat!");
        return;
      }

      const result = await backendActor.handleAdminApproval(principal, approved); // Aprobă sau respinge cererea
      setMessage(result || "Operațiune reușită.");
      fetchPendingAdmins(); // Reîncarcă lista cererilor
    } catch (error) {
      console.error("Eroare la actualizarea statutului adminului:", error);
      setMessage("Eroare la actualizarea statutului.");
    }
  };

  useEffect(() => {
    fetchPendingAdmins(); // Preia cererile în momentul montării componentei
  }, []);

  return (
    <div>
      <h2>Super Admin - Gestionare Cereri</h2>

      {message && <p>{message}</p>}

      <h3>Cereri de Aprobare Admin</h3>
      {pendingAdmins.length > 0 ? (
        <ul>
          {pendingAdmins.map((admin) => (
            <li key={admin.principal}>
              <strong>{admin.name}</strong> ({admin.email})
              <div>
                <button
                  onClick={() => handleApproval(admin.principal, true)}
                >
                  Aprobă
                </button>
                <button
                  onClick={() => handleApproval(admin.principal, false)}
                >
                  Respinge
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nu există cereri de aprobare în așteptare.</p>
      )}
    </div>
  );
};

export default SuperAdminPanel;
