import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin';
import MainPage from './Components/MainPage';
import Registration from './Components/Registration';
import Customerlogin from './Components/Customerlogin';
import Mentorlogin from './Components/Mentorlogin';
import Userinterface from './Components/Userinterface';
import CoursesPage from './Components/CoursePage';
import Python from './Components/CourseTables/python';
import GoalSetting from './Components/GoalSetting';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/Customerlogin" element={<Customerlogin/>} />
      <Route path="/Userinterface" element={<Userinterface/>} />
      <Route path="/courses" element={<CoursesPage/>}/>
      <Route path="/Mentorlogin" element={<Mentorlogin />} />
      <Route path="/python" element={<Python/>}/>
      {<Route path="/set-goal" element={<GoalSetting/>}/> }
      
      
    </Routes>
  </Router>
  );
};

export default App;