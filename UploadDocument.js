import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleFileUpload = async () => {
    if (!file) return setMessage('Please select a file first.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setMessage(`Uploaded successfully: ${res.data.filePath}`);
    } catch (err) {
      setMessage('Upload failed. Try again.');
      console.error(err);
    }
  };

  return (
    <motion.div
      className="container text-light py-5"
      style={{ backgroundColor: '#111', minHeight: '100vh' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="mb-4 text-warning">Upload Your Document</h2>

      <input type="file" className="form-control mb-3" onChange={handleFileChange} />

      {preview && (
        <div className="mb-3">
          <p className="text-muted">Preview:</p>
          <img src={preview} alt="preview" className="img-fluid" style={{ maxHeight: '200px' }} />
        </div>
      )}

      <motion.button
        className="btn btn-outline-warning"
        whileHover={{ scale: 1.1 }}
        onClick={handleFileUpload}
      >
        Upload
      </motion.button>

      {message && <p className="mt-3">{message}</p>}
    </motion.div>
  );
};

export default UploadDocument;
