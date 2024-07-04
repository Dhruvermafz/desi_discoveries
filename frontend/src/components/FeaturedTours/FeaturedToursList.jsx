import React from "react";
import { Button, Col, Nav, Spinner } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import TourCard from "../TourCard/TourCard";
import { NavLink } from "react-router-dom";

const FeaturedToursList = () => {
  const { data: featuredTours, loading } = useFetch(`tours/featured`);

  if (loading) {
    <Spinner />;
  }
  return (
    <>
      {Array.isArray(featuredTours) &&
        featuredTours.map((tour) => (
          <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))}

      <div className="viall__btn">
        <NavLink to={"/tours"}>
          <Button className="btn primary__btn">View All Tours</Button>
        </NavLink>
      </div>
    </>
  );
};

export default FeaturedToursList;
