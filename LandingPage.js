import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="display-1 fw-bold mb-4">
          <motion.span
            style={{ color: '#ffc107' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            S
          </motion.span>
          killSwap
        </h1>

        <motion.p
          className="lead mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Connect. Share. Learn. <br /> Your skills, your way.
        </motion.p>

        <motion.div
          className="d-flex justify-content-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Link to="/register" className="btn btn-warning btn-lg px-5 shadow">
            Register
          </Link>
          <Link to="/login" className="btn btn-outline-light btn-lg px-5 shadow">
            Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
