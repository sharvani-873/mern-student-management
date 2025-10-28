import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/auth/register', form);
      toast.success('✅ Registration successful!');
      setTimeout(() => navigate('/login'), 2000); // ⏳ Wait 2s so toast is visible
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2>📝 Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{loading ? 'Registering...' : 'Register'}</button>
      </form>

      <center>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </center>
    </div>
  );
};

export default Register;
