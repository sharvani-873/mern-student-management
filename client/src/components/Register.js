import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      toast.success('✅ Registration successful! Please login.');
      navigate('/login'); // redirect to login page
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <ToastContainer />
      <h2>📝 Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          style={{ padding: '10px', marginBottom: '10px', width: '200px' }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={{ padding: '10px', marginBottom: '10px', width: '200px' }}
        />
        <br />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
