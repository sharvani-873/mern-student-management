import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [student, setStudent] = useState({ name: '', email: '', course: '', phone: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/students', student, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('✅ Student added!');
      navigate('/students');
    } catch {
      toast.error('❌ Failed to add student');
    }
  };

  return (
    <div className="card">
      <ToastContainer />
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={student.course}
          onChange={(e) => setStudent({ ...student, course: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={student.phone}
          onChange={(e) => setStudent({ ...student, phone: e.target.value })}
          required
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button type="submit" className="submit-btn">Add Student</button>
          {/* Back to Student List Button */}
          <button type="button" className="back-btn" onClick={() => navigate('/')}>
            ← Back to Student List
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
