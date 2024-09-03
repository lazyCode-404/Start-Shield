// TokenizationAndStaking.js


import React, { useState } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import './style.css'; // Don't forget to create this CSS file!

const TokenOverview = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Container className="stsh-info-container">
      <Row > 
        <h2 onClick={toggleDetails} style={{ cursor: "pointer" }}>
          STSH: Unleashing the Power
        </h2>
      <Col md={6}>
        {showDetails && (
          <div>
            <ul>
              <li>
                <div className="stsh-section">
                  <h3>1. Staking Powerhouse</h3>
                  <p>
                    Staking isn't just about locking up tokens; it's an active commitment to the ecosystem. When users stake their STSH tokens, they contribute to the network's security and consensus mechanisms. It's like planting a tree—you nurture it, and in return, it bears fruit. By staking, users become stakeholders, shaping the platform's destiny.
                  </p>
                </div>
                <div className="stsh-section">
                  <h3>2. Governance Influence</h3>
                  <p>
                    STSH isn’t just a digital coin; it’s a voting ticket. Imagine a virtual town hall where STSH holders gather (okay, maybe it’s more like a Telegram chat) to discuss and decide. Protocol upgrades, fee adjustments, new features—these decisions are in their hands. It’s democracy meets blockchain, and it’s powerful.
                  </p>
                </div>
                <div className="stsh-section">
                  <h3>3. Access and Privileges</h3>
                  <p>
                    STSH opens doors. Holders gain access to exclusive features within StartShield. Think of it as a backstage pass to the DeFi concert. Maybe it unlocks premium analytics or lets you peek at upcoming products. The possibilities? As diverse as a crypto enthusiast’s portfolio.
                  </p>
                </div>
                </li>
            </ul>
          </div>
        )}
      </Col>
      <Col md={6}>
        {showDetails && (
          <div>
            <ul>
              <li>
                <div className="stsh-section">
                  <h3>4. Economic Incentives</h3>
                  <p>
                    STSH aligns incentives like a cosmic force. Active participation—staking, voting, contributing—boosts the network. And guess what? The universe rewards you. Staking rewards, liquidity mining goodies, transaction fee shares—it’s like finding treasure while exploring the blockchain jungle.
                  </p>
                </div>
                <div className="stsh-section">
                  <h3>5. Community Building</h3>
                  <p>
                    Tokens weave communities. STSH holders aren’t just hodlers; they’re part of a vibrant ecosystem. Traders, developers, and curious minds gather around virtual campfires (okay, Discord servers) to share insights. It’s like a DeFi potluck—everyone brings something to the table.
                  </p>
                </div>
                <div className="stsh-section">
                  <h3>6. Beyond Code: Trust and Collaboration</h3>
                  <p>
                    STSH isn’t just lines of code; it’s a bridge between tech and human dreams. It symbolizes trust—the kind you need when sending crypto to that mysterious address. It’s also collaboration—the shared purpose that binds the StartShield crew. Together, they’re building a decentralized future.

                    So, fellow crypto voyager, whether you’re staking, voting, or just admiring the transaction history, remember: STSH isn’t just a token; it’s a beacon guiding us toward financial empowerment.
                  </p>
                </div></li>
            </ul>
          </div>
        )}
      </Col>
      </Row>
    </Container>
  );
};

const Staking = () => {
  return (
    <div>
      <h2>How to Stake</h2>
      <ol>
        <li>Create an account on StartShield.</li>
        <li>Acquire STSH tokens.</li>
        <li>Visit the Staking Dashboard.</li>
        <li>Delegate your tokens to a validator.</li>
        <li>Earn rewards!</li>
      </ol>
    </div>
  );
};

const TransactionHistory = () => {
  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        <li>Staked 100 STSH on 2024-08-29.</li>
        <li>Received 10 STSH as staking rewards on 2024-09-05.</li>
        {/* Add more transaction entries */}
      </ul>
    </div>
  );
};

const TokenizationAndStaking = () => {
  return (
    <div>
      <TokenOverview />
      <Staking />
      <TransactionHistory />
    </div>
  );
};

export default TokenizationAndStaking;
