import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import './App.css';  // <- this imports the CSS


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Student List</Link> | 
          <Link to="/add">Add Student</Link>
        </nav>

        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
