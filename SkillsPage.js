import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [error, setError] = useState("");

  const fetchSkills = async (filters = {}) => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.minRating) params.minRating = filters.minRating;
      if (filters.maxRating) params.maxRating = filters.maxRating;

      const { data } = await axios.get("/api/skills", { params });
      setSkills(data);
    } catch (err) {
      setError("Failed to load skills.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSkills({ search, minRating, maxRating });
  };

  return (
    <div className="container mt-4">
      <h2>Skills</h2>

      <Form onSubmit={handleSearchSubmit} className="mb-4">
        <Row className="align-items-end">
          <Col md={5}>
            <Form.Group controlId="search">
              <Form.Label>Search Skills</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter skill name or description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="minRating">
              <Form.Label>Min Rating</Form.Label>
              <Form.Select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="maxRating">
              <Form.Label>Max Rating</Form.Label>
              <Form.Select
                value={maxRating}
                onChange={(e) => setMaxRating(e.target.value)}
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={1}>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <p className="text-danger">{error}</p>}

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : skills.length === 0 ? (
        <p>No skills found.</p>
      ) : (
        skills.map((skill) => (
          <Card key={skill._id} className="mb-3">
            <Card.Body>
              <Card.Title>
                <Link to={`/skills/${skill._id}`}>{skill.title}</Link>
              </Card.Title>
              <Card.Text>{skill.description}</Card.Text>
              <Card.Text>
                <small>
                  Average Rating:{" "}
                  {skill.rating ? skill.rating.toFixed(1) : "N/A"}
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default SkillsPage;
