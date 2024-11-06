import React, { useEffect, useState } from 'react';
import './Userinterface.css';
import Navbar1 from './Navbar1';
import {jwtDecode} from 'jwt-decode';  // Fix the import if needed
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Userinterface = () => {
  const courseProgress = 85;
  const labProgress = 10;
  const assignmentProgress = 60;

  const [goals, setGoals] = useState([]); // State to store fetched goals

  // Fetch goals from the backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    let userId;

    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.results && decodedToken.results[0].id; // Adjust based on your JWT structure

      // Fetch goals if userId is available
      if (userId) {
        fetch(`http://localhost:5000/api/goals/${userId}`) // Replace with your API URL
          .then(response => response.json())
          .then(data => {
            setGoals(data.goals); // Assuming the response has a goals array
          })
          .catch(error => console.error("Error fetching goals:", error));
      }
    }
  }, []);

  return (
    <div className="progress-page1">
      <Navbar1 />
      <div className="progress-container-row">
        <div className="progress-item">
          <h2>Courses</h2>
          <CircularProgressbar 
            value={courseProgress} 
            text={`${courseProgress}%`} 
            styles={buildStyles({
              pathColor: 'green',
              textColor: 'green',
            })}
          />
          <div className="ui-labels">progress</div>
        </div>

        <div className="progress-item">
          <h2>Labs</h2>
          <CircularProgressbar 
            value={labProgress} 
            text={`${labProgress}%`} 
            styles={buildStyles({
              pathColor: 'green',
              textColor: 'green',
            })}
          />
          <div className="ui-labels">progress</div>
        </div>

        <div className="progress-item">
          <h2>Assignments</h2>
          <CircularProgressbar 
            value={assignmentProgress} 
            text={`${assignmentProgress}%`} 
            styles={buildStyles({
              pathColor: 'green',
              textColor: 'green',
            })}
          />
          <div className="ui-labels">progress</div>
        </div>
      </div>

      {/* New Registered Goals Container */}
      <div className="registered-goals-container">
        <h2>Registered Goals</h2>
        {goals.length > 0 ? (
          goals.map((goal, index) => (
            <div key={index} className="goal-item">
              
              <span className="goal-title">{goal.goal_name}</span>
            </div>
          ))
        ) : (
          <p>No registered goals found.</p>
        )}
      </div>
    </div>
  );
};

export default Userinterface;
