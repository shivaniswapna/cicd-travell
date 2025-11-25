import React, { useState } from 'react';
import { flights } from '../data';
import BookingForm from './BookingForm';
import '../styles/Flights.css';

const Flights = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleBookNow = (flight) => {
    setSelectedFlight(flight);
  };

  const closeBookingForm = () => {
    setSelectedFlight(null);
  };

  return (
    <div className="flights">
      <h1>Available Flights</h1>
      <div className="flights-grid">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <img src={flight.image} alt={flight.name} className="flight-image" />
            <div className="flight-info">
              <h3>{flight.name}</h3>
              <p>{flight.destination}</p>
              <span className="price">{flight.price}</span>
              <button className="book-btn" onClick={() => handleBookNow(flight)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
      {selectedFlight && (
        <BookingForm service={selectedFlight} onClose={closeBookingForm} />
      )}
    </div>
  );
};

export default Flights;