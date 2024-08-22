import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const UpcomingEventsCard = () => {
  const [events, setEvents] = useState([
    { date: "2024-08-10", description: "Event 1" },
    { date: "2024-08-15", description: "Event 2" },
    { date: "2024-08-20", description: "Event 3" }
  ]);

  useEffect(() => {
    // You can fetch events from your data source here
    // Example: fetch('/api/events').then(response => response.json()).then(data => setEvents(data));
  }, []);

  return (
    <div className="upcoming-events-card">
      <h2>Upcoming Events</h2>
      <ul className="event-list">
        {events.map((event, index) => (
          <li key={index}>
            <span className="event-date">{event.date}</span>: {event.description}
          </li>
        ))}
      </ul>
      <div className="calendar-container">
        <Calendar />
      </div>
    </div>
  );
};

export default UpcomingEventsCard;
