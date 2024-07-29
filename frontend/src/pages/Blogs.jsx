import React, { useEffect, useState } from "react";
import CommonSection from "../components/CommonSection/CommonSection";
import "../styles/Tour.css";
import Newsletter from "../components/Newsletter";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import BlogCard from "../components/BlogCard/BlogCard";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blogs`);
        if (Array.isArray(res.data)) {
          setBlogs(res.data);
        } else {
          setBlogs([]);
          console.error("Unexpected response format: ", res.data);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        console.error("Error fetching blogs: ", err);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <Spinner animation="border" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error__msg">
        Error loading blog details. Check your network
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="no__blogs">
        <Alert variant="info">No blogs available at the moment.</Alert>
      </div>
    );
  }

  return (
    <div>
      <CommonSection title={"All Blogs"} />
      <section className="mt-4">
        <Container>
          <Row>
            {blogs.map((blog) => (
              <Col lg="4" md="6" sm="6" className="mb-4" key={blog._id}>
                <BlogCard blog={blog} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default Blogs;
