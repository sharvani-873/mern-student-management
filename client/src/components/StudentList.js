import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Fetch all students from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching students.');
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`/api/students/${id}`);
        setStudents(students.filter(s => s._id !== id));
        alert('Student deleted successfully!');
      } catch (err) {
        console.error(err);
        alert('Error deleting student.');
      }
    }
  };

  // Filter students based on search
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase()) ||
    s.phone.includes(search)
  );

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortField) return 0;
    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();
    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <h2>Student List</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Sorting */}
      <div style={{ margin: '10px 0' }}>
        <label>Sort by: </label>
        <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="course">Course</option>
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Student Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(s => (
            <tr key={s._id}>
              <td data-label="Name">{s.name}</td>
              <td data-label="Email">{s.email}</td>
              <td data-label="Course">{s.course}</td>
              <td data-label="Phone">{s.phone}</td>
              <td data-label="Actions">
                <Link to={`/edit/${s._id}`} className="edit">Edit</Link> 
                <button onClick={() => handleDelete(s._id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className="pagination" style={{ marginTop: '10px', textAlign: 'center' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
