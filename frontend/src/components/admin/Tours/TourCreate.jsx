import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTour } from "../../../redux/actions/tourActions";

const TourCreate = ({ showModal, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.tour);

  const [formValues, setFormValues] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    photo: "",
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createTour(formValues));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        handleClose();
        navigate("/admin/tours");
      }, 2000);
    } catch (error) {
      console.error("Error creating tour:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Tour</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && (
          <div className="d-flex justify-content-center align-items-center">
            <h3>Loading...</h3>
          </div>
        )}
        {error && (
          <Alert variant="danger" className="mt-4">
            {error}
          </Alert>
        )}
        {showSuccess && (
          <Alert variant="success" className="mt-4">
            Tour created successfully!
          </Alert>
        )}
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tour title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="city" className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={formValues.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="address" className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="distance" className="mb-3">
            <Form.Label>Distance (km)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter distance"
              name="distance"
              value={formValues.distance}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="photo" className="mb-3">
            <Form.Label>Photo URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter photo URL"
              name="photo"
              value={formValues.photo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="desc" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="desc"
              value={formValues.desc}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="price" className="mb-3">
            <Form.Label>Price (INR)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={formValues.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="maxGroupSize" className="mb-3">
            <Form.Label>Max Group Size</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter max group size"
              name="maxGroupSize"
              value={formValues.maxGroupSize}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="featured" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Featured"
              name="featured"
              checked={formValues.featured}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Create Tour
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TourCreate;
