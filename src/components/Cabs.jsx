import React, { useState } from 'react';
import { cabs } from '../data';
import BookingForm from './BookingForm';
import '../styles/Cabs.css';

const Cabs = () => {
  const [selectedCab, setSelectedCab] = useState(null);

  const handleBookNow = (cab) => {
    setSelectedCab(cab);
  };

  const closeBookingForm = () => {
    setSelectedCab(null);
  };

  return (
    <div className="cabs">
      <h1>Available Cabs</h1>
      <div className="cabs-grid">
        {cabs.map((cab) => (
          <div key={cab.id} className="cab-card">
            <img src={cab.image} alt={cab.name} className="cab-image" />
            <div className="cab-info">
              <h3>{cab.name}</h3>
              <p>{cab.destination}</p>
              <span className="price">{cab.price}</span>
              <button className="book-btn" onClick={() => handleBookNow(cab)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
      {selectedCab && (
        <BookingForm service={selectedCab} onClose={closeBookingForm} />
      )}
    </div>
  );
};

export default Cabs;