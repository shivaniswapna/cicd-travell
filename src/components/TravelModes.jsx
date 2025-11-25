import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { flights, trains, buses, cabs, ferries } from '../data';
import BookingForm from './BookingForm';
import '../styles/TravelModes.css';

const TravelModes = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const allServices = [
    ...flights.map(f => ({ ...f, category: 'flights', route: '/flights' })),
    ...trains.map(t => ({ ...t, category: 'trains', route: '/trains' })),
    ...buses.map(b => ({ ...b, category: 'buses', route: '/buses' })),
    ...cabs.map(c => ({ ...c, category: 'cabs', route: '/cabs' })),
    ...ferries.map(f => ({ ...f, category: 'ferries', route: '/ferries' }))
  ];

  const filteredServices = activeCategory === 'all'
    ? allServices
    : allServices.filter(service => service.category === activeCategory);

  const handleBookNow = (service) => {
    setSelectedService(service);
  };

  const closeBookingForm = () => {
    setSelectedService(null);
  };

  const categories = [
    { id: 'all', name: 'All Modes', icon: '🚀' },
    { id: 'flights', name: 'Flights', icon: '✈️' },
    { id: 'trains', name: 'Trains', icon: '🚂' },
    { id: 'buses', name: 'Buses', icon: '🚌' },
    { id: 'cabs', name: 'Cabs', icon: '🚕' },
    { id: 'ferries', name: 'Ferries', icon: '⛴️' }
  ];

  return (
    <div className="travel-modes">
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
            Choose Your Journey
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover the perfect way to reach your destination
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="travel-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h1>Travel Modes</h1>
        <p className="subtitle">Choose your preferred mode of transportation</p>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="services-grid">
        {filteredServices.map((service) => (
          <div key={`${service.category}-${service.id}`} className="service-card">
            <div className="service-header">
              <span className="category-badge">{service.category.toUpperCase()}</span>
              <img src={service.image} alt={service.name} className="service-image" />
            </div>
            <div className="service-info">
              <h3>{service.name}</h3>
              <p className="destination">{service.destination}</p>
              <div className="service-footer">
                <span className="price">{service.price}</span>
                <div className="service-actions">
                  <Link to={service.route} className="view-all-btn">
                    View All
                  </Link>
                  <button className="book-btn" onClick={() => handleBookNow(service)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <BookingForm service={selectedService} onClose={closeBookingForm} />
      )}
      </motion.div>
    </div>
  );
};

export default TravelModes;