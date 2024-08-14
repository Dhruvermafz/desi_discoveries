import React from "react";
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
import { faIdCard as faIdCardRegular } from "@fortawesome/free-solid-svg-icons";
import MobileNav from "./MobileNav"; // Adjust the path as necessary

const UserNav = () => {
  return (
    <>
      <div>
        {" "}
        <div className="dashboard-menus border-top d-none d-lg-block">
          <Container>
            <Row>
              <Col>
                <Nav className="user-Dashboard-menu flex-column">
                  <Nav.Item>
                    <Nav.Link href="my-profile.html" className="active">
                      <FontAwesomeIcon
                        icon={faIdCardRegular}
                        className="me-2"
                      />{" "}
                      My Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="my-booking.html">
                      <FontAwesomeIcon icon={faTicket} className="me-2" /> My
                      Booking
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="travelers.html">
                      <FontAwesomeIcon icon={faUserGroup} className="me-2" />{" "}
                      Travelers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="payment-detail.html">
                      <FontAwesomeIcon icon={faWallet} className="me-2" />{" "}
                      Payment Details
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="my-wishlists.html">
                      <FontAwesomeIcon icon={faShieldHeart} className="me-2" />{" "}
                      My Wishlist
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="settings.html">
                      <FontAwesomeIcon icon={faSliders} className="me-2" />{" "}
                      Settings
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="delete-account.html">
                      <FontAwesomeIcon icon={faTrashCan} className="me-2" />{" "}
                      Delete Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="login.html">
                      <FontAwesomeIcon icon={faPowerOff} className="me-2" />{" "}
                      Sign Out
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Container>
        </div>
        {/* Mobile Navigation */}
        <div className="d-block d-lg-none">
          <MobileNav />
        </div>
      </div>
      {/* Desktop Navigation */}
    </>
  );
};

export default UserNav;
