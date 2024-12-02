import React, { useState } from "react";
import "./ClaimForm.css";

function ClaimForm({ policy, onClose }) {
  const [claimDetails, setClaimDetails] = useState({
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaimDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Claim submitted for Policy ID: ${policy.id}\nDetails: ${JSON.stringify(claimDetails)}`);
    onClose(); // Close the form after submission
  };

  return (
    <div className="claim-form-container">
      <h3>Submit a Claim for Policy ID: {policy.id}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <textarea
            name="description"
            value={claimDetails.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Incident Date:
          <input
            type="date"
            name="date"
            value={claimDetails.date}
            onChange={handleChange}
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Claim
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClaimForm;
