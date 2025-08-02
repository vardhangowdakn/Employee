import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/emp/employee/${id}`);
      setName(res.data.name);
      setEmail(res.data.email);
      setPhone(res.data.phone);
      setDepartment(res.data.department);
    } catch (err) {
      setError('Failed to fetch employee.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !department) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      await axios.put(`http://localhost:8080/api/emp/employee/${id}`, {
        name,
        email,
        phone,
        department,
      });
      navigate('/');
    } catch (err) {
      setError('Failed to update employee. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Edit Employee</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="card p-4 shadow border-0" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter employee name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter employee email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            className="form-control"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            className="form-control"
            value={department}
            onChange={e => setDepartment(e.target.value)}
            placeholder="Enter department"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee; 