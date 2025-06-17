import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ChatBox from './components/ChatBox';
import UploadDocument from './components/UploadDocument';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/upload" element={<UploadDocument />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
