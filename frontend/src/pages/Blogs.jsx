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
        const response = await axios.get(`${BASE_URL}/blogs`);
        // Adjust data extraction based on the API response structure
        if (response.data.docs && Array.isArray(response.data.docs)) {
          setBlogs(response.data.docs);
        } else {
          setBlogs([]);
          console.error("Unexpected response format: ", response.data);
        }
      } catch (err) {
        setError("Error loading blog details. Check your network");
        console.error("Error fetching blogs: ", err);
      } finally {
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
