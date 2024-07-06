import React from "react";
import CommonSection from "../components/CommonSection/CommonSection";
import "../styles/Tour.css";
import useFetch from "../hooks/useFetch";
import TourCard from "../components/TourCard/TourCard";
import SearchBar from "../components/SearchBar";
import Newsletter from "../components/Newsletter";
import { Container, Row, Col, Spinner } from "react-bootstrap";

// Importing the tours data directly
import tours from "../assets/data/tours";

const Tours = () => {
  const { data: fetchedTours, loading, error } = useFetch("tours");

  // Assuming useFetch is used for fetching data from an API asynchronously
  // Here, for simplicity, we're using the static data directly from the imported tours module

  const toursToDisplay = fetchedTours || tours; // Use fetchedTours if available, otherwise use static tours data

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <div className="error__msg">
        Error loading tours. Please check your network connection.
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
            {toursToDisplay.map((tour) => (
              <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
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
