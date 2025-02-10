import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import "../styles/popup.css";
import gallery from "../assets/images/gallery-07.jpg";
const PopUp = () => {
  const [show, setShow] = useState(true); // Show the modal initially

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* This button is optional, you can trigger the modal with a button */}
      {/* <Button variant="primary" onClick={handleShow}>
        Show Pop-up
      </Button> */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Button variant="close" onClick={handleClose} aria-label="Close">
            &times;
          </Button>
          <Row>
            <Col xs={12} md={6}>
              <div className="popup-ad-text">
                <h4>Get</h4>
                <h2>
                  <span>20%</span> off
                </h2>
                <h4>on all flight bookings</h4>
                <p>
                  Lorem ipsum dolor sit amet, ad duo fugit aeque fabulas, in
                  lucilius prodesset pri.
                </p>
                <Button className="btn-orange" href="/tours">
                  Book Now
                </Button>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="popup-ad-img">
                <img src={gallery} alt="Ad" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopUp;
