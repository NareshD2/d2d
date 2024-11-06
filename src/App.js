import React, { useState, useEffect } from 'react';
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
import PrivateRoute from './Components/PrivateRoute';
import Cookies from 'js-cookie';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const sessionCookie = Cookies.get('session');
    if (sessionCookie) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('session'); 
    setIsLoggedIn(false); 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/Customerlogin" element={<Customerlogin />} />
        <Route path="/Mentorlogin" element={<Mentorlogin />} />
        <Route path="/Userinterface" element={<Userinterface />} />
        <Route path="/courses"  element={<CoursesPage />} />
        <Route path="/python" element={<Python />} />
        <Route path="/set-goal" element={<GoalSetting />} />
      </Routes>
    </Router>
  );
};

export default App;
