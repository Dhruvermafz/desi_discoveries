import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Table,
  Spinner,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTours } from "../../../redux/actions/tourActions";
import TourItem from "./TourItem";
import TourCreate from "./TourCreate"; // Import the TourCreate component

const ToursList = () => {
  const dispatch = useDispatch();
  const { tours, loading, error } = useSelector((state) => state.tour);

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  const renderTours = () => {
    return tours.map((tour) => <TourItem key={tour._id} {...tour} />);
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
          <Button variant="dark" onClick={handleShow}>
            Add Tour
          </Button>
        </Col>
      </Row>

      {!tours.length && (
        <Alert variant="info" className="mt-4">
          No tours available.
        </Alert>
      )}

      <Table responsive bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Tour Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderTours()}</tbody>
      </Table>

      <TourCreate showModal={showModal} handleClose={handleClose} />
    </Container>
  );
};

export default ToursList;
