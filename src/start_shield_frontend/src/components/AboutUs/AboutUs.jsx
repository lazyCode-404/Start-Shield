import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../Hero/index';
import aboutHero from '../../src/assets/images/tba.jpg';
import picture1 from '../../src/assets/images/tba.jpg';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './style.css'
import FredrickPicture from '../../src/assets/images/Fredrick Nonde Jr.jpg'
import RajKapoorPicture from '../../src/assets/images/Raj Kapoor.jpg'
import PrinceSiitaPicture from '../../src/assets/images/Prince Siita .jpg'
import GodfreyMwewaPicture from '../../src/assets/images/Godfrey mwewa.jpg'
import VincentReyPicture from '../../src/assets/images/Vincent Rey.jpg'
import WilliamNyirendaPhotos from '../../src/assets/images/William Nyirenda.jpg'

function AboutUs() {
  return (
    <div>
      {/* <div  > */}
      <Hero backgroundImage={aboutHero}  >
        <Row className="hero-details create-blur" sx={12}>
          <Col sm={4}>
            <h1 style={{ color: 'wgite' }} ><strong className="create-background">StartShield</strong>
            </h1>
          </Col>
        </Row>
      </Hero>
      {/* </div> */}
      <Container>
        <Row xs={12}>
          <Col sm={8}>
            <h2 className='subtitle'>About Us</h2>
            <p><strong>StartShield</strong>: developed by <strong>Motley Guard Solutions Limited, is an advanced insurance platform built on the </strong> <strong>Internet Computer Protocol (ICP)</strong>. Our platform utilizes blockchain technology to offer startups, SMEs, and individuals protection from various business disruptions, including hospitalization, natural disasters, and more.</p>
            <p>With <strong>STSH tokens</strong> at the core of our platform, policyholders can access a range of financial services, such as using tokens as collateral for loans, participating in business and capacity-building training, and engaging in climate change initiatives like carbon credit trading. StartShield’s tokenized model ensures that our insurance solutions not only provide coverage but also offer opportunities for financial growth and innovation.
            </p>
            <p>At <strong>StartShield</strong>, we are transforming insurance into a future-forward solution that prioritizes security, transparency, and flexibility to meet the needs of today’s digital economy.</p>
            <Container>
              <Row><h2 className='subtitle'>Values</h2></Row>
              <Container>
                <Col> <ul><p>1. <strong>Innovation</strong>: We embrace the power of blockchain to deliver cutting-edge insurance solutions.
                </p></ul>
                  <ul><p>2. <strong>Transparency</strong>: We are committed to providing clear, accessible, and easy-to-understand insurance processes.
                  </p></ul>
                  <ul><p>3. <strong>Security</strong>: Our platform ensures the highest levels of data security and trust through decentralized technology.
                  </p></ul>
                  <ul><p>4. <strong>Empowerment</strong>: We aim to provide tools that allow businesses and individuals to protect and grow their assets.
                  </p></ul>
                  <ul><p>5. <strong>Sustainability</strong>: We actively support initiatives such as climate change action and carbon credit programs through tokenization.
                  </p></ul></Col>
              </Container>
            </Container>
          </Col>
          <Col sm={4}>
            <h2 className='subtitle'>Our Mission</h2>
            <p>Our mission is to provide <i>innovative</i>, cost-effective insurance solutions that protect businesses and individuals from unforeseen disruptions, such as hospitalization, business challenges, and natural calamities. Through the use of blockchain technology and tokenization, <strong>StartShield</strong> aims to deliver secure, transparent, and flexible insurance services that offer both protection and financial empowerment.
            </p>
            <h2 className='subtitle'>Vision</h2>
            <p>At <strong>StartShield</strong>, our vision is to redefine the insurance industry by seamlessly integrating decentralized blockchain technology to create an accessible, transparent, and efficient platform for risk management. We aspire to become the leading provider of tokenized insurance solutions, empowering startups, SMEs, and individuals to thrive in an ever-changing business environment, while promoting financial resilience and growth.
            </p>
          </Col>

        </Row>
        <div style={{ marginTop: '50px' }}>
          <h2 id="ourTeam-here" className='subtitle'>StartShield Advisory Board Members</h2>
          <Container>
            <CardGroup style={{ gap: '15px' }}>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={GodfreyMwewaPicture} className='img-styles' />
                <Card.Body>
                  <Card.Title>Dr. Godfrey Mwewa</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Advisory Board</h6>
                  </Card.Text>
                  <Card.Text>
                    Chairman, Motley Institute of Business & Technology (MIBT) Advisory Board.
                  </Card.Text>
                  <Card.Text>
                    Senior Lecturer, University of Zambia.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={VincentReyPicture} className='img-styles' />
                <Card.Body>
                  <Card.Title>Dr. Vincent Rey Vicente</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Advisory Board</h6>
                  </Card.Text>
                  <Card.Text>
                    Director, International Council of Registered Blockchain Professionals (ICORBP).
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={PrinceSiitaPicture} className='img-styles' />
                <Card.Body>
                  <Card.Title>Prince Siita Sofo Hissan</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Advisory Board</h6>
                  </Card.Text>
                  <Card.Text>
                    Founder & President, AfCFTA Young Entrepreneurs Federation (AfYEF).
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={RajKapoorPicture} className='img-styles' />
                <Card.Body>
                  <Card.Title>Mr. Raj Kapoor</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Advisory Board</h6>
                  </Card.Text>
                  <Card.Text>
                    Founder, India Blockchain Alliance (IBA) & Innovative Zambia-India Blockchain Alliance (IZBA).
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} className='img-styles' />
                <Card.Body>
                  <Card.Title>Mr. Enock Chirima </Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Advisory Board</h6>
                  </Card.Text>
                  <Card.Text>
                    Blockchain Developer, Instructor, and Developer Relations (DevRel) Specialist at ICP Hub South Africa.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Container>
        </div>
        <div style={{ marginTop: '50px' }}>
          <h2 className='subtitle' id='partnersAndAdvisors'>StartShield-STSH Executive Board</h2>
          <Container>
            <CardGroup style={{ gap: '15px' }}>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={FredrickPicture} className='img-styles' />
                <Card.Body>
                  <Card.Title>Fredrick Nonde Jr</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Founder & Chief Executive Officer (CEO)</h6>
                  </Card.Text>
                  <Card.Text>
                  Certified Blockchain Professional (RBP, RBI, RBE, RBA) with ICORBP.
                  </Card.Text>
                  <Card.Text>
                  Co-founder, Motley Institute of Business & Technology (MIBT).
                  </Card.Text>
                  <Card.Text>
                  Web 3, ICP, and Blockchain Innovator and Developer.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={WilliamNyirendaPhotos} className='img-styles' />
                <Card.Body>
                  <Card.Title>William Nyirenda</Card.Title>
                  <h6 className="custom-h6-style"> Chief Blockchain Technology & Ethics Officer (CBTEO)</h6>
                  <Card.Text>
                  Strategic planner with expertise in blockchain ethics and operations.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} className='img-styles' />
                <Card.Body>
                  <Card.Title>Rabbeca Mwita</Card.Title>
                  <h6 className="custom-h6-style"> Chief Insurance & Risk Management Officer (CIRMO)</h6>
                  <Card.Text>
                  Specialist in financial management and insurance sector operations.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} className='img-styles' />
                <Card.Body>
                  <Card.Title>Costinel Malaiasi</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Chief Technology Officer (CTO)</h6>
                  </Card.Text>
                  <Card.Text>
                  Blockchain and AI Technology Expert.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
            </CardGroup>

          </Container>
        </div>
        <div style={{ marginTop: '50px' }}>
          <Container>
            <CardGroup style={{ gap: '15px' }}>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} className='img-styles' />
                <Card.Body>
                  <Card.Title>Andreea Malaiasi</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Chief Fintech Innovation Officer (CFIO)</h6>
                  </Card.Text>
                  <Card.Text>
                  Specialist in fostering financial technology solutions.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} className='img-styles' />
                <Card.Body>
                  <Card.Title>Sujeet Kumar</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Chief Strategy & Operations Officer (CSOO)</h6>
                  </Card.Text>
                  <Card.Text>
                  Web 3 and blockchain solutions architect.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} className='img-styles' />
                <Card.Body>
                  <Card.Title>Trust Mwendabai</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Cybersecurity Lead (CL)</h6>
                  </Card.Text>
                  <Card.Text>
                  Experienced in cybersecurity, public relations, and stakeholder engagement
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} className='img-styles' />
                <Card.Body>
                  <Card.Title>Keith Mwenya</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">Community Development Lead (CDL)</h6>
                  </Card.Text>
                  <Card.Text>
                  Focused on partnerships and fostering community engagement.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
            </CardGroup>

          </Container>
        </div>
        <div style={{ marginTop: '50px' }}>
          <h2 className='subtitle' id='partnersAndAdvisors'>StartShield-STSH Interns</h2>
          <Container>
            <CardGroup style={{ gap: '15px' }}>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} className='img-styles' />
                <Card.Body>
                  <Card.Title>Farah Khaddage</Card.Title>
                  <Card.Text>
                    <h6 className="custom-h6-style">AI & Full Stack Development Intern</h6>
                  </Card.Text>
                  <Card.Text>
                  Focused on building intelligent systems and contributing to the platform’s development.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} className='img-styles' />
                <Card.Body>
                  <Card.Title>Maryam Babatunde</Card.Title>
                  <h6 className="custom-h6-style"> Frontend Development Intern</h6>
                  <Card.Text>
                  Specializing in enhancing user interfaces and improving user experiences for StartShield’s platform.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} className='img-styles' />
                <Card.Body>
                  <Card.Title>Favor Peter</Card.Title>
                  <h6 className="custom-h6-style"> Graphics Design Intern</h6>
                  <Card.Text>
                  Dedicated to creating visually engaging content and strengthening the brand’s visual identity.
                  </Card.Text>
                  <a
                    href="https://www.linkedin.com/in/fredricknondejr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    Connect on LinkedIn
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 18 November 2024</small>
                </Card.Footer>
              </Card>
            </CardGroup>

          </Container>
        </div>
        <div style={{ marginTop: '50px' }}>
          <h2 className='subtitle'>Careers</h2>
          <Container className='card-personal-style'>
            <Row xs={12}>
              <Col sm={6}>
                <Container>
                  <div>
                    <Row xs={12}>
                      <Col sm={6}>
                        <h3>Title Job</h3>
                      </Col>
                      <Col sm={6}>
                        <p>Posted</p>
                        <date>12/12/2024</date>
                      </Col>
                      <h4>Subtitle Job(Position)</h4>
                      <div>
                        <p>Short Introduction</p>
                      </div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. Pellentesque vel nunc vitae ex molestie fringilla in quis est. Aenean fermentum, lacus ac egestas sagittis, est justo fringilla tellus, eu semper ex dui a mi. Pellentesque tellus ante, hendrerit et gravida non, interdum et magna. Vivamus pharetra ante sit amet lacus condimentum, nec tempus eros congue. Vivamus id purus vel libero aliquam hendrerit.</p>
                    </Row>
                  </div>
                </Container>
              </Col>
              <Col sm={6}>
                <Container>
                  <div>
                    <Row xs={12}>
                      <Col sm={6}>
                      </Col>
                      <Col sm={6}>
                        <p>Dedline</p>
                        <date>12/01/2025</date>
                      </Col>
                      <h4>Skils</h4>
                      <div>
                        <p>Criteria</p>
                      </div>
                      <ul />
                      <li><strong>Motoko:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                      <li><strong>JavaScript:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                      <li><strong>HTML:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                      <li><strong>CSS:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                      <li><strong>GitHub:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                      <li><strong>Linux:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    </Row>
                  </div>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default AboutUs;
