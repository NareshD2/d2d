import React, { useEffect, useState } from 'react';
import Navbar2 from './Navbar2';
import {jwtDecode} from 'jwt-decode';

function UserFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
   // Adjust based on your user authentication setup
   const token = localStorage.getItem('token');
   let userId;
 
   if (token) {
     const decodedToken = jwtDecode(token);
     userId = decodedToken.results && decodedToken.results[0].id; // Extract userId from results array
     console.log("Decoded User ID:", userId); // Log for debugging; // Update 'id' based on your JWT payload structure
   }
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-feedback/${userId}`);
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [userId]);

  return (
    <div>
      <Navbar2/>
      <h2>Your Feedback</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Feedback</th>
            <th>Mentor Name</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.feedback}</td>
              <td>{feedback.mentor_name}</td>
              <td>{new Date(feedback.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserFeedback;
