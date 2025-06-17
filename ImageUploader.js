import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setMessage('Image uploaded successfully!');
    } catch (error) {
      setMessage('Upload failed.');
    }
  };

  return (
    <motion.div 
      className="mt-5 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h5 className="text-warning mb-3">Upload Your Profile Picture</h5>
      <input type="file" onChange={handleImageChange} className="form-control mb-3" />
      {preview && <img src={preview} alt="preview" className="img-thumbnail mb-3" style={{ maxWidth: '200px' }} />}
      <button className="btn btn-outline-success" onClick={handleUpload}>Upload</button>
      {message && <p className="mt-2 text-info">{message}</p>}
    </motion.div>
  );
};

export default ImageUploader;
