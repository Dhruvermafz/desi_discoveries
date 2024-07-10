import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const NoSuitablePackage = () => (
  <Container className="text-center my-10 min-h-96">
    <Row>
      <Col>
        <FontAwesomeIcon
          icon={faExclamationCircle}
          size="3x"
          className="text-gray-600 mb-4"
        />
        <h3 className="text-lg text-gray-800 font-semibold">
          No Suitable Packages Found
        </h3>
        <p className="text-gray-500">
          We can't seem to find any packages that match your search criteria.
        </p>
      </Col>
    </Row>
  </Container>
);

export default NoSuitablePackage;
