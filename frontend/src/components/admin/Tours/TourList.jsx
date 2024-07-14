import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Spinner,
  Row,
  Col,
  Alert,
  Button,
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
    if (!Array.isArray(tours)) {
      return null;
    }
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
          <Button variant="primary" onClick={handleShow}>
            Add Tour
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>City</th>
            <th>Address</th>
            <th>Distance (km)</th>
            <th>Price</th>
            <th>Max Group Size</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{renderTours()}</tbody>
      </Table>
      <TourCreate showModal={showModal} handleClose={handleClose} />
    </Container>
  );
};

export default ToursList;
