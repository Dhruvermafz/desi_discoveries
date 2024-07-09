import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import AuthContext from "../../context/AuthContext";
import { logout } from "../../redux/actions/authActions";
import moment from "moment";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import "../../styles/profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const createdat = user.createdAt;
  const updatedat = user.updatedAt;
  const [activePanelId, setActivePanelId] = useState(1);
  const createdatnew = moment(createdat).fromNow();
  const updatedatnew = moment(updatedat).fromNow();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const getUser = async () => {
    navigate("/updateProfile", { state: user });
  };

  return (
    <Container fluid className="profile-container">
      <Row>
        <Col lg={6} className="profile-left bg-white p-4 rounded">
          <div className="profile-avatar text-center">
            <Image
              src={`${user.img}`}
              alt={`${user.username} Avatar`}
              className="avatar-image rounded-circle shadow"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div className="avatar-info">
              <h1 className="avatar-username">{user.username}</h1>
              <div className="avatar-actions d-flex justify-content-between">
                <Button
                  variant="outline-secondary"
                  onClick={() => setActivePanelId(3)}
                  className="edit-profile-button"
                  Link
                  to={`/profile/${user.id}/edit`}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
            <div className="profile-stats mt-4">
              <div className="stat-item text-center">
                <h1 className="stat-label">Available Points:</h1>
                <h3 className="stat-value">1500</h3>
              </div>
              <div className="stat-item text-center">
                <h1 className="stat-label">Account Status:</h1>
                <h3 className="stat-value status-blue">Blue</h3>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={6} className="profile-right bg-white p-4 rounded">
          <h3 className="profile-type">{user.type}</h3>
          <Row className="profile-details mt-4">
            <Col md={6}>
              <div className="profile-info">
                <h1 className="info-label">Name:</h1>
                <p className="info-value">{user.username}</p>
                <h1 className="info-label">Email:</h1>
                <p className="info-value">{user.email}</p>
                <h1 className="info-label">Mobile:</h1>
                <p className="info-value">{user.mobile}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="profile-info">
                <h1 className="info-label">Country:</h1>
                <p className="info-value">{user.country}</p>
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
              onClick={getUser}
            >
              Delete Profile
            </Button>
            {user.isAdmin && (
              <Link to="/pending-activities">
                <Button variant="primary" className="pending-activities-button">
                  Pending Activities
                </Button>
              </Link>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
