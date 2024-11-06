// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/Customerlogin" />;
};

export default PrivateRoute;
