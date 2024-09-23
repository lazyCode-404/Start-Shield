import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function TokenOverview() {
  const [tokenBalance, setTokenBalance] = useState("");
  const [recentTransactions, setRecentTransactions] = useState("");

  const handleSubmit = () => {
    console.log({
      tokenBalance,
      recentTransactions,
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Token Overview</Card.Title>
        <Form>
          <Form.Group controlId="formTokenBalance">
            <Form.Label>STSH Token Balance</Form.Label>
            <Form.Control
              type="text"
              value={tokenBalance}
              onChange={(e) => setTokenBalance(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formRecentTransactions">
            <Form.Label>Recent Transactions</Form.Label>
            <Form.Control
              type="text"
              value={recentTransactions}
              onChange={(e) => setRecentTransactions(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TokenOverview;
