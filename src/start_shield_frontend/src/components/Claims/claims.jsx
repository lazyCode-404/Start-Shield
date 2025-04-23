import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Container,
    Nav,
    Button,
    Spinner
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Claim.css';
import { useAuth } from '../../context/AppContext';
import ClaimDetails from '../ClaimDetails/ClaimDetails.jsx';
import ClaimForm from '../ClaimForm/ClaimForm.jsx';

function Claim({ logout }) {
    const { backendActor, isAuthenticated } = useAuth();
    const [userDetails, setUserDetails] = useState({ name: "", email: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSection, setSelectedSection] = useState('details'); // Default section
    const [claims, setClaims] = useState([]); // Store claims data
    const [isClaimsLoading, setIsClaimsLoading] = useState(true); // Loading state for claims

    const fetchUserDetails = async () => {
        if (!backendActor || !isAuthenticated) return;

        setIsLoading(true);
        try {
            const principal = await backendActor.getCallerPrincipal();
            const user = await backendActor.getUserByPrincipal(principal);
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

    const fetchClaims = async () => {
        if (!backendActor || !isAuthenticated) return;

        setIsClaimsLoading(true);
        try {
            const claimsData = await backendActor.getUserClaims(); // Call the backend's `getUserClaims` method
            setClaims(claimsData || []);
        } catch (error) {
            console.error("Error fetching claims:", error);
            setClaims([]);
        } finally {
            setIsClaimsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserDetails();
            fetchClaims();
        }
    }, [isAuthenticated, backendActor]);

    const renderMainContent = () => {
        switch (selectedSection) {
            case 'details':
                if (isClaimsLoading) {
                    return (
                        <div className="text-center">
                            <Spinner animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    );
                }

                if (claims.length === 0) {
                    return <h4 className="text-center">Do you not have any available claims?</h4>;
                }

                return <ClaimDetails claims={claims} />; // Pass claims data to ClaimDetails
            case 'form':
                return <ClaimForm />;
            default:
                return <h4>Select a section</h4>;
        }
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="custom-brand">
                        Insurance Claims System
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {isAuthenticated ? (
                                <>
                                    <Nav.Link onClick={() => setSelectedSection('details')}>Claim Details</Nav.Link>
                                    <Nav.Link onClick={() => setSelectedSection('form')}>Claim Form</Nav.Link>
                                    <Button variant="outline-light" onClick={logout}>Logout</Button>
                                </>
                            ) : (
                                <Nav.Link as={Link} to="/">Login</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4 mb-4 custom-container">
                {isAuthenticated && (
                    <div className="user-details">
                        {isLoading ? (
                            <Spinner animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <p>
                                Logged in as: <strong>{userDetails.name}</strong> ({userDetails.email})
                            </p>
                        )}
                    </div>
                )}
                {renderMainContent()}
            </Container>

            <footer className="bg-light py-3 mt-auto custom-footer">
                <Container>
                    <p className="text-center text-muted">
                        © {new Date().getFullYear()} Insurance Claims System on Internet Computer
                    </p>
                </Container>
            </footer>
        </>
    );
}

export default Claim;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//     Navbar,
//     Container,
//     Nav,
//     Button,
//     Spinner
// } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Claim.css';
// import { useAuth } from '../../context/AppContext';
// import ClaimDetails from '../ClaimDetails/ClaimDetails.jsx';
// import ClaimForm from '../ClaimForm/ClaimForm.jsx';
// import { claim_actor } from "../../../../declarations/claim_actor";



// function Claim({ logout }) {
//     const { backendActor, isAuthenticated } = useAuth();
//     const [userDetails, setUserDetails] = useState({ name: "", email: "" });
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedSection, setSelectedSection] = useState('details'); // Default section
//     const [claims, setClaims] = useState([]); // Store claims data
//     const [isClaimsLoading, setIsClaimsLoading] = useState(true); // Loading state for claims
//     console.log(claim_actor);
//     const fetchUserDetails = async () => {
//         if (!backendActor || !isAuthenticated) return;

//         setIsLoading(true);
//         try {
//             const principal = await backendActor.getCallerPrincipal();
//             const user = await backendActor.getUserByPrincipal(principal);
//             if (user && user.length > 0) {
//                 setUserDetails({ name: user[0].name || "Unknown", email: user[0].email || "N/A" });
//             } else {
//                 setUserDetails({ name: "Unknown", email: "N/A" });
//             }
//         } catch (error) {
//             console.error("Error fetching user details:", error);
//             setUserDetails({ name: "Unknown", email: "N/A" });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const fetchClaims = async () => {
//         if (!backendActor || !isAuthenticated) return;

//         setIsClaimsLoading(true);
//         try {
//             const claimsData = await backendActor.getUserClaims(); // Call the backend's `getUserClaims` method
//             setClaims(claimsData || []);
//         } catch (error) {
//             console.error("Error fetching claims:", error);
//             setClaims([]);
//         } finally {
//             setIsClaimsLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (isAuthenticated) {
//             fetchUserDetails();
//             fetchClaims();
//         }
//     }, [isAuthenticated, backendActor]);

//     useEffect(() => {
//         const testGetUserClaims = async () => {
//             try {
//                 const claims = await backendActor.getUserClaims();
//                 console.log("Claims:", claims);
//             } catch (error) {
//                 console.error("Error testing getUserClaims:", error);
//             }
//         };

//         if (isAuthenticated) {
//             testGetUserClaims();
//         }
//     }, [isAuthenticated, backendActor]);

//     const renderMainContent = () => {
//         switch (selectedSection) {
//             case 'details':
//                 if (isClaimsLoading) {
//                     return (
//                         <div className="text-center">
//                             <Spinner animation="border" role="status" size="sm">
//                                 <span className="visually-hidden">Loading...</span>
//                             </Spinner>
//                         </div>
//                     );
//                 }

//                 if (claims.length === 0) {
//                     return <h4 className="text-center">Do you not have any available claims?</h4>;
//                 }

//                 return <ClaimDetails claims={claims} />; // Pass claims data to ClaimDetails
//             case 'form':
//                 return <ClaimForm />;
//             default:
//                 return <h4>Select a section</h4>;
//         }
//     };

//     return (
//         <>
//             <Navbar bg="primary" variant="dark" expand="lg">
//                 <Container>
//                     <Navbar.Brand as={Link} to="/" className="custom-brand">
//                         Insurance Claims System
//                     </Navbar.Brand>
//                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                     <Navbar.Collapse id="basic-navbar-nav">
//                         <Nav className="ms-auto">
//                             {isAuthenticated ? (
//                                 <>
//                                     <Nav.Link onClick={() => setSelectedSection('details')}>Claim Details</Nav.Link>
//                                     <Nav.Link onClick={() => setSelectedSection('form')}>Claim Form</Nav.Link>
//                                     <Button variant="outline-light" onClick={logout}>Logout</Button>
//                                 </>
//                             ) : (
//                                 <Nav.Link as={Link} to="/">Login</Nav.Link>
//                             )}
//                         </Nav>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>

//             <Container className="mt-4 mb-4 custom-container">
//                 {isAuthenticated && (
//                     <div className="user-details">
//                         {isLoading ? (
//                             <Spinner animation="border" role="status" size="sm">
//                                 <span className="visually-hidden">Loading...</span>
//                             </Spinner>
//                         ) : (
//                             <p>
//                                 Logged in as: <strong>{userDetails.name}</strong> ({userDetails.email})
//                             </p>
//                         )}
//                     </div>
//                 )}
//                 {renderMainContent()}
//             </Container>

//             <footer className="bg-light py-3 mt-auto custom-footer">
//                 <Container>
//                     <p className="text-center text-muted">
//                         © {new Date().getFullYear()} Insurance Claims System on Internet Computer
//                     </p>
//                 </Container>
//             </footer>
//         </>
//     );
// }

// export default Claim;