import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Blogcard.css";
import blogs from "../../assets/data/blogs";
const BlogCardMap = ({ blog, isAdmin, onDelete }) => {
  const { id, title, author, publishDate, image, excerpt, content } = blog;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="blog__card">
      <Card>
        {/* Carousel for blog images if there are multiple photos */}
        {image && (
          <Carousel>
            <Carousel.Item>
              <Link to={`/blogs/${id}`} onClick={handleScrollToTop}>
                <img src={image} alt="blog" className="d-block w-100" />
              </Link>
            </Carousel.Item>
          </Carousel>
        )}

        <Card.Body>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="blog__author d-flex align-items-center gap-1">
              <i className="ri-user-line"></i>
              {author}
            </span>
            <span className="blog__date d-flex align-items-center gap-1">
              <i className="ri-calendar-line"></i>
              {new Date(publishDate).toLocaleDateString()}
            </span>
          </div>

          <h5 className="blog__title">
            <Link to={`/blogs/${id}`} onClick={handleScrollToTop}>
              {title}
            </Link>
          </h5>

          <div className="blog__excerpt">
            <p>{excerpt}</p>
          </div>

          <div className="blog__content">
            <p>{content.slice(0, 100)}...</p>
          </div>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <div className="button-group">
              <button className="btn booking__btn">
                <Link to={`/blogs/${id}`} onClick={handleScrollToTop}>
                  Read More
                </Link>
              </button>
              {isAdmin && (
                <>
                  <button className="btn edit__btn">
                    <Link to={`/blogs/edit/${id}`} onClick={handleScrollToTop}>
                      Edit
                    </Link>
                  </button>
                  <button
                    className="btn delete__btn"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogCardMap;
