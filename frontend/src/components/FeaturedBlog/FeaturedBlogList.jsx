import React from "react";
import { Button, Col, NavLink } from "react-bootstrap";
import BlogCardMap from "../BlogCard/BlogCardMap";
import blogs from "../../assets/data/blogs";

const FeaturedBlogsList = ({ lg, sm, md }) => {
  // Filter and limit to 4 featured blogs
  const featuredBlogs = blogs
    .filter((blog) => blog.featured === true)
    .slice(0, 3);

  // Loading state (replace with your actual loading logic if needed)
  const loading = false; // Set this according to your actual loading logic

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {Array.isArray(featuredBlogs) &&
        featuredBlogs.map((blog) => (
          <Col lg={lg} md={md} sm={sm} className="mb-4" key={blog.id}>
            {/* Apply a custom class for reduced size */}
            <BlogCardMap blog={blog} customClass="small-blog-card" />
          </Col>
        ))}
      <div className="viall__btn">
        <NavLink to={"/blogs"}>
          <Button className="btn primary__btn">View All Blogs</Button>
        </NavLink>
      </div>
    </>
  );
};

export default FeaturedBlogsList;
