import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg bg-primary px-4">
    <Link className="navbar-brand text-white fw-bold" to="/">
      Employee Management System
    </Link>
    <div className="ms-auto d-flex gap-3">
      <Link className="btn text-white fw-semibold px-0" to="/">
        Employees
      </Link>
      <Link className="btn text-white fw-semibold px-0" to="/add-employee">
        Post Employee
      </Link>
    </div>
  </nav>
);

export default Header;
