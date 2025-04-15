import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdToken } from 'react-icons/md';
import { RiTokenSwapFill } from 'react-icons/ri';
import picture_tok from '../../src/assets/images/tba.jpg';
import picture_tok1 from '../../src/assets/images/h2.jpeg';
import picture_tok4 from '../../src/assets/images/toc4.jpeg';
import './style.css';

const TokenizationAndStaking = () => {
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const subscribePrice = 10; // Subscription price
  const subscribeTax = 10; // Subscription tax

  // Function to handle subscriptions
  const handleSubscribe = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_URL/remitPremium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, amount }),
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('An error occurred during the transaction.');
    }
  };

  return (
    <div>
      {/* Existing Content */}
      <Container>
        <Card>
          <Card.Body>
            This is some text within a card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Card.Body>
        </Card>

        <CardGroup style={{ gap: '150px' }}>
          <Card style={{ width: '40rem' }}>
            <Card.Img variant="top" src={picture_tok} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={picture_tok1} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={picture_tok4} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>

      {/* Subscription Section */}
      <div className="container mt-5">
        <h1 className="mb-4">Tokenization & Staking</h1>
        <div className="card p-4">
          <h2>StartShield-STSH Token</h2>
          <p>Total Supply: 2,000,000,000 STSH</p>
          <h3>Distribution</h3>
          <ul>
            <li>MIBT: 15%</li>
            <li>Founders and Team: 20%</li>
            <li>Investors and Advisors: 15%</li>
            <li>Public Sale: 30%</li>
            <li>Community Fund: 10%</li>
            <li>Reserve Fund: 10%</li>
          </ul>
          <h3>Subscribe</h3>
          <p>Subscribe Price: ${subscribePrice}</p>
          <p>Subscribe Tax: {subscribeTax} p$</p>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">User</label>
            <input
              type="text"
              id="user"
              className="form-control"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              id="amount"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" onClick={handleSubscribe}>Subscribe Now</button>
          {message && <p className="mt-3">{message}</p>}
        </div>
      </div>

      {/* Additional Input Section */}
      <div>
        <Row xs={12} className="h3_still">
          <h3 style={{ fontWeight: 700, margin: '20px' }}>Subtitlu</h3>
        </Row>
        <Row xs={12} className="description_still">
          <Col xs={6}>
            <h6>Describing <strong>things</strong> that would <strong>make</strong> an insurance a <strong>benefit</strong> for your organization</h6>
          </Col>
          <Col xs={6}>
            <h6>Describing <strong>things</strong> that would <strong>make</strong> an insurance a <strong>benefit</strong> for your organization</h6>
          </Col>
        </Row>
        <Row xs={12} className="description_still">
          <Col xs={2}><MdToken /></Col>
          <Col xs={7}>
            <input
              type="text"
              placeholder="InputValue"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Col>
          <Col xs={1}><RiTokenSwapFill /></Col>
        </Row>
      </div>
    </div>
  );
};

export default TokenizationAndStaking;
