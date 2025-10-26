import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          {isLoggedIn ? (
            <>
              <Link to="/">Student List</Link> |{' '}
              <Link to="/add">Add Student</Link> |{' '}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> |{' '}
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        {/* Toast container */}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Routes */}
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register onRegister={() => setIsLoggedIn(true)} />
              )
            }
          />
          <Route
            path="/"
            element={isLoggedIn ? <StudentList /> : <Navigate to="/login" />}
          />
          <Route
            path="/add"
            element={isLoggedIn ? <AddStudent /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={isLoggedIn ? <EditStudent /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
