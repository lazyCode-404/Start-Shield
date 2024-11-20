import React, { useState } from 'react';
import data from '../../../data.json';
import './Support.css';

function Support() {
  // State for Contact Support form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      alert('Support request submitted successfully!');
    }
  };

  return (
    <div className="support-container">
      <h2>Support</h2>

      {/* Help Center Section */}
      <div className="help-center">
        <h3>Help Center</h3>
        <ul className="faq-list">
          <li>
            <strong>How can I view my policies?</strong>
            <p>Navigate to the 'Policies' section in your dashboard to view your active and past policies.</p>
          </li>
          <li>
            <strong>How do I submit a claim?</strong>
            <p>Go to the 'Claims' page, select the relevant policy, and click on 'Submit a Claim'.</p>
          </li>
          <li>
            <strong>Can I change my payment options?</strong>
            <p>Yes, you can change payment options from the 'Account Settings' under your profile.</p>
          </li>
        </ul>
      </div>

      {/* Contact Support Section */}
      <div className="contact-support">
        <h3>Contact Support</h3>
        {!formSubmitted ? (
          <form onSubmit={handleFormSubmit} className="support-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? 'input-error' : ''}
              />
              {errors.message && <p className="error-message">{errors.message}</p>}
            </div>
            <button type="submit" className="btn-submit">
              Submit Request
            </button>
          </form>
        ) : (
          <p className="success-message">Thank you for contacting support. We will get back to you soon.</p>
        )}
      </div>

      {/* User Info Section (From data.json) */}
      <div className="user-info">
        <h3>Your Details</h3>
        {data.users.map((user) => (
          <div key={user.id} className="user-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> {user.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Support;
