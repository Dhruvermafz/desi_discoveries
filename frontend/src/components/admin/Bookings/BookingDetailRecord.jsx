import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import dateFormat from "dateformat";

const BookingDetailCard = ({
  booking,
  status,
  fetchBookingRecordsFromAdmin,
}) => {
  const {
    id,
    journey_date,
    destination,
    price,
    status: bookingStatus,
  } = booking;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Booking ID: {id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <FaCalendarAlt /> Date: {dateFormat(journey_date, "mmmm dS, yyyy")}
        </Card.Subtitle>
        <Card.Text>
          <FaMapMarkerAlt /> Destination: {destination}
        </Card.Text>
        <Card.Text>Price: ${price}</Card.Text>
        <Card.Text>Status: {bookingStatus || status}</Card.Text>
        <Button
          variant="primary"
          onClick={() => fetchBookingRecordsFromAdmin()}
        >
          Refresh
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookingDetailCard;
