import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {!isLoggedIn && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={!isLoggedIn ? <Home /> : <Navigate to="/students" />} />
        <Route path="/about" element={!isLoggedIn ? <About /> : <Navigate to="/students" />} />
        <Route path="/contact" element={!isLoggedIn ? <Contact /> : <Navigate to="/students" />} />
        <Route path="/login" element={!isLoggedIn ? <Login onLogin={() => setIsLoggedIn(true)} /> : <Navigate to="/students" />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/students" />} />

        {/* Protected routes with onLogout */}
        <Route path="/students" element={isLoggedIn ? <StudentList onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/add" element={isLoggedIn ? <AddStudent onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={isLoggedIn ? <EditStudent onLogout={handleLogout} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
