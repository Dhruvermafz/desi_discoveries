import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTour } from "../../../redux/actions/tourActions";

const TourCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.tour);

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formValues = {
      name: form.name.value,
      summary: form.summary.value,
      description: form.description.value,
      difficulty: form.difficulty.value,
      price: form.price.value,
      maxGroupSize: form.maxGroupSize.value,
      duration: form.duration.value,
      startLocation: form.startLocation.value,
      startDates: form.startDates.value,
      imageCover: form.imageCover.files[0],
      image1: form.image1.files[0],
      image2: form.image2.files[0],
      image3: form.image3.files[0],
    };

    try {
      await dispatch(createTour(formValues));
      navigate("/admin/tours");
    } catch (error) {
      console.error("Error creating tour:", error);
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Row>
          <Col className="text-center">
            <h3>Loading...</h3>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Row>
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

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

export default TourCreate;
