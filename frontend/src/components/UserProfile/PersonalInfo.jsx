import React from "react";
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

const PersonalInfo = () => {
  return (
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
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value="Adam K" />
              </Form.Group>
            </Col>

            <Col xl={6} lg={6} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value="Divliars" />
              </Form.Group>
            </Col>

            <Col xl={6} lg={6} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email ID</Form.Label>
                <Form.Control type="text" value="adamkruck@gmail.com" />
              </Form.Group>
            </Col>

            <Col xl={6} lg={6} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" value="9856542563" />
              </Form.Group>
            </Col>

            <Col xl={6} lg={6} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" value="2000-04-02" />
              </Form.Group>
            </Col>

            <Col xl={6} lg={6} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text" value="Male" />
              </Form.Group>
            </Col>

            <Col xl={12} lg={12} md={12}>
              <Form.Group className="mb-3">
                <Form.Label>About Info</Form.Label>
                <Form.Control
                  as="textarea"
                  className="ht-120"
                  defaultValue="Lorem ipsum dolor sit amet, nec virtute nusquam ex. Ex sed diceret constituam inciderint, accusamus imperdiet has te. Id qui liber nemore semper, modus appareat philosophia ut eam. Assum tibique singulis at mel."
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Update Email Card */}
      <Card className="mb-4">
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
      </Card>

      {/* Update Password Card */}
      <Card>
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
      </Card>
    </Col>
  );
};

export default PersonalInfo;
