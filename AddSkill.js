import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddSkill = () => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    skillName: '',
    description: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/skills', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess('Skill added successfully!');
      setFormData({ skillName: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add skill');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2>Add a Skill</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="skillName">
          <Form.Label>Skill Name</Form.Label>
          <Form.Control
            type="text"
            name="skillName"
            value={formData.skillName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Add Skill</Button>
      </Form>
    </Container>
  );
};

export default AddSkill;
