import React, { useState } from "react";
import { Container, Spinner, Row, Col, Alert, Button } from "react-bootstrap";
import axios from "axios";
import TourItem from "./TourItem";
import TourCreate from "./TourCreate";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";

const ToursList = () => {
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSelectedTour(null);
  };

  const { data: fetchedTours, loading, error: fetchError } = useFetch("tours");

  const handleEdit = (id) => {
    const tour = fetchedTours.find((tour) => tour._id === id);
    setSelectedTour(tour);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/tours/${id}`);
      // Remove deleted tour from state
      setSelectedTour((prevTours) =>
        prevTours.filter((tour) => tour._id !== id)
      );
    } catch (err) {
      setError("Error deleting tour. Please try again later.");
    }
  };

  const renderTours = () => {
    if (!Array.isArray(fetchedTours) || fetchedTours.length === 0) {
      return (
        <Alert variant="warning" className="mt-4">
          No tours added yet.
        </Alert>
      );
    }
    return fetchedTours.map((tour) => (
      <TourItem
        key={tour._id}
        {...tour}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (fetchError || error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{fetchError || error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="my-4 align-items-center">
        <Col>
          <h2>Tours List</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShow}>
            Add Tour
          </Button>
        </Col>
      </Row>
      <Row>{renderTours()}</Row>
      <TourCreate
        showModal={showModal}
        handleClose={handleClose}
        selectedTour={selectedTour}
      />
    </Container>
  );
};

export default ToursList;
