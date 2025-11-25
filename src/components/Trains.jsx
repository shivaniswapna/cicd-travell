import React, { useState } from 'react';
import { trains } from '../data';
import BookingForm from './BookingForm';
import '../styles/Trains.css';

const Trains = () => {
  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleBookNow = (train) => {
    setSelectedTrain(train);
  };

  const closeBookingForm = () => {
    setSelectedTrain(null);
  };

  return (
    <div className="trains">
      <h1>Available Trains</h1>
      <div className="trains-grid">
        {trains.map((train) => (
          <div key={train.id} className="train-card">
            <img src={train.image} alt={train.name} className="train-image" />
            <div className="train-info">
              <h3>{train.name}</h3>
              <p>{train.destination}</p>
              <span className="price">{train.price}</span>
              <button className="book-btn" onClick={() => handleBookNow(train)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
      {selectedTrain && (
        <BookingForm service={selectedTrain} onClose={closeBookingForm} />
      )}
    </div>
  );
};

export default Trains;