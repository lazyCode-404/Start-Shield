import React, { useState, useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backendIdlFactory, canisterId as backendCanisterId } from "../../../../declarations/SSP001_backend";
import { useLocation } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SecurePaymentsPage = () => {
    const [balance, setBalance] = useState(0);
    const [depositStatus, setDepositStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [recipientId, setRecipientId] = useState("");
    const [amount, setAmount] = useState("");

    // Payment details from the previous page
    const location = useLocation();
    const { policyValue, paymentOption, totalPayment } = location.state || {};

    // Initialize the backend actor
    const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });
    const backendActor = Actor.createActor(backendIdlFactory, {
        agent,
        canisterId: backendCanisterId,
    });

    // Fetch balance on component mount
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const userBalance = await backendActor.getBalance();
                setBalance(userBalance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, [backendActor]);

    // Handle deposit
    const handleDeposit = async () => {
        try {
            setDepositStatus("Processing...");
            await backendActor.deposit();
            const updatedBalance = await backendActor.getBalance();
            setBalance(updatedBalance);
            setDepositStatus("Deposit successful!");
        } catch (error) {
            console.error("Error during deposit:", error);
            setDepositStatus("Deposit failed. Please try again.");
        }
    };

    // Handle payment submission
    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            setPaymentStatus("Processing...");
            const result = await backendActor.createPayment(recipientId, Number(amount));
            if ("ok" in result) {
                setPaymentStatus("Payment successful!");
                const updatedBalance = await backendActor.getBalance();
                setBalance(updatedBalance);
                // Optionally, fetch recent transactions
                fetchTransactions();
            } else {
                setPaymentStatus(`Payment failed: ${result.err}`);
            }
        } catch (error) {
            console.error("Error during payment:", error);
            setPaymentStatus("Payment failed. Please try again.");
        }
    };

    // Fetch recent transactions
    const fetchTransactions = async () => {
        try {
            const recentTransactions = await backendActor.getAllPayments(); // Assuming this method exists
            setTransactions(recentTransactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    // Simulate payment for the policy
    const handlePolicyPayment = () => {
        const isSuccess = Math.random() > 0.5; // Random success or failure
        setPaymentStatus(isSuccess ? "Payment Successful!" : "Payment Failed. Please try again.");
    };

    return (
        <div className="container mt-4">
            {/* Header Section */}
            <div className="card shadow-lg p-4 border-0">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                    <h1 className="h4 text-primary">Secure Payments System</h1>
                    <button className="btn btn-outline-primary btn-lg">
                        <i className="bi bi-person-circle me-2"></i>Connect with Internet Identity
                    </button>
                </div>

                {/* Welcome Message */}
                <div className="alert alert-info text-center" id="greeting">
                    <strong>Welcome!</strong> Manage your payments securely.
                </div>

                {/* Balance Section */}
                <div className="mb-4 text-center">
                    <h2 className="h5">Balance: <span className="fw-bold text-success">{balance}</span> ICP</h2>
                </div>

                {/* Deposit Section */}
                <div className="mb-4 p-3 border rounded bg-light shadow-sm">
                    <h2 className="h5 mb-3">Deposit</h2>
                    <button className="btn btn-success btn-lg w-100" onClick={handleDeposit}>Deposit 100 units</button>
                    <div className="mt-3 text-center" id="deposit-status">{depositStatus}</div>
                </div>

                {/* Policy Payment Section */}
                {policyValue && paymentOption && (
                    <div className="mb-4 p-3 border rounded bg-light shadow-sm">
                        <h2 className="h5 mb-3">Policy Payment</h2>
                        <div>
                            <p><strong>Policy Value:</strong> {policyValue} USD</p>
                            <p><strong>Payment Option:</strong> {paymentOption}</p>
                            <p><strong>Total Payment:</strong> {totalPayment} USD</p>
                        </div>
                        <Button onClick={handlePolicyPayment} className="btn btn-primary btn-lg w-100">
                            Pay for Policy
                        </Button>
                        {paymentStatus && <div className="mt-3 text-center">{paymentStatus}</div>}
                    </div>
                )}

                {/* Payment Section */}
                <div className="mb-4 p-3 border rounded bg-light shadow-sm">
                    <h2 className="h5 mb-3">Send Payment</h2>
                    <form onSubmit={handlePayment}>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Recipient ID"
                            value={recipientId}
                            onChange={(e) => setRecipientId(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            required
                        />
                        <button className="btn btn-primary btn-lg w-100" type="submit">Send</button>
                    </form>
                    <div className="mt-3 text-center" id="payment-status">{paymentStatus}</div>
                </div>

                {/* Recent Transactions Section */}
                <div className="mb-4 p-3 border rounded bg-light shadow-sm">
                    <h2 className="h5 mb-3">Recent Transactions</h2>
                    <table className="table table-hover table-striped">
                        <thead className="table-primary">
                            <tr>
                                <th>ID</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="transactions-table">
                            {transactions.map((tx, index) => (
                                <tr key={index}>
                                    <td>{tx.id}</td>
                                    <td>{tx.from}</td>
                                    <td>{tx.to}</td>
                                    <td>{tx.amount}</td>
                                    <td>{tx.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="text-center mt-5">
                <p>&copy; 2025 Secure Payments System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SecurePaymentsPage;

// import React, { useState, useEffect } from "react";
// import { Actor, HttpAgent } from "@dfinity/agent";
// import { idlFactory as backendIdlFactory, canisterId as backendCanisterId } from "../../../../declarations/SSP001_backend";
// import "bootstrap/dist/css/bootstrap.min.css";

// const SecurePaymentsPage = () => {
//     const [balance, setBalance] = useState(0);
//     const [depositStatus, setDepositStatus] = useState("");
//     const [paymentStatus, setPaymentStatus] = useState("");
//     const [transactions, setTransactions] = useState([]);
//     const [recipientId, setRecipientId] = useState("");
//     const [amount, setAmount] = useState("");

//     // Initialize the backend actor
//     const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });
//     const backendActor = Actor.createActor(backendIdlFactory, {
//         agent,
//         canisterId: backendCanisterId,
//     });

//     // Fetch balance on component mount
//     useEffect(() => {
//         const fetchBalance = async () => {
//             try {
//                 const userBalance = await backendActor.getBalance();
//                 setBalance(userBalance);
//             } catch (error) {
//                 console.error("Error fetching balance:", error);
//             }
//         };

//         fetchBalance();
//     }, [backendActor]);

//     // Handle deposit
//     const handleDeposit = async () => {
//         try {
//             setDepositStatus("Processing...");
//             await backendActor.deposit();
//             const updatedBalance = await backendActor.getBalance();
//             setBalance(updatedBalance);
//             setDepositStatus("Deposit successful!");
//         } catch (error) {
//             console.error("Error during deposit:", error);
//             setDepositStatus("Deposit failed. Please try again.");
//         }
//     };

//     // Handle payment submission
//     const handlePayment = async (e) => {
//         e.preventDefault();
//         try {
//             setPaymentStatus("Processing...");
//             const result = await backendActor.createPayment(recipientId, Number(amount));
//             if ("ok" in result) {
//                 setPaymentStatus("Payment successful!");
//                 const updatedBalance = await backendActor.getBalance();
//                 setBalance(updatedBalance);
//                 // Optionally, fetch recent transactions
//                 fetchTransactions();
//             } else {
//                 setPaymentStatus(`Payment failed: ${result.err}`);
//             }
//         } catch (error) {
//             console.error("Error during payment:", error);
//             setPaymentStatus("Payment failed. Please try again.");
//         }
//     };

//     // Fetch recent transactions
//     const fetchTransactions = async () => {
//         try {
//             const recentTransactions = await backendActor.getAllPayments(); // Assuming this method exists
//             setTransactions(recentTransactions);
//         } catch (error) {
//             console.error("Error fetching transactions:", error);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             {/* Header Section */}
//             <div className="card shadow-lg p-4 border-0">
//                 <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
//                     <h1 className="h4 text-primary">Sistem de Plăți Securizat ICP</h1>
//                     <button className="btn btn-outline-primary btn-lg">
//                         <i className="bi bi-person-circle me-2"></i>Conectare cu Internet Identity
//                     </button>
//                 </div>

//                 {/* Welcome Message */}
//                 <div className="alert alert-info text-center" id="greeting">
//                     <strong>Bun venit!</strong> Gestionați plățile în siguranță.
//                 </div>

//                 {/* Balance Section */}
//                 <div className="mb-4 text-center">
//                     <h2 className="h5">Sold: <span className="fw-bold text-success">{balance}</span> ICP</h2>
//                 </div>

//                 {/* Deposit Section */}
//                 <div className="mb-4 p-3 border rounded bg-light shadow-sm">
//                     <h2 className="h5 mb-3">Depozit</h2>
//                     <button className="btn btn-success btn-lg w-100" onClick={handleDeposit}>Depune 100 unități</button>
//                     <div className="mt-3 text-center" id="deposit-status">{depositStatus}</div>
//                 </div>

//                 {/* Payment Section */}
//                 <div className="mb-4 p-3 border rounded bg-light shadow-sm">
//                     <h2 className="h5 mb-3">Trimite Plată</h2>
//                     <form onSubmit={handlePayment}>
//                         <input
//                             type="text"
//                             className="form-control mb-3"
//                             placeholder="ID Destinatar"
//                             value={recipientId}
//                             onChange={(e) => setRecipientId(e.target.value)}
//                             required
//                         />
//                         <input
//                             type="number"
//                             className="form-control mb-3"
//                             placeholder="Sumă"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             min="1"
//                             required
//                         />
//                         <button className="btn btn-primary btn-lg w-100" type="submit">Trimite</button>
//                     </form>
//                     <div className="mt-3 text-center" id="payment-status">{paymentStatus}</div>
//                 </div>

//                 {/* Recent Transactions Section */}
//                 <div className="mb-4 p-3 border rounded bg-light shadow-sm">
//                     <h2 className="h5 mb-3">Tranzacții Recente</h2>
//                     <table className="table table-hover table-striped">
//                         <thead className="table-primary">
//                             <tr>
//                                 <th>ID</th>
//                                 <th>De la</th>
//                                 <th>Către</th>
//                                 <th>Sumă</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody id="transactions-table">
//                             {transactions.map((tx, index) => (
//                                 <tr key={index}>
//                                     <td>{tx.id}</td>
//                                     <td>{tx.from}</td>
//                                     <td>{tx.to}</td>
//                                     <td>{tx.amount}</td>
//                                     <td>{tx.status}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Footer Section */}
//             <footer className="text-center mt-5">
//                 <p>&copy; 2025 Sistem de Plăți Securizat ICP. Toate drepturile rezervate.</p>
//             </footer>
//         </div>
//     );
// };

// export default SecurePaymentsPage;


// import React from "react";


// import "bootstrap/dist/css/bootstrap.min.css";

// const SecurePaymentsPage = () => {
//     return (
//         <div className="container mt-4">
//             <div className="card shadow-sm p-4">
//                 <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
//                     <h1 className="h4">Sistem de Plăți Securizat ICP</h1>
//                     <button className="btn btn-primary">Conectare cu Internet Identity</button>
//                 </div>

//                 <div className="alert alert-info" id="greeting">
//                     {/* Mesaj de bun venit */}
//                 </div>

//                 <div className="mb-3">
//                     <h2 className="h5">Sold: <span className="fw-bold">100000</span> ICP</h2>
//                 </div>

//                 <div className="mb-3 p-3 border rounded">
//                     <h2 className="h5">Depozit</h2>
//                     <button className="btn btn-success">Depune 100 unități</button>
//                     <div className="mt-2" id="deposit-status"></div>
//                 </div>

//                 <div className="mb-3 p-3 border rounded">
//                     <h2 className="h5">Trimite Plată</h2>
//                     <form>
//                         <input
//                             type="text"
//                             className="form-control mb-2"
//                             placeholder="ID Destinatar"
//                             required
//                         />
//                         <input
//                             type="number"
//                             className="form-control mb-2"
//                             placeholder="Sumă"
//                             min="1"
//                             required
//                         />
//                         <button className="btn btn-primary" type="submit">Trimite</button>
//                     </form>
//                     <div className="mt-2" id="payment-status"></div>
//                 </div>

//                 <div className="mb-3 p-3 border rounded">
//                     <h2 className="h5">Tranzacții Recente</h2>
//                     <table className="table table-bordered mt-2">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>De la</th>
//                                 <th>Către</th>
//                                 <th>Sumă</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* Tranzacțiile vor fi afișate aici */}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SecurePaymentsPage;
