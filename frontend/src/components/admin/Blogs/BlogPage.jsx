import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../../../redux/actions/blogActions";
import BlogCard from "../../BlogCard/BlogCard";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import BlogPageSidebar from "./BlogPageSidebar"; // Adjust the import path as needed

const AdminBlogPage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/blogs`);
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching blogs. Please try again later.");
        setLoading(false);
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await dispatch(deleteBlog(id));
        Swal.fire("Deleted!", "The blog has been deleted.", "success");

        // Refresh the blog list
        setBlogs(blogs.filter((blog) => blog._id !== id));
      }
    } catch (err) {
      Swal.fire(
        "Error!",
        "There was an error deleting the blog. Please try again later.",
        "error"
      );
      console.error("Error deleting blog:", err);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderBlogs = () => {
    if (error) {
      return (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      );
    }

    if (filteredBlogs.length === 0) {
      return (
        <Alert variant="warning" className="mt-4">
          No blogs found.
        </Alert>
      );
    }

    return (
      <Container>
        <Row>
          {filteredBlogs.map((blog) => (
            <Col lg="3" sm="6" key={blog._id} md={4} className="mb-4">
              <BlogCard blog={blog} onDelete={handleDelete} isAdmin={true} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

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
        <Col md={8}>{renderBlogs()}</Col>
        <Col md={4}>
          <BlogPageSidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminBlogPage;
