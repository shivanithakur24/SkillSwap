import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [description, setDescription] = useState('');
  const [editingSkill, setEditingSkill] = useState(null);
  const [updatedSkill, setUpdatedSkill] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const fetchSkills = async () => {
    const res = await axios.get('http://localhost:5000/api/skills');
    setSkills(res.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async () => {
    if (!newSkill || !description) return;
    await axios.post('http://localhost:5000/api/skills', {
      name: newSkill,
      description,
    });
    setNewSkill('');
    setDescription('');
    fetchSkills();
  };

  const handleDeleteSkill = async (id) => {
    await axios.delete(`http://localhost:5000/api/skills/${id}`);
    fetchSkills();
  };

  const handleUpdateSkill = async () => {
    await axios.put(`http://localhost:5000/api/skills/${editingSkill._id}`, {
      name: updatedSkill,
      description: updatedDescription,
    });
    setEditingSkill(null);
    setUpdatedSkill('');
    setUpdatedDescription('');
    fetchSkills();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <motion.div
      className="container-fluid d-flex flex-column justify-content-center align-items-center text-light"
      style={{ background: '#0d0d0d', minHeight: '100vh', padding: '40px 20px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header + Navigation */}
      <motion.div
        className="w-100 d-flex flex-column align-items-center mb-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="fw-bold text-light">
          <span style={{ color: '#FFD700' }}>Skill</span>Swap
        </h2>

        <div className="nav justify-content-center mt-3 gap-4">
          <motion.a
            href="/dashboard"
            className="nav-link text-warning"
            whileHover={{ scale: 1.1, color: '#fff' }}
          >
            Dashboard
          </motion.a>
          <motion.a
            href="/upload"
            className="nav-link text-warning"
            whileHover={{ scale: 1.1, color: '#fff' }}
          >
            Upload
          </motion.a>
          <motion.a
            href="/chat"
            className="nav-link text-warning"
            whileHover={{ scale: 1.1, color: '#fff' }}
          >
            Chat
          </motion.a>
        </div>
      </motion.div>

      {/* Logout */}
      <button className="btn btn-outline-danger position-absolute top-0 end-0 m-3" onClick={handleLogout}>
        Logout
      </button>

      {/* Add Skill Form */}
      <div className="w-100 mb-5" style={{ maxWidth: '800px' }}>
        <div className="row g-3 mb-3">
          <div className="col-md-5">
            <label className="form-label text-warning">Add Skill</label>
            <input
              className="form-control bg-dark text-white"
              placeholder="Skill name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <label className="form-label text-warning">Add Description</label>
            <input
              className="form-control bg-dark text-white"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <motion.button
              className="btn btn-outline-warning w-100"
              whileHover={{ scale: 1.1 }}
              onClick={handleAddSkill}
            >
              Add
            </motion.button>
          </div>
        </div>
      </div>

      {/* Skill Cards */}
      <div className="row row-cols-1 row-cols-md-2 g-4 w-100" style={{ maxWidth: '900px' }}>
        {skills.map((skill) => (
          <motion.div
            key={skill._id}
            className="col"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card bg-dark text-white h-100 border-secondary">
              <div className="card-body">
                {editingSkill && editingSkill._id === skill._id ? (
                  <>
                    <input
                      className="form-control bg-secondary text-white mb-2"
                      value={updatedSkill}
                      onChange={(e) => setUpdatedSkill(e.target.value)}
                    />
                    <textarea
                      className="form-control bg-secondary text-white mb-3"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                    <button className="btn btn-success btn-sm me-2" onClick={handleUpdateSkill}>
                      Save
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingSkill(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title text-warning">{skill.name}</h5>
                    <p className="card-text">{skill.description}</p>
                    <button
                      className="btn btn-outline-light btn-sm me-2"
                      onClick={() => {
                        setEditingSkill(skill);
                        setUpdatedSkill(skill.name);
                        setUpdatedDescription(skill.description);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteSkill(skill._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
