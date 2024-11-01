import React, { useState, useEffect } from 'react';
import Navbar1 from './Navbar1';

import './GoalSetting.css';

const GoalSetting = () => {
  const [goal, setGoal] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [newObjective, setNewObjective] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [goalOptions, setGoalOptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/set-goal'); // Update the endpoint as needed
        const data = await response.json();
        setGoalOptions(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
        setError('Failed to fetch goals');
      }
    };

    fetchGoals();
  }, []);

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleNewObjectiveChange = (e) => {
    setNewObjective(e.target.value);
  };

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, newObjective]);
      setNewObjective('');
    }
  };

  const handleTargetDateChange = (e) => {
    setTargetDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal || !objectives.length || !targetDate) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    // API call to create goal
    console.log('Goal created:', goal, objectives, targetDate);
    setGoal('');
    setObjectives([]);
    setTargetDate('');
  };

  return (
    <div className="goal-setting-container">
      <Navbar1 />
      <h2>Set Your Goal</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="goal-form">
        <label>
          Goal:
          <select value={goal} onChange={handleGoalChange}>
            <option value="">Select a goal</option>
            {goalOptions.map((goalOption) => (
              <option key={goalOption.id} value={goalOption.goalName}>
                {goalOption.goalName}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Objectives:
          <input
            type="text"
            value={newObjective}
            onChange={handleNewObjectiveChange}
          />
          <button type="button" onClick={handleAddObjective}>
            Add Objective
          </button>
        </label>
        <ul>
          {objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
        <br />
        <label>
          Target Date:
          <input
            type="date"
            value={targetDate}
            onChange={handleTargetDateChange}
          />
        </label>
        <br />
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
};

export default GoalSetting;
