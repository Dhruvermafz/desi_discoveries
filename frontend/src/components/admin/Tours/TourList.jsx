import React, { useState, useEffect } from "react";
import { Container, Spinner, Row, Col, Alert, Button } from "react-bootstrap";
import axios from "axios";
import TourItem from "./TourItem";
import TourCreate from "./TourCreate";
import { BASE_URL } from "../../../utils/config";

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tours/`);
      console.log(response.data); // Log the response data
      setTours(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      setError("Error fetching tours. Please try again later.");
      setLoading(false);
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSelectedTour(null);
  };

  const handleEdit = (id) => {
    const tour = tours.find((tour) => tour._id === id);
    setSelectedTour(tour);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tours/${id}`);
      fetchTours(); // Re-fetch tours to ensure the list is updated
    } catch (err) {
      setError("Error deleting tour. Please try again later.");
    }
  };

  const renderTours = () => {
    if (!Array.isArray(tours)) {
      return (
        <Alert variant="danger" className="mt-4">
          Unexpected data format.
        </Alert>
      );
    }
    if (tours.length === 0) {
      return (
        <Alert variant="warning" className="mt-4">
          No tours added yet.
        </Alert>
      );
    }
    return tours.map((tour) => (
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

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
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
        onTourUpdated={fetchTours}
      />
    </Container>
  );
};

export default ToursList;
