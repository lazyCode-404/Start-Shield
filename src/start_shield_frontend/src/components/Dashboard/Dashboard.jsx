import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Navbar,
    Offcanvas,
    ListGroup,
    Spinner,
} from 'react-bootstrap';
import {
    Speedometer,
    FileEarmarkText,
    Gear,
    PersonCircle,
    BoxArrowRight,
    List,
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { useAuth } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Policy from '../Policy/Policy.jsx'; // Import your Policy component here
import Claim from '../Claims/claims';
import PaymentPage from '../PaymentPage/paymentPage.jsx'; // Import your PaymentPage component here
import CheckPriceInsurance from '../CheckPriceInsurance/index.jsx'; // Import your CheckPriceInsurance component here

function Dashboard() {
    const [show, setShow] = useState(false);
    const [selectedSection, setSelectedSection] = useState('dashboard');
    const [userDetails, setUserDetails] = useState({ name: "", email: "" });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { backendActor, isAuthenticated } = useAuth();

    const stableBackendActor = useMemo(() => backendActor, [backendActor]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchUserDetails = async () => {
        if (!stableBackendActor || !isAuthenticated) return;

        setIsLoading(true);
        try {
            const principal = await stableBackendActor.getCallerPrincipal();
            const user = await stableBackendActor.getUserByPrincipal(principal);
            if (user && user.length > 0) {
                setUserDetails({ name: user[0].name || "Unknown", email: user[0].email || "N/A" });
            } else {
                setUserDetails({ name: "Unknown", email: "N/A" });
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            setUserDetails({ name: "Unknown", email: "N/A" });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserDetails();
        }
    }, [isAuthenticated, stableBackendActor]);

    const statistics = {
        activepolicy: userDetails.policy?.filter(p => p.status?.hasOwnProperty('active')).length || 0,
        totalCoverage: userDetails.policy?.reduce((sum, p) => sum + Number(p.coverage || 0), 0) || 0,
        pendingClaims: userDetails.claims?.filter(c => c.status?.hasOwnProperty('pending')).length || 0,
        approvedClaims: userDetails.claims?.filter(c => c.status?.hasOwnProperty('approved')).length || 0,
    };

    if (!isAuthenticated) {
        return (
            <div className="text-center mt-5">
                <p className="mt-3 text-muted">Please Login...</p>
            </div>
        );
    }

    const renderMainContent = () => {
        if (isLoading) {
            return (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            );
        }

        switch (selectedSection) {
            case 'dashboard':
                return (
                    <Row>
                        <Col md={6}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>Active policy</Card.Title>
                                    <Card.Text>{statistics.activepolicy}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>Total Coverage</Card.Title>
                                    <Card.Text>{statistics.totalCoverage} ICP</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>Pending Claims</Card.Title>
                                    <Card.Text>{statistics.pendingClaims}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>Approved Claims</Card.Title>
                                    <Card.Text>{statistics.approvedClaims}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                );
            case 'policy':
                return < Policy />; // Înlocuiește cu componenta reală
                case 'checkPriceInsurance':
                    return <CheckPriceInsurance />; // Înlocuiește cu componenta reală
            case 'claims':
                return <Claim />; // Înlocuiește cu componenta reală
            case 'settings':
                return <h4>Settings Section</h4>; // Înlocuiește cu componenta reală
            case 'profile':
                return <h4>Profile Section</h4>; // Înlocuiește cu componenta reală
                case 'paymentPage':
                return <PaymentPage />; // Înlocuiește cu componenta reală
            default:
                return <h4>Welcome to Dashboard</h4>;
        }
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
                <Container fluid>
                    <Button variant="outline-light" onClick={handleShow} className="d-lg-none">
                        <List />
                    </Button>
                    <Navbar.Brand className="mx-auto">Insurance System Dashboard</Navbar.Brand>
                    <div style={{ color: "white" }}>
                        {isLoading ? (
                            <Spinner animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <span>{userDetails.name || "Unknown"}</span>
                        )}
                    </div>
                </Container>
            </Navbar>

            <Container fluid>
                <Row>
                    <Col lg={3} className="d-none d-lg-block">
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item action onClick={() => setSelectedSection('dashboard')} active={selectedSection === 'dashboard'}>
                                    <Speedometer className="me-2" /> Dashboard
                                </ListGroup.Item>
                                <ListGroup.Item action onClick={() => setSelectedSection('policy')} active={selectedSection === 'policy'}>
                                    <FileEarmarkText className="me-2" /> My Policy
                                </ListGroup.Item>
                                <ListGroup.Item action onClick={() => setSelectedSection('checkPriceInsurance')} active={selectedSection === 'checkPriceInsurance'}>
                                    <FileEarmarkText className="me-2" /> Check Price Insurance
                                </ListGroup.Item>
                                <ListGroup.Item action onClick={() => setSelectedSection('claims')} active={selectedSection === 'claims'}>
                                    <Gear className="me-2" /> My Claims
                                </ListGroup.Item>
                                <ListGroup.Item action onClick={() => setSelectedSection('paymentPage')} active={selectedSection === 'paymentPage'}>
                                    <Gear className="me-2" /> My Payment Page
                                </ListGroup.Item>
                                <ListGroup.Item action onClick={() => setSelectedSection('settings')} active={selectedSection === 'settings'}>
                                    <Gear className="me-2" /> Settings
                                </ListGroup.Item>
                                <ListGroup.Item action onClick={() => setSelectedSection('profile')} active={selectedSection === 'profile'}>
                                    <PersonCircle className="me-2" /> Profile
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col lg={9}>
                        {renderMainContent()}
                    </Col>
                </Row>
            </Container>

            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Insurance System</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item action onClick={() => { setSelectedSection('dashboard'); handleClose(); }} active={selectedSection === 'dashboard'}>
                            <Speedometer className="me-2" /> Dashboard
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => { setSelectedSection('policy'); handleClose(); }} active={selectedSection === 'policy'}>
                            <FileEarmarkText className="me-2" /> My Policy
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => setSelectedSection('checkPriceInsurance')} active={selectedSection === 'checkPriceInsurance'}>
                                    <FileEarmarkText className="me-2" /> Check Price Insurance
                                </ListGroup.Item>
                        <ListGroup.Item action onClick={() => { setSelectedSection('claims'); handleClose(); }} active={selectedSection === 'claims'}>
                            <Gear className="me-2" /> My Claims
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => setSelectedSection('paymentPage')} active={selectedSection === 'paymentPage'}>
                                    <Gear className="me-2" /> My Payment Page
                                </ListGroup.Item>
                        <ListGroup.Item action onClick={() => { setSelectedSection('settings'); handleClose(); }} active={selectedSection === 'settings'}>
                            <Gear className="me-2" /> Settings
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => { setSelectedSection('profile'); handleClose(); }} active={selectedSection === 'profile'}>
                            <PersonCircle className="me-2" /> Profile
                        </ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Dashboard;