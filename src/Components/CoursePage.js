import React from 'react';
import './CousePage.css'; // Import CSS for styling
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar1 from './Navbar1';

const CoursesPage = () => {
  const courses = [
    { name: 'Python', icon: 'fab fa-python', link: '/python?cid=python' },
    { name: 'Java', icon: 'fab fa-java', link: '/python?cid=java' },
    { name: 'HTML', icon: 'fab fa-html5', link: '/python?cid=html' },
    { name: 'CSS', icon: 'fab fa-css3-alt', link: '/python?cid=css' },
    { name: 'JavaScript', icon: 'fab fa-js-square', link: '/python?cid=javascript' },
    { name: 'Bootstrap', icon: 'fab fa-bootstrap', link: '/python?cid=bootstrap' },
    { name: 'React', icon: 'fab fa-react', link: '/python?cid=react' },
    { name: 'Node.js', icon: 'fab fa-node-js', link: '/python?cid=nodejs' },
    { name: 'MongoDB', icon: 'fas fa-database', link: '/python?cid=mongodb' },
    { name: 'DBMS', icon: 'fas fa-database', link: '/python?cid=dbms' },
    { name: 'DSA', icon: 'fas fa-server', link: '/python?cid=dsa' },
  ];

  return (
    <div>
    <Navbar1/>
    <div className="courses-container">
      
      <h1>Courses</h1>
      <div className="courses-grid">
        {courses.map((course, index) => (
          <div className="course-card" key={index} onClick={() => window.location.href = course.link}>
            <i className={course.icon}></i>
            <h3>{course.name}</h3>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CoursesPage;
