import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./singlecard.css";

const SingleUserCard = ({ user, changeModal, editUser }) => {
  return (
    <Card className="user-card mb-3">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <div>
            {user.username} <small>({user.email})</small>
          </div>
          <div className="text-muted">
            Updated At: {new Date(user.updatedAt).toLocaleDateString()}
          </div>
        </Card.Title>
        <Card.Text>Role: {user.role}</Card.Text>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="primary" onClick={() => editUser(user)}>
            <FaEdit /> Edit
          </Button>
          <Button variant="danger" onClick={() => changeModal(user)}>
            <FaTrash /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleUserCard;
