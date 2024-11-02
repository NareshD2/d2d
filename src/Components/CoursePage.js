import React, { useEffect, useState } from 'react';
import './CousePage.css'; // Import CSS for styling
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar1 from './Navbar1';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Navbar1 />
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

export default CoursesPage;
