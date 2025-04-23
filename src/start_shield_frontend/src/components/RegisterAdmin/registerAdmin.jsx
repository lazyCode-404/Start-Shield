// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '../../context/AppContext';
// import CC from '../CheckConnectivity/connectivityCheck.jsx';
// import './registerAdmin.css';
// import moment from 'moment';

// const SuperAdminPanel = () => {
//   const { backendActor } = useAuth();
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (backendActor) {
//       fetchPendingUsers();
//     } else {
//       setMessage("Backend actor is not available. Please check your setup.");
//     }
//   }, [backendActor]);

//   const fetchPendingUsers = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       if (!backendActor) {
//         setMessage("Eroare: Backend actor nu este inițializat!");
//         return;
//       }

//       const users = await backendActor.getPendingAdmins(); // Reutilizăm funcția pentru a obține utilizatorii în așteptare
//       setPendingUsers(users);
//     } catch (error) {
//       setMessage(`Eroare: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [backendActor]);

//   const handleAction = async (principal, action) => {
//     try {
//       if (!backendActor) {
//         setMessage("Eroare: Backend actor nu este inițializat!");
//         return;
//       }

//       let response;
//       if (action === 'approve') {
//         response = await backendActor.handleUserApproval(principal, { Approved: null });
//       } else if (action === 'reject') {
//         response = await backendActor.handleUserApproval(principal, { Rejected: null });
//       } else if (action === 'restore') {
//         response = await backendActor.restoreUser(principal);
//       }

//       if ('ok' in response) {
//         setMessage(`Utilizator ${action === 'approve' ? 'aprobat' : action === 'reject' ? 'respins' : 'restaurat'} cu succes!`);
//         fetchPendingUsers();
//       } else {
//         setMessage(`Eroare: ${response.err}`);
//       }
//     } catch (error) {
//       setMessage(`Eroare: ${error.message}`);
//     }
//   };

//   return (
//     <div className="super-admin-panel">
//       <CC />
//       {isLoading ? (
//         <div>Se încarcă cererile...</div>
//       ) : (
//         <>
//           {message && <div className="message">{message}</div>}
//           <h2 className="panel-title">Utilizatori în Așteptare</h2>
//           {pendingUsers.length > 0 ? (
//             <ul className="admin-list">
//               {pendingUsers.map(([principal, user]) => (
//                 <li key={principal.toText()} className="admin-item">
//                   <div className="admin-info">
//                     <p><strong>Nume:</strong> {user.name}</p>
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <p><strong>Principal:</strong> {principal.toText()}</p>
//                     <p><strong>Aplicat la:</strong> {moment(Number(user.timestamp)).format('DD-MM-YYYY HH:mm')}</p>
//                   </div>
//                   <div className="admin-actions">
//                     <button className="approve-button" onClick={() => handleAction(principal, 'approve')}>Aprobă</button>
//                     <button className="reject-button" onClick={() => handleAction(principal, 'reject')}>Respinge</button>
//                     <button className="restore-button" onClick={() => handleAction(principal, 'restore')}>Restaurează</button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>Nu există utilizatori în așteptare.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default SuperAdminPanel;

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AppContext';
import CC from '../CheckConnectivity/connectivityCheck.jsx';
import './registerAdmin.css'; // Importăm fișierul CSS
import moment from 'moment'; // Importăm moment.js pentru formatarea datei

const SuperAdminPanel = () => {
  const { backendActor } = useAuth();
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("backendActor:", backendActor);
    if (backendActor) {
      fetchPendingAdmins();
    } else {
      console.error("backendActor is not available!");
      setMessage("Backend actor is not available. Please check your setup.");
    }
  }, [backendActor]);

  const fetchPendingAdmins = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!backendActor) {
        setMessage("Eroare: Backend actor nu este inițializat!");
        return;
      }

      const admins = await backendActor.getPendingAdmins();
      console.log("Admini în așteptare:", admins);
      setPendingAdmins(admins);
    } catch (error) {
      console.error("Eroare la preluarea cererilor:", error);
      setMessage(`Eroare: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [backendActor]);

  const handleApproval = async (principal, approve) => {
    try {
      if (!backendActor) {
        setMessage("Eroare: Backend actor nu este inițializat!");
        return;
      }
      const status = approve ? { Approved: null } : { Rejected: null };
      const response = await backendActor.handleAdminApproval(principal, status);

      if ('ok' in response) {
        setMessage(`Admin ${approve ? 'aprobat' : 'respins'} cu succes!`);
        fetchPendingAdmins();
      } else {
        setMessage(`Eroare: ${response.err}`);
      }
    } catch (error) {
      console.error("Eroare la aprobare/respingere:", error);
      setMessage(`Eroare: ${error.message}`);
    }
  };

  return (
    <div className="super-admin-panel"> {/* Aplicăm clasa container principal */}
      <CC />
      {isLoading ? (
        <div>Se încarcă cererile...</div>
      ) : (
        <>
          {message && <div className="message">{message}</div>}
          <h2 className="panel-title">Cereri Admin în Așteptare</h2> {/* Aplicăm clasa pentru titlu */}
          {pendingAdmins.length > 0 ? (
            <ul className="admin-list"> {/* Aplicăm clasa pentru listă */}
              {pendingAdmins.map(([principal, user]) => (
                <li key={principal.toText()} className="admin-item"> {/* Aplicăm clasa pentru item */}
                  <div className="admin-info">
                    <p><strong>Nume:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Principal:</strong> {principal.toText()}</p>
                    <p><strong>Aplicat la:</strong> {moment(Number(user.timestamp)).format('DD-MM-YYYY HH:mm')}</p>
                  </div>
                  <div className="admin-actions">
                    <button className="approve-button" onClick={() => handleApproval(principal, true)}>Aprobă</button>
                    <button className="reject-button" onClick={() => handleApproval(principal, false)}>Respinge</button>
                  </div>
                  {user.adminStatus && Object.keys(user.adminStatus)[0] === 'Rejected' && (
                    <div className="rejection-message">Cererea a fost respinsă.</div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nu există cereri de admin în așteptare.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SuperAdminPanel;