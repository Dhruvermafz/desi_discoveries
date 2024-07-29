import React, { useState } from "react";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Image,
  Carousel,
} from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

const TourCreate = ({ showModal, handleClose }) => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      files.length === 0 ||
      !title ||
      !city ||
      !address ||
      !distance ||
      !desc ||
      !price ||
      !maxGroupSize
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields!",
      });
      return;
    }

    try {
      const imageUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dpgelkpd4/image/upload",
            formData
          );
          return uploadRes.data.url;
        })
      );

      await axios.post(`${BASE_URL}/tours/create`, {
        title,
        city,
        address,
        distance,
        photos: imageUrls, // Note that `photos` is now an array
        desc,
        price,
        maxGroupSize,
      });

      Swal.fire("Tour added successfully!", "", "success");
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Tour Package</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Add cover photos for the package</Form.Label>
            <div className="mb-3 text-center">
              <Carousel indicators={true}>
                {files.length > 0 ? (
                  files.map((file, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`cover-${index}`}
                        fluid
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <Image
                      src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      alt="cover"
                      fluid
                    />
                  </Carousel.Item>
                )}
              </Carousel>
              <Form.Control
                type="file"
                multiple
                id="file"
                name="file"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type Here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type Here"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type Here"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Distance (in km)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Type Here"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Price (per person)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Type Here"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Maximum Group Size</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Type Here"
                  value={maxGroupSize}
                  onChange={(e) => setMaxGroupSize(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Type Your Description Here"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-4 text-end">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" className="ms-2" onClick={handleSubmit}>
              Add Tour
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TourCreate;
