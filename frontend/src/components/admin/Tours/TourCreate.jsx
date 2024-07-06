import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { createTour } from "../../redux/actions/tourActions";

const TourCreateBootstrap = () => {
  const dispatch = useDispatch();

  const onSubmit = async (formValues) => {
    // Dispatch createTour action creator to initiate API call
    await dispatch(createTour(formValues));
    // Handle success or failure in Redux store (not shown in this snippet)
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Link to="/admin/tours" className="mb-3 d-block">
            <HiOutlineArrowNarrowLeft /> Go back to tour list
          </Link>
          <h2>Create New Tour</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Tour Name</Form.Label>
              <Form.Control type="text" placeholder="Enter tour name" />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter tour price" />
            </Form.Group>

            <Button variant="dark" type="submit">
              Create Tour
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TourCreateBootstrap;
