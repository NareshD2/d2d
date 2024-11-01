import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar bg-navbar">
      <a className="navbar-brand" href="#">
        <i className="fas fa-road"></i>
        <span className="title">Drive to Destiny</span>
      </a>
    </nav>
  );
};

export default Navbar;
