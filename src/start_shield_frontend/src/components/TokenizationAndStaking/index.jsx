import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import picture_tok from '../../../public/assets/images/tba.jpg';
import picture_tok1 from '../../../public/assets/images/h2.jpeg';
import picture_tok4 from '../../../public/assets/images/toc4.jpeg';
import './style.css';
import React from 'react';
// import MyButton from '../../../src/components/TokenizationAndStaking/mybutton.jsx';
import { MdToken } from "react-icons/md";
import { RiTokenSwapFill } from "react-icons/ri";


function TokenizationAndStaking() {
  const [inputValue, setInputValue] = useState('');
  return (
    <div>
      <Container>
        <Card>
          <Card.Body>This is some text within a card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Card.Body>
        </Card>
        <CardGroup style={{ gap: '150px' }}>
          <Card style={{ width: '40rem' }}>
            <Card.Img variant="top" src={picture_tok} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={picture_tok1} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={picture_tok4} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
      <div>
        <Row xs={12} className='h3_still'>
          {/* <Col xs={6}> */}
          <h3 style={{ fontWeight: 700, margin: '20px' }}>Subtitlu</h3>
          {/* </Col> */}
        </Row>
        <Row xs={12} className='description_still'>
          <Col xs={6}><h6>Describing <strong>things</strong> that would <strong>make</strong> an insurance a <strong>benefit</strong> for your organization</h6></Col>
          <Col xs={6}><h6>Describing <strong>things</strong> that would <strong>make</strong> an insurance a <strong>benefit</strong> for your organization</h6></Col>
        </Row>
        <Row xs={12} className='description_still'>
          <Col xs={2}><MdToken /></Col>
          <Col xs={7}>
          {/* <p>Input value: {inputValue}</p> */}
          <input
            type="text"
            placeholder="InputValue"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          
          </Col>
          <Col xs={1}><RiTokenSwapFill /></Col>
          {/* <Col xs={1}>  <MyButton className="custom-button">Stake</MyButton></Col> */}
        </Row>
      </div>
      {/* <MyButton className="custom-button">Tokenize</MyButton> */}
     
    </div>
  );
}

export default TokenizationAndStaking;
// // TokenizationAndStaking.js


// import React, { useState } from 'react';
// import { Container, Col, Row} from 'react-bootstrap';
// import './style.css'; // Don't forget to create this CSS file!

// const TokenOverview = () => {
//   const [showDetails, setShowDetails] = useState(false);

//   const toggleDetails = () => {
//     setShowDetails(!showDetails);
//   };

//   return (
//     <Container className="stsh-info-container">
//       <Row > 
//         <h2 onClick={toggleDetails} style={{ cursor: "pointer" }}>
//           STSH: Unleashing the Power
//         </h2>
//       <Col md={6}>
//         {showDetails && (
//           <div>
//             <ul>
//               <li>
//                 <div className="stsh-section">
//                   <h3>1. Staking Powerhouse</h3>
//                   <p>
//                     Staking isn't just about locking up tokens; it's an active commitment to the ecosystem. When users stake their STSH tokens, they contribute to the network's security and consensus mechanisms. It's like planting a tree—you nurture it, and in return, it bears fruit. By staking, users become stakeholders, shaping the platform's destiny.
//                   </p>
//                 </div>
//                 <div className="stsh-section">
//                   <h3>2. Governance Influence</h3>
//                   <p>
//                     STSH isn’t just a digital coin; it’s a voting ticket. Imagine a virtual town hall where STSH holders gather (okay, maybe it’s more like a Telegram chat) to discuss and decide. Protocol upgrades, fee adjustments, new features—these decisions are in their hands. It’s democracy meets blockchain, and it’s powerful.
//                   </p>
//                 </div>
//                 <div className="stsh-section">
//                   <h3>3. Access and Privileges</h3>
//                   <p>
//                     STSH opens doors. Holders gain access to exclusive features within StartShield. Think of it as a backstage pass to the DeFi concert. Maybe it unlocks premium analytics or lets you peek at upcoming products. The possibilities? As diverse as a crypto enthusiast’s portfolio.
//                   </p>
//                 </div>
//                 </li>
//             </ul>
//           </div>
//         )}
//       </Col>
//       <Col md={6}>
//         {showDetails && (
//           <div>
//             <ul>
//               <li>
//                 <div className="stsh-section">
//                   <h3>4. Economic Incentives</h3>
//                   <p>
//                     STSH aligns incentives like a cosmic force. Active participation—staking, voting, contributing—boosts the network. And guess what? The universe rewards you. Staking rewards, liquidity mining goodies, transaction fee shares—it’s like finding treasure while exploring the blockchain jungle.
//                   </p>
//                 </div>
//                 <div className="stsh-section">
//                   <h3>5. Community Building</h3>
//                   <p>
//                     Tokens weave communities. STSH holders aren’t just hodlers; they’re part of a vibrant ecosystem. Traders, developers, and curious minds gather around virtual campfires (okay, Discord servers) to share insights. It’s like a DeFi potluck—everyone brings something to the table.
//                   </p>
//                 </div>
//                 <div className="stsh-section">
//                   <h3>6. Beyond Code: Trust and Collaboration</h3>
//                   <p>
//                     STSH isn’t just lines of code; it’s a bridge between tech and human dreams. It symbolizes trust—the kind you need when sending crypto to that mysterious address. It’s also collaboration—the shared purpose that binds the StartShield crew. Together, they’re building a decentralized future.

//                     So, fellow crypto voyager, whether you’re staking, voting, or just admiring the transaction history, remember: STSH isn’t just a token; it’s a beacon guiding us toward financial empowerment.
//                   </p>
//                 </div></li>
//             </ul>
//           </div>
//         )}
//       </Col>
//       </Row>
//     </Container>
//   );
// };

// const Staking = () => {
//   return (
//     <div>
//       <h2>How to Stake</h2>
//       <ol>
//         <li>Create an account on StartShield.</li>
//         <li>Acquire STSH tokens.</li>
//         <li>Visit the Staking Dashboard.</li>
//         <li>Delegate your tokens to a validator.</li>
//         <li>Earn rewards!</li>
//       </ol>
//     </div>
//   );
// };

// const TransactionHistory = () => {
//   return (
//     <div>
//       <h2>Transaction History</h2>
//       <ul>
//         <li>Staked 100 STSH on 2024-08-29.</li>
//         <li>Received 10 STSH as staking rewards on 2024-09-05.</li>
//         {/* Add more transaction entries */}
//       </ul>
//     </div>
//   );
// };

// const TokenizationAndStaking = () => {
//   return (
//     <div>
//       <TokenOverview />
//       <Staking />
//       <TransactionHistory />
//     </div>
//   );
// };

// export default TokenizationAndStaking;
