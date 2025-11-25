import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleExploreNow = () => {
    navigate('/travel-modes');
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="overlay">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to TravelEase</h1>
            <p className="hero-subtitle">Your ultimate travel companion for seamless journeys across the globe</p>
            <button className="cta-button" onClick={handleExploreNow}>Explore Now</button>
          </div>
        </div>
      </div>

      <div className="featured-destinations">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Paris" />
            <h3>Paris, France</h3>
          </div>
          <div className="destination-card">
            <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop" alt="Tokyo" />
            <h3>Tokyo, Japan</h3>
          </div>
          <div className="destination-card">
            <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop" alt="New York" />
            <h3>New York, USA</h3>
          </div>
          <div className="destination-card">
            <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop" alt="Dubai" />
            <h3>Dubai, UAE</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;