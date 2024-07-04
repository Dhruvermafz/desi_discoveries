import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Subtitle from "../components/Subtitle";
import ImagesGallery from "../components/Gallery/ImagesGallery";
const Gallery = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <Subtitle subtitle={"Gallery"} />
            <h2 className="gallery__title">Our Customers Tour Gallery</h2>
          </Col>

          <Col lg="12">
            <ImagesGallery />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Gallery;
