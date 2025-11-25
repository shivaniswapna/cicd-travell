import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookingForm.css';

const BookingForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: 1,
    class: 'economy'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store booking data in localStorage or state
    localStorage.setItem('bookingData', JSON.stringify({ ...formData, service }));
    navigate('/payments');
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Book {service.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>From</label>
              <input
                type="text"
                name="from"
                placeholder="Departure city"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>To</label>
              <input
                type="text"
                name="to"
                placeholder="Arrival city"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Passengers</label>
              <select name="passengers" value={formData.passengers} onChange={handleChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="form-group">
              <label>Class</label>
              <select name="class" value={formData.class} onChange={handleChange}>
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>
          <div className="service-info">
            <h3>Service Details</h3>
            <p><strong>Service:</strong> {service.name}</p>
            <p><strong>Destination:</strong> {service.destination}</p>
            <p><strong>Price:</strong> {service.price}</p>
          </div>
          <button type="submit" className="proceed-btn">Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;