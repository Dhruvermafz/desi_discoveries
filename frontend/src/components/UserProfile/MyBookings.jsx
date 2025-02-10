import React, { useEffect, useState } from "react";
import {
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
  Row,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faPlane } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../utils/config";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/bookings/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT auth
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Col xl={8} lg={8} md={12}>
      <Card>
        <Card.Header>
          <h4>
            <FontAwesomeIcon icon={faTicket} className="me-2" />
            My Bookings
          </h4>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center justify-content-start mb-4">
            <Col xl={12} lg={12} md={12}>
              <Row className="gx-3 gy-2">
                <Col md={3} xs={6}>
                  <Form.Check
                    type="checkbox"
                    id="allbkk"
                    label={`All Booking (${bookings.length})`}
                    defaultChecked
                    className="btn-check"
                  />
                  <Form.Label
                    htmlFor="allbkk"
                    className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width"
                  >
                    All Booking ({bookings.length})
                  </Form.Label>
                </Col>
              </Row>
            </Col>
          </Row>

          {bookings.length === 0 ? (
            <Alert variant="info">No bookings found</Alert>
          ) : (
            bookings.map((booking) => (
              <Card
                key={booking.id}
                border="secondary"
                className="border-dashed mb-4"
              >
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="square--50 circle bg-light-purple text-purple flex-shrink-0">
                      <FontAwesomeIcon icon={faPlane} />
                    </div>

                    <div className="ms-2">
                      <h6 className="card-title text-dark fs-5 mb-1">
                        {booking.departure} To {booking.destination}
                      </h6>
                      <ListGroup horizontal className="small">
                        <ListGroup.Item className="border-0 p-0">
                          <span className="text-muted">
                            Booking ID: {booking.id}
                          </span>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 p-0 ms-2">
                          <Badge
                            bg={
                              booking.class === "Business"
                                ? "success"
                                : "primary"
                            }
                            className="bg-light-success text-success"
                          >
                            {booking.class} Class
                          </Badge>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>

                  <div className="mt-2 mt-md-0">
                    <Button variant="light-seegreen" className="fw-medium">
                      Manage Booking
                    </Button>
                  </div>
                </Card.Header>

                <Card.Body>
                  <Row className="g-3">
                    <Col sm={6} md={4}>
                      <span>Departure time</span>
                      <h6 className="mb-0">{booking.departureTime}</h6>
                    </Col>

                    <Col sm={6} md={4}>
                      <span>Arrival time</span>
                      <h6 className="mb-0">{booking.arrivalTime}</h6>
                    </Col>

                    <Col md={4}>
                      <span>Booked by</span>
                      <h6 className="mb-0">{booking.bookedBy}</h6>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MyBookings;
