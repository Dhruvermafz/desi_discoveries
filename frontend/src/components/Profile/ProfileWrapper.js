import React, { useState } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import ProfilePage from "./ProfilePage";
import BookingPanel from "../Booking/BookingPanel";
import "./profilewrapper.css"; // Ensure you have styles for this component
import AllPayments from "../Payment/AllPayments";
const ProfileWrapper = () => {
  const [activeKey, setActiveKey] = useState("profile");

  return (
    <Container fluid className="profile-wrapper">
      <Row>
        <Col md={3} className="sidebar bg-light">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link
                eventKey="profile"
                active={activeKey === "profile"}
                onClick={() => setActiveKey("profile")}
              >
                <FontAwesomeIcon icon={faUser} /> Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="bookings"
                active={activeKey === "bookings"}
                onClick={() => setActiveKey("bookings")}
              >
                <FontAwesomeIcon icon={faHotel} /> Bookings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="payments"
                active={activeKey === "payments"}
                onClick={() => setActiveKey("payments")}
              >
                <FontAwesomeIcon icon={faCreditCard} /> Payments
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={9} className="main-content bg-white p-4">
          <Tab.Content>
            <Tab.Pane eventKey="profile" active={activeKey === "profile"}>
              <ProfilePage />
            </Tab.Pane>
            <Tab.Pane eventKey="bookings" active={activeKey === "bookings"}>
              {/* <BookingPanel /> */}
            </Tab.Pane>
            <Tab.Pane eventKey="payments" active={activeKey === "payments"}>
              <AllPayments /> {/* Render AllPayments component */}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileWrapper;
