import React, { useState, useEffect, useRef, useContext } from "react";
import { Tabs, Tab, Container, Row, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

import PaymentMethodsPanel from "./PaymentPanel";
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

  //   useOutsideClickHandler(wrapperRef, (event) => {
  //     if (!buttonRef.current.contains(event.target)) {
  //       setIsTabsVisible(false);
  //     }
  //   });

  const onTabsMenuButtonAction = () => {
    setIsTabsVisible(!isTabsVisible);
  };

  useEffect(() => {
    const getInitialData = async () => {
      //   const userBookingsDataResponse = await networkAdapter.get(
      //     "/api/users/bookings"
      //   );
      //   const userPaymentMethodsResponse = await networkAdapter.get(
      //     "/api/users/payment-methods"
      //   );
      //   if (userBookingsDataResponse && userBookingsDataResponse.data) {
      //     setUserBookingsData({
      //       isLoading: false,
      //       data: userBookingsDataResponse.data.elements,
      //       errors: userBookingsDataResponse.errors,
      //     });
      //   }
      //   if (userPaymentMethodsResponse && userPaymentMethodsResponse.data) {
      //     setUserPaymentMethodsData({
      //       isLoading: false,
      //       data: userPaymentMethodsResponse.data.elements,
      //       errors: userPaymentMethodsResponse.errors,
      //     });
      //   }
    };
    getInitialData();
  }, []);

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Button
          ref={buttonRef}
          onClick={onTabsMenuButtonAction}
          className="d-md-none"
          variant="outline-secondary"
        >
          <FontAwesomeIcon icon={isTabsVisible ? faXmark : faBars} size="lg" />
        </Button>
      </Row>
      <Tabs
        id="user-profile-tabs"
        activeKey={isTabsVisible ? undefined : null}
        className="mb-3"
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
          <BookingPanel bookings={userBookingsData.data} />
        </Tab>
        <Tab
          eventKey="payment-details"
          title={
            <span>
              <FontAwesomeIcon icon={faCreditCard} /> Payment details
            </span>
          }
        >
          <PaymentMethodsPanel
            userPaymentMethodsData={userPaymentMethodsData}
            setUserPaymentMethodsData={setUserPaymentMethodsData}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserProfile;
