// src/components/Booking/Booking.jsx

import React, { useState, useContext } from "react";
import "./Booking.css";
import {
  Form,
  FormGroup,
  ListGroup,
  Button,
  ListGroupItem,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";

const Booking = ({ tour, avgRating, totalRating, reviews }) => {
  const { price, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user.username,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
  });

  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
  const [isBookingFailed, setIsBookingFailed] = useState(false);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePayPalPayment = () => {
    navigate(`/tours/${tour._id}/payment`, { state: { booking, price } });
  };

  const taxes = (0.05 * price).toFixed(2);
  const total = (price * 1.05).toFixed(2);

  return (
    <div className="booking">
      {isBookingSuccessful && (
        <Alert variant="success">Booking Successful</Alert>
      )}

      {isBookingFailed && (
        <Alert variant="danger">Failed to book. Please try again.</Alert>
      )}

      {isLoginAlertVisible && (
        <Alert variant="warning">
          Please login to proceed with the booking.
        </Alert>
      )}

      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/Per Person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center gap-1">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating}
          {totalRating === 0 ? (
            <span>Not Rated</span>
          ) : (
            <span>({reviews.length || 0})</span>
          )}
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form">
          <FormGroup>
            <Form.Control
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
              value={booking.fullName}
            />
          </FormGroup>
          <FormGroup>
            <Form.Control
              type="tel"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
              value={booking.phone}
            />
          </FormGroup>
          <Button
            className="btn primary__btn w-100 mt-4"
            onClick={handlePayPalPayment}
          >
            Proceed to Payment
          </Button>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i> 1 Person
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Taxes</h5>
            <span>${taxes}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${total}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;
