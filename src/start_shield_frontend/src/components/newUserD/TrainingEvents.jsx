import React, { useEffect, useState } from 'react';
import data from '../../../data.json';
import './TrainingEvents.css';

function TrainingEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Separate events into upcoming and completed/ Separăm evenimentele în viitoare și finalizate
    const upcoming = data.events.filter((event) => event.status === "Upcoming");
    const history = data.events.filter((event) => event.status === "Completed");

    setUpcomingEvents(upcoming);
    setEventHistory(history);
    setFilteredEvents(upcoming);
  }, []);

  // Search function / Funcție pentru căutare
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = upcomingEvents.filter((event) =>
      event.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  // Function for event registration/ Funcție pentru înregistrare la evenimente
  const handleRegister = (event) => {
    alert(`Successfully registered for ${event.title}`);
  };

  // Function to view available materials
  const handleViewMaterials = (event) => {
    if (event.materials && event.materials.length > 0) {
      alert(`Available materials: ${event.materials.join(", ")}`);
    } else {
      alert('No materials available for this event.');
    }
  };

  return (
    <div className="training-events-container">
      <div className="training-events-header">
        <h2>Training & Events</h2>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        {filteredEvents.length > 0 ? (
          <ul className="event-list">
            {filteredEvents.map((event) => (
              <li key={event.id} className="event-item">
                <div className="event-details">
                  <h4>{event.title}</h4>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                </div>
                <button onClick={() => handleRegister(event)} className="btn-register">
                  Register
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found.</p>
        )}
      </div>

      <div className="event-history">
        <h3>Event History</h3>
        <ul className="event-list">
          {eventHistory.map((event) => (
            <li key={event.id} className="event-item">
              <div className="event-details">
                <h4>{event.title}</h4>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>
              <button onClick={() => handleViewMaterials(event)} className="btn-view-materials">
                View Materials
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TrainingEvents;


