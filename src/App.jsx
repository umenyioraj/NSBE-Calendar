import React, {Component, useContext} from 'react';
import Calendar from "./components/Calendar";
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {AuthProvider, AuthContext} from './AuthContext';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import Scholarships from './components/Scholarships';

const PrivateRoute = ({ element }) => {
  const{isAuthenticated} = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/*Protected route */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Calendar />} />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Scholarships" element={<Scholarships />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
