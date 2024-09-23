import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function UpcomingEvents() {
  const [events, setEvents] = useState("");

  const handleSubmit = () => {
    console.log({ events });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Upcoming Events</Card.Title>
        <Form>
          <Form.Group controlId="formUpcomingEvents">
            <Form.Label>Registered Events</Form.Label>
            <Form.Control
              type="text"
              value={events}
              onChange={(e) => setEvents(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UpcomingEvents;
