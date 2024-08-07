import React, { useState } from "react";
import { Container, Spinner, Row, Col, Alert, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import TourCreate from "./TourCreate";
import TourCard from "../../TourCard/TourCard";
import useFetch from "../../../hooks/useFetch";
import { BASE_URL } from "../../../utils/config";

const ToursList = () => {
  const { data: tours, loading, error } = useFetch("tours");
  const [showModal, setShowModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

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
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/tours/${id}`);
        Swal.fire("Deleted!", "The tour has been deleted.", "success");
        window.location.reload(); // Reload the page to fetch the updated list of tours
      }
    } catch (err) {
      Swal.fire(
        "Error!",
        "There was an error deleting the tour. Please try again later.",
        "error"
      );
      console.error("Error deleting tour:", err);
    }
  };

  const renderTours = () => {
    if (error) {
      return (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      );
    }

    if (tours && tours.length === 0) {
      return (
        <Alert variant="warning" className="mt-4">
          No tours added yet.
        </Alert>
      );
    }

    return (
      <Container>
        <Row>
          {tours.map((tour) => (
            <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
              <TourCard
                tour={tour}
                isAdmin={true} // Assuming you are in the admin panel
                onEdit={() => handleEdit(tour._id)}
                onDelete={() => handleDelete(tour._id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
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
      {renderTours()}
      <TourCreate
        showModal={showModal}
        handleClose={handleClose}
        tourData={selectedTour}
        isEditMode={!!selectedTour}
      />
    </Container>
  );
};

export default ToursList;
