import React, { useState, useEffect } from 'react';
import './Navbar1.css';
import {jwtDecode} from 'jwt-decode';

const Navbar1 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getUserInfoFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.results && decodedToken.results[0].name;
    }
    return null;
  };

  useEffect(() => {
    const name = getUserInfoFromToken();
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-navbar">
        <button className="hamburger" onClick={toggleSidebar}>
          &#9776; {/* Hamburger Icon */}
        </button>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="fas fa-road" />
            <span className="title">Drive to Destiny</span>
          </a>
          <div className="user-info">
            {userName && (
              <div className="user-profile">
                <i className="fas fa-user-circle user-icon" />
                <span className="user-name">{userName}</span>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>&times;</button>
        <ul>
          <li><a href="/Mentorinterface"><i className="fas fa-home"></i> Home</a></li>
          <li><a href="/courses"><i className="fas fa-book"></i> Courses</a></li>
          <li><a href="/assignments"><i className="fas fa-tasks"></i> Assignments</a></li>
          <li><a href="/activities"><i className="fas fa-running"></i> Activities</a></li>
          <li><a href="/MentorFeedBack"><i className="fas fa-comment"></i> Feedbacks</a></li>
          <li><a href="/trackprogress"><i className="fas fa-chart-line"></i> Track Progress</a></li>
          <li><a href="/motivational-videos"><i className="fas fa-video"></i> Motivational Videos</a></li>
          <li><a href="/MentorPosts"><i className="fas fa-bell"></i> Job Alerts</a></li>
          <li><a href="/notifications"><i className="fas fa-envelope"></i> Notifications</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar1;
