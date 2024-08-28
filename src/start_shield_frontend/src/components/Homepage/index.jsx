import React from 'react';
import './homepage.css';
// import NavBar from './NavBar';
// import NavBar from '../NavBar';

function Homepage() {
    return (
        <div calssName="titles">
            {/* <NavBar /> */}
            <section id="overview">
                <h1>Welcome to StartShield</h1>
                <p>StartShield provides decentralized insurance solutions for the modern world.</p>
            </section>

            <section id="features">
                <h2>Features</h2>
                <ul>
                    <li>Decentralized Insurance</li>
                    <li>Tokenization and Staking</li>
                    <li>Governance Portal</li>
                    <li>Educational Resources</li>
                </ul>
            </section>

            <section id="benefits">
                <h2>Benefits</h2>
                <ul>
                    <li>Secure and Transparent</li>
                    <li>Community Driven</li>
                    <li>Innovative Solutions</li>
                    <li>Easy to Use</li>
                </ul>
            </section>

            <section id="call-to-action">
                <h2>Get Started with StartShield</h2>
                <button className="call-to-action">Sign Up</button>
                <button className="call-to-action">Learn More</button>
            </section>
        </div>
    );
}

export default Homepage;

// import React from 'react';
// import './index.css';

// function Homepage() {
//     return(
// //   return <div>Homepage Content</div>;
// <div>
// <section id="overview">
//   <h1>Welcome to StartShield</h1>
//   <p>StartShield provides decentralized insurance solutions for the modern world.</p>
// </section>

// <section id="features">
//   <h2>Features</h2>
//   <ul>
//     <li>Decentralized Insurance</li>
//     <li>Tokenization and Staking</li>
//     <li>Governance Portal</li>
//     <li>Educational Resources</li>
//   </ul>
// </section>

// <section id="benefits">
//   <h2>Benefits</h2>
//   <ul>
//     <li>Secure and Transparent</li>
//     <li>Community Driven</li>
//     <li>Innovative Solutions</li>
//     <li>Easy to Use</li>
//   </ul>
// </section>

// <section id="call-to-action">
//   <h2>Get Started with StartShield</h2>
//   <button>Sign Up</button>
//   <button>Learn More</button>
// </section>
// </div>
// );
// }

// export default Homepage;
