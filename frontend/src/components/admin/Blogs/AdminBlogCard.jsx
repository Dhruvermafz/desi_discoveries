import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminBlogCard = ({ blog, onDelete }) => {
  return (
    <Card>
      <Card.Img variant="top" src={blog.image} alt={blog.title} />
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>{blog.excerpt}</Card.Text>
        <Link to={`/admin/blog/edit/${blog._id}`}>
          <Button variant="primary" size="sm" className="mt-2">
            Edit
          </Button>
        </Link>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(blog._id)}
          className="mt-2 ml-2"
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AdminBlogCard;
