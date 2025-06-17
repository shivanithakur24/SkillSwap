import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

function SkillDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [skill, setSkill] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const { data } = await axios.get(`/api/skills/${id}`);
        setSkill(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`/api/skills/${id}/reviews`);
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSkill();
    fetchReviews();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("You must be logged in to add a review.");
      return;
    }

    try {
      await axios.post(
        `/api/skills/${id}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Review added!");
      setComment("");
      setRating(5);

      // Refresh reviews
      const { data } = await axios.get(`/api/skills/${id}/reviews`);
      setReviews(data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add review. Try again."
      );
    }
  };

  if (!skill) return <div className="p-4">Loading skill...</div>;

  return (
    <div className="container mt-4">
      <h2>{skill.title}</h2>
      <p>{skill.description}</p>
      <p>
        <strong>Average Rating: </strong>{" "}
        {skill.rating ? skill.rating.toFixed(1) : "No ratings yet"}
      </p>

      <hr />

      <h4>Reviews</h4>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((r) => (
        <Card key={r._id} className="mb-2 p-3">
          <strong>{r.user.username}</strong> rated {r.rating} / 5
          <p>{r.comment}</p>
          <small>{new Date(r.createdAt).toLocaleString()}</small>
        </Card>
      ))}

      <hr />
      <h4>Add Your Review</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={submitReview}>
        <Form.Group controlId="rating" className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((val) => (
              <option key={val} value={val}>
                {val} Star{val > 1 && "s"}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="comment" className="mb-3">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Submit Review</Button>
      </Form>
    </div>
  );
}

export default SkillDetails;
