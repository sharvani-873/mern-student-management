import React from 'react';

const Home = () => {
  const containerStyle = {
    height: '100vh',
    width: '100%',
    backgroundImage: `url('/images/college-background.jpg')`, // ✅ image from public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    overflowY: 'auto',
  };

  const overlayStyle = {
    
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px 20px',
  };

  const contentStyle = {
    textAlign: 'center',
    maxWidth: '700px',
  };

  const headingStyle = {
    fontSize: '3rem',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    marginBottom: '30px',
  };

  const buttonStyle = {
    padding: '12px 25px',
    backgroundColor: '#ff6600',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '15px 0',
    backgroundColor: 'rgba(0,0,0,0.7)',
    fontSize: '0.9rem',
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <div style={contentStyle}>
          <h1 style={headingStyle}>Welcome to ABC College</h1>
          <p style={paragraphStyle}>
            Empowering students with knowledge and skills for a bright future.
          </p>
          <a href="/register" style={buttonStyle}>
            Get Started
          </a>
        </div>
      </div>
      <footer style={footerStyle}>
        © 2025 ABC College. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
