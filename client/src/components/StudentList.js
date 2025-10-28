// StudentList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = ({ onLogout }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/students', { headers: { Authorization: `Bearer ${token}` } });
      setStudents(res.data);
    } catch {
      toast.error('❌ Failed to fetch students');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/students/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('✅ Student deleted!');
      setStudents(students.filter(s => s._id !== id));
    } catch { toast.error('❌ Error deleting student'); }
  };

  const handleLogoutClick = () => {
    if (onLogout) onLogout();       // clear token & update App state
    toast.success('✅ Logged out successfully'); // show toast
    setTimeout(() => navigate('/login'), 500);  // slight delay so toast appears
  };

  // Filter & Sort
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const aF = a[sortField].toLowerCase();
    const bF = b[sortField].toLowerCase();
    if (aF < bF) return sortOrder === 'asc' ? -1 : 1;
    if (aF > bF) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStudents = sorted.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  return (
    <div className="card">
      <ToastContainer />

      <div className="header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Student Records</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
          <button onClick={() => navigate('/add')} className="add-btn">+ Add Student</button>
          <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
        </div>
      </div>

      <div style={{ margin: '15px 0', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by name, email, course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => { setSortField('name'); setSortOrder(sortOrder==='asc'?'desc':'asc'); }}>Name<br></br><h6>(click here to sort)</h6></th>
            <th>Email</th>
            <th onClick={() => { setSortField('course'); setSortOrder(sortOrder==='asc'?'desc':'asc'); }}>Course</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length > 0 ? currentStudents.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{s.phone}</td>
             <td>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <button onClick={() => navigate(`/edit/${s._id}`)} className="edit-btn">
      Edit
    </button>
    <button onClick={() => handleDelete(s._id)} className="delete-btn">
      Delete
    </button>
  </div>
</td>

            </tr>
          )) : (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No students found</td></tr>
          )}
        </tbody>
      </table>
<center>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`pagination-btn ${currentPage===page?'active':''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}</center>
    </div>
  );
};

export default StudentList;
