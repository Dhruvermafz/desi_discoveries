import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FeaturedBlogsList from "../components/FeaturedBlog/FeaturedBlogList";
import Subtitle from "../components/Subtitle";
import Newsletter from "../components/Newsletter";
import avtar from "../assets/images/avatar.jpg"; // Ensure this path is correct
import blogs from "../assets/data/blogs"; // Ensure this is the correct path

const BlogDetailsMap = () => {
  const { id } = useParams(); // Get blog ID from URL parameters
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Find the blog based on the ID from URL
    const foundBlog = blogs.find((b) => b.id === id);
    if (foundBlog) {
      setBlog(foundBlog);
      setLoading(false);
    } else {
      setError("Blog not found.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error || !blog) {
    return <div className="error__msg">Blog not found.</div>;
  }

  const {
    title,
    author,
    publishDate,
    image,
    excerpt,
    content,
    comments = [],
  } = blog;

  // Convert new lines to <br> tags
  const formattedContent = content.replace(/\n/g, "<br />");

  const options = { day: "numeric", month: "long", year: "numeric" };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              {/* Blog Content */}
              <div className="blog__content">
                {/* Blog Info */}
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
                  {/* Blog Extra Details */}
                  <div className="blog__extra-details">
                    <span>
                      <i className="ri-calendar-line"></i>
                      {new Date(publishDate).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </span>
                    <span>
                      <i className="ri-chat-3-line"></i>
                      {comments.length}{" "}
                      {comments.length === 1 ? "Comment" : "Comments"}
                    </span>
                  </div>
                  {image && <img src={image} alt={title} />}
                  {/* Blog Content */}

                  <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
                </div>

                {/* Blog Comments Section */}
                <div className="blog__reviews mt-4">
                  <h4>Comments</h4>
                  {/* Comments Form */}
                  <Form>
                    <div className="review__input">
                      <input
                        type="text"
                        placeholder="Share your thoughts"
                        required
                      />
                      <button className="primary__btn text-white" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>

                  {/* Render Comments */}
                  <ListGroup className="user__reviews">
                    {comments.map((comment, index) => (
                      <div className="review__item" key={index}>
                        <img src={avtar} alt="avatar" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{comment.username}</h5>
                              <p>
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "en-US",
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

            {/* Sidebar for Featured Blogs */}
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
