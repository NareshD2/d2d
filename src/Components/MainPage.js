import React from 'react';
import './MainPage.css';
import Navbar from './Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom'; 

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="login-container">
          <div className="card bg-admin login-card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-user-tie fa-3x" style={{ color: '#337ab7' }} /> 
              </h5>
              <p className="card-text">Admin Login</p>
              <Link to="/Adminlogin">
                <button className='btn btn-primary btn-admin'>Login</button>
              </Link>
            </div>
          </div>

          <div className="card bg-customer login-card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-user fa-3x" style={{ color: '#8bc34a' }} /> 
              </h5>
              <p className="card-text">Customer Login</p>
              <Link to="/Customerlogin">
                <button className='btn btn-primary btn-customer'>Login</button>
              </Link>
            </div>
          </div>

          <div className="card bg-mentor login-card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-chalkboard-teacher fa-3x" style={{ color: '#e67e73' }} /> 
              </h5>
              <p className="card-text">Mentor</p>
              <Link to="/Mentorlogin">
                <button className='btn btn-primary btn-mentor'>Login</button>
              </Link>
            </div>
          </div>

          <div className="card bg-register login-card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-user-plus" style={{ color: '#2ecc71' }} /> Register
              </h5>
              <p className="card-text">Don't have an account? Register now </p>
                            <Link to="/register">
                <button className='btn btn-primary btn-register'>Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
