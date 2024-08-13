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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalNights, setTotalNights] = useState(0);

  useEffect(() => {
    if (isEditMode && tourData) {
      setTitle(tourData.title);
      setCity(tourData.city);
      setAddress(tourData.address);
      setDistance(tourData.distance);
      setDesc(tourData.desc);
      setPrice(tourData.price);
      setMaxGroupSize(tourData.maxGroupSize);
      setIsFeatured(tourData.featured);

      // Validate and set dates
      const fromDate = new Date(tourData.fromDate);
      const toDate = new Date(tourData.toDate);
      if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
        setFromDate(fromDate.toISOString().split("T")[0]);
        setToDate(toDate.toISOString().split("T")[0]);
        calculateDaysAndNights(fromDate, toDate);
      }

      setFiles(tourData.photos.map((url, index) => ({ url, index })));
    }
  }, [isEditMode, tourData]);

  const calculateDaysAndNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const diffTime = Math.abs(endDate - startDate);
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(days);
      setTotalNights(days - 1);
    } else {
      console.error("Invalid dates provided:", start, end);
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file, index) => ({
      file,
      index,
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "fromDate") {
      setFromDate(value);
      if (value && toDate) calculateDaysAndNights(value, toDate);
    } else if (name === "toDate") {
      setToDate(value);
      if (value && fromDate) calculateDaysAndNights(fromDate, value);
    }
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
      !maxGroupSize ||
      !fromDate ||
      !toDate
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
        featured: isFeatured,
        fromDate,
        toDate,
        totalDays,
        totalNights,
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
                        src={
                          file.url ||
                          (file.file && URL.createObjectURL(file.file))
                        }
                        alt={`cover-${index}`}
                        fluid
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Image
                    src="https://via.placeholder.com/600x400"
                    alt="placeholder"
                    fluid
                  />
                )}
              </Carousel>
            </div>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tour title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tour city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tour address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="distance">
                <Form.Label>Distance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter tour price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="maxGroupSize">
                <Form.Label>Max Group Size</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter max group size"
                  value={maxGroupSize}
                  onChange={(e) => setMaxGroupSize(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="fromDate">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="fromDate"
                  value={fromDate}
                  onChange={handleDateChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="toDate">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="toDate"
                  value={toDate}
                  onChange={handleDateChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter tour description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="featured">
            <Form.Check
              type="checkbox"
              label="Featured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Total Days</Form.Label>
            <Form.Control type="number" readOnly value={totalDays} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Total Nights</Form.Label>
            <Form.Control type="number" readOnly value={totalNights} />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditMode ? "Update" : "Create"} Tour
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TourCreate;
