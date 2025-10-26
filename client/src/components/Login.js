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
      
      // Update App state
      if (onLogin) onLogin();

      // Redirect to student list
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <ToastContainer />
      <h2>🔐 Admin Login</h2>
      <form onSubmit={handleSubmit} style={{ margin: '20px auto', width: '300px' }}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '10px' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
