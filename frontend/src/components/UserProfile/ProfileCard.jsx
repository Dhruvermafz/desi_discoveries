import React, { useContext, useState } from "react";
import { Card, Button, Container, Col, Form, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faEnvelopeCircleCheck,
  faPhoneVolume,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const ProfileCard = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [state, setState] = useState(user.state);
  const [country, setCountry] = useState(user.country);
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(user.img);
  const navigate = useNavigate();

  const createdatnew = moment(user.createdAt).fromNow();
  const updatedatnew = moment(user.updatedAt).fromNow();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(file);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("state", state);
    formData.append("country", country);
    if (img) {
      formData.append("photo", img);
    }

    try {
      await axios.put(`${BASE_URL}/users/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Col xl={4} lg={4} md={12}>
      <Card className="rounded-2 me-xl-5 mb-4">
        <Card.Header className="bg-primary position-relative p-0">
          <div className="position-absolute end-0 top-0 mt-4 me-3">
            <Button
              className="square--40 circle bg-light-dark text-light"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </Button>
          </div>
          <Container className="py-5 px-3 text-center">
            <Image
              src={preview}
              className="img-fluid circle"
              width={120}
              alt="Profile"
            />
            <Card.Title className="text-light fw-semibold mb-0">
              {username}
            </Card.Title>
            <Card.Text className="text-light opacity-75 fw-medium">
              <FontAwesomeIcon icon={faLocationDot} className="me-2" />
              {state}, {country}
            </Card.Text>
          </Container>
        </Card.Header>
        <Card.Body>
          {isEditing ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formImg">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formMobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
                className="mt-3 ms-2"
              >
                Cancel
              </Button>
            </Form>
          ) : (
            <>
              <Card.Text>
                <FontAwesomeIcon
                  icon={faEnvelopeCircleCheck}
                  className="me-2"
                />
                {email}
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faPhoneVolume} className="me-2" />
                {mobile}
              </Card.Text>
              <Card.Text>
                <strong>Joined:</strong> {createdatnew}
              </Card.Text>
              <Card.Text>
                <strong>Last Updated:</strong> {updatedatnew}
              </Card.Text>
              <Button
                variant="outline-secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProfileCard;
