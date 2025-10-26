import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // asc or desc
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to fetch students');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('✅ Student deleted successfully');
      setStudents(students.filter((student) => student._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('❌ Error deleting student');
    }
  };

  // Filtered students based on search
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort function
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortField) return 0; // no sorting
    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();
    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ToastContainer />
      <h2>Student Record Management</h2>

      {/* Search Box */}
      <div style={{ textAlign: 'center', margin: '15px 0' }}>
        <input
          type="text"
          placeholder="Search by name, email, or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '280px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            outline: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Student Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
              Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Email</th>
            <th onClick={() => handleSort('course')} style={{ cursor: 'pointer' }}>
              Course {sortField === 'course' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <tr key={student._id}>
                <td data-label="Name">{student.name}</td>
                <td data-label="Email">{student.email}</td>
                <td data-label="Course">{student.course}</td>
                <td data-label="Phone">{student.phone}</td>
                <td data-label="Actions">
                  <Link to={`/edit/${student._id}`} className="edit">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(student._id)} className="delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                margin: '0 5px',
                padding: '5px 10px',
                borderRadius: '5px',
                border: currentPage === page ? '2px solid #007bff' : '1px solid #ccc',
                backgroundColor: currentPage === page ? '#007bff' : '#fff',
                color: currentPage === page ? '#fff' : '#000',
                cursor: 'pointer'
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
