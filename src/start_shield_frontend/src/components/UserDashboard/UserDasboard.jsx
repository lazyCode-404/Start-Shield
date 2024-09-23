import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Row, Container, Col } from 'react-bootstrap';
import PolicySummary from '../PolicySummary';
import TokenOverview from '../TokenOverview';
import UpcomingEvents from '../UpcomingEvents';
import './style.css';

function UserDashboard() {
  return (
    <div>
      <Header role="User" />
      <Sidebar role="user" />
      <Container fluid style={{ marginLeft: '290px' }}>
        <Row>
          <Col>
            <h1>User Dashboard Overview</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <PolicySummary />
          </Col>
          <Col md={6}>
            <TokenOverview />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <UpcomingEvents />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserDashboard;


// import React from 'react';
// import Header from '../Header';
// import Sidebar from '../Sidebar';
// import { Row, Container, Card, Col } from 'react-bootstrap';
// import './style.css';


// function UserDashboard() {
//   return (
//     <div>
//       <Row className='user_dashb_cont'>
//         <h3 style={{ fontWeight: 700, margin: '20px' }}>User Dashboard Content</h3>
//       </Row>
//         <Header role="User" />
//             <Sidebar role="user" />

//             <Container fluid style={{ marginLeft: '250px' }}>
//                 <Row>
//                     <Col>
//                         <h1>User Dashboard Overview</h1>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}>
//                         <Card>
//                             <Card.Body>
//                                 <Card.Title>Policy Summary</Card.Title>
//                                 <Card.Text>Active Policies, Claims Status, Policy Renewal Dates</Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                     <Col md={6}>
//                         <Card>
//                             <Card.Body>
//                                 <Card.Title>Token Overview</Card.Title>
//                                 <Card.Text>STSH Token Balance, Recent Transactions</Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}>
//                         <Card>
//                             <Card.Body>
//                                 <Card.Title>Upcoming Events</Card.Title>
//                                 <Card.Text>Registered events and training sessions</Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
      
//       </div >
//    );
//  }

//  export default UserDashboard; 


{/* Profile Management Section */}
      {/* <Row>
        <Col sm={12}>
          <ul className="list-group">
            <li className="list-group-item"><h4 style={{ fontWeight: 500, margin: '15px' }}>Profile Management</h4>
              <ul className="list-group">
                <Row> */}
                  {/* Personal Information Section */}
                  {/* <Col sm={12}>
                    <li className="list-group-item"><h5>Personal Information</h5></li>
                    <ul>
                      <Row>
                        <Col sm={4}>
                          <li><button>Personal details</button></li>
                        </Col>
                        <Col sm={4}>
                          <li>User preferences</li>
                        </Col>
                        <Col sm={4}>
                          <li>Access Control</li>
                        </Col>
                      </Row>
                    </ul>
                  </Col>
                  <Row> */}
                    {/* Security Settings Section */}
                    {/* <Col sm={12}>
                      <li className="list-group-item"><h5>Security Settings</h5></li>
                      <ul>
                        <Row>
                        <Col sm={3}>
                        <li>Authentication and Authorization:</li>
                        </Col>
                        <Col sm={3}>
                        <li>Password Policies:</li>
                        </Col>
                        <Col sm={3}>
                        <li><button>Account Lockout:</button></li>
                        </Col>
                        <Col sm={3}>
                        <li>Audit Trail:</li>
                        </Col>
                        </Row>
                      </ul>
                    </Col>
                  </Row>
                </Row>
              </ul>
            </li>
          </ul>
        </Col>
      </Row > */}
     
{/* Additional Dashboard Sections */}
      {/* <Row className="additional-section">
        <Col sm={3}>
          <ul className="list-group">
            <li className="list-group-item">Insurance Policies</li>
            </ul>
            </Col>
            <Col sm={3}>
            <ul className="list-group">
            <li className="list-group-item">STSH Token Balance</li>
            </ul>
            </Col>
            <li className="list-group-item">Staking and Rewards</li>
            <li className="list-group-item">Voting History</li>
          
        
      </Row> */}

      {/* <ul className="list-group">
        <li className="list-group-item">Profile Management
          <ul className="list-group">
            <li className="list-group-item">Personal Information</li>
            <li className="list-group-item">Security Settings</li>
          </ul>
        </li>
        <li className="list-group-item">Insurance Policies</li>
        <li className="list-group-item">STSH Token Balance</li>
        <li className="list-group-item">Staking and Rewards</li>
        <li className="list-group-item">Voting History</li>
      </ul> */}