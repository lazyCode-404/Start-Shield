import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './style.css'; // Your custom CSS file
import Hero from '../Hero'
import imag_hero from '../../src/assets/images/h2.jpeg'

const Homepage=() => {
    return (
        <div>
        <Hero backgroundImage={imag_hero}>
     {/* Overview */}
 
     <section className="overview">
       <Row>
       <Col md={6}>
       <h1 className='top-title'>Welcome to StartShield</h1>
       </Col>
       <Col md={5}>
       <p>
         We provide innovative and transparent insurance solutions based on blockchain technology. StartShield combines blockchain security and efficiency to meet the specific needs of startups and small businesses. Explore our services and protect your business intelligently.
       </p>
       </Col>
       </Row>
     </section>
     </Hero>
   <Container className="homepage">
      
     {/* Features */}
     <Row lg={12}>
       <Col sm={2} className='first-col'>
       <section className="features">
       <Row>
         <Col>
           <h2>Business Owners Policy (BOP)</h2>
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
           <Button variant="primary">Buy Now</Button>
         </Col>
       </Row>
     </section>
     </Col>
   
       {/* </Col> */}
       <Col md={10}>
       
           <Button variant="primary">Get Started</Button>
      {/* Tokenomics */}
      <section className="tokenomics">
       <h2>Tokenomics</h2>
       <p>
         Discover the power of our native token, STSH. Learn how it fuels our ecosystem, rewards stakeholders, and drives community engagement.
       </p>
       {/* Additional content related to tokenomics */}
     </section>

     {/* Benefits */}
     <section className="benefits">
       <Row>
         <Col>
           <h2>Benefits</h2>
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

     {/* Call to Action */}
     <section className="cta">
       <Row>
         <Col>
           <h2>Call to Action</h2>
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
               src="/assets/images/start-shield-black-logo.jpg"
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
   </Container>
   </div>
 );
};
<a href="#">
<img
 className="logo"
 src="/assets/images/start-shield-black-logo.jpg"
 alt="StartShield Logo"
/>
</a>  

export default Homepage;


