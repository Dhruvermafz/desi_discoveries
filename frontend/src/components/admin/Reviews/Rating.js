import React from "react";

const Rating = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const ratingValue = index + 1;
    return (
      <span key={index}>
        <i className={ratingValue <= value ? "fas fa-star" : "far fa-star"}></i>
      </span>
    );
  });

  return <div className="custom-rating">{stars}</div>;
};

export default Rating;
