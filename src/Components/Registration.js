import React, { useState } from 'react';
import './Registration.css'; // Import custom CSS
import Navbar from './Navbar';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'; // Import FontAwesome icons

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility
  const [popupType, setPopupType] = useState(''); // State to manage popup type (success or error)
  const [popupMessage, setPopupMessage] = useState(''); // Message for the popup

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !phone || !password) {
      setErrorMessage('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();
      
      if (response.status === 201) {
        setPopupType('success'); // Set popup type to success
        setPopupMessage('Registration Successful!');
        setIsPopupVisible(true); // Show the success popup
        setErrorMessage('');
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
      } else if (response.status === 409) { // Assuming 409 for "User already exists"
        setPopupType('error'); // Set popup type to error
        setPopupMessage('User already exists');
        setIsPopupVisible(true); // Show the error popup
        setErrorMessage('');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setPopupType('error'); // Set popup type to error
      setPopupMessage('An error occurred: ' + error.message);
      setIsPopupVisible(true); // Show the error popup
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Hide the popup when close button is clicked
  };

  return (
    <div>
      <Navbar/>

      <div className="register-form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <button type="submit" className="btn btn-primary register-btn">
            Register
          </button>
          {errorMessage && <p className="error-text">{errorMessage}</p>}
        </form>
      </div>

      {/* Success/Error Popup */}
      {isPopupVisible && (
        <div className={`popup ${popupType === 'success' ? 'popup-success' : 'popup-error'}`}>
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>&times;</span>
            <div className="popup-icon">
              {popupType === 'success' ? (
                <FaCheckCircle size={50} color="green" />
              ) : (
                <FaExclamationCircle size={50} color="red" />
              )}
            </div>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
