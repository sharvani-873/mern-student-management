import React from 'react';
import college from '../components/assets/college.jpg';
import students from '../components/assets/students.jpg';
import classroom from '../components/assets/classroom.jpg';
import awards from '../components/assets/awards.jpg';
import library from '../components/assets/library.jpg';
import campus from '../components/assets/campus.jpg';

const About = () => {
  const containerStyle = {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '40px',
    color: '#333',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    textAlign: 'center',
    transition: 'transform 0.3s',
  };

  const imgStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  };

  const cardContentStyle = {
    padding: '15px',
  };

  const titleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#ff6600',
  };

  const textStyle = {
    fontSize: '0.95rem',
    color: '#555',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>About Our College</h2>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <img src={college} alt="College" style={imgStyle} />
          <div style={cardContentStyle}>
            <div style={titleStyle}>Our College</div>
            <div style={textStyle}>
              A prestigious institution fostering excellence in academics, innovation, and holistic development for every student.
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <img src={students} alt="Students" style={imgStyle} />
          <div style={cardContentStyle}>
            <div style={titleStyle}>Our Students</div>
            <div style={textStyle}>
              Talented, motivated, and ambitious students who actively participate in academics, sports, and cultural activities.
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <img src={classroom} alt="Classroom" style={imgStyle} />
          <div style={cardContentStyle}>
            <div style={titleStyle}>Modern Classrooms</div>
            <div style={textStyle}>
              State-of-the-art classrooms equipped with smart boards and digital tools for interactive learning experiences.
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <img src={awards} alt="Awards" style={imgStyle} />
          <div style={cardContentStyle}>
            <div style={titleStyle}>Achievements</div>
            <div style={textStyle}>
              Celebrating academic and extracurricular successes — from science fairs to sports tournaments and innovation awards.
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <img src={library} alt="Library" style={imgStyle} />
          <div style={cardContentStyle}>
            <div style={titleStyle}>Digital Library</div>
            <div style={textStyle}>
              A rich repository of books, journals, and online resources to support students’ research and learning.
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <img src={campus} alt="Campus Life" style={imgStyle} />
          <div style={cardContentStyle}>
            <div style={titleStyle}>Vibrant Campus Life</div>
            <div style={textStyle}>
              A lively and inclusive campus offering clubs, events, workshops, and a nurturing environment for growth.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
