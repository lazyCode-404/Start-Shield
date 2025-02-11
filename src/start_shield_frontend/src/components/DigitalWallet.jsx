// import React, { useState, useEffect } from 'react';

// const DigitalWallet = ({ principal }) => {
//   const [balance, setBalance] = useState(0);

//   useEffect(() => {
//     if (principal) {
//       fetchBalance(principal);
//     }
//   }, [principal]);

//   const fetchBalance = async (principal) => {
//     try {
//       const response = await fetch("/wallet/getBalance", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ principal }),
//       });
//       const data = await response.json();
//       setBalance(data.balance);
//     } catch (error) {
//       console.error("Eroare la obținerea soldului:", error);
//     }
//   };

//   const mintTokens = async (amount) => {
//     try {
//       const response = await fetch("/wallet/mint", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ principal, amount }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         console.log(`S-au emis ${amount} tokeni pentru ${principal}`);
//         fetchBalance(principal);
//       }
//     } catch (error) {
//       console.error("Eroare la emiterea de tokeni:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Portofel Digital</h2>
//       <p>Sold: {balance} ICP</p>
//       <button onClick={() => mintTokens(100)}>Emite 100 Tokeni</button>
//     </div>
//   );
// };

// export default DigitalWallet;
