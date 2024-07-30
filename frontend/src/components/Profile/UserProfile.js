import React, { useState, useEffect, useRef, useContext } from "react";
import { Tabs, Tab, Nav, Container, Row, Col, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faHotel,
  faCreditCard,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import BookingPanel from "../Booking/BookingPanel";
import Profile from "./ProfilePage";
import PaymentMethodsPanel from "./PaymentPanel";

const UserProfile = () => {
  const { userDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const wrapperRef = useRef();
  const buttonRef = useRef();
  const [isTabsVisible, setIsTabsVisible] = useState(false);

  // Fetch user bookings data
  const [userBookingsData, setUserBookingsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  // Fetch user payment methods data
  const [userPaymentMethodsData, setUserPaymentMethodsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  const onTabsMenuButtonAction = () => {
    setIsTabsVisible(!isTabsVisible);
  };

  useEffect(() => {
    const getInitialData = async () => {
      // Fetch initial data here
    };
    getInitialData();
  }, []);

  return (
    <Container fluid className="my-5">
      <Row>
        <Col md={3} className="d-none d-md-block">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="personal-details">
                <FontAwesomeIcon icon={faAddressCard} /> Personal Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bookings">
                <FontAwesomeIcon icon={faHotel} /> Bookings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="payment-details">
                <FontAwesomeIcon icon={faCreditCard} /> Payment Details
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={9}>
          <Button
            ref={buttonRef}
            onClick={onTabsMenuButtonAction}
            className="d-md-none mb-3"
            variant="outline-secondary"
          >
            <FontAwesomeIcon
              icon={isTabsVisible ? faXmark : faBars}
              size="lg"
            />
          </Button>
          <Tabs
            defaultActiveKey="personal-details"
            id="user-profile-tabs"
            className={`mb-3 ${isTabsVisible ? "show-tabs" : "hide-tabs"}`}
            ref={wrapperRef}
          >
            <Tab
              eventKey="personal-details"
              title={
                <span>
                  <FontAwesomeIcon icon={faAddressCard} /> Personal Details
                </span>
              }
            >
              <Profile userDetails={userDetails} />
            </Tab>
            <Tab
              eventKey="bookings"
              title={
                <span>
                  <FontAwesomeIcon icon={faHotel} /> Bookings
                </span>
              }
            >
              {/* <BookingPanel bookings={userBookingsData.data} /> */}
            </Tab>
            <Tab
              eventKey="payment-details"
              title={
                <span>
                  <FontAwesomeIcon icon={faCreditCard} /> Payment details
                </span>
              }
            >
              {/* <PaymentMethodsPanel
                userPaymentMethodsData={userPaymentMethodsData}
                setUserPaymentMethodsData={setUserPaymentMethodsData}
              /> */}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
