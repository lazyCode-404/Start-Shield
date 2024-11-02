import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function PolicyManagement() {
  const [policies, setPolicies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPolicy, setCurrentPolicy] = useState({ id: '', name: '', status: '', premium: '' });

  useEffect(() => {
    // Fetch policies from the backend (using a placeholder for Motoko API integration)
    fetch('/api/getPolicies')
      .then(res => res.json())
      .then(data => setPolicies(data))
      .catch(error => console.error('Error fetching policies:', error));
  }, []);

  const handleShowModal = (policy) => {
    setCurrentPolicy(policy || { id: '', name: '', status: '', premium: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSavePolicy = () => {
    if (currentPolicy.id) {
      fetch(`/api/updatePolicy/${currentPolicy.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPolicy)
      });
    } else {
      fetch('/api/createPolicy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPolicy)
      });
    }
    setShowModal(false);
  };

  const handleDeletePolicy = (id) => {
    fetch(`/api/deletePolicy/${id}`, { method: 'DELETE' })
      .then(() => setPolicies(policies.filter(policy => policy.id !== id)))
      .catch(error => console.error('Error deleting policy:', error));
  };

  return (
    <div>
      <h2>Policy Management</h2>
      <Button variant="success" onClick={() => handleShowModal()}>Create New Policy</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Policy Name</th>
            <th>Status</th>
            <th>Premium</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map(policy => (
            <tr key={policy.id}>
              <td>{policy.id}</td>
              <td>{policy.name}</td>
              <td>{policy.status}</td>
              <td>{policy.premium}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(policy)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeletePolicy(policy.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentPolicy.id ? 'Edit Policy' : 'Create New Policy'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="policyName">
              <Form.Label>Policy Name</Form.Label>
              <Form.Control
                type="text"
                value={currentPolicy.name}
                onChange={(e) => setCurrentPolicy({ ...currentPolicy, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="policyStatus" className="mt-2">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={currentPolicy.status}
                onChange={(e) => setCurrentPolicy({ ...currentPolicy, status: e.target.value })}
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Expired</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="policyPremium" className="mt-2">
              <Form.Label>Premium</Form.Label>
              <Form.Control
                type="number"
                value={currentPolicy.premium}
                onChange={(e) => setCurrentPolicy({ ...currentPolicy, premium: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSavePolicy}>Save Policy</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PolicyManagement;

