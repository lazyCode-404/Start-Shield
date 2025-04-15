import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SecurePaymentsPage = () => {
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

                {/* Balance Section */}
                <div className="mb-4 text-center">
                    <h2 className="h5">Sold: <span className="fw-bold text-success">100000</span> ICP</h2>
                </div>

                {/* Deposit Section */}
                <div className="mb-4 p-3 border rounded bg-light shadow-sm">
                    <h2 className="h5 mb-3">Depozit</h2>
                    <button className="btn btn-success btn-lg w-100">Depune 100 unități</button>
                    <div className="mt-3 text-center" id="deposit-status"></div>
                </div>

                {/* Payment Section */}
                <div className="mb-4 p-3 border rounded bg-light shadow-sm">
                    <h2 className="h5 mb-3">Trimite Plată</h2>
                    <form>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="ID Destinatar"
                            required
                        />
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Sumă"
                            min="1"
                            required
                        />
                        <button className="btn btn-primary btn-lg w-100" type="submit">Trimite</button>
                    </form>
                    <div className="mt-3 text-center" id="payment-status"></div>
                </div>

                {/* Recent Transactions Section */}
                <div className="mb-4 p-3 border rounded bg-light shadow-sm">
                    <h2 className="h5 mb-3">Tranzacții Recente</h2>
                    <table className="table table-hover table-striped">
                        <thead className="table-primary" style={{ backgroundColor: "#007bff", color: "#ffffff" }}>
                            <tr>
                                <th style={{ color: "#ffcc00" }}>ID</th>
                                <th style={{ color: "#ffcc00" }}>De la</th>
                                <th style={{ color: "#ffcc00" }}>Către</th>
                                <th style={{ color: "#ffcc00" }}>Sumă</th>
                                <th style={{ color: "#ffcc00" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Tranzacțiile vor fi afișate aici */}
                            <tr style={{ backgroundColor: "#f8f9fa" }}>
                                <td>1</td>
                                <td>Ion</td>
                                <td>Maria</td>
                                <td>100 ICP</td>
                                <td style={{ color: "green" }}>Succes</td>
                            </tr>
                            <tr style={{ backgroundColor: "#e9ecef" }}>
                                <td>2</td>
                                <td>Maria</td>
                                <td>Ion</td>
                                <td>50 ICP</td>
                                <td style={{ color: "red" }}>Eșuat</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="text-center mt-5">
                <p>&copy; 2025 Sistem de Plăți Securizat ICP. Toate drepturile rezervate.</p>
            </footer>
        </div>
    );
};

export default SecurePaymentsPage;
