// src/components/EditSkill.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditSkill = ({ skillId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axios.get(`/api/skills/${skillId}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (error) {
        console.error("Failed to fetch skill", error);
      }
    };

    fetchSkill();
  }, [skillId]); // Now dependencies are correct

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/skills/${skillId}`, { title, description });
      alert("Skill updated successfully");
    } catch (error) {
      console.error("Failed to update skill", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button type="submit">Update Skill</button>
    </form>
  );
};

export default EditSkill;
