import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: '',
    phone: ''
  });

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(res.data);
    } catch (err) {
      console.error(err);
      alert('❌ Error fetching student details.');
    }
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/students/${id}`, student, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Student updated successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('❌ Error updating student.');
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
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

        <button type="submit" className="edit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
