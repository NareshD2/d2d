import React, { useEffect, useState } from 'react';
import './Userinterface.css';
import Navbar2 from './Navbar2';
 // Ensure the file name is correct
import '@fortawesome/fontawesome-free/css/all.min.css';
import {jwtDecode} from 'jwt-decode'; // Use default import for jwt-decode
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Mentorinterface = () => {
  const courseProgress = 85;
  const labProgress = 10;
  const assignmentProgress = 60;

  const [goals, setGoals] = useState([]); // State to store fetched goals
  const [courses, setCourses] = useState([]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.results && decodedToken.results[0].id;
    }
    return null;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = getUserIdFromToken();
        if (userId) {
          const response = await fetch(`http://localhost:5000/courses1/${userId}`);
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch goals from the backend
  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      fetch(`http://localhost:5000/api/goals/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setGoals(data.goals || []); // Handle response structure
        })
        .catch((error) => console.error("Error fetching goals:", error));
    }
  }, []);

  return (
    <div className="progress-page1">
      <Navbar2 />
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

      <div className="courses-container">
        <h1>Courses</h1>
        <div className="courses-grid">
          {courses.map((course) => (
            <div className="course-card" key={course.cid} onClick={() => window.location.href = course.link}>
              <i className={course.icon}></i>
              <h3>{course.course_name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentorinterface;
