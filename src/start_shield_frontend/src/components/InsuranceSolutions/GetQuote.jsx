import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './styles4.css';
import dataTemporar from '../../../../dataTemporar.json';

const GetQuote = () => {


  const [formData, setFormData] = useState({
    industry: '',
    revenue: '',
    employees: '',
    location: '',
    propertyValue: '',
    customCoverage: '',
  });
  const [quoteResponse, setQuoteResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save data to dataTemporar.json (simulation here)
    const newData = { ...formData };
    dataTemporar.quotes.push(newData); // In a real app, you'd use a backend API call to save data

    // AI-based quote generation (mocking AI behavior based on location and industry)
    const aiQuote = await generateAIQuote(formData);
    setQuoteResponse(aiQuote);
  };

  // Simulated AI response based on location and industry
  const generateAIQuote = async ({ location, industry, revenue }) => {
    let estimatedQuote;

    if (location.toLowerCase().includes('urban')) {
      estimatedQuote = industry.toLowerCase().includes('tech')
        ? revenue * 0.02
        : revenue * 0.015;
    } else {
      estimatedQuote = revenue * 0.01;
    }

    // Return a preliminary quote response
    return {
      estimatedCost: estimatedQuote.toFixed(2),
      message: 'This is an initial quote estimate. Final rates may vary based on full underwriting and company details.',
    };
  };

  return (
    <Container className="quote-container">
      <h2>Get a Quote</h2>
      <Container>
        <form className="quote-form" onSubmit={handleSubmit}>
          <label>Industry Type</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />

          <label>Annual Revenue</label>
          <input
            type="number"
            name="revenue"
            value={formData.revenue}
            onChange={handleChange}
            required
          />

          <label>Number of Employees</label>
          <input
            type="number"
            name="employees"
            value={formData.employees}
            onChange={handleChange}
            required
          />

          <label>Location (City/State)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Property Value</label>
          <input
            type="number"
            name="propertyValue"
            value={formData.propertyValue}
            onChange={handleChange}
            required
          />

          <label>Custom Coverage Requirements</label>
          <textarea
            name="customCoverage"
            value={formData.customCoverage}
            onChange={handleChange}
            placeholder="Specify any additional coverage needs"
          />

          <button type="submit">Get a Quote</button>
        </form>
      </Container>

      {/* Display AI-generated quote in a table format */}
      {quoteResponse && (
        <Container className="quote-response">
          <h2>Preliminary Quote Estimate</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Industry</th>
                <th>Location</th>
                <th>Revenue</th>
                <th>Estimated Quote</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formData.industry}</td>
                <td>{formData.location}</td>
                <td>${formData.revenue}</td>
                <td>${quoteResponse.estimatedCost}</td>
                <td>{quoteResponse.message}</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      )}

      {/* How It Works Section */}
      <Container className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li><strong>Select Your Coverage:</strong> Choose the specific coverage that fits your business needs.</li>
          <li><strong>Get a Quote:</strong> Enter basic information about your business to receive an instant online quote.</li>
          <li><strong>Personalized Pricing:</strong> Our system will calculate the cost based on the data provided, including business size, location, and coverage requirements.</li>
          <li><strong>Review and Purchase:</strong> Once you receive your quote, you can adjust the coverage and finalize the policy purchase.</li>
        </ol>
      </Container>
      <Container className='design-container'>
      <NavLink
        to="/checkPriceInsurance"
        activeClassName="nav-link active"
        className="buy-now-button"
      >
        Buy Now
      </NavLink>
      </Container>
    </Container>
  );
};

export default GetQuote;

