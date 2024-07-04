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
        <Row>
          <Col sm={12} md={{ span: 6, offset: 3 }}>
            <Subtitle subtitle={"Contact Us"} />
            <div className="contact-info">
              <p>Contact No: 7838686544</p>
              <p>Email: contact@example.com</p>
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
