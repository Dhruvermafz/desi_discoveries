import React from "react";

const ReviewItem = ({ review }) => {
  return (
    <div className="review-item">
      <h6>{review.title}</h6>
      <p>{review.content}</p>
      <small>Rating: {review.rating} / 5</small>
    </div>
  );
};

export default ReviewItem;
