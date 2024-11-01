import React, { useState } from 'react';
import './Userinterface.css'; // Import CSS
import Navbar1 from './Navbar1';

const Userinterface = () => {
  

  return (
    <div className="app">
      <Navbar1/>
     <main className="main-content">
        <h2>Welcome to Drive to Destiny</h2>
        <p>This is your platform for goal setting and personal development.</p>
      </main>
    </div>
  );
};

export default Userinterface;