import React from "react";
import { Button, Card } from "react-bootstrap";

const SkillCard = ({ skill, onLike, onEdit, onDelete, isOwnSkill }) => (
  <Card className="mb-3 shadow-sm">
    <Card.Body>
      <Card.Title>{skill.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{skill.category}</Card.Subtitle>
      <Card.Text>{skill.description}</Card.Text>
      <div>
        {skill.tags?.map((tag, idx) => (
          <span key={idx} className="badge bg-secondary me-1">{tag}</span>
        ))}
      </div>
      <div className="mt-3 d-flex justify-content-between">
        <div>
          <Button variant="outline-primary" size="sm" onClick={() => onLike(skill._id)}>
            ❤️ {skill.likes?.length || 0}
          </Button>
        </div>
        {isOwnSkill && (
          <div>
            <Button variant="outline-warning" size="sm" onClick={() => onEdit(skill)}>Edit</Button>{' '}
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(skill._id)}>Delete</Button>
          </div>
        )}
      </div>
    </Card.Body>
  </Card>
);

export default SkillCard;
