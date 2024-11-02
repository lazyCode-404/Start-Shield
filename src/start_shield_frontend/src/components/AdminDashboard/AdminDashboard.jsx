// AdminDashboard.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PolicyManagement from './PolicyManagement';
import ClaimsProcessing from './ClaimsProcessing';
import UserManagement from './UserManagement';
import ErrorBoundary from './ErrorBoundary';

function AdminDashboard() {
  return (
    <Container fluid className="p-3">
      <h1>Admin Dashboard</h1>
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Overview</Card.Title>
              <Card.Text>Total Policies: 123</Card.Text>
              <Card.Text>Total Claims: 45</Card.Text>
              <Card.Text>Total Users: 67</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <ErrorBoundary>
        <Row className="mb-3">
          <Col>
            <PolicyManagement />
          </Col>
        </Row>
      </ErrorBoundary>

      <ErrorBoundary>
        <Row className="mb-3">
          <Col>
            <ClaimsProcessing />
          </Col>
        </Row>
      </ErrorBoundary>

      <ErrorBoundary>
        <Row>
          <Col>
            <UserManagement />
          </Col>
        </Row>
      </ErrorBoundary>
    </Container>
  );
}

export default AdminDashboard;

