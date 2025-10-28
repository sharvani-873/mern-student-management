import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#004080', color: 'white' }}>
      {/* Logo and College Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/images/logo.png" alt="Logo" style={{ width: '50px', height: '50px' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>ABC COLLEGE</span>
      </div>

      {/* Navigation Links */}
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
        <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link></li>
        <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link></li>
        <li><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></li>
        <li><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
