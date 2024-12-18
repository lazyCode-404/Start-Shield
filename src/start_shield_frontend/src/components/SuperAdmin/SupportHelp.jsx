import React from "react";
import data from "../../../data.json";
import "./SupportHelp.css";

function SupportHelp() {
  const { helpCenter, contactSupport, systemLogs } = data;

  return (
    <div className="support-help-container">
      <h1>Support & Help</h1>

      <div className="section">
        <h2>Help Center</h2>
        <div className="help-center">
          <h3>FAQs</h3>
          <ul>
            {helpCenter.faqs.map((faq, index) => (
              <li key={index}>
                <strong>Q: {faq.question}</strong>
                <p>A: {faq.answer}</p>
              </li>
            ))}
          </ul>

          <h3>Guidelines</h3>
          <ul>
            {helpCenter.guidelines.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section">
        <h2>Contact Support</h2>
        <div className="contact-support">
          <p><strong>Email:</strong> {contactSupport.email}</p>
          <p><strong>Phone:</strong> {contactSupport.phone}</p>
          <p><strong>Hours:</strong> {contactSupport.hours}</p>
        </div>
      </div>

      <div className="section">
        <h2>System Logs</h2>
        <div className="system-logs">
          <ul>
            {systemLogs.map((log, index) => (
              <li key={index}>
                <strong>{log.date}:</strong> {log.activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SupportHelp;
