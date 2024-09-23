import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Card, Row, Col, Container } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <div>
            <Header role="Admin" />
            <Sidebar role="admin" />

            <Container fluid style={{ marginLeft: '250px' }}>
                <Row>
                    <Col>
                        <h1>Admin Dashboard Overview</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>User Statistics</Card.Title>
                                <Card.Text>Total Active Users, New Registrations, Recent User Activities</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Policy Overview</Card.Title>
                                <Card.Text>Active Policies, Claims Status, Expiring Policies</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Token Overview</Card.Title>
                                <Card.Text>Total STSH Tokens, Recent Transactions</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    // <div className="container-fluid">
    //   <header className="d-flex justify-content-between align-items-center p-3 bg-light">
    //     <div className="logo">StartShield</div>
    //     <div className="user-profile dropdown">
    //       <img src="profile-icon.png" alt="Admin Profile" className="rounded-circle" />
    //       <div className="dropdown-menu">
    //         <a className="dropdown-item" href="#">Settings</a>
    //         <a className="dropdown-item" href="#">Notifications</a>
    //         <a className="dropdown-item" href="#">Logout</a>
    //       </div>
    //     </div>
    //     <input type="text" className="form-control w-25" placeholder="Search..." />
    //   </header>

    //   <div className="row">
    //     <nav className="col-md-2 d-none d-md-block bg-light sidebar">
    //       <div className="sidebar-sticky">
    //         <ul className="nav flex-column">
    //           <li className="nav-item">
    //             <a className="nav-link active" href="#">
    //               Dashboard
    //             </a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link label" href="#">
    //               User Management
    //             </a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link label" href="#">
    //               Policy Management
    //             </a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link label" href="#">
    //               Token Management
    //             </a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link label" href="#">
    //               Training & Events
    //             </a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link label" href="#">
    //               Reports
    //             </a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-lin label" href="#">
    //               Settings
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </nav>

    //     <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
    //       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    //         <h1 className="h2">Dashboard</h1>
    //         <div className="btn-toolbar mb-2 mb-md-0">
    //           <div className="btn-group mr-2">
    //             <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
    //             <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="row">
    //         <div className="col-md-4">
    //           <div className="card">
    //             <div className="card-body">
    //               <h5 className="card-title">User Statistics</h5>
    //               <p className="card-text"> Recent User Activities.</p>

    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-md-4">
    //           <div className="card">
    //             <div className="card-body">
    //               <h5 className="card-title">Policy Overview</h5>
    //               <p className="card-text"> Expiring Policies.</p>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-md-4">
    //           <div className="card">
    //             <div className="card-body">
    //               <h5 className="card-title">Token Overview</h5>
    //               <p className="card-text"> Token Utilization Summary.</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <Row>
    //         <Col sm={4}>
    //           <Card className="mb-4">
    //             <Card.Body>
    //               {/* <Card.Title>User Statistics</Card.Title> */}
    //               <Card.Text>Total Active Users: 1200</Card.Text>
    //               <Card.Text>New Registrations: 50</Card.Text>
    //             </Card.Body>
    //           </Card>
    //         </Col>
    //         <Col sm={4}>
    //           <Card className="mb-4">
    //             <Card.Body>
    //               {/* <Card.Title>Policy Overview</Card.Title> */}
    //               <Card.Text>Active Policies: 340</Card.Text>
    //               <Card.Text>Claims Pending: 12</Card.Text>
    //             </Card.Body>
    //           </Card>
    //         </Col>
    //         <Col sm={4}>
    //           <Card className="mb-4">
    //             <Card.Body>
    //               {/* <Card.Title>Token Overview</Card.Title> */}
    //               <Card.Text>Total STSH Tokens: 50,000</Card.Text>
    //               <Card.Text>Recent Transactions: 25</Card.Text>
    //             </Card.Body>
    //           </Card>
    //         </Col>
    //       </Row>
    //       <h2>Alerts & Notifications</h2>
    //       <div className="alert alert-warning" role="alert">
    //         Critical updates or system alerts.
    //       </div>
    //     </main>
    //   </div>
    // </div>
  );
};

export default AdminDashboard;

// import React from 'react';
// import { Card, Row, Col } from 'react-bootstrap';

// const AdminDashboard = () => {
//   return (
//     <Row>
//       <Col sm={4}>
//         <Card className="mb-4">
//           <Card.Body>
//             <Card.Title>User Statistics</Card.Title>
//             <Card.Text>Total Active Users: 1200</Card.Text>
//             <Card.Text>New Registrations: 50</Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>
//       <Col sm={4}>
//         <Card className="mb-4">
//           <Card.Body>
//             <Card.Title>Policy Overview</Card.Title>
//             <Card.Text>Active Policies: 340</Card.Text>
//             <Card.Text>Claims Pending: 12</Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>
//       <Col sm={4}>
//         <Card className="mb-4">
//           <Card.Body>
//             <Card.Title>Token Overview</Card.Title>
//             <Card.Text>Total STSH Tokens: 50,000</Card.Text>
//             <Card.Text>Recent Transactions: 25</Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default AdminDashboard;
