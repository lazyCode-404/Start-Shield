import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ClaimDetails.css";
import { useAuth } from "../../context/AppContext";

const ClaimDetails = ({ claimActor }) => {
    const { backendActor, isAuthenticated } = useAuth();
    const [claims, setClaims] = useState([]);
    const [selectedClaims, setSelectedClaims] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch user claims from the backend
    const fetchClaims = async () => {
        if (!claimActor || !isAuthenticated) return;

        setIsLoading(true);
        setError("");
        try {
            const userClaims = await claimActor.getUserClaims();
            setClaims(userClaims);
        } catch (err) {
            console.error("Error fetching claims:", err);
            setError("Failed to load claims. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchClaims();
        }
    }, [isAuthenticated, claimActor]);

    // Handle claim selection
    const toggleClaimSelection = (claimId) => {
        setSelectedClaims((prevSelected) =>
            prevSelected.includes(claimId)
                ? prevSelected.filter((id) => id !== claimId)
                : [...prevSelected, claimId]
        );
    };

    // Submit selected claims
    const submitSelectedClaims = async () => {
        if (selectedClaims.length === 0) {
            alert("Please select at least one claim to submit.");
            return;
        }

        try {
            for (const claimId of selectedClaims) {
                const result = await claimActor.startVerification(claimId);
                if (result.err) {
                    console.error(`Error submitting claim ${claimId}:`, result.err);
                } else {
                    console.log(`Claim ${claimId} submitted successfully.`);
                }
            }
            alert("Selected claims submitted successfully.");
            setSelectedClaims([]);
            fetchClaims(); // Refresh claims after submission
        } catch (err) {
            console.error("Error submitting claims:", err);
            alert("Failed to submit claims. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center custom-title">Your Claims</h1>
                </Col>
            </Row>

            <Row>
                {claims.length === 0 ? (
                    <Col>
                        <Alert variant="info">No claims found.</Alert>
                    </Col>
                ) : (
                    claims.map((claim) => (
                        <Col md={4} className="mb-4" key={claim.id}>
                            <Card className={`custom-card ${selectedClaims.includes(claim.id) ? "selected" : ""}`}>
                                <Card.Body>
                                    <Card.Title>Claim #{claim.id}</Card.Title>
                                    <Card.Text>
                                        <strong>Policy ID:</strong> {claim.policyId}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Amount:</strong> {claim.amount} ICP
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Status:</strong> {claim.status}
                                    </Card.Text>
                                    <Button
                                        variant={selectedClaims.includes(claim.id) ? "danger" : "primary"}
                                        onClick={() => toggleClaimSelection(claim.id)}
                                    >
                                        {selectedClaims.includes(claim.id) ? "Deselect" : "Select"}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            {claims.length > 0 && (
                <Row className="mt-4">
                    <Col className="text-center">
                        <Button variant="success" onClick={submitSelectedClaims}>
                            Submit Selected Claims
                        </Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ClaimDetails;