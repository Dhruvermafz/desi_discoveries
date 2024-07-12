import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { fetchBlogs, deleteBlog } from "../../../redux/actions/blogActions";
import BlogCard from "../../BlogCard/BlogCard";
import { Link } from "react-router-dom";
const AdminBlogPage = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  const filteredBlogs = Array.isArray(blogs)
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md={8}>
          <h2>Admin Blog Page</h2>
        </Col>
        <Col md={4} className="text-end">
          <Link to="/admin/blog/create">
            <Button variant="dark">Add Blog</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12}>
          <Form>
            <Form.Control
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : filteredBlogs.length === 0 ? (
          <Alert variant="info">No blogs found.</Alert>
        ) : (
          filteredBlogs.map((blog) => (
            <Col key={blog._id} md={4} className="mb-4">
              <BlogCard blog={blog} />
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  alert(`Edit ${blog.title} functionality to be implemented`)
                }
                className="mt-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(blog._id)}
                className="mt-2 ml-2"
              >
                Delete
              </Button>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default AdminBlogPage;
