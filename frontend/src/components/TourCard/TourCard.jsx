import React, { useState } from "react";
import { Card, CardBody, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../../utils/avgRating";
import "./TourCard.css";

const TourCard = ({ tour, isAdmin }) => {
  const { _id, title, city, photos, price, reviews } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <Carousel>
            {photos.map((photo, index) => (
              <Carousel.Item key={index}>
                <Link to={`/tours/${_id}`}>
                  <div onClick={handleScrollToTop}>
                    <img
                      src={photo}
                      alt={`tour-${index}`}
                      className="d-block w-100"
                    />
                  </div>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
          <span>Featured</span>
        </div>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line">{city}</i>
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                <span>Not Rated</span>
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/tours/${_id}`}>
              <div onClick={handleScrollToTop}>{title}</div>
            </Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price}
              <span>/Per Person</span>
            </h5>

            {isAdmin ? (
              <div className="admin-buttons">
                <button className="btn edit__btn">
                  <Link to={`/admin/tours/edit/${_id}`}>
                    <div onClick={handleScrollToTop}>Edit</div>
                  </Link>
                </button>
                <button
                  className="btn delete__btn"
                  onClick={() => handleDelete(_id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <button className="btn booking__btn">
                <Link to={`/tours/${_id}`}>
                  <div onClick={handleScrollToTop}>Book Now</div>
                </Link>
              </button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

// Function to handle delete action (to be implemented)
const handleDelete = (id) => {
  // Logic to delete the tour
  console.log("Delete tour with id:", id);
};

export default TourCard;
