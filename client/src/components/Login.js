import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('✅ Login successful!');
      if (onLogin) onLogin();
      navigate('/students');
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <ToastContainer />
      <h2>🔐 Admin Login</h2>
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
        <button type="submit">{loading ? 'Logging in...' : 'Login'}</button>
      </form>
     <center> <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p></center>
    </div>
  );
};

export default Login;

