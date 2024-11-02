import React from 'react';
import './styles2.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from "react-bootstrap";
import BSaI1 from '../../src/assets/images/BSaI.jpg';
import LPV1 from '../../src/assets/images/LPV.jpg';
import NoE1 from '../../src/assets/images/LaPV.jpg';
import CCR1 from '../../src/assets/images/CCR.jpg';
import GaQ1 from '../../src/assets/images/GaQ.jpg';
import VmP1 from '../../src/assets/images/VmP.jpg';



const InsuranceSolution = () => {
  const navigate = useNavigate();

  const handleViewPolicies = () => {
    navigate('/view-policies');  // Navighează către pagina ViewPolicies
  };

  const handleRenewPolicy = () => {
    navigate('/renew-policy');  // Navighează către pagina RenewPolicy
  };
  const handleTokenManagement = () => {
    navigate('/token-management');
  };
  const handleClaims = () => {
    navigate('/claims');
  };
  const handleGetQuote = () => {
    navigate('/get-quote');
  };

  return (
    <div>
      <Container className='design-container'>
        <div>
          <div className="bop-page">
            <h1>Business Owners Policy (BOP)</h1>
            <p>
              The Business Owners Policy (BOP) is a comprehensive insurance package
              designed specifically for startups, SMEs, and business owners. It combines several types of insurance coverages into one, ensuring your business is protected against a wide range of risks, including property damage, business interruptions, and liability.
            </p>
          </div>
          {/* Coverage Options */}
          <div className="bop-page">
            <h2>Coverage Options</h2>
            <ul>
              <li><strong>Property Insurance:</strong> Covers damages to your business premises, equipment, and inventory.</li>
              <li><strong>General Liability:</strong> Protects against legal claims related to third-party injuries or property damage.</li>
              <li><strong>Business Interruption:</strong> Provides compensation for lost income if your business operations are disrupted.</li>
              <li><strong>Data Breach Coverage:</strong> Protection against losses from cyber-attacks or data breaches.</li>
              <li><strong>Additional Coverages:</strong> Tailored options like product liability, employment practices liability, or professional liability.</li>
            </ul>
          </div>
          {/* How It Works */}
          <div className="bop-page">
            <h2>How It Works</h2>
            <ol>
              <li><strong>Select Your Coverage:</strong> Choose the specific coverage that fits your business needs.</li>
              <li><strong>Get a Quote:</strong> Enter basic information about your business to receive an instant online quote.</li>
              <li><strong>Purchase and Activate:</strong> Review and purchase your policy online. Get instant confirmation and access to your policy details.</li>
              <li><strong>Manage and Claim:</strong> Manage your policy through the dashboard and make claims as necessary, with support for blockchain-backed claims processing.</li>
            </ol>
          </div>
          {/* Pricing Section */}
          <div className="bop-page">
            <h2>Pricing</h2>
            <p>
              Pricing depends on several factors such as:
            </p>
            <ul>
              <li>
                <img src={BSaI1} alt="Business Size and Industry Icon" className='small-icons' />
                Business size and industry
              </li>
              <li>
                <img src={LPV1} alt="Location and Property Value Icon" className='small-icons' />
                Location and property value
              </li>
              <li>
                <img src={NoE1} alt="Number of Employees Icon" className='small-icons' />
                Number of employees
              </li>
              <li>
                <img src={CCR1} alt="Custom Coverage Requirements Icon" className='small-icons' />
                Custom coverage requirements
              </li>
            </ul>
          </div>
          {/* Get a Quote Form */}
          <Container className='design-container'>
            <div className="bop-page">
              <h2>If you still think it doesn't suit you, get a quote!</h2>
              <Row md={12} className="bop-page">
                <Col sm={4}>
                  <h2>Get a Quote </h2>
                </Col>
                <Col sm={4}>
                  <img src={GaQ1} alt="Get a Quate" className='medium-icons' />
                </Col>
                <Col sm={4}>
                  <button onClick={handleGetQuote} className="convert-tokens-button">Get a Quote</button>
                </Col>
              </Row>
            </div>
          </Container>
          <Container className='design-container'>
            <NavLink
              to="/checkPriceInsurance"
              activeClassName="nav-link active"
              className="buy-now-button"
            >
              Buy Now
            </NavLink>
          </Container>

          {/* Policy Management Section */}
          <Container className='design-container'>
            <div className="bop-page">
              <h2>Policy Management</h2>
              <Container className='design-container'>
                <div className="policy-management">
                  <Row className="bop-page">
                    <Col>
                      <button onClick={handleViewPolicies} className="convert-tokens-button">View My Policies</button>
                    </Col>

                    <Col>
                      <button onClick={handleRenewPolicy} className="convert-tokens-button">Renew Policy</button>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
          </Container>
          {/* File a Claim Section */}
          <Container className='design-container'>
            <div className="bop-page">
              <h2>Make a Claim</h2>
              <Container className='design-container'>
              <div className="policy-management">
                <Row className="bop-page">

                  <form className="claim-form">
                    <Col>
                      <label>Claim Description</label>
                      {/* <textarea name="claim-description" /> */}

                      {/* <label>Upload Documents</label> */}
                      {/* <input type="file" name="claim-documents" /> */}
                    </Col>
                    <Col sm={4}>
                      <img src={VmP1} alt="Get a Quate" className='medium-icons' />
                    </Col>
                    <Col>
                      <button onClick={handleClaims} className="convert-tokens-button">File a Claim</button>
                      {/* <button type="submit">File a Claim</button> */}
                    </Col>
                  </form>
                </Row>
                </div>
              </Container>
            </div>
          </Container>
          {/* Convert Premiums to STSH Tokens */}
          <div className="bop-page">
            <h2>Convert Premiums to STSH Tokens</h2>
            <p>Use the premiums paid to earn STSH Tokens, which can be:</p>
            <ul>
              <li>Redeemed for discounts on future premiums</li>
              <li>Traded or cashed in for liquidity</li>
              <li>Used as collateral for business funding on the StartShield platform.</li>
            </ul>
            <button onClick={handleTokenManagement} className="convert-tokens-button">Token Management</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InsuranceSolution;
