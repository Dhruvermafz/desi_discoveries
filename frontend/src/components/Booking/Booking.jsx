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
  const { price, title, destination } = tour; // Ensure destination is included in the tour object
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?.username || "",
    userEmail: user?.email || "",
    tourName: title,
    destination: destination || "", // Add destination to booking
    fullName: "",
    phone: "",
    groupSize: 1,
  });

  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
  const [isBookingFailed, setIsBookingFailed] = useState(false);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePayment = () => {
    // Calculate taxes and total amount
    const taxes = (0.05 * price * booking.groupSize).toFixed(2);
    const total = (price * booking.groupSize * 1.05).toFixed(2);

    // Pass all relevant details to the Payment component
    navigate(`/tours/${tour._id}/payment`, {
      state: {
        booking,
        price,
        taxes: parseFloat(taxes), // Send taxes as a number
        total: parseFloat(total), // Send total as a number
      },
    });
  };

  const taxes = (0.05 * price * booking.groupSize).toFixed(2);
  const total = (price * booking.groupSize * 1.05).toFixed(2);

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
          ₹{price} <span>/Per Person</span>
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
          <FormGroup>
            <Form.Control
              type="number"
              placeholder="Group Size"
              id="groupSize"
              required
              onChange={handleChange}
              value={booking.groupSize}
              min="1"
            />
          </FormGroup>
          <Button
            className="btn primary__btn w-100 mt-4"
            onClick={handlePayment}
          >
            Proceed to Payment
          </Button>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{price} <i className="ri-close-line"></i> {booking.groupSize}{" "}
              {booking.groupSize > 1 ? "People" : "Person"}
            </h5>
            <span>₹{(price * booking.groupSize).toFixed(2)}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Taxes</h5>
            <span>₹{taxes}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>₹{total}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;
