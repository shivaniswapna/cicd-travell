import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Payments.css';

const Payments = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upi, setUpi] = useState('');
  const [netBanking, setNetBanking] = useState('');
  const [wallet, setWallet] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  const handlePayNow = () => {
    // Placeholder for payment processing
    setPaymentSuccess(true);
  };

  return (
    <div className="payments">
      {paymentSuccess ? (
        <div className="success-message">
          <h1>🎉 Successfully Booked!</h1>
          <p>Your booking has been confirmed. Check your email for details.</p>
          <button onClick={() => window.location.href = '/'}>Back to Home</button>
        </div>
      ) : (
        <>
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
                Secure Payment
              </motion.h1>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Complete your booking with our secure payment options
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="payment-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h1>Complete Your Booking</h1>
          {bookingData && (
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <div className="summary-details">
            {bookingData.type === 'hotel' ? (
              <>
                <p><strong>Hotel:</strong> {bookingData.hotel.name}</p>
                <p><strong>Location:</strong> {bookingData.hotel.location}</p>
                <p><strong>Check-in:</strong> {bookingData.checkIn}</p>
                <p><strong>Check-out:</strong> {bookingData.checkOut}</p>
                <p><strong>Guests:</strong> {bookingData.guests}</p>
                <p><strong>Rooms:</strong> {bookingData.rooms}</p>
                <p><strong>Total Price:</strong> {(() => {
                  const nights = Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24));
                  const priceNum = parseFloat(bookingData.hotel.price.replace('$', '').replace('/night', ''));
                  return `$${priceNum * nights}`;
                })()}</p>
              </>
            ) : (
              <>
                <p><strong>Service:</strong> {bookingData.service.name}</p>
                <p><strong>From:</strong> {bookingData.from}</p>
                <p><strong>To:</strong> {bookingData.to}</p>
                <p><strong>Date:</strong> {bookingData.date}</p>
                <p><strong>Time:</strong> {bookingData.time}</p>
                <p><strong>Passengers:</strong> {bookingData.passengers}</p>
                <p><strong>Class:</strong> {bookingData.class}</p>
                <p><strong>Total Price:</strong> {bookingData.service.price}</p>
              </>
            )}
          </div>
        </div>
      )}
      <div className="payment-methods">
        <h2>Select Payment Method</h2>
        <div className="method-tabs">
          <button
            className={paymentMethod === 'card' ? 'active' : ''}
            onClick={() => setPaymentMethod('card')}
          >
            Credit/Debit Card
          </button>
          <button
            className={paymentMethod === 'upi' ? 'active' : ''}
            onClick={() => setPaymentMethod('upi')}
          >
            UPI
          </button>
          <button
            className={paymentMethod === 'netbanking' ? 'active' : ''}
            onClick={() => setPaymentMethod('netbanking')}
          >
            Net Banking
          </button>
          <button
            className={paymentMethod === 'wallet' ? 'active' : ''}
            onClick={() => setPaymentMethod('wallet')}
          >
            Digital Wallet
          </button>
        </div>
        <div className="payment-form">
          {paymentMethod === 'card' && (
            <>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          {paymentMethod === 'upi' && (
            <div className="form-group">
              <label>UPI ID</label>
              <input
                type="text"
                placeholder="yourname@upi"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
              />
            </div>
          )}
          {paymentMethod === 'netbanking' && (
            <div className="form-group">
              <label>Select Bank</label>
              <select value={netBanking} onChange={(e) => setNetBanking(e.target.value)}>
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="pnb">Punjab National Bank</option>
              </select>
            </div>
          )}
          {paymentMethod === 'wallet' && (
            <div className="form-group">
              <label>Digital Wallet</label>
              <select value={wallet} onChange={(e) => setWallet(e.target.value)}>
                <option value="">Choose wallet</option>
                <option value="paytm">Paytm</option>
                <option value="phonepe">PhonePe</option>
                <option value="gpay">Google Pay</option>
                <option value="amazonpay">Amazon Pay</option>
              </select>
            </div>
          )}
          <button className="pay-btn" onClick={handlePayNow}>
            Pay Now - {bookingData ? (
              bookingData.type === 'hotel' ? (() => {
                const nights = Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24));
                const priceNum = parseFloat(bookingData.hotel.price.replace('$', '').replace('/night', ''));
                return `$${priceNum * nights}`;
              })() : bookingData.service.price
            ) : '$0'}
          </button>
        </div>
      </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Payments;