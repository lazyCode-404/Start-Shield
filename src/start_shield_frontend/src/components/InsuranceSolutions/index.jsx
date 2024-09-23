import React, { useState } from "react";
import './style.css';
import { Container, Row, Col } from 'react-bootstrap';
import img1 from '../../../public/assets/images/tba.jpg'
import {FaBusinessTime, FaHandPointDown} from "react-icons/fa";
import Hero from '../Hero';
import herro from '../../../public/assets/images/tba.jpg';
import { NavLink } from 'react-router-dom';





function InsuranceSolution() {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    return (
        <div>
            <div  >
                <Hero backgroundImage={herro}  >
                    <Row className="hero-details create-blur" sx={12}>
                        <Col sm={4}>
                            <h1 style={{ color: 'wgite' }} ><strong className="create-background">StartShield</strong>
                            </h1>
                        </Col>
                        <Col  sm={6}>
                            <h2 style={{ color: 'white'}} className="create-background"> A Comprehensive Blockchain-Based Insurance Solution for Startups and MSMEs
                            </h2>
                        </Col>
                    </Row>
                </Hero>
            </div>
            {/* <Navbar /> */}
            <div>
                <Container fluid className="content-container">
                    <Row>
                        <Col xs={12}>

                            <h2 className="subtitle">Business Owners Policy (BOP)</h2>
                            <p>
                                A Business Owners Policy (BOP) is an insurance package aimed specifically at small and medium-sized businesses. It combines several types of insurance coverage into one policy, thus simplifying the insurance process for business owners.
                            </p>
                            <Row>
                                <Col md={5}>
                            <p>
                                In general, a BOP includes three main types of insurance:
                            </p>
                            </Col>
                            <FaHandPointDown />
                            <Col sm={2}>
                            </Col>
                            </Row>
                            <Row>
                            <Col md={4}>
                                <h2 onClick={toggleDetails} style={{ cursor: "pointer" }} className="create-background subtitle">
                                 General Liability Insurance 
                                </h2>
                                {showDetails && (
                                    <div>
                                        <ul>
                                            <li> Protects the business against liability claims for bodily injury and property damage caused by business operations.</li>
                                        </ul>
                                    </div>
                                )}
                            </Col>
                            <Col md={4}>
                                <h2 onClick={toggleDetails} style={{ cursor: "pointer" }} className="create-background subtitle">
                                    Commercial Property Insurance
                                </h2>
                                {showDetails && (
                                    <div>
                                        <ul>
                                            <li> Covers business buildings and assets against damage caused by fire, theft, vandalism, and other specified perils.</li>
                                        </ul>
                                    </div>
                                )}
                            </Col>
                            <Col md={4}>
                                <h2 onClick={toggleDetails} style={{ cursor: "pointer" }} className="create-background subtitle">
                                    Business Interruption Insurance
                                </h2>
                                {showDetails && (
                                    <div>
                                        <ul>
                                            <li> Covers the loss of income and additional expenses required to keep the business running in the event of a disaster that interrupts normal operations.</li>
                                        </ul>
                                    </div>
                                )}
                            </Col>
                            </Row>
                            <p>
                                BOPs are typically available to businesses with fewer than 100 employees and less than $5 million in annual revenue. These policies are ideal for businesses that own physical assets such as equipment or inventory and operate from a physical location such as an office or shop.
                            </p>
                            <p>
                                In conclusion, a BOP offers a convenient and effective solution for protecting small and medium-sized businesses against common risks, thus ensuring their continuity and stability.
                            </p>
                        </Col>
                    </Row>
                    <div>
                        <Container fluid className="content-container">
                            <Row>
                                <Col xs={12}>
                                    <div>
                                        <h2 onClick={toggleDetails} style={{ cursor: "pointer" }} className="create-background subtitle">
                                            Overview
                                        </h2>
                                        {showDetails && (
                                            <div>
                                                <ul>
                                                    <li> <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. Pellentesque vel nunc vitae ex molestie fringilla in quis est. Aenean fermentum, lacus ac egestas sagittis, est justo fringilla tellus, eu semper ex dui a mi.
                                                    </p>
                                                        <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. Pellentesque vel nunc vitae ex molestie fringilla in quis est. Aenean fermentum, lacus ac egestas sagittis, est justo fringilla tellus, eu semper ex dui a mi.
                                                        </p>
                                                        <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. Pellentesque vel nunc vitae ex molestie fringilla in quis est. Aenean fermentum, lacus ac egestas sagittis, est justo fringilla tellus, eu semper ex dui a mi.
                                                        </p>
                                                        <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. Pellentesque vel nunc vitae ex molestie fringilla in quis est. Aenean fermentum, lacus ac egestas sagittis, est justo fringilla tellus, eu semper ex dui a mi.
                                                        </p>
                                                        <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. Pellentesque vel nunc vitae ex molestie fringilla in quis est. Aenean fermentum, lacus ac egestas sagittis, est justo fringilla tellus, eu semper ex dui a mi.
                                                        </p></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Container>
                <Container fluid style={{ backgroundColor: '#fafcfc', padding: '20px' }}>
                    <Row sx={12}>
                        {/* <Col xs={12} sm={6} md={3} style={{ backgroundColor: '#fcfcfc', padding: '20px', marginBottom: '10px ' }}>
                            <Container className="gradient-container" div id="overview">
                                <Col className="column-style">
                                    <img src={img1} alt="My Image avatar" style={{ width: 240 }} />
                                </Col >
                                <Col className="column-style" style={{ padding: '14px', margin: '14px' }} >
                                    <h3 className="subtitle">Overview</h3>
                                </Col>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7}>
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. </p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7} >
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus.</p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7} >
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus.</p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row> 
                                <Col className="column-style">
                                    <button className="big-button" onClick={() => alert('Buton apăsat!')}>Buy Now</button>
                                </Col>
                            </Container >
                        </Col> */}
                        <Col  md={4} style={{ backgroundColor: '#fcfcfc', padding: '20px', marginBottom: '10px' }}>
                            <Container className="gradient-container">
                                <Col className="column-style">
                                    <img src={img1} alt="My Image avatar" style={{ width: 240 }} />
                                </Col >
                                <Col className="column-style" style={{ padding: '14px', margin: '14px' }} >
                                    <h3 className="subtitle">Coverage Options</h3>
                                </Col>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7}>
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. </p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7} >
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus.</p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7} >
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus.</p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Col className="column-style">
                                    <button className="big-button" onClick={() => alert('Buton apăsat!')}>Buy Now</button>
                                </Col>
                            </Container >
                        </Col>
                        <Col sm={4} style={{ backgroundColor: '#fcfcfc', padding: '20px', marginBottom: '10px' }}>
                            <Container className="gradient-container">
                                <Col className="column-style">
                                    <img src={img1} alt="My Image avatar" style={{ width: 240 }} />
                                </Col >
                                <Col className="column-style" style={{ padding: '14px', margin: '14px' }} >
                                    <h3 className="subtitle">How It Works</h3>
                                </Col>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7}>
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. </p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7} >
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus.</p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row> */}
                                <Col className="column-style">
                                    <button className="big-button" onClick={() => alert('Buton apăsat!')}>Buy Now</button>
                                </Col>
                            </Container >
                        </Col>
                        <Col sm={4} style={{ backgroundColor: '#fcfcfc', padding: '20px', marginBottom: '10px' }}>
                            <Container className="gradient-container">
                                <Col className="column-style">
                                    <img src={img1} alt="My Image avatar" style={{ width: 240 }} />
                                </Col >
                                <Col className="column-style" style={{ padding: '14px', margin: '14px' }} >
                                    <h3 className="subtitle">Pricing</h3>
                                </Col>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7}>
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. </p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                    {/* <li className="nav-item"> */}
                <NavLink
                  to="/checkPriceInsuranc"
                  activeClassName="nav-link active"
                  className=" small-button"
                >
                  Check
                </NavLink>
              {/* </li> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7} >
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus.</p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Col className="column-style">
                                    <button className="big-button" onClick={() => alert('Buton apăsat!')}>Buy Now</button>
                                </Col>
                            </Container >
                        </Col>
                    </Row>
                    <div>
                        <Container fluid className="content-container">
                            <Row>
                                <Col xs={12}>
                                    <div>
                                        <h2 onClick={toggleDetails} style={{ cursor: "pointer" }} className="create-background subtitle">
                                            Policy Management
                                        </h2>
                                        {showDetails && (
                                            <div>
                                                <ul>
                                                    <li> <p>
                                                        Policy Management is an essential process within any organization, ensuring that all policies and procedures are developed, implemented, and monitored effectively. This process involves several critical steps, including identifying organizational needs, developing policies, communicating them to employees, and monitoring compliance.
                                                    </p>
                                                        <p>
                                                            First, identifying organizational needs is crucial to develop relevant and effective policies. This involves assessing risks, analyzing legal regulations, and understanding the strategic objectives of the organization. Once the needs are identified, it is time to develop the policies, which must be clear, concise, and easy to understand for all employees.
                                                        </p>
                                                        <p>
                                                            Policy communication is another vital component of policy management. It is essential that all policies are effectively communicated to all employees, ensuring that they understand and follow the established rules and procedures. This can be achieved through training sessions, policy manuals, and internal communication platforms.
                                                        </p>
                                                        <p>
                                                            Compliance monitoring is the last step, but not the least. This involves the periodic assessment of compliance with policies and procedures, the identification of possible non-conformities, and the implementation of the necessary corrective measures. An effective policy management system helps to reduce risks, improve organizational performance, and ensure compliance with legal regulations.
                                                        </p>
                                                        <p>
                                                            In conclusion, Policy Management is a complex and ongoing process essential to the long-term success and sustainability of any organization.
                                                        </p></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <Row>
                        <Col xs={12} sm={6} md={3} style={{ backgroundColor: '#fcfcfc', padding: '20px', marginBottom: '10px ' }}>
                            <Container className="gradient-container">
                                <Col className="column-style">
                                    <img src={img1} alt="My Image avatar" style={{ width: 240 }} />
                                </Col >
                                <Col className="column-style" style={{ padding: '14px', margin: '14px' }} >
                                    <h3 className="subtitle">View Policies</h3>
                                </Col>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7}>
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. </p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7} >
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus.</p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Col className="column-style">
                                    <button className="big-button" onClick={() => alert('Buton apăsat!')}>Buy Now</button>
                                </Col>
                            </Container >
                        </Col>
                        <Col xs={12} sm={6} md={3} style={{ backgroundColor: '#fcfcfc', padding: '20px', marginBottom: '10px' }}>
                            <Container className="gradient-container">
                                <Col className="column-style">
                                    <img src={img1} alt="My Image avatar" style={{ width: 240 }} />
                                </Col >
                                <Col className="column-style" style={{ padding: '14px', margin: '14px' }} >
                                    <h3 className="subtitle">Renew Policy</h3>
                                </Col>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7}>
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. </p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7} >
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus.</p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Col className="column-style">
                                    <button className="big-button" onClick={() => alert('Buton apăsat!')}>Buy Now</button>
                                </Col>
                            </Container >
                        </Col>
                        <Col xs={12} sm={6} md={3} style={{ backgroundColor: '#fcfcfc', padding: '20px', marginBottom: '10px' }}>
                            <Container className="gradient-container">
                                <Col className="column-style">
                                    <img src={img1} alt="My Image avatar" style={{ width: 240 }} />
                                </Col >
                                <Col className="column-style" style={{ padding: '14px', margin: '14px' }} >
                                    <h3 className="subtitle">Make a Claim</h3>
                                </Col>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7}>
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. </p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7} >
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus.</p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Col className="column-style">
                                    <button className="big-button" onClick={() => alert('Buton apăsat!')}>Make a Claim</button>
                                </Col>
                            </Container >
                        </Col>
                        <Col xs={12} sm={6} md={3} style={{ backgroundColor: '#fcfcfc', padding: '20px', marginBottom: '10px' }}>
                            <Container className="gradient-container">
                                <Col className="column-style">
                                    <img src={img1} alt="My Image avatar" style={{ width: 240 }} />
                                </Col >
                                <Col className="column-style" style={{ padding: '14px', margin: '14px' }} >
                                    <h3 className="subtitle">Convert Premiums to STSH Tokens</h3>
                                </Col>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7}>
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. </p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="column-style" xs={2} >
                                        <FaBusinessTime />
                                    </Col>
                                    <Col className="column-style" xs={7} >
                                        <p className="informative-introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus.</p>
                                    </Col>
                                    <Col className="column-style" xs={3}>
                                        <button className="small-button" onClick={() => alert('Buton apăsat!')}>Check</button>
                                    </Col>
                                </Row>
                                <Col className="column-style">
                                    <button className="big-button" onClick={() => alert('Buton apăsat!')}>Buy Now</button>
                                </Col>
                            </Container >
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    )
};

export default InsuranceSolution;