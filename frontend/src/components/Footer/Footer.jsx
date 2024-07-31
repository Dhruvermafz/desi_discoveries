import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroupItem, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const quick__links = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick__links2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  {
    path: "/faq",
    display: "FAQS",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="Desi Discoveries Logo" />
              <p>Explore the world with us and make unforgettable memories.</p>

              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to="https://youtube.com">
                    <FaYoutube />
                  </Link>
                </span>
                <span>
                  <Link to="https://facebook.com">
                    <FaFacebook />
                  </Link>
                </span>
                <span>
                  <Link to="https://instagram.com">
                    <FaInstagram />
                  </Link>
                </span>
                <span>
                  <Link to="https://twitter.com">
                    <FaTwitter />
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {quick__links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex flex-column flex-md-row align-items-md-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-warning">
                    <FaEnvelope />
                  </span>
                  <h6 className="mb-0">Email:</h6>
                </div>
                <p className="mb-0">
                  <Link
                    to="mailto:support@desidiscoveries.com"
                    className="color-text"
                  >
                    support@desidiscoveries.com
                  </Link>
                </p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex flex-column flex-md-row align-items-md-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-warning">
                    <FaPhone />
                  </span>
                  <h6 className="mb-0">Phone:</h6>
                </div>
                <p className="mb-0">
                  <Link to="tel:7838686544">7838686544</Link>
                </p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex flex-column flex-md-row align-items-md-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-warning">
                    <FaMapMarkerAlt />
                  </span>
                  <h6 className="mb-0">Address:</h6>
                </div>
                <p className="mb-0">
                  H-82, Kunwar Singh Nagar, Nangloi, New Delhi-110041
                </p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <p className="copyright">
              &copy; {year} Desi Discoveries. All Rights Reserved. Designed and
              Developed By{" "}
              <Link to="https://pickyvibe.com" target="_blank">
                Picky Vibe LLP.
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
