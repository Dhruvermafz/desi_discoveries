import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faTicket,
  faUserGroup,
  faWallet,
  faShieldHeart,
  faSliders,
  faTrashCan,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import PersonalInfo from "./PersonalInfo"; // Import your components

import PaymentDetails from "./PaymentDetails";
import MyBookings from "./MyBookings";
import MyWishList from "./MyWishList";
import Settings from "./Settings";
import DeleteProfile from "./DeleteProfile";

import MobileNav from "./MobileNav"; // Adjust the path as necessary

const UserNav = () => {
  const [activeComponent, setActiveComponent] = useState("MyProfile");

  const renderComponent = () => {
    switch (activeComponent) {
      case "MyProfile":
        return <PersonalInfo />;
      case "MyBooking":
        return <MyBookings />;

      // case "PaymentDetails":
      //   return <PaymentDetails />;
      // case "MyWishlist":
      //   return <MyWishList />;
      // case "Settings":
      //   return <Settings />;
      case "DeleteProfile":
        return <DeleteProfile />;

      default:
        return <PersonalInfo />;
    }
  };

  return (
    <>
      <div>
        <div className="dashboard-menus border-top d-none d-lg-block">
          <Container>
            <Col>
              <Nav className="user-Dashboard-menu flex-row">
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setActiveComponent("MyProfile")}
                    className={activeComponent === "MyProfile" ? "active" : ""}
                  >
                    <FontAwesomeIcon icon={faIdCard} className="me-2" /> My
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setActiveComponent("MyBooking")}
                    className={activeComponent === "MyBooking" ? "active" : ""}
                  >
                    <FontAwesomeIcon icon={faTicket} className="me-2" /> My
                    Booking
                  </Nav.Link>
                </Nav.Item>

                {/* <Nav.Item>
                  <Nav.Link
                    onClick={() => setActiveComponent("PaymentDetails")}
                    className={
                      activeComponent === "PaymentDetails" ? "active" : ""
                    }
                  >
                    <FontAwesomeIcon icon={faWallet} className="me-2" /> Payment
                    Details
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setActiveComponent("MyWishlist")}
                    className={activeComponent === "MyWishlist" ? "active" : ""}
                  >
                    <FontAwesomeIcon icon={faShieldHeart} className="me-2" /> My
                    Wishlist
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setActiveComponent("Settings")}
                    className={activeComponent === "Settings" ? "active" : ""}
                  >
                    <FontAwesomeIcon icon={faSliders} className="me-2" />{" "}
                    Settings
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setActiveComponent("DeleteProfile")}
                    className={
                      activeComponent === "DeleteProfile" ? "active" : ""
                    }
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="me-2" />{" "}
                    Delete Profile
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Container>
        </div>
        {/* Mobile Navigation */}
        <div className="d-block d-lg-none">
          <MobileNav />
        </div>
      </div>
      {/* Render the selected component */}
      <div>{renderComponent()}</div>
    </>
  );
};

export default UserNav;
