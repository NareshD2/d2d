import React, { useState } from 'react';
import './Navbar1.css'
const Navbar1 = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
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
        </div>
      </nav>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>&times;</button>
        <ul>
          <li>
            <a href="/home">
              <i className="fas fa-home"></i> Home
            </a>
          </li>
          <li>
            <a href="/courses">
              <i className="fas fa-book"></i> Courses
            </a>
          </li>
          <li>
            <a href="#assignments">
              <i className="fas fa-tasks"></i> Assignments
            </a>
          </li>
          <li>
            <a href="/set-goal">
              <i className="fas fa-bullseye"></i> Set Goal
            </a>
          </li>
          <li>
            <a href="#activities">
              <i className="fas fa-running"></i> Activities
            </a>
          </li>
          <li>
            <a href="#feedbacks">
              <i className="fas fa-comment"></i> Feedbacks
            </a>
          </li>
          <li>
            <a href="#progress">
              <i className="fas fa-chart-line"></i> Progress
            </a>
          </li>
          <li>
            <a href="#motivational-videos">
              <i className="fas fa-video"></i> Motivational Videos
            </a>
          </li>
          <li>
            <a href="#job-alerts">
              <i className="fas fa-bell"></i> Job Alerts
            </a>
          </li>
          <li>
            <a href="#notifications">
              <i className="fas fa-envelope"></i> Notifications
            </a>
          </li>
        </ul>
      </div>
      
    </div>
  )
}

export default Navbar1
