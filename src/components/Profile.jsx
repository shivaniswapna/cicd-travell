 import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = ({ onLogout }) => {
  const [bookings, setBookings] = useState([]);
  const [userData, setUserData] = useState({
    name: 'Koppada shakiran',
    email: 'ushakirakoppada8883@gail.com',
    memberSince: 'January 2024'
  });

  useEffect(() => {
    // Load user data from localStorage
    const name = localStorage.getItem('userName') || 'John Doe';
    const email = localStorage.getItem('userEmail') || 'john.doe@example.com';
    const memberSince = localStorage.getItem('memberSince') || 'January 2024';
    setUserData({ name, email, memberSince });

    // Load all bookings from localStorage
    const allBookings = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('booking')) {
        try {
          const booking = JSON.parse(localStorage.getItem(key));
          allBookings.push({ id: key, ...booking });
        } catch (e) {
          // Ignore invalid JSON
        }
      }
    }
    setBookings(allBookings);
  }, []);

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-welcome">
          <h2>Welcome back, {userData.name.split(' ')[0]}!</h2>
          <p>Manage your account and view your bookings</p>
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-item">
          <label>Name:</label>
          <span>{userData.name}</span>
        </div>
        <div className="profile-item">
          <label>Email:</label>
          <span>{userData.email}</span>
        </div>
        <div className="profile-item">
          <label>Member Since:</label>
          <span>{userData.memberSince}</span>
        </div>
        <div className="profile-item">
          <label>Total Bookings:</label>
          <span>{bookings.length}</span>
        </div>
      </div>

      <div className="booking-history">
        <h2>Booking History</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-item">
                {booking.type === 'hotel' ? (
                  <>
                    <h3>🏨 Hotel Booking</h3>
                    <p><strong>Hotel:</strong> {booking.hotel.name}</p>
                    <p><strong>Location:</strong> {booking.hotel.location}</p>
                    <p><strong>Check-in:</strong> {booking.checkIn}</p>
                    <p><strong>Check-out:</strong> {booking.checkOut}</p>
                    <p><strong>Guests:</strong> {booking.guests} | <strong>Rooms:</strong> {booking.rooms}</p>
                  </>
                ) : (
                  <>
                    <h3>✈️ Travel Booking</h3>
                    <p><strong>Service:</strong> {booking.service?.name || 'N/A'}</p>
                    <p><strong>From:</strong> {booking.from} | <strong>To:</strong> {booking.to}</p>
                    <p><strong>Date:</strong> {booking.date} | <strong>Time:</strong> {booking.time}</p>
                    <p><strong>Passengers:</strong> {booking.passengers} | <strong>Class:</strong> {booking.class}</p>
                  </>
                )}
                <p><strong>Total Price:</strong> {booking.type === 'hotel' ?
                  (() => {
                    const nights = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));
                    const priceNum = parseFloat(booking.hotel.price.replace('$', '').replace('/night', ''));
                    return `$${priceNum * nights}`;
                  })() :
                  booking.service?.price || 'N/A'
                }</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Profile;