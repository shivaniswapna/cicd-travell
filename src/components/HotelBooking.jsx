import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockHotels } from '../data/mockHotels';
import '../styles/HotelBooking.css';

const HotelBooking = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  });
  const [availableHotels, setAvailableHotels] = useState(mockHotels); // Show all hotels by default
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // Validation
    if (!searchData.destination.trim()) {
      alert('Please enter a destination.');
      return;
    }
    if (!searchData.checkIn || !searchData.checkOut) {
      alert('Please select check-in and check-out dates.');
      return;
    }
    if (new Date(searchData.checkIn) >= new Date(searchData.checkOut)) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // POST /api/hotels/search
    // console.log('API Call: POST /api/hotels/search', searchData);
    // In real app, replace with: const response = await fetch('/api/hotels/search', { method: 'POST', body: JSON.stringify(searchData) });
    // const data = await response.json();

    let filtered = mockHotels;

    if (searchData.destination.trim()) {
      const searchTerm = searchData.destination.trim().toLowerCase();
      filtered = mockHotels.filter(hotel =>
        hotel.location.toLowerCase().includes(searchTerm) ||
        hotel.name.toLowerCase().includes(searchTerm) ||
        hotel.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm))
      );
    }

    // Ensure at least 5 hotels are returned for any valid input
    if (filtered.length === 0) {
      filtered = mockHotels.slice(0, 5);
    }

    setAvailableHotels(filtered);
    setIsLoading(false);
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleBookNow = (hotel) => {
    const bookingData = {
      ...searchData,
      hotel: hotel,
      type: 'hotel'
    };
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    navigate('/payments');
  };

  const handleProceedToPayment = () => {
    if (selectedHotel) {
      // API call: POST /api/bookings
      // console.log('API Call: POST /api/bookings', { ...searchData, hotel: selectedHotel });
      // In real app: const response = await fetch('/api/bookings', { method: 'POST', body: JSON.stringify({ ...searchData, hotel: selectedHotel }) });
      // const data = await response.json();
      const bookingData = {
        ...searchData,
        hotel: selectedHotel,
        type: 'hotel'
      };
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
      // Simulate success
      alert('Booking successful! Proceeding to payment...');
      navigate('/payments');
    }
  };


  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = (price, nights) => {
    const priceNum = parseFloat(price.replace('$', '').replace('/night', ''));
    return (priceNum * nights).toFixed(2);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="hotel-booking">
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
            Find Your Perfect Stay
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover luxury hotels worldwide
          </motion.p>
        </div>
      </motion.div>

      {/* Search Form */}
      <motion.div
        className="search-form-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <form onSubmit={handleSearch} className="hotel-search-form">
          <div className="form-row">
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                placeholder="Enter city or hotel name"
                value={searchData.destination}
                onChange={handleSearchChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                name="checkIn"
                value={searchData.checkIn}
                onChange={handleSearchChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                name="checkOut"
                value={searchData.checkOut}
                onChange={handleSearchChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Guests</label>
              <select name="guests" value={searchData.guests} onChange={handleSearchChange}>
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
              </select>
            </div>
            <div className="form-group">
              <label>Rooms</label>
              <select name="rooms" value={searchData.rooms} onChange={handleSearchChange}>
                <option value={1}>1 Room</option>
                <option value={2}>2 Rooms</option>
                <option value={3}>3 Rooms</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="search-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Searching...
                  </>
                ) : (
                  'Search Hotels'
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Hotel Cards */}
      <div className="search-results">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Available Hotels
        </motion.h2>
        {availableHotels.length === 0 ? (
          <motion.p
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No hotels found — try another destination.
          </motion.p>
        ) : (
          <motion.div
            className="hotels-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {availableHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                className="hotel-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="hotel-image-container">
                  <img src={hotel.image} alt={hotel.name} className="hotel-image" />
                  <div className="hotel-rating">{renderStars(hotel.rating)}</div>
                </div>
                <div className="hotel-info">
                  <h3>{hotel.name}</h3>
                  <p className="hotel-location">📍 {hotel.location}</p>
                  <p className="hotel-description">{hotel.description}</p>
                  <div className="hotel-footer">
                    <span className="hotel-price">{hotel.price}</span>
                    <div className="hotel-actions">
                      <button
                        className={`select-btn ${selectedHotel?.id === hotel.id ? 'selected' : ''}`}
                        onClick={() => handleSelectHotel(hotel)}
                      >
                        {selectedHotel?.id === hotel.id ? 'Selected' : 'View Details'}
                      </button>
                      <button className="book-btn" onClick={() => handleBookNow(hotel)}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {selectedHotel && (
          <motion.div
            className="booking-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Selected Hotel: {selectedHotel.name}</h3>
            <p>Check-in: {searchData.checkIn} | Check-out: {searchData.checkOut}</p>
            <p>Guests: {searchData.guests} | Rooms: {searchData.rooms}</p>
            <p>Total: {selectedHotel.price} × {calculateNights(searchData.checkIn, searchData.checkOut)} nights = ${calculateTotal(selectedHotel.price, calculateNights(searchData.checkIn, searchData.checkOut))}</p>
            <button className="proceed-payment-btn" onClick={handleProceedToPayment}>
              Proceed to Payment
            </button>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default HotelBooking;