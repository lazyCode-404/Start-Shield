import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../Hero/index';
import aboutHero from '../../src/assets/images/tba.jpg';
import picture1 from '../../src/assets/images/tba.jpg';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './style.css'

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
            <p><strong>StartShield</strong>, developed by <strong>Motley Guard Solutions Limited, is an advanced insurance platform built on the </strong> <strong>Internet Computer Protocol (ICP)</strong>. Our platform utilizes blockchain technology to offer startups, SMEs, and individuals protection from various business disruptions, including hospitalization, natural disasters, and more.</p>
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
          <h2 id="ourTeam-here" className='subtitle'>Our Team</h2>
          <Container>
            <CardGroup style={{ gap: '15px' }}>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{' '}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This card has even longer content than the
                    first to show that equal height action.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </CardGroup>

          </Container>
        </div>
        <div style={{ marginTop: '50px' }}>
          <h2 className='subtitle' id='partnersAndAdvisors'>Partners and Advisor</h2>
          <Container>
            <CardGroup style={{ gap: '15px' }}>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{' '}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
              <Card className='card-personal-style'>
                <Card.Img variant="top" src={picture1} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in
                    to additional content. This card has even longer content than the
                    first to show that equal height action.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
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
