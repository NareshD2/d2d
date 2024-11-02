import React from 'react';
import './Userinterface.css';
import Navbar1 from './Navbar1';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Userinterface = () => {
  const courseProgress = 85; // Representing progress for Java as in example
  const labProgress = 10; // Representing progress for HTML as in example
  const assignmentProgress = 60;

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
              pathColor: 'green',  // Set the progress color to green
              textColor: 'green',  // Set the text color to green
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
    </div>
  );
};

export default Userinterface;
