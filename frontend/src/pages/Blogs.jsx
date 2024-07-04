import React, { useEffect, useState } from "react";
import CommonSection from "../components/CommonSection/CommonSection";
import "../styles/Tour.css";
import Newsletter from "../components/Newsletter";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import BlogCard from "../components/BlogCard/BlogCard";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blogs`);
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (err) {
    return (
      <div className="error__msg">
        Error loading blog details. Check your network
      </div>
    );
  }
  return (
    <div>
      <CommonSection title={"All blogs"} />
      <section className="mt-4">
        <Container>
          <Row>
            {loading ? (
              <div className="loader-container">
                <div className="loader" />
                <div className="loading-text">Loading...</div>
              </div>
            ) : (
              blogs.map((blog) => (
                <Col lg="4" md="6" sm="6" className="mb-4" key={blog._id}>
                  <BlogCard blog={blog} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default Blogs;
