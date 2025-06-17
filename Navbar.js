import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4 py-3 shadow-sm">
      <Link className="navbar-brand fw-bold text-warning" to="/">
        SkillSwap
      </Link>

      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/upload">Upload</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/chat">Chat</Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="btn btn-outline-warning ms-auto">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
