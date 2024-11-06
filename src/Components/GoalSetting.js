import React, { useState, useEffect } from 'react';
import Navbar1 from './Navbar1';
import {jwtDecode} from 'jwt-decode';
import './GoalSetting.css';

const GoalSetting = () => {
  const [goal, setGoal] = useState('');
  const [gid, setGid] = useState('');
  const [objective, setObjective] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [goalOptions, setGoalOptions] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Retrieve and decode token to get userId
  const token = localStorage.getItem('token');
  let userId;

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.results && decodedToken.results[0].id; // Extract userId from results array
    console.log("Decoded User ID:", userId); // Log for debugging; // Update 'id' based on your JWT payload structure
  }

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/set-goal');
        const data = await response.json();
        setGoalOptions(data);
      } catch (error) {
        setError('Failed to fetch goals');
      }
    };

    fetchGoals();
    
    // Example: Set default values for objective and targetDate, if required
    setObjective('Initial Objective'); // replace with your desired initial value
    setTargetDate(new Date().toISOString().split('T')[0]); // default to today's date in YYYY-MM-DD format
  }, []);

  const handleGoalChange = (e) => {
    const selectedGoalId = e.target.value;
    const selectedGoal = goalOptions.find(goal => goal.id === selectedGoalId);

    setGid(selectedGoalId);
    setGoal(selectedGoal ? selectedGoal.goalName : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gid || !objective.trim() || !targetDate) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/set-goal', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          userId, // Include the extracted userId
          gid,
          targetDate,
          objective,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setGid('');
        setGoal('');
        setObjective('');
        setTargetDate('');
        setSuccessMessage('Goal created successfully!');
      } else {
        setError(data.message || 'Failed to create goal');
      }
    } catch (error) {
      setError('Server error');
    }
  };

  return (
    <div className="goal-setting-container">
      <Navbar1 />
      <h2>Set Your Goal</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="goal-form">
        <label>
          Goal:
          <select value={gid} onChange={handleGoalChange}>
            <option value="">Select a goal</option>
            {goalOptions.map((goalOption) => (
              <option key={goalOption.id} value={goalOption.id}>
                {goalOption.goalName}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Objective:
          <input
            type="text"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
        </label>
        <br />
        <label>
          Target Date:
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
};

export default GoalSetting;
