import React, { useState, useEffect } from 'react';

const ProgressTracking = () => {
  const [progress, setProgress] = useState(0);
  const [goal, setGoal] = useState('');

  useEffect(() => {
    // API call to fetch goal and progress
    console.log('Fetching goal and progress...');
  }, []);

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to update progress
    console.log('Progress updated:', progress, goal);
  };

  return (
    <div>
      <h2>Track Your Progress</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Goal:
          <input type="text" value={goal} readOnly />
        </label>
        <br />
        <label>
          Progress:
          <input type="number" value={progress} onChange={handleProgressChange} />
        </label>
        <br />
        <button type="submit">Update Progress</button>
      </form>
    </div>
  );
};
export default ProgressTracking;