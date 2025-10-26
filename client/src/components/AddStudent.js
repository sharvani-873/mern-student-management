import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: '',
    phone: ''
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const token = localStorage.getItem('token');
await axios.post('/api/students', student, {
  headers: { Authorization: `Bearer ${token}` }
});

      alert('Student added successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error adding student.');
    }
  };

  return (
    <div>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <label>Course</label>
        <input
          type="text"
          name="course"
          value={student.course}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={student.phone}
          onChange={handleChange}
          required
        />

        <button type="submit" className="edit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
