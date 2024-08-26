import React, { useState, useEffect } from "react";
import CommonSection from "../components/CommonSection/CommonSection";
import "../styles/Tour.css";
import Newsletter from "../components/Newsletter";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import BlogCardMap from "../components/BlogCard/BlogCardMap";
import blogs from "../assets/data/blogs"; // Import blogs data

const Blogs = () => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Simulate a delay as if fetching from an API
        setTimeout(() => {
          // Directly use the imported blogs data
          setFilteredBlogs(blogs);
          setLoading(false);
        }, 500); // Adjust timing as needed
      } catch (err) {
        setError("Error loading blog details. Check your network");
        console.error("Error fetching blogs: ", err);
        setLoading(false);
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
    return <div className="error__msg">{error}</div>;
  }

  if (filteredBlogs.length === 0) {
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
            {filteredBlogs.map((blog) => (
              <Col lg="4" md="6" sm="6" className="mb-4" key={blog.id}>
                <BlogCardMap blog={blog} />
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
