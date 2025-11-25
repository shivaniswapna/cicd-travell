import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/ItineraryPlanner.css';

const ItineraryPlanner = () => {
  const [itinerary, setItinerary] = useState([]);
  const [newDestination, setNewDestination] = useState('');
  const [travelMode, setTravelMode] = useState('flight');
  const [date, setDate] = useState('');

  const addDestination = () => {
    if (newDestination && date) {
      const newItem = {
        id: Date.now(),
        destination: newDestination,
        mode: travelMode,
        date: date,
      };
      setItinerary([...itinerary, newItem]);
      setNewDestination('');
      setDate('');
    }
  };

  const clearAll = () => {
    setItinerary([]);
  };

  const saveItinerary = () => {
    // Placeholder for saving to backend
    alert('Itinerary saved! (This is a placeholder)');
  };

  return (
    <div className="itinerary-planner">
      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Plan Your Perfect Journey
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Create and organize your travel itinerary
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="planner-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="planner-form">
          <input
            type="text"
            placeholder="Enter destination"
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
          />
          <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)}>
            <option value="flight">Flight</option>
            <option value="train">Train</option>
            <option value="bus">Bus</option>
            <option value="cab">Cab</option>
            <option value="ferry">Ferry</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="add-btn" onClick={addDestination}>Add Destination</button>
        </div>
        <div className="itinerary-list">
          {itinerary.map((item) => (
            <div key={item.id} className="itinerary-item">
              <span>{item.destination} - {item.mode} on {item.date}</span>
            </div>
          ))}
        </div>
        <div className="planner-actions">
          <button className="save-btn" onClick={saveItinerary}>Save Itinerary</button>
          <button className="clear-btn" onClick={clearAll}>Clear All</button>
        </div>
      </motion.div>
    </div>
  );
};

export default ItineraryPlanner;