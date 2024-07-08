import React, { useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";

const Profile = () => {
  const dispatch = useDispatch();
  const { userProfile, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col className="text-center">
            <h2>Loading...</h2>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              <Card.Text>
                <strong>Username:</strong> {userProfile.username}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {userProfile.email}
              </Card.Text>
              {/* Add more profile fields as needed */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
