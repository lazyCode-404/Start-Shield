import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas, ListGroup } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle, FaHome } from 'react-icons/fa';
import { useAuth } from '../../context/AppContext'; // Assuming useAuth is the hook for authentication

function Policy() {
    const { isAuthenticated, logout, login, userInfo } = useAuth();
    const [show, setShow] = useState(false);
    const [policies, setPolicies] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch user info if needed
        }
    }, [isAuthenticated]);

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

    const menuItems = [
        { text: 'Dashboard', icon: <FaHome />, path: '/' },
        { text: 'Create Policy', icon: <FaUserCircle />, path: '/create-policy' },
    ];

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="custom-brand">
                        Insurance Policy System
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleShow} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        {isAuthenticated ? (
                            <Nav>
                                <div className="navbar-right">
                                    <span className="text-white me-3">{userInfo?.name}</span>
                                    <Button variant="outline-light" onClick={logout}>
                                        <FaSignOutAlt className="me-1" /> Logout
                                    </Button>
                                </div>
                            </Nav>
                        ) : (
                            <Nav>
                                <Button variant="outline-light" onClick={login}>Login</Button>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4 mb-4 custom-container">
                <Outlet />
            </Container>

            <footer className="bg-light py-3 mt-auto custom-footer">
                <Container>
                    <p className="text-center text-muted">
                        © {new Date().getFullYear()} Insurance Policy System on Internet Computer
                    </p>
                </Container>
            </footer>

            <Offcanvas show={show} onHide={handleClose} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Insurance System</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        {menuItems.map((item) => (
                            <ListGroup.Item action as={Link} to={item.path} key={item.text} onClick={handleClose}>
                                {item.icon} {item.text}
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item action onClick={logout}>
                            <FaSignOutAlt className="me-2" /> Logout
                        </ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Policy;



