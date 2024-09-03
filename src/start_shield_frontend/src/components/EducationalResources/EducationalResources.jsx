import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css'

const EducationalResources = () => {
  return (
    <div>

      <h1 className='title-education'>Educational Resources</h1>
      <Row xs={12}>
        <Col sm={2}>
         <ul>
          <li><strong>Blocks:</strong> Each block contains a batch of transactions. These transactions are grouped together and cryptographically linked to the previous block.</li>
          <li><strong>Chain:</strong> Blocks are connected in chronological order, forming a chain. Once a block is added, it cannot be altered, ensuring data integrity.</li>
          <li><strong>Decentralization:</strong> Unlike traditional databases, which rely on a central authority, blockchains distribute control among participants. This decentralization enhances security and resilience.</li>
        </ul></Col>
        <Col md={7}>
          <ul>
            <li>
              <div className="resources-container">
                <h2>Blockchain Basics: A Comprehensive Overview.</h2>
                <p><strong>What Is Blockchain?</strong></p>
                <p>At its core, a blockchain is a decentralized, immutable ledger that records transactions across a network of computers (nodes). Here are the fundamental components:</p>
                <ul>
                  <li><strong>Blocks:</strong> Each block contains a batch of transactions. These transactions are grouped together and cryptographically linked to the previous block.</li>
                  <li><strong>Chain:</strong> Blocks are connected in chronological order, forming a chain. Once a block is added, it cannot be altered, ensuring data integrity.</li>
                  <li><strong>Decentralization:</strong> Unlike traditional databases, which rely on a central authority, blockchains distribute control among participants. This decentralization enhances security and resilience.</li>
                </ul>
                <p><strong>How Does It Work?</strong></p>
                <ul>
                  <li><strong>Transactions:</strong> Users initiate transactions (e.g., transferring cryptocurrency, recording ownership, or executing smart contracts). Transactions are broadcast to the network.</li>
                  <li><strong>Validation:</strong> Nodes (miners) validate transactions by solving complex mathematical puzzles (proof of work or proof of stake). Once validated, transactions are bundled into a block.</li>
                  <li><strong>Consensus:</strong> Consensus mechanisms ensure agreement among nodes. Common mechanisms include Proof of Work (PoW), Proof of Stake (PoS), and Delegated Proof of Stake (DPoS).</li>
                  <li><strong>Adding to the Chain:</strong> Validated blocks are added to the chain. Each block contains a reference to the previous block (hash pointer).</li>
                </ul>
                <p><strong>Examples:</strong></p>
                <ul>
                  <li><strong>Bitcoin:</strong> The first and most well-known blockchain. Used for peer-to-peer transactions (e.g., sending BTC). PoW-based consensus.</li>
                  <li><strong>Ethereum:</strong> Extends blockchain beyond currency. Supports smart contracts (self-executing agreements). PoW (transitioning to PoS).</li>
                </ul>
              </div>
            </li>
          </ul>
        </Col>
        <Col sx={2}>
          <ul>
            <li><strong>Transactions:</strong> Users initiate transactions (e.g., transferring cryptocurrency, recording ownership, or executing smart contracts). Transactions are broadcast to the network.</li>
            <li><strong>Validation:</strong> Nodes (miners) validate transactions by solving complex mathematical puzzles (proof of work or proof of stake). Once validated, transactions are bundled into a block.</li>
            <li><strong>Consensus:</strong> Consensus mechanisms ensure agreement among nodes. Common mechanisms include Proof of Work (PoW), Proof of Stake (PoS), and Delegated Proof of Stake (DPoS).</li>
            <li><strong>Adding to the Chain:</strong> Validated blocks are added to the chain. Each block contains a reference to the previous block (hash pointer).</li>
          </ul>
        </Col>
      </Row>
      <ul>
        <li>
          <strong>Decentralized Insurance Explained</strong>: Understand how decentralized insurance works and its benefits.
        </li>
        <li>
          <strong>How to Use StartShield</strong>: A step-by-step guide on navigating the StartShield platform.
        </li>
        <li>
          <strong>FAQs</strong>: Find answers to common questions about StartShield and decentralized insurance.
        </li>
        <li>
          <strong>Glossary</strong>: A reference for key terms related to blockchain, insurance, and StartShield.
        </li>
      </ul>
    </div >
  );
};


export default EducationalResources;
