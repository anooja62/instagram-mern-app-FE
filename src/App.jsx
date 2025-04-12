import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import DashboardScreen from './pages/Dashboard';

const App = () => {
  return (
    <Routes>
      {/* Route for Login Screen */}
      <Route path="/" element={<LoginScreen />} />
      
      {/* Route for Dashboard Screen (only accessible after login) */}
      <Route path="/dashboard" element={<DashboardScreen />} />
    </Routes>
  );
};

export default App;
