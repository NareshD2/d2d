import React, { useState } from 'react';
import './AdminLogin.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Customerlogin = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/Customerlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setIsLoggedIn(true);
        setErrorMessage('');
        navigate('/Userinterface'); // Redirect to user interface on successful login
      } else {
        setErrorMessage(data.message);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div>
      {/* Navbar stays fixed */}
      <Navbar />

      {/* Sliding form */}
      {showLoginForm && (
        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Customer Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary login-btn">Submit</button>
            {errorMessage && <p className="error-text">{errorMessage}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Customerlogin;
