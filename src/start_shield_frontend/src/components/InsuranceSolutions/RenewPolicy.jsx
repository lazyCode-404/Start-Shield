import React, { useState } from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';
import data from '../../../data.json';
import './styles2.css'

const RenewPolicy = () => {
  const [policies, setPolicies] = useState(data.policies); // Policy expiration data from data.json
  const [contactPreference, setContactPreference] = useState({ email: true, sms: false });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [autoRenew, setAutoRenew] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [useTokens, setUseTokens] = useState(false);

  const renewPolicy = (policyId) => {
    alert(`Renewal process started for Policy ID: ${policyId}`);
    // Add logic to process renewal (API calls, payment processing)
  };

  const handleReminderPreference = (preference) => {
    setContactPreference(preference);
    // Logic to send email/SMS reminders 15 and 5 days before expiration
  };

  const handleAutoRenewal = () => {
    setAutoRenew(!autoRenew);
    // Logic for enabling/disabling automatic renewal
  };

  const handlePayment = (policyId) => {
    alert(`Processing payment for Policy ID: ${policyId} using ${useTokens ? 'Tokens' : paymentMethod}`);
    // Logic for processing payment with selected method
  };

  return (
    <Container className="renew-policy">
      <h4>Renew Your Policy</h4>

      {policies.length > 0 ? (
        <div>
          {policies.map((policy) => (
            <div key={policy.id} style={{ marginBottom: '20px' }}>
              <h5>Policy ID: {policy.id}</h5>
              <p>Coverage: {policy.coverage}</p>
              <p>Status: {policy.active ? "Active" : "Expired"}</p>
              <p>Start Date: {policy.startDate}</p>
              <p>End Date: {policy.endDate}</p>


              <Form.Group controlId="contactPreference">
                <Form.Label>Reminder Options:</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Email"
                  checked={contactPreference.email}
                  onChange={() => handleReminderPreference({ ...contactPreference, email: !contactPreference.email })}
                />
                <Form.Check
                  type="checkbox"
                  label="SMS"
                  checked={contactPreference.sms}
                  onChange={() => handleReminderPreference({ ...contactPreference, sms: !contactPreference.sms })}
                />
              </Form.Group>

              {contactPreference.email && (
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              )}

              {contactPreference.sms && (
                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={phone}
                    placeholder="Enter phone number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              )}

              <Form.Group controlId="autoRenew">
                <Form.Check
                  type="checkbox"
                  label="Enable Auto-Renewal"
                  checked={autoRenew}
                  onChange={handleAutoRenewal}
                />
              </Form.Group>

              <Button
                variant="secondary"
                onClick={() => setShowPolicyModal(true)}
              >
                Read Company Policies
              </Button>

              <Modal show={showPolicyModal} onHide={() => setShowPolicyModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Company Policies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Placeholder for PDF content */}
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor...</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowPolicyModal(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              <Form.Group controlId="paymentMethod">
                <Form.Label>Select Payment Method</Form.Label>
                <Form.Control as="select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="">Choose...</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="tokens">Use Tokens</option>
                </Form.Control>
              </Form.Group>

              {paymentMethod === 'tokens' && (
                <Form.Group controlId="useTokens">
                  <Form.Check
                    type="checkbox"
                    label="Use accumulated tokens"
                    checked={useTokens}
                    onChange={() => setUseTokens(!useTokens)}
                  />
                </Form.Group>
              )}

              <Button
                variant="primary"
                onClick={() => renewPolicy(policy.id)}
                disabled={policy.active} // Disable if the policy is still active
              >
                Renew Policy
              </Button>

              <Button
                variant="success"
                onClick={() => handlePayment(policy.id)}
              >
                Make Payment
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No policies available for renewal.</p>
      )}
    </Container>
  );
};

export default RenewPolicy;
