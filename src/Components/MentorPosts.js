import React, { useState } from 'react';
import './MentorPosts.css';
import Navbar2 from './Navbar2';

function MentorPosts() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyLink, setCompanyLink] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // New state for popup visibility

  const handlePostJob = async () => {
    if (!title || !description) {
      setMessage("Title and description are required.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/MentorPosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, companyLink }),
      });

      if (response.ok) {
        setMessage("Job alert posted successfully.");
        setShowPopup(true); // Show popup on success
        setTitle('');
        setDescription('');
        setCompanyLink('');
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      } else {
        setMessage("Error posting job alert.");
      }
    } catch (error) {
      console.error("Error posting job alert:", error);
      setMessage("Error posting job alert.");
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar2 />
      <h2>Post a Job Alert</h2>
      <div className="form-group">
        <label>Job Title</label>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Job Description</label>
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Company Website (optional)</label>
        <input
          type="url"
          placeholder="https://example.com"
          value={companyLink}
          onChange={(e) => setCompanyLink(e.target.value)}
        />
      </div>
      <button className="post-button" onClick={handlePostJob}>Post Job Alert</button>
      {message && <p className="message">{message}</p>}

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="checkmark">✔️</span>
            <p>Job alert posted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MentorPosts;
