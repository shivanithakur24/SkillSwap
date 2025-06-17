// src/components/SkillsList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillsList = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("/api/skills");
        setSkills(res.data);
      } catch (error) {
        console.error("Failed to fetch skills", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div>
      <h3>Skills List</h3>
      {skills.length === 0 ? (
        <p>No skills found</p>
      ) : (
        <ul>
          {skills.map((skill) => (
            <li key={skill._id}>
              <strong>{skill.title}</strong>: {skill.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillsList;
