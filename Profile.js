// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Alert } from "react-bootstrap";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          setError("You must be logged in to view your profile.");
          setLoading(false);
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get("/api/users/profile", config);
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>
      {user && (
        <Card>
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>
              <strong>Email: </strong> {user.email}
            </Card.Text>
            {/* Add more profile info here if available */}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default Profile;
