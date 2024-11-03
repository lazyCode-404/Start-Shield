import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { processClaimAI } from '../../motokoAPI';
import './style3.css';

const Claims = () => {
  const [claimDetails, setClaimDetails] = useState({
    description: '',
    photos: [],
    receipts: [],
    expenses: [],
    otherDocuments: [],
    status: 'Pending',
    estimatedCompletion: 'N/A',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [trackClaimId, setTrackClaimId] = useState(''); // State pentru ID-ul cererii
  const [trackedStatus, setTrackedStatus] = useState(''); // State pentru statusul urmărit

  // Handle file changes for different document types
  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files); // Convert to array
    const fileURLs = files.map(file => URL.createObjectURL(file)); // Create URLs for preview

    setClaimDetails(prevState => ({
      ...prevState,
      [type]: [...prevState[type], ...files], // Append new files
    }));

    // Update the uploaded files state for preview
    if (type === 'photos') {
      setUploadedFiles(prevFiles => [...prevFiles, ...fileURLs]);
    } else {
      setUploadedDocuments(prevDocs => [...prevDocs, ...files.map(file => file.name)]);
    }
  };

  // State for uploaded files previews
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  // Handle claim submission
  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    
    // AI processing for the claim
    const response = await processClaimAI(claimDetails);
    setResponseMessage(response);

    // Reset the form after submission
    setClaimDetails({
      description: '',
      photos: [],
      receipts: [],
      expenses: [],
      otherDocuments: [],
      status: 'Pending',
      estimatedCompletion: 'N/A',
    });
    setUploadedFiles([]); // Reset uploaded files
    setUploadedDocuments([]); // Reset uploaded documents
  };
    // Track claim status
    const trackClaimStatus = async (id) => {
      const status = await trackClaimStatusAPI(id);
      setTrackedStatus(status);
    };
  

  return (
    <Container className="claims">
      <h2>File a Claim</h2>
      <Form onSubmit={handleClaimSubmit}>
        <Form.Group controlId="description">
          <Form.Label>Claim Description</Form.Label>
          <Form.Control
            as="textarea"
            value={claimDetails.description}
            onChange={(e) => setClaimDetails({ ...claimDetails, description: e.target.value })}
            placeholder="Describe the issue"
          />
        </Form.Group>

        <Form.Group controlId="photos">
          <Form.Label>Upload Photos</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileChange(e, 'photos')}
            accept="image/*"
            multiple
          />
        </Form.Group>

        <Form.Group controlId="receipts">
          <Form.Label>Upload Receipts</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileChange(e, 'receipts')}
            accept=".pdf,.doc,.docx,.txt"
            multiple
          />
        </Form.Group>

        <Form.Group controlId="expenses">
          <Form.Label>Upload Expense Reports</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileChange(e, 'expenses')}
            accept=".pdf,.doc,.docx,.txt"
            multiple
          />
        </Form.Group>

        <Form.Group controlId="otherDocuments">
          <Form.Label>Other Documents</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileChange(e, 'otherDocuments')}
            accept=".pdf,.doc,.docx,.txt"
            multiple
          />
        </Form.Group>

        <Button variant="primary" type="submit">File a Claim</Button>
      </Form>

      {responseMessage && <p>{responseMessage}</p>}

      {/* Tracker for claim status */}
      <h4>Track Your Claim Status</h4>
      <Form.Group controlId="trackClaim">
        <Form.Label>Enter Your Claim ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., CLM54321"
          value={trackClaimId}
          onChange={(e) => setTrackClaimId(e.target.value)}
        />
        <Button
          variant="info"
          onClick={() => trackClaimStatus(trackClaimId)} // Use the dynamic input
        >
          Track Status
        </Button>
      </Form.Group>

      {trackedStatus && (
        <p>
          <strong>Status: </strong>{trackedStatus}
        </p>
      )}

      {/* Display uploaded images */}
      {uploadedFiles.length > 0 && (
        <div>
          <h4>Uploaded Photos:</h4>
          <div className="file-previews">
            {uploadedFiles.map((url, index) => (
              <img key={index} src={url} alt={`Uploaded preview ${index}`} style={{ width: '100px', margin: '5px' }} />
            ))}
          </div>
        </div>
      )}

      {/* Display uploaded document names */}
      {uploadedDocuments.length > 0 && (
        <div>
          <h4>Uploaded Documents:</h4>
          <ul>
            {uploadedDocuments.map((docName, index) => (
              <li key={index}>{docName}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Claims;
