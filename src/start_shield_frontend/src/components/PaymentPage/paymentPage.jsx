import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AppContext"; // Context pentru autentificare
import "bootstrap/dist/css/bootstrap.min.css";

const isDevelopment = process.env.NODE_ENV === "development";

const SecurePaymentsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { principal, isAuthenticated, backendActor } = useAuth(); // Obținem principalul utilizatorului logat

    // Extragem datele din location.state sau folosim valori implicite
    const { paymentOption = "", policyValue = 0, policyOwner = "", policyDetails } = location.state || {};

    const [paymentStatus, setPaymentStatus] = useState(null);
    const [customPaymentOption, setCustomPaymentOption] = useState(paymentOption);
    const [customPolicyValue, setCustomPolicyValue] = useState(policyValue);
    const [recipientPrincipal, setRecipientPrincipal] = useState(""); // Principal-ul destinatarului
    const [paymentTable, setPaymentTable] = useState([]); // Datele pentru tabelul de plăți

    useEffect(() => {
        // Verificăm dacă utilizatorul este logat
        if (!isAuthenticated) {
            alert("Trebuie să fiți autentificat pentru a accesa această pagină.");
            navigate("/"); // Redirecționăm utilizatorul către pagina principală
        }

        // Obținem polițele din backend
        const fetchPolicies = async () => {
            try {
                const policies = await backendActor.getPoliciesByPrincipal(principal.toText());
                if (policies && policies.length > 0) {
                    setPaymentTable(policies.map(policy => ({
                        id: policy.id,
                        name: policy.companyName,
                        amount: policy.policyValue,
                        insuranceType: policy.insuranceType,
                        startDate: policy.startDate,
                        endDate: policy.endDate,
                    })));
                } else {
                    alert("Nu există polițe asociate acestui principal.");
                }
            } catch (error) {
                console.error("Eroare la obținerea polițelor din backend:", error);
                alert("A apărut o eroare la obținerea polițelor. Verificați consola.");
            }
        };

        fetchPolicies();
    }, [isAuthenticated, backendActor, principal, navigate]);

    useEffect(() => {
        if (!policyDetails) {
            alert("No policy details available!");
        }
    }, [policyDetails]);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                console.log("Caller principal:", principal.toText());
                const policies = await backendActor.getPoliciesByPrincipal(principal.toText());
                if (policies && Array.isArray(policies)) {
                    setPaymentTable(policies.map(policy => ({
                        id: policy.id || "N/A",
                        name: policy.companyName || "Unknown",
                        amount: policy.coverage || 0,
                        insuranceType: policy.policyType || "Unknown",
                        startDate: new Date(policy.createdAt / 1000000).toLocaleDateString(),
                        endDate: new Date(policy.expiresAt / 1000000).toLocaleDateString(),
                    })));
                } else {
                    console.warn("No policies found for this principal.");
                    setPaymentTable([]);
                }
            } catch (error) {
                console.error("Error fetching policies:", error);
            }
        };

        if (principal) {
            fetchPolicies();
        }
    }, [backendActor, principal]);

    const simulatePayment = (amount) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (amount > 0) {
                    resolve("Plata a fost efectuată cu succes!");
                } else {
                    reject("Plata a eșuat. Suma trebuie să fie mai mare decât 0.");
                }
            }, 1000); // Simulează un timp de procesare de 1 secundă
        });
    };

    const handlePayment = async () => {
        try {
            const message = isDevelopment
                ? await simulatePayment(customPolicyValue)
                : await processRealPayment(customPolicyValue); // Funcție pentru plăți reale
            setPaymentStatus({ success: true, message });
        } catch (error) {
            setPaymentStatus({ success: false, message: error });
        }
    };

    const handleSendMoney = async () => {
        if (!recipientPrincipal || customPolicyValue <= 0) {
            alert("Introduceți un Principal valid și o sumă mai mare decât 0.");
            return;
        }

        try {
            const message = `Banii au fost trimiși către ${recipientPrincipal} cu succes!`;
            setPaymentStatus({ success: true, message });
        } catch (error) {
            setPaymentStatus({ success: false, message: "Trimiterea banilor a eșuat." });
        }
    };

    const handleSelectPayment = (payment) => {
        setCustomPolicyValue(payment.amount);
        setCustomPaymentOption(payment.id);
    };

    const createTestPolicy = async () => {
        try {
            const result = await backendActor.createPolicy(
                { "#basic": null }, // Tipul poliței
                1000, // Acoperirea
                100 // Prima
            );
            console.log("Policy created:", result);
        } catch (error) {
            console.error("Error creating policy:", error);
        }
    };

    return (
        <div className="container mt-4">
            {/* Header Section */}
            <div className="card shadow-lg p-4 border-0">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                    <h1 className="h4 text-primary">Sistem de Plăți Securizat ICP</h1>
                    <button className="btn btn-outline-primary btn-lg">
                        <i className="bi bi-person-circle me-2"></i>Conectare cu Internet Identity
                    </button>
                </div>

                {/* Welcome Message */}
                <div className="alert alert-info text-center" id="greeting">
                    <strong>Bun venit!</strong> Gestionați plățile în siguranță.
                </div>

                {/* Payment Table */}
                <div className="mb-4">
                    <h2 className="h5">Plăți Disponibile</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Număr Asigurare</th>
                                <th>Nume</th>
                                <th>Suma</th>
                                <th>Acțiune</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentTable.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.name}</td>
                                    <td>{payment.amount} ICP</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleSelectPayment(payment)}
                                        >
                                            Selectează
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Payment Form */}
                <div className="mb-4 p-3 border rounded bg-light shadow-sm">
                    <h2 className="h5 mb-3">Confirmare Plată</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="paymentOption" className="form-label">Număr Asigurare</label>
                            <input
                                type="text"
                                id="paymentOption"
                                className="form-control"
                                placeholder="Introduceți numărul asigurării"
                                value={customPaymentOption}
                                onChange={(e) => setCustomPaymentOption(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="policyValue" className="form-label">Suma</label>
                            <input
                                type="number"
                                id="policyValue"
                                className="form-control"
                                placeholder="Introduceți suma"
                                value={customPolicyValue}
                                onChange={(e) => setCustomPolicyValue(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary btn-lg w-100"
                            onClick={handlePayment}
                        >
                            Confirmă Plata
                        </button>
                    </form>
                </div>

                {/* Send Money Section */}
                <div className="mb-4 p-3 border rounded bg-light shadow-sm">
                    <h2 className="h5 mb-3">Trimite Bani</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="recipientPrincipal" className="form-label">Principal Destinatar</label>
                            <input
                                type="text"
                                id="recipientPrincipal"
                                className="form-control"
                                placeholder="Introduceți Principal-ul destinatarului"
                                value={recipientPrincipal}
                                onChange={(e) => setRecipientPrincipal(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sendAmount" className="form-label">Suma</label>
                            <input
                                type="number"
                                id="sendAmount"
                                className="form-control"
                                placeholder="Introduceți suma"
                                value={customPolicyValue}
                                onChange={(e) => setCustomPolicyValue(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-success btn-lg w-100"
                            onClick={handleSendMoney}
                        >
                            Trimite Bani
                        </button>
                    </form>
                </div>

                {paymentStatus && (
                    <div
                        className={`alert mt-3 ${
                            paymentStatus.success ? "alert-success" : "alert-danger"
                        }`}
                    >
                        {paymentStatus.message}
                    </div>
                )}

                {/* Policy Details Section */}
                <div className="mb-4 p-3 border rounded bg-light shadow-sm">
                    <h2 className="h5 mb-3">Detalii Poliță</h2>
                    {policyDetails ? (
                        <div>
                            <p><strong>Policy Owner:</strong> {policyOwner}</p>
                            <p><strong>Payment Option:</strong> {paymentOption}</p>
                            <p><strong>Policy Value:</strong> {policyValue} ICP</p>
                            <p><strong>Company Name:</strong> {policyDetails.companyName}</p>
                            <p><strong>Insurance Type:</strong> {policyDetails.insuranceType}</p>
                            <p><strong>Start Date:</strong> {policyDetails.startDate}</p>
                            <p><strong>End Date:</strong> {policyDetails.endDate}</p>
                        </div>
                    ) : (
                        <p>No policy details available.</p>
                    )}
                </div>
                <button onClick={createTestPolicy} className="btn btn-secondary">
                    Create Test Policy
                </button>
            </div>

            {/* Footer Section */}
            <footer className="text-center mt-5">
                <p>&copy; 2025 Sistem de Plăți Securizat ICP. Toate drepturile rezervate.</p>
            </footer>
        </div>
    );
};

export default SecurePaymentsPage;
