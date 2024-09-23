import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../Hero/index';
import aboutHero from '../../../public/assets/images/tba.jpg';
import picture1 from '../../../public/assets/images/tba.jpg';
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
          <Col sm={4}>
            <h2 className='subtitle'>Our Mission</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. Pellentesque vel nunc vitae ex molestie fringilla in quis est. Aenean fermentum, lacus ac egestas sagittis, est justo fringilla tellus, eu semper ex dui a mi. Pellentesque tellus ante, hendrerit et gravida non, interdum et magna. Vivamus pharetra ante sit amet lacus condimentum, nec tempus eros congue. Vivamus id purus vel libero aliquam hendrerit. Nulla condimentum congue dolor eu efficitur. Nam et tempor dui. Nam eu ipsum scelerisque, aliquam neque id, ornare mi. Sed tristique elit quis neque pellentesque, et scelerisque risus mollis. Nulla consequat gravida risus sed lobortis.</p>
            <h2 className='subtitle'>Our Vision</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. Pellentesque vel nunc vitae ex molestie fringilla in quis est. Aenean fermentum, lacus ac egestas sagittis, est justo fringilla tellus, eu semper ex dui a mi. Pellentesque tellus ante, hendrerit et gravida non, interdum et magna. Vivamus pharetra ante sit amet lacus condimentum, nec tempus eros congue. Vivamus id purus vel libero aliquam hendrerit. Nulla condimentum congue dolor eu efficitur. Nam et tempor dui. Nam eu ipsum scelerisque, aliquam neque id, ornare mi. Sed tristique elit quis neque pellentesque, et scelerisque risus mollis. Nulla consequat gravida risus sed lobortis.</p>
          </Col>
          <Col sm={8}>
            <h2 className='subtitle'>About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat scelerisque diam ac finibus. Pellentesque vel nunc vitae ex molestie fringilla in quis est. Aenean fermentum, lacus ac egestas sagittis, est justo fringilla tellus, eu semper ex dui a mi. Pellentesque tellus ante, hendrerit et gravida non, interdum et magna. Vivamus pharetra ante sit amet lacus condimentum, nec tempus eros congue. Vivamus id purus vel libero aliquam hendrerit. Nulla condimentum congue dolor eu efficitur. Nam et tempor dui. Nam eu ipsum scelerisque, aliquam neque id, ornare mi. Sed tristique elit quis neque pellentesque, et scelerisque risus mollis. Nulla consequat gravida risus sed lobortis. Sed at diam ut sapien ornare faucibus. Morbi vel elementum dui. Sed dignissim neque magna, id imperdiet mauris efficitur ullamcorper.

              Mauris aliquet odio sapien, eget dignissim eros bibendum a. Donec porta eu lectus sed sagittis. Mauris tempor euismod tempus. Maecenas sit amet metus at tortor aliquam ultricies. Sed faucibus turpis eros, ac viverra odio accumsan non. Donec ullamcorper ut dui sit amet pretium. Duis sit amet augue in ligula semper egestas mollis eu felis. Fusce varius, erat in aliquet mollis, lectus lorem dapibus enim, vitae pharetra ipsum nisi consectetur nulla. Nullam volutpat porttitor nisl id viverra. Duis eleifend eget urna et pellentesque. Nulla nec blandit mauris.

              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus a tempus metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lorem lacus, rutrum eget magna sit amet, tempor placerat mauris. Vestibulum sed diam vestibulum enim facilisis sagittis ut porta mi. Aliquam erat volutpat. Nunc nec libero vel nisl tincidunt semper. Quisque a nunc orci. Cras nec magna quis eros feugiat consectetur. Sed ac sodales neque, sit amet auctor nisi. Quisque vel arcu odio. Donec ac iaculis elit, nec ullamcorper ante. Vivamus leo turpis, porta at augue vel, vestibulum pretium nibh. Proin venenatis eleifend malesuada.</p>
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
