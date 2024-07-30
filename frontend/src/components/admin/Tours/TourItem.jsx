import React from "react";
import { Card, Button, Col, Carousel } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../../styles/TourDetails.css";

const TourItem = ({ tour = {}, onEdit, onDelete }) => {
  const {
    photos = [],
    title = "",
    price = 0,
    city = "",
    distance = 0,
    address = "",
    maxGroupSize = 0,
    _id = "",
    desc = "",
  } = tour;

  // Use the first photo or fallback to a placeholder
  const firstPhoto =
    photos.length > 0 ? photos[0] : "path/to/placeholder-image.jpg";

  return (
    <Col md={4} className="mb-3">
      <Card>
        <Card.Header className="d-flex justify-content-end">
          <Button variant="outline-primary" onClick={() => onEdit(_id)}>
            <FaEdit /> Edit
          </Button>
          <Button
            variant="outline-danger"
            className="ms-2"
            onClick={() => onDelete(_id)}
          >
            <FaTrash /> Delete
          </Button>
        </Card.Header>
        <div className="tour__img">
          {Array.isArray(photos) && photos.length > 0 ? (
            <Carousel>
              {photos.map((photo, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={photo}
                    alt={`tour-${index}`}
                    className="d-block w-100"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Card.Img
              variant="top"
              src={firstPhoto} // Use the first photo or fallback to a placeholder
              alt={title}
              style={{ height: "200px", objectFit: "cover" }}
            />
          )}
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>City:</strong> {city}
            <br />
            <strong>Address:</strong> {address}
            <br />
            <strong>Distance:</strong> {distance} km
            <br />
            <strong>Price:</strong> ${price}
            <br />
            <strong>Max Group Size:</strong> {maxGroupSize}
            <br />
            <strong>Description:</strong> {desc}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TourItem;
