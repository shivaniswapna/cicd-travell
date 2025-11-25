import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About TravelEase</h3>
          <p>Your ultimate travel companion for seamless journeys across the globe.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#flights">Flights</a></li>
            <li><a href="#trains">Trains</a></li>
            <li><a href="#buses">Buses</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: ushakirankoppada8883@gmail.com</p>
          <p>Phone: +91 9392754719</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#facebook">📘</a>
            <a href="#twitter">🐦</a>
            <a href="#instagram">📷</a>
            <a href="#linkedin">💼</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 TravelEase. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;