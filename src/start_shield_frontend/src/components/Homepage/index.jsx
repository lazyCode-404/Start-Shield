import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './style.css'; // Your custom CSS file
import Hero from '../Hero'
import imag_hero from '../../src/assets/images/farmHerro.webp'
import farm from './../../src/assets/images/farmHerro.webp'
import ssstsh from './../../src/assets/images/ss-stsh-isea.webp'
import stsh from './../../src/assets/images/STSH.jpg'

const Homepage = () => {
  return (
    <div>
      <Hero backgroundImage={imag_hero}>
        {/* Overview */}

        <section className="overview">
          <Row>
            <Col md={6}>
              <h1 className='top-title'>Welcome to  <span class="startShieldSTSH">StartShield-STSH</span></h1>
              <h4 className='top-subtitle'>Revolutionizing Insurance for Startups, MSMEs, and Smallholder Farmers.</h4>
            </Col>
            <Col md={5}>
              <p>
                Empowering Communities with Affordable, Accessible, and Transparent Insurance Solutions.
                StartShield-STSH is a blockchain-based insurance platform built to address the critical gaps in traditional insurance systems. We leverage cutting-edge technologies like blockchain, AI, and tokenization to deliver innovative, impactful solutions to Africa and beyond.
              </p>
            </Col>
          </Row>
        </section>
      </Hero>
      {/* <Container xxl={12} className="homepage"> */}
      <section className='main-section'>
        {/* Features */}
        <Row xl={12} className='first-row'>
          <Col sm={2} className='first-col'>
            <section className="features setSection">
              <Row>
                <Col md={7}>
                  <img src={stsh} alt="stsh" style={{ width: 200 }} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2 className='titl-section'>Our Mission</h2>
                  <p>
                    At StartShield-STSH, we aim to create a future-ready ecosystem that provides risk protection for vulnerable sectors while fostering sustainable development and financial inclusion across Africa and the AfCFTA (African Continental Free Trade Area) ecosystem.
                  </p>
                </Col>
              </Row>

              <Row>
                <Col className='setSection'>
                  <h2 className='titl-section'>Tokenomics</h2>
                  <p>
                    Discover the power of our native token, STSH. Learn how it fuels our ecosystem, rewards stakeholders, and drives community engagement.
                  </p>
                  {/* Additional content related to tokenomics */}
                  <Button variant="primary">Buy Now</Button>
                </Col>
              </Row>
            </section>
          </Col>

          {/* </Col> */}
          <Col md={10} style={{ marginBlock: 20 }}>
            <section className='setSection'>
              <Row >

                <Col md={5}>
                  <h2 className='titl-section'>Why  <span class="startShieldSTSH">StartShield-STSH</span></h2>
                  <p>
                    <strong>Blockchain-Powered Insurance:</strong> Ensures transparency, trust, and efficiency in claim processes.
                  </p>
                  <p>
                    <strong>Tailored Solutions:</strong> Designed specifically for startups, MSMEs, and smallholder farmers.
                  </p>
                  <p>
                    <strong>Social Impact:</strong>  Empowering communities to thrive by mitigating risks such as crop failure, livestock loss, and medical expenses.
                  </p>
                  <p>
                    <strong>Affordable and Accessible::</strong> Simplified onboarding, affordable premiums, and easy claim processes.

                  </p>

                </Col>
                <Col md={7}>
                  <img src={ssstsh} alt="Design StartShield-STSH idea" style={{ height: 340 }} />
                </Col>
              </Row>
            </section>
            <Button variant="primary">Get Started</Button>
            {/* Tokenomics */}
            <section className="tokenomics setSection">
              <Row>
                <Col md={5}>
                  <h2 className='titl-section'>Business Owners Policy (BOP)</h2>
                  <p>
                    <strong>Detailed Description:</strong> The BOP package is tailored to the specific needs of small and medium-sized businesses. It includes coverage for property, liability, and other common risks. From safeguarding physical assets to risk management, BOP is the comprehensive solution for entrepreneurs.
                  </p>
                  <p>
                    <strong>Coverage Options:</strong> We offer a wide range of coverage options, from fire and theft to third-party liability.
                  </p>
                  <p>
                    <strong>Pricing:</strong> Learn about the costs associated with the BOP package and available payment methods. Our pricing is flexible to fit your budget.
                  </p>
                  <p>
                    <strong>How It Works:</strong> Follow our step-by-step guide to purchasing a BOP policy through the StartShield platform. From requesting a quote to policy issuance, we’ll guide you through the process.
                  </p>

                </Col>
                <Col md={7}>
                  <img src={farm} alt="Farm Vilage" style={{ height: 340 }} />
                </Col>

              </Row>
            </section>

            {/* Benefits */}

            <section className="benefits setSection">
              <Row>
                <Col>
                  <h2 className='titl-section'>Benefits</h2>
                  <p>
                    <strong>Security and Transparency:</strong> Decentralized insurance provides a high level of security and transparency due to blockchain technology. Your data is encrypted and securely stored, ensuring confidentiality.
                  </p>
                  <p>
                    <strong>Community Engagement:</strong> StartShield encourages active community participation in decision-making. Share your opinions and contribute to platform development.
                  </p>
                  <p>
                    <strong>Innovation and Simplicity:</strong> Our solutions bring innovation to the insurance industry without complicating the user experience. An intuitive interface allows quick access to information and informed decision-making.
                  </p>
                </Col>
              </Row>
            </section>
            <section className="keyFeatures setSection">
              <Row>
                <Col>
                  <h2 className='titl-section'>Key Features</h2>
                  <p>
                    <strong>Affordable Insurance Plans</strong> Accessible to businesses of all sizes and individual farmers.

                  </p>
                  <p>
                    <strong>Blockchain Transparency:</strong> Instant verification of claims and transactions.
                  </p>
                  <p>
                    <strong>AI-Driven Risk Analysis:</strong> Smart tools to help predict and mitigate risks.
                  </p>
                  <p>
                    <strong>Community-Centered Crowdfunding: </strong> Contribute to community-driven insurance pools to support collective growth.
                  </p>
                </Col>
              </Row>
            </section>
            <section className="joinMovement setSection">
              <Row>
                <Col>
                  <h2 className='titl-section'>Join the Movement</h2>
                  <p>
                    With communities mobilizing in <strong>Zambia</strong>, <strong>India</strong>, <strong>Kenya</strong>, <strong>Ghana</strong>, <strong>Nigeria</strong>, <strong>Sierra Leone</strong>, and <strong>South Africa</strong>,  <span class="startShieldSTSH">StartShield-STSH</span> is creating a network of empowered businesses and farmers, united to secure a sustainable future.
                  </p>
                </Col>
              </Row>
            </section>
            <section className="investorOpportunity setSection">
              <Row>
                <Col md={7}>
                  <h2 className='titl-section'>Investor Opportunity</h2>
                  <p>Take part in this transformative journey!</p>
                  <p>As an early investor, you gain access to:</p>
                  <p><strong>Exclusive Early-Bird Incentives.</strong></p>
                  <p>
                    Shares in,  <span class="startShieldSTSH">StartShield-STSH.</span>.
                  </p>
                  <p><strong>Tokens</strong> with <strong>High Growth Potential</strong>.</p>
                </Col>
                <Col md={5}>
                  <img src={stsh} alt="stsh" style={{ height: 200 }} />
                </Col>
              </Row>
            </section>
            <section className="crowdfundingCampaign setSection">
              <Row>
                <Col>
                  <h2 className='titl-section'>Crowdfunding Campaign</h2>
                  <p>
                    Support the <span class="startShieldSTSH">StartShield-STSH.</span>  mission by contributing to our crowdfunding campaign.
                  </p>
                  <p>Your small contribution can create a big impact.</p>
                </Col>

              </Row>
            </section>
            <section className="testimonials setSection">
              <Row>
                <Col>
                  <h2 className='titl-section'>Testimonials</h2>
                  <p>
                    <span class="startShieldSTSH">StartShield-STSH.</span>  has truly revolutionized how we manage risks on our farm. It's transparent, easy to use, and affordable!"
                  </p>
                  <p>— Nancy Mubanga, Smallholder Farmer, Zambia.</p>
                  <p>The blockchain integration is a game-changer. This is the future of insurance in Africa.</p>
                  <p>— Enock Chuma, Entrepreneur, South Africa
                    .</p>
                </Col>

              </Row>
            </section>

            {/* Call to Action */}
            <section className="cta setSection">
              <Row>
                <Col>
                  <h2 className='titl-section'>Call to Action</h2>
                  <p>
                    <strong>Sign Up:</strong> Create a StartShield account and begin the insurance process. Take advantage of the benefits offered by our platform.
                  </p>
                  <Button variant="primary">Sign Up</Button>
                  <p>
                    Or <a href="/learn-more">learn more</a> about our services.
                  </p>
                </Col>
              </Row>
            </section>
            <a href="#">
              <img
                className="logo"
                src="/assets/STSH-a9f7bf12.jpg"
                alt="StartShield Logo"
              />
            </a>
          </Col>
          {/* <Col md={6}>
           <img
             className="hero-image"
             src="/assets/images/start-shield-black-logo.jpg"
             alt="StartShield Logo"
           />
         </Col> */}

        </Row>
      </section>
      {/* </Container> */}
    </div>
  );
};
{/* <a href="#">
  <img
    className="logo"
    src="/assets/images/start-shield-black-logo.jpg"
    alt="StartShield Logo"
  />
</a> */}

export default Homepage;


