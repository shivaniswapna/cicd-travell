import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSignupPopup.css';

const LoginSignupPopup = ({ onClose, onLogin, initialMode = 'login' }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (mode === 'login') {
      // Simulate login with validation
      const storedEmail = localStorage.getItem('userEmail');
      if (!storedEmail || email.toLowerCase().trim() !== storedEmail.toLowerCase().trim()) {
        setMessage('Invalid credentials. Please sign up first or check your email.');
        return;
      }
      localStorage.setItem('token', 'dummy-token');
      setMessage('Login successful!');
      setTimeout(() => {
        onLogin();
        onClose();
        navigate('/');
      }, 1000);
    } else if (mode === 'signup') {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match!');
        return;
      }
      // Simulate signup
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('memberSince', new Date().toLocaleDateString());
      setMessage('Account created successfully!');
      setTimeout(() => {
        onLogin();
        onClose();
        navigate('/');
      }, 1000);
    } else if (mode === 'forgot') {
      // Simulate password reset
      setMessage('Password reset link sent to your email!');
      setTimeout(() => {
        setMode('login');
        setMessage('');
      }, 2000);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setResetEmail('');
    setMessage('');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetForm();
  };

  return (
    <div className={`modal-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`modal-content ${isClosing ? 'closing' : ''}`}>
        <button className="close-btn" onClick={handleClose}>×</button>

        {mode === 'login' && (
          <>
            <h2>Welcome Back</h2>
            <p className="modal-subtitle">Sign in to your TravelEase account</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="form-options">
                <button
                  type="button"
                  className="forgot-btn"
                  onClick={() => switchMode('forgot')}
                >
                  Forgot Password?
                </button>
              </div>
              <button type="submit" className="submit-btn">
                Sign In
              </button>
            </form>
            <p className="switch-text">
              Don't have an account?
              <button className="switch-btn" onClick={() => switchMode('signup')}>
                Sign Up
              </button>
            </p>
          </>
        )}

        {mode === 'signup' && (
          <>
            <h2>Create Account</h2>
            <p className="modal-subtitle">Join TravelEase for amazing travel experiences</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">
                Create Account
              </button>
            </form>
            <p className="switch-text">
              Already have an account?
              <button className="switch-btn" onClick={() => switchMode('login')}>
                Sign In
              </button>
            </p>
          </>
        )}

        {mode === 'forgot' && (
          <>
            <h2>Reset Password</h2>
            <p className="modal-subtitle">Enter your email to receive reset instructions</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">
                Send Reset Link
              </button>
            </form>
            <p className="switch-text">
              Remember your password?
              <button className="switch-btn" onClick={() => switchMode('login')}>
                Back to Sign In
              </button>
            </p>
          </>
        )}

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default LoginSignupPopup;