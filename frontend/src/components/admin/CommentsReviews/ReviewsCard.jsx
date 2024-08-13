import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import ReviewItem from "./ReviewItem";
import useFetch from "../../../hooks/useFetch";

const ReviewsCard = () => {
  const {
    data: toursData,
    loading: toursLoading,
    error: toursError,
  } = useFetch("tours");
  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
  } = useFetch("blogs");

  if (toursLoading || blogsLoading) return <div>Loading...</div>;
  if (toursError || blogsError) return <div>Error loading data!</div>;

  return (
    <Container className="reviews-card">
      <Tabs defaultActiveKey="tours" id="reviews-tabs">
        <Tab eventKey="tours" title="Tours">
          <div className="tours-section">
            <h3>Tours</h3>
            {toursData &&
              toursData.map((review, index) => (
                <ReviewItem key={index} review={review} />
              ))}
          </div>
        </Tab>
        <Tab eventKey="blogs" title="Blogs">
          <div className="blogs-section">
            <h3>Blogs</h3>
            {blogsData ? (
              <div>
                {blogsData.map((blog, index) => (
                  <div key={index}>
                    <h5>{blog.title}</h5>
                    <p>{blog.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ReviewsCard;
