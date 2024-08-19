// import React from 'react';
import './style.css'; // Assuming you have some CSS for styling
import { FaPhone, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';
import React, { useState } from 'react';


function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Email submitted:', email);
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className='container'>
          <div className="column">
            <h3><span className="highlight-title">Contact Us</span></h3>
            <div className="contact-container">
              <div className="contact-item">
                <h3> Phone </h3>
                <ul>
                  <li> <a href="tel:+123 456 7890">Call <span className="highlight">Zambia</span>: +260 123 456 7890</a></li>
                  <li> <a href="tel:+123 456 7890">Call <span className="highlight">Lusaka</span>: +211 123 456 7890</a></li>
                </ul>
              </div>
              <div className="contact-item">
                <h3>Email</h3>
                <a href="https://mail.yahoo.com">contact@example.com</a>
              </div>
              <div className="contact-item">
                <h3>Address</h3>
                <p>123 Main Street, Lusaka, Zambia</p>
                <ul>
                  <li>
                    <a href="https://www.google.com/maps/place/Lusaka,+Zambia" target="_blank" rel="noopener noreferrer">
                      View <span className="highlight">Lusaka</span> on Map
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="column">
            <section>
              <h3><span className="highlight-title">Social Media Links</span></h3>
              <div className="social-links">
                <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              </div>
            </section>
            <br />
            <br />
            <section>
              <h3><span className="highlight-title">LinksQuick Links</span></h3>
              <div>
                <ul className="footer-links">
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                  <li><a href="#help">Help Center</a></li>
                </ul>
              </div>
            </section>
          </div>
          <div className="column">
            <h3><span className="highlight-title">Newsletter Signup</span></h3>
            <br />
            <div className="newsletter-signup">
              <h2>Subscribe to our Newsletter</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;