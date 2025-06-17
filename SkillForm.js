import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SkillForm = ({ fetchSkills }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to add skills");

    try {
      await axios.post(
        "http://localhost:5000/api/skills",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      fetchSkills();
    } catch (err) {
      alert("Error adding skill");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="form-control mb-2"
        placeholder="Skill Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="form-control mb-2"
        placeholder="Skill Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit" className="btn btn-success">Add Skill</button>
    </form>
  );
};

export default SkillForm;
