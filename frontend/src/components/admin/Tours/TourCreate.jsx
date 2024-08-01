import React, { useState, useEffect } from "react";
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

const TourCreate = ({ showModal, handleClose, tourData, isEditMode }) => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (isEditMode && tourData) {
      setTitle(tourData.title);
      setCity(tourData.city);
      setAddress(tourData.address);
      setDistance(tourData.distance);
      setDesc(tourData.desc);
      setPrice(tourData.price);
      setMaxGroupSize(tourData.maxGroupSize);
      setIsFeatured(tourData.isFeatured);
      setFiles(tourData.photos.map((url, index) => ({ url, index })));
    }
  }, [isEditMode, tourData]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file, index) => ({
      file,
      index,
    }));
    setFiles([...files, ...newFiles]);
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
        files.map(async (file) => {
          if (file.url) {
            return file.url;
          }
          const formData = new FormData();
          formData.append("file", file.file);
          formData.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dpgelkpd4/image/upload",
            formData
          );
          return uploadRes.data.url;
        })
      );

      const tourPayload = {
        title,
        city,
        address,
        distance,
        photos: imageUrls,
        desc,
        price,
        maxGroupSize,
        isFeatured,
      };

      if (isEditMode) {
        await axios.put(`${BASE_URL}/tours/${tourData._id}`, tourPayload);
        Swal.fire("Tour updated successfully!", "", "success");
      } else {
        await axios.post(`${BASE_URL}/tours/create`, tourPayload);
        Swal.fire("Tour added successfully!", "", "success");
      }

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
        <Modal.Title>
          {isEditMode ? "Edit Tour Package" : "Add Tour Package"}
        </Modal.Title>
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
                        src={file.url || URL.createObjectURL(file.file)}
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
          <Row>
            <Col>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Featured Tour"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-4 text-end">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" className="ms-2" onClick={handleSubmit}>
              {isEditMode ? "Update Tour" : "Add Tour"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TourCreate;
