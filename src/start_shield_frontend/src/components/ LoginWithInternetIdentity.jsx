// import React, { useState } from 'react';
// import { AuthClient } from '@dfinity/auth-client';

// const LoginWithInternetIdentity = () => {
//   const [status, setStatus] = useState("");

//   const handleLogin = async () => {
//     try {
//       const authClient = await AuthClient.create();
//       await authClient.login({
//         identityProvider: "https://identity.ic0.app",
//         onSuccess: () => {
//           const identity = authClient.getIdentity();
//           const principal = identity.getPrincipal();
//           setStatus(`Autentificare reușită cu Principal: ${principal.toText()}`);
          
//           fetch("/auth/validate", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ principal: principal.toText() })
//           })
//           .then(response => response.json())
//           .then(data => {
//             console.log(data);
//           })
//           .catch(err => console.error("Eșec la validarea principal:", err));
//         }
//       });
//     } catch (err) {
//       console.error("Autentificare eșuată:", err);
//       setStatus("Autentificare eșuată. Vă rugăm să încercați din nou.");
//     }
//   };

//   return (
//     <div>
//       <h2>Autentificare cu Internet Identity</h2>
//       <button onClick={handleLogin}>Autentificare</button>
//       <p>{status}</p>
//     </div>
//   );
// };

// export default LoginWithInternetIdentity;
