import React, { useState } from 'react';
import { ferries } from '../data';
import BookingForm from './BookingForm';
import '../styles/Ferries.css';

const Ferries = () => {
  const [selectedFerry, setSelectedFerry] = useState(null);

  const handleBookNow = (ferry) => {
    setSelectedFerry(ferry);
  };

  const closeBookingForm = () => {
    setSelectedFerry(null);
  };

  return (
    <div className="ferries">
      <h1>Available Ferries</h1>
      <div className="ferries-grid">
        {ferries.map((ferry) => (
          <div key={ferry.id} className="ferry-card">
            <img src={ferry.image} alt={ferry.name} className="ferry-image" />
            <div className="ferry-info">
              <h3>{ferry.name}</h3>
              <p>{ferry.destination}</p>
              <span className="price">{ferry.price}</span>
              <button className="book-btn" onClick={() => handleBookNow(ferry)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
      {selectedFerry && (
        <BookingForm service={selectedFerry} onClose={closeBookingForm} />
      )}
    </div>
  );
};

export default Ferries;