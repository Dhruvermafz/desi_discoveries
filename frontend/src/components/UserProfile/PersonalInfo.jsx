import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faEnvelopeCircleCheck,
  faLock,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import ProfileCard from "./ProfileCard";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import states from "../../utils/state";
import { BASE_URL } from "../../utils/config";
const PersonalInfo = () => {
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
  const createdat = user.createdAt;
  const updatedat = user.updatedAt;
  const createdatnew = moment(createdat).fromNow();
  const updatedatnew = moment(updatedat).fromNow();

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
      const response = await axios.put(
        `${BASE_URL}/users/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update user context with new data
      user.username = response.data.data.username;
      user.email = response.data.data.email;
      user.mobile = response.data.data.mobile;
      user.state = response.data.data.state;
      user.country = response.data.data.country;
      if (response.data.data.photo) {
        user.img = response.data.data.photo;
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div class="row align-items-start justify-content-between gx-xl-4">
      <ProfileCard />

      <Col xl={8} lg={8} md={12}>
        {/* Personal Information Card */}
        <Card className="mb-4">
          <Card.Header>
            <h4>
              <FontAwesomeIcon icon={faFileInvoice} className="me-2" />
              Personal Information
            </h4>
          </Card.Header>
          <Card.Body>
            <Row className="align-items-center justify-content-start">
              <Col xl={12} lg={12} md={12} className="mb-4">
                <div className="d-flex align-items-center">
                  <label
                    htmlFor="uploadfile-1"
                    className="position-relative me-4"
                    title="Replace this pic"
                  >
                    <span className="avatar avatar-xl">
                      <img
                        id="uploadfile-1-preview"
                        className="avatar-img rounded-circle border border-white border-3 shadow"
                        src="assets/img/team-1.jpg"
                        alt=""
                      />
                    </span>
                  </label>
                  <label
                    className="btn btn-sm btn-light-primary px-4 fw-medium mb-0"
                    htmlFor="uploadfile-1"
                  >
                    Change
                  </label>
                  <input
                    id="uploadfile-1"
                    className="form-control d-none"
                    type="file"
                  />
                </div>
              </Col>

              <Col xl={6} lg={6} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    value={username}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xl={6} lg={6} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xl={6} lg={6} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xl={12} lg={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Update Email Card */}
        {/* <Card className="mb-4">
          <Card.Header>
            <h4>
              <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="me-2" />
              Update Your Email
            </h4>
          </Card.Header>
          <Card.Body>
            <Row className="align-items-center justify-content-start">
              <Col xl={12} lg={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="update your new email"
                  />
                </Form.Group>
              </Col>

              <Col xl={12} lg={12} md={12} className="text-end">
                <Button variant="primary">Update Email</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card> */}

        {/* Update Password Card */}
        {/* <Card>
          <Card.Header>
            <h4>
              <FontAwesomeIcon icon={faLock} className="me-2" />
              Update Password
            </h4>
          </Card.Header>
          <Card.Body>
            <Row className="align-items-center justify-content-start">
              <Col xl={12} lg={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control type="password" placeholder="*********" />
                </Form.Group>
              </Col>

              <Col xl={12} lg={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" placeholder="*********" />
                </Form.Group>
              </Col>

              <Col xl={12} lg={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="*********" />
                </Form.Group>
              </Col>

              <Col xl={12} lg={12} md={12} className="text-end">
                <Button variant="primary">Change Password</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card> */}
      </Col>
    </div>
  );
};

export default PersonalInfo;
