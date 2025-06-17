import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingSkillId, setEditingSkillId] = useState(null);

  // Fetch skills list on mount
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/skills");
      setSkills(res.data);
    } catch (err) {
      console.error("Fetch skills failed:", err);
    }
  };

  // Add or update skill
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("Please fill both name and description");
      return;
    }

    try {
      if (editingSkillId) {
        await axios.put(`http://localhost:5000/api/skills/${editingSkillId}`, {
          name,
          description,
        });
        setEditingSkillId(null);
      } else {
        await axios.post("http://localhost:5000/api/skills", {
          name,
          description,
        });
      }
      setName("");
      setDescription("");
      fetchSkills();
    } catch (err) {
      console.error("Add/update skill failed:", err);
    }
  };

  // Prepare form for editing
  const startEdit = (skill) => {
    setName(skill.name);
    setDescription(skill.description);
    setEditingSkillId(skill._id);
  };

  // Delete skill
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error("Delete skill failed:", err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "30px auto" }}>
      <h2>Manage Skills</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Skill name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "8px" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "8px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          {editingSkillId ? "Update Skill" : "Add Skill"}
        </button>
        {editingSkillId && (
          <button
            type="button"
            onClick={() => {
              setEditingSkillId(null);
              setName("");
              setDescription("");
            }}
            style={{ marginLeft: 10, padding: "10px 20px" }}
          >
            Cancel
          </button>
        )}
      </form>

      <ul style={{ marginTop: 30, paddingLeft: 0, listStyle: "none" }}>
        {skills.length === 0 && <p>No skills found.</p>}
        {skills.map((skill) => (
          <li
            key={skill._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: 10,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <h4>{skill.name}</h4>
            <p>{skill.description}</p>
            <button
              type="button"
              onClick={() => startEdit(skill)}
              style={{ marginRight: 10 }}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDelete(skill._id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillManager;
