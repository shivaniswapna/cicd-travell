import React, { useState } from 'react';
import { buses } from '../data';
import BookingForm from './BookingForm';
import '../styles/Buses.css';

const Buses = () => {
  const [selectedBus, setSelectedBus] = useState(null);

  const handleBookNow = (bus) => {
    setSelectedBus(bus);
  };

  const closeBookingForm = () => {
    setSelectedBus(null);
  };

  return (
    <div className="buses">
      <h1>Available Buses</h1>
      <div className="buses-grid">
        {buses.map((bus) => (
          <div key={bus.id} className="bus-card">
            <img src={bus.image} alt={bus.name} className="bus-image" />
            <div className="bus-info">
              <h3>{bus.name}</h3>
              <p>{bus.destination}</p>
              <span className="price">{bus.price}</span>
              <button className="book-btn" onClick={() => handleBookNow(bus)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
      {selectedBus && (
        <BookingForm service={selectedBus} onClose={closeBookingForm} />
      )}
    </div>
  );
};

export default Buses;