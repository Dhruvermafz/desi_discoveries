import React from "react";
import CommonSection from "../components/CommonSection/CommonSection";
import "../styles/Tour.css";
import useFetch from "../hooks/useFetch";
import TourCard from "../components/TourCard/TourCard";
import SearchBar from "../components/SearchBar";
import Newsletter from "../components/Newsletter";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const Tours = () => {
  const { data: tours, loading, error } = useFetch("tours");

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error__msg">
        Error loading blog details. Check your network
      </div>
    );
  }
  return (
    <div>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {Array.isArray(tours) &&
              tours.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default Tours;
