import React from "react";
import { Button, Offcanvas, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faTicket,
  faUserGroup,
  faWallet,
  faGauge,
  faShieldHeart,
  faSliders,
  faTrashCan,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { faIdCard as faIdCardRegular } from "@fortawesome/free-solid-svg-icons";

const MobileNav = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
        <Button
          variant="dark"
          className="fw-medium full-width d-block d-lg-none"
          onClick={handleShow}
        >
          <FontAwesomeIcon icon={faGauge} className="me-2" /> Dashboard
          Navigation
        </Button>

        <Offcanvas
          show={show}
          onHide={handleClose}
          scroll={true}
          backdrop={false}
          placement="start"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasScrollingLabel">
              Offcanvas with body scrolling
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Nav className="user-Dashboard-longmenu flex-column">
              <Nav.Link href="my-profile.html" className="active">
                <FontAwesomeIcon icon={faIdCardRegular} className="me-2" /> My
                Profile
              </Nav.Link>
              <Nav.Link href="my-booking.html">
                <FontAwesomeIcon icon={faTicket} className="me-2" /> My Booking
              </Nav.Link>
              <Nav.Link href="travelers.html">
                <FontAwesomeIcon icon={faUserGroup} className="me-2" />{" "}
                Travelers
              </Nav.Link>
              <Nav.Link href="payment-detail.html">
                <FontAwesomeIcon icon={faWallet} className="me-2" /> Payment
                Details
              </Nav.Link>
              <Nav.Link href="my-wishlists.html">
                <FontAwesomeIcon icon={faShieldHeart} className="me-2" /> My
                Wishlist
              </Nav.Link>
              <Nav.Link href="settings.html">
                <FontAwesomeIcon icon={faSliders} className="me-2" /> Settings
              </Nav.Link>
              <Nav.Link href="delete-account.html">
                <FontAwesomeIcon icon={faTrashCan} className="me-2" /> Delete
                Profile
              </Nav.Link>
              <Nav.Link href="login.html">
                <FontAwesomeIcon icon={faPowerOff} className="me-2" /> Sign Out
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default MobileNav;
