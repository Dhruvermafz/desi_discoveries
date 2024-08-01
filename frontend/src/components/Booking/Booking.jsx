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
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Set your Stripe public key here
const stripePromise = loadStripe("your-public-key-here");

const Booking = ({ tour, avgRating, totalRating, reviews }) => {
  const { price, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const stripe = useStripe();
  const elements = useElements();

  const [booking, setBooking] = useState({
    userId: user && user.username,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    bookAt: "",
    groupSize: "",
  });

  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
  const [isBookingFailed, setIsBookingFailed] = useState(false);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);
  const [clientSecret, setClientSecret] = useState(""); // For Stripe

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setIsLoginAlertVisible(true);
      return;
    }

    try {
      // Create a payment intent on the server and get the client secret
      const response = await fetch(`${BASE_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: price * (booking.groupSize || 1) * 100, // Amount in cents
        }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);

      // Process payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: booking.fullName,
              email: user.email,
            },
          },
        }
      );

      if (error) {
        setIsBookingFailed(true);
        setIsBookingSuccessful(false);
      } else if (paymentIntent.status === "succeeded") {
        // Create booking on the server
        await fetch(`${BASE_URL}/booking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(booking),
        });

        setIsBookingSuccessful(true);
        setIsBookingFailed(false);
        setBooking({
          ...booking,
          fullName: "",
          phone: "",
          bookAt: "",
          groupSize: "",
        });
        setTimeout(() => {
          navigate("/thank-you");
        }, 1000);
      } else {
        setIsBookingFailed(true);
        setIsBookingSuccessful(false);
      }
    } catch (error) {
      setIsBookingFailed(true);
      setIsBookingSuccessful(false);
    }
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const taxes = (0.05 * price * (booking.groupSize || 1)).toFixed(2);
  const total = (price * (booking.groupSize || 1) * 1.05).toFixed(2);

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
        <Form className="booking__info-form" onSubmit={handleSubmit}>
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
          <FormGroup className="d-flex align-items-center gap-3">
            <Form.Control
              type="date"
              placeholder="Date"
              id="bookAt"
              required
              onChange={handleChange}
              value={booking.bookAt}
              min={formattedDate}
            />
            <Form.Control
              type="number"
              placeholder="Group Size"
              id="groupSize"
              required
              onChange={handleChange}
              value={booking.groupSize}
            />
          </FormGroup>
          <CardElement className="my-4" />
          <Button className="btn primary__btn w-100 mt-4" type="submit">
            Book Now
          </Button>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i>
              {booking.groupSize || 1} Person
            </h5>
            <span>${price * (booking.groupSize || 1)}</span>
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

const BookingWithStripe = (props) => (
  <Elements stripe={stripePromise}>
    <Booking {...props} />
  </Elements>
);

export default BookingWithStripe;
