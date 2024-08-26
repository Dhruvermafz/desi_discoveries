import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Alert, Form, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import FeaturedBlogsList from "../components/FeaturedBlog/FeaturedBlogList";
import Subtitle from "../components/Subtitle";
import Newsletter from "../components/Newsletter";
import blogs from "../assets/data/blogs"; // Ensure this is the correct path
import avtar from "../assets/images/avatar.jpg"; // Make sure this path is correct

const BlogDetailsMap = () => {
  const { id } = useParams(); // Get blog ID from URL parameters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Use AuthContext to get user information if needed

  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const blog = blogs.find((blog) => blog.id === parseInt(id));
    if (blog) {
      setSelectedBlog(blog);
    } else {
      setError("Blog not found.");
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error || !selectedBlog) {
    return <div className="error__msg">Blog not found.</div>;
  }

  const {
    title,
    content,
    image,
    publishDate,
    description,
    excerpt,
    author,
    createdAt,
    comments,
    photo,
  } = selectedBlog;

  const options = { day: "numeric", month: "long", year: "numeric" };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="blog__content">
                <div className="blog__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="blog__rating d-flex align-items-center gap-1">
                      <span>
                        <i className="ri-user-line"></i>
                        {author}
                      </span>
                    </span>
                  </div>
                  <div className="blog__extra-details">
                    <span>
                      <i className="ri-calendar-line"></i>
                      {new Date(createdAt).toLocaleDateString("en-in", options)}
                    </span>
                    <span>
                      <i className="ri-chat-3-line"></i>
                      {comments?.length || 0}{" "}
                      {comments?.length === 1 ? "Comment" : "Comments"}
                    </span>
                  </div>
                  <h5>Blog Content</h5>
                  <p>{content}</p>
                  {photo && <img src={photo} alt={title} />}
                </div>

                <div className="blog__reviews mt-4">
                  <h4>Comments</h4>
                  <Form>
                    <div className="review__input">
                      <input
                        type="text"
                        placeholder="Share your thoughts"
                        required
                        // Add form logic here
                      />
                      <button className="primary__btn text-white" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user__reviews">
                    {comments?.map((comment, index) => (
                      <div className="review__item" key={index}>
                        <img src={avtar} alt="avatar" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{comment.username}</h5>
                              <p>
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "en-in",
                                  options
                                )}
                              </p>
                            </div>
                          </div>
                          <h6>{comment.comment}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <div className="Featured__blogs">
                <div className="title">
                  <Subtitle subtitle={"Featured Blogs"} />
                </div>
                <div className="mx-auto md:text-center">
                  <FeaturedBlogsList lg={11} md={10} sm={11} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default BlogDetailsMap;
