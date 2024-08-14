import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faPlane } from "@fortawesome/free-solid-svg-icons";

const MyBookings = () => {
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
                    label="All Booking (24)"
                    defaultChecked
                    className="btn-check"
                  />
                  <Form.Label
                    htmlFor="allbkk"
                    className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width"
                  >
                    All Booking (24)
                  </Form.Label>
                </Col>
                <Col md={3} xs={6}>
                  <Form.Check
                    type="checkbox"
                    id="processing"
                    className="btn-check"
                  />
                  <Form.Label
                    htmlFor="processing"
                    className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width"
                  >
                    Processing (02)
                  </Form.Label>
                </Col>
                <Col md={3} xs={6}>
                  <Form.Check
                    type="checkbox"
                    id="cancelled"
                    className="btn-check"
                  />
                  <Form.Label
                    htmlFor="cancelled"
                    className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width"
                  >
                    Cancelled (04)
                  </Form.Label>
                </Col>
                <Col md={3} xs={6}>
                  <Form.Check
                    type="checkbox"
                    id="completed"
                    className="btn-check"
                  />
                  <Form.Label
                    htmlFor="completed"
                    className="btn btn-sm btn-secondary rounded-1 fw-medium px-4 full-width"
                  >
                    Completed (10)
                  </Form.Label>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="align-items-center justify-content-start">
            <Col xl={12} lg={12} md={12}>
              <Card border="secondary" className="border-dashed mb-4">
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="square--50 circle bg-light-purple text-purple flex-shrink-0">
                      <FontAwesomeIcon icon={faPlane} />
                    </div>

                    <div className="ms-2">
                      <h6 className="card-title text-dark fs-5 mb-1">
                        Chicago To San Francisco
                      </h6>
                      <ListGroup horizontal className="small">
                        <ListGroup.Item className="border-0 p-0">
                          <span className="text-muted">
                            Booking ID: BKR24530
                          </span>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 p-0 ms-2">
                          <Badge
                            bg="success"
                            className="bg-light-success text-success"
                          >
                            Business class
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
                      <h6 className="mb-0">Fri 12 Aug 14:00 PM</h6>
                    </Col>

                    <Col sm={6} md={4}>
                      <span>Arrival time</span>
                      <h6 className="mb-0">Fri 12 Aug 18:00 PM</h6>
                    </Col>

                    <Col md={4}>
                      <span>Booked by</span>
                      <h6 className="mb-0">Daniel Duekaza</h6>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MyBookings;
