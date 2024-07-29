import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Alert,
} from "react-bootstrap";
import "../styles/Contact.css";
import Subtitle from "../components/Subtitle";
import { BASE_URL } from "../utils/config";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Define the center of the map and zoom level
const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: 40.748817, // Example coordinates (latitude)
  lng: -73.985428, // Example coordinates (longitude)
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/contact`, formData)
      .then((res) => {
        setAlertType("success");
        setAlertMessage("Form data submitted successfully.");
        setAlertVisible(true);

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch((error) => {
        setAlertType("danger");
        setAlertMessage("Failed to submit form data. Please try again later.");
        setAlertVisible(true);
      });
  };

  return (
    <section>
      <Container>
        <Row className="mt-4">
          <Col sm={12}>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d28004.59614913955!2d77.03883566413765!3d28.672455941113398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sH-82%2C%20Kunwar%20Singh%20Nagar%2C%20Nangloi%2C%20New%20Delhi-110041!5e0!3m2!1sen!2sin!4v1722244402930!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={{ span: 6, offset: 3 }}>
            <Subtitle subtitle={"Contact Us"} />
            <div className="contact-info">
              <h5>Contact Information</h5>
              <p>
                <strong>Phone:</strong> 7838686544
              </p>
              <p>
                <strong>Email:</strong> contact@example.com
              </p>
              <p>
                <strong>Address:</strong> 123 Example Street, City, Country
              </p>
            </div>

            {alertVisible && (
              <Alert variant={alertType} className="mt-3">
                {alertMessage}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <FormGroup className="form__group">
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <Form.Control
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <Form.Control
                  as="textarea"
                  id="message"
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <Button type="submit" className="btn primary__btn">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
