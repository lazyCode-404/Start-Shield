import React, { useState, useEffect } from "react";
import data from "../../../data.json";
import "./TrainingEvtsManag.css";

const TrainingYEvtsManag = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });
  const [newMaterial, setNewMaterial] = useState({ eventId: "", file: null });

  // Funcția de creare a unui eveniment nou
  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert("Te rog să completezi toate câmpurile!");
      return;
    }
    const event = {
      id: `EVT-${events.length + 1}`,
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description,
      attendees: [],
    };
    setEvents([...events, event]);
    setNewEvent({ title: "", date: "", description: "" });
  };

  // Funcția de înregistrare a unui utilizator la un eveniment
  const handleRegisterUser = (eventId, userId) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        if (!event.attendees.includes(userId)) {
          event.attendees.push(userId);
        }
      }
      return event;
    });
    setEvents(updatedEvents);
    alert(`Utilizatorul ${userId} a fost înregistrat la evenimentul ${eventId}`);
  };

  // Funcția de gestionare a materialelor
  const handleUploadMaterial = () => {
    if (!newMaterial.eventId || !newMaterial.file) {
      alert("Te rog să selectezi un eveniment și un fișier!");
      return;
    }
    const material = {
      eventId: newMaterial.eventId,
      fileName: newMaterial.file.name,
    };
    setMaterials([...materials, material]);
    setNewMaterial({ eventId: "", file: null });
    alert("Materialul a fost încărcat cu succes!");
  };

  return (
    <div className="events-management">
      <h1>Training & Events Management</h1>

      {/* Event Scheduling */}
      <section className="section">
        <h2>Event Scheduling</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <textarea
          placeholder="Event Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        ></textarea>
        <button onClick={handleCreateEvent}>Create Event</button>
      </section>

      {/* Event Registration */}
      <section className="section">
        <h2>Event Registration</h2>
        {events.length === 0 && <p>No events available. Please create an event first.</p>}
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Description: {event.description}</p>
            <p>Attendees: {event.attendees.length}</p>
            <select onChange={(e) => handleRegisterUser(event.id, e.target.value)}>
              <option value="">Select User</option>
              {data.users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </section>

      {/* Event Materials */}
      <section className="section">
        <h2>Event Materials</h2>
        <select onChange={(e) => setNewMaterial({ ...newMaterial, eventId: e.target.value })}>
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setNewMaterial({ ...newMaterial, file: e.target.files[0] })}
        />
        <button onClick={handleUploadMaterial}>Upload Material</button>

        <h3>Uploaded Materials</h3>
        <ul>
          {materials.map((material, index) => (
            <li key={index}>
              Event ID: {material.eventId}, File: {material.fileName}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TrainingYEvtsManag;
