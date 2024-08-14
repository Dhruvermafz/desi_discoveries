import React from "react";
import {
  Card,
  Button,
  ProgressBar,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faEnvelopeCircleCheck,
  faPhoneVolume,
  faFileInvoice,
  faSun,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const ProfileCard = () => {
  return (
    <Col xl={4} lg={4} md={12}>
      <Card className="rounded-2 me-xl-5 mb-4">
        <Card.Header className="bg-primary position-relative p-0">
          <div className="position-absolute end-0 top-0 mt-4 me-3">
            <a
              href="login.html"
              className="square--40 circle bg-light-dark text-light"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </a>
          </div>
          <Container className="py-5 px-3">
            <div className="crd-thumbimg text-center">
              <div className="p-2 d-flex align-items-center justify-content-center brd">
                <img
                  src="assets/img/team-1.jpg"
                  className="img-fluid circle"
                  width="120"
                  alt="Profile"
                />
              </div>
            </div>
            <Card.Title className="text-center text-light fw-semibold mb-0">
              Adam K. Divliars
            </Card.Title>
            <Card.Text className="text-center text-light opacity-75 fw-medium">
              <FontAwesomeIcon icon={faLocationDot} className="me-2" />
              California, USA
            </Card.Text>
          </Container>
        </Card.Header>

        <Card.Body className="px-4 py-5">
          <div className="crdapproval-groups">
            <div className="crdapproval-single d-flex align-items-center justify-content-start mb-4">
              <div className="crdapproval-item">
                <div className="square--50 circle bg-light-success text-success">
                  <FontAwesomeIcon
                    icon={faEnvelopeCircleCheck}
                    className="fs-5"
                  />
                </div>
              </div>
              <div className="crdapproval-caps ps-2">
                <p className="fw-semibold text-dark lh-2 mb-0">
                  Verified Email
                </p>
                <p className="text-md text-muted lh-1 mb-0">10 Aug 2022</p>
              </div>
            </div>

            <div className="crdapproval-single d-flex align-items-center justify-content-start mb-4">
              <div className="crdapproval-item">
                <div className="square--50 circle bg-light-success text-success">
                  <FontAwesomeIcon icon={faPhoneVolume} className="fs-5" />
                </div>
              </div>
              <div className="crdapproval-caps ps-2">
                <p className="fw-semibold text-dark lh-2 mb-0">
                  Verified Mobile Number
                </p>
                <p className="text-md text-muted lh-1 mb-0">12 Aug 2022</p>
              </div>
            </div>

            <div className="crdapproval-single d-flex align-items-center justify-content-start">
              <div className="crdapproval-item">
                <div className="square--50 circle bg-light-warning text-warning">
                  <FontAwesomeIcon icon={faFileInvoice} className="fs-5" />
                </div>
              </div>
              <div className="crdapproval-caps ps-2">
                <p className="fw-semibold text-dark lh-2 mb-0">
                  Complete Basic Info
                </p>
                <p className="text-md text-muted lh-1 mb-0">Not Verified</p>
              </div>
            </div>
          </div>
        </Card.Body>

        <Card.Body className="mt-5 mb-4 px-4">
          <div className="revs-wraps mb-3">
            <div className="revs-wraps-flex d-flex align-items-center justify-content-between mb-1">
              <span className="text-dark fw-semibold text-md">
                Complete Your Profile
              </span>
              <span className="text-dark fw-semibold text-md">75%</span>
            </div>
            <ProgressBar
              now={75}
              className="bg-success"
              style={{ height: "7px" }}
            />
          </div>
          <div className="crd-upgrades">
            <Button
              variant="light-primary"
              className="fw-medium full-width rounded-2"
            >
              <FontAwesomeIcon icon={faSun} className="me-2" /> Upgrade Pro
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProfileCard;
