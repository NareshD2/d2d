import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      let response = await fetch('http://localhost:5000/api/Customerlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' 
      });

      response = await response.json();
      console.warn(response);

      if (response.auth) {
        
        localStorage.setItem('results',JSON.stringify(response.results));
        localStorage.setItem('token',JSON.stringify(response.auth));
       
       setErrorMessage(''); 
        navigate('/Userinterface');
      } else {
        
        alert("enter correct details");
        setErrorMessage("enter correct details");
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <Navbar />
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
    </div>
  );
};

export default CustomerLogin;
