import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/actions/authActions";
import states from "../../utils/state"; // Assuming state.js is in utils folder
import "../../styles/profile.css"; // Import the same CSS for consistency

const ProfileEdit = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [state, setState] = useState(user.state);
  const [country, setCountry] = useState(user.country);
  const [img, setImg] = useState(user.img);
  const [preview, setPreview] = useState(user.img);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("img", img);

    dispatch(updateUserProfile(user.id, formData, navigate));
  };

  return (
    <Container fluid className="profile-container">
      <Row>
        <Col lg={6} className="profile-left bg-white p-4 rounded">
          <h3 className="profile-edit-title">Edit Profile</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="formImg"
              className="profile-avatar text-center"
            >
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
              />
              {preview && (
                <Image
                  src={preview}
                  alt="Profile Preview"
                  className="mt-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="form-control"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-control"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileEdit;
