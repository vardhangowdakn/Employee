import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/emp/employee');
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching employees. Please try again later.');
      setEmployees([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/emp/employee/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (err) {
      setError('Failed to delete employee.');
    }
  };

  const totalEmployees = employees.length;
  // Fix: count unique, non-empty departments, case-insensitive
  const departments = [
    ...new Set(
      employees
        .map(employee => (employee.department || '').trim().toLowerCase())
        .filter(dep => dep)
    )
  ];
  const recentEmployees = employees.slice(-3).reverse();

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Dashboard</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5 className="card-title text-secondary">Total Employees</h5>
              <h2 className="text-primary fw-bold">{totalEmployees}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5 className="card-title text-secondary">Departments</h5>
              <h2 className="text-success fw-bold">{departments.length}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0 fw-semibold">All Employees</h5>
        </div>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.department && employee.department.charAt(0).toUpperCase() + employee.department.slice(1).toLowerCase()}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/edit-employee/${employee.id}`)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(employee.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card shadow border-0">
        <div className="card-header bg-white">
          <h5 className="mb-0 fw-semibold">Recently Added Employees</h5>
        </div>
        <ul className="list-group list-group-flush">
          {recentEmployees.length > 0 ? (
            recentEmployees.map(employee => (
              <li
                key={employee.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{employee.name}</span>
                <span className="badge bg-info text-dark rounded-pill">
                  {employee.department && employee.department.charAt(0).toUpperCase() + employee.department.slice(1).toLowerCase()}
                </span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center text-muted">No employees found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
