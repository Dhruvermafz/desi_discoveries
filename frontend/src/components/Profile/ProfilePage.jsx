import React, { useContext, useState } from "react";
import { Button, Col, Container, Row, Image, Form } from "react-bootstrap";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import states from "../../utils/state";
import { BASE_URL } from "../../utils/config";

const ProfilePage = () => {
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
    <Container fluid className="profile-container">
      <Row>
        <Col lg={6} className="profile-left bg-white p-4 rounded">
          <div className="profile-avatar text-center">
            <Image
              src={preview}
              alt={`${user.username} Avatar`}
              className="avatar-image rounded-circle shadow"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div className="avatar-info">
              {isEditing ? (
                <>
                  <Form.Group controlId="formImg">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
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
                </>
              ) : (
                <>
                  <h1 className="avatar-username">{username}</h1>
                  <div className="avatar-actions d-flex justify-content-between">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setIsEditing(true)}
                      className="edit-profile-button"
                    >
                      Edit Profile
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Col>
        <Col lg={6} className="profile-right bg-white p-4 rounded">
          {isEditing ? (
            <Form onSubmit={handleSubmit}>
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
              <Form.Group controlId="formState">
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
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Save Changes
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
              <h3 className="profile-type">{user.type}</h3>
              <Row className="profile-details mt-4">
                <Col md={6}>
                  <div className="profile-info">
                    <h1 className="info-label">Name:</h1>
                    <p className="info-value">{username}</p>
                    <h1 className="info-label">Email:</h1>
                    <p className="info-value">{email}</p>
                    <h1 className="info-label">Mobile:</h1>
                    <p className="info-value">{mobile}</p>
                    <h1 className="info-label">State:</h1>
                    <p className="info-value">{state}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="profile-info">
                    <h1 className="info-label">Country:</h1>
                    <p className="info-value">{country}</p>
                    <h1 className="info-label">Created at:</h1>
                    <p className="info-value">{createdatnew}</p>
                    <h1 className="info-label">Updated at:</h1>
                    <p className="info-value">{updatedatnew}</p>
                  </div>
                </Col>
              </Row>
              <div className="profile-actions mt-4">
                <Button
                  variant="danger"
                  className="update-profile-button"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                {user.isAdmin && (
                  <Link to="/pending-activities">
                    <Button
                      variant="primary"
                      className="pending-activities-button"
                    >
                      Pending Activities
                    </Button>
                  </Link>
                )}
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
